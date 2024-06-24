---
description: A caver-js object used to interact with a smart contract.
---

# caver.kaia.Contract

The `caver.kaia.Contract` object makes it easy to interact with smart contracts on the Kaia blockchain. When you create a new contract object, you give it the JSON interface of the respective smart contract and caver will auto convert all calls into low level ABI calls over RPC for you.

This allows you to interact with smart contracts as if they were JavaScript objects.

## new contract <a id="new-contract"></a>

```javascript
new caver.kaia.Contract(jsonInterface [, address] [, options])
```

Creates a new contract instance with all its methods and events defined in its JSON interface object.

**Parameters**

| Name          | Type   | Description                                                                                                                                                     |
| :------------ | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| jsonInterface | Object | The JSON interface for the contract to instantiate                                                                                                              |
| address       | String | \(optional\) The address of the smart contract to call. Can be added later using `myContract.options.address = '0x1234..'` |
| options       | Object | \(optional\) The options of the contract.  See the table below for the details.                            |

The options object contains the following:

| Name     | Type   | Description                                                                                                                            |
| :------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------- |
| from     | String | \(optional\) The address from which transactions should be made.                                  |
| gasPrice | String | \(optional\) The gas price in kei to use for transactions.                                        |
| gas      | Number | \(optional\) The maximum gas provided for a transaction \(gas limit\).       |
| data     | String | \(optional\) The byte code of the contract. Used when the contract gets deployed. |

**Return Value**

| Type   | Description                                                            |
| :----- | :--------------------------------------------------------------------- |
| Object | The contract instance with all its methods and events. |

**Example**

```javascript
var myContract = new caver.kaia.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
      from: '0x1234567890123456789012345678901234567891', // default from address
      gasPrice: '25000000000' // default gas price in kei, 25 Gkei in this case
});

var myContract = new caver.kaia.Contract([...], 'myContract', {
      from: '0x1234567890123456789012345678901234567891', // default from address
      gasPrice: '25000000000' // default gas price in kei, 25 Gkei in this case
});
```

## options <a id="options"></a>

```javascript
myContract.options
```

The `options` object for the contract instance. `from`, `gas` and `gasPrice` are used as fallback values when sending transactions.

**Properties**

| Name          | Type   | Description                                                                                                                                    |
| :------------ | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| address       | String | The address where the contract is deployed.  Also see [options.address](#options-address).     |
| jsonInterface | Array  | The JSON interface of the contract.  Also see [options.jsonInterface](#options-jsoninterface). |
| data          | String | The byte code of the contract. Used when the contract gets deployed.                                           |
| from          | String | The address from which transactions should be made.                                                                            |
| gasPrice      | String | The gas price in kei to use for transactions.                                                                                  |
| gas           | Number | The maximum gas provided for a transaction \(gas limit\).                                                 |

**Example**

```javascript
> myContract.options;
{
    address: '0x1234567890123456789012345678901234567891',
    jsonInterface: [...],
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    gasPrice: '10000000000000',
    gas: 1000000
}

> myContract.options.from = '0x1234567890123456789012345678901234567891'; // default from address
> myContract.options.gasPrice = '25000000000000'; // default gas price in kei
> myContract.options.gas = 5000000; // provide as fallback always 5M gas
```

## options.address <a id="options-address"></a>

```javascript
myContract.options.address
```

The address used for this contract instance `myContract`. All transactions generated by caver-js from this contract will contain this address as the "to". The address is stored in lowercase.

**Property**

| Name    | Type               | Description                                                                   |
| :------ | :----------------- | :---------------------------------------------------------------------------- |
| address | String \\| `null` | The address for this contract or `null` if it is not yet set. |

**Example**

```javascript
>  myContract.options.address;
'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// set a new address
>  myContract.options.address = '0x1234FFDD...';
```

## options.jsonInterface <a id="options-jsoninterface"></a>

```javascript
myContract.options.jsonInterface
```

The JSON interface object derived from the ABI of this contract `myContract`.

**Property**

| Name          | Type  | Description                                                                                                                                            |
| :------------ | :---- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| jsonInterface | Array | The JSON interface for this contract. Re-setting this will regenerate the methods and events of the contract instance. |

**Example**

```javascript
> myContract.options.jsonInterface;
[{
      "type":"function",
      "name":"foo",
      "inputs": [{"name":"a","type":"uint256"}],
      "outputs": [{"name":"b","type":"address"}]
 },{
      "type":"event",
      "name":"Event"
      "inputs": [{"name":"a","type":"uint256","indexed":true},{"name":"b","type":"bytes32","indexed":false}],
 }]

// set a new interface
> myContract.options.jsonInterface = [...];
```

## clone <a id="clone"></a>

```javascript
myContract.clone()
```

Clones the current contract instance.

**Parameters**

None

**Return Value**

| Type   | Description                                       |
| :----- | :------------------------------------------------ |
| Object | The new cloned contract instance. |

**Example**

```javascript
> var contract1 = new caver.kaia.Contract(abi, address, {gasPrice: '12345678', from: fromAddress});
> var contract2 = contract1.clone();
> contract2.options.address = address2;
> (contract1.options.address !== contract2.options.address);
true
```

## deploy <a id="deploy"></a>

```javascript
myContract.deploy(options)
```

Deploys the contract to the Kaia blockchain. After successful deployment, the promise will be resolved with a new contract instance.

**Parameters**

`options`: the options object used for deployment:

| Name      | Type   | Description                                                                                                       |
| :-------- | :----- | :---------------------------------------------------------------------------------------------------------------- |
| data      | String | The byte code of the contract.                                                                    |
| arguments | Array  | \(optional\) The arguments that get passed to the constructor on deployment. |

**Return Value**

`Object`: The transaction object:

| Type     | Description                                                                                                                                                                                    |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Array    | arguments: The arguments passed to the method before. They can be changed.                                                                     |
| Function | [send](#methods-mymethod-send): Will deploy the contract. The promise will be resolved with the new contract instance, instead of the receipt. |
| Function | [estimateGas](#methods-mymethod-estimategas): Will estimate the gas used for the deployment.                                                                   |
| Function | [encodeABI](#methods-mymethod-encodeabi): Encodes the ABI of the deployment, which is contract data + constructor parameters.                                  |

**Example**

```javascript
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My String']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  }, function(error, transactionHash) { ... })
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) // contains the new contract address
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  });

// When the data is already set as an option to the contract itself
> myContract.options.data = '0x12345...';

> myContract.deploy({
        arguments: [123, 'My String']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  });

// Simply encoding
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My String']
  })
  .encodeABI();
'0x12345...0000012345678765432'

// Gas estimation
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My String']
  })
  .estimateGas(function(err, gas) {
      console.log(gas);
  });
```

## methods <a id="methods"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]])
```

Creates a transaction object for that method, which then can be called, sent, estimated or ABI encoded.

The methods of this smart contract are available through:

- The name: `myContract.methods.myMethod(123)`
- The name with parameters: `myContract.methods['myMethod(uint256)'](123)`
- The signature\*: `myContract.methods['0x58cf5f10'](123)`

This allows calling functions with the same name but different parameters from the JavaScript contract object.

## cf\) \*Function signature \(Function selector\) <a id="cf-function-signature-function-selector"></a>

The first four bytes of the call data for a function call specifies the function to be called.\
It is the first \(left, high-order in big-endian\) four bytes of the Keccak-256 \(SHA-3\) hash of the signature of the function.

The function signature can be made by 2 different methods.

1. `caver.kaia.abi.encodeFunctionSignature('funcName(paramType1,paramType2,...)')`
2. `caver.utils.sha3('funcName(paramType1,paramType2,...)').substr(0, 10)`

ex\)

```javascript
caver.kaia.abi.encodeFunctionSignature('myMethod(uint256)')
> 0x58cf5f10

caver.utils.sha3('myMethod(uint256)').substr(0, 10)
> 0x58cf5f10
```

**Parameters**

Parameters of any method depend on the smart contracts methods, defined in the JSON interface.

**Return Value**

`Object`: The transaction object:

| Type     | Description                                                                                                                                                                                                                                                     |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Array    | arguments: The arguments passed to the method before. They can be changed.                                                                                                                                      |
| Function | [call](#methods-mymethod-call): Will call the "constant" method and execute its smart contract method in the Kaia Virtual Machine without sending a transaction \(cannot alter the smart contract state\). |
| Function | [send](#methods-mymethod-send): Will send a transaction to the smart contract and execute its method \(can alter the smart contract state\).                                                               |
| Function | [estimateGas](#methods-mymethod-estimategas): Will estimate the gas used when the method would be executed on the blockchain.                                                                                                   |
| Function | [encodeABI](#methods-mymethod-encodeabi): Encodes the ABI for this method. This can be sent using a transaction, calling the method or passing into another smart contract method as argument.                  |

**Example**

```javascript
// calling a method
> myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result) {
      ...
  });

// or sending and using a promise
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  });

// or sending and using the events
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .on('transactionHash', function(hash) {
      ...
  })
  .on('receipt', function(receipt) {
      ...
  })
  .on('error', console.error);
```

## methods.myMethod.call <a id="methods-mymethod-call"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]]).call(options [, callback])
```

Will call a "constant" method and execute its smart contract method in the Kaia Virtual Machine without sending any transaction. Note that calling cannot alter the smart contract state.

**Parameters**

| Name     | Type     | Description                                                                                                                                                                                                 |
| :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options  | Object   | \(optional\) The options used for calling.  See the table below for the details.                                                                       |
| callback | Function | \(optional\) This callback will be fired with the result of the smart contract method execution as the second argument, or with an error object as the first argument. |

The options object can contain the following:

| Name     | Type   | Description                                                                                                                                |
| :------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| from     | String | \(optional\) The address the call “transaction” should be made from.                                  |
| gasPrice | String | \(optional\) The gas price in kei to use for this call "transaction".                                 |
| gas      | Number | \(optional\) The maximum gas provided for this call "transaction" \(gas limit\). |

**Return Value**

`Promise` returns `Mixed`: The return value\(s\) of the smart contract method. If it returns a single value, it is returned as it is. If it has multiple return values, they are returned as an object with properties and indices.

**Example**

```javascript
// using the callback
> myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result) {
      ...
  });

// using the promise
> myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(result) {
      ...
  });
```

```text
// Solidity: MULTI-ARGUMENT RETURN
contract MyContract {
    function myFunction() returns(uint256 myNumber, string myString) {
        return (23456, "Hello!%");
    }
}
```

```javascript
> var MyContract = new caver.kaia.Contract(abi, address);
> MyContract.methods.myFunction().call().then(console.log);
Result {
      myNumber: '23456',
      myString: 'Hello!%',
      0: '23456', // these are here as fallbacks if the name is not known or given
      1: 'Hello!%'
}
```

```text
// Solidity: SINGLE-ARGUMENT RETURN
contract MyContract {
    function myFunction() returns(string myString) {
        return "Hello!%";
    }
}
```

```javascript
> var MyContract = new caver.kaia.Contract(abi, address);
> MyContract.methods.myFunction().call().then(console.log);
"Hello!%"
```

## methods.myMethod.send <a id="methods-mymethod-send"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]]).send(options [, callback])
```

Will send a transaction to the smart contract and execute its method. Note that this can alter the smart contract state.

**Parameters**

| Name     | Type     | Description                                                                                                                                                    |
| :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options  | Object   | The options used for sending.  See the table below for the details.                                                            |
| callback | Function | \(optional\) This callback will be fired first with the "transactionHash", or with an error object as the first argument. |

The options object can contain the following:

| Name     | Type                                      | Description                                                                                         |
| :------- | :---------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| from     | String                                    | The address from which the transaction should be sent.                              |
| gasPrice | String                                    | \(optional\) The gas price in kei to use for this transaction. |
| gas      | Number                                    | The maximum gas provided for this transaction \(gas limit\).   |
| value    | Number \\| String \\| BN \\| BigNumber | \(optional\) The value transferred for the transaction in kei. |

**Return Value**

`callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available, or if this `send()` is called from a `someContract.deploy()`, then the promise will be resolved with the new contract instance. Additionally, the following events are available:

| Name            | Type   | Description                                                                                                                                                                                                                                                                                                                                   |
| :-------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | String | Is fired right after the transaction is sent and a transaction hash is available.                                                                                                                                                                                                                                             |
| receipt         | Object | Is fired when the transaction receipt is available.  Receipts from contracts will have no `logs` property, but instead an `events` property with event names as keys and events as properties. See [getPastEvents return values](#getpastevents) for details about the returned event object. |
| error           | Error  | Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.                                                                                                                                                                                                      |

**Example**

```javascript
// using the callback
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, transactionHash) {
    ...
  });

// using the promise
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  });


// using the event emitter
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .on('transactionHash', function(hash) {
    ...
  })
  .on('receipt', function(receipt) {
    console.log(receipt);
  })
  .on('error', console.error); // If there is an out-of-gas error, the second parameter is the receipt.

// receipt example
{
   "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
   "transactionIndex": 0,
   "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
   "blockNumber": 3,
   "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
   "gasUsed": 30234,
   "events": {
     "MyEvent": {
       returnValues: {
         myIndexedParam: 20,
         myOtherIndexedParam: '0x123456789...',
         myNonIndexParam: 'My String'
       },
       raw: {
         data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
         topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
       },
       event: 'MyEvent',
       signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       logIndex: 0,
       transactionIndex: 0,
       transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
       blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       blockNumber: 1234,
       address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    "MyOtherEvent": {
      ...
    },
    "MyMultipleEvent":[{...}, {...}] // If there are a multiple of the same events, they will be in an array.
  }
}
```

## methods.myMethod.estimateGas <a id="methods-mymethod-estimategas"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]]).estimateGas(options [, callback])
```

Will estimate the gas that a method execution will take when executed in the Kaia Virtual Machine. The estimation can differ from the actual gas used when later sending a transaction, as the state of the smart contract can be different at that time.

**Parameters**

| Name     | Type     | Description                                                                                                                                                                                |
| :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options  | Object   | \(optional\) The options used for calling.  See the table below for the details.                                                      |
| callback | Function | \(optional\) This callback will be fired with the result of the gas estimation as the second argument, or with an error object as the first argument. |

The options object can contain the following:

| Name  | Type                                      | Description                                                                                                                                                                                                                                                                                |
| :---- | :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from  | String                                    | \(optional\) The address from which the call "transaction" should be made.                                                                                                                                                                            |
| gas   | Number                                    | \(optional\) The maximum gas provided for this call "transaction" \(gas limit\). Setting a specific value helps to detect out of gas errors. If all gas is used, it will return the same number. |
| value | Number \\| String \\| BN \\| BigNumber | \(optional\) The value transferred for the call "transaction" in kei.                                                                                                                                                                                 |

**Return Value**

`Promise` returns `Number` - the used gas for the simulated call/transaction.

**Example**

```javascript
// using the callback
> myContract.methods.myMethod(123).estimateGas({gas: 5000000}, function(error, gasAmount) {
    if(gasAmount == 5000000)
      console.log('Method ran out of gas');
  });

// using the promise
> myContract.methods.myMethod(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(gasAmount) {
    ...
  })
  .catch(function(error) {
    ...
  });
```

## methods.myMethod.encodeABI <a id="methods-mymethod-encodeabi"></a>

```javascript
myContract.methods.myMethod([param1 [, param2[, ...]]]).encodeABI()
```

Encodes the ABI for this method. This can be used to send a transaction, call a method, or pass it into another smart contract method as arguments.

**Parameters**

None

**Return Value**

| Type   | Description                                                                  |
| :----- | :--------------------------------------------------------------------------- |
| String | The encoded ABI byte code to send via a transaction or call. |

**Example**

```javascript
> myContract.methods.myMethod(123).encodeABI();
'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```

## once <a id="once"></a>

```javascript
myContract.once(event [, options], callback)
```

Subscribes to an event and unsubscribes immediately after the first event or error. Will only fire for a single event.

**Parameters**

| Name     | Type     | Description                                                                                                                                                                                                                         |
| :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event    | String   | The name of the event in the contract, or `"allEvents"` to get all events.                                                                                                                                          |
| options  | Object   | \(optional\) The options used for deployment.  See the table below for the details.                                                                                            |
| callback | Function | This callback will be fired for the first event as the second argument, or an error as the first argument. See [getPastEvents return values](#getpastevents) for details about the event structure. |

The options object can contain the following:

| Name   | Type   | Description                                                                                                                                                                                                                    |
| :----- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter | Object | \(optional\) Lets you filter events by indexed parameters, _e.g._, `{filter: {myNumber: [12,13]}}` means all events where "myNumber" is 12 or 13.         |
| topics | Array  | \(optional\) This allows you to manually set the topics for the event filter. If given the filter property and event signature, `topic[0]` will not be set automatically. |

**Return Value**

`undefined`

**Example**

```javascript
> myContract.once('MyEvent', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  }, function(error, event) { console.log(event); });

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
```

## events <a id="events"></a>

```javascript
myContract.events.MyEvent([options][, callback])
```

Subscribes to an event.

**Parameters**

| Name     | Type     | Description                                                                                                                                             |
| :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| options  | Object   | \(optional\) The options used for deployment.  See the table below for the details.                |
| callback | Function | \(optional\) This callback will be fired for each event as the second argument, or an error as the first argument. |

The options object can contain the following:

| Name      | Type   | Description                                                                                                                                                                                                                |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter    | Object | \(optional\) Lets you filter events by indexed parameters, _e.g._, `{filter: {myNumber: [12,13]}}` means all events where "myNumber" is 12 or 13.     |
| fromBlock | Number | \(optional\) The block number from which to get events on.                                                                                                                            |
| topics    | Array  | \(optional\) This allows to manually set the topics for the event filter. If given the filter property and event signature, `topic[0]` will not be set automatically. |

**Return Value**

`EventEmitter`: The event emitter has the following events:

| Name  | Type   | Description                                                                     |
| :---- | :----- | :------------------------------------------------------------------------------ |
| data  | Object | Fires on each incoming event with the event object as argument. |
| error | Object | Fires when an error in the subscription occurs.                 |

The structure of the returned event `Object` looks as follows:

| Name                       | Type               | Description                                                                                                                                                                 |
| :------------------------- | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event                      | String             | The event name.                                                                                                                                             |
| signature                  | String \\| `null` | The event signature, `null` if it is an anonymous event.                                                                                                    |
| address                    | String             | Address which from this event originated.                                                                                                                   |
| returnValues               | Object             | The return values coming from the event, _e.g._, `{myVar: 1, myVar2: '0x234...'}`.                                          |
| logIndex                   | Number             | Integer of the event index position in the block.                                                                                                           |
| transactionIndex           | Number             | Integer of the transaction's index position where the event was created.                                                                                    |
| transactionHash            | 32-byte String     | Hash of the block this event was created in. `null` when it is still pending.                                                               |
| blockHash                  | 32-byte String     | Hash of the block this event was created in. `null` when it is still pending.                                                               |
| blockNumber                | Number             | The block number this log was created in. `null` when still pending.                                                                        |
| raw.data   | String             | The data containing non-indexed log parameter.                                                                                                              |
| raw.topics | Array              | An array with max 4 32-byte topics, topic 1-3 contains indexed parameters of the event.                                                                     |
| id                         | String             | A log identifier. It is made through concatenating "log_" string with `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)` |

**Example**

```javascript
> myContract.events.MyEvent({
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
  }, function(error, event) { console.log(event); })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
  })
  .on('error', console.error);

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    id: 'log_41d221bc',
}
```

## events.allEvents <a id="events-allevents"></a>

```javascript
myContract.events.allEvents([options] [, callback])
```

Same as [events](#events) but receives all events from this smart contract. Optionally, the filter property can filter those events.

## getPastEvents <a id="getpastevents"></a>

```javascript
myContract.getPastEvents(event [, options] [, callback])
```

Gets past events for this contract.

**Parameters**

| Name     | Type     | Description                                                                                                                                                          |
| :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event    | String   | The name of the event in the contract, or `"allEvents"` to get all events.                                                                           |
| options  | Object   | \(optional\) The options used for deployment.  See the table below for the details.                             |
| callback | Function | \(optional\) This callback will be fired with an array of event logs as the second argument, or an error as the first argument. |

The options object can contain the following:

| Name      | Type   | Description                                                                                                                                                                                                                 |
| :-------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter    | Object | \(optional\) Lets you filter events by indexed parameters, _e.g._, `{filter: {myNumber: [12,13]}}` means all events where "myNumber" is 12 or 13.      |
| fromBlock | Number | \(optional\) The block number from which to get events on.                                                                                                                             |
| toBlock   | Number | \(optional\) The block number to get events up to \(defaults to `"latest"`\).                                                                                     |
| topics    | Array  | \(optional\) This allows manually setting the topics for the event filter. If given the filter property and event signature, `topic[0]` will not be set automatically. |

**Return Value**

`Promise` returns `Array`: An array with the past event objects, matching the given event name and filter.

**Example**

```javascript
> myContract.getPastEvents('MyEvent', {
      filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: 'latest'
  }, function(error, events) { console.log(events); })
  .then(function(events) {
      console.log(events) // same results as the optional callback above
  });

[{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
},{
      ...
}]
```
