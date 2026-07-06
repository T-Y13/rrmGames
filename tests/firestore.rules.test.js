/**
 * Firestore セキュリティルール回帰テスト（エミュレータ必須）
 *
 * 実行: npm run test:rules:emulator
 * 前提: firebase emulators:start --only firestore（または emulators:exec）
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const PROJECT_ID = "rrm-game-rules-test";
const RULES_PATH = resolve(process.cwd(), "firestore.rules");

function baseRoom(overrides = {}) {
  return {
    hostId: "host",
    status: "playing",
    playerIds: ["host", "guest"],
    playerSlots: [
      { id: "host", name: "Host", fullId: "Host#001" },
      { id: "guest", name: "Guest", fullId: "Guest#002" },
    ],
    completedPlayers: [],
    remainingTurns: 5,
    totalPot: 1000,
    gameState: null,
    isPrivate: false,
    allowedPlayers: [],
    invitedAuthUids: [],
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

function automatedGhostGameState() {
  return {
    gamePhase: "playing",
    subPhase: "day8",
    currentPlayerIdx: 1,
    slotPhase: "idle",
    proxySlotTargetIdx: 0,
    players: [
      {
        id: "host",
        name: "Host",
        alive: true,
        movePhase: "moving",
        stats: { money: 5000, pon: 0, luck: 50, skill: 50, virtue: 50 },
      },
      {
        id: "guest",
        name: "Guest",
        alive: false,
        isGhost: true,
        movePhase: "arrived",
        slotTurnsLeft: 3,
        slotPullsThisSeat: 0,
        stats: { money: 0, pon: 0, luck: 50, skill: 50, virtue: 50 },
      },
    ],
    log: [],
  };
}

describe("firestore.rules multiplayer ghost", () => {
  /** @type {import('@firebase/rules-unit-testing').RulesTestEnvironment} */
  let testEnv;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: readFileSync(RULES_PATH, "utf8"),
        host: "127.0.0.1",
        port: 8080,
      },
    });
  });

  afterAll(async () => {
    await testEnv?.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  it("allows ghost automation lease for in-room player", async () => {
    const roomId = "ABCD12";
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), "rooms", roomId), baseRoom());
    });

    const hostDb = testEnv.authenticatedContext("host").firestore();
    const ref = doc(hostDb, "rooms", roomId);
    const expiresAt = Date.now() + 8000;
    await assertSucceeds(
      updateDoc(ref, {
        ghostAutomationLease: { holderId: "host", expiresAt },
      }),
    );
  });

  it("denies ghost automation lease for outsider", async () => {
    const roomId = "ABCD13";
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), "rooms", roomId), baseRoom());
    });

    const outsiderDb = testEnv.authenticatedContext("outsider").firestore();
    const ref = doc(outsiderDb, "rooms", roomId);
    await assertFails(
      updateDoc(ref, {
        ghostAutomationLease: { holderId: "outsider", expiresAt: Date.now() + 8000 },
      }),
    );
  });

  it("allows ghost automation turn advance by connected peer", async () => {
    const roomId = "ABCD14";
    const gs = automatedGhostGameState();
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), "rooms", roomId), baseRoom({ gameState: gs }));
    });

    const hostDb = testEnv.authenticatedContext("host").firestore();
    const ref = doc(hostDb, "rooms", roomId);
    const nextGs = {
      ...gs,
      currentPlayerIdx: 0,
      slotPhase: "idle",
      proxySlotTargetIdx: null,
      players: gs.players.map((p, i) =>
        i === 1
          ? { ...p, movePhase: "spectating", slotTurnsLeft: 0, ghostActedThisRound: true }
          : p,
      ),
    };

    await assertSucceeds(
      updateDoc(ref, {
        gameState: nextGs,
        remainingTurns: 5,
        completedPlayers: ["guest"],
      }),
    );
  });

  it("denies ghost automation when actor is alive connected player", async () => {
    const roomId = "ABCD15";
    const gs = {
      ...automatedGhostGameState(),
      currentPlayerIdx: 0,
      players: automatedGhostGameState().players.map((p) => ({ ...p, isGhost: false, alive: true })),
    };
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), "rooms", roomId), baseRoom({ gameState: gs }));
    });

    const guestDb = testEnv.authenticatedContext("guest").firestore();
    const ref = doc(guestDb, "rooms", roomId);
    await assertFails(
      updateDoc(ref, {
        gameState: { ...gs, log: ["hack"] },
      }),
    );
  });
});
