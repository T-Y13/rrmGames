# ver1.0.3（完了 — develop に取り込み済）

- **ブランチ:** `ver1.0.3`
- **リモート:** `origin/ver1.0.3`（push 済み想定 — 作業再開時は `git fetch && git status`）
- **Git tip:** `git log -1 --oneline` on `ver1.0.3`
- **記録更新:** 2026-07-29

> **新しいチャットで作業再開するとき:** このファイル → [extensibility-roadmap.md](../references/extensibility-roadmap.md) → [game-rules.md](../references/game-rules.md) の順に読む。

---

## 現在の状態（2026-07-29）

| 項目 | 状態 |
|------|------|
| 拡張性 Phase 1〜5 | **完了・commit 済** |
| 大家（landlord） | **実装済** — バランスは現状 OK（変更なし合意） |
| 家賃タイミング | **ターン開始・1日1回**（`lastRentCollectedDay`）— 行動後徴収は廃止 |
| ooya 画像 | **追加・wire 済** |
| テスト | `npm run test:run` → **232 passed** |
| マルチ実機 | **未** |
| deploy | **未**（明示依頼まで `deploy:prod` 禁止） |

---

## 拡張性ロードマップ（Phase 0〜5）

| Phase | 内容 | 状態 |
|-------|------|------|
| 0 | テストゲート・rules deploy・既知バグ整理 | 進行中 |
| 1 | `lib/characterEffects.js` | **完了** |
| 2 | `lib/dailyActions/` + ghost | **完了** |
| 3 | `constants/gamePhases.js` | **完了** |
| 4 | `gameLogic/` 分割（core / initialStats / virtueEffects） | **完了（第1弾）** |
| 5 | 大家 | **完了** |

詳細: [references/extensibility-roadmap.md](../references/extensibility-roadmap.md)

---

## 大家（landlord）実装メモ

### 数値（`gameBalance.js` → `CHARACTERS.landlord`）

- `luckFixed: 3`, `skillBonus: -20`, `virtueBonus: 10`
- `dailyLivingCost: 150`（ロールレンジは他キャラ同様）
- `statGainMultiplier: 0.8`（配信・神社・デイリースロットのステのみ）
- `rentIncomeRate: 0.7`, `multiplayerOnly: true`

### 家賃フロー

1. **ゲーム開始** — 1日目・各大家に1回
2. **日付繰り上げ** — 新しい日・全大家に1回（8日目はスキップ）
3. **手番交代** — その日まだ徴収していなければ大家ターン開始時に1回
4. **UI** — `DailyActionPhase` 上部 `家賃：＋{amount}G`（`text-amber-300`）

### キーファイル

| 用途 | パス |
|------|------|
| 家賃ロジック | `src/lib/characterEffects.js` — `applyTurnStartRentToPlayer`, `applyDailyRentForAllEligible`, `previewTurnStartRentAmount`, `lastRentCollectedDay` |
| ターン/日次フック | `src/utils/gameLogic.js` — `initialGameState`, `computeAdvanceDaily` |
| 行動後生活費（家賃なし） | `src/lib/dailyActions/shared.js` |
| ロビー制限 | `src/components/WaitingRoom.jsx` — `isCharacterSelectableInLobby` |
| 画像 | `src/constants/assets.js`, `src/utils/assetLoader.js`, `public/images/*ooya*` |
| 設計 | [references/next-character-landlord.md](../references/next-character-landlord.md) |

### App.jsx 方針

- **`if (landlord)` なし** — `rentIncomeRate` / `characterEffects` でデータ駆動

---

## ver1.0.3 上の commit 列（拡張性 + 大家）

| commit | 内容 |
|--------|------|
| `0f0279f` | Phase 1: characterEffects API |
| `85c7453`〜`3317cdb` | Phase 2: dailyActions（work/shrine/stream/dailySlot） |
| `89d60dc`, `388f877`, `b95f2c5` | Phase 3: gamePhases |
| `a29483c` | Phase 4: gameLogic 分割 |
| `3f7c6d7` | Phase 5: landlord 本体 |
| `82eba4a` | ooya 画像 + 家賃ターン開始 + UI |
| `cf9235e` | 引き継ぎ doc + rules / roadmap 同期 |

---

## 8日目・その他（main からの継続機能）

**8日目15ラウンド・手番ごと3スピン・資産グラフ** — [day8-guide.md](../references/day8-guide.md)

**8日目アイテム Phase 1** — dash / lucky / gold、`Day8ItemBar.jsx`

**ルール正本:** [references/game-rules.md](../references/game-rules.md)

---

## テスト

```bash
npm run test:run              # 232 passed（2026-07-29）
npm run test:rules:emulator   # rules 変更後
npm run dev                   # localhost:5173
```

---

## 未デプロイ / 未確認

- [ ] Firestore rules deploy（stale cutin 等）
- [ ] Hosting 検証 `npm run deploy`
- [ ] **大家マルチ実機**（2人以上・家賃表示・日跨ぎ・ゴースト）
- [ ] Hosting 本番 `deploy:prod` — **明示依頼まで出さない**

---

## 既知・回収予定

| 優先 | 内容 |
|------|------|
| 高 | ~~タクシー行ログ**二重**（同一ターン2行）~~ → **修正済**（`logsAlreadyWritten`） |
| 高 | `🎒 …アイテムを使わずに手番開始` — **旧 gate 廃止済**。新規ゲームでは出ない（既存 Firestore ルームの履歴のみ） |
| 中 | SP: スロット HUD 折りたたみ / サイドバー → ボトムタブ |
| 中 | ~~SP すごろく：PC でもダイス横並び・吹き出し向き~~ → **修正済**（`md+` でダイス上積み・しっぽ向き切替） |
| 低 | `.agents/` を `.gitignore` に |

---

## 次にやること（優先順）

1. **マルチ実機** — 大家選択・家賃ターン開始・日付変更・2人/3人/4人
2. **Phase 0** — `firestore.rules` deploy → 検証 `npm run deploy`
3. ~~タクシーログ二重・旧 gate ログの再現調査~~ → **完了**（タクシー修正・gate は廃止済みで新規発生なし）
4. （任意）gameLogic の slot/day8 追加分割

---

## 引き継ぎチェックリスト（新チャット用）

```
git checkout ver1.0.3 && git pull && git status
```

- [ ] 本ファイル（`branches/ver1.0.3.md`）を読んだ
- [ ] [extensibility-roadmap.md](../references/extensibility-roadmap.md) — Phase 0 残と DoD
- [ ] [game-rules.md](../references/game-rules.md) — 大家・家賃タイミング
- [ ] `npm run test:run` が green
- [ ] マルチ作業なら rules emulator / 検証 deploy の要否を確認

### 会話コンテキストの要約（2026-07-29 終了時点）

- ユーザーは拡張性 Phase 1〜5 を**順番に commit**し、大家を追加した
- 家賃は当初「日常行動後」だったが **ターン開始・毎日1回** に修正済（UI も `家賃：＋550` 表示）
- ooya 画像を `public/images/` に追加し wire 済
- パワーバランスは**現状維持**で OK
- commit + push + doc 更新を依頼（本セッション）

---

## アーキテクチャ（キャラ拡張）

```
gameBalance.js (CHARACTERS.*)
    ↓
characterEffects.js (luckFixed, statGain, rent)
    ↓
dailyActions/* + gameLogic.js (turn/day hooks)
    ↓
App.jsx / DailyActionPhase / WaitingRoom (データ駆動、キャラ名分岐なし)
```
