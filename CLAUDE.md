# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案目的

Ant（iOS 工程師，10+ 年資歷）的自我介紹求職履歷網站。
繁體中文內容、網頁 RPG 遊戲風格，發布到 GitHub Pages（`<帳號>.github.io`）成為公開對外網頁。

設計文件：`docs/superpowers/specs/2026-07-08-resume-site-design.md`

## 技術棧

- 純 HTML / CSS / JavaScript（ES6+），**零 build 工具、零外部依賴**
- 新增任何依賴（框架、函式庫、CDN 引用）前必須先問使用者

## 檔案結構與職責

```
index.html   # 唯一 HTML 骨架：分頁容器與選單
css/style.css   # RPG 風格樣式＋響應式（手機 375px 基準）
js/data.js      # 履歷內容資料 —— 改內容只准動這檔
js/main.js      # 分頁切換、打字機等動態效果 —— 不放內容資料
assets/         # 圖片等靜態資源
.claude/skills/ # 專案 skills（見下方路由表）
```

核心原則：**內容（data.js）與版面（其他檔案）分離**。改履歷內容不碰版面，改版面不碰內容。

## 常用命令

```bash
# 本機預覽（macOS 內建 Python，免安裝），開 http://localhost:8000
python3 -m http.server 8000

# 隱私掃描（deploy 前必跑；預期輸出為空）
grep -rnE "09[0-9]{2}[- ]?[0-9]{3}[- ]?[0-9]{3}|line[I]D|line [I]D" \
  --include="*.html" --include="*.js" --include="*.css" --include="*.md" . \
  | grep -v backups/
```

## 紅線（硬規則，逐條確認不可跳過）

1. **個資保護**：網站與 repo 中只允許出現 Email 與 LinkedIn 連結；
   電話、住址、LINE ID、年齡、`顏宏益.pdf` 本體**絕不**出現在任何會 commit 的檔案裡
2. `.gitignore` 必須維持排除：`*.pdf`、`backups/`、`.scratch/local/`、`docs/superpowers/`
3. 對外名稱用 **Ant**（本名只出現在必要處，如頁面標題可用「Ant（顏宏益）」——要用前先問使用者）
4. 這是公開 repo：不得 commit 任何金鑰、Token、密碼
5. push 到 GitHub 前必須完成下方檢查清單，且 push 屬對外發布——第一次 push 前要使用者確認

## Skills 路由表

| 情境 | 用 skill |
|---|---|
| 要新增／修改履歷內容（學經歷、技能、聯絡方式） | `update-content` |
| 要發布或更新 GitHub Pages 網頁 | `deploy` |

## 完成前檢查清單（每次改動後逐項回報「通過／不適用」）

1. 隱私掃描命令實跑，輸出為空
2. 本機預覽實開：分頁切換正常、無 console error
3. 瀏覽器 DevTools 裝置模式 375px 寬：無橫向捲軸、文字不溢出
4. 頁面內所有連結點過一遍（Email、LinkedIn、外部連結）
5. `git status` 確認沒有 `*.pdf` 或 backups/ 檔案被 staged

## GitHub Pages 部署摘要

- Repo 名稱必須是 `<GitHub帳號>.github.io`（個人主頁），branch：`main`
- 首次設定：GitHub repo → Settings → Pages → Source 選「Deploy from a branch」→ `main` / root
- push 後約 1–2 分鐘生效，網址 `https://<帳號>.github.io/`
- 完整步驟與驗證方式見 `deploy` skill
