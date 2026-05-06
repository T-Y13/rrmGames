import { publicAssetUrl } from "../lib/publicAssetUrl";

import { WORK_CUTIN_IMAGE } from "../constants/branding";



/** 日常「仕事」の画像カットイン（親が一定時間後にオフにする） */

export default function WorkCutin({ gold, stat }) {

  const src = publicAssetUrl(WORK_CUTIN_IMAGE);

  return (

    <div

      className="fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-gradient-to-br from-black/80 via-slate-950/50 to-black/90 pointer-events-auto anim-stream-cutin-veil"

      aria-hidden

      role="presentation"

    >

      <div className="anim-stream-cutin-lines opacity-50" aria-hidden />

      <div

        className="pointer-events-none absolute inset-y-[-15%] left-[-40%] w-[180%] bg-gradient-to-r from-transparent via-amber-200/20 to-transparent opacity-90 anim-stream-cutin-sweep"

        aria-hidden

      />

      <div className="relative z-[2] flex flex-col items-center justify-center px-5 anim-stream-cutin-img-wrap">

        <div className="rounded-2xl border border-amber-400/45 bg-slate-950/30 p-4 sm:p-5 anim-stream-cutin-ring">

          <img

            src={src}

            alt=""

            className="anim-stream-cutin-img max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_28px_rgba(251,191,36,0.45)]"

            draggable={false}

          />

        </div>

        <div className="mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">

          <p className="text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums">

            ＋{gold}ゴールド

          </p>

          {stat ? (

            <p className="mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-amber-200/95 tabular-nums">

              {stat.label} ＋{stat.delta}

            </p>

          ) : null}

        </div>

      </div>

    </div>

  );

}

