# テストガイド

RRM-game のテストは **2系統**。Vitest 単体（`src/**`）と Firestore rules（`tests/` + エミュレータ）。

## コマンド一覧

| コマンド | 用途 |
|----------|------|
| `npm run test` | Vitest watch モード |
| `npm run test:run` | Vitest 一括実行（**通常はこれ**） |
| `npm run test:rules` | rules テストのみ（**エミュレータ起動済み前提**） |
| `npm run test:rules:emulator` | エミュレータ起動込み rules テスト（**rules 変更時**） |

```bash
# ゲームロジック変更後
npm run test:run

# firestore.rules 変更後
npm run test:rules:emulator
```

## 2系統の違い（重要）

| | 単体テスト | Firestore rules テスト |
|--|-----------|------------------------|
| 設定 | `vite.config.js` → `include: ["src/**/*.{test,spec}.{js,jsx}"]` | `vitest.rules.config.js` → `tests/**` |
| 環境 | `environment: "node"` | Firestore エミュレータ port 8080 |
| 対象 | 純粋関数・状態遷移 | セキュリティルールの allow/deny |
| 実行 | `test:run` | `test:rules` / `test:rules:emulator` |

**注意:** `tests/` 配下は `npm run test:run` に**含まれない**。rules 用テストを足しても `test:rules:emulator` で走らせる。

## 変更種別 → 走らせるテスト

| 変更内容 | コマンド |
|----------|----------|
| `gameLogic.js`, `lib/*`, `constants/*` | `npm run test:run` |
| `firestore.rules` | `npm run test:rules:emulator` |
| rules + クライアント両方 | 両方 |
| UI のみ（`App.jsx`, components） | 依頼時 or 手動確認（コンポーネントテストは基本無し） |

## プロジェクトの慣習

### 何をテストするか

- **テストする:** 純粋ロジック、状態遷移、ログ形式、ルール認可
- **テストしない（原則）:** `App.jsx` 直結、React コンポーネント、Firestore SDK 呼び出し本体
- **方針:** ユーザー依頼がない限り、自明なテストやカバレッジ目的の大量追加はしない

ロジックは `gameLogic.js` / `lib/*` に分離し、そこに co-located test を置く（→ [multiplayer-patterns.md](multiplayer-patterns.md)）。

### ファイル配置

```
src/lib/foo.js
src/lib/foo.test.js          ← 同ディレクトリ co-locate（主流）

tests/firestore.rules.test.js ← rules のみ tests/ 直下
```

命名: `*.test.js` または `*.spec.js`

### スタイル

```javascript
import { describe, it, expect, vi, afterEach } from "vitest";

describe("featureName", () => {
  it("describes behavior in plain language", () => {
    expect(fn(input)).toBe(expected);
  });
});
```

- **fixture:** テスト内で `basePlayer()` / `baseRoom()` 等の最小オブジェクトを定義（共有 utils 化は過剰なら不要）
- **モック:** `vi.spyOn` / `vi.fn` は乱数・Date 等が必要なときのみ（`gameLogic.test.js` 参照）
- **describe 名:** 対象関数・モジュール名
- **it 名:** 振る舞いを英文または短い日本語で（既存に合わせる）

### gameState fixture の最低限

8日目テストでよく使う形:

```javascript
const basePlayer = (overrides = {}) => ({
  id: "p1",
  name: "A",
  alive: true,
  movePhase: "moving",
  stats: { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 },
  day8Inventory: {},
  day8SeatEffects: [],
  day8ItemUsedThisSeat: false,
  ...overrides,
});

const gs = {
  gamePhase: "playing",
  subPhase: "day8",
  currentPlayerIdx: 0,
  slotPhase: "idle",
  players: [basePlayer()],
  log: [],
};
```

## Firestore rules テスト

ファイル: `tests/firestore.rules.test.js`

### 前提

- `@firebase/rules-unit-testing` + Vitest
- エミュレータ: `127.0.0.1:8080`（`firebase.json` の `emulators.firestore.port`）
- `test:rules:emulator` が emulator 起動から実行まで面倒を見る

### パターン

```javascript
// 1. ルール無効で seed
await testEnv.withSecurityRulesDisabled(async (ctx) => {
  await setDoc(doc(ctx.firestore(), "rooms", roomId), baseRoom({ gameState: gs }));
});

// 2. 認証コンテキストで allow/deny 検証
const hostDb = testEnv.authenticatedContext("host").firestore();
await assertSucceeds(updateDoc(ref, { /* patch */ }));
await assertFails(updateDoc(ref, { /* bad patch */ }));
```

### ヘルパ

| 関数 | 用途 |
|------|------|
| `baseRoom(overrides)` | ルーム doc の最小形 |
| `automatedGhostGameState()` | ゴースト自動操作シナリオ用 GS |

`firestore.rules` に書いた新バリデーション関数ごとに、**allow 1本 + deny 1本** を足すのが目安。

## テストファイル索引

### `src/utils/`

| ファイル | 主な対象 |
|----------|----------|
| `gameLogic.test.js` | 8日目遷移、すごろく、ロビー、_virtue_ 等（最大） |
| `slotBroadcastSync.test.js` | スロット同期キー |
| `slotPotJackpot.test.js` | POT / JP |
| `day8SlotReloadRecovery.test.js` | リロード復旧 |
| `assetHistoryFromGameState.test.js` | 資産履歴 |

### `src/lib/`

| ファイル | 主な対象 |
|----------|----------|
| `day8Items.test.js` | 8日目アイテム |
| `day8RoundTracking.test.js` | ラウンド管理 |
| `ghostAutomationLease.test.js` | ゴースト排他リース |
| `ghostPlayerAutomation.test.js` | ゴースト AI |
| `dailyCutinSync.test.js` | デイリーカットイン |
| `dailyActionFx.test.js` | デイリー行動 FX |
| `day7TransitionFx.test.js` | 7日目→8日目 |
| `sugorokuMovementFx.test.js` | 移動演出 |
| `sugorokuMovementFx.followUp.test.js` | 移動 follow-up |
| `gameLogFormat.test.js` | ログ形式 |
| `playerPresence.test.js` | プレイヤー存在 |
| `playerAssetHistory.test.js` | 資産履歴 |
| `progressivePot.test.js` | 累積 POT |
| `slotProxyTarget.test.js` | 代理スロット |
| `sugorokuPlayerName.test.js` | プレイヤー名 |

### `tests/`

| ファイル | 主な対象 |
|----------|----------|
| `firestore.rules.test.js` | ghost lease、ghost turn、outsider deny 等 |

## 新機能のテスト追加手順

1. ロジックを `lib/*` または `gameLogic.js` に置く（App.jsx に書かない）
2. 同ディレクトリに `*.test.js` を追加
3. `npm run test:run` で通す
4. Firestore 書き込み条件を変えたら `firestore.rules` + `tests/firestore.rules.test.js` + `test:rules:emulator`
5. 関連 reference の「関連テスト」にファイル名を追記（任意）

## トラブルシュート

| 症状 | 対処 |
|------|------|
| rules テストが `ECONNREFUSED 8080` | `test:rules:emulator` を使う（単体 `test:rules` は emulator 前提） |
| 新しい `tests/*.test.js` が `test:run` に出ない | 設計通り。`vite.config.js` の include に無い。rules 用なら `test:rules` に追加 |
| import 循環で test が落ちる | 効果を `lib/day8ItemEffects.js` のように分離（gameLogic ↔ lib 循環回避） |
| 乱数依存 | `vi.spyOn(Math, "random")` 等（`gameLogic.test.js` 参照） |

## 関連

- マルチ書き込み → [multiplayer-patterns.md](multiplayer-patterns.md)
- 8日目・アイテム → [day8-guide.md](day8-guide.md)
- リリース前チェック → [release-checklist.md](release-checklist.md)
