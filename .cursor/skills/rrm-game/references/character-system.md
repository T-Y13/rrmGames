# キャラクターシステム（実装構造）

## 結論（いまのコード）

**Java のようなキャラクタークラス継承ではない。**

- 正本は **`gameBalance.js` の `CHARACTERS` オブジェクト**（データ駆動）
- メイン導線（`App.jsx` の日常行動など）は **`const char = CHARACTERS[type]` を読んで共通処理**
- **数値で表せない特異処理だけ** `if (characterType === "vtuber")` 等が散在

→ **「if サラリーマン else if …」の長链にはなっていない**が、**理想の Strategy / クラス分離でもない**中間形。

---

## データ駆動（メイン）

`CHARACTERS` に載せたフィールドを、導線側が **キャラ名を意識せず** 参照する。

| フィールド | 効く場所 |
|-----------|----------|
| `skillBonus` / `luckBonus` | 初期ステ（`computeFinalStatsFromInitialRolls`） |
| `dailyLivingCost` / `startingMoney` | 生活費・初期資金 |
| `streamMultiplier` | 配信成功時の金額（`streamMult`） |
| `workRewardBonus` / `workRewardMultiplier` | 仕事報酬 |
| `ponMultiplier` | PON 上昇量 |
| `ponFireMoneyPenaltyMultiplier` | 仕事炎上ペナ（大学生 0.5） |

### 配信の例（サラリーマン）

```js
const char = CHARACTERS[p.characterType] ?? CHARACTERS.salaryman;
let streamMult = p.streamMultiplier ?? char.streamMultiplier;
// ...
const streamBaseMoney = Math.round(baseReward * streamMult);
```

サラリーマンは **`streamMultiplier: 0.8`** なので分岐不要。導線は「配信 → 金額計算 → `streamMult` を掛ける」だけ。

---

## 分岐が必要な特異処理（現状）

| キャラ | 場所 | 理由 |
|--------|------|------|
| **student** | `gameLogic.js` `calcSlotRates` | スロット JP/BIG/SMALL 固定加算（数値1つで表しにくい） |
| **vtuber** | `App.jsx` PON炎上配信 | 炎上のたび `streamMultiplier + 0.5` 永続（状態更新＋ログ） |
| **vtuber** | `App.jsx` 渋滞待ち | フレーバーログ1行 |
| **student** | `BoardViewport.jsx` | 立ち絵スケール（見た目のみ） |

これらは **キャラが3体なのでまだ少数**。大家追加時も **家賃計算・luckFixed** などは **1〜2関数に寄せれば** App.jsx に if 連打は避けられる。

---

## 理想とのギャップ

### 理想（ユーザーイメージ）

```
配信 → PON判定 → 金額配布 → キャラ内部で補正
```

### 現状

```
配信 → PON判定 → 金額配布（char.streamMultiplier を参照）
                → vtuber だけ if で倍率永続UP
```

**方向性は近い**（共通導線 + キャラデータ）。足りないのは **「キャラ固有フック」の正式な置き場**。

---

## 拡張 API（Phase 1 着手済）

**正本:** `src/lib/characterEffects.js`  
**ロードマップ:** [extensibility-roadmap.md](./extensibility-roadmap.md)

| 関数 | いつ使う |
|------|----------|
| `resolveInitialLuck` | 初期ステ（`gameLogic` から呼び出し済） |
| `applyCharacterStatGain` | 配信・神社・デイリースロットのステ加算（Phase 2 で App 接続予定） |
| `computePassiveRentIncome` | 大家の家賃（Phase 5） |

### `CHARACTERS` 任意フィールド

| フィールド | デフォルト | 用途 |
|-----------|-----------|------|
| `luckFixed` | — | 初期運固定（ロール無視） |
| `statGainMultiplier` | 1 | ステ獲得 debuff |
| `rentIncomeRate` | 0 | 他プレイヤー生活費合計×率 |
| `multiplayerOnly` | false | ロビー制限（将来） |

---

## 大家追加時の推奨（if 連打を避ける）

1. **数値は `CHARACTERS.landlord` に寄せる**  
   `rentIncomeRate`, `statGainMultiplier`, `luckFixed`, `dailyLivingCost: 150`

2. **ロジックは `lib/characterEffects.js` に集約**（**実装済**）  
   - `applyCharacterStatGain(char, delta)`  
   - `computePassiveRentIncome(players, playerId, char)`  
   導線は `char.rentIncomeRate > 0` 程度

3. **App.jsx に `if (landlord)` を増やさない**  
   汎用: `if (char.rentIncomeRate > 0) { ... }`

4. **リリムの vtuber 分岐を将来 hooks に移す**（任意リファクタ）  
   ```js
   CHARACTER_HOOKS.vtuber.onStreamPonFire({ player, streamMult }) → newMult
   ```

---

## 触るファイル（キャラ追加の定番）

| ファイル | 役割 |
|----------|------|
| `constants/gameBalance.js` | `CHARACTERS` 定義 |
| `utils/gameLogic.js` | 初期ステ・スロット率・`makePlayer` |
| `App.jsx` | 1〜7日目行動・8日目移動（最太） |
| `lib/ghostPlayerAutomation.js` | ゴーストの同ロジック鏡写 |
| `components/DailyActionPhase.jsx` | 行動ボタン表示用の試算 |
| `components/CharacterPieces.jsx` | 立ち絵 |
| `WaitingRoom.jsx` | 選択UI |

---

## 関連

- 次期キャラ案: [next-character-landlord.md](./next-character-landlord.md)
- プレイヤー向けルール: [game-rules.md](./game-rules.md)
