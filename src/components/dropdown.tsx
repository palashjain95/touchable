import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "../lib/utils";
import { ButtonNeutral, ButtonNeutralPill } from "./button";

const TRIGGER_CONTENT_CLASS =
  "relative z-30 inline-flex w-full min-w-0 items-center justify-between gap-2 text-left text-sm [&_[data-placeholder]]:text-[var(--fg-tertiary)]";

const TRIGGER_PILL_CONTENT_CLASS =
  "relative z-30 inline-flex min-w-0 items-center justify-center gap-1 text-sm [&_[data-placeholder]]:text-[var(--fg-tertiary)]";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden
      className={cn("size-4", className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4 shrink-0 opacity-50", className)}
    >
      <path
        fill="currentColor"
        d="M11.526 15.582a.75.75 0 0 0 1.004-.052l5-5a.75.75 0 1 0-1.06-1.06L12 13.94 7.53 9.47a.75.75 0 1 0-1.06 1.06l5 5z"
      />
    </svg>
  );
}

const Dropdown = SelectPrimitive.Root;

const DropdownGroup = SelectPrimitive.Group;

const DropdownValue = SelectPrimitive.Value;

export type DropdownTriggerVariant = "field" | "pill";

export type DropdownTriggerProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> & {
  /** `field` = full-width compact select (forms). `pill` = rounded filter chip. */
  variant?: DropdownTriggerVariant;
};

const DropdownTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  DropdownTriggerProps
>(({ className, children, variant = "field", ...props }, ref) => {
  const content = (
    <span
      className={cn(
        variant === "pill" ? TRIGGER_PILL_CONTENT_CLASS : TRIGGER_CONTENT_CLASS,
        className,
      )}
    >
      <span
        className={cn("min-w-0 truncate", variant === "field" && "flex-1 [&>span]:line-clamp-1")}
      >
        {children}
      </span>
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon
          className={variant === "pill" ? "ml-1 text-[var(--fg-secondary)]" : undefined}
        />
      </SelectPrimitive.Icon>
    </span>
  );

  if (variant === "pill") {
    return (
      <SelectPrimitive.Trigger ref={ref} asChild {...props}>
        <ButtonNeutralPill type="button">{content}</ButtonNeutralPill>
      </SelectPrimitive.Trigger>
    );
  }

  return (
    <SelectPrimitive.Trigger ref={ref} asChild {...props}>
      <ButtonNeutral type="button" size="compact" fullWidth>
        {content}
      </ButtonNeutral>
    </SelectPrimitive.Trigger>
  );
});
DropdownTrigger.displayName = SelectPrimitive.Trigger.displayName;

const DropdownContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-secondary))] text-[var(--fg-primary)] outline-none",
        "shadow-[0_8px_20px_-6px_light-dark(oklch(0_0_0/0.14),oklch(0_0_0/0.45))]",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
DropdownContent.displayName = SelectPrimitive.Content.displayName;

const DropdownLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-medium text-[var(--fg-secondary)]", className)}
    {...props}
  />
));
DropdownLabel.displayName = SelectPrimitive.Label.displayName;

const DropdownItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-2 pl-8 pr-2 text-sm outline-none",
      "text-[var(--fg-primary)] data-[highlighted]:bg-[hsl(var(--muted-hover))] data-[highlighted]:text-[var(--fg-primary)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
DropdownItem.displayName = SelectPrimitive.Item.displayName;

const DropdownSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-[hsl(var(--border))]", className)}
    {...props}
  />
));
DropdownSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Dropdown,
  DropdownGroup,
  DropdownValue,
  DropdownTrigger,
  DropdownContent,
  DropdownLabel,
  DropdownItem,
  DropdownSeparator,
};
