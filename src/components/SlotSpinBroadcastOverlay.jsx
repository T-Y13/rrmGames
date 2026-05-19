import React, { useEffect, useRef, useState } from "react";
import slotCabinetPng from "../assets/slot-machine.png";
import { CharacterIcon } from "./CharacterPieces";
import SlotReelCanvasView from "./SlotReelCanvasView";
import { SLOT_MACHINES } from "../constants/gameBalance";
import {
  randomStripTriple,
  SLOT_SYNC_SPIN_MS,
  SLOT_SYNC_T0,
  SLOT_SYNC_T1,
  SLOT_SYNC_T2_NOREACH,
  SLOT_SYNC_T2_REACH,
  SLOT_SYNC_REACH_SHOW_DELAY,
  slotTargetIndicesToPaylineMiddles,
  stripTripleForMiddleColumn,
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
export default function SlotSpinBroadcastOverlay({ gs, soundRef }) {
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

  const shuffleIntervalRef = useRef(null);
  const stoppedReelsRef = useRef([false, false, false]);
  const timeoutIdsRef = useRef([]);
  const completedWinFxKeyRef = useRef("");
  const pendingCompletedFxRef = useRef(null);

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
    if ((gs?.slotPhase ?? "idle") === "idle") {
      completedWinFxKeyRef.current = "";
      setIsReachUI(false);
    }
  }, [gs?.slotPhase]);

  /** 結果反映後（completed）や遅延ジョイン：displayReels で揃える */
  useEffect(() => {
    if (gs?.slotPhase !== "completed") return;
    const dr = gs?.displayReels;
    if (!Array.isArray(dr) || dr.length !== 3) return;
    const machine = SLOT_MACHINES[gs.slotMirrorMachineKey] ?? SLOT_MACHINES.standard;
    clearSpinVisualTimers();
    setIsSpinning(false);
    setReelColumns(dr.map((mid, ci) => stripTripleForMiddleColumn(mid, machine, ci)));

    const actor = gs?.players?.[gs?.currentPlayerIdx ?? 0];
    const last = actor?.lastSpinResult;
    const winFxKey = `${last?.spin ?? 0}-${dr.join(",")}-${last?.tier ?? ""}-${String(gs?.lastPayout ?? "")}`;
    if (completedWinFxKeyRef.current === winFxKey) {
      return () => {
        clearSpinVisualTimers();
      };
    }
    completedWinFxKeyRef.current = winFxKey;

    setShowWinEffect(null);
    setShowPayout(false);
    setPayoutAmount(0);
    setCharReaction("idle");
    setIsReachUI(false);
    setReelsCanvasSettled(false);

    const settledNet =
      typeof gs?.lastPayout === "number" && Number.isFinite(gs.lastPayout)
        ? gs.lastPayout
        : typeof last?.net === "number"
          ? last.net
          : null;

    pendingCompletedFxRef.current = {
      tier: last?.tier ?? null,
      settledNet,
      payout: last?.payout ?? 0,
    };

    return () => {
      clearSpinVisualTimers();
    };
  }, [
    gs?.slotPhase,
    gs?.lastPayout,
    gs?.displayReels?.join?.(","),
    gs?.slotMirrorMachineKey,
    gs?.currentPlayerIdx,
    gs?.players?.[gs?.currentPlayerIdx ?? 0]?.lastSpinResult?.spin,
    gs?.players?.[gs?.currentPlayerIdx ?? 0]?.lastSpinResult?.tier,
  ]);

  useEffect(() => {
    if (!reelsCanvasSettled || !pendingCompletedFxRef.current) return;
    const { tier, settledNet, payout } = pendingCompletedFxRef.current;
    pendingCompletedFxRef.current = null;

    if (tier && tier !== "miss") {
      setShowWinEffect(tier);
      setCharReaction("win");
      soundRef?.current?.playWin?.(tier);
      pushTimeout(
        setTimeout(() => {
          setShowWinEffect(null);
        }, 3500),
      );
    } else if (tier === "miss" || (typeof settledNet === "number" && settledNet < 0)) {
      setCharReaction("miss");
    } else if (typeof settledNet === "number" && settledNet === 0) {
      setCharReaction("idle");
    }

    if (typeof settledNet !== "number" && tier && tier !== "miss") {
      setPayoutAmount(payout);
      setShowPayout(true);
    }
  }, [reelsCanvasSettled, soundRef]);

  useEffect(() => {
    if (gs?.slotPhase !== "spinning") {
      return () => {
        clearSpinVisualTimers();
      };
    }
    const sid = gs?.slotSpinSessionId;
    const tr = gs?.targetResult;
    const mk = gs?.slotMirrorMachineKey ?? "standard";
    if (typeof sid !== "string" || !sid || !Array.isArray(tr) || tr.length !== 3) {
      return () => {
        clearSpinVisualTimers();
      };
    }

    clearSpinVisualTimers();
    stoppedReelsRef.current = [false, false, false];

    const machine = SLOT_MACHINES[mk] ?? SLOT_MACHINES.standard;
    const sm = soundRef?.current;

    // targetResult は「実際の止まる絵柄」だが、
    // slotVisualReels が存在すれば near-miss 加工後の視覚リールを使って
    // 1・2リール目をそちらで表示する（3リールは targetResult の実値）
    const visualMids =
      Array.isArray(gs?.slotVisualReels) && gs.slotVisualReels.length === 3
        ? gs.slotVisualReels
        : slotTargetIndicesToPaylineMiddles(tr, mk);
    const realMids = slotTargetIndicesToPaylineMiddles(tr, mk);

    const visualStrips = visualMids.map((mid, ci) => stripTripleForMiddleColumn(mid, machine, ci));
    const realStrip2 = stripTripleForMiddleColumn(realMids[2], machine, 2);

    const isReach = Boolean(gs?.isReach);

    setCabinetRecoil(true);
    pushTimeout(setTimeout(() => setCabinetRecoil(false), 340));
    setIsSpinning(true);
    setReelsCanvasSettled(false);
    pendingCompletedFxRef.current = null;
    setIsReachUI(false);
    setShowWinEffect(null);
    setShowPayout(false);
    setPayoutAmount(0);
    setCharReaction("spinning");
    setReelColumns(defaultCols());
    setBouncingReel(-1);

    sm?.playStart?.();
    pushTimeout(setTimeout(() => sm?.startSpin?.(), 200));

    shuffleIntervalRef.current = setInterval(() => {
      const stopped = stoppedReelsRef.current;
      setReelColumns((prev) => prev.map((col, i) => (stopped[i] ? col : randomStripTriple(machine))));
    }, 80);

    /** リール idx を停止させる（視覚リール側の絵柄を使う） */
    const stopReel = (idx, strip) => {
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
      // ── リーチなし：手番側と同じ t0/t1/t2 で3本を個別停止 ──
      pushTimeout(setTimeout(() => stopReel(0, visualStrips[0]), SLOT_SYNC_T0));
      pushTimeout(setTimeout(() => stopReel(1, visualStrips[1]), SLOT_SYNC_T1));
      pushTimeout(
        setTimeout(() => {
          if (shuffleIntervalRef.current) {
            clearInterval(shuffleIntervalRef.current);
            shuffleIntervalRef.current = null;
          }
          sm?.stopSpin?.();
          stopReel(2, realStrip2);
          setIsSpinning(false);
          setCharReaction("idle");
        }, SLOT_SYNC_T2_NOREACH),
      );
    } else {
      // ── リーチあり：1→2で止めてREACH演出、3はゆっくり止める ──
      pushTimeout(setTimeout(() => stopReel(0, visualStrips[0]), SLOT_SYNC_T0));
      pushTimeout(setTimeout(() => stopReel(1, visualStrips[1]), SLOT_SYNC_T1));

      // REACH UI + サウンド
      pushTimeout(
        setTimeout(() => {
          setIsReachUI(true);
          setCharReaction("reach");
          pushTimeout(setTimeout(() => sm?.playReach?.(), 150));
        }, SLOT_SYNC_T1 + SLOT_SYNC_REACH_SHOW_DELAY),
      );

      // 第3リールを最終停止
      pushTimeout(
        setTimeout(() => {
          if (shuffleIntervalRef.current) {
            clearInterval(shuffleIntervalRef.current);
            shuffleIntervalRef.current = null;
          }
          sm?.stopSpin?.();
          stopReel(2, realStrip2);
          setIsReachUI(false);
          setIsSpinning(false);
          setCharReaction("idle");
        }, SLOT_SYNC_T2_REACH),
      );
    }

    return () => {
      clearSpinVisualTimers();
    };
  }, [gs?.slotPhase, gs?.slotSpinSessionId, gs?.isReach, soundRef]);

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
  const broadcastMachine = SLOT_MACHINES[gs?.slotMirrorMachineKey] ?? SLOT_MACHINES.standard;
  const displayReelsMatch =
    Array.isArray(gs?.displayReels) &&
    gs.displayReels.length === 3 &&
    gs.displayReels[0] === gs.displayReels[1] &&
    gs.displayReels[0] === gs.displayReels[2];
  const paylineWinPulse =
    reelsCanvasSettled &&
    (paylineWinFx ||
      ((gs?.slotPhase ?? "idle") === "completed" && displayReelsMatch && (gs?.lastPayout ?? 0) > 0));
  const columnSpinning = [0, 1, 2].map((i) => isSpinning && !stoppedReelsRef.current[i]);
  const showWinFxNow = reelsCanvasSettled && showWinEffect && showWinEffect !== "miss";
  const showPayoutNow = reelsCanvasSettled && showPayout && payoutAmount > 0;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[180] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
      aria-live="polite"
      aria-label="他プレイヤーのスロット同期表示"
    >
      <div
        className={[
          "pointer-events-none max-h-[min(92vh,720px)] w-full max-w-[min(100%,480px)] overflow-y-auto rounded-2xl border border-amber-500/40 bg-slate-950/95 p-4 shadow-2xl",
          showWinFxNow && showWinEffect === "jackpot" ? "anim-jp-rainbow" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <h2 className="mb-2 text-center text-sm font-bold text-amber-100 sm:text-base">
          {gs?.slotPhase === "completed" ? "スロット結果（共有）" : "スロット進行中（共有）"}
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
          className={`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-3 isolate overflow-visible ${showWinFxNow && showWinEffect === "jackpot" ? "anim-jp-rainbow" : ""}`}
        >
          {showWinFxNow && (
            <div className="absolute inset-0 z-[25] pointer-events-none overflow-hidden rounded-xl">
              {Array.from({ length: showWinEffect === "jackpot" ? 28 : showWinEffect === "big" ? 16 : 8 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${(i * 97 + 11) % 100}%`,
                    top: "-30px",
                    fontSize: showWinEffect === "jackpot" ? "1.6rem" : "1.2rem",
                    animation: `coinDrop ${1.4 + ((i * 0.11) % 1.2)}s ${((i * 0.07) % 1.1)}s ease-in forwards`,
                  }}
                >
                  {showWinEffect === "jackpot" ? ["🪙", "⭐", "💎", "✨"][i % 4] : "🪙"}
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
                    onReelsSettledChange={setReelsCanvasSettled}
                    className="h-full w-full"
                  />
                  <div className="slot-win-line" aria-hidden />
                  <span className="slot-payline-marker slot-payline-marker--l" aria-hidden>
                    ▶
                  </span>
                  <span className="slot-payline-marker slot-payline-marker--r" aria-hidden>
                    ◀
                  </span>
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
              777 JACKPOT!!
            </p>
          )}
        </div>

        <p className="mt-2 text-center text-[10px] text-slate-500 sm:text-xs">
          絵柄は手番側で事前に確定済み。リーチありは約{(SLOT_SYNC_T2_REACH / 1000).toFixed(0)}秒、なしは約{(SLOT_SYNC_T2_NOREACH / 1000).toFixed(1)}秒で全リール停止します。
        </p>
      </div>
    </div>
  );
}
