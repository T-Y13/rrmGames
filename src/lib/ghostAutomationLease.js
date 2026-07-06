import { doc, runTransaction } from "firebase/firestore";

/** ゴースト自動操作コントローラの排他リース（複数タブ／バックアップクライアント競合防止） */

export const GHOST_AUTOMATION_LEASE_MS = 8_000;

export function isGhostAutomationLeaseHeldByOther(lease, myId, now = Date.now()) {
  if (!lease || typeof lease !== "object") return false;
  const holderId = lease.holderId;
  const expiresAt = Number(lease.expiresAt);
  if (!holderId || holderId === myId) return false;
  return Number.isFinite(expiresAt) && expiresAt > now;
}

export function buildGhostAutomationLeasePatch(myId, now = Date.now()) {
  if (!myId) return null;
  return {
    ghostAutomationLease: {
      holderId: myId,
      expiresAt: now + GHOST_AUTOMATION_LEASE_MS,
    },
  };
}

/** Firestore トランザクションでリース取得／更新。 */
export async function tryAcquireGhostAutomationLease(db, roomId, myId, now = Date.now()) {
  if (!db || !roomId || !myId) return false;
  const ref = doc(db, "rooms", roomId);
  try {
    return await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(ref);
      if (!snap.exists()) return false;
      const lease = snap.data()?.ghostAutomationLease;
      if (isGhostAutomationLeaseHeldByOther(lease, myId, now)) return false;
      transaction.update(ref, buildGhostAutomationLeasePatch(myId, now));
      return true;
    });
  } catch {
    return false;
  }
}
