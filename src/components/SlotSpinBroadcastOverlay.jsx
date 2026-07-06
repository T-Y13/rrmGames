import React, { useCallback, useEffect, useRef, useState } from "react";
import slotCabinetPng from "../assets/slot-machine.png";
import { CharacterIcon } from "./CharacterPieces";
import SlotReelCanvasView from "./SlotReelCanvasView";
import { SLOT_MACHINES } from "../constants/gameBalance";
import SlotProxyAccountability, { useProxyVictimSting } from "./SlotProxyAccountability";
import JackpotCelebration from "./JackpotCelebration";
import {
  randomStripTriple,
  SLOT_JACKPOT_CELEBRATION_MS,
  SLOT_JACKPOT_WIN_FX_CLEAR_MS,
  SLOT_WIN_FX_CLEAR_MS,
  SLOT_RESULT_END_BURST_GRACE_MS,
  SLOT_SYNC_SPIN_MS,
  SLOT_SYNC_T0,
  SLOT_SYNC_T1,
  SLOT_SYNC_T2_NOREACH,
  SLOT_SYNC_T2_REACH,
  SLOT_SYNC_T2_REACH_CUTIN,
  SLOT_SYNC_T2_REACH_NOCUTIN,
  SLOT_SYNC_REACH_SHOW_DELAY,
  SLOT_SYNC_REACH_CUTIN_REVEAL_MS,
  SLOT_SYNC_REACH_CUTIN_ON_SCREEN_MS,
  slotSyncReel3StopMs,
  slotTargetIndicesToPaylineMiddles,
  slotMachineForReels,
  stripTripleForMiddleColumn,
  pickDisplayReelsFromGameState,
  resolveSlotBroadcastSpinContext,
  SLOT_TIER_LABELS,
} from "../utils/gameLogic";

const REACH_CUTIN_RIMIRU_TYPES = new Set(["vtuber", "ririm"]);

const defaultCols = () => [
  ["🎰", "🎰", "🎰"],
  ["🎰", "🎰", "🎰"],
  ["🎰", "🎰", "🎰"],
];

/**
 * 手番以外のクライアント用：Firestore の `slotPhase === "spinning"` / `completed` と
 * 事前確定の `targetResult`（symbols インデックス 3 つ）に合わせ、
 * 固定時間回転後にリールを止める。
 */
export default function SlotSpinBroadcastOverlay({ gs, soundRef, myId }) {
  const [reelColumns, setReelColumns] = useState(defaultCols);
  const [isSpinning, setIsSpinning] = useState(false);
  const [bouncingReel, setBouncingReel] = useState(-1);
  const [slipAnimCols] = useState([false, false, false]);
  const [showWinEffect, setShowWinEffect] = useState(null);
  const [charReaction, setCharReaction] = useState("idle");
  const [cabinetRecoil, setCabinetRecoil] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(0);
  const [showPayout, setShowPayout] = useState(false);
  const [isReachUI, setIsReachUI] = useState(false);
  const [reelsCanvasSettled, setReelsCanvasSettled] = useState(true);
  const [showJackpotCelebration, setShowJackpotCelebration] = useState(false);
  const [jackpotCelebrationMeta, setJackpotCelebrationMeta] = useState({ actorName: "", payout: 0, variant: "jackpot" });
  const [showReachCutin, setShowReachCutin] = useState(false);
  const [reachCutinFlash, setReachCutinFlash] = useState(false);
  const [resultSummary, setResultSummary] = useState(null);
  const [resultOverlayHold, setResultOverlayHold] = useState(false);

  const shuffleIntervalRef = useRef(null);
  const stoppedReelsRef = useRef([false, false, false]);
  const timeoutIdsRef = useRef([]);
  const completedWinFxKeyRef = useRef("");
  const pendingCompletedFxRef = useRef(null);
  const lastAnimatedSpinSessionRef = useRef(null);
  const lastBroadcastMarkerRef = useRef("");
  const spinSeqRef = useRef(0);
  const spinAnimActiveRef = useRef(false);
  const pendingCompletedGsRef = useRef(null);
  const spinFreezeCutinUntilRef = useRef(0);

  const buildBroadcastMarker = useCallback((gsSnap) => {
    const idx = gsSnap?.currentPlayerIdx ?? 0;
    const spin = gsSnap?.players?.[idx]?.lastSpinResult?.spin ?? 0;
    const dr = gsSnap?.displayReels;
    const sid = gsSnap?.slotSpinSessionId;
    if (typeof sid === "string" && sid && !sid.startsWith("catchup-")) return `sid:${sid}`;
    if (spin > 0 && Array.isArray(dr) && dr.length === 3) return `${idx}:${spin}:${dr.join(",")}`;
    if (typeof sid === "string" && sid) return `sid:${sid}`;
    return "";
  }, []);

  const markBroadcastDone = useCallback(
    (gsSnap) => {
      const marker = buildBroadcastMarker(gsSnap);
      if (marker) lastBroadcastMarkerRef.current = marker;
      const sid = gsSnap?.slotSpinSessionId;
      if (typeof sid === "string" && sid && !sid.startsWith("catchup-")) {
        lastAnimatedSpinSessionRef.current = sid;
      }
    },
    [buildBroadcastMarker],
  );

  const broadcastAlreadyDone = useCallback(
    (gsSnap) => {
      const marker = buildBroadcastMarker(gsSnap);
      if (marker && marker === lastBroadcastMarkerRef.current) return true;
      const sid = gsSnap?.slotSpinSessionId;
      return Boolean(sid && lastAnimatedSpinSessionRef.current === sid);
    },
    [buildBroadcastMarker],
  );

  const winBox = {
    top: "var(--slot-window-top)",
    left: "var(--slot-window-left)",
    width: "var(--slot-window-width)",
    height: "var(--slot-window-height)",
  };

  const publicAssetBase = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const pushTimeout = (id) => {
    timeoutIdsRef.current.push(id);
  };

  const clearSpinVisualTimers = () => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
    if (shuffleIntervalRef.current) {
      clearInterval(shuffleIntervalRef.current);
      shuffleIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if ((gs?.slotPhase ?? "idle") !== "idle") return;
    if (spinAnimActiveRef.current || pendingCompletedFxRef.current || resultOverlayHold) return;
    pendingCompletedGsRef.current = null;
    if (!spinAnimActiveRef.current) {
      setIsReachUI(false);
      setShowReachCutin(false);
      setReachCutinFlash(false);
      if (!resultOverlayHold) setShowJackpotCelebration(false);
    }
  }, [gs?.slotPhase, resultOverlayHold]);

  const holdResultOverlay = useCallback((ms) => {
    setResultOverlayHold(true);
    pushTimeout(
      setTimeout(() => {
        setResultOverlayHold(false);
        setResultSummary(null);
      }, ms),
    );
  }, []);

  const queueCompletedPresentation = useCallback((gsSnap) => {
    const dr = pickDisplayReelsFromGameState(gsSnap);
    if (!dr) return;
    markBroadcastDone(gsSnap);
    const machine = SLOT_MACHINES[gsSnap.slotMirrorMachineKey] ?? SLOT_MACHINES.standard;
    setReelColumns(dr.map((mid, ci) => stripTripleForMiddleColumn(mid, machine, ci)));

    const actor = gsSnap?.players?.[gsSnap?.currentPlayerIdx ?? 0];
    const last = actor?.lastSpinResult;
    const winFxKey = `${last?.spin ?? 0}-${dr.join(",")}-${last?.tier ?? ""}-${String(gsSnap?.lastPayout ?? "")}`;
    if (completedWinFxKeyRef.current === winFxKey) return;
    completedWinFxKeyRef.current = winFxKey;

    setShowWinEffect(null);
    setShowPayout(false);
    setPayoutAmount(0);
    setCharReaction("idle");
    setIsReachUI(false);
    setShowReachCutin(false);
    setReelsCanvasSettled(false);

    const settledNet =
      typeof gsSnap?.lastPayout === "number" && Number.isFinite(gsSnap.lastPayout)
        ? gsSnap.lastPayout
        : typeof last?.net === "number"
          ? last.net
          : null;

    pendingCompletedFxRef.current = {
      tier: last?.tier ?? null,
      settledNet,
      payout: last?.grossPayout ?? last?.payout ?? 0,
      potPayout: last?.potPayout ?? 0,
    };
  }, [markBroadcastDone]);

  const launchSpinAnimation = useCallback(
    (gsSnap, { onFinished } = {}) => {
      const ctx = resolveSlotBroadcastSpinContext(gsSnap);
      if (!ctx) return false;
      const { sessionId: sid, targetResult: tr } = ctx;

      const seq = ++spinSeqRef.current;
      markBroadcastDone({ ...gsSnap, slotSpinSessionId: sid, targetResult: tr });
      spinAnimActiveRef.current = true;

      clearSpinVisualTimers();
      stoppedReelsRef.current = [false, false, false];

      const potJackpotEnabled = (gsSnap?.players?.length ?? 0) > 1;
      const mk = gsSnap?.slotMirrorMachineKey ?? "standard";
      const machine = slotMachineForReels(SLOT_MACHINES[mk] ?? SLOT_MACHINES.standard, potJackpotEnabled);
      const sm = soundRef?.current;

      const visualMids =
        Array.isArray(gsSnap?.slotVisualReels) && gsSnap.slotVisualReels.length === 3
          ? gsSnap.slotVisualReels
          : slotTargetIndicesToPaylineMiddles(tr, mk, potJackpotEnabled);
      const realMids = slotTargetIndicesToPaylineMiddles(tr, mk, potJackpotEnabled);

      const visualStrips = visualMids.map((mid, ci) => stripTripleForMiddleColumn(mid, machine, ci));
      const realStrip2 = stripTripleForMiddleColumn(realMids[2], machine, 2);

      const isReach = Boolean(gsSnap?.isReach);
      const reachCutin = Boolean(gsSnap?.slotReachCutin);
      const reel3StopMs = slotSyncReel3StopMs(isReach, reachCutin);

      setCabinetRecoil(true);
      pushTimeout(setTimeout(() => setCabinetRecoil(false), 340));
      setIsSpinning(true);
      setReelsCanvasSettled(false);
      setIsReachUI(false);
      setShowWinEffect(null);
      setShowPayout(false);
      setPayoutAmount(0);
      setShowJackpotCelebration(false);
      setShowReachCutin(false);
      setReachCutinFlash(false);
      setResultSummary(null);
      setCharReaction("spinning");
      setReelColumns(defaultCols());
      setBouncingReel(-1);
      spinFreezeCutinUntilRef.current = 0;

      sm?.playStart?.();
      pushTimeout(setTimeout(() => sm?.startSpin?.(), 200));

      shuffleIntervalRef.current = setInterval(() => {
        if (seq !== spinSeqRef.current) return;
        if (performance.now() < spinFreezeCutinUntilRef.current) return;
        const stopped = stoppedReelsRef.current;
        setReelColumns((prev) => prev.map((col, i) => (stopped[i] ? col : randomStripTriple(machine))));
      }, 80);

      const finishSpin = () => {
        if (seq !== spinSeqRef.current) return;
        spinAnimActiveRef.current = false;
        setIsSpinning(false);
        setCharReaction("idle");
        onFinished?.();
      };

      const stopReel = (idx, strip) => {
        if (seq !== spinSeqRef.current) return;
        stoppedReelsRef.current[idx] = true;
        setReelColumns((prev) => {
          const n = [...prev];
          n[idx] = strip;
          return n;
        });
        setBouncingReel(idx);
        sm?.playStop?.(idx);
        pushTimeout(setTimeout(() => setBouncingReel(-1), 430));
      };

      if (!isReach) {
        pushTimeout(setTimeout(() => stopReel(0, visualStrips[0]), SLOT_SYNC_T0));
        pushTimeout(setTimeout(() => stopReel(1, visualStrips[1]), SLOT_SYNC_T1));
        pushTimeout(
          setTimeout(() => {
            if (seq !== spinSeqRef.current) return;
            if (shuffleIntervalRef.current) {
              clearInterval(shuffleIntervalRef.current);
              shuffleIntervalRef.current = null;
            }
            sm?.stopSpin?.();
            stopReel(2, realStrip2);
            finishSpin();
          }, SLOT_SYNC_T2_NOREACH),
        );
      } else {
        pushTimeout(setTimeout(() => stopReel(0, visualStrips[0]), SLOT_SYNC_T0));
        pushTimeout(setTimeout(() => stopReel(1, visualStrips[1]), SLOT_SYNC_T1));
        pushTimeout(
          setTimeout(() => {
            if (seq !== spinSeqRef.current) return;
            setIsReachUI(true);
            setCharReaction("reach");
            pushTimeout(setTimeout(() => sm?.playReach?.(), 150));
          }, SLOT_SYNC_T1 + SLOT_SYNC_REACH_SHOW_DELAY),
        );
        if (reachCutin) {
          pushTimeout(
            setTimeout(() => {
              if (seq !== spinSeqRef.current) return;
              spinFreezeCutinUntilRef.current = performance.now() + 600;
              setReachCutinFlash(true);
              pushTimeout(setTimeout(() => setReachCutinFlash(false), 110));
              setShowReachCutin(true);
            }, SLOT_SYNC_REACH_CUTIN_REVEAL_MS),
          );
          pushTimeout(
            setTimeout(() => {
              if (seq !== spinSeqRef.current) return;
              setShowReachCutin(false);
            }, SLOT_SYNC_REACH_CUTIN_REVEAL_MS + SLOT_SYNC_REACH_CUTIN_ON_SCREEN_MS),
          );
        }
        pushTimeout(
          setTimeout(() => {
            if (seq !== spinSeqRef.current) return;
            if (shuffleIntervalRef.current) {
              clearInterval(shuffleIntervalRef.current);
              shuffleIntervalRef.current = null;
            }
            sm?.stopSpin?.();
            stopReel(2, realStrip2);
            setIsReachUI(false);
            finishSpin();
          }, reel3StopMs),
        );
      }

      return true;
    },
    [markBroadcastDone, soundRef],
  );

  /** spinning / completed：1セッション1回だけライブ同期スピン */
  useEffect(() => {
    const phase = gs?.slotPhase ?? "idle";
    if (phase !== "spinning" && phase !== "completed") return undefined;

    const dr = gs?.displayReels;
    const ctx = resolveSlotBroadcastSpinContext(gs);
    if (!ctx) {
      if (phase === "spinning") return undefined;
      if (phase === "completed" && (!Array.isArray(dr) || dr.length !== 3)) return undefined;
    }
    const sid = ctx?.sessionId ?? gs?.slotSpinSessionId;
    const gsForAnim = ctx
      ? { ...gs, slotPhase: phase, slotSpinSessionId: sid, targetResult: ctx.targetResult }
      : gs;

    if (broadcastAlreadyDone(gsForAnim)) {
      if (phase === "completed" && !spinAnimActiveRef.current) {
        queueCompletedPresentation(gs);
      } else if (phase === "completed") {
        pendingCompletedGsRef.current = gs;
      }
      return undefined;
    }

    if (spinAnimActiveRef.current) {
      if (phase === "completed") pendingCompletedGsRef.current = gs;
      return undefined;
    }

    if (phase === "completed" && (!Array.isArray(dr) || dr.length !== 3)) {
      return undefined;
    }

    pendingCompletedGsRef.current = phase === "completed" ? gs : null;
    const started = launchSpinAnimation(gsForAnim, {
      onFinished: () => {
        const pending = pendingCompletedGsRef.current;
        pendingCompletedGsRef.current = null;
        if (pending) queueCompletedPresentation(pending);
      },
    });
    if (!started && phase === "completed") {
      pendingCompletedGsRef.current = null;
      setIsSpinning(false);
      queueCompletedPresentation(gs);
    }

    return undefined;
  }, [
    gs?.slotPhase,
    gs?.slotSpinSessionId,
    gs?.targetResult?.join?.(","),
    gs?.slotMirrorMachineKey,
    gs?.slotVisualReels?.join?.(","),
    gs?.isReach,
    gs?.slotReachCutin,
    gs?.lastPayout,
    gs?.displayReels?.join?.(","),
    gs?.currentPlayerIdx,
    gs?.players?.[gs?.currentPlayerIdx ?? 0]?.lastSpinResult?.spin,
    gs?.players?.[gs?.currentPlayerIdx ?? 0]?.lastSpinResult?.tier,
    broadcastAlreadyDone,
    launchSpinAnimation,
    queueCompletedPresentation,
  ]);

  /** idle へ先に進んだ場合でも、未表示の直近スピン結果を追いつき表示 */
  useEffect(() => {
    const phase = gs?.slotPhase ?? "idle";
    if (phase !== "idle") return;
    if (spinAnimActiveRef.current || isSpinning || pendingCompletedFxRef.current || resultOverlayHold) return;
    const actor = gs?.players?.[gs?.currentPlayerIdx ?? 0];
    const last = actor?.lastSpinResult;
    const dr = pickDisplayReelsFromGameState(gs);
    if (!last || !dr) return;
    const winFxKey = `${last?.spin ?? 0}-${dr.join(",")}-${last?.tier ?? ""}-${String(gs?.lastPayout ?? "")}`;
    if (completedWinFxKeyRef.current === winFxKey) return;
    queueCompletedPresentation(gs);
  }, [
    gs?.slotPhase,
    gs?.lastPayout,
    gs?.displayReels?.join?.(","),
    gs?.currentPlayerIdx,
    gs?.players?.[gs?.currentPlayerIdx ?? 0]?.lastSpinResult?.spin,
    gs?.players?.[gs?.currentPlayerIdx ?? 0]?.lastSpinResult?.tier,
    isSpinning,
    resultOverlayHold,
    queueCompletedPresentation,
  ]);

  useEffect(() => {
    if (!reelsCanvasSettled || !pendingCompletedFxRef.current) return;
    const { tier, settledNet, payout } = pendingCompletedFxRef.current;
    pendingCompletedFxRef.current = null;
    setShowReachCutin(false);

    const tierLabel = tier && SLOT_TIER_LABELS[tier] ? SLOT_TIER_LABELS[tier] : tier;

    if (tier && tier !== "miss") {
      setShowWinEffect(tier);
      setCharReaction("win");
      soundRef?.current?.playWin?.(tier);
      if (tier === "jackpot" || tier === "potJackpot") {
        const actor = gs?.players?.[gs?.currentPlayerIdx ?? 0];
        setJackpotCelebrationMeta({
          actorName: actor?.name?.trim() || "",
          payout: payout ?? 0,
          variant: tier === "potJackpot" ? "pot" : "jackpot",
        });
        setShowJackpotCelebration(true);
      }
      const netLine =
        typeof settledNet === "number"
          ? `${settledNet >= 0 ? "+" : ""}${settledNet}G`
          : payout > 0
            ? `+${payout}G`
            : null;
      setResultSummary(
        netLine && tierLabel ? `${tierLabel}（${netLine}）` : tierLabel ?? "当たり",
      );
      if (payout > 0) {
        setPayoutAmount(payout);
        setShowPayout(true);
      }
      const clearMs =
        tier === "jackpot" || tier === "potJackpot" ? SLOT_JACKPOT_WIN_FX_CLEAR_MS : SLOT_WIN_FX_CLEAR_MS;
      pushTimeout(setTimeout(() => setShowWinEffect(null), clearMs));
      holdResultOverlay(
        tier === "jackpot" || tier === "potJackpot"
          ? SLOT_JACKPOT_CELEBRATION_MS + 600
          : clearMs + 500,
      );
    } else if (tier === "miss" || (typeof settledNet === "number" && settledNet < 0)) {
      setCharReaction("miss");
      const loss =
        typeof settledNet === "number" && settledNet < 0 ? `${settledNet}G` : null;
      setResultSummary(loss ? `ハズレ（${loss}）` : "ハズレ");
      holdResultOverlay(SLOT_RESULT_END_BURST_GRACE_MS + 2000);
    } else if (typeof settledNet === "number" && settledNet === 0) {
      setCharReaction("idle");
      setResultSummary("引き分け（±0G）");
      holdResultOverlay(SLOT_RESULT_END_BURST_GRACE_MS + 1200);
    }
  }, [reelsCanvasSettled, soundRef, gs?.currentPlayerIdx, gs?.players, holdResultOverlay]);

  useEffect(() => () => clearSpinVisualTimers(), []);

  const actorIdx = gs?.currentPlayerIdx ?? 0;
  const actor = gs?.players?.[actorIdx];
  const proxyIdx =
    typeof gs?.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0 ? gs.proxySlotTargetIdx : null;
  const targetGs = proxyIdx != null && gs?.players?.[proxyIdx] ? gs.players[proxyIdx] : null;
  const moneyGs = targetGs ?? actor;
  const charType = actor?.characterType ?? "salaryman";
  const charClass =
    charReaction === "win"
      ? "anim-char-bounce"
      : charReaction === "reach"
        ? "anim-char-pray"
        : charReaction === "spinning"
          ? "anim-char-wobble"
          : charReaction === "miss"
            ? "anim-char-sad"
            : "";

  const paylineWinFx = Boolean(showWinEffect);
  const potJackpotEnabled = (gs?.players?.length ?? 0) > 1;
  const broadcastMachine = slotMachineForReels(
    SLOT_MACHINES[gs?.slotMirrorMachineKey ?? "standard"] ?? SLOT_MACHINES.standard,
    potJackpotEnabled,
  );
  const slotSpinActive = isSpinning;
  const displayReelsMatch =
    Array.isArray(gs?.displayReels) &&
    gs.displayReels.length === 3 &&
    gs.displayReels[0] === gs.displayReels[1] &&
    gs.displayReels[0] === gs.displayReels[2];
  const paylineWinPulse =
    !slotSpinActive &&
    reelsCanvasSettled &&
    (paylineWinFx ||
      ((gs?.slotPhase ?? "idle") === "completed" && displayReelsMatch && (gs?.lastPayout ?? 0) > 0));
  const columnSpinning = [0, 1, 2].map((i) => isSpinning && !stoppedReelsRef.current[i]);
  const showWinFxNow = reelsCanvasSettled && showWinEffect && showWinEffect !== "miss";
  const isMajorWinFx = showWinEffect === "jackpot" || showWinEffect === "potJackpot";
  const showPayoutNow = reelsCanvasSettled && showPayout && payoutAmount > 0;
  const slotSpinning = (gs?.slotPhase ?? "idle") === "spinning" || isSpinning;
  const { showVictimSting } = useProxyVictimSting(gs, myId, isSpinning);

  const phase = gs?.slotPhase ?? "idle";
  const overlayVisible =
    phase === "spinning" ||
    phase === "completed" ||
    isSpinning ||
    resultOverlayHold ||
    showReachCutin ||
    showJackpotCelebration;
  const showOperatingBanner = slotSpinning && !resultSummary && !showReachCutin;
  if (!overlayVisible) return null;

  return (
    <>
      <JackpotCelebration
        show={showJackpotCelebration}
        variant={jackpotCelebrationMeta.variant}
        actorName={jackpotCelebrationMeta.actorName}
        payout={jackpotCelebrationMeta.payout}
        durationMs={SLOT_JACKPOT_CELEBRATION_MS}
        onComplete={() => setShowJackpotCelebration(false)}
      />
    <div
      className={[
        "pointer-events-none fixed inset-0 z-[180] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]",
        showVictimSting ? "anim-slot-victim-frame" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-live="polite"
      aria-label="他プレイヤーのスロット同期表示"
    >
      <div
        className={[
          "pointer-events-none max-h-[min(92vh,720px)] w-full max-w-[min(100%,480px)] overflow-y-auto rounded-2xl border border-amber-500/40 bg-slate-950/95 p-4 shadow-2xl",
          showWinFxNow && isMajorWinFx ? "anim-jp-rainbow" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <SlotProxyAccountability gs={gs} myId={myId} isSpinning={isSpinning} variant="broadcast" />

        <h2 className="mb-2 text-center text-sm font-bold text-amber-100 sm:text-base">
          {resultSummary
            ? "スロット結果（共有）"
            : gs?.slotPhase === "completed"
              ? "スロット結果（共有）"
              : "スロット進行中（共有）"}
          {actor && (
            <span className="mt-1 block text-xs font-semibold text-slate-300">
              {actor.name}
              {typeof gs?.activeBet === "number" && Number.isFinite(gs.activeBet) && (
                <span className="text-amber-200/90"> · {gs.activeBet}G</span>
              )}
              {targetGs && (
                <span className="text-violet-300">
                  {" "}
                  → 資金は {targetGs.name}（{moneyGs?.stats?.money ?? "—"}G）
                </span>
              )}
            </span>
          )}
        </h2>

        <div
          className={`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-3 isolate overflow-visible ${showWinFxNow && isMajorWinFx ? "anim-jp-rainbow" : ""}`}
        >
          {actor?.name && showOperatingBanner && (
            <div
              className="pointer-events-none absolute inset-0 z-[30] flex items-center justify-center"
              aria-live="polite"
            >
              <div className="mx-3 rounded-2xl border border-violet-400/55 bg-slate-950/95 px-6 py-3 text-center shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
                <p className="text-base font-bold text-violet-100 sm:text-lg">{actor.name} が操作中</p>
              </div>
            </div>
          )}
          {showWinFxNow && (
            <div className="absolute inset-0 z-[25] pointer-events-none overflow-hidden rounded-xl">
              {Array.from({ length: isMajorWinFx ? 28 : showWinEffect === "big" ? 16 : 8 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${(i * 97 + 11) % 100}%`,
                    top: "-30px",
                    fontSize: isMajorWinFx ? "1.6rem" : "1.2rem",
                    animation: `coinDrop ${1.4 + ((i * 0.11) % 1.2)}s ${((i * 0.07) % 1.1)}s ease-in forwards`,
                  }}
                >
                  {isMajorWinFx ? (showWinEffect === "potJackpot" ? ["💰", "🏆", "✨", "🪙"][i % 4] : ["🪙", "⭐", "💎", "✨"][i % 4]) : "🪙"}
                </span>
              ))}
            </div>
          )}

          <div className="relative z-[8] flex flex-col items-center gap-2 w-full">
            {isReachUI && (
              <p className="pointer-events-none mb-1 text-center text-xs font-black text-red-400 animate-pulse tracking-widest">
                🎯 REACH!!
              </p>
            )}
            <div
              className={[
                "slot-cabinet-stage relative mx-auto w-full max-w-[min(100%,440px)]",
                cabinetRecoil ? "slot-cabinet-recoiling" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {showPayoutNow && (
                <div
                  className="pointer-events-none absolute top-1/2 z-[42] flex -translate-y-1/2 items-center pl-2 sm:pl-3"
                  style={{ left: "100%" }}
                >
                  <span
                    role="presentation"
                    className="anim-slot-payout-popup font-black tabular-nums leading-none tracking-tight text-[#ffe566]"
                    style={{
                      fontSize: "clamp(2rem, min(12vw, 4rem), 4rem)",
                      WebkitTextStroke: "2px rgba(120,53,15,0.85)",
                      paintOrder: "stroke fill",
                      textShadow:
                        "0 0 2px #000, 0 2px 0 #854d0e, 0 4px 12px rgba(0,0,0,0.75), 0 0 28px rgba(250,204,21,0.75), 0 0 48px rgba(234,179,8,0.45)",
                    }}
                    onAnimationEnd={() => {
                      setShowPayout(false);
                      setPayoutAmount(0);
                    }}
                  >
                    +{payoutAmount}G
                  </span>
                </div>
              )}

              <div className="slot-machine-stack relative w-full min-h-[180px] sm:min-h-[200px]">
                <div className="absolute z-0 rounded-sm bg-[#0a0d14] pointer-events-none" style={winBox} aria-hidden />

                <div className="slot-reel-window absolute z-[1] overflow-hidden rounded-sm pointer-events-none" style={winBox}>
                  <SlotReelCanvasView
                    reelColumns={reelColumns}
                    columnSpinning={columnSpinning}
                    slipCols={slipAnimCols}
                    bouncingCol={bouncingReel}
                    paylineWinFx={paylineWinPulse}
                    reachCol={isReachUI ? 2 : -1}
                    machine={broadcastMachine}
                    spinSessionActive={slotSpinActive}
                    onReelsSettledChange={setReelsCanvasSettled}
                    className="h-full w-full"
                  />
                </div>

                <div className="slot-cabinet-img-wrap relative z-[10] mx-auto w-full max-w-full pointer-events-none">
                  <img
                    src={slotCabinetPng}
                    alt=""
                    decoding="async"
                    draggable={false}
                    className="slot-cabinet-img mx-auto block h-auto w-full max-w-full select-none pointer-events-none"
                    onError={(e) => {
                      const el = e.currentTarget;
                      const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
                      const step = el.dataset.cabinetImgTry ?? "0";
                      if (step === "0") {
                        el.dataset.cabinetImgTry = "1";
                        el.src = `${base}assets/images/slot-machine.png`;
                      } else if (step === "1") {
                        el.dataset.cabinetImgTry = "2";
                        el.src = `${base}images/slot-machine.png`;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-[12] mt-2 flex justify-center pointer-events-none">
            <CharacterIcon
              characterType={charType}
              imgClassName={`h-12 w-12 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] sm:h-14 sm:w-14 ${charClass}`}
              spanClassName={`text-4xl leading-none inline-block sm:text-5xl ${charClass}`}
            />
          </div>

          {showWinFxNow && showWinEffect === "jackpot" && (
            <p
              className="relative z-[26] mt-1 text-center text-base font-black text-amber-300 animate-pulse sm:text-lg"
              style={{ textShadow: "0 0 20px #fbbf24, 0 0 40px #f59e0b" }}
            >
              超大当たり!!
            </p>
          )}
          {showWinFxNow && showWinEffect === "potJackpot" && (
            <p
              className="relative z-[26] mt-1 text-center text-base font-black text-lime-300 animate-pulse sm:text-lg"
              style={{ textShadow: "0 0 20px #84cc16, 0 0 40px #65a30d" }}
            >
              POT JACKPOT!!
            </p>
          )}
          {resultSummary && reelsCanvasSettled && !isSpinning && (
            <p
              className="relative z-[27] mt-2 text-center text-base font-black text-amber-200 sm:text-lg"
              role="status"
            >
              {resultSummary}
            </p>
          )}
        </div>

        <p className="mt-2 text-center text-[10px] text-slate-500 sm:text-xs">
          絵柄は手番側で事前に確定済み。リーチ（カットインなし）は約{(SLOT_SYNC_T2_REACH_NOCUTIN / 1000).toFixed(1)}秒、リーチ（カットインあり）は約{(SLOT_SYNC_T2_REACH_CUTIN / 1000).toFixed(1)}秒、通常は約{(SLOT_SYNC_T2_NOREACH / 1000).toFixed(1)}秒で全リール停止します。
        </p>
      </div>
    </div>

      {showReachCutin && (
        <div className="slot-reach-cutin-full" aria-hidden>
          <div className="slot-reach-cutin-full-speed" />
          <div className="slot-reach-cutin-full-dim" />
          <div className="slot-reach-cutin-full-vignette" />
          <div className="slot-reach-cutin-full-scan slot-reach-cutin-full-scan--top" />
          <div className="slot-reach-cutin-full-scan slot-reach-cutin-full-scan--bottom" />
          <div className="slot-reach-cutin-full-frame" />
          <div className="slot-reach-cutin-full-center">
            <div className="slot-reach-cutin-hero">
              <div className="slot-reach-cutin-hero-bar" aria-hidden />
              {REACH_CUTIN_RIMIRU_TYPES.has(charType) ? (
                <img
                  alt=""
                  decoding="async"
                  draggable={false}
                  src={`${publicAssetBase}images/chance_rrm.png`}
                  className="select-none"
                  onError={(e) => {
                    const el = e.currentTarget;
                    const step = el.dataset.chanceCutinTry ?? "0";
                    if (step === "0") {
                      el.dataset.chanceCutinTry = "1";
                      el.src = `${publicAssetBase}assets/images/chance_rrm.png`;
                    }
                  }}
                />
              ) : (
                <CharacterIcon
                  characterType={charType}
                  imgClassName=""
                  spanClassName="select-none block mx-auto text-[clamp(4rem,18vw,8rem)] leading-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)]"
                />
              )}
              <div className="slot-reach-cutin-hero-bar slot-reach-cutin-hero-bar--bottom" aria-hidden />
            </div>
            <p className="slot-reach-cutin-full-chance-tag font-black">チャンス！！</p>
          </div>
        </div>
      )}

      {reachCutinFlash && (
        <div className="fixed inset-0 z-[10060] pointer-events-none anim-slot-reach-cutin-white-flash" aria-hidden />
      )}
    </>
  );
}
