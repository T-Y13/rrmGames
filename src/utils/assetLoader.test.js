import { describe, expect, it, beforeEach } from "vitest";
import {
  BOOT_ASSET_PRELOAD_PATHS,
  DAILY_ASSET_PRELOAD_PATHS,
  DAY8_ASSET_PRELOAD_PATHS,
  GAME_ASSET_PRELOAD_PATHS,
  resetAssetPreloadCacheForTests,
} from "./assetLoader";

describe("assetLoader preload tiers", () => {
  beforeEach(() => {
    resetAssetPreloadCacheForTests();
  });

  it("boot list stays small and excludes heavy day8/cutin art", () => {
    expect(BOOT_ASSET_PRELOAD_PATHS.length).toBeLessThanOrEqual(8);
    expect(BOOT_ASSET_PRELOAD_PATHS).toContain("/images/title_logo.png");
    expect(BOOT_ASSET_PRELOAD_PATHS).not.toContain("/images/city_seamless.png");
    expect(BOOT_ASSET_PRELOAD_PATHS).not.toContain("/images/work.png");
    expect(BOOT_ASSET_PRELOAD_PATHS).not.toContain("/images/fell_down_gambling_salaryman.png");
  });

  it("daily and day8 lists cover cutins and board heavies", () => {
    expect(DAILY_ASSET_PRELOAD_PATHS).toContain("/images/work.png");
    expect(DAILY_ASSET_PRELOAD_PATHS).toContain("/images/game_streaming.png");
    expect(DAY8_ASSET_PRELOAD_PATHS).toContain("/images/city_seamless.png");
    expect(DAY8_ASSET_PRELOAD_PATHS).toContain("/images/fell_down_gambling_salaryman.png");
  });

  it("GAME_ASSET_PRELOAD_PATHS is the union without duplicates", () => {
    const set = new Set(GAME_ASSET_PRELOAD_PATHS);
    expect(set.size).toBe(GAME_ASSET_PRELOAD_PATHS.length);
    for (const p of BOOT_ASSET_PRELOAD_PATHS) expect(set.has(p)).toBe(true);
    for (const p of DAILY_ASSET_PRELOAD_PATHS) expect(set.has(p)).toBe(true);
    for (const p of DAY8_ASSET_PRELOAD_PATHS) expect(set.has(p)).toBe(true);
  });
});
