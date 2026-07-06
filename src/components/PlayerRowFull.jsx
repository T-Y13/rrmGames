import React, { forwardRef } from "react";
import { CharacterIcon } from "./CharacterPieces";
import { BAL, BOARD_GOAL } from "../constants/gameBalance";
import { livingCostForPlayer } from "../utils/gameLogic";
import { PLAYER_FRAME_COLORS } from "./playerSidebarShared";

/**
 * 手番プレイヤー／3人以下の全員向けフルステータスカード
 */
const PlayerRowFull = forwardRef(function PlayerRowFull(
  { p, gameIdx, isCurrent, myId, subPhase, showStatLegend, frameOverride },
  ref,
) {
  const frame = frameOverride ?? PLAYER_FRAME_COLORS[gameIdx % PLAYER_FRAME_COLORS.length];
  const borderCls = isCurrent ? frame.activeBorder : frame.border;
  const bgCls = isCurrent ? frame.activeBg : "bg-slate-800/30";

  return (
    <div
      ref={ref}
      className={`rounded-xl border p-3 ${borderCls} ${bgCls} ${
        isCurrent ? "anim-turn-row-halo ring-1 ring-cyan-400/35" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-sm font-medium flex items-center gap-1.5 min-w-0 ${
            isCurrent ? "anim-turn-active-name text-cyan-50" : "text-slate-200"
          }`}
        >
          <span className="truncate">{p.name}</span>
          {p.id === myId && (
            <span
              className={`shrink-0 text-xs border rounded px-1 ${
                subPhase === "day8" && p.stats.luck >= 80
                  ? "text-amber-300 border-amber-400/40"
                  : "text-cyan-400 border-cyan-400/40"
              }`}
            >
              {subPhase === "day8" && p.stats.luck >= 80 ? "✦YOU" : "YOU"}
            </span>
          )}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          {subPhase === "day8" && p.spinCount > 0 && (
            <span
              className={`text-xs font-semibold ${p.slotNet >= 0 ? "text-emerald-400" : "text-rose-400"}`}
            >
              S:{p.slotNet >= 0 ? "+" : ""}
              {p.slotNet}
            </span>
          )}
          <span className={`text-xs font-semibold text-yellow-300 ${isCurrent ? "tabular-nums" : ""}`}>
            資金：{p.stats.money}G
          </span>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <CharacterIcon
          characterType={p.characterType}
          imgClassName="h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem] shrink-0 object-contain"
          spanClassName="text-4xl leading-none"
        />
      </div>
      <div className={`mt-2 grid grid-cols-5 gap-1 text-center text-xs ${isCurrent ? "rounded-md" : ""}`}>
        {[
          ["運", "text-amber-400", p.stats.luck],
          ["技量", "text-sky-400", p.stats.skill],
          ["善行", "text-emerald-400", p.stats.virtue],
          [
            "PON",
            p.stats.pon >= BAL.pon.deathThreshold
              ? "text-rose-400"
              : p.stats.pon >= BAL.pon.fireThreshold
                ? "text-orange-400"
                : "text-fuchsia-400",
            p.stats.pon,
          ],
          ["生活費", "text-orange-300", livingCostForPlayer(p)],
        ].map(([lbl, clr, val]) => (
          <div
            key={lbl}
            className={`rounded bg-slate-900/60 py-1 ${isCurrent ? "anim-turn-active-stat-cell" : ""}`}
          >
            <div className="text-slate-500" style={{ fontSize: "10px" }}>
              {lbl}
            </div>
            <div className={`font-bold ${clr}`}>{val}</div>
          </div>
        ))}
      </div>
      {showStatLegend && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-500/25 bg-amber-500/5 px-2 py-1.5 text-[11px]">
          <span className="flex items-center gap-1.5 text-amber-200/95">
            <span className="text-base leading-none">🧿</span>
            {(p.amulets ?? 0) > 0 ? (
              <>
                <span className="font-semibold">お守り ×{p.amulets}</span>
                <span className="text-amber-400/75">毎ターン 運+{p.amulets * 2}</span>
              </>
            ) : (
              <span className="text-slate-500">アイテム なし</span>
            )}
          </span>
        </div>
      )}
      {subPhase === "day8" && (
        <div className="mt-1.5 text-xs">
          {p.movePhase === "moving" && (
            <span className="text-slate-400">
              ゴールまで{Math.max(0, BOARD_GOAL - (p.position ?? 0))}マス（T{p.moveTurns}）
            </span>
          )}
          {p.movePhase === "goalLanding" && (
            <span className="text-yellow-300">🏁 ゴール到着・確認待ち</span>
          )}
          {p.movePhase === "waitingSlot" && (
            <span className="text-teal-300">🎰 ゴール済／次の自分ターンでスロット</span>
          )}
          {p.movePhase === "arrived" && p.slotTurnsLeft > 0 && (
            <span className="text-amber-300">
              ゴール・スロット中{p.stats.money < 0 ? "（借金可）" : ""}
            </span>
          )}
          {p.movePhase === "arrived" && !(p.slotTurnsLeft > 0) && (
            <span className="text-slate-500">✅ スロット完了</span>
          )}
          {p.movePhase === "missed" && <span className="text-rose-400">⏰ タイムアウト</span>}
        </div>
      )}
    </div>
  );
});

export default PlayerRowFull;
