import { describe, expect, it } from "vitest";
import {
  GHOST_AUTOMATION_LEASE_MS,
  buildGhostAutomationLeasePatch,
  isGhostAutomationLeaseHeldByOther,
} from "./ghostAutomationLease";

describe("ghostAutomationLease", () => {
  it("detects lease held by another client", () => {
    const now = 1_000_000;
    expect(
      isGhostAutomationLeaseHeldByOther(
        { holderId: "other", expiresAt: now + GHOST_AUTOMATION_LEASE_MS },
        "me",
        now,
      ),
    ).toBe(true);
  });

  it("allows same holder to renew", () => {
    const now = 1_000_000;
    expect(
      isGhostAutomationLeaseHeldByOther(
        { holderId: "me", expiresAt: now + 1000 },
        "me",
        now,
      ),
    ).toBe(false);
  });

  it("builds lease patch", () => {
    const patch = buildGhostAutomationLeasePatch("me", 100);
    expect(patch.ghostAutomationLease.holderId).toBe("me");
    expect(patch.ghostAutomationLease.expiresAt).toBe(100 + GHOST_AUTOMATION_LEASE_MS);
  });
});
