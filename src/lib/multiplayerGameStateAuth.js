/**
 * gameState を書き換える権限チェック（マルチの手番ずれ・二重送信の抑制）。
 */

/** 他プレイヤーがスロット中でも、自分のゴール到着確認だけ進められるか */
export function canConfirmGoalLandingWhileOtherActs(gameState, myId) {
  if (!gameState || !myId || !Array.isArray(gameState.players) || gameState.players.length === 0) return false;
  const myIdx = gameState.players.findIndex((p) => p.id === myId);
  if (myIdx < 0 || gameState.players[myIdx]?.movePhase !== "goalLanding") return false;
  const cIdx = gameState.currentPlayerIdx;
  if (!Number.isInteger(cIdx) || cIdx < 0 || cIdx >= gameState.players.length) return false;
  if (cIdx === myIdx) return false;
  const current = gameState.players[cIdx];
  return current?.movePhase === "arrived" || current?.movePhase === "waitingSlot";
}

/** Firestore の currentPlayerIdx が指すプレイヤーが自分か、または上記のゴール確認例外交代 */
export function isActorTurnOnGameState(gameState, myId) {
  if (!gameState || !myId || !Array.isArray(gameState.players) || gameState.players.length === 0) return false;
  const idx = gameState.currentPlayerIdx;
  if (!Number.isInteger(idx) || idx < 0 || idx >= gameState.players.length) return false;
  return gameState.players[idx]?.id === myId;
}

/** ゴール到着確認の Firestore 書き込み（手番が別プレイヤーでも可） */
export function canWriteGoalLandingConfirm(gameState, myId) {
  if (!gameState || !myId || gameState.subPhase !== "day8" || gameState.gamePhase !== "playing") return false;
  const myIdx = gameState.players.findIndex((p) => p.id === myId);
  if (myIdx < 0 || gameState.players[myIdx]?.movePhase !== "goalLanding") return false;
  if (isActorTurnOnGameState(gameState, myId)) return true;
  return canConfirmGoalLandingWhileOtherActs(gameState, myId);
}

export function isRoomHost(roomData, myId) {
  return !!(roomData && myId && roomData.hostId === myId);
}

/** 決戦ホストが preDay8 経由で 8 日目／結果へ進める書き込み */
export function isHostFinalBattleScheduledWrite(roomData, gameState, myId) {
  return (
    isRoomHost(roomData, myId) &&
    gameState?.gamePhase === "finalBattle"
  );
}
