# caver.rpc.governance

`caver.rpc.governance` provides JSON-RPC call with the `governance` name space.

## caver.rpc.governance.vote <a id="caver-rpc-governance-vote"></a>

```javascript
caver.rpc.governance.vote(key, value [, callback])
```

Submits a new vote. If the node has the right to vote based on the governance mode, the vote can be submitted. If not, an error will occur and the vote will be ignored.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| key | string | Name of the configuration setting to be changed. Key has the form "domain.field". |
| value | string \| number \| boolean | Various types of value for each key. |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

For more details about the `key` and `value` for `caver.rpc.governance.vote`, please refer to [governance_vote](../../../../json-rpc/governance.md#governance_vote).


**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | Result of vote submission. |

**Example**

```javascript
> caver.rpc.governance.vote('governance.governancemode', 'ballot').then(console.log)
Your vote was successfully placed.
```

## caver.rpc.governance.showTally <a id="caver-rpc-governance-showtally"></a>

```javascript
caver.rpc.governance.showTally([callback])
```

Provides the current tally of governance votes. It shows the aggregate approval rate in percentage. The suggested change shall pass when the rate is over 50%.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type | Description |
| --- | --- |
| Array | An array containing the vote's value and the approval rate in percentage. |

**Example**

```javascript
> caver.rpc.governance.showTally().then(console.log)
[
  {
    Key: 'governance.unitprice',
    Value: 25000000000,
    ApprovalPercentage: 33.33333333333333
  }
]
```

## caver.rpc.governance.getTotalVotingPower <a id="caver-rpc-governance-gettotalvotingpower"></a>

```javascript
caver.rpc.governance.getTotalVotingPower([callback])
```

Provides the sum of all voting power that CNs have. Each CN has 1.0 ~ 2.0 voting power. In  the "none" and "single" governance modes, totalVotingPower doesn't provide any information.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `number`

| Type | Description |
| --- | --- |
| number | Total Voting Power. |

**Example**

```javascript
> caver.rpc.governance.getTotalVotingPower().then(console.log)
3
```

## caver.rpc.governance.getMyVotingPower <a id="caver-rpc-governance-getmyvotingpower"></a>

```javascript
caver.rpc.governance.getMyVotingPower([callback])
```

Provides the voting power of the node. The voting power can be anywhere between 1.0 ~ 2.0. In the "none" and "single" governance modes, totalVotingPower doesn't provide any information.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `number`

| Type | Description |
| --- | --- |
| number | Node's Voting Power. |

**Example**

```javascript
> caver.rpc.governance.getMyVotingPower().then(console.log)
1
```

## caver.rpc.governance.getMyVotes <a id="caver-rpc-governance-getmyvotes"></a>

```javascript
caver.rpc.governance.getMyVotes([callback])
```

Provides my vote information in the epoch. Each vote is stored in a block when the user's node generates a new block. After current epoch ends, this information is cleared.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type | Description |
| --- | --- |
| Array | Node's Voting status in the epoch. |

**Example**

```javascript
> caver.rpc.governance.getMyVotes().then(console.log)
[
  {
    Key: 'governance.unitprice',
    Value: 25000000000,
    Casted: true,
    BlockNum: 76899
  }
]
```

## caver.rpc.governance.getChainConfig <a id="caver-rpc-governance-getchainconfig"></a>

```javascript
caver.rpc.governance.getChainConfig([callback])
```

Provides the initial chain configuration. Because it just stores the initial configuration, if there were changes in the governance made by voting, the result of chainConfig will differ from the current states. To see the current information, please use itemsAt.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | The initial chain configuration |

**Example**

```javascript
> caver.rpc.governance.getChainConfig().then(console.log)
{
  chainId: 10000,
  istanbul: { epoch: 30, policy: 2, sub: 22 },
  unitPrice: 25000000000,
  deriveShaImpl: 2,
  governance: {
    governingNode: '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
    governanceMode: 'single',
    reward: {
      mintingAmount: 6400000000000000000,
      ratio: '50/40/10',
      useGiniCoeff: true,
      deferredTxFee: true,
      stakingUpdateInterval: 60,
      proposerUpdateInterval: 30,
      minimumStake: 5000000
    },
    kip71: {
      lowerboundbasefee: 25000000000,
      upperboundbasefee: 750000000000,
      gastarget: 30000000,
      maxblockgasusedforbasefee: 60000000,
      basefeedenominator: 20
    }
  }
}
```

## caver.rpc.governance.getNodeAddress <a id="caver-rpc-governance-getnodeaddress"></a>

```javascript
caver.rpc.governance.getNodeAddress([callback])
```

Provides the address of the node that a user is using. It is derived from the nodekey and used to sign consensus messages. And the value of "governingnode" has to be one of validator's node address.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The address of a node. |

**Example**

```javascript
> caver.rpc.governance.getNodeAddress().then(console.log)
0xbeafcca672100a88a953fcf5e882cb763f9e3de9
```

## caver.rpc.governance.getItemsAt <a id="caver-rpc-governance-getitemsat"></a>

```javascript
caver.rpc.governance.getItemsAt([blockNumberOrTag] [, callback])
```

Returns governance items at a specific block. It is the result of previous voting of the block and used as configuration for chain at the given block number.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumberOrTag | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | The governance items. |

**Example**

```javascript
> caver.rpc.governance.getItemsAt().then(console.log)
{
  'governance.governancemode': 'ballot',
  'governance.governingnode': '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
  'governance.unitprice': 25000000000,
  'istanbul.committeesize': 22,
  'istanbul.epoch': 30,
  'istanbul.policy': 2,
  'kip71.basefeedenominator': 20,
  'kip71.gastarget': 30000000,
  'kip71.lowerboundbasefee': 25000000000,
  'kip71.maxblockgasusedforbasefee': 60000000,
  'kip71.upperboundbasefee': 750000000000,
  'reward.deferredtxfee': true,
  'reward.minimumstake': '5000000',
  'reward.mintingamount': '6400000000000000000',
  'reward.proposerupdateinterval': 30,
  'reward.ratio': '50/40/10',
  'reward.stakingupdateinterval': 60,
  'reward.useginicoeff': true
}

> caver.rpc.governance.getItemsAt('latest').then(console.log)
```

## caver.rpc.governance.getPendingChanges <a id="caver-rpc-governance-getpendingchanges"></a>

```javascript
caver.rpc.governance.getPendingChanges([callback])
```

Returns the list of items that have received enough number of votes but not yet finalized. At the end of the current epoch, these changes will be finalized and the result will be in effect from the epoch after next epoch.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | Currently pending changes composed of keys and values. |

**Example**

```javascript
> caver.rpc.governance.getPendingChanges().then(console.log)
{ 'governance.governancemode': 'single' }
```

## caver.rpc.governance.getIdxCache <a id="caver-rpc-governance-getidxcache"></a>

```javascript
caver.rpc.governance.getIdxCache([callback])
```

Returns an array of current idxCache in the memory cache. idxCache contains the block numbers where governance change happened. The cache can have up to 1000 block numbers in memory by default.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| Array | Block numbers where governance change happened. |

**Example**

```javascript
> caver.rpc.governance.getIdxCache().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getIdxCacheFromDb <a id="caver-rpc-governance-getidxcachefromdb"></a>

```javascript
caver.rpc.governance.getIdxCacheFromDb([callback])
```

Returns an array that contains all block numbers at which any governance changes ever took place. The result of idxCacheFromDb is the same or longer than that of [idxCache](#caver-rpc-governance-getidxcache).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| Array | Block numbers where governance change happened. |

**Example**

```javascript
> caver.rpc.governance.getIdxCacheFromDb().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getItemCacheFromDb <a id="caver-rpc-governance-getitemcachefromdb"></a>

```javascript
caver.rpc.governance.getItemCacheFromDb([callback])
```

Returns the governance information stored on the given block. If no changes are stored on the given block, the function returns null.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumber | number \| string | A block number, or the hex number string to query the governance change made on the block. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | Stored governance information at a given block. |

**Example**

```javascript
> caver.rpc.governance.getItemCacheFromDb(540).then(console.log)
{
  'governance.governancemode': 'single',
  'governance.governingnode': '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
  'governance.unitprice': 25000000000,
  'istanbul.committeesize': 22,
  'istanbul.epoch': 30,
  'istanbul.policy': 2,
  'kip71.basefeedenominator': 30,
  'kip71.gastarget': 30000000,
  'kip71.lowerboundbasefee': 25000000000,
  'kip71.maxblockgasusedforbasefee': 60000000,
  'kip71.upperboundbasefee': 750000000000,
  'reward.deferredtxfee': true,
  'reward.minimumstake': '5000000',
  'reward.mintingamount': '6400000000000000000',
  'reward.proposerupdateinterval': 30,
  'reward.ratio': '50/40/10',
  'reward.stakingupdateinterval': 60,
  'reward.useginicoeff': true
}

> caver.rpc.governance.getItemCacheFromDb(1).then(console.log)
null
```

## caver.rpc.governance.getVotes <a id="caver-rpc-governance-getvotes"></a>

```javascript
caver.rpc.governance.getVotes([callback])
```

Returns the votes from all nodes in the epoch. These votes are gathered from the header of each block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| Array | Current votes composed of keys, values and node addresses. |

**Example**

```javascript
> caver.rpc.governance.getVotes().then(console.log)
[{
    key: 'reward.minimumstake',
    validator: '0xe733cb4d279da696f30d470f8c04decb54fcb0d2',
    value: '5000000'
}, {
    key: 'reward.useginicoeff',
    validator: '0xa5bccb4d279419abe2d470f8c04dec0789ac2d54',
    value: false
}]
```

## caver.rpc.governance.getStakingInfo <a id="caver-rpc-governance-getstakinginfo"></a>

```javascript
caver.rpc.governance.getStakingInfo([blockNumberOrTag] [, callback])
```

Returns the staking information at a specific block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumberOrTag | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | Staking information. Refer to [governance_getStakingInfo](../../../../json-rpc/governance.md#governance_getstakinginfo) for a description of the return result. |

**Example**

```javascript
> caver.rpc.governance.getStakingInfo().then(console.log)
{
  BlockNum: 321600,
  CouncilNodeAddrs: [],
  CouncilStakingAddrs: [],
  CouncilRewardAddrs: [],
  KIRAddr: '0x0000000000000000000000000000000000000000',
  PoCAddr: '0x0000000000000000000000000000000000000000',
  UseGini: false,
  Gini: -1,
  CouncilStakingAmounts: []
}
```
