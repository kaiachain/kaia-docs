---
description: caver-js 实用 API
---

# caver.utils

`caver.utils` 提供实用功能。

## 随机数<a href="#randomhex" id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```

randomHex](https://github.com/frozeman/randomHex)库从给定的字节大小生成加密性强的伪随机 HEX 字符串。

**参数：**

| 名称 | 类型 | 描述                                                              |
| -- | -- | --------------------------------------------------------------- |
| 大小 | 数量 | HEX 字符串的字节大小，_例如_，`32`将产生一个以 "0x "为前缀、包含 64 个字符的 32 字节 HEX 字符串。 |

**返回价值**

| 类型  | 描述             |
| --- | -------------- |
| 字符串 | 生成的随机 HEX 字符串。 |

**示例**

```javascript
> caver.utils.randomHex(32)
'0x861b56754dba7769f9740c3ad70b4694aa24d604c1dba3bac7ec45978927b8de'

> caver.utils.randomHex(4) '0x5641d6ce' > caver.utils.randomHex(2) '0xf058' randomHex(4)
'0x5641d6ce'

> caver.utils.randomHex(2)
'0xf058'

> caver.utils.randomHex(1)
'0x7c'

> caver.utils.randomHex(0)
'0x'
```

## _（下划线）<a href="#underscore" id="underscore"></a>

```javascript
caver.utils._()
```

[下划线](http://underscorejs.org) 库提供了许多便捷的 JavaScript 函数。

详情请参阅 [underscore API reference](http://underscorejs.org)。

**示例**

```javascript
> var _ = caver.utils._

> _.union([1,2],[3])
[1,2,3]

> _.each({my: 'object'}, function(value, key){ ... })
...
```

## 至BN<a href="#tobn" id="tobn"></a>

```javascript
caver.utils.toBN(number)
```

安全地将任何给定值（包括 [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 实例）转换为 [BN.js](https://github.com/indutny/bn.js/) 实例，以便在 JavaScript 中处理大数字。

**参数**

| 名称 | 类型  | 描述       |
| -- | --- | -------- |
| 数量 | 字符串 | 数字转换成大数。 |

**返回价值**

| 类型 | 描述                                                                                                                                                         |
| -- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 对象 | BN.js](https://github.com/indutny/bn.js/) 实例。 |

**示例**

```javascript
> caver.utils.toBN(1234).toString()
'1234'

> caver.utils.toBN('1234').add(caver.utils.toBN('1')).toString()
'1235'

> caver.utils.toBN('0xea').toString()
'234'
```

## 是BN<a href="#isbn" id="isbn"></a>

```javascript
caver.utils.isBN(bn)
```

检查给定值是否是 [BN.js](https://github.com/indutny/bn.js/) 实例。

**参数**

| 名称 | 类型 | 描述                                                                |
| -- | -- | ----------------------------------------------------------------- |
| bn | 对象 | 一个 [BN.js](https://github.com/indutny/bn.js/) 实例。 |

**返回价值**

| 类型      | 描述                                                                              |
| ------- | ------------------------------------------------------------------------------- |
| boolean | 如果给定值是 [BN.js](https://github.com/indutny/bn.js/) 实例，则为 `true`。 |

**示例**

```javascript
> var number = new caver.utils.BN(10)
> caver.utils.isBN(number)
true
```

## 是大数<a href="#isbignumber" id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

检查给定值是否是 [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 实例。

**参数**

| 名称        | 类型 | 描述                                                                            |
| --------- | -- | ----------------------------------------------------------------------------- |
| bignumber | 对象 | 一个 [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 实例。 |

**返回价值**

| 类型      | 描述                                  |
| ------- | ----------------------------------- |
| boolean | 如果给定值是 `BigNumber.js` 实例，则为 `true`。 |

**示例**

```javascript
> var number = new caver.utils.BigNumber(10)
> caver.utils.isBigNumber(number)
true
```

## sha3<a href="#sha3" id="sha3"></a>

```javascript
caver.utils.sha3(str)
caver.utils.keccak256(str) // ALIAS
```

计算输入的 sha3 值。

**注意**：要模仿 Solidity 的 sha3 行为，请使用 [caver.utils.soliditySha3](#soliditysha3)。

**参数**

| 名称  | 类型  | 描述       |
| --- | --- | -------- |
| str | 字符串 | 要散列的字符串。 |

**返回价值**

| 类型  | 描述      |
| --- | ------- |
| 字符串 | 结果是哈希值。 |

**示例**

```javascript
> caver.utils.sha3('234') // 取为字符串
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc966216f811ce6a79'

> caver.utils.sha3(new caver.utils.BN('234'))// utils.sha3 stringify bignumber instance.
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc966216f811ce6a79'

> caver.utils.sha3(234)
null // can't calculate the has of a number

> caver.utils.sha3(0xea).sha3(0xea) // 同上，只是数字的 HEX 表示
null

> caver.utils.sha3('0xea') // 将首先转换为字节数组，然后进行散列
'0x2f20677459120677484f7104c76deb6846a2c071f9b3152c103bb12cd54d1a4a'
```

## soliditySha3<a href="#soliditysha3" id="soliditysha3"></a>

```javascript
caver.utils.soliditySha3(param1 [, param2, ...])
```

以与 solidity 相同的方式计算给定输入参数的 sha3。 这意味着参数在散列之前将进行 ABI 转换和严格打包。

**参数**

| 名称  | 类型    | 描述                                                                                                                                                                                     |
| --- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 参数X | Mixed | 任何类型，或带有 `{type: 'uint', value: '123456'}` 或 `{t: 'bytes', v: '0xfff456'}` 的对象。 <br/>基本类型自动检测如下：<br/>- `string` 非数字 UTF-8 字符串被解释为 `string`。<br/>- `string` 非数字 UTF-8 字符串被解释为 `string`。 |

**返回价值**

| 类型  | 描述      |
| --- | ------- |
| 字符串 | 结果是哈希值。 |

**示例**

```javascript
> caver.utils.soliditySha3('234564535', '0xfff23243', true, -10)
// 自动检测：uint256, bytes, bool, int256
'0x3e27a893dc40ef8a7f0841d96639de2f58a132be5ae466d40087a2cfa83b7179'

> caver.utils.soliditySha3('Hello!utils.soliditySha3('Hello!%') // auto detects: string
'0x661136a4267dba9ccdf6bfddb7c00e714de936674c4bdb065a531cf1cb15c7fc'

> caver.utils.soliditySha3('234') // 自动检测： uint256
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3(0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2)soliditySha3(0xea) // 同上
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3(new caver.utils.BN('234'))// same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3({type: 'uint256', value: '234'}))// same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3({t: 'uint', v: new caver.utils.BN('234')}))// same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3('0x407D73d8a49eeb85D32Cf465507dd71d507100c1')
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b'

> caver.utils.soliditySha3({t: 'bytes', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b' // 结果同上

> caver.utils.soliditySha3({t: 'address', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b' // 同上，但如果是多例，将进行校验和检查

> caver.utils.soliditySha3({t: 'bytes32', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x3c69a194aaf415ba5d6afca734660d0a3d45acdc05d54cd1ca89a89e7625b4' // 结果与上面不同

> caver.utils.soliditySha3( )utils.soliditySha3({t: 'string', v: 'Hello!%'}, {t: 'int8', v:-23}, {t: 'address', v: '0x85F43D8a49eeB85d32Cf465507DD71d507100C1d'})
'0xa13b31627c1ed7aaded5aecec71baf02fe123797fffd45e662eac8e06fbe4955'
```

## isHex<a href="#ishex" id="ishex"></a>

```javascript
caver.utils.isHex(hex)
```

检查给定字符串是否为 HEX 字符串。

**参数**

| 名称   | 类型  | 描述           |
| ---- | --- | ------------ |
| 十六进制 | 字符串 | 给定的 HEX 字符串。 |

**返回价值**

| 类型      | 描述                         |
| ------- | -------------------------- |
| boolean | 如果给定参数是 HEX 字符串，则为 `true`。 |

**示例**

```javascript
> caver.utils.isHex('0xc1912')
true

> caver.utils.isHex('c1912')
true

> caver.utils.isHex('0xZ1912')
false

> caver.utils.isHex('Hello')
false
```

## isHexStrict<a href="#ishexstrict" id="ishexstrict"></a>

```javascript
caver.utils.isHexStrict(hex)
```

检查给定字符串是否为 HEX 字符串。 与 [caver.utils.isHex](#ishex)的区别在于，它希望 HEX 前缀为 `0x`。

**参数**

| 名称   | 类型  | 描述           |
| ---- | --- | ------------ |
| 十六进制 | 字符串 | 给定的 HEX 字符串。 |

**返回价值**

| 类型      | 描述                          |
| ------- | --------------------------- |
| boolean | 如果给定字符串是 HEX 字符串，则为 `true`。 |

**示例**

```javascript
> caver.utils.isHexStrict('0xc1912')
true

> caver.utils.isHexStrict('c1912')
false

> caver.utils.isHexStrict('0xZ1912')
false

> caver.utils.isHex('Hello')
false
```

## isAddress<a href="#isaddress" id="isaddress"></a>

```javascript
caver.utils.isAddress(address)
```

检查给定字符串是否为有效的 kaia 地址。 如果地址中有大小写字母，它还会检查校验和。

**参数**

| 名称 | 类型  | 描述     |
| -- | --- | ------ |
| 地址 | 字符串 | 地址字符串。 |

**返回价值**

| 类型      | 描述                             |
| ------- | ------------------------------ |
| boolean | 如果给定字符串是有效的 kaia 地址，则为 `true`。 |

**示例**

```javascript
> caver.utils.isAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
true

> caver.utils.isAddress('c1912fee45d61c87cc5ea59dae31190fffff232d')
true

> caver.utils.isAddress('0XC1912FEE45D61C87CC5EA59DAE31190fffff232D') true // 因为全部为大写，所以不会进行校验和。isAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
true // 由于全部为大写，将不检查校验和

> caver.utils.isAddress('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
true

> caver.utils.isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
false // 检查和错误
```

## 至校验和地址<a href="#tochecksumaddress" id="tochecksumaddress"></a>

```javascript
caver.utils.toChecksumAddress(address)
```

将大写或小写的 kaia 地址转换为校验和地址。

**参数**

| 名称 | 类型  | 描述     |
| -- | --- | ------ |
| 地址 | 字符串 | 地址字符串。 |

**返回价值**

| 类型  | 说明     |
| --- | ------ |
| 字符串 | 校验和地址。 |

**举例**

```javascript
> caver.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'

> caver.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d' // 同上
```

## 检查地址校验和<a href="#checkaddresschecksum" id="checkaddresschecksum"></a>

```javascript
caver.utils.checkAddressChecksum(address)
```

检查给定地址的校验和。 对于非校验和地址，也会返回 `false`。

**参数**

| 名称 | 类型  | 描述     |
| -- | --- | ------ |
| 地址 | 字符串 | 地址字符串。 |

**返回价值**

| 类型      | 描述                                               |
| ------- | ------------------------------------------------ |
| boolean | 如果地址的校验和有效，则为 `true`；如果不是校验和地址或校验和无效，则为 `false`。 |

**举例**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')true> keyring.isDecoupled()
false
```

## 到十六进制<a href="#tohex" id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```

将任何给定值转换为 HEX。 数字字符串将被解释为数字。 文本字符串将被解释为 UTF-8 字符串。

**参数**

| 名称    | 类型                                        | 描述             |
| ----- | ----------------------------------------- | -------------- |
| mixed | string \\| number \\| BN \\| BigNumber | 要转换为 HEX 的输入值。 |

**返回价值**

| 类型  | 描述           |
| --- | ------------ |
| 字符串 | 得到的 HEX 字符串。 |

**示例**

```javascript
> caver.utils.toHex('234')
'0xea'

> caver.utils.toHex(234)
'0xea'

> caver.utils.toHex(new caver.utils.BN('234'))
'0xea'

> caver.utils.toHex(new caver.utils.BigNumber('234'))
'0xea'

> caver.utils.toHex('I have 100€')
'0x49206861766520313030e282ac'
```

## 十六进制到数字字符串<a href="#hextonumberstring" id="hextonumberstring"></a>

```javascript
caver.utils.hexToNumberString(hex)
```

以字符串形式返回给定 HEX 值的数字表示形式。

**参数**

| 名称      | 类型  | 描述            |
| ------- | --- | ------------- |
| 十六进制字符串 | 字符串 | 要转换的 HEX 字符串。 |

**返回价值**

| 类型  | 描述        |
| --- | --------- |
| 字符串 | 字符串形式的数字。 |

**示例**

```javascript
> caver.utils.hexToNumberString('0xea')
"234"
```

## 十六进制到数字<a href="#hextonumber" id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```

返回给定 HEX 值的数字表示形式。

**注意**：这对大数字没有用，请使用 [caver.utils.toBN](#tobn)。

**参数**

| 名称      | 类型  | 描述            |
| ------- | --- | ------------- |
| 十六进制字符串 | 字符串 | 要转换的 HEX 字符串。 |

**返回价值**

| 类型 | 描述             |
| -- | -------------- |
| 数量 | 给定 HEX 值的数字表示。 |

**示例**

```javascript
> caver.utils.hexToNumber('0xea')
234
```

## numberToHex<a href="#numbertohex" id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```

返回给定数值的 HEX 表示形式。

**参数**

| 名称 | 类型                                        | 描述        |
| -- | ----------------------------------------- | --------- |
| 数量 | string \\| number \\| BN \\| BigNumber | 数字字符串或数字。 |

**返回价值**

| 类型  | 描述           |
| --- | ------------ |
| 字符串 | 给定数字的 HEX 值。 |

**示例**

```javascript
> caver.utils.numberToHex('234')
'0xea'
```

## hexToUtf8<a href="#hextoutf8" id="hextoutf8"></a>

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```

返回给定 HEX 值的 UTF-8 字符串表示形式。

**参数**

| 名称   | 类型  | 描述                       |
| ---- | --- | ------------------------ |
| 十六进制 | 字符串 | 要转换为 UTF-8 字符串的 HEX 字符串。 |

**返回价值**

| 类型  | 描述         |
| --- | ---------- |
| 字符串 | UTF-8 字符串。 |

**示例**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac')
'I have 100€'
```

## 十六进制<a href="#hextoascii" id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```

返回给定 HEX 值的 ASCII 字符串表示形式。

**参数**

| 名称   | 类型  | 描述                       |
| ---- | --- | ------------------------ |
| 十六进制 | 字符串 | 要转换为 ASCII 字符串的 HEX 字符串。 |

**返回价值**

| 类型  | 描述         |
| --- | ---------- |
| 字符串 | ASCII 字符串。 |

**示例**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021')
'我有 100 个！'
```

## utf8ToHex<a href="#utf8tohex" id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(str)
caver.utils.stringToHex(str) // ALIAS
```

返回给定 UTF-8 字符串的 HEX 表示形式。

**参数**

| 名称  | 类型  | 描述                       |
| --- | --- | ------------------------ |
| 字符串 | 字符串 | 要转换为 HEX 字符串的 UTF-8 字符串。 |

**返回价值**

| 类型  | 描述       |
| --- | -------- |
| 字符串 | 十六进制字符串。 |

**示例**

```javascript
> caver.utils.utf8ToHex('I have 100€')
'0x49206861766520313030e282ac'
```

## asciiToHex<a href="#asciitohex" id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(str)
```

返回给定 ASCII 字符串的 HEX 表示形式。

**参数**

| 名称  | 类型  | 描述                       |
| --- | --- | ------------------------ |
| str | 字符串 | 要转换为 HEX 字符串的 ASCII 字符串。 |

**返回价值**

| 类型  | 描述       |
| --- | -------- |
| 字符串 | 十六进制字符串。 |

**示例**

```javascript
> caver.utils.asciiToHex('I have 100!')
'0x4920686176652031303021'
```

## 十六进制到字节<a href="#hextobytes" id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```

根据给定的 HEX 字符串返回字节数组。

**参数**

| 名称   | 类型  | 描述            |
| ---- | --- | ------------- |
| 十六进制 | 字符串 | 要转换的 HEX 字符串。 |

**返回价值**

| 类型 | 描述    |
| -- | ----- |
| 数组 | 字节数组。 |

**示例**

```javascript
> caver.utils.hexToBytes('0x000000ea')
[ 0, 0, 0, 234 ]
```

## 字节到十六进制<a href="#bytestohex" id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```

从字节数组返回 HEX 字符串。

**参数**

| 名称   | 类型 | 描述        |
| ---- | -- | --------- |
| 字节数组 | 数组 | 要转换的字节数组。 |

**返回价值**

| 类型  | 描述       |
| --- | -------- |
| 字符串 | 十六进制字符串。 |

**示例**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ])
'0x48656c6c6f2124'
```

## convertToPeb<a href="#topeb" id="topeb"></a>

```javascript
caver.utils.convertToPeb(number [, unit])
```

将任何 KAIA 值转换为 peb。

**注意**："peb "是最小的 KAIA 单位，您应始终使用 "peb "作为 KAIA 单位。 转换为 "KAIA "仅供显示之用。

**参数**

| 名称    | 类型              | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 数量    | 字符串 \| 数字 \| BN | 价值。                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| units | 字符串             | <p>(可选，默认为<code>"KAIA"</code>）要转换的 KAIA 单位。 <code>数字</code>将乘以所提供单位的下列乘数之一： -<code>peb</code>：1'-<code>kpeb</code>：1000'-<code>Mpeb</code>：1000000'-<code>Gpeb</code>：1000000000'-<code>Ston</code>：'1000000000'-<code>uKLAY</code>：'1000000000000'-<code>mKLAY</code>：'1000000000000000'-<code>KAIA</code>：'100000000000000'-<code>kKLAY</code>：'100000000000000000'-<code>MKLAY</code>：'10000000000000000'-<code>GKLAY</code>：'10000000000000000000</p> |

**返回价值**

| 类型  | 描述                                                                         |
| --- | -------------------------------------------------------------------------- |
| 字符串 | 如果数字参数是 [BN](https://github.com/indutny/bn.js/) 的实例，则返回一个 BN 实例，否则返回一个字符串。 |

**示例**

```javascript
> caver.utils.convertToPeb('1', 'KAIA')
'1000000000000000000'

> caver.utils.convertToPeb(caver.utils.toBN(1), 'KAIA')
<BN: de0b6b3a7640000>
```

## convertFromPeb<a href="#convertfrompeb" id="convertfrompeb"></a>

```javascript
caver.utils.convertFromPeb(number [, unit])
```

**注意**："peb "是最小的 KAIA 单位，您应始终使用 "peb "作为 KAIA 单位。 转换为 "KAIA "仅供显示之用。

**参数**

| 名称 | 类型                                        | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 数量 | string \\| number \\| BN \\| BigNumber | 数值以 peb.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 单位 | 字符串                                       | <p>(可选，默认为<code>"KAIA</code>"）将 "peb "转换为 KAIA 的单位。 <code>数字</code>将除以所提供单位的下列分母之一： -<code>peb</code>：1'-<code>kpeb</code>：1000'-<code>Mpeb</code>：1000000'-<code>Gpeb</code>：1000000000'-<code>Ston</code>：'1000000000'-<code>uKLAY</code>：'1000000000000'-<code>mKLAY</code>：'1000000000000000'-<code>KAIA</code>：'100000000000000'-<code>kKLAY</code>：'100000000000000000'-<code>MKLAY</code>：'10000000000000000'-<code>GKLAY</code>：'10000000000000000000</p> |

**返回价值**

| 类型  | 描述     |
| --- | ------ |
| 字符串 | 字符串编号。 |

**示例**

```javascript
> caver.utils.convertFromPeb('1', 'KAIA')
'0.000000000000000001'
```

## convertToKei<a href="#tokei" id="tokei"></a>

```javascript
caver.utils.convertToKei(number [, unit])
```

将任何 KAIA 值转换为 Kei。

**注意**："kei "是 KAIA 的最小单位，您应始终使用 "kei "作为 KAIA 的单位。 转换为 "KAIA "仅供显示之用。

**参数**

| 名称 | 类型              | 说明                                                                                                                                                                          |
| -- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 数量 | 字符串 \| 数字 \| BN | 价值。                                                                                                                                                                         |
| 单位 | 字符串             | <p>(可选，默认为<code>"KAIA"</code>）要转换的 KAIA 单位。 <code>数字</code>将乘以所提供单位的下列乘数之一： -<code>kei</code>："1"-<code>Gkei</code>："1000000000"-<code>KAIA</code>："1000000000000000000</p> |

**返回价值**

| 类型  | 描述                                                                         |
| --- | -------------------------------------------------------------------------- |
| 字符串 | 如果数字参数是 [BN](https://github.com/indutny/bn.js/) 的实例，则返回一个 BN 实例，否则返回一个字符串。 |

**示例**

```javascript
> caver.utils.convertToKei('1', 'KAIA')
'1000000000000000000'

> caver.utils.convertToKei(caver.utils.toBN(1), 'KAIA')
<BN: de0b6b3a7640000>
```

## convertFromKei<a href="#convertfromkei" id="convertfromkei"></a>

```javascript
caver.utils.convertFromKei(number [, unit])
```

**注意**："kei "是 KAIA 的最小单位，您应始终使用 "kei "作为 KAIA 的单位。 转换为 "KAIA "仅供显示之用。

**参数**

| 名称    | 类型                                        | 描述                                                                                                                                                                                  |
| ----- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 数量    | string \\| number \\| BN \\| BigNumber | Kei 的价值。                                                                                                                                                                            |
| units | 字符串                                       | <p>(可选，默认为<code>"KAIA"</code>）将 "kei "转换为 "KAIA "的单位。 <code>数字</code>将除以所提供单位的下列分母之一： -<code>kei</code>：'1'-<code>Gkei</code>：'1000000000'-<code>KAIA</code>：'10000000000000000</p> |

**返回价值**

| 类型  | 描述     |
| --- | ------ |
| 字符串 | 字符串编号。 |

**示例**

```javascript
> caver.utils.convertFromKei('1', 'KAIA')
'0.000000000000000001'
```

## 单元图<a href="#unitmap" id="unitmap"></a>

```javascript
caver.utils.unitMap
```

显示所有可能的 KAIA（或 KAIA）值及其数量（单位：peb 或 kei）。

**返回价值**

| 类型 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 对象 | <p>具有以下属性：-<code>peb</code>：1'-<code>kpeb</code>：1000'-<code>Mpeb</code>：1000000'-<code>Gpeb</code>：1000000000'-<code>Ston</code>：'1000000000'-<code>uKLAY</code>：'1000000000000'-<code>mKLAY</code>：'1000000000000000'-<code>KAIA</code>：'100000000000000'-<code>kKLAY</code>：'10000000000000'-<code>MKLAY</code>：'10000000000000000'-<code>GKLAY</code>：'10000000000000000'-<code>TKLAY</code>：'1000000000000000000'-<code>kei</code>：'1'-<code>Gkei</code>：'1000000000'-<code>KAIA</code>：'1000000000000000000</p> |

**示例**

```javascript
> caver.utils.unitMap
{
  peb：'1',
  kpeb：'1000',
  Mpeb：1000000',
  Gpeb：'1000000000',
  Ston: '1000000000',
  uKLAY: '1000000000000',
  mKLAY: '1000000000000000',
  KAIA: '1000000000000000000',
  kKLAY: '1000000000000000000000',
  MKLAY: '1000000000000000000000000',
  GKLAY: '1000000000000000000000000000',
  TKLAY: '1000000000000000000000000000000',
  kei: '1',
  Gkei: '1000000000',
  KAIA: '1000000000000000000',
}
```

## klayUnit<a href="#klayunit" id="klayunit"></a>

```javascript
caver.utils.klayUnit
```

显示所有 KAIA（或 KAIA）单位。

**返回价值**

| 类型 | 描述                                                                                                                          |
| -- | --------------------------------------------------------------------------------------------------------------------------- |
| 对象 | 定义 kaia 中使用的 KAIA 单位（或 KAIA 中使用的 KAIA 单位）的对象。 每个单元都有自己的名称和 pebFactor。 pebFactor 用于将各单位当前翻译的 KAIA（或 KAIA）转换为 "peb"（或 "kei"）。 |

**示例**

```javascript
> caver.utils.klayUnit
{
    peb： { unit: 'peb', pebFactor: 0 },
    kpeb： { unit: 'kpeb', pebFactor: 3 },
    Mpeb： { unit: 'Mpeb', pebFactor: 6 },
    Gpeb： { unit: 'Gpeb', pebFactor: 9 },
    ston： { unit: 'ston', pebFactor: 9 },
    uKLAY: { unit: 'uKLAY', pebFactor: 12 },
    mKLAY: { unit: 'mKLAY', pebFactor: 15 },
    KAIA: { unit: 'KAIA', pebFactor: 18 },
    kKLAY: { unit: 'kKLAY', pebFactor: 21 },
    MKLAY: { unit: 'MKLAY', pebFactor: 24 },
    GKLAY: { unit: 'GKLAY', pebFactor: 27 },
    TKLAY: { unit: 'TKLAY', pebFactor: 30 },
    kei： { unit: 'kei', pebFactor: 0 },
    Gkei： { unit: 'Gkei', pebFactor: 9 },
    KAIA： { unit: 'KAIA', pebFactor: 18 }
}
```

## kaiaUnit<a href="#kaiaunit" id="kaiaunit"></a>

```javascript
caver.utils.kaiaUnit
```

显示所有 KAIA 设备。

**返回价值**

| 类型 | 描述                                                                                     |
| -- | -------------------------------------------------------------------------------------- |
| 对象 | 定义 KAIA 中使用的 KAIA 单位的对象。 每个单元都有自己的名称和 keiFactor。 keiFactor 用于将各单位当前翻译的 KAIA 转换为 "kei"。 |

**示例**

```javascript
> caver.utils.kaiaUnit
{
    kei： { unit: 'kei', keiFactor: 0 },
    Gkei： { unit: 'Gkei', keiFactor: 9 },
    KAIA： { unit: 'KAIA', keiFactor: 18 }
}
```

## 垫左<a href="#padleft" id="padleft"></a>

```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```

在字符串左侧添加填充。 用于为 HEX 字符串添加填充。

**参数**

| 名称   | 类型  | 描述                                       |
| ---- | --- | ---------------------------------------- |
| 字符串  | 字符串 | 在右侧添加填充的字符串。                             |
| 字符金额 | 数量  | 总字符串应该包含的字符数                             |
| sign | 字符串 | (可选）要使用的字符符号，默认为 `0`。 |

**返回价值**

| 类型  | 描述     |
| --- | ------ |
| 字符串 | 地址字符串。 |

**示例**

```javascript
> caver.utils.padLeft('0x3456ff', 20)
'0x000000000000003456ff'

> caver.utils.padLeft(0x3456ff, 20)
'0x000000000000003456ff'

> caver.utils.padLeft('Hello', 20, 'x')
'xxxxxxxxxxxxxHello'
```

## 右侧<a href="#padright" id="padright"></a>

```javascript
caver.utils.padRight(str, characterAmount [, sign])
caver.utils.rightPad(str, characterAmount [, sign]) // ALIAS
```

在字符串右侧添加填充，用于为 HEX 字符串添加填充。

**参数**

| 名称   | 类型  | 描述                                       |
| ---- | --- | ---------------------------------------- |
| 字符串  | 字符串 | 在右侧添加填充的字符串。                             |
| 字符金额 | 数量  | 字符串的总字符数。                                |
| sign | 字符串 | (可选）要使用的字符符号，默认为 `0`。 |

**返回价值**

| 类型  | 描述     |
| --- | ------ |
| 字符串 | 地址字符串。 |

**示例**

```javascript
> caver.utils.padRight('0x3456ff', 20)
'0x3456ff00000000000000'

> caver.utils.padRight(0x3456ff, 20)
'0x3456ff00000000000000'

> caver.utils.padRight('Hello', 20, 'x')
'Helloxxxxxxxxxxxxxxxxxxx'
```

## trimLeadingZero<a href="#trimleadingzero" id="trimleadingzero"></a>

```javascript
caver.utils.trimLeadingZero(hexString)
```

删除 0x 前缀十六进制字符串中的前导零。

**参数**

| 名称      | 类型  | 描述          |
| ------- | --- | ----------- |
| 十六进制字符串 | 字符串 | 要修剪的六角形字符串。 |

**返回价值**

| 类型  | 描述             |
| --- | -------------- |
| 字符串 | 不含前导零的十六进制字符串。 |

**示例**

```javascript
> caver.utils.trimLeadingZero('0x000011')
0x11
```

## makeEven<a href="#makeeven" id="makeeven"></a>

```javascript
caver.utils.makeEven(hexString)
```

返回偶数长度的字符串。

**参数**

| 名称      | 类型  | 描述              |
| ------- | --- | --------------- |
| 十六进制字符串 | 字符串 | 一个十六进制字符串，使其均匀。 |

**返回价值**

| 类型  | 描述        |
| --- | --------- |
| 字符串 | 长度均匀的字符串。 |

**示例**

```javascript
> caver.utils.makeEven('0x011')
0x0011
```

## toTwosComplement<a href="#totwoscomplement" id="totwoscomplement"></a>

```javascript
caver.utils.toTwosComplement(num)
```

将负数转换为二进制数。

**参数**

| 名称  | 类型                                | 描述      |
| --- | --------------------------------- | ------- |
| num | number \\| string \\| BigNumber | 要转换的数字。 |

**返回价值**

| 类型  | 描述           |
| --- | ------------ |
| 字符串 | 转换后的十六进制字符串。 |

**示例**

```javascript
> caver.utils.toTwosComplement('-1')
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

> caver.utils.toTwosComplement(-1)
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

> caver.utils.toTwosComplement('0x1')
'0x0000000000000000000000000000000000000000000000000000000000000001'

> caver.utils.toTwosComplement(-15)
'0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffff1'

> caver.utils.toTwosComplement('-0x1')
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
```

## isContractDeployment<a href="#iscontractdeployment" id="iscontractdeployment"></a>

```javascript
caver.utils.isContractDeployment(transactionObject)
```

如果给定交易是智能合约部署交易，则返回 `true`。 如果交易不是智能合约部署的交易，则返回 "false"。 结果由 `transactionObject` 中的参数值决定。 确保所有必选参数设置正确。

**参数**

| 名称   | 类型 | 描述                                                                                                                                                 |
| ---- | -- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 交易对象 | 对象 | 事务](./caver-transaction/caver-transaction.md#class)的实例，用于检查合同是否部署了事务。 |

**返回价值**

| 类型      | 描述                    |
| ------- | --------------------- |
| boolean | true "表示交易对象用于部署智能合约。 |

**示例**

```javascript
> caver.utils.isContractDeployment(caver.transaction.legacyTransaction.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KAIA'),
    gas: 25000,
}))
false

> caver.utils.isContractDeployment(caver.transaction.legacyTransaction.create({
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 200000,
}))
true

> caver.utils.isContractDeployment(caver.transaction.smartContractDeploy.create({
    from: '0x88e245dec96830f012f8fc1806bc623b3774560d',
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 100000,
}))
true

> caver.utils.isContractDeployment(caver.transaction.feeDelegatedSmartContractDeploy.create({
    from: '0x88e245dec96830f012f8fc1806bc623b3774560d',
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 100000,
}))
true

> caver.utils.isContractDeployment(caver.transaction.feeDelegatedSmartContractDeployWithRatio.create({
    from: '0x88e245dec96830f012f8fc1806bc623b3774560d',
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 100000,
    feeRatio: 30,
}))
true
```

## xyPointFromPublicKey<a href="#xypointfrompublickey" id="xypointfrompublickey"></a>

```javascript
caver.utils.xyPointFromPublicKey(publicKey)
```

返回给定 publicKey 的 x 和 y 坐标。 有关密钥加密的更多信息，请参阅 [椭圆曲线加密](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)。

**注意**\* 该函数不包含任何检查公钥是否有效的逻辑。 该函数只按长度将输入的 publicKey 分割成 x 和 y 点。 要验证公钥，请使用 [isValidPublicKey]（#isvalidpublickey）。

**参数**

| 名称 | 类型  | 描述               |
| -- | --- | ---------------- |
| 公钥 | 字符串 | 用于获取 x 和 y 点的公钥。 |

**返回价值**

| 类型 | 描述                                      |
| -- | --------------------------------------- |
| 数组 | 存储 x 和 y 点的数组。 索引 0 表示 x 点，索引 1 表示 y 点。 |

**示例**

```javascript
> caver.utils.xyPointFromPublicKey('0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88cb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55')
[ 
    '0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88c'、
    '0xb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55'
]
```

## isHexPrefixed<a href="#ishexprefixed" id="ishexprefixed"></a>

```javascript
caver.utils.isHexPrefixed(input)
```

如果输入是带 0x 前缀的十六进制字符串，则返回 `true`，否则返回 `false`。

**参数**

| 名称 | 类型  | 说明                      |
| -- | --- | ----------------------- |
| 输入 | 字符串 | 确定参数是否为 0x 前缀十六进制字符串的值。 |

**返回价值**

| 类型      | 描述                         |
| ------- | -------------------------- |
| boolean | true "表示输入为 0x 前缀的十六进制字符串。 |

**语法**

```javascript
> caver.utils.isHexPrefixed('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
true

> caver.utils.isHexPrefixed('0x1')
true

> caver.utils.isHexPrefixed('0xqwer')
false

> caver.utils.isHexPrefixed('1')
false
```

## addHexPrefix<a href="#addhexprefix" id="addhexprefix"></a>

```javascript
caver.utils.addHexPrefix(input)
```

返回一个 0x 前缀的十六进制字符串。 如果输入值已经是 0x 前缀或非十六进制字符串，则按原样返回。

**参数**

| 名称 | 类型  | 描述             |
| -- | --- | -------------- |
| 输入 | 字符串 | 字符串值应以 0x 为前缀。 |

**返回价值**

| 类型  | 描述                |
| --- | ----------------- |
| 字符串 | 返回 0x 前缀的十六进制字符串。 |

**示例**

```javascript
> caver.utils.addHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.addHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## stripHexPrefix<a href="#striphexprefix" id="striphexprefix"></a>

```javascript
caver.utils.stripHexPrefix(input)
```

返回从输入中去掉 0x 前缀的结果。

**注意**\* caver.klay.stripHexPrefix 从 **v1.0.1**开始支持。 要使用此功能，请安装 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 或更高版本。

**参数**

| 名称 | 类型  | 描述            |
| -- | --- | ------------- |
| 输入 | 字符串 | 字符串来删除 0x 前缀。 |

**返回价值**

| 类型  | 描述              |
| --- | --------------- |
| 字符串 | 返回一个去掉 0x 的字符串。 |

**示例**

```javascript
> caver.utils.stripHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.stripHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## 至缓冲区<a href="#tobuffer" id="tobuffer"></a>

```javascript
caver.utils.toBuffer(input)
```

该函数将输入转换为 [缓冲区](https://nodejs.org/api/buffer.html)。 要使用 `toBuffer` 将对象转换为缓冲区，对象必须实现 **toArray** 函数。 对于字符串类型的输入，该函数仅适用于**0x 前缀的十六进制字符串**。

**参数**

| 名称 | 类型                                                                           | 描述         |
| -- | ---------------------------------------------------------------------------- | ---------- |
| 输入 | Buffer \\| string \\| number \\| Array \\| BN \\| BigNumber \\| object | 要转换为缓冲区的值。 |

**注意** 自 caver-js [v1.6.4](https://www.npmjs.com/package/caver-js/v/1.6.4) 起支持`BigNumber`类型。

**返回价值**

| 类型     | 描述                 |
| ------ | ------------------ |
| Buffer | 返回转换为 Buffer 类型的值。 |

**示例**

```javascript
// Buffer
> caver.utils.toBuffer(Buffer.alloc(0))
<Buffer >

// 0x 前缀十六进制字符串
> caver.utils.toBuffer('0x1234')
<Buffer 12 34>

// 数字
> caver.utils.toBuffer(1)
<Buffer 01>

// 数组
> caver.utils.toBuffer([1,2,3]) // BN > caver.utils.toBuffer(new caver.utils.BN(255)) // 对象，实现 caver.utils.BN(255)toBuffer([1,2,3])
<Buffer 01 02 03>

// BN
> caver.utils.toBuffer(new caver.utils.BN(255))
<Buffer ff>

// 实现 toArray 函数的对象
> caver.utils.toBuffer({toArray: function() {return [1,2,3,4]}})
<Buffer 01 02 03 04>

// null or undefined
> caver.utils.toBuffer(null)
<Buffer >

> caver.utils.toBuffer(undefined)
<Buffer >

// non 0x-prefixed hex string
> caver.utils.toBuffer('0xqwer')
Error：将字符串转换为缓冲区失败。toBuffer "函数仅支持 0x 前缀的十六进制字符串

// 未实现 toArray 函数的对象
> caver.utils.toBuffer({})
错误：要将对象转换为缓冲区，必须在对象内部实现 toArray 函数
```

## numberToBuffer<a href="#numbertobuffer" id="numbertobuffer"></a>

```javascript
caver.utils.numberToBuffer(input)
```

该函数将数字转换为 [缓冲区](https://nodejs.org/api/buffer.html)。 当输入为数字时，[caver.utils.toBuffer](#tobuffer) 的行为与此函数相同。

**参数**

| 名称 | 类型                                        | 描述          |
| -- | ----------------------------------------- | ----------- |
| 输入 | string \\| number \\| BN \\| BigNumber | 要转换为缓冲区的数字。 |

**返回价值**

| 类型     | 描述                 |
| ------ | ------------------ |
| Buffer | 返回转换为 Buffer 类型的值。 |

**示例**

```javascript
> caver.utils.numberToBuffer(1)
<Buffer 01>

> caver.utils.numberToBuffer('2')
<Buffer 02>

> caver.utils.numberToBuffer('0x3')
<Buffer 03>

> caver.utils.numberToBuffer(new caver.utils.BN(4))
<Buffer 04>
```

## isValidHash<a href="#isvalidhash" id="isvalidhash"></a>

```javascript
caver.utils.isValidHash(input)
```

如果输入是 32 字节哈希格式，则返回 `true`，否则返回 `false`。

**参数**

| 名称 | 类型  | 描述                  |
| -- | --- | ------------------- |
| 输入 | 字符串 | 要检查的值是否为 32 字节哈希格式。 |

**返回价值**

| 类型      | 描述                     |
| ------- | ---------------------- |
| boolean | true "表示输入为 32 字节哈希格式。 |

**示例**

```javascript
// with '0x' hex prefix
> caver.utils.isValidHash('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// without '0x' hex prefix
> caver.utils.isValidHash('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

> caver.utils.isValidHash('0x1')
false
```

## isValidHashStrict<a href="#isvalidhashstrict" id="isvalidhashstrict"></a>

```javascript
caver.utils.isValidHashStrict(input)
```

如果输入是 0x 前缀的 32 字节哈希格式，则返回 `true`，否则返回 `false`。 该函数只查看输入内容，并判断其是否为 0x 前缀 32 字节哈希格式。 与 [caver.utils.isValidHash](#isvalidhash)的区别在于，它希望 HEX 前缀为 `0x`。

**参数**

| 名称 | 类型  | 描述                        |
| -- | --- | ------------------------- |
| 输入 | 字符串 | 要检查的值是否为 0x 前缀 32 字节哈希格式。 |

**返回价值**

| 类型      | 说明                            |
| ------- | ----------------------------- |
| boolean | true "表示输入为 0x 前缀的 32 字节哈希格式。 |

**示例**

```javascript
// with '0x' hex prefix
> caver.utils.isValidHashStrict('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// without '0x' hex prefix
> caver.utils.isValidHashStrict('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
false

> caver.utils.isValidHashStrict('0x1')
false
```

## isTxHash<a href="#istxhash" id="istxhash"></a>

```javascript
caver.utils.isTxHash(input)
```

如果输入是事务散列格式，则返回 `true`，否则返回 `false`。 该函数只查看输入，并确定输入是否为事务散列格式。

**注意**\* 该函数已被弃用。 使用 [isValidHash](#isvalidhash) 来确定有效哈希长度是否为 32 字节。

**参数**

| 名称 | 类型  | 说明               |
| -- | --- | ---------------- |
| 输入 | 字符串 | 确定参数是否为事务散列格式的值。 |

**返回价值**

| Type    | 说明                 |
| ------- | ------------------ |
| boolean | true "表示输入是事务哈希格式。 |

**示例**

```javascript
// with '0x' hex prefix
> caver.utils.isTxHash('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// without '0x' hex prefix
> caver.utils.isTxHash('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

> caver.utils.isTxHash('0x1')
false
```

## isTxHashStrict<a href="#istxhashstrict" id="istxhashstrict"></a>

```javascript
caver.utils.isTxHashStrict(input)
```

如果输入是事务散列格式，则返回 `true`，否则返回 `false`。 该函数只查看输入，并确定输入是否为事务散列格式。 与 [caver.utils.isTxHash](#istxhash)的区别在于，它希望 HEX 前缀为 `0x`。

**注意**\* 该函数已被弃用。 使用 [isValidHashStrict](#isvalidhashstrict) 来确定有效哈希长度是否为 32 字节。

**参数**

| 名称 | 类型  | 描述               |
| -- | --- | ---------------- |
| 输入 | 字符串 | 确定参数是否为事务散列格式的值。 |

**返回价值**

| 类型      | 描述                 |
| ------- | ------------------ |
| boolean | true "表示输入是事务哈希格式。 |

**示例**

```javascript
// with '0x' hex prefix
> caver.utils.isTxHashStrict('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// without '0x' hex prefix
> caver.utils.isTxHashStrict('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
false

> caver.utils.isTxHashStrict('0x1')
false
```

## isValidPrivateKey<a href="#isvalidprivatekey" id="isvalidprivatekey"></a>

```javascript
caver.utils.isValidPrivateKey(privateKey)
```

如果 `privateKey` 有效，则返回 `true`，否则返回 `false`。

**参数**

| 名称         | 类型  | 描述         |
| ---------- | --- | ---------- |
| privateKey | 字符串 | 要验证的私钥字符串。 |

**返回价值**

| 类型      | 描述            |
| ------- | ------------- |
| boolean | true "表示私钥有效。 |

**示例**

```javascript
> caver.utils.isValidPrivateKey('0x{private key}')
true

> caver.utils.isValidPrivateKey('{private key}')
true

> caver.utils.isValidPrivateKey('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
false
```

## isValidPublicKey<a href="#isvalidpublickey" id="isvalidpublickey"></a>

```javascript
caver.utils.isValidPublicKey(publicKey)
```

如果 publicKey 有效，则返回 `true`，否则返回 `false`。

**参数**

| 名称 | 类型  | 描述         |
| -- | --- | ---------- |
| 公钥 | 字符串 | 要验证的公钥字符串。 |

**返回价值**

| 类型      | 描述            |
| ------- | ------------- |
| boolean | true "表示公钥有效。 |

**示例**

```javascript
// 使用未压缩的公钥进行验证
> caver.utils.isValidPublicKey('0x02bd6405a7f14f57ecea4a6ffe774ee26d051f7eed13257c9a574055b20e42bab0e8beba92e2e675101eb2a55ba4693080d0bf14548beae7bc93b18b72d10dd350')
true

// 使用压缩公钥验证
> caver.utils.isValidPublicKey('0x02bd6405a7f14f57ecea4a6ffe774ee26d051f7eed13257c9a574055b20e42bab0')
true

> caver.utils.isValidPublicKey('{private key}')
false

> caver.utils.isValidPublicKey('0x02bd6405a7f14f57ecea4a6ffe774ee26d051f7eed13257c9a574055b20e42bab0') utils.isValidPublicKey('0x{private key}')
false

> caver.utils.isValidPublicKey('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
false
```

## isValidRole<a href="#isvalidrole" id="isvalidrole"></a>

```javascript
caver.utils.isValidRole(role)
```

如果角色有效，则返回 `true`，否则返回 `false`。 您可以通过 `caver.wallet.keyring.role` 查看 caver-js 支持的角色。

**参数**

| 名称   | 类型  | 说明         |
| ---- | --- | ---------- |
| role | 字符串 | 要验证的角色字符串。 |

**返回价值**

| 类型      | 描述            |
| ------- | ------------- |
| boolean | true "表示角色有效。 |

**示例**

```javascript
> caver.utils.isValidRole('roleTransactionKey')
true

> caver.utils.isValidRole('role')
false
```

## isValidBlockNumberCandidate<a href="#isvalidblocknumbercandidate" id="isvalidblocknumbercandidate"></a>

```javascript
caver.utils.isValidBlockNumberCandidate(input)
```

验证区块编号（或区块标记字符串）。

区块编号应为以下类型之一：

- 预定义区块编号）最新"、"最早"、"待定"、"创世纪
- 十六进制
- 有限数

**参数**

| 名称   | 类型                 | 描述                                                       |
| ---- | ------------------ | -------------------------------------------------------- |
| 区块编号 | string \\| number | 要验证的区块编号。 可以是数字类型的区块编号，也可以是区块标签（"最新"、"待定"、"最早"、"生成"）字符串。 |

**返回价值**

| 类型      | 描述                       |
| ------- | ------------------------ |
| boolean | true "表示 blockNumber 有效。 |

**示例**

```javascript
> caver.utils.isValidBlockNumberCandidate('latest')
true

> caver.utils.isValidBlockNumberCandidate('0x1')
true

> caver.utils.isValidBlockNumberCandidate(1)
true
```

## isPredefinedBlockNumber<a href="#ispredefinedblocknumber" id="ispredefinedblocknumber"></a>

```javascript
caver.utils.isPredefinedBlockNumber(input)
```

如果参数是预定义块标记，则返回 `true`。

**参数**

| 名称   | 类型  | 描述     |
| ---- | --- | ------ |
| 预定义块 | 字符串 | 预定义区块。 |

**返回价值**

| 类型      | 描述                                    |
| ------- | ------------------------------------- |
| boolean | `true` 表示 predefinedBlock 是有效的预定义块标记。 |

**示例**

```javascript
> caver.utils.isPredefinedBlockNumber('latest')
true

> caver.utils.isPredefinedBlockNumber('0x1')
false
```

## isEmptySig<a href="#isemptysig" id="isemptysig"></a>

```javascript
caver.utils.isEmptySig(sig)
```

如果 sig 是空签名格式（`签名数据 { _v: '0x01', _r: '0x', _s: '0x' }` 或 `[签名数据 { _v: '0x01', _r: '0x', _s: '0x' }]`），则返回 `true`，否则返回 `false`。

在 caver-js 中，如果签名或缴费人签名为空，属性将返回代表空签名的值`[签名数据 { _v: '0x01', _r: '0x', _s: '0x' }]`。 该函数用于检查给定签名是否为 `[签名数据 { _v: '0x01', _r: '0x', _s: '0x' }]`（或 "LEGACY "事务中的 `签名数据 { _v: '0x01', _r: '0x', _s: '0x' }`）。

**参数**

| 名称  | 类型                | 描述                                                                                                                                                                                         |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sig | object \\| Array | SignatureData](caver-wallet/keyring.md#signaturedata) 实例或 [SignatureData](caver-wallet/keyring.md#signaturedata) 数组，用于检查是否为空。 |

**返回价值**

| 类型      | 描述               |
| ------- | ---------------- |
| boolean | true "表示 sig 为空。 |

**示例**

```javascript
> caver.utils.isEmptySig(caver.wallet.keyring.signatureData.emtpySig)
true

> caver.utils.isEmptySig([caver.wallet.keyring.signatureData.emtpySig])
true
```

## isKlaytnWalletKey <a href="#isklaytnwalletkey" id="isklaytnwalletkey"></a>

```javascript
caver.utils.isKlaytnWalletKey(key)
```

如果密钥是 [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) 格式，则返回 `true`，否则返回 `false`。

**参数**

| 名称 | 类型  | 描述                               |
| -- | --- | -------------------------------- |
| 密钥 | 字符串 | 要检查是否为 KlaytnWalletKey 格式的密钥字符串。 |

**返回价值**

| 类型      | 说明                                                                                                  |
| ------- | --------------------------------------------------------------------------------------------------- |
| boolean | `true`表示密钥为 `0x{private key}0x{type}0x{address in hex}`或 `{private key}0x{type}0x{address in hex}`。 |

**示例**

```javascript
> caver.utils.isKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
true

> caver.utils.isKlaytnWalletKey('{private key}0x{type}0x{address in hex}')
true

> caver.utils.isKlaytnWalletKey('0x{private key}')
false
```

## bufferToHex<a href="#buffertohex" id="buffertohex"></a>

```javascript
caver.utils.bufferToHex(buffer)
```

将缓冲区转换为 0x 前缀的十六进制字符串。

**参数**

| 名称     | 类型     | 描述               |
| ------ | ------ | ---------------- |
| buffer | Buffer | 要转换为十六进制字符串的缓冲区。 |

**返回价值**

| 类型  | 描述             |
| --- | -------------- |
| 字符串 | 0x 前缀的十六进制字符串。 |

**示例**

```javascript
> caver.utils.bufferToHex(Buffer.from('5b9ac8', 'hex'))
'0x5b9ac8'

> caver.utils.bufferToHex(Buffer.alloc(0))
'0x'
```

## parseKlaytnWalletKey <a href="#parseklaytnwalletkey" id="parseklaytnwalletkey"></a>

```javascript
caver.utils.parseKlaytnWalletKey(key)
```

将 [KlaytnWalletKey](.../.../.../.../learn/accounts.md#klaytn-wallet-key-format) 字符串解析为包含 "私钥"、"类型"、"地址 "的数组。

**参数**

| 名称 | 类型  | 描述                                                                                                                                                                                                                                                                                                                                                       |
| -- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 密钥 | 字符串 | 一个 [KlaytnWalletKey]（.../.../.../.../learn/accounts.md#klaytn-wallet-key-format）字符串。 |

**返回价值**

| 类型 | 描述                    |
| -- | --------------------- |
| 数组 | 解析后的 KlaytnWalletKey。 |

**示例**

```javascript
> caver.utils.parseKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
[
    '0x{private key}',
    '0x00',
    '0x885ebdb17c221ef695936b18a0263d6399e14d60'
]
```

## 哈希信息<a href="#hashmessage" id="hashmessage"></a>

```javascript
caver.utils.hashMessage(message)
```

使用 kaia 特定前缀对信息进行哈希处理：`keccak256("\x19Klaytn Signed Message：\n" + len(message) + message))`

**参数**

| 名称      | 类型  | 描述                                 |
| ------- | --- | ---------------------------------- |
| message | 字符串 | 要散列的信息 如果是 HEX 字符串，将首先进行 UTF-8 解码。 |

**返回价值**

| 类型  | 描述                 |
| --- | ------------------ |
| 字符串 | 带有 kaia 特定前缀的散列信息。 |

**示例**

```javascript
> caver.utils.hashMessage('Hello')
'0x640bfab59b6e27468abd367888f4ab1a1c77aa2b45e76a1d3adcbd039c305917'
```

## 恢复<a href="#recover" id="recover"></a>

```javascript
caver.utils.recover(message, signature [, isHashed])
```

恢复用于签名给定数据的 kaia 地址。

**参数**

| 名称       | 类型                | 描述                                                                                                                                                 |
| -------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| message  | 字符串               | 信息或散列信息。                                                                                                                                           |
| 签名       | object \\| Array | 签名数据]（caver-wallet/keyring.md#signaturedata）的实例。                                                         |
| isHashed | boolean           | (可选，默认：`false`）如果最后一个参数为`true`，给定的`message`将不会自动加上前缀`"\x19Klaytn Signed Message：\n" + message.length + message` 前缀，并假定已经加了前缀。 |

**返回价值**

| 类型  | 描述                |
| --- | ----------------- |
| 字符串 | 用于签署此数据的 kaia 地址。 |

**示例**

```javascript
> caver.utils.recover('message', new caver.wallet.keyring.signatureData(['0x1b', '0x50a80...', '0x021de...'])
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('message', ['0x1b', '0x50a80...', '0x021de...'])
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('message', { v: '0x1b', r: '0x50a80...', s: '0x021de...' })
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('0xe960248437f2134a77a9aa0ebcbb6523aec095f23b02e25f16fd95e99b099daa', sig, true)
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'
```

## 恢复公钥<a href="#recoverpublickey" id="recoverpublickey"></a>

```javascript
caver.utils.recoverPublicKey(message, signature [, isHashed])
```

恢复用于签名给定数据的公开密钥。

**注意** `caver.utils.rec recoverPublicKey` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 开始支持。

**参数**

| 名称        | 类型                | 描述                                                                                                              |
| --------- | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| message   | 字符串               | 信息或散列信息。                                                                                                        |
| signature | object \\| Array | 签名数据]（caver-wallet/keyring.md#signaturedata）的实例。                      |
| isHashed  | boolean           | (可选，默认：`false`）作为参数传递的消息是否使用前缀`"\x19Klaytn Signed Message：\n" + message.length + message`。 |

**返回价值**

| 类型  | 描述          |
| --- | ----------- |
| 字符串 | 用于签署此数据的公钥。 |

**示例**

```javascript
> caver.utils.recoverPublicKey('Some Message', new caver.wallet.keyring.signatureData([
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00'、
]))
'0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3'

> caver.utils.recoverPublicKey('Some Message', [
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00'、
])
'0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3'

> caver.utils.recoverPublicKey('0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a', {
	v: '0x1b',
	r: '0x3acab5ba6f884eccfb9642018aa6debab1310d99b7a84ae9acb8f52f567cf16a',
	s：'0x3501ae03809bf93222c4683642fa8fdc36385709c70ed8e7b883b34d66a5b8a4',
},true)
'0xdd352dbe1c49aa9addaa3ca762de476a1b4deca3ac15fbb7fac153737b3ddb1e3249e1c2d86d5cbeaf6d30d366a211532683b59cb5f402bf3fe14989a378d45d'
```

## publicKeyToAddress<a href="#publickeytoaddress" id="publickeytoaddress"></a>

```javascript
caver.utils.publicKeyToAddress('0x{public key}')
```

返回从公钥导出的地址。 该函数只是通过散列将公钥字符串转换为地址形式。 这与 kaia 上的实际账户无关。

**注意** `caver.utils.publicKeyToAddress`从 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 开始支持。

**参数**

| 名称 | 类型  | 描述            |
| -- | --- | ------------- |
| 公钥 | 字符串 | 用于获取地址的公钥字符串。 |

**返回价值**

| 类型  | 描述           |
| --- | ------------ |
| 字符串 | 从公钥导出的地址字符串。 |

**示例**

```javascript
> caver.utils.publicKeyToAddress('0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3')
'0xA84A1CE657e9d5b383cECE6f4bA365e23Fa234Dd'
```

## 压缩公钥<a href="#compresspublickkey" id="compresspublickkey"></a>

```javascript
caver.utils.compressPublicKey(uncompressedPublicKey)
```

压缩未压缩的公钥。

**参数**

| 名称    | 类型  | 描述        |
| ----- | --- | --------- |
| 未压缩公钥 | 字符串 | 未压缩的公开密钥。 |

**返回价值**

| 类型  | 描述    |
| --- | ----- |
| 字符串 | 压缩公钥。 |

**示例**

```javascript
> caver.utils.compressPublicKey('0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632')
'0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248'
```

## 解压公钥<a href="#decompresspublickkey" id="decompresspublickkey"></a>

```javascript
caver.utils.decompressPublicKey(compressedPublicKey)
```

解压缩公开密钥。

**参数**

| 名称   | 类型  | 说明    |
| ---- | --- | ----- |
| 压缩公钥 | 字符串 | 压缩公钥。 |

**返回价值**

| 类型  | 描述        |
| --- | --------- |
| 字符串 | 未压缩的公开密钥。 |

**示例**

```javascript
> caver.utils.decompressPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
'0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632'
```

## isCompressedPublicKey<a href="#iscompressedpublickey" id="iscompressedpublickey"></a>

```javascript
caver.utils.isCompressedPublicKey(publicKey)
```

如果公钥已压缩，则返回 `true`，否则返回 `false`。

**参数**

| 名称 | 类型  | 描述 |
| -- | --- | -- |
| 公钥 | 字符串 | 公钥 |

**返回价值**

| 类型      | 描述          |
| ------- | ----------- |
| boolean | true "表示压缩。 |

**示例**

```javascript
> caver.utils.isCompressedPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
true
```

## 解码签名<a href="#decodesignature" id="decodesignature"></a>

```javascript
caver.utils.decodeSignature('0x{signature}')
```

解码由 "R（32 字节）+ S（32 字节）+ V（1 字节）"组成的原始签名数据。

**注意** `caver.utils.decodeSignature`从 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 开始支持。

**参数**

| 名称        | 类型  | 描述                                           |
| --------- | --- | -------------------------------------------- |
| signature | 字符串 | 要解码的签名字符串。 它由 R（32 字节）+ S（32 字节）+ V（1 字节）组成。 |

**返回价值**

| 类型 | 描述                                     |
| -- | -------------------------------------- |
| 对象 | 包括 `v`、`r` 和 `s` 的 `SignatureData` 实例。 |

**示例**

```javascript
> caver.utils.decodeSignature('0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae81b')
SignatureData {
  _v: '0x1b',
  _r: '0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258',
  _s: '0x642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae8'
}
```
