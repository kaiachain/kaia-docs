---
description: caver-js 實用 API
---

# caver.utils

`caver.utils` 提供實用功能。

## 隨機數<a href="#randomhex" id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```

randomHex](https://github.com/frozeman/randomHex)庫從給定的字節大小生成加密性強的偽隨機 HEX 字符串。

**參數：**

| 名稱 | 類型 | 描述                                                              |
| -- | -- | --------------------------------------------------------------- |
| 大小 | 數量 | HEX 字符串的字節大小，_例如_，`32`將產生一個以 "0x "為前綴、包含 64 個字符的 32 字節 HEX 字符串。 |

**返回價值**

| 類型  | 描述             |
| --- | -------------- |
| 字符串 | 生成的隨機 HEX 字符串。 |

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

## _（下劃線）<a href="#underscore" id="underscore"></a>

```javascript
caver.utils._()
```

[下劃線](http://underscorejs.org) 庫提供了許多便捷的 JavaScript 函數。

詳情請參閱 [underscore API reference](http://underscorejs.org)。

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

安全地將任何給定值（包括 [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 實例）轉換為 [BN.js](https://github.com/indutny/bn.js/) 實例，以便在 JavaScript 中處理大數字。

**參數**

| 名稱 | 類型  | 描述       |
| -- | --- | -------- |
| 數量 | 字符串 | 數字轉換成大數。 |

**返回價值**

| 類型 | 描述                                                                                                                                                         |
| -- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 對象 | BN.js](https://github.com/indutny/bn.js/) 實例。 |

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

檢查給定值是否是 [BN.js](https://github.com/indutny/bn.js/) 實例。

**參數**

| 名稱 | 類型 | 描述                                                                |
| -- | -- | ----------------------------------------------------------------- |
| bn | 對象 | 一個 [BN.js](https://github.com/indutny/bn.js/) 實例。 |

**返回價值**

| 類型      | 描述                                                                              |
| ------- | ------------------------------------------------------------------------------- |
| boolean | 如果給定值是 [BN.js](https://github.com/indutny/bn.js/) 實例，則為 `true`。 |

**示例**

```javascript
> var number = new caver.utils.BN(10)
> caver.utils.isBN(number)
true
```

## 是大數<a href="#isbignumber" id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

檢查給定值是否是 [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 實例。

**參數**

| 名稱        | 類型 | 描述                                                                            |
| --------- | -- | ----------------------------------------------------------------------------- |
| bignumber | 對象 | 一個 [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 實例。 |

**返回價值**

| 類型      | 描述                                  |
| ------- | ----------------------------------- |
| boolean | 如果給定值是 `BigNumber.js` 實例，則為 `true`。 |

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

計算輸入的 sha3 值。

**注意**：要模仿 Solidity 的 sha3 行為，請使用 [caver.utils.soliditySha3](#soliditysha3)。

**參數**

| 名稱  | 類型  | 描述       |
| --- | --- | -------- |
| str | 字符串 | 要散列的字符串。 |

**返回價值**

| 類型  | 描述      |
| --- | ------- |
| 字符串 | 結果是哈希值。 |

**示例**

```javascript
> caver.utils.sha3('234') // 取為字符串
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc966216f811ce6a79'

> caver.utils.sha3(new caver.utils.BN('234'))// utils.sha3 stringify bignumber instance.
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc966216f811ce6a79'

> caver.utils.sha3(234)
null // can't calculate the has of a number

> caver.utils.sha3(0xea).sha3(0xea) // 同上，只是數字的 HEX 表示
null

> caver.utils.sha3('0xea') // 將首先轉換為字節數組，然後進行散列
'0x2f20677459120677484f7104c76deb6846a2c071f9b3152c103bb12cd54d1a4a'
```

## soliditySha3<a href="#soliditysha3" id="soliditysha3"></a>

```javascript
caver.utils.soliditySha3(param1 [, param2, ...])
```

以與 solidity 相同的方式計算給定輸入參數的 sha3。 這意味著參數在散列之前將進行 ABI 轉換和嚴格打包。

**參數**

| 名稱  | 類型    | 描述                                                                                                                                                                                     |
| --- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 參數X | Mixed | 任何類型，或帶有 `{type: 'uint', value: '123456'}` 或 `{t: 'bytes', v: '0xfff456'}` 的對象。 <br/>基本類型自動檢測如下：<br/>- `string` 非數字 UTF-8 字符串被解釋為 `string`。<br/>- `string` 非數字 UTF-8 字符串被解釋為 `string`。 |

**返回價值**

| 類型  | 描述      |
| --- | ------- |
| 字符串 | 結果是哈希值。 |

**示例**

```javascript
> caver.utils.soliditySha3('234564535', '0xfff23243', true, -10)
// 自動檢測：uint256, bytes, bool, int256
'0x3e27a893dc40ef8a7f0841d96639de2f58a132be5ae466d40087a2cfa83b7179'

> caver.utils.soliditySha3('Hello!utils.soliditySha3('Hello!%') // auto detects: string
'0x661136a4267dba9ccdf6bfddb7c00e714de936674c4bdb065a531cf1cb15c7fc'

> caver.utils.soliditySha3('234') // 自動檢測： uint256
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
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b' // 結果同上

> caver.utils.soliditySha3({t: 'address', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b' // 同上，但如果是多例，將進行校驗和檢查

> caver.utils.soliditySha3({t: 'bytes32', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x3c69a194aaf415ba5d6afca734660d0a3d45acdc05d54cd1ca89a89e7625b4' // 結果與上面不同

> caver.utils.soliditySha3( )utils.soliditySha3({t: 'string', v: 'Hello!%'}, {t: 'int8', v:-23}, {t: 'address', v: '0x85F43D8a49eeB85d32Cf465507DD71d507100C1d'})
'0xa13b31627c1ed7aaded5aecec71baf02fe123797fffd45e662eac8e06fbe4955'
```

## isHex<a href="#ishex" id="ishex"></a>

```javascript
caver.utils.isHex(hex)
```

檢查給定字符串是否為 HEX 字符串。

**參數**

| 名稱   | 類型  | 描述           |
| ---- | --- | ------------ |
| 十六進制 | 字符串 | 給定的 HEX 字符串。 |

**返回價值**

| 類型      | 描述                         |
| ------- | -------------------------- |
| boolean | 如果給定參數是 HEX 字符串，則為 `true`。 |

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

檢查給定字符串是否為 HEX 字符串。 與 [caver.utils.isHex](#ishex)的區別在於，它希望 HEX 前綴為 `0x`。

**參數**

| 名稱   | 類型  | 描述           |
| ---- | --- | ------------ |
| 十六進制 | 字符串 | 給定的 HEX 字符串。 |

**返回價值**

| 類型      | 描述                          |
| ------- | --------------------------- |
| boolean | 如果給定字符串是 HEX 字符串，則為 `true`。 |

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

檢查給定字符串是否為有效的 kaia 地址。 如果地址中有大小寫字母，它還會檢查校驗和。

**參數**

| 名稱 | 類型  | 描述     |
| -- | --- | ------ |
| 地址 | 字符串 | 地址字符串。 |

**返回價值**

| 類型      | 描述                             |
| ------- | ------------------------------ |
| boolean | 如果給定字符串是有效的 kaia 地址，則為 `true`。 |

**示例**

```javascript
> caver.utils.isAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
true

> caver.utils.isAddress('c1912fee45d61c87cc5ea59dae31190fffff232d')
true

> caver.utils.isAddress('0XC1912FEE45D61C87CC5EA59DAE31190fffff232D') true // 因為全部為大寫，所以不會進行校驗和。isAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
true // 由於全部為大寫，將不檢查校驗和

> caver.utils.isAddress('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
true

> caver.utils.isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
false // 檢查和錯誤
```

## 至校驗和地址<a href="#tochecksumaddress" id="tochecksumaddress"></a>

```javascript
caver.utils.toChecksumAddress(address)
```

將大寫或小寫的 kaia 地址轉換為校驗和地址。

**參數**

| 名稱 | 類型  | 描述     |
| -- | --- | ------ |
| 地址 | 字符串 | 地址字符串。 |

**返回價值**

| 類型  | 說明     |
| --- | ------ |
| 字符串 | 校驗和地址。 |

**舉例**

```javascript
> caver.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'

> caver.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d' // 同上
```

## 檢查地址校驗和<a href="#checkaddresschecksum" id="checkaddresschecksum"></a>

```javascript
caver.utils.checkAddressChecksum(address)
```

檢查給定地址的校驗和。 對於非校驗和地址，也會返回 `false`。

**參數**

| 名稱 | 類型  | 描述     |
| -- | --- | ------ |
| 地址 | 字符串 | 地址字符串。 |

**返回價值**

| 類型      | 描述                                               |
| ------- | ------------------------------------------------ |
| boolean | 如果地址的校驗和有效，則為 `true`；如果不是校驗和地址或校驗和無效，則為 `false`。 |

**舉例**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')true> keyring.isDecoupled()
false
```

## 到十六進制<a href="#tohex" id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```

將任何給定值轉換為 HEX。 數字字符串將被解釋為數字。 文本字符串將被解釋為 UTF-8 字符串。

**參數**

| 名稱    | 類型                                        | 描述             |
| ----- | ----------------------------------------- | -------------- |
| mixed | string \\| number \\| BN \\| BigNumber | 要轉換為 HEX 的輸入值。 |

**返回價值**

| 類型  | 描述           |
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

## 十六進制到數字字符串<a href="#hextonumberstring" id="hextonumberstring"></a>

```javascript
caver.utils.hexToNumberString(hex)
```

以字符串形式返回給定 HEX 值的數字表示形式。

**參數**

| 名稱      | 類型  | 描述            |
| ------- | --- | ------------- |
| 十六進制字符串 | 字符串 | 要轉換的 HEX 字符串。 |

**返回價值**

| 類型  | 描述        |
| --- | --------- |
| 字符串 | 字符串形式的數字。 |

**示例**

```javascript
> caver.utils.hexToNumberString('0xea')
"234"
```

## 十六進制到數字<a href="#hextonumber" id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```

返回給定 HEX 值的數字表示形式。

**注意**：這對大數字沒有用，請使用 [caver.utils.toBN](#tobn)。

**參數**

| 名稱      | 類型  | 描述            |
| ------- | --- | ------------- |
| 十六進制字符串 | 字符串 | 要轉換的 HEX 字符串。 |

**返回價值**

| 類型 | 描述             |
| -- | -------------- |
| 數量 | 給定 HEX 值的數字表示。 |

**示例**

```javascript
> caver.utils.hexToNumber('0xea')
234
```

## numberToHex<a href="#numbertohex" id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```

返回給定數值的 HEX 表示形式。

**參數**

| 名稱 | 類型                                        | 描述        |
| -- | ----------------------------------------- | --------- |
| 數量 | string \\| number \\| BN \\| BigNumber | 數字字符串或數字。 |

**返回價值**

| 類型  | 描述           |
| --- | ------------ |
| 字符串 | 給定數字的 HEX 值。 |

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

返回給定 HEX 值的 UTF-8 字符串表示形式。

**參數**

| 名稱   | 類型  | 描述                       |
| ---- | --- | ------------------------ |
| 十六進制 | 字符串 | 要轉換為 UTF-8 字符串的 HEX 字符串。 |

**返回價值**

| 類型  | 描述         |
| --- | ---------- |
| 字符串 | UTF-8 字符串。 |

**示例**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac')
'I have 100€'
```

## 十六進制<a href="#hextoascii" id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```

返回給定 HEX 值的 ASCII 字符串表示形式。

**參數**

| 名稱   | 類型  | 描述                       |
| ---- | --- | ------------------------ |
| 十六進制 | 字符串 | 要轉換為 ASCII 字符串的 HEX 字符串。 |

**返回價值**

| 類型  | 描述         |
| --- | ---------- |
| 字符串 | ASCII 字符串。 |

**示例**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021')
'我有 100 個！'
```

## utf8ToHex<a href="#utf8tohex" id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(str)
caver.utils.stringToHex(str) // ALIAS
```

返回給定 UTF-8 字符串的 HEX 表示形式。

**參數**

| 名稱  | 類型  | 描述                       |
| --- | --- | ------------------------ |
| 字符串 | 字符串 | 要轉換為 HEX 字符串的 UTF-8 字符串。 |

**返回價值**

| 類型  | 描述       |
| --- | -------- |
| 字符串 | 十六進制字符串。 |

**示例**

```javascript
> caver.utils.utf8ToHex('I have 100€')
'0x49206861766520313030e282ac'
```

## asciiToHex<a href="#asciitohex" id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(str)
```

返回給定 ASCII 字符串的 HEX 表示形式。

**參數**

| 名稱  | 類型  | 描述                       |
| --- | --- | ------------------------ |
| str | 字符串 | 要轉換為 HEX 字符串的 ASCII 字符串。 |

**返回價值**

| 類型  | 描述       |
| --- | -------- |
| 字符串 | 十六進制字符串。 |

**示例**

```javascript
> caver.utils.asciiToHex('I have 100!')
'0x4920686176652031303021'
```

## 十六進制到字節<a href="#hextobytes" id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```

根據給定的 HEX 字符串返回字節數組。

**參數**

| 名稱   | 類型  | 描述            |
| ---- | --- | ------------- |
| 十六進制 | 字符串 | 要轉換的 HEX 字符串。 |

**返回價值**

| 類型 | 描述    |
| -- | ----- |
| 數組 | 字節數組。 |

**示例**

```javascript
> caver.utils.hexToBytes('0x000000ea')
[ 0, 0, 0, 234 ]
```

## 字節到十六進制<a href="#bytestohex" id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```

從字節數組返回 HEX 字符串。

**參數**

| 名稱   | 類型 | 描述        |
| ---- | -- | --------- |
| 字節數組 | 數組 | 要轉換的字節數組。 |

**返回價值**

| 類型  | 描述       |
| --- | -------- |
| 字符串 | 十六進制字符串。 |

**示例**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ])
'0x48656c6c6f2124'
```

## convertToPeb<a href="#topeb" id="topeb"></a>

```javascript
caver.utils.convertToPeb(number [, unit])
```

將任何 KAIA 值轉換為 peb。

**注意**："peb "是最小的 KAIA 單位，您應始終使用 "peb "作為 KAIA 單位。 轉換為 "KAIA "僅供顯示之用。

**參數**

| 名稱    | 類型              | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 數量    | 字符串 \| 數字 \| BN | 價值。                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| units | 字符串             | <p>(可選，默認為<code>"KAIA"</code>）要轉換的 KAIA 單位。 <code>數字</code>將乘以所提供單位的下列乘數之一： -<code>peb</code>：1'-<code>kpeb</code>：1000'-<code>Mpeb</code>：1000000'-<code>Gpeb</code>：1000000000'-<code>Ston</code>：'1000000000'-<code>uKLAY</code>：'1000000000000'-<code>mKLAY</code>：'1000000000000000'-<code>KAIA</code>：'100000000000000'-<code>kKLAY</code>：'100000000000000000'-<code>MKLAY</code>：'10000000000000000'-<code>GKLAY</code>：'10000000000000000000</p> |

**返回價值**

| 類型  | 描述                                                                         |
| --- | -------------------------------------------------------------------------- |
| 字符串 | 如果數字參數是 [BN](https://github.com/indutny/bn.js/) 的實例，則返回一個 BN 實例，否則返回一個字符串。 |

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

**注意**："peb "是最小的 KAIA 單位，您應始終使用 "peb "作為 KAIA 單位。 轉換為 "KAIA "僅供顯示之用。

**參數**

| 名稱 | 類型                                        | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 數量 | string \\| number \\| BN \\| BigNumber | 數值以 peb.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 單位 | 字符串                                       | <p>(可選，默認為<code>"KAIA</code>"）將 "peb "轉換為 KAIA 的單位。 <code>數字</code>將除以所提供單位的下列分母之一： -<code>peb</code>：1'-<code>kpeb</code>：1000'-<code>Mpeb</code>：1000000'-<code>Gpeb</code>：1000000000'-<code>Ston</code>：'1000000000'-<code>uKLAY</code>：'1000000000000'-<code>mKLAY</code>：'1000000000000000'-<code>KAIA</code>：'100000000000000'-<code>kKLAY</code>：'100000000000000000'-<code>MKLAY</code>：'10000000000000000'-<code>GKLAY</code>：'10000000000000000000</p> |

**返回價值**

| 類型  | 描述     |
| --- | ------ |
| 字符串 | 字符串編號。 |

**示例**

```javascript
> caver.utils.convertFromPeb('1', 'KAIA')
'0.000000000000000001'
```

## convertToKei<a href="#tokei" id="tokei"></a>

```javascript
caver.utils.convertToKei(number [, unit])
```

將任何 KAIA 值轉換為 Kei。

**注意**："kei "是 KAIA 的最小單位，您應始終使用 "kei "作為 KAIA 的單位。 轉換為 "KAIA "僅供顯示之用。

**參數**

| 名稱 | 類型              | 說明                                                                                                                                                                          |
| -- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 數量 | 字符串 \| 數字 \| BN | 價值。                                                                                                                                                                         |
| 單位 | 字符串             | <p>(可選，默認為<code>"KAIA"</code>）要轉換的 KAIA 單位。 <code>數字</code>將乘以所提供單位的下列乘數之一： -<code>kei</code>："1"-<code>Gkei</code>："1000000000"-<code>KAIA</code>："1000000000000000000</p> |

**返回價值**

| 類型  | 描述                                                                         |
| --- | -------------------------------------------------------------------------- |
| 字符串 | 如果數字參數是 [BN](https://github.com/indutny/bn.js/) 的實例，則返回一個 BN 實例，否則返回一個字符串。 |

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

**注意**："kei "是 KAIA 的最小單位，您應始終使用 "kei "作為 KAIA 的單位。 轉換為 "KAIA "僅供顯示之用。

**參數**

| 名稱    | 類型                                        | 描述                                                                                                                                                                                  |
| ----- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 數量    | string \\| number \\| BN \\| BigNumber | Kei 的價值。                                                                                                                                                                            |
| units | 字符串                                       | <p>(可選，默認為<code>"KAIA"</code>）將 "kei "轉換為 "KAIA "的單位。 <code>數字</code>將除以所提供單位的下列分母之一： -<code>kei</code>：'1'-<code>Gkei</code>：'1000000000'-<code>KAIA</code>：'10000000000000000</p> |

**返回價值**

| 類型  | 描述     |
| --- | ------ |
| 字符串 | 字符串編號。 |

**示例**

```javascript
> caver.utils.convertFromKei('1', 'KAIA')
'0.000000000000000001'
```

## 單元圖<a href="#unitmap" id="unitmap"></a>

```javascript
caver.utils.unitMap
```

顯示所有可能的 KAIA（或 KAIA）值及其數量（單位：peb 或 kei）。

**返回價值**

| 類型 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 對象 | <p>具有以下屬性：-<code>peb</code>：1'-<code>kpeb</code>：1000'-<code>Mpeb</code>：1000000'-<code>Gpeb</code>：1000000000'-<code>Ston</code>：'1000000000'-<code>uKLAY</code>：'1000000000000'-<code>mKLAY</code>：'1000000000000000'-<code>KAIA</code>：'100000000000000'-<code>kKLAY</code>：'10000000000000'-<code>MKLAY</code>：'10000000000000000'-<code>GKLAY</code>：'10000000000000000'-<code>TKLAY</code>：'1000000000000000000'-<code>kei</code>：'1'-<code>Gkei</code>：'1000000000'-<code>KAIA</code>：'1000000000000000000</p> |

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

顯示所有 KAIA（或 KAIA）單位。

**返回價值**

| 類型 | 描述                                                                                                                          |
| -- | --------------------------------------------------------------------------------------------------------------------------- |
| 對象 | 定義 kaia 中使用的 KAIA 單位（或 KAIA 中使用的 KAIA 單位）的對象。 每個單元都有自己的名稱和 pebFactor。 pebFactor 用於將各單位當前翻譯的 KAIA（或 KAIA）轉換為 "peb"（或 "kei"）。 |

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

顯示所有 KAIA 設備。

**返回價值**

| 類型 | 描述                                                                                     |
| -- | -------------------------------------------------------------------------------------- |
| 對象 | 定義 KAIA 中使用的 KAIA 單位的對象。 每個單元都有自己的名稱和 keiFactor。 keiFactor 用於將各單位當前翻譯的 KAIA 轉換為 "kei"。 |

**示例**

```javascript
> caver.utils.kaiaUnit
{
    kei： { unit: 'kei', keiFactor: 0 },
    Gkei： { unit: 'Gkei', keiFactor: 9 },
    KAIA： { unit: 'KAIA', keiFactor: 18 }
}
```

## 墊左<a href="#padleft" id="padleft"></a>

```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```

在字符串左側添加填充。 用於為 HEX 字符串添加填充。

**參數**

| 名稱   | 類型  | 描述                                       |
| ---- | --- | ---------------------------------------- |
| 字符串  | 字符串 | 在右側添加填充的字符串。                             |
| 字符金額 | 數量  | 總字符串應該包含的字符數                             |
| sign | 字符串 | (可選）要使用的字符符號，默認為 `0`。 |

**返回價值**

| 類型  | 描述     |
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

## 右側<a href="#padright" id="padright"></a>

```javascript
caver.utils.padRight(str, characterAmount [, sign])
caver.utils.rightPad(str, characterAmount [, sign]) // ALIAS
```

在字符串右側添加填充，用於為 HEX 字符串添加填充。

**參數**

| 名稱   | 類型  | 描述                                       |
| ---- | --- | ---------------------------------------- |
| 字符串  | 字符串 | 在右側添加填充的字符串。                             |
| 字符金額 | 數量  | 字符串的總字符數。                                |
| sign | 字符串 | (可選）要使用的字符符號，默認為 `0`。 |

**返回價值**

| 類型  | 描述     |
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

刪除 0x 前綴十六進制字符串中的前導零。

**參數**

| 名稱      | 類型  | 描述          |
| ------- | --- | ----------- |
| 十六進制字符串 | 字符串 | 要修剪的六角形字符串。 |

**返回價值**

| 類型  | 描述             |
| --- | -------------- |
| 字符串 | 不含前導零的十六進制字符串。 |

**示例**

```javascript
> caver.utils.trimLeadingZero('0x000011')
0x11
```

## makeEven<a href="#makeeven" id="makeeven"></a>

```javascript
caver.utils.makeEven(hexString)
```

返回偶數長度的字符串。

**參數**

| 名稱      | 類型  | 描述              |
| ------- | --- | --------------- |
| 十六進制字符串 | 字符串 | 一個十六進制字符串，使其均勻。 |

**返回價值**

| 類型  | 描述        |
| --- | --------- |
| 字符串 | 長度均勻的字符串。 |

**示例**

```javascript
> caver.utils.makeEven('0x011')
0x0011
```

## toTwosComplement<a href="#totwoscomplement" id="totwoscomplement"></a>

```javascript
caver.utils.toTwosComplement(num)
```

將負數轉換為二進制數。

**參數**

| 名稱  | 類型                                | 描述      |
| --- | --------------------------------- | ------- |
| num | number \\| string \\| BigNumber | 要轉換的數字。 |

**返回價值**

| 類型  | 描述           |
| --- | ------------ |
| 字符串 | 轉換後的十六進制字符串。 |

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

如果給定交易是智能合約部署交易，則返回 `true`。 如果交易不是智能合約部署的交易，則返回 "false"。 結果由 `transactionObject` 中的參數值決定。 確保所有必選參數設置正確。

**參數**

| 名稱   | 類型 | 描述                                                                                                                                                 |
| ---- | -- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 交易對象 | 對象 | 事務](./caver-transaction/caver-transaction.md#class)的實例，用於檢查合同是否部署了事務。 |

**返回價值**

| 類型      | 描述                    |
| ------- | --------------------- |
| boolean | true "表示交易對象用於部署智能合約。 |

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

返回給定 publicKey 的 x 和 y 座標。 有關密鑰加密的更多信息，請參閱 [橢圓曲線加密](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)。

**注意**\* 該函數不包含任何檢查公鑰是否有效的邏輯。 該函數只按長度將輸入的 publicKey 分割成 x 和 y 點。 要驗證公鑰，請使用 [isValidPublicKey]（#isvalidpublickey）。

**參數**

| 名稱 | 類型  | 描述               |
| -- | --- | ---------------- |
| 公鑰 | 字符串 | 用於獲取 x 和 y 點的公鑰。 |

**返回價值**

| 類型 | 描述                                      |
| -- | --------------------------------------- |
| 數組 | 存儲 x 和 y 點的數組。 索引 0 表示 x 點，索引 1 表示 y 點。 |

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

如果輸入是帶 0x 前綴的十六進制字符串，則返回 `true`，否則返回 `false`。

**參數**

| 名稱 | 類型  | 說明                      |
| -- | --- | ----------------------- |
| 輸入 | 字符串 | 確定參數是否為 0x 前綴十六進制字符串的值。 |

**返回價值**

| 類型      | 描述                         |
| ------- | -------------------------- |
| boolean | true "表示輸入為 0x 前綴的十六進制字符串。 |

**語法**

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

返回一個 0x 前綴的十六進制字符串。 如果輸入值已經是 0x 前綴或非十六進制字符串，則按原樣返回。

**參數**

| 名稱 | 類型  | 描述             |
| -- | --- | -------------- |
| 輸入 | 字符串 | 字符串值應以 0x 為前綴。 |

**返回價值**

| 類型  | 描述                |
| --- | ----------------- |
| 字符串 | 返回 0x 前綴的十六進制字符串。 |

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

返回從輸入中去掉 0x 前綴的結果。

**注意**\* caver.klay.stripHexPrefix 從 **v1.0.1**開始支持。 要使用此功能，請安裝 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 或更高版本。

**參數**

| 名稱 | 類型  | 描述            |
| -- | --- | ------------- |
| 輸入 | 字符串 | 字符串來刪除 0x 前綴。 |

**返回價值**

| 類型  | 描述              |
| --- | --------------- |
| 字符串 | 返回一個去掉 0x 的字符串。 |

**示例**

```javascript
> caver.utils.stripHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.stripHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## 至緩衝區<a href="#tobuffer" id="tobuffer"></a>

```javascript
caver.utils.toBuffer(input)
```

該函數將輸入轉換為 [緩衝區](https://nodejs.org/api/buffer.html)。 要使用 `toBuffer` 將對象轉換為緩衝區，對象必須實現 **toArray** 函數。 對於字符串類型的輸入，該函數僅適用於**0x 前綴的十六進制字符串**。

**參數**

| 名稱 | 類型                                                                           | 描述         |
| -- | ---------------------------------------------------------------------------- | ---------- |
| 輸入 | Buffer \\| string \\| number \\| Array \\| BN \\| BigNumber \\| object | 要轉換為緩衝區的值。 |

**注意** 自 caver-js [v1.6.4](https://www.npmjs.com/package/caver-js/v/1.6.4) 起支持`BigNumber`類型。

**返回價值**

| 類型     | 描述                 |
| ------ | ------------------ |
| Buffer | 返回轉換為 Buffer 類型的值。 |

**示例**

```javascript
// Buffer
> caver.utils.toBuffer(Buffer.alloc(0))
<Buffer >

// 0x 前綴十六進制字符串
> caver.utils.toBuffer('0x1234')
<Buffer 12 34>

// 數字
> caver.utils.toBuffer(1)
<Buffer 01>

// 數組
> caver.utils.toBuffer([1,2,3]) // BN > caver.utils.toBuffer(new caver.utils.BN(255)) // 對象，實現 caver.utils.BN(255)toBuffer([1,2,3])
<Buffer 01 02 03>

// BN
> caver.utils.toBuffer(new caver.utils.BN(255))
<Buffer ff>

// 實現 toArray 函數的對象
> caver.utils.toBuffer({toArray: function() {return [1,2,3,4]}})
<Buffer 01 02 03 04>

// null or undefined
> caver.utils.toBuffer(null)
<Buffer >

> caver.utils.toBuffer(undefined)
<Buffer >

// non 0x-prefixed hex string
> caver.utils.toBuffer('0xqwer')
Error：將字符串轉換為緩衝區失敗。toBuffer "函數僅支持 0x 前綴的十六進制字符串

// 未實現 toArray 函數的對象
> caver.utils.toBuffer({})
錯誤：要將對象轉換為緩衝區，必須在對象內部實現 toArray 函數
```

## numberToBuffer<a href="#numbertobuffer" id="numbertobuffer"></a>

```javascript
caver.utils.numberToBuffer(input)
```

該函數將數字轉換為 [緩衝區](https://nodejs.org/api/buffer.html)。 當輸入為數字時，[caver.utils.toBuffer](#tobuffer) 的行為與此函數相同。

**參數**

| 名稱 | 類型                                        | 描述          |
| -- | ----------------------------------------- | ----------- |
| 輸入 | string \\| number \\| BN \\| BigNumber | 要轉換為緩衝區的數字。 |

**返回價值**

| 類型     | 描述                 |
| ------ | ------------------ |
| Buffer | 返回轉換為 Buffer 類型的值。 |

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

如果輸入是 32 字節哈希格式，則返回 `true`，否則返回 `false`。

**參數**

| 名稱 | 類型  | 描述                  |
| -- | --- | ------------------- |
| 輸入 | 字符串 | 要檢查的值是否為 32 字節哈希格式。 |

**返回價值**

| 類型      | 描述                     |
| ------- | ---------------------- |
| boolean | true "表示輸入為 32 字節哈希格式。 |

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

如果輸入是 0x 前綴的 32 字節哈希格式，則返回 `true`，否則返回 `false`。 該函數只查看輸入內容，並判斷其是否為 0x 前綴 32 字節哈希格式。 與 [caver.utils.isValidHash](#isvalidhash)的區別在於，它希望 HEX 前綴為 `0x`。

**參數**

| 名稱 | 類型  | 描述                        |
| -- | --- | ------------------------- |
| 輸入 | 字符串 | 要檢查的值是否為 0x 前綴 32 字節哈希格式。 |

**返回價值**

| 類型      | 說明                            |
| ------- | ----------------------------- |
| boolean | true "表示輸入為 0x 前綴的 32 字節哈希格式。 |

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

如果輸入是事務散列格式，則返回 `true`，否則返回 `false`。 該函數只查看輸入，並確定輸入是否為事務散列格式。

**注意**\* 該函數已被棄用。 使用 [isValidHash](#isvalidhash) 來確定有效哈希長度是否為 32 字節。

**參數**

| 名稱 | 類型  | 說明               |
| -- | --- | ---------------- |
| 輸入 | 字符串 | 確定參數是否為事務散列格式的值。 |

**返回價值**

| Type    | 說明                 |
| ------- | ------------------ |
| boolean | true "表示輸入是事務哈希格式。 |

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

如果輸入是事務散列格式，則返回 `true`，否則返回 `false`。 該函數只查看輸入，並確定輸入是否為事務散列格式。 與 [caver.utils.isTxHash](#istxhash)的區別在於，它希望 HEX 前綴為 `0x`。

**注意**\* 該函數已被棄用。 使用 [isValidHashStrict](#isvalidhashstrict) 來確定有效哈希長度是否為 32 字節。

**參數**

| 名稱 | 類型  | 描述               |
| -- | --- | ---------------- |
| 輸入 | 字符串 | 確定參數是否為事務散列格式的值。 |

**返回價值**

| 類型      | 描述                 |
| ------- | ------------------ |
| boolean | true "表示輸入是事務哈希格式。 |

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

如果 `privateKey` 有效，則返回 `true`，否則返回 `false`。

**參數**

| 名稱         | 類型  | 描述         |
| ---------- | --- | ---------- |
| privateKey | 字符串 | 要驗證的私鑰字符串。 |

**返回價值**

| 類型      | 描述            |
| ------- | ------------- |
| boolean | true "表示私鑰有效。 |

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

如果 publicKey 有效，則返回 `true`，否則返回 `false`。

**參數**

| 名稱 | 類型  | 描述         |
| -- | --- | ---------- |
| 公鑰 | 字符串 | 要驗證的公鑰字符串。 |

**返回價值**

| 類型      | 描述            |
| ------- | ------------- |
| boolean | true "表示公鑰有效。 |

**示例**

```javascript
// 使用未壓縮的公鑰進行驗證
> caver.utils.isValidPublicKey('0x02bd6405a7f14f57ecea4a6ffe774ee26d051f7eed13257c9a574055b20e42bab0e8beba92e2e675101eb2a55ba4693080d0bf14548beae7bc93b18b72d10dd350')
true

// 使用壓縮公鑰驗證
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

如果角色有效，則返回 `true`，否則返回 `false`。 您可以通過 `caver.wallet.keyring.role` 查看 caver-js 支持的角色。

**參數**

| 名稱   | 類型  | 說明         |
| ---- | --- | ---------- |
| role | 字符串 | 要驗證的角色字符串。 |

**返回價值**

| 類型      | 描述            |
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

驗證區塊編號（或區塊標記字符串）。

區塊編號應為以下類型之一：

- 預定義區塊編號）最新"、"最早"、"待定"、"創世紀
- 十六進制
- 有限數

**參數**

| 名稱   | 類型                 | 描述                                                       |
| ---- | ------------------ | -------------------------------------------------------- |
| 區塊編號 | string \\| number | 要驗證的區塊編號。 可以是數字類型的區塊編號，也可以是區塊標籤（"最新"、"待定"、"最早"、"生成"）字符串。 |

**返回價值**

| 類型      | 描述                       |
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

如果參數是預定義塊標記，則返回 `true`。

**參數**

| 名稱   | 類型  | 描述     |
| ---- | --- | ------ |
| 預定義塊 | 字符串 | 預定義區塊。 |

**返回價值**

| 類型      | 描述                                    |
| ------- | ------------------------------------- |
| boolean | `true` 表示 predefinedBlock 是有效的預定義塊標記。 |

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

如果 sig 是空簽名格式（`簽名數據 { _v: '0x01', _r: '0x', _s: '0x' }` 或 `[簽名數據 { _v: '0x01', _r: '0x', _s: '0x' }]`），則返回 `true`，否則返回 `false`。

在 caver-js 中，如果簽名或繳費人簽名為空，屬性將返回代表空簽名的值`[簽名數據 { _v: '0x01', _r: '0x', _s: '0x' }]`。 該函數用於檢查給定簽名是否為 `[簽名數據 { _v: '0x01', _r: '0x', _s: '0x' }]`（或 "LEGACY "事務中的 `簽名數據 { _v: '0x01', _r: '0x', _s: '0x' }`）。

**參數**

| 名稱  | 類型                | 描述                                                                                                                                                                                         |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sig | object \\| Array | SignatureData](caver-wallet/keyring.md#signaturedata) 實例或 [SignatureData](caver-wallet/keyring.md#signaturedata) 數組，用於檢查是否為空。 |

**返回價值**

| 類型      | 描述               |
| ------- | ---------------- |
| boolean | true "表示 sig 為空。 |

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

如果密鑰是 [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) 格式，則返回 `true`，否則返回 `false`。

**參數**

| 名稱 | 類型  | 描述                               |
| -- | --- | -------------------------------- |
| 密鑰 | 字符串 | 要檢查是否為 KlaytnWalletKey 格式的密鑰字符串。 |

**返回價值**

| 類型      | 說明                                                                                                  |
| ------- | --------------------------------------------------------------------------------------------------- |
| boolean | `true`表示密鑰為 `0x{private key}0x{type}0x{address in hex}`或 `{private key}0x{type}0x{address in hex}`。 |

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

將緩衝區轉換為 0x 前綴的十六進制字符串。

**參數**

| 名稱     | 類型     | 描述               |
| ------ | ------ | ---------------- |
| buffer | Buffer | 要轉換為十六進制字符串的緩衝區。 |

**返回價值**

| 類型  | 描述             |
| --- | -------------- |
| 字符串 | 0x 前綴的十六進制字符串。 |

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

將 [KlaytnWalletKey](.../.../.../.../learn/accounts.md#klaytn-wallet-key-format) 字符串解析為包含 "私鑰"、"類型"、"地址 "的數組。

**參數**

| 名稱 | 類型  | 描述                                                                                                                                                                                                                                                                                                                                                       |
| -- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 密鑰 | 字符串 | 一個 [KlaytnWalletKey]（.../.../.../.../learn/accounts.md#klaytn-wallet-key-format）字符串。 |

**返回價值**

| 類型 | 描述                    |
| -- | --------------------- |
| 數組 | 解析後的 KlaytnWalletKey。 |

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

使用 kaia 特定前綴對信息進行哈希處理：`keccak256("\x19Klaytn Signed Message：\n" + len(message) + message))`

**參數**

| 名稱      | 類型  | 描述                                 |
| ------- | --- | ---------------------------------- |
| message | 字符串 | 要散列的信息 如果是 HEX 字符串，將首先進行 UTF-8 解碼。 |

**返回價值**

| 類型  | 描述                 |
| --- | ------------------ |
| 字符串 | 帶有 kaia 特定前綴的散列信息。 |

**示例**

```javascript
> caver.utils.hashMessage('Hello')
'0x640bfab59b6e27468abd367888f4ab1a1c77aa2b45e76a1d3adcbd039c305917'
```

## 恢復<a href="#recover" id="recover"></a>

```javascript
caver.utils.recover(message, signature [, isHashed])
```

恢復用於簽名給定數據的 kaia 地址。

**參數**

| 名稱       | 類型                | 描述                                                                                                                                                 |
| -------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| message  | 字符串               | 信息或散列信息。                                                                                                                                           |
| 簽名       | object \\| Array | 簽名數據]（caver-wallet/keyring.md#signaturedata）的實例。                                                         |
| isHashed | boolean           | (可選，默認：`false`）如果最後一個參數為`true`，給定的`message`將不會自動加上前綴`"\x19Klaytn Signed Message：\n" + message.length + message` 前綴，並假定已經加了前綴。 |

**返回價值**

| 類型  | 描述                |
| --- | ----------------- |
| 字符串 | 用於簽署此數據的 kaia 地址。 |

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

## 恢復公鑰<a href="#recoverpublickey" id="recoverpublickey"></a>

```javascript
caver.utils.recoverPublicKey(message, signature [, isHashed])
```

恢復用於簽名給定數據的公開密鑰。

**注意** `caver.utils.rec recoverPublicKey` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱        | 類型                | 描述                                                                                                              |
| --------- | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| message   | 字符串               | 信息或散列信息。                                                                                                        |
| signature | object \\| Array | 簽名數據]（caver-wallet/keyring.md#signaturedata）的實例。                      |
| isHashed  | boolean           | (可選，默認：`false`）作為參數傳遞的消息是否使用前綴`"\x19Klaytn Signed Message：\n" + message.length + message`。 |

**返回價值**

| 類型  | 描述          |
| --- | ----------- |
| 字符串 | 用於簽署此數據的公鑰。 |

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

返回從公鑰導出的地址。 該函數只是通過散列將公鑰字符串轉換為地址形式。 這與 kaia 上的實際賬戶無關。

**注意** `caver.utils.publicKeyToAddress`從 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱 | 類型  | 描述            |
| -- | --- | ------------- |
| 公鑰 | 字符串 | 用於獲取地址的公鑰字符串。 |

**返回價值**

| 類型  | 描述           |
| --- | ------------ |
| 字符串 | 從公鑰導出的地址字符串。 |

**示例**

```javascript
> caver.utils.publicKeyToAddress('0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3')
'0xA84A1CE657e9d5b383cECE6f4bA365e23Fa234Dd'
```

## 壓縮公鑰<a href="#compresspublickkey" id="compresspublickkey"></a>

```javascript
caver.utils.compressPublicKey(uncompressedPublicKey)
```

壓縮未壓縮的公鑰。

**參數**

| 名稱    | 類型  | 描述        |
| ----- | --- | --------- |
| 未壓縮公鑰 | 字符串 | 未壓縮的公開密鑰。 |

**返回價值**

| 類型  | 描述    |
| --- | ----- |
| 字符串 | 壓縮公鑰。 |

**示例**

```javascript
> caver.utils.compressPublicKey('0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632')
'0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248'
```

## 解壓公鑰<a href="#decompresspublickkey" id="decompresspublickkey"></a>

```javascript
caver.utils.decompressPublicKey(compressedPublicKey)
```

解壓縮公開密鑰。

**參數**

| 名稱   | 類型  | 說明    |
| ---- | --- | ----- |
| 壓縮公鑰 | 字符串 | 壓縮公鑰。 |

**返回價值**

| 類型  | 描述        |
| --- | --------- |
| 字符串 | 未壓縮的公開密鑰。 |

**示例**

```javascript
> caver.utils.decompressPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
'0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632'
```

## isCompressedPublicKey<a href="#iscompressedpublickey" id="iscompressedpublickey"></a>

```javascript
caver.utils.isCompressedPublicKey(publicKey)
```

如果公鑰已壓縮，則返回 `true`，否則返回 `false`。

**參數**

| 名稱 | 類型  | 描述 |
| -- | --- | -- |
| 公鑰 | 字符串 | 公鑰 |

**返回價值**

| 類型      | 描述          |
| ------- | ----------- |
| boolean | true "表示壓縮。 |

**示例**

```javascript
> caver.utils.isCompressedPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
true
```

## 解碼簽名<a href="#decodesignature" id="decodesignature"></a>

```javascript
caver.utils.decodeSignature('0x{signature}')
```

解碼由 "R（32 字節）+ S（32 字節）+ V（1 字節）"組成的原始簽名數據。

**注意** `caver.utils.decodeSignature`從 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱        | 類型  | 描述                                           |
| --------- | --- | -------------------------------------------- |
| signature | 字符串 | 要解碼的簽名字符串。 它由 R（32 字節）+ S（32 字節）+ V（1 字節）組成。 |

**返回價值**

| 類型 | 描述                                     |
| -- | -------------------------------------- |
| 對象 | 包括 `v`、`r` 和 `s` 的 `SignatureData` 實例。 |

**示例**

```javascript
> caver.utils.decodeSignature('0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae81b')
SignatureData {
  _v: '0x1b',
  _r: '0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258',
  _s: '0x642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae8'
}
```
