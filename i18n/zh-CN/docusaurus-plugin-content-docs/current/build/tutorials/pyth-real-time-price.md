# 如何使用 Pyth 在 Kaia 上获取实时价格

## 介绍

Pyth 是一个去中心化的神谕网络，它在主要由推式神谕驱动的生态系统中采用了一种独特的方法。 Pyth 不需要以固定的时间间隔向合同推送数据，而是允许你按需提取真实世界的数据。 这种模式为开发人员提供了更多控制权，有助于避免不必要的链上更新。 通过这种集成，开发人员可以获取实时数据，并使用按使用付费的模式，即只有在请求更新时才收费。

在本指南中，您将学习如何使用 Pyth 的实时价格馈送来读取法定货币 IDR 的价值。 您的 Solidity 智能合约将使用 [pyth-sdk-solidity](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity) 从 Pyth 获取美元/印尼盾价格，您将使用 [hermes-client](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/hermes/client/js) 更新并获取最新价格。

为了快速入门，您可以在 [GitHub](https://github.com/ayo-klaytn/pyth-kaia-hardhat-example) 上找到本教程的完整代码。 这为您提供了随时可用的参考资料，帮助您更快地设置项目和安装。

## 要求

在开始之前，请确保具备以下条件：

- [Node.js 和 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

  需要安装依赖项和运行开发工具。

- 由 KAIA 测试网络代币出资的钱包。

  您需要 KAIA 来支付 Kairos 测试网络的部署和交易气体费用。 您可以从 [Kaia 水龙头] (https://faucet.kaia.io/) 申请免费测试网络 KAIA。

## 设置开发环境

在本节中，您将设置开发环境，编译 Oracle 合同，并准备使用 Hardhat 进行部署。

**1. 创建硬头巾项目**

为项目创建一个新目录并初始化 Hardhat：

```bash
mkdir pyth-kaia-hardhat-example && cd pyth-kaia-hardhat-example
npm init -y
npx hardhat@next --init
```

根据提示接受默认回复。 在本指南中，我们将使用摩卡和以太模板。

通过检查 Hardhat 版本来验证您的安装：

```bash
npx hardhat --version
```

**2. 设置加密机密**

现在，您将使用 Hardhat 的加密密钥库存储 RPC URL 和私人密钥。

运行以下命令

```bash
npx hardhat keystore set KAIROS_RPC_URL
npx hardhat keystore set PRIVATE_KEY
```

确保为每个变量输入密码和值，以保持加密。

**3. 配置文件中的参考秘诀**

打开 `hardhat.config.ts`，更新网络部分以引用加密机密。 如果使用了不同的密钥名称，请相应更新密钥。

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

## 创建合约并从 Pyth Oracles 获取价格

在本节中，您将安装 [Pyth Solidity SDK](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity)，创建一个 PriceConsumer 合约，并使用 Hardhat 进行部署。 该合约将读取 Pyth 价格源，稍后你将使用从 Hermes 获取的价格数据对其进行更新。

### 安装 Pyth SDK

Pyth 提供了一个 Solidity SDK，可让您与链上 Pyth 价格反馈合约进行交互。 SDK 公开了 IPyth 接口和相关结构。

使用 npm 安装 SDK：

```bash
npm install --save-dev @pythnetwork/pyth-sdk-solidity
```

### 创建 PriceConsumer 合同

在 `contracts/PriceConsumer.sol` 中创建一个新文件，并添加以下代码：

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

**走过**

价格消费者合同：

- 从 `@pythnetwork/pyth-sdk-solidity` 导入 Pyth 接口和结构体。
- 商店
  - Pyth 合约实例 (pyth)。
  - 美元/印度卢比的价格输入 ID (usdIdrPriceId)。
- Exposes `updateAndGetUsdIdrPrice`, which：
  - 使用 IPyth.getUpdateFee 计算更新费用。
  - 调用 IPyth.updatePriceFeeds，输入所需费用。
  - 调用 IPyth.getPriceNoOlderThan 读取新的美元/印度卢比价格。
  - 返回原始价格、指数和发布时间。

稍后，您的离链爱马仕客户端将建立 priceUpdate 字节数组，并在需要新价格时将其传入此函数。

### 编制合同

运行以下命令编译合同

```
npx hardhat compile
```

## 部署合同

要部署 PriceConsumer 合同，需要创建一个 Ignition 模块，然后运行部署命令。

**创建点火模块**

在 `ignition/modules/PriceConsumer.ts` 创建一个新文件：

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43"; 
export default buildModule("PriceConsumerModule", (m) => {
  const priceConsumer = m.contract("PriceConsumer", [pythContractAddress]);
  return { priceConsumer };
});
```

**部署合同**

使用 Ignition 模块将 PriceConsumer 合同部署到 Kairos 测试网络：

```bash
npx hardhat ignition deploy --network kairos ignition/modules/PriceConsumer.ts
```

出现提示时，输入先前为加密机密配置的密钥库密码。

完成上述操作后，您的 "PriceConsumer.sol "合约就会部署到 Kairos 测试网上，并准备好从 Pyth 消费实时美元/印尼盾价格。

## 从 TypeScript 互动

在最后一步，您将使用 TypeScript 与已部署的 PriceConsumer 合约交互。 该脚本将通过 Hermes 客户端请求 Pyth 价格更新数据，并在链上发送，从而获取最新的美元/印尼盾价格。

**安装依赖项**

安装所需的软件包：

```bash
npm install --save-dev tsx @pythnetwork/hermes-client @dotenv
```

\*\* 设置 .env\*\*

在项目根目录下创建 .env 文件，并添加私人密钥：

```bash
PRIVATE_KEY="0xDEAD....." // REPLACE WITH YOUR PRIVATE KEY
```

**创建交互脚本**

在 **scripts/interact.ts**创建一个新文件，并添加以下内容：

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

**剧本**

用以下命令执行脚本

```bash
npx tsx scripts/interact.ts
```

**输出示例**

```bash
Tx sent: 0x79c5dcb7abd9605b070bf9062ba2e2382272d23d58f7b50446c3107b7784fc8e
Tx confirmed
=== Latest Price from Contract ===
Price Value : 1669784988
Exponent Value : -5
======== —— =========
```

在搜索栏中粘贴交易哈希值，即可在 Kairos 浏览器上验证您的交易。 这证明更新和读取操作均已成功。

## 结论

在本教程中，你创建了一个从 Pyth 读取实时价格的 Solidity 合约，将其部署到 Kairos 测试网络，并使用 Hermes 客户端与之交互。 您还了解到 Pyth 基于拉动的设计如何让您控制价格更新的时间和方式。

欲了解更多信息，请浏览

- Pyth API 的 [EVM 合同参考](https://api-reference.pyth.network/price-feeds/evm/getPriceNoOlderThan)
- [Pyth Oracle AMM 示例](https://github.com/pyth-network/pyth-examples/tree/main/price_feeds/evm)用于完整的端到端实施



