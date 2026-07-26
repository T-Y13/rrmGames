/** 8日目消費アイテム定義（Phase 1: 自己バフ / Phase 3: 他者デバフ追加予定） */



export const DAY8_ITEM_PHASE = {

  MOVE: "move",

  SLOT: "slot",

  DEBUFF: "debuff",

};



/** @typedef {"once" | "slotBurstAll"} Day8ApplyScope */

/** @typedef {"moveResolve" | "slotPayout"} Day8ApplyOn */



export const DAY8_ITEMS = {

  dashCard: {

    id: "dashCard",

    label: "ダッシュカード",

    emoji: "🏃",

    shortLabel: "+3マス",

    desc: "この手番の「進む」で+3マス",

    phase: DAY8_ITEM_PHASE.MOVE,

    usableWhen: ["moving"],

    applyOn: "moveResolve",

    applyScope: "once",

    effect: { kind: "extraSteps", value: 3 },

  },

  luckySpin: {

    id: "luckySpin",

    label: "強運のカード",

    emoji: "✨",

    shortLabel: "1回+50%",

    desc: "この手番の次の当たり配当+50%（1スピンのみ）",

    phase: DAY8_ITEM_PHASE.SLOT,

    usableWhen: ["arrived"],

    applyOn: "slotPayout",

    applyScope: "once",

    effect: { kind: "slotPayoutMult", value: 1.5 },

  },

  steadyGold: {

    id: "steadyGold",

    label: "ゴールドカード",

    emoji: "🪙",

    shortLabel: "3回+20%",

    desc: "この手番のスロット当たり+20%（最大3スピン）",

    phase: DAY8_ITEM_PHASE.SLOT,

    usableWhen: ["arrived"],

    applyOn: "slotPayout",

    applyScope: "slotBurstAll",

    effect: { kind: "slotPayoutMult", value: 1.2 },

  },

};



/** 8日目開始時の固定配布 */

export const DAY8_FIXED_START_GRANT = {

  dashCard: 1,

  luckySpin: 1,

  steadyGold: 1,

};



/** Phase 3 予定：他者へのデバフ（未実装） */

export const DAY8_ITEMS_PHASE3 = {

  mudTrap: {

    id: "mudTrap",

    label: "泥沼トラップ",

    emoji: "🕳️",

    shortLabel: "標的-3マス",

    desc: "指定プレイヤーの次の「進む」で-3マス",

    phase: DAY8_ITEM_PHASE.DEBUFF,

    usableWhen: ["moving"],

    applyOn: "moveResolve",

    applyScope: "once",

    effect: { kind: "extraSteps", value: -3, targetRequired: true },

  },

};



export const DAY8_ITEM_IDS = Object.keys(DAY8_ITEMS);



export function getDay8ItemDef(itemId) {

  return DAY8_ITEMS[itemId] ?? DAY8_ITEMS_PHASE3[itemId] ?? null;

}

