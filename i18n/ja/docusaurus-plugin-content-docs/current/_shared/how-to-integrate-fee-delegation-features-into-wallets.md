# 手数料委任機能をウォレットに統合する方法

Kaiaの[ネイティブ手数料委任](/build/transactions/fee-delegation)機能のおかげで、ユーザーはdApp上でガス代のかからない取引を利用できます。 これを有効にするには、**ウォレット**が手数料委任型の取引タイプに対応しており、**送信者による署名**を実行できる必要があります。

:::info このガイドの対象読者

このガイドは、**ウォレットプロバイダー**を対象としています。 このウォレットは送信側のみを実装しています：

- ユーザーの鍵を使用して、手数料委任取引に署名する
- `senderTxHashRLP` を dApp に返す

手数料支払者の署名およびブロードキャストは、ウォレットの責任範囲には**含まれません**。 これらは、dAppのバックエンド、あるいは[Kaia Fee Delegation Service](/build/tutorials/integrate-fee-delegation-service)などのマネージドサービスによって処理されます。

:::

## エンドツーエンドのフロー（役割）

手数料の委任には、常に同じ関係者が関与します。 以下の図は完全な経路を示しています。後のセクションではこの図を再利用し、説明の対象となるアクターを強調表示します。

<FeeDelegationFlow></FeeDelegationFlow>

| ステップ | 誰              | 責任                                                           |
| ---- | -------------- | ------------------------------------------------------------ |
| 1    | **ウォレット（あなた）** | 手数料委任取引に署名し、`senderTxHashRLP`を返します。 **絶対に**ブロードキャストしないでください。 |
| 2    | **dApp**       | `senderTxHashRLP` を手数料支払者に転送してください。                          |
| 3    | **費用負担者**      | 再度署名を行い、署名がすべて完了したトランザクションをKaiaに送信してください。                    |

このページでは、**ステップ1**について詳しく説明しています。 手順2～3については、最後に要約を掲載し、詳細なガイドへのリンクを掲載しています。

## ウォレットが実装しなければならないもの

これはフローの**ステップ1**です。ウォレットが実装しなければならないのは、この部分だけです。

<FeeDelegationFlow highlight="wallet"></FeeDelegationFlow>

手数料の委任をサポートするには、ウォレット内で以下の実装を行ってください：

1. [Kaia SDK](https://github.com/kaiachain/kaia-sdk)（例：`@kaiachain/ethers-ext`）をウォレットのコードベースに追加します。
2. ウォレットが手数料委任取引のリクエスト（通常は `kaia_signTransaction` 経由）を受信したら、Kaia SDK を使用してユーザーの鍵で署名を行います。
3. `senderTxHashRLP` を dApp に返します。 ウォレットからKaiaノードへトランザクションを送信**しないでください**。

:::tip ウォレットプロバイダー向けチェックリスト

- 手数料委任型の取引タイプ（価値移転、契約執行、その他必要に応じて）をサポートする
- ウォレットで管理されている\*\*送信者（ユーザー）\*\*の鍵で署名する
- `senderTxHashRLP` を dApp に返す
- 送信者だけが署名したトランザクションを**送信しないでください**

:::

### 例：手数料委任型価値移転の署名

このパターンをウォレットの署名パス（たとえば、`kaia_signTransaction` ハンドラー内など）で使用してください。 本番環境では、ハードコードされた秘密鍵ではなく、ウォレットによって管理されているユーザーの鍵を使用し、呼び出し元に `senderTxHashRLP` を返すようにしてください。

```javascript
const ethers = require("ethers6");
const { Wallet, TxType, parseKaia } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const receiverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";
const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

async function main() {
  const tx = {
    type: TxType.FeeDelegatedValueTransfer,
    from: senderAddr,
    to: receiverAddr,
    value: parseKaia("0.01"),
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

### 例：手数料委任契約のやり取りに署名する

```javascript
const ethers = require("ethers6");
const { Wallet, TxType } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

const contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";
const abi = ["function setNumber(uint256 newNumber)"];

async function main() {
  const contract = new ethers.Contract(contractAddr, abi, provider);
  const data = contract.interface.encodeFunctionData("setNumber", ["0x123"]);

  const tx = {
    type: TxType.FeeDelegatedSmartContractExecution,
    from: senderAddr,
    to: contractAddr,
    value: 0,
    data: data,
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

:::note

具体的な配線方法は、お使いのウォレットのアーキテクチャによって異なります。 重要な契約事項は次のとおりです：**送信者として手数料委任型を指定し、`senderTxHashRLP`を返し、ブロードキャストを行わないこと。**

:::

## ウォレットの外：手数料支払者の署名

ウォレットが `senderTxHashRLP` を返すと、dApp はそれを転送し（**ステップ 2**）、その後、手数料支払者が署名して送信します（**ステップ 3**）。 以下に強調表示されているのが手数料支払者です。これは**ウォレットコードではありません**。

<FeeDelegationFlow highlight="feepayer"></FeeDelegationFlow>

```javascript
// Fee payer / backend only — not wallet code
const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
console.log("sentTx", sentTx);

const rc = await sentTx.wait();
console.log("receipt", rc);
```

手数料支払者が `senderTxHashRLP` を受け取り、トランザクションを送信する仕組みについては（ウォレットとの統合ではなく、単純なクライアント／サーバーのデモです）、[手数料委任の構築例](/build/tutorials/fee-delegation-example)をご覧ください。 管理対象の料金支払者については、[Kaia 料金委任サービスの統合](/build/tutorials/integrate-fee-delegation-service)を参照してください。

## 今後の手順

| 目標                                             | ガイド                                                                                                   |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 手数料委任型取引の種類について理解する                            | [手数料の委任](/build/transactions/fee-delegation)、[部分的な手数料の委任](/build/transactions/partial-fee-delegation) |
| クライアント／サーバー型の料金支払者のデモをご覧ください（ウォレットのコードではありません） | [ビルド手数料の委任例](/build/tutorials/fee-delegation-example)                                                 |
| dAppでは、Kaiaのマネージド・フィー・ペイヤーをご利用ください             | [Kaia Fee Delegation Service を統合する](/build/tutorials/integrate-fee-delegation-service)                |
| 手数料委任取引に関するSDKリファレンス                           | [ethers-ext 手数料委任による価値移転](/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer)     |
