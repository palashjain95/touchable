const DEMO_PRIMARY_STYLE_ID = "touchable-demo-primary";

let accentOverride: string | null = null;

function hoverFor(hex: string) {
  return `color-mix(in oklab, ${hex} 88%, white)`;
}

function ensureStyleEl() {
  let el = document.getElementById(DEMO_PRIMARY_STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = DEMO_PRIMARY_STYLE_ID;
    document.head.appendChild(el);
  }
  return el;
}

function removeInjectedPrimary() {
  document.getElementById(DEMO_PRIMARY_STYLE_ID)?.remove();
}

/** Read resolved `--primary` from tokens (lab → hex for `<input type="color">`). */
export function readLibraryPrimaryHex(): string {
  if (typeof document === "undefined") return "#000000";

  const probe = document.createElement("span");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.color = "var(--primary)";
  document.body.appendChild(probe);
  const rgb = getComputedStyle(probe).color;
  probe.remove();

  const match = rgb.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (!match) return "#000000";

  const hex = (n: string) => Number(n).toString(16).padStart(2, "0");
  return `#${hex(match[1])}${hex(match[2])}${hex(match[3])}`;
}

export function hasAccentOverride() {
  return accentOverride !== null;
}

/** User-picked accent only; library tokens when cleared. */
export function applyPrimaryFromHex(hex: string) {
  accentOverride = hex;
  const el = ensureStyleEl();
  el.textContent = `
:root,
.light {
  --primary: ${hex};
  --ring: ${hex};
  --accent-hover: ${hoverFor(hex)};
}
:root.dark,
.dark {
  --primary: ${hex};
  --ring: ${hex};
  --accent-hover: ${hoverFor(hex)};
}
`.trim();
}

export function clearAccentOverride() {
  accentOverride = null;
  removeInjectedPrimary();
}
