# Gas

## eth_feeHistory<a id="eth_feehistory"></a>

Returns base fee per gas and transaction effective priority fee per gas history for the requested block range if available.

**Parameters**

| Name              | Type            | Description                                                                                                                                                                                                                                                       |
| ----------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockCount        | QUANTITY        | Number of blocks in the requested range expressed as a hexidecimal number. Between 1 (0x1) and 1024 (0x400) blocks can be requested in a single query. Less than requested may be returned if not all blocks are available. |
| lastBlock         | QUANTITY \| TAG | Highest number block of the requested range as a block number or block tag.                                                                                                                                                                                       |
| rewardPercentiles | Array of FLOAT  | Array of floating point value between 0 and 100.                                                                                                                                                                                                                  |

**Return Value**

| Name          | Type              | Description                                                                                                                                                        |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| oldestBlock   | QUANTITY          | Lowest number block of the returned range expressed as a hexidecimal number.                                                                                       |
| baseFeePerGas | Array of QUANTITY | An array of block base fees per gas. This includes the next block after the newest of the returned range, because this value can be derived from the newest block. |
| gasUsedRatio  | Array of FLOAT    | An array of block gas used ratios. These are calculated as the ratio of gasUsed and gasLimit.                                                                      |
| reward        | Array of QUANTITY | An array of effective priority fee per gas data points from a single block. All zeroes are returned if the block is empty.                                         |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_feeHistory","params":["0x10", "latest", [0.1, 0.2, 0.3]],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "oldestBlock": "0xa5b",
    "reward": [
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x5d21dba00",
        "0x5d21dba00",
        "0x5d21dba00"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x5d21dba00",
        "0x5d21dba00",
        "0x5d21dba00"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x5d21dba00",
        "0x5d21dba00",
        "0x5d21dba00"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ]
    ],
    "baseFeePerGas": [
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0"
    ],
    "gasUsedRatio": [
      0,
      0,
      0,
      0,
      0,
      0.0002952004000002952,
      0,
      0,
      0.00029504250000029504,
      0,
      0,
      0.0002963777000002964,
      0,
      0,
      0,
      0
    ]
  }
}
```

## eth_maxPriorityFeePerGas <a id="eth_maxpriorityfeepergas"></a>

Returns a suggestion for a gas tip cap for dynamic fee transaction in peb.

**NOTE**: This API has different behavior from Ethereum's.
Before Magma hardfork, it returns a gas price of Klaytn instead of suggesting a gas price as in Ethereum.
After Magma hardfork, it just returns 0.

**Parameters**

None

**Return Value**

| Type     | Description                              |
| -------- | ---------------------------------------- |
| QUANTITY | Integer of the current gas price in peb. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston (Gwei)
}
```
