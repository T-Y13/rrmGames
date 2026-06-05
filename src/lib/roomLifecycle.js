import { BAL } from "../constants/gameBalance";

/** 待機室用: キャラ・抽選などゲーム進行データを除いたスロット行だけ残す */
export function resetPlayerSlotsForLobby(slots) {
  return (slots ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    fullId: s.fullId,
  }));
}

/** ホスト「続ける」: ルームをゲーム前ロビーへ戻すパッチ */
export function buildHostContinueToLobbyPatch(roomData) {
  return {
    status: "lobby",
    gameState: null,
    completedPlayers: [],
    remainingTurns: BAL.dice.maxTurns,
    playerSlots: resetPlayerSlotsForLobby(roomData?.playerSlots),
  };
}

/** 参加者「抜ける」: 自分だけ playerIds / playerSlots から除外 */
export function buildLeaveRoomPatch(roomData, uid) {
  const playerSlots = (roomData?.playerSlots ?? []).filter((s) => s.id !== uid);
  const playerIds = (roomData?.playerIds ?? []).filter((id) => id !== uid);
  return { playerSlots, playerIds };
}
