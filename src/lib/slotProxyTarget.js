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
