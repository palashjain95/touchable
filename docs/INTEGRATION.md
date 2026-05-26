# Adding Touchable to Your Project

This guide covers standard installation and how to use Touchable with **Cursor**, **Lovable**, and **Claude**.

---

## Standard install

### 1. Install the package

```bash
npm install @palashjain95/touchable
```

For local development against a sibling checkout:

```json
{
  "dependencies": {
    "@palashjain95/touchable": "file:../touchable"
  }
}
```

### 2. Import styles (required)

Add once in your app entry (`main.tsx` or `App.tsx`):

```tsx
import "@palashjain95/touchable/styles.css";
```

### 3. Tailwind v4 setup

Touchable components use Tailwind classes. Scan the library in your app CSS:

```css
@import "tailwindcss";
@source "../node_modules/@palashjain95/touchable/dist/**/*.js";
```

For local `file:` dependency during development:

```css
@source "../touchable/src/**/*.{ts,tsx}";
```

### 4. Import components

```tsx
import {
  Button,
  ButtonNeutral,
  ButtonTertiary,
  Card,
  InputField,
  SearchField,
  Dropdown,
  Combobox,
  Pill,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Icon,
} from "@palashjain95/touchable";
```

### 5. Read the design docs

From `node_modules` (or your local link):

- `node_modules/@palashjain95/touchable/docs/DESIGN.md`: principles, tokens, variants
- `node_modules/@palashjain95/touchable/docs/INTEGRATION.md`: this guide

---

## Using with Cursor

### Step 1: Install Touchable

Follow the standard install above.

### Step 2: Copy the consumer rule

Copy [`touchable-consumer.mdc`](./touchable-consumer.mdc) from this package into your project:

```
your-app/.cursor/rules/touchable.mdc
```

The rule sets `alwaysApply: true` so Cursor uses Touchable for all product UI.

### Step 3: Optional: add to your AGENTS.md

```markdown
## UI

Use `@palashjain95/touchable` for all product UI.
Read `node_modules/@palashjain95/touchable/docs/DESIGN.md` (or `../touchable/docs/DESIGN.md` if using file:).
Do not use raw shadcn Button for product screens: use Touchable Button variants.
```

### Step 4: Prompt pattern

When asking Cursor to build a screen:

```
Build this screen using @palashjain95/touchable components only.
Follow docs/DESIGN.md: 44px tap targets, accessibility (labels, aria-label on icon-only controls).
Import styles.css in main.tsx.
One primary Button per screen. Forms: InputField + label, Combobox variant field for selects.
```

### Local file: dependency

Ensure Vite/Tailwind resolves the linked package: add `@source` to sibling `touchable/src` as shown above.

---

## Using with Lovable

### Step 1: Add dependency

Add `@palashjain95/touchable` in Lovable project settings or `package.json`. Until npm publish, use a git dependency URL or paste components manually.

### Step 2: Import styles

Ensure your app entry includes:

```tsx
import "@palashjain95/touchable/styles.css";
```

### Step 3: Starter chat prompt

Paste this at the start of each Lovable session (or pin in project instructions):

```
This project uses Touchable (@palashjain95/touchable) for UI.
Components: Button, ButtonNeutral, Card, InputField, SearchField, Dropdown/Combobox, Pill, Tabs, Icon.
Principles: touch-first (h-11 buttons), crisp 1px rims, clear hierarchy, accessible labels on icon-only controls.
Always import from @palashjain95/touchable: do not generate custom button/card/input styles.
Follow docs/DESIGN.md for tokens, variants, and accessibility.
```

### Step 4: Attach docs/DESIGN.md

For v0.1, paste or attach `docs/DESIGN.md` when adding new UI until Lovable can resolve npm package docs.

### Step 5: Tailwind scan

If styles look unstyled, remind Lovable to add `@source` for Touchable class names in your app CSS.

---

## Using with Claude

### Step 1: Project Knowledge

Upload or attach to your Claude Project:

- `docs/DESIGN.md`: principles, tokens, variants
- `docs/INTEGRATION.md`: this guide
- Demo screenshots or link to deployed demo (post-launch)

### Step 2: Custom instructions

Add to your Claude Project system prompt:

```
UI stack: React + Tailwind v4 + @palashjain95/touchable.
Use Touchable components for all product UI. Import styles.css at app entry.
Follow Touchable design principles: touch-first, crisp edges, clear hierarchy, accessible names on controls.
Main action = Button. Surfaces = Card. Forms = InputField + Combobox/Dropdown. Filters = Pill. Segments = Tabs.
Do not invent alternate button/card/input styling.
```

### Step 3: Per-task prompt

```
Implement [feature] using @palashjain95/touchable. Reference docs/DESIGN.md for variants and accessibility.
Use InputField with <label htmlFor>, Combobox variant field for selects, ButtonNeutral for secondary actions.
Interactive Card rows need onClick, aria-label, and keyboard activation (built-in when onClick is set).
```

### Step 4: Claude Code / terminal

Same as Cursor: copy `docs/touchable-consumer.mdc` into your consumer `.cursor/rules/`, or paste `docs/DESIGN.md` into context.

---

## iOS haptics (Capacitor)

Apple Haptics let you feel the UI when you touch the screen. Touchable builds that into components so you never wire haptics yourself. Native iOS apps (Capacitor) get them automatically when you use `Button`, `Tabs`, `Pill`, `Card`, and the rest.

### Install (native app only)

```bash
npm install @capacitor/core @capacitor/haptics
```

Optional peer dependencies. Web builds work without them.

### Disable globally

```ts
import { configureHaptics } from "@palashjain95/touchable";

configureHaptics({ enabled: false });
```

Or wrap the app:

```tsx
import { HapticsProvider } from "@palashjain95/touchable";

<HapticsProvider enabled={settings.haptics}>
  <App />
</HapticsProvider>
```

### Outcomes (save / delete)

```ts
import { hapticNotification } from "@palashjain95/touchable";

hapticNotification("success"); // after mutation succeeds
hapticNotification("error");   // on failure
```

Full reference: [ios-haptics.md](./ios-haptics.md) and the demo **Haptics** page.

---

## Quick reference

| Need | Use |
|------|-----|
| Main action | `Button` |
| Secondary action | `ButtonNeutral` |
| Low emphasis | `ButtonTertiary` |
| Text / email / date field | `InputField` + `<label htmlFor>` |
| Search | `SearchField` (`pill` \| `field`) |
| Fixed select | `Combobox` or `Dropdown` (`field` in forms, `pill` in filters) |
| Content surface | `Card` |
| Tappable row | `Card` `interactive` + `onClick` + `aria-label` |
| Filter / tag | `Pill` (+ `pressableDivProps` when interactive) |
| Segmented nav | `Tabs` + `TabsList` + `TabsTrigger` |
| Icon sizing | `Icon` with `size="md"` (decorative) |
| Icon-only button | `ButtonIcon` with `aria-label` |
| iOS haptics off | `configureHaptics({ enabled: false })` |
| Save/delete feedback | `hapticNotification("success" \| "error")` |

Run `npm run dev:demo` for the live gallery: **Principles**, **Haptics**, **Components**, **Tokens**, **How to use**.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Components render unstyled | Import `styles.css`; add Tailwind `@source` for library |
| Dark mode broken | Toggle `class="dark"` on `<html>`; tokens include `.dark` block |
| Icons missing | Install optional peer `@heroicons/react` |
| Types not found | Ensure `@palashjain95/touchable` is built (`npm run build` in library) |
