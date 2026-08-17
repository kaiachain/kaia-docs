---
title: 安全 API 套件
sidebar_label: API 套件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 安全 API 套件

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 31 日** 停止服務。 今後請使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 專用 Safe Wallet 來管理您的帳戶。 您現有的「安全帳戶」將自動與「安全錢包」相容。

:::

API Kit 可協助您安全地與 [安全交易服務](https://docs.safe.global/core-api/transaction-service-overview) 進行互動。 具備簽署權限的使用者可以提議並分享交易、在鏈外收集簽名，以及讀取 Safe 的相關資訊（歷史紀錄、待處理交易、模組、守護者等）。

Safe 的託管交易服務同時支援兩個 Kaia 網路，因此您只需提供鏈 ID 和 API 金鑰，無需自訂端點。

| 網路         | 鏈 ID |
| ---------- | ---- |
| Kaia 主網    | 8217 |
| Kairos 測試網 | 1001 |

## 快速入門<a id="Quickstart"></a>

讀完本指南後，您將能向該服務提出一筆交易，並收集所有者的簽名以進行執行。

## 先決條件<a id="Prerequisites"></a>

1. [Node.js 和 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)—需使用 Node 20.12 或更新版本，因為此範例使用了內建的 `process.loadEnvFile()`
2. 在 Kairos（或主網）上由多位簽署人共同管理的保險箱
3. 一個安全的 API 金鑰

### 取得 API 金鑰<a id="api-key"></a>

對 Safe 交易服務的請求需要 API 金鑰。 登入 [Safe 開發者控制台](https://developer.safe.global/)，開啟 **API 金鑰**，並建立一個。 關鍵在於 JWT——您可以設定其有效期限，並可隨時撤銷它。

未經身份驗證的存取量上限為每秒 2 次請求，每月 5,000 次請求，此限額僅供探索用途。 未附帶金鑰的請求會返回 `401 未授權`；若超過配額，則會返回 `429 請求過多`。

請勿將金鑰納入版本控制系統。 本指南會從 `.env` 檔案中讀取此資訊，以及 RPC URL 和簽署金鑰——請參閱 [步驟 6](#step-6-configure-setup)。

## 設置環境<a id="Setup-environment"></a>

### 步驟 1：建立專案目錄

```sh
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### 步驟 2：初始化一個 npm 專案

```sh
npm init -y
```

### 步驟 3：安裝依賴項

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

類型現已移至 `@safe-global/types-kit`。 舊版的 `@safe-global/safe-core-sdk-types` 套件已更名——若您正在升級現有專案，請更新匯入設定。

:::

### 步驟 4：啟用 ES 模組

以下範例使用 `import` 語法，因此請在 `package.json` 中加入以下內容：

```json
{
  "type": "module"
}
```

### 步驟 5：匯入依賴項

建立 `app.js` 並加入以下內容：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { OperationType } from '@safe-global/types-kit'
```

### 步驟 6：進行設定

請使用至少有兩位所有者且設定為「閾值二」的保險箱，以便需要多重簽名。

在專案根目錄中建立一個 `.env` 檔案：

```sh
# Kaia Kairos 測試網 — https://chainlist.org/?search=kaia&testnets=true
RPC_URL=https://public-en-kairos.node.kaia.io
CHAIN_ID=1001
EXPLORER_TX_URL=https://kairos.kaiascan.io/tx/

# 來自 https://developer.safe.global 的 API 金鑰
SAFE_API_KEY=

# 2-of-2 Safe 已部署於 Kairos (https://app.safe.global)
SAFE_ADDRESS=

# 擁有者 1 負責提議並執行，因此需要測試用 KAIA 來支付 gas 費用
OWNER_1_ADDRESS=
OWNER_1_PRIVATE_KEY=

# 擁有者 2 僅在鏈外簽署，因此無需餘額
OWNER_2_PRIVATE_KEY=

# 1 wei 示例交易的收款人（預設為 OWNER_1_ADDRESS）
# TO_ADDRESS=
```

:::danger

`.env` 存放私鑰。 請在首次提交之前將其加入 `.gitignore` 檔案，並且在進行本教學時，切勿使用存放真實資金的金鑰。

:::

在 `app.js` 中載入它，若發現任何缺失，請立即停止執行：

```js
// 將 .env 載入至 process.env（Node >= 20.12 / 21.7 內建功能，無需額外依賴項）
process.loadEnvFile()

const {
  RPC_URL,
  CHAIN_ID,
  SAFE_API_KEY,
  SAFE_ADDRESS,
  OWNER_1_ADDRESS,
  OWNER_1_PRIVATE_KEY,
  OWNER_2_PRIVATE_KEY,
  EXPLORER_TX_URL
} = process.env

const REQUIRED = [
  'RPC_URL',
  'CHAIN_ID',
  'SAFE_API_KEY',
  'SAFE_ADDRESS',
  'OWNER_1_ADDRESS',
  'OWNER_1_PRIVATE_KEY',
  'OWNER_2_PRIVATE_KEY'
]

const missing = REQUIRED.filter((key) => !process.env[key])
if (missing.length > 0) {
  console.error(`.env 檔案中缺少必要的環境變數：${missing.join(', ')}`)
  process.exit(1)
}

// 接收 1 wei 的範例交易之收款地址
const TO_ADDRESS = process.env.TO_ADDRESS || OWNER_1_ADDRESS
```

## 使用應用程序接口套件<a id="use-api-kit"></a>

### 步驟 1：初始化 API 工具包

請傳入鏈 ID 和您的 API 金鑰。 Safe 會為您解析 Transaction Service 的端點，因此 Kaia 或 Kairos 上無需指定 `txServiceUrl`。

```js
const apiKit = new SafeApiKit({
  chainId: BigInt(CHAIN_ID), // Kairos 為 1001，Kaia 主網為 8217
  apiKey: SAFE_API_KEY
})
```

若您運行自己的交易服務實例，`txServiceUrl` 仍可使用；設定此參數時，無需提供 `apiKey`。

### 步驟 2：初始化協議套件

```js
const protocolKitOwner1 = await Safe.init({
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

### 步驟 4：檢索待處理交易

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// 同一實例上可用的其他讀取操作：
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)
```

### 步驟 5：確認交易

使用 Protocol Kit 簽署，並透過 [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction) 提交簽名。

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

### 步驟 6：執行交易

請透過 [Safe Wallet](https://app.safe.global/)、[Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction)、Safe CLI 或其他相容工具執行。

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('交易已執行：');
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

完整的 `app.js` 範例：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import {
  OperationType
} from '@safe-global/types-kit'

// 將 .env 載入至 process.env（內建於 Node >= 20.12 / 21.7，無需額外依賴項）
process.loadEnvFile()

const {
  RPC_URL,
  CHAIN_ID,
  SAFE_API_KEY,
  SAFE_ADDRESS,
  OWNER_1_ADDRESS,
  OWNER_1_PRIVATE_KEY,
  OWNER_2_PRIVATE_KEY,
  EXPLORER_TX_URL
} = process.env

const REQUIRED = [
  'RPC_URL',
  'CHAIN_ID',
  'SAFE_API_KEY',
  'SAFE_ADDRESS',
  'OWNER_1_ADDRESS',
  'OWNER_1_PRIVATE_KEY',
  'OWNER_2_PRIVATE_KEY'
]

const missing = REQUIRED.filter((key) => !process.env[key])
if (missing.length > 0) {
  console.error(`.env 檔案中缺少必要的環境變數：${missing.join(', ')}`)
  process.exit(1)
}

// 接收 1 wei 的範例交易收款地址
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
// 同一實例上可用的其他讀取操作：
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)

// 3. 來自所有者 2 的確認
const protocolKitOwner2 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// 確認 Safe 交易
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
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

完整的可執行專案——包含 `app.js`、`.env.example` 及 `package.json`——請參閱 [kaia-safe-api-kit](https://github.com/praveen-kaia/kaia-safe-api-kit)。 請參閱 [API 套件參考手冊](https://docs.safe.global/sdk/api-kit/reference) 以查看完整的方法清單。
