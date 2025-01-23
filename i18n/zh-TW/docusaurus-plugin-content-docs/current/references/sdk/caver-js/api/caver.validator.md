# caver.validator

caver.validator "軟件包提供了在 kaia 上實施應用程序時應使用的驗證函數。

**注意** `caver.validator` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

## validateSignedMessage<a href="#validatesignedmessage" id="validatesignedmessage"></a>

```javascript
caver.validator.validateSignedMessage(message, signatures, address [, isHashed])
```

通過比較從簽名中提取的公鑰和 kaia 賬戶的賬戶密鑰，驗證已簽名的信息。

**參數**

| 名稱         | 類型                | 描述                                                                                                                                                                                                                                                                                  |
| ---------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message    | string            | 原始信息字符串。 如果該信息使用 kaia 特有的前綴散列，則第三個參數應作為 `true`傳入。                                                                                                                                                                                                                                   |
| singatures | object \\| Array | 格式為 `{ v, r, s }` 的對象、`SignatureData ` 的實例或`SignatureData ` 的數組。 \[ v, r, s ]"或"\[\[ v, r, s ]"數組也可以作為參數傳遞，在這種情況下，它會被內部轉換為 "SignatureData "類型。 |
| address    | string            | 簽署信息的賬戶地址。                                                                                                                                                                                                                                                                          |
| isHashed   | boolean           | (optional, default: `false`) 作為參數傳遞的消息是否使用前綴`"\x19Kaia Signed Message：\n" + message.length + message`。                                                                                                                                         |

**返回價值**

返回`boolean` 的 `Promise`：該承諾將以一個 boolean 來表示消息上的簽名是否有效。

**示例**

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

## validateTransaction <a href="#validatetransaction" id="validatetransaction"></a>

```javascript
caver.validator.validateTransaction(tx)
```

驗證交易。 該函數比較 kaia 賬戶密鑰中的公鑰和從 "簽名 "中恢復的公鑰。 如果交易是收費委託的，且內含 "feePayerSignatures "變量，則該函數會比較從 "feePayerSignatures "中獲取的公鑰和收費人的公鑰。

**參數**

| 名稱 | 類型     | 描述                                                                     |
| -- | ------ | ---------------------------------------------------------------------- |
| tx | object | 要驗證的 [Transaction](./caver-transaction/caver-transaction.md#class) 實例。 |

**返回價值**

返回 `boolean` 的 `Promise`：該承諾將以 boolean 來表示傳輸是否有效。

**示例**

```javascript
// Basic transaction will be validated with `signatures`.
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateTransaction(tx).then(console.log)

// Fee-delegation transaction will be validated with `signatures` and `feePayerSignatures`.
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateTransaction(tx).then(console.log)
```

## validateSender <a href="#validatesender" id="validatesender"></a>

```javascript
caver.validator.validateSender(tx)
```

驗證交易發送方。 該函數比較 kaia 帳戶的帳戶密鑰和從 "簽名 "中恢復的公鑰。

**參數**

| 名稱 | 類型     | 描述                                                                     |
| -- | ------ | ---------------------------------------------------------------------- |
| tx | object | 要驗證的 [Transaction](./caver-transaction/caver-transaction.md#class) 實例。 |

**返回價值**

返回`boolean`的 `Promise`：該承諾將以boolean表示交易是否有效。

**示例**

```javascript
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateSender(tx).then(console.log)
```

## validateFeePayer <a href="#validatefeepayer" id="validatefeepayer"></a>

```javascript
caver.validator.validateFeePayer(tx)
```

驗證交易中的繳費人。 該函數比較繳費人賬戶密鑰的公鑰和從`feePayerSignatures` 中獲取的公鑰。

**參數**

| 名稱 | 類型     | 描述                                                                     |
| -- | ------ | ---------------------------------------------------------------------- |
| tx | object | 要驗證的 [Transaction](./caver-transaction/caver-transaction.md#class) 實例。 |

**返回價值**

返回`boolean`的 `Promise`：該承諾將以 boolean 表示交易是否有效。

**示例**

```javascript
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateFeePayer(tx).then(console.log)
```
