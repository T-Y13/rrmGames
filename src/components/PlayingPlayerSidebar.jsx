import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Ghost } from "lucide-react";
import { STAT_META } from "../constants/gameBalance";
import { STATUS_OVERVIEW_HINTS } from "../constants/statusOverviewHints";
import PlayerRowCompact from "./PlayerRowCompact";
import PlayerRowFull from "./PlayerRowFull";
import SidebarGameLogFeed from "./SidebarGameLogFeed";
import SidebarTabBar from "./SidebarTabBar";
import {
  ARROW_RAIL_PX,
  PLAYER_FRAME_COLORS,
  TRANSITION_EASE,
  TRANSITION_MS,
  orderPlayersBySeat,
} from "./playerSidebarShared";

const LEGEND_TT_PAD = 8;
const LEGEND_TT_MAX_W = 280;

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
 * 全プレイヤー一覧＋手番インジケーター（Players / Logs タブ）
 */
export default function PlayingPlayerSidebar({
  players,
  currentPlayerIdx,
  myId,
  subPhase,
  proxySlotTargetIdx,
  log = [],
  seatOrderIds = null,
  className = "",
  showStatLegend = false,
  defaultTab = "players",
}) {
  const [tab, setTab] = useState(defaultTab);
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  const [arrowCenterPx, setArrowCenterPx] = useState(0);

  const seatOrderKey = Array.isArray(seatOrderIds) ? seatOrderIds.join("\u0001") : "";
  const playerCount = players?.length ?? 0;
  const useCompactRows = playerCount >= 3;

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
    setArrowCenterPx(rr.top - lr.top + list.scrollTop + rr.height / 2);
  }, [safeIdx]);

  useLayoutEffect(() => {
    if (tab !== "players") return;
    measure();
  }, [measure, players, orderedPlayers, currentPlayerIdx, subPhase, tab, useCompactRows]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || tab !== "players") return undefined;
    const onScroll = () => measure();
    list.addEventListener("scroll", onScroll, { passive: true });
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => measure());
      ro.observe(list);
      return () => {
        list.removeEventListener("scroll", onScroll);
        ro.disconnect();
      };
    }
    return () => list.removeEventListener("scroll", onScroll);
  }, [measure, tab]);

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
      <SidebarTabBar tab={tab} onTabChange={setTab} playerCount={playerCount} />

      {tab === "players" ? (
        <div key="players-panel" className="anim-fadein">
          <h2 className="mb-3 text-xs font-semibold text-slate-400">全プレイヤー</h2>
          <div
            ref={listRef}
            className="relative max-h-[min(70vh,calc(100vh-12rem))] overflow-y-auto overflow-x-hidden"
          >
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
                const isCurrent = gameIdx === safeIdx;
                const frame = PLAYER_FRAME_COLORS[gi % PLAYER_FRAME_COLORS.length];
                const showCompact = useCompactRows && !isCurrent;

                const setRowRef = (el) => {
                  if (gameIdx >= 0) rowRefs.current[gameIdx] = el;
                };

                if (showCompact) {
                  return (
                    <PlayerRowCompact
                      key={p.id}
                      ref={setRowRef}
                      p={p}
                      gameIdx={gi}
                      isCurrent={isCurrent}
                      myId={myId}
                      subPhase={subPhase}
                      frameOverride={frame}
                    />
                  );
                }

                return (
                  <PlayerRowFull
                    key={p.id}
                    ref={setRowRef}
                    p={p}
                    gameIdx={gi}
                    isCurrent={isCurrent}
                    myId={myId}
                    subPhase={subPhase}
                    showStatLegend={showStatLegend}
                    frameOverride={frame}
                  />
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
        </div>
      ) : (
        <div key="logs-panel" className="anim-fadein" role="tabpanel">
          <h2 className="mb-2 text-xs font-semibold text-slate-400">ゲームログ（全員共有）</h2>
          <SidebarGameLogFeed log={log} players={players} />
        </div>
      )}
    </aside>
  );
}
