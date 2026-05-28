/**
 * iOS haptics for Touchable (native Capacitor only).
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/playing-haptics
 * @see docs/ios-haptics.md
 */
import { useCallback, useRef } from "react";
import { createContext, useContext } from "react";
import type {
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEvent,
  PointerEventHandler,
} from "react";

export type HapticPressKind = "light" | "medium" | "selection" | "none";

export type HapticNotificationKind = "success" | "warning" | "error";

export type HapticsConfig = {
  /** Master switch. Default: true (still iOS-native only at runtime). */
  enabled: boolean;
};

/**
 * React tree-level haptics gate (scoped override).
 *
 * - `undefined`: no opinion (inherits)
 * - `true/false`: explicit gate for subtree
 */
export const HapticsEnabledContext = createContext<boolean | undefined>(undefined);

/** Returns the effective haptics enabled value for the current React subtree. */
export function useHapticsEnabled(): boolean {
  const scoped = useContext(HapticsEnabledContext);
  return scoped ?? true;
}

const PRESS_HAPTIC_DEDUPE_MS = 80;

let config: HapticsConfig = { enabled: true };
let lastPressHapticAt = 0;

/** Set global haptics on or off for the whole app. */
export function configureHaptics(partial: Partial<HapticsConfig>): void {
  config = { ...config, ...partial };
}

export function getHapticsConfig(): Readonly<HapticsConfig> {
  return config;
}

function shouldFireHaptic(): boolean {
  return config.enabled;
}

function isDisabled(
  disabled?: boolean,
  ariaDisabled?: boolean | "true" | "false",
): boolean {
  return disabled === true || ariaDisabled === true || ariaDisabled === "true";
}

/** Primary tap on iOS WKWebView (touch often reports `button: -1`). */
function isPrimaryPointerEvent(event: Pick<PointerEvent, "button" | "pointerType">): boolean {
  return (
    event.pointerType === "touch" ||
    event.pointerType === "pen" ||
    event.button === 0 ||
    event.button === -1
  );
}

function isPrimaryClickEvent(event: { button: number }): boolean {
  return event.button === 0 || event.button === -1;
}

function firePressHapticOnce(fire: () => void): void {
  const now = Date.now();
  if (now - lastPressHapticAt < PRESS_HAPTIC_DEDUPE_MS) return;
  lastPressHapticAt = now;
  fire();
}

async function triggerNativeHaptic(
  run: (api: {
    Haptics: typeof import("@capacitor/haptics").Haptics;
    ImpactStyle: typeof import("@capacitor/haptics").ImpactStyle;
    NotificationType: typeof import("@capacitor/haptics").NotificationType;
  }) => Promise<void>,
): Promise<void> {
  if (!shouldFireHaptic()) return;
  try {
    const { Capacitor } = await import("@capacitor/core");
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== "ios") return;
    const { Haptics, ImpactStyle, NotificationType } = await import("@capacitor/haptics");
    await run({ Haptics, ImpactStyle, NotificationType });
  } catch {
    // Optional peer missing or native call failed.
  }
}

/** UIControl-style tap (buttons, open-detail rows). */
export function hapticLightImpact(): void {
  void triggerNativeHaptic(({ Haptics, ImpactStyle }) =>
    Haptics.impact({ style: ImpactStyle.Light }),
  );
}

/** Heavier single action (destructive confirm). */
export function hapticMediumImpact(): void {
  void triggerNativeHaptic(({ Haptics, ImpactStyle }) =>
    Haptics.impact({ style: ImpactStyle.Medium }),
  );
}

/** Value changed among discrete options (tabs, segments, toggles, filters). */
export function hapticSelection(): void {
  void triggerNativeHaptic(({ Haptics }) => Haptics.selectionChanged());
}

/** Tab bar + Radix tabs. */
export function hapticTabChange(): void {
  hapticSelection();
}

/** Completed operation or failure — not per tap. */
export function hapticNotification(kind: HapticNotificationKind): void {
  void triggerNativeHaptic(({ Haptics, NotificationType }) => {
    const type =
      kind === "success"
        ? NotificationType.Success
        : kind === "warning"
          ? NotificationType.Warning
          : NotificationType.Error;
    return Haptics.notification({ type });
  });
}

type PressableProps = {
  onPointerDown?: PointerEventHandler<HTMLElement>;
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  "aria-disabled"?: boolean | "true" | "false";
  haptic?: HapticPressKind;
  /**
   * Optional per-subtree gate for React components. Prefer using `HapticsProvider`
   * or `HapticsScope` instead of passing this prop manually.
   */
  hapticsEnabled?: boolean;
};

/**
 * Press feedback for buttons/cards — `pointerDown` + `click` with dedupe so
 * Capacitor iOS gets a reliable gesture when WKWebView skips one of them.
 */
export function withHapticPress<P extends PressableProps>(
  props: P,
  defaultKind: HapticPressKind = "light",
): Omit<P, "haptic" | "hapticsEnabled"> {
  const {
    onPointerDown,
    onClick,
    disabled,
    "aria-disabled": ariaDisabled,
    haptic,
    hapticsEnabled,
    ...rest
  } = props;
  const kind = haptic ?? defaultKind;
  const enabled = shouldFireHaptic() && hapticsEnabled !== false;

  if (kind === "none" || isDisabled(disabled, ariaDisabled) || !enabled) {
    return {
      ...rest,
      disabled,
      "aria-disabled": ariaDisabled,
      onPointerDown,
      onClick,
    } as Omit<P, "haptic" | "hapticsEnabled">;
  }

  const fire =
    kind === "selection"
      ? hapticSelection
      : kind === "medium"
        ? hapticMediumImpact
        : hapticLightImpact;

  const tryFire = () => firePressHapticOnce(fire);

  return {
    ...rest,
    disabled,
    "aria-disabled": ariaDisabled,
    onPointerDown: (event) => {
      if (isPrimaryPointerEvent(event)) tryFire();
      onPointerDown?.(event);
    },
    onClick: (event) => {
      if (isPrimaryClickEvent(event)) tryFire();
      onClick?.(event);
    },
  } as Omit<P, "haptic" | "hapticsEnabled">;
}

/** Tracks pointer/keyboard so selection haptics fire only for user toggles, not programmatic state. */
export function useUserGesture() {
  const fromUser = useRef(false);

  const gestureProps = {
    onPointerDown: (event: PointerEvent) => {
      if (isPrimaryPointerEvent(event)) fromUser.current = true;
    },
    onKeyDown: ((event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") fromUser.current = true;
    }) satisfies KeyboardEventHandler,
  };

  const runIfUserGesture = useCallback((fn: () => void) => {
    if (!fromUser.current) return;
    fromUser.current = false;
    fn();
  }, []);

  return { gestureProps, runIfUserGesture };
}
