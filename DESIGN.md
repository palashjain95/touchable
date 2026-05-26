# Touchable Design System

**Beautiful UI that reads.**

This document defines the principles, tokens, and conventions behind Touchable.

---

## Philosophy

I built Touchable because I believe **beautiful design and readable design are the same thing**. Typography, spacing, contrast, and interaction should work together, not compete.

Touchable is for interfaces that feel **modern and bright**, stay **easy to scan**, and **feel good under the thumb**: on a phone, one-handed, in normal light.

---

## Design principles

### 1. Beautiful and readable
Beauty lives in proportion, hierarchy, and restraint, not visual noise. Every surface should be legible. Every accent should mean something.

### 2. Touch first
- Default tap target: **44px** (`h-11`)
- Compact tap target: **36px** (`h-9`): use intentionally, not everywhere
- Press feedback on `:active`, not hover-only affordances
- Hover effects are a desktop enhancement; hidden on touch devices (`@media (hover: none)`)

### 3. Crisp and simple
- **1px rim** on interactive surfaces (`--border-default`)
- Consistent radius scale: don't invent new corners per screen
- Few variants, strong defaults
- Compose up; don't configure down

### 4. Clear hierarchy
Text tiers:
- **Primary** (`--fg-primary`): headlines, main content
- **Secondary** (`--fg-secondary`): supporting copy
- **Tertiary** (`--fg-tertiary`): placeholders, metadata

One obvious primary action per screen. Semantic color for status, not decoration.

### 5. Modern and bright
Light-first palettes. Confident accent. Dark mode that stays legible, not muddy.

### 6. Press, don't decorate
Feedback confirms action. Ornament doesn't compete with content.
- Interaction layer shifts on press
- Subtle scale on cards and pills (`active:scale-[0.98]`)
- Fast transitions (**150ms**); instant on active
- Content always sits above FX layers (`z-30`)

---

## Inspiration

I'm inspired by products where **design shows up in the small things**.

**Lovable** is a reference point for me: beautifully designed, with care visible in every component, not just marketing pages. That consistency is system design. Touchable applies that same discipline to reusable primitives, with my own emphasis on touch, readability, and crisp simplicity.

---

## Context: Liquid Glass

Apple's **Liquid Glass** (2025) is a beautiful direction: expressive materials, depth, and translucency used with real craft. It also surfaced an honest conversation: as interfaces get richer, **readability, simplicity, and touch clarity** can need extra attention.

Touchable explores a different emphasis: still beautiful, still modern: **defined edges, strong hierarchy, touch-first interaction**.

I'm not anti-Apple. I'm **pro-readability, pro-simplicity, pro-touch, and pro-beautiful design**.

---

## Anti-patterns

Avoid in Touchable-based UIs:

- Tap targets below 36px without strong reason
- Hover-only affordances on mobile-critical flows
- Low-contrast gray-on-gray body text
- Decorative blur with no functional purpose
- Many button variants with no clear use case
- Multiple competing primary actions on one screen

---

## Architecture

Touchable is built in layers:

```
Tokens (CSS variables)
    ↓
FX stack (rim, interaction, shadow: shared recipe)
    ↓
Primitives (Button, Card, Pill, Tabs)
    ↓
Patterns (BottomSheet rows, form shells: later)
    ↓
App UI (your product, not part of this library)
```

### FX stack (internal)

Every tactile surface (Button, Card, Pill) shares a layered model:

| Layer | Purpose |
|-------|---------|
| Shell | Base fill + semantic color |
| drop-shadow | Lift off the page |
| interaction | Hover/press tint (opacity) |
| spotlights | Top/bottom edge light |
| dome-overlay | Subtle gradient |
| rim | **1px crisp inset border** |
| Content | Text/icons at `z-30` |

The rim and interaction layers are the identity. Depth is used sparingly.

---

## Tokens

Import `@palashjain/touchable/styles.css` in your app.

### Color: semantic text

| Token | Use |
|-------|-----|
| `--fg-primary` | Headlines, main content |
| `--fg-secondary` | Supporting copy |
| `--fg-tertiary` | Placeholders, metadata |

### Color: surfaces

| Token | Use |
|-------|-----|
| `--background` | Page background |
| `--foreground` | Default text |
| `--primary` | Brand accent |
| `--bg-translucent` | Neutral component shells |
| `--bg-inverse` | Inverse CTA fill |

### Color: semantic status

| Token | Use |
|-------|-----|
| `--destructive` | Errors, destructive actions |
| `--success` | Positive status |
| `--warning` | Caution status |
| `--affirmative-primary` | Confirm / positive actions |

### Structure

| Token | Value | Use |
|-------|-------|-----|
| `--border-default` | `1px` | Crisp rim on all surfaces |
| `--radius` | `0.75rem` | Base radius |
| `--shadow-button-neutral` | - | Neutral button/card elevation |
| `--shadow-button-accent` | - | Primary/accent elevation |
| `--shadow-switch-track` | - | Tab track, segmented controls |

### Typography

| Token | Use |
|-------|-----|
| `--font-body` | UI copy, buttons, labels (Inter) |
| `--font-display` | Headlines: same Inter stack; use `font-semibold` + `tracking-tight` for hierarchy |

Headlines do not use a separate display face. One sans-serif stack keeps UI text legible at every size.

### Motion

| Convention | Value |
|------------|-------|
| Standard transition | `150ms ease-in-out` |
| Active state | `duration-0` on press |
| Card/pill press scale | `active:scale-[0.995]` / `0.98` |
| Spring easing | `--ease-spring` |

---

## Touch conventions

| Element | Height | Notes |
|---------|--------|-------|
| Button (default) | 44px (`h-11`) | Full-width on mobile forms |
| Button (compact) | 36px (`h-9`) | Dense toolbars, inline actions |
| Tab trigger | 36px (`h-9`) | Full-width list on mobile |
| Bottom sheet row | 44px (`h-11`) | Menu items, actions |
| Round icon button | 36-48px | sm(28) md(32) default(36) lg(48) |
| Pill | 24px min (`min-h-6`) | Chips; interactive when tappable |
| InputField (compact) | 32px (`h-8`) | Settings, dense forms |
| InputField (default) | 44px (`h-11`) | Primary form fields |
| SearchField (field) | 44px (`h-11`) | Full-width search rows |
| SearchField (pill) | 48px (`h-12`) | Toolbar search chips |
| Dropdown / Combobox (field) | 36px (`h-9`) | Form selects (compact trigger) |

Safe area: respect `env(safe-area-inset-*)` on mobile shells.

---

## Component variants

### Button

| Variant | When to use |
|---------|-------------|
| `Button` (Primary) | Main action on screen |
| `ButtonNeutral` | Secondary action |
| `ButtonTertiary` | Low emphasis, inline |
| `ButtonOutline` | Secondary with accent border |
| `ButtonDestructive` | Delete, stop, irreversible |
| `ButtonAffirmative` | Confirm, positive secondary |
| `ButtonInverse` | CTA on dark/marketing surfaces |
| `ButtonIcon` | Toolbars, headers, tab bar (`aria-label` required) |
| `ButtonDisc` | Colour swatch, compact disc actions (`aria-label` required) |
| `ButtonLink` | Inline text navigation (`--fg-link`) |
| `ButtonIconLinkLabeled` | Icon + label link row |

Sizes: `default` (44px), `compact` (36px), `widget` (primary only).

Label weight: **`font-normal` (400)** on all button variants—including primary, neutral, links, and disc labels. Use `font-semibold` for page headlines, not for button copy.

### Card

| Option | When to use |
|--------|-------------|
| `moderate` (default) | Standard content |
| `success` / `warning` / `critical` | Status callouts |
| `featured` / `featured-soft` | Highlighted content |
| `interactive` | Tappable row: requires `onClick`, accessible name, Enter/Space keyboard |

Sizes:

| Size | Radius | Use |
|------|--------|-----|
| `default` / `rectangle` | `rounded-3xl` | Calendar events, dashboard panels |
| `compact` | `rounded-xl` | Piece link rows, list items (clickable or static) |
| `portrait` | `rounded-xl` | Square practice tiles: add `aspect-square` on body |
| `4xl` | `rounded-4xl` | Hero widgets |
| `tray` | `rounded-full` | Horizontal pill strips |

### Pill

| Variant | When to use |
|---------|-------------|
| `PillNeutral` | Labels, metadata |
| `PillAccent` | Selected filter, emphasis |
| Interactive | Tappable filter chip |

### Tabs

| Part | Notes |
|------|-------|
| `TabsList` | Full-width on mobile, inline on desktop |
| `TabsTrigger` | 36px height, sliding indicator |
| `TabsContent` | Focus ring on keyboard nav |

### InputField

| Option | Notes |
|--------|-------|
| `compact` | `h-8`, `rounded-lg`: settings, auth-style rows |
| `default` | `h-11`, `rounded-xl`: primary forms |
| `invalid` | Sets `aria-invalid` + destructive border (`.input-field`) |

Always pair with a visible `<label htmlFor="id">`. Use `aria-describedby` for error text. Prefer `InputField` over ad-hoc input classes.

Shell styling lives in `.input-field` in `tokens.css`; component adds typography, focus ring, and disabled states.

### SearchField

| Variant | Notes |
|---------|-------|
| `field` | Full-width row, `h-11`, `rounded-xl` |
| `pill` | Toolbar chip, `h-12`, `rounded-full` |

`role="search"` wrapper. Pass `aria-label` or rely on `placeholder` as fallback label.

### Dropdown / Combobox

| Part | Notes |
|------|-------|
| `DropdownTrigger` / `ComboboxTrigger` | `variant="field"` (form) or `variant="pill"` (filters) |
| `DropdownContent` / `ComboboxContent` | Token-backed menu panel |
| `DropdownItem` / `ComboboxItem` | Highlight + check indicator |

`Combobox` is an export alias for `Dropdown` (Radix Select, combobox role on trigger). Use for **fixed option lists**. Searchable typeahead (composer pickers, etc.) stays in the app layer (popover + filter).

---

## Icon scale

| Size | Pixels | Use |
|------|--------|-----|
| xs | 12px | Chip ornaments |
| sm | 16px | Dense inline UI |
| md | 20px | Buttons, list items (default) |
| lg | 24px | Section headers |
| xl | 32px | Empty states |
| 2xl | 40px | Hero illustrations |

Use `<Icon as={SomeIcon} size="md" />`: avoid arbitrary icon sizes.

---

## Accessibility

| Area | Practice |
|------|----------|
| **Buttons** | `focus-visible:ring-2` on all `btn-primitive` surfaces |
| **ButtonIcon / ButtonDisc** | Accessible name required (`aria-label`) |
| **InputField** | Visible `<label htmlFor>`; `invalid` or `aria-invalid`; `aria-describedby` for errors |
| **SearchField** | `aria-label` or meaningful `placeholder` |
| **Dropdown / Combobox** | `aria-label` on trigger when no visible label; form fields use `id` + `<label htmlFor>` |
| **Interactive Card** | `onClick` + `aria-label` (or visible text); Enter/Space wired when `onClick` is set |
| **Interactive Pill** | `pressableDivProps({ onClick })` + `aria-label` when needed |
| **Icon** | Decorative only (`aria-hidden`); never the sole label |
| **Tabs** | Radix handles roving focus and `aria-selected` |

Disabled states: reduced opacity + no press feedback. Prefer visible labels over placeholder-only forms.

`prefers-reduced-motion`: not yet applied library-wide; avoid decorative-only motion in product UI until token support lands.

---

## Versioning

Touchable follows semver. v0.x may have breaking API changes while the foundation stabilizes.

---

*Built with care in the small things.*
