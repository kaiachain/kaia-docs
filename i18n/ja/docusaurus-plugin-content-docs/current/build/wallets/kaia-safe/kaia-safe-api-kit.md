---
id: kaia-safe-api-kit
title: Kaia Safe APIキット
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kaia Safe APIキット

APIキットは、[Safe Transaction API](https://github.com/safe-global/safe-transaction-service)と安全にやり取りするためのキットです。 このキットの中核は、有効な署名者が Safe の他の署名者に取引を提案・共有したり、署名を収集するサービスに署名を送信したり、Safe に関する情報（取引履歴、保留中の取引、有効なモジュールやガードなど）を取得したりできるようにすることである。

## クイックスタート<a id="Quickstart"></a>

このガイドを読み終える頃には、同サービスに取引を提案し、実行のためにオーナーの署名を得ることができるようになるだろう。

## 前提条件<a id="Prerequisites"></a>

1. [Node.js と npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. 複数の署名者がいる金庫

## 環境設定<a id="Setup-environment"></a>

### ステップ1：プロジェクト・ディレクトリを作成する。

このコマンドをコピーしてターミナルに貼り付け、プロジェクトフォルダを作成する。

```js
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### ステップ2： npmプロジェクトを初期化する。

このコマンドをターミナルにコピー＆ペーストして、`package.json`ファイルを作成する。

```js
npm init -y
```

### ステップ3：依存関係をインストールする。

API-Kitの使用方法は、以下のインストールコマンドを実行するだけです：

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

### ステップ4：依存関係をインポートする。

`app.js`という名前のファイルを作成する。 このインタラクションのためのコード・スニペットはすべてここにある。

これらの必要なインポートをコピーして、`app.js`ファイルの先頭に貼り付ける。

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
```

### ステップ5：セットアップの設定

API-Kitがどのように機能するかを効率的に説明するために、2人以上の署名者を持つSafeアカウントのセットアップを使用する。

以下をコピーして、`app.js`ファイルのimport文の下に貼り付ける：

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

APIキットを初期化するには、APIキットのインスタンスを作成する必要がある。

> Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview) がサポートされているチェーンでは、chainId プロパティを指定するだけで十分です。

```js
const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})

```

上で見たように、オプションの**txServiceUrl**プロパティを使用してカスタムサービスを含めました。

### ステップ2：プロトコルキットの初期化

トランザクションと署名を処理するには、プロバイダ、署名者、safeAddressを指定して、Protocol Kit（開発者がTypeScriptインタフェースを使用して[Safe Smart Accounts](https://github.com/safe-global/safe-smart-account)とやり取りできるようにするためのキット）のインスタンスを作成する必要がある。

```js
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
```

### ステップ3：サービスにトランザクションを提案する

API Kitの中核機能の1つは、有効な署名者が他の署名者とトランザクションを共有できるようにすることである。 しかし、その前に、セーフサイナーの誰かが取引のプロポーザルを作成し、プロセスを開始する必要がある。 この取引は、他の所有者がアクセスできるようにするためにサービスに送信され、他の所有者も同様に承認を与え、取引に署名することができる。 しかし、その前に、セーフサイナーの誰かが取引のプロポーザルを作成し、プロセスを開始する必要がある。 この取引は、他の所有者がアクセスできるようにするためにサービスに送信され、他の所有者も同様に承認を与え、取引に署名することができる。

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

APIキットは、状況に応じて保留中のトランザクションを取得するためのさまざまな方法を提供してくれる。 このガイドでは、セーフトランザクションハッシュと以下に示すその他の利用可能なメソッドを使用してトランザクショ ンを取得する：

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
```

## ステップ5：取引の確認

次に行うことは、プロトコルキットを使用してトランザクションに署名し、[confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction) メソッドを使用して署名を Safe Transaction Service に提出することである。

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

### ステップ6：トランザクションの実行

これで Safe トランザクションを実行する準備ができた。 これで Safe トランザクションを実行する準備ができた。 これは、[Safe Wallet Web](https://app.safe.global/)インターフェース、[Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction)、Safe CLI、または利用可能なその他のツールを使用して行うことができます。

この最後のステップでは、Protocol Kitを使って安全なトランザクションを実行した。

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${hash}`)
```

最後に、`app.js`の完全なコードは次のようになるはずだ：

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>"; // 2 Owner Safe Address Ex: 0x123....SAFE SHOULD 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // ONLY OWNER 1 and SAFE ADDRESS いくつかのテスト KAIA バランスが必要
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"；// OWNER 2 はテスト KAIA を持つ必要はない
const TO_ADDRESS = OWNER_1_ADDRESS; // 1 Wei を受け取るサンプルトランザクションの受信者アドレス
const apiKit = new SafeApiKit.default({
  chainId：1001n,
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
// 1. トランザクションの作成
const safeTransactionData = {
  to：TO_ADDRESS,
  value: '1', // 1 wei
  data：'0x',
  operation：OperationType.Call
}
const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData]
})
const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)
const signature = await protocolKitOwner1.signHash(safeTxHash)
// 2. サービスにトランザクションを提案する
try {
  await apiKit.proposeTransaction({
    safeAddress：SAFE_ADDRESS,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress：OWNER_1_ADDRESS,
    senderSignature: signature.data
  })
} catch(err) {
  console.log(err)
}
console.log("トランザクションハッシュは "+safeTxHash)
const transaction = await apiKit.getTransaction(safeTxHash)
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
// 3.オーナー2からの確認
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
const signature2 = await protocolKitOwner2.signHash(safeTxHash)
// Safe トランザクションの確認
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)
console.log(signatureResponse)
// 4.トランザクションの実行
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('トランザクション実行:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

APIキットは、状況に応じて保留中のトランザクションを取得するためのさまざまな方法を提供してくれる。