/**
 * 8日目スロット筐体レイアウト（vector 描画用）。
 * デイリー練習の PNG 筐体は index.css の --slot-* を継続利用。
 */

export const SLOT_CABINET_VARIANT = {
  IMAGE: "image",
  VECTOR: "vector",
};

/** vector 筐体の最大幅（px） */
export const SLOT_VECTOR_FRAME_MAX_WIDTH_PX = 440;

/** リール窓帯の最小高さ（px） */
export const SLOT_VECTOR_REEL_MIN_HEIGHT_PX = 168;

/** image 筐体（レガシー）の winBox — PNG マスク座標と一致 */
export const SLOT_IMAGE_WIN_BOX_STYLE = {
  top: "var(--slot-window-top)",
  left: "var(--slot-window-left)",
  width: "var(--slot-window-width)",
  height: "var(--slot-window-height)",
};
