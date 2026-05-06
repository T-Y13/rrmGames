import React, { useEffect, useState } from "react";
import { ASSETS } from "../constants/assets";
import { publicAssetUrl } from "../lib/publicAssetUrl";
import { TaxiStandeeImage } from "./CharacterPieces";

/** タクシー渋滞トリガー中のフルスクリーンカットイン（enter/ride のあと、drive／駒ホップより前に表示） */
export default function TaxiTrafficJamCutin() {
  const [imgFailed, setImgFailed] = useState(false);
  const urls = ASSETS.taxi_congestion ?? [];

  useEffect(() => {
    setImgFailed(false);
  }, []);

  const src =
    urls.length > 0 && !imgFailed
      ? publicAssetUrl(urls[0])
      : null;

  return (
    <div
      className="fixed inset-0 z-[218] flex flex-col items-center justify-center pointer-events-none px-4 anim-traffic-jam-overlay-fade bg-black/88 backdrop-blur-[4px]"
      aria-hidden
    >
      <div className="relative w-full max-w-[min(92vw,1160px)] rounded-2xl border border-amber-500/25 shadow-[0_28px_80px_rgba(0,0,0,0.92)] overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/20 to-black/70 pointer-events-none" />
        {!src ? (
          <div className="relative z-0 flex min-h-[min(88vh,720px)] w-full items-center justify-center gap-3 bg-slate-900 px-4 text-[clamp(2.5rem,12vw,3.5rem)] leading-none opacity-95">
            <span aria-hidden>🚧</span>
            <TaxiStandeeImage imgClassName="max-h-[min(56vh,400px)] w-auto max-w-[72%] object-contain opacity-100 drop-shadow-lg" />
            <span aria-hidden>🚧</span>
          </div>
        ) : (
          <img
            src={src}
            alt=""
            className="relative z-0 w-full max-h-[min(112vh,1040px)] object-cover object-center"
            draggable={false}
            onError={() => setImgFailed(true)}
          />
        )}
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-end pb-6 pt-16 px-4 pointer-events-none">
          <p className="text-center font-black anim-traffic-jam-neon text-[clamp(1.25rem,4.5vw,1.85rem)] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            <span className="text-amber-100">渋滞発生！</span>
            <span className="text-slate-200 text-[0.82em] ml-2 tracking-tight font-bold normal-case">
              (Traffic Jam!)
            </span>
          </p>
          <p className="mt-2 text-center text-xs font-semibold text-amber-200/85 max-w-md">
            運転手もため息… メーターだけが無情に刻みます。
          </p>
        </div>
      </div>
    </div>
  );
}
