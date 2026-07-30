import React from "react";
import {
  activeManualStopReelIndex,
  canManualStopReel,
} from "../lib/slotReelStopSequence";

const REEL_LEFT_VARS = [
  "var(--slot-reel-0-left)",
  "var(--slot-reel-1-left)",
  "var(--slot-reel-2-left)",
];

function StopButton({ reelIdx, stopped, isActive, canPress, waiting, onStopReel, layout }) {
  const baseClass =
    layout === "grid"
      ? "flex min-h-[2rem] w-full items-center justify-center rounded-md border font-black uppercase tracking-wide transition-all text-[10px] sm:text-xs"
      : "pointer-events-auto absolute flex items-center justify-center rounded-md border font-black uppercase tracking-wide transition-all text-[9px] sm:text-[10px]";

  return (
    <button
      type="button"
      title={`第${reelIdx + 1}リールを停止`}
      aria-label={`第${reelIdx + 1}リールを停止`}
      disabled={!canPress}
      onClick={() => onStopReel?.(reelIdx)}
      className={`${baseClass} ${
        stopped
          ? "border-slate-600/50 bg-slate-800/40 text-slate-500 opacity-50"
          : isActive
            ? "border-rose-300/90 bg-rose-600 text-white shadow-[0_0_14px_rgba(244,63,94,0.55)] hover:bg-rose-500 active:scale-95"
            : waiting
              ? "border-amber-500/40 bg-amber-950/50 text-amber-200/70 animate-pulse"
              : "border-slate-600/40 bg-slate-900/50 text-slate-500 opacity-40"
      } disabled:cursor-not-allowed disabled:opacity-35`}
      style={
        layout === "overlay"
          ? {
              top: "var(--slot-reel-stop-top)",
              left: REEL_LEFT_VARS[reelIdx],
              width: "var(--slot-reel-stop-w)",
              height: "var(--slot-reel-stop-h)",
            }
          : undefined
      }
    >
      {stopped ? "—" : "STOP"}
    </button>
  );
}

/**
 * 各リールの STOP ボタン（Phase A 手動停止）
 * @param {"overlay"|"grid"} layout overlay=PNG筐体上の絶対配置 / grid=vector 筐体の3列グリッド
 */
export default function SlotReelStopButtons({
  visible = false,
  stoppedFlags = [false, false, false],
  spinStartedAt = 0,
  onStopReel,
  spectatorMode = false,
  layout = "overlay",
  hidden = false,
}) {
  if (hidden || !visible || spectatorMode) return null;

  const activeIdx = activeManualStopReelIndex(stoppedFlags, spinStartedAt);

  const buttons = [0, 1, 2].map((reelIdx) => {
    const stopped = !!stoppedFlags[reelIdx];
    const isActive = activeIdx === reelIdx;
    const canPress = isActive && canManualStopReel(stoppedFlags, reelIdx);
    const waiting = !stopped && reelIdx === 0 && activeIdx < 0;

    return (
      <StopButton
        key={reelIdx}
        reelIdx={reelIdx}
        stopped={stopped}
        isActive={isActive}
        canPress={canPress}
        waiting={waiting}
        onStopReel={onStopReel}
        layout={layout}
      />
    );
  });

  if (layout === "grid") {
    return (
      <div className="slot-cabinet-vector__stop-row" aria-live="polite">
        {buttons}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[22]" aria-live="polite">
      {buttons}
    </div>
  );
}
