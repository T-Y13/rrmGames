import { describe, expect, it } from "vitest";
import {
  DAILY_CUTIN_PHASE,
  DAILY_CUTIN_SYNC_DEFAULTS,
  buildDailyCutinSessionId,
  dailyCutinPhaseDurationMs,
  dailyCutinSpectatorStatusLabel,
  isDailyCutinBroadcastStale,
  readDailyCutinBroadcast,
  shouldEnableDailyCutinSpectatorSync,
} from "./dailyCutinSync";

describe("dailyCutinSync", () => {
  it("exposes idle defaults", () => {
    expect(DAILY_CUTIN_SYNC_DEFAULTS.dailyCutinPhase).toBe("idle");
    expect(DAILY_CUTIN_SYNC_DEFAULTS.dailyCutinSessionId).toBeNull();
  });

  it("builds unique session ids", () => {
    const a = buildDailyCutinSessionId();
    const b = buildDailyCutinSessionId();
    expect(a).not.toBe(b);
    expect(a.length).toBeGreaterThan(8);
  });

  it("formats spectator status labels", () => {
    expect(dailyCutinSpectatorStatusLabel(DAILY_CUTIN_PHASE.work, "A")).toBe("Aが仕事中…");
    expect(dailyCutinSpectatorStatusLabel(DAILY_CUTIN_PHASE.streamPon, "B")).toBe("Bの配信で炎上…");
    expect(dailyCutinSpectatorStatusLabel("idle", "A")).toBeNull();
  });

  it("uses hand-tuned phase durations", () => {
    expect(dailyCutinPhaseDurationMs(DAILY_CUTIN_PHASE.work)).toBe(2000);
    expect(dailyCutinPhaseDurationMs(DAILY_CUTIN_PHASE.streamFail)).toBe(3200);
    expect(dailyCutinPhaseDurationMs("idle")).toBe(0);
  });

  it("reads room-level cutin broadcast with gameState fallback", () => {
    const room = {
      dailyCutinPhase: DAILY_CUTIN_PHASE.shrine,
      dailyCutinSessionId: "room-s1",
      dailyCutinPayload: { subPhase: "in" },
    };
    const gs = {
      dailyCutinPhase: DAILY_CUTIN_PHASE.work,
      dailyCutinSessionId: "gs-s1",
      dailyCutinPayload: null,
    };
    expect(readDailyCutinBroadcast(room, gs)).toEqual({
      phase: "shrine",
      sessionId: "room-s1",
      payload: { subPhase: "in" },
    });
    expect(readDailyCutinBroadcast(null, gs).phase).toBe("work");
  });

  it("ignores stale gameState cutin when room broadcast is explicitly idle", () => {
    const room = { dailyCutinPhase: DAILY_CUTIN_PHASE.idle };
    const gs = {
      dailyCutinPhase: DAILY_CUTIN_PHASE.stream,
      dailyCutinSessionId: "stale",
      dailyCutinPayload: { mode: "chat" },
    };
    expect(readDailyCutinBroadcast(room, gs)).toEqual({
      phase: "idle",
      sessionId: "",
      payload: null,
    });
  });

  it("ignores cutin broadcast outside daily subPhase", () => {
    const room = {
      dailyCutinPhase: DAILY_CUTIN_PHASE.work,
      dailyCutinSessionId: "123-work",
      dailyCutinPayload: { gold: 100 },
    };
    const gs = { subPhase: "day8" };
    expect(readDailyCutinBroadcast(room, gs).phase).toBe("idle");
  });

  it("keeps cutin spectator sync off while operator awaits optimistic daily write", () => {
    expect(
      shouldEnableDailyCutinSpectatorSync({
        isDailyPhase: true,
        isMultiplayerRoom: true,
        isMyTurn: false,
        showDailySlotSpectatorMirror: false,
        operatorPendingDailyCutinSession: true,
      }),
    ).toBe(false);
    expect(
      shouldEnableDailyCutinSpectatorSync({
        isDailyPhase: true,
        isMultiplayerRoom: true,
        isMyTurn: false,
        showDailySlotSpectatorMirror: false,
        operatorPendingDailyCutinSession: false,
      }),
    ).toBe(true);
  });

  it("detects stale cutin sessions by timestamp prefix", () => {
    const oldSid = `${Date.now() - 120000}-abc`;
    expect(
      isDailyCutinBroadcastStale({ phase: DAILY_CUTIN_PHASE.work, sessionId: oldSid }, 45000),
    ).toBe(true);
    const freshSid = `${Date.now()}-abc`;
    expect(
      isDailyCutinBroadcastStale({ phase: DAILY_CUTIN_PHASE.work, sessionId: freshSid }, 45000),
    ).toBe(false);
  });
});
