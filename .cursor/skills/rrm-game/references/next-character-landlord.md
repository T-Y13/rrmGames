# 次期キャラクター案：大家（おばあちゃん／おじいちゃん）

**ステータス:** **実装済**（ver1.0.3 / Phase 5）

正本の数値・既存キャラ定義: `src/constants/gameBalance.js` → `CHARACTERS`

---

## コンセプト

| 軸 | 内容 |
|----|------|
| 定位 | **マルチ特化・資産型**（ステ弱・金強） |
| 既存との差 | サラリーマン＝技量／仕事、大学生＝運／配信ギャンブル、リリム＝PON配信スノーボール |
| ソロ | **非推奨 or 選択不可**（他プレイヤー不在で家賃0） |

---

## ステータス（開始時）

| 項目 | 値 | 備考 |
|------|-----|------|
| 技量 | **-20**（ロール補正） | 開始おおよそ 10〜35 |
| 運 | **3 固定** | 初期ダイス無視。ラッキーダイス・スロット運依存は放棄 |
| 善行 | **+10**（ロール補正） | 完全ゼロにはしない |
| 生活費 | **`dailyLivingCost: 150` 想定** | 初期ダイスで **50〜300G**（既存式の `max(50, …)`） |

### 生活費（既存システム）

待機室の運・技量・善行ダイス → 生活費ロール → 既存公式:

```
生活費 = max(50, 200 + 生活費ロール×50 + (dailyLivingCost - 300))
```

大家 `dailyLivingCost: 150` の例:

| 生活費ロール | 生活費 |
|-------------|--------|
| 0 | 50G |
| 2 | 150G |
| 5 | 300G |

---

## パッシブ：家賃収入（不労所得）

| 項目 | 値 |
|------|-----|
| 計算 | **生存中の他プレイヤーの `stats.livingCost` 合計 × 70%** |
| タイミング | 1〜7日目・**自分のターン開始時・1日1回**（行動前。`lastRentCollectedDay` で重複防止） |
| 対象 | 自分以外の生存プレイヤー（脱落者・ゴースト扱いは実装時に明記） |
| ログ例 | `🏠 家賃収入 +560G（他プレイヤー生活費合計の70%）` |

### 参考試算（生活費500の大家）

| 人数 | 他プレイヤー例 | 家賃/日 | 生活費50時の差引 |
|------|----------------|---------|------------------|
| 2人 | サラリーマン500 | 350G | +300G |
| 3人 | 500+300 | 560G | +510G |
| 4人 | 500+300+300 | 770G | +720G |

---

## デバフ：ステータス上昇

| 項目 | 値 |
|------|-----|
| 倍率 | 獲得ステータス **×0.8**（切り捨て or 四捨五入は実装時決定） |
| 対象 | **配信**（善行・技量）、**神社**（運・善行等）、**デイリースロット**（技量） |
| 非対象（案） | 仕事の善行+10、8日目アイテム、マス効果 |

配信・仕事の**金銭**自体は debuff しない（金は家賃＋行動で稼ぐ）。

---

## プレイ像

- **1〜7日目:** 家賃が生活費を上回りやすい（3〜4人）。配信はメイン行動の一つだが、ステは伸びにくい。
- **8日目:** 資金でスロットに投資。運3・低技量のため当たりは運任せ。代理スロット・POTとの相性は要プレイテスト。

---

## 実装時のキー（案）

```js
// gameBalance.js — CHARACTERS.landlord（key名は要決定）
{
  key: "landlord",
  label: "大家",
  skillBonus: -20,
  luckFixed: 3,              // 新フィールド：ロール無視
  virtueBonus: 10,
  dailyLivingCost: 150,
  statGainMultiplier: 0.8,   // 新フィールド
  rentIncomeRate: 0.7,       // 新フィールド：他プレイヤー生活費合計に対する率
  multiplayerOnly: true,       // ロビー制御用（案）
  // streamMultiplier: 1.0 等はデフォルト
}
```

---

## 実装時チェックリスト

- [x] `luckFixed` — `resolveInitialLuck`（Phase 1、`characterEffects.js`）
- [x] 家賃計算 — `computePassiveRentIncome`（Phase 1、未接続）
- [x] ステ debuff API — `applyCharacterStatGain`（Phase 1、App 未接続）
- [x] Phase 2 完了（daily + ghost 統合）
- [x] ターン開始時に家賃 — `applyTurnStartRentToPlayer` / `applyDailyRentForAllEligible`（`gameLogic.js`）
- [x] UI — `DailyActionPhase` に `家賃：＋{amount}G`（`previewTurnStartRentAmount`）
- [x] ooya 画像 — `assets.js` / `assetLoader.js`（`icon_ooya`, `ooya`, `stumble_gambling_ooya`, `fell_down_ooya`）
- [x] 配信／神社／デイリースロット — `applyCharacterStatGain` 接続済
- [x] `ghostPlayerAutomation.js` — `resolveWorkDailyAction` 経由で家賃同期
- [x] ソロ — `multiplayerOnly` でロビー選択不可
- [x] `game-rules.md` 更新
- [ ] マルチ実機確認

**Phase 1 詳細:** [extensibility-roadmap.md](./extensibility-roadmap.md)

---

## 変更履歴

| 日付 | 内容 |
|------|------|
| 2026-07-29 | 初版（設計合意：ステ debuff + 家賃70% + 生活費50〜変動） |
