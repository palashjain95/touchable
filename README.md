# Touchable

[![Website](https://img.shields.io/badge/Website-jpalash.com-111?style=flat)](https://www.jpalash.com/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Palash_Jain-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/palash-jain-2565b612a/)

**Beautiful UI that reads.**

Touch-first React design system: crisp surfaces, strong hierarchy, and components built for thumbs (not just cursors). Buttons, cards, forms, tabs, tokens, and a Vite demo gallery.

| | |
|---|---|
| **Repository** | `touchable` |
| **Description** | Touch-first React design system. Beautiful UI that reads. |
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
44px default targets. Obvious press states. Built for thumbs, not just cursors. Native iOS haptics built into components (see `docs/ios-haptics.md`).

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

---

## Install

```bash
npm install @palashjain/touchable
```

### Requirements

- React 18+
- Tailwind CSS v4 (consumer app must scan library classes or import prebuilt CSS)

---

## Components (v0.1)

**Demo** — [Components](https://palashjain95.github.io/touchable/) · [Principles](https://palashjain95.github.io/touchable/docs/principles) · [Tokens](https://palashjain95.github.io/touchable/docs/tokens) · [Haptics](https://palashjain95.github.io/touchable/docs/haptics) · [How to use](https://palashjain95.github.io/touchable/docs/how-to-use)

**Reference** — [DESIGN.md](./DESIGN.md)

**Actions & links**  
[Button](./DESIGN.md#button) — `ButtonNeutral`, `ButtonTertiary`, `ButtonOutline`, `ButtonDestructive`, `ButtonAffirmative`, `ButtonInverse`, `ButtonIcon`, `ButtonDisc`, `ButtonLink`, `ButtonIconLinkLabeled`

**Surfaces & navigation**
- [Card](./DESIGN.md#card)
- [Pill](./DESIGN.md#pill)
- [Tabs](./DESIGN.md#tabs)
- [Icon](./DESIGN.md#icon-scale)

**Forms & search**
- [InputField](./DESIGN.md#inputfield)
- [SearchField](./DESIGN.md#searchfield)
- [Dropdown](./DESIGN.md#dropdown--combobox)
- [Combobox](./DESIGN.md#dropdown--combobox)

**Utilities** — `cn`, `pressableDivProps`, `inputFieldClass`

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

## License

MIT
