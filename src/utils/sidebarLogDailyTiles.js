import { PLAYER_FRAME_COLORS } from "../components/playerSidebarShared";
import { findPlayerForLogEntry } from "./sidebarLogPlayerColors";
import { parseLogEntry } from "../lib/gameLogFormat";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** @returns {number|null} */
export function extractExplicitDayFromEntry(entry) {
  const parsed = parseLogEntry(entry);
  if (parsed && typeof parsed === "object" && parsed.t !== "legacy") {
    if (parsed.t === "dayHeader" || parsed.t === "dailyBlock") return parsed.day ?? null;
    if (parsed.t === "turnHandoff") return parsed.day ?? null;
    if (parsed.t === "dayDivider" && parsed.day != null) return parsed.day;
  }
  if (!entry || typeof entry !== "string") return null;
  const banner = entry.match(/━━━\s*(\d+)日目/);
  if (banner) return parseInt(banner[1], 10);
  const turn = entry.match(/のターン（(\d+)日目）/);
  if (turn) return parseInt(turn[1], 10);
  const inline = entry.match(/(\d+)日目/);
  if (inline) return parseInt(inline[1], 10);
  return null;
}

function dayTitle(day) {
  if (day === 8) return "8日目・決戦";
  if (day === 0) return "ゲーム開始";
  return `${day}日目`;
}

/** 明示的な「N日目」が無いが 8日目フェーズの行 */
function isDay8ContextEntry(entry) {
  const parsed = parseLogEntry(entry);
  if (parsed?.t === "dailyBlock") return false;
  if (!entry || typeof entry !== "string") return false;
  if (extractExplicitDayFromEntry(entry) != null) return false;
  return /T\d+:|のスロットターン|の移動ターン|スロット開始|ゴール到着|ゴール済|代理スロット|👻|渋滞|タクシー|🎲|🚗|タイムアップ|タイムアウト|全員がゴール|Spectating|すごろく|8日目終了/.test(
    entry,
  );
}

export function playerLogStripeClass(playerGameIdx) {
  if (playerGameIdx == null || playerGameIdx < 0) return "border-slate-600";
  const frame = PLAYER_FRAME_COLORS[playerGameIdx % PLAYER_FRAME_COLORS.length];
  return frame?.activeBorder ?? "border-slate-600";
}

/**
 * ログ行から表示用テキストへ（日付・プレイヤー名の重複を除去）
 * 構造化 dailyBlock はそのまま返す（UI 側で描画）
 */
export function compactLogLine(entry, player, day) {
  const parsed = parseLogEntry(entry);
  if (parsed?.t === "dailyBlock" || parsed?.t === "dayHeader" || parsed?.t === "dayDivider" || parsed?.t === "turnHandoff") {
    return entry;
  }

  if (!entry || typeof entry !== "string") return "";
  let text = (parsed?.text ?? entry).trim();

  if (player?.name) {
    const esc = escapeRegExp(player.name);
    text = text.replace(new RegExp(`^${esc}\\s+`), "");
    text = text.replace(new RegExp(`^${esc}[:：]\\s*`), "");
    if (day != null) {
      text = text.replace(new RegExp(`^${esc}\\s+${day}日目\\s*`), "");
    }
  }

  if (day != null) {
    text = text.replace(new RegExp(`^${day}日目\\s*`), "");
  }

  text = text.replace(/^T\d+:\s*/, "");
  text = text.replace(/^\s{2,}/, "  ");

  return text.trim() || entry.trim();
}

/**
 * gs.log（新しい順）を日別タイムラインタイルへ変換
 * @returns {Array<{ day: number, title: string, showPlayerSubHeaders: boolean, sections: Array<{ playerGameIdx: number|null, playerName: string|null, stripeClass: string, entries: string[] }> }>}
 */
export function parseLogIntoDailyTiles(log, players) {
  const entries = Array.isArray(log) ? log : [];
  const playerList = Array.isArray(players) ? players : [];
  if (entries.length === 0) return [];

  const chronological = [...entries].reverse();
  let runningDay = 1;
  const tagged = [];

  for (const entry of chronological) {
    const explicit = extractExplicitDayFromEntry(entry);
    if (explicit != null) {
      runningDay = explicit;
    } else if (/8日目終了|8日目！全員|全員で交互に移動/.test(String(entry))) {
      runningDay = 8;
    } else if (isDay8ContextEntry(entry) && runningDay >= 7) {
      runningDay = 8;
    } else if (/^━━━\s*ゲーム開始/.test(String(entry))) {
      runningDay = 0;
    }

    tagged.push({ entry, day: runningDay });
  }

  /** @type {Map<number, typeof tagged>} */
  const byDay = new Map();
  for (const item of tagged) {
    if (!byDay.has(item.day)) byDay.set(item.day, []);
    byDay.get(item.day).push(item);
  }

  const sortedDays = [...byDay.keys()].sort((a, b) => b - a);

  return sortedDays.map((day) => {
    const dayEntries = byDay.get(day) ?? [];
    /** @type {Array<{ playerGameIdx: number|null, playerId: string|null, playerName: string|null, stripeClass: string, entries: string[] }>} */
    const sections = [];
    let current = null;

    for (const { entry } of dayEntries) {
      const parsed = parseLogEntry(entry);
      const matched =
        parsed?.t === "dailyBlock"
          ? playerList.find((x) => x.id === parsed.playerId) ?? { id: parsed.playerId, name: parsed.playerName }
          : findPlayerForLogEntry(typeof entry === "string" ? entry : "", playerList);
      const playerGameIdx = matched ? playerList.findIndex((x) => x.id === matched.id) : null;
      const playerId = matched?.id ?? null;

      const isGlobalHeader =
        parsed?.t === "dayHeader" || parsed?.t === "dayDivider" || parsed?.t === "turnHandoff";

      if (isGlobalHeader) {
        if (!current) {
          current = {
            playerGameIdx: null,
            playerId: null,
            playerName: null,
            stripeClass: "border-slate-600",
            entries: [],
          };
          sections.push(current);
        }
        current.entries.push(entry);
        continue;
      }

      if (matched && current?.playerId !== playerId) {
        current = {
          playerGameIdx: playerGameIdx >= 0 ? playerGameIdx : null,
          playerId,
          playerName: matched.name,
          stripeClass: playerLogStripeClass(playerGameIdx),
          entries: [],
        };
        sections.push(current);
      } else if (!current) {
        current = {
          playerGameIdx: playerGameIdx >= 0 ? playerGameIdx : null,
          playerId,
          playerName: matched?.name ?? null,
          stripeClass: playerLogStripeClass(playerGameIdx),
          entries: [],
        };
        sections.push(current);
      } else if (matched && current.playerId == null && playerId) {
        current.playerGameIdx = playerGameIdx >= 0 ? playerGameIdx : null;
        current.playerId = playerId;
        current.playerName = matched.name;
        current.stripeClass = playerLogStripeClass(playerGameIdx);
      }

      if (current) {
        current.entries.push(entry);
      } else {
        current = {
          playerGameIdx: null,
          playerId: null,
          playerName: null,
          stripeClass: "border-slate-600",
          entries: [entry],
        };
        sections.push(current);
      }
    }

    const showPlayerSubHeaders = sections.filter((s) => s.playerName).length > 1;
    const soloSection = sections.length === 1 ? sections[0] : null;
    let title = dayTitle(day);
    if (soloSection?.playerName && playerList.length <= 1) {
      title = `${title} — ${soloSection.playerName}`;
    }

    return {
      day,
      title,
      showPlayerSubHeaders,
      sections: sections.map(({ playerGameIdx, playerName, stripeClass, entries: sectionEntries }) => ({
        playerGameIdx,
        playerName,
        stripeClass,
        entries: sectionEntries,
      })),
    };
  });
}
