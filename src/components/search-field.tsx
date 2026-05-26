import * as React from "react";

import { cn } from "../lib/utils";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M15.25 10a5.25 5.25 0 1 0-10.5 0 5.25 5.25 0 0 0 10.5 0m1.5 0a6.72 6.72 0 0 1-1.477 4.212l5.257 5.258a.75.75 0 1 1-1.06 1.06l-5.258-5.257A6.75 6.75 0 1 1 16.75 10"
      />
    </svg>
  );
}

const INPUT_CLASS =
  "min-w-0 flex-1 bg-transparent text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-tertiary)] outline-none";

const SHELL_CLASS = {
  field:
    "flex h-11 w-full items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-base))] px-3.5 focus-within:ring-2 focus-within:ring-[var(--ring)]",
  pill:
    "inline-flex h-12 max-w-full items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[var(--bg-translucent)] py-2 pl-3.5 pr-4 focus-within:ring-2 focus-within:ring-[var(--ring)]",
} as const;

export type SearchFieldVariant = keyof typeof SHELL_CLASS;

export type SearchFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "className"
> & {
  variant?: SearchFieldVariant;
  className?: string;
  inputClassName?: string;
};

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    { variant = "field", className, inputClassName, placeholder, "aria-label": ariaLabel, ...props },
    ref,
  ) => {
    const label = ariaLabel ?? (typeof placeholder === "string" ? placeholder : "Search");

    return (
      <div role="search" className={cn(SHELL_CLASS[variant], className)}>
        <SearchIcon className="size-5 shrink-0 text-[var(--fg-secondary)]" />
        <input
          ref={ref}
          type="search"
          aria-label={label}
          placeholder={placeholder}
          className={cn(INPUT_CLASS, variant === "pill" && "h-11", inputClassName)}
          {...props}
        />
      </div>
    );
  },
);
SearchField.displayName = "SearchField";
