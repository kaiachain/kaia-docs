# 國際化

Kaia Docs 的目標是讓全球觀眾都能使用。 我們感謝社群對翻譯和改進我們的文件所做的貢獻。

## 可用語言

Kaia Docs 目前提供下列語言版本：

- [English](https://docs.kaia.io/)
- [한국어](https://docs.kaia.io/ko/)
- [日本語](https://docs.kaia.io/ja/)
- [簡体中文](https://docs.kaia.io/zh-CN/)
- [繁體中文](https://docs.kaia.io/zh-TW/)
- [Tiếng Việt](https://docs.kaia.io/vi/)

## Kaia Docs 翻譯如何運作

- **English** 為原始語言，在 [GitHub](https://github.com/kaiachain/kaia-docs) 中管理。
- 英文內容更新時，變更會同步到我們的翻譯管理平台 [Crowdin](https://crowdin.com/project/kaia-docs)。
- 部分語言 (日文、簡體與繁體中文、韓文和越南文) 採用**機器翻譯 (MT)**，可立即存取新內容。
- **人工審查和改進**：社群貢獻者和版主會審查和改進 Crowdin 中的翻譯。
- **自動更新**：翻譯通過後，Crowdin 會建立一個 pull request (PR) 到 Kaia Docs GitHub 套件庫。 合併時，會更新多語言文件網站。

![Kaia Docs 翻譯工作流程](/img/misc/translation-workflow.svg)

## 如何透過 Crowdin 貢獻翻譯作品

Kaia Docs 的所有翻譯都透過協同翻譯平台 Crowdin 進行管理。

1. **前往 [Crowdin 上的 Kaia-Docs 專案](https://crowdin.com/project/kaia-docs).**
2. \*\* 建立 Crowdin 帳戶\*\* (若您已有 Crowdin 帳戶，請登入)。
3. **從專案頁面選擇您想要貢獻的語言**。 如果您的語言沒有列出，您可以 [在 GitHub 上開啟一個問題](https://github.com/kaiachain/kaia-docs/issues/new?assignees=&labels=content-translation&template=feature_request.md&title=%5BLang%20Request%5D%3A%20Add%20\[Your%20Language]) 使用 `content-translation` 標籤來要求一個新的語言。
4. **加入您所選擇語言的翻譯團隊**。 您的請求可能需要專案經理的核准。
5. **選擇您要翻譯或檢閱的檔案**。
6. **開始翻譯：** 使用 Crowdin 線上編輯器。
   - 輸入來源字串的新翻譯。
   - 對現有翻譯提出改進建議。
   - 對他人提出的建議進行投票。
   - 如果您有問題或想討論特定的字串，請留下意見。
7. \*\* 快速 QA 檢查清單 (審核員)：\*\*
   - ✔️ 保留不可翻譯的內容，例如英文的程式碼片段、指令、變數名稱和品牌名稱 (在 Crowdin 中使用「隱藏顯示」功能)。
   - ✔️ 按一下編輯器中的「條款」標籤，以符合 Kaia Terminologies。
   - ✔️ 著重於功能表項目、標題和標題的清晰度。

![Crowdin 編輯介面](/img/misc/crowdin-editor.png)

詳細的編輯器用法，請參考官方 [Crowdin documentation](https://support.crowdin.com/online-editor/)。

## 翻譯角色

- \*\* 翻譯員\*\*：任何在 Crowdin 上加入專案的人都可以建議檔案中字串的翻譯。 注重準確性和清晰度。
- **審譯員 (QA)**：經驗豐富的翻譯員可能會被要求對建議的翻譯進行語言品質保證 (QA)。 這包括檢查一致性、用詞的一致性、清晰度，以及正確處理不可翻譯的元素 (例如程式碼片段)。 審查員專注於語言品質，但不執行最終核准步驟。
- **管理員**：專案維護人員，負責審核 QA 反饋，並對 Crowdin 內的翻譯給予最終核准。 通過審核的譯文也有助於 Crowdin 使用的翻譯記憶體。

## 瞭解 Crowdin 中的檔案

當您在 Crowdin 中瀏覽 Kaia Docs 專案時，您會看到為翻譯而組織的不同檔案和資料夾。 瞭解每項內容有助於您知道您的翻譯將會出現在 Kaia Docs 網站的哪個位置：

![Crowdin檔案結構](/img/misc/crowdin-dashboard.png)

- \*\*`docs/``**：這個資料夾包含 Kaia 文件頁面的主要內容，以 Markdown (`.md`或`.mdx\`檔) 寫成。 在此翻譯檔案可直接翻譯您在網站主要內容區域所看到的文章、指南和教學。

- **`i18n/en/code.json`**：包含直接嵌入網站使用者介面 (UI) 程式碼的文字字串，通常使用特定的翻譯函式或元件 (如 `<Translate>`)。 這包括標籤、按鈕、自訂功能內的訊息，以及其他特定檔案未涵蓋的網站主題部分。 您在此處的翻譯將會出現在整個網站的介面元素中。

- **`i18n/en/docusaurus-plugin-content-docs/current.json`**：保存與文件結構本身相關的標籤翻譯。 這主要包括側邊欄類別名稱和其他由文件系統自動產生的導覽元素。 翻譯這些文件可確保使用者能以自己的語言瀏覽文件部分。

- **`i18n/en/docusaurus-theme-classic/footer.json`**：包含每個頁面底部的網站頁尾區域中的所有可翻譯文字。 這通常包括版權聲明、連結和其他特定於頁尾的文字。

- **`i18n/en/docusaurus-theme-classic/navbar.json`**：包含網站頁面頂端的主導覽列中的所有可翻譯文字。 這包括連結、下拉式選單和其他導覽元素的標籤。

## 機器翻譯 (MT) 政策

為了讓我們的全球使用者能更快速地取得新的和更新的內容，我們對某些語言採用了機器翻譯 (MT)，如上述清單所示。

- \*\* 如何運作：\*\* 更新英文文件時，MT 會自動提供初始翻譯。 在維護者審核之後，再同步回 Kaia Docs 網站。
- **免責聲明：** 主要由 MT 翻譯的頁面將顯示免責聲明，告知使用者內容可能包含不準確的地方，並邀請使用者透過 Crowdin 協助改進。
- \*\* 您的貢獻很重要：\*\* 即使是 MT，社群的貢獻對於改善精確度、上下文和自然用語也是非常重要的。

## 來源內容更新的影響

我們的文件不斷演進。 當 GitHub 倉庫中的英文原始碼內容更新時，Crowdin 中相對應的字串也會更新。

- \*\* 翻譯重設：\*\* 此同步化程序表示_修改字串_的現有翻譯將被**重設** (不是重設為新的英文文字，就是重設為新的機器翻譯)。
- \*\*為什麼？\*\*這樣可以確保翻譯的文件準確反映最新英文來源的結構和核心資訊。
- **貢獻價值：** 儘管個別字串可能會被重設，但您的貢獻對於確保_當時_文件的正確性和品質，以及協助完善整體的本地化，仍具有極高的價值。

## 討論與社群

- 加入 [Crowdin Discussions](https://crowdin.com/project/kaia-docs/discussions) 或專案的 [GitHub Discussions](https://github.com/kaiachain/kaia-docs/discussions) 與其他貢獻者和維護者聯繫。

## 行為守則

請尊重所有社區成員。 專案管理員保留必要時移除冒犯性內容和取消貢獻存取權的權利。 請遵守我們的 [行為守則](https://github.com/kaiachain/kaia-docs/blob/main/code-of-conduct.md)。