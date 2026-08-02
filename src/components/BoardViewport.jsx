import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SugorokuBoardPiece, TaxiStandeeImage } from "./CharacterPieces";
import SugorokuBackground from "./SugorokuBackground";
import SugorokuTileEffectIcon from "./BoardTile";
import MovementFloatingLabel from "./MovementFloatingLabel";
import DailyActionFloatingLabel from "./DailyActionFloatingLabel";
import BoardCalloutBubble from "./BoardCalloutBubble";
import PieceNearbyStack from "./PieceNearbyStack";
import BoardCharacterSideDice from "./BoardCharacterSideDice";
import { sugorokuPlayerName } from "../lib/sugorokuPlayerName";
import { TILE_EFFECT_KIND } from "../constants/gameBalance";
import {
  SUGOROKU_BOARD_STANDEE_SCALE,
  SUGOROKU_PLAYER_NAME_BUBBLE_CLASS,
  SUGOROKU_STANDEE_MOBILE_SCALE_CLASS,
  SUGOROKU_TILE_ABS_MIN_W,
  SUGOROKU_DICE_CHARACTER_CLUSTER_CLASS,
  SUGOROKU_DICE_CHARACTER_CLUSTER_TAXI_CLASS,
  SUGOROKU_DICE_INLINE_ROW_CLASS,
  SUGOROKU_NAME_ANCHOR_WITH_STANDEE,
  resolveSugorokuTravelStepsRemaining,
  sugorokuCurrentStandeeImgStyle,
} from "../constants/sugorokuMobileLayout";
import { squareDeco, easeInOutCubic, computeTaxiDriveDurationMs, computeSugorokuMsPerStep, SUGOROKU_MS_PER_STEP_NORMAL, getBoardTombDisplayPosition } from "../utils/gameLogic";
import { BOARD_DEATH_FADE_MS } from "../lib/boardDeathPresentation";
import { publicAssetUrl } from "../lib/publicAssetUrl";
import { BoardDeathFadePiece, BoardTombMarker } from "./BoardTombMarker";

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

/** すごろくマス上の駒（立ち絵）表示倍率 — 詳細は constants/sugorokuMobileLayout.js */
const BOARD_STANDEE_SCALE = SUGOROKU_BOARD_STANDEE_SCALE;
const STANDEE_MOBILE_SCALE_CLASS = SUGOROKU_STANDEE_MOBILE_SCALE_CLASS;

/** 大学生の立ち絵はアートが大きめのため、サラリーマンと同程度に見えるようだけ縮小 */
function boardStandeePieceScale(characterType) {
  return characterType === "student" ? 0.88 : 1;
}

/** 他プレイヤー駒：タクシー渋滞待ち（pendingTaxiSteps）の小バッジ */
function TaxiCongestionBadge({ player }) {
  if ((player?.pendingTaxiSteps ?? 0) <= 0) return null;
  return (
    <div className="pointer-events-none mb-0.5">
      <BoardCalloutBubble
        tail="bottom"
        fillColor="#b45309"
        bodyClassName="whitespace-nowrap px-2 py-0.5 text-[9px] font-bold animate-pulse"
      >
        🚗 渋滞中…
      </BoardCalloutBubble>
    </div>
  );
}

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
            imgClassName="w-auto object-contain object-bottom"
            imgStyle={{
              maxHeight: 64 * boardStandeePieceScale(characterType),
              maxWidth: `min(${Math.round(115 * boardStandeePieceScale(characterType))}px, ${28 * boardStandeePieceScale(characterType)}vw)`,
            }}
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
const PLAYER_NAME_BUBBLE_CLASS = SUGOROKU_PLAYER_NAME_BUBBLE_CLASS;

/** 道幅に合わせたマス（正方形）の一辺（px） */
const TILE_MIN_W = 52;
const TILE_MAX_W = 72;
/** 低いビューポート向けの下限（SP でも PC と同数の先マスが見えるよう縮小可） */
const TILE_ABS_MIN_W = SUGOROKU_TILE_ABS_MIN_W;
/** 手前に見せるマス数の目標（viewport 高さに関わらず同等） */
const TARGET_AHEAD_VISIBLE = 5;
/** pt-2 pb-3 相当の縦パディング概算 */
const LANE_VIEWPORT_VERTICAL_PAD = 20;
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

/** マス間補間：駒・名前・付随ラベルをまとめてずらす */
function pieceLaneTransformStyle({ taxiOnTileShiftX, laneDY, cameraPanOnly, traveling }) {
  return {
    transform: `translate3d(${taxiOnTileShiftX}px, ${cameraPanOnly ? 0 : laneDY}px, 0)`,
    transition: traveling ? "none" : "transform 0.4s linear",
    willChange: traveling ? "transform" : "auto",
  };
}

/** 縦ストリップすごろく：スタート〜現在〜先行マスをすべて表示、カメラ追従 */
export default function BoardViewport({
  players,
  viewPos,
  boardGoal,
  isDiceRolling,
  /** gameState.movementFx 同期用：マス上ダイス */
  movementFxDiceActive = false,
  movementFxDiceRolls = [],
  /** gameState.movementFx 同期用：+N / -N ラベル */
  movementFxFloatDelta = null,
  movementFxLabelActive = false,
  movementFxFloatLabelMode = "steps",
  taxiPhase: taxiPhaseIn,
  taxiActorPlayerId = null,
  pieceHopping,
  currentPlayer,
  visualTheme = "default",
  tileEffects = null,
  reportHopAnimationComplete = false,
  onHopAnimationComplete,
  /** true: 盤面は表示のみ（ホップ完了コールバック・操作を無効） */
  isObserver = false,
  /** 日常行動ラベル（gameState.dailyActionFx 同期） */
  dailyActionFx = null,
  /** タクシーが渋滞カットイン後の「のろのろ走行」フェーズか */
  taxiDriveCongested = false,
  /** タクシー drive：ゴールマス（Firestore 反映前の視覚終点） */
  taxiDriveEndPos = null,
  /** 現在の drive 区間の ms（driveBeforeJam / driveAfterJam / drive で App と一致） */
  taxiDriveSegmentMs = null,
  /** 渋滞あり時のワールド中点（補間停止位置） */
  taxiJamMidPos = null,
  taxiDriveDurationMs = 2600,
  /** 駒付近：マス効果説明・ターン残り・ダイス・進行メタ */
  tileEffectLines = null,
  tileEffectKind = null,
  localDiceItems = null,
  localDiceShowTotal = false,
  localDiceTotal = 0,
  /** ローカル演出：人助けダイアログ後のフェードなど（Firestore 反映前） */
  boardDeathPresentation = null,
  /** フェード済み ID — 同期後の二重フェードを防ぐ */
  deathFadeHandledIds = [],
}) {
  const AHEAD = 6;
  const hopCompleteEnabled = reportHopAnimationComplete && !isObserver;
  const nightShrine = visualTheme === "nightShrine";
  /** 手番が先に進んだあと、操作者以外の盤面にタクシー演出が載らないよう抑制 */
  const taxiPhase =
    taxiPhaseIn != null &&
    taxiActorPlayerId != null &&
    currentPlayer?.id !== taxiActorPlayerId
      ? null
      : taxiPhaseIn;

  const [smoothPos, setSmoothPos] = useState(viewPos);
  const [boardMotion, setBoardMotion] = useState({
    forward: true,
    msPerStep: 360,
    fast: false,
  });
  const [deathFadePieces, setDeathFadePieces] = useState([]);
  const prevAliveRef = useRef(new Map());
  const deathFadeTimersRef = useRef([]);

  const laneViewportRef = useRef(null);
  const [viewportH, setViewportH] = useState(480);
  const [laneTileW, setLaneTileW] = useState(58);

  const prevPosRef = useRef(viewPos);
  const prevCurrentPlayerIdRef = useRef(currentPlayer?.id ?? null);
  const prevTaxiPhaseRef = useRef(taxiPhase);
  const travelDirRef = useRef(1);
  const rafRef = useRef(null);
  const taxiDriveRafRef = useRef(null);
  const hopTimerRef = useRef(null);
  const [cameraPanOnly, setCameraPanOnly] = useState(false);
  /** タクシー終了直後の CSS transform トランジションを抑止（ドライブ追従分が「流れる」ように見えるのを防ぐ） */
  const [cameraEaseSuppressed, setCameraEaseSuppressed] = useState(false);
  const onHopCompleteRef = useRef(onHopAnimationComplete);
  onHopCompleteRef.current = onHopAnimationComplete;

  useLayoutEffect(() => {
    const el = laneViewportRef.current;
    if (!el) return;
    const measure = () => {
      const h = el.clientHeight || 480;
      const w = el.clientWidth || 360;
      setViewportH(h);
      const widthBased = Math.round(w * 0.22);
      const aheadBudget = Math.max(0, h * (1 - CAMERA_ANCHOR_FRAC) - LANE_VIEWPORT_VERTICAL_PAD);
      const heightBased = Math.floor(aheadBudget / TARGET_AHEAD_VISIBLE) - ROW_GAP_PX;
      const compactLane = heightBased < TILE_MIN_W;
      const fromHeight = compactLane
        ? Math.max(TILE_ABS_MIN_W, heightBased)
        : Math.max(TILE_MIN_W, heightBased);
      const tileW = Math.min(TILE_MAX_W, widthBased, fromHeight);
      setLaneTileW(tileW);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** タクシー演出終了時：カメラを viewPos に即同期（手番進行後のパン／CSS ease を防ぐ） */
  useLayoutEffect(() => {
    const wasTaxi = prevTaxiPhaseRef.current != null;
    prevTaxiPhaseRef.current = taxiPhase;
    if (!wasTaxi || taxiPhase != null) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (hopTimerRef.current) {
      clearTimeout(hopTimerRef.current);
      hopTimerRef.current = null;
    }
    prevPosRef.current = viewPos;
    setSmoothPos(viewPos);
    setCameraPanOnly(false);
    prevCurrentPlayerIdRef.current = currentPlayer?.id ?? null;
    setCameraEaseSuppressed(true);
  }, [taxiPhase, viewPos, currentPlayer?.id]);

  useEffect(() => {
    if (!cameraEaseSuppressed) return undefined;
    const id = requestAnimationFrame(() => setCameraEaseSuppressed(false));
    return () => cancelAnimationFrame(id);
  }, [cameraEaseSuppressed]);

  useEffect(() => {
    return () => {
      deathFadeTimersRef.current.forEach((t) => clearTimeout(t));
      deathFadeTimersRef.current = [];
    };
  }, []);

  useEffect(() => {
    const handled = new Set(deathFadeHandledIds);
    const newFades = [];
    players.forEach((p) => {
      if (!p?.id) return;
      const wasAlive = prevAliveRef.current.get(p.id);
      const isAlive = p.alive !== false;
      if (wasAlive === true && !isAlive) {
        if (handled.has(p.id)) {
          prevAliveRef.current.set(p.id, false);
          return;
        }
        const pos = getBoardTombDisplayPosition(p, boardGoal);
        if (pos != null) {
          newFades.push({
            id: p.id,
            name: p.name,
            characterType: p.characterType,
            position: pos,
          });
        }
      }
      prevAliveRef.current.set(p.id, isAlive);
    });
    if (!newFades.length) return;
    setDeathFadePieces((prev) => {
      const ids = new Set(prev.map((x) => x.id));
      return [...prev, ...newFades.filter((x) => !ids.has(x.id))];
    });
    newFades.forEach((d) => {
      const t = setTimeout(() => {
        setDeathFadePieces((prev) => prev.filter((x) => x.id !== d.id));
      }, BOARD_DEATH_FADE_MS);
      deathFadeTimersRef.current.push(t);
    });
  }, [players, boardGoal, deathFadeHandledIds]);

  const isLocalDeathFade = (playerId) =>
    boardDeathPresentation?.playerId === playerId && boardDeathPresentation?.phase === "fade";

  /** 手番交代と viewPos 更新を同フレームで同期（前プレイヤーの表示位置からの巻き戻しアニメを防ぐ） */
  useLayoutEffect(() => {
    const id = currentPlayer?.id ?? null;
    if (prevCurrentPlayerIdRef.current === id) return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (hopTimerRef.current) {
      clearTimeout(hopTimerRef.current);
      hopTimerRef.current = null;
    }
    prevCurrentPlayerIdRef.current = id;
    prevPosRef.current = viewPos;
    setSmoothPos(viewPos);
    setCameraPanOnly(false);
  }, [currentPlayer?.id, viewPos]);

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

    /** 手番交代時は後方へドラム巻き戻しせず、新プレイヤー位置へ即同期 */
    if (switchedPlayer) {
      prevPosRef.current = viewPos;
      setSmoothPos(viewPos);
      setCameraPanOnly(false);
      prevCurrentPlayerIdRef.current = currentPlayer?.id ?? null;
      return undefined;
    }

    const msPerStep = computeSugorokuMsPerStep(Math.abs(diff));
    const duration = steps * msPerStep;

    setCameraPanOnly(switchedPlayer);
    setBoardMotion({ forward: dir > 0, msPerStep, fast: msPerStep < SUGOROKU_MS_PER_STEP_NORMAL });

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
        if (hopCompleteEnabled && steps > 0) {
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
  }, [viewPos, hopCompleteEnabled, taxiPhase, currentPlayer?.id]);

  const dailyFxPlayerId = dailyActionFx?.playerId ?? null;
  const dailyFxLabel = dailyActionFx?.label ?? null;
  const dailyFxVisible = !!dailyFxLabel && !!dailyFxPlayerId;

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
    if (p.alive !== false && p.id !== currentPlayer?.id && !isLocalDeathFade(p.id)) {
      if (!otherByPos[p.position]) otherByPos[p.position] = [];
      otherByPos[p.position].push(p);
    }
  });

  const deathFadeIds = new Set(deathFadePieces.map((d) => d.id));
  if (boardDeathPresentation?.phase === "fade" && boardDeathPresentation?.playerId) {
    deathFadeIds.add(boardDeathPresentation.playerId);
  }
  const tombsByPos = {};
  players.forEach((p) => {
    if (deathFadeIds.has(p.id)) return;
    const pos = getBoardTombDisplayPosition(p, boardGoal);
    if (pos == null) return;
    if (!tombsByPos[pos]) tombsByPos[pos] = [];
    tombsByPos[pos].push(p);
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
  const currentPlayerStandeeMult = boardStandeePieceScale(currentPlayer?.characterType);
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
  const useCameraTransition =
    !traveling && !pieceHopping && taxiPhase == null && !cameraEaseSuppressed;
  const hideCurrentPieceDuringTurnSwitchPan =
    cameraPanOnly &&
    traveling &&
    taxiPhase == null &&
    !showPlayerPieceAsTaxi &&
    !showTaxiBoardingVisual &&
    !showTaxiDock;
  const remainingSteps = Math.ceil(Math.abs(viewPos - smoothPos) - 1e-9);
  const travelStepsRemaining = resolveSugorokuTravelStepsRemaining({
    taxiPhase,
    taxiDriveEndPos,
    taxiJamMidPos,
    smoothPos,
    viewPos,
    traveling,
    remainingSteps,
  });
  const diceCharacterClusterClass =
    taxiPhase != null ? SUGOROKU_DICE_CHARACTER_CLUSTER_TAXI_CLASS : SUGOROKU_DICE_CHARACTER_CLUSTER_CLASS;

  return (
    <div
      className={`relative flex min-h-0 w-full flex-col overflow-visible rounded-xl ${nightShrine ? "final-battle-night" : ""} ${isObserver ? "pointer-events-none select-none" : ""}`}
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
            transition: useCameraTransition ? "transform 0.4s linear" : "none",
            willChange: traveling || taxiPhase != null ? "transform" : "auto",
          }}
        >
          {tiles.map(({ pos }, idx) => {
            const deco = squareDeco(pos, boardGoal, nightShrine);
            const isCurrent = pos === displayTileIndex;
            const passed = pos < displayTileIndex;
            const isGoal = pos >= boardGoal;
            const othersHere = otherByPos[pos] ?? [];
            const tombsHere = tombsByPos[pos] ?? [];
            const fadingHere = deathFadePieces.filter((d) => d.position === pos);
            const pres = boardDeathPresentation;
            const forcedFadeHere =
              pres?.phase === "fade" && Math.floor(Number(pres.position)) === pos
                ? [
                    {
                      id: pres.playerId,
                      name: pres.name,
                      characterType: pres.characterType,
                      position: pos,
                    },
                  ]
                : [];
            const activeFades = [...fadingHere, ...forcedFadeHere];
            const showDeathMarkers = tombsHere.length > 0 || activeFades.length > 0;
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
                        const pieceCharScale = boardStandeePieceScale(p.characterType);
                        const nameColor = playerNameColor(players, p.id);
                        return (
                          <div key={p.id} className={`relative flex flex-col items-center justify-end ${STANDEE_MOBILE_SCALE_CLASS}`}>
                            <div className="pointer-events-none relative z-[39] mb-0.5">
                              <BoardCalloutBubble
                                tail="bottom"
                                fillColor={nameColor}
                                bodyClassName={PLAYER_NAME_BUBBLE_CLASS}
                              >
                                {sugorokuPlayerName(p.name)}
                              </BoardCalloutBubble>
                            </div>
                            <TaxiCongestionBadge player={p} />
                            <DailyActionFloatingLabel
                              label={dailyFxPlayerId === p.id ? dailyFxLabel : null}
                              visible={dailyFxVisible && dailyFxPlayerId === p.id}
                            />
                            <span className="anim-breathe leading-none inline-flex items-end justify-center">
                              <SugorokuBoardPiece
                                characterType={p.characterType}
                                pose={(p.skipTurns ?? 0) > 0 ? "fallen" : "normal"}
                                imgClassName="object-contain object-bottom"
                                spanClassName="leading-none"
                                imgStyle={{
                                  maxHeight:
                                    Math.max(72, Math.min(118, piecePx * 5.5)) *
                                    BOARD_STANDEE_SCALE *
                                    pieceCharScale,
                                  width: "auto",
                                  maxWidth:
                                    Math.max(58, piecePx * 6.25) * BOARD_STANDEE_SCALE * pieceCharScale,
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
                        !isLocalDeathFade(currentPlayer.id) &&
                        !hideCurrentPieceDuringTurnSwitchPan &&
                        (!taxiHideOnTilePiece || showPlayerPieceAsTaxi || showTaxiBoardingVisual) && (
                        <div
                          className="relative flex flex-col items-center justify-end"
                          style={pieceLaneTransformStyle({
                            taxiOnTileShiftX,
                            laneDY,
                            cameraPanOnly,
                            traveling,
                          })}
                        >
                          <div className={diceCharacterClusterClass}>
                            <BoardCharacterSideDice
                              localDiceItems={localDiceItems}
                              localDiceShowTotal={localDiceShowTotal}
                              localDiceTotal={localDiceTotal}
                              remainingTravelSteps={travelStepsRemaining}
                              movementFxDiceActive={movementFxDiceActive}
                              movementFxDiceRolls={movementFxDiceRolls}
                            />
                          {showTaxiBoardingVisual ? (
                            <div className={`relative flex max-w-[min(340px,calc(100vw-40px))] flex-col items-center ${STANDEE_MOBILE_SCALE_CLASS}`}>
                              <PieceNearbyStack
                                anchor={SUGOROKU_NAME_ANCHOR_WITH_STANDEE}
                                playerName={currentPlayer.name}
                                nameFillColor={playerNameColor(players, currentPlayer.id)}
                                tileEffectLines={tileEffectLines}
                                tileEffectKind={tileEffectKind}
                                congestionActive={(currentPlayer.pendingTaxiSteps ?? 0) > 0}
                              />
                            <div className="flex w-full flex-row flex-nowrap items-end justify-center gap-1 pr-0.5">
                              <div
                                className={`order-1 shrink-0 self-end ${
                                  taxiPhase === "enter"
                                    ? "anim-taxi-from-above-left-of-tile"
                                    : "taxi-approach-parked"
                                } relative z-[24]`}
                              >
                                <TaxiStandeeImage imgClassName="relative z-[1] max-h-[136px] w-auto min-w-[48px] max-w-[min(190px,46vw)] object-contain object-bottom opacity-100" />
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
                                    imgClassName="w-auto object-contain object-bottom"
                                    imgStyle={sugorokuCurrentStandeeImgStyle(currentPlayerStandeeMult)}
                                    spanClassName="text-4xl leading-none"
                                  />
                                </span>
                              </div>
                            </div>
                            </div>
                          ) : (
                          <div className={`relative flex flex-col items-center justify-end ${STANDEE_MOBILE_SCALE_CLASS}`}>
                            <PieceNearbyStack
                              anchor={SUGOROKU_NAME_ANCHOR_WITH_STANDEE}
                              playerName={currentPlayer.name}
                              nameFillColor={playerNameColor(players, currentPlayer.id)}
                              tileEffectLines={tileEffectLines}
                              tileEffectKind={tileEffectKind}
                              congestionActive={(currentPlayer.pendingTaxiSteps ?? 0) > 0}
                            />
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
                            <MovementFloatingLabel
                              delta={movementFxFloatDelta}
                              visible={movementFxLabelActive}
                              variant={movementFxFloatLabelMode}
                            />
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
                                    <TaxiStandeeImage imgClassName="relative z-[1] max-h-[150px] w-auto min-w-[48px] max-w-[min(207px,55vw)] object-contain object-bottom opacity-100" />
                                  ) : (
                                    <SugorokuBoardPiece
                                      characterType={currentPlayer.characterType}
                                      pose={(currentPlayer.skipTurns ?? 0) > 0 ? "fallen" : "normal"}
                                      imgClassName="w-auto object-contain object-bottom"
                                      imgStyle={sugorokuCurrentStandeeImgStyle(currentPlayerStandeeMult)}
                                      spanClassName="text-4xl leading-none"
                                    />
                                  )}
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
                          </div>
                          )}
                          </div>
                          <DailyActionFloatingLabel
                            label={dailyFxPlayerId === currentPlayer.id ? dailyFxLabel : null}
                            visible={dailyFxVisible && dailyFxPlayerId === currentPlayer.id}
                          />
                        </div>
                      )}
                    </div>
                  ) : null}

                  {showDeathMarkers && (
                    <div
                      className="pointer-events-none absolute left-1/2 bottom-full z-[18] flex flex-row items-end justify-center gap-1"
                      style={{
                        transform: `translate(-50%, ${Math.max(10, Math.round(tileW * 0.52))}px)`,
                      }}
                    >
                      {activeFades.map((d) => (
                        <BoardDeathFadePiece
                          key={`death-fade-${d.id}`}
                          characterType={d.characterType}
                          name={d.name}
                          nameFillColor={playerNameColor(players, d.id)}
                          tileW={tileW}
                        />
                      ))}
                      {tombsHere.map((p) => (
                        <BoardTombMarker
                          key={`tomb-${p.id}`}
                          name={p.name}
                          nameFillColor={playerNameColor(players, p.id)}
                          tileW={tileW}
                        />
                      ))}
                    </div>
                  )}

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
                      <div className="pointer-events-none absolute bottom-1 left-1/2 z-[6] -translate-x-1/2">
                        <BoardCalloutBubble
                          tail="top"
                          tone="moneyGain"
                          bodyClassName="text-[9px] px-1.5 py-0.5 tracking-wide"
                        >
                          GOAL!
                        </BoardCalloutBubble>
                      </div>
                    )}
                  </div>
                </div>

                {isCurrent && deco.icon && pos === 0 && (
                  <BoardCalloutBubble
                    tail="top"
                    tone="positive"
                    bodyClassName="text-[9px] px-2 py-0.5 mt-1"
                  >
                    スタート
                  </BoardCalloutBubble>
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
    </div>
  );
}
