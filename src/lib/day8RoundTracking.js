import { BAL } from "../constants/gameBalance";
import { resolveDay8RoundExhaustion } from "../utils/gameLogic";

export function normalizeCompletedPlayers(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((id) => typeof id === "string" && id.length > 0);
}

export function deriveDay8RoundStateFromRoom(roomDoc) {
  const remainingRaw = Number(roomDoc?.remainingTurns);
  const remaining =
    Number.isFinite(remainingRaw) && remainingRaw >= 0
      ? Math.floor(remainingRaw)
      : BAL.dice.maxTurns;
  return {
    remainingTurns: remaining,
    completedPlayers: normalizeCompletedPlayers(roomDoc?.completedPlayers),
  };
}

export function getAlivePlayerIds(gameState) {
  return (gameState?.players ?? [])
    .filter((p) => p?.alive !== false && typeof p?.id === "string")
    .map((p) => p.id);
}

/**
 * computeAdvanceDay8Turn が同一プレイヤーのスロットバースト継続だけ行う場合 true（手番はまだ完了しない）
 */
export function isDay8SlotBurstContinuation(gs, newPlayers) {
  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const stayIdx = gs?.currentPlayerIdx;
  if (!Number.isInteger(stayIdx) || stayIdx < 0) return false;
  const stayP = newPlayers?.[stayIdx];
  if (!stayP) return false;
  const slotLeft = stayP.slotTurnsLeft ?? 0;
  const pullsSeat = stayP.slotPullsThisSeat ?? 0;
  return stayP.movePhase === "arrived" && slotLeft > 0 && pullsSeat < burst;
}

/**
 * 1プレイヤーの8日目ターン行動完了を記録。全員完了なら remainingTurns を減らす。
 * @returns {{ remainingTurns: number, completedPlayers: string[], gameState: object }}
 */
export function completeDay8TurnAction({
  remainingTurns,
  completedPlayers,
  gameState,
  playerId,
}) {
  if (!playerId || typeof playerId !== "string") {
    return { remainingTurns, completedPlayers, gameState };
  }

  const aliveIds = getAlivePlayerIds(gameState);
  if (aliveIds.length === 0) {
    return { remainingTurns, completedPlayers, gameState };
  }

  if (!aliveIds.includes(playerId)) {
    return { remainingTurns, completedPlayers, gameState };
  }

  let nextCompleted = completedPlayers.includes(playerId)
    ? completedPlayers
    : [...completedPlayers, playerId];

  const completedAliveCount = aliveIds.filter((id) => nextCompleted.includes(id)).length;
  if (completedAliveCount < aliveIds.length) {
    return {
      remainingTurns,
      completedPlayers: nextCompleted,
      gameState,
    };
  }

  const nextRemaining = Math.max(0, remainingTurns - 1);
  const roundsUsed = Math.max(0, BAL.dice.maxTurns - nextRemaining);
  const players = Array.isArray(gameState?.players)
    ? gameState.players.map((pl) =>
        pl?.alive !== false
          ? { ...pl, moveTurns: Math.max(Number(pl.moveTurns) || 0, roundsUsed) }
          : pl,
      )
    : gameState?.players;

  return {
    remainingTurns: nextRemaining,
    completedPlayers: [],
    gameState: players ? { ...gameState, players } : gameState,
  };
}

/**
 * 書き込み前後の gameState から、8日目の1ターン行動完了を明示マークすべきか判定（ゴースト自動等）
 */
export function shouldMarkDay8TurnComplete(prevGs, nextGs) {
  if (!prevGs?.players || !nextGs?.players) return false;
  if (prevGs.gamePhase !== "playing" || prevGs.subPhase !== "day8") return false;
  if (nextGs.gamePhase !== "playing" || nextGs.subPhase !== "day8") return false;
  if (isDay8SlotBurstContinuation(prevGs, nextGs.players)) return false;

  const idx = prevGs.currentPlayerIdx;
  if (!Number.isInteger(idx) || idx < 0) return false;
  const prevP = prevGs.players[idx];
  const nextP = nextGs.players[idx];
  if (!prevP?.id) return false;

  if (Number(nextGs.currentPlayerIdx) !== Number(idx)) return true;

  if (
    prevP.movePhase === "moving" &&
    Number(nextP?.moveTurns ?? -1) > Number(prevP.moveTurns ?? -1)
  ) {
    return true;
  }

  if (
    prevP.movePhase === "arrived" &&
    Number(prevP.slotPullsThisSeat ?? 0) > 0 &&
    Number(nextP?.slotPullsThisSeat ?? 0) === 0
  ) {
    return true;
  }

  if (prevP.movePhase === "missed") return true;

  return false;
}

/**
 * 8日目ラウンド状態を gameState 書き込みにマージ。
 * @param {object} roomDoc
 * @param {object} nextGs
 * @param {{ markTurnCompleteFor?: string | null }} [options]
 */
export function applyDay8RoundTracking(roomDoc, nextGs, options = {}) {
  const prevGs = roomDoc?.gameState;
  let trackedGs = nextGs;
  let { remainingTurns, completedPlayers } = deriveDay8RoundStateFromRoom(roomDoc);

  const entersDay8 =
    nextGs?.gamePhase === "playing" &&
    nextGs?.subPhase === "day8" &&
    !(prevGs?.gamePhase === "playing" && prevGs?.subPhase === "day8");
  if (entersDay8) {
    remainingTurns = BAL.dice.maxTurns;
    completedPlayers = [];
  }

  const markId = options.markTurnCompleteFor ?? null;
  const prevInDay8 =
    prevGs?.gamePhase === "playing" && prevGs?.subPhase === "day8";
  if (prevInDay8 && markId) {
    const merged = completeDay8TurnAction({
      remainingTurns,
      completedPlayers,
      gameState: trackedGs,
      playerId: markId,
    });
    remainingTurns = merged.remainingTurns;
    completedPlayers = merged.completedPlayers;
    trackedGs = merged.gameState;
  }

  trackedGs = resolveDay8RoundExhaustion(trackedGs, remainingTurns);

  return {
    gameState: trackedGs,
    remainingTurns,
    completedPlayers,
  };
}
