import React from "react";

/** 目立つクリップボードコピーボタン（ルームID・プレイヤーID など共通） */
export default function CopyClipboardButton({
  copied = false,
  onCopy,
  className = "",
  size = "md",
}) {
  if (!onCopy) return null;

  const sizeCls =
    size === "sm"
      ? "px-2.5 py-1 text-xs"
      : "px-3 py-1.5 text-sm";

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`shrink-0 rounded-lg font-bold transition-all shadow-md ${sizeCls} ${
        copied
          ? "bg-emerald-500 text-white scale-95"
          : "bg-cyan-600 text-white hover:bg-cyan-500 active:scale-[0.98]"
      } ${className}`}
      title="クリップボードにコピー"
    >
      {copied ? "コピーしました！✓" : "📋 コピー"}
    </button>
  );
}
