/** 日常行動の盤面フロートラベル（全クライアント同期用） */

export const DAILY_ACTION_FX_CLEAR_MS = 2400;

export function buildDailyActionFx({ playerId, actionType, detail = {} }) {
  if (!playerId || !actionType) return null;
  const label = formatDailyActionLabel(actionType, detail);
  if (!label) return null;
  return {
    id: `${playerId}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    playerId,
    actionType,
    label,
  };
}

/** 神社は全画面カットインのみ。盤面ラベルは付けない */
export function shouldAttachDailyActionFx(actionType) {
  return actionType !== "shrine";
}

export function clearDailyActionFx(gs) {
  if (!gs?.dailyActionFx) return gs;
  const next = { ...gs };
  delete next.dailyActionFx;
  return next;
}

export function attachDailyActionFx(gs, { playerId, actionType, detail = {} }) {
  if (!shouldAttachDailyActionFx(actionType)) return gs;
  const fx = buildDailyActionFx({ playerId, actionType, detail });
  if (!fx) return gs;
  return { ...gs, dailyActionFx: fx };
}

/** 育成以外（決戦・8日目）へ進む書き込みでは日常ラベルを残さない */
export function attachDailyActionFxForDailyPhase(gs, { playerId, actionType, detail = {} }) {
  let next = attachDailyActionFx(gs, { playerId, actionType, detail });
  if (next.subPhase !== "daily" || next.gamePhase !== "playing") {
    next = clearDailyActionFx(next);
  }
  return next;
}

export function formatDailyActionLabel(actionType, detail = {}) {
  switch (actionType) {
    case "work":
      return typeof detail.money === "number" ? `💼 +${detail.money}G` : "💼 仕事";
    case "shrine":
      return "⛩ 神社";
    case "stream":
      if (detail.success === false) return "📺 配信失敗";
      return typeof detail.money === "number" ? `📺 +${detail.money}G` : "📺 配信";
    case "dailySlot":
      return typeof detail.skill === "number"
        ? `🎰 技量+${detail.skill}`
        : "🎰 デイリースロット";
    default:
      return null;
  }
}
