import { publicAssetUrl } from "../lib/publicAssetUrl";

/**
 * 起動ゲート用（入口・ロビー・キャラ選択に必須な最小セット）。
 * 重いカットイン／すごろく背景は含めない。
 */
export const BOOT_ASSET_PRELOAD_PATHS = [
  "/images/title_logo.png",
  "/images/icon_rrm.png",
  "/images/icon_beginner_university_student.png",
  "/images/icon_gambling_salaryman.png",
  "/images/icon_ooya.png",
];

/**
 * 1〜7日目向け（ゲーム開始後に背後ロード）。
 * 仕事／配信カットイン・立ち絵・デイリースロット筐体。
 */
export const DAILY_ASSET_PRELOAD_PATHS = [
  "/images/work.png",
  "/images/work_ririmu.png",
  "/images/game_streaming.png",
  "/images/casual_chat_stream.png",
  "/images/chance_rrm.png",
  "/images/rrm_noback.png",
  "/images/ooya_noback.png",
  "/images/gambling_salaryman_noback.png",
  "/images/beginner_university_student_noback.png",
  "/images/slot-machine.png",
];

/**
 * 8日目向け（日常フェーズ中〜8日目遷移前に背後ロード）。
 * city_seamless / 転倒立ち絵などが大きい。
 */
export const DAY8_ASSET_PRELOAD_PATHS = [
  "/images/city_seamless.png",
  "/images/taxi.png",
  "/images/traffic_jam.png",
  "/images/slotRirimu.png",
  "/images/tomb.png",
  "/images/stumble_rrm.png",
  "/images/stumble_beginner_university_student.png",
  "/images/stumble_gambling_salaryman.png",
  "/images/stumble_gambling_ooya.png",
  "/images/fell_down_rrm.png",
  "/images/fell_down_beginner_university_student.png",
  "/images/fell_down_gambling_salaryman.png",
  "/images/fell_down_ooya.png",
];

/** 互換: 全プリロード対象（テスト・一覧用）。起動ゲートには使わない。 */
export const GAME_ASSET_PRELOAD_PATHS = [
  ...BOOT_ASSET_PRELOAD_PATHS,
  ...DAILY_ASSET_PRELOAD_PATHS,
  ...DAY8_ASSET_PRELOAD_PATHS,
];

const preloadedPathSet = new Set();

/** 既に成功したパスを除いて Image プリロード（再入可能） */
export function preloadImages(assetPaths, onProgress) {
  if (!Array.isArray(assetPaths) || assetPaths.length === 0) {
    return Promise.resolve([]);
  }
  const pending = assetPaths.filter((p) => p && !preloadedPathSet.has(p));
  if (pending.length === 0) {
    if (typeof onProgress === "function") {
      onProgress({ loaded: assetPaths.length, total: assetPaths.length, ratio: 1 });
    }
    return Promise.resolve(assetPaths.map((path) => ({ path, status: "cached" })));
  }

  let completed = 0;
  const total = pending.length;
  const tasks = pending.map((assetPath) => {
    return new Promise((resolve) => {
      const img = new Image();
      const done = (status) => {
        if (status === "loaded") preloadedPathSet.add(assetPath);
        completed += 1;
        if (typeof onProgress === "function") {
          onProgress({
            loaded: completed,
            total,
            ratio: total > 0 ? completed / total : 1,
          });
        }
        resolve({ path: assetPath, status });
      };
      img.onload = () => done("loaded");
      img.onerror = () => done("error");
      img.src = publicAssetUrl(assetPath);
    });
  });
  return Promise.all(tasks);
}

/** テスト用: プリロード済みキャッシュをクリア */
export function resetAssetPreloadCacheForTests() {
  preloadedPathSet.clear();
}
