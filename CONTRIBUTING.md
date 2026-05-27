# Contributing to Touchable

Thanks for helping improve Touchable. This is a small, opinionated design library: changes should align with [docs/DESIGN.md](./docs/DESIGN.md) and [AGENTS.md](./AGENTS.md).

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
6. Update `docs/DESIGN.md` variants table
7. Add entry to `CHANGELOG.md` under `[Unreleased]`

---

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short summary>
```

| Type | Use for |
|------|---------|
| `feat` | New feature or public API |
| `fix` | Bug fix (not `bug`) |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code change, not feat/fix |
| `perf` | Performance |
| `test` | Tests only |
| `build` | Build, deps, tooling |
| `ci` | CI / GitHub Actions |
| `chore` | Maintenance |

Breaking changes: `feat!:` or `BREAKING CHANGE:` in the body. See [.cursor/rules/commits.mdc](./.cursor/rules/commits.mdc).

Say **commit** in Cursor to auto-draft and create a commit (skill: [.cursor/skills/commit/SKILL.md](./.cursor/skills/commit/SKILL.md)). Say **prepare commit message** to draft only.

---

## PR checklist

- [ ] Follows design principles (44px targets, 1px rims, press feedback)
- [ ] Tokens updated in both light and dark if colors changed
- [ ] Demo page added or updated for public API changes
- [ ] Smoke test added or updated
- [ ] `npm run ci` passes locally
- [ ] Commit messages follow Conventional Commits (`feat`, `fix`, `docs`, etc.)
- [ ] `CHANGELOG.md` updated
- [ ] No demo code exported from `src/index.ts`
- [ ] No `@/` aliases in library source

---

## Scope

Keep PRs focused. Touchable v0.x is intentionally small: prefer extending existing primitives over adding new component families without discussion.

---

## Release (maintainers)

Pushes to `main` run [.github/workflows/cd.yml](./.github/workflows/cd.yml):

1. Lint, typecheck, test
2. Build library + demo → deploy demo to GitHub Pages
3. `npm publish` for the version in root `package.json`

**npm publish (one-time setup):** npm no longer offers “bypass 2FA” on many accounts. Use [trusted publishing](https://docs.npmjs.com/trusted-publishers/) instead of `NPM_TOKEN`:

1. [npmjs.com](https://www.npmjs.com/package/@palashjain95/touchable) → **Settings** → **Trusted publishing**
2. **GitHub Actions** → repository `palashjain95/touchable`, workflow filename **`cd.yml`**
3. Save, then re-run **CD** on GitHub

CI uses OIDC (`id-token: write`); no long-lived publish token in secrets.

**Bump `version` in `package.json` before merging** when you want a new npm release — the registry does not allow overwriting an existing version.

---

## Questions

Open an issue on GitHub: https://github.com/palashjain95/touchable/issues
