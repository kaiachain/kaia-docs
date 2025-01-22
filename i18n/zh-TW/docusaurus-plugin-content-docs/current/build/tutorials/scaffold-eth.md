# 使用 Scaffold-ETH 2 構建 dApp

![](/img/banners/kaia-scaffold.png)

## 導言<a href="#introduction" id="introduction"></a>

Scaffold-ETH 2 是一個開源工具包，用於在以太坊和其他與 EVM 兼容的區塊鏈（如 Kaia）上構建去中心化應用程序（dApps）。 藉助 Scaffold-ETH 2，開發人員可以輕鬆部署 Solidity 智能合約，並使用 React 前端啟動 dApp。

Scaffold-ETH 2 工具包使用 Next.js、RainbowKit、Hardhat、Foundry、Wagmi 和 TypeScript 構建。 開發人員可以使用 Hardhat 或 Foundry 輕鬆創建、測試和部署智能合約，還可以使用 Next.js 構建 React 前端。

在本教程中，您將學習如何使用 Scaffold-ETH 2 在 Kaia 上部署、運行合約和構建 dApp。

## 先決條件<a href="#prerequisites" id="prerequisites"></a>

要開始學習本指南，您需要

- [節點 (>= v18.17)](https://nodejs.org/en/download/)
- 紗線（[v1](https://classic.yarnpkg.com/en/docs/install/) 或 [v2+](https://yarnpkg.com/getting-started/install))
- 熟悉 Javascript 和 React 基礎知識，例如鉤子
- [Metamask錢包](https://metamask.io/download/)
- 測試來自 [龍頭] 的 KAIA(https://faucet.kaia.io)
- RPC 端點：您可以從其中一個受支持的 [端點提供程序](https://docs.kaia.io/references/public-en/) 獲取該端點。

## 設置開發環境<a href="#setting-up-dev-environment" id="setting-up-dev-environment"></a>

要安裝 Scaffold-ETH 2，您有兩個選擇，要麼克隆 [Scaffold-ETH 2 資源庫](https://github.com/scaffold-eth/scaffold-eth-2)，要麼使用 `npx create-eth@latest` 安裝。

在本指南中，我們將使用 npx 方法來引導 Scaffold-ETH 2 項目。

運行以下命令引導 Scaffold-ETH 2 項目：

```bash
npx create-eth@latest
```

您將看到一系列提示：

**項目名稱**：輸入項目名稱： 輸入項目名稱，如 kaia-scaffold-example。

\*\* 實體框架\*\*；您想使用哪種實體框架？選擇您喜歡的實體框架（Hardhat、Foundry）。 在本指南中，我們將使用 Hardhat 框架。

**Install packages?**：按回車鍵表示是（默認選項）或輸入 n 並按回車鍵表示否
設置完成後，導航至項目目錄。

```bash
cd project-name
// e.g  cd kaia_scaffold
```

![Scaffold-ETH setup](/img/build/tutorials/scaffold-1.png)

## Scaffold-ETH 2 開發過程的亮點<a href="#highlight-of-dev-environment" id="highlight-of-dev-environment"></a>

使用 Scaffold-ETH 2 開發項目的流程可概述如下：

1. 為 Kaia 更新 Hardhat 中的網絡配置
2. 將智能合約添加到 **packages/hardhat/contracts** 中
3. 編輯 **packages/hardhat/deploy** 中的部署腳本
4. 將智能合約部署到 Kaia
5. 使用硬帽驗證插件驗證智能合約
6. 在 **packages/nextjs/scaffold.config.ts** 文件中配置前端以 Kaia 為目標
7. 在 **packages/nextjs/pages**目錄下根據需要編輯你的前臺

在本指南中，我們將使用 Scaffold-ETH 2 安裝後可用的默認示例合同和前端。 只需為 Kaia 修改這些組件即可。 在這種情況下，我們將把配置分為 **Hardhat** 和 **Next.js** 配置。

## 硬頭盔配置

在本節中，你將修改 Hardhat 配置文件中的網絡配置，以**packages/hardhat**文件夾下的 Kaia 為目標。

### 為 Kaia 配置 Hardhat

要為 Kaia 配置 hardhat，需要創建 .env 文件並修改 hardhat.config.ts 以支持 Kaia。

**第 1 步：創建 .env**

要創建 .env 文件，請在終端中複製並粘貼以下代碼

```bash
touch packages/hardhat/.env
```

關於 hardhat.config.js 文件中已使用的變量，可參考 **.env.example** 文件。 對於 Kaia，您只需創建一個變量：**deployed_private_key**.

**第 2 步：編輯 .env 文件以包含此變量：**

```bash
deployer_private_key=insert_private_key
```

在\*\*.env\*\*文件中說明的私鑰與將在 Hardhat 項目中部署智能合約並與之交互的賬戶相對應。

**第 3 步：修改 hardhat.config.ts**

接下來我們要做的是配置 **hardhat.config.ts** 以支持 Kaia。

將常量**defaultNetwork**設置為部署智能合約的網絡。

```js
    kairos: {
      chainId: 1001,
      url: "https://responsive-green-emerald.kaia-kairos.quiknode.pro/",
      accounts: [deployerPrivateKey],
    },
```

在網絡配置對象下為 Kaia 添加網絡配置

```js
network: "kairos",
```

有關在 Kaia 中使用 Hardhat 的更多信息，請查看 [Hardhat 指南](https://docs.kaia.io/build/get-started/hardhat/) 瞭解更多詳情。

### 向 Kaia 部署合同

配置 Hardhat 以支持 Kaia 網絡後，下一步就是編譯和部署合同樣本。

首先，您可以通過運行

```bash
紗線編譯
```

![Compile](/img/build/tutorials/scaffold-2.png)

然後，可以在項目根目錄下運行以下命令：

```
yarn deploy
```

![Deploy](/img/build/tutorials/scaffold-6.png)

請注意：

> 如果沒有在 hardhat.config.ts 文件中設置默認網絡配置，可以在命令中添加 --network INSERT_NETWORK。 例如，以下命令將向 Kaia 部署一份合同。

> yarn deploy --network kaia

### 驗證您已部署的合同<a href="#verify-deployed-contract" id="verify-deployed-contract"></a>

要驗證已部署的合同，我們將使用硬帽驗證插件。 只需在 Kairos Testnet 的 etherscan 配置對象下的 **hardhat.config.ts** 中添加以下配置即可。

```js
  etherscan: {
    apiKey: {
      kairos: "unnecessary",
    },
    customChains: [
      {
        network: "kairos",
        chainId: 1001,
        urls: {
          apiURL: "https://api-baobab.klaytnscope.com/api",
          browserURL: "https://kairos.kaiascope.com",
        },
      },
    ],
  },
```

接下來，在終端中複製並粘貼以下命令來驗證智能合約：

示例

```js
yarn hardhat-verify --network network_name contract_address "構造函數參數 1"
```

實際

```js
yarn hardhat-verify --network kairos 0x7fc9656fc8c8ab433867e58b7c6afc19ec4275da
 "0x7fc9656fc8c8ab433867e58b7c6afc19ec4275da"
```

如上所示，要驗證合同，必須輸入網絡名稱、合同地址和構造函數參數（如有）。 稍等片刻，控制檯就會顯示驗證結果，如果驗證成功，還會提供指向 Kaiascope 上已驗證合同的 URL。

![Verify](/img/build/tutorials/scaffold-verify.png)

![Verify on Kaiascope](/img/build/tutorials/scaffold-3.png)

有關使用 Hardhat Verify 插件在 Kaia 上驗證智能合約的更多信息，請參閱 H[ardhat-Verify-Plugins guide](https://docs.kaia.io/build/smart-contracts/verify/hardhat/) 。

## Next.js 配置<a href="#nextjs-configuration" id="nextjs-configuration"></a>

在本節中，你將修改 Next.js 配置，使其針對**packages/nextjs**文件夾下的 Kairos Testnet（智能合約部署到了這裡）。 在本文件夾中，我們打算修改 **scaffold.config.ts** 文件中 scaffoldConfig 對象的 **targetNetwork** 數組。

### 修改 targetNetwork 數組<a href="#modify-targetnetwork-array" id="modify-targetnetwork-array"></a>

```js
targetNetworks: [chains.klaytnBaobab],
```

這就是配置 Next.js 的全部要求！ 接下來，在本地主機上啟動 dApp。

### 在本地主機啟動應用程序<a href="#launch-dapp-in-localhost" id="launch-dapp-in-localhost"></a>

完成所有必要配置後，您就可以在本地主機上啟動示例應用程序了。

為此，請運行

```bash
起紗
```

![Run dApp](/img/build/tutorials/scaffold-4.png)

現在，您應該可以在 http://localhost:3001/ 上訪問基於 React 的 dApp 前端。 您可以通過連接錢包或查看合約調試器頁面與 dApp 進行互動。

![Scaffold dApp](/img/build/tutorials/scaffold-5.png)

## 結論

祝賀你 您已成功使用 Scaffold-ETH 2 在 Kaia 上部署了一個合約並運行了一個 dApp。 現在您已經瞭解 Scaffold-ETH 2 的工作原理，可以隨意創建和部署自己的智能合約，並修改前端以滿足您的 dApp 需求！

如需瞭解更多信息，請訪問 [Scaffold-ETH 2 文檔](https://docs.scaffoldeth.io/) ；如有任何疑問，請訪問 [Kaia 論壇](https://devforum.kaia.io/)。
