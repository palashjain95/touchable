import * as React from "react";

import { cn } from "../lib/utils";

const SIZE_CLASS = {
  compact:
    "h-8 rounded-lg px-3 text-sm",
  default:
    "h-11 rounded-xl px-3.5 text-sm",
} as const;

const FIELD_UTILITIES =
  "w-full text-[var(--fg-primary)] outline-hidden placeholder:text-[var(--fg-tertiary)] disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--fg-primary)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]";

export type InputFieldSize = keyof typeof SIZE_CLASS;

/** Class string for a native `<input>` — matches Notey auth/settings fields. */
export function inputFieldClass(
  size: InputFieldSize = "compact",
  className?: string,
): string {
  return cn("input-field", SIZE_CLASS[size], FIELD_UTILITIES, className);
}

export type InputFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "size"
> & {
  size?: InputFieldSize;
  className?: string;
  /** Sets `aria-invalid` and invalid border styling when true. */
  invalid?: boolean;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      size = "compact",
      className,
      spellCheck = false,
      invalid,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) => (
    <input
      ref={ref}
      spellCheck={spellCheck}
      aria-invalid={invalid === true || ariaInvalid === true ? true : ariaInvalid}
      className={inputFieldClass(size, className)}
      {...props}
    />
  ),
);
InputField.displayName = "InputField";
