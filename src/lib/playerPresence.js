/** プレイヤー接続・切断（ネットワークゴースト）の定数とユーティリティ */

export const LS_ROOM_ID = "pons_room_id";
export const LS_PLAYER_NAME = "pons_player_name";

export const GHOST_TIMEOUT_MS = 60_000;
export const HEARTBEAT_INTERVAL_MS = 20_000;
export const GHOST_AUTOMATION_POLL_MS = 2_500;
export const PRESENCE_STALE_CHECK_MS = 15_000;

export function getPlayerLastSeenMs(roomPlayers, uid) {
  const doc = roomPlayers?.[uid];
  const ts = doc?.updatedAt;
  if (!ts) return 0;
  if (typeof ts.toMillis === "function") return ts.toMillis();
  if (typeof ts.seconds === "number") return ts.seconds * 1000;
  return Date.now();
}

export function isPlayerPresenceStale(roomPlayers, uid, now = Date.now()) {
  const last = getPlayerLastSeenMs(roomPlayers, uid);
  if (last <= 0) return false;
  return now - last > GHOST_TIMEOUT_MS;
}

/** ネットワーク切断・自主退室（ゲーム内 elimination の alive:false とは別） */
export function isNetworkAutomated(p) {
  return !!(p && (p.isGhost === true || p.isGameOver === true));
}

export function shouldRunGhostAutomationController({ roomData, myId, roomPlayers, isHost }) {
  if (!roomData || !myId || roomData.isSolo) return false;
  if (!roomData.gameState || !["playing", "FINAL_BATTLE"].includes(roomData.status)) return false;

  const meInGame = roomData.gameState?.players?.find((p) => p.id === myId);
  if (meInGame && isNetworkAutomated(meInGame)) return false;
  if (isPlayerPresenceStale(roomPlayers, myId)) return false;

  if (isHost) return true;

  const hostId = roomData.hostId;
  if (!hostId || hostId === myId) return false;
  if (!isPlayerPresenceStale(roomPlayers, hostId)) return false;

  const ids = [...(roomData.playerIds ?? [])].sort();
  const connected = ids.filter((id) => !isPlayerPresenceStale(roomPlayers, id));
  return connected[0] === myId;
}

export function buildMarkNetworkGhostPatch(gameState, roomPlayers, now = Date.now()) {
  if (!gameState?.players?.length) return null;
  let changed = false;
  const players = gameState.players.map((p) => {
    if (p.isGameOver || p.alive === false) return p;
    const stale = isPlayerPresenceStale(roomPlayers, p.id, now);
    if (stale && !p.isGhost) {
      changed = true;
      return { ...p, isGhost: true };
    }
    // ハートビート復帰時はネットワークゴーストだけ解除（自主退室 isGameOver は上で除外済み）
    if (!stale && p.isGhost) {
      changed = true;
      return { ...p, isGhost: false };
    }
    return p;
  });
  if (!changed) return null;
  return { gameState: { ...gameState, players } };
}

export function buildClearSelfPresencePatch(gameState, myId) {
  if (!gameState?.players?.length || !myId) return null;
  const idx = gameState.players.findIndex((p) => p.id === myId);
  if (idx < 0) return null;
  const p = gameState.players[idx];
  // 自主退室 (isGameOver) は再接続でも復帰させない。ネットワーク切断 (isGhost のみ) だけ解除。
  if (!p.isGhost || p.isGameOver) return null;
  const players = gameState.players.map((pl, i) =>
    i !== idx ? pl : { ...pl, isGhost: false },
  );
  return { gameState: { ...gameState, players } };
}

/** @returns {{ gameState: object } | { localOnly: true } | null} */
export function buildGracefulLeavePatch(gameState, myId) {
  if (!gameState?.players?.length || !myId) return null;
  const idx = gameState.players.findIndex((p) => p.id === myId);
  if (idx < 0) return null;
  const p = gameState.players[idx];
  if (p.isGameOver) return { localOnly: true };
  const players = gameState.players.map((pl, i) => {
    if (i !== idx) return pl;
    if (pl.isGhost) return { ...pl, isGameOver: true };
    return { ...pl, isGameOver: true, isGhost: true };
  });
  return { gameState: { ...gameState, players } };
}

export function persistRoomSession(roomId, playerName) {
  try {
    if (roomId) localStorage.setItem(LS_ROOM_ID, roomId);
    else localStorage.removeItem(LS_ROOM_ID);
    if (playerName?.trim()) localStorage.setItem(LS_PLAYER_NAME, playerName.trim());
  } catch (_) {}
}

export function clearRoomSession() {
  try {
    localStorage.removeItem(LS_ROOM_ID);
  } catch (_) {}
}

export function readStoredRoomSession() {
  try {
    return {
      roomId: localStorage.getItem(LS_ROOM_ID) || "",
      playerName: localStorage.getItem(LS_PLAYER_NAME) || "",
    };
  } catch (_) {
    return { roomId: "", playerName: "" };
  }
}
