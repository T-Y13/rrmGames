import React, { useEffect, useRef, useState } from "react";

/**
 * マルチ8日目：ルーム共有プログレッシブポット HUD
 */
export default function ProgressivePotDisplay({ totalPot = 0, visible = true }) {
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

  return (
    <div
      className={[
        "pointer-events-none fixed left-1/2 top-[max(3.25rem,calc(env(safe-area-inset-top)+3.25rem))] z-[199] -translate-x-1/2",
        pulse ? "anim-progressive-pot-pulse" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-label={`Progressive pot ${formatted} gold`}
    >
      <div
        className={[
          "rounded-full border px-4 py-1.5 shadow-lg backdrop-blur-sm transition-colors duration-300",
          pulse
            ? "border-amber-300/90 bg-amber-500/25 shadow-[0_0_28px_rgba(251,191,36,0.55)]"
            : "border-amber-500/50 bg-slate-950/80 shadow-[0_0_16px_rgba(251,191,36,0.2)]",
        ].join(" ")}
      >
        <span className="text-[10px] font-bold tracking-[0.2em] text-amber-200/80 uppercase sm:text-xs">
          Pot
        </span>
        <span
          className={[
            "ml-2 font-black tabular-nums tracking-tight",
            pulse ? "text-amber-100" : "text-amber-300",
          ].join(" ")}
          style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.25rem)" }}
        >
          {formatted}G
        </span>
      </div>
    </div>
  );
}
