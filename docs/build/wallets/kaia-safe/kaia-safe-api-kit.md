---
id: kaia-safe-api-kit
title: Safe API Kit
sidebar_label: API Kit
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Safe API Kit

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 9, 2026**. Please use Safe Wallet for Kaia Network at [app.safe.global](https://app.safe.global) to manage your accounts going forward. Your existing Safe Accounts will be automatically compatible with Safe Wallet.

:::

API Kit helps you interact securely with the [Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview). Valid signers can propose and share transactions, collect signatures off-chain, and read Safe information (history, pending transactions, modules, guards, and more).

Kaia chain IDs: **8217** (Mainnet), **1001** (Kairos). As `safe.kaia.io` sunsets, prefer Safe Global Transaction Service configuration for supported chains. If you still need a custom `txServiceUrl`, confirm the endpoint you use remains available after the migration.

## Quickstart <a id="Quickstart"></a>

By the end of this guide, you will propose a transaction to the service and collect owner signatures for execution.

## Prerequisites <a id="Prerequisites"></a>

1. [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. A Safe with several signers on Kairos (or Mainnet)

## Set up environment <a id="Setup-environment"></a>

### Step 1: Create a project directory

```js
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### Step 2: Initialize an npm project

```js
npm init -y
```

### Step 3: Install dependencies

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

### Step 4: Import dependencies

Create `app.js` and add:

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
```

### Step 5: Configure setup

Use a Safe with at least two owners and threshold two so multiple signatures are required.

```js
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 Owner Safe Address Ex: 0x123.... SAFE SHOULD 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // ONLY OWNER 1 and SAFE ADDRESS Need to have some test KAIA balance
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // OWNER 2 need not have any test KAIA
const TO_ADDRESS = OWNER_1_ADDRESS; // Receiver address of sample transaction who receives 1 wei
```

## Use API Kit <a id="use-api-kit"></a>

### Step 1: Initialize API Kit

On chains where the [Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview) is supported, specifying `chainId` is often enough. You may still pass a custom `txServiceUrl` when using a dedicated endpoint (verify it remains valid after the Kaia UI sunset).

```js 
const apiKit = new SafeApiKit.default({
  chainId: 1001n, // Kairos; use 8217n for Kaia Mainnet
  // Custom URL if needed — confirm it remains valid after safe.kaia.io sunset
  // Prefer Safe Global Transaction Service config when Kaia is listed:
  // https://docs.safe.global/core-api/transaction-service-overview
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})

```

### Step 2: Initialize Protocol Kit

```js
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
```

### Step 3: Propose a transaction to the service

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

### Step 4: Retrieve pending transaction

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
```

## Step 5: Confirm the transaction

Sign with Protocol Kit and submit the signature via [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction).

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

### Step 6: Execute the transaction

Execute via [Safe Wallet](https://app.safe.global/), the [Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction), the Safe CLI, or another compatible tool.

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

Full `app.js` example:

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
  // Confirm endpoint after safe.kaia.io sunset; see Safe Global TX Service docs
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
// 3. Confirmation from Owner 2
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
// 4. Execute transaction
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

See the [API Kit Reference](https://docs.safe.global/sdk/api-kit/reference) and [example snippets](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/snippets) for more detail.
