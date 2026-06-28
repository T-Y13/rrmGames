import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/** Name#1234 → Firebase Auth UID（ホストが招待通知を送るための索引） */
export async function registerFullIdIndex(fullId, uid) {
  if (!fullId || !uid) return;
  await setDoc(
    doc(db, "fullIdIndex", fullId),
    { uid, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function resolveInviteeUid(fullId) {
  if (!fullId) return null;
  const snap = await getDoc(doc(db, "fullIdIndex", fullId));
  if (!snap.exists()) return null;
  const uid = snap.data()?.uid;
  return typeof uid === "string" && uid.length > 0 ? uid : null;
}

/** ホスト: allowedPlayers に加え、相手 UID が分かれば invitedAuthUids も更新 */
export function buildInviteRoomPatch(invFullId, inviteeUid) {
  const patch = { allowedPlayers: arrayUnion(invFullId) };
  if (inviteeUid) {
    patch.invitedAuthUids = arrayUnion(inviteeUid);
  }
  return patch;
}

/** ゲストの招待受信箱にルームIDを追加（list クエリ不要） */
export async function pushInviteInbox(inviteeUid, roomId) {
  if (!inviteeUid || !roomId) return;
  await setDoc(
    doc(db, "inviteInbox", inviteeUid),
    { roomIds: arrayUnion(roomId), updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function removeInviteFromInbox(uid, roomId) {
  if (!uid || !roomId) return;
  try {
    await updateDoc(doc(db, "inviteInbox", uid), { roomIds: arrayRemove(roomId) });
  } catch (_) {
    /* 未作成の受信箱は無視 */
  }
}

export async function fetchInviteInboxRoomIds(uid) {
  if (!uid) return [];
  const snap = await getDoc(doc(db, "inviteInbox", uid));
  if (!snap.exists()) return [];
  const ids = snap.data()?.roomIds;
  return Array.isArray(ids) ? ids.filter((id) => typeof id === "string" && id.length > 0) : [];
}

/** ホスト: 未参加の招待を取り消し（allowedPlayers / invitedAuthUids から除外） */
export async function buildCancelInvitePatch(roomData, cancelFullId) {
  if (!roomData || !cancelFullId) return null;
  const allowed = roomData.allowedPlayers ?? [];
  if (!allowed.includes(cancelFullId)) return null;

  const nextAllowed = allowed.filter((fid) => fid !== cancelFullId);
  if (nextAllowed.length === allowed.length) return null;

  const patch = { allowedPlayers: nextAllowed };
  const inviteeUid = await resolveInviteeUid(cancelFullId);
  const invited = roomData.invitedAuthUids ?? [];
  if (inviteeUid && invited.includes(inviteeUid)) {
    patch.invitedAuthUids = invited.filter((id) => id !== inviteeUid);
  }
  return { patch, inviteeUid };
}

/** allowedPlayers 済みだが invitedAuthUids 未登録の UID を補完 */
export async function backfillInvitedAuthUids(roomData, roomId) {
  const allowed = roomData?.allowedPlayers ?? [];
  const existing = new Set(roomData?.invitedAuthUids ?? []);
  const uidsToAdd = [];

  for (const fullId of allowed) {
    if (typeof fullId !== "string" || !fullId.includes("#")) continue;
    const uid = await resolveInviteeUid(fullId);
    if (uid && !existing.has(uid)) uidsToAdd.push(uid);
  }

  if (uidsToAdd.length === 0) return { patch: null, uidsToAdd: [] };
  return {
    patch: { invitedAuthUids: arrayUnion(...uidsToAdd) },
    uidsToAdd,
  };
}
