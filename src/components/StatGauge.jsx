import React from "react";

const FILL = "#EFFF42";

function clamp01(t) {
  if (!Number.isFinite(t)) return 0;
  return Math.max(0, Math.min(1, t));
}

/**
 * 白地・黒枠・黄色ゲージ。縦目盛りはバー幅に対して等間隔（5 分割の節目）。
 * 黄色の長さは通常 (value−min)/(max−min)。barFillPercent を渡すとバーだけその割合（0〜100）で描画する。
 */
export default function StatGauge({
  label,
  value,
  min,
  max,
  suffix = "",
  hideNumeric = false,
  /** 指定時はバー幅だけこれを使う（0〜100）。待機室では出目 0〜5 の割合を渡す */
  barFillPercent = null,
  /** シャッフル中: 黄色バーを高速で左右に揺らす */
  barShuffle = false,
  /** 出目5確定時の一回だけの光彩 */
  showMaxRollGlow = false,
  /** 待機室など: スケール説明行を出す */
  showScaleRange = false,
  /** showScaleRange 時に表示する文言（渡したら min/max からの自動生成より優先） */
  scaleRangeLabel = "",
  /** ホバー／フォーカス時に表示する概要説明（数値は書かない） */
  overviewHint = "",
  className = "",
}) {
  const span = max > min ? max - min : 1;
  const pctFromValue = clamp01((Number(value) - min) / span);
  const widthPct =
    barFillPercent != null && Number.isFinite(Number(barFillPercent))
      ? clamp01(Number(barFillPercent) / 100) * 100
      : pctFromValue * 100;
  const scaleHint =
    scaleRangeLabel ||
    `${Math.round(min)}${suffix}〜${Math.round(max)}${suffix}`;

  const body = (
    <>
      <div className="flex items-center gap-2">
        <span className="w-10 shrink-0 text-right text-[13px] font-bold tracking-tight text-slate-100">{label}</span>
        <div
          className={`relative h-[26px] min-w-0 flex-1 overflow-hidden border-[2px] border-black bg-white shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.06)] transition-[box-shadow] duration-300 ${showMaxRollGlow ? "lobby-gauge-max-ring" : ""}`}
        >
          <div
            className={`absolute left-0 top-0 z-[1] h-full origin-left ${barShuffle ? "lobby-gauge-fill-shuffle" : "transition-[width] duration-500 ease-in-out"}`}
            style={{
              width: `${widthPct}%`,
              backgroundColor: FILL,
            }}
          />
          {/* ベースライン */}
          <div className="pointer-events-none absolute bottom-[3px] left-[6px] right-[6px] z-[2] h-px bg-black" />
          {/* min〜max を 5 等分した位置（20/40/60/80%）。黄色バーも同じ線形スケール */}
          {[20, 40, 60, 80].map((left, idx) => {
            const tall = idx === 0 || idx === 3;
            return (
              <div
                key={left}
                className="pointer-events-none absolute bottom-[3px] z-[2] w-px bg-black"
                style={{
                  left: `${left}%`,
                  height: tall ? "70%" : "42%",
                  transform: "translateX(-50%)",
                }}
              />
            );
          })}
        </div>
        <span className="w-[52px] shrink-0 text-right font-mono text-[11px] font-semibold tabular-nums text-slate-200">
          {hideNumeric ? `—${suffix}` : `${Math.round(Number(value))}${suffix}`}
        </span>
      </div>
      {showScaleRange ? (
        <div className="flex items-start gap-2">
          <span className="w-10 shrink-0" aria-hidden />
          <p className="min-w-0 flex-1 text-center text-[9px] tabular-nums leading-tight text-slate-500">{scaleHint}</p>
          <span className="w-[52px] shrink-0" aria-hidden />
        </div>
      ) : null}
    </>
  );

  if (!overviewHint) {
    return <div className={`flex flex-col gap-0.5 ${className}`}>{body}</div>;
  }

  return (
    <div className={`group/stat-hint relative flex flex-col gap-0.5 ${className}`}>
      <div
        className="cursor-help rounded-md px-0.5 py-0.5 outline-none ring-offset-2 ring-offset-slate-900 transition-colors hover:bg-slate-800/40 focus-visible:ring-2 focus-visible:ring-cyan-500/50"
        tabIndex={0}
      >
        {body}
      </div>
      <div
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-[100] mt-1 w-max max-w-[min(288px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-left text-[11px] leading-snug text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)] opacity-0 transition-opacity duration-150 delay-75 invisible group-hover/stat-hint:opacity-100 group-hover/stat-hint:visible group-hover/stat-hint:delay-0 group-focus-within/stat-hint:opacity-100 group-focus-within/stat-hint:visible group-focus-within/stat-hint:delay-0"
      >
        {overviewHint}
      </div>
    </div>
  );
}
