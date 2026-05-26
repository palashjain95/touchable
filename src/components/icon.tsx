import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Standardized icon sizes used across the app.
 * - xs  = 12px (h-3 w-3): chip/badge ornaments
 * - sm  = 16px (h-4 w-4): dense inline UI
 * - md  = 20px (h-5 w-5): buttons, list items, form labels (default)
 * - lg  = 24px (h-6 w-6): section headers
 * - xl  = 32px (h-8 w-8): empty states, large feature icons
 * - 2xl = 40px (h-10 w-10): hero illustrations
 */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const sizeClass: Record<IconSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
  "2xl": "h-10 w-10",
};

type HeroIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  as: HeroIconComponent;
  size?: IconSize;
}

/**
 * Wrapper around a Heroicon component that enforces our standard sizes
 * (16/20/24) and `currentColor` stroke. Use this anywhere new: existing
 * icons may still pass explicit `className="h-X w-X"`.
 *
 * Example:
 *   import { HomeIcon } from "@heroicons/react/24/outline";
 *   <Icon as={HomeIcon} size="md" />
 */
export function Icon({ as: Component, size = "md", className, ...rest }: IconProps) {
  return <Component aria-hidden="true" className={cn(sizeClass[size], "shrink-0", className)} {...rest} />;
}