import { publicAssetUrl } from "../lib/publicAssetUrl";
import { WORK_CUTIN_IMAGE } from "../constants/branding";

/** 日常「仕事」の画像カットイン（親が一定時間後にオフにする） */
export default function WorkCutin({ gold, stat, characterType, onDismiss }) {
  const isRirimu = characterType === "vtuber" || characterType === "ririm";
  const src = publicAssetUrl(isRirimu ? "/images/work_ririmu.png" : WORK_CUTIN_IMAGE);

  return (
    <div
      className="fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-slate-950 pointer-events-auto"
      aria-hidden={!onDismiss}
      role={onDismiss ? "dialog" : "presentation"}
      aria-modal={onDismiss ? "true" : undefined}
    >
      <div className="relative z-[2] flex flex-col items-center justify-center px-5">
        <div className="rounded-2xl border-2 border-amber-400 bg-slate-900 p-4 sm:p-5">
          <img
            src={src}
            alt=""
            className="max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_28px_rgba(251,191,36,0.45)] opacity-100"
            draggable={false}
          />
        </div>
        <div className="mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          <p className="text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums">
            ＋{gold}ゴールド
          </p>
          {stat ? (
            <p className="mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-amber-200 tabular-nums">
              {stat.label} ＋{stat.delta}
            </p>
          ) : null}
        </div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="mt-6 rounded-xl border border-slate-600 bg-slate-800/90 px-6 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-700/90"
          >
            閉じる
          </button>
        ) : null}
      </div>
    </div>
  );
}
