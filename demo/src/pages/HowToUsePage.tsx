import type { ReactNode } from "react";
import { CopyButton, Section } from "../components/docs/DocsPrimitives";

const CONSUMER_RULE = `---
description: Use Touchable design system for all product UI
alwaysApply: true
---

# Touchable

This project uses \`@palashjain/touchable\` for product UI.

## Setup

- Import \`@palashjain/touchable/styles.css\` once in app entry (\`main.tsx\`)
- Import components from \`@palashjain/touchable\`
- Tailwind v4: \`@source "../node_modules/@palashjain/touchable/dist/**/*.js"\`

## Components

| Need | Use |
|------|-----|
| Main action | \`Button\` |
| Secondary | \`ButtonNeutral\` |
| Low emphasis | \`ButtonTertiary\` |
| Surface | \`Card\` |
| Tag / filter | \`Pill\` |
| Text / date field | \`InputField\` + \`<label htmlFor>\` |
| Search | \`SearchField\` |
| Fixed select | \`Combobox\` or \`Dropdown\` |
| Segments | \`Tabs\`, \`TabsList\`, \`TabsTrigger\` |
| Icon-only control | \`ButtonIcon\` with \`aria-label\` |
| Decorative icon | \`Icon\` with \`size="md"\` |

Do **not** use shadcn Button, custom CSS buttons, or one-off card/input styles for product UI.

## Principles

- Default tap target: **h-11 (44px)**. Compact **h-9** only when space is tight
- One primary \`Button\` per screen
- Text hierarchy: \`--fg-primary\`, \`--fg-secondary\`, \`--fg-tertiary\`
- Crisp **1px rims**: surfaces have defined edges
- Press feedback on \`:active\`, not hover-only affordances
- iOS haptics are built into Touchable components; disable with \`configureHaptics({ enabled: false })\`

## Reference

Read \`node_modules/@palashjain/touchable/DESIGN.md\` for tokens, variants, and accessibility.
Read \`node_modules/@palashjain/touchable/docs/ios-haptics.md\` for haptic mapping and rules.`;

const INSTALL_SNIPPET = `npm install @palashjain/touchable

// main.tsx
import "@palashjain/touchable/styles.css";

import {
  Button,
  Card,
  InputField,
  Combobox,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@palashjain/touchable";`;

const TAILWIND_SNIPPET = `@import "tailwindcss";
@source "../node_modules/@palashjain/touchable/dist/**/*.js";`;

const CURSOR_SCREEN_PROMPT = `Build this screen using @palashjain/touchable components only.
Follow DESIGN.md: 44px tap targets, accessibility (labels, aria-label on icon-only controls).
Import styles.css in main.tsx.
One primary Button per screen. Forms: InputField + label, Combobox variant field for selects.
iOS haptics are automatic on native builds; use configureHaptics({ enabled: false }) to disable globally.`;

const LOVABLE_PROMPT = `This project uses Touchable (@palashjain/touchable) for UI.
Components: Button, ButtonNeutral, Card, InputField, SearchField, Combobox/Dropdown, Pill, Tabs, Icon.
Principles: touch-first (h-11 buttons), crisp 1px rims, clear hierarchy, accessible control names.
iOS haptics are built into pressable components; disable with configureHaptics({ enabled: false }).
Always import from @palashjain/touchable: do not generate custom button/card/input styles.
Follow DESIGN.md for tokens, variants, and accessibility.`;

const CLAUDE_KNOWLEDGE_RULE = `UI stack: React + Tailwind v4 + @palashjain/touchable.
Use Touchable components for all product UI. Import styles.css at app entry.
Follow Touchable design principles: touch-first, crisp edges, clear hierarchy, accessible labels.
Main action = Button. Surfaces = Card. Forms = InputField + Combobox. Filters = Pill. Segments = Tabs.
iOS haptics are built in on native iOS/Capacitor; configureHaptics({ enabled: false }) disables globally.
Do not invent alternate button/card/input styling.`;

const CLAUDE_TASK_PROMPT = `Implement [feature] using @palashjain/touchable. Reference DESIGN.md for variants and accessibility.
Use InputField with <label htmlFor>, Combobox for selects, ButtonNeutral for secondary actions.
Interactive Card rows: onClick, aria-label, keyboard (built-in when onClick is set).`;

const AGENTS_SNIPPET = `## UI

Use \`@palashjain/touchable\` for all product UI.
Read \`node_modules/@palashjain/touchable/DESIGN.md\` (or \`../touchable/DESIGN.md\` if using file:).
Do not use raw shadcn Button for product screens: use Touchable Button variants.`;

function CopyActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

export function HowToUsePage() {
  return (
    <div className="min-w-0">
      <h1 className="mb-6 font-display text-3xl font-semibold text-[var(--fg-primary)]">
        How to use Touchable
      </h1>

      <Section title="npm" description="Install the package and import styles once in your app entry.">
        <CopyActions>
          <CopyButton text={INSTALL_SNIPPET} label="Copy install snippet" />
        </CopyActions>
      </Section>

      <Section title="Tailwind v4" description="Scan library classes in your app CSS.">
        <CopyActions>
          <CopyButton text={TAILWIND_SNIPPET} label="Copy Tailwind config" />
        </CopyActions>
      </Section>

      <Section
        title="Cursor"
        description="Paste the knowledge rule into .cursor/rules/touchable.mdc, then copy the screen prompt when building UI."
      >
        <CopyActions>
          <CopyButton text={CONSUMER_RULE} label="Copy knowledge rule" />
          <CopyButton text={CURSOR_SCREEN_PROMPT} label="Copy screen prompt" />
          <CopyButton text={AGENTS_SNIPPET} label="Copy AGENTS.md snippet" />
        </CopyActions>
      </Section>

      <Section title="Lovable" description="Paste at the start of each session or pin in project instructions.">
        <CopyActions>
          <CopyButton text={LOVABLE_PROMPT} label="Copy prompt" />
        </CopyActions>
      </Section>

      <Section
        title="Claude"
        description="Add DESIGN.md to Project Knowledge, then copy the knowledge rule and per-task prompt."
      >
        <CopyActions>
          <CopyButton text={CLAUDE_KNOWLEDGE_RULE} label="Copy knowledge rule" />
          <CopyButton text={CLAUDE_TASK_PROMPT} label="Copy task prompt" />
        </CopyActions>
      </Section>
    </div>
  );
}
