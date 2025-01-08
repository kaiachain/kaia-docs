# caver.abi

通過 `caver.abi` 軟件包，您可以使用 ABI（應用程序二進制接口）對參數進行解碼和編碼。 這將用於調用已部署智能合約的功能。

## 編碼函數簽名<a id="encodefunctionsignature"></a>

```javascript
caver.abi.encodeFunctionSignature(functionSignature)
```

將函數簽名編碼為 ABI 簽名，即函數名稱（包括參數類型）的 sha3 哈希值的前 4 個字節。

**參數**

| 名稱                | 類型                 | 描述                                                                                                                   |
| ----------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| functionSignature | string \\| object | 要編碼的函數的函數簽名或 JSON 接口對象。 如果是字符串，必須以 `function(type, type,...)` 的形式出現，例如： `myFunction(uint256,uint32[],bytes10,bytes)` |

**返回價值**

| 類型     | 描述          |
| ------ | ----------- |
| string | 函數的 ABI 簽名。 |

**示例**

```javascript
// From a JSON interface object
> caver.abi.encodeFunctionSignature({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'mystring'
    }]
})
'0x24ee0097'

// From a function signature
> caver.abi.encodeFunctionSignature('myMethod(uint256,string)')
'0x24ee0097'
```

## encodeEventSignature <a id="encodeeventsignature"></a>

```javascript
caver.abi.encodeEventSignature(eventSignature)
```

將事件簽名編碼為 ABI 簽名，即事件名稱（包括輸入參數類型）的 sha3 哈希值。

**參數**

| 名稱             | 類型                 | 描述                                                                                                                                                                                                                                                   |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventSignature | string \\| object | 要編碼的事件簽名或 JSON 接口對象。 如果是字符串，則必須採用 "event(type,type,...) "的形式，例如："myEvent(uint256,uint32[],bytes10,bytes)"。 |

**返回價值**

| 類型     | 描述          |
| ------ | ----------- |
| string | 事件的 ABI 簽名。 |

**示例**

```javascript
// From a JSON interface object
> caver.abi.encodeEventSignature({
    name: 'myEvent',
    type: 'event',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'bytes32',
        name: 'myBytes'
    }]
})
'0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97'

// From an event signature
> caver.abi.encodeEventSignature('myEvent(uint256,bytes32)')
'0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97'
```

## encodeParameter <a id="encodeparameter"></a>

```javascript
caver.abi.encodeParameter(type, parameter)
```

根據參數類型將參數編碼為 ABI 表示法。

**參數**

| 名稱        | 類型                 | 描述                                                                                 |
| --------- | ------------------ | ---------------------------------------------------------------------------------- |
| type      | string \\| object | 參數的類型，類型列表請參見 [solidity 文檔](http://solidity.readthedocs.io/en/develop/types.html)。 |
| parameter | Mixed              | 要編碼的實際參數。                                                                          |

**注意** `caver.kct.kip7.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。 有關 `tuple` 類型的更多詳情，請參閱 [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types)。

**返回價值**

| 類型     | 描述        |
| ------ | --------- |
| string | ABI 編碼參數。 |

**示例**

```javascript
> caver.abi.encodeParameter('uint256', '2345675643')
'0x000000000000000000000000000000000000000000000000000000008bd02b7b'

> caver.abi.encodeParameter('bytes32', caver.utils.rightPad('0xdf3234', 64))
'0xdf32340000000000000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameter('bytes', '0xdf3234')
'0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003df32340000000000000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameter('bytes32[]', [caver.utils.rightPad('0xdf3234', 64), caver.utils.rightPad('0xfdfd', 64)])
'0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002df32340000000000000000000000000000000000000000000000000000000000fdfd000000000000000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameter('tuple(bytes32,bool)', ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true])
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001'

> caver.abi.encodeParameter(
    {
        components: [{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
        name: 'tupleExample',
        type: 'tuple',
    },
    ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true]
)
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001'
```

## encodeParameters <a id="encodeparameters"></a>

```javascript
caver.abi.encodeParameters(typesArray, parameters)
```

根據 JSON 接口對象對函數參數進行編碼。

**參數**

| 名稱         | 類型                | 描述                                                                                                   |
| ---------- | ----------------- | ---------------------------------------------------------------------------------------------------- |
| typesArray | Array \\| object | 包含函數類型或 JSON 接口的數組。 有關類型的列表，請參見 [solidity 文檔](http://solidity.readthedocs.io/en/develop/types.html)。 |
| parameters | Array             | 要編碼的參數。                                                                                              |

**注意** `caver.kct.kip7.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。 有關 `tuple` 類型的更多詳情，請參閱 [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types)。

**返回價值**

| 類型     | 描述        |
| ------ | --------- |
| string | ABI 編碼參數。 |

**示例**

```javascript
> caver.abi.encodeParameters(['uint256','string'], ['2345675643', 'Hello!%'])
'0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameters(['uint8[]','bytes32'], [['34','255'], caver.utils.rightPad('0x324567fff', 64)])
'0x0000000000000000000000000000000000000000000000000000000000000040324567fff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000ff'

> caver.abi.encodeParameters(
    ['tuple(bytes32,bool)', 'tuple(bool,address)'],
    [
        ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true],
        [true, '0x77656c636f6d6520746f20657468657265756d2e']
    ]
)
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'

> caver.abi.encodeParameters(
    [
        {
            components: [{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
            name: 'tupleExample',
            type: 'tuple',
        },
        {
            components: [{ name: 'c', type: 'bool' }, { name: 'd', type: 'address' }],
            name: 'tupleExample2',
            type: 'tuple',
        },
    ],
    [
        ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true],
        [true, '0x77656c636f6d6520746f20657468657265756d2e']
    ]
)
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'
```

## encodeFunctionCall<a id="encodefunctioncall"></a>

```javascript
caver.abi.encodeFunctionCall(jsonInterface, parameters)
```

使用 JSON 接口對象和給定參數對函數調用進行編碼。

**參數**

| 名稱            | 類型     | 描述             |
| ------------- | ------ | -------------- |
| jsonInterface | object | 函數的 JSON 接口對象。 |
| parameters    | Array  | 要編碼的參數。        |

**返回價值**

| 類型     | 描述                      |
| ------ | ----------------------- |
| string | ABI 編碼的函數調用，即函數簽名 + 參數。 |

**示例**

```javascript
> caver.abi.encodeFunctionCall({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'mystring'
    }]
}, ['2345675643', 'Hello!%'])
'0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000'
```

## decodeFunctionCall <a id="decodefunctioncall"></a>

```javascript
caver.abi.decodeFunctionCall(abi, functionCall)
```

從函數或函數 abi 字符串的 abi 對象中解碼函數調用，並返回參數。

**注意** `caver.abi.decodeFunctionCall` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱           | 類型     | 描述           |
| ------------ | ------ | ------------ |
| abi          | object | 函數的 abi 對象。  |
| functionCall | string | 編碼後的函數調用字符串。 |

**返回價值**

| 類型     | 描述                                              |
| ------ | ----------------------------------------------- |
| object | 包含純參數的對象。 您可以使用 `result[0]` ，因為它可以像數組一樣按參數順序訪問。 |

**示例**

```javascript
> caver.abi.decodeFunctionCall({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'mystring'
    }]
}, '0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000')
Result {
  '0': '2345675643',
  '1': 'Hello!%',
  __length__: 2,
  myNumber: '2345675643',
  mystring: 'Hello!%'
}
```

## decodeParameter <a id="decodeparameter"></a>

```javascript
caver.abi.decodeParameter(type, hexstring)
```

將 ABI 編碼的參數解碼為 JavaScript 類型。

**參數**

| 名稱        | 類型                 | 描述                                                                                 |
| --------- | ------------------ | ---------------------------------------------------------------------------------- |
| type      | string \\| object | 參數的類型，類型列表請參見 [solidity 文檔](http://solidity.readthedocs.io/en/develop/types.html)。 |
| hexstring | Array              | 要解碼的 ABI 字節代碼。                                                                     |

**注意** `caver.kct.kip7.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。 有關 `tuple` 類型的更多詳情，請參閱 [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types)。

**返回價值**

| 類型    | 描述    |
| ----- | ----- |
| Mixed | 解碼參數。 |

**示例**

```javascript
> caver.abi.decodeParameter('uint256', '0x0000000000000000000000000000000000000000000000000000000000000010')
'16'

> caver.abi.decodeParameter('string', '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
'Hello!%!'

> caver.abi.decodeParameter('tuple(bytes32,bool)', '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001')
[ '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true ]

> caver.abi.decodeParameter(
    {
        components: [{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
        name: 'tupleExample',
        type: 'tuple',
    },
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001'
)
[
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
    true,
    a: '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
    b: true
]
```

## decodeParameters <a id="decodeparameters"></a>

```javascript
caver.abi.decodeParameters(typesArray, hexstring)
```

將 ABI 編碼參數解碼為 JavaScript 類型。

**參數**

| 名稱         | 類型                | 描述                                                                                                     |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------ |
| typesArray | Array \\| object | 包含類型的數組或 JSON 接口輸出數組。 有關類型的列表，請參見 [solidity 文檔](http://solidity.readthedocs.io/en/develop/types.html)。 |
| hexstring  | string            | 要解碼的 ABI 字節代碼。                                                                                         |

**注意**\* 自 caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0) 起支持`tuple`類型。 有關 `tuple` 類型的更多詳情，請參閱 [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types)。

**返回價值**

| 類型     | 描述           |
| ------ | ------------ |
| object | 包含解碼參數的結果對象。 |

**示例**

```javascript
> caver.abi.decodeParameters(['string', 'uint256'], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
Result { '0': 'Hello!%!', '1': '234' }

> caver.abi.decodeParameters([{
        type: 'string',
        name: 'mystring'
    },{
        type: 'uint256',
        name: 'myNumber'
    }], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
Result {
    '0': 'Hello!%!',
    '1': '234',
    mystring: 'Hello!%!',
    myNumber: '234'
}

> caver.abi.decodeParameters(
    ['tuple(bytes32,bool)', 'tuple(bool,address)'],
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'
)
Result {
    '0': [ '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true ],
    '1': [ true, '0x77656c636f6d6520746F20657468657265756d2E' ],
}

> caver.abi.decodeParameters(
    [
        {
            components: [{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
            name: 'tupleExample',
            type: 'tuple',
        },
        {
            components: [{ name: 'c', type: 'bool' }, { name: 'd', type: 'address' }],
            name: 'tupleExample2',
            type: 'tuple',
        },
    ],
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'
)
Result {
    '0': [
        '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
        true,
        a: '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
        b: true
    ],
    '1': [
        true,
        '0x77656c636f6d6520746F20657468657265756d2E',
        c: true,
        d: '0x77656c636f6d6520746F20657468657265756d2E'
    ],
    tupleExample: [
        '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
        true,
        a: '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
        b: true
    ],
    tupleExample2: [
        true,
        '0x77656c636f6d6520746F20657468657265756d2E',
        c: true,
        d: '0x77656c636f6d6520746F20657468657265756d2E'
    ]
}
```

## decodeLog <a id="decodelog"></a>

```javascript
caver.abi.decodeLog(inputs, hexstring, topics)
```

解碼 ABI 編碼日誌數據和索引主題數據。

**參數**

| 名稱        | 類型     | 描述                                                                                                                                                            |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| inputs    | Array  | 一個 JSON 接口輸入數組。 有關類型的列表，請參見 [solidity 文檔](http://solidity.readthedocs.io/en/develop/types.html)。                                                              |
| hexstring | string | 日誌的 `data` 字段中的 ABI 字節代碼。                                                                                                                                     |
| topics    | Array  | 日誌的索引參數主題數組。 如果是非匿名事件，這個數組就沒有 topic[0]，否則就有 topic[0]。 |

**返回價值**

| 類型     | 描述           |
| ------ | ------------ |
| object | 包含解碼日誌的結果對象。 |

**示例**

```javascript
> caver.abi.decodeLog([{
        type: 'string',
        name: 'mystring'
    },{
        type: 'uint256',
        name: 'myNumber',
        indexed: true
    },{
        type: 'uint8',
        name: 'mySmallNumber',
        indexed: true
    }],
    '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000',
    ['0x000000000000000000000000000000000000000000000000000000000000f310', '0x0000000000000000000000000000000000000000000000000000000000000010'])
Result {
    '0': 'Hello%!',
    '1': '62224',
    '2': '16',
    mystring: 'Hello%!',
    myNumber: '62224',
    mySmallNumber: '16'
}
```

## encodeContractDeploy <a id="encodecontractdeploy"></a>

```javascript
caver.abi.encodeContractDeploy(jsonInterface, hexstring [, params])
```

用構造函數的參數編碼智能合約字節碼。

**參數**

| 名稱            | 類型     | 描述                                 |
| ------------- | ------ | ---------------------------------- |
| jsonInterface | Array  | 合同的 JSON 接口。                       |
| hexstring     | string | 要部署的智能合約字節碼。                       |
| params        | Mixed  | (可選）傳遞給構造函數的參數。 |

**返回價值**

| 類型     | 描述                              |
| ------ | ------------------------------- |
| string | ABI 編碼的智能合約部署帶有構造器參數，即字節碼 + 參數。 |

**示例**

```javascript
// There is no argument for constructor
> caver.abi.encodeContractDeploy([
        {"constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
    ],'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029')
'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029'

// There is one argument for constructor(uint256)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf0029', 1)
'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf00290000000000000000000000000000000000000000000000000000000000000001'

// There are two arguments for constructor(uint256, uint256)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2)
'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee002900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002'

// There is one argument for constructor(string)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a60029', 'stringParams')
'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a600290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c737472696e67506172616d730000000000000000000000000000000000000000'
```
