import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  configureHaptics,
  getHapticsConfig,
  withHapticPress,
  hapticLightImpact,
} from "./haptics";

describe("haptics", () => {
  beforeEach(() => {
    configureHaptics({ enabled: true });
  });

  it("configureHaptics toggles global enabled flag", () => {
    expect(getHapticsConfig().enabled).toBe(true);
    configureHaptics({ enabled: false });
    expect(getHapticsConfig().enabled).toBe(false);
  });

  it("withHapticPress skips handlers when globally disabled", () => {
    configureHaptics({ enabled: false });
    const onClick = vi.fn();
    const props = withHapticPress({ onClick, haptic: "light" }, "light") as {
      onClick?: (event: { button: number }) => void;
      onPointerDown?: unknown;
    };
    props.onClick?.({ button: 0 });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(props.onPointerDown).toBeUndefined();
  });

  it("withHapticPress adds pointer and click handlers when enabled", () => {
    const onClick = vi.fn();
    const onPointerDown = vi.fn();
    const props = withHapticPress({ onClick, onPointerDown, haptic: "light" }, "light") as {
      onClick?: unknown;
      onPointerDown?: unknown;
    };
    expect(typeof props.onClick).toBe("function");
    expect(typeof props.onPointerDown).toBe("function");
  });

  it("withHapticPress respects haptic none", () => {
    const props = withHapticPress({ haptic: "none" }, "light") as {
      onClick?: unknown;
      onPointerDown?: unknown;
    };
    expect(props.onClick).toBeUndefined();
    expect(props.onPointerDown).toBeUndefined();
  });

  it("withHapticPress skips disabled controls", () => {
    const props = withHapticPress({ disabled: true }, "light") as { onClick?: unknown };
    expect(props.onClick).toBeUndefined();
  });

  it("hapticLightImpact does not throw without Capacitor", () => {
    expect(() => hapticLightImpact()).not.toThrow();
  });
});
