---
description: caver-js APIs related to ABI encoding and decoding.
---

# caver.kaia.abi

The `caver-kaia-abi` package allows you to de- and encode parameters from an ABI (Application Binary Interface). This will be used for calling functions of a deployed smart-contract.

## encodeFunctionSignature <a id="encodefunctionsignature"></a>

```javascript
caver.kaia.abi.encodeFunctionSignature(functionSignature)
```

Encodes the function signature to its ABI signature, which are the first 4 bytes of the sha3 hash of the function name including types.

**Parameters**

| Name              | Type               | Description                                                                                                                                                                                                                                    |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| functionSignature | String \\| Object | The function signature or the JSON interface object of the function to encode. If String it has to be in the form `function(type,type,...)`, e.g: `myFunction(uint256,uint32[],bytes10,bytes)` |

**Return Value**

| Type   | Description                                        |
| ------ | -------------------------------------------------- |
| String | The ABI signature of the function. |

**Examples**

```javascript
// From a JSON interface object
caver.kaia.abi.encodeFunctionSignature({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
})
> 0x24ee0097

// From a function signature
caver.kaia.abi.encodeFunctionSignature('myMethod(uint256,string)')
> '0x24ee0097'
```

## encodeEventSignature <a id="encodeeventsignature"></a>

```javascript
caver.kaia.abi.encodeEventSignature(eventSignature)
```

Encodes the event signature to its ABI signature, which is the sha3 hash of the event name including input types.

**Parameters**

| Name           | Type               | Description                                                                                                                                                                                                                        |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventSignature | String \\| Object | The event signature or the JSON interface object of the event to encode. If string it has to be in the form `event(type,type,...)`, e.g: `myEvent(uint256,uint32[],bytes10,bytes)` |

**Return Value**

| Type   | Description                                     |
| ------ | ----------------------------------------------- |
| String | The ABI signature of the event. |

**Examples**

```javascript
// From a JSON interface object
caver.kaia.abi.encodeEventSignature({
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
> 0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97

// From an event signature
caver.kaia.abi.encodeEventSignature('myEvent(uint256,bytes32)')
> 0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97
```

## encodeParameter <a id="encodeparameter"></a>

```javascript
caver.kaia.abi.encodeParameter(type, parameter)
```

Encodes a parameter based on its type to its ABI representation.

**Parameters**

| Name      | Type               | Description                                                                                                                                             |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type      | String \\| Object | The type of the parameter, see the [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)  for a list of types. |
| parameter | Mixed              | The actual parameter to encode.                                                                                                         |

**Return Value**

| Type   | Description                                |
| ------ | ------------------------------------------ |
| String | The ABI encoded parameter. |

**Examples**

```javascript
caver.kaia.abi.encodeParameter('uint256', '2345675643')
> "0x000000000000000000000000000000000000000000000000000000008bd02b7b"

caver.kaia.abi.encodeParameter('bytes32', caver.utils.rightPad('0xdf3234', 64))
> "0xdf32340000000000000000000000000000000000000000000000000000000000"

caver.kaia.abi.encodeParameter('bytes', '0xdf3234')
> "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003df32340000000000000000000000000000000000000000000000000000000000"

caver.kaia.abi.encodeParameter('bytes32[]', [caver.utils.rightPad('0xdf3234', 64), caver.utils.rightPad('0xfdfd', 64)])
> "00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002df32340000000000000000000000000000000000000000000000000000000000fdfd000000000000000000000000000000000000000000000000000000000000"
```

## encodeParameters <a id="encodeparameters"></a>

```javascript
caver.kaia.abi.encodeParameters(typesArray, parameters)
```

Encodes function parameters based on its JSON interface object.

**Parameters**

| Name       | Type                                   | Description                                                                                                                                                                                        |
| ---------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typesArray | Array\\<String\\|Object\>\\|Object | An array with types or a JSON interface of a function. See the [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html) for a list of types. |
| parameters | Array                                  | The parameters to encode.                                                                                                                                                          |

**Return Value**

| Type   | Description                                 |
| ------ | ------------------------------------------- |
| String | The ABI encoded parameters. |

**Examples**

```javascript
caver.kaia.abi.encodeParameters(['uint256','string'], ['2345675643', 'Hello!%'])
> "0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000"

caver.kaia.abi.encodeParameters(['uint8[]','bytes32'], [['34','255'], caver.utils.rightPad('0x324567fff', 64)])
> "0x0000000000000000000000000000000000000000000000000000000000000040324567fff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000ff"
```

## encodeFunctionCall <a id="encodefunctioncall"></a>

```javascript
caver.kaia.abi.encodeFunctionCall(jsonInterface, parameters)
```

Encodes a function call using its JSON interface object and given parameters.

**Parameters**

| Name          | Type   | Description                                              |
| ------------- | ------ | -------------------------------------------------------- |
| jsonInterface | Object | The JSON interface object of a function. |
| parameters    | Array  | The parameters to encode.                |

**Return Value**

| Type   | Description                                                                                 |
| ------ | ------------------------------------------------------------------------------------------- |
| String | The ABI encoded function call, which means function signature + parameters. |

**Examples**

```javascript
caver.kaia.abi.encodeFunctionCall({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
}, ['2345675643', 'Hello!%'])
> "0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000"
```

## decodeParameter <a id="decodeparameter"></a>

```javascript
caver.kaia.abi.decodeParameter(type, hexString)
```

Decodes an ABI encoded parameter to its JavaScript type.

**Parameters**

| Name      | Type             | Description                                                                                                                                            |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type      | String\\|Object | The type of the parameter, see the [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html) for a list of types. |
| hexString | Array            | The ABI byte code to decode.                                                                                                           |

**Return Value**

| Type  | Description                            |
| ----- | -------------------------------------- |
| Mixed | The decoded parameter. |

**Examples**

```javascript
caver.kaia.abi.decodeParameter('uint256', '0x0000000000000000000000000000000000000000000000000000000000000010')
> "16"

caver.kaia.abi.decodeParameter('string', '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
> "Hello!%!"
```

## decodeParameters <a id="decodeparameters"></a>

```javascript
caver.kaia.abi.decodeParameters(typesArray, hexString)
```

Decodes ABI encoded parameters to its JavaScript types.

**Parameters**

| Name       | Type                                   | Description                                                                                                                                                                                        |
| ---------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typesArray | Array\\<String\\|Object\>\\|Object | An array with types or a JSON interface outputs array. See the [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html) for a list of types. |
| hexString  | String                                 | The ABI byte code to decode.                                                                                                                                                       |

**Return Value**

| Type   | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| Object | The result object containing the decoded parameters. |

**Examples**

```javascript
caver.kaia.abi.decodeParameters(['string', 'uint256'], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
> Result { '0': 'Hello!%!', '1': '234' }

caver.kaia.abi.decodeParameters([{
        type: 'string',
        name: 'myString'
    },{
        type: 'uint256',
        name: 'myNumber'
    }], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
> Result {
    '0': 'Hello!%!',
    '1': '234',
    myString: 'Hello!%!',
    myNumber: '234'
}
```

## decodeLog <a id="decodelog"></a>

```javascript
caver.kaia.abi.decodeLog(inputs, hexString, topics)
```

Decodes ABI encoded log data and indexed topic data.

**Parameters**

| Name      | Type   | Description                                                                                                                                                                                                                                              |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| inputs    | Array  | A JSON interface inputs array. See the [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html) for a list of types.                                                                               |
| hexString | String | The ABI byte code in the `data` field of a log.                                                                                                                                                                                          |
| topics    | Array  | An array with the index parameter topics of the log, without the topic[0] if its a non-anonymous event, otherwise with topic[0]. |

**Return Value**

| Type   | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| Object | The result object containing the decoded parameters. |

**Examples**

```javascript
caver.kaia.abi.decodeLog([{
        type: 'string',
        name: 'myString'
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
> Result {
    '0': 'Hello%!',
    '1': '62224',
    '2': '16',
    myString: 'Hello%!',
    myNumber: '62224',
    mySmallNumber: '16'
}
```

## encodeContractDeploy <a id="encodecontractdeploy"></a>

```javascript
caver.kaia.abi.encodeContractDeploy(jsonInterface, hexString, params)
```

Encode smart contract bytecode with the arguments of the constructor.

**Parameters**

| Name          | Type   | Description                                                  |
| ------------- | ------ | ------------------------------------------------------------ |
| jsonInterface | Array  | The JSON interface of the contract.          |
| hexString     | String | A bytecode of smart contract to be deployed. |
| params        | Mixed  | Arguments to pass to the constructor.        |

**Return Value**

| Type   | Description                                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| String | The ABI encoded smart contract deployment with constructor arguments, which means byteCode + parameters. |

**Examples**

```javascript
// There is no argument for constructor
caver.kaia.abi.encodeContractDeploy([
        {"constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
    ],'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029')
> "0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029"

// There is one argument for constructor(uint256)
caver.kaia.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf0029', 1)
> "0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf00290000000000000000000000000000000000000000000000000000000000000001"

// There are two arguments for constructor(uint256, uint256)
caver.kaia.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2)
> "0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee002900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002"

// There is one argument for constructor(string)
caver.kaia.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a60029', 'stringParams')
> "0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a600290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c737472696e67506172616d730000000000000000000000000000000000000000"
```
