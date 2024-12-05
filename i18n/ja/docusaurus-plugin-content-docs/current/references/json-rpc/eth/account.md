# Account

## eth_accounts <a id="eth_accounts"></a>

Returns a list of addresses owned by client.

**Parameters**

None

**Return Value**

| Type                  | Description                    |
| --------------------- | ------------------------------ |
| Array of 20-byte DATA | Addresses owned by the client. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f"]
}
```

## eth_getBalance <a id="eth_getbalance"></a>

Returns the balance of the account of given address.

**Parameters**

| Name                 | Type                    | Description                                                                                                                                                                                 |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address              | 20-byte DATA            | Address to check for balance.                                                                                                                                                               |
| block number or hash | QUANTITY \| TAG \| HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](../eth/block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type     | Description                            |
| -------- | -------------------------------------- |
| QUANTITY | Integer of the current balance in peb. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

## eth_getCode <a id="eth_getcode"></a>

Returns code at a given address.

**Parameters**

| Type                    | Description                                                                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA            | Address                                                                                                                                                                                     |
| QUANTITY \| TAG \| HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](../eth/block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type | Description                      |
| ---- | -------------------------------- |
| DATA | The code from the given address. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result":   "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```

## eth_getTransactionCount <a id="eth_gettransactioncount"></a>

Returns the number of transactions _sent_ from an address.

**Parameters**

| Type                    | Description                                                                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA            | Address                                                                                                                                                                                     |
| QUANTITY \| TAG \| HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](../eth/block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type     | Description                                                   |
| -------- | ------------------------------------------------------------- |
| QUANTITY | Integer of the number of transactions send from this address. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":1}' http://localhost:8551

// Result
{
 "jsonrpc": "2.0",
 "id":1,
 "result": "0x1" // 1
}
```

## eth_sign <a id="eth_sign"></a>

The sign method calculates a Klaytn-specific signature with:

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

Adding a prefix to the message makes the calculated signature recognizable as a Klaytn-specific signature. This prevents misuse where a malicious dApp signs arbitrary data (e.g. transaction) and uses the signature for impersonation.

**NOTE**: The address to sign with must be unlocked.

**Parameters**

| Name    | Type         | Description     |
| ------- | ------------ | --------------- |
| account | 20-byte DATA | Address         |
| message | N-byte DATA  | Message to sign |

**Return Value**

| Type | Description |
| ---- | ----------- |
| DATA | Signature   |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```
