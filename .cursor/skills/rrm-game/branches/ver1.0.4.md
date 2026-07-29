# ver1.0.4（作業中 — 引き継ぎ正本）

- **ブランチ:** `ver1.0.4`
- **切り出し元:** `develop`（`155e37d` 時点）
- **リモート:** `origin/ver1.0.4`（作成後 push）
- **Git tip:** `git log -1 --oneline` on `ver1.0.4`
- **記録更新:** 2026-07-29

> **新しいチャットで作業再開するとき:** このファイル → [develop.md](develop.md) → [ver1.0.3.md](ver1.0.3.md)（完了分の詳細）→ [game-rules.md](../references/game-rules.md)

---

## ブランチ方針

```
ver1.0.4（作業） → develop（検証） → main（本番）
```

`ver1.0.4` は **develop から切った作業ブランチ**。完了した変更は `develop` にマージして検証 deploy する。

---

## 引き継ぎ元（ver1.0.3 / develop）

`ver1.0.3` で完了済みの主な内容（詳細は [ver1.0.3.md](ver1.0.3.md)）:

| 項目 | 状態 |
|------|------|
| 拡張性 Phase 1〜5 | **完了** |
| 大家（landlord） | **実装済** |
| 家賃タイミング | ターン開始・1日1回 |
| 8日目アイテム Phase 1 | **実装済** |
| タクシーログ二重 | **修正済**（`logsAlreadyWritten`） |
| テスト | `npm run test:run` → **237 passed** |

---

## 現在の状態（2026-07-29 開始時）

| 項目 | 状態 |
|------|------|
| コード差分 | `develop` と同一（作業開始直後） |
| マルチ実機 | **未** |
| Firestore rules deploy | **未** |
| 検証 Hosting deploy | **未** |
| 本番 `deploy:prod` | **明示依頼まで禁止** |

---

## 未デプロイ / 未確認（ver1.0.3 から継続）

- [ ] Firestore rules deploy（stale cutin 等）
- [ ] Hosting 検証 `npm run deploy`
- [ ] **大家マルチ実機**（2人以上・家賃・日跨ぎ・ゴースト）
- [ ] Hosting 本番 `deploy:prod` — 明示依頼まで出さない

---

## 既知・回収予定

| 優先 | 内容 |
|------|------|
| 中 | SP: スロット HUD 折りたたみ / サイドバー → ボトムタブ |
| 低 | `.agents/` を `.gitignore` に |

---

## ver1.0.4 の主題 — スロット目押し（段階実装）

**ゴール:** 基本は今まで通り（結果はスピン開始時に確定）。**チャンスタイミングがたまに発生**し、そのときだけ**完全な目押し**（停止位置が配当に影響）。それ以外は従来どおり。

**正本:** 本節（作業ブランチ）＋実装時は [day8-guide.md](../references/day8-guide.md) のスロット節も同期。

### 現状アーキテクチャ（目押し前）

```
掛け金確定 → spinSlot() で tier + reels 確定（gameLogic.js）
           → Firestore: slotPhase=spinning, targetResult, slotVisualReels
           → SlotMachine: setTimeout 連鎖で左→中→右停止（操作者）
           → SlotSpinBroadcastOverlay: 同タイミングで観戦ミラー
```

目押し実装の**最大リスク**は UI ではなく **「停止タイミングの権威（誰がいつ止めたか）」とマルチ同期**。

---

### 推奨フェーズ（ユーザー案 + 整理）

| Phase | 内容 | 旧案 | 配当への影響 | 規模感 |
|-------|------|------|--------------|--------|
| **0** | **設計・定数・テスト骨格** | （追加） | なし | 小〜中 |
| **A** | **停止ボタン + 手動停止** | 1+2 まとめ | **なし**（`spinSlot` 結果のまま） | 中 |
| **B** | **チャンス時の完全目押し** | 3 | **あり**（停止位置で tier 決定） | **大** |
| **C** | **チャンス混入（確率・条件）** | 4 | チャンス時のみ B、他は従来 | 中 |

#### Phase 0（先にやる — 実装と並行可）

**チャンスタイミング（確定 2026-07-29、数値更新）**

| 項目 | 内容 |
|------|------|
| **ガセリーチ発生** | ハズレの **18%**（`BAL.slot.nearMissReachChance`、旧 12%） |
| **目押し付与** | ガセリーチ成立スピンの **70%**（`BAL.slot.gaseReachSkillStopChance`、旧 30%） |
| **対象演出** | `tier=miss` かつ 1・2リール同絵柄・3リール目だけ外れ（当たり／小当たり**風**） |
| **それ以外** | 従来どおり（結果は `spinSlot` 確定・自動停止） |

**体感頻度（目安・デフォルト stats、miss≈85%）**

| 単位 | 確率 | 間隔の目安 |
|------|------|------------|
| 1スピン（目押し） | **約 10.7%** | 約 **9〜10回に1回** |
| 1スロット席（3スピン） | **約 29%** | 約 **3.5席に1回**（≈4席に1回のイメージ） |
| ガセリーチ（目押し前） | 約 15.3% | 約 6〜7回に1回 |

計算: `0.85 × 0.18 × 0.70 ≈ 0.107` / スピン

- [x] `gameBalance.js` — `nearMissReachChance: 0.18`, `gaseReachSkillStopChance: 0.7`
- [x] `lib/slotReelStop.js` — `isGaseReachVisual`, `resolveSlotSkillStopContext`, `buildSlotSpinVisualPlan`
- [x] 単体テスト `slotReelStop.test.js`
- [ ] Firestore フィールド実装: `slotSkillStopActive`, `slotSkillStopMode`（Phase A/B で書き込み）
- [ ] ゴースト／代理スロット: チャンス時は **自動停止（ランダム窓内）** — Phase B 前に実装
- [x] **8日目先行**（デイリースロットは `buildDailySlotSpinVisualPlan` 経由で同じ判定を返すのみ・UI は後回し）

#### Phase A — 停止ボタン + 手動停止（旧 1+2 統合推奨）

**まとめる理由:** 旧 1 単体は「ボタンが飾り」だけで、リール停止経路は触らない。旧 2 は停止経路の refactor が本体で、ボタン UI も同時に必要。**1 と 2 を分けると PR が細かすぎて、2 で 1 の UI がほぼ書き直される**。

- [ ] 停止ボタン UI（PC / SP タップ領域）
- [ ] `setTimeout` 自動停止 → **未押下なら従来タイミングでフォールバック**（既存挙動維持）
- [ ] 押下で該当リールを停止（**絵柄は `targetResult` / `visualReels` 通り**）
- [ ] 観戦側 `SlotSpinBroadcastOverlay` は従来タイマー同期のまま
- [ ] 単体テスト: 停止シーケンス状態機械（可能な範囲）

**DoD:** 操作感だけ変わり、ログ・配当・確率は bit 一致。

#### Phase B — チャンス時の完全目押し（旧 3）

- [ ] チャンススピンでは `spinSlot` の tier を**即確定しない**／または確定後に**停止位置で上書き可能**な設計を確定（要設計判断）
- [ ] リール停止位置 → tier マッピング（目押し窓・許容誤差）
- [ ] マルチ: 停止タイミングの検証 or サーバー権威（不正防止）
- [ ] SE / カットイン（既存リーチ演出との関係）
- [ ] `game-rules.md` 更新

**DoD:** チャンス時のみ、止めた位置で意図した役が出る。

#### Phase C — チャンス混入（旧 4）

- [ ] スピン開始時に `slotSkillChance` フラグ（または tier 側メタ）
- [ ] 非チャンス → Phase A と同じ（結果確定済み・手動停止は演出のみ）
- [ ] チャンス → Phase B
- [ ] バランス調整・テスト

---

### まとめた方がよい／分けた方がよい

| 判断 | 理由 |
|------|------|
| **1+2 → Phase A に統合** | 2 の実装が 1 を包含。1 単独リリースの価値が薄い |
| **0 は独立** | B の前にマルチ・ゴースト方針を決めないと手戻り大 |
| **3 と 4 は分離** | B が動かないと C の「混ぜる」がテストできない |
| **B をさらに分割するなら** | B1=ローカルソロのみ目押し / B2=マルチ同期（検証負荷で分割） |

---

### 目押しと並行してやるとよいこと（ブロッカーではない）

| 項目 | タイミング | メモ |
|------|------------|------|
| Firestore rules deploy | Phase A 前後 | スロット新フィールドを足すなら A 完了時に rules 更新 |
| 大家マルチ実機 | Phase A 後 | スロット変更と同時だと切り分け困難 |
| SP スロット HUD 折りたたみ | Phase A と一緒 | 停止ボタン配置とセットでレイアウト決定 |
| `SlotMachine.jsx` の停止ロジック抽出 | **Phase A の一部** | 巨大ファイル回避・B の土台 |
| ゴースト自動停止 | Phase B 前に方針 | 実装なしだとチャンス時に詰まる |

**ver1.0.3 からのバックログ**（目押しと独立）: Phase 0 deploy、大家マルチ、gameLogic 分割は **目押し Phase A が動いてから**でも可。

---

### 触るファイル（想定）

| 層 | ファイル |
|----|----------|
| 定数 | `constants/gameBalance.js` |
| 純ロジック | `utils/gameLogic.js`（`spinSlot` 拡張）、新規 `lib/slotReelStop.js` |
| UI 操作者 | `SlotMachine.jsx`, `SlotReelCanvasView.jsx` |
| 観戦 | `SlotSpinBroadcastOverlay.jsx`, `Day8SlotSpectatorMirror.jsx` |
| ゴースト | `lib/ghostPlayerAutomation.js` |
| ルール | `references/game-rules.md`, `day8-guide.md` |

---

## 次にやること（優先順）

1. **Phase 0** — チャンス定義・Firestore フィールド案・`slotReelStop` 骨格
2. **Phase A** — 停止ボタン + 手動停止（結果は現状維持）
3. Phase B → C（目押し本体 → 混入）
4. （並行）大家マルチ実機、rules deploy

---

## ver1.0.4 での作業ログ

- **Phase 0（目押し設計）** — ガセ **18%** × 目押し **70%**（`nearMissReachChance` / `gaseReachSkillStopChance`）、`lib/slotReelStop.js` + テスト。約10.7%/スピン・約29%/席（Phase B まで UI/Firestore 未接続）

---

## 引き継ぎチェックリスト（新チャット用）

```
git checkout ver1.0.4 && git pull && git status
```

- [ ] 本ファイル（`branches/ver1.0.4.md`）を読んだ
- [ ] [develop.md](develop.md) — ブランチ役割
- [ ] [extensibility-roadmap.md](../references/extensibility-roadmap.md) — Phase 0 残
- [ ] [game-rules.md](../references/game-rules.md) — 大家・家賃タイミング
- [ ] `npm run test:run` が green

