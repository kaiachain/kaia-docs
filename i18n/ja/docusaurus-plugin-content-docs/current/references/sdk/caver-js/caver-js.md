# caver-js (1.5.0 またはそれ以降)

![](/img/references/kaiaXcaver-js.png)

`caver-js`はJavaScript APIライブラリで、HTTPまたはWebsocket接続を使ってkaiaノードと対話することができる。 npm](https://www.npmjs.com/package/caver-js)で入手できる。

## 特徴<a href="#features" id="features"></a>

- HTTPとWebsocketを介したkaiaのJSON-RPCクライアントAPIの完全な実装
- kaiaトランザクション、アカウント、およびアカウント・キー・タイプのサポート
- kaiaネットワーク上でスマートコントラクトをデプロイ、実行するためのJavaScriptスマートコントラクトパッケージ
- kaiaアカウント管理用インメモリーウォレット
- フィーデレグのサポート
- kaiaウォレットキーフォーマットのサポート
- RLPにおけるトランザクション・オブジェクトのエンコード/デコード
- トランザクションオブジェクトの署名
- web3-jsアプリケーションをcaver-jsに簡単に移植できる

## caver-js のパッケージ<a href="#packages-in-caver-js" id="packages-in-caver-js"></a>

以下は `caver-js` で提供されるパッケージである。

- [caver.account](./api/caver.account.md)
- [caver.wallet.keyring](./api/caver-wallet/keyring.md)
- [caver.wallet](./api/caver-wallet/caver-wallet.md)
- [caver.transaction](./api/caver-transaction/caver-transaction.md)
- [caver.rpc](./api/caver-rpc/caver-rpc.md)
- [caver.contract](./api/caver.contract.md)
- [caver.abi](./api/caver.abi.md)
- [caver.kct](./api/caver-kct/caver-kct.md)
- [caver.validator](./api/caver.validator.md)
- [caver.utils](./api/caver.utils.md)
- [caver.ipfs](./api/caver.ipfs.md)

## エラーコードの改善<a href="#error-code-improvement" id="error-code-improvement"></a>

イーサリアムからのweb3.js経由のエラーメッセージでは、どこでエラーが発生しているのかほとんどわからない。 `caver-js`はkaiaからのエラーメッセージをキャッチするインターフェースを改善した。

詳細はトランザクションレシートの `txError` の値で確認できる：

```
Error: runtime error occurred in interpreter
 {
  "blockHash"："0xe7ec35c9fff1178d52cee1d46d40627d19f828c4b06ad1a5c3807698b99acb20",
  "blockNumber"：7811,
  "contractAddress": null,
  "from"："0xa8a2d37727197cc0eb827f8c5a3a3aceb26cf59e",
  "gasUsed": 9900000000,
  "logsBloom"："0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "status"：false,
  "to"："0xf8425b0f65147969621f9390ca06139c7b439497",
  "transactionHash"："0x85ce2b307899c90144442d9b3236827ac57375c522be2435093aebfd920b8c58",
  "transactionIndex"：0,
  "txError"："0x2",
  "events"：{}
}
```

## kaiaにトランザクションを送信する際の注意事項<a href="#caution-when-sending-a-transaction-to-klaytn" id="caution-when-sending-a-transaction-to-klaytn"></a>

カイアは、[KIP-71](https://kips.kaia.io/KIPs/kip-71)を可能にしたマグマのハードフォーク以来、新しいガス価格政策を持っています。

したがって、ハードフォークが適用されるか否かに応じて、トランザクションを送信する際に`gasPrice`ロジックを異なるように設定する必要がある。

マグマのハードフォークまで、カイアでの取引には「固定ガス価格」が適用されてきた。 従って、ネットワークに提出された他の価格の取引は拒否される。 トランザクションに署名または送信する際に`gasPrice`が定義されていない場合、caver-jsは[caver.rpc.klay.getGasPrice](./api/caver-rpc/klay.md#caver-rpc-klay-getgasprice) RPCコールを使用してガス価格を設定する。

マグマのハードフォーク後、kaiaは「ダイナミック・ガス料金価格メカニズム」を採用している。 取引のガス料金は、カイヤネットワークの基本料金より高くなければならない。 トランザクションに署名または送信するときに `gasPrice` が定義されていない場合、caver-js は `caver.rpc.klay.getGasPrice` を使用してトランザクションの `gasPrice` フィールドを設定する。

### gasPriceフィールドの設定方法

caver-jsは、`gasPrice`を設定する様々な方法を提供する。 caver-jsを使用する際に、`gasPrice`フィールドを設定する方法を以下に提案する。 ここで説明する方法は、ハードフォークに関係なく使うことができる。

#### `gasPrice`フィールドを定義しない

`gasPrice` フィールドを定義せずにインスタンスを作成した場合、トランザクションに署名するために `tx.sign` または `tx.signAsFeePayer` を呼び出すと、自動的に `gasPrice` フィールドが設定される。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.sign(from, tx) // Before signing, gasPrice is set inside `tx.sign`.
```

#### `tx.fillTransaction`メソッドを使用する。

`tx.fillTransaction`は、トランザクションのオプションフィールドが省略されたときに適切な値で埋める関数である。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.fillTransaction() // Fill the optional tx fields. 
```

#### `tx.suggestGasPrice`メソッドを使用する。

`gasPrice`には、推奨ガス価格を返す`tx.suggestGasPrice`の結果を設定することができる。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
tx.gasPrice = await tx.suggestGasPrice() 
```

For more information about the gas price, see [Gas and Unit Price Overview](../../../learn/transaction-fees/transaction-fees.md#effective-gas-price). The price of gas used in the network can be obtained by using [caver.rpc.klay.getGasPrice](./api/caver-rpc/klay.md#caver-rpc-klay-getgasprice).

## リンク<a href="#links" id="links"></a>

- caver-js [GitHub リポジトリ](https://github.com/kaiachain/caver-js)
- caver-js on [npm](https://www.npmjs.com/package/caver-js)
