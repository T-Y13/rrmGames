import React, { useEffect, useRef, useState } from "react";
import { CHARACTERS } from "../constants/gameBalance";
import { getStandeeCascade } from "../constants/assets";
import { publicAssetUrl } from "../lib/publicAssetUrl";

/** 1枚目（躓き）の Y 軸 2 回転にかける時間（ms）— CSS と同期 */
const SPIN_DURATION_MS = 1600;
/** シェイクを止めるタイミング（回転の前半で軽く） */
const SHAKE_CUTOFF_MS = 900;
/** 2枚目表示〜 PON!! 〜終了までの余韻 */
const AFTER_SPIN_MS = 1600;
const CUTIN_TOTAL_MS = SPIN_DURATION_MS + AFTER_SPIN_MS;

function playOttoSynth() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === "suspended") ac.resume().catch(() => {});
    const t0 = ac.currentTime;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.connect(g);
    g.connect(ac.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(420, t0);
    osc.frequency.exponentialRampToValueAtTime(760, t0 + 0.07);
    g.gain.setValueAtTime(0.22, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.14);
    osc.start(t0);
    osc.stop(t0 + 0.15);
  } catch (_) {}
}

function playDosaaSynth() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === "suspended") ac.resume().catch(() => {});
    const t0 = ac.currentTime;
    const dur = 0.24;
    const nSamples = Math.floor(ac.sampleRate * dur);
    const buffer = ac.createBuffer(1, nSamples, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < nSamples; i++) {
      const decay = Math.pow(1 - i / nSamples, 2.1);
      data[i] = (Math.random() * 2 - 1) * decay;
    }
    const noise = ac.createBufferSource();
    noise.buffer = buffer;
    const band = ac.createBiquadFilter();
    band.type = "lowpass";
    band.frequency.value = 380;
    const gN = ac.createGain();
    gN.gain.setValueAtTime(0.34, t0);
    gN.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    noise.connect(band);
    band.connect(gN);
    gN.connect(ac.destination);
    noise.start(t0);
    noise.stop(t0 + dur);

    const osc = ac.createOscillator();
    const gO = ac.createGain();
    osc.connect(gO);
    gO.connect(ac.destination);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(98, t0);
    osc.frequency.exponentialRampToValueAtTime(42, t0 + dur);
    gO.gain.setValueAtTime(0.36, t0);
    gO.gain.exponentialRampToValueAtTime(0.001, t0 + dur * 1.05);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  } catch (_) {}
}

function CutinFigure({ characterType, pose }) {
  const candidates = getStandeeCascade(characterType, pose);
  const [failIdx, setFailIdx] = useState(0);
  const c = CHARACTERS[characterType] ?? CHARACTERS.salaryman;

  useEffect(() => {
    setFailIdx(0);
  }, [characterType, pose]);

  if (!candidates.length || failIdx >= candidates.length) {
    return (
      <span className="select-none text-[clamp(4.5rem,20vw,9rem)] leading-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)]">
        {c.emoji ?? "🙂"}
      </span>
    );
  }

  return (
    <img
      src={publicAssetUrl(candidates[failIdx])}
      alt=""
      draggable={false}
      className="max-h-[min(52vh,520px)] w-auto max-w-[min(92vw,560px)] select-none object-contain object-bottom drop-shadow-[0_12px_40px_rgba(0,0,0,0.75)]"
      onError={() => setFailIdx((n) => n + 1)}
    />
  );
}

/**
 * PON転倒カットイン：躓き画像を Y 軸に 2 回転（720°）したあと転倒画像へ切替 → PON!!。
 */
export default function PonCutin({ active, characterType, onComplete, onFallLand }) {
  const [phaseShake, setPhaseShake] = useState(true);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [showPonBurst, setShowPonBurst] = useState(false);
  const [landedNudge, setLandedNudge] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const onFallLandRef = useRef(onFallLand);
  onCompleteRef.current = onComplete;
  onFallLandRef.current = onFallLand;

  useEffect(() => {
    if (!active) {
      setPhaseShake(true);
      setShowSecondImage(false);
      setShowPonBurst(false);
      setLandedNudge(false);
      return;
    }
    setPhaseShake(true);
    setShowSecondImage(false);
    setShowPonBurst(false);
    setLandedNudge(false);

    playOttoSynth();

    const tShakeOff = setTimeout(() => setPhaseShake(false), SHAKE_CUTOFF_MS);

    const tSpinDone = setTimeout(() => {
      setShowSecondImage(true);
      playDosaaSynth();
      onFallLandRef.current?.();
      setShowPonBurst(true);
      setLandedNudge(true);
    }, SPIN_DURATION_MS);

    const tDone = setTimeout(() => {
      onCompleteRef.current?.();
    }, CUTIN_TOTAL_MS);

    return () => {
      clearTimeout(tShakeOff);
      clearTimeout(tSpinDone);
      clearTimeout(tDone);
    };
  }, [active]);

  if (!active) return null;

  const ct = characterType ?? "salaryman";
  const spinSeconds = SPIN_DURATION_MS / 1000;

  return (
    <div
      className={`fixed inset-0 z-[220] flex cursor-default flex-col items-center justify-center gap-4 bg-black/75 pointer-events-auto px-4 ${
        phaseShake ? "anim-pon-cutin-shake" : ""
      }`}
      aria-hidden
    >
      <div
        className={`pon-cutin-scene relative mx-auto w-[min(92vw,560px)] h-[min(52vh,520px)] transition-transform duration-500 ease-out ${
          landedNudge ? "translate-y-2 scale-[0.99]" : ""
        }`}
      >
        {!showSecondImage ? (
          <div
            className="pon-cutin-spin-host anim-pon-stumble-spin"
            style={{
              // @keyframes duration と JS タイマーを一致させる
              ["--pon-spin-duration"]: `${spinSeconds}s`,
            }}
          >
            <CutinFigure characterType={ct} pose="stumble" />
          </div>
        ) : (
          <div className="pon-cutin-spin-host anim-fadein">
            <CutinFigure characterType={ct} pose="fell_down" />
          </div>
        )}
      </div>

      {showPonBurst && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative anim-pon-burst-impact font-black tracking-tight text-white">
            <span className="anim-pon-spark-impact pointer-events-none absolute -inset-12 rounded-full bg-rose-500/35 blur-3xl -z-10" />
            <span
              className="relative inline-block drop-shadow-[0_0_40px_rgba(251,113,133,0.9)]"
              style={{
                fontSize: "clamp(2.8rem, 11vw, 5rem)",
                textShadow:
                  "0 0 32px rgba(244,63,94,1), 0 0 64px rgba(251,113,133,0.65), 0 8px 0 #881337, 0 14px 28px rgba(0,0,0,0.8)",
              }}
            >
              PON!!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
