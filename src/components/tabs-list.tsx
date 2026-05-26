import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../lib/utils";

const TAB_INDICATOR_INSET_PX = 4;

const TAB_LIST_CLASS =
  "tab-list-primitive relative inline-flex w-max max-w-full items-center overflow-x-auto overflow-y-hidden rounded-full p-1 [--tabs-indicator-inset:4px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-md:mx-auto md:w-fit";

const TAB_LIST_TRACK_CLASS =
  "bg-[color-mix(in_oklch,var(--gray-550),transparent_96%)] [box-shadow:var(--shadow-switch-track)]";

const TAB_TRIGGER_CLASS =
  "tab-trigger-primitive relative z-10 box-border inline-flex h-9 min-w-0 flex-1 cursor-pointer select-none items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium whitespace-nowrap text-[var(--fg-tertiary)] transition-[color] duration-150 ease-in-out hover:text-[var(--fg-primary)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--fg-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-accent)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-[var(--fg-tertiary)] md:min-w-12 md:flex-none";

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref != null) (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

function useSlidingTabIndicator(listRef: React.RefObject<HTMLElement | null>) {
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({
    opacity: 0,
  });

  const update = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const active = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
    if (!active) {
      setIndicatorStyle({ opacity: 0 });
      return;
    }

    const inset = TAB_INDICATOR_INSET_PX;

    setIndicatorStyle({
      opacity: 1,
      left: active.offsetLeft,
      width: active.offsetWidth,
      top: inset,
      height: Math.max(0, list.clientHeight - inset * 2),
    });
  }, [listRef]);

  React.useLayoutEffect(() => {
    update();

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

    window.addEventListener("resize", update);
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [update, listRef]);

  return indicatorStyle;
}

function TabsListIndicator({ style }: { style: React.CSSProperties }) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-0 rounded-full overflow-hidden",
        "bg-[var(--bg-translucent)] shadow-[var(--shadow-button-neutral)]",
        "transition-[left,width,height,opacity] duration-300 ease-out",
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
  const indicatorStyle = useSlidingTabIndicator(listRef);

  return (
    <TabsPrimitive.List
      ref={mergeRefs(ref, listRef)}
      data-tab-list=""
      className={cn(TAB_LIST_CLASS, TAB_LIST_TRACK_CLASS, className)}
      {...props}
    >
      {children}
      <TabsListIndicator style={indicatorStyle} />
    </TabsPrimitive.List>
  );
});
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} data-tab="" className={cn(TAB_TRIGGER_CLASS, className)} {...props}>
    {children}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = "TabsTrigger";
