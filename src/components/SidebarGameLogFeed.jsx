import React, { useMemo } from "react";
import { parseLogIntoDailyTiles } from "../utils/sidebarLogDailyTiles";
import { StructuredLogLineView } from "./StructuredLogLineView";
import { parseLogEntry } from "../lib/gameLogFormat";

/**
 * サイドバー「ログ」タブ：日別タイムライン（Daily Tiles）
 */
export default function SidebarGameLogFeed({ log = [], players = [], className = "" }) {
  const tiles = useMemo(() => parseLogIntoDailyTiles(log, players), [log, players]);

  return (
    <div
      className={`max-h-[50vh] overflow-y-auto ${className}`}
      role="log"
      aria-label="ゲームログ（日別）"
    >
      {tiles.length === 0 ? (
        <p className="py-4 text-center font-mono text-xs text-slate-500">ログはまだありません</p>
      ) : (
        <div className="space-y-3 pr-0.5">
          {tiles.map((tile) => (
            <article
              key={tile.day}
              className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/50"
            >
              <header className="border-b border-slate-700/40 bg-slate-950/40 px-3 py-2">
                <h3 className="text-xs font-bold tracking-wide text-cyan-200/90">{tile.title}</h3>
              </header>

              <div className="space-y-2 px-2 py-2">
                {tile.sections.map((section, si) => (
                  <div
                    key={`${tile.day}-${si}`}
                    className={`border-l-4 py-0.5 pl-2.5 ${section.stripeClass}`}
                  >
                    <ul className="space-y-2 font-mono text-xs">
                      {section.entries.map((entry, li) => {
                        const parsed = parseLogEntry(entry);
                        return (
                          <li key={li}>
                            <StructuredLogLineView
                              entry={entry}
                              showPlayerName={tile.showPlayerSubHeaders && parsed?.t === "dailyBlock"}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
