# caver.validator

caver.validator "软件包提供了在 kaia 上实施应用程序时应使用的验证函数。

**注意** `caver.validator` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 开始支持。

## validateSignedMessage<a href="#validatesignedmessage" id="validatesignedmessage"></a>

```javascript
caver.validator.validateSignedMessage(message, signatures, address [, isHashed])
```

通过比较从签名中提取的公钥和 kaia 账户的账户密钥，验证已签名的信息。

**参数**

| 名称         | 类型                | 描述                                                                                                                                                                                                                                                                                  |
| ---------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message    | string            | 原始信息字符串。 如果该信息使用 kaia 特有的前缀散列，则第三个参数应作为 `true`传入。                                                                                                                                                                                                                                   |
| singatures | object \\| Array | 格式为 `{ v, r, s }` 的对象、`SignatureData ` 的实例或`SignatureData ` 的数组。 \[ v, r, s ]"或"\[\[ v, r, s ]"数组也可以作为参数传递，在这种情况下，它会被内部转换为 "SignatureData "类型。 |
| address    | string            | 签署信息的账户地址。                                                                                                                                                                                                                                                                          |
| isHashed   | boolean           | (optional, default: `false`) 作为参数传递的消息是否使用前缀`"\x19Kaia Signed Message：\n" + message.length + message`。                                                                                                                                         |

**返回价值**

返回`boolean` 的 `Promise`：该承诺将以一个 boolean 来表示消息上的签名是否有效。

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

验证交易。 该函数比较 kaia 账户密钥中的公钥和从 "签名 "中恢复的公钥。 如果交易是收费委托的，且内含 "feePayerSignatures "变量，则该函数会比较从 "feePayerSignatures "中获取的公钥和收费人的公钥。

**参数**

| 名称 | 类型     | 描述                                                                     |
| -- | ------ | ---------------------------------------------------------------------- |
| tx | object | 要验证的 [Transaction](./caver-transaction/caver-transaction.md#class) 实例。 |

**返回价值**

返回 `boolean` 的 `Promise`：该承诺将以 boolean 来表示传输是否有效。

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

验证交易发送方。 该函数比较 kaia 帐户的帐户密钥和从 "签名 "中恢复的公钥。

**参数**

| 名称 | 类型     | 描述                                                                     |
| -- | ------ | ---------------------------------------------------------------------- |
| tx | object | 要验证的 [Transaction](./caver-transaction/caver-transaction.md#class) 实例。 |

**返回价值**

返回`boolean`的 `Promise`：该承诺将以boolean表示交易是否有效。

**示例**

```javascript
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateSender(tx).then(console.log)
```

## validateFeePayer <a href="#validatefeepayer" id="validatefeepayer"></a>

```javascript
caver.validator.validateFeePayer(tx)
```

验证交易中的缴费人。 该函数比较缴费人账户密钥的公钥和从`feePayerSignatures` 中获取的公钥。

**参数**

| 名称 | 类型     | 描述                                                                     |
| -- | ------ | ---------------------------------------------------------------------- |
| tx | object | 要验证的 [Transaction](./caver-transaction/caver-transaction.md#class) 实例。 |

**返回价值**

返回`boolean`的 `Promise`：该承诺将以 boolean 表示交易是否有效。

**示例**

```javascript
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateFeePayer(tx).then(console.log)
```
