import {
  LOG_ICONS,
  formatStatBrief,
  serializeLogEntry,
} from "./gameLogFormat";

const ACTION_META = {
  work: { icon: LOG_ICONS.work, label: "仕事" },
  stream: { icon: LOG_ICONS.stream, label: "配信" },
  shrine: { icon: LOG_ICONS.shrine, label: "神社" },
  slot: { icon: LOG_ICONS.slot, label: "デイリースロット" },
};

/**
 * 1〜7日目：1プレイヤー行動分の構造化ログブロックを組み立てる。
 * @returns {string} serialize 済み1エントリ
 */
export function buildDailyActionLogEntry({
  day,
  playerId,
  playerName,
  actionType,
  actionLabel,
  outcome = null,
  pre = [],
  actionLines = [],
  statusLines = [],
  extras = [],
  endMoney = null,
}) {
  const meta = ACTION_META[actionType] ?? { icon: "📌", label: actionType };
  /** @type {import("./gameLogFormat").DailyActionBlock} */
  const block = {
    v: 1,
    t: "dailyBlock",
    day,
    playerId,
    playerName,
    actionType,
    actionLabel: actionLabel ?? meta.label,
    actionIcon: meta.icon,
    outcome,
    pre,
    actionLines,
    statusLines,
    extras: extras.length ? extras : undefined,
    endMoney: typeof endMoney === "number" && Number.isFinite(endMoney) ? endMoney : undefined,
  };
  return serializeLogEntry(block);
}

export function amuletPreActionLine(amuletCount, luckBefore, luckAfter) {
  return {
    cat: "amulet",
    icon: LOG_ICONS.amulet,
    text: `お守り×${amuletCount} · ${formatStatBrief(luckBefore, luckAfter, { label: "運", unit: "" })}`,
  };
}

export function shrineActionLines({ moneyBefore, moneyAfter, luckBefore, luckAfter, virtueBefore, virtueAfter, ponBefore, ponAfter, gotAmulet }) {
  const lines = [
    {
      cat: "money",
      icon: LOG_ICONS.money,
      text: formatStatBrief(moneyBefore, moneyAfter, { label: "資金", unit: "G" }),
    },
    {
      cat: "stat",
      text: formatStatBrief(luckBefore, luckAfter, { label: "運", unit: "" }),
    },
    {
      cat: "stat",
      text: formatStatBrief(virtueBefore, virtueAfter, { label: "善行", unit: "" }),
    },
    {
      cat: "pon",
      icon: LOG_ICONS.pon,
      text: formatStatBrief(ponBefore, ponAfter, { label: "PON", unit: "%" }),
    },
  ];
  if (gotAmulet) {
    lines.push({ cat: "amulet", icon: LOG_ICONS.amulet, text: "お守りを入手！" });
  }
  return lines;
}

export function workActionLines({ virtueBefore, virtueAfter, moneyBefore, moneyAfter }) {
  return [
    {
      cat: "money",
      icon: LOG_ICONS.money,
      text: formatStatBrief(moneyBefore, moneyAfter, { label: "資金", unit: "G" }),
    },
    {
      cat: "stat",
      text: formatStatBrief(virtueBefore, virtueAfter, { label: "善行", unit: "" }),
    },
  ];
}

export function streamActionLines({
  streamLabel,
  failed,
  moneyBefore,
  moneyAfter,
  statLabel,
  statBefore,
  statAfter,
}) {
  const lines = [
    {
      cat: "money",
      icon: LOG_ICONS.money,
      text: formatStatBrief(moneyBefore, moneyAfter, { label: "資金", unit: "G" }),
    },
  ];
  if (!failed && statLabel != null && statBefore != null && statAfter != null) {
    lines.push({
      cat: "stat",
      text: formatStatBrief(statBefore, statAfter, { label: statLabel, unit: "" }),
    });
  }
  return { lines, label: streamLabel };
}

export function slotActionLines({ spinCount, betPerSpin, spinDetails, moneyBefore, moneyAfter, skillBefore, skillAfter }) {
  const lines = spinDetails.map(({ index, message, net, bet }) => {
    const betAmt = typeof bet === "number" ? bet : betPerSpin;
    const netStr = `${net >= 0 ? "+" : ""}${net}G`;
    return {
      cat: "money",
      icon: LOG_ICONS.money,
      text: `${index}回目 ${betAmt}G → ${message}（収支${netStr}）`,
    };
  });
  lines.push({
    cat: "money",
    icon: LOG_ICONS.money,
    text: formatStatBrief(moneyBefore, moneyAfter, { label: "資金", unit: "G" }),
  });
  lines.push({
    cat: "stat",
    text: formatStatBrief(skillBefore, skillAfter, { label: "技量", unit: "" }),
  });
  return {
    label: `技能練習 ${spinCount}回（各${betPerSpin}G）`,
    lines,
  };
}

/** @returns {import("./gameLogFormat").StructuredLogLine[]} */
export function livingExpenseLines(moneyBefore, moneyAfter, amount, inDebt) {
  return [
    {
      cat: "living",
      icon: LOG_ICONS.living,
      text: `生活費 −${amount}G`,
    },
    {
      cat: "money",
      icon: LOG_ICONS.money,
      text: `${formatStatBrief(moneyBefore, moneyAfter, { label: "資金", unit: "G" })}${inDebt ? " 【借金中】" : ""}`,
    },
  ];
}

export function rentIncomeLines(moneyBefore, moneyAfter, amount, sourceLivingCostSum, ratePct) {
  return [
    {
      cat: "rent",
      icon: "🏠",
      text: `家賃収入 +${amount}G（他プレイヤー生活費合計${sourceLivingCostSum}Gの${ratePct}%）`,
    },
    {
      cat: "money",
      icon: LOG_ICONS.money,
      text: formatStatBrief(moneyBefore, moneyAfter, { label: "資金", unit: "G" }),
    },
  ];
}

export function ponGainLine(ponBefore, ponAfter) {
  return {
    cat: "pon",
    icon: LOG_ICONS.pon,
    text: formatStatBrief(ponBefore, ponAfter, { label: "PON", unit: "%" }),
  };
}

/** @returns {import("./gameLogFormat").StructuredLogLine[]} */
export function ponFireLines(eventText) {
  return [
    { cat: "pon", icon: LOG_ICONS.pon, text: "PON発火" },
    { cat: "money", icon: LOG_ICONS.money, text: eventText },
  ];
}

export function ponNoFireLine(pon, threshold) {
  const text =
    pon >= threshold ? "PON発火なし" : `PON発火なし（あと${threshold - pon}）`;
  return { cat: "pon", icon: LOG_ICONS.pon, text };
}

export function legacyExtrasLine(text) {
  return { cat: "system", text: text.replace(/^\s+/, "") };
}
