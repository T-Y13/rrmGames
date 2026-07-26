import React from "react";
import {
  formatDay8SeatEffectsHint,
  getDay8ItemQty,
  listDay8ItemDisplayEntries,
} from "../lib/day8Items";

/**
 * 8日目：行動ボタン下のカード列（ホバーで詳細説明）
 */
export default function Day8ItemBar({
  player,
  gs,
  isMyTurn = false,
  interactionLocked = false,
  onUseItem,
}) {
  if (!isMyTurn || !player || gs?.subPhase !== "day8") return null;

  const cards = listDay8ItemDisplayEntries(player, gs);
  const armedHint = formatDay8SeatEffectsHint(player);
  const usedThisSeat = !!player.day8ItemUsedThisSeat;

  if (cards.length === 0 && !armedHint) return null;

  return (
    <div className="mt-3 space-y-2 rounded-xl border border-slate-700/80 bg-slate-900/50 px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-semibold text-slate-400">🎒 8日目カード</p>
        <p className="text-[10px] text-slate-500 tabular-nums">
          この手番 {usedThisSeat ? "使用済" : "未使用"} / 1枚まで
        </p>
      </div>

      {armedHint ? (
        <p className="text-xs font-semibold text-cyan-300/95">⚡ 効果待ち: {armedHint}</p>
      ) : null}

      {cards.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-2">
          {cards.map(({ id, qty, def, usableNow, unusableReason }) => {
            const disabled =
              interactionLocked || !usableNow || getDay8ItemQty(player, id) <= 0;
            return (
              <div key={id} className="relative group">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => onUseItem?.(id)}
                  className="inline-flex min-w-[5.75rem] flex-col items-center gap-0.5 rounded-lg border border-slate-600 bg-slate-800/90 px-2.5 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-cyan-500/45 hover:bg-slate-700/90 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <span className="text-xl leading-none" aria-hidden>
                    {def.emoji}
                  </span>
                  <span className="text-[10px] font-bold text-cyan-200/95">{def.shortLabel}</span>
                  <span className="text-[9px] text-slate-400 line-clamp-1">{def.label}</span>
                  <span className="text-[10px] tabular-nums text-amber-300/90">×{qty}</span>
                </button>
                <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-56 -translate-x-1/2 group-hover:block">
                  <div className="rounded-xl border border-cyan-500/35 bg-slate-800 px-3 py-2 text-left text-[11px] leading-relaxed text-slate-100 shadow-xl">
                    <p className="font-bold text-cyan-200">
                      {def.emoji} {def.label}
                    </p>
                    <p className="mt-1 text-slate-300">{def.desc}</p>
                    {!usableNow && unusableReason ? (
                      <p className="mt-1.5 text-amber-300/90">{unusableReason}</p>
                    ) : (
                      <p className="mt-1.5 text-slate-500">クリックで使用（次の移動/当たりに効果）</p>
                    )}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
