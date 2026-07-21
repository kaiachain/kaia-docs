---
title: Safe APIキット
sidebar_label: APIキット
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Safe APIキット

:::caution 日没に関するお知らせ

`safe.kaia.io` は **2026年8月9日** にサービス終了となります。 今後は、[app.safe.global](https://app.safe.global) の「Safe Wallet for Kaia Network」をご利用いただき、アカウントの管理を行ってください。 現在お持ちの「Safe Accounts」は、「Safe Wallet」と自動的に互換性が確保されます。

:::

APIキットを使用すると、[Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview)と安全に連携することができます。 有効な署名者は、トランザクションの提案や共有、オフチェーンでの署名の収集、およびSafeの情報（履歴、保留中のトランザクション、モジュール、ガードなど）の閲覧を行うことができます。

KaiaチェーンのID：**8217**（メインネット）、**1001**（カイロス）。 `safe.kaia.io` が廃止されるにあたり、サポート対象のチェーンについては、Safe Global Transaction Service の設定を優先してください。 それでもカスタム `txServiceUrl` が必要な場合は、移行後も使用しているエンドポイントが引き続き利用可能であることを確認してください。

## クイックスタート<a id="Quickstart"></a>

このガイドを読み終える頃には、サービスに対して取引を提案し、実行のために所有者の署名を集めることができるようになります。

## 前提条件<a id="Prerequisites"></a>

1. [Node.js と npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Kairos（またはメインネット）上の、複数の署名者が設定されたセーフ

## 環境設定<a id="Setup-environment"></a>

### 手順 1：プロジェクトディレクトリを作成する

```js
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### ステップ 2: npm プロジェクトを初期化する

```js
npm init -y
```

### ステップ 3: 依存関係をインストールする

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

### ステップ 4: 依存関係をインポートする

`app.js` を作成し、以下を追加してください：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
```

### ステップ 5: 設定を行う

所有者が少なくとも2人おり、閾値が2に設定された金庫を使用し、複数の署名が必要となるようにしてください。

```js
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 Owner Safe Address Ex: 0x123.... SAFE SHOULD 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // ONLY OWNER 1 and SAFE ADDRESS Need to have some test KAIA balance
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // OWNER 2 need not have any test KAIA
const TO_ADDRESS = OWNER_1_ADDRESS; // Receiver address of sample transaction who receives 1 wei
```

## APIキットを使用する<a id="use-api-kit"></a>

### ステップ1：APIキットの初期化

[Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview) がサポートされているチェーンでは、多くの場合、`chainId` を指定するだけで十分です。 専用エンドポイントを使用する場合でも、カスタム `txServiceUrl` を指定することは可能です（Kaia UI の提供終了後も、その URL が有効であることを確認してください）。

```js
const apiKit = new SafeApiKit.default({
  chainId: 1001n, // Kairos; Kaiaメインネットの場合は8217nを使用
  // 必要に応じてカスタムURLを設定 — safe.kaia.ioのサービス終了後も有効であることを確認してください
  // Kaiaが上場された際は、Safe Global Transaction Serviceの設定を優先:
  // https://docs.safe.global/core-api/transaction-service-overview
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})

```

### ステップ2：プロトコルキットの初期化

```js
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
```

### ステップ3：サービスにトランザクションを提案する

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

### ステップ4：保留中のトランザクションを取得する

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
```

## ステップ5：取引の確認

Protocol Kit を使用して署名を行い、[confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction) を通じてその署名を送信してください。

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

### ステップ6：トランザクションの実行

[Safe Wallet](https://app.safe.global/)、[Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction)、Safe CLI、またはその他の互換性のあるツールを使用して実行してください。

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('トランザクションが実行されました:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

`app.js` の完全な例：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 オーナーのセーフアドレス 例: 0x123.... SAFE SHOULD 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // 所有者 1 とセーフアドレスのみが、テスト用の KAIA 残高を持つ必要があります
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // 所有者 2 はテスト用 KAIA を所有している必要はありません
const TO_ADDRESS = OWNER_1_ADDRESS; // 1 wei を受け取るサンプルトランザクションの受信者アドレス
const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  // safe.kaia.io のサービス終了後のエンドポイントを確認してください; Safe Global TX Serviceのドキュメントを参照
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
// 1. トランザクションを作成する
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
// 2. サービスにトランザクションを提案する
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
console.log("トランザクションハッシュは "+safeTxHash)
const transaction = await apiKit.getTransaction(safeTxHash)
// 3. 所有者2からの確認
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
// 4. トランザクションを実行
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

詳細については、[APIキットリファレンス](https://docs.safe.global/sdk/api-kit/reference)および[サンプルコード](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/snippets)をご覧ください。
