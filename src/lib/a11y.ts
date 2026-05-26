import type { HTMLAttributes, KeyboardEvent, MouseEvent } from "react";

type PressableElement = HTMLElement;

/** Keyboard activation for `role="button"` surfaces (Card/Pill rows). */
export function pressableDivProps<E extends PressableElement = HTMLDivElement>({
  onClick,
  onKeyDown,
  role,
  tabIndex,
}: Pick<HTMLAttributes<E>, "onClick" | "onKeyDown" | "role" | "tabIndex">): Pick<
  HTMLAttributes<E>,
  "role" | "tabIndex" | "onKeyDown"
> {
  if (!onClick) return {};

  const resolvedRole = role ?? "button";
  const resolvedTabIndex = tabIndex ?? 0;

  return {
    role: resolvedRole,
    tabIndex: resolvedTabIndex,
    onKeyDown: (event: KeyboardEvent<E>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick(event as unknown as MouseEvent<E>);
      }
    },
  };
}
