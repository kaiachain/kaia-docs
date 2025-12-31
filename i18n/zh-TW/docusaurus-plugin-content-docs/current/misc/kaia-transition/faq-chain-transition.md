# 過渡時期常見問題

:::info[Archive Notice]

Please note that most of the information provided in this FAQ reflects a transitional period that occurred in 2024, and most of the events and processes mentioned have already taken place. While the FAQ remains available for historical reference, some sections are now out of date and may no longer apply. For the most current information regarding Kaia, please consult the latest official documentation and announcements.

:::

本常見問題解決了熟悉 Klaytn 生態系統的 CEX、節點提供商、錢包提供商、dApp 構建者和零售用戶的常見問題和顧慮，以確保平穩過渡。

- KLAY 和 FNSA 持有者
  - [克萊頓和芬絲琪亞怎麼了？](#what-happened-to-klaytn-and-finschia-)
  - [KLAY 和 FNSA 會怎麼樣？](#what-happens-to-klay-and-fnsa-)
  - [我需要為 Kaia 創建一個新錢包嗎？](#will-i-need-to-create-a-new-wallet-for-kaia-)
  - [Klaytn會為新的KAIA代幣提供交換或遷移網站嗎？](#will-klaytn-provide-a-swap-or-migration-website-for-new-kaia-tokens-)
  - [接收 KAIA 代幣是否會有延遲？](#will-there-be-any-delay-in-receiving-kaia-tokens-)
  - [交換 KLAY 和 FNSA 代幣的金額有限制嗎？](#is-there-a-limit-on-the-amount-for-swapping-klay-and-fnsa-tokens-)
  - [我在質押 FNSA 。 我是否需要等待 7 天才能解除我的 FNSA，以交換到 KAIA？](#im-currently-staking-fnsa-will-i-need-to-wait-7-days-to-unstake-my-fnsa-to-swap-to-kaia-)
  - [在哪裡可以找到 KLAY 和 FNSA 的歷史價格信息？ 我似乎無法在 CoinMarketCap 或 CoinGecko 上找到它了。](#where-can-i-find-the-historical-price-information-for-klay-and-fnsa-i-cant-seem-to-find-it-on-coinmarketcap-or-coingecko-anymore-)

- 應用程序開發人員
  - [Klaytn 上的 DApp 要遷移到 Kaia 需要做什麼？](#what-do-dapps-on-klaytn-need-to-do-to-migrate-to-kaia-)
  - [Finschia 上的 DApp 需要做什麼才能遷移到 Kaia？](#what-do-dapps-on-finschia-need-to-do-to-migrate-to-kaia-)
  - [Kaia 基金會是否會像 Klaytn 基金會那樣繼續提供代碼審計補助金](#will-kaia-foundation-continue-to-provide-code-audit-grants-as-klaytn-foundation-did-)

- 錢包提供商
  - [是否有必要將錢包中的品牌名稱從 "Klaytn "更新為 "Kaia"？](#is-it-necessary-to-update-the-brand-name-from-klaytn-to-kaia-in-the-wallet-)
  - [如果主網升級後我們不升級到 Kaia 品牌會怎樣？](#what-happens-if-we-dont-upgrade-to-the-kaia-brand-after-the-mainnet-upgrade-)
  - [默認資源管理器 Klaytnscope 將何去何從？](#what-will-happen-to-klaytnscope-the-default-explorer-)

- 中心化交易所
  - [KAIA 是 KLAY 的品牌重塑還是全新的代幣？](#is-kaia-a-rebrand-from-klay-or-a-completely-new-token-)
  - [Kaia會在 Klaytn 主網還是其他主網？](#will-kaia-be-on-the-klaytn-mainnet-or-a-different-mainnet-)
  - [當前的 Klaytn 主網在品牌重塑後還能繼續運行嗎？](#will-the-current-klaytn-mainnet-continue-to-work-after-the-rebrand-)
  - [KAIA 市場何時開放？](#when-will-the-KAIA-market-open-)
  - [在哪裡可以找到 Kaia 的白皮書？](#where-can-i-find-kaias-whitepaper-)

- RPC 節點提供者
  - [為了支持從 Klaytn 到 Kaia 的過渡，我需要對我的基礎架構做哪些改動，RPC API 中是否會有任何突破性的改動？](#as-an-rpc-node-provider-what-changes-do-i-need-to-make-to-my-infrastructure-to-support-the-transition-from-klaytn-to-kaia-and-will-there-be-any-breaking-changes-in-the-rpc-apis-)
  - [Kaia是不同鏈ID的新鏈，還是基於Klaytn鏈的升級版？](#is-kaia-a-new-chain-with-a-different-chain-id-or-an-upgrade-based-on-the-klaytn-chain-)

## KLAY 和 FNSA 持有者

### Klaytn和Finschia <a id="what-happened-to-klaytn-and-finschia-"></a>

Klaytn 和 Finschia 通過管理決策合併為 Kaia。 您可以檢視投票結果 [這裡](https://blog.kaia.io/klaytn-and-finschia-merge-proposal-passes-creating-asias-largest-blockchain-ecosystem/)。 兩條鏈（KLAY 和 FNSA）的實用代幣轉換為 KAIA 代幣。 您可以在 [此處] 找到這兩種代幣的匯率(../../kaiatech/kaia-white-paper.md#fnsa-issuancedistribution-status)。

### KLAY 和 FNSA 會怎麼樣？ <a id="what-happens-to-klay-and-fnsa-"></a>

隨著 KAIA 代幣的推出，KLAY 餘額自動反映為 KAIA 餘額。 FNSA 持有者可以使用 [Kaia 門戶網站](https://portal.kaia.io/) 上的交換服務，在 Finschia 網絡上燒燬其 FNSA 代幣，並獲得等值的 KLAY 代幣。 請閱讀 [本帖](https://medium.com/lineblockchain/preparations-for-the-upcoming-kaia-chain-token-swap-d9ccd853eda4) 瞭解更多有關將 FNSA 換成 KAIA 的信息。

### 我需要為 Kaia 創建一個新錢包嗎？ <a id="will-i-need-to-create-a-new-wallet-for-kaia-"></a>

您的 Klaytn 錢包可以在 Kaia 上使用，但如果您使用的是 Metamask 等第三方多鏈錢包，則需要更新 RPC 和區塊資源管理器 URLS。 這些信息將在日後提供。 Finschia 錢包持有者將需要創建一個 Kaia 錢包，並將提供一個網站供 FNSA 持有者燒燬他們的代幣並申領等值的 KAIA。

### Klaytn 會為新的 KAIA 代幣提供交換或遷移網站嗎？ <a id="will-klaytn-provide-a-swap-or-migration-website-for-new-kaia-tokens-"></a>

用戶無需採取任何行動。 KLAY 代幣將自動更名為 KAIA 代幣。

### 收到 KAIA 代幣會有延遲嗎？ <a id="will-there-be-any-delay-in-receiving-kaia-tokens-"></a>

為安全起見，令牌交換將至少延遲 30 分鐘。 中繼器和 RPC 節點可能會產生微不足道的額外延遲

### 交換 KLAY 和 FNSA 代幣的金額有限制嗎？ <a id="is-there-a-limit-on-the-amount-for-swapping-klay-and-fnsa-tokens-"></a>

兩種代幣的交換和橋接沒有限制。

### 我在質押 FNSA。 我是否需要等待 7 天才能解除我的 FNSA，換到 KAIA？ <a id="im-currently-staking-fnsa-will-i-need-to-wait-7-days-to-unstake-my-fnsa-to-swap-to-kaia-"></a>

隨著 Kaia 的即將推出，將在 Finschia 網絡上提出治理投票，以順利整合代幣和治理機制，包括可能將解綁時間從 7 天縮短到幾個小時。 如果投票通過，FNSA 持有者將可以解押和交換，而無需等待一週時間。

### 在哪裡可以找到 KLAY 和 FNSA 的歷史價格信息？ 我似乎在 CoinMarketCap 或 CoinGecko 上都找不到它了。 <a id="where-can-i-find-the-historical-price-information-for-klay-and-fnsa-i-cant-seem-to-find-it-on-coinmarketcap-or-coingecko-anymore-"></a>

由於 KLAY 和 FNSA 的合併以及向新代幣 KAIA 的過渡，加密貨幣跟蹤網站上已不再提供 KLAY 和 FNSA 的歷史價格信息。 不過，我們還是保留了這些數據，以提高透明度和供參考。 您可以從 [Kaia native coin - KAIA](../../learn/token-economics/kaia-native-token.md#historical-pricing) 下載包含 KLAY 和 FNSA 歷史價格資料的 CSV 檔案。

## 應用程序開發人員

### 要遷移到 Kaia，Klaytn 上的 DApp 需要做些什麼？ <a id="what-do-dapps-on-klaytn-need-to-do-to-migrate-to-kaia-"></a>

Klaytn 應用程序將與 Kaia 連鎖店無縫連接，只需重新命名即可。 團隊將提供品牌指導。 對於現有的 Finschia 應用程序，將通過其業務渠道提供技術更新和營銷支持。

### 要遷移到 Kaia，Finschia 上的 DApp 需要做些什麼？ <a id="what-do-dapps-on-finschia-need-to-do-to-migrate-to-kaia-"></a>

Finschia 生態系統中的 DApp 要遷移到 Kaia，需要一個類似於從 Cosmwasm 鏈遷移到 EVM 鏈的過程。 如果您需要立即幫助，請聯繫Finschia基金會。

### Kaia 基金會是否會像 Klaytn 基金會那樣繼續提供代碼審計補助金？ <a id="will-kaia-foundation-continue-to-provide-code-audit-grants-as-klaytn-foundation-did-"></a>

是的，審計補助金將與 Klaytn 的其他補助金和資助計劃保持不變。

## 錢包提供商

### 是否有必要將錢包中的品牌名稱從 Klaytn 更新為 Kaia？ <a id="is-it-necessary-to-update-the-brand-name-from-klaytn-to-kaia-in-the-wallet-"></a>

是，需要更新時會通知生態合作伙伴。

### 如果主網升級後我們沒有升級到 Kaia 品牌，會發生什麼情況？ <a id="what-happens-if-we-dont-upgrade-to-the-kaia-brand-after-the-mainnet-upgrade-"></a>

主網升級後不會出現任何功能問題。 品牌重塑可以稍後進行。

### 默認資源管理器 Klaytnscope 會發生什麼變化？ <a id="what-will-happen-to-klaytnscope-the-default-explorer-"></a>

Klaytnscope 將一如既往地工作，並在三個月後升級。

## 中心化交易所

### KAIA 是 KLAY 的品牌重塑，還是一個全新的品牌？ <a id="is-kaia-a-rebrand-from-klay-or-a-completely-new-token-"></a>

KAIA 是 KLAY 的改名。 KLAY 將繼續使用更新後的名稱和代碼。 建議儘可能更新K線圖。

由於 Klaytn 和 Finschia 的合併，供應總量和流通量都發生了變化。 流通供應量從約 38.04 億韓元增加到 58.05 億韓元，而總供應量則從約 60.05 億韓元減少到 58.05 億韓元。 由於持續的通貨膨脹，這些數字可能無法反映當前的流通量和總供應量。 KAIA 的通貨膨脹率已從每塊 6.4 KAIA 調整為每塊 9.6 KAIA。 有關這些變更的更多詳情，請參閱[KAIA 發行和分配計劃](../../kaiatech/kaia-white-paper.md#kaia-issuancedistribution-plan-1)。

### Kaia 會在 Klaytn 主網還是其他主網？ <a id="will-kaia-be-on-the-klaytn-mainnet-or-a-different-mainnet-"></a>

Kaia 將繼續留在 Klaytn 主網上。

### 改版後，當前的 Klaytn 主網還能繼續運行嗎？ <a id="will-the-current-klaytn-mainnet-continue-to-work-after-the-rebrand-"></a>

是的，主網的運行不會受到影響。 向 Kaia 的過渡主要涉及名稱更改和幕後的技術升級。

### KAIA 市場何時開放？ <a id="when-will-the-kaia-market-open-"></a>

KAIA 市場將於 2024 年第三季度開放，我們將在臨近該日期時公佈確切的區塊編號。

### 在哪裡可以找到 Kaia 的白皮書？ <a id="where-can-i-find-kaias-whitepaper-"></a>

您可以訪問 Kaia 的白皮書 [此處](../../kaiatech/kaia-white-paper.md)。

## RPC 節點提供者

### 為了支持從 Klaytn 到 Kaia 的過渡，我需要對基礎架構進行哪些更改？ <a id="as-an-rpc-node-provider-what-changes-do-i-need-to-make-to-my-infrastructure-to-support-the-transition-from-klaytn-to-kaia-and-will-there-be-any-breaking-changes-in-the-rpc-apis-"></a>

除了命名空間從 klay_ 變為 kaia_ 之外，Kaia 鏈上的大多數 RPC API 將保持不變。 不過，為了向後兼容，klay_ 仍將可用。

為了支持從 Klaytn 到 Kaia 的過渡，RPC 節點提供商需要在 Kaia 版本發佈後將其二進制文件升級到 Kaia 版本。 升級前無需立即採取行動。

### Kaia 是具有不同鏈條 ID 的新鏈條，還是基於 Klaytn 鏈條的升級版？ <a id="is-kaia-a-new-chain-with-a-different-chain-id-or-an-upgrade-based-on-the-klaytn-chain-"></a>

Kaia 是 Klaytn 鏈的硬分叉，鏈 ID 保持不變。 之前的測試網絡 "Baobab "已更名為 "Kairos"，而主網絡 "Cypress "現在被稱為 "Mainnet "或 "Kaia Mainnet"。 與 Klaytn 相關的原始 URL（如文檔、網站、公共端點和軟件包下載鏈接）將保留三個月，以確保平穩過渡。

## 資源

以下是鏈合併的主要信息：

- [治理建議](https://govforum.klaytn.foundation/t/kgp-25-klaytn-finschia-mainnet-merge/719)
- [合併背後的願景](https://blog.kaia.io/finschia-klaytn-chain-merge-proposal-our-vision-for-asias-no-1-blockchain-ecosystem/)
- [Crafting the core of Kaia DeFi](https://blog.kaia.io/crafting-the-core-of-project-dragons-defi-ecosystem/)
- [回應機構需求](https://blog.kaia.io/project-dragon-responding-to-institutional-demand/)
- [Supplementary data and insights](https://blog.kaia.io/project-dragon-supplementary-data-and-insights/)
- [Kaia品牌故事](https://blog.kaia.io/say-hello-to-kaia/)
