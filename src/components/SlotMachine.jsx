import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRight, Dice5, Volume2, VolumeX } from "lucide-react";
import slotCabinetPng from "../assets/slot-machine.png";
import { CharacterIcon } from "./CharacterPieces";
import SlotReelCanvasView from "./SlotReelCanvasView";
import { BAL, SLOT_BETS, SLOT_COST, SLOT_MACHINES } from "../constants/gameBalance";
import {
  advanceDay8AfterSlotSpinShow,
  applyDay8SlotSpinToFreshGameState,
  calcSlotRates,
  computeAdvanceDay8Turn,
  getSlotReachAnimationState,
  pickWrongSymbol,
  randomStripTriple,
  rankLabel,
  rollReachCutInDisplay,
  spinSlot,
  slotPaylineMiddlesToTargetIndices,
  stripLegacySlotFirestoreFields,
  stripTripleForMiddleColumn,
  rand,
  SLOT_RESULT_END_BURST_GRACE_MS,
  SLOT_SYNC_DEFAULTS,
  SLOT_SYNC_T0,
  SLOT_SYNC_T1,
  SLOT_SYNC_T2_NOREACH,
  SLOT_SYNC_T2_REACH,
} from "../utils/gameLogic";

/** リーチ演出×実結果に応じたセリフ（ログ用）。characterType で切替（ririm は vtuber 扱い） */
function buildSlotReachEmotionLine(characterType, cutInShown, won) {
  const ct = characterType === "ririm" ? "vtuber" : characterType ?? "salaryman";
  if (cutInShown && won) {
    if (ct === "vtuber") return "Jackpot! My fans are gonna love this clip! ✨";
    if (ct === "student") return "Whoa, it actually worked! Beginner's luck is real! 🎓";
    return null;
  }
  if (cutInShown && !won) {
    if (ct === "vtuber") return "Whaat?! It looked so hot! This game is rigged! 💢";
    if (ct === "student") return "Wait, that was a miss? But the effect was so flashy...";
    return null;
  }
  if (!cutInShown && won) {
    if (ct === "salaryman") return "Calculated. Visual flair isn't everything. 💼";
    if (ct === "student") return "Huh? I wasn't even watching and I won!";
    return null;
  }
  return null;
}

/**
 * 【カットイン前】リーチ時のタイムライン基準 `t2Base` を過ぎてから、さらに何 ms 経ってからオーバーを出すか。
 * ここを上げると「カットインはまだ」のテンションだけ伸びます（画面上の滞留時間とは別）。
 */
const REACH_CUTIN_SPIN_PAD_BEFORE_REVEAL_MS = 0;
/**
 * 【カットイン本体】オーバー表示開始〜閉じ始め（dismiss）までの最短 ms。
 * 演出の長さは主にこれで調整（旧 REACH_CUTIN_REEL_HOLD_EXTRA で伸びなかった理由は、この値が固定だったためではなく
 * 「reel3StopAt と tCutinReveal が連動して差が約680ms固定」だったため。今は離してある）。
 */
const REACH_CUTIN_ON_SCREEN_MS = 2000;
/** カットイン発動と同時：全リールのシャッフル更新を止める時間（ストップモーション） */
const REACH_CUTIN_ALL_REELS_FREEZE_MS = 600;
/** カットインが消えたあと、この分だけ待ってから第3リールを止める */
const REACH_CUTIN_AFTER_DISMISS_MS = 1000;

/** リーチカットイン中央画像：リリムは専用アート、その他は一覧アイコン */
const REACH_CUTIN_RIMIRU_TYPES = new Set(["vtuber", "ririm"]);

/** 8日目スロット本体UI・リール制御・確認カウントダウン */
export default function SlotMachine({
  gs,
  cpGs,
  isMyTurn,
  writeGS,
  commitPendingGameState,
  commitGameStateTransaction,
  soundRef,
  roomId,
  interactionLocked = false,
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [localReels, setLocalReels] = useState(["?", "?", "?"]);
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);
  const [confirmCountdown, setConfirmCountdown] = useState(5);
  const [selectedMachineKey, setSelectedMachineKey] = useState("standard");
  const [reelColumns, setReelColumns] = useState([
    ["🎰", "🎰", "🎰"],
    ["🎰", "🎰", "🎰"],
    ["🎰", "🎰", "🎰"],
  ]);
  const [slipAnimCols, setSlipAnimCols] = useState([false, false, false]);
  const [bouncingReel, setBouncingReel] = useState(-1);
  const [isReach, setIsReach] = useState(false);
  const [showReachCutin, setShowReachCutin] = useState(false);
  const [reachCutinGasing, setReachCutinGasing] = useState(false);
  const [reachCutinFlash, setReachCutinFlash] = useState(false);
  const [showWinEffect, setShowWinEffect] = useState(null);
  const [charReaction, setCharReaction] = useState("idle");
  const [cabinetRecoil, setCabinetRecoil] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(0);
  const [showPayout, setShowPayout] = useState(false);
  const [reelsCanvasSettled, setReelsCanvasSettled] = useState(true);
  const [postSpinPending, setPostSpinPending] = useState(false);

  const shuffleIntervalRef = useRef(null);
  const pendingWinFxRef = useRef(null);
  const postSpinResultRef = useRef(null);
  const postSpinFlushTimerRef = useRef(null);
  const stoppedReelsRef = useRef([false, false, false]);
  const pendingGSRef = useRef(null);
  const reachCutInTimerRef = useRef(null);
  const spinFreezeCutinUntilRef = useRef(0);
  const slotPostResultGraceTimerRef = useRef(null);
  const spinTimersRef = useRef([]);

  const clearSpinTimers = useCallback(() => {
    for (const id of spinTimersRef.current) {
      clearTimeout(id);
    }
    spinTimersRef.current = [];
    if (shuffleIntervalRef.current) {
      clearInterval(shuffleIntervalRef.current);
      shuffleIntervalRef.current = null;
    }
    if (reachCutInTimerRef.current) {
      clearTimeout(reachCutInTimerRef.current);
      reachCutInTimerRef.current = null;
    }
  }, []);

  const scheduleSpinTimer = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    spinTimersRef.current.push(id);
    return id;
  }, []);

  const clearPostSpinFlushTimer = useCallback(() => {
    if (postSpinFlushTimerRef.current) {
      clearTimeout(postSpinFlushTimerRef.current);
      postSpinFlushTimerRef.current = null;
    }
  }, []);

  const commitPendingAdvance = useCallback(
    async (pending) => {
      if (!pending) return;
      if (roomId) await commitPendingGameState(pending);
      else await writeGS(pending);
    },
    [roomId, commitPendingGameState, writeGS],
  );

  const finalizePostSpinResult = useCallback(
    (resultGS) => {
      if (!postSpinResultRef.current) return;
      postSpinResultRef.current = null;
      clearPostSpinFlushTimer();
      setPostSpinPending(false);

      const actor = resultGS.players?.[resultGS.currentPlayerIdx];
      const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
      const slotLeft = actor?.slotTurnsLeft ?? 0;
      const pullsSeat = actor?.slotPullsThisSeat ?? 0;
      const canContinueBurst = actor?.movePhase === "arrived" && slotLeft > 0 && pullsSeat < burst;

      if (canContinueBurst) {
        if (slotPostResultGraceTimerRef.current) {
          clearTimeout(slotPostResultGraceTimerRef.current);
          slotPostResultGraceTimerRef.current = null;
        }
        void writeGS(
          stripLegacySlotFirestoreFields({
            ...resultGS,
            ...SLOT_SYNC_DEFAULTS,
            showSpinResult: false,
          }),
        );
        return;
      }

      if (slotPostResultGraceTimerRef.current) {
        clearTimeout(slotPostResultGraceTimerRef.current);
      }
      slotPostResultGraceTimerRef.current = setTimeout(() => {
        slotPostResultGraceTimerRef.current = null;
        pendingGSRef.current = advanceDay8AfterSlotSpinShow(resultGS);
        setAwaitingConfirm(true);
        setConfirmCountdown(5);
      }, SLOT_RESULT_END_BURST_GRACE_MS);
    },
    [clearPostSpinFlushTimer, writeGS],
  );

  const schedulePostSpinResult = useCallback(
    (resultGS) => {
      postSpinResultRef.current = resultGS;
      setPostSpinPending(true);
      clearPostSpinFlushTimer();
      postSpinFlushTimerRef.current = setTimeout(() => {
        finalizePostSpinResult(resultGS);
      }, 3200);
    },
    [clearPostSpinFlushTimer, finalizePostSpinResult],
  );

  const cpIsSlot =
    gs?.gamePhase === "playing" && gs?.subPhase === "day8" && cpGs?.movePhase === "arrived";

  const proxySlotTargetIdx =
    typeof gs?.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0 ? gs.proxySlotTargetIdx : null;
  const targetGs =
    proxySlotTargetIdx != null && gs?.players?.[proxySlotTargetIdx] ? gs.players[proxySlotTargetIdx] : null;
  const moneyGs = targetGs ?? cpGs;

  const displayReelsKey = gs?.displayReels?.join?.(",") ?? "";

  useEffect(
    () => () => {
      if (slotPostResultGraceTimerRef.current) {
        clearTimeout(slotPostResultGraceTimerRef.current);
        slotPostResultGraceTimerRef.current = null;
      }
      clearPostSpinFlushTimer();
      clearSpinTimers();
    },
    [clearPostSpinFlushTimer, clearSpinTimers],
  );

  useEffect(() => {
    if (!reelsCanvasSettled || !pendingWinFxRef.current) return;
    const { tier, payout } = pendingWinFxRef.current;
    pendingWinFxRef.current = null;
    setPayoutAmount(payout);
    setShowPayout(true);
    setShowWinEffect(tier);
    setCharReaction("win");
    setTimeout(() => soundRef.current?.playWin?.(tier), 80);
    const clearFx = setTimeout(() => setShowWinEffect(null), 4000);
    return () => clearTimeout(clearFx);
  }, [reelsCanvasSettled, soundRef]);

  /** リール完全停止後：バースト継続なら即 idle、終了時は猶予→確認（canvas 未通知時は schedule 側のフォールバック） */
  useEffect(() => {
    if (!reelsCanvasSettled || !postSpinResultRef.current) return;
    finalizePostSpinResult(postSpinResultRef.current);
  }, [reelsCanvasSettled, finalizePostSpinResult]);

  const slotPhaseIdle = (gs?.slotPhase ?? "idle") === "idle";

  const canSpin =
    gs?.gamePhase === "playing" &&
    isMyTurn &&
    cpIsSlot &&
    !!(cpGs?.slotTurnsLeft > 0) &&
    !interactionLocked &&
    !isSpinning &&
    !awaitingConfirm &&
    slotPhaseIdle;

  useEffect(() => {
    if (!cpIsSlot || isSpinning) return;
    const dr = gs?.displayReels;
    if (!Array.isArray(dr) || dr.length !== 3) return;
    const m = SLOT_MACHINES[selectedMachineKey] ?? SLOT_MACHINES.standard;
    setReelColumns(dr.map((mid, ci) => stripTripleForMiddleColumn(mid, m, ci)));
  }, [cpIsSlot, isSpinning, displayReelsKey, selectedMachineKey, gs?.displayReels]);

  useEffect(() => {
    if (!awaitingConfirm) return;
    if (confirmCountdown <= 0) {
      const pending = pendingGSRef.current;
      pendingGSRef.current = null;
      setAwaitingConfirm(false);
      setConfirmCountdown(5);
      if (pending) void commitPendingAdvance(pending);
      return;
    }
    const t = setTimeout(() => setConfirmCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [awaitingConfirm, confirmCountdown, commitPendingAdvance]);

  const handleConfirm = async () => {
    if (interactionLocked) return;
    if (slotPostResultGraceTimerRef.current) return;
    const pending = pendingGSRef.current;
    pendingGSRef.current = null;
    setAwaitingConfirm(false);
    setConfirmCountdown(5);
    setPostSpinPending(false);
    await commitPendingAdvance(pending);
  };

  const skipSlot = async () => {
    if (!gs || !isMyTurn || isSpinning || interactionLocked) return;
    const phase = gs?.slotPhase ?? "idle";
    if (phase !== "idle" && phase !== "completed") return;
    const idx = gs.currentPlayerIdx;
    const p = gs.players[idx];
    const pxy = typeof gs.proxySlotTargetIdx === "number" ? gs.proxySlotTargetIdx : null;
    const wallet = pxy != null && gs.players[pxy] ? gs.players[pxy] : p;
    const logs = [
      `${p.name} スロット終了 / ${pxy != null ? `${wallet.name}の資金 ` : "資金"}${wallet.stats.money}G / ランク${rankLabel(wallet.stats.money)}`,
    ];
    const newPlayers = gs.players.map((pl, i) =>
      i !== idx ? pl : { ...pl, slotTurnsLeft: 0, slotPullsGranted: 0, slotPullsThisSeat: 0 },
    );
    await writeGS(computeAdvanceDay8Turn({ ...gs, proxySlotTargetIdx: null }, newPlayers, logs));
  };

  const handleSpin = async (bet = SLOT_COST) => {
    if (isSpinning || !isMyTurn || !gs || interactionLocked) return;
    if ((gs?.slotPhase ?? "idle") !== "idle") return;
    if (slotPostResultGraceTimerRef.current) {
      clearTimeout(slotPostResultGraceTimerRef.current);
      slotPostResultGraceTimerRef.current = null;
    }
    const p = gs.players[gs.currentPlayerIdx];
    if (p.slotTurnsLeft <= 0) return;
    const machine = SLOT_MACHINES[selectedMachineKey] ?? SLOT_MACHINES.standard;

    const proxyIdx =
      typeof gs.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0 ? gs.proxySlotTargetIdx : null;
    const statsForSpin =
      proxyIdx != null && gs.players[proxyIdx] ? gs.players[proxyIdx].stats : p.stats;

    const heat = p.slotHeat ?? 0;
    const pityBefore = p.slotPityCounter ?? 0;
    const slotTurnsBefore = p.slotTurnsLeft;
    const res = spinSlot(statsForSpin, bet, selectedMachineKey, heat, p.characterType, { pityCounter: pityBefore });

    let visualReels = [...res.reels];
    if (res.tier === "miss") {
      const sym = machine.symbols;
      const nm = BAL.slot.nearMissReachChance;
      const sp = BAL.slot.slipSymbolChance;
      const u = Math.random();
      if (sym.length >= 2 && u < nm) {
        const a = sym[rand(0, sym.length - 1)];
        const diff = sym.filter((s) => s !== a);
        const b = diff[rand(0, diff.length - 1)];
        visualReels = [a, a, b];
      } else if (u < nm + sp) {
        const slipPos = rand(0, 2);
        visualReels[slipPos] = sym[1];
      }
    }

    const { reachPossible } = getSlotReachAnimationState(visualReels, res.tier);
    const shouldShowReachCutin = reachPossible && rollReachCutInDisplay();

    const lkEx = Math.max(0, statsForSpin.luck - BAL.slot.luckBaseline);
    const skEx = Math.max(0, statsForSpin.skill - BAL.slot.skillBaseline);
    const slipEligible = res.tier !== "miss" && (lkEx >= 10 || skEx >= 10);
    const finalStrips = visualReels.map((mid, ci) => stripTripleForMiddleColumn(mid, machine, ci));

    const t0 = SLOT_SYNC_T0;
    const t1 = SLOT_SYNC_T1;
    const t2Base = reachPossible
      ? shouldShowReachCutin
        ? t1 + 2400
        : SLOT_SYNC_T2_REACH
      : SLOT_SYNC_T2_NOREACH;
    const tCutinReveal = shouldShowReachCutin
      ? Math.max(t1 + 480, t2Base + REACH_CUTIN_SPIN_PAD_BEFORE_REVEAL_MS)
      : Infinity;
    const reel3StopAt = shouldShowReachCutin
      ? Math.max(
          t2Base + REACH_CUTIN_SPIN_PAD_BEFORE_REVEAL_MS,
          Math.round(tCutinReveal + REACH_CUTIN_ON_SCREEN_MS),
        )
      : t2Base;

    clearSpinTimers();

    if (roomId) {
      const targetResult = slotPaylineMiddlesToTargetIndices(visualReels, machine);
      const slotSpinSessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      const spinningOk = await writeGS(
        stripLegacySlotFirestoreFields({
          ...gs,
          slotPhase: "spinning",
          activeBet: bet,
          targetResult,
          slotSpinSessionId,
          slotMirrorMachineKey: selectedMachineKey,
          isReach: reachPossible,
          slotVisualReels: visualReels,
        }),
      );
      if (spinningOk === false) {
        return;
      }
    }

    setCabinetRecoil(true);
    scheduleSpinTimer(() => setCabinetRecoil(false), 340);
    setIsSpinning(true);
    setReelsCanvasSettled(false);
    pendingWinFxRef.current = null;
    postSpinResultRef.current = null;
    setPostSpinPending(false);
    clearPostSpinFlushTimer();
    setIsReach(false);
    setShowReachCutin(false);
    setReachCutinGasing(false);
    setReachCutinFlash(false);
    spinFreezeCutinUntilRef.current = 0;
    if (reachCutInTimerRef.current) {
      clearTimeout(reachCutInTimerRef.current);
      reachCutInTimerRef.current = null;
    }
    setShowWinEffect(null);
    setShowPayout(false);
    setPayoutAmount(0);
    setCharReaction("spinning");
    stoppedReelsRef.current = [false, false, false];
    setSlipAnimCols([false, false, false]);
    setReelColumns([
      ["🎰", "🎰", "🎰"],
      ["🎰", "🎰", "🎰"],
      ["🎰", "🎰", "🎰"],
    ]);
    setBouncingReel(-1);
    setLocalReels(visualReels);

    const sm = soundRef.current;
    sm?.playStart();
    scheduleSpinTimer(() => sm?.startSpin(), 200);

    shuffleIntervalRef.current = setInterval(() => {
      if (performance.now() < spinFreezeCutinUntilRef.current) return;
      const stopped = stoppedReelsRef.current;
      setReelColumns((prev) => prev.map((col, i) => (stopped[i] ? col : randomStripTriple(machine))));
    }, 80);

    const finalizeColumn = (idx, targetStrip, allowSlip) => {
      const doSlip = allowSlip && slipEligible && Math.random() < 0.5;
      if (doSlip) {
        const wm = pickWrongSymbol(targetStrip[1], machine);
        const faux = [targetStrip[0], wm, targetStrip[2]];
        stoppedReelsRef.current[idx] = true;
        setReelColumns((prev) => {
          const n = [...prev];
          n[idx] = faux;
          return n;
        });
        setBouncingReel(idx);
        sm?.playStop(idx);
        scheduleSpinTimer(() => setBouncingReel(-1), 430);
        scheduleSpinTimer(() => {
          setReelColumns((prev) => {
            const n = [...prev];
            n[idx] = targetStrip;
            return n;
          });
          setSlipAnimCols((prev) => {
            const n = [...prev];
            n[idx] = true;
            return n;
          });
          scheduleSpinTimer(() => {
            setSlipAnimCols((prev) => {
              const nn = [...prev];
              nn[idx] = false;
              return nn;
            });
          }, 560);
        }, 380);
      } else {
        stoppedReelsRef.current[idx] = true;
        setReelColumns((prev) => {
          const n = [...prev];
          n[idx] = targetStrip;
          return n;
        });
        setBouncingReel(idx);
        sm?.playStop(idx);
        scheduleSpinTimer(() => setBouncingReel(-1), 430);
      }
    };

    scheduleSpinTimer(() => finalizeColumn(0, finalStrips[0], true), t0);

    scheduleSpinTimer(() => finalizeColumn(1, finalStrips[1], true), t1);
    if (reachPossible) {
      scheduleSpinTimer(() => {
        setIsReach(true);
        setCharReaction("reach");
        scheduleSpinTimer(() => sm?.playReach(), 150);
      }, t1 + 400);
    }

    if (shouldShowReachCutin && tCutinReveal < reel3StopAt) {
      reachCutInTimerRef.current = scheduleSpinTimer(() => {
        reachCutInTimerRef.current = null;
        spinFreezeCutinUntilRef.current = performance.now() + REACH_CUTIN_ALL_REELS_FREEZE_MS;
        setReachCutinFlash(true);
        scheduleSpinTimer(() => setReachCutinFlash(false), 110);
        setShowReachCutin(true);
      }, tCutinReveal);
    }

    const dismissReachCutin = () =>
      new Promise((resolve) => {
        if (!shouldShowReachCutin) {
          setShowReachCutin(false);
          setReachCutinGasing(false);
          resolve();
          return;
        }
        if (res.tier === "miss") {
          setReachCutinGasing(true);
          sm?.playReachGaseSting();
          scheduleSpinTimer(() => {
            setShowReachCutin(false);
            setReachCutinGasing(false);
            resolve();
          }, 720);
          return;
        }
        scheduleSpinTimer(() => {
          setShowReachCutin(false);
          setReachCutinGasing(false);
          resolve();
        }, 200);
      });

    scheduleSpinTimer(async () => {
      if (reachCutInTimerRef.current) {
        clearTimeout(reachCutInTimerRef.current);
        reachCutInTimerRef.current = null;
      }

      if (shouldShowReachCutin) {
        await dismissReachCutin();
        await new Promise((r) => setTimeout(r, REACH_CUTIN_AFTER_DISMISS_MS));
      }

      clearInterval(shuffleIntervalRef.current);
      sm?.stopSpin();
      finalizeColumn(2, finalStrips[2], true);
      setIsReach(false);
      setReelColumns(finalStrips);

      if (res.tier !== "miss") {
        pendingWinFxRef.current = { tier: res.tier, payout: res.payout };
      } else {
        pendingWinFxRef.current = null;
        setCharReaction("miss");
      }

      const newLeft = p.slotTurnsLeft - 1;
      const newPullsSeat = (p.slotPullsThisSeat ?? 0) + 1;
      const newSpins = p.spinCount + 1;
      const newHeat = heat + 1;

      const emotionLine = buildSlotReachEmotionLine(p.characterType, shouldShowReachCutin, res.tier !== "miss");
      const useMoneyTx =
        !!roomId && gs.players.length > 1 && typeof commitGameStateTransaction === "function";

      const ctx = {
        actorIdx: gs.currentPlayerIdx,
        proxyTargetIdx: proxyIdx,
        bet,
        res,
        newLeft,
        newPullsSeat,
        newSpins,
        newHeat,
        pityAfter: res.pityCounterAfter,
        visualReels,
        emotionLine,
        machine,
        slotTurnsBefore,
      };

      let resultGS = null;
      if (useMoneyTx) {
        resultGS = await commitGameStateTransaction((g0) => applyDay8SlotSpinToFreshGameState(g0, ctx));
      } else {
        resultGS = applyDay8SlotSpinToFreshGameState(gs, ctx);
        if (resultGS) await writeGS(resultGS);
      }

      if (!resultGS) {
        if (roomId) {
          await writeGS(
            stripLegacySlotFirestoreFields({
              ...gs,
              ...SLOT_SYNC_DEFAULTS,
              showSpinResult: false,
            }),
          );
        }
        setIsSpinning(false);
        return;
      }

      if (slotPostResultGraceTimerRef.current) {
        clearTimeout(slotPostResultGraceTimerRef.current);
        slotPostResultGraceTimerRef.current = null;
      }
      setIsSpinning(false);
      setLocalReels(res.reels);
      schedulePostSpinResult(resultGS);
    }, reel3StopAt);
  };

  if (!cpGs || !cpIsSlot) return null;

  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const pullsSeat = cpGs.slotPullsThisSeat ?? 0;
  const remainingThisBurst = Math.min(
    cpGs.slotTurnsLeft ?? 0,
    Math.max(0, burst - pullsSeat),
  );

  const publicAssetBase = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  return (
    <>
      <div className={showReachCutin ? "anim-slot-reach-machine-shake" : ""}>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            8日目 スロットターン — {cpGs.name}
            {proxySlotTargetIdx != null && targetGs && (
              <span className="ml-2 block sm:inline text-sm font-bold text-violet-300">
                （資金は {targetGs.name} のもの）
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={() => {
              const next = !isMuted;
              setIsMuted(next);
              soundRef.current?.setMuted(next);
            }}
            title={isMuted ? "ミュート解除" : "ミュート"}
            className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${isMuted ? "border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500" : "border-cyan-500/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"}`}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            {isMuted ? "OFF" : "ON"}
          </button>
        </div>
      {cpGs.slotTurnsLeft > 0 || awaitingConfirm || postSpinPending ? (
        <div className="space-y-4">
          {(() => {
            const activeMachine = SLOT_MACHINES[selectedMachineKey] ?? SLOT_MACHINES.standard;
            const heat = cpGs.slotHeat ?? 0;
            const r = calcSlotRates(moneyGs.stats, activeMachine, heat, cpGs.characterType);
            const missRed = (r.heatMissReduced * 100).toFixed(1);
            const isBurning = heat >= 10;
            const isWarm = heat >= 6;
            const heatColor = isBurning ? "text-red-400" : isWarm ? "text-orange-400" : heat >= 3 ? "text-yellow-400" : "text-slate-400";
            const heatLabel = isBurning ? "🔥 BURNING!!" : isWarm ? "🌡️ 熱い！" : heat >= 3 ? "🌀 温まってきた" : "❄️ 冷";
            const heatPct = Math.min(100, (heat / 15) * 100);
            const heatBarColor = isBurning ? "bg-red-500" : isWarm ? "bg-orange-500" : heat >= 3 ? "bg-yellow-500" : "bg-slate-600";
            return (
              <div className="rounded-lg bg-slate-800/50 p-3 text-xs space-y-2">
                {isMyTurn && !awaitingConfirm && (
                  <div className="flex gap-2 flex-wrap pb-1 border-b border-slate-700">
                    {Object.values(SLOT_MACHINES).map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => setSelectedMachineKey(m.key)}
                        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors border ${selectedMachineKey === m.key ? `${m.border} ${m.color}` : "border-slate-700 text-slate-400 hover:border-slate-500"}`}
                      >
                        {m.emoji} {m.label}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`rounded-lg border px-3 py-2 space-y-1.5 ${isBurning ? "border-red-500/60 bg-red-500/10" : isWarm ? "border-orange-500/50 bg-orange-500/8" : "border-slate-700 bg-slate-900/40"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-black text-sm tracking-wide ${heatColor}`}>LUCKY LEVEL {heat}</span>
                    <span className={`text-xs font-bold ${heatColor}`}>{heatLabel}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${heatBarColor} ${isBurning ? "animate-pulse" : ""}`}
                      style={{ width: `${heatPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-slate-500" style={{ fontSize: "10px" }}>
                    <span>熟成でハズレから {missRed}% を上位4役へ配分（内訳は右）</span>
                    <span>
                      JP+{(heat * 0.1).toFixed(1)}% / 大当+{(heat * 0.3).toFixed(1)}% / 中当+{(heat * 0.5).toFixed(1)}% / 当+
                      {(heat * 0.6).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <p className="text-slate-300">
                  現資金（{proxySlotTargetIdx != null ? `${targetGs?.name ?? "標的"}の所持` : "自分"}）{" "}
                  <span className="font-bold text-white text-base">{moneyGs.stats.money}</span>G
                  {cpGs.spinCount > 0 && (
                    <span className={`ml-2 font-semibold ${cpGs.slotNet >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      スロット収支: {cpGs.slotNet >= 0 ? "+" : ""}
                      {cpGs.slotNet}G
                    </span>
                  )}
                </p>
                {(() => {
                  const lk = Math.max(0, moneyGs.stats.luck - BAL.slot.luckBaseline);
                  const skEx = Math.max(0, moneyGs.stats.skill - BAL.slot.skillBaseline);
                  const skBlocks = skEx >= BAL.slot.skillBlockSize ? Math.floor(skEx / BAL.slot.skillBlockSize) : 0;
                  const hasLuck = lk > 0;
                  const hasSkill = skBlocks > 0;
                  return hasLuck || hasSkill ? (
                    <div className="flex gap-1.5 flex-wrap">
                      {hasLuck && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 px-2 py-0.5 text-[10px] font-bold text-yellow-300">
                          ✨ 運：運100で当−2%・小−3%→JP・大（現在+{lk}点 → 当最大−
                          {((BAL.slot.luckAtariDrainAtLuck100 * 100) * lk / BAL.slot.luckRefSpan).toFixed(1)}%・小最大−
                          {((BAL.slot.luckSmallDrainAtLuck100 * 100) * lk / BAL.slot.luckRefSpan).toFixed(1)}%）
                        </span>
                      )}
                      {hasSkill && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/20 border border-sky-500/40 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                          ⚙️ 技量：満{BAL.slot.skillBlockSize}点ごとハズレ{(BAL.slot.skillMissReducePerBlock * 100).toFixed(1)}%→中
                          {(BAL.slot.skillToMid * 100).toFixed(0)}%・当{(BAL.slot.skillToAtari * 100).toFixed(0)}%・小
                          {(BAL.slot.skillToSmall * 100).toFixed(0)}%（{skBlocks}段 × {(BAL.slot.skillMissReducePerBlock * 100).toFixed(1)}%＝最大
                          {((skBlocks * BAL.slot.skillMissReducePerBlock) * 100).toFixed(1)}%）
                        </span>
                      )}
                    </div>
                  ) : null;
                })()}
                <p className="text-slate-500" style={{ fontSize: "10px" }}>
                  [{activeMachine.emoji}
                  {activeMachine.label}] JP <span className="text-yellow-400 font-semibold">{(r.jp * 100).toFixed(2)}%</span>
                  {"  /  "}大当 <span className="text-amber-400 font-semibold">{(r.big * 100).toFixed(2)}%</span>
                  {"  /  "}中当 <span className="text-emerald-400 font-semibold">{(r.mid * 100).toFixed(2)}%</span>
                  {"  /  "}当 <span className="text-cyan-400 font-semibold">{(r.atari * 100).toFixed(2)}%</span>
                  {"  /  "}小当 <span className="text-slate-300 font-semibold">{(r.small * 100).toFixed(2)}%</span>
                  {"  /  "}ハズレ <span className="text-rose-400 font-semibold">{(r.miss * 100).toFixed(1)}%</span>
                </p>
                <p className="text-slate-500 border-t border-slate-700/80 pt-1.5 mt-1" style={{ fontSize: "10px" }}>
                  再配分内訳：技量でハズレ <span className="text-sky-400 font-semibold">−{(r.skillMissReduced * 100).toFixed(2)}%</span>
                  {" · "}運で小役→上位 <span className="text-yellow-400 font-semibold">{(r.luckConverted * 100).toFixed(2)}%</span>
                  {" · "}熟成でハズレ <span className="text-orange-400 font-semibold">−{(r.heatMissReduced * 100).toFixed(2)}%</span>
                </p>
              </div>
            );
          })()}

          {(() => {
            const heat = cpGs.slotHeat ?? 0;
            const outerClass = heat >= 10 ? "anim-heat-burning" : heat >= 6 ? "anim-heat-warm" : "";
            const charType = cpGs.characterType ?? "salaryman";
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
            const lkEx = Math.max(0, moneyGs.stats.luck - BAL.slot.luckBaseline);
            const skEx = Math.max(0, moneyGs.stats.skill - BAL.slot.skillBaseline);
            const luckTier = lkEx >= 50 ? 3 : lkEx >= 30 ? 2 : lkEx >= 10 ? 1 : 0;
            const skillTier = skEx >= 30 ? 2 : skEx >= 10 ? 1 : 0;
            const comboHigh = luckTier >= 1 && skillTier >= 1;
            const spinAuraActive = isSpinning && (luckTier > 0 || skillTier > 0);
            let stageAuraClass = "";
            if (spinAuraActive) {
              if (comboHigh) stageAuraClass = "slot-cabinet-stage--aura-combo";
              else if (luckTier >= 3) stageAuraClass = "slot-cabinet-stage--aura-luck3";
              else if (luckTier === 2) stageAuraClass = "slot-cabinet-stage--aura-luck2";
              else if (luckTier === 1) stageAuraClass = "slot-cabinet-stage--aura-luck1";
              else if (skillTier >= 2) stageAuraClass = "slot-cabinet-stage--aura-skill2";
              else if (skillTier === 1) stageAuraClass = "slot-cabinet-stage--aura-skill1";
            }
            const paylineWinFx = Boolean(showWinEffect);
            const displayReelsMatch =
              Array.isArray(gs?.displayReels) &&
              gs.displayReels.length === 3 &&
              gs.displayReels[0] === gs.displayReels[1] &&
              gs.displayReels[0] === gs.displayReels[2];
            const paylineWinPulse =
              reelsCanvasSettled &&
              (paylineWinFx ||
                (gs?.slotPhase === "completed" && displayReelsMatch && (gs?.lastPayout ?? 0) > 0));
            const columnSpinning = [0, 1, 2].map((i) => isSpinning && !stoppedReelsRef.current[i]);
            const activeMachine = SLOT_MACHINES[selectedMachineKey] ?? SLOT_MACHINES.standard;
            const showPayoutNow = reelsCanvasSettled && showPayout && payoutAmount > 0;
            const showWinFxNow = reelsCanvasSettled && showWinEffect && showWinEffect !== "miss";
            const winBox = {
              top: "var(--slot-window-top)",
              left: "var(--slot-window-left)",
              width: "var(--slot-window-width)",
              height: "var(--slot-window-height)",
            };
            return (
              <div
                className={`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-4 isolate overflow-visible ${outerClass} ${showWinFxNow && showWinEffect === "jackpot" ? "anim-jp-rainbow" : ""}`}
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

                <div className="relative z-[8] flex flex-col items-center gap-3 w-full">
                  <div
                    className={[
                      "slot-cabinet-stage relative mx-auto w-full max-w-[min(100%,440px)]",
                      cabinetRecoil ? "slot-cabinet-recoiling" : "",
                      stageAuraClass,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {showPayoutNow && (
                      <div
                        className="pointer-events-none absolute top-1/2 z-[42] flex -translate-y-1/2 items-center pl-2 sm:pl-3"
                        style={{ left: "100%" }}
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        <span
                          role="presentation"
                          className="anim-slot-payout-popup font-black tabular-nums leading-none tracking-tight text-[#ffe566]"
                          style={{
                            fontSize: "clamp(2.5rem, min(14vw, 5rem), 5rem)",
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
                    {isReach && (
                      <p className="pointer-events-none absolute -top-7 left-0 right-0 z-[30] text-center text-xs font-bold text-red-400 animate-pulse">
                        🎯 REACH!!
                      </p>
                    )}

                    <div className="slot-machine-stack relative w-full min-h-[200px]">
                      <div className="absolute z-0 rounded-sm bg-[#0a0d14] pointer-events-none" style={winBox} aria-hidden />

                      <div className="slot-reel-window absolute z-[1] overflow-hidden rounded-sm pointer-events-none" style={winBox}>
                        <SlotReelCanvasView
                          reelColumns={reelColumns}
                          columnSpinning={columnSpinning}
                          slipCols={slipAnimCols}
                          bouncingCol={bouncingReel}
                          paylineWinFx={paylineWinPulse}
                          reachCol={isReach ? 2 : -1}
                          machine={activeMachine}
                          isSpinFrozenRef={spinFreezeCutinUntilRef}
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

                      {spinAuraActive && (
                        <div
                          className="pointer-events-none absolute z-[2] mix-blend-screen overflow-hidden rounded-sm"
                          style={winBox}
                          aria-hidden
                        >
                          {(luckTier >= 2 || comboHigh) &&
                            Array.from({ length: comboHigh ? 14 : 10 }, (_, i) => (
                              <span
                                key={`cab-spark-${i}`}
                                className="absolute text-[11px]"
                                style={{
                                  left: `${(i * 71 + 13) % 94}%`,
                                  top: `${(i * 47 + 11) % 88}%`,
                                  opacity: comboHigh ? 0.5 : 0.45,
                                  animation: `sparkle ${0.42 + (i % 3) * 0.08}s ease-in-out ${(i % 6) * 0.06}s infinite`,
                                  filter: comboHigh ? "drop-shadow(0 0 4px #fde047)" : "drop-shadow(0 0 3px rgba(253,224,71,0.8))",
                                }}
                              >
                                {comboHigh && i % 3 === 0 ? "✨" : "✦"}
                              </span>
                            ))}
                          {skillTier >= 1 && !comboHigh && luckTier === 0 &&
                            Array.from({ length: 8 }, (_, i) => (
                              <span
                                key={`cab-sk-${i}`}
                                className="absolute text-[10px] text-emerald-200/90"
                                style={{
                                  left: `${(i * 83 + 19) % 92}%`,
                                  top: `${(i * 59) % 86}%`,
                                  opacity: 0.4,
                                  animation: `auraSparkFloat ${2 + (i % 4) * 0.15}s linear ${i * 0.12}s infinite`,
                                }}
                              >
                                ✦
                              </span>
                            ))}
                        </div>
                      )}

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

                      <button
                        type="button"
                        title="SPIN（100G・筐体）"
                        aria-label="スロットを回す（100G）"
                        disabled={!canSpin}
                        className="absolute z-[20] cursor-pointer rounded-full border-0 bg-transparent p-0 opacity-40 transition-opacity hover:opacity-70 active:translate-y-0.5 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                        style={{
                          top: "var(--slot-spin-top)",
                          left: "var(--slot-spin-left)",
                          width: "var(--slot-spin-w)",
                          height: "var(--slot-spin-h)",
                        }}
                        onClick={() => handleSpin(SLOT_COST)}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative z-[12] flex justify-center pointer-events-none mt-2">
                  <CharacterIcon
                    characterType={charType}
                    imgClassName={`h-14 w-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] ${charClass}`}
                    spanClassName={`text-5xl leading-none inline-block ${charClass}`}
                  />
                </div>

                {showWinFxNow && showWinEffect === "jackpot" && (
                  <p
                    className="relative z-[26] mt-2 text-center text-lg font-black text-amber-300 animate-pulse"
                    style={{ textShadow: "0 0 20px #fbbf24, 0 0 40px #f59e0b" }}
                  >
                    🎰 777 JACKPOT!! 🎰
                  </p>
                )}
              </div>
            );
          })()}
          <div className="flex flex-col gap-1.5">
            {(cpGs.slotTurnsLeft > 0 || awaitingConfirm) && (
              <div className="w-full rounded-lg bg-amber-500/15 border border-amber-400/35 px-3 py-1.5 text-center">
                <span className="text-lg font-black tabular-nums text-amber-100">
                  残り {remainingThisBurst}/{burst}
                </span>
              </div>
            )}
            <div className="flex gap-3 flex-wrap">
            {awaitingConfirm ? (
              <button
                type="button"
                onClick={handleConfirm}
                disabled={interactionLocked}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 font-bold text-slate-950 hover:bg-cyan-400 animate-pulse"
              >
                <ChevronRight size={18} />
                確認（{confirmCountdown}秒で自動進行）
              </button>
            ) : (
              <>
                {SLOT_BETS.map((bet) => {
                  const disabled = !canSpin;
                  const colors =
                    bet === 100
                      ? "bg-cyan-600 hover:bg-cyan-500"
                      : bet === 300
                        ? "bg-violet-600 hover:bg-violet-500"
                        : bet === 500
                          ? "bg-amber-500 hover:bg-amber-400"
                          : "bg-rose-600 hover:bg-rose-500";
                  return (
                    <button
                      key={bet}
                      type="button"
                      onClick={() => handleSpin(bet)}
                      disabled={disabled}
                      className={`inline-flex items-center gap-1.5 rounded-xl ${colors} px-4 py-2.5 font-semibold text-white transition-colors disabled:opacity-40`}
                    >
                      <Dice5 size={16} />
                      {isSpinning ? (
                        "…"
                      ) : (
                        <span className="flex flex-col items-start leading-tight">
                          <span>{bet}G</span>
                          {moneyGs.stats.money < bet && <span className="text-[9px] font-normal opacity-80">←借金プレイ</span>}
                        </span>
                      )}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={skipSlot}
                  disabled={isSpinning || interactionLocked || (gs?.slotPhase ?? "idle") !== "idle"}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600 transition-colors disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                  終了・次へ
                </button>
              </>
            )}
          </div>
        </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-slate-400">スロット回数を全て使いました。</p>
          {awaitingConfirm && (
            <button
              type="button"
              onClick={handleConfirm}
              disabled={interactionLocked || !!slotPostResultGraceTimerRef.current}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-40"
            >
              <ChevronRight size={18} />
              確認して進む（{confirmCountdown}秒）
            </button>
          )}
        </div>
      )}
      </div>

      {showReachCutin && (
        <div
          className={[
            "slot-reach-cutin-full",
            reachCutinGasing ? "slot-reach-cutin-full--gase" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden
        >
          <div className="slot-reach-cutin-full-speed" />
          <div className="slot-reach-cutin-full-dim" />
          <div className="slot-reach-cutin-full-vignette" />
          <div className="slot-reach-cutin-full-scan slot-reach-cutin-full-scan--top" />
          <div className="slot-reach-cutin-full-scan slot-reach-cutin-full-scan--bottom" />
          <div className="slot-reach-cutin-full-frame" />
          <div className="slot-reach-cutin-full-center">
            <div className="slot-reach-cutin-hero">
              <div className="slot-reach-cutin-hero-bar" aria-hidden />
              {REACH_CUTIN_RIMIRU_TYPES.has(cpGs?.characterType) ? (
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
                  characterType={cpGs?.characterType ?? "salaryman"}
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
