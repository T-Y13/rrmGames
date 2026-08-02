/**
 * すごろく盤面 — スマホ（SP）向けレイアウト定数
 *
 * ブレークポイントは Tailwind 既定（`sm` 640px / `md` 768px）。
 * SP 調整を変えるときはここを正本にし、BoardViewport / PieceNearbyStack 等から参照する。
 * ダイスは全 viewport でキャラ頭上（2026-08-01）。
 *
 * 関連（別ファイル）:
 * - 盤面フレーム高さ → `constants/gameAnimationsCss.js` の BOARD_VIEWPORT_FRAME_SIZE_CLASS
 * - POT 表示 → すごろく中は BoardGamePhase ヘッダー inline、固定 HUD は App.jsx で非表示
 */

/** 駒立ち絵のベース倍率（全 viewport 共通） */
export const SUGOROKU_BOARD_STANDEE_SCALE = 1.05;

/**
 * SP 向け駒＋名前の CSS scale（origin-bottom でマス位置を維持）
 * md 以上は 1.0（scale なし）
 */
export const SUGOROKU_STANDEE_MOBILE_SCALE_CLASS =
  "origin-bottom scale-[0.76] sm:scale-[0.9] md:scale-100";

/** 手番プレイヤー立ち絵の max 寸法（scale 適用前の layout サイズ） */
export const SUGOROKU_CURRENT_STANDEE_MAX_HEIGHT = 132;
export const SUGOROKU_CURRENT_STANDEE_MAX_WIDTH_PX = 182;
export const SUGOROKU_CURRENT_STANDEE_MAX_WIDTH_VW = 48;

/** プレイヤー名吹き出し（SP は折り返し可・幅上限あり） */
export const SUGOROKU_PLAYER_NAME_BUBBLE_CLASS =
  "inline-flex w-max max-w-[min(calc(100vw-2.5rem),148px)] sm:max-w-[min(calc(100vw-2rem),200px)] justify-center text-center text-[9px] leading-tight px-1.5 py-0.5 drop-shadow-sm whitespace-normal sm:whitespace-nowrap sm:text-[10px] sm:px-2";

/** ダイスをキャラ上に並べるときの gap（横並び廃止・全 viewport 頭上） */
export const SUGOROKU_DICE_ABOVE_CHARACTER_GAP_CLASS = "gap-0.5 sm:gap-1";

/**
 * 手番プレイヤー：ダイス＋キャラのレイアウト
 * 全 viewport でダイスはキャラの上（SP の左横配置は廃止）
 */
export const SUGOROKU_DICE_CHARACTER_CLUSTER_CLASS = `flex flex-col items-center justify-end ${SUGOROKU_DICE_ABOVE_CHARACTER_GAP_CLASS}`;

/** タクシー中も頭上（旧: 左横 fixed） */
export const SUGOROKU_DICE_CHARACTER_CLUSTER_TAXI_CLASS = SUGOROKU_DICE_CHARACTER_CLUSTER_CLASS;

/** ダイス面・合計・残りマスを横一列に（折り返し禁止） */
export const SUGOROKU_DICE_INLINE_ROW_CLASS =
  "flex w-max max-w-none flex-row flex-nowrap items-center justify-center gap-1 self-center";

/** 吹き出し内：🎲 と出目／残りマスを横並び（改行で縦積みにならない） */
export const SUGOROKU_DICE_BUBBLE_INNER_CLASS =
  "inline-flex flex-row flex-nowrap items-center gap-0.5 whitespace-nowrap leading-none tabular-nums";

/** Tailwind `md`（768px）— SP/PC の切り替えに使用 */
export const SUGOROKU_PC_MEDIA_QUERY = "(min-width: 768px)";

/**
 * 手番プレイヤー：残りマス（通常歩行 or タクシー drive 区間）
 * @param {object} p
 * @param {string|null} p.taxiPhase
 * @param {number|null} p.taxiDriveEndPos
 * @param {number|null} p.taxiJamMidPos
 * @param {number} p.smoothPos
 * @param {number} p.viewPos
 * @param {boolean} p.traveling
 * @param {number} p.remainingSteps
 */
export function resolveSugorokuTravelStepsRemaining({
  taxiPhase,
  taxiDriveEndPos,
  taxiJamMidPos,
  smoothPos,
  viewPos,
  traveling,
  remainingSteps,
}) {
  const isDriveLike =
    taxiPhase === "drive" ||
    taxiPhase === "driveBeforeJam" ||
    taxiPhase === "driveAfterJam";
  if (isDriveLike && taxiDriveEndPos != null) {
    const segmentEnd =
      taxiPhase === "driveBeforeJam" && taxiJamMidPos != null
        ? taxiJamMidPos
        : taxiDriveEndPos;
    const rem = Math.ceil(Math.abs(segmentEnd - smoothPos) - 1e-9);
    return rem > 0 ? rem : null;
  }
  if (traveling && remainingSteps > 0 && !taxiPhase) {
    return remainingSteps;
  }
  return null;
}

/** ダイス吹き出し（SP コンパクト） */
export const SUGOROKU_SIDE_DICE_BUBBLE_CLASS =
  "px-1.5 py-0.5 text-sm font-black tabular-nums sm:px-2 sm:py-1 sm:text-base";

/** 低いビューポート向けマス最小幅（SP でも先マス数を PC と揃える） */
export const SUGOROKU_TILE_ABS_MIN_W = 34;

/** PieceNearbyStack: 名前を駒と同じ scale グループ内に置く（inline 配置） */
export const SUGOROKU_NAME_ANCHOR_WITH_STANDEE = "inline";

/**
 * 手番プレイヤー立ち絵 imgStyle（characterType 倍率は BoardViewport の boardStandeePieceScale）
 */
export function sugorokuCurrentStandeeImgStyle(standeeMult = 1) {
  return {
    maxHeight: SUGOROKU_CURRENT_STANDEE_MAX_HEIGHT * standeeMult,
    width: "auto",
    maxWidth: `min(${Math.round(SUGOROKU_CURRENT_STANDEE_MAX_WIDTH_PX * standeeMult)}px, ${SUGOROKU_CURRENT_STANDEE_MAX_WIDTH_VW * standeeMult}vw)`,
  };
}
