# 如何使用 Pyth 在 Kaia 上取得即時價格

## 介紹

Pyth 是一個分散式甲骨文網路，在主要由推式甲骨文驅動的生態系統中採用獨特的方法。 Pyth 不會以固定的時間間隔將資料推送至您的合約，而是讓您可以依需求取得真實世界的資料。 此模式可讓開發人員擁有更多控制權，並有助於避免不必要的 onchain 更新。 透過此一整合，開發人員可以取得即時資料，並使用按使用量付費的模式，只有在要求更新時才需付費。

在本指南中，您將學習如何使用 Pyth 的即時價格源來讀取法定貨幣 IDR 的價值。 您的 Solidity 智慧合約將使用 [pyth-sdk-solidity](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity) 從 Pyth 擷取 USD/IDR 價格，您將使用 [hermes-client](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/hermes/client/js) 更新並擷取最新價格。

若要快速入門，您可以在 [GitHub](https://github.com/ayo-klaytn/pyth-kaia-hardhat-example) 上找到本教學的完整程式碼。 這可提供即時可用的參考，並協助您更快速地設定專案和安裝。

## 要求

開始之前，請確保您已準備好下列各項：

- [Node.js 與 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

  安裝相依性和執行開發工具所需的軟體。

- 以 KAIA testnet 代幣為資金的錢包。

  您需要 KAIA 來支付 Kairos 測試網的部署和交易瓦斯費用。 您可以向 [Kaia Faucet](https://faucet.kaia.io/) 索取免費的測試網路 KAIA。

## 設定開發環境

在本節中，您將設定開發環境、編譯您的 oracle 合約，並準備使用 Hardhat 進行部署。

**1. 建立硬帽專案**

為專案建立新目錄，並初始化 Hardhat：

```bash
mkdir pyth-kaia-hardhat-example && cd pyth-kaia-hardhat-example
npm init -y
npx hardhat@next --init
```

出現提示時，接受預設回應。 在本指南中，我們將使用 Mocha 和 Ethers 模版。

通過檢查 Hardhat 版本來驗證您的安裝：

```bash
npx hardhat --version
```

**2. 設定加密的秘密**

現在您將使用 Hardhat 的加密 keystore 來儲存您的 RPC URL 和私人密碼匙。

執行下列指令：

```bash
npx hardhat keystore set KAIROS_RPC_URL
npx hardhat keystore set PRIVATE_KEY
```

請務必輸入您的密碼和每個變數的值，以保持其加密。

**3. 設定檔中的參考秘訣**

開啟 `hardhat.config.ts`，更新 networks 區段以引用加密的秘密。 如果您使用不同的秘密名稱，請相應更新金鑰。

```typescript
import { configVariable } from "hardhat/config";
module.exports = {
  networks: {
    kairos: {
      url: configVariable("KAIROS_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
};
```

## 建立契約並從 Pyth Oracles 取得價格

在本節中，您將安裝 [Pyth Solidity SDK](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity)、建立 PriceConsumer 契約，並使用 Hardhat 部署它。 合約會讀取 Pyth 價格源，您稍後會使用從 Hermes 取得的價格資料來更新。

### 安裝 Pyth SDK

Pyth 提供一個 Solidity SDK，讓您可以與 onchain Pyth 價格饋送契約互動。 SDK 開放 IPyth 介面和相關的結構。

使用 npm 安裝 SDK：

```bash
npm install --save-dev @pythnetwork/pyth-sdk-solidity
```

### 建立 PriceConsumer 合約

在 `contracts/PriceConsumer.sol` 建立新檔案，並加入下列程式碼：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
contract PriceConsumer {
    IPyth public pyth;
    constructor(address pythContract) {
        pyth = IPyth(pythContract);
    }
    function updatePrice(bytes[] calldata priceUpdateData)
        external
        payable
    {
        // Pay the Pyth fee for receiving price updates
        uint fee = pyth.getUpdateFee(priceUpdateData);
        require(msg.value >= fee, "Not enough fee sent");
        // Update the Pyth price state
        pyth.updatePriceFeeds{value: fee}(priceUpdateData);
        // Can fetch the price and use it as well
        //PythStructs.Price memory currentBasePrice = pyth.getPriceNoOlderThan(priceFeedId, 60);
    }
    function getLatestPrice(bytes32 priceFeedId) public view returns (int64, int32) {
        // Read the current price from a price feed if it is less than 60 seconds old.
        // Each price feed (e.g., USD/IDR) is identified by a price feed ID.
        // The complete list of feed IDs is available at https://docs.pyth.network/price-feeds/price-feeds
        PythStructs.Price memory currentBasePrice = pyth.getPriceNoOlderThan(priceFeedId, 60);
        
        // uint256 basePrice = PythUtils.convertToUint(
        //   currentBasePrice.price,
        //   currentBasePrice.expo,
        //   18
        // );
        
        return (currentBasePrice.price, currentBasePrice.expo);
    }
}
```

**走過**

PriceConsumer 合約：

- 從`@pythnetwork/pyth-sdk-solidity`匯入 Pyth 介面和結構。
- 商店：
  - Pyth 契約實例 (pyth)。
  - 美元 / IDR 的價格源 ID (usdIdrPriceId)。
- Exposes `updateAndGetUsdIdrPrice`, which：
  - 使用 IPyth.getUpdateFee 計算更新費用。
  - 使用所需費用呼叫 IPyth.updatePriceFeeds。
  - 呼叫 IPyth.getPriceNoOlderThan 讀取新的 USD / IDR 價格。
  - 傳回原始價格、分數和發佈時間。

之後，您的離鏈 Hermes 客戶端會建立 priceUpdate bytes 陣列，並在需要新價格時將其傳入此函式。

### 編寫合約

執行下列指令來編譯您的合約：

```
npx hardhat compile
```

## 部署合約

要部署 PriceConsumer 合約，您需要建立一個 Ignition 模組，然後執行部署指令。

\*\* 建立點火模組\*\*

在 `ignition/modules/PriceConsumer.ts` 建立新檔案：

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43"; 
export default buildModule("PriceConsumerModule", (m) => {
  const priceConsumer = m.contract("PriceConsumer", [pythContractAddress]);
  return { priceConsumer };
});
```

**部署合約**

使用您的 Ignition 模組，將 PriceConsumer 合約部署到 Kairos 測試網：

```bash
npx hardhat ignition deploy --network kairos ignition/modules/PriceConsumer.ts
```

出現提示時，請輸入之前為加密機密設定的 keystore 密碼。

一旦完成，您的「PriceConsumer.sol」合約就會部署在 Kairos 測試網路上，並準備好從 Pyth 消耗即時美元 / IDR 價格。

## 從 TypeScript 互動

在最後一步，您將使用 TypeScript 與已部署的 PriceConsumer 契約互動。 這個腳本會透過 Hermes 客戶端請求 Pyth 價格更新資料，取得最新的 USD/IDR 價格，並在鏈上傳送。

\*\* 安裝相依性\*\*

安裝所需的套件：

```bash
npm install --save-dev tsx @pythnetwork/hermes-client @dotenv
```

\*\* 設定 .env\*\*

在專案根目錄中建立 .env 檔案，並加入您的私人金鑰：

```bash
PRIVATE_KEY="0xDEAD....." // REPLACE WITH YOUR PRIVATE KEY
```

\*\* 建立互動腳本\*\*

在 **scripts/interact.ts** 建立新檔案，並加入下列內容：

```typescript
import { HermesClient } from "@pythnetwork/hermes-client";
import { ethers } from "ethers";
import 'dotenv/config'

// 1. Setup
const hermes = new HermesClient("https://hermes.pyth.network");
const provider = new ethers.JsonRpcProvider(
  "https://public-en-kairos.node.kaia.io"
);

const PK = process.env.PRIVATE_KEY; 
const wallet = new ethers.Wallet(PK, provider);


// 2. Your deployed contract
const priceConsumerAddress = "0x91e89aa32224dEd5dA483a83a4de45bF4bE57caA"; // REPLACE WITH DEPLOYED PRICE CONSUMER CONTRACT

const priceConsumerAbi = [
  "function updatePrice(bytes[] priceUpdateData) external payable",
  "function getLatestPrice(bytes32 priceId) public view returns(int64, int32)",
];

const priceConsumer = new ethers.Contract(
  priceConsumerAddress,
  priceConsumerAbi,
  wallet
);

// 3. Price feed IDs
const priceId =
  "0x6693afcd49878bbd622e46bd805e7177932cf6ab0b1c91b135d71151b9207433"; // FX.USD/IDR Beta Price Feed ID

async function run() {
  // Fetch Hermes price update binary
  const update = await hermes.getLatestPriceUpdates([priceId], {
    encoding: "hex",
  });
  console.log(update);

  const priceUpdateData = ["0x" + update.binary.data]; // must be array of bytes

  console.log(priceUpdateData);

  // Estimate fee required by Pyth contract
  // EVM Network Price Feed Contract Addresses: https://docs.pyth.network/price-feeds/core/contract-addresses/evm

  const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43";
  const pythAbi = [
    "function getUpdateFee(bytes[] calldata data) external view returns(uint)",
  ];
  console.log("Pyth contract address:", pythContractAddress);
  const pyth = new ethers.Contract(pythContractAddress, pythAbi, wallet);
  const fee = await pyth.getUpdateFee(priceUpdateData);
  console.log("Pyth fee:", fee.toString());

  // Call your contract
  const tx = await priceConsumer.updatePrice(priceUpdateData, {
    value: fee, // pay the pyth update fee
    gasLimit: 500000,
  });
  console.log("Tx sent:", tx.hash);
  const receipt = await tx.wait();
  console.log("Tx confirmed");
  console.log(receipt);

  // 4. Get latest price from contract
  try {
    console.log("=== Latest Price from Contract ===");
    const [price, expo] = await priceConsumer.getLatestPrice(priceId);
    console.log("Price Value : " + price.toString());
    console.log("Exponent Value : " + expo.toString());
  } catch (error) {
    console.log(error);
    // @ts-ignore
    console.error("\nError calling getLatestPrice:", error.message);
    console.log(
      "This usually means the price is older than 60 seconds or hasn't been updated yet."
    );
    console.log("Make sure updatePrice() was called successfully first.");
  }
}
run();

```

**執行腳本**

用以下指令執行腳本：

```bash
npx tsx scripts/interact.ts
```

\*\* 輸出範例\*\*

```bash
Tx sent: 0x79c5dcb7abd9605b070bf9062ba2e2382272d23d58f7b50446c3107b7784fc8e
Tx confirmed
=== Latest Price from Contract ===
Price Value : 1669784988
Exponent Value : -5
======== —— =========
```

在搜尋列中貼上交易切細值，即可在 Kairos explorer 上驗證您的交易。 這證明更新和讀取作業成功。

## 總結

在本教程中，您建立了一個 Solidity 契約，可從 Pyth 讀取即時價格，並將其部署到 Kairos 測試網路，並使用 Hermes 客戶端與其互動。 您也了解到 Pyth 基於拉動的設計如何讓您控制價格更新發生的時間和方式。

如需更多資訊，請探索：

- [EVM Contract Reference](https://api-reference.pyth.network/price-feeds/evm/getPriceNoOlderThan) for Pyth API
- [Pyth Oracle AMM 實例](https://github.com/pyth-network/pyth-examples/tree/main/price_feeds/evm)為完整的端對端實作



