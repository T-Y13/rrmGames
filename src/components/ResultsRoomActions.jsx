import { Loader2 } from "lucide-react";

/**
 * 最終結果画面: ホストは「続ける」「解散」、参加者は「抜ける」＋ホスト待ち表示。
 */
export default function ResultsRoomActions({
  isHost,
  waitingForHost,
  loading,
  onDisband,
  onContinue,
  onLeave,
}) {
  if (isHost) {
    return (
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          disabled={loading}
          onClick={onContinue}
          className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-50"
        >
          {loading ? "処理中…" : "続ける（キャラ選択へ）"}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={onDisband}
          className="w-full rounded-xl border border-rose-500/60 bg-rose-500/15 py-3 font-bold text-rose-200 hover:bg-rose-500/25 transition-colors disabled:opacity-50"
        >
          解散
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 pt-1">
      <button
        type="button"
        disabled={loading}
        onClick={onLeave}
        className="w-full rounded-xl border border-slate-600 bg-slate-800 py-3 font-bold text-slate-100 hover:border-slate-500 transition-colors disabled:opacity-50"
      >
        {loading ? "処理中…" : "抜ける"}
      </button>
      {waitingForHost && (
        <p className="flex items-center justify-center gap-2 text-center text-sm text-slate-400" role="status">
          <Loader2 size={16} className="animate-spin shrink-0" aria-hidden />
          ホストの操作を待っています…
        </p>
      )}
    </div>
  );
}
