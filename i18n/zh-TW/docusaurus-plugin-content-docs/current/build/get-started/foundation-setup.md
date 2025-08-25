# 基礎設定

取得 Kaia 的高階概述以及開始建立的基本要素。

## 快速概述

Kaia 是 EVM 相容的區塊鏈，專為速度、安全性和可擴展性而設計。 它使用 Kaia 虛擬機器 (KVM)，與 Ethereum 工具完全相容，並支援 Solidity 智慧型契約。 如果您來自 Ethereum，您會發現轉換過程非常簡單 - 您現有的程式碼和工作流程只需極少的變更即可運作。

關於 Kaia 架構的詳細資訊，請參閱 [Why Build on Kaia](../../learn/why-kaia.md) 及 [Consensus Mechanism](../../learn/consensus-mechanism.md) 。

## Kaia 網路

Kaia 有兩個主要網路：

- **Kairos Testnet**：用於測試和開發。 連鎖編號：1001。 用它來做實驗，不需要實際成本。
- **主網路**：用於生產。 Chain ID: 8217.

使用這些 RPC 端點設定您的錢包或工具：

- Kairos: https://public-en-kairos.node.kaia.io
- 主網路：https://public-en.node.kaia.io

探索 [Kaiascan](https://kaiascan.io/) (Mainnet) 或 [Kairos Kaiascan](https://kairos.kaiascan.io/) 上的區塊和交易。

## 開發工具

Kaia 支援流行的 Ethereum 工具，並提供一些功能擴充。 關鍵資源：

- **[SDKs](../../references/sdk/sdk.md)**：使用 [ethers-ext](../../references/sdk/ethers-ext/getting-started.md) (ethers.js 的擴充)、[web3js-ext](../../references/sdk/web3js-ext/getting-started.md) 或其他工具與網路互動。
- **[Public RPC Endpoints](../../references/public-en.md)**：透過 Public RPC Endpoints 進行存取。
- **[Solidity](https://github.com/ethereum/solidity)**：用 Solidity 寫合約--Kaia 完全相容。
- **[Kaia Contracts Wizard](https://wizard.kaia.io/)**：一個互動式產生器，用來啟動您的智慧型契約並學習 Kaia Contracts。
- 其他工具：[Remix IDE with Kaia Plugin](https://ide.kaia.io/)、[Hardhat](https://v2.hardhat.org/hardhat-runner/docs/getting-started)、[Foundry](https://getfoundry.sh/) 和 [Thirdweb](https://portal.thirdweb.com/)。