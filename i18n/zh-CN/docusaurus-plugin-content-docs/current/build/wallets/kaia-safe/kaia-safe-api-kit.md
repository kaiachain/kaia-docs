---
id: kaia-safe-api-kit
title: 安全 API 工具包
sidebar_label: API 工具包
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 安全 API 工具包

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月9日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 版 Safe Wallet 来管理您的账户。 您现有的“安全账户”将自动与“安全钱包”兼容。

:::

API 工具包可帮助您与 [安全交易服务](https://docs.safe.global/core-api/transaction-service-overview) 进行安全交互。 具有签字权限的用户可以提议和分享交易、在链下收集签名，以及读取 Safe 信息（历史记录、待处理交易、模块、守护程序等）。

Kaia 链 ID：**8217**（主网）、**1001**（Kairos）。 随着 `safe.kaia.io` 逐步停用，对于受支持的区块链，请优先使用 Safe 全球交易服务配置。 如果您仍然需要自定义的 `txServiceUrl`，请确认您使用的端点在迁移后仍可正常访问。

## 快速入门<a id="Quickstart"></a>

读完本指南后，您将向该服务提交一笔交易，并收集所有者的签名以供执行。

## 先决条件<a id="Prerequisites"></a>

1. [Node.js和npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Kairos（或主网）上由多名签名人共同管理的保险库

## 设置环境<a id="Setup-environment"></a>

### 步骤 1：创建项目目录

```js
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### 步骤 2：初始化一个 npm 项目

```js
npm init -y
```

### 步骤 3：安装依赖项

<Tabs>
  <TabItem value="npm" label="npm">
    ```
    npm install @safe-global/api-kit@2.4.2 @safe-global/protocol-kit@4.0.2 @safe-global/safe-core-sdk-types@5.0.2
    ```
  </TabItem>

 <TabItem value="yarn" label="yarn">
    ```
    yarn add @safe-global/api-kit@2.4.2 @safe-global/protocol-kit@4.0.2 @safe-global/safe-core-sdk-types@5.0.2
    ```
 </TabItem>
</Tabs>

### 第 4 步：导入依赖项

创建 `app.js` 文件，并添加以下内容：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
```

### 第 5 步：配置设置

请使用至少有两名所有者且阈值为2的保险箱，以便需要多方签名。

```js
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 Owner Safe Address Ex: 0x123.... SAFE SHOULD 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // ONLY OWNER 1 and SAFE ADDRESS Need to have some test KAIA balance
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // OWNER 2 need not have any test KAIA
const TO_ADDRESS = OWNER_1_ADDRESS; // Receiver address of sample transaction who receives 1 wei
```

## 使用应用程序接口套件<a id="use-api-kit"></a>

### 步骤 1：初始化 API 工具包

在支持 [安全交易服务](https://docs.safe.global/core-api/transaction-service-overview) 的链上，通常只需指定 `chainId` 即可。 在使用专用端点时，您仍可传递自定义的 `txServiceUrl`（请确认该地址在 Kaia UI 停用后仍然有效）。

```js
const apiKit = new SafeApiKit.default({
  chainId: 1001n, // Kairos；若为 Kaia 主网，请使用 8217n
  // 如有需要，可设置自定义 URL — 请确认在 safe.kaia.io 停用后该 URL 仍有效
  // 当 Kaia 上架时，优先使用 Safe 全球交易服务配置：
  // https://docs.safe.global/core-api/transaction-service-overview
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})

```

### 步骤 2：初始化协议套件

```js
const protocolKitOwner1 = await Safe.default.init({
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
})
const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)
const signature = await protocolKitOwner1.signHash(safeTxHash)
// 2. Propose transaction to the service
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
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
```

## 步骤 5：确认交易

使用 Protocol Kit 进行签名，并通过 [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction) 提交签名。

```js
const protocolKitOwner2 = await Safe.default.init({
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
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

完整的 `app.js` 示例：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 个所有者安全地址 例如：0x123.... 安全地址应为 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // 仅所有者 1 和安全地址需要持有一定数量的测试 KAIA 余额
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // 所有者 2 无需持有任何测试 KAIA
const TO_ADDRESS = OWNER_1_ADDRESS; // 示例交易的接收地址，该地址将收到 1 wei
const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  // safe.kaia.io 停用后的确认端点； 参见 Safe 全球交易服务文档
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})
const protocolKitOwner1 = await Safe.default.init({
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
// 3. 来自所有者 2 的确认
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
const signature2 = await protocolKitOwner2.signHash(safeTxHash)
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)
console.log(signatureResponse)
// 4. 执行交易
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

更多详细信息，请参阅 [API 开发工具包参考](https://docs.safe.global/sdk/api-kit/reference) 和 [示例代码片段](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/snippets)。
