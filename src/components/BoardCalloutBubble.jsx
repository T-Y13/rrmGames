import React from "react";

const TONE_CLASS = {
  neutral: {
    box: "border-slate-500/70 bg-slate-950/94 text-slate-100",
    tail: "bg-slate-950/94 border-slate-500/70",
  },
  positive: {
    box: "border-emerald-400/75 bg-slate-950/94 text-emerald-200",
    tail: "bg-slate-950/94 border-emerald-400/75",
  },
  negative: {
    box: "border-rose-400/75 bg-slate-950/94 text-rose-200",
    tail: "bg-slate-950/94 border-rose-400/75",
  },
  moneyGain: {
    box: "border-yellow-400/80 bg-slate-950/95 text-yellow-200",
    tail: "bg-slate-950/95 border-yellow-400/80",
  },
  moneyLoss: {
    box: "border-rose-400/80 bg-slate-950/95 text-rose-200",
    tail: "bg-slate-950/95 border-rose-400/80",
  },
  action: {
    box: "border-amber-400/75 bg-slate-950/94 text-amber-100",
    tail: "bg-slate-950/94 border-amber-400/75",
  },
};

/**
 * すごろく盤面上の短文ラベル用・読みやすい吹き出し背景。
 * @param {"bottom"|"left"|"right"|"top"} tail しっぽが指す方向（キャラ側）
 */
export default function BoardCalloutBubble({
  children,
  tail = "bottom",
  tone = "neutral",
  className = "",
  bodyClassName = "",
  bodyStyle,
  /** 指定時は半透明トーンではなく単色塗りつぶし（文字は白） */
  fillColor,
  tailStyle,
}) {
  const palette = TONE_CLASS[tone] ?? TONE_CLASS.neutral;
  const solidFill = Boolean(fillColor);

  const bodyInlineStyle = solidFill
    ? {
        backgroundColor: fillColor,
        color: "#ffffff",
        borderColor: fillColor,
        ...bodyStyle,
      }
    : bodyStyle;

  const tailInlineStyle = solidFill
    ? {
        backgroundColor: fillColor,
        borderColor: fillColor,
        ...tailStyle,
      }
    : tailStyle;

  const tailPos =
    tail === "left"
      ? "absolute -left-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b border-l"
      : tail === "right"
        ? "absolute -right-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-t border-r"
        : tail === "top"
          ? "absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l border-t"
          : "absolute -bottom-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r";

  return (
    <span className={`relative inline-flex ${className}`}>
      <span
        className={`relative z-[1] inline-flex items-center justify-center rounded-lg border font-black leading-none shadow-[0_4px_16px_rgba(0,0,0,0.55)] ${
          solidFill ? "" : "backdrop-blur-[2px] px-2 py-1"
        } ${solidFill ? "text-white" : palette.box} ${bodyClassName}`}
        style={bodyInlineStyle}
      >
        {children}
      </span>
      <span
        className={`pointer-events-none ${tailPos} ${solidFill ? "" : palette.tail}`}
        style={tailInlineStyle}
        aria-hidden
      />
    </span>
  );
}
