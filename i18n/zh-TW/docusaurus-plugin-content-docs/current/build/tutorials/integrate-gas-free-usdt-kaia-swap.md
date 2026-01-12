---
id: ""
title: 將無瓦斯 USDT 整合至 KAIA 掉期
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'；

# 將無瓦斯 USDT 整合至 KAIA 掉期

本指南概述 Gas-Free USDT 至 KAIA Swap 功能，包括其目的、先決條件、整合步驟和 API 參考資料。 它旨在幫助開發人員將無氣體交換功能整合到 Kaia 網路上的分散式應用程式 (DApp) 中。

## 簡介

推出了 `gasFreeSwapKaia` API，讓使用者可以在 Kaia 網路上執行無瓦斯的 ERC20 代幣交換 (目前僅限於 USDT )，而不需要持有 KAIA 代幣來支付瓦斯費用，甚至在代表使用者支付交易成本時也是如此。 API 特別支援使用 ERC20 許可簽章將 USDT 交換成 KAIA，以提供完全無瓦斯的使用者體驗。

### 優點

- **100%無瓦斯體驗**：使用者不需要任何 KAIA 代幣即可進行交換
- **增強使用者上線**：新使用者可立即開始交換代幣，無需取得 KAIA
- **ERC20 許可證整合**：使用標準 ERC20 許可證簽章進行安全、無氣代幣核准

### 如何運作

- **使用者啟動交換**：使用者選擇USDT金額來交換KAIA
- **前端建立許可證**：DApp 建構 ERC20 許可證簽章供使用者簽署
- **使用者簽署許可證**：使用者簽署許可證訊息（無需瓦斯）
- **DApp 呼叫 API**：前端將交換參數和許可簽章傳送至 API
- \*\* 後端執行\*\*：API 驗證許可證、執行交換並支付所有瓦斯費用
- **用戶收到 KAIA**：原生的 KAIA 代幣會直接傳送到使用者的錢包中

## 先決條件和支援的環境

\*\* 服務端點\*\*

<Tabs>
  <TabItem value="Mainnet" label="Kaia Mainnet">
    https://fee-delegation.kaia.io
  </TabItem>

 <TabItem value="Testnet" label="Kairos Testnet">
    https://fee-delegation-kairos.kaia.io
 </TabItem>
</Tabs>

**支援的代幣對**

API 目前僅支援單一交易對：

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet">
    代幣： USDT (`0xd077a400968890eacc75cdc901f0356c943e4fdb`)

```
Token Out: WKAIA (`0x19aac5f612f524b754ca7e7c41cbfa2e981a4432`)
```

  </TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    代幣輸入: TEST (`0xcb00ba2cab67a3771f9ca1fa48fda8881b457750`)

```
Token Out: WKAIA (`0x043c471bEe060e00A56CcD02c0Ca286808a5A436`)
```

 </TabItem>
</Tabs>

\*\* 取得測試代號\*\*

要取得 Kairos Testnet 的 TEST 代幣：

- 在 Kaiascan 上開啟 [ERC20 Faucet](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1)
- 移至「合約」標籤，然後選擇「撰寫合約」\*。
- 找到 claim(token) 函式
- 貼入 Kairos 上受支援的 GA 令牌位址 (本指南使用 TEST 的位址)
- 按一下 _Query_ 以提交要求。 您應該很快就會收到您的 TEST 代幣。

![](/img/build/tutorials/test-tokens-faucet.png)

**智慧型合約要求**

API 與 GaslessERC20PermitSwap 智慧型合約互動：

- 支援以 ERC20 許可證為基礎的核准
- 與 Uniswap V2 相容的 DEX 整合
- 自動將 WKAIA 轉換為原生 KAIA
- 強制執行安全的最大交換限制

\*\* 使用者需求\*\*

在主網路上，使用者必須擁有零 KAIA 結餘才能使用這項無瓦斯交換服務。 這項要求可確保只有真正需要無瓦斯交易的使用者才能使用這項服務，以達到入會目的。 在 testnet 上，為了測試目的，此限制會被放寬。

主網路和測試網路的最大交換金額限制為 1 USDT。 由於此功能是設計給使用者接收足夠的 KAIA 來開始他們在 Kaia Chain 上的體驗。

## 整合步驟

### 完整的整合範例

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

## API 參考端點

- URL：`/api/gasFreeSwapKaia`
- 方法：POST
- 內容類型：application/json

### 請求正文

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

### 參數

**swap** (object, required)：

- user (字串)：簽署許可證的令牌擁有者的地址
- tokenIn (字串)：輸入令牌的位址（必須與設定的 USDT 位址相符）
- tokenOut (字串)：輸出 token 的位址 (必須與設定的 WKAIA 位址相符)
- amountIn (字串)：以字串形式顯示的輸入代幣數量 (單位為 wei/最小單位)
- amountOutMin (字串)：最小預期輸出代幣（滑點保護）
- deadline (字串)：許可證和交換到期的 Unix 時間戳 (秒)

**permitSignature** （字串，必填）：

- 必須是 65 位元組的有效十六進位字串
- 包含序列化的 ERC20 許可證簽章

### 回應格式

#### 成功回應 (200)

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

#### 錯誤回應

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

**400 Bad Request - Transaction Revert:**

```javascript
{
  "message": "Bad request",
  "data": "execution reverted: Permit already used",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_revert_456"
}
```

**500 內部伺服器錯誤：**

```javascript
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: Network timeout",
  "error": "INTERNAL_ERROR",
  "status": false,
  "requestId": "req_error_789"
}
```

## 錯誤處理

### 常見錯誤情況

| 錯誤           | HTTP 狀態 | 說明                            | 解決方案                                        |
| ------------ | ------- | ----------------------------- | ------------------------------------------- |
| 遺漏必填欄位       | 400     | _swap_ 或 _permitSignature_ 遺失 | 包含所有必要參數                                    |
| 使用者有 KAIA 結餘 | 400     | 使用者的 KAIA 結餘必須為零              | 只有 KAIA 結餘為零的使用者才能使用此服務                     |
| 簽名格式無效       | 400     | 許可簽章不是有效的十六進制字串               | 提供有效的 65 位元組十六進位簽章                          |
| 無效地址         | 400     | 畸形的 Ethereum 位址               | 驗證地址是否有效                                    |
| 不支援的代號       | 400     | 代號不在允許清單中                     | 僅使用已設定的 token 位址                            |
| 截止日期已過       | 400     | 過去的許可期限                       | 使用未來時間戳記                                    |
| 金額太大         | 400     | 超過合約上限                        | 從契約中檢查 _maxUsdtAmount()_ |
| 報價不足         | 400     | 滑動過於嚴格                        | 增加滑動容限或減少滑動量                                |
| 瓦斯價格過高       | 400     | 網路擁塞                          | 等待較低的汽油價格                                   |
| 網路超時         | 500     | RPC 提供者問題                     | 延遲後重試請求                                     |

## 安全考量

### 瓦斯價格保護

API 會在瓦斯價格超過 50 gwei 時拒絕交易，以防止成本過高。 監控瓦斯價格，並在高壅塞期通知使用者。

### 簽名安全性

- 切勿重複使用許可證簽名
- 永遠使用合理的期限 (5-30 分鐘)
- 簽署前驗證所有參數
- 所有 API 通訊使用 HTTPS

## 智慧型契約詳細資訊

### 無瓦斯ERC20許可證交換合約地址

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

**executeSwapWithPermit** - 使用許可簽章執行無氣體交換：

- 驗證許可證和交換參數
- 使用許可證轉移代幣
- 執行 DEX 掉期
- 將 WKAIA 轉換為本機 KAIA
- 傳送本機 KAIA 給使用者

**getExpectedOutput** - 檢視函式，用來取得預期的輸出金額：

```javascript
function getExpectedOutput(
  address tokenIn,
  address tokenOut,
  uint256 amountIn
) external view returns (uint256)
```

### 合約限制

- 每次掉期的最高 USDT：1,000,000 (1 USDT 含 6 位小數)
- 支援的交易對：USDT → WKAIA → 本地 KAIA
- 透過簽章追蹤提供防重複保護

## 其他資源

- [ERC20 許可證標準 (EIP-2612)](https://eips.ethereum.org/EIPS/eip-2612)
- [Kaia Ethers Extension](https://github.com/kaiachain/ethers-ext)


