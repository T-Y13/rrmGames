import React, { useEffect, useRef, useState } from "react";

const POT_TOOLTIP = "ジャックポット当選時に払い出されるPOT";

/**
 * マルチ8日目：ルーム共有プログレッシブポット HUD
 * @param {"fixed" | "inline"} variant — fixed: 画面上部固定 / inline: スロットヘッダー内
 */
export default function ProgressivePotDisplay({
  totalPot = 0,
  visible = true,
  variant = "fixed",
}) {
  const prevPotRef = useRef(totalPot);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const prev = prevPotRef.current;
    if (totalPot > prev) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 1400);
      prevPotRef.current = totalPot;
      return () => clearTimeout(timer);
    }
    prevPotRef.current = totalPot;
    return undefined;
  }, [totalPot]);

  if (!visible) return null;

  const formatted = Math.max(0, Math.floor(Number(totalPot) || 0)).toLocaleString();

  const pill = (
    <div
      className="group/pot relative cursor-help"
      title={POT_TOOLTIP}
      tabIndex={0}
    >
      <div
        className={[
          "rounded-full border px-3 py-1 shadow-lg backdrop-blur-sm transition-colors duration-300 sm:px-4 sm:py-1.5",
          pulse
            ? "border-amber-300/90 bg-amber-500/25 shadow-[0_0_28px_rgba(251,191,36,0.55)]"
            : "border-amber-500/50 bg-slate-950/80 shadow-[0_0_16px_rgba(251,191,36,0.2)]",
        ].join(" ")}
      >
        <span className="text-[9px] font-bold tracking-[0.15em] text-amber-200/80 uppercase sm:text-[10px] sm:tracking-[0.2em]">
          POT
        </span>
        <span
          className={[
            "ml-1.5 font-black tabular-nums tracking-tight sm:ml-2",
            pulse ? "text-amber-100" : "text-amber-300",
          ].join(" ")}
          style={{ fontSize: variant === "inline" ? "clamp(0.8rem, 3.2vw, 1.05rem)" : "clamp(0.95rem, 3.5vw, 1.25rem)" }}
        >
          {formatted}G
        </span>
      </div>
      <div
        className="pointer-events-none absolute top-full left-1/2 z-[300] mt-1.5 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-amber-500/35 bg-slate-950 px-2.5 py-1.5 text-[10px] leading-snug text-slate-100 shadow-xl group-hover/pot:block group-focus-within/pot:block sm:text-[11px]"
        role="tooltip"
      >
        {POT_TOOLTIP}
      </div>
    </div>
  );

  if (variant === "inline") {
    return (
      <div
        className={[pulse ? "anim-progressive-pot-pulse" : "", "shrink-0 justify-self-center"].filter(Boolean).join(" ")}
        role="status"
        aria-live="polite"
        aria-label={`POT ${formatted}G`}
      >
        {pill}
      </div>
    );
  }

  return (
    <div
      className={[
        "fixed left-1/2 top-[max(3.25rem,calc(env(safe-area-inset-top)+3.25rem))] z-[199] -translate-x-1/2",
        pulse ? "anim-progressive-pot-pulse" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-label={`POT ${formatted}G`}
    >
      {pill}
    </div>
  );
}
