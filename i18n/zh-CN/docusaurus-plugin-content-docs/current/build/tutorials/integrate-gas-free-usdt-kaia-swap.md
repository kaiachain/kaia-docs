---
id: integrate-gas-free-usdt-kaia-swap
title: 将天然气自由美元兑美元纳入 KAIA 掉期交易
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 将天然气自由美元兑美元纳入 KAIA 掉期交易

本指南概述了 Gas-Free USDT 到 KAIA Swap 功能，包括其目的、前提条件、集成步骤和 API 参考资料。它旨在帮助开发人员将无气体交换功能集成到 Kaia 网络上的去中心化应用程序（DApps）中。

## 导言

推出了 "gasFreeSwapKaia "API，使用户能够在 Kaia 网络上执行无燃气的 ERC20 代币交换（目前仅限于 USDT），而无需持有 KAIA 代币支付燃气费，甚至无需代表用户支付交易成本。该应用程序接口特别支持使用 ERC20 许可证签名将 USDT 交换为 KAIA，以实现完全无气体的用户体验。

### 益处

- **100%无气体验**：用户无需任何 KAIA 代币即可进行交换
- **增强用户入职**：新用户无需获取 KAIA 即可立即开始交换代币
- **ERC20 许可证集成**：使用标准 ERC20 许可证签名进行安全、无气体令牌审批

### 如何使用

- **用户启动交换**：用户选择USDT金额交换KAIA
- **前端创建许可证**：DApp 构建一个 ERC20 许可签名，供用户签署
- **用户签署许可证**：用户签署许可信息（无需气体）
- **DApp 调用 API**：前端向应用程序接口发送交换参数和许可证签名
- **后台执行**：API 验证许可证、执行交换并支付所有天然气费用
- **用户收到 KAIA**：本地 KAIA 令牌直接发送到用户钱包

## 先决条件和支持的环境

**服务端点**

<Tabs>
  <TabItem value="Mainnet" label="Kaia Mainnet">
    https://fee-delegation.kaia.io
  </TabItem>

 <TabItem value="Testnet" label="Kairos Testnet">
    https://fee-delegation-kairos.kaia.io
 </TabItem>
</Tabs>

**支持的令牌对**

应用程序接口目前仅支持单一交易对：

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet">
    代币输入： USDT (`0xd077a400968890eacc75cdc901f0356c943e4fdb`)

```
Token Out: WKAIA (`0x19aac5f612f524b754ca7e7c41cbfa2e981a4432`)
```

  </TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    令牌输入： TEST (`0xcb00ba2cab67a3771f9ca1fa48fda8881b457750`)

```
Token Out: WKAIA (`0x043c471bEe060e00A56CcD02c0Ca286808a5A436`)
```

 </TabItem>
</Tabs>

**获取测试令牌**

为 Kairos Testnet 获取 TEST 令牌：

- 在 Kaiascan 上打开 [ERC20 水龙头](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1)
- 转到 "合同 "选项卡，然后选择 "_撰写合同_"。
- 找到 claim(token) 函数
- 输入 Kairos 上受支持的 GA 令牌的地址（本指南使用 TEST 的地址）
- 单击 _Query_ 提交请求。您将很快收到 TEST 令牌。

![](/img/build/tutorials/test-tokens-faucet.png)

**智能合同要求**

该应用程序接口与 GaslessERC20PermitSwap 智能合约交互：

- 支持基于 ERC20 许可证的审批
- 与兼容 Uniswap V2 的 DEX 集成
- 自动将 WKAIA 转换为本地 KAIA
- 执行最大交换限制以确保安全

**用户要求**

在主网上，用户必须拥有零 KAIA 余额才能使用这项无气交换服务。这一要求可确保只有真正需要进行无煤气交易的用户才能使用该服务。在测试网络中，出于测试目的，这一限制被放宽。

主网和测试网的最大交换金额均限制为 1 USDT。因为该功能的目的是让用户获得足够的 KAIA 以开始他们在 Kaia Chain 上的体验。

## 整合步骤

### 完整集成示例

```javascript
const { JsonRpcProvider, Wallet } = require('@kaiachain/ethers-ext/v6');
const { Contract, parseUnits, formatUnits, Signature } = require('ethers');

async function fetchJson(url, init) {
  if (typeof fetch !== 'undefined') {
    return fetch(url, init);
  }
  const { default: nodeFetch } = await import('node-fetch');
  return nodeFetch(url, init);
}

const GASLESS_SWAP_ABI = [
  'function usdtToken() view returns (address)',
  'function wkaiaToken() view returns (address)',
  'function maxUsdtAmount() view returns (uint256)',
  'function getExpectedOutput(address tokenIn, address tokenOut, uint256 amountIn) view returns (uint256)',
  'function executeSwapWithPermit(address user, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMin, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
];

const ERC20_METADATA_ABI = [
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function nonces(address owner) view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
];

async function buildPermitSignature({ token, owner, spender, value, deadline, domainVersion = '1' }) {
  const [name, version, network, verifyingContract, nonce] = await Promise.all([
    token.name(),
    Promise.resolve(domainVersion),
    owner.provider.getNetwork(),
    token.getAddress(),
    token.nonces(owner.address),
  ]);

  const domain = {
    name,
    version,
    chainId: Number(network.chainId),
    verifyingContract,
  };

  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const message = {
    owner: owner.address,
    spender,
    value,
    nonce,
    deadline,
  };

  return Signature.from(await owner.signTypedData(domain, types, message));
}

async function executeGaslessSwap({
  rpcUrl,
  serverUrl,
  userWallet,
  contractAddress,
  amountIn = '0.01', // Amount in USDT
  slippageBps = 50,   // 0.5% slippage
  permitDeadlineSeconds = 600 // 10 minutes
}) {
  console.log('🚀 Starting gasless swap');

  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = userWallet.connect(provider);
  const swap = new Contract(contractAddress, GASLESS_SWAP_ABI, provider);

  // Get token addresses from contract
  const [tokenInAddress, tokenOutAddress, maxUsdtAmount] = await Promise.all([
    swap.usdtToken(),
    swap.wkaiaToken(),
    swap.maxUsdtAmount(),
  ]);

  const tokenIn = new Contract(tokenInAddress, ERC20_METADATA_ABI, provider);
  const tokenOut = new Contract(tokenOutAddress, ERC20_METADATA_ABI, provider);

  const [tokenInDecimals, tokenOutDecimals, tokenInSymbol, tokenOutSymbol] = await Promise.all([
    tokenIn.decimals(),
    tokenOut.decimals(),
    tokenIn.symbol(),
    tokenOut.symbol(),
  ]);

  const amountInWei = parseUnits(amountIn, tokenInDecimals);
  
  // Check if amount exceeds contract maximum
  if (amountInWei > maxUsdtAmount) {
    throw new Error(`Amount (${amountIn} ${tokenInSymbol}) exceeds contract cap (${formatUnits(maxUsdtAmount, tokenInDecimals)} ${tokenInSymbol})`);
  }

  // Get expected output and calculate minimum with slippage
  const expectedOut = await swap.getExpectedOutput(tokenInAddress, tokenOutAddress, amountInWei);
  const amountOutMin = (expectedOut * BigInt(10_000 - slippageBps)) / 10_000n;

  // Create permit signature
  const deadline = BigInt(Math.floor(Date.now() / 1000) + permitDeadlineSeconds);
  const signature = await buildPermitSignature({
    token: tokenIn,
    owner: wallet,
    spender: contractAddress,
    value: amountInWei,
    deadline,
  });

  // Prepare API payload
  const payload = {
    swap: {
      user: wallet.address,
      tokenIn: tokenInAddress,
      tokenOut: tokenOutAddress,
      amountIn: amountInWei.toString(),
      amountOutMin: amountOutMin.toString(),
      deadline: deadline.toString(),
    },
permitSignature: signature.serialized,
  };

  console.log('From:', wallet.address);
  console.log('Swap amount:', formatUnits(amountInWei, tokenInDecimals), tokenInSymbol);
  console.log('Minimum out:', formatUnits(amountOutMin, tokenOutDecimals), tokenOutSymbol);

  // Check balance before swap
  const balanceBefore = await provider.getBalance(wallet.address);
  
  // Call the API
  const response = await fetchJson(`${serverUrl}/api/gasFreeSwapKaia`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  console.log('HTTP status:', response.status);
  console.log('Response:', JSON.stringify(result, null, 2));

  if (response.ok && result.status) {
    console.log('🎉 Gasless swap request succeeded');
    
    // Check balance after swap
    const balanceAfter = await provider.getBalance(wallet.address);
    console.log('Balance before:', formatUnits(balanceBefore, 18), 'KAIA');
    console.log('Balance after:', formatUnits(balanceAfter, 18), 'KAIA');
    console.log('Balance difference:', formatUnits(balanceAfter - balanceBefore, 18), 'KAIA');
    
    return result;
  } else {
    console.error('❌ Gasless swap request failed');
    throw new Error(`Swap failed: ${result.data || result.message || 'Unknown error'}`);
  }
}

// Usage example
async function main() {
  try {
    const userWallet = new Wallet('your_private_key');
    
    const result = await executeGaslessSwap({
      rpcUrl: 'https://public-en-kairos.node.kaia.io',
      serverUrl: 'https://fee-delegation-kairos.kaia.io',
      userWallet: userWallet,
      contractAddress: '0xaaFe47636ACe87E2B8CAaFADb03E87090277Ff7B',
      amountIn: '0.002',
      slippageBps: 50,
    });
    
    console.log('Transaction hash:', result.data.hash);
  } catch (error) {
    console.error('💥 Swap failed:', error.message);
  }
}

main();
```

## API 参考端点

- URL：`/api/gasFreeSwapKaia`.
- 方法邮寄
- Content-Type: 应用程序/json

### 申请正文

```javascript
{
  "swap": {
    "user": "0x742d35Cc6635C0532925a3b8D400e6D2A4b8E0bb",
    "tokenIn": "0xcb00ba2cab67a3771f9ca1fa48fda8881b457750",
    "tokenOut": "0x043c471bEe060e00A56CcD02c0Ca286808a5A436",
    "amountIn": "1000000",
    "amountOutMin": "950000000000000000",
    "deadline": "1699123456"
  },
  "permitSignature": "0x…65-byte signature string…"
}
```

### 参数

**交换**（对象，必填）：

- 用户（字符串）：签署许可证的令牌所有者的地址
- tokenIn（字符串）：输入令牌的地址（必须与配置的 USDT 地址一致）
- tokenOut（字符串）：输出令牌的地址（必须与配置的 WKAIA 地址一致）
- amountIn （字符串）：以字符串形式表示的输入代币数量（以魏/最小单位表示）
- amountOutMin （字符串）：最小预期产出代币（滑移保护）
- deadline （字符串）：许可证和交换到期的 Unix 时间戳（秒数

**permitSignature** （字符串，必填）：

- 必须是 65 字节的有效十六进制字符串
- 包含序列化的 ERC20 许可证签名

### 回复格式

#### 成功响应 (200)

```javascript
{
  "message": "Request was successful",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "contractAddress": null,
    "cumulativeGasUsed": "215000",
    "from": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
    "gasPrice": "25000000000",
    "gasUsed": "215000",
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "status": 1,
    "to": "0x45bD04d5f14DD9AB908109cFEa816F758FaE6709",
    "type": 49,
    "feePayer": "0x1234567890abcdef1234567890abcdef12345678",
    "feePayerSignatures": ["0x..."],
    "logs": [
      {
        "address": "0x...",
        "topics": ["0x..."],
        "data": "0x..."
      }
    ]
  },
  "status": true,
  "requestId": "req_abc123def456"
}
```

#### 错误回复

**400 Bad Request - Validation Errors:**

```javascript
{
  "message": "Bad request",
  "data": "Permit deadline has expired",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_error_123"
}
```

**400 错误请求 - 交易还原：**

```javascript
{
  "message": "Bad request",
  "data": "execution reverted: Permit already used",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_revert_456"
}
```

**500 内部服务器错误：**\*

```javascript
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: Network timeout",
  "error": "INTERNAL_ERROR",
  "status": false,
  "requestId": "req_error_789"
}
```

## 错误处理

### 常见错误情景

| 错误           | HTTP 状态 | 说明                            | 解决方案                                        |
| ------------ | ------- | ----------------------------- | ------------------------------------------- |
| 缺少必填字段       | 400     | _swap_ 或 _permitSignature_ 丢失 | 包括所有必要参数                                    |
| 用户拥有 KAIA 余额 | 400     | 用户的 KAIA 余额必须为零               | 只有 KAIA 余额为零的用户才能使用此服务                      |
| 签名格式无效       | 400     | 许可签名不是有效的十六进制字符串              | 提供有效的 65 字节十六进制签名                           |
| 无效地址         | 400     | 畸形以太坊地址                       | 验证地址是否有效                                    |
| 不支持的令牌       | 400     | 令牌不在允许列表中                     | 仅使用配置的令牌地址                                  |
| 截止日期已过       | 400     | 过去的许可期限                       | 使用未来时间戳                                     |
| 金额过大         | 400     | 超过合同最高限额                      | 从合同中检查 _maxUsdtAmount()_ |
| 报价不足         | 400     | 滑动过于严格                        | 提高滑动容差或减少滑动量                                |
| 油价太高         | 400     | 网络拥塞                          | 等待油价下降                                      |
| 网络超时         | 500     | RPC 提供商问题                     | 延迟后重试请求                                     |

## 安全考虑因素

### 天然气价格保护

当天然气价格超过 50 克韦时，API 会拒绝交易，以防止成本过高。监控天然气价格，并在高拥堵时段通知用户。

### 签名安全

- 切勿重复使用许可证签名
- 始终使用合理的截止时间（5-30 分钟）
- 签署前验证所有参数
- 在所有应用程序接口通信中使用 HTTPS

## 智能合约详情

### 无燃气 ERC20PermitSwap 合同地址

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet">
   ```
   0x45bD04d5f14DD9AB908109cFEa816F758FaE6709
   ```
  </TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    ```
    0xaaFe47636ACe87E2B8CAaFADb03E87090277Ff7B
    ```
 </TabItem>
</Tabs>

### 主要功能

**executeSwapWithPermit** - 使用许可证签名执行无气体交换：

- 验证许可和交换参数
- 使用许可证转移代币
- 执行 DEX 交换
- 将 WKAIA 转换为本地 KAIA
- 向用户发送本地 KAIA

**getExpectedOutput** - 获取预期输出量的视图函数：

```javascript
function getExpectedOutput(
  address tokenIn,
  address tokenOut,
  uint256 amountIn
) external view returns (uint256)
```

### 合同限额

- 每次掉期的最大 USDT1,000,000（1 美元兑 6 位小数）
- 支持的货币对：USDT → WKAIA → 本地 KAIA
- 通过签名跟踪提供防重放保护

## 其他资源

- [ERC20 许可标准 (EIP-2612)](https://eips.ethereum.org/EIPS/eip-2612)
- [Kaia Ethers Extension](https://github.com/kaiachain/ethers-ext)


