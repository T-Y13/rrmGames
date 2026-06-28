import { describe, it, expect } from "vitest";
import { computeProgressivePotDelta } from "../lib/progressivePot.js";

describe("computeProgressivePotDelta", () => {
  it("adds 20% of bet to pot on non-jackpot spins", () => {
    expect(computeProgressivePotDelta(100, 500, false)).toEqual({
      totalPot: 200,
      potPayout: 0,
      contribution: 100,
    });
  });

  it("awards accumulated pot plus this spin contribution on jackpot and resets", () => {
    expect(computeProgressivePotDelta(250, 1000, true)).toEqual({
      totalPot: 0,
      potPayout: 450,
      contribution: 200,
    });
  });

  it("includes initial 1000G pot on first jackpot win", () => {
    expect(computeProgressivePotDelta(1000, 100, true)).toEqual({
      totalPot: 0,
      potPayout: 1020,
      contribution: 20,
    });
  });

  it("starts from zero when room has no totalPot field", () => {
    expect(computeProgressivePotDelta(undefined, 100, false)).toEqual({
      totalPot: 20,
      potPayout: 0,
      contribution: 20,
    });
  });
});
