# Intrinsicガス

ガスは`IntrinsicGas`と`ExecutionGas`の和である。 ここでは、`IntrinsicGas`がどのように構成されているかに焦点を当てる。

:::note

Intrinsicガスに関連するハードフォークの変更は、このページの一番下にあります。 ハードフォーク変更](#hardfork-changes)へ。

:::

## 概要

取引の「Intrinsicガス」は次の4つの要素を合計することで計算できる。

```
IntrinsicGasCost = KeyCreationGas + KeyValidationGas + PayloadGas + TxTypedGas
```

- `PayloadGas`はtxのデータフィールドのサイズに基づいて計算される。
- `KeyCreationGas`はトランザクションが新しいキーを登録するときに計算される。 `accountUpdate`トランザクションでのみ適用できる。
- `KeyValidationGas`は署名数に基づいて計算される。
- `TxTypedGas`はトランザクションタイプに基づいて定義される。

詳細に入る前に、すべてのキータイプにキーガス（`KeyCreationGas`と`KeyValidationGas`）が適用されるわけではないことを覚えておいてほしい。

| キータイプ | これらのキーガスは適用できますか？ |
| :---- | :---------------- |
| なし    | いいえ               |
| レガシー  | いいえ               |
| 失敗    | いいえ               |
| パブリック | はい                |
| マルチシグ | はい                |
| 役割ベース | 役割の主要タイプによる       |

## キークリエーションガス<a id="keycreationgas"></a>

The KeyCreationGas is calculated as `(number of registering keys) x TxAccountCreationGasPerKey (20000)`.\
The KeyCreationGas is calculated as `(number of registering keys) x TxAccountCreationGasPerKey (20000)`.\
Please keep in mind that Public key type always has only one registering key, so the gas would be always 20000.\
The KeyCreationGas is calculated as `(number of registering keys) x TxAccountCreationGasPerKey (20000)`.\
Please keep in mind that Public key type always has only one registering key, so the gas would be always 20000.

## キーバリデーション・ガス<a id="keyvalidationgas"></a>

KeyValidationGas`は`(署名数 - 1) x TxValidationGasPerKey(15000)\`として計算されます。\
公開鍵タイプは常に1つの署名鍵しか持たないので、ガスは常にゼロであることに留意してください。

KaiaトランザクションはfeePayerを持つこともできるので、KeyValidationGasの合計はこのようになる。

```
KeyValidationGas = (送信者のKeyValidationGas) + (料金支払者のKeyValidationGas)
```

## ペイロードガス<a id="payloadgas"></a>

基本的に、`PayloadGas` には `number_of_bytes_of_tx_input x TxDataGas (100)` がチャージされる。

トランザクション作成契約の場合、`number_of_words_of_initcode x InitCodeWordGas (2)` の追加料金が適用される。 上海のハードフォークから有効だ。

## TxTypedガス<a id="txtypedgas"></a>

klaytnのトランザクションには、`base`、`feeDelegated`、`feeDelegatedWithFeeRatio`の3種類がある。

例えば、こうだ、

- TxTypeValueTransferはvalueTransactionトランザクションの`ベース`タイプである。
- `TxTypeFeeDelegatedValueTransferはvalueTransferトランザクションの`feeDelegated\`タイプである。
- `TxTypeFeeDelegatedValueTransferWithRatio は、valueTransfer トランザクションの `feeDelegatedWithRatio\` タイプである。

これはTxTypedGasを計算する際に重要である：

- まず、TxType が `feeDelegated` または `feeDelegatedWithFeeRatio` であることを確認する。
  - `TxTypeが`feeDelegated`の場合、TxTypedGasに`TxGasFeeDelegated(10000)\`を追加する。
  - TxTypeが`feeDelegatedWithFeeRatio`の場合、TxTypedGasに`TxGasFeeDelegatedWithRatio (15000)`を追加する。
- 次に、取引が契約を結ぶかどうかをチェックする。
  - トランザクションがコントラクトを作成する場合、TxTypedGas に `TxGasContractCreation (53000)` を追加する。
  - そうでなければ、TxTypedGasに`TxGas (21000)`を加える。

例えば、こうだ、

- レガシー・トランザクションでコントラクトを作成する場合、TxTypedGasは `0 + TxGasContractCreation(53000)` となります。
- TxTypeFeeDelegatedValueTransferであれば、TxTypedGasは`TxGasFeeDelegated(10000) + TxGas (21000)`となる。
- TxTypeFeeDelegatedSmartContractDeployWithRatioであれば、TxTypedGasは `TxGasFeeDelegatedWithRatio (15000) + TxGasContractCreation (53000)` となる。

## ハードフォークの変更

| ハードフォーク    | 変更                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 例：         | intrinsicGas<br/> を計算する際の limit と meter initcode - initcode のワードごとに 2 ガスを追加するようになった。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| イスタンブールEVM | legacyTxType の [PayloadGas](#payloadgas) を他の TxType と整合させる<br/>- 変更前：PayloadGas=number_of_zero_bytes_of_tx_input x 4 + number_of_nonzero_bytes_of_tx_input x 68<br/> - After：PayloadGas=number_of_bytes_of_tx_input x 100<br/><br/>変更 [keyValidationGas](#keyvalidationgas) 計算ロジック<br/>- 変更前：KeyValidationGas=(key number of keys - 1) x 15,000<br/>- After：KeyValidationGas=(署名数 - 1) x 15,000 |

