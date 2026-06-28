import { describe, expect, it } from "vitest";
import { formatStatChange, parseLogEntry, serializeLogEntry, buildDayHeaderEntry } from "./gameLogFormat";
import { buildDailyActionLogEntry, livingExpenseLines, ponGainLine } from "./dailyActionLog";
import { parseLogIntoDailyTiles } from "../utils/sidebarLogDailyTiles";

describe("gameLogFormat", () => {
  it("formatStatChange can include delta when requested", () => {
    expect(formatStatChange(1000, 1500, { label: "資金", unit: "G", delta: true })).toBe(
      "資金: 1000G → 1500G (+500G)",
    );
  });

  it("formatStatBrief omits delta", () => {
    expect(formatStatChange(30, 35, { label: "PON", unit: "%" })).toBe("PON: 30% → 35%");
  });

  it("round-trips structured entries", () => {
    const raw = serializeLogEntry(buildDayHeaderEntry(3));
    const parsed = parseLogEntry(raw);
    expect(parsed.t).toBe("dayHeader");
    expect(parsed.day).toBe(3);
  });
});

describe("dailyActionLog", () => {
  it("builds a daily block with action and status sections", () => {
    const entry = buildDailyActionLogEntry({
      day: 2,
      playerId: "p1",
      playerName: "太郎",
      actionType: "work",
      actionLabel: "仕事",
      actionLines: [{ cat: "money", text: "資金: 500G → 800G" }],
      statusLines: [...livingExpenseLines(800, 650, 150, false), ponGainLine(10, 16)],
    });
    const block = parseLogEntry(entry);
    expect(block.t).toBe("dailyBlock");
    expect(block.actionLines).toHaveLength(1);
    expect(block.statusLines).toHaveLength(3);
  });
});

describe("parseLogIntoDailyTiles daily blocks", () => {
  it("groups structured daily block under correct day", () => {
    const block = buildDailyActionLogEntry({
      day: 4,
      playerId: "a",
      playerName: "A",
      actionType: "stream",
      actionLabel: "雑談配信",
      outcome: "success",
      actionLines: [],
      statusLines: [],
    });
    const header = serializeLogEntry(buildDayHeaderEntry(4));
    const tiles = parseLogIntoDailyTiles([block, header], [{ id: "a", name: "A" }]);
    expect(tiles.some((t) => t.day === 4)).toBe(true);
    const day4 = tiles.find((t) => t.day === 4);
    expect(day4.sections.some((s) => s.entries.some((e) => parseLogEntry(e).t === "dailyBlock"))).toBe(
      true,
    );
  });
});
