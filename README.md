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


Touchable is a small component library built around that idea. Interfaces that feel **modern and bright**, are **easy to read at a glance**, and **reward touch** with clear feedback, especially on mobile.

I want the same bar I see in beautifully crafted products, where the design language holds up in buttons, tabs, and cards, not just hero screens. Touchable is my attempt to make that reusable.



---

## Design principles

| Principle | Summary |
|-----------|---------|
| Beautiful and readable | Visual polish and legibility reinforce each other, not compete. |
| Touch first | 44px targets, obvious press states, built for thumbs. iOS haptics in components ([`docs/ios-haptics.md`](./docs/ios-haptics.md)). |
| Crisp and simple | 1px rims, defined surfaces, few variants, strong defaults. |
| Clear hierarchy | Primary, secondary, tertiary text. One primary action per screen. |
| Modern and bright | Light-first palettes, confident accent, legible dark mode. |

---

## A note on direction

In 2025, Apple introduced **Liquid Glass**: a beautiful, material-rich visual language built around translucency, depth, and layered surfaces. 

It pushed what interfaces can look like, and it started an honest conversation about tradeoffs: when surfaces become more expressive, **readability, simplicity, and touch clarity** can sometimes need extra attention.

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

Browse in the [live demo](https://palashjain95.github.io/touchable/). API reference: [DESIGN.md](./DESIGN.md).

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
