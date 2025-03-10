---
id: kaia-safe-api-kit
title: Kaia Safe API 工具包
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kaia Safe API 套件

API-Kit 是您與[安全交易 API](https://github.com/safe-global/safe-transaction-service)安全交互的必備工具包。 該工具包的核心功能是允許有效簽名者提出交易並與保險箱的其他簽名者共享交易，將簽名發送到服務機構以收集簽名，以及獲取保險箱的相關信息（如閱讀交易歷史、待處理交易、已啟用的模塊和守衛等）。

## 快速入門<a id="Quickstart"></a>

在本指南結束時，您將能夠向服務部門提出交易建議，並獲得業主的簽名以執行交易。

## 先決條件<a id="Prerequisites"></a>

1. [Node.js和npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. 有多個簽名人的保險箱

## 設置環境<a id="Setup-environment"></a>

### 步驟 1：創建項目目錄。

在終端中複製並粘貼此命令以創建項目文件夾。

```js
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### 步驟 2：初始化 npm 項目。

在終端中複製並粘貼此命令，創建一個 `package.json` 文件。

```js
npm init -y
```

### 步驟 3：安裝依賴項。

使用 API-Kit 就像運行下面的安裝命令一樣簡單：

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

### 步驟 4：導入依賴項。

創建名為 `app.js` 的文件。 我們在此交互的所有代碼片段都將放在這裡。

將這些必要的導入複製並粘貼到 `app.js` 文件的頂部。

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
```

### 步驟 5：配置設置

為了有效說明 API-Kit 的工作原理，我們將使用一個有兩個或更多簽名者的 Safe 賬戶設置，閾值為兩個，因此在執行交易時需要收集多個簽名。

將以下內容複製並粘貼到 `app.js` 文件中的導入語句下：

```js
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 Owner Safe Address Ex: 0x123.... SAFE SHOULD 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // ONLY OWNER 1 and SAFE ADDRESS Need to have some test KAIA balance
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // OWNER 2 need not have any test KAIA
const TO_ADDRESS = OWNER_1_ADDRESS; // Receiver address of sample transaction who receives 1 wei
```

## 使用應用程序接口套件<a id="use-api-kit"></a>

### 步驟 1：初始化 API 工具包

要初始化 API 工具包，我們需要創建一個 API 工具包實例。

> 在支持 [Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview) 的鏈中，只需指定 chainId 屬性即可。

```js
const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})

```

如上所示，我們使用可選的 **txServiceUrl** 屬性加入了自定義服務。

### 步驟 2：初始化協議套件

為了處理交易和簽名，我們需要創建一個協議工具包實例（該工具包使開發人員能夠使用 TypeScript 接口與 [安全智能賬戶](https://github.com/safe-global/safe-smart-account) 進行交互），其中包含提供者、簽名者和 safeAddress。

```js
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
```

### 步驟 3：向服務提出交易建議

API Kit 的核心功能之一是讓有效簽名者與其他簽名者共享交易。 但在此之前，任何一個安全簽名者都需要通過創建一個交易提案來啟動該過程。 然後，該交易將被髮送到服務程序，以便其他所有者也能訪問，從而獲得批准並簽署交易。

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

### 步驟 4：檢索待處理交易

API 工具包根據不同情況為我們提供了不同的方法來檢索待處理交易。 在本指南中，我們將根據安全事務哈希值和下文註釋的其他可用方法來檢索事務：

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
```

## 步驟 5：確認交易

接下來要做的是使用協議工具包簽署交易，並使用 [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction) 方法將簽名提交給安全交易服務。

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

### 步驟 6：執行交易

安全交易現在可以執行了。 可以使用[安全錢包 Web](https://app.safe.global/)界面、[協議工具包](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction)、安全 CLI 或任何其他可用工具來完成。

最後一步，我們使用 Protocol Kit 執行安全交易。

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${hash}`)
```

最後，`app.js` 中的完整代碼應該是這樣的：

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

請訪問 [API 工具包參考](https://docs.safe.global/sdk/api-kit/reference) 瞭解更多信息，並訪問 [Github](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/snippets) 訪問本指南的完整源代碼。