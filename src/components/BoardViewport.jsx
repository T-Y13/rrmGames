import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SugorokuBoardPiece, TaxiStandeeImage } from "./CharacterPieces";
import SugorokuBackground from "./SugorokuBackground";
import SugorokuTileEffectIcon from "./BoardTile";
import { TILE_EFFECT_KIND } from "../constants/gameBalance";
import { squareDeco, easeInOutCubic, computeTaxiDriveDurationMs } from "../utils/gameLogic";
import { publicAssetUrl } from "../lib/publicAssetUrl";

function TaxiCongestionBadge({ player }) {
  const n = player?.pendingTaxiSteps ?? 0;
  if (n <= 0 || !player) return null;
  return (
    <span
      className="pointer-events-none absolute bottom-full left-1/2 z-[38] mb-0.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-orange-400/90 bg-orange-950/95 px-[5px] py-[2px] text-[9px] font-black leading-none text-orange-100 animate-pulse"
      title={`タクシー渋滞：残り${n}マス`}
    >
      🚗渋滞中…
    </span>
  );
}

/**
 * マス上の駒を taxi.png に差し替えるフェーズ（idle＝taxiPhase が null）。
 * taxiHail（呼び出し〜ダイス中）はキャラのみ。enter/boarding は横並び＋上からタクシー登場〜乗車。arrive は停車タクシー＋キャラフェードイン。
 */
const TAXI_AS_BOARD_PIECE_PHASES = new Set([
  "ride",
  "trafficJam",
  "drive",
  "driveBeforeJam",
  "driveAfterJam",
]);

/** 到着時のみ：横に停車タクシー＋退車アニメ（車体表現は立ち絵と同じ public `/images/` + フォールバック列） */
function TaxiTileDock({ characterType, taxiPhase }) {
  if (!characterType || taxiPhase !== "arrive") return null;

  const passengerInCab = false;

  const shellClass =
    "pointer-events-none relative shrink-0 flex w-[min(216px,56vw)] max-w-[240px] flex-col items-center";

  const carBlock = (
    <div className="relative w-full">
      <TaxiStandeeImage imgClassName="relative z-0 block w-full object-contain opacity-100" />
      {passengerInCab ? (
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-end justify-center pb-[8%]">
          <SugorokuBoardPiece
            characterType={characterType}
            pose="normal"
            imgClassName="max-h-[56px] w-auto max-w-[min(100px,28vw)] object-contain object-bottom"
            spanClassName="text-3xl leading-none"
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={`${shellClass} anim-taxi-arrive-exit-wrapper`}>
      <div className="relative w-full anim-taxi-arrive-park-inner">
        <div className="relative w-full">{carBlock}</div>
      </div>
    </div>
  );
}

/** ゴール立ち絵の表示倍率（タイル一辺に対する外接ボックスの辺の比） */
const GOAL_SLOT_ART_SCALE = 10;
/** ゴール立ち絵の縦オフセット（マス下端基準、px）。正で下へ・負で上へ（マスと重なる） */
const GOAL_SLOT_ART_GAP_BELOW_PX = -100;

/** ゴールマス：public/images/slotRirimu.png。読み込み失敗時は squareDeco のアイコンにフォールバック */
function GoalSlotRirimuImage({ deco, iconPx, tileW }) {
  const [useFallback, setUseFallback] = useState(false);
  const boxPx = tileW * GOAL_SLOT_ART_SCALE;
  if (useFallback) {
    return (
      <span style={{ fontSize: `${iconPx}px` }} className={`leading-none ${deco.text}`}>
        {deco.icon}
      </span>
    );
  }
  return (
    <div
      className="absolute left-1/2 top-full z-[5] pointer-events-none opacity-100"
      style={{
        width: boxPx,
        height: boxPx,
        transform: `translate(-50%, ${GOAL_SLOT_ART_GAP_BELOW_PX}px)`,
      }}
    >
      <img
        src={publicAssetUrl("/images/slotRirimu.png")}
        alt=""
        draggable={false}
        className="h-full w-full object-contain select-none opacity-100"
        onError={() => setUseFallback(true)}
      />
    </div>
  );
}

/** ゴールマス直上：チェッカー帯のゴールライン */
function GoalFinishLine({ tileW }) {
  const w = Math.min(300, Math.max(Math.round(tileW * 1.65), tileW + 36));
  return (
    <div
      className="pointer-events-none mb-1.5 shrink-0 z-[4] mx-auto rounded-md border-2 border-amber-950/50 shadow-[0_0_18px_rgba(250,204,21,0.4)]"
      style={{
        width: w,
        height: 14,
        backgroundImage:
          "repeating-linear-gradient(90deg, #171717 0px, #171717 7px, #fafaf9 7px, #fafaf9 14px)",
      }}
      aria-hidden
    />
  );
}

const HOP_SETTLE_PADDING_MS = 300;
const PLAYER_SYMBOL_COLORS = ["#ef4444", "#3b82f6", "#facc15", "#22c55e"]; // red, blue, yellow, green

/** 道幅に合わせたマス（正方形）の一辺（px） */
const TILE_MIN_W = 52;
const TILE_MAX_W = 72;
/** マス同士の縦すき間（px） */
const ROW_GAP_PX = 12;
/** ビューポート内で駒を置く目標（上寄りの中央＝手前に進行余地を残す） */
const CAMERA_ANCHOR_FRAC = 0.38;

const TRAVEL_EPS = 0.015;

function opaqueTw(cls) {
  if (!cls || typeof cls !== "string") return cls;
  return cls.replace(/\/(\d{2,3})\b/g, "");
}

function playerNameColor(players, playerId) {
  const idx = players.findIndex((p) => p?.id === playerId);
  if (idx < 0) return PLAYER_SYMBOL_COLORS[0];
  return PLAYER_SYMBOL_COLORS[idx % PLAYER_SYMBOL_COLORS.length];
}

/** タイル間の補間オフセット（進行＝画面下＝正の Y） */
function laneOffsetY(smoothPos, dir, tileW, rowGap) {
  const stepY = tileW + rowGap;
  if (dir >= 0) {
    const frac = smoothPos - Math.floor(smoothPos + 1e-9);
    return frac * stepY;
  }
  const frac = Math.ceil(smoothPos - 1e-9) - smoothPos;
  return -frac * stepY;
}

/** 縦ストリップすごろく：スタート〜現在〜先行マスをすべて表示、カメラ追従 */
export default function BoardViewport({
  players,
  viewPos,
  boardGoal,
  isDiceRolling,
  taxiPhase,
  pieceHopping,
  currentPlayer,
  visualTheme = "default",
  tileEffects = null,
  reportHopAnimationComplete = false,
  onHopAnimationComplete,
  /** タクシーが渋滞カットイン後の「のろのろ走行」フェーズか */
  taxiDriveCongested = false,
  /** タクシー drive：ゴールマス（Firestore 反映前の視覚終点） */
  taxiDriveEndPos = null,
  /** 現在の drive 区間の ms（driveBeforeJam / driveAfterJam / drive で App と一致） */
  taxiDriveSegmentMs = null,
  /** 渋滞あり時のワールド中点（補間停止位置） */
  taxiJamMidPos = null,
  taxiDriveDurationMs = 2600,
}) {
  const AHEAD = 6;
  const nightShrine = visualTheme === "nightShrine";

  const [smoothPos, setSmoothPos] = useState(viewPos);
  const [boardMotion, setBoardMotion] = useState({
    forward: true,
    msPerStep: 360,
    fast: false,
  });

  const laneViewportRef = useRef(null);
  const [viewportH, setViewportH] = useState(480);
  const [laneTileW, setLaneTileW] = useState(58);

  const prevPosRef = useRef(viewPos);
  const prevCurrentPlayerIdRef = useRef(currentPlayer?.id ?? null);
  const travelDirRef = useRef(1);
  const rafRef = useRef(null);
  const taxiDriveRafRef = useRef(null);
  const hopTimerRef = useRef(null);
  const [cameraPanOnly, setCameraPanOnly] = useState(false);
  const onHopCompleteRef = useRef(onHopAnimationComplete);
  onHopCompleteRef.current = onHopAnimationComplete;

  useLayoutEffect(() => {
    const el = laneViewportRef.current;
    if (!el) return;
    const measure = () => {
      const h = el.clientHeight || 480;
      const w = el.clientWidth || 360;
      setViewportH(h);
      setLaneTileW(Math.min(TILE_MAX_W, Math.max(TILE_MIN_W, Math.round(w * 0.22))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (viewPos === prevPosRef.current) return;

    if (
      taxiPhase === "drive" ||
      taxiPhase === "driveBeforeJam" ||
      taxiPhase === "driveAfterJam"
    )
      return undefined;

    const from = prevPosRef.current;
    const to = viewPos;
    const diff = to - from;
    const switchedPlayer = prevCurrentPlayerIdRef.current !== (currentPlayer?.id ?? null);
    const taxiSnapPhases =
      taxiPhase === "taxiHail" ||
      taxiPhase === "enter" ||
      taxiPhase === "boarding" ||
      taxiPhase === "ride" ||
      taxiPhase === "trafficJam" ||
      taxiPhase === "arrive";

    if (taxiPhase && taxiSnapPhases) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (hopTimerRef.current) {
        clearTimeout(hopTimerRef.current);
        hopTimerRef.current = null;
      }
      travelDirRef.current = diff >= 0 ? 1 : -1;
      prevPosRef.current = viewPos;
      setSmoothPos(viewPos);
      setBoardMotion({ forward: diff >= 0, msPerStep: 360, fast: false });
      setCameraPanOnly(false);
      prevCurrentPlayerIdRef.current = currentPlayer?.id ?? null;
      return undefined;
    }

    const steps = Math.min(Math.abs(diff), 20);
    const dir = diff > 0 ? 1 : -1;
    travelDirRef.current = dir;

    prevPosRef.current = viewPos;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (hopTimerRef.current) {
      clearTimeout(hopTimerRef.current);
      hopTimerRef.current = null;
    }

    if (steps === 0) {
      setSmoothPos(to);
      return undefined;
    }

    const isBig = Math.abs(diff) > 6;
    const msPerStep = isBig ? 110 : 360;
    const duration = steps * msPerStep;

    setCameraPanOnly(switchedPlayer);
    setBoardMotion({ forward: dir > 0, msPerStep, fast: isBig });

    const t0 = performance.now();

    const tick = (now) => {
      const raw = Math.min(1, Math.max(0, (now - t0) / duration));
      const pos = from + diff * raw;

      setSmoothPos(pos);

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        setSmoothPos(to);
        setCameraPanOnly(false);
        prevCurrentPlayerIdRef.current = currentPlayer?.id ?? null;
        if (reportHopAnimationComplete && steps > 0) {
          hopTimerRef.current = setTimeout(() => {
            onHopCompleteRef.current?.();
          }, HOP_SETTLE_PADDING_MS);
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (hopTimerRef.current) clearTimeout(hopTimerRef.current);
      setCameraPanOnly(false);
    };
  }, [viewPos, reportHopAnimationComplete, taxiPhase, currentPlayer?.id]);

  /** タクシー drive（1区画または分割）：マップを ease-in-out でスクロール */
  useEffect(() => {
    const isDriveLike =
      taxiPhase === "drive" ||
      taxiPhase === "driveBeforeJam" ||
      taxiPhase === "driveAfterJam";
    if (!isDriveLike || taxiDriveEndPos == null) return undefined;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (hopTimerRef.current) {
      clearTimeout(hopTimerRef.current);
      hopTimerRef.current = null;
    }

    const from = prevPosRef.current;
    const to = taxiDriveEndPos;
    const segmentMs = taxiDriveSegmentMs ?? taxiDriveDurationMs;
    const duration =
      segmentMs > 0 ? segmentMs : computeTaxiDriveDurationMs(Math.abs(to - from));

    let target = to;
    if (taxiPhase === "driveBeforeJam" && taxiJamMidPos != null) {
      target = taxiJamMidPos;
    } else if (taxiPhase === "driveAfterJam") {
      target = to;
    }

    travelDirRef.current = to >= from ? 1 : -1;
    const fastSeg =
      taxiPhase === "driveBeforeJam" ||
      ((taxiPhase === "drive" || taxiPhase === "driveAfterJam") && !taxiDriveCongested);
    setBoardMotion({ forward: to >= from, msPerStep: 110, fast: fastSeg });

    if (Math.abs(target - from) < 1e-9) {
      setSmoothPos(target);
      prevPosRef.current = target;
      return undefined;
    }

    setSmoothPos(from);

    const t0 = performance.now();

    const tick = (now) => {
      const raw = Math.min(1, Math.max(0, (now - t0) / duration));
      const pos = from + (target - from) * easeInOutCubic(raw);
      setSmoothPos(pos);

      if (raw < 1) {
        taxiDriveRafRef.current = requestAnimationFrame(tick);
      } else {
        taxiDriveRafRef.current = null;
        setSmoothPos(target);
        prevPosRef.current = target;
      }
    };

    taxiDriveRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (taxiDriveRafRef.current) {
        cancelAnimationFrame(taxiDriveRafRef.current);
        taxiDriveRafRef.current = null;
      }
    };
  }, [
    taxiPhase,
    taxiDriveEndPos,
    taxiDriveDurationMs,
    taxiDriveSegmentMs,
    taxiJamMidPos,
    taxiDriveCongested,
  ]);



  const tileW = laneTileW;
  const stepY = tileW + ROW_GAP_PX;
  const traveling = Math.abs(viewPos - smoothPos) > TRAVEL_EPS;
  const laneDY = traveling ? laneOffsetY(smoothPos, travelDirRef.current, tileW, ROW_GAP_PX) : 0;
  const displayTileIndex = Math.floor(smoothPos + 1e-9);

  const maxBoardPos = Math.min(boardGoal, displayTileIndex + AHEAD);
  const tiles = [];
  for (let pos = 0; pos <= maxBoardPos; pos++) {
    tiles.push({ pos });
  }

  const otherByPos = {};
  players.forEach((p) => {
    if (p.alive && p.id !== currentPlayer?.id) {
      if (!otherByPos[p.position]) otherByPos[p.position] = [];
      otherByPos[p.position].push(p);
    }
  });

  const iconPx = Math.round(tileW * 0.48);
  const numPx = Math.max(10, Math.round(tileW * 0.26));

  /** ストリップ座標での駒の中心 Y（補間込み）。カメラはこれをビューポートのアンカーに合わせる */
  const playerWorldY = smoothPos * stepY + tileW / 2;
  const cameraTranslateY = viewportH * CAMERA_ANCHOR_FRAC - playerWorldY;

  /** 背景 Y＝ワールド進行量（smoothPos * stepY）と同一スケール。カメラの playerWorldY と対になる */
  const bgScrollPx = -smoothPos * stepY;
  let bgScrollMultiplier = 1;
  if (taxiPhase === "enter" || taxiPhase === "boarding") bgScrollMultiplier = 1.15;
  if (taxiPhase === "ride") bgScrollMultiplier = 2;
  if (taxiPhase === "trafficJam") bgScrollMultiplier = 0.06;
  if (
    taxiPhase === "drive" ||
    taxiPhase === "driveBeforeJam" ||
    taxiPhase === "driveAfterJam" ||
    taxiPhase === "arrive"
  ) {
    bgScrollMultiplier = 1;
  }

  const pendingTaxiVisualOnly =
    (currentPlayer?.pendingTaxiSteps ?? 0) > 0 && taxiPhase == null;
  const showPlayerPieceAsTaxi =
    (taxiPhase != null && TAXI_AS_BOARD_PIECE_PHASES.has(taxiPhase)) ||
    pendingTaxiVisualOnly;

  const taxiDriveFast =
    (taxiPhase === "drive" ||
      taxiPhase === "driveBeforeJam" ||
      taxiPhase === "driveAfterJam") &&
    !taxiDriveCongested;

  const showTaxiBoardingVisual =
    taxiPhase === "enter" || taxiPhase === "boarding";

  /** ride/drive 中はマス上の「エリア」演出を抑制するが、駒自体は showPlayerPieceAsTaxi でタクシー画像を描画する */
  const taxiHideOnTilePiece =
    taxiPhase === "ride" ||
    taxiPhase === "trafficJam" ||
    taxiPhase === "drive" ||
    taxiPhase === "driveBeforeJam" ||
    taxiPhase === "driveAfterJam" ||
    pendingTaxiVisualOnly;

  /** 到着時のみ横に停車タクシー（退車演出）。他フェーズはマス上の駒が taxi.png */
  const showTaxiDock = taxiPhase === "arrive";

  const bgNight = nightShrine
    ? "linear-gradient(to bottom, #010118 0%, #09092e 42%, #0e0e46 100%)"
    : "linear-gradient(to bottom, #020617 0%, #0f172a 55%, #1e293b 100%)";

  const isPieceTraveling = traveling || pieceHopping;
  const hideCurrentPieceDuringTurnSwitchPan =
    cameraPanOnly &&
    traveling &&
    taxiPhase == null &&
    !showPlayerPieceAsTaxi &&
    !showTaxiBoardingVisual &&
    !showTaxiDock;
  const remainingSteps = Math.ceil(Math.abs(viewPos - smoothPos) - 1e-9);

  return (
    <div
      className={`relative flex min-h-0 w-full flex-col overflow-visible rounded-xl ${nightShrine ? "final-battle-night" : ""}`}
      style={{
        background: bgNight,
        height: "100%",
        filter: taxiPhase === "arrive" ? "brightness(0.9) saturate(0.95)" : undefined,
        transition: "filter 0.35s ease-out",
      }}
    >
      <SugorokuBackground
        scrollPx={bgScrollPx}
        scrollMultiplier={bgScrollMultiplier}
        traveling={traveling || taxiDriveFast}
        fast={!!(boardMotion.fast && traveling) || taxiDriveFast}
      />

      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-52 h-16 rounded-full pointer-events-none z-[1]
        ${nightShrine ? "" : "opacity-[0.35]"}`}
        style={{
          background: nightShrine
            ? "radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, transparent 72%)"
            : "radial-gradient(ellipse, rgba(34,211,238,0.12) 0%, transparent 70%)",
        }}
      />

      {nightShrine && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 50% 18%, rgba(79,70,229,0.25) 0%, transparent 55%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[2] opacity-[0.35]"
            style={{
              background:
                "repeating-linear-gradient(100deg, transparent, transparent 5px, rgba(148,163,184,0.06) 5px, rgba(148,163,184,0.06) 10px)",
              maskImage: "linear-gradient(to bottom, transparent, black 35%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] z-[3] opacity-50"
            style={{ background: "linear-gradient(to top, rgba(2,6,23,0.92), transparent)" }}
          />
          {Array.from({ length: 22 }, (_, i) => (
            <span
              key={i}
              className="pointer-events-none absolute rounded-full anim-cold-spark z-[4]"
              style={{
                left: `${(i * 47) % 100}%`,
                bottom: "-4%",
                width: 2 + (i % 4),
                height: 2 + (i % 4),
                background:
                  i % 3 === 0 ? "rgba(199,210,254,0.95)" : "rgba(165,243,252,0.85)",
                boxShadow: "0 0 6px rgba(191,219,254,0.9)",
                animationDuration: `${4.2 + (i % 7) * 0.35}s`,
                animationDelay: `${(i % 11) * 0.28}s`,
              }}
            />
          ))}
        </>
      )}

      {traveling && remainingSteps > 0 && !taxiPhase && (
        <div className="absolute top-2 right-3 z-10 text-[11px] font-bold text-cyan-300/80 bg-slate-900/60 px-2 py-0.5 rounded-full pointer-events-none">
          残り{remainingSteps}マス...
        </div>
      )}

      <div
        ref={laneViewportRef}
        className={`relative z-10 flex min-h-0 flex-1 flex-col overflow-visible w-full pt-2 pb-3 ${
          isDiceRolling && taxiPhase !== "taxiHail" && !traveling && !pieceHopping
            ? "opacity-75"
            : ""
        }`}
      >
        <div
          className="relative mx-auto flex w-full max-w-[92vw] flex-col items-center overflow-visible px-3"
          style={{
            transform: `translateY(${cameraTranslateY}px)`,
            transition: traveling ? "none" : "transform 0.4s linear",
            willChange: traveling ? "transform" : "auto",
          }}
        >
          {tiles.map(({ pos }, idx) => {
            const deco = squareDeco(pos, boardGoal, nightShrine);
            const isCurrent = pos === displayTileIndex;
            const passed = pos < displayTileIndex;
            const isGoal = pos >= boardGoal;
            const othersHere = otherByPos[pos] ?? [];
            const tileFx = Array.isArray(tileEffects) ? tileEffects[pos] : null;
            const showTileFx =
              tileFx &&
              tileFx.kind !== TILE_EFFECT_KIND.NEUTRAL &&
              pos > 0 &&
              pos < boardGoal;
            const tileFxIsBad =
              showTileFx &&
              (tileFx.kind === TILE_EFFECT_KIND.MOVE_BACKWARD ||
                tileFx.kind === TILE_EFFECT_KIND.LOSE_MONEY ||
                tileFx.kind === TILE_EFFECT_KIND.INCREASE_PON ||
                tileFx.kind === TILE_EFFECT_KIND.DEBT_TRAP);
            const tileFxIsGood =
              showTileFx &&
              (tileFx.kind === TILE_EFFECT_KIND.MOVE_FORWARD ||
                tileFx.kind === TILE_EFFECT_KIND.GAIN_MONEY);

            const bgSolid = opaqueTw(deco.bg);
            const borderSolid = opaqueTw(deco.border);
            const isLastRow = idx === tiles.length - 1;
            const marginBottom = isLastRow ? 0 : ROW_GAP_PX;

            const passedTone =
              passed && !tileFxIsBad && pos !== boardGoal
                ? "brightness-[0.88] saturate-[0.92]"
                : "";

            /** 走行フェーズ：駒をタイル中心より左に寄せる（幅に比例） */
            const taxiOnTileShiftX =
              showPlayerPieceAsTaxi && !showTaxiBoardingVisual
                ? -Math.round(tileW * 0.22)
                : 0;

            const showStandeeCluster =
              othersHere.length > 0 ||
              (isCurrent &&
                currentPlayer &&
                (!taxiHideOnTilePiece || showTaxiDock || showPlayerPieceAsTaxi || showTaxiBoardingVisual));

            return (
              <div
                key={pos}
                className="flex flex-col items-center select-none opacity-100"
                style={{
                  marginBottom,
                  transition: "opacity 0.25s ease",
                }}
              >
                {pos === boardGoal && <GoalFinishLine tileW={tileW} />}
                <div className="relative flex flex-col items-center" style={{ width: tileW }}>
                  {showStandeeCluster ? (
                    <div
                      className={`pointer-events-none absolute left-1/2 bottom-full flex flex-row items-end justify-center gap-1 ${
                        taxiPhase === "taxiHail" ||
                        taxiPhase === "enter" ||
                        taxiPhase === "boarding" ||
                        taxiPhase === "ride" ||
                        taxiPhase === "trafficJam" ||
                        taxiPhase === "drive" ||
                        taxiPhase === "driveBeforeJam" ||
                        taxiPhase === "driveAfterJam" ||
                        taxiPhase === "arrive"
                          ? "z-[28]"
                          : "z-20"
                      }`}
                      style={{
                        transform: `translate(-50%, ${Math.max(10, Math.round(tileW * 0.52))}px)`,
                      }}
                    >
                      {othersHere.map((p) => {
                        const piecePx = isCurrent ? 28 : Math.max(12, iconPx - 6);
                        const nameColor = playerNameColor(players, p.id);
                        return (
                          <div key={p.id} className="relative flex flex-col items-center justify-end">
                            <span
                              className="pointer-events-none absolute bottom-full left-1/2 z-[39] mb-0.5 -translate-x-1/2 whitespace-nowrap rounded-md border px-[6px] py-[2px] text-[10px] font-black leading-none shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                              style={{
                                color: nameColor,
                                borderColor: `${nameColor}cc`,
                                backgroundColor: "rgba(2,6,23,0.85)",
                              }}
                            >
                              {p.name}
                            </span>
                            <TaxiCongestionBadge player={p} />
                            <span className="anim-breathe leading-none inline-flex items-end justify-center">
                              <SugorokuBoardPiece
                                characterType={p.characterType}
                                pose={(p.skipTurns ?? 0) > 0 ? "fallen" : "normal"}
                                imgClassName="object-contain object-bottom"
                                spanClassName="leading-none"
                                imgStyle={{
                                  maxHeight: Math.max(72, Math.min(118, piecePx * 5.5)),
                                  width: "auto",
                                  maxWidth: Math.max(58, piecePx * 6.25),
                                }}
                                spanStyle={{ fontSize: piecePx }}
                              />
                            </span>
                          </div>
                        );
                      })}
                      {isCurrent && showTaxiDock && (
                        <TaxiTileDock characterType={currentPlayer.characterType} taxiPhase={taxiPhase} />
                      )}
                      {isCurrent &&
                        currentPlayer &&
                        !hideCurrentPieceDuringTurnSwitchPan &&
                        (!taxiHideOnTilePiece || showPlayerPieceAsTaxi || showTaxiBoardingVisual) && (
                        <div className="relative flex flex-col items-center justify-end">
                          <span
                            className="pointer-events-none absolute bottom-full left-1/2 z-[39] mb-0.5 -translate-x-1/2 whitespace-nowrap rounded-md border px-[6px] py-[2px] text-[10px] font-black leading-none shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                            style={{
                              color: playerNameColor(players, currentPlayer.id),
                              borderColor: `${playerNameColor(players, currentPlayer.id)}cc`,
                              backgroundColor: "rgba(2,6,23,0.85)",
                            }}
                          >
                            {currentPlayer.name}
                          </span>
                          <TaxiCongestionBadge player={currentPlayer} />
                          {showTaxiBoardingVisual ? (
                            <div className="flex max-w-[min(340px,calc(100vw-40px))] flex-row flex-nowrap items-end justify-center gap-1 pr-0.5 origin-bottom scale-[0.88] sm:scale-95 md:scale-100">
                              <div
                                className={`order-1 shrink-0 self-end ${
                                  taxiPhase === "enter"
                                    ? "anim-taxi-from-above-left-of-tile"
                                    : "taxi-approach-parked"
                                } relative z-[24]`}
                              >
                                <TaxiStandeeImage imgClassName="relative z-[1] max-h-[118px] w-auto min-w-[48px] max-w-[min(165px,46vw)] object-contain object-bottom opacity-100" />
                              </div>
                              <div
                                className={`order-2 shrink-0 relative z-[20] flex flex-col items-center justify-end self-end ${
                                  taxiPhase === "boarding" ? "taxi-boarding-char-to-cab" : ""
                                }`}
                              >
                                <span
                                  className={`inline-flex items-end justify-center leading-none ${
                                    taxiPhase === "boarding" ? "" : isDiceRolling ? "animate-bounce" : "anim-float"
                                  }`}
                                >
                                  <SugorokuBoardPiece
                                    characterType={currentPlayer.characterType}
                                    pose={(currentPlayer.skipTurns ?? 0) > 0 ? "fallen" : "normal"}
                                    imgClassName="max-h-[130px] w-auto max-w-[min(180px,55vw)] object-contain object-bottom"
                                    spanClassName="text-4xl leading-none"
                                  />
                                </span>
                              </div>
                            </div>
                          ) : (
                          <div
                            className={`relative flex items-end justify-center ${
                              showPlayerPieceAsTaxi ? "z-[26]" : ""
                            } ${taxiPhase === "arrive" ? "taxi-piece-arrive-fadein" : ""}`}
                            style={{
                              zIndex: showPlayerPieceAsTaxi
                                ? 26
                                : pieceHopping || isPieceTraveling
                                  ? 20
                                  : 5,
                              position: "relative",
                            }}
                          >
                            <span
                              className={`inline-flex items-end justify-center leading-none ${
                                taxiPhase === "arrive"
                                  ? ""
                                  : traveling
                                    ? ""
                                    : pieceHopping
                                      ? "anim-hop"
                                      : isDiceRolling
                                        ? "animate-bounce"
                                        : "anim-float"
                              }`}
                            >
                              <span
                                className="inline-flex items-end justify-center leading-none"
                                style={{
                                  transform: `translate3d(${taxiOnTileShiftX}px, ${cameraPanOnly ? 0 : laneDY}px, 0)`,
                                  transition: traveling ? "none" : "transform 0.4s linear",
                                  willChange: traveling ? "transform" : "auto",
                                }}
                              >
                                <span
                                  className={`standee-piece relative inline-flex items-end justify-center leading-none ${
                                    traveling && !showPlayerPieceAsTaxi && !cameraPanOnly ? "anim-standee-walk" : ""
                                  } ${showPlayerPieceAsTaxi ? "z-[26] anim-pulse-taxi-ride" : ""} ${
                                    showPlayerPieceAsTaxi && taxiPhase === "trafficJam"
                                      ? "anim-taxi-stutter"
                                      : ""
                                  } ${
                                    taxiPhase === "arrive" ? "taxi-piece-arrive-fadein-target" : ""
                                  }`}
                                  style={
                                    traveling && !showPlayerPieceAsTaxi
                                      ? { ["--standee-walk-ms"]: `${boardMotion.msPerStep * 1.35}ms` }
                                      : undefined
                                  }
                                >
                                  {showPlayerPieceAsTaxi ? (
                                    <TaxiStandeeImage imgClassName="relative z-[1] max-h-[130px] w-auto min-w-[48px] max-w-[min(180px,55vw)] object-contain object-bottom opacity-100" />
                                  ) : (
                                    <SugorokuBoardPiece
                                      characterType={currentPlayer.characterType}
                                      pose={(currentPlayer.skipTurns ?? 0) > 0 ? "fallen" : "normal"}
                                      imgClassName="max-h-[130px] w-auto max-w-[min(180px,55vw)] object-contain object-bottom"
                                      spanClassName="text-4xl leading-none"
                                    />
                                  )}
                                </span>
                              </span>
                            </span>
                            {!showPlayerPieceAsTaxi &&
                              currentPlayer.stats.luck >= 80 &&
                              [
                                { cls: "anim-sparkle-0", t: "-10px", l: "-12px" },
                                { cls: "anim-sparkle-1", t: "-8px", r: "-12px" },
                                { cls: "anim-sparkle-2", b: "-8px", l: "-10px" },
                                { cls: "anim-sparkle-3", b: "-6px", r: "-10px" },
                              ].map((s, i) => (
                                <span
                                  key={i}
                                  className={`absolute text-yellow-300 font-black text-[11px] pointer-events-none ${s.cls}`}
                                  style={{ top: s.t, left: s.l, bottom: s.b, right: s.r }}
                                >
                                  ✦
                                </span>
                              ))}
                          </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : null}

                  <div
                    className={`relative z-0 flex items-center justify-center overflow-visible rounded-xl border-[3px] ${passedTone}
                    ${
                      pos === boardGoal
                        ? "bg-yellow-400 border-yellow-600 text-amber-950"
                        : tileFxIsBad
                          ? "border-rose-500 bg-gradient-to-br from-red-950 to-red-900 text-rose-50"
                          : tileFxIsGood
                            ? "border-sky-400 bg-gradient-to-br from-sky-900 to-blue-900 text-sky-100"
                          : `${bgSolid} ${borderSolid}`
                    }
                    ${isCurrent ? (tileFxIsBad ? "ring-2 ring-rose-300/95" : pos === boardGoal ? "ring-2 ring-amber-700/90" : "ring-2 ring-cyan-400/90") : ""}`}
                    style={{
                      width: `${tileW}px`,
                      height: `${tileW}px`,
                      boxShadow: "none",
                      transition: "width 0.28s ease, height 0.28s ease, filter 0.28s ease",
                    }}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl pointer-events-none ${
                        tileFxIsBad
                          ? "bg-rose-400/50"
                          : tileFxIsGood
                            ? "bg-sky-300/45"
                          : pos === boardGoal
                            ? "bg-yellow-500/80"
                            : "bg-white/25"
                      }`}
                    />
                    {passed && pos > 0 && (
                      <span
                        className="pointer-events-none absolute left-1 top-1 z-[3] flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/95 text-sm leading-none text-emerald-200 ring-2 ring-emerald-400/80"
                        aria-hidden
                      >
                        ✓
                      </span>
                    )}
                    {pos === boardGoal ? (
                      <GoalSlotRirimuImage deco={deco} iconPx={iconPx} tileW={tileW} />
                    ) : showTileFx ? (
                      <SugorokuTileEffectIcon
                        effect={tileFx}
                        sizePx={Math.max(16, Math.round(iconPx * 1.05))}
                      />
                    ) : pos > 0 && pos < boardGoal ? null : deco.icon ? (
                      <span
                        style={{ fontSize: `${iconPx}px` }}
                        className={`leading-none ${deco.text}`}
                      >
                        {deco.icon}
                      </span>
                    ) : (
                      <span style={{ fontSize: `${numPx}px` }} className={`font-bold ${deco.text}`}>
                        {pos}
                      </span>
                    )}
                    {pos === boardGoal && (
                      <span
                        className="pointer-events-none absolute bottom-1 left-1/2 z-[6] -translate-x-1/2 text-[10px] font-black leading-none tracking-wide text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]"
                      >
                        GOAL!
                      </span>
                    )}
                  </div>
                </div>

                {isCurrent && deco.icon && (pos === 0 || pos >= boardGoal) && (
                  <span className={`text-[9px] mt-0.5 font-medium ${deco.text}`}>
                    {pos === 0 ? "スタート" : "GOAL!"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-[15] h-5 rounded-b-xl pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(15,23,42,0.88), transparent)" }}
      />
      <div className="pointer-events-none absolute right-2 top-1/2 z-[16] -translate-y-1/2 rounded-lg border border-cyan-400/50 bg-slate-900/85 px-2 py-1 text-right shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
        <div className="text-[10px] font-semibold tracking-wide text-cyan-300/90">現在マス</div>
        <div className="text-sm font-black tabular-nums text-cyan-100 leading-tight">
          {Math.max(0, displayTileIndex)}<span className="text-slate-500 font-semibold"> / </span>{boardGoal}
        </div>
      </div>
    </div>
  );
}
