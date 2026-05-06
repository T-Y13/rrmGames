import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, Dice5, X } from "lucide-react";
import slotCabinetPng from "../assets/slot-machine.png";
import { CharacterIcon } from "./CharacterPieces";
import { BAL, SLOT_MACHINES } from "../constants/gameBalance";
import {
  clamp,
  clampMoney,
  pickWrongSymbol,
  randomStripTriple,
  spinSlot,
  stripTripleForMiddleColumn,
  rand,
} from "../utils/gameLogic";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 1〜7日目：デイリースロット（技能練習）。
 * spinBet × spins 回、8日目筐体と同系アニメ・同じ spinSlot の配当計算。
 */
export default function DailySlotTrainingModal({
  open,
  statsForSpin,
  characterType,
  playerName,
  initialSlotPityCounter = 0,
  soundRef,
  onClose,
  onFinished,
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinRoundIdx, setSpinRoundIdx] = useState(0);
  /** オーラ計算・リール演出用に、各スピン開始時点の状態 */
  const [auraStats, setAuraStats] = useState(statsForSpin);
  const [reelColumns, setReelColumns] = useState([
    ["🎰", "🎰", "🎰"],
    ["🎰", "🎰", "🎰"],
    ["🎰", "🎰", "🎰"],
  ]);
  const [slipAnimCols, setSlipAnimCols] = useState([false, false, false]);
  const [bouncingReel, setBouncingReel] = useState(-1);
  const [isReach, setIsReach] = useState(false);
  const [showWinEffect, setShowWinEffect] = useState(null);
  const [charReaction, setCharReaction] = useState("idle");
  const [cabinetRecoil, setCabinetRecoil] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [outcomeBanner, setOutcomeBanner] = useState(null);

  const shuffleIntervalRef = useRef(null);
  const stoppedReelsRef = useRef([false, false, false]);
  const ranRef = useRef(false);
  /** スピン完了後、次へ押下時に onFinished へ渡す */
  const pendingResultsRef = useRef(null);
  const pityCounterRef = useRef(0);

  const machineKey = "standard";
  const machine = SLOT_MACHINES[machineKey];
  const bet = BAL.dailySlot.spinBet;
  const spins = BAL.dailySlot.spins;
  const totalBet = bet * spins;

  useEffect(() => {
    if (!open) return;
    ranRef.current = false;
    setCommitting(false);
    setIsSpinning(false);
    setSpinRoundIdx(0);
    setSessionDone(false);
    setOutcomeBanner(null);
    setShowWinEffect(null);
    setCharReaction("idle");
    setIsReach(false);
    setBouncingReel(-1);
    setSlipAnimCols([false, false, false]);
    stoppedReelsRef.current = [false, false, false];
    setReelColumns([
      ["🎰", "🎰", "🎰"],
      ["🎰", "🎰", "🎰"],
      ["🎰", "🎰", "🎰"],
    ]);
    if (shuffleIntervalRef.current) {
      clearInterval(shuffleIntervalRef.current);
      shuffleIntervalRef.current = null;
    }
    setAuraStats(statsForSpin ?? null);
    pendingResultsRef.current = null;
    pityCounterRef.current = initialSlotPityCounter ?? 0;
  }, [open, statsForSpin, initialSlotPityCounter]);

  useEffect(() => {
    return () => {
      if (shuffleIntervalRef.current) clearInterval(shuffleIntervalRef.current);
    };
  }, []);

  /** 8日目筐体と同じ手順で1スピンの演出のみ（Promise で完了する） */
  const playSpinAnimationRound = React.useCallback(
    (baseStats, res, roundLabel) =>
      new Promise((resolve) => {
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

        const reachWin = ["jackpot", "big", "mid"].includes(res.tier) && visualReels[0] === visualReels[1];
        const reachTease =
          res.tier === "miss" && visualReels[0] === visualReels[1] && visualReels[0] !== visualReels[2];
        const reachPossible = reachWin || reachTease;

        const lkEx = Math.max(0, baseStats.luck - BAL.slot.luckBaseline);
        const skEx = Math.max(0, baseStats.skill - BAL.slot.skillBaseline);
        const slipEligible = res.tier !== "miss" && (lkEx >= 10 || skEx >= 10);
        const finalStrips = visualReels.map((mid, ci) => stripTripleForMiddleColumn(mid, machine, ci));

        setCabinetRecoil(true);
        setTimeout(() => setCabinetRecoil(false), 340);
        setIsSpinning(true);
        setIsReach(false);
        setShowWinEffect(null);
        setCharReaction("spinning");
        stoppedReelsRef.current = [false, false, false];
        setSlipAnimCols([false, false, false]);
        setReelColumns([
          ["🎰", "🎰", "🎰"],
          ["🎰", "🎰", "🎰"],
          ["🎰", "🎰", "🎰"],
        ]);
        setBouncingReel(-1);

        const sm = soundRef?.current;
        sm?.playStart();
        setTimeout(() => sm?.startSpin(), 200);

        if (shuffleIntervalRef.current) clearInterval(shuffleIntervalRef.current);
        shuffleIntervalRef.current = setInterval(() => {
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
            setTimeout(() => setBouncingReel(-1), 430);
            setTimeout(() => {
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
              setTimeout(() => {
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
            setTimeout(() => setBouncingReel(-1), 430);
          }
        };

        const t0 = 1200;
        const t1 = 1700;
        const t2 = reachPossible ? t1 + 2400 : t1 + 550;

        setTimeout(() => finalizeColumn(0, finalStrips[0], true), t0);
        setTimeout(() => finalizeColumn(1, finalStrips[1], true), t1);
        if (reachPossible) {
          setTimeout(() => {
            setIsReach(true);
            setCharReaction("reach");
            setTimeout(() => sm?.playReach(), 150);
          }, t1 + 400);
        }

        setTimeout(() => {
          if (shuffleIntervalRef.current) {
            clearInterval(shuffleIntervalRef.current);
            shuffleIntervalRef.current = null;
          }
          sm?.stopSpin();
          finalizeColumn(2, finalStrips[2], true);
          setIsReach(false);
          setReelColumns(finalStrips);

          const won = res.tier !== "miss";
          if (won) {
            setShowWinEffect(res.tier);
            setCharReaction("win");
            setTimeout(() => sm?.playWin(res.tier), 200);
            setTimeout(() => setShowWinEffect(null), 4000);
          } else {
            setCharReaction("miss");
          }

          const net = res.payout - res.bet;
          setOutcomeBanner({
            won,
            title: `${roundLabel}　${won ? "当たり！" : "ハズレ"}`,
            detail: `${res.message ?? ""}／収支 ${net >= 0 ? "+" : ""}${net}G`,
          });

          setIsSpinning(false);
          resolve();
        }, t2);
      }),
    [machine, machineKey, soundRef],
  );

  const handleRunTraining = async () => {
    if (!open || !statsForSpin || isSpinning || sessionDone || ranRef.current) return;
    ranRef.current = true;

    const results = [];
    let working = { ...statsForSpin };

    try {
      for (let round = 0; round < spins; round++) {
        setSpinRoundIdx(round + 1);
        setAuraStats({ ...working });

        const res = spinSlot(working, bet, machineKey, 0, characterType, {
          pityCounter: pityCounterRef.current,
        });
        pityCounterRef.current = res.pityCounterAfter ?? 0;
        results.push(res);

        await playSpinAnimationRound(
          working,
          res,
          `第 ${round + 1} / ${spins} 回`,
        );

        await sleep(round < spins - 1 ? 1100 : 0);

        const skAdj =
          BAL.dailySlot.skillGainEverySpin +
          (res?.tier && res.tier !== "miss" ? BAL.dailySlot.skillGainOnRole : 0);
        working = {
          ...working,
          money: clampMoney(working.money - res.bet + res.payout),
          skill: clamp(working.skill + skAdj),
        };
      }

      const totalNet = results.reduce((a, r) => a + (r.payout - r.bet), 0);
      const winCount = results.filter((r) => r.tier !== "miss").length;
      setOutcomeBanner({
        won: totalNet > 0,
        title: totalNet >= 0 ? `合計プラス収支 ${totalNet}G！` : `合計収支 ${totalNet}G`,
        detail:
          `${winCount} / ${results.length} 回役成立（スピンごと技量 +${BAL.dailySlot.skillGainEverySpin}／役ごと追加 +${BAL.dailySlot.skillGainOnRole}）・次へでターン終了`,
      });

      pendingResultsRef.current = results;
      setSessionDone(true);
    } catch (e) {
      console.error(e);
      ranRef.current = false;
      setSessionDone(false);
      setCommitting(false);
      setSpinRoundIdx(0);
      pendingResultsRef.current = null;
      setOutcomeBanner(null);
    }
  };

  const handleAdvanceToNextTurn = async () => {
    if (!open || committing || !sessionDone) return;
    const pending = pendingResultsRef.current;
    if (!Array.isArray(pending) || pending.length !== spins) return;
    setCommitting(true);
    try {
      await onFinished(pending);
      onClose();
    } finally {
      setCommitting(false);
    }
  };

  if (!open || !statsForSpin) return null;

  const lkEx = Math.max(0, (auraStats ?? statsForSpin).luck - BAL.slot.luckBaseline);
  const skEx = Math.max(0, (auraStats ?? statsForSpin).skill - BAL.slot.skillBaseline);
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

  const charType = characterType ?? "salaryman";
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
  const winBox = {
    top: "var(--slot-window-top)",
    left: "var(--slot-window-left)",
    width: "var(--slot-window-width)",
    height: "var(--slot-window-height)",
  };

  const mainSpinLabel = committing
    ? "締め処理中…"
    : sessionDone
      ? "次へ"
      : isSpinning
        ? spinRoundIdx > 0
          ? `回転中… (${spinRoundIdx}/${spins})`
          : "回転中…"
        : `資金から${bet}G×${spins}回スピン（計${totalBet}G・各回収支適用）`;

  const closeDisabled = committing || sessionDone || isSpinning || spinRoundIdx > 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-slot-title"
    >
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-amber-500/40 bg-slate-950 shadow-[0_0_60px_rgba(251,191,36,0.15)]">
        <button
          type="button"
          disabled={closeDisabled}
          onClick={onClose}
          title={closeDisabled && !committing && !sessionDone ? "1回開始したあとは「次へ」で確定するまで閉じられません" : undefined}
          className="absolute right-3 top-3 z-[110] rounded-lg border border-slate-600 bg-slate-800 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-300"
          aria-label={closeDisabled ? "閉じる（この段階では使用できません）" : "閉じる"}
        >
          <X size={18} />
        </button>

        <div className="space-y-3 p-4 pt-12">
          <h2 id="daily-slot-title" className="text-lg font-bold text-amber-100">
            デイリースロット（技能練習）
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {playerName} /
            <span className="text-slate-500">所持資金から</span>{" "}
            <span className="text-amber-200 font-semibold tabular-nums">
              {bet}G×{spins}回ベット（計{totalBet}G）
            </span>
            {" · "}
            8日目スロットと同じ<strong className="text-slate-200">役ごとの配当</strong>・倍率／スピンごと技量+
            <span className="text-sky-300">{BAL.dailySlot.skillGainEverySpin}</span>
            、役成立でさらに+
            <span className="text-sky-300">{BAL.dailySlot.skillGainOnRole}</span>
          </p>

          {outcomeBanner && (
            <div
              className={`rounded-xl border px-3 py-3 text-center text-sm font-bold ${
                outcomeBanner.won
                  ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-100"
                  : "border-rose-500/55 bg-rose-500/12 text-rose-100"
              }`}
            >
              <p className="text-base">{outcomeBanner.title}</p>
              <p className="mt-1 text-xs font-normal opacity-95">{outcomeBanner.detail}</p>
            </div>
          )}

          <div
            className={`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-4 isolate overflow-visible ${showWinEffect === "jackpot" ? "anim-jp-rainbow" : ""}`}
          >
            {showWinEffect && showWinEffect !== "miss" && (
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
                {isReach && (
                  <p className="pointer-events-none absolute -top-7 left-0 right-0 z-[30] text-center text-xs font-bold text-red-400 animate-pulse">
                    🎯 REACH!!
                  </p>
                )}

                <div className="slot-machine-stack relative w-full min-h-[200px]">
                  <div className="absolute z-0 rounded-sm bg-[#0a0d14] pointer-events-none" style={winBox} aria-hidden />

                  <div className="slot-reel-window absolute z-[1] overflow-hidden rounded-sm pointer-events-none" style={winBox}>
                    <div
                      className="slot-grid-3x3 flex h-full w-full flex-row"
                      style={{
                        gap: "var(--slot-reel-gap)",
                        padding: "var(--slot-reel-pad-y) var(--slot-reel-pad-x)",
                      }}
                    >
                      {reelColumns.map((col, ci) => (
                        <div
                          key={ci}
                          className={[
                            "slot-reel-col relative flex min-h-0 h-full min-w-0 flex-1 flex-col overflow-hidden rounded-sm",
                            bouncingReel === ci ? "anim-reel-bounce" : "",
                            isReach && ci === 2 ? "ring-2 ring-amber-400/70 ring-offset-0 rounded-sm" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <div
                            className={[
                              "slot-reel-strip w-full transition-transform duration-500 ease-out",
                              slipAnimCols[ci] ? "slot-reel-strip--slip" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            {col.map((sym, ri) => {
                              const isPay = ri === 1;
                              const spinningPayDim = isPay && !stoppedReelsRef.current[ci] && isSpinning;
                              return (
                                <div
                                  key={`${ci}-${ri}-daily`}
                                  className={[
                                    "slot-cell flex min-h-0 min-w-0 items-center justify-center border border-slate-600/50 text-slate-100",
                                    isPay ? "slot-cell--payline" : "slot-cell--edge",
                                    isPay && paylineWinFx ? "slot-cell--win-pulse" : "",
                                    ri === 1
                                      ? "bg-[color-mix(in_srgb,var(--slot-reel-face)_75%,#272e3d)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                                      : "bg-[color-mix(in_srgb,var(--slot-reel-face)_55%,#0f141c)]",
                                    spinningPayDim ? "slot-cell--spinning" : "",
                                  ]
                                    .filter(Boolean)
                                    .join(" ")}
                                >
                                  {sym}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-[5] w-full pointer-events-none select-none">
                    <img
                      src={slotCabinetPng}
                      alt=""
                      className="relative z-[6] block w-full max-w-[440px] mx-auto pointer-events-none"
                      draggable={false}
                      onError={(ev) => {
                        const el = ev.currentTarget;
                        const base = typeof import.meta !== "undefined" && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : "/";
                        el.src = `${base}images/slot-machine.png`;
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    title={`連続スピン（${bet}G×${spins}）`}
                    aria-label="スロットを回す"
                    disabled={isSpinning || sessionDone || committing}
                    className="absolute z-[20] cursor-pointer rounded-full border-0 bg-transparent p-0 opacity-40 transition-opacity hover:opacity-70 active:translate-y-0.5 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                      top: "var(--slot-spin-top)",
                      left: "var(--slot-spin-left)",
                      width: "var(--slot-spin-w)",
                      height: "var(--slot-spin-h)",
                    }}
                    onClick={() => void handleRunTraining()}
                  />
                </div>
              </div>

              <div className="relative z-[12] flex justify-center pointer-events-none mt-2">
                <CharacterIcon
                  characterType={charType}
                  imgClassName={`h-14 w-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] ${charClass}`}
                  spanClassName={`text-5xl leading-none inline-block ${charClass}`}
                />
              </div>

              {showWinEffect === "jackpot" && (
                <p
                  className="relative z-[26] mt-2 text-center text-lg font-black text-amber-300 animate-pulse"
                  style={{ textShadow: "0 0 20px #fbbf24, 0 0 40px #f59e0b" }}
                >
                  🎰 777 JACKPOT!! 🎰
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label={
              committing
                ? "締め処理中"
                : sessionDone
                  ? "次のプレイヤーへ（ターン終了）"
                  : "スロット練習を開始"
            }
            disabled={isSpinning || committing}
            onClick={() =>
              sessionDone ? void handleAdvanceToNextTurn() : void handleRunTraining()
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-40 transition-colors"
          >
            {sessionDone ? <ChevronRight size={20} /> : <Dice5 size={20} />}
            {mainSpinLabel}
          </button>
          <p className="text-[10px] text-slate-500 text-center">
            開始後は自動で連続回転します。「次へ」で結果を送信し、翌手番（または翌日開始）まで進みます。回転〜結果確認まで閉じることはできません。
          </p>
        </div>
      </div>
    </div>
  );
}
