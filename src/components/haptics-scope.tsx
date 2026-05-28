import { useMemo, type ReactNode } from "react";

import { HapticsEnabledContext, useHapticsEnabled } from "../lib/haptics";

export type HapticsScopeProps = {
  /** When false, all Touchable haptics are silent within this subtree. */
  enabled?: boolean;
  children: ReactNode;
};

/**
 * Scoped haptics gate that does not affect global `configureHaptics`.
 *
 * Use when you want to disable haptics for a specific subtree (e.g. a sheet,
 * onboarding, practice mode), while keeping them enabled elsewhere.
 */
export function HapticsScope({ enabled, children }: HapticsScopeProps) {
  const parentEnabled = useHapticsEnabled();
  const resolved = useMemo(() => (enabled === undefined ? parentEnabled : parentEnabled && enabled), [
    enabled,
    parentEnabled,
  ]);

  return (
    <HapticsEnabledContext.Provider value={resolved}>
      {children}
    </HapticsEnabledContext.Provider>
  );
}

