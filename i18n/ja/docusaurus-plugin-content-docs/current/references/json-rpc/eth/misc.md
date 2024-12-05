# Miscellaneous

## eth_hashrate <a id="eth_hashrate"></a>

Returns the number of hashes per second that the node is mining with.

Please note that it always return `0x0` because there is no PoW mechanism in Klaytn.

**Parameters**

None

**Return Value**

| Type     | Description                      |
| -------- | -------------------------------- |
| QUANTITY | The number of hashes per second. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getHashrate <a id="eth_gethashrate"></a>

Returns the number of hashes per second that the node is mining with.

Please note that it always return `0` because there is no PoW mechanism in Klaytn.

**Parameters**

None

**Return Value**

| Type     | Description                      |
| -------- | -------------------------------- |
| QUANTITY | The number of hashes per second. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHashrate","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": 0
}
```

## eth_getWork <a id="eth_getwork"></a>

Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").

Please note that it always return `errNoMiningWork` because there is no PoW mechanism in Klaytn.

**Parameters**

None

**Return Value**

| Type                  | Description                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Array of 32-byte DATA | List of current block header pow-hash, the seed hash used for the DAG, the boundary condition ("target"), 2^256 / difficulty. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getWork","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "error": {
    "code": -32000,
    "message": "no mining work available yet"
  }
}
```

## eth_submitWork <a id="eth_submitwork"></a>

Used for submitting a proof-of-work solution.

Please note that it always return `false` because there is no PoW mechanism in Klaytn.

**Parameters**

| Type         | Description                                         |
| ------------ | --------------------------------------------------- |
| 8-byte DATA  | The nonce found (64 bits)        |
| 32-byte DATA | The header’s pow-hash (256 bits) |
| 32-byte DATA | The mix digest (256 bits)        |

**Return Value**

| Type    | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| Boolean | Returns true if the provided solution is valid, otherwise false. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submitWork","params":["0x0000000000000001", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```

## eth_submitHashrate <a id="eth_submithashrate"></a>

Used for submitting mining hashrate.

Please note that it always return `false` because there is no PoW mechanism in Klaytn.

**Parameters**

| Name     | Type         | Description                                                                         |
| -------- | ------------ | ----------------------------------------------------------------------------------- |
| hashrate | 32-byte DATA | A hexadecimal string representation (32 bytes) of the hash rate. |
| id       | 32-byte DATA | A random hexadecimal(32 bytes) ID identifying the client.        |

**Return Value**

| Type    | Description                                                              |
| ------- | ------------------------------------------------------------------------ |
| Boolean | Returns true if submitting went through succesfully and false otherwise. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submithashrate","params":["0x5", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```

## eth_createAccessList <a id="eth_createaccesslist"></a>

This method creates an `accessList` based on a given `Transaction`.
The `accessList` contains all storage slots and addresses read and written by the transaction, except for the sender account and the precompiles.
This method uses the same transaction call object and `blockNumberOrTag` object as [`eth_call`](./transaction.md#eth_call).
An accessList can be used to unstuck contracts that became inaccessible due to gas cost increases.
Adding an `accessList` to your transaction does not necessary result in lower gas usage compared to a transaction without an access list.

**Parameters**

| Name             | Type            | Description                                                                                                                                                                                                                                                                                                      |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject       | Object          | The transaction call object. Refer to [`eth_call`](./transaction.md#eth_call) for the object's properties.                                                                                                                                                                                                       |
| blockNumberOrTag | QUANTITY \| TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](./block.md#the-default-block-parameter). The block number is mandatory and defines the context (state) against which the specified transaction should be executed. |

**Return Value**

| Type   | Description                                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| Object | Returns list of addresses and storage keys used by the transaction, plus the gas consumed when the access list is added. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_createAccessList", "params": [{"from": "0x8cd02c6cbd8375b39b06577f8d50c51d86e8d5cd", "data": "0x608060806080608155"}, "latest"], "id":1}' http://localhost:8551
// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    "accessList": [{
      "address": "0xa02457e5dfd32bda5fc7e1f1b008aa5979568150",
      "storageKeys": ["0x0000000000000000000000000000000000000000000000000000000000000081"]
    }],
    "gasUsed": "0x128ee"
  }
}
```
