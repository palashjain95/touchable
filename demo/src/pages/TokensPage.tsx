import type { ReactNode } from "react";
import { Preview, Section } from "../components/docs/DocsPrimitives";

function Why({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-[var(--fg-secondary)]">{children}</p>;
}

function TokenRow({
  token,
  sample,
  note,
}: {
  token: string;
  sample?: ReactNode;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[hsl(var(--border-subtle))] py-3 last:border-0 sm:flex-row sm:items-center sm:gap-4">
      <code className="shrink-0 text-xs text-[var(--fg-tertiary)]">{token}</code>
      <div className="min-w-0 flex-1">{sample}</div>
      {note ? <p className="text-xs text-[var(--fg-tertiary)] sm:max-w-[14rem] sm:text-right">{note}</p> : null}
    </div>
  );
}

const fgSwatches = [
  ["--fg-primary", "Primary", "Headlines, body, labels"],
  ["--fg-secondary", "Secondary", "Supporting copy, descriptions"],
  ["--fg-tertiary", "Tertiary", "Placeholders, timestamps, hints"],
  ["--fg-quaternary", "Quaternary", "Disabled-adjacent, de-emphasized"],
  ["--fg-accent", "Accent", "Links, brand emphasis"],
  ["--fg-inverse", "Inverse", "Text on inverse surfaces"],
] as const;

const surfaceLayers = [
  ["--surface-depth", "Depth", "Recessed wells, code blocks, inset panels"],
  ["--surface-base", "Base", "App chrome, sidebars, preview wells"],
  ["--surface-primary", "Primary", "Page background"],
  ["--surface-secondary", "Secondary", "Cards, menus, elevated panels"],
  ["--surface-inverse", "Inverse", "Dark chips, inverted toolbars"],
] as const;

const semanticColors = [
  ["Primary", "var(--primary)", "Brand, main actions, focus ring"],
  ["Success", "hsl(var(--success))", "Positive status"],
  ["Warning", "hsl(var(--warning))", "Caution, urgency accents"],
  ["Destructive", "hsl(var(--destructive))", "Errors, destructive actions"],
] as const;

const typeScale = [
  ["--text-xs", "0.75rem", "Captions, badges, metadata"],
  ["--text-sm", "0.875rem", "Secondary UI, compact buttons"],
  ["--text-base", "1rem", "Default body"],
  ["--text-lg", "1.125rem", "Comfortable body, compact headlines"],
  ["--text-xl", "1.25rem", "Section titles"],
  ["--text-2xl", "1.5rem", "Page subheads"],
  ["--text-3xl", "1.875rem", "Marketing / hero secondary"],
  ["--text-4xl", "2.25rem", "Hero headlines"],
] as const;

const fontWeights = [
  ["--font-weight-normal", "400", "Body, most UI"],
  ["--font-weight-medium", "500", "Labels, tab triggers"],
  ["--font-weight-semibold", "600", "Headlines, display type"],
  ["--font-weight-bold", "700", "Rare emphasis only"],
] as const;

const lineHeights = [
  ["--leading-tight", "1.25", "Large display type"],
  ["--leading-snug", "1.375", "Headlines"],
  ["--leading-normal", "1.5", "Body default"],
  ["--leading-relaxed", "1.625", "Long-form reading"],
  ["--leading-loose", "2", "Spacious marketing copy"],
] as const;

const tracking = [
  ["--tracking-tight", "-0.025em", "Headlines (font-display)"],
  ["--tracking-normal", "0", "Body"],
  ["--tracking-wide", "0.025em", "Small caps labels"],
  ["--tracking-widest", "0.1em", "Uppercase metadata"],
] as const;

const radii = [
  ["--radius-lg", "0.5rem", "Compact buttons, inputs"],
  ["--radius-xl", "0.75rem", "Cards (compact), dropdowns"],
  ["--radius-2xl", "1rem", "Large buttons"],
  ["--radius-3xl", "1.5rem", "Rectangle cards, panels"],
  ["--radius-4xl", "2rem", "Widget buttons"],
  ["rounded-full", "pill / tray", "Pills, tray cards"],
] as const;

export function TokensPage() {
  return (
    <div className="min-w-0 space-y-2">
      <header className="mb-8 space-y-3">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--fg-primary)]">
          Tokens
        </h1>
        <Why>
          Tokens are the contract between design and code. Touchable is light-first and touch-first:
          warm neutrals, one accent, crisp 1px rims, and a small type scale so screens stay scannable
          on a phone. Use semantic names (<code className="text-[var(--fg-tertiary)]">--fg-primary</code>
          , not raw grays) so dark mode and future themes stay coherent.
        </Why>
      </header>

      <Section
        title="Text hierarchy"
        description="Four foreground tiers. If everything is primary, nothing is."
      >
        <Why>
          Hierarchy is how we keep interfaces readable without adding color noise. Primary carries
          meaning; tertiary is for metadata you can skip when scanning. Avoid gray-on-gray body
          pairs—secondary on a muted surface is the floor for supporting copy.
        </Why>
        <Preview className="mt-4 space-y-0 divide-y divide-[hsl(var(--border-subtle))]">
          {fgSwatches.map(([token, label, use]) => (
            <TokenRow
              key={token}
              token={token}
              note={use}
              sample={
                <p className="text-base font-medium" style={{ color: `var(${token})` }}>
                  {label} — The quick brown fox
                </p>
              }
            />
          ))}
        </Preview>
      </Section>

      <Section
        title="Surface layers"
        description="Background stack from recessed to elevated."
      >
        <Why>
          Surfaces create depth without blur. We stack a few HSL steps on a warm hue (45°) so panels
          feel paper-like in light mode and layered in dark mode. Pick the shallowest layer that
          still separates content—don’t float every block on surface-secondary.
        </Why>
        <Preview className="mt-4 space-y-2">
          {surfaceLayers.map(([token, label, use]) => (
            <div
              key={token}
              className="flex items-center justify-between rounded-xl border border-[hsl(var(--border))] px-4 py-3"
              style={{ background: `hsl(var(${token}))` }}
            >
              <div>
                <p className="text-sm font-medium text-[var(--fg-primary)]">{label}</p>
                <code className="text-xs text-[var(--fg-tertiary)]">{token}</code>
              </div>
              <p className="max-w-[12rem] text-right text-xs text-[var(--fg-secondary)]">{use}</p>
            </div>
          ))}
        </Preview>
      </Section>

      <Section title="Semantic color" description="Status and brand. Not decoration.">
        <Why>
          Primary is your brand accent (overridable in the demo via the colour disc). Success,
          warning, and destructive are reserved for state—card urgency accents, alerts, and
          destructive buttons—not for making lists colourful.
        </Why>
        <Preview className="mt-4 grid gap-4 sm:grid-cols-2">
          {semanticColors.map(([name, color, use]) => (
            <div key={name} className="flex items-center gap-3">
              <div
                className="size-10 shrink-0 rounded-lg border border-[hsl(var(--border))]"
                style={{ background: color }}
              />
              <div>
                <p className="text-sm font-medium text-[var(--fg-primary)]">{name}</p>
                <p className="text-xs text-[var(--fg-tertiary)]">{use}</p>
              </div>
            </div>
          ))}
        </Preview>
      </Section>

      <Section
        title="Typography"
        description="Inter for UI and display. One family, clear roles."
      >
        <Why>
          We use a single sans family (<code className="text-[var(--fg-tertiary)]">--font-body</code>{" "}
          / <code className="text-[var(--fg-tertiary)]">--font-display</code>) so rhythm stays
          consistent. Display is semantic naming for marketing weight (semibold + tight tracking),
          not a second typeface. Mono is for code snippets only.
        </Why>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-medium text-[var(--fg-primary)]">Roles</h3>
            <Preview className="space-y-3">
              <p className="font-display text-2xl font-semibold tracking-tight text-[var(--fg-primary)]">
                Display / page title — 2xl, semibold, tracking-tight
              </p>
              <p className="font-display text-xl font-semibold text-[var(--fg-primary)]">
                Section title — xl, semibold
              </p>
              <p className="text-base text-[var(--fg-primary)]">Body — base, normal weight</p>
              <p className="text-sm text-[var(--fg-secondary)]">Secondary — sm, fg-secondary</p>
              <p className="text-xs text-[var(--fg-tertiary)]">Tertiary / caption — xs, fg-tertiary</p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-[var(--fg-secondary)]">
                Label — 10px, medium, widest tracking
              </p>
            </Preview>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-[var(--fg-primary)]">Type scale</h3>
            <Preview className="space-y-0">
              {typeScale.map(([token, size, use]) => (
                <TokenRow
                  key={token}
                  token={token}
                  note={use}
                  sample={
                    <p className="text-[var(--fg-primary)]" style={{ fontSize: size }}>
                      {size} — Touchable
                    </p>
                  }
                />
              ))}
            </Preview>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-[var(--fg-primary)]">Weight</h3>
            <Preview className="space-y-2">
              {fontWeights.map(([token, weight, use]) => (
                <TokenRow
                  key={token}
                  token={token}
                  note={use}
                  sample={
                    <p className="text-lg text-[var(--fg-primary)]" style={{ fontWeight: weight }}>
                      Weight {weight}
                    </p>
                  }
                />
              ))}
            </Preview>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-[var(--fg-primary)]">Line height</h3>
            <Preview className="space-y-3">
              {lineHeights.map(([token, height, use]) => (
                <div key={token}>
                  <code className="text-xs text-[var(--fg-tertiary)]">{token}</code>
                  <p
                    className="mt-1 max-w-md text-sm text-[var(--fg-primary)]"
                    style={{ lineHeight: height }}
                  >
                    {use}. Multi-line sample at {height} leading for comparison.
                  </p>
                </div>
              ))}
            </Preview>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-[var(--fg-primary)]">Letter spacing</h3>
            <Preview className="space-y-2">
              {tracking.map(([token, value, use]) => (
                <TokenRow
                  key={token}
                  token={token}
                  note={use}
                  sample={
                    <p
                      className="text-lg font-semibold text-[var(--fg-primary)]"
                      style={{ letterSpacing: value }}
                    >
                      Tracking sample
                    </p>
                  }
                />
              ))}
            </Preview>
          </div>
        </div>
      </Section>

      <Section title="Spacing" description="4px base unit via --spacing.">
        <Why>
          <code className="text-[var(--fg-tertiary)]">--spacing: 0.25rem</code> (4px) aligns with
          Tailwind’s default scale. Touch targets use fixed heights (44px / 36px) rather than
          padding hacks so tap areas stay honest on mobile.
        </Why>
        <Preview className="mt-4 flex flex-wrap items-end gap-3">
          {[1, 2, 3, 4, 6, 8].map((n) => (
            <div key={n} className="flex flex-col items-center gap-1">
              <div
                className="rounded bg-[var(--primary)]"
                style={{
                  width: `calc(var(--spacing) * ${n})`,
                  height: `calc(var(--spacing) * ${n})`,
                }}
              />
              <span className="text-xs text-[var(--fg-tertiary)]">{n}×</span>
            </div>
          ))}
        </Preview>
      </Section>

      <Section title="Radius" description="Corners tied to component size, not arbitrary px.">
        <Why>
          Rectangle cards use <code className="text-[var(--fg-tertiary)]">rounded-3xl</code>{" "}
          (1.5rem); compact rows use <code className="text-[var(--fg-tertiary)]">rounded-xl</code>.
          Pills and tray cards are full round. Matching radius to component type keeps the UI feeling
          systematic instead of “rounded because we can.”
        </Why>
        <Preview className="mt-4 flex flex-wrap gap-4">
          {radii.map(([token, label, use]) => (
            <div key={token} className="flex flex-col items-center gap-2">
              <div
                className="size-16 border border-[hsl(var(--border))] bg-[hsl(var(--surface-secondary))]"
                style={
                  token === "rounded-full"
                    ? { borderRadius: "9999px" }
                    : { borderRadius: `var(${token})` }
                }
              />
              <div className="text-center">
                <p className="text-xs font-medium text-[var(--fg-primary)]">{label}</p>
                <p className="text-[10px] text-[var(--fg-tertiary)]">{use}</p>
              </div>
            </div>
          ))}
        </Preview>
      </Section>

      <Section title="Border & rim" description="1px crisp edges on interactive surfaces.">
        <Why>
          <code className="text-[var(--fg-tertiary)]">--border-default: 1px</code> is the Touchable
          signature: buttons and cards get an inset rim, not a heavy drop shadow. Use{" "}
          <code className="text-[var(--fg-tertiary)]">--border-subtle</code> for dividers;{" "}
          <code className="text-[var(--fg-tertiary)]">--border-strong</code> when a separator must
          read clearly.
        </Why>
        <Preview className="mt-4 space-y-3">
          <div className="rounded-xl border border-[hsl(var(--border-subtle))] bg-[hsl(var(--surface-base))] p-4 text-sm">
            border-subtle — dividers, preview wells
          </div>
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-secondary))] p-4 text-sm">
            border — default control outline
          </div>
          <div className="rounded-xl border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface-secondary))] p-4 text-sm">
            border-strong — emphasis separators
          </div>
        </Preview>
      </Section>

      <Section title="Motion" description="Fast, purposeful. Press feedback over hover theatre.">
        <Why>
          Default transition is{" "}
          <code className="text-[var(--fg-tertiary)]">150ms</code> with a standard ease curve. Button
          FX layers snap to zero duration on <code className="text-[var(--fg-tertiary)]">:active</code>{" "}
          so press feels immediate; hover is disabled on touch devices. Spring easing is for
          delight (tabs indicator), not every hover state.
        </Why>
        <Preview className="mt-4 text-sm text-[var(--fg-secondary)]">
          <ul className="list-inside list-disc space-y-1">
            <li>
              <code className="text-xs">--default-transition-duration: 0.15s</code>
            </li>
            <li>
              <code className="text-xs">--ease-spring</code> — tabs, playful micro-interactions
            </li>
            <li>
              <code className="text-xs">--ease-out</code> — menus opening, content appearing
            </li>
          </ul>
        </Preview>
      </Section>

      <Section title="Elevation" description="Shadows for floating layers only.">
        <Why>
          Prefer surface steps and rims over shadow stacks. Production dropdowns use one{" "}
          <code className="text-[var(--fg-tertiary)]">border</code> plus a single outer drop shadow—not{" "}
          <code className="text-[var(--fg-tertiary)]">--shadow-surface-md</code> on top of a border.
          The <code className="text-[var(--fg-tertiary)]">--shadow-surface-*</code> tokens already bake
          in inset and outer rims; adding <code className="text-[var(--fg-tertiary)]">border</code>{" "}
          doubles the edge. Buttons bake depth into FX layers, not surface shadow stacks.
        </Why>
        <Preview className="mt-4 flex flex-wrap gap-4">
          <div className="min-w-[12rem] flex-1 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-secondary))] p-6 shadow-[0_8px_20px_-6px_light-dark(oklch(0_0_0/0.14),oklch(0_0_0/0.45))]">
            <p className="text-sm text-[var(--fg-primary)]">Floating menu</p>
            <p className="mt-1 text-xs text-[var(--fg-tertiary)]">border + one outer shadow (Dropdown)</p>
          </div>
          <div className="min-w-[12rem] flex-1 rounded-xl border-0 bg-[hsl(var(--surface-secondary))] p-6 [box-shadow:var(--shadow-surface-md)]">
            <p className="text-sm text-[var(--fg-primary)]">shadow-surface-md</p>
            <p className="mt-1 text-xs text-[var(--fg-tertiary)]">token only—no extra border</p>
          </div>
        </Preview>
      </Section>
    </div>
  );
}
