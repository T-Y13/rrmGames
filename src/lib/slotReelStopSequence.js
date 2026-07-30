/**
 * 8日目スロット：手動停止（Phase A）の純ロジック。
 */

/** スピン開始直後、第1リールを手動停止できるまでの最短 ms */
export const SLOT_REEL_MANUAL_STOP_MIN_MS = 380;

/** 左から順に止める：次に手動停止できるリール index（なければ -1） */
export function nextManualStopReelIndex(stoppedFlags) {
  if (!Array.isArray(stoppedFlags) || stoppedFlags.length < 3) return -1;
  for (let i = 0; i < 3; i++) {
    if (!stoppedFlags[i]) return i;
  }
  return -1;
}

/** 指定リールを手動停止できるか（左隣はすべて停止済みであること） */
export function canManualStopReel(stoppedFlags, reelIdx) {
  if (!Number.isInteger(reelIdx) || reelIdx < 0 || reelIdx > 2) return false;
  if (!Array.isArray(stoppedFlags) || stoppedFlags.length < 3) return false;
  if (stoppedFlags[reelIdx]) return false;
  for (let i = 0; i < reelIdx; i++) {
    if (!stoppedFlags[i]) return false;
  }
  return true;
}

/**
 * 第1リールの手動停止が解禁されたか。
 * @param {number} startedAtMs performance.now() at spin start
 * @param {number} [nowMs]
 */
export function isFirstReelManualStopReady(startedAtMs, nowMs = performance.now()) {
  if (!Number.isFinite(startedAtMs)) return false;
  return nowMs - startedAtMs >= SLOT_REEL_MANUAL_STOP_MIN_MS;
}

/** 次に押せる STOP ボタンの index（押せないとき -1） */
export function activeManualStopReelIndex(stoppedFlags, startedAtMs, nowMs = performance.now()) {
  const next = nextManualStopReelIndex(stoppedFlags);
  if (next < 0 || !canManualStopReel(stoppedFlags, next)) return -1;
  if (next === 0 && !isFirstReelManualStopReady(startedAtMs, nowMs)) return -1;
  return next;
}
