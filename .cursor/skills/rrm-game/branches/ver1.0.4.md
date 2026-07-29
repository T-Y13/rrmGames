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
| テスト | `npm run test:run` → **232 passed** |

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

## 次にやること（優先順）

1. **マルチ実機** — 大家選択・家賃ターン開始・日付変更・2人/3人/4人
2. **Phase 0** — `firestore.rules` deploy → 検証 `npm run deploy`
3. （任意）gameLogic の slot/day8 追加分割

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

---

## ver1.0.4 での作業ログ

（ここに commit や完了項目を追記）
