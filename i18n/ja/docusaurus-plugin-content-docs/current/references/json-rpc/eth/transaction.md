# Transaction

## eth_call <a id="eth_call"></a>

Executes a new message call immediately, without creating a transaction on the block chain. The eth_call method can be used to query internal contract state, to execute validations coded into a contract or even to test what the effect of a transaction would be without running it live.

**Parameters**

| Name             | Type            | Description                                                                                                                                                                                                                                                                                                      |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject       | Object          | The transaction call object. See the next table for the object's properties.                                                                                                                                                                                                                                     |
| blockNumberOrTag | QUANTITY \| TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](./block.md#the-default-block-parameter). The block number is mandatory and defines the context (state) against which the specified transaction should be executed. |
| stateOverrideSet | Object          | The state override set is an optional address-to-state mapping, where each entry specifies some state to be ephemerally overridden prior to executing the call.                                                                                                                                                  |

`callObject` has the following properties:

| Name     | Type         | Description                                                                                                                                                                          |
| -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from     | 20-byte DATA | (optional) Address the transaction is simulated to have been sent from. The `0x00..0` address is used if no address is specified.                                 |
| to       | 20-byte DATA | (optional) Address the transaction is sent to.                                                                                                                    |
| gas      | QUANTITY     | (optional) Maximum gas allowance for the code execution to avoid infinite loops. Defaults to 2^63 or whatever value the node operator specified via --rpc.gascap. |
| gasPrice | QUANTITY     | (optional) Number of `peb` to simulate paying for each unit of gas during execution. Defaults to `0` peb.                                                         |
| value    | QUANTITY     | (optional) Amount of `peb` to simulate sending along with the transaction. Defaults to `0`.                                                                       |
| input    | DATA         | (optional) Hash of the method signature and encoded parameter. It replaces `data` field, but `data` field is still supported for backward compatibility.          |

**Example - callObject**

```json
{
  "from": "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3",
  "to": "0xebe8efa441b9302a0d7eaecc277c09d20d684540",
  "gas": "0x1bd7c",
  "input": "0xd459fc46000000000000000000000000000000000000000000000000000000000046c650dbb5e8cb2bac4d2ed0b1e6475d37361157738801c494ca482f96527eb48f9eec488c2eba92d31baeccfb6968fad5c21a3df93181b43b4cf253b4d572b64172ef000000000000000000000000000000000000000000000000000000000000008c00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000002b85c0c828d7a98633b4e1b65eac0c017502da909420aeade9a280675013df36bdc71cffdf420cef3d24ba4b3f9b980bfbb26bd5e2dcf7795b3519a3fd22ffbb2000000000000000000000000000000000000000000000000000000000000000238fb6606dc2b5e42d00c653372c153da8560de77bd9afaba94b4ab6e4aa11d565d858c761320dbf23a94018d843772349bd9d92301b0ca9ca983a22d86a70628"
}
```

`stateOverrideSet` has the following properties:

| Name      | Type     | Description                                                                                                                         |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| balance   | Quantity | (optional) Fake balance to set for the account before executing the call.                                        |
| nonce     | Quantity | (optional) Fake nonce to set for the account before executing the call.                                          |
| code      | DATA     | (optional) Fake EVM bytecode to inject into the account before executing the call.                               |
| state     | Object   | (optional) Fake key-value mapping to override all slots in the account storage before executing the call.        |
| stateDiff | Object   | (optional) Fake key-value mapping to override individual slots in the account storage before executing the call. |

The goal of the state override set is manyfold:

- It can be used by DApps to reduce the amount of contract code needed to be deployed on chain. Code that simply returns
  internal state or does pre-defined validations can be kept off chain and fed to the node on-demand.
- It can be used for smart contract analysis by extending the code deployed on chain with custom methods and invoking
  them. This avoids having to download and reconstruct the entire state in a sandbox to run custom code against.
- It can be used to debug smart contracts in an already deployed large suite of contracts by selectively overriding some
  code or state and seeing how execution changes. Specialized tooling will probably be necessary.

**Example - stateOverrideSet**

```json
{
  "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3": {
    "balance": "0xde0b6b3a7640000"
  },
  "0xebe8efa441b9302a0d7eaecc277c09d20d684540": {
    "code": "0x...",
    "state": {
      "0ccfa7da0b3522161999fd723e497b1a3556598653325c2fe7f0b2a98c9d6aae": "c70447ca5ce4344e32ae8234c5e70a446e26b39a5b636b502983ea7a555ab21c"
    }
  }
}
```

**Example**

To test call in meaningful way, you need to setup test environment like below.

- Deploy KIP-7 Contract to test call or you can use it with already deployed one.
  - We will use KIP-7 contract function `totalSupply` to check whether call is working or not in this example.
  - To call `totalSupply` you should know about its function signature which is `0x18160ddd`.

In this example:

- The address of KIP-7 contract: `0xbE3892d33620bE5aca8c75D39e7401871194d290` (You should use an existing contract
  address.)
- The address of caller: `0xca7a99380131e6c76cfa622396347107aeedca2d`

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_call", "params": [{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0xbE3892d33620bE5aca8c75D39e7401871194d290", "input": "0x18160ddd"}, "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x0000000000000000000000000000000000000000000000000de0b6b3a7640000"}
```

**Example - StateOverrides**

Following the example above, let's test call using state overrides feature.

- We will replace the bytecode of `0xbE3892d33620bE5aca8c75D39e7401871194d290` which is the address of KIP-7 contract
  already deployed above (Check the above example).
- The bytecode to be replaced
  is `6080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e64cec114604e5780636057361d146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a9565b005b60008054905090565b80600081905550505600a165627a7a723058207783dba41884f73679e167576362b7277f88458815141651f48ca38c25b498f80029`
  .
  - The original source code of this bytecode is below.

```solidity
pragma solidity ^0.4.24;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

Now let's override the state of `0xbE3892d33620bE5aca8c75D39e7401871194d290` (KIP-7 contract) with another contract's
byte code (Storage contract)
and call `retrieve` (function signature: `0x2e64cec1`) of Storage contract.

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_call", "params": [{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0xbE3892d33620bE5aca8c75D39e7401871194d290", "input": "0x2e64cec1"}, "latest", {"0xbE3892d33620bE5aca8c75D39e7401871194d290": {"code":"0x6080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e64cec114604e5780636057361d146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a9565b005b60008054905090565b80600081905550505600a165627a7a723058207783dba41884f73679e167576362b7277f88458815141651f48ca38c25b498f80029"}}], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x0000000000000000000000000000000000000000000000000000000000000000"}
```

## eth_estimateGas <a id="eth_estimategas"></a>

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction
will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually
used by the transaction, for a variety of reasons including EVM mechanics and node performance.

**Parameters**

| Name       | Type   | Description                                                                  |
| ---------- | ------ | ---------------------------------------------------------------------------- |
| callObject | Object | The transaction call object. See the next table for the object's properties. |

`callObject` has the following properties:

| Name     | Type         | Description                                                                                                                                                                          |
| -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from     | 20-byte DATA | (optional) Address the transaction is simulated to have been sent from. The `0x00..0` address is used if no address is specified.                                 |
| to       | 20-byte DATA | (optional) Address the transaction is sent to.                                                                                                                    |
| gas      | QUANTITY     | (optional) Maximum gas allowance for the code execution to avoid infinite loops. Defaults to 2^63 or whatever value the node operator specified via --rpc.gascap. |
| gasPrice | QUANTITY     | (optional) Number of `peb` to simulate paying for each unit of gas during execution. Defaults to `0` peb.                                                         |
| value    | QUANTITY     | (optional) Amount of `peb` to simulate sending along with the transaction. Defaults to `0`.                                                                       |
| input    | DATA         | (optional) Hash of the method signature and encoded parameter. It replaces `data` field, but `data` field is still supported for backward compatibility.          |

**Example - callObject**

```json
{
  "from": "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3",
  "to": "0xebe8efa441b9302a0d7eaecc277c09d20d684540",
  "gas": "0x1bd7c",
  "input": "0xd459fc46000000000000000000000000000000000000000000000000000000000046c650dbb5e8cb2bac4d2ed0b1e6475d37361157738801c494ca482f96527eb48f9eec488c2eba92d31baeccfb6968fad5c21a3df93181b43b4cf253b4d572b64172ef000000000000000000000000000000000000000000000000000000000000008c00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000002b85c0c828d7a98633b4e1b65eac0c017502da909420aeade9a280675013df36bdc71cffdf420cef3d24ba4b3f9b980bfbb26bd5e2dcf7795b3519a3fd22ffbb2000000000000000000000000000000000000000000000000000000000000000238fb6606dc2b5e42d00c653372c153da8560de77bd9afaba94b4ab6e4aa11d565d858c761320dbf23a94018d843772349bd9d92301b0ca9ca983a22d86a70628"
}
```

**Return Value**

| Type     | Description             |
| -------- | ----------------------- |
| QUANTITY | The amount of gas used. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "eth_estimateGas", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}], "id": 1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x5208" // 21000
}
```

## eth_getTransactionByBlockHashAndIndex <a id="eth_gettransactionbyblockhashandindex"></a>

Returns information about a transaction by block hash and transaction index position.

Please check the [Caution-Transaction](./caution.md#transaction) before using this API.

**Parameters**

| Type         | Description                                |
| ------------ | ------------------------------------------ |
| 32-byte DATA | Hash of a block.                           |
| QUANTITY     | Integer of the transaction index position. |

**Return Value**

See [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Example**

To see examples of various transaction types, check [eth_getTransactionByHash](#eth_gettransactionbyhash)

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68", "0x0"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gas": "0x19a28",
    "gasPrice": "0x5d21dba00",
    "hash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "input": "0xa9059cbb000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8000000000000000000000000000000000000000000000000000000000cd0a3c0",
    "nonce": "0x1bea18",
    "r": "0x85d848276f22f8ce5aa17cd27ded21269e17cacc258ef2aaece296497803aa9",
    "s": "0x2d9ae07f349c66628b02db7033a8a35d18f6338c39f995d7e8336d635002df54",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionIndex": "0x3",
    "type": "0x0",
    "v": "0x25",
    "value": "0x0"
  }
}
```

## eth_getTransactionByBlockNumberAndIndex <a id="eth_gettransactionbyblocknumberandindex"></a>

Returns information about a transaction by block number and transaction index position.

Please check the [Caution-Transaction](./caution.md#transaction) before using this API.

**Parameters**

| Type            | Description                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| QUANTITY \| TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"`  as in the [default block parameter](./block.md#the-default-block-parameter). |
| QUANTITY        | The transaction index position.                                                                                                                                          |

**Return Value**

See [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Example**

To see examples of various transaction types, check [eth_getTransactionByHash](#eth_gettransactionbyhash)

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x27", "0x0"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gas": "0x19a28",
    "gasPrice": "0x5d21dba00",
    "hash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "input": "0xa9059cbb000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8000000000000000000000000000000000000000000000000000000000cd0a3c0",
    "nonce": "0x1bea18",
    "r": "0x85d848276f22f8ce5aa17cd27ded21269e17cacc258ef2aaece296497803aa9",
    "s": "0x2d9ae07f349c66628b02db7033a8a35d18f6338c39f995d7e8336d635002df54",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionIndex": "0x3",
    "type": "0x0",
    "v": "0x25",
    "value": "0x0"
  }
}
```

## eth_getTransactionByHash <a id="eth_gettransactionbyhash"></a>

Returns the information about a transaction requested by transaction hash.

Please check the [Caution-Transaction](./caution.md#transaction) before using this API.

**Parameters**

| Type         | Description            |
| ------------ | ---------------------- |
| 32-byte DATA | Hash of a transaction. |

**Return Value**

Fields of transaction can be different based on transaction types. Currently, there are three types of transactions in
Ethereum(Legacy, [AccessList](https://eips.ethereum.org/EIPS/eip-2930)
, [DynamicFee](https://eips.ethereum.org/EIPS/eip-1559)).

`Object` - A transaction object, or `null` when no transaction was found:

**Legacy Transaction**

| Name             | Type         | Description                                                                        |
| ---------------- | ------------ | ---------------------------------------------------------------------------------- |
| blockHash        | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending.        |
| blockNumber      | QUANTITY     | Block number where this transaction was in. `null` when it is pending.             |
| from             | 20-byte DATA | Address of the sender.                                                             |
| gas              | QUANTITY     | Gas provided by the sender.                                                        |
| gasPrice         | QUANTITY     | Gas price provided by the sender in peb.                                           |
| hash             | 32-byte DATA | Hash of the transaction.                                                           |
| input            | DATA         | The data sent along with the transaction.                                          |
| nonce            | QUANTITY     | The number of transactions made by the sender prior to this one.                   |
| to               | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction.        |
| value            | QUANTITY     | Integer of values sent with this transaction.                                      |
| transactionIndex | QUANTITY     | Integer of the transaction index position in the block. `null` when it is pending. |
| type             | QUANTITY     | An integer representing the type of the transaction.                               |
| v                | QUANTITY     | ECDSA recovery id.                                                                 |
| r                | 32-byte DATA | ECDSA signature r.                                                                 |
| s                | 32-byte DATA | ECDSA signature s.                                                                 |

**Example - Legacy Transaction**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gas": "0x19a28",
    "gasPrice": "0x5d21dba00",
    "hash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "input": "0xa9059cbb000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8000000000000000000000000000000000000000000000000000000000cd0a3c0",
    "nonce": "0x1bea18",
    "r": "0x85d848276f22f8ce5aa17cd27ded21269e17cacc258ef2aaece296497803aa9",
    "s": "0x2d9ae07f349c66628b02db7033a8a35d18f6338c39f995d7e8336d635002df54",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionIndex": "0x3",
    "type": "0x0",
    "v": "0x25",
    "value": "0x0"
  }
}
```

**AccessList Transaction**

| Name             | Type         | Description                                                                        |
| ---------------- | ------------ | ---------------------------------------------------------------------------------- |
| blockHash        | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending.        |
| blockNumber      | QUANTITY     | Block number where this transaction was in. `null` when it is pending.             |
| from             | 20-byte DATA | Address of the sender.                                                             |
| gas              | QUANTITY     | Gas provided by the sender.                                                        |
| gasPrice         | QUANTITY     | Gas price provided by the sender in peb.                                           |
| hash             | 32-byte DATA | Hash of the transaction.                                                           |
| input            | DATA         | The data sent along with the transaction.                                          |
| nonce            | QUANTITY     | The number of transactions made by the sender prior to this one.                   |
| to               | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction.        |
| value            | QUANTITY     | Integer of values sent with this transaction.                                      |
| transactionIndex | QUANTITY     | Integer of the transaction index position in the block. `null` when it is pending. |
| type             | QUANTITY     | An integer representing the type of the transaction.                               |
| accessList       | Array        | An array of [accessList](https://eips.ethereum.org/EIPS/eip-2930).                 |
| chainId          | QUANTITY     | Chain id set on the requested node.                                                |
| v                | QUANTITY     | ECDSA recovery id.                                                                 |
| r                | 32-byte DATA | ECDSA signature r.                                                                 |
| s                | 32-byte DATA | ECDSA signature s.                                                                 |

**Example - AccessList Transaction**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xfe134fa592b5acdd353fc3c25c3ba9979b8582fee3e5ac9740f418813b405038"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x12bb73d1bfd0b8ec005839acc69926d5699005c7738455848b3438a549457457",
    "blockNumber": "0x3c",
    "from": "0x3753f5bf8cca929eeeb4b74f200dfc6375ad5444",
    "gas": "0x52080",
    "gasPrice": "0x99999",
    "hash": "0xfe134fa592b5acdd353fc3c25c3ba9979b8582fee3e5ac9740f418813b405038",
    "input": "0x",
    "nonce": "0x3",
    "to": "0xca7a99380131e6c76cfa622396347107aeedca2d",
    "transactionIndex": "0x0",
    "value": "0x1",
    "type": "0x1",
    "accessList": [
      {
        "address": "0xca7a99380131e6c76cfa622396347107aeedca2d",
        "storageKeys": [
          "0x0709c257577296fac29c739dad24e55b70a260497283cf9885ab67b4daa9b67f"
        ]
      }
    ],
    "chainId": "0x2edaf",
    "v": "0x0",
    "r": "0x7c2568b6970bc2a87f828ef10dbd83057369cb62cf7c9e2b21357f04c3685cf0",
    "s": "0x21a32ce836b06acadcf507748909e5d7efaf49825b6eafff583b1e751e0cd306"
  }
}
```

**DynamicFee Transaction**

| Name                 | Type         | Description                                                                        |
| -------------------- | ------------ | ---------------------------------------------------------------------------------- |
| blockHash            | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending.        |
| blockNumber          | QUANTITY     | Block number where this transaction was in. `null` when it is pending.             |
| from                 | 20-byte DATA | Address of the sender.                                                             |
| gas                  | QUANTITY     | Gas provided by the sender.                                                        |
| gasPrice             | QUANTITY     | Gas price provided by the sender in peb.                                           |
| maxFeePerGas         | QUANTITY     | A maximum amount to pay for the transaction to execute.                            |
| maxPriorityFeePerGas | QUANTITY     | Gas tip cap for dynamic fee transaction in peb.                                    |
| hash                 | 32-byte DATA | Hash of the transaction.                                                           |
| input                | DATA         | The data sent along with the transaction.                                          |
| nonce                | QUANTITY     | The number of transactions made by the sender prior to this one.                   |
| to                   | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction.        |
| value                | QUANTITY     | Integer of values sent with this transaction.                                      |
| transactionIndex     | QUANTITY     | Integer of the transaction index position in the block. `null` when it is pending. |
| type                 | QUANTITY     | An integer representing the type of the transaction.                               |
| accessList           | Array        | An array of [accessList](https://eips.ethereum.org/EIPS/eip-2930).                 |
| chainId              | QUANTITY     | Chain id set on the requested node.                                                |
| v                    | QUANTITY     | ECDSA recovery id.                                                                 |
| r                    | 32-byte DATA | ECDSA signature r.                                                                 |
| s                    | 32-byte DATA | ECDSA signature s.                                                                 |

**Example - DynamicFee Transaction**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x40e64aac79b2e51b05d41adc005e45d4618ad5e8783f8fac9e3af63b4f6cf27d"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x2228ad3dd7588af51060adbdd6b4ac8c50ef91d59bea5399b2fa439138720886",
    "blockNumber": "0x4a",
    "from": "0x3753f5bf8cca929eeeb4b74f200dfc6375ad5444",
    "gas": "0x52080",
    "gasPrice": "0xa6528",
    "maxFeePerGas": "0xb6adf",
    "maxPriorityFeePerGas": "0x99999",
    "hash": "0x40e64aac79b2e51b05d41adc005e45d4618ad5e8783f8fac9e3af63b4f6cf27d",
    "input": "0x",
    "nonce": "0x4",
    "to": "0xca7a99380131e6c76cfa622396347107aeedca2d",
    "transactionIndex": "0x0",
    "value": "0x1",
    "type": "0x2",
    "accessList": [
      {
        "address": "0xca7a99380131e6c76cfa622396347107aeedca2d",
        "storageKeys": [
          "0x0709c257577296fac29c739dad24e55b70a260497283cf9885ab67b4daa9b67f"
        ]
      }
    ],
    "chainId": "0x2edaf",
    "v": "0x0",
    "r": "0xf7de95e3d4893cdb53c88fd5f7ec37a32df24da6a390259e470a5192cbefba46",
    "s": "0x2ba8cecb1332088ffc017cd9a08e613dabc306d16e593a42cda6f57def901292"
  }
}
```

## eth_getTransactionReceipt <a id="eth_gettransactionreceipt"></a>

Returns the receipt of a transaction by transaction hash.

**NOTE**: The receipt is not available for pending transactions.

Please check the [Caution-TransactionReceipt](./caution.md#transaction_receipt) before using this API.

**Parameters**

| Name | Type         | Description            |
| ---- | ------------ | ---------------------- |
| Hash | 32-byte DATA | Hash of a transaction. |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found

| Name              | Type          | Description                                                                                                                                                                                                                                  |
| ----------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash         | 32-byte DATA  | Hash of the block where this transaction was in.                                                                                                                                                                                             |
| blockNumber       | QUANTITY      | The block number where this transaction was in.                                                                                                                                                                                              |
| contractAddress   | DATA          | The contract address created, if the transaction was a contract creation, otherwise `null`.                                                                                                                                                  |
| cumulativeGasUsed | QUANTITY      | The total amount of gas used when this transaction was executed in the block.                                                                                                                                                                |
| effectiveGasPrice | QUANTITY      | The actual value per gas deducted from the senders account. Before EIP-1559, this is equal to the transaction's gas price. After, it is equal to baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas). |
| from              | 20-byte DATA  | Address of the sender.                                                                                                                                                                                                                       |
| logs              | Array         | Array of log objects, which this transaction generated.                                                                                                                                                                                      |
| logsBloom         | 256-byte DATA | Bloom filter for light clients to quickly retrieve related logs.                                                                                                                                                                             |
| status            | QUANTITY      | Either `1` (success) or `0` (failure).                                                                                                                                                                 |
| to                | 20-byte DATA  | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                                                  |
| transactionHash   | 32-byte DATA  | Hash of the transaction.                                                                                                                                                                                                                     |
| transactionIndex  | QUANTITY      | Integer of the transaction index position in the block.                                                                                                                                                                                      |
| type              | QUANTITY      | An integer representing the type of the transaction.                                                                                                                                                                                         |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "contractAddress": null,
    "cumulativeGasUsed": "0x8dc5d",
    "effectiveGasPrice": "0x315c2f4800",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gasUsed": "0xf6e9",
    "logs": [
      {
        "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
        "blockNumber": "0xd017a7",
        "data": "0x000000000000000000000000000000000000000000000000000000000cd0a3c0",
        "logIndex": "0x13",
        "removed": false,
        "topics": [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "0x00000000000000000000000046705dfff24256421a05d056c29e81bdc09723b8",
          "0x000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8"
        ],
        "transactionHash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
        "transactionIndex": "0x3"
      }
    ],
    "logsBloom": "0x00000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000400000000000000000008000000000000008000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000080000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000004000800000000000000000000000000000000000000000000000000000000000000",
    "status": "0x1",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionHash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "transactionIndex": "0x3",
    "type": "0x0"
  }
}
```

## eth_sendRawTransaction <a id="eth_sendrawtransaction"></a>

Creates a new message call transaction or a contract creation for signed transactions.

**Parameters**

| Type | Description                  |
| ---- | ---------------------------- |
| DATA | The signed transaction data. |

**Return Value**

| Type         | Description                                                                    |
| ------------ | ------------------------------------------------------------------------------ |
| 32-byte DATA | The transaction hash or the zero hash if the transaction is not yet available. |

If you deployed a contract, use [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address.

**Example**

```shell
params: ["0x02f8738203e982022980850ba43b740082f61894a2a8854b1802d8cd5de631e690817c253d6a9153888ac7230489e8000080c001a0493a13b7eb1ad33c0b9043e4de1f2a5e8736407c8f039dd91b8bcba847c6b21ca0060b8063e42f8acc2bcc7d9d2e454491666452f3683cbc0dd768604b27bce6e3"]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## eth_sendTransaction <a id="eth_sendtransaction"></a>

Constructs a transaction with given parameters, signs the transaction with a sender's private key and propagates the
transaction to Klaytn network.

**NOTE**: The address to sign with must be unlocked.

**Parameters**:

| Name            | Type   | Description                                                                          |
| --------------- | ------ | ------------------------------------------------------------------------------------ |
| transactionArgs | Object | An object of transaction arguments. See the table below for the object's properties. |

`transactionArgs` has the following properties:

| Name                 | Type         | Description                                                                                                                                                                         |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from                 | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                     |
| to                   | 20-byte DATA | (not required when creating a new contract) The address to which the transaction is directed.                                                                    |
| gas                  | QUANTITY     | (optional) The integer of the gas provided for the transaction's execution. It will return unused gas.                                                           |
| maxFeePerGas         | QUANTITY     | (optional) The maximum amount to pay for the transaction's execution.                                                                                            |
| maxPriorityFeePerGas | QUANTITY     | (optional) Gas tip cap for dynamic fee transaction in peb.                                                                                                       |
| input                | DATA         | (optional) The hash of the method signature and the encoded parameter. It replaces `data` field, but `data` field is still supported for backward compatibility. |
| value                | QUANTITY     | (optional) The integer of values sent with this transaction.                                                                                                     |
| nonce                | QUANTITY     | (optional) The integer of a nonce.                                                                                                                               |

**Return Value**

| Type         | Description                                                                    |
| ------------ | ------------------------------------------------------------------------------ |
| 32-byte DATA | The transaction hash or the zero hash if the transaction is not yet available. |

If you deployed a contract, use [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address.

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee", "value": "0x1", "gas": "0x9999", "maxFeePerGas": "0x5d21dba00", "maxPriorityPerGas": "0x5d21dba00"}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## eth_signTransaction <a id="eth_signtransaction"></a>

Signs a transaction that can be submitted to the network at a later time using with eth_sendRawTransaction.

**NOTE**: The address to sign with must be unlocked.

**Parameters**:

| Name            | Type   | Description                                                                          |
| --------------- | ------ | ------------------------------------------------------------------------------------ |
| transactionArgs | Object | An object of transaction arguments. See the table below for the object's properties. |

`transactionArgs` has the following properties:

| Name                 | Type         | Description                                                                                                                                                                         |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from                 | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                     |
| to                   | 20-byte DATA | (not required when creating a new contract) The address to which the transaction is directed.                                                                    |
| gas                  | QUANTITY     | The integer of the gas provided for the transaction's execution. It will return unused gas.                                                                                         |
| maxFeePerGas         | QUANTITY     | The maximum amount to pay for the transaction's execution.                                                                                                                          |
| maxPriorityFeePerGas | QUANTITY     | Gas tip cap for dynamic fee transaction in peb.                                                                                                                                     |
| input                | DATA         | (optional) The hash of the method signature and the encoded parameter. It replaces `data` field, but `data` field is still supported for backward compatibility. |
| value                | QUANTITY     | (optional) The integer of values sent with this transaction.                                                                                                     |
| nonce                | QUANTITY     | The integer of a nonce.                                                                                                                                                             |

**Return Value**

`Object` - The signed transaction object.

| Name | Type   | Description                                                                      |
| ---- | ------ | -------------------------------------------------------------------------------- |
| raw  | DATA   | A `rawTransaction` string (a RLP-encoded transaction string). |
| tx   | Object | The transaction object. See the next table for the object's properties.          |

`tx` has the following properties:

| Name                 | Type         | Description                                                                                     |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------- |
| type                 | QUANTITY     | An integer representing the type of the transaction.                                            |
| nonce                | QUANTITY     | The block number where this transaction was in.                                                 |
| gasPrice             | QUANTITY     | Gas price provided by the sender in peb. `null` when it is not a legacy transaction.            |
| maxFeePerGas         | QUANTITY     | A maximum amount to pay for the transaction to execute. `null` when it is a legacy transaction. |
| maxPriorityFeePerGas | QUANTITY     | Gas tip cap for dynamic fee transaction in peb. `null` when it is a legacy transaction.         |
| gas                  | QUANTITY     | Gas provided by the sender.                                                                     |
| value                | QUANTITY     | Integer of values sent with this transaction.                                                   |
| v                    | QUANTITY     | ECDSA recovery id.                                                                              |
| r                    | 32-byte DATA | ECDSA signature r.                                                                              |
| s                    | 32-byte DATA | ECDSA signature s.                                                                              |
| chainId              | QUANTITY     | Chain id set on the requested node.                                                             |
| accessList           | Array        | An array of [accessList](https://eips.ethereum.org/EIPS/eip-2930).                              |
| hash                 | 32-byte DATA | Hash of the transaction.                                                                        |

**Example**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "raw": "0x02f86f8302edaf048505d21dba008505d21dba00829999948c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee0180c001a0b6e16781d247b505aa8eaf363a6ea61e7c23c77ad64846ffda28e73e31304884a05a296904cd009506cb5ed006af016d2c5dab255966af9ba6f8fc352f75e9b079",
    "tx": {
      "type": "0x2",
      "nonce": "0x4",
      "gasPrice": null,
      "maxPriorityFeePerGas": "0x5d21dba00",
      "maxFeePerGas": "0x5d21dba00",
      "gas": "0x9999",
      "value": "0x1",
      "input": "0x",
      "v": "0x1",
      "r": "0xb6e16781d247b505aa8eaf363a6ea61e7c23c77ad64846ffda28e73e31304884",
      "s": "0x5a296904cd009506cb5ed006af016d2c5dab255966af9ba6f8fc352f75e9b079",
      "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
      "chainId": "0x2edaf",
      "accessList": [],
      "hash": "0x9cfbea4942b334050660ec7207f3323ee13e3196b06279f922404384acbf7b47"
    }
  }
}
```

## eth_fillTransaction <a id="eth_filltransaction"></a>

Fills the defaults (nonce, gas, gasPrice or 1559 fields) on a given unsigned transaction, and returns it to the caller
for further processing (signing + broadcast).

**Parameters**:

Parameters are same with eth_sendTransaction. See [eth_sendtransaction](#eth_sendtransaction).

**Return value**

See [eth_signTransaction](#eth_signtransaction).

**Example**

```shell
// Request
curl http://localhost:8551 -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_fillTransaction", "params":[{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee", "value": "0x1", "gas": "0x9999", "maxFeePerGas": "0x5d21dba00"}],"id":1}'

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "raw": "0x02ef8302edaf808505d21dba008505d21dba00829999948c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee0180c0808080",
    "tx": {
      "type": "0x2",
      "nonce": "0x0",
      "gasPrice": null,
      "maxPriorityFeePerGas": "0x5d21dba00",
      "maxFeePerGas": "0x5d21dba00",
      "gas": "0x9999",
      "value": "0x1",
      "input": "0x",
      "v": "0x0",
      "r": "0x0",
      "s": "0x0",
      "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
      "chainId": "0x2edaf",
      "accessList": [],
      "hash": "0x83e382bfb39249dc0e2b4283702bc1c0685deffad1316d166546da9c4c14c59d"
    }
  }
}
```

## eth_pendingTransactions <a id="eth_pendingtransactions"></a>

Returns the transactions that are in the transaction pool and have a from address that is one of the accounts this node
manages.

**Parameters**:

None

**Return value**

| Name                | Type  | Description                                                                                                                         |
| ------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------- |
| pendingTransactions | Array | An array of transactions. For the returned transaction object, See [eth_signTransaction](#eth_signtransaction) |

**Example**

```shell
// Request
curl http://localhost:8551 -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_pendingTransactions", "params":[],"id":1}'

// Result
{
  "jsonrpc": "2.0",
  "id": 39,
  "result": [
    {
      "blockHash": null,
      "blockNumber": null,
      "from": "0xca7a99380131e6c76cfa622396347107aeedca2d",
      "gas": "0x5208",
      "gasPrice": "0x5d21dba00",
      "maxFeePerGas": "0x5d21dba00",
      "maxPriorityFeePerGas": "0x5d21dba00",
      "hash": "0xb5cd867ccc356b86634092919fb1acf4e315618d6c804df3ec3d30d66b6baba5",
      "input": "0x",
      "nonce": "0xdb",
      "to": "0x3e2ac308cd78ac2fe162f9522deb2b56d9da9499",
      "transactionIndex": null,
      "value": "0x1",
      "type": "0x2",
      "accessList": [],
      "chainId": "0x2edaf",
      "v": "0x1",
      "r": "0x73992e7c3b9f6cd73176969efa8509d8e9ae0739e24b03d514508f8ef03f19ef",
      "s": "0x7035dd8639e82ea3ba922ff02e1f21f4cff92d0de33050934f5c70908d61e8c3"
    }
  ]
}
```

## eth_resend <a id="eth_resend"></a>

Resends a transaction.

It will remove the given transaction from the pool and reinsert it with the new gas price and limit.

**NOTE**: The address to sign with must be unlocked.

**Parameters**:

| Name            | Type     | Description                                                                          |
| --------------- | -------- | ------------------------------------------------------------------------------------ |
| transactionArgs | Object   | An object of transaction arguments. See the table below for the object's properties. |
| gas price       | QUANTITY | Integer of the gasPrice to change                                                    |
| gas             | QUANTITY | (optional) Integer of the gas to change                           |

`transactionArgs` has the following properties:

| Name                 | Type         | Description                                                                                                                                                                         |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from                 | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                     |
| to                   | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                   |
| gas                  | QUANTITY     | (optional) The integer of the gas provided for the transaction's execution. It will return unused gas.                                                           |
| maxFeePerGas         | QUANTITY     | (optional) The maximum amount to pay for the transaction's execution.                                                                                            |
| maxPriorityFeePerGas | QUANTITY     | (optional) Gas tip cap for dynamic fee transaction in peb.                                                                                                       |
| input                | DATA         | (optional) The hash of the method signature and the encoded parameter. It replaces `data` field, but `data` field is still supported for backward compatibility. |
| value                | QUANTITY     | (optional) The integer of values sent with this transaction.                                                                                                     |
| nonce                | QUANTITY     | (optional) The integer of a nonce.                                                                                                                               |

**Return Value**

| Type         | Description          |
| ------------ | -------------------- |
| 32-byte DATA | The transaction hash |

**Example**

```shell
> var tx = eth.pendingTransactions()[0]
> eth.resend(tx, 750000000000, 300000)
```
