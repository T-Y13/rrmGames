/** ゲームバランス・固定パラメータ（UI／ロジック共通） */

export const QUICK_NAMES = [
  "ゲーマー",
  "配信者",
  "ギャンブラー",
  "リリム",
  "社畜",
  "無職",
  "お祈り中",
  "底辺",
  "億り人",
  "錬金術師",
];

export const BOARD_GOAL = 50;
/** 検証用: マス1〜N を借金トラップ固定（0 で通常生成に戻す） */
export const SUGOROKU_VERIFY_DEATH_TEST_TRAP_FIRST_N = 12;
/** すごろく効果マス種別（8日目盤のみ） */
export const TILE_EFFECT_KIND = Object.freeze({
  NEUTRAL: "NEUTRAL",
  MOVE_FORWARD: "MOVE_FORWARD",
  MOVE_BACKWARD: "MOVE_BACKWARD",
  GAIN_MONEY: "GAIN_MONEY",
  LOSE_MONEY: "LOSE_MONEY",
  INCREASE_PON: "INCREASE_PON",
  DEBT_TRAP: "DEBT_TRAP",
});
export const LAST_DAILY_DAY = 7;
export const FINAL_GAME_DAY = 8;

/** 「決戦の日」文言表示（ms）。終了後 preDay8 では中間マップを出さず本番へ */
export const FINAL_BATTLE_SPLASH_MS = 1500;
/** 旧経路：リザルト直行などでスプラッシュ後にマップ試写を見せ続ける時間 */
export const FINAL_BATTLE_POST_MAP_MS = 2600;
/** preDay8：スプラッシュ終了〜ホストが8日本番すごろくへFirestore反映するまでの猶予 */
export const FINAL_BATTLE_GRACE_BEFORE_DAY8_MS = 280;
export const FINAL_BATTLE_HOST_PRE_DAY8_MS =
  FINAL_BATTLE_SPLASH_MS + FINAL_BATTLE_GRACE_BEFORE_DAY8_MS;
export const FINAL_BATTLE_HOST_DELAY_LEGACY_MS =
  FINAL_BATTLE_SPLASH_MS + FINAL_BATTLE_POST_MAP_MS;

export const DAY8_MAX_TURNS = 15;
export const SLOT_COST = 100;
/** 各スピンのベットに対するプログレッシブポット拠出率（マルチ8日目） */
export const PROGRESSIVE_POT_RATE = 0.3;
/** ルーム作成時のプログレッシブポット初期値（8日目開始時も同値） */
export const INITIAL_PROGRESSGRESSIVE_POT = 17500;
export const SLOT_BETS = [100, 300, 500, 1000];
/** 代理スロット：標的の所持金に対する最大掛け金率（端数切捨て） */
export const PROXY_SLOT_MAX_BET_RATE = 0.3;
/** 代理スロット：この所持金以下のプレイヤーは標的に選べない（500G以下＝選べない） */
export const PROXY_SLOT_MIN_SELECTABLE_MONEY = 500;
/** 代理スロット：死亡者（操作者）のステータスをスロット確率へ反映する倍率（半分・切捨て） */
export const PROXY_SLOT_ACTOR_STAT_RATE = 0.5;
export const SLOT_SYMBOLS = ["7", "BAR", "🍒", "⭐", "🔔"];

export const BAL = {
  /** 新規参加者の初期資金（持ち込み） */
  startingMoney: 600,
  pon: {
    startMin: 10,
    startMax: 20,
    dailyGain: 5,
    fireThreshold: 30,
    deathThreshold: 80,
    deathChance: 0.5,
    stream: { moneyMin: 300, moneyMax: 800, skillLoss: 20 },
    work: { penaltyMin: 200, penaltyMax: 500 },
  },
  stream: {
    baseFailRate: 0.6,
    combinedStatNoFailThreshold: 150,
    successMin: 400,
    successMax: 1800,
    chat: { virtueGainMin: 5, virtueGainMax: 15 },
    game: { skillGainMin: 5, skillGainMax: 20 },
  },
  work: { reward: 1300, skillGain: 0, virtueGain: 10 },
  living: { dailyCost: 500 },
  rimiru: {
    interestPercent: 10,
    dailyGracesBefore: 2,
    day8TurnsBefore: 3,
  },
  dice: {
    maxTurns: DAY8_MAX_TURNS,
    /** 獲得ターンブン×この値＝総プル回。兼ねて「このスロット手番につき連続できる回」— 達するか総プル0で次プレイヤーへ */
    slotsPerSugorokuTurn: 3,
    shopCost: 150,
    helpChance: 0.3,
    helpVirtueMin: 22,
    helpVirtueMax: 38,
    /** 各ターン開始時: タクシーが「このターン利用可能」になる確率（gameState.taxiAvailable）。 */
    taxiChance: 0.25,
    /**
     * true: タクシーボタンをメニューに常に表示（taxiAvailable に依存しない）。
     * false: 従来どおり taxiAvailable が true のターンだけ表示（出現率は上の taxiChance で調整）。
     */
    taxiMenuAlwaysVisible: true,
    taxiCost: 600,
    taxiMoveMin: 12,
    taxiMoveMax: 18,
    taxiBaseTurns: 1,
    taxiCongestThresh: 70,
    taxiCongestChance: 0.3,
    taxiCongestPon: 10,
    virtueWaveThresh: 100,
    virtueWavePonDelta: -5,
    splashRadius: 3,
    /** すごろく：運が閾値以上でラッキーダイス（2個目）が確率発動。運80→40%、+1%/運、上限100% */
    luckyDice: {
      luckThreshold: 80,
      baseChancePct: 40,
      pctPerLuckAbove: 1,
      maxChancePct: 100,
    },
  },
  slot: {
    skillBaseline: 50,
    skillBlockSize: 10,
    skillMissReducePerBlock: 0.015,
    skillToMid: 0.3,
    skillToAtari: 0.35,
    skillToSmall: 0.35,
    luckBaseline: 50,
    luckRefSpan: 50,
    luckAtariDrainAtLuck100: 0.02,
    luckSmallDrainAtLuck100: 0.03,
    luckToJp: 0.3,
    luckToBig: 0.7,
    heatTransferPerSpin: 0.01,
    heatWeightJp: 1 / 15,
    heatWeightBig: 3 / 15,
    heatWeightMid: 5 / 15,
    heatWeightAtari: 6 / 15,
    nearMissReachChance: 0.12,
    slipSymbolChance: 0.1,
  },
  shrine: {
    cost: 300,
    luckGain: 20,
    virtueGain: 2,
    ponReduce: 10,
    /** お守り抽選の基準確率（実効率は ×(1+善行/100)、上限100%） */
    amuletBaseRate: 0.2,
  },
  /** 8日目：スタート／ゴール除く効果マス（生成時は NEUTRAL を約35%） */
  sugorokuTiles: {
    neutralRatio: 0.2,
    goodRatio: 0.35,
    badRatio: 0.35,
    debtTrapRatio: 0.1,
    moveForwardMin: 1,
    moveForwardMax: 3,
    moveBackwardMin: 1,
    moveBackwardMax: 2,
    gainMoneyMin: 200,
    gainMoneyMax: 500,
    loseMoneyMin: 100,
    loseMoneyMax: 300,
    ponIncreaseMin: 10,
    ponIncreaseMax: 25,
    maxChainSteps: 8,
  },
  /** 1〜7日目：デイリースロット（技能練習）。spinBet を spinSlot に渡して 8日目同等の役配当。複数回連続で回転 */
  dailySlot: {
    spinBet: 250,
    spins: 2,
    /** 各スピン終了ごとに技量加算（ハズレでも） */
    skillGainEverySpin: 10,
    /** tier が役成立のときのみ上記に加えて加算 */
    skillGainOnRole: 10,
  },
};

export const SLOT_MACHINES = {
  standard: {
    key: "standard",
    label: "スタンダード",
    emoji: "🎰",
    desc: "バランス型。まずはここから。",
    color: "text-amber-300",
    border: "border-amber-500/50 bg-amber-500/10",
    symbols: ["7", "BAR", "🍒", "⭐", "🔔"],
    /** マルチ8日目POT JP用（有効時のみリールに追加） */
    potSymbol: "💰",
    // 初期（素の勝率）を 35% にして、ハズレを 65% にする
    // potJp: 固定1%（運・熟成・技量・ピティ再配分では増えない。将来専用要素で上げる想定）
    baseRates: { potJp: 0.01, jp: 0.005, big: 0.02, mid: 0.05, atari: 0.08, small: 0.195 },
    basePayout: { miss: 0, small: 80, atari: 150, mid: 300, big: 1000, jackpot: 3000, potJackpot: 0 },
  },
};

export const CHARACTERS = {
  /** 任意拡張フィールド（characterEffects.js 参照）: luckFixed, statGainMultiplier, rentIncomeRate, multiplayerOnly */
  salaryman: {
    key: "salaryman",
    label: "ギャンブラーサラリーマン",
    emoji: "💼",
    desc: "技量+20でスタート。仕事の報酬+200G。配信報酬は0.8倍だが安定感がある。",
    color: "text-sky-300",
    border: "border-sky-500/60 bg-sky-500/10",
    skillBonus: 20,
    workRewardBonus: 200,
    streamMultiplier: 0.8,
    ponMultiplier: 1.0,
    dailyLivingCost: 500,
  },
  student: {
    key: "student",
    label: "ギャンブル初心者な大学生",
    emoji: "🎓",
    desc: "運+20・技量-10。ビギナーズラックでスロットが有利。生活費は低めで初期資金も多い。仕事収入は0.65倍と控えめだが、PON発火時の資金ペナルティは軽め。配信は通常どおり。",
    color: "text-emerald-300",
    border: "border-emerald-500/55 bg-emerald-500/10",
    luckBonus: 20,
    skillBonus: -10,
    streamMultiplier: 1.0,
    ponMultiplier: 1.0,
    /** 仕事の資金（ベース＋査定ボーナス）に掛ける倍率 */
    workRewardMultiplier: 0.65,
    /** PON発火時の資金ペナ（仕事のみ）。配信発火は変更しない */
    ponFireMoneyPenaltyMultiplier: 0.5,
    dailyLivingCost: 300,
    startingMoney: 800,
  },
  vtuber: {
    key: "vtuber",
    label: "リリム",
    emoji: "🎭",
    desc: "技量-10・運+10・生活費300Gでスタート。PON上昇1.2倍。失言がバズるたびに配信報酬倍率が+0.5される。",
    color: "text-violet-300",
    border: "border-violet-500/60 bg-violet-500/10",
    skillBonus: -10,
    luckBonus: 10,
    streamMultiplier: 1.0,
    ponMultiplier: 1.2,
    dailyLivingCost: 300,
  },
  landlord: {
    key: "landlord",
    label: "大家",
    emoji: "🏠",
    desc: "マルチ特化・資産型。運3固定・技量-20。他プレイヤーの生活費70%を家賃収入。配信・神社・スロットのステ上昇は0.8倍。",
    color: "text-amber-200",
    border: "border-amber-500/55 bg-amber-500/10",
    skillBonus: -20,
    luckFixed: 3,
    virtueBonus: 10,
    dailyLivingCost: 150,
    statGainMultiplier: 0.8,
    rentIncomeRate: 0.7,
    multiplayerOnly: true,
    streamMultiplier: 1.0,
    ponMultiplier: 1.0,
  },
};

/** 待機室のシークレットキャラ：プレイヤー名（前後空白除去後）が完全一致すると vtuber が選択肢に現れる */
export const SECRET_RIRIMU_UNLOCK_PLAYER_NAME = "闇月リリム";
export const SECRET_RIRIMU_CHARACTER_KEY = "vtuber";

/**
 * 待機室のシークレット解放判定。名前の先頭末尾のホワイトスペースのみ除去し、それ以外は変更しない。
 * 大文字小文字および全角半角は区別される（完全一致で `SECRET_RIRIMU_UNLOCK_PLAYER_NAME` のみ）。
 * @param {string} [raw]
 */
export function isSecretRirimuUnlockedByTrimmedPlayerName(raw) {
  return typeof raw === "string" && raw.trim() === SECRET_RIRIMU_UNLOCK_PLAYER_NAME;
}

export const STAT_META = [
  { key: "luck", label: "運", color: "text-amber-400" },
  { key: "skill", label: "技量", color: "text-sky-400" },
  { key: "virtue", label: "善行", color: "text-emerald-400" },
  { key: "pon", label: "PON", color: "text-fuchsia-400" },
  { key: "livingCost", label: "生活費", color: "text-orange-300" },
  { key: "money", label: "資金", color: "text-yellow-300" },
];
