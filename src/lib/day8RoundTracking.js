import { BAL } from "../constants/gameBalance";
import { readRoomTotalPot, resolveTotalPotAfterRoomTracking } from "./progressivePot";
import {
  computeAdvanceDay8Turn,
  hasSugorokuBoardTargets,
  isDay8Done,
  resolveDay8RoundExhaustion,
} from "../utils/gameLogic";

export function normalizeCompletedPlayers(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((id) => typeof id === "string" && id.length > 0);
}

/**
 * 8日目 UI：ラウンド完了済みでも、自分の手番でスロット／待機中なら操作可能にする。
 */
export function resolveDay8IsMyTurn({
  rawIsMyTurn,
  isMyDay8RoundCompleted,
  cpIsSlot = false,
  cpIsWaitingSlot = false,
  cpIsGhostPick = false,
  cpIsMoving = false,
  cpIsGoalLanding = false,
}) {
  if (!rawIsMyTurn) return false;
  if (!isMyDay8RoundCompleted) return true;
  return !!(cpIsSlot || cpIsWaitingSlot || cpIsGhostPick || cpIsMoving || cpIsGoalLanding);
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

/** このラウンドで行動完了が必要なプレイヤー ID（生存者＋代理スロット待ちの脱落者） */
export function day8PlayersPendingRoundAction(gameState, completedPlayers = []) {
  const players = gameState?.players ?? [];
  const done = normalizeCompletedPlayers(completedPlayers);
  return players
    .filter((p) => {
      if (!p?.id || done.includes(p.id)) return false;
      if (p.alive !== false) return true;
      if (!hasSugorokuBoardTargets(players)) return false;
      return true;
    })
    .map((p) => p.id);
}

function allAliveMarkedComplete(players, completedPlayers) {
  const aliveIds = (players ?? [])
    .filter((p) => p?.alive !== false && p?.id)
    .map((p) => p.id);
  if (aliveIds.length === 0) return true;
  const done = normalizeCompletedPlayers(completedPlayers);
  return aliveIds.every((id) => done.includes(id));
}

function resetDay8RoundAfterAllPending(remainingTurns, gameState) {
  const nextRemaining = Math.max(0, remainingTurns - 1);
  const roundsUsed = Math.max(0, BAL.dice.maxTurns - nextRemaining);
  const players = Array.isArray(gameState?.players)
    ? gameState.players.map((pl) => ({
        ...pl,
        roundHandoffDone: false,
        ...(pl?.alive !== false
          ? { moveTurns: Math.max(Number(pl.moveTurns) || 0, roundsUsed) }
          : { ghostActedThisRound: false }),
      }))
    : gameState?.players;

  return {
    remainingTurns: nextRemaining,
    completedPlayers: [],
    gameState: players ? { ...gameState, players } : gameState,
  };
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

  const pendingIds = day8PlayersPendingRoundAction(gameState, completedPlayers);
  const players = gameState?.players ?? [];
  const actor = players.find((p) => p?.id === playerId);

  if (pendingIds.length === 0) {
    /** ボード上に誰もいないとき：生存者全員完了後の脱落スキップでラウンドを締める */
    if (actor?.alive === false && allAliveMarkedComplete(players, completedPlayers)) {
      return resetDay8RoundAfterAllPending(remainingTurns, gameState);
    }
    return { remainingTurns, completedPlayers, gameState };
  }

  if (!pendingIds.includes(playerId)) {
    return { remainingTurns, completedPlayers, gameState };
  }

  let nextCompleted = completedPlayers.includes(playerId)
    ? completedPlayers
    : [...completedPlayers, playerId];

  const pendingDone = pendingIds.every((id) => nextCompleted.includes(id));
  const playersWithHandoff = Array.isArray(gameState?.players)
    ? gameState.players.map((pl) =>
        pl?.id === playerId ? { ...pl, roundHandoffDone: true } : pl,
      )
    : gameState?.players;
  const gsWithHandoff = playersWithHandoff
    ? { ...gameState, players: playersWithHandoff }
    : gameState;

  if (!pendingDone) {
    return {
      remainingTurns,
      completedPlayers: nextCompleted,
      gameState: gsWithHandoff,
    };
  }

  return resetDay8RoundAfterAllPending(remainingTurns, gsWithHandoff);
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

  if (
    prevP.alive === false &&
    prevP.movePhase === "arrived" &&
    nextP?.movePhase === "spectating" &&
    nextP?.ghostActedThisRound === true
  ) {
    return true;
  }

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
  const { remainingTurns: prevRemaining } = deriveDay8RoundStateFromRoom(roomDoc);
  let { remainingTurns, completedPlayers } = deriveDay8RoundStateFromRoom(roomDoc);
  const prevTotalPot = readRoomTotalPot(roomDoc);

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

    /** ラウンド完了マーク後も current が rotation 完了済みなら次の手番へ（今マークした本人は除外） */
    const cpIdx = trackedGs?.currentPlayerIdx;
    const cp = Number.isInteger(cpIdx) ? trackedGs?.players?.[cpIdx] : null;
    const prevCurrentIdx = prevGs?.currentPlayerIdx;
    const turnAlreadyRotatedInPayload =
      Number.isInteger(prevCurrentIdx) &&
      Number.isInteger(cpIdx) &&
      prevCurrentIdx !== cpIdx;
    if (
      cp &&
      markId &&
      cp.id !== markId &&
      isDay8Done(cp, trackedGs.players) &&
      !turnAlreadyRotatedInPayload
    ) {
      trackedGs = computeAdvanceDay8Turn(trackedGs, trackedGs.players, []);
    }
  }

  trackedGs = resolveDay8RoundExhaustion(trackedGs, remainingTurns);

  const totalPot = resolveTotalPotAfterRoomTracking({
    prevRemaining,
    nextRemaining: remainingTurns,
    prevGs,
    nextGs: trackedGs,
    prevTotalPot,
  });

  return {
    gameState: trackedGs,
    remainingTurns,
    completedPlayers,
    totalPot,
  };
}
