# 常見問題

- [什麼是 Kaia？](#what-is-kaia)
- [Kaia 如何支持以太坊等價性？](#how-ethereum-equivalence)
- [什麼是 Kaia 的天然氣政策？](#kaia-gas-policy)
- [Kaia 的賬戶結構有什麼特別之處？](#kaia-account-structure)
- [在哪裡可以開始使用 Kaia 開發 dApp？](#dapp-development)
- [Kaia 是開源的嗎？](#is-kaia-open-source)
- [如何為我的賬戶充值？](#fund-my-acconut)
- [任何用於測試和開發的 Kaia 公共節點提供程序？](#node-providers)
- [是否有水龍頭可以測試 KAIA？](#are-there-faucets)
- [如何檢查公共 RPC 端點狀態？](#rpc-endpoint-status)
- [哪些錢包支持 Kaia？](#which-wallets)
- [什麼是 Mainnet，什麼是 Kairos？](#what-is-mainnet-what-is-kairos)
- [有 Kaia SDK 嗎？ 用什麼語言？](#kaia-sdks)
- [我必須安裝並運行 EN（端點節點）才能使用 Kaia 嗎？](#must-i-install-and-run-en)
- [我正在運行 EN，節點數據同步太慢。](#node-data-sync-is-too-slow)
- [我可以在 Kaia 上使用 ERC-20 和 ERC-721 合約嗎？](#can-i-use-erc-20-and-erc-721)
- [哪裡可以獲得類似 Metamask 的瀏覽器擴展錢包？](#where-can-i-get-a-browser-extension-wallet)
- [為什麼我的繳費賬戶地址不是從所提供的密鑰中導出的？](#account-address-is-not-derived-from-the-key)
- [在哪裡可以找到完整的收費授權工作樣本？](#fee-delegation-samples)

## Kaia 是什麼？ <a id="what-is-kaia"></a>

Kaia 是高性能的第 1 層區塊鏈，專為 Web3 的大規模應用（尤其是在亞洲）而設計。 它提供超過 4,000 TPS、即時終結和一秒封堵時間。 Kaia 與以太坊完全兼容，可實現 dApp 的無縫遷移，並提供一個強大的生態系統，包括開發人員友好型工具、低費用以及生態系統基金提供的強大流動性。 它通過與 Kakao 和 LINE 等主要信息平臺的集成，優先考慮 Web2 用戶的可訪問性。 詳見我們的 [白皮書](https://docs.kaia.io/kaiatech/kaia-white-paper/)。

## Kaia 如何支持以太坊等價交換？ <a id="how-ethereum-equivalence"></a>

Kaia 與 EVM 兼容，支持除 EIP-4844 blob 交易之外的所有以太坊坎昆 EVM 功能。 它提供 `eth` 命名空間 RPC API，允許無縫使用以太坊 SDK 和工具。 Kaia 特有的交易類型在以太坊命名空間 API 中表示為 0 型傳統交易，因此以太坊 SDK 無需瞭解這些類型。

## Kaia 的天然氣政策是什麼？ <a id="kaia-gas-policy"></a>

Kaia 採用動態天然氣收費模式，在正常網絡條件下保持低收費，但會根據網絡擁堵情況調整收費。 手續費可在每個區塊的有限範圍內變化，有助於防止網絡垃圾郵件，同時保持費用的可預測性。 每筆交易的部分費用會自動燒掉。 該模式優先考慮用戶體驗和企業友好性，同時保持網絡穩定性。

## Kaia 的賬戶結構有什麼特別之處？ <a id="kaia-account-structure"></a>

為了給 dApp 開發者提供最大的便利，Kaia 設計了一種[將私鑰與地址分離](https://klaytn-tech.medium.com/klaytn-usability-improvement-series-1-separating-keys-and-addresses-dd5e367a0744)的方法。 因此，你可以輕鬆實現 [multisig](https://medium.com/klaytn/klaytn-usability-improvement-series-2-introducing-multisig-on-the-platform-level-85141893db01)，為一個賬戶創建多個私鑰，每個私鑰的權重都不同。 每個密鑰還可分配 [不同角色](https://medium.com/klaytn/klaytn-usability-improvement-series-4-supporting-role-based-keys-on-the-platform-level-e2c912672b7b)。

## 從哪裡開始使用 Kaia 開發 dApp？ <a id="dapp-development"></a>

無論您是從以太坊遷移，還是從零開始在 Kaia 上構建，我們都支持所有必要的工具和基礎設施。 你可以使用 Kaia Plugin 在 [Remix IDE](../build/tutorials/connecting-remix.md) 上測試你的智能合約，或者連接到 [MetaMask](../build/tutorials/connecting-metamask.mdx) 錢包和 [Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)。 Kaia的sdk可在 [此處](https://github.com/kaiachain/kaia-sdk)下載。 您可以參考我們的 [tutorials](../build/tutorials/tutorials.md) 嘗試在 Kaia 上構建 dApp。

## Kaia 是開源的嗎？ <a id="is-kaia-open-source"></a>

Kaia 當然是開源的！ 看看我們的 [Github 組織](https://github.com/kaiachain)，您就可以開始為我們的 Kaia 文檔 [作出貢獻](https://github.com/kaiachain/kaia-docs/blob/main/CONTRIBUTING.md)。 閱讀更多關於我們的開源政策[此處](opensource.md)

## 如何為賬戶充值？ <a id="fund-my-acconut"></a>

您可以在交易所購買 KAIA。 可用交易所列表可在此處找到：
[Coinmarketcap](https://coinmarketcap.com/currencies/klaytn/markets/), [Coingecko](https://www.coingecko.com/en/coins/klay#markets).

## 有用於測試和開發的 Kaia 公共節點提供商嗎？ <a id="node-providers"></a>

有關 Kaia 的公共節點提供程序和網絡域，請參閱 [此列表](../references/public-en.md#rpc-service-providers)。

## 有水龍頭可以測試 KAIA 嗎？ <a id="are-there-faucets"></a>

您可以從這裡獲取用於開發和測試的 KAIA 測試版：

- [Kaia Faucet](https://faucet.kaia.io)
- [NODIT Faucet](https://kaiafaucet.com)
- [Thirdweb Faucet](https://thirdweb.com/kaia-testnet-kairos)

## 如何檢查公共 RPC 端點狀態？ <a id="rpc-endpoint-status"></a>

由於我們無法保證端點的正常運行時間和穩定性，您可以隨時在此查看節點提供商的狀態：[ChainList](https://chainlist.org/chain/8217), [Kaia Status](https://status.kaia.io/).

## 哪些錢包支持 Kaia？ <a id="which-wallets"></a>

Kaia 由冷錢包 D'cent 以及大量熱錢包（如 Kaia Wallet、MetaMask 等）支持。 請參閱 [此處](../build/tools/wallets/wallets.md)列表。

## 什麼是 Mainnet，什麼是 Kairos？ <a id="what-is-mainnet-what-is-kairos"></a>

主網是 Kaia 主網，Kairos 是測試網。
以下是每個網絡的相關信息。

主網：

- EN 下載：從 [download page](../nodes/downloads/downloads.md) 中選擇 Mainnet 軟件包。
- Kaiascope : https://kaiascope.com/

啟明星測試網

- EN 下載 ：從[下載頁面](../nodes/downloads/downloads.md)選擇 Kairos 軟件包。
- Kaiascope : https://kairos.kaiascope.com
- Kairos Faucet : https://faucet.kaia.io

## 有 Kaia SDK 嗎？ 用什麼語言？ <a id="kaia-sdks"></a>

Kaia Node 與以太坊兼容，因此您可以使用流行的以太坊 SDK，如 ethers.js、web3.js、web3py、web3j 或 viem。 不過，Kaia Node 還包括 Kaia 特有賬戶和交易類型的擴展功能。

要利用這些功能，可以使用 Kaia SDK，其中包括 ethers-ext、web3js-ext、web3j-ext 和 web3py-ext 等擴展。 這些插件式 SDK 擴展了以太坊 SDK。 如果你喜歡獨立的 SDK，可以考慮 Caver SDK，如 caver-js 和 caver-java，它們是為不需要以太坊兼容性的項目設計的。

### kaia-sdk （插件 SDK）

這些 SDK 支持 JavaScript、Java 和 Python，因此您可以根據項目使用的語言進行選擇：

- 用於 javascript 的 ethers-ext、web3js-ext
- 用於 Java 的 web3j-ext
- 用於 python 的 web3py-ext

### caver（獨立 SDK）

這些 SDK 支持 JavaScript 和 Java，非常適合無需兼容以太坊的項目：

- 用於 JavaScript 的 caver-js
- 用於 Java 的 Caver-java

## 我必須安裝和運行 EN（端點節點）才能使用 Kaia 嗎？ <a id="must-i-install-and-run-en"></a>

這取決於您的需求。 如果您需要完全控制您的節點，並需要自己驗證區塊，那麼是的，您需要安裝並運行自己的 EN。 這是大多數 Kaia 應用程序的典型設置。 不過，對於測試和開發，或者如果您不想管理自己的基礎設施，[Kaia API Service (KAS)](https://www.klaytnapi.com/en/landing/main) 是一個不錯的選擇。 KAS 提供對 Kairos 和 Mainnet 的 Kaia Node RPC API 以及其他 API 服務的訪問。 KAS 在註冊後提供免費的 API 請求。 請查看 KAS [定價頁面](https://www.klaytnapi.com/en/landing/pricing) 瞭解定價計劃信息。

## 我正在運行 EN，節點數據同步太慢。 <a id="node-data-sync-is-too-slow"></a>

首先，檢查您的硬件規格是否符合 [系統要求](../nodes/endpoint-node/system-requirements.md)。

其次，考慮 [下載 chaindata 快照](../nodes/endpoint-node/install-endpoint-nodes.md#optional-download-chaindata-snapshot)，跳過耗時的完全同步過程。 鏈數據快照是一種數據庫快照，存儲自創世以來生成的所有區塊。 每日更新。

## 我可以在 Kaia 上使用 ERC-20 和 ERC-721 合約嗎？ <a id="can-i-use-erc-20-and-erc-721"></a>

是的。 Kaia 支持 Solidity 作為智能合約語言。 用 Solidity 為 Etherem 編寫的 [ERC-20](../build/smart-contracts/samples/erc-20.md) 和 [ERC-721](../build/smart-contracts/samples/erc-721.md) 可以在 Kaia 上部署和執行。

還可以定義更多的 Kaia 專用代幣標準。 關注 [KIP（Kaia改進提案）](https://kips.kaia.io/) 並參與討論。

## 在哪裡可以獲得像 Metamask 這樣的瀏覽器擴展錢包？ <a id="where-can-i-get-a-browser-extension-wallet"></a>

Kaia 的網絡瀏覽器擴展錢包 [Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)。 Kaia 錢包是一個非託管錢包，您可以使用它進行 KAIA 交易和創建賬戶。

## 為什麼我的繳費賬戶地址無法從所提供的密鑰中導出？ <a id="account-address-is-not-derived-from-the-key"></a>

在 Kaia 中，[賬戶地址可以與密鑰對解耦](../learn/accounts.md#decoupling-key-pairs-from-addresses)。

常見的使用情況如下。

- 賬戶所有者出於安全考慮希望更改密鑰。
- 賬戶有一個加權多密鑰或基於角色的密鑰，允許使用多個密鑰對來控制賬戶。

付費賬戶通常有一個[基於角色的密鑰](../learn/accounts.md#accountkeyrolebased)。 在大多數情況下，賬戶地址不是從 RoleFeePayer 密鑰導出的。

## 在哪裡可以找到完整的收費授權工作樣本？ <a id="fee-delegation-samples"></a>

您可以找到使用多個不同 Kaia SDK 進行費用委託的完整工作示例：

- ethers-ext：[收費委託價值轉移示例](https://docs.kaia.io/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer/)
- web3js-ext：[收費委託值轉移示例](https://docs.kaia.io/references/sdk/web3js-ext/fee-delegated-transaction/value-transfer/)
- web3j-ext：[收費委託值轉移示例](https://docs.kaia.io/references/sdk/web3j-ext/fee-delegated-transaction/value-transfer/)
- web3py-ext：[收費委託價值轉移示例](https://docs.kaia.io/references/sdk/web3py-ext/fee-delegated-transaction/value-transfer/)
- Caver-js: [fee-delegation-example](https://docs.kaia.io/build/tutorials/fee-delegation-example/)