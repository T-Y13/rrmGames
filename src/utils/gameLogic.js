import {
  BAL,
  BOARD_GOAL,
  CHARACTERS,
  LAST_DAILY_DAY,
  SLOT_COST,
  SLOT_MACHINES,
  QUICK_NAMES,
  TILE_EFFECT_KIND,
} from "../constants/gameBalance";

/** Firestore が Timestamp で返した場合にも ms で比較する */
export function toEpochMsMaybe(v) {
  if (v == null || v === "") return NaN;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "object") {
    if (typeof v.toMillis === "function") return v.toMillis();
    const s = v.seconds ?? v._seconds;
    if (typeof s === "number")
      return s * 1000 + Math.floor((v.nanoseconds ?? v._nanoseconds ?? 0) / 1e6);
  }
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

export function portraitUrlFromFullId(seed) {
  const s = encodeURIComponent(String(seed ?? "guest").slice(0, 80));
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${s}&backgroundColor=transparent`;
}

export const clamp = (v, lo = 0, hi = 999999) => Math.max(lo, Math.min(hi, v));
export const clampMoney = (v) => Math.round(Math.max(-999999999, Math.min(999999999, v)));
export const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

/** BoardViewport と同じステップ間隔で、from→to のホップが収束するまでのおおよその時間（ms） */
export function estimateSugorokuHopDurationMs(fromPos, toPos) {
  const diff = toPos - fromPos;
  const steps = Math.min(Math.abs(diff), 20);
  const msPerStep = Math.abs(diff) > 6 ? 110 : 360;
  return Math.max(0, steps * msPerStep);
}

export const prependLogs = (newEntries, existing = []) =>
  [...newEntries.slice().reverse(), ...existing].slice(0, 30);

export const genRoomId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[rand(0, chars.length - 1)]).join("");
};

export const genQuickName = () =>
  QUICK_NAMES[Math.floor(Math.random() * QUICK_NAMES.length)] + Math.floor(10 + Math.random() * 89);

export function dailyLivingCostFor(characterType) {
  const c = CHARACTERS[characterType] ?? CHARACTERS.salaryman;
  return c.dailyLivingCost ?? BAL.living.dailyCost;
}

export function livingCostForPlayer(pl) {
  const lc = pl?.stats?.livingCost;
  if (typeof lc === "number" && Number.isFinite(lc) && lc >= 0) return lc;
  return dailyLivingCostFor(pl?.characterType);
}

/** 待機室ゲージ用：キャラ補正込みの各項目最小〜最大（roll 0〜5 が達しうる範囲） */
export function initialStatGaugeRanges(charType) {
  const char = CHARACTERS[charType] ?? CHARACTERS.salaryman;
  const lb = char.luckBonus ?? 0;
  const sb = char.skillBonus ?? 0;
  const vb = char.virtueBonus ?? 0;
  const pb = char.ponBonus ?? 0;
  const livingDelta = (char.dailyLivingCost ?? BAL.living.dailyCost) - 300;
  return {
    luck: { min: lb, max: 10 + lb },
    skill: { min: 30 + sb, max: 55 + sb },
    virtue: { min: 30 + vb, max: 70 + vb },
    pon: { min: pb, max: 50 + pb },
    livingCost: { min: 200 + livingDelta, max: 450 + livingDelta },
  };
}

/** 待機室 UI 用：キャラに依存しない共通スケール（全キャラの可取りうる値の包絡） */
export function lobbyFixedGaugeRanges() {
  const keys = Object.keys(CHARACTERS);
  if (keys.length === 0) {
    return initialStatGaugeRanges("salaryman");
  }
  const ranges = keys.map((k) => initialStatGaugeRanges(k));
  const span = (pick) => ({
    min: Math.min(...ranges.map((r) => r[pick].min)),
    max: Math.max(...ranges.map((r) => r[pick].max)),
  });
  return {
    luck: span("luck"),
    skill: span("skill"),
    virtue: span("virtue"),
    pon: span("pon"),
    livingCost: span("livingCost"),
  };
}

/** 善行ダイス 0〜5 に対応する加算テーブル（最終 Virtue の一部） */
export const VIRTUE_BY_INITIAL_ROLL = [10, 18, 26, 34, 42, 50];

/** 運・技量・善行・PON だけ独立ダイス（各 0〜5）。生活費はこれらから導出 */
export function rollInitialRolls() {
  return {
    luck: Math.floor(Math.random() * 6),
    skill: Math.floor(Math.random() * 6),
    virtue: Math.floor(Math.random() * 6),
    pon: Math.floor(Math.random() * 6),
  };
}

export function livingRollFromInitialRolls(initialRolls) {
  return Math.floor((initialRolls.luck + initialRolls.skill + initialRolls.virtue) / 3);
}

/**
 * ロビー raw ダイス + キャラタイプ → ゲーム用の最終5値。
 * キャラ補正（luckBonus / skillBonus / virtueBonus / ponBonus / 生活費オフセット）はここでのみ加算する。
 */
export function computeFinalStatsFromInitialRolls(initialRolls, characterType) {
  const char = CHARACTERS[characterType] ?? CHARACTERS.salaryman;
  const lr = initialRolls.luck;
  const sr = initialRolls.skill;
  const vr = initialRolls.virtue;
  const pr = initialRolls.pon;

  const luckBase = lr * 2;
  const skillBase = 30 + sr * 5;
  const virtueBase = 20 + VIRTUE_BY_INITIAL_ROLL[vr];
  const ponBase = pr * 10;
  const livingRoll = livingRollFromInitialRolls(initialRolls);
  const livingBase = 200 + livingRoll * 50;

  const luck = clamp(luckBase + (char.luckBonus ?? 0), 0, 999999);
  const skill = clamp(skillBase + (char.skillBonus ?? 0), 0, 2000);
  const virtue = clamp(virtueBase + (char.virtueBonus ?? 0), 0, 999999);
  const pon = clamp(ponBase + (char.ponBonus ?? 0), 0, 999999);
  const livingCost = Math.max(
    50,
    livingBase + ((char.dailyLivingCost ?? BAL.living.dailyCost) - 300),
  );

  return { luck, skill, virtue, pon, livingCost };
}

/**
 * 待機室での初期ステータス抽選（従来API）。内部で raw ダイス → キャラで最終値を組み立てる。
 */
export function rollInitialStats(charType) {
  const raw = rollInitialRolls();
  const final = computeFinalStatsFromInitialRolls(raw, charType);
  const livingRoll = livingRollFromInitialRolls(raw);
  return {
    ...final,
    luckRoll: raw.luck,
    skillRoll: raw.skill,
    virtueRoll: raw.virtue,
    ponRoll: raw.pon,
    livingRoll,
  };
}

/** ゲーム開始時フォールバック：その場で raw を振り直して最終値だけ返す */
export function rollSlotInitialStatsForGameStart(charKey) {
  return computeFinalStatsFromInitialRolls(rollInitialRolls(), charKey ?? "salaryman");
}

/**
 * Firestore `playerSlots[].initialRolls` を検証（キャラ非依存の raw 0〜5 のみ）
 */
export function normalizeSlotInitialRolls(raw) {
  if (!raw || typeof raw !== "object") return null;
  const toDie = (v) => {
    const n = Number(v);
    if (!Number.isFinite(n)) return null;
    const i = Math.round(n);
    if (i < 0 || i > 5) return null;
    return i;
  };
  const luck = toDie(raw.luck);
  const skill = toDie(raw.skill);
  const virtue = toDie(raw.virtue);
  const pon = toDie(raw.pon);
  if (luck == null || skill == null || virtue == null || pon == null) return null;
  return { luck, skill, virtue, pon };
}

/**
 * Firestore `playerSlots[].initialStats` を検証し、makePlayer に渡せる5値だけにする。
 * 後方互換：旧ロビーで保存された「補正込み最終値」用。
 */
export function normalizeSlotInitialStats(raw) {
  if (!raw || typeof raw !== "object") return null;
  const luck = Number(raw.luck);
  const skill = Number(raw.skill);
  const virtue = Number(raw.virtue);
  const pon = Number(raw.pon);
  const livingCost = Number(raw.livingCost);
  if (![luck, skill, virtue, pon, livingCost].every((n) => Number.isFinite(n))) return null;
  return { luck, skill, virtue, pon, livingCost };
}

export function virtueMinRoll(virtue) {
  if (virtue >= 100) return 4;
  if (virtue >= 70) return 3;
  if (virtue >= 50) return 2;
  return 1;
}

export function rollDie(stats) {
  const minVal = virtueMinRoll(stats.virtue);
  const useAdv = stats.luck >= 80;
  const a = rand(minVal, 6);
  if (useAdv) {
    const b = rand(minVal, 6);
    return { value: a + b, rolls: [a, b], advantage: true };
  }
  return { value: a, rolls: [a], advantage: false };
}

/** student（ビギナーズラック）：ハズレ −8pt 分を JP+2%・大当+3%・小役+3% へ（合計100%を維持） */
const STUDENT_SLOT_LUCK_DELTA = { jp: 0.02, big: 0.03, small: 0.03 };

export function calcSlotRates(stats, machine, heat = 0, characterType = null) {
  const { baseRates: br } = machine;
  const S = BAL.slot;
  let jp = br.jp;
  let big = br.big;
  let mid = br.mid;
  let atari = br.atari;
  let small = br.small;
  let miss = 1 - (jp + big + mid + atari + small);

  const skEx = Math.max(0, stats.skill - S.skillBaseline);
  const skillBlocks = skEx >= S.skillBlockSize ? Math.floor(skEx / S.skillBlockSize) : 0;
  const lkEx = Math.max(0, stats.luck - S.luckBaseline);
  const luckFrac = S.luckRefSpan > 0 ? lkEx / S.luckRefSpan : 0;

  let skillMissReduced = 0;
  const skillWant = skillBlocks * S.skillMissReducePerBlock;
  if (skillWant > 0 && miss > 0) {
    skillMissReduced = Math.min(skillWant, miss);
    miss -= skillMissReduced;
    mid += skillMissReduced * S.skillToMid;
    atari += skillMissReduced * S.skillToAtari;
    small += skillMissReduced * S.skillToSmall;
  }

  let luckConverted = 0;
  let luckDrainAtari = 0;
  let luckDrainSmall = 0;
  if (luckFrac > 0) {
    const wantAtari = S.luckAtariDrainAtLuck100 * luckFrac;
    const wantSmall = S.luckSmallDrainAtLuck100 * luckFrac;
    luckDrainAtari = Math.min(wantAtari, atari);
    luckDrainSmall = Math.min(wantSmall, small);
    luckConverted = luckDrainAtari + luckDrainSmall;
    if (luckConverted > 0) {
      atari -= luckDrainAtari;
      small -= luckDrainSmall;
      jp += luckConverted * S.luckToJp;
      big += luckConverted * S.luckToBig;
    }
  }

  let heatMissReduced = 0;
  const heatWant = heat * S.heatTransferPerSpin;
  if (heatWant > 0 && miss > 0) {
    heatMissReduced = Math.min(heatWant, miss);
    miss -= heatMissReduced;
    jp += heatMissReduced * S.heatWeightJp;
    big += heatMissReduced * S.heatWeightBig;
    mid += heatMissReduced * S.heatWeightMid;
    atari += heatMissReduced * S.heatWeightAtari;
  }

  const sumWin = jp + big + mid + atari + small;
  miss = Math.max(0, 1 - sumWin);

  if (characterType === "student") {
    jp += STUDENT_SLOT_LUCK_DELTA.jp;
    big += STUDENT_SLOT_LUCK_DELTA.big;
    small += STUDENT_SLOT_LUCK_DELTA.small;
    const adjSumWin = jp + big + mid + atari + small;
    miss = Math.max(0, 1 - adjSumWin);
  }

  return {
    jp,
    big,
    mid,
    atari,
    small,
    miss,
    skillMissReduced,
    luckConverted,
    luckDrainAtari,
    luckDrainSmall,
    heatMissReduced,
    heat,
  };
}

/** デイリースロット（技能練習）：ミス以外なら成功（参加費返却＋技量ボーナス対象） */
export function isDailySlotTrainingWin(slotResult) {
  return Boolean(slotResult && slotResult.tier && slotResult.tier !== "miss");
}

/** 善行に応じたスロット天井（当たり/ハズレ問わず同一回数到達で次スピン強制救済） */
export function slotPityMaxThreshold(virtue) {
  const v = Number(virtue) || 0;
  return Math.max(10, 15 - Math.floor(v / 20));
}

/** 仕事・配信の資金へ掛ける倍率: 1 + virtue×0.2/100（スロット配当には非適用） */
export function virtueIncomeMult(virtue) {
  return 1 + ((Number(virtue) || 0) * 0.2) / 100;
}

export function applyVirtueIncomeBoost(baseReward, virtue) {
  return Math.round(Number(baseReward) * virtueIncomeMult(virtue));
}

/** 神社お守り抽選: baseRate × (1 + virtue/100)、上限1 */
export function shrineAmuletDropChance(virtue, baseRate) {
  const b = Number(baseRate);
  if (!(b > 0)) return 0;
  return Math.min(1, b * (1 + (Number(virtue) || 0) / 100));
}

function rollWinTierFromRates(r, roll01) {
  const winSum = r.jp + r.big + r.mid + r.atari + r.small;
  if (!(winSum > 0)) return "small";
  let x = roll01 * winSum;
  if (x < r.jp) return "jackpot";
  x -= r.jp;
  if (x < r.big) return "big";
  x -= r.big;
  if (x < r.mid) return "mid";
  x -= r.mid;
  if (x < r.atari) return "atari";
  return "small";
}

function buildSlotSpinResult(tier, ctx) {
  const { machine, bp, sym, r, bet, machineKey, pay, pityCounterAfter, pityForced, maxPity } = ctx;
  const meta = { r, bet, machineKey, pityCounterAfter, pityForced, maxPity };
  switch (tier) {
    case "miss":
      return {
        tier: "miss",
        payout: 0,
        message: "ハズレ…",
        reels: rollMissReelTriple(machine),
        ...meta,
      };
    case "jackpot":
      return {
        tier: "jackpot",
        payout: pay(bp.jackpot),
        message: "🎰 777 JACKPOT!! 超大当たり！",
        reels: [sym[0], sym[0], sym[0]],
        ...meta,
      };
    case "big":
      return {
        tier: "big",
        payout: pay(bp.big),
        message: "💎 大当たり！！",
        reels: ["💎", "💎", "💎"],
        ...meta,
      };
    case "mid":
      return {
        tier: "mid",
        payout: pay(bp.mid),
        message: "⭐ 中当たり！",
        reels: ["⭐", "⭐", "⭐"],
        ...meta,
      };
    case "atari":
      return {
        tier: "atari",
        payout: pay(bp.atari),
        message: "🔔 当たり！",
        reels: ["🔔", "🔔", "🔔"],
        ...meta,
      };
    default:
      return {
        tier: "small",
        payout: pay(bp.small),
        message: "🍒 小当たり",
        reels: ["🍒", "🍒", "🍒"],
        ...meta,
      };
  }
}

/**
 * ハズレ用の視覚3リール。
 * `[rng,rng,rng]` のように独立抽選すると、たまたま3つそろって「的中っぽい」のにハズレ扱いになりがちなので除外する。
 */
function rollMissReelTriple(machine) {
  const sym = machine?.symbols ?? [];
  if (!sym.length) return ["?", "?", "?"];
  if (sym.length === 1) return [sym[0], sym[0], sym[0]];
  for (let g = 0; g < 64; g++) {
    const a = sym[rand(0, sym.length - 1)];
    const b = sym[rand(0, sym.length - 1)];
    const c = sym[rand(0, sym.length - 1)];
    if (!(a === b && b === c)) return [a, b, c];
  }
  const x = sym[rand(0, sym.length - 1)];
  const dif = sym.filter((s) => s !== x);
  const y = dif[rand(0, dif.length - 1)];
  const z = sym[rand(0, sym.length - 1)];
  return [x, z, y];
}

export function spinSlot(
  stats,
  bet = SLOT_COST,
  machineKey = "standard",
  heat = 0,
  characterType = null,
  pityOpts = null,
) {
  const machine = SLOT_MACHINES[machineKey] ?? SLOT_MACHINES.standard;
  const { basePayout: bp, symbols: sym } = machine;
  const r = calcSlotRates(stats, machine, heat, characterType);
  if (import.meta.env.DEV && typeof console !== "undefined" && console.log) {
    const Ss = BAL.slot;
    console.log(
      `[スロット確率] 技量によりハズレを${(r.skillMissReduced * 100).toFixed(2)}%削減（${Ss.skillBaseline}超え満${Ss.skillBlockSize}点ごと${(Ss.skillMissReducePerBlock * 100).toFixed(1)}%×中${(Ss.skillToMid * 100).toFixed(0)}%・当${(Ss.skillToAtari * 100).toFixed(0)}%・小${(Ss.skillToSmall * 100).toFixed(0)}%配分） / ` +
        `運により当−${(r.luckDrainAtari * 100).toFixed(2)}%・小−${(r.luckDrainSmall * 100).toFixed(2)}%（計${(r.luckConverted * 100).toFixed(2)}%）をJP30%・大70%へ / ` +
        `熟成でハズレを${(r.heatMissReduced * 100).toFixed(2)}%削減 → ` +
        `JP ${(r.jp * 100).toFixed(2)}% ハズレ ${(r.miss * 100).toFixed(2)}%`,
    );
  }

  const pityCounterBefore = pityOpts?.pityCounter ?? 0;
  const maxPity = slotPityMaxThreshold(stats?.virtue);
  const pityForced = pityCounterBefore >= maxPity;
  let ratesForRoll = r;

  // 天井発動スピン：ハズレ率を 0% にして、削れた miss を当たり各役へ比率再配分
  if (pityForced && r.miss > 0) {
    const winSum = r.jp + r.big + r.mid + r.atari + r.small;
    if (winSum > 0) {
      const bonus = r.miss;
      ratesForRoll = {
        ...r,
        miss: 0,
        jp: r.jp + bonus * (r.jp / winSum),
        big: r.big + bonus * (r.big / winSum),
        mid: r.mid + bonus * (r.mid / winSum),
        atari: r.atari + bonus * (r.atari / winSum),
        small: r.small + bonus * (r.small / winSum),
      };
    } else {
      ratesForRoll = { ...r, miss: 0, small: 1 };
    }
  }

  const scale = bet / SLOT_COST;
  const pay = (base) => Math.round(base * scale);

  let tier;
  if (pityForced) {
    tier = rollWinTierFromRates(ratesForRoll, Math.random());
  } else {
    const roll = Math.random();
    let acc = ratesForRoll.miss;
    if (roll < acc) tier = "miss";
    else {
      acc += ratesForRoll.jp;
      if (roll < acc) tier = "jackpot";
      else {
        acc += ratesForRoll.big;
        if (roll < acc) tier = "big";
        else {
          acc += ratesForRoll.mid;
          if (roll < acc) tier = "mid";
          else {
            acc += ratesForRoll.atari;
            tier = roll < acc ? "atari" : "small";
          }
        }
      }
    }
  }

  const pityCounterAfter = pityForced ? 0 : pityCounterBefore + 1;
  return buildSlotSpinResult(tier, {
    machine,
    bp,
    sym,
    r: ratesForRoll,
    bet,
    machineKey,
    pay,
    pityCounterAfter,
    pityForced,
    maxPity,
  });
}

/**
 * スロット「リーチ」演出フラグ。
 * spinSlot の結果 tier と、演出用に組み替え後の視覚リールのみで決まる。
 * （当選確率・払い戻しとは独立 — UI とアニメーション専用。）
 */
export function getSlotReachAnimationState(visualReels, tier) {
  if (!Array.isArray(visualReels) || visualReels.length !== 3) return { reachPossible: false };
  const a = visualReels[0];
  const b = visualReels[1];
  const c = visualReels[2];
  if (a !== b) return { reachPossible: false };
  const reachWin = ["jackpot", "big", "mid"].includes(tier);
  const reachTease = tier === "miss" && a !== c;
  return { reachPossible: reachWin || reachTease };
}

/** リーチ確定後に「チャンス！」カットイン画像を見せるか。50%。当否とは無関係。 */
export function rollReachCutInDisplay() {
  return Math.random() < 0.5;
}

export function stripTripleForMiddleColumn(middleSym, machine, columnIndex) {
  const sym = machine.symbols;
  if (!sym.length) return [middleSym, middleSym, middleSym];
  let idx = sym.indexOf(middleSym);
  if (idx < 0) idx = 0;
  const len = sym.length;
  const prev = sym[(idx - 1 + len) % len];
  const next = sym[(idx + 1) % len];
  const prev2 = sym[(idx - 2 + len) % len];
  const next2 = sym[(idx + 2) % len];
  const mid = sym[idx];
  const mode = ((columnIndex % 3) + 3) % 3;
  if (mode === 0) return [prev, mid, next];
  if (mode === 1) return [next, mid, prev];
  return [prev2, mid, next2];
}

export function randomStripTriple(machine) {
  const sym = machine.symbols;
  return [sym[rand(0, sym.length - 1)], sym[rand(0, sym.length - 1)], sym[rand(0, sym.length - 1)]];
}

export function pickWrongSymbol(correct, machine) {
  const diff = machine.symbols.filter((s) => s !== correct);
  if (!diff.length) return correct;
  return diff[rand(0, diff.length - 1)];
}

export function makePlayer(name, id, characterType, initialStats = null) {
  const char = CHARACTERS[characterType] ?? CHARACTERS.salaryman;
  const startMoney = clampMoney(char.startingMoney ?? BAL.startingMoney);
  if (initialStats && typeof initialStats === "object") {
    return {
      id,
      name,
      characterType,
      streamMultiplier: char.streamMultiplier,
      stats: {
        luck: clamp(initialStats.luck, 0, 999999),
        skill: clamp(initialStats.skill, 0, 2000),
        pon: clamp(initialStats.pon, 0, 999999),
        virtue: clamp(initialStats.virtue, 0, 999999),
        livingCost: Math.max(50, Math.floor(Number(initialStats.livingCost) || 0)),
        money: startMoney,
      },
      position: 0,
      moveTurns: 0,
      movePhase: "moving",
      slotTurnsLeft: 0,
      reservedSlotTurns: 0,
      slotPullsGranted: 0,
      slotPullsThisSeat: 0,
      spinCount: 0,
      slotNet: 0,
      lastMoveEvent: "",
      lastSpinResult: null,
      alive: true,
      skipTurns: 0,
      amulets: 0,
      slotHeat: 0,
      slotPityCounter: 0,
      debtStreakDaily: 0,
      debtStreakDay8: 0,
      /** タクシー渋滞: 前半移動済み・残マスは次自分ターンで消化 */
      pendingTaxiSteps: 0,
    };
  }

  return {
    id,
    name,
    characterType,
    streamMultiplier: char.streamMultiplier,
    stats: {
      luck: clamp(0 + (char.luckBonus ?? 0), 0, 999999),
      skill: clamp(50 + char.skillBonus, 0, 2000),
      pon: rand(BAL.pon.startMin, BAL.pon.startMax),
      virtue: 50,
      livingCost: dailyLivingCostFor(characterType),
      money: startMoney,
    },
    position: 0,
    moveTurns: 0,
    movePhase: "moving",
    slotTurnsLeft: 0,
    reservedSlotTurns: 0,
    slotPullsGranted: 0,
    slotPullsThisSeat: 0,
    spinCount: 0,
    slotNet: 0,
    lastMoveEvent: "",
    lastSpinResult: null,
    alive: true,
    skipTurns: 0,
    amulets: 0,
    slotHeat: 0,
    slotPityCounter: 0,
    debtStreakDaily: 0,
    debtStreakDay8: 0,
    pendingTaxiSteps: 0,
  };
}

export function applyRimiruDailyEnd(pl, logs) {
  const m = pl.stats?.money ?? 0;
  if (m >= 0) {
    return { ...pl, debtStreakDaily: 0 };
  }
  let streak = (pl.debtStreakDaily ?? 0) + 1;
  const th = BAL.rimiru.dailyGracesBefore;
  let money = m;
  if (streak >= th) {
    const before = money;
    const rate = 1 + BAL.rimiru.interestPercent / 100;
    money = Math.floor(before * rate);
    streak = 0;
    const inc = Math.round(Math.abs(before) * (BAL.rimiru.interestPercent / 100));
    logs.push(
      `🩸 闇金リリムからの督促：（連続赤字が${th}ターン）高利子+${BAL.rimiru.interestPercent}%——${before}G → ${money}G（増額+${inc}G）`,
    );
  }
  return { ...pl, stats: { ...pl.stats, money: clampMoney(money) }, debtStreakDaily: streak };
}

export function applyRimiruDay8Outgoing(prevIdx, players, logs) {
  return players.map((pl, i) => {
    if (i !== prevIdx) return pl;
    const mm = pl.stats?.money ?? 0;
    if (mm >= 0) {
      return { ...pl, debtStreakDay8: 0 };
    }
    let streak = (pl.debtStreakDay8 ?? 0) + 1;
    const th = BAL.rimiru.day8TurnsBefore;
    let money = mm;
    if (streak >= th) {
      const before = money;
      const rate = 1 + BAL.rimiru.interestPercent / 100;
      money = Math.floor(before * rate);
      streak = 0;
      const inc = Math.round(Math.abs(before) * (BAL.rimiru.interestPercent / 100));
      logs.push(
        `🩸 闇金リリム：『それが増えるんで』連続赤字${th}回の手終わりや—— ${pl.name}の借金 ${before}G → ${money}G (+${inc}G / +${BAL.rimiru.interestPercent}%)`,
      );
    }
    return { ...pl, stats: { ...pl.stats, money: clampMoney(money) }, debtStreakDay8: streak };
  });
}

export function isDay8Done(p) {
  if (!p.alive) return true;
  if (p.movePhase === "moving") return false;
  if (p.movePhase === "goalLanding") return false;
  if (p.movePhase === "waitingSlot") {
    const r = p.reservedSlotTurns ?? 0;
    if (r <= 0) return true;
    return false;
  }
  if (p.movePhase === "missed") return true;
  if (p.movePhase === "arrived") return p.slotTurnsLeft <= 0;
  return true;
}

export function rankLabel(money) {
  if (money >= 30000) return "SS";
  if (money >= 15000) return "S";
  if (money >= 8000) return "A";
  if (money >= 4000) return "B";
  return "C";
}

export function finalizeToResults(gs, playersOverride) {
  const players = playersOverride ?? gs.players;
  const moreLogs = [
    ...players.filter((p) => p.alive).map(
      (p) => `${p.name}: 最終資金 ${p.stats.money}G / ランク ${rankLabel(p.stats.money)}`,
    ),
    "━━━ 8日目終了！全員完了 ━━━",
    "━━━ 最終結果 ───",
  ];
  const next = {
    ...gs,
    players,
    gamePhase: "results",
    subPhase: "daily",
    log: prependLogs(moreLogs, gs.log),
  };
  delete next.finalBattleStartedAt;
  delete next.finalBattleEntry;
  return next;
}

function shuffleSugorokuTileKinds(arr) {
  const x = arr.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = x[i];
    x[i] = x[j];
    x[j] = t;
  }
  return x;
}

/** インデックス 0 と BOARD_GOAL は常に NEUTRAL。スタート／ゴール除くマスへ効果割当 */
export function generateSugorokuTileEffects() {
  const SG = BAL.sugorokuTiles;
  const tiles = Array.from({ length: BOARD_GOAL + 1 }, () => ({ kind: TILE_EFFECT_KIND.NEUTRAL }));
  const innerCount = BOARD_GOAL - 1;
  if (innerCount <= 0) return tiles;

  const ratioNeutral = SG.neutralRatio ?? 0.2;
  const ratioGood = SG.goodRatio ?? 0.35;
  const ratioBad = SG.badRatio ?? 0.35;
  const ratioDebtTrap = SG.debtTrapRatio ?? 0.1;

  let nNeutral = Math.round(innerCount * ratioNeutral);
  let nGood = Math.round(innerCount * ratioGood);
  let nBad = Math.round(innerCount * ratioBad);
  let nDebtTrap = Math.round(innerCount * ratioDebtTrap);
  let sum = nNeutral + nGood + nBad + nDebtTrap;
  while (sum > innerCount) {
    if (nBad > 0) nBad -= 1;
    else if (nGood > 0) nGood -= 1;
    else if (nDebtTrap > 0) nDebtTrap -= 1;
    else if (nNeutral > 0) nNeutral -= 1;
    sum = nNeutral + nGood + nBad + nDebtTrap;
  }
  while (sum < innerCount) {
    nBad += 1;
    sum = nNeutral + nGood + nBad + nDebtTrap;
  }

  const kindsBag = [];
  for (let i = 0; i < nNeutral; i++) kindsBag.push(TILE_EFFECT_KIND.NEUTRAL);
  for (let i = 0; i < nDebtTrap; i++) kindsBag.push(TILE_EFFECT_KIND.DEBT_TRAP);
  // Good 35%: money:move = 5:5
  const nGoodMoney = Math.floor(nGood / 2);
  const nGoodMove = nGood - nGoodMoney;
  for (let i = 0; i < nGoodMoney; i++) kindsBag.push(TILE_EFFECT_KIND.GAIN_MONEY);
  for (let i = 0; i < nGoodMove; i++) kindsBag.push(TILE_EFFECT_KIND.MOVE_FORWARD);
  // Bad 35%: money:move:pon = 4:5:1
  const nBadMoney = Math.round(nBad * 0.4);
  const nBadMove = Math.round(nBad * 0.5);
  const nBadPon = Math.max(0, nBad - nBadMoney - nBadMove);
  for (let i = 0; i < nBadMoney; i++) kindsBag.push(TILE_EFFECT_KIND.LOSE_MONEY);
  for (let i = 0; i < nBadMove; i++) kindsBag.push(TILE_EFFECT_KIND.MOVE_BACKWARD);
  for (let i = 0; i < nBadPon; i++) kindsBag.push(TILE_EFFECT_KIND.INCREASE_PON);
  while (kindsBag.length < innerCount) kindsBag.push(TILE_EFFECT_KIND.NEUTRAL);
  while (kindsBag.length > innerCount) kindsBag.pop();
  const shuffledBag = shuffleSugorokuTileKinds(kindsBag);

  const rollValue = (kind) => {
    switch (kind) {
      case TILE_EFFECT_KIND.MOVE_FORWARD:
        return rand(SG.moveForwardMin, SG.moveForwardMax);
      case TILE_EFFECT_KIND.MOVE_BACKWARD:
        return rand(SG.moveBackwardMin, SG.moveBackwardMax);
      case TILE_EFFECT_KIND.GAIN_MONEY:
        return rand(SG.gainMoneyMin, SG.gainMoneyMax);
      case TILE_EFFECT_KIND.LOSE_MONEY:
        return rand(SG.loseMoneyMin, SG.loseMoneyMax);
      case TILE_EFFECT_KIND.INCREASE_PON:
        return rand(SG.ponIncreaseMin, SG.ponIncreaseMax);
      default:
        return 0;
    }
  };

  let bi = 0;
  for (let pos = 1; pos <= BOARD_GOAL - 1; pos++) {
    const kind = shuffledBag[bi++];
    if (kind === TILE_EFFECT_KIND.NEUTRAL || kind === TILE_EFFECT_KIND.DEBT_TRAP) {
      tiles[pos] = { kind };
    } else {
      tiles[pos] = { kind, value: rollValue(kind) };
    }
  }
  return tiles;
}

/** 盤効果リストが無い／長さ不正のときのみ生成してマージ */
export function ensureSugorokuTileEffects(gs) {
  const need = BOARD_GOAL + 1;
  const cur = gs?.sugorokuTileEffects;
  if (Array.isArray(cur) && cur.length === need) return gs;
  return { ...gs, sugorokuTileEffects: generateSugorokuTileEffects() };
}

export function enterDay8AfterFinalBattleCue(gs) {
  const p0 = gs.players[0];
  const head = `${p0.name}の移動ターン（T1 / ${BOARD_GOAL}マス先へ！）`;
  const banner = "━━━ 8日目！全員で交互に移動＆スロット ━━━";
  const next = {
    ...ensureSugorokuTileEffects(gs),
    gamePhase: "playing",
    subPhase: "day8",
    aidAvailable: Math.random() < BAL.dice.helpChance,
    taxiAvailable: Math.random() < BAL.dice.taxiChance,
    lastDiceRolls: [],
    recentPonEvent: null,
    showSpinResult: false,
    displayReels: ["?", "?", "?"],
  };
  delete next.finalBattleStartedAt;
  delete next.finalBattleEntry;
  next.log = prependLogs([head, banner], gs.log);
  return next;
}

export function initialGameState(playerSlots) {
  const players = playerSlots.map((s) => {
    const char = s.character ?? "salaryman";
    const rolls = normalizeSlotInitialRolls(s.initialRolls);
    const legacyPreset = normalizeSlotInitialStats(s.initialStats);
    let preset = null;
    if (rolls) {
      preset = computeFinalStatsFromInitialRolls(rolls, char);
    } else if (legacyPreset) {
      preset = legacyPreset;
    } else {
      preset = rollSlotInitialStatsForGameStart(char);
    }
    return makePlayer(s.name, s.id, char, preset);
  });
  const logs = [
    `${players[0].name}のターン（1日目）`,
    `━━━ ゲーム開始！${players.length === 1 ? "ソロ" : `${players.length}人`}プレイ ━━━`,
    ...players.map((p) => {
      const c = CHARACTERS[p.characterType];
      const lc = livingCostForPlayer(p);
      return `${p.name}(${c?.emoji ?? ""}${c?.label ?? ""}): PON=${p.stats.pon} 運=${p.stats.luck} 技量=${p.stats.skill} 善行=${p.stats.virtue} 生活費=${lc}G`;
    }),
  ];
  return {
    players,
    currentDay: 1,
    currentPlayerIdx: 0,
    subPhase: "daily",
    gamePhase: "playing",
    log: logs,
    aidAvailable: false,
    taxiAvailable: false,
    recentPonEvent: null,
    gameOverMsg: "",
    showSpinResult: false,
    lastDiceRolls: [],
    displayReels: ["?", "?", "?"],
  };
}

export function computeAdvanceDaily(gs, newPlayers, extraLogs) {
  const n = newPlayers.length;
  const nextIdx = gs.currentPlayerIdx + 1;
  let moreLogs = [];
  let patch = {};

  if (nextIdx >= n) {
    const nextDay = gs.currentDay + 1;
    if (nextDay > LAST_DAILY_DAY) {
      const startedAt = Date.now();
      moreLogs = ["育成フェーズ、終幕――いま、参道の向こうに決戦が待つ。", "── 【決戦の日】 ──"];
      patch = {
        currentDay: nextDay,
        currentPlayerIdx: 0,
        subPhase: "finalBattle",
        gamePhase: "finalBattle",
        finalBattleStartedAt: startedAt,
        finalBattleEntry: "preDay8",
      };
    } else {
      moreLogs = [`${newPlayers[0].name}のターン`, `━━━ ${nextDay}日目 開始 ━━━`];
      patch = { currentDay: nextDay, currentPlayerIdx: 0 };
    }
  } else {
    moreLogs = [`${newPlayers[nextIdx].name}のターン（${gs.currentDay}日目）`];
    patch = { currentPlayerIdx: nextIdx };
  }

  return {
    ...gs,
    ...patch,
    players: newPlayers,
    log: prependLogs([...extraLogs, ...moreLogs], gs.log),
  };
}

export function computeAdvanceDay8Turn(gs, newPlayers, extraLogs) {
  /** この手番でまだ slotsPerSugorokuTurn 未満なら同一プレイヤー。達するか総プル0で outgoing＆次手番へ */
  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const stayIdx = gs.currentPlayerIdx;
  const stayP = newPlayers[stayIdx];
  const slotLeft = stayP?.slotTurnsLeft ?? 0;
  const pullsSeat = stayP?.slotPullsThisSeat ?? 0;
  if (stayP?.movePhase === "arrived" && slotLeft > 0 && pullsSeat < burst) {
    return {
      ...gs,
      players: newPlayers,
      showSpinResult: false,
      displayReels: ["?", "?", "?"],
      log: prependLogs(extraLogs, gs.log),
    };
  }

  /** スロット手番が終わってターンローテするときは、すごろく上限と共通の moveTurns を +1（ヘッダの残りターンバーストと連動） */
  let playersForOutgoing = newPlayers;
  if (stayP?.movePhase === "arrived") {
    playersForOutgoing = newPlayers.map((pl, i) =>
      i !== stayIdx ? pl : { ...pl, moveTurns: (pl.moveTurns ?? 0) + 1 },
    );
  }

  const rimiruLogs = [];
  let playersWithInterest = applyRimiruDay8Outgoing(gs.currentPlayerIdx, playersForOutgoing, rimiruLogs);
  const extraMerged = [...extraLogs, ...rimiruLogs];

  /** スロット手番終了後、次の自分枠までこの手番用カウンタをリセット */
  playersWithInterest = playersWithInterest.map((pl, i) =>
    i !== gs.currentPlayerIdx ? pl : { ...pl, slotPullsThisSeat: 0 },
  );

  if (playersWithInterest.every(isDay8Done)) {
    const interim = {
      ...gs,
      players: playersWithInterest,
      log: prependLogs(extraMerged, gs.log),
    };
    return finalizeToResults(interim, playersWithInterest);
  }

  const n = playersWithInterest.length;
  let nextIdx = (gs.currentPlayerIdx + 1) % n;
  for (let i = 0; i < n; i++) {
    if (!isDay8Done(playersWithInterest[nextIdx])) break;
    nextIdx = (nextIdx + 1) % n;
  }

  const nextP = playersWithInterest[nextIdx];
  let nextLog;
  if (nextP.movePhase === "arrived") {
    nextLog = `${nextP.name}のスロットターン（残り${nextP.slotTurnsLeft}回 / 資金${nextP.stats.money}G）`;
  } else if (nextP.movePhase === "waitingSlot") {
    nextLog = `${nextP.name}のターン（ゴール到着済み・スロット${nextP.reservedSlotTurns ?? 0}ターンブンを開始できます）`;
  } else {
    nextLog = `${nextP.name}の移動ターン（T${nextP.moveTurns + 1} / ${nextP.position}/${BOARD_GOAL}マス）`;
  }

  return {
    ...gs,
    players: playersWithInterest,
    currentPlayerIdx: nextIdx,
    aidAvailable: Math.random() < BAL.dice.helpChance,
    taxiAvailable: Math.random() < BAL.dice.taxiChance,
    lastDiceRolls: [],
    showSpinResult: false,
    displayReels: ["?", "?", "?"],
    log: prependLogs([...extraMerged, nextLog], gs.log),
  };
}

export function applyVirtueWave(actingPlayer, virtueBefore, virtueAfter, players, logs) {
  const thresh = BAL.dice.virtueWaveThresh;
  if (virtueBefore < thresh && virtueAfter >= thresh) {
    const delta = BAL.dice.virtueWavePonDelta;
    const updatedPlayers = players.map((pl) => ({
      ...pl,
      stats: { ...pl.stats, pon: clamp(pl.stats.pon + delta, 0) },
    }));
    logs.push(`🌟 ${actingPlayer.name}の徳が高すぎて全員の心が洗われた！全員PON${delta}`);
    return updatedPlayers;
  }
  return players;
}

export function applySplashDamage(triggerIdx, players, logs) {
  const origin = players[triggerIdx];
  const radius = BAL.dice.splashRadius;
  return players.map((pl, i) => {
    if (i === triggerIdx) return pl;
    if (!pl.alive) return pl;
    if (pl.movePhase !== "moving") return pl;
    if (Math.abs(pl.position - origin.position) > radius) return pl;
    logs.push(`💥 巻き添え！${pl.name}（${pl.position}マス付近）→ 次ターン1回休み`);
    return { ...pl, skipTurns: (pl.skipTurns || 0) + 1 };
  });
}

/**
 * ダイス（またはタクシー）移動で止まったマスの効果のみ適用。
 * 「進む／戻る」で移動した先のマスでは効果は発動しない（連鎖なし）。
 * tiles[pos] が undefined のとき neutral として扱う。
 */
export function applySugorokuTileLandingChain(tiles, startPosIn, moverStatsIn, playerName, logs) {
  const SG = BAL.sugorokuTiles;
  let pos = Math.max(0, Math.min(BOARD_GOAL, startPosIn));
  const stats = { ...moverStatsIn };
  /** トースト用短文（ユーザー向け） */
  const popupTitles = [];

  const pushFx = (lineJa, toastLine) => {
    logs.push(lineJa);
    if (toastLine) popupTitles.push(toastLine);
  };

  if (pos <= 0 || pos >= BOARD_GOAL) {
    return { finalPos: pos, stats, popupTitles, debtTrapTriggered: false };
  }

  const def = tiles[pos];
  const kind = def?.kind ?? TILE_EFFECT_KIND.NEUTRAL;
  if (kind === TILE_EFFECT_KIND.NEUTRAL) {
    return { finalPos: pos, stats, popupTitles, debtTrapTriggered: false };
  }

  const vRaw = typeof def?.value === "number" && Number.isFinite(def.value) ? def.value : null;
  switch (kind) {
    case TILE_EFFECT_KIND.MOVE_FORWARD: {
      const n = vRaw ?? rand(SG.moveForwardMin, SG.moveForwardMax);
      pushFx(`  🔰 マス効果 (${pos})：進行マスで +${n} 進む`, `Forward +${n} steps (+${n}マス)`);
      pos = Math.min(BOARD_GOAL, pos + n);
      break;
    }
    case TILE_EFFECT_KIND.MOVE_BACKWARD: {
      const n = vRaw ?? rand(SG.moveBackwardMin, SG.moveBackwardMax);
      pushFx(`  🔰 マス効果 (${pos})：転がり坂で −${n} 戻る`, `Back −${n} steps (−${n}マス)`);
      pos = Math.max(0, pos - n);
      break;
    }
    case TILE_EFFECT_KIND.GAIN_MONEY: {
      const n = vRaw ?? rand(SG.gainMoneyMin, SG.gainMoneyMax);
      stats.money = clampMoney(stats.money + n);
      pushFx(`  🔰 マス効果 (${pos})：ひろい金で +${n}G→${stats.money}G`, `+${n}G`);
      break;
    }
    case TILE_EFFECT_KIND.LOSE_MONEY: {
      const n = vRaw ?? rand(SG.loseMoneyMin, SG.loseMoneyMax);
      stats.money = clampMoney(stats.money - n);
      pushFx(`  🔰 マス効果 (${pos})：落とし穴で −${n}G→${stats.money}G`, `−${n}G`);
      break;
    }
    case TILE_EFFECT_KIND.INCREASE_PON: {
      const n = vRaw ?? rand(SG.ponIncreaseMin, SG.ponIncreaseMax);
      stats.pon = clamp(stats.pon + n);
      pushFx(`  🔰 マス効果 (${pos})：炎上予約で +PON ${n}%→${stats.pon}`, `Fire +${n} PON`);
      break;
    }
    case TILE_EFFECT_KIND.DEBT_TRAP: {
      if ((stats.money ?? 0) < 0) {
        pushFx(`  ☠ 借金トラップ発動！借金中で破産…`, "Debt Trap: GAME OVER");
        return { finalPos: pos, stats, popupTitles, debtTrapTriggered: true };
      }
      pushFx(`  ☠ 借金トラップだったが、借金していなかったから何もなかった...`, "借金していなかったから何もなかった...");
      break;
    }
    default:
      break;
  }

  return { finalPos: pos, stats, popupTitles, debtTrapTriggered: false };
}

/**
 * Dice／タクシー直後マスでのスプラッシュ処理の有無に応じ、タイル効果を合成して mover を更新した players を返す。
 */
export function resolveDay8LandingWithTiles(gs, moverIdx, landedPosDice, moverStatsSnapshot, logs, options = {}) {
  const ponSplashDamage = !!options.ponSplashDamage;
  /** タクシー移動はマス効果（タイル）の判定を受けない */
  const skipTileEffects = !!options.skipTileEffects;
  const ensured = ensureSugorokuTileEffects(gs);
  const tiles = ensured.sugorokuTileEffects;

  const phantom = gs.players.map((pl, i) =>
    i === moverIdx ? { ...pl, stats: { ...moverStatsSnapshot }, position: landedPosDice } : { ...pl },
  );
  const afterSplash = ponSplashDamage ? applySplashDamage(moverIdx, phantom, logs) : phantom;

  const mover = afterSplash[moverIdx];
  const chain = skipTileEffects
    ? { finalPos: landedPosDice, stats: { ...mover.stats }, popupTitles: [], debtTrapTriggered: false }
    : applySugorokuTileLandingChain(tiles, landedPosDice, { ...mover.stats }, mover.name, logs);

  const playersOut = afterSplash.map((pl, i) =>
    i === moverIdx ? { ...pl, stats: chain.stats, position: chain.finalPos } : pl,
  );

  const tileToast =
    chain.popupTitles.length > 0
      ? { title: "Tile effect / マス効果", lines: chain.popupTitles }
      : null;

  return {
    gsWithTiles: ensured,
    players: playersOut,
    tileToast,
    gameOverByDebt: chain.debtTrapTriggered
      ? {
          triggered: true,
          message: `${mover.name} は借金トラップを踏み、破産してゲームオーバー…`,
        }
      : null,
  };
}

/** タクシー走行カメラ補間など用（t を 0〜1 にクランプ） */
export function easeInOutCubic(t) {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

/**
 * タクシー drive フェーズの長さ（ms）。移動マス数に応じておおよそ 2.2〜3.2 秒。
 */
export function computeTaxiDriveDurationMs(deltaCells) {
  const d = Math.abs(deltaCells);
  const ms = 2000 + d * 55;
  return Math.round(Math.min(3200, Math.max(2200, ms)));
}

/** BoardViewport のホップ補間と同じドラム式（マス効果の追いマスを書き込むタイミングと同期） */
const SUGOROKU_HOP_MAX_STEPS_FOR_DURATION = 20;
const SUGOROKU_HOP_SETTLE_PADDING_MS = 300;

export function computeSugorokuHopDurationMs(from, to) {
  const diff = to - from;
  const abs = Math.abs(diff);
  const steps = Math.min(abs, SUGOROKU_HOP_MAX_STEPS_FOR_DURATION);
  const isBig = abs > 6;
  const msPerStep = isBig ? 110 : 360;
  return steps * msPerStep + SUGOROKU_HOP_SETTLE_PADDING_MS;
}

/** 予定全文（fullSteps マス）の中点ワールド座標 — 渋滞カットイン挿入位置 */
export function computeTaxiJamMidpointPos(startPos, fullSteps) {
  return startPos + fullSteps / 2;
}

/**
 * 渋滞ありタクシー：前半は start→中点、後半は中点→to（今ターンの到達マス）。
 * 移動時間は等速想定で totalDurationMs を分割。
 */
export function computeTaxiCongestedLegDurations(from, to, fullSteps, totalDurationMs) {
  const span = to - from;
  const dur = Math.max(0, totalDurationMs);
  if (Math.abs(span) < 1e-9) {
    return { jamMid: from, firstLegMs: dur, secondLegMs: 0 };
  }
  const rawMid = computeTaxiJamMidpointPos(from, fullSteps);
  let jamMid = rawMid;
  if (span > 0) jamMid = Math.min(to, Math.max(from, rawMid));
  else jamMid = Math.max(to, Math.min(from, rawMid));
  const r = (jamMid - from) / span;
  const firstLegMs = Math.max(120, Math.round(dur * r));
  const secondLegMs = Math.round(dur * (1 - r));
  return { jamMid, firstLegMs, secondLegMs: Math.max(0, secondLegMs) };
}

export function squareDeco(pos, boardGoal, nightShrine = false) {
  if (nightShrine && pos >= boardGoal) {
    return {
      icon: "⛩️",
      bg: "bg-indigo-950/95",
      border: "border-violet-300/70",
      text: "text-violet-100",
      shadow: "0 5px 0 #1e1b4b, 0 8px 16px rgba(0,0,0,0.65)",
      glow: "0 0 28px rgba(167,139,250,0.55)",
    };
  }
  if (pos <= 0)
    return {
      icon: "🚀",
      bg: "bg-emerald-800/90",
      border: "border-emerald-400/70",
      text: "text-emerald-200",
      shadow: "0 5px 0 #064e3b, 0 7px 10px rgba(0,0,0,0.5)",
      glow: "0 0 14px rgba(52,211,153,0.35)",
    };
  if (pos >= boardGoal)
    return {
      icon: "🏆",
      bg: "bg-amber-700/90",
      border: "border-amber-300/80",
      text: "text-amber-100",
      shadow: "0 5px 0 #78350f, 0 7px 10px rgba(0,0,0,0.5)",
      glow: "0 0 18px rgba(251,191,36,0.5)",
    };
  if (pos % 10 === 0)
    return {
      icon: "⭐",
      bg: "bg-sky-800/80",
      border: "border-sky-400/60",
      text: "text-sky-200",
      shadow: "0 4px 0 #0c4a6e, 0 6px 8px rgba(0,0,0,0.45)",
      glow: "0 0 12px rgba(56,189,248,0.3)",
    };
  if (pos % 7 === 0)
    return {
      icon: "🎲",
      bg: "bg-violet-900/80",
      border: "border-violet-400/55",
      text: "text-violet-300",
      shadow: "0 4px 0 #3b0764, 0 6px 8px rgba(0,0,0,0.4)",
      glow: null,
    };
  if (pos % 5 === 0)
    return {
      icon: "✦",
      bg: "bg-slate-700/90",
      border: "border-slate-400/40",
      text: "text-slate-300",
      shadow: "0 3px 0 #1e293b, 0 5px 7px rgba(0,0,0,0.35)",
      glow: null,
    };
  return {
    icon: null,
    bg: "bg-slate-800/95",
    border: "border-slate-600/50",
    text: "text-slate-400",
    shadow: "0 3px 0 #0f172a, 0 4px 6px rgba(0,0,0,0.3)",
    glow: null,
  };
}
