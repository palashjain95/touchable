# Contributing to Touchable

Thanks for helping improve Touchable. This is a small, opinionated design library: changes should align with [DESIGN.md](./DESIGN.md) and [AGENTS.md](./AGENTS.md).

---

## Setup

```bash
git clone https://github.com/palashjain95/touchable.git
cd touchable
npm install
```

Requires **Node 22+**.

---

## Development

```bash
npm run dev:demo    # Vite gallery at localhost: edit components live
npm run test:watch  # Vitest in watch mode
npm run lint        # ESLint
npm run typecheck   # TypeScript
```

Run the full CI pipeline before opening a PR:

```bash
npm run ci
```

---

## Adding a component

1. Read [AGENTS.md](./AGENTS.md) and [.cursor/agents/component-author.md](./.cursor/agents/component-author.md)
2. Implement in `src/components/`
3. Export from `src/index.ts`
4. Add demo page in `demo/src/pages/`
5. Add smoke test in `src/__tests__/`
6. Update `DESIGN.md` variants table
7. Add entry to `CHANGELOG.md` under `[Unreleased]`

---

## PR checklist

- [ ] Follows design principles (44px targets, 1px rims, press feedback)
- [ ] Tokens updated in both light and dark if colors changed
- [ ] Demo page added or updated for public API changes
- [ ] Smoke test added or updated
- [ ] `npm run ci` passes locally
- [ ] `CHANGELOG.md` updated
- [ ] No demo code exported from `src/index.ts`
- [ ] No `@/` aliases in library source

---

## Scope

Keep PRs focused. Touchable v0.x is intentionally small: prefer extending existing primitives over adding new component families without discussion.

---

## Questions

Open an issue on GitHub: https://github.com/palashjain95/touchable/issues
