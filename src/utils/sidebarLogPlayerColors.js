import { PLAYER_FRAME_COLORS } from "../components/playerSidebarShared";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** ログ1行から該当プレイヤーを推定（最長名優先） */
export function findPlayerForLogEntry(entry, players) {
  if (!entry || typeof entry !== "string" || !Array.isArray(players) || players.length === 0) {
    return null;
  }
  const sorted = [...players].filter((p) => p?.name).sort((a, b) => b.name.length - a.name.length);

  for (const p of sorted) {
    const n = p.name;
    const esc = escapeRegExp(n);
    if (new RegExp(`^${esc}[\\s　:：]`).test(entry)) return p;
    if (new RegExp(`^💬\\s*${esc}:`).test(entry)) return p;
    if (new RegExp(`^👻\\s*${esc}[\\s→]`).test(entry)) return p;
    if (new RegExp(`^🎭\\s*${esc}:`).test(entry)) return p;
    if (new RegExp(`^💀\\s*${esc}[\\s／/]`).test(entry)) return p;
    if (entry.includes(`【代理→${n}】`) || entry.includes(`→${n}の`)) return p;
    if (new RegExp(`${esc}の`).test(entry.slice(0, 48))) return p;
    if (new RegExp(`${esc}[\\s　].*スロット`).test(entry)) return p;
  }
  return null;
}

/** 直前の主行にぶら下がるインデント付きサブ行 */
function isLogContinuationLine(entry) {
  if (!entry || typeof entry !== "string") return false;
  if (/^\s{2,}/.test(entry)) return true;
  return /^  (生活費|PON|ダイス|技量|熟成|🎯|🧿|\[PON|デイリースロット)/.test(entry);
}

/**
 * 各ログ行の gameState.players 上の index（色引き当て用）。
 * 継続行は表示順で下方向（やや古い行）の最初のプレイヤー行を継承。
 */
export function assignPlayerColorIndices(entries, players) {
  const indices = entries.map((entry) => {
    const p = findPlayerForLogEntry(entry, players);
    if (!p) return null;
    const gi = players.findIndex((x) => x.id === p.id);
    return gi >= 0 ? gi : null;
  });

  for (let i = 0; i < entries.length; i++) {
    if (indices[i] != null) continue;
    if (!isLogContinuationLine(entries[i])) continue;
    for (let j = i + 1; j < entries.length; j++) {
      if (indices[j] != null) {
        indices[i] = indices[j];
        break;
      }
    }
  }

  return indices;
}

export function playerLogRowBgClass(playerGameIdx) {
  if (playerGameIdx == null || playerGameIdx < 0) return "bg-transparent";
  const frame = PLAYER_FRAME_COLORS[playerGameIdx % PLAYER_FRAME_COLORS.length];
  return frame?.activeBg ?? "bg-transparent";
}
