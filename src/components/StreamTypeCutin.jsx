import { publicAssetUrl } from "../lib/publicAssetUrl";
import { STREAM_CUTIN_CHAT, STREAM_CUTIN_GAME } from "../constants/branding";

/**
 * 日常「配信」で雑談／ゲーム種別が決まった直後のカットイン（親が短時間でオフにする想定）
 */
export default function StreamTypeCutin({ mode, gold, stat }) {
  if (mode !== "chat" && mode !== "game") return null;
  const src = publicAssetUrl(mode === "chat" ? STREAM_CUTIN_CHAT : STREAM_CUTIN_GAME);

  return (
    <div
      className="fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-slate-950 pointer-events-auto"
      aria-hidden
      role="presentation"
    >
      <div className="relative z-[2] flex flex-col items-center justify-center px-5">
        <div className="rounded-2xl border-2 border-cyan-400 bg-slate-900 p-4 sm:p-5">
          <img
            src={src}
            alt=""
            className="max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_32px_rgba(34,211,238,0.55)] opacity-100"
            draggable={false}
          />
        </div>
        <div className="mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          <p className="text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums">
            ＋{gold}ゴールド
          </p>
          {stat ? (
            <p className="mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-cyan-200 tabular-nums">
              {stat.label} ＋{stat.delta}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
