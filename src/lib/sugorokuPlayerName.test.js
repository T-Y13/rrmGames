import { describe, expect, it } from "vitest";
import { sugorokuPlayerName } from "./sugorokuPlayerName";

describe("sugorokuPlayerName", () => {
  it("strips #tag suffix", () => {
    expect(sugorokuPlayerName("闇月リリム#4821")).toBe("闇月リリム");
  });

  it("keeps plain names", () => {
    expect(sugorokuPlayerName("ゲーマー42")).toBe("ゲーマー42");
  });

  it("handles empty", () => {
    expect(sugorokuPlayerName("")).toBe("");
    expect(sugorokuPlayerName(null)).toBe("");
  });
});
