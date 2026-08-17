---
title: 安全 API 工具包
sidebar_label: API 工具包
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 安全 API 工具包

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月31日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 版 Safe Wallet 来管理您的账户。 您现有的“安全账户”将自动与“安全钱包”兼容。

:::

API 工具包可帮助您与 [安全交易服务](https://docs.safe.global/core-api/transaction-service-overview) 进行安全交互。 具有签字权限的用户可以提议和分享交易、在链下收集签名，以及读取 Safe 信息（历史记录、待处理交易、模块、守护程序等）。

Safe 的托管交易服务同时支持两个 Kaia 网络，因此您只需提供链 ID 和 API 密钥，无需自定义端点。

| 网络         | 链 ID |
| ---------- | ---- |
| Kaia 主网    | 8217 |
| Kairos 测试网 | 1001 |

## 快速入门<a id="Quickstart"></a>

读完本指南后，您将向该服务提交一笔交易，并收集所有者的签名以供执行。

## 先决条件<a id="Prerequisites"></a>

1. [Node.js 和 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)——Node 20.12 或更高版本，因为该示例使用了内置的 `process.loadEnvFile()` 函数
2. Kairos（或主网）上由多名签名人共同管理的保险库
3. 一个安全的 API 密钥

### 获取 API 密钥<a id="api-key"></a>

向 Safe 的交易服务发送请求需要 API 密钥。 登录 [Safe 开发者控制台](https://developer.safe.global/)，打开 **API 密钥**，然后创建一个。 密钥是一个 JWT——你可以设置其有效期，并可随时撤销它。

未经身份验证的访问限制为每秒 2 次请求，每月 5,000 次请求，仅供探索使用。 没有密钥的请求将返回 `401 未授权`；超过配额的请求将返回 `429 请求过多`。

请勿将密钥纳入源代码控制。 本指南会从 `.env` 文件中读取该信息，以及 RPC URL 和签名密钥——请参阅 [步骤 6](#step-6-configure-setup)。

## 设置环境<a id="Setup-environment"></a>

### 步骤 1：创建项目目录

```sh
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### 步骤 2：初始化一个 npm 项目

```sh
npm init -y
```

### 步骤 3：安装依赖项

<Tabs>
  <TabItem value="npm" label="npm">
    ```
    npm install @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit
    ```
  </TabItem>

 <TabItem value="yarn" label="yarn">
    ```
    yarn add @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit
    ```
 </TabItem>
</Tabs>

:::note

类型现已移至 `@safe-global/types-kit`。 旧版 `@safe-global/safe-core-sdk-types` 包已更名——如果您正在升级现有项目，请更新导入语句。

:::

### 第 4 步：启用 ES 模块

下面的示例使用了 `import` 语法，因此请在 `package.json` 中添加以下内容：

```json
{
  "type": "module"
}
```

### 第 5 步：导入依赖项

创建 `app.js` 文件，并添加以下内容：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { OperationType } from '@safe-global/types-kit'
```

### 第 6 步：配置设置

请使用至少有两名所有者且阈值为2的保险箱，以便需要多方签名。

在项目根目录下创建一个 `.env` 文件：

```sh
# Kaia Kairos 测试网 — https://chainlist.org/?search=kaia&testnets=true
RPC_URL=https://public-en-kairos.node.kaia.io
CHAIN_ID=1001
EXPLORER_TX_URL=https://kairos.kaiascan.io/tx/

# 来自 https://developer.safe.global 的 API 密钥
SAFE_API_KEY=

# 在 Kairos（https://app.safe.global）上部署的 2-of-2 Safe
SAFE_ADDRESS=

# 所有者 1 负责提议并执行，因此需要测试 KAIA 来支付 gas 费用
OWNER_1_ADDRESS=
OWNER_1_PRIVATE_KEY=

# 所有者 2 仅在链下签名，因此无需余额
OWNER_2_PRIVATE_KEY=

# 1 wei 示例交易的接收方（默认为 OWNER_1_ADDRESS）
# TO_ADDRESS=
```

:::danger

`.env` 文件中存储了私钥。 在首次提交之前，将其添加到 `.gitignore` 中，并且在本教程中切勿使用存有真实资金的密钥。

:::

在 `app.js` 中加载它，如果缺少任何内容，则立即报错：

```js
// 将 .env 加载到 process.env 中（Node >= 20.12 / 21.7 内置功能，无需依赖项）
process.loadEnvFile()

const {
  RPC_URL,
  CHAIN_ID,
  SAFE_API_KEY,
  SAFE_ADDRESS,
  OWNER_1_ADDRESS,
  OWNER_1_PRIVATE_KEY,
  OWNER_2_PRIVATE_KEY，
  EXPLORER_TX_URL
} = process.env

const REQUIRED = [
  'RPC_URL'，
  'CHAIN_ID'，
  'SAFE_API_KEY'，
  'SAFE_ADDRESS'，
  'OWNER_1_ADDRESS',
  'OWNER_1_PRIVATE_KEY',
  'OWNER_2_PRIVATE_KEY'
]

const missing = REQUIRED.filter((key) => !process.env[key])
if (missing.length > 0) {
  console.error(`.env 中缺少必需的环境变量：${missing.join(', ')}`)
  process.exit(1)
}

// 接收 1 wei 的示例交易接收方地址
const TO_ADDRESS = process.env.TO_ADDRESS || OWNER_1_ADDRESS
```

## 使用应用程序接口套件<a id="use-api-kit"></a>

### 步骤 1：初始化 API 工具包

请提供链 ID 和您的 API 密钥。 Safe 会为您解析交易服务端点，因此 Kaia 或 Kairos 上无需指定 `txServiceUrl`。

```js
const apiKit = new SafeApiKit({
  chainId: BigInt(CHAIN_ID), // Kairos 为 1001，Kaia 主网为 8217
  apiKey: SAFE_API_KEY
})
```

如果您运行自己的事务服务实例，`txServiceUrl` 仍可使用；设置该参数时，无需提供 `apiKey`。

### 步骤 2：初始化协议套件

```js
const protocolKitOwner1 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
```

### 步骤 3：向服务提出交易请求

```js
const safeTransactionData = {
  to: TO_ADDRESS,
  value: '1', // 1 wei
  data: '0x',
  operation: OperationType.Call
}
const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData]
}))
const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)
const signature = await protocolKitOwner1.signHash(safeTxHash)
try {
  await apiKit.proposeTransaction({
    safeAddress: SAFE_ADDRESS,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: OWNER_1_ADDRESS,
    senderSignature: signature.data
  })
} catch(err) {
  console.log(err)
}
```

### 步骤 4：检索待处理交易

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// 同一实例上可用的其他读取操作：
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)
```

### 步骤 5：确认交易

使用 Protocol Kit 进行签名，并通过 [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction) 提交签名。

```js
const protocolKitOwner2 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
const signature2 = await protocolKitOwner2.signHash(safeTxHash)
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)
```

### 步骤 6：执行交易

可通过 [Safe Wallet](https://app.safe.global/)、[Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction)、Safe CLI 或其他兼容工具执行。

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('交易已执行：');
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

完整的 `app.js` 示例：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import {
  OperationType
} from '@safe-global/types-kit'

// 将 .env 加载到 process.env 中（Node >= 20.12 / 21.7 内置功能，无需依赖项）
process.loadEnvFile()

const {
  RPC_URL,
  CHAIN_ID,
  SAFE_API_KEY,
  SAFE_ADDRESS,
  OWNER_1_ADDRESS,
  OWNER_1_PRIVATE_KEY,
  OWNER_2_PRIVATE_KEY，
  EXPLORER_TX_URL
} = process.env

const REQUIRED = [
  'RPC_URL'，
  'CHAIN_ID'，
  'SAFE_API_KEY'，
  'SAFE_ADDRESS'，
  'OWNER_1_ADDRESS',
  'OWNER_1_PRIVATE_KEY',
  'OWNER_2_PRIVATE_KEY'
]

const missing = REQUIRED.filter((key) => !process.env[key])
if (missing.length > 0) {
  console.error(`.env 中缺少必需的环境变量：${missing.join(', ')}`)
  process.exit(1)
}

// 接收 1 wei 的示例交易接收方地址
const TO_ADDRESS = process.env.TO_ADDRESS || OWNER_1_ADDRESS

const apiKit = new SafeApiKit({
  chainId: BigInt(CHAIN_ID),
  apiKey: SAFE_API_KEY
})

const protocolKitOwner1 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

// 1. 创建交易
const safeTransactionData = {
  to: TO_ADDRESS,
  value: '1', // 1 wei
  data: '0x',
  operation: OperationType.Call
}

const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData]
})

const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)
const signature = await protocolKitOwner1.signHash(safeTxHash)

// 2. 向服务提交交易
try {
  await apiKit.proposeTransaction({
    safeAddress: SAFE_ADDRESS,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: OWNER_1_ADDRESS,
    senderSignature: signature.data
  })
} catch(err) {
  console.log(err)
}

console.log("交易哈希为 "+safeTxHash)
const transaction = await apiKit.getTransaction(safeTxHash)
// 同一实例上可用的其他读取操作：
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)

// 3. 来自所有者 2 的确认
const protocolKitOwner2 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// 确认 Safe 交易
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)

console.log(signatureResponse)

// 4. 执行交易
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)

const receipt = await executeTxReponse.transactionResponse?.wait();

console.log('交易已执行：');
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

完整的可运行项目——`app.js`、`.env.example` 和 `package.json`——位于 [kaia-safe-api-kit](https://github.com/praveen-kaia/kaia-safe-api-kit)。 完整的方法列表请参阅 [API 工具包参考](https://docs.safe.global/sdk/api-kit/reference)。
