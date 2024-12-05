# Filter

## klay_getFilterChanges <a id="klay_getfilterchanges"></a>

Polling method for a filter, which returns an array of logs which occurred since last poll.

**Parameters**

| Name     | Type   | Description                                              |
| -------- | ------ | -------------------------------------------------------- |
| QUANTITY | string | The filter id (_e.g._, "0x16" // 22). |

**Return Value**

`Array` - Array of log objects, or an empty array if nothing has changed since last poll.

- For filters created with [klay_newBlockFilter](#klay_newblockfilter), the return are block hashes (32-byte DATA),
  _e.g._, `["0x3454645634534..."]`.
- For filters created with [klay_newPendingTransactionFilter](#klay_newpendingtransactionfilter), the return are transaction
  hashes (32-byte DATA), _e.g._, `["0x6345343454645..."]`.
- For filters created with [klay_newFilter](#klay_newfilter), logs are objects with following parameters:

| Name             | Type          | Description                                                                                                                                                                                                                                                                        |
| ---------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| removed          | TAG           | `true` when the log was removed, due to a chain reorganization. `false` if it is a valid log.                                                                                                                                                                                      |
| logIndex         | QUANTITY      | Integer of the log index position in the block. `null` when it is a pending log.                                                                                                                                                                                                   |
| transactionIndex | QUANTITY      | Integer of the transactions index position log was created from. `null` when pending.                                                                                                                                                                                              |
| transactionHash  | 32-byte DATA  | Hash of the transactions this log was created from. `null` when pending.                                                                                                                                                                                                           |
| blockHash        | 32-byte DATA  | Hash of the block where this log was in. `null` when pending.                                                                                                                                                                                                                      |
| blockNumber      | QUANTITY      | The block number where this log was in. `null` when pending.                                                                                                                                                                                                                       |
| address          | 20-byte DATA  | Address from which this log originated.                                                                                                                                                                                                                                            |
| data             | DATA          | Contains the non-indexed arguments of the log.                                                                                                                                                                                                                                     |
| topics           | Array of DATA | Array of 0 to 4 32-byte DATA of indexed log arguments. (In Solidity: The first topic is the hash of the signature of the event (_e.g._, `Deposit(address,bytes32,uint256)`), except you declared the event with the `anonymous` specifier.). |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getFilterChanges","params":["0x16"],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
    "id":1,
    "jsonrpc":"2.0",
    "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
        ...
    }]
}
```

## klay_getFilterLogs <a id="klay_getfilterlogs"></a>

Returns an array of all logs matching filter with given id, which has been
obtained using [klay_newFilter](#klay_newfilter).  Note that filter ids
returned by other filter creation functions, such as [klay_newBlockFilter](#klay_newblockfilter)
or [klay_newPendingTransactionFilter](#klay_newpendingtransactionfilter),
cannot be used with this function.

The execution of this API can be limited by two node configurations to manage resources of Klaytn node safely.

- The number of maximum returned results in a single query (Default: 10,000).
- The execution duration limit of a single query (Default: 10 seconds).

**Parameters**

| Name     | Type   | Description   |
| -------- | ------ | ------------- |
| QUANTITY | string | The filter id |

**Return Value**

See [klay_getFilterChanges](#klay_getfilterchanges)

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getFilterLogs","params":["0xd32fd16b6906e67f6e2b65dcf48fc272"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":[{
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"],
      "data":"0x0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000007b",
      "blockNumber":"0x54",
      "transactionHash":"0xcd4703cd62bd930d4652999bce8dcb75b7ade49d922fa42dc11e568c52a5fa6f",
      "transactionIndex":"0x0",
      "blockHash":"0x9a49f30f1d1876ff3913bd0aa58f328822e7a369cb13e0640b82234f26e781bb",
      "logIndex":"0x0",
      "removed":false
  }]
}
```

## klay_getLogs <a id="klay_getlogs"></a>

Returns an array of all logs matching a given filter object.

The execution of this API can be limited by two node configurations to manage resources of Klaytn node safely.

- The number of maximum returned results in a single query (Default: 10,000).
- The execution duration limit of a single query (Default: 10 seconds).

**Parameters**

`Object` - The filter options:

| Name      | Type                  | Description                                                                                                                                                                                                                                                                                                                         |
| --------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | QUANTITY \| TAG       | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter).                                                                                                            |
| toBlock   | QUANTITY \| TAG       | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter).                                                                                                            |
| address   | 20-byte DATA \| Array | (optional) Contract address or a list of addresses from which logs should originate.                                                                                                                                                                                                                             |
| topics    | Array of DATA         | (optional) Array of 32-byte DATA topics. Topics are order-dependent. Each topic can also be an array of DATA with “or” options.                                                                                                                                                                                  |
| blockHash | 32-byte DATA          | (optional) A filter option that restricts the logs returned to the single block with the 32-byte hash blockHash. Using blockHash is equivalent to fromBlock = toBlock = the block number with hash blockHash. If blockHash is present in in the filter criteria, then neither fromBlock nor toBlock are allowed. |

:::note

NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.

:::

**Return Value**

See [klay_getFilterChanges](#klay_getfilterchanges)

**Examples**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getLogs","params":[{"fromBlock":"0x1","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b"}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":[
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xfa9b2165fc71c1d6ffa03291c7f5d223ea363ec063d747eec9ce2d30d24855ef"],
      "data":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000001341646472657373426f6f6b436f6e747261637400000000000000000000000000",
      "blockNumber":"0xd3b5",
      "transactionHash":"0x57ca8ff0a0d454d4c5418694c21bc4ef3de26cf7cd18dd404d6a7189a826bfe0",
      "transactionIndex":"0x0",
      "blockHash":"0x279251a907c6ab1fb723595511ff401432e7c2437d54189298f53a7d33ce3a60",
      "logIndex":"0x0",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xfa3e1e272694072320aad73a3fadd8876c4bf8f40899c6c7ce2fda9f4e652cfa"],
      "data":"0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000300000000000000000000000041383b6ee0ea5108d6b139165a9c85351aacd39800000000000000000000000057f7439898e652fa9b5654022297588532e5e0370000000000000000000000005b5b7a718a4124eb746ae00b1ce6edcaa5ab55bc",
      "blockNumber":"0xd3b5",
      "transactionHash":"0x57ca8ff0a0d454d4c5418694c21bc4ef3de26cf7cd18dd404d6a7189a826bfe0",
      "transactionIndex":"0x0",
      "blockHash":"0x279251a907c6ab1fb723595511ff401432e7c2437d54189298f53a7d33ce3a60",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000286d09b578d6126e09296dfe6c775ea7d0cf06e9000000000000000000000000860350f6d774efd16046335c388b832b910d3f8c00000000000000000000000061a7cbdd597848494fa85cbb76f9c63ad9c06cad",
      "blockNumber":"0x14d96",
      "transactionHash":"0x73282602d2f908180f47e3c8673f41c0899cbbb2d606976c2f77188ffa57d6e7",
      "transactionIndex":"0x0",
      "blockHash":"0xa5268a093cd5df7eccde18217a7019a35ab761088312027af16682aafa704ee3",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002f91d1b79dd06da1b622122d61e05e64562de61e0000000000000000000000006e76e0ce76dfba55060400144318d4821a58510600000000000000000000000031b93ca83b5ad17582e886c400667c6f698b8ccd",
      "blockNumber":"0x14e4e",
      "transactionHash":"0xf9d86ed451d67abc68c517f7fa0e0a7a8e3dedec23f56febda2b7f52d35185b6",
      "transactionIndex":"0x0",
      "blockHash":"0x7ddf4a0a203d40afc1706aa24b787da601e1bce326319349d0eeef6c41656fa5",
      "logIndex":"0x1",
      "removed":false
    }
  ]
}
```

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getLogs","params":[{"fromBlock":"earliest","toBlock":"latest","topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"]}],"id":2}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":2,
  "result":[
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000286d09b578d6126e09296dfe6c775ea7d0cf06e9000000000000000000000000860350f6d774efd16046335c388b832b910d3f8c00000000000000000000000061a7cbdd597848494fa85cbb76f9c63ad9c06cad",
      "blockNumber":"0x14d96",
      "transactionHash":"0x73282602d2f908180f47e3c8673f41c0899cbbb2d606976c2f77188ffa57d6e7",
      "transactionIndex":"0x0",
      "blockHash":"0xa5268a093cd5df7eccde18217a7019a35ab761088312027af16682aafa704ee3",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002f91d1b79dd06da1b622122d61e05e64562de61e0000000000000000000000006e76e0ce76dfba55060400144318d4821a58510600000000000000000000000031b93ca83b5ad17582e886c400667c6f698b8ccd",
      "blockNumber":"0x14e4e",
      "transactionHash":"0xf9d86ed451d67abc68c517f7fa0e0a7a8e3dedec23f56febda2b7f52d35185b6",
      "transactionIndex":"0x0",
      "blockHash":"0x7ddf4a0a203d40afc1706aa24b787da601e1bce326319349d0eeef6c41656fa5",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000a2b1264624c92257dd8e7f0cac42d451061d1510000000000000000000000000b381ee81e319e5ec48f42d0b47b5e4361c9a6f740000000000000000000000003855407fa65c4c5104648b3a9e495072df62b585",
      "blockNumber":"0x14f38",
      "transactionHash":"0xc8f8c637ea9fcbe71e23fe0779b59fb10173e8c4fd7e49bce3cce76ff67d353d",
      "transactionIndex":"0x0",
      "blockHash":"0xb1717038e443f517bd7a8c37b66fb731fed573f5fa5486ebbbb5e4c9060be50b",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000009dd579f23912665b956b0cd50387b29a62052732000000000000000000000000c98a86af2eca2989c0cb2a2b8d4bb841f11e94ab000000000000000000000000f65e07b6626ab43ecea744803fa46bd4a89bfdb6",
      "blockNumber":"0x14fe7",
      "transactionHash":"0x14da1883bb2aae487ce1cb93cd39bc9bb802adbba083f337051877358150ab3f",
      "transactionIndex":"0x0",
      "blockHash":"0xcd820189f00e9a6faaea7313437b92114e69bd32e18b4a28e7763117716c6fa9",
      "logIndex":"0x1",
      "removed":false
    }
  ]
}
```

## klay_newBlockFilter <a id="klay_newblockfilter"></a>

Creates a filter in the node, to notify when a new block arrives.
To check if the state has changed, call [klay_getFilterChanges](#klay_getfilterchanges).

**Parameters**

None

**Return Value**

| Type     | Description  |
| -------- | ------------ |
| QUANTITY | A filter id. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newBlockFilter","params":[],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":"0xc2f2e8168a7e38b5d979d0f7084130ee"
}
```

## klay_newFilter <a id="klay_newfilter"></a>

Creates a filter object, based on filter options, to notify when the state changes (logs).

- To check if the state has changed, call [klay_getFilterChanges](#klay_getfilterchanges).
- To obtain all logs matching the filter created by `klay_newFilter`, call
  [klay_getFilterLogs](#klay_getfilterlogs).

**A note on specifying topic filters:**
Topics are order-dependent. A transaction with a log with topics `[A, B]` will be matched by the following topic filters:

- `[]` "anything"
- `[A]` "A in first position (and anything after)"
- `[null, B]` "anything in first position AND B in second position (and anything after)"
- `[A, B]` "A in first position AND B in second position (and anything after)"
- `[[A, B], [A, B]]` "(A OR B) in first position AND (A OR B) in second position (and anything after)"

**Parameters**

`Object` - The filter options:

| Name      | Type                  | Description                                                                                                                                                                                                              |
| --------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fromBlock | QUANTITY \| TAG       | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter). |
| toBlock   | QUANTITY \| TAG       | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter). |
| address   | 20-byte DATA \| Array | (optional) Contract address or a list of addresses from which logs should originate.                                                                                                                  |
| topics    | Array of DATA         | (optional) Array of 32-byte DATA topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.                                                                       |

:::note

NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.

:::

**Return Value**

| Type     | Description |
| -------- | ----------- |
| QUANTITY | A filter id |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newFilter","params":[{"fromBlock":"earliest","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b","topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{"jsonrpc":"2.0","id":1,"result":"0xd32fd16b6906e67f6e2b65dcf48fc272"}
```

## klay_newPendingTransactionFilter <a id="klay_newpendingtransactionfilter"></a>

Creates a filter in the node, to notify when new pending transactions arrive.
To check if the state has changed, call [klay_getFilterChanges](#klay_getfilterchanges).

**Parameters**

None

**Return Value**

| Type     | Description  |
| -------- | ------------ |
| QUANTITY | A filter id. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newPendingTransactionFilter","params":[],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":"0x90cec22a723fcc725fb2462733c2880f"
}
```

## klay_subscribe <a id="klay_subscribe"></a>

Creates a new subscription to specific events by using either RPC Pub/Sub over WebSockets or filters over HTTP.
It allows clients to wait for events instead of polling for them.

The node will return a subscription id for each subscription created.
For each event that matches the subscription, a notification with relevant data is sent together with the subscription id.
If a connection is closed, all subscriptions created over the connection are removed.

**Parameters**

`Object` - A notification type: `"newHeads"` or `"logs"`.

`"newHeads"` notifies you of each block added to the blockchain.
`"logs"` notifies you of logs included in new blocks. This type requires a second parameter that specifies filter options. For more details, go to [klay_newFilter > parameters](#klay_newfilter).

**Return Value**

| Type     | Description                                                                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| QUANTITY | A subscription id when a subscription is created. For each event that matches the subscription, a notification with relevant data will be delivered as well. |

**Example**

This API is appropriate for use with a WebSocket tool, [`wscat`](https://www.npmjs.com/package/wscat).

```shell
// Request
wscat -c http://localhost:8552
> {"jsonrpc":"2.0", "id": 1, "method": "klay_subscribe", "params": ["newHeads"]}

// Result
< {"jsonrpc":"2.0","id":1,"result":"0x48bb6cb35d6ccab6eb2b4799f794c312"}
< {"jsonrpc":"2.0","method":"klay_subscription","params":{"subscription":"0x48bb6cb35d6ccab6eb2b4799f794c312","result":{"parentHash":"0xc39755b6ac01d1e8c58b1088e416204f7af5b6b66bfb4f474523292acbaa7d57","reward":"0x2b2a7a1d29a203f60e0a964fc64231265a49cd97","stateRoot":"0x12aa1d3ab0440d844c28fbc6f89d26082f39a8435b512fa487ff55c2056aceb3","number":"0x303bea4”, ... ... }}}
```

```shell
// Request
wscat -c http://localhost:8552
> {"jsonrpc":"2.0", "id": 1, "method": "klay_subscribe", "params": ["logs", {"fromBlock":"earliest","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b","topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]}]}

// Result
< {"jsonrpc":"2.0","id":1,"result":"0xbdab16c8e4ae1b9e6930c78359de3e0e"}
< {"jsonrpc":"2.0","method":"klay_subscription","params":{"subscription":"0xbdab16c8e4ae1b9e6930c78359de3e0e","result":{"address":"0x2e4bb340e26caffb4073d7f1151f37d17524cdbc","topics":["0xb1a7310b1a46c788fcf30784cad70442d5232acaef480b0c094c76bee8d9c77d"],"data":"0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000d2588fe96a34c56a5d0a484cb603bc16fc5cdbbc","blockNumber":"0x3041201","transactionHash":"0xdacdebc77006fc566f65448524a0bc770056d8c7a05244bc7bfb2123b1bd398c","transactionIndex":"0x0","blockHash":"0x899b2dbfe96a34ce5d965dbcfcf39d072b4ce1097d479923e6b6355f3e2609ec","logIndex":"0x0","removed":false}}}
```

## klay_uninstallFilter <a id="klay_uninstallfilter"></a>

Uninstalls a filter with given id. Should always be called when watch is no longer needed.
Additionally, filters timeout when they are not requested with [klay_getFilterChanges](#klay_getfilterchanges) for a period of time.

**Parameters**

| Name   | Type     | Description  |
| ------ | -------- | ------------ |
| filter | QUANTITY | A filter id. |

**Return Value**

| Type    | Description                                                           |
| ------- | --------------------------------------------------------------------- |
| Boolean | `true` if the filter was successfully uninstalled, otherwise `false`. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_uninstallFilter","params":["0xb"],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": true
}
```

## klay_unsubscribe <a id="klay_unsubscribe"></a>

Cancels the subscription with a specific subscription id by using either RPC Pub/Sub over WebSockets or filters over HTTP.
Only the connection that created a subscription can unsubscribe from it.

**Parameters**

| Type     | Description        |
| -------- | ------------------ |
| QUANTITY | A subscription id. |

**Return Value**

| Type    | Description                                                              |
| ------- | ------------------------------------------------------------------------ |
| Boolean | `true` if the subscription was successfully canceled, otherwise `false`. |

**Example**

This API is appropriate for use with a WebSocket tool, [`wscat`](https://www.npmjs.com/package/wscat).

```shell
// Request
> {"jsonrpc":"2.0", "id": 1, "method": "klay_unsubscribe", "params": ["0xab8ac7a4045025d0c2807d63060eea6d"]}

// Result
< {"jsonrpc":"2.0","id":1,"result":true}
```
