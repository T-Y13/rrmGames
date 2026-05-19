import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Ghost } from "lucide-react";
import { CharacterIcon } from "./CharacterPieces";
import { BAL, STAT_META } from "../constants/gameBalance";
import { STATUS_OVERVIEW_HINTS } from "../constants/statusOverviewHints";
import { livingCostForPlayer } from "../utils/gameLogic";

const PLAYER_FRAME_COLORS = [
  { border: "border-rose-500/70", activeBorder: "border-rose-400", activeBg: "bg-rose-500/10" },
  { border: "border-sky-500/70", activeBorder: "border-sky-400", activeBg: "bg-sky-500/10" },
  { border: "border-amber-500/75", activeBorder: "border-amber-400", activeBg: "bg-amber-500/10" },
  { border: "border-emerald-500/70", activeBorder: "border-emerald-400", activeBg: "bg-emerald-500/10" },
];

const ARROW_RAIL_PX = 52;
const TRANSITION_MS = "0.45s";
const TRANSITION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const LEGEND_TT_PAD = 8;
const LEGEND_TT_MAX_W = 280;

/** ロビー席順（先頭＝先行）で並べ、gameState.players の並びがずれていても表示を揃える */
function orderPlayersBySeat(players, seatOrderIds) {
  const list = players ?? [];
  if (!Array.isArray(seatOrderIds) || seatOrderIds.length === 0) return [...list];
  const byId = new Map(list.map((p) => [p.id, p]));
  const out = [];
  for (const id of seatOrderIds) {
    const p = byId.get(id);
    if (p) {
      out.push(p);
      byId.delete(id);
    }
  }
  for (const p of list) {
    if (byId.has(p.id)) out.push(byId.get(p));
  }
  return out;
}

/**
 * ビューポート内に収まるよう fixed + portal で表示するステータス説明ツールチップ
 */
function StatLegendChip({ label, color, hint }) {
  const wrapRef = useRef(null);
  const tipRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);

  const measureMaxW = useCallback(() => {
    if (typeof window === "undefined") return LEGEND_TT_MAX_W;
    return Math.min(LEGEND_TT_MAX_W, window.innerWidth - LEGEND_TT_PAD * 2);
  }, []);

  const layoutTip = useCallback(() => {
    const el = wrapRef.current;
    const tip = tipRef.current;
    if (!el || !tip) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxW = measureMaxW();
    const h = Math.ceil(tip.getBoundingClientRect().height);
    const cx = r.left + r.width / 2;
    let left = cx - maxW / 2;
    left = Math.max(LEGEND_TT_PAD, Math.min(left, vw - maxW - LEGEND_TT_PAD));
    let top = r.top - h - LEGEND_TT_PAD;
    if (top < LEGEND_TT_PAD) {
      top = r.bottom + LEGEND_TT_PAD;
    }
    if (top + h > vh - LEGEND_TT_PAD) {
      top = Math.max(LEGEND_TT_PAD, vh - h - LEGEND_TT_PAD);
    }
    setPos({ left, top, width: maxW });
  }, [measureMaxW]);

  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(layoutTip);
    });
    return () => cancelAnimationFrame(id);
  }, [open, hint, layoutTip]);

  useEffect(() => {
    if (!open) return undefined;
    const onMove = () => layoutTip();
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, layoutTip]);

  const maxWMeasure = measureMaxW();

  const portal =
    open &&
    createPortal(
      <div
        ref={tipRef}
        role="tooltip"
        className="pointer-events-none fixed z-[300] rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-left text-sm leading-snug text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
        style={
          pos
            ? {
                left: pos.left,
                top: pos.top,
                width: pos.width,
                maxWidth: pos.width,
                visibility: "visible",
              }
            : {
                left: 0,
                top: "100vh",
                width: maxWMeasure,
                maxWidth: maxWMeasure,
                visibility: "hidden",
              }
        }
      >
        {hint}
      </div>,
      document.body,
    );

  return (
    <div ref={wrapRef} className="relative inline-block">
      <span
        className={`inline-flex cursor-help items-center rounded-lg border border-slate-600/80 bg-slate-900/80 px-3 py-2 text-sm font-semibold tabular-nums ${color} shadow-sm transition-colors hover:border-slate-500 hover:bg-slate-800/90`}
        tabIndex={0}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {label}
        <span className="sr-only">：{hint}</span>
      </span>
      {portal}
    </div>
  );
}

/**
 * 全プレイヤー一覧＋手番インジケーター（矢印は現在プレイヤーの行のステータス帯付近へスライド）
 */
export default function PlayingPlayerSidebar({
  players,
  currentPlayerIdx,
  myId,
  subPhase,
  proxySlotTargetIdx,
  /** 先行＝配列先頭の席順（通常は room playerSlots の id 列） */
  seatOrderIds = null,
  className = "",
  showStatLegend = false,
}) {
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  const [arrowCenterPx, setArrowCenterPx] = useState(0);

  const seatOrderKey = Array.isArray(seatOrderIds) ? seatOrderIds.join("\u0001") : "";

  const orderedPlayers = useMemo(
    () => orderPlayersBySeat(players, seatOrderIds),
    [players, seatOrderKey],
  );

  const safeIdx =
    players?.length > 0
      ? Math.min(Math.max(0, Number(currentPlayerIdx) || 0), players.length - 1)
      : 0;

  const measure = useCallback(() => {
    const list = listRef.current;
    const row = rowRefs.current[safeIdx];
    if (!list || !row) {
      setArrowCenterPx(ARROW_RAIL_PX / 2);
      return;
    }
    const lr = list.getBoundingClientRect();
    const rr = row.getBoundingClientRect();
    setArrowCenterPx(rr.top - lr.top + rr.height / 2);
  }, [safeIdx]);

  useLayoutEffect(() => {
    measure();
  }, [measure, players, orderedPlayers, currentPlayerIdx, subPhase]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(() => measure());
    ro.observe(list);
    return () => ro.disconnect();
  }, [measure]);

  const cp = players?.[safeIdx];
  const proxyIdx =
    typeof proxySlotTargetIdx === "number" && proxySlotTargetIdx >= 0 ? proxySlotTargetIdx : null;
  const proxyOther =
    proxyIdx != null &&
    players?.[proxyIdx] &&
    cp?.id &&
    players[proxyIdx].id !== cp.id;
  const showGhostSpectator =
    !!cp &&
    (cp.alive === false || cp.movePhase === "ghostPickTarget" || (subPhase === "day8" && proxyOther));

  return (
    <aside className={`rounded-2xl border border-slate-800 bg-slate-900 p-3 sm:p-4 ${className}`}>
      <h2 className="mb-3 text-xs font-semibold text-slate-400">全プレイヤー</h2>
      <div ref={listRef} className="relative">
        <div
          className="pointer-events-none absolute left-0 top-0 z-[1] flex w-[52px] flex-col"
          style={{ bottom: 0 }}
        >
          <div
            className="absolute left-0 flex w-full flex-col items-center gap-0.5"
            style={{
              top: arrowCenterPx,
              transform: "translateY(-50%)",
              transition: `top ${TRANSITION_MS} ${TRANSITION_EASE}`,
            }}
          >
            {showGhostSpectator && (
              <Ghost
                size={16}
                className="text-violet-300/95 drop-shadow-[0_0_8px_rgba(167,139,250,0.65)]"
                strokeWidth={2}
                aria-label="代理スロット（幽霊／観戦）"
              />
            )}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.55)]"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-wider text-cyan-200/95 leading-none">
              PLAYING
            </span>
          </div>
        </div>

        <div className="space-y-2" style={{ paddingLeft: ARROW_RAIL_PX }}>
          {orderedPlayers.map((p) => {
            const gameIdx = (players ?? []).findIndex((x) => x.id === p.id);
            const gi = gameIdx >= 0 ? gameIdx : 0;
            const frame = PLAYER_FRAME_COLORS[gi % PLAYER_FRAME_COLORS.length];
            const isCurrent = gameIdx === safeIdx;
            const borderCls = isCurrent ? frame.activeBorder : frame.border;
            const bgCls = isCurrent ? frame.activeBg : "bg-slate-800/30";
            return (
              <div
                key={p.id}
                ref={(el) => {
                  if (gameIdx >= 0) rowRefs.current[gameIdx] = el;
                }}
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
                    ["生活費", "text-orange-300", livingCostForPlayer(p)],
                    ["技量", "text-sky-400", p.stats.skill],
                    ["運", "text-amber-400", p.stats.luck],
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
                        スタートから{p.position}マス目（T{p.moveTurns}）
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
          })}
        </div>
      </div>

      {showStatLegend && (
        <div className="mt-4 rounded-xl border border-slate-700/80 bg-slate-950/50 p-3">
          <h3 className="mb-3 text-xs font-semibold tracking-wide text-slate-400">各種ステータス</h3>
          <div className="flex flex-wrap gap-2">
            {STAT_META.map(({ key, label, color }) => {
              const hint = STATUS_OVERVIEW_HINTS[key];
              if (!hint) return null;
              return <StatLegendChip key={key} label={label} color={color} hint={hint} />;
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
