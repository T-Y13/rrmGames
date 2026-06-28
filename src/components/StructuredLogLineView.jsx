import React from "react";
import {
  LOG_ICONS,
  parseLogEntry,
} from "../lib/gameLogFormat";

const OUTCOME_BADGE = {
  success: { icon: LOG_ICONS.success, label: "成功", className: "text-emerald-300" },
  failure: { icon: LOG_ICONS.failure, label: "失敗", className: "text-rose-300" },
};

const CAT_CLASS = {
  money: "text-amber-200/95",
  pon: "text-violet-200/95",
  living: "text-sky-200/95",
  stat: "text-slate-300",
  amulet: "text-cyan-200/90",
  system: "text-slate-400",
};

function LogTextLine({ line, depth = 0 }) {
  const cls = CAT_CLASS[line.cat] ?? "text-slate-300";
  return (
    <li className={`${depth > 0 ? "pl-3" : "pl-1"} ${cls} leading-relaxed`}>
      {line.icon && <span className="mr-1">{line.icon}</span>}
      {line.text}
    </li>
  );
}

function DailyBlockView({ block, showPlayerName }) {
  const outcome = block.outcome ? OUTCOME_BADGE[block.outcome] : null;
  return (
    <div className="space-y-1.5">
      {showPlayerName && (
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{block.playerName}</p>
      )}
      <div className="rounded-lg border border-slate-700/50 bg-slate-950/40 px-2 py-1.5">
        <p className="text-xs font-bold text-slate-100">
          {block.actionIcon && <span className="mr-1">{block.actionIcon}</span>}
          {block.actionLabel}
          {outcome && (
            <span className={`ml-1.5 text-[10px] font-semibold ${outcome.className}`}>
              {outcome.icon} {outcome.label}
            </span>
          )}
        </p>
        {(block.pre?.length ?? 0) > 0 && (
          <ul className="mt-1 space-y-0.5 border-l border-slate-700/40 pl-2">
            {block.pre.map((line, i) => (
              <LogTextLine key={`pre-${i}`} line={line} depth={1} />
            ))}
          </ul>
        )}
        {block.actionLines?.length > 0 && (
          <ul className="mt-1 space-y-0.5">
            {block.actionLines.map((line, i) => (
              <LogTextLine key={`act-${i}`} line={line} depth={1} />
            ))}
          </ul>
        )}
      </div>
      {block.statusLines?.length > 0 && (
        <div className="ml-2 rounded-md border border-dashed border-slate-700/60 bg-slate-900/30 px-2 py-1.5">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">Status</p>
          <ul className="space-y-0.5">
            {block.statusLines.map((line, i) => (
              <LogTextLine key={`st-${i}`} line={line} depth={1} />
            ))}
          </ul>
        </div>
      )}
      {block.extras?.length > 0 && (
        <ul className="ml-2 space-y-0.5">
          {block.extras.map((line, i) => (
            <LogTextLine key={`ex-${i}`} line={line} depth={1} />
          ))}
        </ul>
      )}
    </div>
  );
}

function LegacyLogLine({ text }) {
  return <div className="whitespace-pre-wrap leading-relaxed text-slate-300">{text}</div>;
}

export function StructuredLogLineView({ entry, showPlayerName = false }) {
  const parsed = parseLogEntry(entry);

  if (!parsed || parsed.t === "legacy") {
    return <LegacyLogLine text={parsed?.text ?? String(entry ?? "")} />;
  }

  if (parsed.t === "dayHeader") {
    return (
      <div className="pt-1">
        <div className="border-t border-dashed border-slate-600/70 pt-2" aria-hidden />
        <p className="text-xs font-black tracking-wide text-cyan-200/95">
          {LOG_ICONS.calendar} {parsed.day}日目
        </p>
      </div>
    );
  }

  if (parsed.t === "dayDivider") {
    return <div className="border-t border-double border-slate-600/50 my-1" aria-hidden />;
  }

  if (parsed.t === "turnHandoff") {
    return (
      <p className="text-[10px] font-medium text-slate-500">
        → {parsed.playerName} のターン
      </p>
    );
  }

  if (parsed.t === "dailyBlock") {
    return <DailyBlockView block={parsed} showPlayerName={showPlayerName} />;
  }

  return <LegacyLogLine text={JSON.stringify(parsed)} />;
}
