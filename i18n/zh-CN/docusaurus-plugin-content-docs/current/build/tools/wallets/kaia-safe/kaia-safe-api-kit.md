---
id: kaia-safe-api-kit
title: Kaia Safe API 工具包
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kaia Safe API 套件

API-Kit 是您与[安全交易 API](https://github.com/safe-global/safe-transaction-service)安全交互的必备工具包。 该工具包的核心功能是允许有效签名者提出交易并与保险箱的其他签名者共享交易，将签名发送到服务机构以收集签名，以及获取保险箱的相关信息（如阅读交易历史、待处理交易、已启用的模块和守卫等）。

## 快速入门<a id="Quickstart"></a>

在本指南结束时，您将能够向服务部门提出交易建议，并获得业主的签名以执行交易。

## 先决条件<a id="Prerequisites"></a>

1. [Node.js和npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. 有多个签名人的保险箱

## 设置环境<a id="Setup-environment"></a>

### 步骤 1：创建项目目录。

在终端中复制并粘贴此命令以创建项目文件夹。

```js
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### 步骤 2：初始化 npm 项目。

在终端中复制并粘贴此命令，创建一个 `package.json` 文件。

```js
npm init -y
```

### 步骤 3：安装依赖项。

使用 API-Kit 就像运行下面的安装命令一样简单：

<Tabs>
  <TabItem value="npm" label="npm">
    ```
    npm install @safe-global/api-kit @safe-global/protocol-3 @safe-global/safe-core-sdk-types  
    ```
  </TabItem>

 <TabItem value="yarn" label="yarn">
    ```
    yarn add @safe-global/api-kit @safe-global/protocol-kit @safe-global/safe-core-sdk-types
    ```
 </TabItem>
</Tabs>

### 步骤 4：导入依赖项。

创建名为 `app.js` 的文件。 我们在此交互的所有代码片段都将放在这里。

将这些必要的导入复制并粘贴到 `app.js` 文件的顶部。

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
```

### 步骤 5：配置设置

为了有效说明 API-Kit 的工作原理，我们将使用一个有两个或更多签名者的 Safe 账户设置，阈值为两个，因此在执行交易时需要收集多个签名。

将以下内容复制并粘贴到 `app.js` 文件中的导入语句下：

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

要初始化 API 工具包，我们需要创建一个 API 工具包实例。

> 在支持 [Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview) 的链中，只需指定 chainId 属性即可。

```js
const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})

```

如上所示，我们使用可选的 **txServiceUrl** 属性加入了自定义服务。

### 步骤 2：初始化协议套件

为了处理交易和签名，我们需要创建一个协议工具包实例（该工具包使开发人员能够使用 TypeScript 接口与 [安全智能账户](https://github.com/safe-global/safe-smart-account) 进行交互），其中包含提供者、签名者和 safeAddress。

```js
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
```

### 步骤 3：向服务提出交易建议

API Kit 的核心功能之一是让有效签名者与其他签名者共享交易。 但在此之前，任何一个安全签名者都需要通过创建一个交易提案来启动该过程。 然后，该交易将被发送到服务程序，以便其他所有者也能访问，从而获得批准并签署交易。

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

API 工具包根据不同情况为我们提供了不同的方法来检索待处理交易。 在本指南中，我们将根据安全事务哈希值和下文注释的其他可用方法来检索事务：

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
```

## 步骤 5：确认交易

接下来要做的是使用协议工具包签署交易，并使用 [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction) 方法将签名提交给安全交易服务。

```js
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
const signature2 = await protocolKitOwner2.signHash(safeTxHash)
// Confirm the Safe transaction
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)
```

### 步骤 6：执行交易

安全交易现在可以执行了。 可以使用[安全钱包 Web](https://app.safe.global/)界面、[协议工具包](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction)、安全 CLI 或任何其他可用工具来完成。

最后一步，我们使用 Protocol Kit 执行安全交易。

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${hash}`)
```

最后，`app.js` 中的完整代码应该是这样的：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 Owner Safe Address Ex: 0x123.... SAFE SHOULD 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // ONLY OWNER 1 and SAFE ADDRESS Need to have some test KAIA balance
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // OWNER 2 need not have any test KAIA
const TO_ADDRESS = OWNER_1_ADDRESS; // Receiver address of sample transaction who receives 1 wei
const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
// 1. Create transaction
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
console.log("Transaction hash is "+safeTxHash)
const transaction = await apiKit.getTransaction(safeTxHash)
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
// 3. Confirmation from Owner 2
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
const signature2 = await protocolKitOwner2.signHash(safeTxHash)
// Confirm the Safe transaction
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)
console.log(signatureResponse)
// 4. Execute transaction
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${hash}`)
```

请访问 [API 工具包参考](https://docs.safe.global/sdk/api-kit/reference) 了解更多信息，并访问 [Github](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/snippets) 访问本指南的完整源代码。