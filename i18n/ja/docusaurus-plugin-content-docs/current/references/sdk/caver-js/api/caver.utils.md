---
description: caver-jsユーティリティAPI。
---

# ケイバーユーティル

`caver.utils` はユーティリティ関数を提供する。

## ランダムヘクス<a href="#randomhex" id="randomhex"></a>

```javascript
caver.utils.randomHex(サイズ)
```

randomHex](https://github.com/frozeman/randomHex) は、与えられたバイトサイズから暗号的に強力な擬似ランダムHEX文字列を生成するライブラリです。

**パラメーター**

| 名称  | タイプ | 説明                                                                                               |
| --- | --- | ------------------------------------------------------------------------------------------------ |
| サイズ | 番号  | HEX文字列のバイトサイズは、_e._., `32` とすると、"0x "を先頭に持つ64文字の32バイトのHEX文字列になる。 |

**リターン・バリュー**

| タイプ   | 説明                |
| ----- | ----------------- |
| ストリング | 生成されたランダムなHEX文字列。 |

**例**

```javascript
> caver.utils.randomHex(32)
'0x861b56754dba7769f9740c3ad70b4694aa24d604c1dba3bac7ec45978927b8de'

> caver.utils.randomHex(4)
'0x5641d6ce'

> caver.utils.randomHex(2)
'0xf058'

> caver.utils.randomHex(1)
'0x7c'

> caver.utils.randomHex(0)
'0x'
```

## アンダースコア<a href="#underscore" id="underscore"></a>

```javascript
caver.utils._()
```

アンダースコア](http://underscorejs.org) ライブラリには、便利なJavaScript関数がたくさんあります。

詳しくは[underscore API reference](http://underscorejs.org)を参照。

**例**

```javascript
> var _ = caver.utils._

> _.union([1,2],[3])
[1,2,3]

> _.each({my: 'object'}, function(value, key){ ... })
...
```

## toBN<a href="#tobn" id="tobn"></a>

```javascript
caver.utils.toBN(number)
```

JavaScriptで大きな数を扱うために、与えられた値（[BigNumber.js](http://mikemcl.github.io/bignumber.js/) インスタンスを含む）を [BN.js](https://github.com/indutny/bn.js/) インスタンスに安全に変換します。

**パラメーター**

| 名称 | タイプ         | 説明           |
| -- | ----------- | ------------ |
| 番号 | number \\ | を大きな数字に変換する。 |

**リターン・バリュー**

| タイプ | 説明                                                                                                                                                             |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 対象  | BN.js](https://github.com/indutny/bn.js/)のインスタンス。 |

**例**

```javascript
>
'1234'

> caver.utils.toBN('1234').add(caver.utils.toBN('1')).toString()
'1235'

> caver.utils.toBN('0xea').toString()
'234'
```

## イズビーエヌ<a href="#isbn" id="isbn"></a>

```javascript
caver.utils.isBN(bn)
```

与えられた値が[BN.js](https://github.com/indutny/bn.js/)のインスタンスかどうかをチェックする。

**パラメーター**

| 名称 | タイプ    | 説明                                                                                                                                                             |
| -- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bn | オブジェクト | BN.js](https://github.com/indutny/bn.js/)のインスタンス。 |

**リターン・バリュー**

| タイプ   | 説明                                                                                        |
| ----- | ----------------------------------------------------------------------------------------- |
| ブーリアン | 与えられた値が [BN.js](https://github.com/indutny/bn.js/) インスタンスであれば `true` となる。 |

**例**

```javascript
> var number = new caver.utils.BN(10)
> caver.utils.isBN(number)
true
```

## isBigNumber<a href="#isbignumber" id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

与えられた値が [BigNumber.js](http://mikemcl.github.io/bignumber.js/) インスタンスであるかどうかをチェックします。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                                                                                                                         |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ビグナンバー | オブジェクト | BigNumber.js](http://mikemcl.github.io/bignumber.js/) インスタンス。 |

**リターン・バリュー**

| タイプ   | 説明                                            |
| ----- | --------------------------------------------- |
| ブーリアン | 与えられた値が `BigNumber.js` インスタンスであれば `true` を返す。 |

**例**

```javascript
> var number = new caver.utils.BigNumber(10)
> caver.utils.isBigNumber(number)
true
```

## シャ3<a href="#sha3" id="sha3"></a>

```javascript
caver.utils.sha3(str)
caver.utils.keccak256(str) // ALIAS
```

入力の sha3 を計算する。

**注**：Solidityのsha3動作を模倣するには、[caver.utils.soliditySha3](#soliditysha3) を使用します。

**パラメーター**

| 名称 | タイプ   | 説明         |
| -- | ----- | ---------- |
| スト | ストリング | ハッシュする文字列。 |

**リターン・バリュー**

| タイプ   | 説明       |
| ----- | -------- |
| ストリング | 結果はハッシュ。 |

**例**

```javascript
> caver.utils.sha3('234') // 文字列として取得
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc966216f811ce6a79'

> caver.utils.sha3(new caver.utils.BN('234'))// utils.sha3 stringify bignumber instance.
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79'

> caver.utils.sha3(234)
null // can't calculate the has of a number

> caver.utils.sha3(0xea) // 上記と同じ、数値の HEX 表現のみ
null

> caver.utils.sha3('0xea') // まずバイト配列に変換され、ハッシュ化される
'0x2f20677459120677484f7104c76deb6846a2c071f9b3152c103bb12cd54d1a4a'
```

## soliditySha3<a href="#soliditysha3" id="soliditysha3"></a>

```javascript
caver.utils.soliditySha3(param1 [, param2, ...])
```

solidityと同じように、与えられた入力パラメータのsha3を計算する。 つまり、引数はハッシュされる前にABI変換され、タイトにパックされる。

**パラメーター**

| 名称      | タイプ  | 説明                                                                                                                                                  |
| ------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| パラメエックス | ミックス | 任意の型、または `{type: 'uint', value: '123456'}` または `{t: 'bytes', v: '0xfff456'}` を持つオブジェクト。 <br/><br/><br/>- `string` 非数値 UTF-8 文字列は `string` として解釈される。 |

**リターン・バリュー**

| タイプ   | 説明       |
| ----- | -------- |
| ストリング | 結果はハッシュ。 |

**例**

```javascript
> caver.utils.soliditySha3('234564535', '0xfff23243', true, -10)
// auto detects: uint256, bytes, bool, int256
'0x3e27a893dc40ef8a7f0841d96639de2f58a132be5ae466d40087a2cfa83b7179'

> caver.utils.soliditySha3('Hello!%') // auto detects: string
'0x661136a4267dba9ccdf6bfddb7c00e714de936674c4bdb065a531cf1cb15c7fc'

> caver.utils.soliditySha3('234') // 自動検出: uint256
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3(0xea) // 上記と同じ
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3(new caver.utils.BN('234')) // 上記と同じ。
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3({type: 'uint256', value: '234'})) // 上記と同じ。// 上記と同じ
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3({t: 'uint', v: new caver.utils.BN('234')})))// 上に同じ
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3('0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'soliditySha3('0x407D73d8a49eeb85D32Cf465507dd71d507100c1')
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b'

> caver.utils.soliditySha3({t: 'bytes', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b' // 上記と同じ結果

> caver.utils.soliditySha3({t: 'address', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b' // 上記と同じだが、マルチケースの場合はチェックサムチェックを行う

> caver.utils.soliditySha3({t: 'bytes32', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x3c69a194aaf415ba5d6afca734660d0a3d45acdc05d54cd1ca89a89e7625b4' // 上記と異なる結果

> caver.utils.soliditySha3({t: 'string', v: 'Hello!%'}, {t: 'int8', v:-23}, {t: 'address', v: '0x85F43D8a49eeB85d32Cf465507DD71d507100C1d'})
'0xa13b31627c1ed7aaded5aecec71baf02fe123797fffd45e662eac8e06fbe4955'
```

## isHex<a href="#ishex" id="ishex"></a>

```javascript
caver.utils.isHex(hex)
```

与えられた文字列がHEX文字列であるかどうかを調べる。

**パラメーター**

| 名称   | タイプ   | 説明             |
| ---- | ----- | -------------- |
| ヘックス | ストリング | 指定された HEX 文字列。 |

**リターン・バリュー**

| タイプ   | 説明                              |
| ----- | ------------------------------- |
| ブーリアン | 与えられたパラメータがHEX文字列の場合、`true`を返す。 |

**例**

```javascript
>
true

> caver.utils.isHex('0xc1912')
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

与えられた文字列がHEX文字列であるかどうかを調べる。 [caver.utils.isHex](#ishex) との違いは、HEX の前に `0x` が付くことを期待する点です。

**パラメーター**

| 名称   | タイプ   | 説明             |
| ---- | ----- | -------------- |
| ヘックス | ストリング | 指定された HEX 文字列。 |

**リターン・バリュー**

| タイプ   | 説明                            |
| ----- | ----------------------------- |
| ブーリアン | 与えられた文字列がHEX文字列の場合、`true`を返す。 |

**例**

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

与えられた文字列が有効なkaiaアドレスかどうかをチェックする。 また、アドレスに大文字と小文字がある場合はチェックサムをチェックする。

**パラメーター**

| 名称 | タイプ   | 説明       |
| -- | ----- | -------- |
| 住所 | ストリング | アドレス文字列。 |

**リターン・バリュー**

| タイプ   | 説明                               |
| ----- | -------------------------------- |
| ブーリアン | 与えられた文字列が有効なKAIAアドレスであれば `true`。 |

**例**

```javascript
> caver.utils.isAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
true

> caver.utils.isAddress('c1912fee45d61c87cc5ea59dae31190fffff232d')
true

> caver.utils.isAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
true // すべて大文字なので、チェックサムはチェックされない

> caver.utils.isAddress('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFF232d')
true

> caver.utils.isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFF232d')
false // チェックサムが正しくない。
```

## toChecksumAddress<a href="#tochecksumaddress" id="tochecksumaddress"></a>

```javascript
caver.utils.toChecksumAddress(アドレス)
```

大文字または小文字のカイアアドレスをチェックサムアドレスに変換する。

**パラメーター**

| 名称 | タイプ   | 説明       |
| -- | ----- | -------- |
| 住所 | ストリング | アドレス文字列。 |

**リターン・バリュー**

| タイプ   | 説明          |
| ----- | ----------- |
| ストリング | チェックサムアドレス。 |

**例**

```javascript
> caver.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'

> caver.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d' // 上記と同じ。
```

## チェックアドレス・チェックサム<a href="#checkaddresschecksum" id="checkaddresschecksum"></a>

```javascript
caver.utils.checkAddressChecksum(アドレス)
```

指定されたアドレスのチェックサムをチェックする。 また、チェックサムでないアドレスに対しては `false` を返す。

**パラメーター**

| 名称 | タイプ   | 説明       |
| -- | ----- | -------- |
| 住所 | ストリング | アドレス文字列。 |

**リターン・バリュー**

| タイプ   | 説明                                                                 |
| ----- | ------------------------------------------------------------------ |
| ブーリアン | アドレスのチェックサムが有効な場合は `true`、チェックサムアドレスでないかチェックサムが無効な場合は `false` となる。 |

**例**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
true
```

## toHex<a href="#tohex" id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```

HEX関数は、指定された値をHEXに変換します。 数値文字列は数値として解釈される。 テキスト文字列はUTF-8文字列として解釈される。

**パラメーター**

| 名称   | タイプ         | 説明          |
| ---- | ----------- | ----------- |
| ミックス | string \\ | HEXに変換する入力。 |

**リターン・バリュー**

| タイプ   | 説明         |
| ----- | ---------- |
| ストリング | 結果のHEX文字列。 |

**例**

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

## hexToNumberString<a href="#hextonumberstring" id="hextonumberstring"></a>

```javascript
caver.utils.hexToNumberString(hex)
```

HEX関数は、指定されたHEX値の数値表現を文字列として返します。

**パラメーター**

| 名称        | タイプ   | 説明          |
| --------- | ----- | ----------- |
| ヘックスストリング | ストリング | 変換するHEX文字列。 |

**リターン・バリュー**

| タイプ   | 説明         |
| ----- | ---------- |
| ストリング | 文字列としての数字。 |

**例**

```javascript
> caver.utils.hexToNumberString('0xea')
"234"
```

## 16進数<a href="#hextonumber" id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```

HEX関数は、指定されたHEX値の数値表現を返します。

**注意**：これは大きな数には使えないので、[caver.utils.toBN](#tobn) を使う。

**パラメーター**

| 名称        | タイプ   | 説明          |
| --------- | ----- | ----------- |
| ヘックスストリング | ストリング | 変換するHEX文字列。 |

**リターン・バリュー**

| タイプ | 説明              |
| --- | --------------- |
| 番号  | 指定されたHEX値の数値表現。 |

**例**

```javascript
> caver.utils.hexToNumber('0xea')
234
```

## numberToHex<a href="#numbertohex" id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```

HEX関数は、指定された数値のHEX表現を返します。

**パラメーター**

| 名称 | タイプ         | 説明        |
| -- | ----------- | --------- |
| 番号 | string \\ | 文字列または数値。 |

**リターン・バリュー**

| タイプ   | 説明            |
| ----- | ------------- |
| ストリング | 与えられた数値のHEX値。 |

**例**

```javascript
> caver.utils.numberToHex('234')
'0xea'
```

## hexToUtf8<a href="#hextoutf8" id="hextoutf8"></a>

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```

指定されたHEX値のUTF-8文字列表現を返します。

**パラメーター**

| 名称   | タイプ   | 説明                   |
| ---- | ----- | -------------------- |
| ヘックス | ストリング | UTF-8文字列に変換するHEX文字列。 |

**リターン・バリュー**

| タイプ   | 説明         |
| ----- | ---------- |
| ストリング | UTF-8の文字列。 |

**例**

```javascript
> caver.utils.hexToUtf8('0x492068617665203130e282ac')
'私は100€を持っている'
```

## hexToAscii<a href="#hextoascii" id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```

HEX関数は、指定されたHEX値のASCII文字列表現を返します。

**パラメーター**

| 名称   | タイプ   | 説明                   |
| ---- | ----- | -------------------- |
| ヘックス | ストリング | ASCII文字列に変換するHEX文字列。 |

**リターン・バリュー**

| タイプ   | 説明        |
| ----- | --------- |
| ストリング | ASCII文字列。 |

**例**

```javascript
> caver.utils.hexToAscii('0x49206861766520313021')
'100個ある！'
```

## utf8ToHex<a href="#utf8tohex" id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(str)
caver.utils.stringToHex(str) // ALIAS
```

指定されたUTF-8文字列のHEX表現を返します。

**パラメーター**

| 名称 | タイプ   | 説明                   |
| -- | ----- | -------------------- |
| スト | ストリング | HEX文字列に変換するUTF-8文字列。 |

**リターン・バリュー**

| タイプ   | 説明      |
| ----- | ------- |
| ストリング | HEX文字列。 |

**例**

```javascript
> caver.utils.utf8ToHex('I have 100€')
'0x492068617665203130e282ac'
```

## asciiToHex<a href="#asciitohex" id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(str)
```

HEX関数は、指定されたASCII文字列のHEX表現を返します。

**パラメーター**

| 名称 | タイプ   | 説明                   |
| -- | ----- | -------------------- |
| スト | ストリング | HEX文字列に変換するASCII文字列。 |

**リターン・バリュー**

| タイプ   | 説明      |
| ----- | ------- |
| ストリング | HEX文字列。 |

**例**

```javascript
> caver.utils.asciiToHex('I have 100!')
'0x4920686176652031303021'
```

## ヘクス・トゥ・バイト<a href="#hextobytes" id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```

与えられたHEX文字列からバイト配列を返す。

**パラメーター**

| 名称   | タイプ   | 説明          |
| ---- | ----- | ----------- |
| ヘックス | ストリング | 変換するHEX文字列。 |

**リターン・バリュー**

| タイプ | 説明     |
| --- | ------ |
| 配列  | バイト配列。 |

**例**

```javascript
> caver.utils.hexToBytes('0x000000ea')
[ 0, 0, 0, 234 ]。
```

## バイト<a href="#bytestohex" id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```

バイト配列から HEX 文字列を返します。

**パラメーター**

| 名称    | タイプ | 説明         |
| ----- | --- | ---------- |
| バイト配列 | 配列  | 変換するバイト配列。 |

**リターン・バリュー**

| タイプ   | 説明      |
| ----- | ------- |
| ストリング | HEX文字列。 |

**例**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 111, 33, 36 ])
'0x48656c6f2124'
```

## コンバート・トゥー・ペブ<a href="#topeb" id="topeb"></a>

```javascript
caver.utils.convertToPeb(数値 [, 単位])
```

任意のKAIA値をpebに変換する。

**注**："peb"はKAIAの最小単位であり、KAIAの単位としては常に "peb"を使用すべきである。 KAIA "に変換するのは表示上の理由のみ。

**パラメーター**

| 名称 | タイプ         | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 番号 | string \\ | 価値だ。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 単位 | ストリング       | <p>(オプション、デフォルトは<code>"KAIA"</code>) 変換する KAIA 単位。 <code>には</code>、提供された単位に対して以下の乗数のいずれかが乗算される：1' -<code>kpeb</code>：1000' -<code>Mpeb</code>：Mpeb: '1000000' -<code>Gpeb</code>：<code>Gpeb</code>: '1000000000'-<code>Ston</code>: '1000000000'-<code>uKLAY</code>: '1000000000000'-<code>mKLAY</code>: '1000000000000000'-<code>KAIA</code>: '10000000000000000'-<code>kKLAY</code>: '100000000000000000'-<code>MKLAY</code>: '100000000000000000000'-<code>GKLAY</code>: '10000000000000000000'.</p> |

**リターン・バリュー**

| タイプ         | 説明                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------- |
| string \\ | number パラメータが [BN](https://github.com/indutny/bn.js/) のインスタンスであれば BN インスタンスを返し、そうでなければ文字列を返す。 |

**例**

```javascript
> caver.utils.convertToPeb('1', 'KAIA')
'1000000000000000000'

> caver.utils.convertToPeb(caver.utils.toBN(1), 'KAIA')
<BN: de0b6b3a7640000>
```

## コンバートフロムペブ<a href="#convertfrompeb" id="convertfrompeb"></a>

```javascript
caver.utils.convertFromPeb(数値 [, 単位])
```

**注**："peb"はKAIAの最小単位であり、KAIAの単位としては常に "peb"を使用すべきである。 KAIA "に変換するのは表示上の理由のみ。

**パラメーター**

| 名称 | タイプ         | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 番号 | string \\ | ペブの値。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 単位 | ストリング       | <p>(オプション、デフォルトは<code>"KAIA"</code>) "peb "を変換するKAIAの単位。 <code>は</code>、以下の分母のいずれかで割られる：1' -<code>kpeb</code>：1000' -<code>Mpeb</code>：Mpeb: '1000000' -<code>Gpeb</code>：<code>Gpeb</code>: '1000000000'-<code>Ston</code>: '1000000000'-<code>uKLAY</code>: '1000000000000'-<code>mKLAY</code>: '1000000000000000'-<code>KAIA</code>: '10000000000000000'-<code>kKLAY</code>: '100000000000000000'-<code>MKLAY</code>: '100000000000000000000'-<code>GKLAY</code>: '10000000000000000000'.</p> |

**リターン・バリュー**

| タイプ   | 説明     |
| ----- | ------ |
| ストリング | 文字列番号。 |

**例**

```javascript
> caver.utils.convertFromPeb('1', 'KAIA')
'0.00000000000001'
```

## コンバートトケイ<a href="#tokei" id="tokei"></a>

```javascript
caver.utils.convertToKei(number [, unit])
```

任意のKAIA値をkeiに変換する。

**注**："kei"はKAIAの最小単位であり、KAIAの単位には常に "kei"を使用すること。 KAIA "に変換するのは表示上の理由のみ。

**パラメーター**

| 名称 | タイプ         | 説明                                                                                                                                                                            |
| -- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 番号 | string \\ | 価値だ。                                                                                                                                                                          |
| 単位 | ストリング       | <p>(オプション、デフォルトは<code>"KAIA"</code>) 変換する KAIA 単位。 <code>kei</code>: '1' -<code>Gkei</code>: '1000000000' -<code>KAIA</code>: '100000000000000'<code>の</code>いずれかが乗算されます。</p> |

**リターン・バリュー**

| タイプ         | 説明                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------- |
| string \\ | number パラメータが [BN](https://github.com/indutny/bn.js/) のインスタンスであれば BN インスタンスを返し、そうでなければ文字列を返す。 |

**例**

```javascript
> caver.utils.convertToKei('1', 'KAIA')
'1000000000000000000'

> caver.utils.convertToKei(caver.utils.toBN(1), 'KAIA')
<BN: de0b6b3a7640000>
```

## コンバートフロムケイ<a href="#convertfromkei" id="convertfromkei"></a>

```javascript
caver.utils.convertFromKei(数値 [, 単位])
```

**注**："kei"はKAIAの最小単位であり、KAIAの単位には常に "kei"を使用すること。 KAIA "に変換するのは表示上の理由のみ。

**パラメーター**

| 名称 | タイプ         | 説明                                                                                                                                                                                 |
| -- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 番号 | string \\ | keiの価値。                                                                                                                                                                            |
| 単位 | ストリング       | <p>(オプション、デフォルトは<code>「KAIA」</code>）「kei」を変換する「KAIA」の単位。 <code>kei</code>: '1' -<code>Gkei</code>: '1000000000' -<code>KAIA</code>: '100000000000000'<code>の</code>いずれかで除算される。</p> |

**リターン・バリュー**

| タイプ   | 説明     |
| ----- | ------ |
| ストリング | 文字列番号。 |

**例**

```javascript
> caver.utils.convertFromKei('1', 'KAIA')
'0.00000000000001'
```

## ユニットマップ<a href="#unitmap" id="unitmap"></a>

```javascript
caver.utils.unitMap
```

KAIA(またはKAIA)のすべての可能な値とその量をpeb(またはkei)単位で表示します。

**リターン・バリュー**

| タイプ | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 対象  | <p>以下の特性を持つ：1'-<code>kpeb</code>：1000' -<code>Mpeb</code>：Mpeb: '1000000' -<code>Gpeb</code>: '1000000000<code>uKLAY</code>: '1000000000000'-<code>mKLAY</code>: '1000000000000000'-<code>KAIA</code>: '10000000000000000'-<code>kKLAY</code>: '100000000000000000'-<code>MKLAY</code>: '100000000000000000000'-<code>GKLAY</code>: '10000000000000000000'-<code>TKLAY</code>: '1000000000000000000000000'-<code>kei</code>: '1'-<code>Gkei</code>: '1000000000'-<code>KAIA</code>: '1000000000000000000'.</p> |

**例**

```javascript
> caver.utils.unitMap
{
  peb：'1',
  kpeb：'1000',
  Mpeb：'1000000',
  Gpeb：'1000000000',
  Ston: '1000000000',
  uKLAY: '1000000000000',
  mKLAY: '10000000000000',
  KAIA: '100000000000000',
  kKLAY: '100000000000000000',
  MKLAY: '100000000000000000000',
  GKLAY: '10000000000000000000',
  TKLAY: '10000000000000000000000',
  kei: '1',
  Gkei: '1000000000',
  KAIA: '100000000000000',
}.
```

## クレイユニット<a href="#klayunit" id="klayunit"></a>

```javascript
caver.utils.klayUnit
```

すべてのKAIA（またはKAIA）ユニットを表示します。

**リターン・バリュー**

| タイプ | 説明                                                                                                                                              |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 対象  | kaiaで使用されるKAIAの単位（またはKAIAで使用されるKAIAの単位）が定義されたオブジェクト。 各ユニットには名前とpebFactorがある。 pebFactorは、現在各単位で翻訳されているKAIA（またはKAIA）を「peb」（または「kei」）に変換する際に使用される。 |

**例**

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
    Gkei： { unit: 'Gkei', pebFactor: 9 }
    KAIA： { unit: 'KAIA', pebFactor: 18 }
}
```

## カイアユニット<a href="#kaiaunit" id="kaiaunit"></a>

```javascript
caver.utils.kaiaUnit
```

BN \\

**リターン・バリュー**

| タイプ | 説明                                                 |
| --- | -------------------------------------------------- |
| 対象  | object \\ それぞれのユニットには名前とkeiFactorがある。 string \\ |

**例**

```javascript
number \\
```

## パッド左<a href="#padleft" id="padleft"></a>

```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```

文字列の左にパディングを追加する。 HEX文字列にパディングを追加するのに便利。

**パラメーター**

| 名称    | タイプ   | 説明                                                 |
| ----- | ----- | -------------------------------------------------- |
| ストリング | ストリング | 左側にパディングを追加する文字列。                                  |
| 文字数   | 番号    | 文字列全体の文字数。                                         |
| サイン   | ストリング | (オプション) 使用する文字記号。デフォルトは `0` です。 |

**リターン・バリュー**

| タイプ   | 説明           |
| ----- | ------------ |
| ストリング | パッド入りのストリング。 |

**例**

```javascript
> caver.utils.padLeft('0x3456ff', 20)
'0x00000000003456ff'

> caver.utils.padLeft(0x3456ff, 20)
'0x00000000003456ff'

> caver.utils.padLeft('Hello', 20, 'x')
'xxxxxxxxxxxxxxxxxHello'
```

## パッド右<a href="#padright" id="padright"></a>

```javascript
caver.utils.padRight(str, characterAmount [, sign])
caver.utils.rightPad(str, characterAmount [, sign]) // ALIAS
```

HEX文字列にパディングを追加するのに便利です。

**パラメーター**

| 名称  | タイプ   | 説明                                                 |
| --- | ----- | -------------------------------------------------- |
| スト  | ストリング | 右側にパディングを追加する文字列。                                  |
| 文字数 | 番号    | 文字列全体の文字数。                                         |
| サイン | ストリング | (オプション) 使用する文字記号。デフォルトは `0` です。 |

**リターン・バリュー**

| タイプ   | 説明           |
| ----- | ------------ |
| ストリング | パッド入りのストリング。 |

**例**

```javascript
>
'0x3456ff0000000000'

> caver.utils.padRight(0x3456ff, 20)
'0x3456ff0000000000'

> caver.utils.padRight('Hello', 20, 'x')
'Helloxxxxxxxxxxxxx'
```

## トリム・リーディング・ゼロ<a href="#trimleadingzero" id="trimleadingzero"></a>

```javascript
caver.utils.trimLeadingZero(hexString)
```

0x接頭辞付き16進文字列から先頭の0を削除する。

**パラメーター**

| 名称     | タイプ   | 説明             |
| ------ | ----- | -------------- |
| ヘクス文字列 | ストリング | トリミングする六角形のひも。 |

**リターン・バリュー**

| タイプ   | 説明               |
| ----- | ---------------- |
| ストリング | 先頭のゼロを除いた16進文字列。 |

**例**

```javascript
> caver.utils.trimLeadingZero('0x000011')
0x11
```

## メイクイーブン<a href="#makeeven" id="makeeven"></a>

```javascript
caver.utils.makeEven(hexString)
```

偶数の長さの文字列を返す。

**パラメーター**

| 名称     | タイプ   | 説明                |
| ------ | ----- | ----------------- |
| ヘクス文字列 | ストリング | 均等にするための16進数の文字列。 |

**リターン・バリュー**

| タイプ   | 説明       |
| ----- | -------- |
| ストリング | 長さが均等な弦。 |

**例**

```javascript
> caver.utils.makeEven('0x011')
0x0011
```

## toTwosコンプリメント<a href="#totwoscomplement" id="totwoscomplement"></a>

```javascript
caver.utils.toTwosComplement(num)
```

負の数を2の補数に変換する。

**パラメーター**

| 名称 | タイプ            | 説明      |
| -- | -------------- | ------- |
| 番号 | BigNumber \\ | 変換する数字。 |

**リターン・バリュー**

| タイプ   | 説明          |
| ----- | ----------- |
| ストリング | 変換後の16進文字列。 |

**例**

```javascript
> caver.utils.toTwosComplement('-1')
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

> caver.utils.toTwosComplement(-1)
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

> caver.utils.toTwosComplement('0x1')
'0x0000000000000000000000000000000000000000000000000000000000000001'

> caver.utils.toTwosComplement(-15)
'0xfffffffffffffffffffffffffffffffffffffffff1'

> caver.utils.toTwosComplement('-0x1')
'0xffffffffffffffffffffffffffffffffffffffffffffffffff'
```

## isContractDeployment<a href="#iscontractdeployment" id="iscontractdeployment"></a>

```javascript
caver.utils.isContractDeployment(トランザクションオブジェクト)
```

与えられたトランザクションがスマートコントラクトをデプロイしたトランザクションであれば `true` を返す。 スマートコントラクトがデプロイされたトランザクションでない場合は `false` を返す。 結果は `transactionObject` のパラメータの値によって決まる。 すべての必須パラメータが正しく設定されていることを確認してください。

**パラメーター**

| 名称             | タイプ    | 説明                                                                                                                                                                            |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| トランザクションオブジェクト | オブジェクト | トランザクション](./caver-transaction/caver-transaction.md#class)のインスタンスで、トランザクションをデプロイしているかどうかをチェックします。 |

**リターン・バリュー**

| タイプ   | 説明                                                |
| ----- | ------------------------------------------------- |
| ブーリアン | `true`はトランザクションオブジェクトがスマートコントラクトのデプロイ用であることを意味する。 |

**例**

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

指定された publicKey の x 座標と y 座標を返します。 鍵暗号の詳細については、[楕円曲線暗号](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)を参照のこと。

**注** この関数には、公開鍵が有効かどうかをチェックするロジックは含まれていない。 この関数は、入力された publicKey を長さごとに x 点と y 点に分割するだけです。 公開鍵を検証するには、[isValidPublicKey](#isvalidpublickey) を使用してください。

**パラメーター**

| 名称      | タイプ   | 説明                       |
| ------- | ----- | ------------------------ |
| パブリックキー | ストリング | x 点と y 点を取得する publicKey。 |

**リターン・バリュー**

| タイプ | 説明                                      |
| --- | --------------------------------------- |
| 配列  | x 点と y 点を格納する配列。 インデックス0がx点、インデックス1がy点。 |

**例**

```javascript
> caver.utils.xyPointFromPublicKey('0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88cb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55')
[ 
    '0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88c'、
    '0xb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55'
]
```

## isHexPrefixed<a href="#ishexprefixed" id="ishexprefixed"></a>

```javascript
caver.utils.isHexPrefixed(入力)
```

入力が 0x 接頭辞の 16 進文字列であれば `true` を返し、そうでなければ `false` を返す。

**パラメーター**

| 名称 | タイプ   | 説明                            |
| -- | ----- | ----------------------------- |
| 入力 | ストリング | パラメータが0x接頭辞付き16進文字列か否かを判定する値。 |

**リターン・バリュー**

| タイプ   | 説明                                   |
| ----- | ------------------------------------ |
| ブーリアン | `true`は、入力が0x接頭辞付きの16進文字列であることを意味する。 |

**例**

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
caver.utils.addHexPrefix(入力)
```

0x接頭辞付きの16進文字列を返す。 入力がすでに0x接頭辞付きであるか、16進数でない文字列の場合、入力値はそのまま返される。

**パラメーター**

| 名称 | タイプ   | 説明                |
| -- | ----- | ----------------- |
| 入力 | ストリング | 文字列値の先頭に 0x を付ける。 |

**リターン・バリュー**

| タイプ   | 説明                   |
| ----- | -------------------- |
| ストリング | 0x接頭辞付きの16進文字列が返される。 |

**例**

```javascript
> caver.utils.addHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.addHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## stripHexPrefix<a href="#striphexprefix" id="striphexprefix"></a>

```javascript
caver.utils.stripHexPrefix(入力)
```

入力から 0x 接頭辞を取り除いた結果を返す。

**注意** caver.klay.stripHexPrefixは**v1.0.1**からサポートされています。 この機能を使用するには、[v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1)以上をインストールしてください。

**パラメーター**

| 名称 | タイプ   | 説明                 |
| -- | ----- | ------------------ |
| 入力 | ストリング | 文字列から 0x 接頭辞を取り除く。 |

**リターン・バリュー**

| タイプ   | 説明                |
| ----- | ----------------- |
| ストリング | 0xを取り除いた文字列が返される。 |

**例**

```javascript
> caver.utils.stripHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.stripHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## toBuffer<a href="#tobuffer" id="tobuffer"></a>

```javascript
caver.utils.toBuffer(入力)
```

この関数は入力を [Buffer](https://nodejs.org/api/buffer.html) に変換する。 `toBuffer`を使ってオブジェクトをBufferに変換するには、オブジェクトは**toArray**関数を実装していなければならない。 文字列型入力の場合、この関数は**0x接頭辞付き16進文字列**でのみ動作する。

**パラメーター**

| 名称 | タイプ                                                          | 説明            |
| -- | ------------------------------------------------------------ | ------------- |
| 入力 | BigNumber number \\ BigNumber Buffer \\ number \\ BN \\ | Bufferに変換する値。 |

**NOTE** `BigNumber`型はcaver-js [v1.6.4](https://www.npmjs.com/package/caver-js/v/1.6.4) からサポートされています。

**リターン・バリュー**

| タイプ  | 説明                   |
| ---- | -------------------- |
| バッファ | Buffer型に変換された値が返される。 |

**例**

```javascript
// Buffer
> caver.utils.toBuffer(Buffer.alloc(0))
<Buffer >

// 0x接頭辞付き16進文字列
> caver.utils.toBuffer('0x1234')
<Buffer 12 34>

// 数値
> caver.utils.toBuffer(1)
<Buffer 01>

// Array
> caver.utils.toBuffer([1,2,3]) // BN > caver.utils.BN(new caver.utils.BN(255)) // オブジェクトtoBuffer([1,2,3])
<Buffer 01 02 03>

// BN
> caver.utils.toBuffer(new caver.utils.BN(255))
<Buffer ff>

// toArray関数を実装するオブジェクト
> caver.utils.toBuffer({toArray: function() {return [1,2,3,4]}}) // nullまたは未定義。
<Buffer 01 02 03 04>

// null または undefined
> caver.utils.toBuffer(null)
<Buffer >

> caver.utils.toBuffer(undefined)
<Buffer >

// 0x接頭辞のない16進文字列
> caver.utils.toBuffer('0xqwer')
Error：文字列をバッファに変換できませんでした。'toBuffer'関数は0x接頭の16進文字列のみをサポートしています

// toArray関数を実装していないオブジェクト
> caver.utils.toBuffer({})
エラー：オブジェクトをバッファに変換するには、toArray 関数をオブジェクト内部に実装する必要があります。
```

## バッファ数<a href="#numbertobuffer" id="numbertobuffer"></a>

```javascript
caver.utils.numberToBuffer(input)
```

この関数は数値を [Buffer](https://nodejs.org/api/buffer.html) に変換する。 caver.utils.toBuffer](#tobuffer) は、入力が数値の場合、この関数と同じ動作をする。

**パラメーター**

| 名称 | タイプ         | 説明              |
| -- | ----------- | --------------- |
| 入力 | string \\ | Bufferに変換される数値。 |

**リターン・バリュー**

| タイプ  | 説明                   |
| ---- | -------------------- |
| バッファ | Buffer型に変換された値が返される。 |

**例**

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

入力が32バイトのハッシュ形式であれば `true` を返し、そうでなければ `false` を返す。

**パラメーター**

| 名称 | タイプ   | 説明                    |
| -- | ----- | --------------------- |
| 入力 | ストリング | 32バイトのハッシュ形式かどうかを調べる。 |

**リターン・バリュー**

| タイプ   | 説明                                |
| ----- | --------------------------------- |
| ブーリアン | `true`は入力が32バイトのハッシュ形式であることを意味する。 |

**例**

```javascript
// '0x' 16進接頭辞あり
> caver.utils.isValidHash('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// '0x' 16進接頭辞なし
> caver.utils.isValidHash('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

> caver.utils.isValidHash('0x1')
false
```

## isValidHashStrict<a href="#isvalidhashstrict" id="isvalidhashstrict"></a>

```javascript
caver.utils.isValidHashStrict(入力)
```

入力が 0x 接頭辞付きの 32 バイトのハッシュ形式であれば `true` を返し、そうでなければ `false` を返す。 この関数は入力を見て、それが0x接頭の32バイトハッシュの形式かどうかを判断するだけである。 [caver.utils.isValidHash](#isvalidhash) との違いは、HEXの前に `0x` が付くことを期待する点です。

**パラメーター**

| 名称 | タイプ   | 説明                           |
| -- | ----- | ---------------------------- |
| 入力 | ストリング | 0x接頭辞付き32バイトハッシュの形式かどうかを調べる。 |

**リターン・バリュー**

| タイプ   | 説明                                        |
| ----- | ----------------------------------------- |
| ブーリアン | `true`は、入力が0x接頭辞付き32バイトのハッシュ形式であることを意味する。 |

**例**

```javascript
// '0x' 16進接頭辞あり
> caver.utils.isValidHashStrict('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// '0x' 16進接頭辞なし
> caver.utils.isValidHashStrict('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
false

> caver.utils.isValidHashStrict('0x1')
false
```

## isTxHash<a href="#istxhash" id="istxhash"></a>

```javascript
caver.utils.isTxHash(input)
```

入力がトランザクションハッシュ形式であれば `true` を返し、そうでなければ `false` を返す。 この関数は入力を見て、それがトランザクション・ハッシュの形式かどうかを判断するだけである。

**注意** この関数は廃止されました。 isValidHash](#isvalidhash) を使って、有効なハッシュが32バイト長かどうかを判断する。

**パラメーター**

| 名称 | タイプ   | 説明                               |
| -- | ----- | -------------------------------- |
| 入力 | ストリング | パラメータがトランザクションハッシュの形式かどうかを判断する値。 |

**リターン・バリュー**

| タイプ   | 説明                                    |
| ----- | ------------------------------------- |
| ブーリアン | `true`は、入力がトランザクションハッシュの形式であることを意味する。 |

**例**

```javascript
// '0x' 16進接頭辞あり
> caver.utils.isTxHash('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// '0x' 16進接頭辞なし
> caver.utils.isTxHash('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

> caver.utils.isTxHash('0x1')
false
```

## isTxHashStrict<a href="#istxhashstrict" id="istxhashstrict"></a>

```javascript
caver.utils.isTxHashStrict(input)
```

入力がトランザクションハッシュ形式であれば `true` を返し、そうでなければ `false` を返す。 この関数は入力を見て、それがトランザクション・ハッシュの形式かどうかを判断するだけである。 [caver.utils.isTxHash](#istxhash) との違いは、HEX の前に `0x` が付くことを期待する点です。

**注意** この関数は廃止されました。 isValidHashStrict](#isvalidhashstrict) を使って、有効なハッシュが32バイト長かどうかを判断する。

**パラメーター**

| 名称 | タイプ   | 説明                               |
| -- | ----- | -------------------------------- |
| 入力 | ストリング | パラメータがトランザクションハッシュの形式かどうかを判断する値。 |

**リターン・バリュー**

| タイプ   | 説明                                    |
| ----- | ------------------------------------- |
| ブーリアン | `true`は、入力がトランザクションハッシュの形式であることを意味する。 |

**例**

```javascript
// '0x' 16進接頭辞あり
> caver.utils.isTxHashStrict('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// '0x' 16進接頭辞なし
> caver.utils.isTxHashStrict('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
false

> caver.utils.isTxHashStrict('0x1')
false
```

## isValidPrivateKey<a href="#isvalidprivatekey" id="isvalidprivatekey"></a>

```javascript
caver.utils.isValidPrivateKey(プライベートキー)
```

`privateKey` が有効であれば `true` を返し、そうでなければ `false` を返す。

**パラメーター**

| 名称       | タイプ   | 説明           |
| -------- | ----- | ------------ |
| プライベートキー | ストリング | 検証する秘密鍵の文字列。 |

**リターン・バリュー**

| タイプ   | 説明                              |
| ----- | ------------------------------- |
| ブーリアン | `true`はprivateKeyが有効であることを意味する。 |

**例**

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

publicKey が有効であれば `true` を返し、そうでなければ `false` を返す。

**パラメーター**

| 名称      | タイプ   | 説明          |
| ------- | ----- | ----------- |
| パブリックキー | ストリング | 検証する公開鍵文字列。 |

**リターン・バリュー**

| タイプ   | 説明                             |
| ----- | ------------------------------ |
| ブーリアン | `true`はpublicKeyが有効であることを意味する。 |

**例**

```javascript
// 非圧縮公開鍵による検証
> caver.utils.isValidPublicKey('0xbd6405a7f14f57ecea4a6ffe774ee26d051f7eed13257c9a574055b20e42bab0e8beba92e2e675101eb2a55ba4693080d0bf14548beae7bc93b18b72d10dd350')
true

// 圧縮公開鍵による検証
> caver.utils.isValidPublicKey('0x02bd6405a7f14f57ecea4a6ffe774ee26d051f7eed13257c9a574055b20e42bab0')
true

> caver.utils.isValidPublicKey('{private key}')
false

> caver.utils.isValidPublicKey('0x{private key}')
false

> caver.utils.isValidPublicKey('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
false
```

## isValidRole<a href="#isvalidrole" id="isvalidrole"></a>

```javascript
caver.utils.isValidRole(ロール)
```

ロールが有効であれば `true` を返し、そうでなければ `false` を返す。 caver-jsがサポートしているロールは、`caver.wallet.keyring.role`で確認できます。

**パラメーター**

| 名称 | タイプ   | 説明          |
| -- | ----- | ----------- |
| 役割 | ストリング | 検証するロール文字列。 |

**リターン・バリュー**

| タイプ   | 説明                       |
| ----- | ------------------------ |
| ブーリアン | `true`はロールが有効であることを意味する。 |

**例**

```javascript
> caver.utils.isValidRole('roleTransactionKey')
true

> caver.utils.isValidRole('role')
false
```

## isValidBlockNumberCandidateです。<a href="#isvalidblocknumbercandidate" id="isvalidblocknumbercandidate"></a>

```javascript
caver.utils.isValidBlockNumberCandidate(入力)
```

ブロック番号（またはブロックタグ文字列）を検証します。

ブロック番号は、以下のいずれかのタイプでなければならない：

- 定義済みのブロック番号 例:)最新'、'最も早い'、'保留'、'ジェネシス'
- ヘックス
- 有限数

**パラメーター**

| 名称     | タイプ         | 説明                                                                                                                            |
| ------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| ブロック番号 | number \\ | 検証するブロック番号。 これはブロック番号(数値型)またはブロックタグ(`latest`, `pending`, `earliest`, `genesis`)の文字列である。 |

**リターン・バリュー**

| タイプ   | 説明                          |
| ----- | --------------------------- |
| ブーリアン | `true`はブロック番号が有効であることを意味する。 |

**例**

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
caver.utils.isPredefinedBlockNumber(入力)
```

パラメータが定義済みのブロックタグであれば `true` を返す。

**パラメーター**

| 名称       | タイプ   | 説明         |
| -------- | ----- | ---------- |
| 定義済みブロック | ストリング | 定義済みのブロック。 |

**リターン・バリュー**

| タイプ   | 説明                                              |
| ----- | ----------------------------------------------- |
| ブーリアン | `true`はpredefinedBlockが有効な定義済みブロックタグであることを意味する。 |

**例**

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

sig が空のシグネチャ（`SignatureData { _v: '0x01', _r: '0x', _s: '0x' }` または `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`）の形式であれば `true` を返し、そうでなければ `false` を返す。

caver-js では、signatures または feePayerSignatures が空の場合、空の署名を表す値 `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]` がプロパティに返されます。 この関数は、与えられた署名が `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]` (または 'LEGACY' トランザクションでは `SignatureData { _v: '0x01', _r: '0x', _s: '0x' }`)であるかどうかをチェックするために使用される。

**パラメーター**

| 名称 | タイプ         | 説明                                                                                                                                                                                         |
| -- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| シグ | object \\ | SignatureData](caver-wallet/keyring.md#signaturedata) のインスタンス、または [SignatureData](caver-wallet/keyring.md#signaturedata) の配列。 |

**リターン・バリュー**

| タイプ   | 説明                     |
| ----- | ---------------------- |
| ブーリアン | `true`はシグが空であることを意味する。 |

**例**

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

key が [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) 形式であれば `true` を返し、そうでなければ `false` を返す。

**パラメーター**

| 名称 | タイプ   | 説明                                   |
| -- | ----- | ------------------------------------ |
| キー | ストリング | KlaytnWalletKey のフォーマットでチェックするキー文字列。 |

**リターン・バリュー**

| タイプ   | 説明                                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------- |
| ブーリアン | `true`は、キーが`0x{private key}0x{type}0x{address in hex}`または`{private key}0x{type}0x{address in hex}`であることを意味する。 |

**例**

```javascript
> caver.utils.isKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
true

> caver.utils.isKlaytnWalletKey('{private key}0x{type}0x{address in hex}')
true

> caver.utils.isKlaytnWalletKey('0x{private key}')
false
```

## バッファートヘックス<a href="#buffertohex" id="buffertohex"></a>

```javascript
caver.utils.bufferToHex(バッファ)
```

バッファを0x接頭辞付き16進文字列に変換する。

**パラメーター**

| 名称   | タイプ  | 説明               |
| ---- | ---- | ---------------- |
| バッファ | バッファ | 16進文字列に変換するバッファ。 |

**リターン・バリュー**

| タイプ   | 説明              |
| ----- | --------------- |
| ストリング | 0x接頭辞付きの16進文字列。 |

**例**

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

KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) 文字列を、"秘密鍵", "type", "address" を含む配列にパースします。

**パラメーター**

| 名称 | タイプ   | 説明                                                                                                                                                                                                                                                                         |
| -- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| キー | ストリング | KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) 文字列。 |

**リターン・バリュー**

| タイプ | 説明                      |
| --- | ----------------------- |
| 配列  | パースされた KlaytnWalletKey。 |

**例**

```javascript
> caver.utils.parseKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
[
    '0x{private key}',
    '0x00',
    '0x885ebdb17c221ef695936b18a0263d6399e14d60'
]
```

## ハッシュメッセージ<a href="#hashmessage" id="hashmessage"></a>

```javascript
caver.utils.hashMessage(メッセージ)
```

メッセージをkaia固有の接頭辞でハッシュする: `keccak256("\x19Klaytn Signed Message：\n" + len(message) + message))`とする。

**パラメーター**

| 名称    | タイプ   | 説明                                       |
| ----- | ----- | ---------------------------------------- |
| メッセージ | ストリング | ハッシュ化するメッセージ。 HEX文字列の場合は、まずUTF-8デコードされる。 |

**リターン・バリュー**

| タイプ   | 説明                              |
| ----- | ------------------------------- |
| ストリング | kaia固有のプレフィックスを持つハッシュ化されたメッセージ。 |

**例**

```javascript
> caver.utils.hashMessage('Hello')
'0x640bfab59b6e27468abd367888f4ab1a1c77aa2b45e76a1d3adcbd039c305917'
```

## 立ち直る<a href="#recover" id="recover"></a>

```javascript
caver.utils.recover(message, signature [, isHashed])
```

与えられたデータの署名に使われたカイアアドレスを復元する。

**パラメーター**

| 名称       | タイプ         | 説明                                                                                                                                                                                                |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| メッセージ    | ストリング       | メッセージまたはハッシュ化されたメッセージのいずれか。                                                                                                                                                                       |
| 署名       | object \\ | SignatureData](caver-wallet/keyring.md#signaturedata) のインスタンス。                                                                       |
| isHashed | ブーリアン       | (オプション、デフォルト: `false`) 最後のパラメータが `true` の場合、与えられた `message` には自動的に `"\x19Klaytn Signed Message：\n" + message.length + message` が自動的に付加されず、すでに付加されているとみなされます。 |

**リターン・バリュー**

| タイプ   | 説明                      |
| ----- | ----------------------- |
| ストリング | このデータの署名に使用されるkaiaアドレス。 |

**例**

```javascript
> この場合、'message', new caver.wallet.keyring.signatureData(['0x1b', '0x50a80...', '0x021de...'])
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('message', ['0x1b', '0x50a80...', '0x021de...'])
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('message', { v: '0x1b', r: '0x50a80...', s: '0x021de...' })
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('0xe960248437f2134a77a9aa0ebcbb6523aec095f23b02e25f16fd95e99b099daa', sig, true)
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'
```

## リカバーパブリックキー<a href="#recoverpublickey" id="recoverpublickey"></a>

```javascript
caver.utils.recoverPublicKey(message, signature [, isHashed])
```

与えられたデータの署名に使われた公開鍵を復元する。

**NOTE** `caver.utils.recoverPublicKey` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 以降でサポートされています。

**パラメーター**

| 名称       | タイプ        | 説明                                                                                                                                                              |
| -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| メッセージ    | ストリング      | メッセージまたはハッシュ化されたメッセージのいずれか。                                                                                                                                     |
| 署名       | Array \\ | SignatureData](caver-wallet/keyring.md#signaturedata) のインスタンス。                                     |
| isHashed | ブーリアン      | (オプション、デフォルト: `false`) パラメータとして渡されたメッセージが、接頭辞 `"\x19Klaytn Signed Message：\n" + message.length + message`. |

**リターン・バリュー**

| タイプ   | 説明                |
| ----- | ----------------- |
| ストリング | このデータの署名に使われる公開鍵。 |

**例**

```javascript
> このような場合、caver.utils.recoverPublicKey('Some Message', new caver.wallet.keyring.signatureData([
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

公開鍵から派生したアドレスを返します。 この関数は、単に公開鍵文字列をハッシュ化してアドレス形式に変換するだけである。 カイアの実際のアカウントとは何の関係もない。

**NOTE** `caver.utils.publicKeyToAddress`は、caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3)からサポートされています。

**パラメーター**

| 名称      | タイプ   | 説明                  |
| ------- | ----- | ------------------- |
| パブリックキー | ストリング | アドレスを取得するための公開鍵文字列。 |

**リターン・バリュー**

| タイプ   | 説明               |
| ----- | ---------------- |
| ストリング | 公開鍵に由来するアドレス文字列。 |

**例**

```javascript
> caver.utils.publicKeyToAddress('0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3')
'0xA84A1CE657e9d5b383cECE6f4bA365e23Fa234Dd'
```

## compressPublicKey。<a href="#compresspublickkey" id="compresspublickkey"></a>

```javascript
caver.utils.compressPublicKey(uncompressedPublicKey)
```

圧縮されていない公開鍵を圧縮する。

**パラメーター**

| 名称         | タイプ   | 説明           |
| ---------- | ----- | ------------ |
| 非圧縮パブリックキー | ストリング | 圧縮されていない公開鍵。 |

**リターン・バリュー**

| タイプ   | 説明        |
| ----- | --------- |
| ストリング | 圧縮された公開鍵。 |

**例**

```javascript
> caver.utils.compressPublicKey('0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632')
'0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248'
```

## 公開鍵の解凍<a href="#decompresspublickkey" id="decompresspublickkey"></a>

```javascript
caver.utils.decompressPublicKey(compressedPublicKey)
```

圧縮された公開鍵を解凍する。

**パラメーター**

| 名称       | タイプ   | 説明        |
| -------- | ----- | --------- |
| 圧縮された公開鍵 | ストリング | 圧縮された公開鍵。 |

**リターン・バリュー**

| タイプ   | 説明           |
| ----- | ------------ |
| ストリング | 圧縮されていない公開鍵。 |

**例**

```javascript
> caver.utils.decompressPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
'0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632'
```

## isCompressedPublicKey<a href="#iscompressedpublickey" id="iscompressedpublickey"></a>

```javascript
caver.utils.isCompressedPublicKey(publicKey)
```

公開鍵が圧縮されていれば `true` を返し、そうでなければ `false` を返す。

**パラメーター**

| 名称      | タイプ   | 説明   |
| ------- | ----- | ---- |
| パブリックキー | ストリング | 公開鍵。 |

**リターン・バリュー**

| タイプ   | 説明                     |
| ----- | ---------------------- |
| ブーリアン | `true`は圧縮されていることを意味する。 |

**例**

```javascript
> caver.utils.isCompressedPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
true
```

## デコード署名<a href="#decodesignature" id="decodesignature"></a>

```javascript
caver.utils.decodeSignature('0x{signature}')
```

R(32バイト)+S(32バイト)+V(1バイト)」で構成される生の署名データをデコードする。

**NOTE** `caver.utils.decodeSignature`はcaver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3)からサポートされています。

**パラメーター**

| 名称 | タイプ   | 説明                                                                                                     |
| -- | ----- | ------------------------------------------------------------------------------------------------------ |
| 署名 | ストリング | デコードする署名文字列。 R(32バイト)+S(32バイト)+V(1バイト)で構成される。 |

**リターン・バリュー**

| タイプ    | 説明                                      |
| ------ | --------------------------------------- |
| オブジェクト | `v`、`r`、`s` を含む `SignatureData` インスタンス。 |

**例**

```javascript
> caver.utils.decodeSignature('0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae81b')
SignatureData {
  _v: '0x1b',
  _r: '0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258',
  _s: '0x642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae8'
}
```
