# ケイバーバリデータ

`caver.validator`パッケージは、kaiaでアプリケーションを実装する際に使用するバリデーション関数を提供する。

**NOTE** `caver.validator`はcaver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3)からサポートされています。

## バリデート署名メッセージ<a href="#validatesignedmessage" id="validatesignedmessage"></a>

```javascript
caver.validator.validateSignedMessage(message, signatures, address [, isHashed])
```

署名から復元された公開鍵とkaiaアカウントのアカウント鍵を比較することで、署名されたメッセージを検証する。

**パラメーター**

| 名称       | タイプ         | 説明                                                                                                                                                                                                                                                                                                                           |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| メッセージ    | ストリング       | 生のメッセージ文字列。 このメッセージがkaia固有のプレフィックスでハッシュされている場合、3番目のパラメー ターには`true`を渡すべきである。                                                                                                                                                                                                                                                  |
| 署名       | object \\ | `{ v, r, s }` 形式のオブジェクト、`SignatureData` のインスタンス、または `SignatureData` の配列。 '\[ v, r, s ]'または'˶[˶[ v, r, s ]]配列'をパラメータとして渡すこともでき、この場合は内部的に`SignatureData`型に変換されます。 |
| 住所       | ストリング       | メッセージに署名したアカウントのアドレス。                                                                                                                                                                                                                                                                                                        |
| isHashed | ブーリアン       | (オプション、デフォルト: `false`) パラメータとして渡されたメッセージを、接頭辞 `"\x19Kaia Signed Message：\n" + message.length + message`.                                                                                                                                                                |

**リターン・バリュー**

`Promise`は `boolean` を返す：このプロミスは、メッセージの署名が有効か無効かのブール値で解決される。

**例**

```javascript
const address = '0xa84a1ce657e9d5b383cece6f4ba365e23fa234dd'
const message = 'Some Message'
const signature = [
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
]
> caver.validator.validateSignedMessage(message, signature, address).then(console.log)


const address = '0xa84a1ce657e9d5b383cece6f4ba365e23fa234dd'
const hashedMessage = '0xa4b1069c1000981f4fdca0d62302dfff77c2d0bc17f283d961e2dc5961105b18'
const signature = [
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
]
> caver.validator.validateSignedMessage(hashedMessage, signature, address, true).then(console.log)
```

## バリデート・トランザクション<a href="#validatetransaction" id="validatetransaction"></a>

```javascript
caver.validator.validateTransaction(tx)
```

トランザクションを検証する。 この関数は、kaiaアカウントのアカウントキーから取得した公開鍵と、`signatures`から取得した公開鍵とを比較する。 トランザクションが `feePayerSignatures` 変数を内部に持つフィーデリゲートされたものである場合、この関数は `feePayerSignatures` から回収した公開鍵とフィー支払者の公開鍵を比較する。

**パラメーター**

| 名称 | タイプ    | 説明                                                                        |
| -- | ------ | ------------------------------------------------------------------------- |
| TX | オブジェクト | 検証する[Transaction](./caver-transaction/caver-transaction.md#class)のインスタンス。 |

**リターン・バリュー**

プロミスは `boolean` を返す：このプロミスは、トランザクションが有効か無効かのブール値で解決される。

**例**

```javascript
// Basic transaction will be validated with `signatures`.
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateTransaction(tx).then(console.log)

// Fee-delegation transaction will be validated with `signatures` and `feePayerSignatures`.
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateTransaction(tx).then(console.log)
```

## バリデート送信者<a href="#validatesender" id="validatesender"></a>

```javascript
caver.validator.validateSender(tx)
```

トランザクションの送信者を検証する。 この関数は、kaiaアカウントのアカウントキーの公開鍵と、`signatures`から復元した公開鍵を比較する。

**パラメーター**

| 名称 | タイプ    | 説明                                                                        |
| -- | ------ | ------------------------------------------------------------------------- |
| TX | オブジェクト | 検証する[Transaction](./caver-transaction/caver-transaction.md#class)のインスタンス。 |

**リターン・バリュー**

プロミスは `boolean` を返す：プロミスは、トランザクションが有効か無効かを示すブール値で解決される。

**例**

```javascript
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateSender(tx).then(console.log)
```

## バリデート料金支払者<a href="#validatefeepayer" id="validatefeepayer"></a>

```javascript
caver.validator.validateFeePayer(tx)。
```

トランザクション内の料金支払者を検証する。 この関数は、`feePayerSignatures`から回収した公開鍵と、料金支払者のアカウント鍵の公開鍵を比較する。

**パラメーター**

| 名称 | タイプ    | 説明                                                                        |
| -- | ------ | ------------------------------------------------------------------------- |
| TX | オブジェクト | 検証する[Transaction](./caver-transaction/caver-transaction.md#class)のインスタンス。 |

**リターン・バリュー**

プロミスは `boolean` を返す：プロミスは、トランザクションが有効か無効かを示すブール値で解決される。

**例**

```javascript
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateFeePayer(tx).then(console.log)
```
