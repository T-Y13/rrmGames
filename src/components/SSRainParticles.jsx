import React, { useMemo } from "react";

/** SSランク 金のパーティクル雨 */
export default function SSRainParticles() {
  const items = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: (i * 97 + 13) % 100,
        delay: ((i * 37) % 30) / 10,
        dur: 2.2 + ((i * 17) % 20) / 10,
        sym: i % 4 === 0 ? "¥" : i % 4 === 1 ? "★" : i % 4 === 2 ? "¥" : "◆",
        size: 13 + (i % 5) * 4,
        color: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#fde68a" : "#f59e0b",
      })),
    [],
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute anim-particle font-black select-none"
          style={{
            left: `${p.left}%`,
            top: "-40px",
            fontSize: `${p.size}px`,
            color: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        >
          {p.sym}
        </span>
      ))}
    </div>
  );
}
