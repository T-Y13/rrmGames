import React from "react";
import { HELP_DEATH_DIALOG_MESSAGE } from "../lib/boardDeathPresentation";

/**
 * 人助け即死：OK でフェードアウト → 墓標 → Firestore 反映へ進む。
 */
export default function BoardHelpDeathDialog({ open, onConfirm }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-death-dialog-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-rose-500/45 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-[0_0_48px_rgba(244,63,94,0.25)] space-y-5">
        <p id="help-death-dialog-title" className="text-center text-lg font-bold leading-relaxed text-rose-100">
          {HELP_DEATH_DIALOG_MESSAGE}
        </p>
        <button
          type="button"
          onClick={onConfirm}
          className="w-full rounded-xl bg-rose-600 py-3 text-base font-bold text-white hover:bg-rose-500 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
