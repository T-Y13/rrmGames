/** 7日目ラスト行動 → 決戦／すごろくへ切り替える前に待つ演出時間 */

export const DAILY_STREAM_CUTIN_MS = 2000;
export const DAILY_STREAM_PON_OVERLAY_MS = 3300;
export const DAILY_STREAM_FAIL_HOLD_MS = 3200;
export const DAILY_WORK_CUTIN_MS = 2000;
export const DAILY_WORK_PON_OVERLAY_MS = 3100;
export const DAILY_SHRINE_CUTIN_MS = 2700;

/**
 * 7日目最終行動のローカル演出がすべて終わるまでの ms（配信 PON／失敗、仕事 PON、神社など）
 */
export function computeDay7TransitionFxHoldMs(
  actionType,
  {
    deferStreamPonOverlay = false,
    streamRollFailed = false,
    deferWorkPonOverlay = false,
  } = {},
) {
  if (actionType === "stream") {
    let ms = DAILY_STREAM_CUTIN_MS;
    if (deferStreamPonOverlay) ms += DAILY_STREAM_PON_OVERLAY_MS;
    if (streamRollFailed) ms += DAILY_STREAM_FAIL_HOLD_MS;
    return ms;
  }
  if (actionType === "work") {
    return deferWorkPonOverlay
      ? DAILY_WORK_CUTIN_MS + DAILY_WORK_PON_OVERLAY_MS
      : DAILY_WORK_CUTIN_MS;
  }
  if (actionType === "shrine") return DAILY_SHRINE_CUTIN_MS;
  return 0;
}

export function isDailyOutgoingFxActive({
  streamTypeCutin,
  streamPonFireOverlay,
  streamFailOverlay,
  workCutin,
  workPonHud,
  shrinePhase,
}) {
  return (
    streamTypeCutin != null ||
    streamPonFireOverlay ||
    streamFailOverlay ||
    workCutin != null ||
    workPonHud != null ||
    shrinePhase != null
  );
}
