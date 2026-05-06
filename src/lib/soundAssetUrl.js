/**
 * `public/sounds/` 内のファイル URL（Vite の `base` 付き）。
 * 例: `View_from_the_Fifth_Floor.mp3` → `${BASE_URL}sounds/View_from_the_Fifth_Floor.mp3`
 */
export function soundAssetUrl(fileName) {
  if (fileName == null || typeof fileName !== "string") return fileName;
  const name = fileName.replace(/^\/+/, "").replace(/\\/g, "/");
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  return `${base}sounds/${name}`;
}
