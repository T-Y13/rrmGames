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

      className="fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-gradient-to-br from-black/80 via-slate-950/50 to-black/90 pointer-events-auto anim-stream-cutin-veil"

      aria-hidden

      role="presentation"

    >

      <div className="anim-stream-cutin-lines opacity-50" aria-hidden />

      <div

        className="pointer-events-none absolute inset-y-[-15%] left-[-40%] w-[180%] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-90 anim-stream-cutin-sweep"

        aria-hidden

      />

      <div className="relative z-[2] flex flex-col items-center justify-center px-5 anim-stream-cutin-img-wrap">

        <div className="rounded-2xl border border-cyan-400/40 bg-slate-950/30 p-4 sm:p-5 anim-stream-cutin-ring">

          <img

            src={src}

            alt=""

            className="anim-stream-cutin-img max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_32px_rgba(34,211,238,0.55)]"

            draggable={false}

          />

        </div>

        <div className="mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">

          <p className="text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums">

            ＋{gold}ゴールド

          </p>

          {stat ? (

            <p className="mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-cyan-200/95 tabular-nums">

              {stat.label} ＋{stat.delta}

            </p>

          ) : null}

        </div>

      </div>

    </div>

  );

}

