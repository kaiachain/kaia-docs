# Transaction

## klay_call <a id="klay_call"></a>

Executes a new message call immediately without creating a transaction on the block chain. It returns data or an error object of JSON RPC if error occurs.

**Parameters**

| Name              | Type                    | Description                                                                                                                                                                            |
| ----------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject        | Object                  | The transaction call object.  See the next table for the object's properties.                                                                                                          |
| blockNumberOrHash | QUANTITY \| TAG \| HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](./block.md#the-default-block-parameter), or block hash. |

:::note

NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.

:::

`callObject` has the following properties:

| Name     | Type         | Description                                                                                                                                                                  |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | (optional) The address the transaction is sent from.                                                                                                      |
| to       | 20-byte DATA | (optional when testing the deployment of a new contract) The address the transaction is directed to.                                                      |
| gas      | QUANTITY     | (optional) Integer of the gas provided for the transaction execution. `klay_call` consumes zero gas, but this parameter may be needed by some executions. |
| gasPrice | QUANTITY     | (optional) Integer of the gasPrice used for each paid gas.                                                                                                |
| value    | QUANTITY     | (optional) Integer of the value sent with this transaction.                                                                                               |
| input    | DATA         | (optional) Hash of the method signature and encoded parameters. It replaces `data` field, but `data` field is still supported for backward compatibility. |

**Return Value**

| Type | Description                            |
| ---- | -------------------------------------- |
| DATA | The return value of executed contract. |

If you deployed a contract, use [klay_getTransactionReceipt](#klay_gettransactionreceipt) to get the contract address.

**Error**

It returns an error object of JSON RPC if anything goes wrong.
For example, an error object with a message  "evm: execution reverted" will be generated if a message call is terminated with `REVERT` opcode.

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_call", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}, "latest"], "id": 1}' https://public-en-baobab.klaytn.net

// Result
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000000a"}
```

## klay_estimateGas <a id="klay_estimategas"></a>

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including Klaytn Virtual Machine mechanics and node performance.

**Parameters**

| Name       | Type   | Description                                                                   |
| ---------- | ------ | ----------------------------------------------------------------------------- |
| callObject | Object | The transaction call object.  See the next table for the object's properties. |

`callObject` has the following properties:

| Name     | Type         | Description                                                                                                                                                                                  |
| -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | (optional) The address the transaction is sent from.                                                                                                                      |
| to       | 20-byte DATA | (optional when testing the deployment of a new contract) The address the transaction is directed to.                                                                      |
| gas      | QUANTITY     | (optional) Integer of the upper gas limit provided for the gas estimation. If no gas limit is specified, the Klaytn node uses the designated gas limit as an upper bound. |
| gasPrice | QUANTITY     | (optional) Integer of the gasPrice used for each paid gas.                                                                                                                |
| value    | QUANTITY     | (optional) Integer of the value sent with this transaction.                                                                                                               |
| input    | DATA         | (optional) Hash of the method signature and encoded parameters. It replaces `data` field, but `data` field is still supported for backward compatibility.                 |

**Return Value**

| Type     | Description             |
| -------- | ----------------------- |
| QUANTITY | The amount of gas used. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_estimateGas", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}], "id": 1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x5208" // 21000
}
```

## klay_estimateComputationCost <a id="klay_estimatecomputationcost"></a>

Generates and returns an estimate of how much computation cost will be spent to execute the transaction.
Klaytn limits the computation cost of a transaction to `100000000` currently not to take too much time by a single transaction.
The transaction will not be added to the blockchain like [klay_estimateGas](#klay_estimategas).

**Parameters**

See [klay_call](#klay_call) parameters, except that all properties are optional.
If no gas limit is specified, the Klaytn node uses the default gas limit (uint64 / 2) as an upper bound.

**Return Value**

| Type     | Description                          |
| -------- | ------------------------------------ |
| QUANTITY | The amount of computation cost used. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_estimateComputationCost","params":[{"from":"0x73718c4980728857f3aa5148e9d1b471efa3a7dd", "to":"0x069942a3ca0dabf495dba872533134205764bc9c", "value":"0x0", "input":"0x2a31efc7000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000003039"}, "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x1e8b0ad"
}
```

## klay_getTransactionByBlockHashAndIndex <a id="klay_gettransactionbyblockhashandindex"></a>

Returns information about a transaction by block hash and transaction index position.
This API works only on RPC call, not on JavaScript console.

**Parameters**

| Type         | Description                                |
| ------------ | ------------------------------------------ |
| 32-byte DATA | Hash of a block.                           |
| QUANTITY     | Integer of the transaction index position. |

**Return Value**

See [klay_getTransactionByHash](#klay_gettransactionbyhash)

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByBlockHashAndIndex","params":["0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68", "0x0"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x0591ceb74102fc4ed54b66d27e869224d481e9f44170b25ed4a5654675043198",
    "blockNumber":"0x27",
    "from":"0xe02837b9d671e0848e599c374416f383f8910e45",
    "gas":"0xf4240",
    "gasPrice":"0x5d21dba00",
    "hash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "input":"0x",
    "nonce":"0x1",
    "senderTxHash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "signatures":[
      {
        "V":"0xfea",
        "R":"0x1924d0f36e05d368a37b8130b85067f21f0ea1d35b87bf137216cdc3c844c762",
        "S":"0x31d61be4d5cf677e60ad0fa0214e75c3167509c8d8905d7c6f85979b5f32eead"
      }
    ],
    "to":"0x44d827f98430784c8e3401748d8ba92c43df4546",
    "transactionIndex":"0x0",
    "type":"TxTypeLegacyTransaction",
    "typeInt":0,
    "value":"0xde0b6b3a7640000"
  }
}
```

## klay_getTransactionByBlockNumberAndIndex <a id="klay_gettransactionbyblocknumberandindex"></a>

Returns information about a transaction by block number and transaction index position.
This API works only on RPC call, not on JavaScript console.

**Parameters**

| Type            | Description                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| QUANTITY \| TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"`  as in the [default block parameter](./block.md#the-default-block-parameter). |
| QUANTITY        | The transaction index position.                                                                                                                                          |

:::note

NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.

:::

**Return Value**

See [klay_getTransactionByHash](#klay_gettransactionbyhash)

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByBlockNumberAndIndex","params":["0x27", "0x0"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x0591ceb74102fc4ed54b66d27e869224d481e9f44170b25ed4a5654675043198",
    "blockNumber":"0x27",
    "from":"0xe02837b9d671e0848e599c374416f383f8910e45",
    "gas":"0xf4240",
    "gasPrice":"0x5d21dba00",
    "hash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "input":"0x",
    "nonce":"0x1",
    "senderTxHash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "signatures":[
      {
        "V":"0xfea",
        "R":"0x1924d0f36e05d368a37b8130b85067f21f0ea1d35b87bf137216cdc3c844c762",
        "S":"0x31d61be4d5cf677e60ad0fa0214e75c3167509c8d8905d7c6f85979b5f32eead"
      }
    ],
    "to":"0x44d827f98430784c8e3401748d8ba92c43df4546",
    "transactionIndex":"0x0",
    "type":"TxTypeLegacyTransaction",
    "typeInt":0,
    "value":"0xde0b6b3a7640000"
  }
}
```

## klay_getTransactionByHash <a id="klay_gettransactionbyhash"></a>

Returns the information about a transaction requested by transaction hash.
This API works only on RPC call, not on JavaScript console.

**Parameters**

| Type         | Description            |
| ------------ | ---------------------- |
| 32-byte DATA | Hash of a transaction. |

**Return Value**

`Object` - A transaction object, or `null` when no transaction was found:

| Name               | Type         | Description                                                                                                                                                                                                                                        |
| ------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending.                                                                                                                                                                        |
| blockNumber        | QUANTITY     | Block number where this transaction was in. `null` when it is pending.                                                                                                                                                                             |
| codeFormat         | String       | (optional) The code format of smart contract code.                                                                                                                                                                              |
| feePayer           | 20-byte DATA | (optional) Address of the fee payer.                                                                                                                                                                                            |
| feePayerSignatures | Array        | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio           | QUANTITY     | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                                               |
| from               | 20-byte DATA | Address of the sender.                                                                                                                                                                                                                             |
| gas                | QUANTITY     | Gas provided by the sender.                                                                                                                                                                                                                        |
| gasPrice           | QUANTITY     | Gas price provided by the sender in peb.                                                                                                                                                                                                           |
| hash               | 32-byte DATA | Hash of the transaction.                                                                                                                                                                                                                           |
| humanReadable      | Boolean      | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                                                 |
| key                | String       | (optional) Key of the newly created account.                                                                                                                                                                                    |
| input              | DATA         | (optional) The data sent along with the transaction.                                                                                                                                                                            |
| nonce              | QUANTITY     | The number of transactions made by the sender prior to this one.                                                                                                                                                                                   |
| senderTxHash       | 32-byte DATA | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../learn/transactions/transactions.md#sendertxhash). This value is always the same as `hash` for non fee-delegated transactions.                                 |
| signatures         | Array        | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                                           |
| to                 | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                                                        |
| transactionIndex   | QUANTITY     | Integer of the transaction index position in the block. `null` when it is pending.                                                                                                                                                                 |
| type               | String       | A string representing the type of the transaction.                                                                                                                                                                                                 |
| typeInt            | QUANTITY     | An integer representing the type of the transaction.                                                                                                                                                                                               |
| value              | QUANTITY     | Value transferred in peb.                                                                                                                                                                                                                          |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByHash","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "hash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_getTransactionBySenderTxHash <a id="klay_gettransactionbysendertxhash"></a>

Returns the information about a transaction requested by sender transaction hash.
This API works only on RPC call, not on JavaScript console.
Please note that this API returns correct result only if indexing feature is enabled by `--sendertxhashindexing`.
This can be checked by call [klay_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled).

**Parameters**

| Type         | Description                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| 32-byte DATA | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../learn/transactions/transactions.md#sendertxhash). |

**Return Value**

`Object` - A transaction object, or `null` when no transaction was found:

| Name               | Type         | Description                                                                                                                                                                                                          |
| ------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending.                                                                                                                                          |
| blockNumber        | QUANTITY     | Block number where this transaction was in. `null` when it is pending.                                                                                                                                               |
| codeFormat         | String       | (optional) The code format of smart contract code.                                                                                                                                                |
| feePayer           | 20-byte DATA | Address of the fee payer.                                                                                                                                                                                            |
| feePayerSignatures | Array        | An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio           | QUANTITY     | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                 |
| from               | 20-byte DATA | Address of the sender.                                                                                                                                                                                               |
| gas                | QUANTITY     | Gas provided by the sender.                                                                                                                                                                                          |
| gasPrice           | QUANTITY     | Gas price provided by the sender in peb.                                                                                                                                                                             |
| hash               | 32-byte DATA | Hash of the transaction.                                                                                                                                                                                             |
| humanReadable      | Boolean      | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                   |
| key                | String       | (optional) Key of the newly created account.                                                                                                                                                      |
| input              | DATA         | (optional) The data sent along with the transaction.                                                                                                                                              |
| nonce              | QUANTITY     | The number of transactions made by the sender prior to this one.                                                                                                                                                     |
| senderTxHash       | 32-byte DATA | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../learn/transactions/transactions.md#sendertxhash). This value is always the same as `hash` for non fee-delegated transactions.   |
| signatures         | Array        | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.             |
| to                 | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                          |
| transactionIndex   | QUANTITY     | Integer of the transaction index position in the block. `null` when it is pending.                                                                                                                                   |
| type               | String       | A string representing the type of the transaction.                                                                                                                                                                   |
| typeInt            | QUANTITY     | An integer representing the type of the transaction.                                                                                                                                                                 |
| value              | QUANTITY     | Value transferred in peb.                                                                                                                                                                                            |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionBySenderTxHash","params":["0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "hash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_getTransactionReceipt <a id="klay_gettransactionreceipt"></a>

Returns the receipt of a transaction by transaction hash.

**NOTE**: The receipt is not available for pending transactions.

**Parameters**

| Name | Type         | Description            |
| ---- | ------------ | ---------------------- |
| Hash | 32-byte DATA | Hash of a transaction. |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found

| Name               | Type                                       | Description                                                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA                               | Hash of the block where this transaction was in.                                                                                                                                                                                                   |
| blockNumber        | QUANTITY                                   | The block number where this transaction was in.                                                                                                                                                                                                    |
| codeFormat         | String                                     | (optional) The code format of smart contract code.                                                                                                                                                                              |
| contractAddress    | DATA                                       | The contract address created, if the transaction was a contract creation, otherwise `null`.                                                                                                                                                        |
| feePayer           | 20-byte DATA                               | (optional) Address of the fee payer.                                                                                                                                                                                            |
| feePayerSignatures | Array                                      | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio           | QUANTITY                                   | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                                               |
| from               | 20-byte DATA                               | Address of the sender.                                                                                                                                                                                                                             |
| gas                | QUANTITY                                   | Gas provided by the sender.                                                                                                                                                                                                                        |
| effectiveGasPrice  | QUANTITY                                   | The actual value per gas deducted from the senders account.                                                                                                                                                                                        |
| gasPrice           | QUANTITY                                   | Gas price provided by the sender in peb.                                                                                                                                                                                                           |
| gasUsed            | QUANTITY                                   | The amount of gas used by this specific transaction alone.                                                                                                                                                                                         |
| humanReadable      | Boolean                                    | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                                                 |
| key                | String                                     | (optional) Key of the newly created account.                                                                                                                                                                                    |
| input              | DATA                                       | (optional) The data sent along with the transaction.                                                                                                                                                                            |
| logs               | Array                                      | Array of log objects, which this transaction generated.                                                                                                                                                                                            |
| logsBloom          | 256-byte DATA                              | Bloom filter for light clients to quickly retrieve related logs.                                                                                                                                                                                   |
| nonce              | QUANTITY                                   | The number of transactions made by the sender prior to this one.                                                                                                                                                                                   |
| senderTxHash       | (optional) 32-byte DATA | Hash of the tx without the fee payer's address and signature. This value is always the same as the value of transactionHash for non fee-delegated transactions.                                                                                    |
| signature          | Array                                      | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                                           |
| status             | QUANTITY                                   | Either `1` (success) or `0` (failure).                                                                                                                                                                       |
| txError            | QUANTITY                                   | (optional) detailed error code if `status` is equal to zero.                                                                                                                                                                    |
| to                 | 20-byte DATA                               | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                                                        |
| transactionHash    | 32-byte DATA                               | Hash of the transaction.                                                                                                                                                                                                                           |
| transactionIndex   | QUANTITY                                   | Integer of the transaction index position in the block.                                                                                                                                                                                            |
| type               | String                                     | A string representing the type of the transaction.                                                                                                                                                                                                 |
| typeInt            | QUANTITY                                   | An integer representing the type of the transaction.                                                                                                                                                                                               |
| value              | QUANTITY                                   | Value transferred in peb.                                                                                                                                                                                                                          |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionReceipt","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "contractAddress":null,
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "effectiveGasPrice":"0x5d21dba00",
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "gasUsed":"0x7918",
    "logs":[],
    "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "status":"0x1",
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionHash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_getTransactionReceiptBySenderTxHash <a id="klay_gettransactionreceiptbysendertxhash"></a>

Returns the receipt of a transaction by sender transaction hash.

**NOTE**: The receipt is not available for pending transactions.
Please note that this API returns correct result only if indexing feature is enabled by `--sendertxhashindexing`.
This can be checked by call [klay_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled).

**Parameters**

| Name | Type         | Description                                                                                 |
| ---- | ------------ | ------------------------------------------------------------------------------------------- |
| Hash | 32-byte DATA | Hash of a transaction before signing of feePayer(senderTransactionHash). |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found

| Name               | Type                                       | Description                                                                                                                                                                                                          |
| ------------------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA                               | Hash of the block where this transaction was in.                                                                                                                                                                     |
| blockNumber        | QUANTITY                                   | The block number where this transaction was in.                                                                                                                                                                      |
| codeFormat         | String                                     | (optional) The code format of smart contract code.                                                                                                                                                |
| contractAddress    | DATA                                       | The contract address created, if the transaction was a contract creation, otherwise `null`.                                                                                                                          |
| feePayer           | 20-byte DATA                               | Address of the fee payer.                                                                                                                                                                                            |
| feePayerSignatures | Array                                      | An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio           | QUANTITY                                   | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                 |
| from               | 20-byte DATA                               | Address of the sender.                                                                                                                                                                                               |
| gas                | QUANTITY                                   | Gas provided by the sender.                                                                                                                                                                                          |
| gasPrice           | QUANTITY                                   | Gas price provided by the sender in peb.                                                                                                                                                                             |
| gasUsed            | QUANTITY                                   | The amount of gas used by this specific transaction alone.                                                                                                                                                           |
| humanReadable      | Boolean                                    | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                   |
| key                | String                                     | (optional) Key of the newly created account.                                                                                                                                                      |
| input              | DATA                                       | (optional) The data sent along with the transaction.                                                                                                                                              |
| logs               | Array                                      | Array of log objects, which this transaction generated.                                                                                                                                                              |
| logsBloom          | 256-byte DATA                              | Bloom filter for light clients to quickly retrieve related logs.                                                                                                                                                     |
| nonce              | QUANTITY                                   | The number of transactions made by the sender prior to this one.                                                                                                                                                     |
| senderTxHash       | (optional) 32-byte DATA | Hash of the tx without the fee payer's address and signature. This value is always the same as the value of transactionHash for non fee-delegated transactions.                                                      |
| signature          | Array                                      | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.             |
| status             | QUANTITY                                   | Either `1` (success) or `0` (failure).                                                                                                                                         |
| txError            | QUANTITY                                   | (optional) detailed error code if `status` is equal to zero.                                                                                                                                      |
| to                 | 20-byte DATA                               | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                          |
| transactionHash    | 32-byte DATA                               | Hash of the transaction.                                                                                                                                                                                             |
| transactionIndex   | QUANTITY                                   | Integer of the transaction index position in the block.                                                                                                                                                              |
| type               | String                                     | A string representing the type of the transaction.                                                                                                                                                                   |
| typeInt            | QUANTITY                                   | An integer representing the type of the transaction.                                                                                                                                                                 |
| value              | QUANTITY                                   | Value transferred in peb.                                                                                                                                                                                            |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionReceiptBySenderTxHash","params":["0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "contractAddress":null,
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "gasUsed":"0x7918",
    "logs":[],
    "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "status":"0x1",
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionHash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_sendRawTransaction <a id="klay_sendrawtransaction"></a>

Creates a new message call transaction or a contract creation for signed transactions.

**Parameters**

| Type | Description                  |
| ---- | ---------------------------- |
| DATA | The signed transaction data. |

**Return Value**

| Type         | Description                                                                    |
| ------------ | ------------------------------------------------------------------------------ |
| 32-byte DATA | The transaction hash or the zero hash if the transaction is not yet available. |

If you deployed a contract, use [klay_getTransactionReceipt](#klay_gettransactionreceipt) to get the contract address.

**Example**

```shell
params: ["0x08f888820228850ba43b740082f61894a2a8854b1802d8cd5de631e690817c253d6a9153888ac7230489e8000094a2a8854b1802d8cd5de631e690817c253d6a9153f847f8458207f6a0abaaeef1ccaead65c63885b1ad35410442e4e070aff67a0c00ac73576dd958cda06b49e555f2ac5c7cff9e70b59a564214db8fafb92b131afcd5fc5aebbe257681"]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendRawTransaction","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## klay_sendTransaction <a id="klay_sendtransaction"></a>

Constructs a transaction with given parameters, signs the transaction with a sender's private key and propagates the transaction to Klaytn network.

**NOTE**: The address to sign with must be unlocked.

**Parameters**

The required parameters depend on the transaction type.
Check the proper parameters in [Working with Klaytn Transaction Types](./transaction-type-support.md).

**Return Value**

| Type         | Description          |
| ------------ | -------------------- |
| 32-byte DATA | The transaction hash |

If you deployed a contract, use [klay_getTransactionReceipt](#klay_gettransactionreceipt) to get the contract address.

**Example**

```shell
params: [{
  "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x76c0",
  "gasPrice": "0x5d21dba00",
  "value": "0x9184e72a",
  "input": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendTransaction","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## klay_sendTransactionAsFeePayer <a id="klay_sendtransactionasfeepayer"></a>

Constructs a transaction with given parameters, signs the transaction with a fee payer's private key and propagates the transaction to Klaytn network.
This API supports only fee delegated type (including partial fee delegated type) transactions.

**NOTE**: The fee payer address to sign with must be unlocked.

**Parameters**

The required parameters depend on the transaction type.
Check the proper parameters in [Working with Klaytn Transaction Types](./transaction-type-support.md).

**Return Value**

| Type         | Description          |
| ------------ | -------------------- |
| 32-byte DATA | The transaction hash |

If you deployed a contract, use [klay_getTransactionReceipt](#klay_gettransactionreceipt) to get the contract address.

**Example**

```shell
params: [{
  "typeInt": 18,
  "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
  "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075",
  "gas": "0x4a380",
  "gasPrice": "0x5d21dba00",
  "nonce": "0x2c",
  "value": "0xf4",
  "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
  "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
  "feeRatio": 30,
  "signatures": [{
    "V": "0x4e43", 
    "R": "0xd3ff5ca7bdd0120d79e8aa875593d05022fe74ce2b7a0594218d53c0fdca7fa9", 
    "S": "0x2c100e69d2455afc9393e017514063da18b18db6f7e811d0aeaf6002515b58ef"
  }]
}]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendTransactionAsFeePayer","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x77ec2d910d0b96585373e2d6508f2b2d8c2af7d0060d2012e1cb2f0ee9d74830"
}
```

## klay_signTransaction <a id="klay_signtransaction"></a>

Constructs a transaction with given parameters and signs the transaction with a sender's private key.
This method can be used either to generate a sender signature or to make a final raw transaction that is ready to submit to Klaytn network.

**NOTE**: The address to sign with must be unlocked.

**Parameters**

The required parameters depend on the transaction type.
Check the proper parameters in [Working with Klaytn Transaction Types](./transaction-type-support.md).

**Return Value**

| Type | Description                                         |
| ---- | --------------------------------------------------- |
| raw  | Signed raw transaction                              |
| tx   | Transaction object including the sender's signature |

**Example**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_signTransaction", "params":[{"from":"0x77982323172e5b6182539d3522d5a33a944206d4", "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa", "value":"0x10000", "gas":"0x1000000", "nonce":"0x2", "gasprice":"0x25000000000"}],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":{
    "raw":"0xf86c0286025000000000840100000094cd6bfdb523a4d030890d28bf1eb6ef36307c9aaa8301000080820fe8a056d2ddd231c3c111687ab351d339240db18cd721e5aa33c601dd4fc3927fb4d1a03443443392517aa7da082aa0a00b9ee5e3e1ee007d22e57cd9ff55b5ddbf4a64",
    "tx":{
      "nonce":"0x2",
      "gasPrice":"0x5d21dba00",
      "gas":"0x1000000",
      "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa",
      "value":"0x10000",
      "input":"0x",
      "v":"0xfe8",
      "r":"0x56d2ddd231c3c111687ab351d339240db18cd721e5aa33c601dd4fc3927fb4d1",
      "s":"0x3443443392517aa7da082aa0a00b9ee5e3e1ee007d22e57cd9ff55b5ddbf4a64",
      "hash":"0xb53cc9128a19c3916c0de1914725b7337bba84666c2556d8682c72ca34c6874c"
    }
  }
}
```

## klay_signTransactionAsFeePayer <a id="klay_signtransactionasfeepayer"></a>

Constructs a transaction with given parameters and signs the transaction with a fee payer's private key.
This method can be used either to generate a fee payer signature or to make a final raw transaction that is ready to submit to Klaytn network.
In case you just want to extract the fee-payer signature, simply take the `feePayerSignatures` from the result.
Note that the `raw` transaction is not final if the sender's signature is not attached (that is, `signatures` in `tx` is empty).

**NOTE**: The fee payer address to sign with must be unlocked.

**Parameters**

The required parameters depend on the transaction type.
Check the proper parameters in [Working with Klaytn Transaction Types](./transaction-type-support.md).

**Return Value**

| Type | Description                                            |
| ---- | ------------------------------------------------------ |
| raw  | Signed raw transaction                                 |
| tx   | Transaction object including the fee payer's signature |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransactionAsFeePayer", "params": [{"typeInt": 17, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x76c0", "gasPrice": "0x5d21dba00", "value": "0xf4", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"}], "id": 83}' http://127.0.0.1:8551

// Result
{
    "id": 83,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x11f8ba358505d21dba008276c09444711e89b0c23845b5b2ed9d3716ba42b8a3e07581f494cd01b2b44584fb143824c1ea0231bebaea826b9da4b3f98adc0000000000000000000000000000000000000000000000000000000000000001c094cd01b2b44584fb143824c1ea0231bebaea826b9df847f845824e43a0b34470d1bb588a6afe8f170333ca147e805727aa1911353ed544c31ad4863beca020322c2727091ff79458a87a424b53a4b08cc3d7d485e002e8bf0add13974507",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [
                {
                    "R": "0xb34470d1bb588a6afe8f170333ca147e805727aa1911353ed544c31ad4863bec",
                    "S": "0x20322c2727091ff79458a87a424b53a4b08cc3d7d485e002e8bf0add13974507",
                    "V": "0x4e43"
                }
            ],
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x76c0",
            "gasPrice": "0x5d21dba00",
            "hash": "0x9e76f754b884d7853814a39c0e51fcefcef6f55b872f00ddad9724c9638128b3",
            "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
            "nonce": "0x35",
            "signatures": [],
            "to": "0x44711e89b0c23845b5b2ed9d3716ba42b8a3e075",
            "type": "TxTypeFeeDelegatedValueTransferMemo",
            "typeInt": 17,
            "value": "0xf4"
        }
    }
}
```

## txError: Detailed Information of Transaction Failures <a id="txerror-detailed-information-of-transaction-failures"></a>

Klaytn provides a field `txError` in the transaction receipt
to give developers more information about the reason for the failed transaction execution.
This field exists only if the transaction execution is failed.
To save storage and network bandwidth, `txError` contains an integer value.
The below table shows the meaning of the value in `txError`.

| Error Code | Description                                                                           |
| ---------- | ------------------------------------------------------------------------------------- |
| 0x02       | VM error occurs while running smart contract                                          |
| 0x03       | max call depth exceeded                                                               |
| 0x04       | contract address collision                                                            |
| 0x05       | contract creation code storage out of gas                                             |
| 0x06       | evm: max code size exceeded                                                           |
| 0x07       | out of gas                                                                            |
| 0x08       | evm: write protection                                                                 |
| 0x09       | evm: execution reverted                                                               |
| 0x0a       | reached the opcode computation cost limit (100000000) for tx       |
| 0x0b       | account already exists                                                                |
| 0x0c       | not a program account (e.g., an account having code and storage)   |
| 0x0d       | Human-readable address is not supported now                                           |
| 0x0e       | fee ratio is out of range [1, 99] |
| 0x0f       | AccountKeyFail is not updatable                                                       |
| 0x10       | different account key type                                                            |
| 0x11       | AccountKeyNil cannot be initialized to an account                                     |
| 0x12       | public key is not on curve                                                            |
| 0x13       | key weight is zero                                                                    |
| 0x14       | key is not serializable                                                               |
| 0x15       | duplicated key                                                                        |
| 0x16       | weighted sum overflow                                                                 |
| 0x17       | unsatisfiable threshold. Weighted sum of keys is less than the threshold.             |
| 0x18       | length is zero                                                                        |
| 0x19       | length too long                                                                       |
| 0x1a       | nested composite type                                                                 |
| 0x1b       | a legacy transaction must be with a legacy account key                                |
| 0x1c       | deprecated feature                                                                    |
| 0x1d       | not supported                                                                         |
| 0x1e       | smart contract code format is invalid                                                 |

## klay_getDecodedAnchoringTransactionByHash <a id="klay_getDecodedAnchoringTransactionByHash"></a>

Returns the decoded anchored data in the transaction for the given transaction hash.

**Parameters**

| Type         | Description            |
| ------------ | ---------------------- |
| 32-byte DATA | Hash of a transaction. |

**Return Value**

| Name          | Type         | Description                                                                                                                                                                                                                                           |
| ------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BlockHash     | 32-byte DATA | Hash of the child chain block that this anchoring transaction was performed.                                                                                                                                                                          |
| BlockNumber   | QUANTITY     | The child chain block number that this anchoring transaction was performed.                                                                                                                                                                           |
| ParentHash    | 32-byte DATA | Hash of the parent block.                                                                                                                                                                                                                             |
| TxHash        | 32-byte DATA | The root of the transaction trie of the block.                                                                                                                                                                                                        |
| StateRootHash | 32-byte DATA | The root of the final state trie of the block.                                                                                                                                                                                                        |
| ReceiptHash   | 32-byte DATA | The root of the receipts trie of the block.                                                                                                                                                                                                           |
| BlockCount    | QUANTITY     | The number of blocks generated during this anchoring period. In most cases, this number is equal to the child chain's `SC_TX_PERIOD`, with the exception of the case that this transaction was the first anchoring tx after turning on the anchoring. |
| TxCount       | QUANTITY     | The number of transactions generated in the child chain during this anchoring period.                                                                                                                                                                 |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getDecodedAnchoringTransactionByHash","params":["0x499350bc5e2f6fee1ba78b4d40a7a1db0a64f3c091112e6798a02ed9a4140084"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "BlockCount":1,
      "BlockHash":"0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
      "BlockNumber":1055,
      "ParentHash":"0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
      "ReceiptHash":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "StateRootHash":"0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
      "TxCount":0,
      "TxHash":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
   }
}
```

```javascript
> klay.getDecodedAnchoringTransactionByHash("0x499350bc5e2f6fee1ba78b4d40a7a1db0a64f3c091112e6798a02ed9a4140084")
{
  BlockCount: 1,
  BlockHash: "0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
  BlockNumber: 1055,
  ParentHash: "0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
  ReceiptHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  StateRootHash: "0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
  TxCount: 0,
  TxHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```

## klay_resend <a id="klay_resend"></a>

Resends a transaction.

It will remove the given transaction from the pool and reinsert it with the new gas price and limit.

**NOTE**: The address to sign with must be unlocked.

**Parameters**:

| Name            | Type     | Description                                                                          |
| --------------- | -------- | ------------------------------------------------------------------------------------ |
| transactionArgs | Object   | An object of transaction arguments. See the table below for the object's properties. |
| gas price       | QUANTITY | Integer of the gasPrice to change                                                    |
| gas             | QUANTITY | (optional) Integer of the gas to change                           |

The required parameters for transactionArgs depend on the transaction type.
Check the proper parameters in [Working with Klaytn Transaction Types](./transaction-type-support.md).

**Return Value**

| Type         | Description          |
| ------------ | -------------------- |
| 32-byte DATA | The transaction hash |

**Example**

```shell
> var tx = klay.pendingTransactions()[0]
> klay.resend(tx, 750000000000, 300000)
```
