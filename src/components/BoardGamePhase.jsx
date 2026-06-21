import React from "react";
import { ArrowRight, Coins, HandCoins } from "lucide-react";
import { BAL, BOARD_GOAL } from "../constants/gameBalance";
import { TaxiStandeeImage } from "./CharacterPieces";
import { virtueMinRoll } from "../utils/gameLogic";
import BoardViewport from "./BoardViewport";

/** 8日目：ゴール確認・スロット開始待ち・すごろく移動・ダイスUI */
export default function BoardGamePhase({
  gs,
  cpGs,
  /** Firestore 反映前に現在マスとして見せる位置（PON転倒ストップ用）。null なら cpGs.position */
  boardViewPos = null,
  /** PON用：マスホップ完了時のみコールバック（移動後にカットインを出す） */
  onSugorokuHopComplete,
  /** true のときだけホップ完了を親へ通知（他プレイヤーのホップで誤爆しない） */
  reportSugorokuHopComplete = false,
  isMyTurn,
  cpIsWaitingSlot,
  isDay8Moving,
  isDiceRolling,
  localDice,
  diceShuffleValues,
  diceConfirmed,
  isLuckyRoll,
  showDiceTotal,
  displayDice,
  taxiPhase,
  taxiDriveCongested = false,
  /** タクシー drive：Firestore 反映前の到着マス（カメラ補間終点） */
  taxiDriveEndPos = null,
  /** 親の taxiDriveActiveMs と同期（drive / driveBeforeJam / driveAfterJam の1区間） */
  taxiDriveSegmentMs = null,
  taxiJamMidPos = null,
  taxiDriveDurationMs = 2600,
  pieceHopping,
  interactionLocked = false,
  onMoveAction,
  onGoalLandingConfirm,
  /** ローカル利用者が goalLanding のとき（currentPlayerIdx が別でも GOAL 確認を出す） */
  goalLandingSelf = null,
}) {
  if (!cpGs) return null;

  const pendingTaxiSteps = cpGs.pendingTaxiSteps ?? 0;
  const isTaxiTrafficWaitTurn = pendingTaxiSteps > 0;

  const sugorokuViewPos = typeof boardViewPos === "number" ? boardViewPos : cpGs.position;

  const goalSelf = goalLandingSelf;
  const goalSelfViewPos =
    goalSelf && typeof boardViewPos === "number" && goalSelf.id === cpGs?.id
      ? boardViewPos
      : goalSelf?.position ?? 0;

  /** メニューにタクシーを出すか（常時フラグ or 各ターンの taxiAvailable） */
  const showTaxiInMenu = BAL.dice.taxiMenuAlwaysVisible || gs.taxiAvailable;

  return (
    <>
      {goalSelf && gs.subPhase === "day8" && (
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-500/20 to-yellow-900/30 p-5 text-center space-y-3">
            <p className="text-4xl animate-bounce">🏁</p>
            <p className="text-lg font-bold text-amber-100">{goalSelf.name}</p>
            <h2 className="text-2xl font-black text-amber-200 tracking-wide">GOAL!</h2>
          </div>
          <div style={{ height: "min(720px, 80vh)", minHeight: "min(560px, 72vh)", overflow: "hidden", borderRadius: "12px" }}>
            <BoardViewport
              players={gs.players}
              viewPos={goalSelfViewPos}
              boardGoal={BOARD_GOAL}
              isDiceRolling={false}
              taxiPhase={null}
              pieceHopping={false}
              currentPlayer={goalSelf}
              tileEffects={gs?.sugorokuTileEffects}
            />
          </div>
          {goalSelf.lastMoveEvent && (
            <p className="rounded-lg bg-slate-800/60 px-3 py-2 text-xs text-slate-300 text-center">{goalSelf.lastMoveEvent}</p>
          )}
          <button
            type="button"
            onClick={onGoalLandingConfirm}
            className="w-full rounded-xl bg-amber-500 py-4 font-black text-slate-950 hover:bg-amber-400 shadow-lg animate-pulse"
          >
            次のターンからスロットを始める →
          </button>
        </div>
      )}

      {isDay8Moving && (
        <>
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-sm text-slate-300 shrink-0">
              {cpGs.name} — T{cpGs.moveTurns + 1}
            </h2>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-[10px] text-yellow-400/60 font-medium tracking-widest uppercase">GOAL</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-yellow-300 tabular-nums leading-none">{Math.max(0, BOARD_GOAL - cpGs.position)}</span>
                <span className="text-xs text-yellow-400/70">マス先</span>
              </div>
            </div>
            <span className="text-xs text-slate-500 shrink-0">残{Math.max(0, BAL.dice.maxTurns - cpGs.moveTurns)}T</span>
          </div>

          <div style={{ height: "min(720px, 80vh)", minHeight: "min(560px, 72vh)", overflow: "hidden", borderRadius: "12px" }}>
            <BoardViewport
              players={gs.players}
              viewPos={sugorokuViewPos}
              boardGoal={BOARD_GOAL}
              isDiceRolling={isDiceRolling}
              taxiPhase={taxiPhase}
              taxiDriveCongested={taxiDriveCongested}
              taxiDriveEndPos={taxiDriveEndPos}
              taxiDriveSegmentMs={taxiDriveSegmentMs}
              taxiJamMidPos={taxiJamMidPos}
              taxiDriveDurationMs={taxiDriveDurationMs}
              pieceHopping={pieceHopping}
              currentPlayer={cpGs}
              tileEffects={gs?.sugorokuTileEffects}
              reportHopAnimationComplete={reportSugorokuHopComplete}
              onHopAnimationComplete={onSugorokuHopComplete}
            />
          </div>

          {(() => {
            if (isTaxiTrafficWaitTurn) return null;
            const isRolling = isDiceRolling;
            const items = isRolling
              ? localDice.map((v, i) => ({
                  value: (diceConfirmed[i] ? v : diceShuffleValues[i]) ?? "?",
                  confirmed: diceConfirmed[i] ?? false,
                }))
              : displayDice.map((v) => ({ value: v, confirmed: true }));

            if (items.length === 0) return null;

            const allDone = isRolling ? showDiceTotal : true;
            const totalVal = items.reduce((a, { value }) => a + (Number(value) || 0), 0);

            return (
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-3 justify-center flex-wrap">
                  {items.map(({ value, confirmed }, i) => {
                    const isGolden = isRolling && isLuckyRoll && i === 1;
                    return (
                      <div
                        key={`day8-dice-${i}-${value}-${confirmed ? "c" : "u"}`}
                        className={`relative flex items-center gap-1.5 rounded-xl border-2 px-4 py-2.5 min-w-[66px] justify-center font-black text-xl transition-all duration-300
                              ${isGolden && confirmed
                                ? "border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.55)]"
                                : isGolden
                                  ? "border-amber-500/60 bg-amber-900/30 text-amber-300 animate-pulse"
                                  : confirmed
                                    ? "border-cyan-400/70 bg-cyan-500/10 text-cyan-100 anim-dice-pop"
                                    : "border-slate-600/60 bg-slate-800/80 text-slate-400 animate-pulse"
                              }`}
                      >
                        <span className="text-base leading-none select-none">🎲</span>
                        <span>{value}</span>
                        {isGolden && (
                          <span className="absolute -top-2.5 -right-2 text-[11px] text-amber-300 font-black leading-none select-none">★</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {allDone && items.length > 1 && (
                  <div className="flex items-baseline gap-1.5 anim-fadein">
                    <span className="text-sm text-slate-400">合計</span>
                    <span className="text-2xl font-black text-white">{totalVal}</span>
                    <span className="text-sm text-slate-400">マス進む！</span>
                  </div>
                )}
              </div>
            );
          })()}

          {isTaxiTrafficWaitTurn && (
            <div className="rounded-lg border border-amber-600/45 bg-amber-950/50 px-3 py-2 text-center">
              <p className="text-xs font-semibold text-amber-100">
                タクシー渋滞中 — 駒に「渋滞中…」表示。あと<strong className="tabular-nums text-white">{pendingTaxiSteps}</strong>マスが残っています。
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-500 justify-center">
            {!isTaxiTrafficWaitTurn && (
              <>
                <span>
                  最低出目: {virtueMinRoll(cpGs.stats.virtue)}（善行{cpGs.stats.virtue}）
                </span>
                <span>{cpGs.stats.luck >= 80 ? "アドバンテージ🎲🎲" : "通常🎲"}</span>
                {cpGs.stats.pon >= BAL.pon.fireThreshold && (
                  <span className={cpGs.stats.pon >= BAL.pon.deathThreshold ? "text-rose-300" : "text-orange-300"}>
                    PON{cpGs.stats.pon} ⚡転倒リスク
                  </span>
                )}
              </>
            )}
          </div>

          {isMyTurn && (
            <>
              {cpGs.skipTurns > 0 && (
                <div className="rounded-xl border border-orange-400/40 bg-orange-400/10 p-3 text-sm text-orange-200 flex items-center gap-2 justify-center">
                  💤 巻き添えで{cpGs.skipTurns}回休み…自動スキップ中
                </div>
              )}
              {!isTaxiTrafficWaitTurn ? (
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => onMoveAction("normal")}
                  disabled={interactionLocked || isDiceRolling || !!taxiPhase || cpGs.skipTurns > 0}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-40 shadow-lg"
                >
                  <ArrowRight size={18} />
                  進む
                </button>
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => onMoveAction("shop")}
                    disabled={interactionLocked || isDiceRolling || !!taxiPhase || cpGs.stats.money < BAL.dice.shopCost || cpGs.skipTurns > 0}
                    className="inline-flex items-center gap-2 rounded-xl bg-lime-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-lime-400 transition-colors disabled:opacity-40 shadow-lg"
                  >
                    <Coins size={18} />
                    コンビニ <span className="text-xs opacity-70">-{BAL.dice.shopCost}G</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
                    <div className="bg-slate-800 border border-lime-500/40 text-slate-100 text-xs rounded-xl px-3 py-2 whitespace-nowrap shadow-xl">
                      🍰 コンビニスイーツでエネルギー補給！（ダイスを1個追加）
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                    </div>
                  </div>
                </div>
                {showTaxiInMenu && (
                  <div className="relative group">
                    <button
                      type="button"
                      onClick={() => onMoveAction("taxi")}
                      disabled={interactionLocked || isDiceRolling || !!taxiPhase || cpGs.stats.money < BAL.dice.taxiCost || cpGs.skipTurns > 0}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-yellow-400 px-5 py-2.5 font-semibold text-slate-950 hover:bg-yellow-300 transition-colors disabled:opacity-40 shadow-lg"
                    >
                      <TaxiStandeeImage imgClassName="h-[2.25rem] w-[2.25rem] object-contain shrink-0 opacity-100" />
                      タクシー
                      <span className="text-xs opacity-70">
                        -{BAL.dice.taxiCost}G / {BAL.dice.taxiMoveMin}〜{BAL.dice.taxiMoveMax}マス
                      </span>
                      {cpGs.stats.virtue <= BAL.dice.taxiCongestThresh && (
                        <span className="text-[10px] opacity-60">渋滞リスク</span>
                      )}
                    </button>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
                      <div className="w-64 bg-slate-800 border border-yellow-400/40 text-slate-100 text-xs rounded-xl px-3 py-2 whitespace-normal text-left leading-relaxed shadow-xl">
                        🚕 タクシーで {BAL.dice.taxiMoveMin}〜{BAL.dice.taxiMoveMax}マス進む（-{BAL.dice.taxiCost}G）。
                        <span className="block mt-1 font-semibold text-yellow-300">⛔ 止まったマスのマス効果は受けません。</span>
                        <span className="block mt-1 text-slate-300">善行が低いと一定確率で渋滞（2ターン化／前半→次の自分ターンで残り進行・渋滞時+PON、そのターンは他操作不可）。</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                      </div>
                    </div>
                  </div>
                )}
                {gs.aidAvailable && (
                  <button
                    type="button"
                    onClick={() => onMoveAction("help")}
                    disabled={interactionLocked || isDiceRolling || !!taxiPhase || cpGs.skipTurns > 0}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-colors disabled:opacity-40 shadow-lg ${cpGs.stats.pon >= BAL.pon.deathThreshold ? "bg-rose-600 text-white hover:bg-rose-500" : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"}`}
                  >
                    <HandCoins size={18} />
                    人助け {cpGs.stats.pon >= BAL.pon.deathThreshold ? "⚠️即死50%" : ""}
                  </button>
                )}
              </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onMoveAction("taxiTrafficWait")}
                  disabled={interactionLocked || isDiceRolling || !!taxiPhase || cpGs.skipTurns > 0}
                  className="mx-auto flex w-full max-w-md flex-col items-center rounded-2xl border-2 border-amber-200/70 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 px-6 py-5 font-black text-slate-950 shadow-[0_0_36px_rgba(251,191,36,0.45)] transition-[filter] hover:brightness-[1.05] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="flex items-center gap-2 text-2xl leading-tight tracking-tight">🚧 渋滞を待つ</span>
                  <span className="mt-1 text-sm font-bold opacity-95">Wait in Traffic</span>
                  <span className="mt-2 text-[11px] font-semibold opacity-85 tabular-nums">あと {pendingTaxiSteps} マスでタクシー行程完了</span>
                </button>
              )}
              {!isTaxiTrafficWaitTurn && (
              <p className="text-center text-[10px] text-slate-600">
                人助け {(BAL.dice.helpChance * 100).toFixed(0)}% / タクシー
                {BAL.dice.taxiMenuAlwaysVisible
                  ? " メニュー常時（確率のみに戻す: taxiMenuAlwaysVisible を false、taxiChance で割合）"
                  : ` 出現 ${(BAL.dice.taxiChance * 100).toFixed(0)}%`}
              </p>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
