# 3. 支持的令牌

开发人员应在尝试无气体交易前查询当前支持的代币列表。

## 3.1. 代币资格标准

- **ERC-20 合规性：** 代币必须完全符合 ERC-20 标准。
- **不支持转账收费：** 不支持转账收费（FoT）令牌，因为它们会导致交换金额不匹配，从而导致交易失败。
- **管理白名单：** "GaslessSwapRouter "维护一个受支持的令牌列表，该列表由 Kaia 基金会管理。

## 3.2 目前支持的令牌

无燃气交易目前支持以下代币。 未来可能会纳入更多的 CL 代币和稳定币。

- **USDT**
- **博拉**

## 3.3 如何检查支持的令牌列表

你可以在 Kaia 文档中找到主网和测试网的官方 [KIP-247 GaslessSwapRouter 合同地址](https://docs.kaia.io/references/contract-addresses/)。

**GaslessSwapRouter 合同地址：**

- **主网**：`0xCf658F786bf4AC62D66d70Dd26B5c1395dA22c63`
- **Kairos Testnet**：`0x4b41783732810b731569E4d944F59372F411BEa2`

最新地址请务必参阅官方文件。

### 使用区块资源管理器（KaiaScan）

使用 KaiaScan 等区块浏览器检查支持的令牌：

![](/img/build/tutorials/ga3.png)

1. 请访问 [KaiaScan](https://kaiascan.io/) （或 [kairos.kaiascan.io](https://kairos.kaiascan.io/) 测试网）。
2. 搜索 `GaslessSwapRouter` 地址。
3. 导航至 "**合同**"选项卡并选择 "**阅读合同**"。
4. 找到 "getSupportedTokens() "函数，然后单击**查询**。 这将返回一个受支持的 ERC20 令牌地址数组。

### 计划查询

要以编程方式检查支持的令牌，可以使用 GaslessSwapRouter 合同方法。

**使用 GSR 方法：**

```solidity
function getSupportedTokens() external view returns (address[] memory);
function dexAddress(address token) external view returns (address dex); // reverts if token unsupported
```

**使用 SDK（示例）**

```javascript
// Ethers-ext.js
const ethers = require("ethers6");
const { gasless } = require('@kaiachain/ethers-ext');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const router    = await gasless.getGaslessSwapRouter(provider);
const supported = await router.getSupportedTokens();

// Web3-ext.js
const { Web3 } = require("@kaiachain/web3js-ext");

const provider = new Web3.providers.HttpProvider(RPC_URL);
const web3 = new Web3(provider);

const router    = await gasless.getGaslessSwapRouter(web3);
const supported = await router.methods.getSupportedTokens().call();
```