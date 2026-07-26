import React from "react";

const SLOT_PAYOUT_TEXT_STYLE = {
  WebkitTextStroke: "2px rgba(120,53,15,0.85)",
  paintOrder: "stroke fill",
  textShadow:
    "0 0 2px #000, 0 2px 0 #854d0e, 0 4px 12px rgba(0,0,0,0.75), 0 0 28px rgba(250,204,21,0.75), 0 0 48px rgba(234,179,8,0.45)",
};

/** スロット当たり時の +NG ポップ（SP は compact でリール上に重ねる） */
export default function SlotPayoutAmountLabel({ amount, compact = false, onAnimationEnd }) {
  return (
    <span
      role="presentation"
      className="anim-slot-payout-popup font-black tabular-nums leading-none tracking-tight text-[#ffe566]"
      style={{
        ...SLOT_PAYOUT_TEXT_STYLE,
        fontSize: compact
          ? "clamp(1.65rem, 7.5vw, 2.5rem)"
          : "clamp(2.5rem, min(14vw, 5rem), 5rem)",
      }}
      onAnimationEnd={onAnimationEnd}
    >
      +{amount}G
    </span>
  );
}
