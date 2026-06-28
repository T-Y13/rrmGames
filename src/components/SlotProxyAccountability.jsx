import React, { useEffect, useRef, useState } from "react";
import {
  getSlotProxyContext,
  getProxySpinStingKey,
  isLocalPlayerProxyTarget,
  isSlotSpinningPhase,
  POST_SPIN_VICTIM_STING_MS,
} from "../lib/slotProxyTarget";

/** 代理標的向け：スピン中 + 結果直後のスティング表示 */
export function useProxyVictimSting(gs, myId, localSpinning = false) {
  const [postSpinSting, setPostSpinSting] = useState(false);
  const stingKeyRef = useRef("");

  useEffect(() => {
    const phase = gs?.slotPhase ?? "idle";
    if (phase === "idle") {
      stingKeyRef.current = "";
      setPostSpinSting(false);
      return undefined;
    }
    if (phase !== "completed" || !isLocalPlayerProxyTarget(gs, myId)) {
      return undefined;
    }
    const key = getProxySpinStingKey(gs);
    if (!key || stingKeyRef.current === key) return undefined;
    stingKeyRef.current = key;
    setPostSpinSting(true);
    const timer = setTimeout(() => setPostSpinSting(false), POST_SPIN_VICTIM_STING_MS);
    return () => clearTimeout(timer);
  }, [
    gs?.slotPhase,
    gs?.slotResultSettledAt,
    gs?.proxySlotTargetIdx,
    gs?.currentPlayerIdx,
    gs?.players?.[gs?.currentPlayerIdx ?? 0]?.lastSpinResult?.spin,
    myId,
  ]);

  const spinning = isSlotSpinningPhase(gs, localSpinning);
  const isVictim = isLocalPlayerProxyTarget(gs, myId);
  const showVictimSting = (spinning && isVictim) || postSpinSting;

  return { spinning, postSpinSting, isVictim, showVictimSting };
}

/**
 * 代理スロット時の「誰の金か」表示と、標的プレイヤー向け警告。
 * @param {"inline"|"broadcast"|"screen"} variant
 */
export default function SlotProxyAccountability({
  gs,
  myId,
  isSpinning = false,
  variant = "inline",
}) {
  const { spinning, postSpinSting, isVictim, showVictimSting } = useProxyVictimSting(gs, myId, isSpinning);
  const { isProxyPull, target, actor } = getSlotProxyContext(gs);
  const showProxyBadge = (spinning && isProxyPull) || (postSpinSting && isProxyPull);
  if (!showProxyBadge && !showVictimSting) return null;

  const targetName = target?.name?.trim() || "Target";
  const postSpinVictim = postSpinSting && isVictim && !spinning;

  const badge = showProxyBadge ? (
    <div
      className={[
        "pointer-events-none flex items-center justify-center gap-2 rounded-lg border font-bold tracking-wide uppercase",
        variant === "broadcast"
          ? "border-violet-400/50 bg-violet-950/80 px-3 py-1.5 text-[11px] text-violet-100 shadow-[0_0_16px_rgba(139,92,246,0.25)]"
          : "border-violet-400/45 bg-violet-950/70 px-2.5 py-1 text-[10px] sm:text-[11px] text-violet-100 shadow-[0_0_12px_rgba(139,92,246,0.2)]",
      ].join(" ")}
      role="status"
      aria-live="assertive"
    >
      <span className="text-violet-300/90" aria-hidden>
        💰
      </span>
      <span>
        Using <span className="text-white">{targetName}</span>&apos;s funds
      </span>
      {actor?.name && variant !== "inline" && (
        <span className="normal-case font-semibold text-slate-400 text-[10px]">
          · pulled by {actor.name}
        </span>
      )}
    </div>
  ) : null;

  const victimAlert = showVictimSting ? (
    <div
      className={[
        "pointer-events-none text-center font-black tracking-[0.12em] uppercase anim-slot-victim-alert",
        variant === "screen"
          ? "fixed left-1/2 top-[max(1rem,env(safe-area-inset-top))] z-[190] -translate-x-1/2 rounded-xl border-2 border-rose-500/80 bg-rose-950/90 px-4 py-2.5 text-sm text-rose-100 shadow-[0_0_32px_rgba(239,68,68,0.45)] sm:text-base"
          : variant === "broadcast"
            ? "mb-2 rounded-lg border-2 border-rose-500/75 bg-rose-950/85 px-3 py-2 text-xs text-rose-100 shadow-[0_0_24px_rgba(239,68,68,0.35)] sm:text-sm"
            : "mb-2 rounded-lg border border-rose-500/70 bg-rose-950/80 px-2.5 py-1.5 text-[11px] text-rose-100 shadow-[0_0_18px_rgba(239,68,68,0.3)]",
      ].join(" ")}
      role="alert"
    >
      {postSpinVictim ? "YOUR GOLD WAS USED!" : "ALERT: YOUR MONEY IS AT RISK!"}
    </div>
  ) : null;

  if (variant === "screen") {
    return (
      <>
        {showVictimSting && (
          <div
            className="pointer-events-none fixed inset-0 z-[185] anim-slot-victim-frame"
            aria-hidden
          />
        )}
        {victimAlert}
        <div className="pointer-events-none fixed left-1/2 top-[calc(max(1rem,env(safe-area-inset-top))+3.5rem)] z-[190] -translate-x-1/2">
          {badge}
        </div>
      </>
    );
  }

  return (
    <div className="pointer-events-none flex w-full flex-col items-center gap-2">
      {victimAlert}
      {badge}
    </div>
  );
}
