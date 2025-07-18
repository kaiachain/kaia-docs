---
sidebar_label: Kaia vs. Ethereum
---

# Kaia vs. Ethereum：建置者的比較

這份全面的比較揭示了 Kaia 區塊鏈和 Ethereum 的主要異同，為開發人員和使用者提供了解移轉需求和機會所需的基本資訊。

## 概述

| 以太坊                 | Kaia                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------- |
| 已建立的第 1 層、大型生態系統與社群 | EVM 相容的第 1 層，由 Klaytn & Finschia 合併而成。 專注於 Web3 在亞洲的採用、企業級可靠性、高效能。 |

## 使用者角度

| 特點                                 | 以太坊                                                | Kaia                                                                                                                                                                 |
| :--------------------------------- | :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **每秒交易量 (TPS)** | \~15-30 TPS（可變）                   | 高達 4,000 TPS。 據報告，即時 TPS 遠高於 Ethereum。                                                                                                                               |
| \*\* 區塊時間\*\*                      | ~12秒                               | 1 秒的區塊產生時間。                                                                                                                                                          |
| **實質性**                            | ~13-15分鐘 (2個時序) | 立即終局（[基於 PBFT 的共識](https://docs.kaia.io/learn/consensus-mechanism/#consensus-mechanism-in-kaia-)）。                                                                   |
| **交易費（瓦斯）**                        | 可變，EIP-1559 拍賣機型                                   | [與 EIP-1559 相容的動態收費模式](https://github.com/kaiachain/kips/blob/main/KIPs/kip-162.md) 與[收費委託](https://docs.kaia.io/build/transactions/fee-delegation/) 允許應用程式支付使用者費用。  |
| **錢包相容性**                          | MetaMask、Ledger、Trust Wallet 等。                    | 與 Ethereum 錢包相容 (例如透過 RPC 配置的 MetaMask)。 Kaia 專用的錢包 (例如 [Kaia Wallet](https://docs.kaia.io/build/tools/wallets/kaia-wallet/))。 |
| **代碼**                             | ETH                                                | [KAIA](https://docs.kaia.io/learn/token-economics/kaia-native-token/)                                                                                                |

## 開發人員的觀點

| 特點             | 以太坊                                                                                        | Kaia                                                                                                                                                                                                                                                                             |
| :------------- | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **虛擬機**        | 以太坊虛擬機 (EVM)                                                            | 與 EVM 相容（[Kaia Virtual Machine \- KVM](https://docs.kaia.io/learn/smart-contracts/#kaia-virtual-machine-kvm-powering-smart-contracts-)，基於 EVM），並持續更新以支援最新的 Ethereum 運算碼，因此 Solidity 契約不需修改即可執行。                                                                                 |
| **智慧型合約語言**    | Solidity、Vyper、Yul 等。                                                                      | Solidity、Vyper、Yul、Huff。                                                                                                                                                                                                                                                         |
| **預編譯**        | 標準 Ethereum 預先編譯                                                                           | 支援標準 EVM 作業碼和額外的 [Kaia 特有的預編譯合約](https://docs.kaia.io/learn/smart-contracts/precompiled-contracts/)。                                                                                                                                                                             |
| **開發工具**       | \*\* 智慧契約開發工具：\*\* Remix、Hardhat、Foundry 等。 **Web3 函式庫：** Ethers、Web3js、Web3j、Web3py、Viem | \*\* 智慧契約開發工具：\*\* [與 Ethereum 工具相容](https://docs.kaia.io/build/smart-contracts/ide-and-tools/) (Remix, Hardhat, Foundry 等) **Web3 函式庫：** 與 Ethers、Web3js、Web3j、Web3py、Viem 相容。 Kaia 提供 [自己的 SDK 擴充套件](https://docs.kaia.io/references/sdk/)。               |
| \*\* 交易類型\*\*  | Legacy、EIP-2930、EIP-1559、EIP-4844 等。                                                       | 支援主要的 [Ethereum 交易類型](https://docs.kaia.io/build/transactions/ethereum/) (Legacy, EIP-2930, EIP-1559)，加上原生交易類型，如 [費用委託](https://docs.kaia.io/build/transactions/fee-delegation/) 和 [部分費用委託](https://docs.kaia.io/build/transactions/partial-fee-delegation/)。 |
| **氣體機制**       | EIP-1559 (base fee\+ priority fee auction)                             | EIP-1559 相容 [動態瓦斯收費模式](https://docs.kaia.io/learn/transaction-fees/#effective-gas-price-) 與 [瓦斯抽象](https://github.com/kaiachain/kaia/releases/tag/v2.0.0) 用於代幣式收費，以及 [EIP-7623 相容 calldata 定價](https://kips.kaia.io/KIPs/kip-223) 用於無縫 SDK 相容。                                   |
| **帳戶模式**       | 外部擁有帳戶 (EOA)、合約                                                         | 支援標準的 Ethereum 帳戶和允許 EOA 擁有智慧型契約程式碼的 [EIP-7702](https://github.com/kaiachain/kaia/releases/tag/v2.0.0)。 具有本機 [帳號抽象](https://docs.kaia.io/learn/accounts/#multiple-key-pairs-and-role-based-keys-) 功能，例如彈性的金鑰管理。                                                                  |
| **RPC API**    | 標準 Ethereum JSON-RPC API (`eth_`命名空間)                                   | [Largely compatible](https://docs.kaia.io/references/public-en/). 提供 `eth_` 命名空間以與 Ethereum 相容。 `kaia_` 命名空間用於 Kaia 特有的功能。                                                                                                                                       |
| \*\* 網路套接字\*\* | 支援                                                                                         | [Supported](https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints)                                                                                                                                                                                        |
| **共識**         | Proof-of-Stake (Gasper: Casper-FFG \+ LMD-GHOST)       | 伊斯坦堡 BFT (IBFT) 的最佳化版本，是 PBFT 的變體。 使用 [可驗證隨機函數 (Verifiable Random Function, VRF) 用於挑選提案者](https://docs.kaia.io/learn/consensus-mechanism/#consensus-mechanism-in-kaia-)。                                                                   |
| **節點架構**       | 執行客戶、共識客戶                                                                                  | [Multi-layered](https://docs.kaia.io/learn/#network-architecture)：核心單元 (CC) 含有共識節點 (CN) 和代理節點 (PN)；端點節點 (EN)；服務鏈節點。                                                                                  |
| **治理**         | 主要是離鏈、社群驅動。                                                                                | [On-chain governance](https://docs.kaia.io/learn/governance/) 涉及由知名組織組成的治理委員會 (GC)。 表決權與所投注的 KAIA 成比例。                                                                                                                                                        |

## 保持不變

- \*\* 高 EVM 兼容性：\*\* Kaia 的強大 EVM 兼容性意味著大多數的 Ethereum dApp、工具 (Hardhat、Foundry、Remix) 和 Solidity 契約都可以移植或使用，只需最小的變更。 這是最大的「不變」之處。
- \*\* 熟悉的開發工具與語言：\*\* Solidity 仍是主要的智慧型契約語言。 Remix、Hardhat 和 Foundry 等 Ethereum 開發工具基本上都可用。
- \*\* 標準的 Ethereum 錢包相容性：\*\* 標準的 Ethereum 錢包，例如 MetaMask，可以透過變更 RPC URL 和 ChainID 來使用。
- \*\* `eth_` RPC 命名空間：\*\* `eth_` RPC API 的命名空間允許與 Ethereum 類似的互動來實現共通功能，確保與現有的 Ethereum 工具相容於標準操作。
- \*\* 標準 Ethereum 位址格式：\*\* Kaia 使用標準 Ethereum 位址格式 (`0x` \+ 40 hex chars)。

## 不同之處

- **效能與成本：**
  - 與 Ethereum 的 /~15-30 TPS 相比，預期每秒交易量 (TPS) 將顯著提高（高達 4,000 TPS）。
  - 區塊時間更快，為 1 秒。
  - Kaia 提供即時終局性，這與 Ethereum 的概率終局性有顯著的不同。
  - 交易費用 (gas) 設計為低廉且穩定，採用 EIP-1559 相容的費用模式。 瓦斯價格以 `kei` 為單位。
- **RPC & SDKs:**
  - 當 `eth_` 命名空間被支援時，`kaia_` 命名空間對於新的或 Kaia 特有的功能和交易類型是必要的。
  - 遺留的 `klay_` 命名空間可能存在，並且等同於 `kaia_` 命名空間。
  - Kaia 為流行的 Web3 函式庫提供自己的 SDK 延伸 ([Ethers-ext](https://docs.kaia.io/references/sdk/ethers-ext/getting-started/)、[Web3js-ext](https://docs.kaia.io/references/sdk/web3js-ext/getting-started/)、[Web3j-ext](https://docs.kaia.io/references/sdk/web3j-ext/getting-started/)、[Web3py-ext](https://docs.kaia.io/references/sdk/web3py-ext/getting-started/)，以及 [Viem-ext](https://docs.kaia.io/references/sdk/viem-ext/getting-started/))，可從 Ethereum 進行無縫遷移，同時提供 Kaia 的增強功能和效能優勢。
- **本機功能（標準 EVM 以外）：**
  - \*\* 帳戶抽象：\*\* Kaia 具有先進的帳戶功能（例如，每個帳戶有多個金鑰，基於角色的權限），提供比 Ethereum 的 EOA 模型更高的靈活性。
  - \*\* 交易類型：\*\* Kaia 將與 Ethereum 一起擁有自己的原生交易類型（例如，用於帳戶更新、費用委託）。 對於 Ethereum 交易，請使用標準的 `eth_` RPC 以獲得最佳相容性。
  - \*\* 費用委託：\*\* 此功能可讓 dApp 為使用者支付瓦斯費，顯著改善使用者經驗。
- **共識與治理：**
  - 共識機制是伊斯坦堡 BFT (IBFT) 的最佳化版本，有別於 Ethereum 的 Gasper，可帶來更快的區塊時間和即時終結性。
  - 治理涉及鏈上治理委員會 (GC)，有別於 Ethereum 更為流暢的鏈下治理。
- \*\* 原始代碼：\*\* 原始代碼為 KAIA。 Tokenomics 和效用是 Kaia 特有的。
- \*\* 節點架構：\*\* Kaia 採用**專門打造的分層架構**，具有 [專門節點類型](https://docs.kaia.io/learn/#network-architecture) (Core Cells 用於達成共識，Endpoint Nodes 用於公開存取)，旨在優化效能與安全性，有別於 Ethereum 的統一用戶端方式。
- \*\* Mempool:\*\*由於 Kaia 的特定網路架構，較少強調像 Ethereum 的全球公共 Mempool，因此交易處理和公共 Mempool 的能見度可能會有所不同。
- \*\* 預先編譯的合約：\*\* 雖然支援基本 EVM 預先編譯，但 Kaia 可能會提供額外的 Kaia 特定預先編譯合約。

## 建商的下一步

1. \*\* 配置您的環境\*\*\
  配置您現有的 Ethereum 工具以與 Kaia 搭配使用：

- [Mainnet RPC](https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints): https://public-en.node.kaia.io ( [Chain ID](https://docs.kaia.io/nodes/service-chain/configure/configuration-files/#properties-)：8217\)
- 測試網路：用於測試的 Kairos 測試網路 ( [取得免費代用幣](https://docs.kaia.io/build/get-started/getting-kaia/) 來自 [龍頭](https://www.kaia.io/faucet))
- 工具：Hardhat、Foundry 和 MetaMask 無需修改即可運作

2. \*\* 部署與測試\*\*\
  由於與 EVM 完全相容，您的 Solidity 合約部署時不會有任何改變。 在 Kairos 測試網進行測試，以驗證 Kaia 動態收費模式下的瓦斯使用模式。

3. **發揮 Kaia 的優勢**

- 即時完成：1 秒區塊即時完成，消除確認等待
- [Lower Gas Costs](https://docs.kaia.io/learn/transaction-fees/#effective-gas-price-)：建立在以太坊上成本過高的功能
- [Fee Delegation](https://docs.kaia.io/build/transactions/fee-delegation/)：讓您的 dApp 支付用戶交易費用以改善 UX
- [Gas Abstraction](https://github.com/kaiachain/kaia/releases/tag/v2.0.0)：使用者可以使用認可的代幣支付費用 (不只是 KAIA)

4. **使用適當的 API 和 SDK**

- 用於與 Ethereum 相容的操作的標準 `eth_` 命名空間
- `kaia_` 命名空間用於存取 Kaia 特有的功能和交易類型
- 雖然 ethers.js 和 web3.js 可以完美運作，但請考慮探索 [Kaia's SDKs](https://docs.kaia.io/references/sdk/) 以更容易與原生功能整合。

5. **保持知情**

- 請參閱 [Kaia Docs](https://docs.kaia.io/)，這是您取得最新資訊的主要來源。
- 在 [Kaia 開發者論壇](https://devforum.kaia.io/) 和其他社群頻道與其他建置者和 Kaia 團隊接觸，以獲得支援和更新。