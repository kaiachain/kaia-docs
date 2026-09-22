# SupraOracles

![](/img/banners/kaia-supra.png)

## 導言

[SupraOracles](https://supraoracles.com/)是一種新穎、高吞吐量的 Oracle & IntraLayer：一種垂直整合的跨鏈解決方案工具包（數據oracles、資產橋、自動化網絡等），可將所有區塊鏈（公有鏈（L1s 和 L2s）或私有鏈（企業））相互連接起來。它為智能合約提供了下一代跨鍊甲骨文解決方案，具有卓越的數據準確性、速度、可擴展性和安全性。

有了 SupraOracles，您的智能合約就可以訪問價格數據源，從而構建各種去中心化金融（DeFi）用例。在本教程中，您將使用 SupraOracles，使用 Remix IDE 在 Kaia 區塊鏈上輕鬆獲取價格信息。

## 先決條件

- [Kaia 錢包](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)
- [Remix IDE](https://remix.ethereum.org/)
- [Kaia Plugin on Remix](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- 測試來自 [龍頭] 的 KAIA(https://faucet.kaia.io)

## 開始

在以下步驟中，您將使用 SupraOracles 在智能合約中請求 ETH/USD 價格反饋。讓我們開始吧！

### 步驟 1：創建 S 值接口

這將創建用於從 SupraOracles 獲取價格的接口。將以下代碼添加到您希望獲取 S 值的 solidity 智能合約中。

```solidity
interface ISupraSValueFeed {
function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
```

### 步驟 2：配置 S 值反饋地址

要從 SupraOracles 智能合約中獲取 S-Value，首先要找到所選鏈的 S-Value Feed 地址。有了正確的地址後，使用我們之前定義的接口創建一個 S-Value Feed 實例：

```solidity
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
}
```

在本例中，我們在 Kaia Kairos TestNet 上實現了 S-Value Feed。您可以在 [此處](https://supraoracles.com/docs/get-started/networks/) 驗證 Kaia Kairos S-Value Feed 地址。

### 第 3 步：獲取 S-Value 加密貨幣價格

現在，您只需訪問我們支持的市場貨幣對的 S-Value Crypto 價格即可。在這一步中，您將在智能合約中應用以下代碼，從而獲得 ETH/USDT (eth_usdt) 的價格。

```solidity
function getEthUsdtPrice() external view returns (int) {
(
int price,
/* uint timestamp */
) = sValueFeed.checkPrice("eth_usdt");
return price;
}
```

## 具體實施

在下面的示例中，我們將部署 S-Value 價格反饋合約，同時執行 getEthUsdtPrice() 函數來獲取 ETH/USDT 貨幣對的價格。

### 創建和部署示例代碼

**Remix IDE**

- 導航至 [Remix IDE](https://remix.ethereum.org/)
- 單擊 "文件資源管理器 "選項卡，在合同文件夾中新建一個名為 "demoSupraPriceFeed.sol "的文件。
- 將下面的代碼粘貼到新創建的文件中
- 在 Remix 中，點擊 **編譯合同**。
- 安裝插件後，點擊左側的 Kaia 選項卡
- 選擇 **環境** > **注入式提供商** - **Kaia Wallet**。
- 在**合同**中，選擇您的合同。例如，ISupraSValueFeedExample。
- 點擊 **部署**。

\*\* 示例代碼\*\*

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
interface ISupraSValueFeed {
    function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
    function getEthUsdtPrice() external view returns (int) {
        (
            int price,
            /* uint timestamp */
        ) = sValueFeed.checkPrice("eth_usdt");
        return price;
    }
}
```

### 與智能合約互動

要獲取所選貨幣對的價格信息，必須執行`getEthUsdtPrice()`函數。

![](/img/build/tools/sPriceFeed.png)

塔達 🎉！您剛剛請求在智能合約中提供貨幣價格（ETH/USDT）。

截至編寫本報告時，getEthUsdtPrice() 返回了 "185795966200"，一個 8 點精度的數字。要獲得 ETH/USD 的實際價值，您需要將該數字除以 10^8，等於 1857.95966200 美元。

## 使用 SupraOracles Crypto Price Feeds 的更多方法

### 使用 Web3.js 實現 S-Value Feeds

```javascript
// example assumes that the web3 library has been imported and is accessible within your scope
const getEthUsdtPrice = async () => {
const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const address = '0x7f003178060af3904b8b70fEa066AEE28e85043E'
const web3 = new Web3('https://public-en-kairos.node.kaia.io')
const sValueFeed = new web3.eth.Contract(abi, address)
const price = (await sValueFeed.methods.checkPrice('eth_usdt').call()).price
console.log(`The price is: ${price}`)
}
getEthUsdtPrice()
```

### 使用 ethers.js 的 S-Value Feeds

```javascript
// example assumes that the ethers library has been imported and is accessible within your scope
const getEthUsdtPrice = async () => {
////for ethers version 6.0
const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io")
////for ethers version <= 5.7.2
//const provider = new ethers.providers.JsonRpcProvider('https://public-en-kairos.node.kaia.io')
const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const address = '0x7f003178060af3904b8b70fEa066AEE28e85043E'
const sValueFeed = new ethers.Contract(address, abi, provider)
const price = (await sValueFeed.checkPrice('eth_usdt')).price
console.log(`The price is: ${price.toString()}`)
}
getEthUsdtPrice()
```

## 結論

在本教程中，您將學習如何使用 SupraOracle 價格饋送解決方案請求 ETH/USD 價格。有了 SupraOracle，您還可以在智能合約中生成隨機數。如果您想了解這一過程，請訪問有關在 Kaia 上集成 SupraVRF 的 [指南](https://metaverse-knowledge-kit.klaytn.foundation/docs/decentralized-oracle/oracle-providers/supraOracles-tutorial)。有關 SupraOracles 的更多深入指南，請參閱 [SupraOracles 文檔](https://supraoracles.com/docs/development-guides)。