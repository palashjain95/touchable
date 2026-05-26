/** Touchable brand blue — light: rgb(0, 136, 255), dark: rgb(0, 145, 255) */
export const DEFAULT_PRIMARY_LIGHT_RGB = { r: 0, g: 136, b: 255 } as const;
export const DEFAULT_PRIMARY_DARK_RGB = { r: 0, g: 145, b: 255 } as const;
export const DEFAULT_PRIMARY_LIGHT_HEX = "#0088ff";
export const DEFAULT_PRIMARY_DARK_HEX = "#0091ff";

const DEMO_PRIMARY_STYLE_ID = "touchable-demo-primary";

let lightOverride: string | null = null;
let darkOverride: string | null = null;

function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

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

function writePrimaryStyles(light: string, dark: string) {
  const el = ensureStyleEl();
  el.textContent = `
:root {
  --primary: ${light};
  --ring: ${light};
  --accent-hover: ${hoverFor(light)};
}
:root.dark {
  --primary: ${dark};
  --ring: ${dark};
  --accent-hover: ${hoverFor(dark)};
}
`.trim();
}

function effectiveLight() {
  return lightOverride ?? DEFAULT_PRIMARY_LIGHT_HEX;
}

function effectiveDark() {
  return darkOverride ?? DEFAULT_PRIMARY_DARK_HEX;
}

export function primaryForTheme(dark = isDarkMode()) {
  return dark ? effectiveDark() : effectiveLight();
}

function renderPrimaryStyles() {
  writePrimaryStyles(effectiveLight(), effectiveDark());
}

/** Apply theme defaults (demo resets on full page reload). */
export function applyDefaultPrimary() {
  lightOverride = null;
  darkOverride = null;
  renderPrimaryStyles();
}

export function applyPrimaryFromHex(hex: string) {
  if (isDarkMode()) {
    darkOverride = hex;
  } else {
    lightOverride = hex;
  }
  renderPrimaryStyles();
}
