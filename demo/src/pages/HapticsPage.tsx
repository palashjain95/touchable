import { Section, CodeBlock, CopyButton } from "../components/docs/DocsPrimitives";

const CONFIG_SNIPPET = `import { configureHaptics, HapticsProvider } from "@palashjain/touchable";

// One line: disable everywhere
configureHaptics({ enabled: false });

// Or from React settings
<HapticsProvider enabled={userPrefs.haptics}>
  <App />
</HapticsProvider>`;

const CAPACITOR_SNIPPET = `npm install @capacitor/core @capacitor/haptics

# iOS native build — test on a physical device
npx cap sync ios`;

const NOTIFICATION_SNIPPET = `import { hapticNotification } from "@palashjain/touchable";

await savePiece(data);
hapticNotification("success");

// on failure
hapticNotification("error");`;

const FEEDBACK_ROWS = [
  ["Light impact", "Standard press, open detail", "Button, ButtonNeutral, Card interactive"],
  ["Medium impact", "Destructive confirm", "ButtonDestructive"],
  ["Selection", "Discrete value changed", "Tabs, Pill interactive, ButtonDisc"],
  ["Notification", "Async outcome", "Your app: save, delete, errors"],
  ["None", "Low emphasis", "ButtonTertiary, haptic=\"none\""],
] as const;

export function HapticsPage() {
  return (
    <div className="min-w-0 space-y-2">
      <header className="mb-8 space-y-3">
        <p className="mb-0 text-xs font-normal tracking-wide text-[var(--primary)]">Touchable</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--fg-primary)]">
          Haptics
        </h1>
        <p className="text-sm leading-relaxed text-[var(--fg-secondary)]">
          Apple Haptics: a new way of feeling the UI when you touch the screen. Touchable blends
          that into every component, so you never add haptics yourself. Native iOS apps (including Capacitor) get them automatically.
        </p>
      </header>

      <Section
        title="Configuration"
        description={'One global switch for your whole app. Per-control override with haptic="none".'}
      >
        <CodeBlock code={CONFIG_SNIPPET} />
        <div className="mt-3">
          <CopyButton text={CONFIG_SNIPPET} label="Copy config" />
        </div>
      </Section>

      <Section title="Feedback map" description="Apple HIG generators mapped to Touchable surfaces.">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border-subtle))] text-[var(--fg-tertiary)]">
                <th className="py-2 pr-4 font-medium">Generator</th>
                <th className="py-2 pr-4 font-medium">When</th>
                <th className="py-2 font-medium">Touchable</th>
              </tr>
            </thead>
            <tbody className="text-[var(--fg-secondary)]">
              {FEEDBACK_ROWS.map(([gen, when, surfaces]) => (
                <tr key={gen} className="border-b border-[hsl(var(--border-subtle))] last:border-0">
                  <td className="py-3 pr-4 font-medium text-[var(--fg-primary)]">{gen}</td>
                  <td className="py-3 pr-4">{when}</td>
                  <td className="py-3">{surfaces}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Rules">
        <ul className="list-inside list-disc space-y-2 text-sm text-[var(--fg-secondary)]">
          <li>One haptic per user action. Do not stack impact and selection on the same tap.</li>
          <li>Press vs outcome: impact on interaction; notification only after async success or failure.</li>
          <li>No haptic on disabled controls.</li>
          <li>Tertiary controls stay silent unless you override.</li>
          <li>Respects iOS Settings → Sounds & Haptics → System Haptics.</li>
        </ul>
      </Section>

      <Section title="Capacitor setup" description="Optional peer dependencies in your native app.">
        <CodeBlock code={CAPACITOR_SNIPPET} />
      </Section>

      <Section title="Notifications in app code" description="For save, delete, and error flows outside components.">
        <CodeBlock code={NOTIFICATION_SNIPPET} />
        <div className="mt-3">
          <CopyButton text={NOTIFICATION_SNIPPET} label="Copy snippet" />
        </div>
      </Section>

      <Section title="Test">
        <p className="text-sm text-[var(--fg-secondary)]">
          Use a physical iPhone with System Haptics on. The simulator is unreliable. Full reference:{" "}
          <code className="text-[var(--fg-tertiary)]">docs/ios-haptics.md</code> in the package.
        </p>
      </Section>
    </div>
  );
}
