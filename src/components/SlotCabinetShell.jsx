import React from "react";
import slotCabinetPng from "../assets/slot-machine.png";
import SlotReelStopButtons from "./SlotReelStopButtons";
import { SLOT_CABINET_VARIANT } from "../constants/slotCabinetLayout";

function cabinetImgOnError(e) {
  const el = e.currentTarget;
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  const step = el.dataset.cabinetImgTry ?? "0";
  if (step === "0") {
    el.dataset.cabinetImgTry = "1";
    el.src = `${base}assets/images/slot-machine.png`;
  } else if (step === "1") {
    el.dataset.cabinetImgTry = "2";
    el.src = `${base}images/slot-machine.png`;
  }
}

function ReachLamps({ active = false }) {
  return (
    <div className="slot-cabinet-vector__lamps" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={[
            "slot-cabinet-vector__lamp",
            active && i === 1 ? "slot-cabinet-vector__lamp--on" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ))}
    </div>
  );
}

function VectorCabinet({
  cabinetRecoil,
  stageAuraClass,
  isReach,
  stackMinHeight,
  payoutAside,
  reelStack,
  spinButton,
  stopButtons,
}) {
  const showSpin = spinButton && !spinButton.hidden;
  const showStop = stopButtons && !stopButtons.hidden;

  return (
    <div
      className={[
        "slot-cabinet-stage slot-cabinet-vector relative mx-auto w-full",
        cabinetRecoil ? "slot-cabinet-vector--recoiling" : "",
        stageAuraClass,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ maxWidth: "min(100%, 440px)" }}
    >
      {payoutAside}

      <div
        className={[
          "slot-cabinet-vector__frame",
          isReach ? "slot-cabinet-vector__frame--reach" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="slot-cabinet-vector__header">
          <span className="slot-cabinet-vector__title">PONS SLOT</span>
          <ReachLamps active={isReach} />
        </div>

        {isReach && (
          <p className="slot-cabinet-vector__reach-banner" aria-live="polite">
            🎯 REACH!!
          </p>
        )}

        <div className="slot-cabinet-vector__reel-stage" style={{ minHeight: stackMinHeight }}>
          <div className="slot-cabinet-vector__reel-window">
            <div className="slot-cabinet-vector__reel-layer">{reelStack}</div>
            <div className="slot-cabinet-vector__reel-dividers" aria-hidden>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        {(showStop || showSpin) && (
          <div className="slot-cabinet-vector__controls">
            {showStop && (
              <SlotReelStopButtons layout="grid" {...stopButtons} />
            )}
            {showSpin && (
              <button
                type="button"
                title={spinButton.title}
                aria-label={spinButton["aria-label"] ?? spinButton.title}
                disabled={spinButton.disabled}
                onClick={spinButton.onClick}
                className={[
                  "slot-cabinet-vector__spin-btn",
                  spinButton.spectatorMode ? "slot-cabinet-vector__spin-btn--spectator" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {spinButton.label ?? "SPIN"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageCabinet({
  cabinetRecoil,
  stageAuraClass,
  isReach,
  stackMinHeight,
  payoutAside,
  reelStack,
  spinButton,
  stopButtons,
}) {
  const winBox = SLOT_IMAGE_WIN_BOX_STYLE;
  const showSpin = spinButton && !spinButton.hidden;

  return (
    <div
      className={[
        "slot-cabinet-stage relative mx-auto w-full max-w-[min(100%,440px)]",
        cabinetRecoil ? "slot-cabinet-recoiling" : "",
        stageAuraClass,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {payoutAside}

      {isReach && (
        <p className="pointer-events-none absolute -top-7 left-0 right-0 z-[30] text-center text-xs font-bold text-red-400 animate-pulse">
          🎯 REACH!!
        </p>
      )}

      <div className="slot-machine-stack relative w-full" style={{ minHeight: stackMinHeight }}>
        {reelStack}

        <div className="slot-cabinet-img-wrap relative z-[10] mx-auto w-full max-w-full pointer-events-none">
          <img
            src={slotCabinetPng}
            alt=""
            decoding="async"
            draggable={false}
            className="slot-cabinet-img mx-auto block h-auto w-full max-w-full select-none pointer-events-none"
            onError={cabinetImgOnError}
          />
        </div>

        {showSpin && (
          <button
            type="button"
            title={spinButton.title}
            aria-label={spinButton["aria-label"] ?? spinButton.title}
            disabled={spinButton.disabled}
            onClick={spinButton.onClick}
            className={
              spinButton.spectatorMode
                ? "absolute z-[20] cursor-not-allowed rounded-full border-0 bg-transparent p-0 opacity-25"
                : "absolute z-[20] cursor-pointer rounded-full border-0 bg-transparent p-0 opacity-40 transition-opacity hover:opacity-70 active:translate-y-0.5 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
            }
            style={{
              top: "var(--slot-spin-top)",
              left: "var(--slot-spin-left)",
              width: "var(--slot-spin-w)",
              height: "var(--slot-spin-h)",
            }}
          />
        )}

        {stopButtons && !stopButtons.hidden && (
          <SlotReelStopButtons layout="overlay" {...stopButtons} />
        )}
      </div>
    </div>
  );
}

/**
 * スロット筐体シェル。8日目は vector、デイリー練習は image（PNG）。
 */
export default function SlotCabinetShell({
  variant = SLOT_CABINET_VARIANT.IMAGE,
  cabinetRecoil = false,
  stageAuraClass = "",
  isReach = false,
  stackMinHeight = "200px",
  payoutAside = null,
  reelStack = null,
  spinButton = null,
  stopButtons = null,
}) {
  const shared = {
    cabinetRecoil,
    stageAuraClass,
    isReach,
    stackMinHeight,
    payoutAside,
    reelStack,
    spinButton,
    stopButtons,
  };

  if (variant === SLOT_CABINET_VARIANT.VECTOR) {
    return <VectorCabinet {...shared} />;
  }
  return <ImageCabinet {...shared} />;
}
