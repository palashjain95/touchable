# Touchable

**Beautiful UI that reads.**

Touch-first React design system — crisp surfaces, strong hierarchy, and components built for thumbs (not just cursors). Buttons, cards, forms, tabs, tokens, and a Vite demo gallery.

| | |
|---|---|
| **Repository** | `touchable` |
| **Description** | Touch-first React design system — beautiful UI that reads |
| **Package** | `@palashjain/touchable` (in development) |

---

## Why Touchable?

I care about **readability, simplicity, touch clarity, and beautiful design**, and I think those belong together.

A well-proportioned button. Confident typography. Crisp edges. Generous spacing. That is beautiful design, not decoration for its own sake, but **clarity that feels polished**.

Touchable is a small component library built around that idea. Interfaces that feel **modern and bright**, are **easy to read at a glance**, and **reward touch** with clear feedback, especially on mobile.

I want the same bar I see in beautifully crafted products, where the design language holds up in buttons, tabs, and cards, not just hero screens. Touchable is my attempt to make that reusable.

---

## Inspiration

I'm inspired by products where **design shows up in the small things**: spacing, states, micro-interactions, the quiet consistency across screens.

**Lovable** is one of those products for me. It's beautifully designed end to end, and you can feel it in every component. Nothing feels accidental. That level of care, especially in the details most people skip, is a standard I hold myself to when building Touchable.

This library is my attempt to carry that same discipline into something reusable: **beautiful, readable, touch-first primitives** I can reach for on every project.

---

## Design principles

### Beautiful and readable
Visual polish and legibility should reinforce each other, not compete.

### Touch first
44px default targets. Obvious press states. Built for thumbs, not just cursors.

### Crisp and simple
1px rims. Defined surfaces. Few variants, strong defaults. Restraint as a design choice.

### Clear hierarchy
Primary, secondary, and tertiary text. One clear primary action per screen. Semantic color when it means something.

### Modern and bright
Light-first palettes, confident accent color, dark mode that stays legible. Modern doesn't have to mean gray or flat: it can mean **clear and polished**.

---

## A note on direction

In 2025, Apple introduced **Liquid Glass**: a beautiful, material-rich visual language built around translucency, depth, and layered surfaces. It pushed what interfaces can look like, and it started an honest conversation about tradeoffs: when surfaces become more expressive, **readability, simplicity, and touch clarity** can sometimes need extra attention.

Touchable is my take on that balance: still beautiful, still modern: with **defined edges, strong hierarchy, and touch-first interaction** at the center.

I'm not anti-Apple. I'm **pro-readability, pro-simplicity, pro-touch, and pro-beautiful design**.

Different emphasis. Shared respect for craft.

---

## Install

```bash
npm install @palashjain/touchable
```

Import styles in your app entry:

```tsx
import "@palashjain/touchable/styles.css";
```

Use components:

```tsx
import {
  Button,
  ButtonNeutral,
  Card,
  InputField,
  Dropdown,
  Combobox,
  SearchField,
  Pill,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Icon,
} from "@palashjain/touchable";
```

### Requirements

- React 18+
- Tailwind CSS v4 (consumer app must scan library classes or import prebuilt CSS)

---

## Components (v0.1)

### Actions & links

| Component | Description |
|-----------|-------------|
| `Button` | Primary action: 44px default, press feedback |
| `ButtonNeutral` | Secondary action: translucent shell, crisp rim |
| `ButtonTertiary` | Ghost / low-emphasis action |
| `ButtonOutline` | Primary border accent on neutral fill |
| `ButtonDestructive` | Delete, stop, irreversible actions |
| `ButtonAffirmative` | Confirm / positive secondary actions |
| `ButtonInverse` | Inverse fill for dark surfaces |
| `ButtonIcon` | Round icon button (`aria-label` required) |
| `ButtonDisc` | Colour swatch / compact disc control |
| `ButtonLink` | Text link (`--fg-link`) |
| `ButtonIconLinkLabeled` | Icon link + text label |

### Surfaces & navigation

| Component | Description |
|-----------|-------------|
| `Card` | Content surface: sizes, urgency, optional interactive press |
| `Pill` | Tags, filters, status chips |
| `Tabs` | Segmented control with sliding indicator |
| `Icon` | Standardized icon sizing (xs → 2xl), decorative |

### Forms & search

| Component | Description |
|-----------|-------------|
| `InputField` | Native text/date inputs (`compact` h-8, `default` h-11) |
| `SearchField` | Search with icon (`pill` \| `field`) |
| `Dropdown` | Fixed-option select (Radix, `role="combobox"` on trigger) |
| `Combobox` | Alias for `Dropdown` (same API, clearer name in forms) |

### Utilities

| Export | Description |
|--------|-------------|
| `cn` | `clsx` + `tailwind-merge` |
| `pressableDivProps` | Keyboard + `role="button"` for custom pressable rows |
| `inputFieldClass` | Class string for styled native `<input>` |

See [DESIGN.md](./DESIGN.md) for tokens, spacing, touch conventions, accessibility, and the FX model.

**Demo gallery** (run `npm run dev:demo`): Components (`/`), Tokens (`/docs/tokens`), How to use (`/docs/how-to-use`). Each component section includes a **Copy prompt** action for AI tools.

---

## Quick example

```tsx
import "@palashjain/touchable/styles.css";
import { Button, Card, Tabs, TabsList, TabsTrigger, TabsContent } from "@palashjain/touchable";

export function Example() {
  return (
    <Card>
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Overview</TabsTrigger>
          <TabsTrigger value="b">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="a">
          <p>Content with clear hierarchy.</p>
          <Button>Primary action</Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
```

---

## Use with AI tools

Touchable ships docs for humans and AI assistants:

| Tool | How to use |
|------|------------|
| **Cursor** | Copy [`docs/touchable-consumer.mdc`](./docs/touchable-consumer.mdc) into your project's `.cursor/rules/` |
| **Lovable** | Add dependency + paste the starter prompt from [INTEGRATION.md](./INTEGRATION.md) |
| **Claude** | Add `DESIGN.md` and `INTEGRATION.md` to Project Knowledge |

Full copy-paste prompts and setup steps: demo **How to use** page or **[INTEGRATION.md](./INTEGRATION.md)**

---

## Development

```bash
git clone https://github.com/palashjain95/touchable.git
cd touchable
npm install
npm run dev:demo   # gallery at http://localhost:5173
npm run ci         # lint, typecheck, test, build
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the PR checklist.

---

## Contact

**Palash Jain** — designer of Touchable

- GitHub: [github.com/palashjain95](https://github.com/palashjain95)
- LinkedIn: [linkedin.com/in/palash-jain-2565b612a](https://www.linkedin.com/in/palash-jain-2565b612a/)
- Email: [palash95jain@gmail.com](mailto:palash95jain@gmail.com)

Questions, feedback, or collaboration — reach out anytime.

---

## License

MIT © Palash Jain

---

## Links

- Repository: [github.com/palashjain95/touchable](https://github.com/palashjain95/touchable)
- Package: `@palashjain/touchable` (npm, when published)
