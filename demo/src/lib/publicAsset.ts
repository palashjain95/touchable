/** `demo/public/` URL — respects Vite `base` (e.g. `/touchable/` on GitHub Pages). */
export function publicAsset(path: string): string {
  const normalized = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
