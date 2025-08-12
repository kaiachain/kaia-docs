# Kaia 錢包 DApp 集成

## 目錄

1. [用戶界面庫](#1-ui-libraries)
2. [實用圖書館](#2-utility-libraries)
3. [提供商](#3-providers)

## 導言

[Kaia 錢包](https://docs.kaiawallet.io) 是一個非託管錢包，類似於[Metamask](https://metamask.io)，額外支持 Kaia 特有的[交易](https://docs.kaia.io/learn/transactions) 和[賬戶](https://docs.kaia.io/learn/accounts)。 本文將指導您將 [Kaia Wallet](https://docs.kaiawallet.io)與去中心化應用程序（dApp）集成，從高層（抽象）到低層（細粒度）實現。

在本指南中，我們將把 Kaia 錢包 dApp 整合分為三大類：

- 用戶界面圖書館
- 實用圖書館
- 提供商

:::note

上述庫在引擎蓋下使用 "提供者"。

:::

## 1. 用戶界面圖書館

許多 dApp 利用前端框架進行狀態管理和提供反應式服務。 將 Kaia 錢包與此類應用程序集成的推薦方法是使用基於相同框架構建的用戶界面庫。

用戶界面庫為用戶交互提供組件，如 "ConnectWallet "組件。 它們還能為您省去管理多賬戶和多網絡等低級狀態的麻煩。 您可以查看底層的 [Utility Library](#2-utility-libraries)或 [Provider] (#3-providers)，瞭解複雜或低級的交互。

雖然大多數用戶界面庫都內置了對 Metamask 的支持，但由於 Kaia Wallet 的[API](https://docs.kaia.io/references/json-rpc/kaia/account-created/)是基於[Metamask's](https://docs.metamask.io/wallet/reference/json-rpc-api)構建的，因此集成起來也很容易。 即使一個庫沒有原生支持 Kaia 錢包，擴展它以集成 Kaia 錢包也很簡單。 例如，這是 [React](https://react.dev) 或 [Next.js](https://nextjs.org) 的 2 個流行庫：

- [Appkit](#1.1-appkit-example)
- [Web3-Onboard](#1.2-web3-onboard-example)

### 1.1. Appkit 示例

![Appkit Hero Banner](/img/build/tutorials/appkit-reown.png)

通過 [Reown](https://reown.com/)，[Appkit](https://docs.reown.com/appkit/overview) 提供以下**功能：**

- 連接錢包、賬戶信息和網絡信息的按鈕 + 模式
- 支持 [電子郵件錢包](https://docs.reown.com/appkit/authentication/socials)、[Coinbase](https://www.coinbase.com) 賬戶和 [EIP-4361](https://docs.reown.com/appkit/authentication/one-click-auth)

**考慮因素：**

- 使用 [@reown/appkit](https://www.npmjs.com/package/@reown/appkit)，您可以選擇提交到 [Wagmi](https://wagmi.sh) & [Tanstack Query](https://tanstack.com/query) 的前端堆棧，或者只提交到 [Ethers](https://docs.ethers.org/v6/)
- 需要 `projectId` [使用 Reown 註冊](https://cloud.walletconnect.com/sign-in)

:::note

示例代碼：[kaikas-web3modal](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/kaikas.md)

:::

### 1.2. Web3-Onboard 示例

![Web3-Onboard Graphic](https://onboard.blocknative.com/_app/immutable/assets/connect-modal.b7439c5e.svg)

由[Blocknative](https://www.blocknative.com)、[Web3-Onboard](https://onboard.blocknative.com)提供以下**功能：**

- 可配置的機載文本
- 連接錢包、交換賬戶和交換網絡的模式
- [通知組件](https://onboard.blocknative.com/docs/modules/core#customnotification)
- (可選）註冊 API 密鑰以獲取和呈現即時數據

**考慮因素：**

- 您必須編寫您的按鈕

:::note

示例代碼：[kaikas-web3onboard-react](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/web3Onboard.md)

:::

## 2. 實用圖書館

kaia-sdk](#21-kaia-sdk) 和 [ethers.js](#22-ethersjs-example) 等庫的抽象程度足以簡化區塊鏈交互，同時還能直接調用 [Provider](#3-providers) API。

使用實用程序庫連接賬戶或發送本地令牌（如 KAIA/ETH），在語法和代碼行數\*方面與直接調用提供商沒有區別。 圖書館主要在以下方面有所改進：

- 智能合約互動
  - 這些涉及 ABI、編碼輸入和解碼輸出。 如果沒有庫，這些代碼可能會冗長且容易出錯。
- 錯誤處理
  - 字符串錯誤代碼/信息被映射到具有自定義屬性和方法的錯誤類。
- 文件和類型安全

### 2.1. kaia-sdk

[kaia-sdk](https://github.com/kaiachain/kaia-sdk)是其他實用程序庫（如 [ethers.js](https://docs.ethers.io/v6) 和 [web3.js](https://web3js.org))的插入式擴展集。 它允許您使用自己喜歡的庫，同時為[Kaia 特定方法](https://docs.kaia.io/references/json-rpc/kaia/account-created/)提供第一方支持：

- 交易、賬戶和賬戶密鑰類型
- 收費代表團

:::note

示例代碼：[kaikas-web3klaytn](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/kaikas.md)

:::

### 2.2. ethers.js 示例

[etherthers.js](https://docs.ethers.io/v6)是[最受歡迎的](https://npmtrends.com/web3klaytn-vs-ethers-vs-viem-vs-web3) JavaScript 工具庫，用於與區塊鏈進行交互。 它的目標是

- 廣泛：支持多種錢包格式、語言和功能
- 穩健：全面的測試、文檔和鍵入

:::note

示例代碼：[kaikas-ethersjs](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/ethers-js.md)

:::

## 3. 提供商

最底層是提供程序 [`window.klaytn`](https://docs.kaiawallet.io/02_api_reference/01_klaytn_provider)（Kaia 錢包本身）。 您可能更喜歡[實用庫](#2-utility-libraries)，但瞭解提供程序接口有助於調試和理解依賴庫如何工作。 要使用 Kaia 特有的方法，如 [`kaia_getAccount`](https://docs.kaia.io/references/json-rpc/kaia/get-account/)、[`kaia_sendTransactionAsFeePayer`](https://docs.kaia.io/references/json-rpc/kaia/send-transaction-as-fee-payer/) 等，必須參考 [Kaia 的 JSON-RPC API][Kaia-API]。
