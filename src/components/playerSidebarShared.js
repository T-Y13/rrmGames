export const PLAYER_FRAME_COLORS = [
  { border: "border-rose-500/70", activeBorder: "border-rose-400", activeBg: "bg-rose-500/10" },
  { border: "border-sky-500/70", activeBorder: "border-sky-400", activeBg: "bg-sky-500/10" },
  { border: "border-amber-500/75", activeBorder: "border-amber-400", activeBg: "bg-amber-500/10" },
  { border: "border-emerald-500/70", activeBorder: "border-emerald-400", activeBg: "bg-emerald-500/10" },
];

export const ARROW_RAIL_PX = 52;
export const TRANSITION_MS = "0.45s";
export const TRANSITION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** ロビー席順（先頭＝先行）で並べ、gameState.players の並びがずれていても表示を揃える */
export function orderPlayersBySeat(players, seatOrderIds) {
  const list = players ?? [];
  if (!Array.isArray(seatOrderIds) || seatOrderIds.length === 0) return [...list];
  const byId = new Map(list.map((p) => [p.id, p]));
  const out = [];
  for (const id of seatOrderIds) {
    const p = byId.get(id);
    if (p) {
      out.push(p);
      byId.delete(id);
    }
  }
  for (const p of list) {
    if (byId.has(p.id)) out.push(byId.get(p.id));
  }
  return out;
}
