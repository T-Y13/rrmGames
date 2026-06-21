import React from "react";

/**
 * サイドバー上部の「プレイヤー / ログ」切替
 */
export default function SidebarTabBar({ tab, onTabChange, playerCount }) {
  const base =
    "flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50";
  const active = "bg-slate-800 text-cyan-200 shadow-sm";
  const inactive = "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40";

  return (
    <div
      className="mb-3 flex rounded-xl border border-slate-700/80 bg-slate-950/60 p-1"
      role="tablist"
      aria-label="サイドバー表示切替"
    >
      <button
        type="button"
        role="tab"
        aria-selected={tab === "players"}
        className={`${base} ${tab === "players" ? active : inactive}`}
        onClick={() => onTabChange("players")}
      >
        プレイヤー ({playerCount})
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={tab === "logs"}
        className={`${base} ${tab === "logs" ? active : inactive}`}
        onClick={() => onTabChange("logs")}
      >
        ログ
      </button>
    </div>
  );
}
