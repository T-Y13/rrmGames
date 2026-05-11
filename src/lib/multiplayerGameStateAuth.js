/**
 * gameState を書き換える権限チェック（マルチの手番ずれ・二重送信の抑制）。
 */

/** Firestore の currentPlayerIdx が指すプレイヤーが自分か */
export function isActorTurnOnGameState(gameState, myId) {
  if (!gameState || !myId || !Array.isArray(gameState.players) || gameState.players.length === 0) return false;
  const idx = gameState.currentPlayerIdx;
  if (!Number.isInteger(idx) || idx < 0 || idx >= gameState.players.length) return false;
  return gameState.players[idx]?.id === myId;
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
