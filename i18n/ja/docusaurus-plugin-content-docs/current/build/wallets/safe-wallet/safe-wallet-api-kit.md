---
title: Safe APIキット
sidebar_label: APIキット
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Safe APIキット

:::caution 日没に関するお知らせ

`safe.kaia.io` は **2026年8月31日** にサービス終了となります。 今後は、[app.safe.global](https://app.safe.global) の「Safe Wallet for Kaia Network」をご利用いただき、アカウントの管理を行ってください。 現在お持ちの「Safe Accounts」は、「Safe Wallet」と自動的に互換性が確保されます。

:::

APIキットを使用すると、[Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview)と安全に連携することができます。 有効な署名者は、トランザクションの提案や共有、オフチェーンでの署名の収集、およびSafeの情報（履歴、保留中のトランザクション、モジュール、ガードなど）の閲覧を行うことができます。

Safeのホスト型トランザクションサービスは、両方のKaiaネットワークに対応しているため、必要なのはチェーンIDとAPIキーだけで、カスタムエンドポイントは不要です。

| ネットワーク      | チェーンID |
| ----------- | ------ |
| Kaia メインネット | 8217   |
| カイロス・テストネット | 1001   |

## クイックスタート<a id="Quickstart"></a>

このガイドを読み終える頃には、サービスに対して取引を提案し、実行のために所有者の署名を集めることができるようになります。

## 前提条件<a id="Prerequisites"></a>

1. [Node.js および npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)—Node 20.12 以降。この例では組み込みの `process.loadEnvFile()` を使用しているためです。
2. Kairos（またはメインネット）上の、複数の署名者が設定されたセーフ
3. 安全なAPIキー

### APIキーを取得する<a id="api-key"></a>

Safeのトランザクションサービスへのリクエストには、APIキーが必要です。 [Safe 開発者ダッシュボード](https://developer.safe.global/) にログインし、**API キー** を開いて、API キーを作成してください。 鍵となるのはJWTです。有効期限を設定でき、いつでも無効化することができます。

認証なしでのアクセスは、1秒あたり2リクエスト、1か月あたり5,000リクエストまでと制限されており、これは試用目的のみに限定されます。 キーを指定しないリクエストには `401 Unauthorized` が返され、クォータを超過した場合は `429 Too Many Requests` が返されます。

キーはソース管理の対象外にしてください。 このガイドでは、RPC URL や署名鍵とともに、これらを `.env` ファイルから読み込みます。詳細は [ステップ 6](#step-6-configure-setup) を参照してください。

## 環境設定<a id="Setup-environment"></a>

### 手順 1：プロジェクトディレクトリを作成する

```sh
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### ステップ 2: npm プロジェクトを初期化する

```sh
npm init -y
```

### ステップ 3: 依存関係をインストールする

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

型定義は、`@safe-global/types-kit` に配置されました。 以前の `@safe-global/safe-core-sdk-types` パッケージの名称が変更されました。既存のプロジェクトをアップグレードする場合は、インポートを更新してください。

:::

### ステップ 4: ES モジュールを有効にする

以下の例では `import` 構文を使用しているため、`package.json` に以下を追加してください：

```json
{
  "type": "module"
}
```

### ステップ 5: 依存関係をインポートする

`app.js` を作成し、以下を追加してください：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { OperationType } from '@safe-global/types-kit'
```

### ステップ 6: 設定を行う

所有者が少なくとも2人おり、閾値が2に設定された金庫を使用し、複数の署名が必要となるようにしてください。

プロジェクトのルートディレクトリに `.env` ファイルを作成します：

```sh
# Kaia Kairos テストネット — https://chainlist.org/?search=kaia&testnets=true
RPC_URL=https://public-en-kairos.node.kaia.io
CHAIN_ID=1001
EXPLORER_TX_URL=https://kairos.kaiascan.io/tx/

# https://developer.safe.global からの API キー
SAFE_API_KEY=

# Kairos (https://app.safe.global) にデプロイされた 2-of-2 Safe
SAFE_ADDRESS=

# オーナー1が提案および実行を行うため、ガス代としてテスト用KAIAが必要
OWNER_1_ADDRESS=
OWNER_1_PRIVATE_KEY=

# オーナー2はオフチェーンでの署名のみを行うため、残高は不要
OWNER_2_PRIVATE_KEY=

# 1 weiのサンプルトランザクションの受信者（デフォルトはOWNER_1_ADDRESS）
# TO_ADDRESS=
```

:::danger

`.env` には秘密鍵が格納されています。 最初のコミットを行う前に、これを `.gitignore` に追加してください。また、このチュートリアルでは、実際の資金が保管されている鍵は絶対に使用しないでください。

:::

`app.js` に読み込み、何かが欠けている場合は速やかにエラーを返すようにします：

```js
// .env を process.env に読み込みます（Node 20.12 以降／21.7 以降に組み込まれており、依存関係は不要です）
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
  console.error(`.env に必要な環境変数が欠落しています: ${missing.join(', ')}`)
  process.exit(1)
}

// 1 wei を受け取るサンプルトランザクションの受信者アドレス
const TO_ADDRESS = process.env.TO_ADDRESS || OWNER_1_ADDRESS
```

## APIキットを使用する<a id="use-api-kit"></a>

### ステップ1：APIキットの初期化

チェーンIDとAPIキーを渡してください。 Safe がトランザクション・サービスのエンドポイントを自動的に解決するため、Kaia や Kairos では `txServiceUrl` を指定する必要はありません。

```js
const apiKit = new SafeApiKit({
  chainId: BigInt(CHAIN_ID), // Kairosの場合は1001、Kaiaメインネットの場合は8217
  apiKey: SAFE_API_KEY
})
```

独自のトランザクション・サービス・インスタンスを実行している場合、`txServiceUrl` は引き続き利用可能です。これを設定する場合、`apiKey` は不要です。

### ステップ2：プロトコルキットの初期化

```js
const protocolKitOwner1 = await Safe.init({
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

### ステップ4：保留中のトランザクションを取得する

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// 同じインスタンスで利用可能なその他の読み取り操作：
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)
```

### ステップ5：取引の確認

Protocol Kit を使用して署名を行い、[confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction) を通じてその署名を送信してください。

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

### ステップ6：トランザクションの実行

[Safe Wallet](https://app.safe.global/)、[Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction)、Safe CLI、またはその他の互換性のあるツールを使用して実行してください。

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('トランザクションが実行されました:');
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

`app.js` の完全な例：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import {
  OperationType
} from '@safe-global/types-kit'

// .env を process.env に読み込みます（Node >= 20.12 / 21.7 に組み込まれており、依存関係は不要です）
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
  console.error(`.env に必要な環境変数が欠落しています: ${missing.join(', ')}`)
  process.exit(1)
}

// 1 wei を受け取るサンプルトランザクションの受信者アドレス
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
// 同じインスタンスで利用可能なその他の読み取り操作:
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)

// 3. 所有者 2 からの確認
const protocolKitOwner2 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// Safeトランザクションを確認する
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
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

実行可能なプロジェクト一式（`app.js`、`.env.example`、および `package.json`）は、[kaia-safe-api-kit](https://github.com/praveen-kaia/kaia-safe-api-kit) にあります。 メソッドの一覧については、[APIキットリファレンス](https://docs.safe.global/sdk/api-kit/reference)をご覧ください。
