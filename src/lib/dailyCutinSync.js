/** 1〜7日目：仕事・配信・神社カットイン観戦同期（Firestore ルーム直下） */

import {
  DAILY_STREAM_CUTIN_MS,
  DAILY_STREAM_FAIL_HOLD_MS,
  DAILY_STREAM_PON_OVERLAY_MS,
  DAILY_WORK_CUTIN_MS,
  DAILY_WORK_PON_OVERLAY_MS,
  DAILY_SHRINE_CUTIN_MS,
} from "./day7TransitionFx";

export const DAILY_CUTIN_PHASE = {
  idle: "idle",
  work: "work",
  workPon: "workPon",
  stream: "stream",
  streamPon: "streamPon",
  streamFail: "streamFail",
  shrine: "shrine",
};

export const DAILY_CUTIN_SYNC_DEFAULTS = {
  dailyCutinPhase: "idle",
  dailyCutinSessionId: null,
  dailyCutinPayload: null,
};

export function buildDailyCutinSessionId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** 観戦側：各フェーズの最低表示時間（手番側と同じ ms） */
export function dailyCutinPhaseDurationMs(phase) {
  switch (phase) {
    case DAILY_CUTIN_PHASE.work:
      return DAILY_WORK_CUTIN_MS;
    case DAILY_CUTIN_PHASE.workPon:
      return DAILY_WORK_PON_OVERLAY_MS;
    case DAILY_CUTIN_PHASE.stream:
      return DAILY_STREAM_CUTIN_MS;
    case DAILY_CUTIN_PHASE.streamPon:
      return DAILY_STREAM_PON_OVERLAY_MS;
    case DAILY_CUTIN_PHASE.streamFail:
      return DAILY_STREAM_FAIL_HOLD_MS;
    case DAILY_CUTIN_PHASE.shrine:
      return DAILY_SHRINE_CUTIN_MS;
    default:
      return 0;
  }
}

/** gameState 書き込み用：進行中カットインをマージ（ルーム直下 patch が rules で弾かれても観戦可） */
export function pickDailyCutinBroadcastFields(source) {
  if (!source || (source.dailyCutinPhase ?? DAILY_CUTIN_PHASE.idle) === DAILY_CUTIN_PHASE.idle) {
    return null;
  }
  return {
    dailyCutinPhase: source.dailyCutinPhase,
    dailyCutinSessionId: source.dailyCutinSessionId ?? null,
    dailyCutinPayload: source.dailyCutinPayload ?? null,
  };
}

export function mergeDailyCutinFieldsIntoGameState(gameState, cutinFields) {
  if (!gameState || gameState.subPhase !== "daily" || !cutinFields) return gameState;
  return { ...gameState, ...cutinFields };
}

/** ルーム doc / gameState からカットイン同期フィールドを読む */
export function readDailyCutinBroadcast(roomData, gameState) {
  // ルーム直下が明示的 idle なら gameState に残った stale cutin は無視する
  if (
    roomData != null &&
    Object.prototype.hasOwnProperty.call(roomData, "dailyCutinPhase") &&
    (roomData.dailyCutinPhase ?? DAILY_CUTIN_PHASE.idle) === DAILY_CUTIN_PHASE.idle
  ) {
    return { phase: DAILY_CUTIN_PHASE.idle, sessionId: "", payload: null };
  }
  return {
    phase: roomData?.dailyCutinPhase ?? gameState?.dailyCutinPhase ?? DAILY_CUTIN_PHASE.idle,
    sessionId: roomData?.dailyCutinSessionId ?? gameState?.dailyCutinSessionId ?? "",
    payload: roomData?.dailyCutinPayload ?? gameState?.dailyCutinPayload ?? null,
  };
}

export function dailyCutinSpectatorStatusLabel(phase, playerName) {
  const n = playerName ?? "他プレイヤー";
  switch (phase) {
    case DAILY_CUTIN_PHASE.work:
      return `${n}が仕事中…`;
    case DAILY_CUTIN_PHASE.workPon:
      return `${n}の仕事でPON発火…`;
    case DAILY_CUTIN_PHASE.stream:
      return `${n}が配信中…`;
    case DAILY_CUTIN_PHASE.streamPon:
      return `${n}の配信で炎上…`;
    case DAILY_CUTIN_PHASE.streamFail:
      return `${n}の配信失敗…`;
    case DAILY_CUTIN_PHASE.shrine:
      return `${n}が神社参り中…`;
    default:
      return null;
  }
}

/** Firestore が idle でもローカル演出中の観戦ラベル */
export function localDailyCutinSpectatorLabel(playerName, local) {
  const n = playerName ?? "他プレイヤー";
  if (local.workPonHud) return `${n}の仕事でPON発火…`;
  if (local.workCutin) return `${n}が仕事中…`;
  if (local.streamPonFireOverlay) return `${n}の配信で炎上…`;
  if (local.streamFailOverlay) return `${n}の配信失敗…`;
  if (local.streamTypeCutin) return `${n}が配信中…`;
  if (local.shrinePhase) return `${n}が神社参り中…`;
  return null;
}
