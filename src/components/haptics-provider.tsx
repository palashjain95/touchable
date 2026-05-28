import { useEffect, type ReactNode } from "react";

import { configureHaptics, HapticsEnabledContext } from "../lib/haptics";

export type HapticsProviderProps = {
  /** When false, all Touchable haptics are silent. Default: true. */
  enabled?: boolean;
  children: ReactNode;
};

/** Sync React tree haptics preference with `configureHaptics`. */
export function HapticsProvider({ enabled = true, children }: HapticsProviderProps) {
  useEffect(() => {
    configureHaptics({ enabled });
  }, [enabled]);

  return (
    <HapticsEnabledContext.Provider value={enabled}>
      {children}
    </HapticsEnabledContext.Provider>
  );
}
