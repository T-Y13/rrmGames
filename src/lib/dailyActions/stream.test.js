import { describe, expect, it } from "vitest";
import { BAL, CHARACTERS } from "../../constants/gameBalance";
import {
  computeStreamFailRate,
  pickStreamType,
  rollAndApplyStream,
  streamLabelForType,
} from "./stream";

describe("computeStreamFailRate", () => {
  it("returns 0 when skill+luck exceeds threshold", () => {
    expect(computeStreamFailRate({ skill: 100, luck: 60 })).toBe(0);
  });

  it("scales down from base fail rate", () => {
    const half = BAL.stream.combinedStatNoFailThreshold / 2;
    const rate = computeStreamFailRate({ skill: half, luck: 0 });
    expect(rate).toBeCloseTo(BAL.stream.baseFailRate / 2);
  });
});

describe("pickStreamType", () => {
  it("returns chat when random is low", () => {
    expect(pickStreamType(() => 0)).toBe("chat");
  });

  it("returns game when random is high", () => {
    expect(pickStreamType(() => 0.99)).toBe("game");
  });
});

describe("rollAndApplyStream", () => {
  const baseStats = { money: 1000, virtue: 30, luck: 10, skill: 40, pon: 0 };

  it("applies failure payout only", () => {
    const r = rollAndApplyStream(baseStats, CHARACTERS.salaryman, 1, {
      streamType: "chat",
      failed: true,
    });
    expect(r.outcome).toBe("failure");
    expect(r.stats.money).toBeGreaterThan(1000);
    expect(r.streamCutinStat).toBeNull();
  });

  it("applies chat virtue on success", () => {
    const r = rollAndApplyStream(baseStats, CHARACTERS.salaryman, 1, {
      streamType: "chat",
      failed: false,
      rand: () => BAL.stream.chat.virtueGainMin,
    });
    expect(r.outcome).toBe("success");
    expect(r.streamLabel).toBe(streamLabelForType("chat"));
    expect(r.stats.virtue).toBeGreaterThan(30);
  });

  it("applies game skill on success", () => {
    const r = rollAndApplyStream(baseStats, CHARACTERS.salaryman, 1, {
      streamType: "game",
      failed: false,
      rand: () => BAL.stream.game.skillGainMin,
    });
    expect(r.stats.skill).toBeGreaterThan(40);
    expect(r.streamCutinStat?.label).toBe("技量");
  });
});
