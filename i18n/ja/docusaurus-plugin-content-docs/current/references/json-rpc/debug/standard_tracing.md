# VM Standard Tracing

**NOTE** Some debug namespace APIs are unsafe/unappropriate to be opened to public.
We recommend you to provide the debug namespace APIs to authorized users only.
However, if you want to maintain a public EN and provide debug namespace APIs to the public,
we strongly recommend you to set the `rpc.unsafe-debug.disable` flag which will disable APIs
that are unsafe/unappropriate to be opened to the public and enable only a subset of the debug namespace APIs.
The enabled APIs are as follows:

- [VM Tracing](./tracing.md) APIs, however with limited functionality (only [pre-defined tracers](./tracing.md#tracing-options) are allowed)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

## debug_standardTraceBadBlockToFile <a id="debug_standardtracebadblocktofile"></a>

Similar to [debug_traceBadBlock](./tracing.md#debug_tracebadblock),
`standardTraceBadBlockToFile` accepts a bad block hash and will replay the bad
block. It returns a list of file names containing tracing result. Note that the
files will be stored in the machine that serves this API.

|  Client | Method Invocation                                                       |
| :-----: | ----------------------------------------------------------------------- |
| Console | `debug.standardTraceBadBlockToFile(hash, [options])`                    |
|   RPC   | `{"method": "debug_standardTraceBadBlockToFile", "params": [hash, {}]}` |

**Parameters**

| Name    | Type         | Description                                                |
| ------- | ------------ | ---------------------------------------------------------- |
| hash    | 32-byte DATA | Hash of a block.                                           |
| options | object       | See [standard tracing options](#standard-tracing-options). |

**Return Value**

| Type       | Description                                                                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON array | A list of file names. Each represents a tracing result of a transaction. The format of a file name is `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`. |

**Example**

Console

```javascript
> debug.standardTraceBadBlockToFile("0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-701973544", "/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-918920039"]
```

HTTP RPC

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBadBlockToFile","params":["0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-608268252","/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-315574667"]}
```

## debug_standardTraceBlockToFile <a id="debug_standardtraceblocktofile"></a>

Similar to [debug_traceBlock](./tracing.md#debug_traceblock),
`standardTraceBlockToFile` accepts a block hash and will replay the block that
is already present in the database. It returns a list of file names containing
tracing result. Note that the files will be stored in the machine that serves
this API.

|  Client | Method Invocation                                                    |
| :-----: | -------------------------------------------------------------------- |
| Console | `debug.standardTraceBlockToFile(hash, [options])`                    |
|   RPC   | `{"method": "debug_standardTraceBlockToFile", "params": [hash, {}]}` |

**Parameters**

| Name    | Type         | Description                                                |
| ------- | ------------ | ---------------------------------------------------------- |
| hash    | 32-byte DATA | Hash of a block.                                           |
| options | object       | See [standard tracing options](#standard-tracing-options). |

**Return Value**

| Type       | Description                                                                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON array | A list of file names. Each represents a tracing result of a transaction. The format of a file name is `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`. |

**Example**

Console

```javascript
> debug.standardTraceBlockToFile("0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-141224302"]
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBlockToFile","params":["0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-288181237"]}
```

## Standard Tracing Options <a id="standard-tracing-options"></a>

You may give trace API function a secondary optional argument, which specifies
the options for this specific call. The possible options are:

- `disableStorage`: `BOOL`. Setting this to true will disable storage capture (default = false).
- `disableMemory`: `BOOL`. Setting this to true will disable memory capture (default = false).
- `disableStack`: `BOOL`. Setting this to true will disable stack capture (default = false).
- `txHash`: `string`. Setting this value will trace only the specified transaction.
