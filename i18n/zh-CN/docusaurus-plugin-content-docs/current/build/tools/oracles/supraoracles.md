# SupraOracles

![](/img/banners/kaia-supra.png)

## 导言

[SupraOracles](https://supraoracles.com/)是一种新颖、高吞吐量的 Oracle & IntraLayer：一种垂直整合的跨链解决方案工具包（数据oracles、资产桥、自动化网络等），可将所有区块链（公有链（L1s 和 L2s）或私有链（企业））相互连接起来。它为智能合约提供了下一代跨链甲骨文解决方案，具有卓越的数据准确性、速度、可扩展性和安全性。

有了 SupraOracles，您的智能合约就可以访问价格数据源，从而构建各种去中心化金融（DeFi）用例。在本教程中，您将使用 SupraOracles，使用 Remix IDE 在 Kaia 区块链上轻松获取价格信息。

## 先决条件

- [Kaia 钱包](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)
- [Remix IDE](https://remix.ethereum.org/)
- [Kaia Plugin on Remix](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- 测试来自 [龙头] 的 KAIA(https://faucet.kaia.io)

## 开始

在以下步骤中，您将使用 SupraOracles 在智能合约中请求 ETH/USD 价格反馈。让我们开始吧！

### 步骤 1：创建 S 值接口

这将创建用于从 SupraOracles 获取价格的接口。将以下代码添加到您希望获取 S 值的 solidity 智能合约中。

```solidity
interface ISupraSValueFeed {
function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
```

### 步骤 2：配置 S 值反馈地址

要从 SupraOracles 智能合约中获取 S-Value，首先要找到所选链的 S-Value Feed 地址。有了正确的地址后，使用我们之前定义的接口创建一个 S-Value Feed 实例：

```solidity
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
}
```

在本例中，我们在 Kaia Kairos TestNet 上实现了 S-Value Feed。您可以在 [此处](https://supraoracles.com/docs/get-started/networks/) 验证 Kaia Kairos S-Value Feed 地址。

### 第 3 步：获取 S-Value 加密货币价格

现在，您只需访问我们支持的市场货币对的 S-Value Crypto 价格即可。在这一步中，您将在智能合约中应用以下代码，从而获得 ETH/USDT (eth_usdt) 的价格。

```solidity
function getEthUsdtPrice() external view returns (int) {
(
int price,
/* uint timestamp */
) = sValueFeed.checkPrice("eth_usdt");
return price;
}
```

## 具体实施

在下面的示例中，我们将部署 S-Value 价格反馈合约，同时执行 getEthUsdtPrice() 函数来获取 ETH/USDT 货币对的价格。

### 创建和部署示例代码

**Remix IDE**

- 导航至 [Remix IDE](https://remix.ethereum.org/)
- 单击 "文件资源管理器 "选项卡，在合同文件夹中新建一个名为 "demoSupraPriceFeed.sol "的文件。
- 将下面的代码粘贴到新创建的文件中
- 在 Remix 中，点击 **编译合同**。
- 安装插件后，点击左侧的 Kaia 选项卡
- 选择 **环境** > **注入式提供商** - **Kaia Wallet**。
- 在**合同**中，选择您的合同。例如，ISupraSValueFeedExample。
- 点击 **部署**。

\*\* 示例代码\*\*

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

### 与智能合约互动

要获取所选货币对的价格信息，必须执行`getEthUsdtPrice()`函数。

![](/img/build/tools/sPriceFeed.png)

塔达 🎉！您刚刚请求在智能合约中提供货币价格（ETH/USDT）。

截至编写本报告时，getEthUsdtPrice() 返回了 "185795966200"，一个 8 点精度的数字。要获得 ETH/USD 的实际价值，您需要将该数字除以 10^8，等于 1857.95966200 美元。

## 使用 SupraOracles Crypto Price Feeds 的更多方法

### 使用 Web3.js 实现 S-Value Feeds

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

## 结论

在本教程中，您将学习如何使用 SupraOracle 价格馈送解决方案请求 ETH/USD 价格。有了 SupraOracle，您还可以在智能合约中生成随机数。如果您想了解这一过程，请访问有关在 Kaia 上集成 SupraVRF 的 [指南](https://metaverse-knowledge-kit.klaytn.foundation/docs/decentralized-oracle/oracle-providers/supraOracles-tutorial)。有关 SupraOracles 的更多深入指南，请参阅 [SupraOracles 文档](https://supraoracles.com/docs/development-guides)。