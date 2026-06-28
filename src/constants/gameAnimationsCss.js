export const GAME_STYLES = `
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-6px); }
  }
  @keyframes hop {
    0%   { transform: translateY(0px)   scaleX(1)    scaleY(1); }
    20%  { transform: translateY(-16px) scaleX(0.88) scaleY(1.12); }
    50%  { transform: translateY(-26px) scaleX(0.85) scaleY(1.15); }
    72%  { transform: translateY(0px)   scaleX(1.25) scaleY(0.75); }
    84%  { transform: translateY(-7px)  scaleX(0.95) scaleY(1.07); }
    93%  { transform: translateY(0px)   scaleX(1.06) scaleY(0.96); }
    100% { transform: translateY(0px)   scaleX(1)    scaleY(1); }
  }
  /* 低振幅・高周波の振動（画面をガクッとさせない） */
  @keyframes screenShake {
    0%,100% { transform: translate3d(0, 0, 0); }
    25% { transform: translate3d(1.2px, -0.9px, 0); }
    50% { transform: translate3d(-1px, 1.1px, 0); }
    75% { transform: translate3d(0.9px, 0.8px, 0); }
  }
  @keyframes breathe {
    0%,100% { transform: translateY(0px) scale(1); }
    50%      { transform: translateY(-5px) scale(1.08); }
  }
  @keyframes roadScroll {
    from { transform: translateY(-44px) scale(0.96); filter: blur(1.5px); opacity: 0.55; }
    to   { transform: translateY(0)     scale(1);    filter: blur(0);     opacity: 1;    }
  }
  .anim-road-scroll { animation: roadScroll 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
  @keyframes taxiSlideIn {
    from { transform: translateY(100%) scale(0.25); opacity: 0; }
    to   { transform: translateY(0%)   scale(1);    opacity: 1; }
  }
  @keyframes taxiDrive {
    from { transform: translateY(0%)    scale(1);    opacity: 1; }
    to   { transform: translateY(-220%) scale(0.04); opacity: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse-scale {
    0%,100% { transform: scale(1); }
    50%     { transform: scale(1.15); }
  }
  @keyframes countTick {
    0%   { transform: scale(1.4); color: #facc15; }
    100% { transform: scale(1);   color: inherit; }
  }
  .anim-float   { animation: float   1.8s ease-in-out infinite; }
  .anim-hop     { animation: hop     0.65s cubic-bezier(0.36,0.07,0.19,0.97) forwards; }

  /* ── すごろく：駒移動中の背景スクロール・カメラ追従・高速ブラー ── */
  @keyframes sugorokuBgTravelForward {
    0% {
      transform: scale(1.05) translate3d(-1.25%, 10px, 0);
      filter: blur(0px);
    }
    100% {
      transform: scale(1.05) translate3d(1.25%, -16px, 0);
      filter: blur(0px);
    }
  }
  @keyframes sugorokuBgTravelBack {
    0% {
      transform: scale(1.05) translate3d(1.25%, -12px, 0);
      filter: blur(0px);
    }
    100% {
      transform: scale(1.05) translate3d(-1.25%, 14px, 0);
      filter: blur(0px);
    }
  }
  @keyframes sugorokuBgTravelForwardFast {
    0% {
      transform: scale(1.08) translate3d(-2.5%, 16px, 0);
      filter: blur(2.4px);
    }
    100% {
      transform: scale(1.08) translate3d(2.5%, -24px, 0);
      filter: blur(1px);
    }
  }
  @keyframes sugorokuBgTravelBackFast {
    0% {
      transform: scale(1.08) translate3d(2.5%, -20px, 0);
      filter: blur(2.2px);
    }
    100% {
      transform: scale(1.08) translate3d(-2.5%, 20px, 0);
      filter: blur(1px);
    }
  }
  .sugoroku-bg-motion-img--active.sugoroku-bg-motion-img--fwd:not(.sugoroku-bg-motion-img--fast) {
    animation: sugorokuBgTravelForward var(--sugoroku-step-ms, 360ms) linear infinite;
    will-change: transform, filter;
  }
  .sugoroku-bg-motion-img--active.sugoroku-bg-motion-img--back:not(.sugoroku-bg-motion-img--fast) {
    animation: sugorokuBgTravelBack var(--sugoroku-step-ms, 360ms) linear infinite;
    will-change: transform, filter;
  }
  .sugoroku-bg-motion-img--active.sugoroku-bg-motion-img--fwd.sugoroku-bg-motion-img--fast {
    animation: sugorokuBgTravelForwardFast var(--sugoroku-step-ms, 110ms) linear infinite;
    will-change: transform, filter;
  }
  .sugoroku-bg-motion-img--active.sugoroku-bg-motion-img--back.sugoroku-bg-motion-img--fast {
    animation: sugorokuBgTravelBackFast var(--sugoroku-step-ms, 110ms) linear infinite;
    will-change: transform, filter;
  }

  .sugoroku-seamless-bg {
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  @keyframes sugorokuSpeedLinesShift {
    0% { transform: translate3d(0, 0, 0); opacity: 0.38; }
    50% { transform: translate3d(-14px, 1px, 0); opacity: 0.5; }
    100% { transform: translate3d(-28px, 0, 0); opacity: 0.38; }
  }
  .sugoroku-speed-lines-overlay {
    animation: sugorokuSpeedLinesShift 1.15s linear infinite;
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: 6;
    border-radius: inherit;
    overflow: hidden;
    background: repeating-linear-gradient(
      102deg,
      transparent 0,
      transparent 20px,
      rgba(255, 255, 255, 0.075) 20px,
      rgba(255, 255, 255, 0.075) 24px
    );
    mix-blend-mode: overlay;
    opacity: 0.38;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 12%,
      black 88%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 12%,
      black 88%,
      transparent 100%
    );
  }

  @keyframes standeeWalkRhythm {
    0%, 100% { transform: translateY(0) scaleY(1); }
    33% { transform: translateY(-5px) scaleY(1.02); }
    66% { transform: translateY(-2px) scaleY(0.98); }
  }
  .standee-piece.anim-standee-walk {
    animation: standeeWalkRhythm var(--standee-walk-ms, 420ms) ease-in-out infinite;
    will-change: transform;
  }

  @keyframes engineVibrate {
    0%, 100% { transform: translate3d(0, 0, 0); }
    33% { transform: translate3d(0.42px, -0.34px, 0); }
    66% { transform: translate3d(-0.4px, 0.3px, 0); }
  }
  .anim-engine-vibrate {
    animation: engineVibrate 0.068s linear infinite;
    will-change: transform;
  }
  .anim-vibrate {
    animation: engineVibrate 0.068s linear infinite;
    will-change: transform;
  }

  @keyframes tileEffectFloatBob {
    0%, 100% { transform: translateY(0); opacity: 0.94; }
    50%      { transform: translateY(-3px); opacity: 1; }
  }
  .anim-tile-effect-float {
    animation: tileEffectFloatBob 1.6s ease-in-out infinite;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .anim-shake   { animation: screenShake 0.48s ease-out forwards; }
  .anim-breathe { animation: breathe 2.8s ease-in-out infinite; }
  .anim-taxi-in { animation: taxiSlideIn 0.55s ease-out forwards; }
  .anim-taxi-go { animation: taxiDrive   0.65s ease-in  forwards; }

  /* タクシー：画面左上から進入してカーブ側に停車 */
  @keyframes taxiApproachNW {
    0% { transform: translate3d(-125%, -100%, 0) rotate(-11deg) scale(0.48); opacity: 0.5; }
    100% { transform: translate3d(0, 0, 0) rotate(0) scale(1); opacity: 1; }
  }
  .anim-taxi-approach-nw {
    animation: taxiApproachNW 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    transform-origin: 50% 80%;
  }
  /* タイル上：キャラのすぐ左から進入 */
  @keyframes taxiApproachFromLeftOfTile {
    0% { transform: translate3d(-130%, 0, 0) scale(0.55); opacity: 0.45; }
    100% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
  }
  .anim-taxi-approach-tile-left {
    animation: taxiApproachFromLeftOfTile 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    transform-origin: 80% 100%;
  }
  /* タクシー：エンジン微振動後、画面下へ加速 */
  @keyframes taxiAccelerateDown {
    0% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
    10% { transform: translate3d(-2px, 3px, 0) scale(1.04); }
    18% { transform: translate3d(2px, -2px, 0) scale(1.03); }
    26% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(0, 125vh, 0) scale(0.86); opacity: 0.2; }
  }
  .anim-taxi-accelerate-down {
    animation: taxiAccelerateDown 1.1s cubic-bezier(0.22, 0.1, 0.12, 1) forwards;
    transform-origin: 50% 50%;
  }
  /* 到着タイル：停車 →（駒フェード後）退場（計 1.8s — App.jsx TIMING.arrive と同期） */
  @keyframes taxiArriveParkOnly {
    from { transform: translate3d(-12%, 36%, 0) scale(0.8); opacity: 0; }
    to { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
  }
  @keyframes taxiExitFromPark {
    from { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
    to { transform: translate3d(0, 118vh, 0) scale(0.9); opacity: 0; }
  }
  /* 到着：内側＝停車、外側＝退場（transform を分離して競合回避） */
  .anim-taxi-arrive-park-inner {
    animation: taxiArriveParkOnly 0.4s cubic-bezier(0.33, 0.12, 0.24, 1) forwards;
    transform-origin: 80% 100%;
  }
  .anim-taxi-arrive-exit-wrapper {
    animation: taxiExitFromPark 0.9s cubic-bezier(0.22, 0.1, 0.12, 1) 0.9s forwards;
    transform-origin: 80% 100%;
  }
  /* タイル左：上からタクシーが降りてくる（乗車.enter） */
  @keyframes taxiFromAboveLeftOfTile {
    0% {
      transform: translate3d(0, -115%, 0) scale(0.68);
      opacity: 0;
    }
    35% {
      opacity: 1;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
  }
  .anim-taxi-from-above-left-of-tile {
    animation: taxiFromAboveLeftOfTile 0.82s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    transform-origin: 70% 100%;
  }
  /* enter 終了後・boarding：進入キーフレームの最終フレームを固定 */
  .taxi-approach-parked {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
    transform-origin: 70% 100%;
  }
  /* キャラ：タクシー方向（左）へ寄りながらフェード（乗車.boarding） */
  @keyframes taxiCharBoardIntoCab {
    from {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
    to {
      transform: translate3d(-38px, -14px, 0) scale(0.88);
      opacity: 0;
    }
  }
  .taxi-boarding-char-to-cab {
    animation: taxiCharBoardIntoCab 0.4s ease-in 0.08s forwards;
  }
  /* 駒：搭乗時フェードのみ */
  @keyframes taxiPieceBoardingFade {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  .taxi-piece-boarding-fade .taxi-piece-boarding-fade-target {
    animation: taxiPieceBoardingFade 0.5s ease-out forwards;
  }
  /* 駒：到着タイルで不透明化（停車 0.4s 後から 0.55s、やや長めに判読しやすく） */
  @keyframes taxiPieceArriveFadeIn {
    from { opacity: 0; transform: translate3d(0, 6px, 0) scale(0.96); }
    to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  }
  .taxi-piece-arrive-fadein .taxi-piece-arrive-fadein-target {
    opacity: 0;
    animation: taxiPieceArriveFadeIn 0.55s ease-out 0.42s forwards;
  }
  @keyframes taxiStutter {
    0% { transform: translate3d(0, 0, 0); }
    12% { transform: translate3d(-3px, 0, 0); }
    24% { transform: translate3d(2px, 1px, 0); }
    35% { transform: translate3d(0, 0, 0); }
    48% { transform: translate3d(-4px, -1px, 0); }
    60% { transform: translate3d(3px, 0, 0); }
    72% { transform: translate3d(-2px, 0, 0); }
    85% { transform: translate3d(1px, 0, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
  .anim-taxi-stutter {
    animation: taxiStutter 0.85s ease-in-out infinite;
    will-change: transform;
  }
  @keyframes pulseRideshare {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.04); opacity: 0.92; }
  }
  .anim-pulse-taxi-ride {
    animation: pulseRideshare 1.2s ease-in-out infinite;
  }
  .anim-fadein  { animation: fadeIn      0.5s  ease-out forwards; }
  .anim-tick    { animation: countTick   0.35s ease-out; }
  .taxi-dark    { background: rgba(0,0,0,0.88); }

  /* ── ダイス確定ポップ ── */
  @keyframes dicePop {
    0%   { transform: scale(1.5); }
    50%  { transform: scale(0.92); }
    100% { transform: scale(1); }
  }
  .anim-dice-pop { animation: dicePop 0.35s cubic-bezier(0.36,0.07,0.19,0.97) both; }

  /* ── 運80以上 ゴールデングロー ── */
  @keyframes goldenGlow {
    0%,100% { filter: drop-shadow(0 0 5px #fbbf24) drop-shadow(0 0 14px rgba(251,191,36,0.65)) drop-shadow(0 4px 8px rgba(0,0,0,0.9)); }
    50%     { filter: drop-shadow(0 0 10px #fde68a) drop-shadow(0 0 24px rgba(251,191,36,0.95)) drop-shadow(0 4px 8px rgba(0,0,0,0.9)); }
  }
  @keyframes sparkle {
    0%,100% { opacity: 0; transform: scale(0.2) rotate(0deg); }
    45%,55% { opacity: 1; transform: scale(1.3) rotate(180deg); }
  }
  .anim-golden-glow { animation: goldenGlow 1.2s ease-in-out infinite; }
  .anim-sparkle-0 { animation: sparkle 1.8s ease-in-out 0.0s infinite; }
  .anim-sparkle-1 { animation: sparkle 1.8s ease-in-out 0.45s infinite; }
  .anim-sparkle-2 { animation: sparkle 1.8s ease-in-out 0.9s infinite; }
  .anim-sparkle-3 { animation: sparkle 1.8s ease-in-out 1.35s infinite; }

  /* ── 神社カットイン ── */
  @keyframes shrineReveal {
    0%   { opacity: 0; transform: scale(0.4) translateY(40px); }
    60%  { opacity: 1; transform: scale(1.08) translateY(0); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes shrineFade {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(1.5) translateY(-20px); }
  }
  .anim-shrine-in  { animation: shrineReveal 0.75s ease-out forwards; }
  .anim-shrine-out { animation: shrineFade   0.9s  ease-out forwards; }

  /* ── 配信 PON 発火・炎のベール ── */
  @keyframes streamPonBurnVeil {
    0%, 100% { opacity: 0.9; filter: hue-rotate(-6deg); }
    33%      { opacity: 1;   filter: hue-rotate(10deg); }
    66%      { opacity: 0.85; filter: hue-rotate(-14deg); }
  }
  @keyframes streamPonFlameLoom {
    0%, 100% { transform: translateY(6%) scale(1.04, 0.98); opacity: 0.55; }
    50%      { transform: translateY(-4%) scale(1.14, 1.1); opacity: 0.9; }
  }
  @keyframes streamPonTextPulse {
    0%, 100% { filter: brightness(1); }
    50%      { filter: brightness(1.18); }
  }
  .anim-stream-pon-burn-veil { animation: streamPonBurnVeil 0.3s ease-in-out infinite, fadeIn 0.4s ease-out forwards; }
  .anim-stream-pon-flame    { animation: streamPonFlameLoom 0.45s ease-in-out infinite alternate; }
  .anim-stream-pon-text     { animation: streamPonTextPulse 0.35s ease-in-out infinite; }

  /* ── 配信タイプカットイン（雑談／ゲーム）スピード感 ── */
  @keyframes streamCutinVignette {
    0% { opacity: 0; backdrop-filter: blur(0); }
    8% { opacity: 1; backdrop-filter: blur(2px); }
    88% { opacity: 1; backdrop-filter: blur(2px); }
    100% { opacity: 0; backdrop-filter: blur(0); }
  }
  @keyframes streamCutinSweep {
    0% { transform: translateX(-130%) skewX(-12deg); opacity: 0; }
    18% { opacity: 1; }
    100% { transform: translateX(130%) skewX(-5deg); opacity: 0; }
  }
  @keyframes streamCutinImgPop {
    0% {
      opacity: 0;
      transform: scale(2.05) translate3d(16%, -4%, 0) rotate(-3deg);
      filter: blur(10px);
    }
    28% {
      opacity: 1;
      transform: scale(0.94) translate3d(-1%, 0, 0) rotate(0.6deg);
      filter: blur(0);
    }
    52% {
      transform: scale(1.04) translate3d(0.5%, 0, 0) rotate(-0.3deg);
      filter: blur(0);
    }
    100% {
      opacity: 1;
      transform: scale(1) translate3d(0, 0, 0) rotate(0deg);
      filter: blur(0);
    }
  }
  @keyframes streamCutinImgBurst {
    0% {
      opacity: 0;
      clip-path: inset(0 100% 0 0);
    }
    10% {
      opacity: 1;
      clip-path: inset(0 0 0 0);
    }
    78% {
      opacity: 1;
      clip-path: inset(0 0 0 0);
    }
    100% {
      opacity: 0;
      clip-path: inset(0 0 100% 0);
    }
  }
  @keyframes streamCutinRingPulse {
    0%,100% {
      opacity: 0.35;
      transform: scale(0.94);
      box-shadow:
        0 0 0 0 rgba(34, 211, 238, 0.45),
        0 0 60px rgba(56, 189, 248, 0.25);
    }
    40% {
      opacity: 0.95;
      transform: scale(1.02);
      box-shadow:
        0 0 0 4px rgba(34, 211, 238, 0.35),
        0 0 80px rgba(96, 165, 250, 0.45),
        inset 0 0 40px rgba(255,255,255,0.06);
    }
  }
  @keyframes streamCutinSpeedHue {
    0% { filter: hue-rotate(0deg) saturate(1.05); }
    50% { filter: hue-rotate(-8deg) saturate(1.12); }
    100% { filter: hue-rotate(6deg) saturate(1.08); }
  }
  .anim-stream-cutin-veil {
    animation: streamCutinVignette 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .anim-stream-cutin-sweep {
    animation: streamCutinSweep 0.62s cubic-bezier(0.2, 0.85, 0.36, 1) forwards;
  }
  .anim-stream-cutin-img-wrap {
    animation: streamCutinImgBurst 2s cubic-bezier(0.2, 0.9, 0.36, 1) forwards,
               streamCutinSpeedHue 0.75s linear infinite alternate;
  }
  .anim-stream-cutin-img {
    animation: streamCutinImgPop 0.62s cubic-bezier(0.12, 0.85, 0.22, 1) both;
  }
  .anim-stream-cutin-ring {
    animation: streamCutinRingPulse 0.5s cubic-bezier(0.25, 0.9, 0.38, 1) 0.06s 6 alternate;
  }
  @keyframes streamCutinLinesShift {
    from { transform: translate3d(28px, -4px, 0); }
    to { transform: translate3d(-40px, 10px, 0); }
  }
  .anim-stream-cutin-lines {
    animation: streamCutinLinesShift 0.145s linear infinite;
    background: repeating-linear-gradient(
      -22deg,
      transparent 0,
      transparent 22px,
      rgba(255,255,255,0.11) 22px,
      rgba(255,255,255,0.11) 25px
    );
    pointer-events: none;
    position: absolute;
    inset: -8%;
  }

  /* ── 幸運のダイスフラッシュ ── */
  @keyframes luckyPop {
    0%   { opacity: 0; transform: scale(0.4) translateY(20px); }
    20%  { opacity: 1; transform: scale(1.2) translateY(0); }
    75%  { opacity: 1; transform: scale(1)   translateY(0); }
    100% { opacity: 0; transform: scale(0.8) translateY(-15px); }
  }
  .anim-lucky-pop { animation: luckyPop 1.8s ease-out forwards; }

  /* ── スロット熟成エフェクト ── */
  @keyframes heatPulse {
    0%,100% { box-shadow: 0 0 10px rgba(239,68,68,0.55), 0 0 22px rgba(239,68,68,0.3), inset 0 0 8px rgba(239,68,68,0.15); }
    50%     { box-shadow: 0 0 20px rgba(239,68,68,0.85), 0 0 40px rgba(239,68,68,0.55), inset 0 0 14px rgba(239,68,68,0.25); }
  }
  @keyframes heatWarm {
    0%,100% { box-shadow: 0 0 8px rgba(251,146,60,0.4), 0 0 16px rgba(251,146,60,0.2); }
    50%     { box-shadow: 0 0 14px rgba(251,146,60,0.7), 0 0 28px rgba(251,146,60,0.4); }
  }
  @keyframes sparkFly {
    0%   { opacity: 1; transform: translate(0,0) scale(1); }
    100% { opacity: 0; transform: translate(var(--sx),var(--sy)) scale(0.3); }
  }
  .anim-heat-burning { animation: heatPulse 1.1s ease-in-out infinite; border-color: rgba(239,68,68,0.8) !important; }
  .anim-heat-warm    { animation: heatWarm  1.4s ease-in-out infinite; }
  .anim-spark        { animation: sparkFly 0.8s ease-out forwards; }

  /* ── SSランクパーティクル ── */
  @keyframes particleFall {
    from { transform: translateY(-60px) rotate(0deg);   opacity: 1; }
    to   { transform: translateY(110vh) rotate(540deg); opacity: 0.2; }
  }
  .anim-particle { animation: particleFall linear infinite; }

  /* ── スロット豪華演出 ── */
  @keyframes reelBounce {
    0%   { transform: translateY(0) scaleY(1); }
    25%  { transform: translateY(10px) scaleY(0.92); }
    55%  { transform: translateY(-5px) scaleY(1.04); }
    75%  { transform: translateY(2px) scaleY(0.98); }
    100% { transform: translateY(0) scaleY(1); }
  }
  @keyframes reachGlow {
    0%,100% { box-shadow: 0 0 14px rgba(239,68,68,0.75), 0 0 32px rgba(239,68,68,0.45); border-color: rgba(239,68,68,0.95) !important; }
    50%     { box-shadow: 0 0 28px rgba(248,113,113,1.0), 0 0 64px rgba(239,68,68,0.7); border-color: rgba(252,165,165,1.0) !important; }
  }
  /* ── スロット ステータスオーラ（screen blend・ネオン背景と馴染ませる） ── */
  @keyframes auraLuckSoft {
    0%,100% { opacity: 0.75; filter: blur(0px); }
    50%     { opacity: 1;    filter: blur(0.5px); }
  }
  @keyframes auraLuckGold {
    0%,100% { opacity: 0.88; transform: scale(1); }
    50%     { opacity: 1;    transform: scale(1.02); }
  }
  @keyframes auraLuckEpic {
    0%,100% { opacity: 0.8; transform: rotate(0deg) scale(1); }
    12%     { opacity: 1;   transform: rotate(3deg) scale(1.04); }
    25%     { opacity: 0.85; transform: rotate(-3deg) scale(1.01); }
    50%     { opacity: 1;   transform: rotate(2deg) scale(1.05); }
    75%     { opacity: 0.9; transform: rotate(-2deg) scale(1.02); }
  }
  @keyframes auraSkillSoft {
    0%,100% { opacity: 0.7; }
    50%     { opacity: 0.95; }
  }
  @keyframes auraSkillStrong {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.16), inset 0 0 18px rgba(34,197,94,0.06); }
    50%     { box-shadow: 0 0 16px 2px rgba(34,197,94,0.25), inset 0 0 26px rgba(34,197,94,0.09); }
  }
  @keyframes auraComboGold {
    0%,100% { opacity: 0.45; }
    50%     { opacity: 0.92; }
  }
  @keyframes auraComboGreen {
    0%,100% { opacity: 0.92; }
    50%     { opacity: 0.45; }
  }
  @keyframes auraSparkFloat {
    0%   { transform: translate(0,0) scale(0.5); opacity: 0; }
    25%  { opacity: 0.75; }
    100% { transform: translate(var(--dx), var(--dy)) scale(1.1); opacity: 0; }
  }
  .anim-luck-soft   { animation: auraLuckSoft 1.8s ease-in-out infinite; }
  .anim-luck-gold   { animation: auraLuckGold 1.2s ease-in-out infinite; }
  .anim-luck-epic   { animation: auraLuckEpic 0.42s ease-in-out infinite; }
  .anim-skill-soft  { animation: auraSkillSoft 2.1s ease-in-out infinite; }
  .anim-skill-strong{ animation: auraSkillStrong 1.5s ease-in-out infinite; }
  .anim-combo-gold  { animation: auraComboGold 1.1s ease-in-out infinite; }
  .anim-combo-green { animation: auraComboGreen 1.1s ease-in-out infinite; }
  /* ── スロット 払い戻し額ポップ ── */
  @keyframes slotPayoutPopup {
    0% {
      opacity: 1;
      transform: translateY(0) scale(0);
    }
    12.28% {
      opacity: 1;
      transform: translateY(0) scale(1.2);
    }
    14.04% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    82.46% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px) scale(1);
    }
  }
  .anim-slot-payout-popup {
    animation: slotPayoutPopup 2.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    will-change: transform, opacity;
  }
  @keyframes slotVictimFramePulse {
    0%, 100% {
      box-shadow:
        inset 0 0 0 2px rgba(239, 68, 68, 0.35),
        0 0 0 0 rgba(239, 68, 68, 0.08);
    }
    50% {
      box-shadow:
        inset 0 0 0 5px rgba(239, 68, 68, 0.82),
        0 0 28px 4px rgba(239, 68, 68, 0.28);
    }
  }
  .anim-slot-victim-frame {
    animation: slotVictimFramePulse 1.05s ease-in-out infinite;
    border: 1px solid rgba(239, 68, 68, 0.25);
  }
  @keyframes slotVictimAlertBlink {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.78; transform: scale(0.985); }
  }
  .anim-slot-victim-alert {
    animation: slotVictimAlertBlink 0.9s ease-in-out infinite;
  }
  @keyframes progressivePotPulse {
    0%, 100% { transform: translateX(-50%) scale(1); filter: brightness(1); }
    35% { transform: translateX(-50%) scale(1.08); filter: brightness(1.25); }
    70% { transform: translateX(-50%) scale(1.02); filter: brightness(1.1); }
  }
  .anim-progressive-pot-pulse {
    animation: progressivePotPulse 0.85s ease-out;
  }
  @keyframes slotGoldPayoutCenter {
    0% {
      opacity: 0;
      transform: scale(0.72);
      filter: brightness(1);
    }
    18% {
      opacity: 1;
      transform: scale(1.1);
      filter: brightness(1.35) drop-shadow(0 0 28px rgba(251, 191, 36, 0.85));
    }
    32%,
    100% {
      opacity: 1;
      transform: scale(1);
      filter: brightness(1.08) drop-shadow(0 0 18px rgba(250, 204, 21, 0.55));
    }
  }
  .anim-slot-gold-payout-center {
    animation: slotGoldPayoutCenter 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    will-change: transform, opacity, filter;
  }

  @keyframes coinDrop {
    0%   { transform: translateY(-50px) rotate(0deg) scale(1); opacity: 1; }
    100% { transform: translateY(105vh) rotate(720deg) scale(0.4); opacity: 0; }
  }
  @keyframes rainbowShift {
    0%   { filter: hue-rotate(0deg) brightness(1.2); }
    50%  { filter: hue-rotate(180deg) brightness(1.5); }
    100% { filter: hue-rotate(360deg) brightness(1.2); }
  }
  @keyframes jpFlash {
    0%,100% { background: rgba(251,191,36,0.15); box-shadow: 0 0 40px rgba(251,191,36,0.5); }
    25%     { background: rgba(167,139,250,0.15); box-shadow: 0 0 60px rgba(167,139,250,0.6); }
    50%     { background: rgba(52,211,153,0.15);  box-shadow: 0 0 60px rgba(52,211,153,0.6); }
    75%     { background: rgba(251,113,133,0.15); box-shadow: 0 0 60px rgba(251,113,133,0.6); }
  }
  @keyframes charBounce {
    0%,100% { transform: translateY(0) scale(1); }
    30%     { transform: translateY(-14px) scale(1.12); }
    60%     { transform: translateY(-6px) scale(1.06); }
  }
  @keyframes charPray {
    0%,100% { transform: rotate(0deg) scale(1); }
    30%     { transform: rotate(-7deg) scale(0.94); }
    70%     { transform: rotate(7deg) scale(0.94); }
  }
  @keyframes charWobble {
    0%,100% { transform: rotate(-4deg); }
    50%     { transform: rotate(4deg); }
  }
  @keyframes charSad {
    0%,100% { transform: translateY(0) rotate(0deg); opacity: 1; }
    50%     { transform: translateY(4px) rotate(-5deg); opacity: 0.7; }
  }
  .anim-reel-bounce { animation: reelBounce 0.42s cubic-bezier(0.36,0.07,0.19,0.97); }
  .anim-reach-glow  { animation: reachGlow 0.65s ease-in-out infinite; }
  .anim-jp-rainbow  { animation: jpFlash 0.5s ease-in-out infinite, rainbowShift 1s linear infinite; }
  .anim-char-bounce { animation: charBounce 0.55s ease-out infinite; }
  .anim-char-pray   { animation: charPray 0.7s ease-in-out infinite; }
  .anim-char-wobble { animation: charWobble 0.18s ease-in-out infinite; }
  .anim-char-sad    { animation: charSad 1.2s ease-in-out infinite; }
  @keyframes coldSpark {
    0%   { transform: translateY(0) scale(0.5); opacity: 0; }
    12%  { opacity: 0.9; }
    100% { transform: translateY(-85vh) scale(1.1); opacity: 0; }
  }
  .anim-cold-spark { animation-name: coldSpark; animation-timing-function: linear; animation-iteration-count: infinite; }

  /* ── 「決戦の日」炎・熱気オーバーレイ ── */
  @keyframes fbHeatPulse {
    0%,100% { opacity: 0.55; filter: brightness(1); }
    50%     { opacity: 0.88; filter: brightness(1.12); }
  }
  @keyframes fbHeatExpand {
    0%   { transform: scale(0.35); opacity: 0.95; }
    100% { transform: scale(1.65); opacity: 0.05; }
  }
  @keyframes fbShakeImpact {
    0%   { transform: translate(0,0) rotate(0deg); }
    10%  { transform: translate(-10px, 6px) rotate(-1deg); }
    22%  { transform: translate(12px, -5px) rotate(0.8deg); }
    35%  { transform: translate(-6px, 4px) rotate(-0.4deg); }
    50%,100% { transform: translate(0,0) rotate(0deg); }
  }
  @keyframes fbFlameRise {
    0%,100% { transform: translateY(0) scaleY(1) skewX(0deg); opacity: 0.85; }
    25%     { transform: translateY(-3%) scaleY(1.08) skewX(2deg); opacity: 1; }
    60%     { transform: translateY(2%) scaleY(0.96) skewX(-1.5deg); opacity: 0.9; }
  }
  @keyframes fbEmberRise {
    0%   { transform: translateY(0) scale(1); opacity: 0; }
    10%  { opacity: 0.95; }
    100% { transform: translateY(-132px) scale(0.2); opacity: 0; }
  }
  .anim-fb-heat-bg {
    pointer-events: none;
    background:
      radial-gradient(ellipse 90% 70% at 50% 48%, rgba(248,113,113,0.5) 0%, rgba(185,28,28,0.22) 45%, transparent 68%),
      radial-gradient(ellipse 120% 90% at 50% 108%, rgba(153,27,27,0.45) 0%, rgba(69,10,10,0.2) 50%, transparent 62%),
      radial-gradient(ellipse 55% 45% at 50% 50%, rgba(220,38,38,0.35) 0%, transparent 70%);
    animation: fbHeatPulse 0.85s ease-in-out infinite;
  }
  .anim-fb-heat-wave {
    position: absolute;
    pointer-events: none;
    inset: -5%;
    background: radial-gradient(ellipse closest-side at 50% 50%, rgba(254,202,202,0.55) 0%, rgba(220,38,38,0.18) 50%, transparent 72%);
    animation: fbHeatExpand 2s ease-out 1 forwards;
  }
  .anim-fb-shake-once {
    animation: fbShakeImpact 0.52s cubic-bezier(0.36, 0.02, 0.16, 0.97) both;
  }
  .anim-fb-flame-sheet {
    filter: blur(14px);
    opacity: 0.9;
    animation: fbFlameRise 0.42s ease-in-out infinite;
  }
  .anim-fb-flame-sheet-delay {
    animation-delay: -0.18s;
    opacity: 0.72;
    filter: blur(20px);
  }
  .anim-fb-ember-dot {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 9999px;
    background: radial-gradient(circle at 30% 30%, #fff7ed, #fb923c 45%, #dc2626 75%, transparent);
    box-shadow: 0 0 8px rgba(251,146,60,0.95), 0 0 2px rgba(127,29,29,0.9);
    animation: fbEmberRise var(--dur, 1.1s) ease-out infinite;
    animation-delay: var(--delay, 0s);
    pointer-events: none;
  }

  /* 「決戦の日」見出し：黒塗りベタ */

  .fb-decisive-title {
    font-family: "Yuji Syuku", "Noto Sans JP", sans-serif;
    font-weight: 900;
    line-height: 1.06;
    letter-spacing: 0.04em;
    position: relative;
    z-index: 2;
    color: #000000;
    -webkit-text-fill-color: #000000;
    font-size: clamp(3rem, 13vw, 6rem);
  }

  @keyframes ponBurst {
    0%   { transform: scale(0.45) rotate(-6deg); opacity: 0; filter: blur(12px); }
    28%  { transform: scale(1.12) rotate(2deg); opacity: 1; filter: blur(0); }
    55%  { transform: scale(1) rotate(0deg); }
    100% { transform: scale(1.02); opacity: 1; }
  }
  @keyframes ponBurstImpact {
    0%   { transform: scale(0.35) rotate(-10deg); opacity: 0; filter: blur(16px) brightness(2); }
    22%  { transform: scale(1.22) rotate(4deg); opacity: 1; filter: blur(0) brightness(1.25); }
    45%  { transform: scale(0.96) rotate(-2deg); filter: brightness(1.1); }
    70%  { transform: scale(1.06) rotate(1deg); }
    100% { transform: scale(1.03) rotate(0deg); opacity: 1; filter: brightness(1); }
  }
  @keyframes ponSpark {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.08); }
  }
  @keyframes ponSparkImpact {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.22); }
  }
  .anim-pon-burst {
    animation: ponBurst 0.55s cubic-bezier(0.34, 1.45, 0.64, 1) both;
  }
  .anim-pon-burst-impact {
    animation: ponBurstImpact 0.72s cubic-bezier(0.34, 1.55, 0.52, 1) both;
  }
  .anim-pon-spark {
    animation: ponSpark 0.45s ease-in-out infinite;
  }
  .anim-pon-spark-impact {
    animation: ponSparkImpact 0.38s ease-in-out infinite;
  }

  /* PONカットイン：第1相シェイク（強め・0.6s向け） */
  @keyframes ponCutinShake {
    0%, 100% { transform: translate(0, 0); }
    8%  { transform: translate(-5px, -14px) rotate(-0.8deg); }
    16% { transform: translate(6px, 12px) rotate(0.9deg); }
    24% { transform: translate(-6px, 10px) rotate(-0.6deg); }
    32% { transform: translate(5px, -11px) rotate(0.7deg); }
    40% { transform: translate(-4px, -9px) rotate(-0.5deg); }
    48% { transform: translate(5px, 8px) rotate(0.5deg); }
    56% { transform: translate(-5px, 6px); }
    64% { transform: translate(4px, -7px); }
    72% { transform: translate(-3px, 5px); }
    80% { transform: translate(3px, -4px); }
    88% { transform: translate(-2px, 3px); }
    96% { transform: translate(1px, -2px); }
  }
  .anim-pon-cutin-shake {
    animation: ponCutinShake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
  }

  /* Y軸に躓き画像を2回転（720°）させてから転倒画像へ切替 */
  @keyframes ponStumbleSpinY {
    from { transform: rotateY(0deg); }
    to   { transform: rotateY(720deg); }
  }
  .pon-cutin-scene {
    perspective: 1000px;
    perspective-origin: 50% 55%;
  }
  .pon-cutin-spin-host {
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    will-change: transform;
  }
  .anim-pon-stumble-spin {
    animation: ponStumbleSpinY var(--pon-spin-duration, 1.6s) cubic-bezier(0.42, 0.02, 0.28, 1) forwards;
  }

  /* ═══════════════════════════════════════════════════════════════════════
   * Reach チャンスカットイン（パチスロ級・全画面）— SlotMachine.jsx
   * 画像パスは常に chance_rrm.png（小文字 .png）
   * ═══════════════════════════════════════════════════════════════════════ */
  @keyframes slotReachMachineShakeHeavy {
    0%,100% { transform: translate3d(0,0,0) rotate(0deg); }
    8% { transform: translate3d(-10px,-7px,0) rotate(-1deg); }
    16%{ transform: translate3d(9px,9px,0) rotate(0.9deg); }
    24%{ transform: translate3d(-7px,8px,0) rotate(-0.7deg); }
    32%{ transform: translate3d(8px,-8px,0) rotate(0.8deg); }
    40%{ transform: translate3d(-6px,-7px,0) rotate(-0.5deg); }
    48%{ transform: translate3d(7px,6px,0) rotate(0.45deg); }
    56%{ transform: translate3d(-5px,5px,0) rotate(-0.35deg); }
    64%{ transform: translate3d(5px,-5px,0) rotate(0.3deg); }
    72%{ transform: translate3d(-4px,4px,0) rotate(-0.25deg); }
    80%{ transform: translate3d(4px,-3px,0) rotate(0.2deg); }
    88%{ transform: translate3d(-3px,2px,0); }
    96%{ transform: translate3d(2px,-1px,0); }
  }
  .anim-slot-reach-machine-shake {
    animation: slotReachMachineShakeHeavy 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
    will-change: transform;
  }

  @keyframes slotReachCutinWhiteBurst {
    0% { opacity: 0; }
    20% { opacity: 1; }
    100%{ opacity: 0; }
  }
  .anim-slot-reach-cutin-white-flash {
    background: rgba(255,252,248,1);
    animation: slotReachCutinWhiteBurst 0.1s linear forwards;
    will-change: opacity;
  }

  @keyframes slotReachCutinRevealPop {
    0% { opacity: 0; transform: scale(0.92); filter: brightness(2); }
    58%{ opacity: 1; transform: scale(1.02); filter: brightness(1.05); }
    100%{ opacity: 1; transform: scale(1); filter: brightness(1); }
  }

  @keyframes slotReachCutinSpeedDrift {
    0%{ transform: translate(-50%,-50%) rotate(0deg) scale(1.12); }
    100%{ transform: translate(-50%,-50%) rotate(6deg) scale(1.2); }
  }

  @keyframes slotReachNeonPulse {
    0%,100%{
      filter: brightness(1.05) drop-shadow(0 0 14px rgba(255,20,147,0.95)) drop-shadow(0 0 28px rgba(244,114,182,0.75));
      opacity: 0.95;
    }
    50%{
      filter: brightness(1.25) drop-shadow(0 0 22px rgba(253,164,238,1)) drop-shadow(0 0 40px rgba(236,72,153,0.9));
      opacity: 1;
    }
  }

  /* 全画面ルート（z-index は SlotMachine 内カットイン専用） */
  .slot-reach-cutin-full {
    position: fixed;
    inset: 0;
    z-index: 10050;
    pointer-events: none;
    isolation: isolate;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    contain: layout style paint;
  }

  /* 集中線レイヤー */
  .slot-reach-cutin-full-speed {
    position: absolute;
    width: 160vmax;
    height: 160vmax;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    opacity: 0.88;
    background: repeating-conic-gradient(
      from 12deg at 50% 50%,
      transparent 0deg 3.8deg,
      rgba(255,255,255,0.06) 3.8deg 4.4deg,
      transparent 4.4deg 9deg,
      rgba(251,182,226,0.16) 9deg 9.9deg,
      transparent 9.9deg 15deg,
      transparent 360deg
    );
    animation: slotReachCutinSpeedDrift 2.8s linear infinite alternate;
    mix-blend-mode: screen;
  }

  .slot-reach-cutin-full-speed::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-conic-gradient(
      from -20deg at 50% 50%,
      transparent 0deg 5deg,
      rgba(255,255,255,0.055) 5deg 5.6deg,
      transparent 5.6deg 14deg,
      rgba(244,114,182,0.12) 14deg 14.8deg,
      transparent 14.8deg 360deg
    );
    animation: slotReachCutinSpeedDrift 3.4s linear infinite alternate-reverse;
    mix-blend-mode: overlay;
  }

  .slot-reach-cutin-full-vignette {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 90% 70% at 50% 42%, transparent 46%, rgba(2,6,23,0.88) 100%),
      linear-gradient(to bottom, rgba(2,6,23,0.35) 0%, transparent 18%, transparent 82%, rgba(2,6,23,0.45) 100%);
    pointer-events: none;
    z-index: 1;
  }

  /* 画面上端〜下端の太いピンク斜めバンド */
  .slot-reach-cutin-full-scan {
    position: absolute;
    left: -8%;
    right: -8%;
    height: 14vmin;
    z-index: 2;
    transform: skewY(-11deg);
    background: linear-gradient(
      90deg,
      rgba(131,24,67,0) 0%,
      rgba(236,72,153,0.75) 18%,
      rgba(253,164,238,1) 50%,
      rgba(236,72,153,0.75) 82%,
      rgba(131,24,67,0) 100%
    );
    box-shadow:
      0 0 32px rgba(255,20,147,0.85),
      0 0 80px rgba(244,114,182,0.55),
      inset 0 0 24px rgba(255,255,255,0.35);
    animation: slotReachNeonPulse 0.55s ease-in-out infinite;
    pointer-events: none;
  }
  .slot-reach-cutin-full-scan--top { top: 5%; }
  .slot-reach-cutin-full-scan--bottom {
    bottom: 6%;
    transform: skewY(11deg);
    background: linear-gradient(
      90deg,
      rgba(131,24,67,0) 0%,
      rgba(219,39,119,0.78) 18%,
      rgba(251,207,232,1) 50%,
      rgba(219,39,119,0.78) 82%,
      rgba(131,24,67,0) 100%
    );
  }

  .slot-reach-cutin-full-dim {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: rgba(2,6,23,0.72);
    pointer-events: none;
  }

  /* 画面周辺のネオンピンク枠 */
  .slot-reach-cutin-full-frame {
    position: absolute;
    inset: 2.5%;
    border-radius: 16px;
    border: 4px solid rgba(251,113,180,0.82);
    box-shadow:
      inset 0 0 40px rgba(236,72,153,0.35),
      0 0 28px rgba(244,114,182,0.65),
      0 0 120px rgba(236,72,153,0.35);
    z-index: 3;
    pointer-events: none;
    animation: slotReachNeonPulse 0.62s ease-in-out infinite;
  }

  .slot-reach-cutin-full-center {
    position: relative;
    z-index: 4;
    width: min(96vw, 1040px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: min(7vw, 2.5rem) min(4vw, 1.25rem);
  }

  .slot-reach-cutin-hero {
    position: relative;
    width: 100%;
    max-width: 840px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .slot-reach-cutin-hero-bar {
    width: calc(100% + 48px);
    max-width: none;
    height: clamp(10px, 2.8vmin, 18px);
    margin-left: auto;
    margin-right: auto;
    border-radius: 6px;
    transform: skewX(-18deg);
    background: linear-gradient(
      90deg,
      rgba(253,242,248,0) 0%,
      rgba(244,114,182,1) 22%,
      rgba(255,255,255,0.95) 48%,
      rgba(236,72,153,1) 78%,
      rgba(253,242,248,0) 100%
    );
    box-shadow:
      0 0 26px rgba(255,105,180,1),
      0 0 48px rgba(236,72,153,0.55),
      0 0 4px rgba(255,255,255,0.9);
    animation: slotReachNeonPulse 0.52s ease-in-out infinite alternate;
    pointer-events: none;
    z-index: 2;
  }
  .slot-reach-cutin-hero-bar--bottom {
    transform: skewX(18deg);
    margin-top: -2px;
  }

  .slot-reach-cutin-hero img {
    display: block;
    width: 100%;
    height: auto;
    max-height: min(62vh, 1040px);
    object-fit: contain;
    filter: drop-shadow(0 0 20px rgba(244,114,182,0.75)) drop-shadow(0 8px 32px rgba(0,0,0,0.75));
    animation: slotReachCutinRevealPop 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
    position: relative;
    z-index: 1;
  }

  .slot-reach-cutin-full-chance-tag {
    position: relative;
    z-index: 5;
    margin-top: clamp(0.75rem, 3vw, 1.35rem);
    font-size: clamp(1.15rem, 4.8vw, 1.85rem);
    font-weight: 900;
    letter-spacing: 0.26em;
    text-indent: 0.26em;
    color: #fdf4ff;
    text-shadow:
      0 0 12px #db2777,
      0 0 28px rgba(236,72,153,1),
      0 2px 0 #831843;
    pointer-events: none;
    animation: slotReachCutinRevealPop 0.5s 0.05s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* ── ガセ（カットイン後ハズレ） ── */
  @keyframes slotReachCutinGaseFrame {
    0% {
      opacity: 1;
      border-color: rgba(251,113,180,0.82);
      filter: grayscale(0);
      box-shadow:
        inset 0 0 40px rgba(236,72,153,0.35),
        0 0 28px rgba(244,114,182,0.65),
        0 0 120px rgba(236,72,153,0.35);
    }
    45% {
      border-color: rgba(148,163,184,0.75);
      filter: grayscale(0.7) brightness(0.88);
      box-shadow:
        inset 0 0 28px rgba(71,85,105,0.4),
        0 0 20px rgba(100,116,139,0.45);
    }
    100% {
      opacity: 0;
      border-color: transparent;
      filter: grayscale(1) brightness(0.5);
      box-shadow: none;
    }
  }

  @keyframes slotReachCutinGaseShatterGlow {
    0% { opacity: 0.72; }
    40%{
      opacity: 0.94;
      background:
        repeating-linear-gradient(
          -18deg,
          transparent 0 3px,
          rgba(226,232,240,0.14) 3px 4px,
          transparent 4px 7px,
          transparent 100%
        ),
        rgba(15,23,42,0.68);
    }
    100%{ opacity: 0; background-color: rgba(15,23,42,0.85); }
  }

  @keyframes slotReachCutinGaseImg {
    0% { opacity: 1; filter: drop-shadow(0 0 20px rgba(244,114,182,0.75)) grayscale(0) brightness(1); transform: scale(1); }
    45%{
      opacity: 0.88;
      filter: drop-shadow(0 0 4px rgba(148,163,184,0.4)) grayscale(1) brightness(0.82);
      transform: scale(0.97);
    }
    100%{ opacity: 0; filter: grayscale(1) brightness(0.52); transform: scale(0.9); }
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-full-speed,
  .slot-reach-cutin-full--gase .slot-reach-cutin-full-speed::after {
    animation-play-state: paused !important;
    opacity: 0.22;
    transition: opacity 0.35s ease;
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-full-frame,
  .slot-reach-cutin-full--gase .slot-reach-cutin-full-scan,
  .slot-reach-cutin-full--gase .slot-reach-cutin-hero-bar {
    animation: none !important;
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-full-dim {
    animation: slotReachCutinGaseShatterGlow 0.72s forwards ease-out;
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-full-frame {
    animation: slotReachCutinGaseFrame 0.74s forwards ease-in !important;
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-hero img {
    animation: slotReachCutinGaseImg 0.7s forwards ease-in both !important;
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-full-chance-tag {
    animation: none !important;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* ── タクシー渋滞カットイン（PON のシャープな shake とは別：アイドル振動） ── */
  @keyframes trafficJamIdleShake {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    20%      { transform: translate(0.8px, -1.1px) rotate(-0.04deg); }
    40%      { transform: translate(-1px, 0.6px) rotate(0.05deg); }
    60%      { transform: translate(0.5px, 0.9px) rotate(-0.03deg); }
    80%      { transform: translate(-0.7px, -0.4px) rotate(0.02deg); }
  }
  .anim-traffic-jam-vibrate {
    animation: trafficJamIdleShake 0.26s ease-in-out infinite;
  }
  @keyframes trafficJamNeonFlicker {
    0%, 100% { opacity: 0.92; filter: brightness(1.05) drop-shadow(0 0 14px rgba(251,191,36,0.5)); }
    13%      { opacity: 0.42; filter: brightness(0.72) drop-shadow(0 0 4px rgba(251,191,36,0.18)); }
    19%      { opacity: 0.9; filter: brightness(1.12) drop-shadow(0 0 18px rgba(252,211,77,0.58)); }
    34%      { opacity: 0.52; filter: brightness(0.82); }
    43%      { opacity: 0.96; filter: brightness(1.06) drop-shadow(0 0 12px rgba(251,191,36,0.45)); }
    59%      { opacity: 0.35; filter: brightness(0.68) drop-shadow(0 0 3px rgba(251,191,36,0.12)); }
    68%      { opacity: 0.91; filter: brightness(1.02); }
  }
  .anim-traffic-jam-neon {
    animation: trafficJamNeonFlicker 1.85s ease-in-out infinite;
  }
  @keyframes trafficJamOverlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .anim-traffic-jam-overlay-fade {
    animation: trafficJamOverlayIn 0.38s ease-out both;
  }

  /* ── 手番：メインの現在プレイヤーステータス帯・サイドバー行のオーラ ── */
  @keyframes turnStatusAura {
    0%, 100% {
      box-shadow: 0 0 14px rgba(34, 211, 238, 0.1), inset 0 0 0 1px rgba(34, 211, 238, 0.14);
    }
    50% {
      box-shadow: 0 0 28px rgba(34, 211, 238, 0.28), inset 0 0 0 1px rgba(34, 211, 238, 0.26);
    }
  }
  .anim-turn-status-aura {
    animation: turnStatusAura 2.2s ease-in-out infinite;
  }
  @keyframes turnActiveNameGlow {
    0%, 100% { text-shadow: 0 0 6px rgba(103, 232, 249, 0.2); }
    50%      { text-shadow: 0 0 16px rgba(103, 232, 249, 0.55); }
  }
  .anim-turn-active-name {
    animation: turnActiveNameGlow 2.2s ease-in-out infinite;
  }
  @keyframes turnStatCellGlow {
    0%, 100% { box-shadow: inset 0 0 0 1px rgba(34, 211, 238, 0.08); }
    50%      { box-shadow: inset 0 0 0 1px rgba(34, 211, 238, 0.22), 0 0 10px rgba(34, 211, 238, 0.12); }
  }
  .anim-turn-active-stat-cell {
    animation: turnStatCellGlow 2.2s ease-in-out infinite;
  }
  @keyframes turnRowCardGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
    50%      { box-shadow: 0 0 18px 1px rgba(34, 211, 238, 0.2); }
  }
  .anim-turn-row-halo {
    animation: turnRowCardGlow 2s ease-in-out infinite;
  }

`;
