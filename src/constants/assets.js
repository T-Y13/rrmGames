/**
 * public/images 配下のアセットパス（先頭 /）。
 * `characterType` は CHARACTERS と対応。リリム（RRM）資産は `vtuber` と別名 `ririm` の両方で参照可能。
 */

const ICON_RRM = [
  "/images/icon_rrm.png",
  "/images/icon_rrm.webp",
  "/images/icon_rrm.jpg",
  "/images/icon_rrm.jpeg",
];

const ICON_GAMBLING_SALARYMAN = [
  "/images/icon_gambling_salaryman.png",
  "/images/icon_gambling_salaryman.webp",
  "/images/icon_gambling_salaryman.jpg",
  "/images/icon_gambling_salaryman.jpeg",
];

const STANDEE_GAMBLING_SALARYMAN_NOBACK = [
  "/images/gambling_salaryman_noback.png",
  "/images/gambling_salaryman_noback.webp",
  "/images/gambling_salaryman_noback.jpg",
  "/images/gambling_salaryman_noback.jpeg",
];

const ICON_STUDENT = [
  "/images/icon_beginner_university_student.png",
  "/images/icon_beginner_university_student.webp",
  "/images/icon_beginner_university_student.jpg",
  "/images/icon_beginner_university_student.jpeg",
];

const STANDEE_STUDENT_NOBACK = [
  "/images/beginner_university_student_noback.png",
  "/images/beginner_university_student_noback.webp",
  "/images/beginner_university_student_noback.jpg",
  "/images/beginner_university_student_noback.jpeg",
];

const STANDEE_RIRM = {
  normal: ["/images/rrm_noback.png"],
  fallen: ["/images/fell_down_rrm.png", "/images/fell_down_rrm.webp"],
  stumble: ["/images/stumble_rrm.png", "/images/stumble_rrm.webp"],
  fell_down: ["/images/fell_down_rrm.png", "/images/fell_down_rrm.webp"],
};

/** キャラ選択・一覧用アイコン（フォーマット違いは読込フォールバック用に並べる） */
export const ICONS = {
  salaryman: ICON_GAMBLING_SALARYMAN,
  student: ICON_STUDENT,
  vtuber: ICON_RRM,
  ririm: ICON_RRM,
};

/** すごろく駒・立ち絵（背景なし）。fallen は転倒・1回休みなど演出用 */
export const STANDEE = {
  salaryman: {
    normal: STANDEE_GAMBLING_SALARYMAN_NOBACK,
    fallen: [],
    stumble: ["/images/stumble_gambling_salaryman.png", "/images/stumble_gambling_salaryman.webp"],
    fell_down: ["/images/fell_down_gambling_salaryman.png", "/images/fell_down_gambling_salaryman.webp"],
  },
  student: {
    normal: STANDEE_STUDENT_NOBACK,
    fallen: [],
    stumble: ["/images/stumble_beginner_university_student.png", "/images/stumble_beginner_university_student.webp"],
    fell_down: ["/images/fell_down_beginner_university_student.png", "/images/fell_down_beginner_university_student.webp"],
  },
  vtuber: STANDEE_RIRM,
  ririm: STANDEE_RIRM,
};

/** すごろく全景背景（シームレス縦タイル・幅はビューポートに合わせる） */
const SUGOROKU_BG_SEAMLESS = [
  "/images/city_seamless.png",
  "/images/city_seamless.webp",
];

/** pc / sp で同一シームレス画像を使用（フォールバックは配列順で試行） */
export const SUGOROKU_BG = {
  pc: SUGOROKU_BG_SEAMLESS,
  sp: SUGOROKU_BG_SEAMLESS,
};

/**
 * ボード・HUD で使うタクシー車体（`public/images/taxi.png` → 論理パス `/images/taxi.png`）。
 * 表示は立ち絵と同様 `publicAssetUrl` で解決。
 */
export const TAXI_BOARD_IMAGE = "/images/taxi.png";

/** @deprecated 互換用。TaxiStandeeImage / taxi_ride_clear はこれのみ使用 */
export const TAXI_STANDEE_CASCADE = [TAXI_BOARD_IMAGE];

export const TAXI_IMAGE = TAXI_BOARD_IMAGE;

/** 渋滞カットイン（traffic_jam を最優先。taxi は車体用のみ） */
export const ASSETS = {
  taxi_congestion: [
    "/images/traffic_jam.png",
    "/images/traffic_jam.webp",
    "/images/traffic_jam.jpg",
    "/images/traffic_jam.jpeg",
  ],
  taxi_ride_clear: [TAXI_BOARD_IMAGE],
};

export function getIconCandidates(characterType) {
  const list = ICONS[characterType];
  return Array.isArray(list) ? list : [];
}

/** fallen / stumble / fell_down はファイルが無い場合でも normal へフォールバック */
export function getStandeeCascade(characterType, pose = "normal") {
  const entry = STANDEE[characterType] ?? STANDEE.salaryman;
  const normal = Array.isArray(entry.normal) ? entry.normal : [];
  const fallen = Array.isArray(entry.fallen) ? entry.fallen : [];
  if (pose === "normal") return [...normal];
  if (pose === "fallen") return [...fallen, ...normal];
  if (pose === "stumble") {
    const stumble = Array.isArray(entry.stumble) ? entry.stumble : [];
    return [...stumble, ...normal];
  }
  if (pose === "fell_down") {
    const fd = Array.isArray(entry.fell_down) ? entry.fell_down : [];
    return [...fd, ...fallen, ...normal];
  }
  return [...normal];
}

/** タクシー車体の読み込み候補（立ち絵の getStandeeCascade と同じ用途） */
export function getTaxiStandeeCascade() {
  return [...TAXI_STANDEE_CASCADE];
}
