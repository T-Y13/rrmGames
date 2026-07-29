import { publicAssetUrl } from "../lib/publicAssetUrl";

export const GAME_ASSET_PRELOAD_PATHS = [
  // UI / System
  "/images/title_logo.png",
  "/images/taxi.png",
  "/images/slot-machine.png",
  "/images/traffic_jam.png",
  "/images/sugoroku_bg_pc.png",
  "/images/sugoroku_bg_sp.png",
  "/images/city_seamless.png",
  // Character Icons
  "/images/icon_rrm.png",
  "/images/icon_beginner_university_student.png",
  "/images/icon_gambling_salaryman.png",
  "/images/icon_ooya.png",
  // Actions / Events
  "/images/work.png",
  "/images/work_ririmu.png",
  "/images/game_streaming.png",
  "/images/casual_chat_stream.png",
  "/images/stumble_rrm.png",
  "/images/stumble_beginner_university_student.png",
  "/images/stumble_gambling_salaryman.png",
  "/images/fell_down_rrm.png",
  "/images/fell_down_beginner_university_student.png",
  "/images/fell_down_gambling_salaryman.png",
  "/images/stumble_gambling_ooya.png",
  "/images/fell_down_ooya.png",
  // Ririmu Special
  "/images/chance_rrm.png",
  "/images/rrm_noback.png",
  "/images/ooya_noback.png",
];

export function preloadImages(assetPaths, onProgress) {
  if (!Array.isArray(assetPaths) || assetPaths.length === 0) {
    return Promise.resolve([]);
  }
  let completed = 0;
  const total = assetPaths.length;
  const tasks = assetPaths.map((assetPath) => {
    return new Promise((resolve) => {
      const img = new Image();
      const done = (status) => {
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
