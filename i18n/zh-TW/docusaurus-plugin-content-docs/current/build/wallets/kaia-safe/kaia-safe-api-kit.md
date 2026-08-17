---
id: kaia-safe-api-kit
title: 安全 API 套件
sidebar_label: API 套件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 安全 API 套件

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 9 日** 停止服務。 今後請使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 專用 Safe Wallet 來管理您的帳戶。 您現有的「安全帳戶」將自動與「安全錢包」相容。

:::

API Kit 可協助您安全地與 [安全交易服務](https://docs.safe.global/core-api/transaction-service-overview) 進行互動。 具備簽署權限的使用者可以提議並分享交易、在鏈外收集簽名，以及讀取 Safe 的相關資訊（歷史紀錄、待處理交易、模組、守護者等）。

Kaia 鏈 ID：**8217**（主網）、**1001**（Kairos）。 隨著 `safe.kaia.io` 逐步停用，針對受支援的區塊鏈，請優先採用 Safe Global Transaction Service 的設定。 如果您仍需使用自訂的 `txServiceUrl`，請確認您所使用的端點在遷移後仍可正常使用。

## 快速入門<a id="Quickstart"></a>

讀完本指南後，您將能向該服務提出一筆交易，並收集所有者的簽名以進行執行。

## 先決條件<a id="Prerequisites"></a>

1. [Node.js和npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. 在 Kairos（或主網）上由多位簽署人共同管理的保險箱

## 設置環境<a id="Setup-environment"></a>

### 步驟 1：建立專案目錄

```js
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### 步驟 2：初始化一個 npm 專案

```js
npm init -y
```

### 步驟 3：安裝依賴項

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

### 步驟 4：匯入依賴項

建立 `app.js` 並加入以下內容：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
```

### 步驟 5：進行設定

請使用至少有兩位所有者且設定為「閾值二」的保險箱，以便需要多重簽名。

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

在支援 [安全交易服務](https://docs.safe.global/core-api/transaction-service-overview) 的區塊鏈上，通常只需指定 `chainId` 即可。 使用專用端點時，您仍可傳入自訂的 `txServiceUrl`（請確認該網址在 Kaia UI 停用後仍有效）。

```js
const apiKit = new SafeApiKit.default({
  chainId: 1001n, // Kairos；若使用 Kaia 主網，請改用 8217n
  // 如有需要，可自訂 URL — 請確認在 safe.kaia.io 停用後該網址仍有效
  // 當 Kaia 上架時，優先使用 Safe 全球交易服務設定：
  // https://docs.safe.global/core-api/transaction-service-overview
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})

```

### 步驟 2：初始化協議套件

```js
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
```

### 步驟 3：向服務提出交易請求

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

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
```

## 步驟 5：確認交易

使用 Protocol Kit 簽署，並透過 [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction) 提交簽名。

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

### 步驟 6：執行交易

請透過 [Safe Wallet](https://app.safe.global/)、[Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction)、Safe CLI 或其他相容工具執行。

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('交易已執行：');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

完整的 `app.js` 範例：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 個所有者安全地址 範例：0x123.... 安全地址應為 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // 僅所有者 1 和安全地址需要持有一些測試用的 KAIA 餘額
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // 擁有者 2 無需持有任何測試用 KAIA
const TO_ADDRESS = OWNER_1_ADDRESS; // 範例交易中接收 1 wei 的收件者地址
const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  // safe.kaia.io 停用後確認端點； 請參閱 Safe 全球交易服務文件
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
// 1. 建立交易
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
// 2. 向服務提交交易
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
console.log("交易雜湊為 "+safeTxHash)
const transaction = await apiKit.getTransaction(safeTxHash)
// 3. 來自所有者 2 的確認
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
// 4. 執行交易
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('交易已執行：');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

更多詳細資訊，請參閱 [API 套件參考](https://docs.safe.global/sdk/api-kit/reference) 及 [範例程式碼片段](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/snippets)。
