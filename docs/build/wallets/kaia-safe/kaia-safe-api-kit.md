---
id: kaia-safe-api-kit
title: Kaia Safe API-Kit
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kaia Safe API Kit

API-Kit is your go-to kit for securely interacting with the [Safe Transaction API](https://github.com/safe-global/safe-transaction-service). The core of this kit is to allow valid signers to propose and share transactions with the other signers of a Safe, send the signatures to the service to collect them, and get information about a Safe (like reading the transaction history, pending transactions, enabled Modules and Guards, etc.), among other features.

## Quickstart <a id="Quickstart"></a>

By the end of this guide, you will be able to propose transactions to the service and obtain the owners' signatures for execution.

## Prerequisites <a id="Prerequisites"></a>

1. [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. A Safe with several signers

## Set up environment <a id="Setup-environment"></a>

### Step 1: Create a project directory.

Copy and paste this command in your terminal to create the project folder.

```js
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### Step 2: Initialize an npm project. 

Copy and paste this command in your terminal to create a `package.json` file.

```js
npm init -y
```

### Step 3: Install dependencies. 

Using API-Kit is as simple as running the installation command below: 


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

### Step 4: Import dependencies.

Create a file named  `app.js`. This is where all our code snippets for this interaction would live. 

Copy and paste these necessary imports at the top of the `app.js` file. 

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
```

### Step 5: Configure Setup

To efficiently illustrate how API-Kit works, we will use a Safe account setup with two or more signers, and threshold two, so we have multiple signatures that need to be collected when executing a transaction.

Copy and paste the following under the import statements in your `app.js` file: 

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

To initialize API Kit, we need to create an instance of the API Kit. 

> In chains where the [Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview) is supported, it's enough to specify the chainId property.

```js 
const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})

```

As you can see above, we included custom service using the optional **txServiceUrl** property.

### Step 2: Initialize Protocol Kit

To handle transactions and signatures, we need to create an instance of the Protocol Kit (a kit that enables developers to interact with  [Safe Smart Accounts](https://github.com/safe-global/safe-smart-account) using a TypeScript interface) with the provider, signer and safeAddress.

```js
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
```

### Step 3: Propose a transaction to the service

One of the core features of API Kit is to enable valid signers to share transactions with other signers. But before this is done,  any of the Safe signers needs to initiate the process by creating a proposal of a transaction. This transaction is then sent  to the service to make it accessible by the other owners so they can give their approval and sign the transaction as well.

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

API Kit provides us  different methods to retrieve pending transactions depending on the situation. For this guide, we will retrieve a transaction given the Safe transaction hash and other available methods commented out below:

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
```

## Step 5: Confirm the transaction

The next thing to do is to sign the transaction with the Protocol Kit and submit the signature to the Safe Transaction Service using the [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction) method.

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

### Step 6: Execute the transaction

The Safe transaction is now ready to be executed. This can be done using the [Safe Wallet Web](https://app.safe.global/) interface, the [Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction), the Safe CLI or any other tool that's available.

For this last step, we executed the safe transaction using Protocol Kit.

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${hash}`)
```
At the end, the full code in `app.js` should look like this:

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
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```


Visit the [API Kit Reference](https://docs.safe.global/sdk/api-kit/reference) for more information, and navigate to [Github](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/snippets) to access the full source code for this guide.