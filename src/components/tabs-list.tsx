import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../lib/utils";

const TAB_INDICATOR_INSET_PX = 4;
const RAPID_TAB_CHANGE_MS = 280;

const TAB_LIST_CLASS =
  "tab-list-primitive relative flex w-full items-center overflow-x-auto overflow-y-hidden rounded-full p-1 [--tabs-indicator-inset:4px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const TAB_LIST_TRACK_CLASS =
  "bg-[color-mix(in_oklch,var(--gray-550),transparent_96%)] [box-shadow:var(--shadow-switch-track)]";

const TAB_TRIGGER_CLASS =
  "tab-trigger-primitive relative z-10 box-border inline-flex h-9 min-w-0 flex-1 cursor-pointer select-none items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium whitespace-nowrap text-[var(--fg-tertiary)] transition-[color] duration-150 ease-in-out hover:text-[var(--fg-primary)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--fg-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-accent)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-[var(--fg-tertiary)]";

export const TabsActiveValueContext = React.createContext<string | undefined>(undefined);

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref != null) (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

function findActiveTab(list: HTMLElement, activeValue?: string): HTMLElement | null {
  if (activeValue != null && activeValue !== "") {
    const byValue = list.querySelector<HTMLElement>(
      `[role="tab"][data-tab-value="${CSS.escape(activeValue)}"]`,
    );
    if (byValue) return byValue;
  }
  return list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
}

function measureIndicatorStyle(list: HTMLElement, active: HTMLElement): React.CSSProperties {
  const inset = TAB_INDICATOR_INSET_PX;
  const listRect = list.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();

  return {
    opacity: 1,
    left: activeRect.left - listRect.left,
    width: activeRect.width,
    top: inset,
    height: Math.max(0, list.clientHeight - inset * 2),
  };
}

function useSlidingTabIndicator(listRef: React.RefObject<HTMLElement | null>) {
  const activeValue = React.useContext(TabsActiveValueContext);
  const [indicator, setIndicator] = React.useState<{
    style: React.CSSProperties;
    animate: boolean;
  }>({
    style: { opacity: 0 },
    animate: false,
  });
  const lastChangeAtRef = React.useRef(0);
  const prevActiveValueRef = React.useRef(activeValue);

  const update = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const active = findActiveTab(list, activeValue);
    if (!active) {
      setIndicator({ style: { opacity: 0 }, animate: false });
      return;
    }

    const valueChanged = prevActiveValueRef.current !== activeValue;
    prevActiveValueRef.current = activeValue;

    let animate = false;
    if (valueChanged) {
      const now = performance.now();
      const rapid = now - lastChangeAtRef.current < RAPID_TAB_CHANGE_MS;
      lastChangeAtRef.current = now;
      animate = !rapid;
    }

    setIndicator({
      style: measureIndicatorStyle(list, active),
      animate,
    });
  }, [listRef, activeValue]);

  React.useLayoutEffect(() => {
    update();
  }, [update, activeValue]);

  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(list);

    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(list, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-state"],
    });

    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      list.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, listRef]);

  return indicator;
}

function TabsListIndicator({
  style,
  animate,
}: {
  style: React.CSSProperties;
  animate: boolean;
}) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-0 rounded-full overflow-hidden",
        "bg-[var(--bg-translucent)] shadow-[var(--shadow-button-neutral)]",
        "transition-[left,width,height,opacity] duration-300 ease-out",
        !animate && "transition-none",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:content-['']",
        "before:[background:var(--gradient-button-neutral)]",
      )}
      style={style}
    />
  );
}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const indicator = useSlidingTabIndicator(listRef);

  return (
    <TabsPrimitive.List
      ref={mergeRefs(ref, listRef)}
      data-tab-list=""
      className={cn(TAB_LIST_CLASS, TAB_LIST_TRACK_CLASS, className)}
      {...props}
    >
      {children}
      <TabsListIndicator style={indicator.style} animate={indicator.animate} />
    </TabsPrimitive.List>
  );
});
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, value, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    value={value}
    data-tab-value={value}
    data-tab=""
    className={cn(TAB_TRIGGER_CLASS, className)}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = "TabsTrigger";
