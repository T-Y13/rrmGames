/**
 * `public` 配下の URL（`/images/...`）を Vite の `base` に合わせて解決する。
 * `/images/` で始まらない値はそのまま返す。
 *
 * 例: `BASE_URL` が `/` のとき dev では often `http://localhost:5173/images/taxi.png` になる。
 * `BASE_URL` が `/app/` のときは `http://localhost:5173/app/images/taxi.png`。
 *
 * ── 拡張子の正規化（case-sensitive deploy） ──
 * コード側は常に小文字拡張子（`.png`）で書く。ここで拡張子だけを強制的に lowercase にそろえ、
 * OS によっては実ファイルが `.PNG` でもリクエスト URL は `.png` になる。
 * **実運用では `public/` 配下の拡張子も小文字にリネームするのが確実**（Linux サーバでは
 * `.PNG` と `.png` が別ファイル扱いになるため）。
 */
export function publicAssetUrl(path) {
  if (path == null || typeof path !== "string") return path;
  const s = path.trim();
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("data:") || s.startsWith("blob:")) return s;
  if (!s.startsWith("/images/")) return s;
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  let rel = s.replace(/^\//, "");
  rel = rel.replace(/(\.)([^./\\]+)$/, (_, dot, ext) => dot + ext.toLowerCase());
  return `${base}${rel}`;
}
