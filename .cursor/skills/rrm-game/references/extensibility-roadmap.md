# 拡張性整備ロードマップ

**目的:** 大家（大家）実装前に、キャラ・日常行動を App 直書きせず載せられる土台を作る。

**大家実装のブロッカー:** Phase 1 完了 + Phase 2（daily + ghost 統合）完了。

---

## フェーズ一覧

| Phase | 内容 | 状態 |
|-------|------|------|
| **0** | テストゲート・rules deploy 手順・既知バグ整理 | 進行中 |
| **1** | `lib/characterEffects.js` 土台 | **完了（2026-07-29）** |
| **2** | `lib/dailyActions/` + ghost 統合 | **完了（2026-07-29）** |
| **3** | `constants/gamePhases.js` 定数化 | **完了（2026-07-29）** |
| **4** | `gameLogic.js` ドメイン分割（継続） | 未着手 |
| **5** | 大家実装 | Phase 2 後 |

---

## Phase 1 完了内容（2026-07-29）

**新規:** `src/lib/characterEffects.js`

| 関数 | 役割 |
|------|------|
| `resolveInitialLuck(char, luckRoll)` | `luckFixed` 対応（既存キャラは従来どおり） |
| `applyCharacterStatGain(char, statKey, delta)` | `statGainMultiplier`（未設定=1.0） |
| `computePassiveRentIncome(players, playerId, char)` | `rentIncomeRate`（未設定=0） |
| `luckGaugeRangeForCharacter(char)` | 待機室ゲージ用 |

**変更:** `gameLogic.js` — 初期運を `resolveInitialLuck` 経由（挙動不変）

**テスト:** `characterEffects.test.js`（9 cases）

**未着手（Phase 1 残）:** App / ghost から `applyCharacterStatGain` 呼び出し（Phase 2 と同時で可）

---

## Phase 2 進捗（2026-07-29）

**新規:** `src/lib/dailyActions/`

| ファイル | 内容 |
|---------|------|
| `work.js` | `computeWorkPayout` / `applyWorkIncomeToStats`（`applyCharacterStatGain` 接続済） |
| `shared.js` | お守り・生活費+PON（ゴースト用） |
| `resolveDailyAction.js` | `work` 解決（ゴースト正本） |

**接続:** `App.jsx`（仕事報酬）、`ghostPlayerAutomation.js`（`resolveWorkDailyAction`）、`DailyActionPhase.jsx`（表示）

**追加（2026-07-29 完了）:** shrine / stream / dailySlot も同パターンで切り出し済

---

## Phase 2 完了内容（2026-07-29）

| モジュール | App | ghost | UI |
|-----------|-----|-------|-----|
| work.js | ✓ | ✓ | ✓ |
| shrine.js | ✓ | — | — |
| stream.js | ✓ | — | ✓ |
| dailySlot.js | ✓ | — | — |

**残:** Phase 3 以降（App.jsx 全面置換等）

---

## Phase 3 進捗（2026-07-29）

**新規:** `src/constants/gamePhases.js`

- `GAME_PHASE` / `SUB_PHASE` / `MOVE_PHASE` 定数
- `isDailySubPhase` / `isDay8SubPhase` / `isFinalBattlePhase` 等ヘルパ

**接続:** `gameLogic.js`（initialGameState・遷移）、`dailyActions/`、`ghostPlayerAutomation.js`、**`App.jsx`（全面置換済）**

---

## Phase 3 完了内容（2026-07-29）

- `src/constants/gamePhases.js` — 定数 + ヘルパ
- 上記ファイル群で `"daily"` / `"day8"` / `"moving"` 等の直書きを排除

**次:** Phase 4（`gameLogic.js` ドメイン分割）

---

## Phase 2 予定（完了）

1. `lib/dailyActions/work.js` — 仕事1手を純関数化
2. `resolveDailyAction(gs, playerIdx, actionType, ctx)`
3. `ghostPlayerAutomation` を同関数経由に
4. テスト 10本+

切り出し順: work → shrine → PON → stream → dailySlot

---

## 大家 Definition of Done

- [ ] Phase 2 完了
- [ ] `CHARACTERS.landlord` は data + `characterEffects` のみ
- [ ] App に `if (landlord)` なし
- [ ] ghost も同じ daily / rent 関数
- [ ] `game-rules.md` 更新
- [ ] マルチ実機確認

---

## 関連

- [character-system.md](./character-system.md)
- [next-character-landlord.md](./next-character-landlord.md)
- [release-checklist.md](./release-checklist.md)
