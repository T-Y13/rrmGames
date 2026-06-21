import React, { forwardRef } from "react";
import { BAL } from "../constants/gameBalance";
import { livingCostForPlayer } from "../utils/gameLogic";
import { PLAYER_FRAME_COLORS } from "./playerSidebarShared";

/**
 * 4人以上の非手番プレイヤー向けコンパクト1行＋ミニステータス帯
 */
const PlayerRowCompact = forwardRef(function PlayerRowCompact(
  { p, gameIdx, isCurrent, myId, subPhase, frameOverride },
  ref,
) {
  const frame = frameOverride ?? PLAYER_FRAME_COLORS[gameIdx % PLAYER_FRAME_COLORS.length];
  const borderCls = isCurrent ? frame.activeBorder : frame.border;
  const bgCls = isCurrent ? frame.activeBg : "bg-slate-800/30";
  const lc = livingCostForPlayer(p);
  const ponClr =
    p.stats.pon >= BAL.pon.deathThreshold
      ? "text-rose-400"
      : p.stats.pon >= BAL.pon.fireThreshold
        ? "text-orange-400"
        : "text-fuchsia-400";

  return (
    <div
      ref={ref}
      className={`rounded-lg border px-2.5 py-2 ${borderCls} ${bgCls} ${
        isCurrent ? "anim-turn-row-halo ring-1 ring-cyan-400/35" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2 min-w-0">
        <span
          className={`text-sm font-medium flex items-center gap-1 min-w-0 truncate ${
            isCurrent ? "anim-turn-active-name text-cyan-50" : "text-slate-200"
          }`}
        >
          <span className="truncate">{p.name}</span>
          {p.id === myId && (
            <span className="shrink-0 text-[10px] border rounded px-0.5 text-cyan-400 border-cyan-400/40">
              YOU
            </span>
          )}
        </span>
        <div className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold tabular-nums">
          {subPhase === "day8" && p.spinCount > 0 && (
            <span className={p.slotNet >= 0 ? "text-emerald-400" : "text-rose-400"}>
              S:{p.slotNet >= 0 ? "+" : ""}
              {p.slotNet}
            </span>
          )}
          <span className="text-yellow-300">{p.stats.money}G</span>
        </div>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] tabular-nums text-slate-400">
        <span>
          生活費 <span className="font-bold text-orange-300">{lc}</span>
        </span>
        <span>
          技 <span className="font-bold text-sky-400">{p.stats.skill}</span>
        </span>
        <span>
          運 <span className="font-bold text-amber-400">{p.stats.luck}</span>
        </span>
        <span>
          善 <span className="font-bold text-emerald-400">{p.stats.virtue}</span>
        </span>
        <span>
          PON <span className={`font-bold ${ponClr}`}>{p.stats.pon}</span>
        </span>
      </div>
    </div>
  );
});

export default PlayerRowCompact;
