---
description: caver-js utility APIs.

---

# caver.utils

`caver.utils` provides utility functions.

## randomHex <a href="#randomhex" id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```

The [randomHex](https://github.com/frozeman/randomHex) library to generate cryptographically strong pseudo-random HEX strings from a given byte size.

**Parameters**

| Name | Type   | Description                                                                                                               |
| ---- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| size | number | The byte size for the HEX string, _e.g._, `32` will result in a 32-byte HEX string with 64 characters prefixed with "0x". |

**Return Value**

| Type   | Description                      |
| ------ | -------------------------------- |
| string | The generated random HEX string. |

**Example**

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

## _ (underscore) <a href="#underscore" id="underscore"></a>

```javascript
caver.utils._()
```

The [underscore](http://underscorejs.org) library for many convenient JavaScript functions.

See the [underscore API reference](http://underscorejs.org) for details.

**Example**

```javascript
> var _ = caver.utils._

> _.union([1,2],[3])
[1,2,3]

> _.each({my: 'object'}, function(value, key){ ... })
...
```

## toBN <a href="#tobn" id="tobn"></a>

```javascript
caver.utils.toBN(number)
```

Safely converts any given value (including [BigNumber.js](http://mikemcl.github.io/bignumber.js/) instances) into a [BN.js](https://github.com/indutny/bn.js/) instance, for handling big numbers in JavaScript.

**Parameters**

| Name   | Type             | Description                        |
| ------ | ---------------- | ---------------------------------- |
| number | string \| number | number to convert to a big number. |

**Return Value**

| Type   | Description                                              |
| ------ | -------------------------------------------------------- |
| Object | The [BN.js](https://github.com/indutny/bn.js/) instance. |

**Examples**

```javascript
> caver.utils.toBN(1234).toString()
'1234'

> caver.utils.toBN('1234').add(caver.utils.toBN('1')).toString()
'1235'

> caver.utils.toBN('0xea').toString()
'234'
```

## isBN <a href="#isbn" id="isbn"></a>

```javascript
caver.utils.isBN(bn)
```

Checks if a given value is a [BN.js](https://github.com/indutny/bn.js/) instance.

**Parameters**

| Name | Type   | Description                                            |
| ---- | ------ | ------------------------------------------------------ |
| bn   | object | A [BN.js](https://github.com/indutny/bn.js/) instance. |

**Return Value**

| Type    | Description                                                                       |
| ------- | --------------------------------------------------------------------------------- |
| boolean | `true` if a given value is a [BN.js](https://github.com/indutny/bn.js/) instance. |

**Example**

```javascript
> var number = new caver.utils.BN(10)
> caver.utils.isBN(number)
true
```

## isBigNumber <a href="#isbignumber" id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

Checks if a given value is a [BigNumber.js](http://mikemcl.github.io/bignumber.js/) instance.

**Parameters**

| Name      | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| bignumber | object | A [BigNumber.js](http://mikemcl.github.io/bignumber.js/) instance. |

**Return Value**

| Type    | Description                                           |
| ------- | ----------------------------------------------------- |
| boolean | `true` if a given value is a `BigNumber.js` instance. |

**Example**

```javascript
> var number = new caver.utils.BigNumber(10)
> caver.utils.isBigNumber(number)
true
```

## sha3 <a href="#sha3" id="sha3"></a>

```javascript
caver.utils.sha3(str)
caver.utils.keccak256(str) // ALIAS
```

Calculates the sha3 of the input.

**NOTE**: To mimic the sha3 behavior of Solidity use [caver.utils.soliditySha3](#soliditysha3).

**Parameters**

| Name | Type   | Description       |
| ---- | ------ | ----------------- |
| str  | string | A string to hash. |

**Return Value**

| Type   | Description      |
| ------ | ---------------- |
| string | The result hash. |

**Example**

```javascript
> caver.utils.sha3('234') // taken as string
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79'

> caver.utils.sha3(new caver.utils.BN('234')) // utils.sha3 stringify bignumber instance.
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79'

> caver.utils.sha3(234)
null // can't calculate the has of a number

> caver.utils.sha3(0xea) // same as above, just the HEX representation of the number
null

> caver.utils.sha3('0xea') // will be converted to a byte array first, and then hashed
'0x2f20677459120677484f7104c76deb6846a2c071f9b3152c103bb12cd54d1a4a'
```

## soliditySha3 <a href="#soliditysha3" id="soliditysha3"></a>

```javascript
caver.utils.soliditySha3(param1 [, param2, ...])
```

Calculates the sha3 of given input parameters in the same way solidity would. This means arguments will be ABI converted and tightly packed before being hashed.

**Parameters**

| Name   | Type  | Description                                                                                                                                                                                                                                                                   |
| ------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| paramX | Mixed | Any type, or an object with `{type: 'uint', value: '123456'}` or `{t: 'bytes', v: '0xfff456'}`. <br/>Basic types are autodetected as follows:<br/>- `string` non numerical UTF-8 string is interpreted as `string`.<br/>- `string` |


**Return Value**

| Type   | Description      |
| ------ | ---------------- |
| string | The result hash. |

**Example**

```javascript
> caver.utils.soliditySha3('234564535', '0xfff23243', true, -10)
// auto detects: uint256, bytes, bool, int256
'0x3e27a893dc40ef8a7f0841d96639de2f58a132be5ae466d40087a2cfa83b7179'

> caver.utils.soliditySha3('Hello!%') // auto detects: string
'0x661136a4267dba9ccdf6bfddb7c00e714de936674c4bdb065a531cf1cb15c7fc'

> caver.utils.soliditySha3('234') // auto detects: uint256
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3(0xea) // same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3(new caver.utils.BN('234')) // same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3({type: 'uint256', value: '234'})) // same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3({t: 'uint', v: new caver.utils.BN('234')})) // same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3('0x407D73d8a49eeb85D32Cf465507dd71d507100c1')
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b'

> caver.utils.soliditySha3({t: 'bytes', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b' // same result as above

> caver.utils.soliditySha3({t: 'address', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b' // same as above, but will do a checksum check, if its multi case

> caver.utils.soliditySha3({t: 'bytes32', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x3c69a194aaf415ba5d6afca734660d0a3d45acdc05d54cd1ca89a8988e7625b4' // different result as above

> caver.utils.soliditySha3({t: 'string', v: 'Hello!%'}, {t: 'int8', v:-23}, {t: 'address', v: '0x85F43D8a49eeB85d32Cf465507DD71d507100C1d'})
'0xa13b31627c1ed7aaded5aecec71baf02fe123797fffd45e662eac8e06fbe4955'
```

## isHex <a href="#ishex" id="ishex"></a>

```javascript
caver.utils.isHex(hex)
```

Checks if a given string is a HEX string.

**Parameters**

| Name | Type   | Description           |
| ---- | ------ | --------------------- |
| hex  | string | The given HEX string. |

**Return Value**

| Type    | Description                                  |
| ------- | -------------------------------------------- |
| boolean | `true` if a given parameter is a HEX string. |

**Example**

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

## isHexStrict <a href="#ishexstrict" id="ishexstrict"></a>

```javascript
caver.utils.isHexStrict(hex)
```

Checks if a given string is a HEX string. Difference to [caver.utils.isHex](#ishex) is that it expects HEX to be prefixed with `0x`.

**Parameters**

| Name | Type   | Description           |
| ---- | ------ | --------------------- |
| hex  | string | The given HEX string. |

**Return Value**

| Type    | Description                               |
| ------- | ----------------------------------------- |
| boolean | `true` if a given string is a HEX string. |

**Example**

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

## isAddress <a href="#isaddress" id="isaddress"></a>

```javascript
caver.utils.isAddress(address)
```

Checks if a given string is a valid Klaytn address. It will also check the checksum if the address has upper and lowercase letters.

**Parameters**

| Name    | Type   | Description        |
| ------- | ------ | ------------------ |
| address | string | An address string. |

**Return Value**

| Type    | Description                                         |
| ------- | --------------------------------------------------- |
| boolean | `true` if a given string is a valid Klaytn address. |

**Examples**

```javascript
> caver.utils.isAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
true

> caver.utils.isAddress('c1912fee45d61c87cc5ea59dae31190fffff232d')
true

> caver.utils.isAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
true // as all is uppercase, no checksum will be checked

> caver.utils.isAddress('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
true

> caver.utils.isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
false // wrong checksum
```

## toChecksumAddress <a href="#tochecksumaddress" id="tochecksumaddress"></a>

```javascript
caver.utils.toChecksumAddress(address)
```

Converts an upper or lowercase Klaytn address to a checksum address.

**Parameters**

| Name    | Type   | Description        |
| ------- | ------ | ------------------ |
| address | string | An address string. |

**Return Value**

| Type   | Description           |
| ------ | --------------------- |
| string | The checksum address. |

**Examples**

```javascript
> caver.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'

> caver.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d' // same as above
```

## checkAddressChecksum <a href="#checkaddresschecksum" id="checkaddresschecksum"></a>

```javascript
caver.utils.checkAddressChecksum(address)
```

Checks the checksum of a given address. Will also return `false` on non-checksum addresses.

**Parameters**

| Name    | Type   | Description        |
| ------- | ------ | ------------------ |
| address | string | An address string. |

**Return Value**

| Type    | Description                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| boolean | `true` when the checksum of the address is valid, `false` if it is not a checksum address, or the checksum is invalid. |

**Examples**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
true
```

## toHex <a href="#tohex" id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```

Converts any given value to HEX. The numeric strings will be interpreted as numbers. Text strings will be interpreted as UTF-8 strings.

**Parameters**

| Name  | Type                                | Description                  |
| ----- | ----------------------------------- | ---------------------------- |
| mixed | string \| number \| BN \| BigNumber | The input to convert to HEX. |

**Return Value**

| Type   | Description               |
| ------ | ------------------------- |
| string | The resulting HEX string. |

**Examples**

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

## hexToNumberString <a href="#hextonumberstring" id="hextonumberstring"></a>

```javascript
caver.utils.hexToNumberString(hex)
```

Returns the number representation of a given HEX value as a string.

**Parameters**

| Name      | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| hexstring | string | A HEX string to be converted. |

**Return Value**

| Type   | Description             |
| ------ | ----------------------- |
| string | The number as a string. |

**Examples**

```javascript
> caver.utils.hexToNumberString('0xea')
"234"
```

## hexToNumber <a href="#hextonumber" id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```

Returns the number representation of a given HEX value.

**NOTE**: This is not useful for big numbers, rather use [caver.utils.toBN](#tobn).

**Parameters**

| Name      | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| hexstring | string | A HEX string to be converted. |

**Return Value**

| Type   | Description                                     |
| ------ | ----------------------------------------------- |
| number | The number representation of a given HEX value. |

**Examples**

```javascript
> caver.utils.hexToNumber('0xea')
234
```

## numberToHex <a href="#numbertohex" id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```

Returns the HEX representation of a given number value.

**Parameters**

| Name   | Type                                | Description                   |
| ------ | ----------------------------------- | ----------------------------- |
| number | string \| number \| BN \| BigNumber | A number as string or number. |

**Return Value**

| Type   | Description                        |
| ------ | ---------------------------------- |
| string | The HEX value of the given number. |

**Examples**

```javascript
> caver.utils.numberToHex('234')
'0xea'
```

## hexToUtf8 <a href="#hextoutf8" id="hextoutf8"></a>

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```

Returns the UTF-8 string representation of a given HEX value.

**Parameters**

| Name | Type   | Description                                |
| ---- | ------ | ------------------------------------------ |
| hex  | string | A HEX string to convert to a UTF-8 string. |

**Return Value**

| Type   | Description       |
| ------ | ----------------- |
| string | The UTF-8 string. |

**Examples**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac')
'I have 100€'
```

## hexToAscii <a href="#hextoascii" id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```

Returns the ASCII string representation of a given HEX value.

**Parameters**

| Name | Type   | Description                                 |
| ---- | ------ | ------------------------------------------- |
| hex  | string | A HEX string to convert to an ASCII string. |

**Return Value**

| Type   | Description       |
| ------ | ----------------- |
| string | The ASCII string. |

**Examples**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021')
'I have 100!'
```

## utf8ToHex <a href="#utf8tohex" id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(str)
caver.utils.stringToHex(str) // ALIAS
```

Returns the HEX representation of a given UTF-8 string.

**Parameters**

| Name | Type   | Description                                |
| ---- | ------ | ------------------------------------------ |
| str  | string | A UTF-8 string to convert to a HEX string. |

**Return Value**

| Type   | Description     |
| ------ | --------------- |
| string | The HEX string. |

**Examples**

```javascript
> caver.utils.utf8ToHex('I have 100€')
'0x49206861766520313030e282ac'
```

## asciiToHex <a href="#asciitohex" id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(str)
```

Returns the HEX representation of a given ASCII string.

**Parameters**

| Name | Type   | Description                                 |
| ---- | ------ | ------------------------------------------- |
| str  | string | An ASCII string to convert to a HEX string. |

**Return Value**

| Type   | Description     |
| ------ | --------------- |
| string | The HEX string. |

**Examples**

```javascript
> caver.utils.asciiToHex('I have 100!')
'0x4920686176652031303021'
```

## hexToBytes <a href="#hextobytes" id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```

Returns a byte array from the given HEX string.

**Parameters**

| Name | Type   | Description                   |
| ---- | ------ | ----------------------------- |
| hex  | string | A HEX string to be converted. |

**Return Value**

| Type  | Description     |
| ----- | --------------- |
| Array | The byte array. |

**Examples**

```javascript
> caver.utils.hexToBytes('0x000000ea')
[ 0, 0, 0, 234 ]
```

## bytesToHex <a href="#bytestohex" id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```

Returns a HEX string from a byte array.

**Parameters**

| Name      | Type  | Description              |
| --------- | ----- | ------------------------ |
| byteArray | Array | A byte array to convert. |

**Return Value**

| Type   | Description     |
| ------ | --------------- |
| string | The HEX string. |

**Examples**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ])
'0x48656c6c6f2124'
```

## convertToPeb <a href="#topeb" id="topeb"></a>

```javascript
caver.utils.convertToPeb(number [, unit])
```

Converts any KLAY value into peb.

**NOTE**: "peb" is the smallest KLAY unit, and you should always use "peb" as the unit of KLAY. Convert to "KLAY" only for display reasons.

**Parameters**

| Name   | Type                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| number | string \| number \| BN | The value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| unit   | string                 | <p>(optional, defaults to <code>"KLAY"</code>) The unit of KLAY to convert from. <code>number</code> will be multiplied by one of the following multipliers for the unit provided:- <code>peb</code>: '1'- <code>kpeb</code>: '1000'- <code>Mpeb</code>: '1000000'- <code>Gpeb</code>: '1000000000'- <code>Ston</code>: '1000000000'- <code>uKLAY</code>: '1000000000000'- <code>mKLAY</code>: '1000000000000000'- <code>KLAY</code>: '1000000000000000000'- <code>kKLAY</code>: '1000000000000000000000'- <code>MKLAY</code>: '1000000000000000000000000'- <code>GKLAY</code>: '1000000000000000000000000000'</p> |

**Return Value**

| Type         | Description                                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| string \| BN | If the number parameter is an instance of [BN](https://github.com/indutny/bn.js/), it returns a BN instance, otherwise a string. |

**Examples**

```javascript
> caver.utils.convertToPeb('1', 'KLAY')
'1000000000000000000'

> caver.utils.convertToPeb(caver.utils.toBN(1), 'KLAY')
<BN: de0b6b3a7640000>
```

## convertFromPeb <a href="#convertfrompeb" id="convertfrompeb"></a>

```javascript
caver.utils.convertFromPeb(number [, unit])
```

**NOTE**: "peb" is the smallest KLAY unit, and you should always use "peb" as the unit of KLAY. Convert to "KLAY" only for display reasons.

**Parameters**

| Name   | Type                                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------ | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number | string \| number \| BN \| BigNumber | The value in peb.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| unit   | string                              | <p>(optional, defaults to <code>"KLAY"</code>) The unit of KLAY to convert your "peb" into. <code>number</code> will be divided by one of the following denominators for the unit provided:- <code>peb</code>: '1'- <code>kpeb</code>: '1000'- <code>Mpeb</code>: '1000000'- <code>Gpeb</code>: '1000000000'- <code>Ston</code>: '1000000000'- <code>uKLAY</code>: '1000000000000'- <code>mKLAY</code>: '1000000000000000'- <code>KLAY</code>: '1000000000000000000'- <code>kKLAY</code>: '1000000000000000000000'- <code>MKLAY</code>: '1000000000000000000000000'- <code>GKLAY</code>: '1000000000000000000000000000'</p> |

**Return Value**

| Type   | Description        |
| ------ | ------------------ |
| string | The string number. |

**Examples**

```javascript
> caver.utils.convertFromPeb('1', 'KLAY')
'0.000000000000000001'
```

## unitMap <a href="#unitmap" id="unitmap"></a>

```javascript
caver.utils.unitMap
```

Shows all possible KLAY values and their amount in peb.

**Return Value**

| Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object | <p>With the following properties:- <code>peb</code>: '1'- <code>kpeb</code>: '1000'- <code>Mpeb</code>: '1000000'- <code>Gpeb</code>: '1000000000'- <code>Ston</code>: '1000000000'- <code>uKLAY</code>: '1000000000000'- <code>mKLAY</code>: '1000000000000000'- <code>KLAY</code>: '1000000000000000000'- <code>kKLAY</code>: '1000000000000000000000'- <code>MKLAY</code>: '1000000000000000000000000'- <code>GKLAY</code>: '1000000000000000000000000000'- <code>TKLAY</code>: '1000000000000000000000000000000'</p> |

**Examples**

```javascript
> caver.utils.unitMap
{
  peb: '1',
  kpeb: '1000',
  Mpeb: '1000000',
  Gpeb: '1000000000',
  Ston: '1000000000',
  uKLAY: '1000000000000',
  mKLAY: '1000000000000000',
  KLAY: '1000000000000000000',
  kKLAY: '1000000000000000000000',
  MKLAY: '1000000000000000000000000',
  GKLAY: '1000000000000000000000000000',
  TKLAY: '1000000000000000000000000000000'
}
```

## klayUnit <a href="#klayunit" id="klayunit"></a>

```javascript
caver.utils.klayUnit
```

Shows all KLAY units.

**Return Value**

| Type   | Description                                                                                                                                                                               |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object | An object in which the units of KLAY used in Klaytn are defined. Each unit has its name and pebFactor. pebFactor is used when converting KLAY currently translated in each unit to 'peb'. |

**Examples**

```javascript
> caver.utils.klayUnit
{
    peb: { unit: 'peb', pebFactor: 0 },
    kpeb: { unit: 'kpeb', pebFactor: 3 },
    Mpeb: { unit: 'Mpeb', pebFactor: 6 },
    Gpeb: { unit: 'Gpeb', pebFactor: 9 },
    ston: { unit: 'ston', pebFactor: 9 },
    uKLAY: { unit: 'uKLAY', pebFactor: 12 },
    mKLAY: { unit: 'mKLAY', pebFactor: 15 },
    KLAY: { unit: 'KLAY', pebFactor: 18 },
    kKLAY: { unit: 'kKLAY', pebFactor: 21 },
    MKLAY: { unit: 'MKLAY', pebFactor: 24 },
    GKLAY: { unit: 'GKLAY', pebFactor: 27 },
    TKLAY: { unit: 'TKLAY', pebFactor: 30 }
}
```

## padLeft <a href="#padleft" id="padleft"></a>

```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```

Adds padding on the left of a string. Useful for adding paddings to HEX strings.

**Parameters**

| Name            | Type   | Description                                            |
| --------------- | ------ | ------------------------------------------------------ |
| string          | string | The string to add padding on the left.                 |
| characterAmount | number | The number of characters the total string should have. |
| sign            | string | (optional) The character sign to use, defaults to `0`. |

**Return Value**

| Type   | Description        |
| ------ | ------------------ |
| string | The padded string. |

**Examples**

```javascript
> caver.utils.padLeft('0x3456ff', 20)
'0x000000000000003456ff'

> caver.utils.padLeft(0x3456ff, 20)
'0x000000000000003456ff'

> caver.utils.padLeft('Hello', 20, 'x')
'xxxxxxxxxxxxxxxHello'
```

## padRight <a href="#padright" id="padright"></a>

```javascript
caver.utils.padRight(str, characterAmount [, sign])
caver.utils.rightPad(str, characterAmount [, sign]) // ALIAS
```

Adds padding on the right of a string, Useful for adding paddings to HEX strings.

**Parameters**

| Name            | Type   | Description                                            |
| --------------- | ------ | ------------------------------------------------------ |
| str             | string | The string to add padding on the right.                |
| characterAmount | number | The number of characters the total string should have. |
| sign            | string | (optional) The character sign to use, defaults to `0`. |

**Return Value**

| Type   | Description        |
| ------ | ------------------ |
| string | The padded string. |

**Examples**

```javascript
> caver.utils.padRight('0x3456ff', 20)
'0x3456ff00000000000000'

> caver.utils.padRight(0x3456ff, 20)
'0x3456ff00000000000000'

> caver.utils.padRight('Hello', 20, 'x')
'Helloxxxxxxxxxxxxxxx'
```

## trimLeadingZero <a href="#trimleadingzero" id="trimleadingzero"></a>

```javascript
caver.utils.trimLeadingZero(hexString)
```

Removes leading zero from 0x-prefixed hex string.

**Parameters**

| Name      | Type   | Description           |
| --------- | ------ | --------------------- |
| hexString | string | A hex string to trim. |

**Return Value**

| Type   | Description                        |
| ------ | ---------------------------------- |
| string | A hex string without leading zero. |

**Examples**

```javascript
> caver.utils.trimLeadingZero('0x000011')
0x11
```

## makeEven <a href="#makeeven" id="makeeven"></a>

```javascript
caver.utils.makeEven(hexString)
```

Returns a string to an even length.

**Parameters**

| Name      | Type   | Description                |
| --------- | ------ | -------------------------- |
| hexString | string | A hex string to make even. |

**Return Value**

| Type   | Description                |
| ------ | -------------------------- |
| string | A string with even length. |

**Examples**

```javascript
> caver.utils.makeEven('0x011')
0x0011
```

## toTwosComplement <a href="#totwoscomplement" id="totwoscomplement"></a>

```javascript
caver.utils.toTwosComplement(num)
```

Converts a negative number into a two's complement.

**Parameters**

| Name | Type                          | Description            |
| ---- | ----------------------------- | ---------------------- |
| num  | number \| string \| BigNumber | The number to convert. |

**Return Value**

| Type   | Description               |
| ------ | ------------------------- |
| string | The converted hex string. |

**Examples**

```javascript
> caver.utils.toTwosComplement('-1')
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

> caver.utils.toTwosComplement(-1)
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

> caver.utils.toTwosComplement('0x1')
'0x0000000000000000000000000000000000000000000000000000000000000001'

> caver.utils.toTwosComplement(-15)
'0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1'

> caver.utils.toTwosComplement('-0x1')
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
```

## isContractDeployment <a href="#iscontractdeployment" id="iscontractdeployment"></a>

```javascript
caver.utils.isContractDeployment(transactionObject)
```

Returns `true` if the given transaction is a smart contract deploy transaction. It returns `false` if the transaction is not a smart contract deploy transaction. The result is determined by the values of the parameters in the `transactionObject`. Make sure all the mandatory parameters are set correctly.

**Parameters**

| Name              | Type   | Description                                                                                         |
| ----------------- | ------ | --------------------------------------------------------------------------------------------------- |
| transactionObject | object | An instance of [Transaction](./caver-transaction/caver-transaction.md#class) to check contract deploy transaction or not. |

**Return Value**

| Type    | Description                                                       |
| ------- | ----------------------------------------------------------------- |
| boolean | `true` means the transaction object is for smart contract deploy. |

**Examples**

```javascript
> caver.utils.isContractDeployment(caver.transaction.legacyTransaction.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
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

## xyPointFromPublicKey <a href="#xypointfrompublickey" id="xypointfrompublickey"></a>

```javascript
caver.utils.xyPointFromPublicKey(publicKey)
```

Returns the x and y coordinates of the given publicKey. For more information on key cryptography, see [Elliptic-curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

**NOTE** This function does not contain any logic to check whether the public key is valid. The function only split the input publicKey into x and y points by length. To validate public key, please use [isValidPublicKey](#isvalidpublickey).

**Parameters**

| Name      | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| publicKey | string | The publicKey to get x and y points. |

**Return Value**

| Type  | Description                                                                    |
| ----- | ------------------------------------------------------------------------------ |
| Array | An array storing x and y points. Index 0 has x point, and index 1 has y point. |

**Examples**

```javascript
> caver.utils.xyPointFromPublicKey('0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88cb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55')
[ 
    '0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88c',
    '0xb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55'
]
```

## isHexPrefixed <a href="#ishexprefixed" id="ishexprefixed"></a>

```javascript
caver.utils.isHexPrefixed(input)
```

Returns `true` if the input is a 0x-prefixed hex string, otherwise it returns `false`.

**Parameters**

| Name  | Type   | Description                                                                   |
| ----- | ------ | ----------------------------------------------------------------------------- |
| input | string | The value to be determined if the parameter is 0x-prefixed hex string or not. |

**Return Value**

| Type    | Description                                       |
| ------- | ------------------------------------------------- |
| boolean | `true` means the input is 0x-prefixed hex string. |

**Examples**

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

## addHexPrefix <a href="#addhexprefix" id="addhexprefix"></a>

```javascript
caver.utils.addHexPrefix(input)
```

Returns a 0x-prefixed hex string. If the input is already 0x-prefixed or a non-hex string, the input value is returned as-is.

**Parameters**

| Name  | Type   | Description                          |
| ----- | ------ | ------------------------------------ |
| input | string | string value to be prefixed with 0x. |

**Return Value**

| Type   | Description                         |
| ------ | ----------------------------------- |
| string | 0x-prefixed hex string is returned. |

**Examples**

```javascript
> caver.utils.addHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.addHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## stripHexPrefix <a href="#striphexprefix" id="striphexprefix"></a>

```javascript
caver.utils.stripHexPrefix(input)
```

Returns the result with 0x prefix stripped from input.

**NOTE** caver.klay.stripHexPrefix is supported from **v1.0.1**. To use this feature, please install [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) or higher.

**Parameters**

| Name  | Type   | Description                 |
| ----- | ------ | --------------------------- |
| input | string | string to remove 0x prefix. |

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| string | A string stripped of 0x is returned. |

**Examples**

```javascript
> caver.utils.stripHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.stripHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## toBuffer <a href="#tobuffer" id="tobuffer"></a>

```javascript
caver.utils.toBuffer(input)
```

This function converts the input to a [Buffer](https://nodejs.org/api/buffer.html). To convert an object into a Buffer using `toBuffer`, the object must implement **toArray** function. For string type input, this function only works with a **0x-prefixed hex string**.

**Parameters**

| Name  | Type                                                             | Description                            |
| ----- | ---------------------------------------------------------------- | -------------------------------------- |
| input | Buffer \| string \| number \| Array \| BN \| BigNumber \| object | The value to be converted to a Buffer. |

**NOTE** `BigNumber` type is supported since caver-js [v1.6.4](https://www.npmjs.com/package/caver-js/v/1.6.4).

**Return Value**

| Type   | Description                                     |
| ------ | ----------------------------------------------- |
| Buffer | The value converted to Buffer type is returned. |

**Examples**

```javascript
// Buffer
> caver.utils.toBuffer(Buffer.alloc(0))
<Buffer >

// 0x-prefixed hex string
> caver.utils.toBuffer('0x1234')
<Buffer 12 34>

// number
> caver.utils.toBuffer(1)
<Buffer 01>

// Array
> caver.utils.toBuffer([1,2,3])
<Buffer 01 02 03>

// BN
> caver.utils.toBuffer(new caver.utils.BN(255))
<Buffer ff>

// Object that implements toArray function
> caver.utils.toBuffer({toArray: function() {return [1,2,3,4]}})
<Buffer 01 02 03 04>

// null or undefined
> caver.utils.toBuffer(null)
<Buffer >

> caver.utils.toBuffer(undefined)
<Buffer >

// non 0x-prefixed hex string
> caver.utils.toBuffer('0xqwer')
Error: Failed to convert string to Buffer. 'toBuffer' function only supports 0x-prefixed hex string

// Object that does not implement toArray function
> caver.utils.toBuffer({})
Error: To convert an object to a buffer, the toArray function must be implemented inside the object
```

## numberToBuffer <a href="#numbertobuffer" id="numbertobuffer"></a>

```javascript
caver.utils.numberToBuffer(input)
```

This function converts a number to a [Buffer](https://nodejs.org/api/buffer.html). The [caver.utils.toBuffer](#tobuffer) has the same behavior as this function when the input is a number.

**Parameters**

| Name  | Type                                | Description                           |
| ----- | ----------------------------------- | ------------------------------------- |
| input | string \| number \| BN \| BigNumber | A number to be converted to a Buffer. |

**Return Value**

| Type   | Description                                     |
| ------ | ----------------------------------------------- |
| Buffer | The value converted to Buffer type is returned. |

**Examples**

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

## isValidHash <a href="#isvalidhash" id="isvalidhash"></a>

```javascript
caver.utils.isValidHash(input)
```

Returns `true` if the input is in 32-bytes hash format, otherwise it returns `false`.

**Parameters**

| Name  | Type   | Description                                                            |
| ----- | ------ | ---------------------------------------------------------------------- |
| input | string | The value to be examined that if it is in 32-bytes hash format or not. |

**Return Value**

| Type    | Description                                               |
| ------- | --------------------------------------------------------- |
| boolean | `true` means the input is in the format of 32-bytes hash. |

**Examples**

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

## isValidHashStrict <a href="#isvalidhashstrict" id="isvalidhashstrict"></a>

```javascript
caver.utils.isValidHashStrict(input)
```

Returns `true` if the input is in 0x-prefixed 32-bytes hash format, otherwise it returns `false`. This function only looks at the input and determines if it is in the format of 0x-prefixed 32-bytes hash. Difference to [caver.utils.isValidHash](#isvalidhash) is that it expects HEX to be prefixed with `0x`.

**Parameters**

| Name  | Type   | Description                                                                               |
| ----- | ------ | ----------------------------------------------------------------------------------------- |
| input | string | The value to be examined that if it is in the format of 0x-prefixed 32-bytes hash or not. |

**Return Value**

| Type    | Description                                                           |
| ------- | --------------------------------------------------------------------- |
| boolean | `true` means the input is in the format of 0x-prefixed 32-bytes hash. |

**Examples**

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

## isTxHash <a href="#istxhash" id="istxhash"></a>

```javascript
caver.utils.isTxHash(input)
```

Returns `true` if the input is in transaction hash format, otherwise it returns `false`. This function only looks at the input and determines if it is in the format of a transaction hash.

**NOTE** This function has been deprecated. Use [isValidHash](#isvalidhash) to determine if a valid hash is 32 bytes long.

**Parameters**

| Name  | Type   | Description                                                                              |
| ----- | ------ | ---------------------------------------------------------------------------------------- |
| input | string | The value to be determined if the parameter is in the format of transaction hash or not. |

**Return Value**

| Type    | Description                                                  |
| ------- | ------------------------------------------------------------ |
| boolean | `true` means the input is in the format of transaction hash. |

**Examples**

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

## isTxHashStrict <a href="#istxhashstrict" id="istxhashstrict"></a>

```javascript
caver.utils.isTxHashStrict(input)
```

Returns `true` if the input is in transaction hash format, otherwise it returns `false`. This function only looks at the input and determines if it is in the format of a transaction hash. Difference to [caver.utils.isTxHash](#istxhash) is that it expects HEX to be prefixed with `0x`.

**NOTE** This function has been deprecated. Use [isValidHashStrict](#isvalidhashstrict) to determine if a valid hash is 32 bytes long.

**Parameters**

| Name  | Type   | Description                                                                              |
| ----- | ------ | ---------------------------------------------------------------------------------------- |
| input | string | The value to be determined if the parameter is in the format of transaction hash or not. |

**Return Value**

| Type    | Description                                                  |
| ------- | ------------------------------------------------------------ |
| boolean | `true` means the input is in the format of transaction hash. |

**Examples**

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

## isValidPrivateKey <a href="#isvalidprivatekey" id="isvalidprivatekey"></a>

```javascript
caver.utils.isValidPrivateKey(privateKey)
```

Returns `true` if `privateKey` is valid, otherwise it returns `false`.

**Parameters**

| Name       | Type   | Description                       |
| ---------- | ------ | --------------------------------- |
| privateKey | string | A private key string to validate. |

**Return Value**

| Type    | Description                           |
| ------- | ------------------------------------- |
| boolean | `true` means the privateKey is valid. |

**Examples**

```javascript
> caver.utils.isValidPrivateKey('0x{private key}')
true

> caver.utils.isValidPrivateKey('{private key}')
true

> caver.utils.isValidPrivateKey('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
false
```

## isValidPublicKey <a href="#isvalidpublickey" id="isvalidpublickey"></a>

```javascript
caver.utils.isValidPublicKey(publicKey)
```

Returns `true` if publicKey is valid, otherwise it returns `false`.

**Parameters**

| Name      | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| publicKey | string | A public key string to validate. |

**Return Value**

| Type    | Description                          |
| ------- | ------------------------------------ |
| boolean | `true` means the publicKey is valid. |

**Examples**

```javascript
// validation with uncompressed public key
> caver.utils.isValidPublicKey('0xbd6405a7f14f57ecea4a6ffe774ee26d051f7eed13257c9a574055b20e42bab0e8beba92e2e675101eb2a55ba4693080d0bf14548beae7bc93b18b72d10dd350')
true

// validation with compressed public key
> caver.utils.isValidPublicKey('0x02bd6405a7f14f57ecea4a6ffe774ee26d051f7eed13257c9a574055b20e42bab0')
true

> caver.utils.isValidPublicKey('{private key}')
false

> caver.utils.isValidPublicKey('0x{private key}')
false

> caver.utils.isValidPublicKey('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
false
```

## isValidRole <a href="#isvalidrole" id="isvalidrole"></a>

```javascript
caver.utils.isValidRole(role)
```

Returns `true` if a role is valid, otherwise it returns `false`. You can check roles supported by caver-js through `caver.wallet.keyring.role`.

**Parameters**

| Name | Type   | Description                |
| ---- | ------ | -------------------------- |
| role | string | A role string to validate. |

**Return Value**

| Type    | Description                     |
| ------- | ------------------------------- |
| boolean | `true` means the role is valid. |

**Examples**

```javascript
> caver.utils.isValidRole('roleTransactionKey')
true

> caver.utils.isValidRole('role')
false
```

## isValidBlockNumberCandidate <a href="#isvalidblocknumbercandidate" id="isvalidblocknumbercandidate"></a>

```javascript
caver.utils.isValidBlockNumberCandidate(input)
```

Validates the block number (or block tag string).

The block number should be one of the types below:

* predefined block number ex:) 'latest', 'earliest', 'pending', 'genesis'
* hex
* finite number

**Parameters**

| Name        | Type             | Description                                                                                                                            |
| ----------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | string \| number | The block number to validate. This can be block number in number type or block tag(`latest`, `pending`, `earliest`, `genesis`) string. |

**Return Value**

| Type    | Description                        |
| ------- | ---------------------------------- |
| boolean | `true` means blockNumber is valid. |

**Examples**

```javascript
> caver.utils.isValidBlockNumberCandidate('latest')
true

> caver.utils.isValidBlockNumberCandidate('0x1')
true

> caver.utils.isValidBlockNumberCandidate(1)
true
```

## isPredefinedBlockNumber <a href="#ispredefinedblocknumber" id="ispredefinedblocknumber"></a>

```javascript
caver.utils.isPredefinedBlockNumber(input)
```

Returns `true` if the parameter is predefined block tag.

**Parameters**

| Name            | Type   | Description           |
| --------------- | ------ | --------------------- |
| predefinedBlock | string | The predefined block. |

**Return Value**

| Type    | Description                                                 |
| ------- | ----------------------------------------------------------- |
| boolean | `true` means predefinedBlock is valid predefined block tag. |

**Examples**

```javascript
> caver.utils.isPredefinedBlockNumber('latest')
true

> caver.utils.isPredefinedBlockNumber('0x1')
false
```

## isEmptySig <a href="#isemptysig" id="isemptysig"></a>

```javascript
caver.utils.isEmptySig(sig)
```

Returns `true` if sig is in the format of empty signature (`SignatureData { _v: '0x01', _r: '0x', _s: '0x' }` or `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`), otherwise it returns `false`.

In caver-js, if signatures or feePayerSignatures is empty, the value representing an empty signature, `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`, is returned for the property. This function is used to check whether the given signature is `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]` (or `SignatureData { _v: '0x01', _r: '0x', _s: '0x' }` in the 'LEGACY' transaction).

**Parameters**

| Name | Type            | Description                                                                                                                                                     |
| ---- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sig  | object \| Array | An instance of [SignatureData](caver-wallet/keyring.md#signaturedata) or array of [SignatureData](caver-wallet/keyring.md#signaturedata) to check empty or not. |

**Return Value**

| Type    | Description                    |
| ------- | ------------------------------ |
| boolean | `true` means the sig is empty. |

**Examples**

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

Returns `true` if key is in [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) format, otherwise it returns `false`.

**Parameters**

| Name | Type   | Description                                                    |
| ---- | ------ | -------------------------------------------------------------- |
| key  | string | A key string to check in the format of KlaytnWalletKey or not. |

**Return Value**

| Type    | Description                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| boolean | `true` means the key is `0x{private key}0x{type}0x{address in hex}` or `{private key}0x{type}0x{address in hex}`. |

**Examples**

```javascript
> caver.utils.isKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
true

> caver.utils.isKlaytnWalletKey('{private key}0x{type}0x{address in hex}')
true

> caver.utils.isKlaytnWalletKey('0x{private key}')
false
```

## bufferToHex <a href="#buffertohex" id="buffertohex"></a>

```javascript
caver.utils.bufferToHex(buffer)
```

Converts buffer to 0x-prefixed hex string.

**Parameters**

| Name   | Type   | Description                        |
| ------ | ------ | ---------------------------------- |
| buffer | Buffer | A buffer to convert to hex string. |

**Return Value**

| Type   | Description                 |
| ------ | --------------------------- |
| string | The 0x-prefixed hex string. |

**Examples**

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

Parses [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) string to an array which includes "private key", "type", "address".

**Parameters**

| Name | Type   | Description                                                                                 |
| ---- | ------ | ------------------------------------------------------------------------------------------- |
| key  | string | A [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) string. |

**Return Value**

| Type  | Description                 |
| ----- | --------------------------- |
| Array | The parsed KlaytnWalletKey. |

**Examples**

```javascript
> caver.utils.parseKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
[
    '0x{private key}',
    '0x00',
    '0x885ebdb17c221ef695936b18a0263d6399e14d60'
]
```

## hashMessage <a href="#hashmessage" id="hashmessage"></a>

```javascript
caver.utils.hashMessage(message)
```

Hashes message with Klaytn specific prefix: `keccak256("\x19Klaytn Signed Message:\n" + len(message) + message))`

**Parameters**

| Name    | Type   | Description                                                               |
| ------- | ------ | ------------------------------------------------------------------------- |
| message | string | A message to hash. If it is a HEX string, it will be UTF-8 decoded first. |

**Return Value**

| Type   | Description                                     |
| ------ | ----------------------------------------------- |
| string | The hashed message with Klaytn specific prefix. |

**Examples**

```javascript
> caver.utils.hashMessage('Hello')
'0x640bfab59b6e27468abd367888f4ab1a1c77aa2b45e76a1d3adcbd039c305917'
```

## recover <a href="#recover" id="recover"></a>

```javascript
caver.utils.recover(message, signature [, isHashed])
```

Recovers the Klaytn address that was used to sign the given data.

**Parameters**

| Name      | Type            | Description                                                                                                                                                                                                                        |
| --------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message   | string          | Either message or hashed message.                                                                                                                                                                                                  |
| signature | object \| Array | An instance of [SignatureData](caver-wallet/keyring.md#signaturedata).                                                                                                                                                             |
| isHashed  | boolean         | (optional, default: `false`) If the last parameter is `true`, the given `message` will NOT automatically be prefixed with `"\x19Klaytn Signed Message:\n" + message.length + message`, and will be assumed to be already prefixed. |

**Return Value**

| Type   | Description                                |
| ------ | ------------------------------------------ |
| string | The Klaytn address used to sign this data. |

**Examples**

```javascript
> caver.utils.recover('message', new caver.wallet.keyring.signatureData(['0x1b', '0x50a80...', '0x021de...']))
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('message', ['0x1b', '0x50a80...', '0x021de...'])
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('message', { v: '0x1b', r: '0x50a80...', s: '0x021de...' })
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('0xe960248437f2134a77a9aa0ebcbb6523aec095f23b02e25f16fd95e99b099daa', sig, true)
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'
```

## recoverPublicKey <a href="#recoverpublickey" id="recoverpublickey"></a>

```javascript
caver.utils.recoverPublicKey(message, signature [, isHashed])
```

Recovers the public key that was used to sign the given data.

**NOTE** `caver.utils.recoverPublicKey` is supported since caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Parameters**

| Name      | Type            | Description                                                                                                                                                   |
| --------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message   | string          | Either message or hashed message.                                                                                                                             |
| signature | object \| Array | An instance of [SignatureData](caver-wallet/keyring.md#signaturedata).                                                                                        |
| isHashed  | boolean         | (optional, default: `false`) Whether the message passed as a parameter is hashed with the prefix `"\x19Klaytn Signed Message:\n" + message.length + message`. |

**Return Value**

| Type   | Description                            |
| ------ | -------------------------------------- |
| string | The public key used to sign this data. |

**Examples**

```javascript
> caver.utils.recoverPublicKey('Some Message', new caver.wallet.keyring.signatureData([
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
]))
'0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3'

> caver.utils.recoverPublicKey('Some Message', [
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
])
'0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3'

> caver.utils.recoverPublicKey('0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a', {
	v: '0x1b',
	r: '0x3acab5ba6f884eccfb9642018aa6debab1310d99b7a84ae9acb8f52f567cf16a',
	s: '0x3501ae03809bf93222c4683642fa8fdc36385709c70ed8e7b883b34d66a5b8a4',
}, true)
'0xdd352dbe1c49aa9addaa3ca762de476a1b4deca3ac15fbb7fac153737b3ddb1e3249e1c2d86d5cbeaf6d30d366a211532683b59cb5f402bf3fe14989a378d45d'
```

## publicKeyToAddress <a href="#publickeytoaddress" id="publickeytoaddress"></a>

```javascript
caver.utils.publicKeyToAddress('0x{public key}')
```

Returns an address derived from a public key. This function simply converts the public key string into an address form by hashing it. It has nothing to do with an actual account on Klaytn.

**NOTE** `caver.utils.publicKeyToAddress` is supported since caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Parameters**

| Name      | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| publicKey | string | The public key string to get the address. |

**Return Value**

| Type   | Description                                   |
| ------ | --------------------------------------------- |
| string | The address string derived from a public key. |

**Examples**

```javascript
> caver.utils.publicKeyToAddress('0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3')
'0xA84A1CE657e9d5b383cECE6f4bA365e23Fa234Dd'
```

## compressPublicKey <a href="#compresspublickkey" id="compresspublickkey"></a>

```javascript
caver.utils.compressPublicKey(uncompressedPublicKey)
```

Compresses the uncompressed public key.

**Parameters**

| Name                  | Type   | Description                 |
| --------------------- | ------ | --------------------------- |
| uncompressedPublicKey | string | An uncompressed public key. |

**Return Value**

| Type   | Description              |
| ------ | ------------------------ |
| string | A compressed public key. |

**Examples**

```javascript
> caver.utils.compressPublicKey('0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632')
'0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248'
```

## decompressPublicKey <a href="#decompresspublickkey" id="decompresspublickkey"></a>

```javascript
caver.utils.decompressPublicKey(compressedPublicKey)
```

Decompresses the compressed public key.

**Parameters**

| Name                | Type   | Description              |
| ------------------- | ------ | ------------------------ |
| compressedPublicKey | string | A compressed public key. |

**Return Value**

| Type   | Description                 |
| ------ | --------------------------- |
| string | An uncompressed public key. |

**Examples**

```javascript
> caver.utils.decompressPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
'0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632'
```

## isCompressedPublicKey <a href="#iscompressedpublickey" id="iscompressedpublickey"></a>

```javascript
caver.utils.isCompressedPublicKey(publicKey)
```

Returns `true` if public key is compressed, otherwise `false`.

**Parameters**

| Name      | Type   | Description   |
| --------- | ------ | ------------- |
| publicKey | string | A public key. |

**Return Value**

| Type    | Description              |
| ------- | ------------------------ |
| boolean | `true` means compressed. |

**Examples**

```javascript
> caver.utils.isCompressedPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
true
```

## decodeSignature <a href="#decodesignature" id="decodesignature"></a>

```javascript
caver.utils.decodeSignature('0x{signature}')
```

Decodes a raw signature data composed of 'R(32 byte) + S(32 byte) + V(1byte)'.

**NOTE** `caver.utils.decodeSignature` is supported since caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Parameters**

| Name      | Type   | Description                                                                           |
| --------- | ------ | ------------------------------------------------------------------------------------- |
| signature | string | The signature string to decode. It is composed of R(32bytes) + S(32bytes) + V(1byte). |

**Return Value**

| Type   | Description                                                |
| ------ | ---------------------------------------------------------- |
| object | A `SignatureData` instance that includes `v`, `r` and `s`. |

**Examples**

```javascript
> caver.utils.decodeSignature('0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae81b')
SignatureData {
  _v: '0x1b',
  _r: '0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258',
  _s: '0x642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae8'
}
```
