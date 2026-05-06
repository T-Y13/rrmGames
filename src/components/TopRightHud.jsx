import React, { useEffect, useRef, useState } from "react";

/**
 * 右上: 名前#ID + コピー、その下に ⚙ から音量パネル
 */
export default function TopRightHud({ myFullId, copied, onCopy, seVolume, bgmVolume, onSeVolumeChange, onBgmVolumeChange }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!panelOpen) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setPanelOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [panelOpen]);

  if (!myFullId) return null;

  const sePct = Math.round(Math.max(0, Math.min(1, seVolume)) * 100);
  const bgmPct = Math.round(Math.max(0, Math.min(1, bgmVolume)) * 100);

  return (
    <div ref={wrapRef} className="fixed top-3 right-3 z-[200] flex flex-col items-end gap-1 select-none">
      <div className="flex max-w-[min(calc(100vw-5.5rem),18rem)] items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-slate-800/95 px-3 py-1.5 shadow-md">
        <span className="truncate font-mono text-xs font-bold text-cyan-300" title={myFullId}>
          {myFullId}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className={`shrink-0 text-sm transition-all ${copied ? "text-emerald-400" : "text-slate-400 hover:text-white"}`}
          title="コピー"
        >
          {copied ? "✓" : "📋"}
        </button>
      </div>
      <div className="flex w-full justify-end pr-0.5">
        <button
          type="button"
          onClick={() => setPanelOpen((p) => !p)}
          className="rounded-lg border border-slate-600 bg-slate-800/90 px-2 py-1 text-base leading-none text-slate-300 hover:bg-slate-700 hover:text-white"
          aria-expanded={panelOpen}
          aria-label="音量設定"
          title="音量設定"
        >
          ⚙
        </button>
      </div>
      {panelOpen && (
        <div className="w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-slate-600 bg-slate-950/98 p-3 text-xs text-slate-200 shadow-xl backdrop-blur-sm">
          <p className="mb-2.5 font-semibold text-slate-400">サウンド</p>
          <label className="mb-3 flex flex-col gap-1.5">
            <span className="flex justify-between font-medium text-slate-300">
              <span>効果音</span>
              <span className="tabular-nums text-cyan-300/90">{sePct}%</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={sePct}
              onChange={(e) => onSeVolumeChange(Number(e.target.value) / 100)}
              className="w-full accent-cyan-500"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex justify-between font-medium text-slate-300">
              <span>BGM（タイトル〜待機・育成・8日目）</span>
              <span className="tabular-nums text-violet-300/90">{bgmPct}%</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={bgmPct}
              onChange={(e) => onBgmVolumeChange(Number(e.target.value) / 100)}
              className="w-full accent-violet-500"
            />
          </label>
        </div>
      )}
    </div>
  );
}
