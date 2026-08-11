---
title: Safe API Kit
sidebar_label: API Kit
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Safe API Kit

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 31, 2026**. Please use Safe Wallet for Kaia Network at [app.safe.global](https://app.safe.global) to manage your accounts going forward. Your existing Safe Accounts will be automatically compatible with Safe Wallet.

:::

API Kit helps you interact securely with the [Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview). Valid signers can propose and share transactions, collect signatures off-chain, and read Safe information (history, pending transactions, modules, guards, and more).

Safe's hosted Transaction Service supports both Kaia networks, so you only need the chain ID and an API key—no custom endpoint.

| Network | Chain ID |
| --- | --- |
| Kaia Mainnet | 8217 |
| Kairos Testnet | 1001 |

## Quickstart <a id="Quickstart"></a>

By the end of this guide, you will propose a transaction to the service and collect owner signatures for execution.

## Prerequisites <a id="Prerequisites"></a>

1. [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)—Node 20.12 or later, since the example uses the built-in `process.loadEnvFile()`
2. A Safe with several signers on Kairos (or Mainnet)
3. A Safe API key

### Get an API key <a id="api-key"></a>

Requests to Safe's Transaction Service need an API key. Sign in to the [Safe developer dashboard](https://developer.safe.global/), open **API Keys**, and create one. The key is a JWT—you set its expiry and can revoke it at any time.

Unauthenticated access is capped at 2 requests per second and 5,000 requests per month, which is for exploration only. Requests without a key return `401 Unauthorized`; exceeding your quota returns `429 Too Many Requests`.

Keep the key out of source control. This guide reads it, along with the RPC URL and signer keys, from a `.env` file—see [Step 6](#step-6-configure-setup).

## Set up environment <a id="Setup-environment"></a>

### Step 1: Create a project directory

```sh
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### Step 2: Initialize an npm project

```sh
npm init -y
```

### Step 3: Install dependencies

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

Types now live in `@safe-global/types-kit`. The older `@safe-global/safe-core-sdk-types` package has been renamed—if you are upgrading an existing project, update the import.

:::

### Step 4: Enable ES modules

The examples below use `import` syntax, so add this to `package.json`:

```json
{
  "type": "module"
}
```

### Step 5: Import dependencies

Create `app.js` and add:

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { OperationType } from '@safe-global/types-kit'
```

### Step 6: Configure setup

Use a Safe with at least two owners and threshold two so multiple signatures are required.

Create a `.env` file in the project root:

```sh
# Kaia Kairos testnet — https://chainlist.org/?search=kaia&testnets=true
RPC_URL=https://public-en-kairos.node.kaia.io
CHAIN_ID=1001
EXPLORER_TX_URL=https://kairos.kaiascan.io/tx/

# API key from https://developer.safe.global
SAFE_API_KEY=

# 2-of-2 Safe deployed on Kairos (https://app.safe.global)
SAFE_ADDRESS=

# Owner 1 proposes AND executes, so it needs test KAIA for gas
OWNER_1_ADDRESS=
OWNER_1_PRIVATE_KEY=

# Owner 2 only signs off-chain, so it needs no balance
OWNER_2_PRIVATE_KEY=

# Receiver of the 1 wei sample transaction (defaults to OWNER_1_ADDRESS)
# TO_ADDRESS=
```

:::danger

`.env` holds private keys. Add it to `.gitignore` before your first commit, and never use keys that hold real funds for this walkthrough.

:::

Load it in `app.js` and fail fast if anything is missing:

```js
// Loads .env into process.env (built into Node >= 20.12 / 21.7, no dependency needed)
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
  console.error(`Missing required environment variables in .env: ${missing.join(', ')}`)
  process.exit(1)
}

// Receiver address of sample transaction who receives 1 wei
const TO_ADDRESS = process.env.TO_ADDRESS || OWNER_1_ADDRESS
```

## Use API Kit <a id="use-api-kit"></a>

### Step 1: Initialize API Kit

Pass the chain ID and your API key. Safe resolves the Transaction Service endpoint for you, so no `txServiceUrl` is needed on Kaia or Kairos.

```js 
const apiKit = new SafeApiKit({
  chainId: BigInt(CHAIN_ID), // 1001 for Kairos, 8217 for Kaia Mainnet
  apiKey: SAFE_API_KEY
})
```

`txServiceUrl` remains available if you run your own Transaction Service instance; when you set it, `apiKey` is not required.

### Step 2: Initialize Protocol Kit

```js
const protocolKitOwner1 = await Safe.init({
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
// Other reads available on the same instance:
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)
```

### Step 5: Confirm the transaction

Sign with Protocol Kit and submit the signature via [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction).

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

### Step 6: Execute the transaction

Execute via [Safe Wallet](https://app.safe.global/), the [Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction), the Safe CLI, or another compatible tool.

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

Full `app.js` example:

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import {
  OperationType
} from '@safe-global/types-kit'

// Loads .env into process.env (built into Node >= 20.12 / 21.7, no dependency needed)
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
  console.error(`Missing required environment variables in .env: ${missing.join(', ')}`)
  process.exit(1)
}

// Receiver address of sample transaction who receives 1 wei
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
// Other reads available on the same instance:
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)

// 3. Confirmation from Owner 2
const protocolKitOwner2 = await Safe.init({
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
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

The complete runnable project—`app.js`, `.env.example`, and `package.json`—is at [kaia-safe-api-kit](https://github.com/praveen-kaia/kaia-safe-api-kit). See the [API Kit Reference](https://docs.safe.global/sdk/api-kit/reference) for the full method list.
