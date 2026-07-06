import {
  PROXY_SLOT_ACTOR_STAT_RATE,
  PROXY_SLOT_MAX_BET_RATE,
  PROXY_SLOT_MIN_SELECTABLE_MONEY,
  SLOT_BETS,
} from "../constants/gameBalance";

function isBoardPlayingForProxy(p) {
  return !!(p && p.alive !== false && p.movePhase === "moving");
}

/** 8日目スロット：代理（幽霊等）が他プレイヤーの資金で引くコンテキスト */

export function getSlotProxyContext(gs) {
  const actorIdx = gs?.currentPlayerIdx ?? 0;
  const actor = gs?.players?.[actorIdx] ?? null;
  const proxyIdx =
    typeof gs?.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0
      ? gs.proxySlotTargetIdx
      : null;
  const target = proxyIdx != null && gs?.players?.[proxyIdx] ? gs.players[proxyIdx] : null;
  const isProxyPull = proxyIdx != null && target != null && proxyIdx !== actorIdx;
  return {
    actorIdx,
    actor,
    proxyIdx,
    target,
    isProxyPull,
    moneyPlayer: target ?? actor,
  };
}

export function isSlotSpinningPhase(gs, localSpinning = false) {
  return (gs?.slotPhase ?? "idle") === "spinning" || localSpinning;
}

export function isLocalPlayerProxyTarget(gs, myId) {
  if (!myId || !gs) return false;
  const { isProxyPull, target } = getSlotProxyContext(gs);
  return isProxyPull && target?.id === myId;
}

/** 結果確定後の代理被害スティング用キー（同一スピンで1回） */
export function getProxySpinStingKey(gs) {
  const actor = gs?.players?.[gs?.currentPlayerIdx ?? 0];
  const spin = actor?.lastSpinResult?.spin;
  const settled = gs?.slotResultSettledAt;
  if (typeof spin !== "number" || !settled) return "";
  return `${spin}-${settled}`;
}

export const POST_SPIN_VICTIM_STING_MS = 3000;

/** 代理スロット：その時点の所持金から最大掛け金（30%・切捨て） */
export function computeProxySlotMaxBet(money) {
  const m = Number(money);
  if (!Number.isFinite(m) || m <= 0) return 0;
  return Math.floor(m * PROXY_SLOT_MAX_BET_RATE);
}

/** 代理スロット：現在の所持金で選べるベット額一覧（スピンごとに再計算） */
export function getProxySlotAllowedBets(money, bets = SLOT_BETS) {
  const cap = computeProxySlotMaxBet(money);
  return bets.filter((bet) => bet <= cap);
}

/** 標的選択時：すごろく中かつ所持金が500G超 */
export function canSelectAsProxySlotTarget(p) {
  if (!isBoardPlayingForProxy(p)) return false;
  const money = Number(p?.stats?.money ?? 0);
  return money > PROXY_SLOT_MIN_SELECTABLE_MONEY;
}

/** 代理スロット継続中：最低1ベットが引けるか（所持金減少後もスピンごとに判定） */
export function canContinueAsProxySlotTarget(p) {
  if (!isBoardPlayingForProxy(p)) return false;
  return getProxySlotAllowedBets(p?.stats?.money ?? 0).length > 0;
}

export function canProxySlotBetAt(money, bet) {
  const cap = computeProxySlotMaxBet(money);
  return Number.isFinite(Number(bet)) && bet > 0 && bet <= cap;
}

/** 代理スロット：死亡者の運・技量・善行を半分（切捨て）にした値 */
export function halveActorStatsForSlot(actorStats) {
  const scale = (v) => Math.floor((Number(v) || 0) * PROXY_SLOT_ACTOR_STAT_RATE);
  const src = actorStats ?? {};
  return {
    ...src,
    luck: scale(src.luck),
    skill: scale(src.skill),
    virtue: scale(src.virtue),
  };
}

/** 代理スロット用：確率計算 stats（運等＝死亡者半分、所持金＝標的） */
export function buildProxySlotSpinStats(actorStats, targetStats) {
  const halved = halveActorStatsForSlot(actorStats);
  return {
    ...halved,
    money: Number(targetStats?.money ?? 0),
    pon: targetStats?.pon ?? halved.pon ?? 0,
  };
}

/** UI用：代理スロットのルール説明 */
export const PROXY_SLOT_RULES_LINES = [
  `選べるのは、すごろく中で所持金が${PROXY_SLOT_MIN_SELECTABLE_MONEY}Gを超えるプレイヤーのみです。`,
  `各スピンごとに、標的の所持金の${Math.round(PROXY_SLOT_MAX_BET_RATE * 100)}%（端数切捨て）がそのスピンの最大掛け金になります。`,
  "例：3000G → 最大900G（1000Gは不可）",
  "外れると標的の所持金が減るため、次のスピンでは減った金額の30%が再計算されます。",
  `運・技量・善行（天井）は死亡者（操作者）のステータスの${Math.round(PROXY_SLOT_ACTOR_STAT_RATE * 100)}%（切捨て）でスロット確率に反映されます。`,
];
