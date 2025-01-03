# caver.abi

通过 `caver.abi` 软件包，您可以使用 ABI（应用程序二进制接口）对参数进行解码和编码。 这将用于调用已部署智能合约的功能。

## 编码函数签名<a id="encodefunctionsignature"></a>

```javascript
caver.abi.encodeFunctionSignature(functionSignature)
```

将函数签名编码为 ABI 签名，即函数名称（包括参数类型）的 sha3 哈希值的前 4 个字节。

**参数**

| 名称                | 类型                 | 描述                                                                                                                   |
| ----------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| functionSignature | string \\| object | 要编码的函数的函数签名或 JSON 接口对象。 如果是字符串，必须以 `function(type, type,...)` 的形式出现，例如： `myFunction(uint256,uint32[],bytes10,bytes)` |

**返回价值**

| 类型     | 描述          |
| ------ | ----------- |
| string | 函数的 ABI 签名。 |

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

将事件签名编码为 ABI 签名，即事件名称（包括输入参数类型）的 sha3 哈希值。

**参数**

| 名称             | 类型                 | 描述                                                                                                                                                                                                                                                   |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventSignature | string \\| object | 要编码的事件签名或 JSON 接口对象。 如果是字符串，则必须采用 "event(type,type,...) "的形式，例如："myEvent(uint256,uint32[],bytes10,bytes)"。 |

**返回价值**

| 类型     | 描述          |
| ------ | ----------- |
| string | 事件的 ABI 签名。 |

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

根据参数类型将参数编码为 ABI 表示法。

**参数**

| 名称        | 类型                 | 描述                                                                                 |
| --------- | ------------------ | ---------------------------------------------------------------------------------- |
| type      | string \\| object | 参数的类型，类型列表请参见 [solidity 文档](http://solidity.readthedocs.io/en/develop/types.html)。 |
| parameter | Mixed              | 要编码的实际参数。                                                                          |

**注意** `caver.kct.kip7.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。 有关 `tuple` 类型的更多详情，请参阅 [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types)。

**返回价值**

| 类型     | 描述        |
| ------ | --------- |
| string | ABI 编码参数。 |

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

根据 JSON 接口对象对函数参数进行编码。

**参数**

| 名称         | 类型                | 描述                                                                                                   |
| ---------- | ----------------- | ---------------------------------------------------------------------------------------------------- |
| typesArray | Array \\| object | 包含函数类型或 JSON 接口的数组。 有关类型的列表，请参见 [solidity 文档](http://solidity.readthedocs.io/en/develop/types.html)。 |
| parameters | Array             | 要编码的参数。                                                                                              |

**注意** `caver.kct.kip7.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。 有关 `tuple` 类型的更多详情，请参阅 [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types)。

**返回价值**

| 类型     | 描述        |
| ------ | --------- |
| string | ABI 编码参数。 |

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

使用 JSON 接口对象和给定参数对函数调用进行编码。

**参数**

| 名称            | 类型     | 描述             |
| ------------- | ------ | -------------- |
| jsonInterface | object | 函数的 JSON 接口对象。 |
| parameters    | Array  | 要编码的参数。        |

**返回价值**

| 类型     | 描述                      |
| ------ | ----------------------- |
| string | ABI 编码的函数调用，即函数签名 + 参数。 |

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

从函数或函数 abi 字符串的 abi 对象中解码函数调用，并返回参数。

**注意** `caver.abi.decodeFunctionCall` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 开始支持。

**参数**

| 名称           | 类型     | 描述           |
| ------------ | ------ | ------------ |
| abi          | object | 函数的 abi 对象。  |
| functionCall | string | 编码后的函数调用字符串。 |

**返回价值**

| 类型     | 描述                                              |
| ------ | ----------------------------------------------- |
| object | 包含纯参数的对象。 您可以使用 `result[0]` ，因为它可以像数组一样按参数顺序访问。 |

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

将 ABI 编码的参数解码为 JavaScript 类型。

**参数**

| 名称        | 类型                 | 描述                                                                                 |
| --------- | ------------------ | ---------------------------------------------------------------------------------- |
| type      | string \\| object | 参数的类型，类型列表请参见 [solidity 文档](http://solidity.readthedocs.io/en/develop/types.html)。 |
| hexstring | Array              | 要解码的 ABI 字节代码。                                                                     |

**注意** `caver.kct.kip7.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。 有关 `tuple` 类型的更多详情，请参阅 [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types)。

**返回价值**

| 类型    | 描述    |
| ----- | ----- |
| Mixed | 解码参数。 |

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

将 ABI 编码参数解码为 JavaScript 类型。

**参数**

| 名称         | 类型                | 描述                                                                                                     |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------ |
| typesArray | Array \\| object | 包含类型的数组或 JSON 接口输出数组。 有关类型的列表，请参见 [solidity 文档](http://solidity.readthedocs.io/en/develop/types.html)。 |
| hexstring  | string            | 要解码的 ABI 字节代码。                                                                                         |

**注意**\* 自 caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0) 起支持`tuple`类型。 有关 `tuple` 类型的更多详情，请参阅 [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types)。

**返回价值**

| 类型     | 描述           |
| ------ | ------------ |
| object | 包含解码参数的结果对象。 |

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

解码 ABI 编码日志数据和索引主题数据。

**参数**

| 名称        | 类型     | 描述                                                                                                                                                            |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| inputs    | Array  | 一个 JSON 接口输入数组。 有关类型的列表，请参见 [solidity 文档](http://solidity.readthedocs.io/en/develop/types.html)。                                                              |
| hexstring | string | 日志的 `data` 字段中的 ABI 字节代码。                                                                                                                                     |
| topics    | Array  | 日志的索引参数主题数组。 如果是非匿名事件，这个数组就没有 topic[0]，否则就有 topic[0]。 |

**返回价值**

| 类型     | 描述           |
| ------ | ------------ |
| object | 包含解码日志的结果对象。 |

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

用构造函数的参数编码智能合约字节码。

**参数**

| 名称            | 类型     | 描述                                 |
| ------------- | ------ | ---------------------------------- |
| jsonInterface | Array  | 合同的 JSON 接口。                       |
| hexstring     | string | 要部署的智能合约字节码。                       |
| params        | Mixed  | (可选）传递给构造函数的参数。 |

**返回价值**

| 类型     | 描述                              |
| ------ | ------------------------------- |
| string | ABI 编码的智能合约部署带有构造器参数，即字节码 + 参数。 |

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
