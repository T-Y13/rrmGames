import React, { useEffect, useRef, useState } from "react";

/**
 * 効果音・BGM スライダー（⚙ トグル）。エントリー画面・TopRightHud 共通。
 */
export default function SoundSettingsControl({
  seVolume,
  bgmVolume,
  onSeVolumeChange,
  onBgmVolumeChange,
  className = "",
  defaultOpen = false,
}) {
  const [panelOpen, setPanelOpen] = useState(defaultOpen);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!panelOpen) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setPanelOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [panelOpen]);

  const sePct = Math.round(Math.max(0, Math.min(1, seVolume)) * 100);
  const bgmPct = Math.round(Math.max(0, Math.min(1, bgmVolume)) * 100);

  return (
    <div ref={wrapRef} className={`flex flex-col items-end gap-1 select-none ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setPanelOpen((p) => !p)}
        className="rounded-lg border border-slate-600 bg-slate-800/90 px-2.5 py-1.5 text-base leading-none text-slate-300 hover:bg-slate-700 hover:text-white shadow-md"
        aria-expanded={panelOpen}
        aria-label="音量設定"
        title="音量設定"
      >
        ⚙
      </button>
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
