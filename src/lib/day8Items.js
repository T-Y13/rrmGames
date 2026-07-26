import {
  DAY8_FIXED_START_GRANT,
  DAY8_ITEM_IDS,
  DAY8_ITEM_PHASE,
  DAY8_ITEMS,
  getDay8ItemDef,
} from "../constants/day8Items";
import { formatDay8SeatEffectsHint } from "./day8ItemEffects";

function prependItemLogs(newEntries, existing = []) {
  return [...newEntries.slice().reverse(), ...(existing ?? [])].slice(0, 100);
}

let seatEffectSeq = 0;
function nextSeatEffectId(itemId) {
  seatEffectSeq += 1;
  return `${itemId}-${Date.now()}-${seatEffectSeq}`;
}

export function normalizeDay8Inventory(raw) {
  if (!raw || typeof raw !== "object") return {};
  const out = {};
  for (const [id, qty] of Object.entries(raw)) {
    const n = Math.floor(Number(qty));
    if (getDay8ItemDef(id) && n > 0) out[id] = n;
  }
  return out;
}

export function getDay8ItemQty(player, itemId) {
  const inv = normalizeDay8Inventory(player?.day8Inventory);
  return inv[itemId] ?? 0;
}

export function listDay8Inventory(player) {
  const inv = normalizeDay8Inventory(player?.day8Inventory);
  return DAY8_ITEM_IDS.filter((id) => (inv[id] ?? 0) > 0).map((id) => ({
    id,
    qty: inv[id],
    def: DAY8_ITEMS[id],
  }));
}

export function day8ItemUnusableReason(player, itemDef, gs) {
  if (!player || !itemDef) return "使用不可";
  if (player.alive === false) return "使用不可";
  if (getDay8ItemQty(player, itemDef.id) <= 0) return "所持なし";
  if (player.day8ItemUsedThisSeat) return "この手番は使用済";
  if ((player.day8SeatEffects?.length ?? 0) > 0) return "効果発動待ち";

  const when = itemDef.usableWhen ?? [];
  if (!when.includes(player.movePhase)) {
    return itemDef.phase === DAY8_ITEM_PHASE.SLOT ? "スロット手番で使用" : "移動手番で使用";
  }

  if (player.movePhase === "moving") {
    if ((player.skipTurns ?? 0) > 0) return "スキップ中";
    if ((player.pendingTaxiSteps ?? 0) > 0) return "渋滞中";
  }

  if (player.movePhase === "arrived") {
    if ((player.slotTurnsLeft ?? 0) <= 0) return "スロット回数なし";
    const slotPhase = gs?.slotPhase ?? "idle";
    if (!["idle", "completed"].includes(slotPhase)) return "スピン中";
  }

  if (gs?.subPhase !== "day8" || gs?.gamePhase !== "playing") return "8日目のみ";
  return null;
}

/** 所持カード一覧（使用可/不可と理由付き） */
export function listDay8ItemDisplayEntries(player, gs) {
  return listDay8Inventory(player).map((entry) => {
    const usableNow = canUseDay8ItemInPhase(player, entry.def, gs);
    return {
      ...entry,
      usableNow,
      unusableReason: usableNow ? null : day8ItemUnusableReason(player, entry.def, gs),
    };
  });
}

/** 8日目開始：固定配布 + フラグ初期化 */
export function grantDay8StartInventoryToPlayers(players) {
  return players.map((pl) => ({
    ...pl,
    day8Inventory: { ...DAY8_FIXED_START_GRANT },
    day8ItemUsedThisSeat: false,
    day8SeatEffects: [],
  }));
}

export function formatDay8StartGrantLog() {
  const parts = Object.entries(DAY8_FIXED_START_GRANT).map(([id, qty]) => {
    const def = DAY8_ITEMS[id];
    return def ? `${def.emoji}×${qty}` : `${id}×${qty}`;
  });
  return `🎒 8日目アイテム配布：${parts.join(" ")}`;
}

export function canUseDay8ItemInPhase(player, itemDef, gs) {
  return day8ItemUnusableReason(player, itemDef, gs) == null;
}

function buildSeatEffectFromDef(def) {
  return {
    id: nextSeatEffectId(def.id),
    ...def.effect,
    applyOn: def.applyOn,
    applyScope: def.applyScope,
    sourceItemId: def.id,
    label: def.label,
    emoji: def.emoji,
  };
}

/** アイテム使用（効果を席に付与）。gameState を返す。失敗時 null。 */
export function useDay8ItemOnGameState(gs, actorIdx, itemId) {
  if (!gs || gs.subPhase !== "day8" || gs.gamePhase !== "playing") return null;
  if (!Number.isInteger(actorIdx) || actorIdx !== gs.currentPlayerIdx) return null;
  const def = getDay8ItemDef(itemId);
  if (!def || def.phase === DAY8_ITEM_PHASE.DEBUFF) return null;

  const p = gs.players?.[actorIdx];
  if (!canUseDay8ItemInPhase(p, def, gs)) return null;

  const inv = normalizeDay8Inventory(p.day8Inventory);
  const qty = inv[itemId] ?? 0;
  if (qty <= 0) return null;

  const nextInv = { ...inv, [itemId]: qty - 1 };
  if (nextInv[itemId] <= 0) delete nextInv[itemId];

  const log = `🎒 ${p.name}: ${def.emoji}${def.label}を使用（${def.desc}）`;
  const seatEffect = buildSeatEffectFromDef(def);
  const newPlayers = gs.players.map((pl, i) =>
    i !== actorIdx
      ? pl
      : {
          ...pl,
          day8Inventory: nextInv,
          day8ItemUsedThisSeat: true,
          day8SeatEffects: [...(pl.day8SeatEffects ?? []), seatEffect],
        },
  );

  return {
    ...gs,
    players: newPlayers,
    log: prependItemLogs([log], gs.log),
  };
}

/** 手番が次プレイヤーへ移ったとき、incoming の席状態をリセット */
export function resetDay8ItemSeatForPlayer(player) {
  if (!player) return player;
  return {
    ...player,
    day8ItemUsedThisSeat: false,
    day8SeatEffects: [],
  };
}

export { formatDay8SeatEffectsHint, formatDay8SeatEffectsHint as formatActiveBuffHint } from "./day8ItemEffects";
