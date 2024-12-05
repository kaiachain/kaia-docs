# Block

## The Default Block Parameter <a id="the-default-block-parameter"></a>

When you send an API request with the `eth` namespace, the block height is determined by the `defaultBlock` parameter.

The following options are possible for the `defaultBlock` parameter:

- `HEX String` - an integer block number
- `String "earliest"` for the earliest/genesis block
- `String "latest"` - for the latest mined block
- `String "pending"` - for pending state/transactions

## eth_blockNumber <a id="eth_blocknumber"></a>

Returns the number of the most recent block.

**Parameters**

None

**Return Value**

| Type     | Description                                           |
| -------- | ----------------------------------------------------- |
| QUANTITY | Integer of the current block number the client is on. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":83,
  "result": "0xc94"
}
```

## eth_getHeaderByNumber <a id="eth_getheaderbynumber"></a>

Returns information about a header by number.

Please check the [Caution-Header](./caution.md#block_header) before using this API.

**Parameters**

| Type            | Description                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](#the-default-block-parameter). |

**Return Value**

See [eth_getHeaderByHash](#eth_getheaderbyhash)

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByNumber","params":["0x1b4"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x5d21dba00",
        "difficulty": "0x1",
        "extraData": "0x",
        "gasLimit": "0xe8d4a50fff",
        "gasUsed": "0x28b484",
        "hash": "0x5de0dc71dec2e724be002dcad135b602810769ce26e16b3b06862405e08ca71b",
        "logsBloom": "0x02200022800002050000084080014015001001004b0002440401060a0830000200014041044010180010430018800119120098000800200241c2090a4020011040004400002201081800440a340020a4000820100848081020003000892050105a05000002100000200012c0800408982000085100000c4040a03814000800200812210100200010004018410d80004214800123210400082002214620100021028800120309200802008291c8e000904210080008110900010100081000101000501002010a0080311886000008000000240900400000100200a402005830200010300804020200000002310000008004004080a58000550000508000000000",
        "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x1b4",
        "parentHash": "0x99fcd33dddd763835ba8bdc842853d973496a7e64ea2f6cf826bc2c338e23b0c",
        "receiptsRoot": "0xd3d70ed54a9274ba3191bf2d4fd8738c5d782fe17c8bfb45c03a25dc04120c35",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x23a",
        "stateRoot": "0x1076e6726164bd6f74720a717242584109f37c55017d004eefccf9ec3be76c18",
        "timestamp": "0x61b0a6c6",
        "totalDifficulty": "0x12",
        "transactionsRoot": "0x6ec8daca98c1005d9bbd7716b5e94180e2bf0e6b77770174563a166337369344" }
}   
```

## eth_getHeaderByHash <a id="eth_getheaderbyhash"></a>

Returns information about a header by hash.

Please check [Caution-Header](./caution.md#block_header) before using this API.

**Parameters**

| Type         | Description      |
| ------------ | ---------------- |
| 32-byte DATA | Hash of a block. |

**Return Value**

`Object` - A header object, or `null` when no header was found. Otherwise, it returns an error.

| Name             | Type          | Description                                                                                                               |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas    | QUANTITY      | The base fee per gas.                                                                                                     |
| difficulty       | QUANTITY      | The integer of the difficulty for this block.                                                                             |
| extraData        | DATA          | The "extra data" field of this block.                                                                                     |
| gasLimit         | QUANTITY      | The maximum gas allowed in this block.                                                                                    |
| gasUsed          | QUANTITY      | The total used gas by all transactions in this block.                                                                     |
| hash             | 32-byte DATA  | Hash of the block. `null` when it is a pending block.                                                                     |
| logsBloom        | 256-byte DATA | The bloom filter for the logs of the block.                                                                               |
| miner            | 20-byte DATA  | The address of the beneficiary to whom the mining rewards were given.                                                     |
| mixHash          | 32-byte DATA  | The hash which proves combined with the nonce that a sufficient amount of computation has been carried out on this block. |
| nonce            | 8-byte DATA   | The hash of the generated proof-of-work.                                                                                  |
| number           | QUANTITY      | The block number. `null` when it is a pending block.                                                                      |
| parentHash       | 32-byte DATA  | Hash of the parent block.                                                                                                 |
| receiptsRoot     | 32-byte DATA  | The root of the receipts trie of the block.                                                                               |
| sha3Uncles       | 32-byte DATA  | The SHA3 of the uncles data in the block.                                                                                 |
| size             | QUANTITY      | Integer of the size of this block in bytes.                                                                               |
| stateRoot        | 32-byte DATA  | The root of the final state trie of the block.                                                                            |
| timestamp        | QUANTITY      | The Unix timestamp for when the block was collated.                                                                       |
| totalDifficulty  | QUANTITY      | The total blockScore of the chain until this block.                                                                       |
| transactionsRoot | 32-byte DATA  | The root of the transaction trie of the block.                                                                            |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x5d21dba00",
        "difficulty": "0x1",
        "extraData": "0x",
        "gasLimit": "0xe8d4a50fff",
        "gasUsed": "0x28b484",
        "hash": "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
        "logsBloom": "0x02200022800002050000084080014015001001004b0002440401060a0830000200014041044010180010430018800119120098000800200241c2090a4020011040004400002201081800440a340020a4000820100848081020003000892050105a05000002100000200012c0800408982000085100000c4040a03814000800200812210100200010004018410d80004214800123210400082002214620100021028800120309200802008291c8e000904210080008110900010100081000101000501002010a0080311886000008000000240900400000100200a402005830200010300804020200000002310000008004004080a58000550000508000000000",
        "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0xd208de",
        "parentHash": "0x99fcd33dddd763835ba8bdc842853d973496a7e64ea2f6cf826bc2c338e23b0c",
        "receiptsRoot": "0xd3d70ed54a9274ba3191bf2d4fd8738c5d782fe17c8bfb45c03a25dc04120c35",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x23a",
        "stateRoot": "0x1076e6726164bd6f74720a717242584109f37c55017d004eefccf9ec3be76c18",
        "timestamp": "0x61b0a6c6",
        "totalDifficulty": "0xd208df",
        "transactionsRoot": "0x6ec8daca98c1005d9bbd7716b5e94180e2bf0e6b77770174563a166337369344"
    }
}   
```

## eth_getBlockByNumber <a id="eth_getblockbynumber"></a>

Returns information about a block by block number.

Please check [Caution-Block](./caution.md#block) before using this API.

**Parameters**

| Type            | Description                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](#the-default-block-parameter). |
| Boolean         | If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.                                                        |

**Return Value**

See [eth_getBlockByHash](#eth_getblockbyhash)

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0xd0054e", false],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "baseFeePerGas": "0x5d21dba00",
    "difficulty": "0x1",
    "extraData": "0x",
    "gasLimit": "0xe8d4a50fff",
    "gasUsed": "0x44437",
    "hash": "0x456a7cbb6fada11a0ca8cec24510d89da1c52898f1087528752ae6e13973fbc5",
    "logsBloom": "0x0000100000000094000000400000080000000040000000000000000000000002000000000000000000000000004001000000200000000000000008000220000000080400000800000000000a000000000000000000000000000010000000000000002000000408000000000000000010000080101002000000000010000000100000010000200800000400000080000000000000000000000002000000102000024000080200000000000082000000000000000000000000010000000000000000100012000000000000011000000000002000201000000008000000002000000010002800000000001400000000000000000000000100000000200000000000",
    "miner": "0x1ad91ee08f21be3de0ba2ba6918e714da6b45836",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "number": "0xd0054e",
    "parentHash": "0x2b88fdb3821669357a0b8367115e30145135c44bb8f62641d4e7765a7f555d17",
    "receiptsRoot": "0xc36bc44d0b52dee954be9bbd519bddc0bf6e991af2ed6f6ba506f89f10cdb9a7",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x64c",
    "stateRoot": "0x123a0da1c621236e64f9b486a9a9712ec6ce07d6690acab5a18b716d17cdc29f",
    "timestamp": "0x6194f184",
    "totalDifficulty": "0xd0054f",
    "transactions": [
      "0x5b3492f8199ee2a551d991b7d00bd48967ca5e5c1c15d6e1ee9fda97e3126e9a",
      "0x8e1870262f2ba0452458280ad6ad5d54e5288623e415692c822979b7608c7297",
      "0x98053d20b01c9e56964a57084fb91ccc01b242adfb09c23534162dcbbcc094c2",
    ],
    "transactionsRoot": "0x29b9880f57c0e79d0be5aa4fcc6b4cfcbed3e51478ad8f44533acce012df8cf1",
    "uncles": []
  }
}
```

## eth_getBlockByHash <a id="eth_getblockbyhash"></a>

Returns information about a block by hash.

Please check [Caution-Block](./caution.md#block) before using this API.

**Parameters**

| Type         | Description                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------- |
| 32-byte DATA | Hash of a block.                                                                                   |
| Boolean      | If `true` it returns the full transaction objects, if `false` only the hashes of the transactions. |

**Return Value**

`Object` - A block object, or `null` when no block was found. Otherwise, it returns an error.

| Name             | Type          | Description                                                                                                               |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas    | QUANTITY      | The base fee per gas.                                                                                                     |
| difficulty       | QUANTITY      | The integer of the difficulty for this block                                                                              |
| extraData        | DATA          | The "extra data" field of this block.                                                                                     |
| gasLimit         | QUANTITY      | The maximum gas allowed in this block.                                                                                    |
| gasUsed          | QUANTITY      | The total used gas by all transactions in this block.                                                                     |
| hash             | 32-byte DATA  | Hash of the block. `null` when it is a pending block.                                                                     |
| logsBloom        | 256-byte DATA | The bloom filter for the logs of the block. `null` when it is a pending block.                                            |
| miner            | 20-byte DATA  | The address of the beneficiary to whom the mining rewards were given.                                                     |
| mixHash          | 32-byte DATA  | The hash which proves combined with the nonce that a sufficient amount of computation has been carried out on this block. |
| nonce            | 8-byte DATA   | The hash of the generated proof-of-work.                                                                                  |
| number           | QUANTITY      | The block number. `null` when it is a pending block.                                                                      |
| parentHash       | 32-byte DATA  | Hash of the parent block.                                                                                                 |
| receiptsRoot     | 32-byte DATA  | The root of the receipts trie of the block.                                                                               |
| sha3Uncles       | 32-byte DATA  | The SHA3 of the uncles data in the block.                                                                                 |
| size             | QUANTITY      | Integer of the size of this block in bytes.                                                                               |
| stateRoot        | 32-byte DATA  | The root of the final state trie of the block.                                                                            |
| timestamp        | QUANTITY      | The Unix timestamp for when the block was collated.                                                                       |
| totalDifficulty  | QUANTITY      | The total blockScore of the chain until this block                                                                        |
| transactionsRoot | 32-byte DATA  | The root of the transaction trie of the block.                                                                            |
| transactions     | Array         | Array of transaction objects, or 32-byte transaction hashes depending on the last given parameter.                        |
| uncles           | Array         | Array of uncle hashes.                                                                                                    |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", true],"id":1}' http://localhost:8551

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      baseFeePerGas: "0x5d21dba00",
      difficulty: "0x1",
      extraData: "0xd8820505846b6c617988676f312e31312e328664617277696e00000000000000f89ed594e733cb4d279da696f30d470f8c04decb54fcb0d2b841f1f600d136f93a5a2d9c12a7a9f6d7ba80a047c3910a2bbc01e38bcce25e48ed2004d21f134df5efaf1f8cbb9a26e1548e57628ab258c935490c11a7cd65324701f843b841444b3efc40071b6eec2c4d2630b483710b8fc7a601432431b0161f489102d1ca02f2ef93153d0be3843aa563d34cee1716163f58711843442aedd94a56303c0400",
      gasLimit: "0xe8d4a50fff",
      gasUsed: "0x0",
      governanceData: "0x",
      hash: "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
      logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      miner: "0x0000000000000000000000000000000000000000",
      mixHash: "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
      nonce: "0x0000000000000000",
      number: "0x1",
      parentHash: "0x73255a60e9491b5715f9bfcb7fa1143296810f629836d4cefbd1921d9173d63d",
      receiptsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      reward: "0x0000000000000000000000000000000000000000",
      size: "0x2d7",
      stateRoot: "0xedb87f4b0f905a655c80d1768eb22b1eff2405098c4748b8364c869611e02a2b",
      timestamp: "0x5c99cbd8",
      totalDifficulty: "0x2",
      transactions: [],
      transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      uncles: [],
    }
}
```

## eth_getBlockReceipts <a id="eth_getblockreceipts"></a>

Returns receipts included in a block.

**Parameters**

| Type                          | Description                                                                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Number \| 32-byte DATA \| TAG | The block number or hash. Or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](#the-default-block-parameter). |

**Return Value**

Receipts included in a block.  If the target block contains no transaction, an empty array `[]` is returned.

**Example**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_getBlockReceipts", "params":["0xb14e8716f732186f2c99bb7a215a7cb1ec40e91e8d83739bfb593ed4b9047aa1"],"id":1}' https://public-en-baobab.klaytn.net
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "blockHash": "0xb14e8716f732186f2c99bb7a215a7cb1ec40e91e8d83739bfb593ed4b9047aa1",
      "blockNumber": "0x85ef20d",
      "contractAddress": null,
      "cumulativeGasUsed": "0x23b6e",
      "effectiveGasPrice": "0x5d21dba00",
      "from": "0x60d690e4d5db4025f4781c6cf3bff8669500823c",
      "gasUsed": "0x23b6e",
      "logs": [
        ...
      ],
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000220000000400000000000000000000000000000000000002000000000010001000000000040000000000000000000000000000000000000000000000000000400000080000000100000000000000000000000000000000000000000000480000000000000000000000010000000001000000000000000000000000000000000000000000009000000000000000000000000000000000000000008000000000000000004000000000004000000000000000000000000000000000000000000000000000000000000000200",
      "status": "0x1",
      "to": "0x27e1255f2a0ea596992158a0bc838f43be34b99d",
      "transactionHash": "0xafd15213b06144a85dd02adf88c32efb3d395e784f153c213a40b7ea25de1942",
      "transactionIndex": "0x0",
      "type": "0x0"
    }
  ]
}
```

## eth_getUncleByBlockHashAndIndex <a id="eth_getunclebyblockhashandindex"></a>

Returns information about a uncle of a block by hash and the uncle's index position.
Since there are no uncles in Klaytn, it always returns `null`.

**Parameters**

| Type         | Description                 |
| ------------ | --------------------------- |
| 32-byte DATA | The hash of a block.        |
| QUANTITY     | The uncle's index position. |

**Return Value**
`null`

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", "0x1"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```

## eth_getUncleByBlockNumberAndIndex <a id="eth_getunclebyblocknumberandindex"></a>

Returns information about a uncle of a block by number and the uncle's index position.
As there are no uncles in Klaytn, it always returns `null`.

**Parameters**

| Type            | Description                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](#the-default-block-parameter). |
| QUANTITY        | The uncle's index position.                                                                                                                               |

**Return Value**
`null`

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0xe8", "0x1"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```

## eth_getBlockTransactionCountByNumber <a id="eth_getblocktransactioncountbynumber"></a>

Returns the number of transactions in a block matching the given block number.

**Parameters**

| Type            | Description                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](#the-default-block-parameter). |

**Return Value**

| Type     | Description                                          |
| -------- | ---------------------------------------------------- |
| QUANTITY | Integer of the number of transactions in this block. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa" // 10
}
```

## eth_getBlockTransactionCountByHash <a id="eth_getblocktransactioncountbyhash"></a>

Returns the number of transactions in a block from a block that matches the given hash.

**Parameters**

| Type         | Description     |
| ------------ | --------------- |
| 32-byte DATA | Hash of a block |

**Return Value**

| Type     | Description                                          |
| -------- | ---------------------------------------------------- |
| QUANTITY | Integer of the number of transactions in this block. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getUncleCountByBlockNumber <a id="eth_getunclecountbyblocknumber"></a>

Returns the number of uncles in a block from a block matching the given block number.
Since there are no uncles in Klaytn, it returns `0x0`. It returns `null` if there is no matching block.

**Parameters**

| Type            | Description                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](#the-default-block-parameter). |

**Return Value**

| Type     | Description                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------- |
| QUANTITY | Integer of the number of transactions in this block. It returns `null` if there is no matching block. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0" // 0
}
```

## eth_getUncleCountByBlockHash <a id="eth_getunclecountbyblockhash"></a>

Returns the number of uncles in a block from a block matching the given block hash.
Since there are no uncles in Klaytn, it returns `0x0`. It returns `null` if there is no matching block.

**Parameters**

| Type         | Description     |
| ------------ | --------------- |
| 32-byte DATA | Hash of a block |

**Return Value**

| Type     | Description                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------- |
| QUANTITY | Integer of the number of transactions in this block. It returns `null` if there is no matching block. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getStorageAt <a id="eth_getstorageat"></a>

Returns the value from a storage position at a given address.

**Parameters**

| Type                    | Description                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 20-byte DATA            | Address of the storage.                                                                                                                                                  |
| QUANTITY                | Integer of the position in the storage.                                                                                                                                  |
| QUANTITY \| TAG \| HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](#the-default-block-parameter), or block hash. |

**Return Value**

| Type | Description                         |
| ---- | ----------------------------------- |
| DATA | The value at this storage position. |

**Example**

Calculating the correct position depends on the storage to retrieve. Consider the following contract deployed at `0x295a70b2de5e3953354a6a8344e616ed314d7251` by the address `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;

    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Retrieving the value of `pos0` is straight forward:

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Retrieving an element of the map is harder. The position of an element in the map is calculated with:

```javascript
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

This means to retrieve the storage on `pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]` we need to calculate the position with:

```javascript
keccak(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

The Klaytn console which comes with the `klay` library can be used to make the calculation

```javascript
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> klay.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Now to fetch the storage:

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

## eth_mining <a id="eth_mining"></a>

Returns `true` if client is actively mining new blocks.

**NOTE**: Currently, every node is on mining mode by default to resend transactions. Please note that the actual "mining" is only performed by the Consensus Nodes (CNs).

**Parameters**

None

**Return Value**

| Type    | Description                                        |
| ------- | -------------------------------------------------- |
| Boolean | `true` if the client is mining, otherwise `false`. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":true
}
```

## eth_syncing <a id="eth_syncing"></a>

Returns an object with data about the sync status or `false`.

**Parameters**

None

**Return Value**

`Object|Boolean`, an object with sync status data or `false` when not syncing:

| Name          | Type     | Description                                                                                                        |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| startingBlock | QUANTITY | The block at which the import started (will only be reset, after the sync reached his head).    |
| currentBlock  | QUANTITY | The current block, same as `eth_blockNumber`.                                                                      |
| highestBlock  | QUANTITY | The estimated highest block.                                                                                       |
| pulledStates  | QUANTITY | The number of state entries processed until now.  If the sync mode is not "fast", zero is returned.                |
| knownStates   | QUANTITY | The number of known state entries that still need to be pulled.  If the sync mode is not "fast", zero is returned. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    "currentBlock":"0x3e31e",
    "highestBlock":"0x827eef",
    "knownStates":"0x0",
    "pulledStates":"0x0",
    "startingBlock":"0x0"
  }
}
// Or when not syncing
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```
