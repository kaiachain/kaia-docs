# Block

## defaultBlock <a id="defaultblock"></a>

```javascript
caver.kaia.defaultBlock
```

The default block is used for certain methods.  You can override it by passing
in the defaultBlock as the last parameter.  The default value is `"latest"`.

- [caver.kaia.getBalance()](./account.md#getbalance)
- [caver.kaia.getCode()](./account.md#getcode)
- [caver.kaia.getTransactionCount()](./account.md#gettransactioncount)
- [caver.kaia.getStorageAt()](#getstorageat)
- [caver.kaia.call()](./transaction/transaction.md#call)
- [new caver.kaia.Contract()](../caver.kaia.Contract.md#new-contract) -> [myContract.methods.myMethod().call()](../caver.kaia.Contract.md#methods-mymethod-call)

**Property**

Default block parameters can be one of the following:

- Number: A block number
- `"genesis"` - String: The genesis block
- `"latest"` - String: The latest block (current head of the blockchain)

Default is `"latest"`.

**Example**

```javascript
> caver.kaia.defaultBlock;
"latest"

// set the default block
> caver.kaia.defaultBlock = 1000;
```

## getBlockNumber <a id="getblocknumber"></a>

```javascript
caver.kaia.getBlockNumber([callback])
```

Returns the current block number.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Number` - The number of the most recent block.

**Example**

```javascript
> caver.kaia.getBlockNumber().then(console.log);
2744
```

## getBlock <a id="getblock"></a>

```javascript
caver.kaia.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] [, callback])
```
Returns a block matching the block hash or block number.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockHashOrBlockNumber | String \| Number | The block hash or block number. Or the string ``"genesis"``, or ``"latest"``. |
| returnTransactionObjects | Boolean | (optional, default ``false``) If ``true``, the returned block will contain all transactions as objects, if ``false`` it will only contains the transaction hashes. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

``Promise`` returns ``Object`` - The block object:

| Name | Type | Description |
| --- | --- | --- |
| blockScore | QUANTITY | Former difficulty. Always 1 in the BFT consensus engine |
| extraData | String | The "extra data" field of this block. |
| gasUsed | Number | The total used gas by all transactions in this block. |
| governanceData | DATA | RLP encoded governance configuration |
| hash | 32-byte String | Hash of the block. ``null`` when it is a pending block. |
| logsBloom | 256-byte String | The bloom filter for the logs of the block. ``null`` when it is a pending block. |
| number | Number | The block number. ``null`` when it is a pending block. |
| parentHash | 32-byte String | Hash of the parent block. |
| receiptsRoot | 32-byte DATA | The root of the receipts trie of the block. |
| reward | 20-byte DATA | The address of the beneficiary to whom the block rewards were given. |
| size | Number | Integer the size of this block in bytes. |
| stateRoot | 32-byte String | The root of the final state trie of the block. |
| timestamp | Number | The unix timestamp for when the block was collated. |
| timestampFoS | QUANTITY | The fraction of a second of the timestamp for when the block was collated. |
| totalBlockScore | QUANTITY | Integer of the total blockScore of the chain until this block. |
| transactions | Array | Array of transaction objects, or 32-byte transaction hashes depending on the ``returnTransactionObjects`` parameter. |
| transactionsRoot | 32-byte String | The root of the transaction trie of the block. |
| voteData | DATA | RLP encoded governance vote of the proposer |

**Example**

```javascript
> caver.kaia.getBlock(19097).then(console.log);
{ 
    blockscore: '0x1',
    extraData: '0xd7820a01846b6c617988676f312e31312e32856c696e75780000000000000000f8b3ea94715dd3ce7a285f21111715a2ba5537414d40506b9471959675eeb7c7ec1e0c74f206a9c488d7f178d4b8418e55cfb464eed804671bbee503f2dcacae9349f23aa3c42fc43349f96ef08bb07c1039541a3b768af32384c8e29ec7e673356a6b0ea4c6d88604ae8abae4303201f843b841386a3fbd09cd3a7c82c0b8fdc9ae8c3e624be5f12553dde42bed456093e40c113aa36fb7015b578611e2cd2ee979e6017b15be7d3cc645f455b32e8607c85d7100',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    number: '0x4a99',
    parentHash: '0x3b56b598828368d86b175a78ba21845125372851154840c6b1b318da910849c2',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0x59e6931f46b091f4ecbc39e8626fc0be7d3fcdeb',
    size: '0x314',
    stateRoot: '0xc65b3e3f1c32c33c095507d6d37e2a8a5589b178b5b03a1365295908ac92c40c',
    timestamp: '0x5d11f951',
    timestampFoS: '0x0',
    totalBlockScore: '0x4a9a',
    transactions: [ '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca' ],
    transactionsRoot: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
    voteData: '0x' 
}
```

## getBlockReceipts <a id="getblockreceipts"></a>

```javascript
caver.kaia.getBlockReceipts(blockHash [, callback])
```
Returns a list of transaction receipts included in a block identified by the given block hash.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockHash | String | Hash of a block. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array` - Receipts included in a block.  If the target block contains no transaction, an empty array `[]` is returned.


**Example**

```javascript
> caver.kaia.getBlockReceipts('0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283').then(console.log);
[ 
    { 
        blockHash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
        blockNumber: '0x4a99',
        contractAddress: null,
        from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
        gas: '0x493e0',
        gasPrice: '0x5d21dba00',
        gasUsed: '0x5208',
        logs: [],
        logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0x2',
        senderTxHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
        signatures: [ 
            { 
                V: '0x4e43',
                R: '0xa857ef0676d7e65697cadeaf1654b2facd71d0b9f942d695f3972a1f7c34c25c',
                S: '0x43fba9e5c2c16511f951e27957f1279ea3c1f913b27f9fbb2a8dcb5884e37e3d'
            } 
        ],
        status: '0x1',
        to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
        transactionHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
        transactionIndex: '0x0',
        type: 'TxTypeValueTransfer',
        typeInt: 8,
        value: '0xde0b6b3a7640000' 
    } 
]

> caver.kaia.getBlockReceipts('0x6275712cd6ec769603f1560819ad226ea29216881c495c778ca68f0c1cd6e550').then(console.log);
[]
```

## getBlockTransactionCount <a id="getblocktransactioncount"></a>

```javascript
caver.kaia.getBlockTransactionCount(blockHashOrBlockNumber [, callback])
```
Returns the number of transaction in a given block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockHashOrBlockNumber | String \| Number | The block number or hash. Or the string ``"genesis"``, or ``"latest"``. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

``Promise`` returns ``Number`` - The number of transactions in the given block.

**Example**

```javascript
> caver.kaia.getBlockTransactionCount("0x407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);
1
```


## getBlockWithConsensusInfo <a id="getblockwithconsensusinfo"></a>

```javascript
caver.kaia.getBlockWithConsensusInfo(blockHashOrBlockNumber [, callback])
```

Returns a block with consensus information matched by the given block hash or block number.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockHashOrBlockNumber | String \| Number | The block hash or block number. Or the string `"genesis"` or `"latest"`. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

``Promise`` returns ``Object`` - A block object with consensus information (a proposer and a list of committee members)
The block object contains:

| Name | Type | Description |
| --- | --- | --- |
| blockScore | QUANTITY | Former difficulty. Always 1 in the BFT consensus engine |
| committee | Array | Array of addresses of committee members of this block. The committee is a subset of validators participated in the consensus protocol for this block. |
| extraData | String | The "extra data" field of this block. |
| gasUsed | QUANTITY | The total used gas by all transactions in this block. |
| governanceData | DATA | RLP encoded governance configuration |
| hash | 32-byte DATA | Hash of the block. `null` when it is a pending block. |
| logsBloom | 256-byte String | The bloom filter for the logs of the block. ``null`` when it is a pending block. |
| number | QUANTITY | The block number. `null` when it is a pending block. |
| parentHash | 32-byte DATA | Hash of the parent block. |
| proposer | 20-byte DATA | The address of the block proposer. |
| receiptsRoot | 32-byte DATA | The root of the receipts trie of the block. |
| reward | 20-byte DATA | The address of the beneficiary to whom the block rewards were given. |
| size | QUANTITY | Integer the size of this block in bytes. |
| stateRoot | 32-byte DATA | The root of the final state trie of the block. |
| timestamp | QUANTITY | The unix timestamp for when the block was collated. |
| timestampFoS | QUANTITY | The fraction of a second of the timestamp for when the block was collated. |
| totalBlockScore | QUANTITY | Integer of the total blockScore of the chain until this block. |
| transactions | Array | Array of transaction objects. |
| transactionsRoot | 32-byte DATA | The root of the transaction trie of the block. |
| voteData | DATA | RLP encoded governance vote of the proposer |

**Examples**
```javascript
> caver.kaia.getBlockWithConsensusInfo(19097).then(console.log);
{ 
    blockscore: '0x1',
    committee: [ 
        '0x715dd3ce7a285f21111715a2ba5537414d40506b',
        '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4' 
    ],
    extraData: '0xd7820a01846b6c617988676f312e31312e32856c696e75780000000000000000f8b3ea94715dd3ce7a285f21111715a2ba5537414d40506b9471959675eeb7c7ec1e0c74f206a9c488d7f178d4b8418e55cfb464eed804671bbee503f2dcacae9349f23aa3c42fc43349f96ef08bb07c1039541a3b768af32384c8e29ec7e673356a6b0ea4c6d88604ae8abae4303201f843b841386a3fbd09cd3a7c82c0b8fdc9ae8c3e624be5f12553dde42bed456093e40c113aa36fb7015b578611e2cd2ee979e6017b15be7d3cc645f455b32e8607c85d7100',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    number: '0x4a99',
    parentHash: '0x3b56b598828368d86b175a78ba21845125372851154840c6b1b318da910849c2',
    proposer: '0x715dd3ce7a285f21111715a2ba5537414d40506b',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0x59e6931f46b091f4ecbc39e8626fc0be7d3fcdeb',
    size: '0x314',
    stateRoot: '0xc65b3e3f1c32c33c095507d6d37e2a8a5589b178b5b03a1365295908ac92c40c',
    timestamp: '0x5d11f951',
    timestampFoS: '0x0',
    totalBlockScore: '0x4a9a',
    transactions: [ 
        { 
            blockHash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
            blockNumber: '0x4a99',
            contractAddress: null,
            from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
            gas: '0x493e0',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x5208',
            logs: [],
            logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            nonce: '0x2',
            senderTxHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
            signatures: [ 
                { 
                    V: '0x4e43',
                    R: '0xa857ef0676d7e65697cadeaf1654b2facd71d0b9f942d695f3972a1f7c34c25c',
                    S: '0x43fba9e5c2c16511f951e27957f1279ea3c1f913b27f9fbb2a8dcb5884e37e3d' 
                } 
            ],
            status: '0x1',
            to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
            transactionHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
            transactionIndex: '0x0',
            type: 'TxTypeValueTransfer',
            typeInt: 8,
            value: '0xde0b6b3a7640000' 
        } 
    ],
    transactionsRoot: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
    voteData: '0x' 
}
```

## getCommittee <a id="getcommittee"></a>

```javascript
caver.kaia.getCommittee([defaultBlock] [, callback])
```

Returns a list of all validators in the committee at the specified block. If the parameter is not set, returns a list of all validators in the committee at the latest block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.kaia.defaultBlock](#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array` - Addresses of all validators in the committee.

**Example**

```javascript
> caver.kaia.getCommittee().then(console.log);
[
    "0x207e38864b45a538733741dc1ff92eff9d1a6159",
    "0x6d64bc82b93368a7f963d6c34483ca3893f405f6",
    "0xbc9c19f91878369776812039e4ebcdfa3c646716",
    "0xe3ed6fa287752b992f936b42360770c59731d9eb"
]
```

## getCommitteeSize <a id="getcommitteesize"></a>

```javascript
caver.kaia.getCommitteeSize([defaultBlock] [, callback])
```

Returns the size of the committee at the specified block. If the parameter is not set, returns the size of the committee at the latest block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.kaia.defaultBlock](#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Number` - The size of the committee.

**Example**

```javascript
> caver.kaia.getCommitteeSize().then(console.log);
4
```

## getCouncil <a id="getcouncil"></a>
**NOTE**: `getValidators` is replaced with this method and is not supported anymore.

```javascript
caver.kaia.getCouncil([defaultBlock] [, callback])
```

Returns a list of all validators of the council at the specified block. If the parameter is not set, returns a list of all validators of the council at the latest block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.kaia.defaultBlock](#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array` - Addresses of all validators of the council.

**Example**

```javascript
> caver.kaia.getCouncil().then(console.log);
[
    "0x207e38864b45a538733741dc1ff92eff9d1a6159",
    "0x6d64bc82b93368a7f963d6c34483ca3893f405f6",
    "0xbc9c19f91878369776812039e4ebcdfa3c646716",
    "0xe3ed6fa287752b992f936b42360770c59731d9eb"
]
```

## getCouncilSize <a id="getcouncilsize"></a>

```javascript
caver.kaia.getCouncilSize([defaultBlock] [, callback])
```

Returns the size of the council at the specified block. If the parameter is not set, returns the size of the council at the latest block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.kaia.defaultBlock](#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Number` - The size of the council.

**Example**

```javascript
> caver.kaia.getCouncilSize().then(console.log);
4
```


## getStorageAt <a id="getstorageat"></a>

```javascript
caver.kaia.getStorageAt(address, position [, defaultBlock] [, callback])
```
Gets the storage at a specific position of an address.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address to get the storage from. |
| position | Number | The index position of the storage. |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.kaia.defaultBlock](#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

``Promise`` returns ``String`` - The value in storage at the given position.

**Example**

```javascript
> caver.kaia.getStorageAt("0x407d73d8a49eeb85d32cf465507dd71d507100c1", 0).then(console.log);
"0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"
```


## isMining <a id="ismining"></a>

```javascript
caver.kaia.isMining([callback])
```

Returns `true` if client is actively mining new blocks.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |


**Return Value**

`Promise` returns `Boolean` - `true` if the client is mining, otherwise `false`.

**Example**

```javascript
> caver.kaia.isMining().then(console.log);
true
```

## isSyncing <a id="issyncing"></a>

```javascript
caver.kaia.isSyncing([callback])
```

Checks if the node is currently syncing and returns either a syncing object or `false`.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |


**Return Value**

`Promise` returns `Object|Boolean` - A sync object when the node is currently syncing or `false`:

| Name | Type | Description |
| --- | --- | --- |
| startingBlock | Number | The block number where the sync started. |
| currentBlock | Number | The block number where at which block the node currently synced to already. |
| highestBlock | Number | The estimated block number to sync to. |
| knownStates | Number | The estimated states to download. |
| pulledStates | Number | The already downloaded states. |

**Example**

```javascript
> caver.kaia.isSyncing().then(console.log);
{
    startingBlock: 100,
    currentBlock: 312,
    highestBlock: 512,
    knownStates: 234566,
    pulledStates: 123455
}
```
