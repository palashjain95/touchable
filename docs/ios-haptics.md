# iOS haptics (Apple HIG)

Native iOS only (`Capacitor` + `@capacitor/haptics`). Respects **Settings → Sounds & Haptics → System Haptics**.

Implementation: `src/lib/haptics.ts`.

## Philosophy

Apple Haptics let you feel the UI when you touch the screen. Touchable builds that into components so you never add haptics explicitly. On native iOS (Capacitor), they run automatically. Turn off with `configureHaptics({ enabled: false })`.

## Configuration

Haptics are **on by default** on native iOS. Disable everywhere with one call:

```ts
import { configureHaptics } from "@palashjain/touchable";

configureHaptics({ enabled: false });
```

Or wrap the app (e.g. from user settings):

```tsx
import { HapticsProvider } from "@palashjain/touchable";

<HapticsProvider enabled={userPrefs.haptics}>
  <App />
</HapticsProvider>
```

Per-control override: `haptic="none"` on a pressable component.

## Feedback types

| Apple generator | When to use | Touchable surfaces |
|-----------------|-------------|-------------------|
| **Light impact** | Standard control press; open a detail screen | `Button`, `ButtonNeutral*`, `ButtonOutline`, icon buttons (default); `Card` when `interactive` |
| **Medium impact** | Heavier single action (destructive) | `ButtonDestructive`; `ButtonNeutralIcon` `tone="destructive"` |
| **Selection** | Discrete value changed, same context | `Tabs`, interactive `Pill`, `ButtonDisc` |
| **Notification** | Operation finished (success / warning / error) | App code: mutations (`hapticNotification` in `onSuccess` / `onError`) |
| **None** | Low emphasis; avoid noise | `ButtonTertiary*`; `haptic="none"` override |

## Rules

1. **One haptic per user action** — don't stack impact + selection on the same tap.
2. **Press vs outcome** — impact/selection on interaction; notification only after async success/failure.
3. **No haptic on disabled** controls (`disabled` / `aria-disabled`).
4. **Programmatic updates** — use `useUserGesture()` for toggles that can change from code.
5. **Tertiary controls stay silent** unless explicitly overridden.
6. **Web / Android / Electron** — no-op (no vibration shim unless added later).

## Capacitor setup

Optional peer dependencies in your app:

```bash
npm install @capacitor/core @capacitor/haptics
```

Touchable uses dynamic imports; the app runs on web without them.

## Test

Physical iPhone, System Haptics on. Simulator is unreliable.
