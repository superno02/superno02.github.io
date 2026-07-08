---
name: update-content
description: Use when 需要新增、修改或刪除履歷網站的內容——學經歷、技能、專案作品、自我介紹、聯絡方式，或使用者提供了新的履歷資訊、說「幫我改網站內容／加一段經歷／更新技能」時
---

# 更新履歷內容

## 核心原則

**內容只住在 `js/data.js` 一個檔案裡。** 改內容絕不碰 `index.html`、`css/`、`js/main.js`；
如果發現需要動版面才能放進新內容，先停下來回報使用者，不要順手改版面。

**唯一例外（no-JS fallback 同步）**：`index.html` 內有幾處靜態文字是給不執行 JS 時看的 fallback，main.js 平常會用 `data.js` 的值覆寫它們。改到對應欄位時，必須同步更新：

- 改 `about.intro` → 同步把 `#intro-text` 的內文改成與 `data.js` 完全同文（保留其中的 `<span class="cursor">▌</span>`）
- 改 `about.level` → 同步更新 `#char-level`（格式為 `Lv.<level>`）
- 改 `about.title` → 同步更新 `#char-title` 的靜態文字

除了這三個 fallback 欄位以外，仍然絕不碰 `index.html` 其他部分。

## 流程

1. 讀 `js/data.js`，找到對應的資料區塊（skills / experience / about / contact）
2. 修改資料。日期、公司名、職稱等事實以使用者提供的內容為準，不可自行推測補寫
3. **隱私檢查（紅線）**：新內容不得包含電話、住址、LINE ID、年齡；
   聯絡方式只允許 Email 與 LinkedIn 連結
4. 實跑隱私掃描（命令見專案 CLAUDE.md「常用命令」），確認輸出為空
5. 本機預覽實開（`python3 -m http.server 8000`），確認：
   - 新內容正確顯示、分頁切換正常、無 console error
   - DevTools 裝置模式 375px 寬無爆版
6. 逐項回報 CLAUDE.md「完成前檢查清單」結果

## 快速對照

| 要改的東西 | data.js 內對應區塊 |
|---|---|
| 技能、能力值條 | skills |
| 公司經歷、年資 | experience |
| 自我介紹、對外名稱（Ant） | about |
| Email、LinkedIn | contact |

## 常見錯誤

- ❌ 把內容寫死在 `index.html` 裡 → 之後改內容要翻版面程式碼，違反資料分離
- ❌ 從 `顏宏益.pdf` 整段複製貼上 → PDF 含電話地址等個資，必須逐句過濾
- ❌ 改完沒開瀏覽器就宣稱完成 → 「應該會正常」= 沒驗證，檢查清單必須實跑
