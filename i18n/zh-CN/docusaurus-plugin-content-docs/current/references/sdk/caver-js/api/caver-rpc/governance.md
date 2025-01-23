# caver.rpc.governance

caver.rpc.governance "使用 "governance "名称空间提供 JSON-RPC 调用。

## caver.rpc.governance.vote <a id="caver-rpc-governance-vote"></a>

```javascript
caver.rpc.governance.vote(key, value [, callback])
```

提交新的投票。 如果节点有权根据治理模式进行投票，则可以提交投票。 否则，将出现错误并忽略投票。

**参数**

| 名称       | 类型               | 描述                                                 |
| -------- | ---------------- | -------------------------------------------------- |
| key      | string           | 要更改的配置设置名称。 键的形式为 "domain.field"。  |
| 值        | 字符串 \| 数字 \| 布尔值 | 每个键的各种类型的值。                                        |
| callback | function         | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

有关 `caver.rpc.governance.vote` 的 `key` 和 `value` 的更多详情，请参阅 [governance_vote](../../../../json-rpc/governance.md#governance_vote) 。

**回报价值**

承诺 "返回 "字符串

| 类型  | 描述    |
| --- | ----- |
| 字符串 | 投票结果。 |

**示例**

```javascript
> caver.rpc.governance.vote('governance.governancemode', 'ballot').then(console.log)
您的投票已成功投出。
```

## caver.rpc.governance.showTally <a id="caver-rpc-governance-showtally"></a>

```javascript
caver.rpc.governance.showTally([callback])
```

提供当前治理投票的统计结果。 它以百分比显示总批准率。 当比率超过 50%时，建议的修改将获得通过。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型 | 描述                     |
| -- | ---------------------- |
| 数组 | 一个数组，包含表决值和以百分比表示的支持率。 |

**示例**

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

提供 CN 拥有的所有投票权的总和。 每个 CN 有 1.0 ~ 2.0 个投票权。 在 "无 "和 "单一 "治理模式下，总投票权不提供任何信息。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述    |
| -- | ----- |
| 数量 | 总投票权。 |

**示例**

```javascript
> caver.rpc.governance.getTotalVotingPower().then(console.log)
3
```

## caver.rpc.governance.getMyVotingPower <a id="caver-rpc-governance-getmyvotingpower"></a>

```javascript
caver.rpc.governance.getMyVotingPower([callback])
```

提供节点的投票权。 投票权可以是 1.0 ~ 2.0。 在 "无 "和 "单一 "治理模式下，总投票权不提供任何信息。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述      |
| -- | ------- |
| 数量 | 节点的投票权。 |

**示例**

```javascript
> caver.rpc.governance.getMyVotingPower().then(console.log)1    

```

## caver.rpc.governance.getMyVotes <a id="caver-rpc-governance-getmyvotes"></a>

```javascript
caver.rpc.governance.getMyVotes([callback])
```

提供我在当期的投票信息。 当用户节点生成一个新的区块时，每一票都会存储在一个区块中。 当期结束后，该信息将被清除。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型 | 描述          |
| -- | ----------- |
| 数组 | 节点在当期的投票状态。 |

**示例**

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

提供初始链配置。 由于 chainConfig 只存储初始配置，如果通过投票对治理进行了更改，其结果将与当前状态不同。 要查看当前信息，请使用 itemsAt。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述    |
| -- | ----- |
| 对象 | 初始链配置 |

**示例**

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

提供用户正在使用的节点地址。 它来自节点密钥，用于签署共识信息。 而 "governingnode "的值必须是验证器的节点地址之一。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述     |
| --- | ------ |
| 字符串 | 节点的地址。 |

**示例**

```javascript
> caver.rpc.governance.getNodeAddress().then(console.log)
0xbeafcca672100a88a953fcf5e882cb763f9e3de9
```

## caver.rpc.governance.getItemsAt <a id="caver-rpc-governance-getitemsat"></a>

```javascript
caver.rpc.governance.getItemsAt([blockNumberOrTag] [, callback])
```

返回特定区块的治理项目。 它是该区块之前的投票结果，用作给定区块编号的链配置。

**参数**

| 名称               | 类型                 | 描述                                                                                |
| ---------------- | ------------------ | --------------------------------------------------------------------------------- |
| blockNumberOrTag | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback         | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `number`

| 类型 | 描述    |
| -- | ----- |
| 对象 | 治理项目。 |

**示例**

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

返回已获得足够票数但尚未最终确定的项目列表。 在当期结束时，这些更改将被最终确定，其结果将从下下期开始生效。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                |
| -- | ----------------- |
| 对象 | 由密码和值组成的当前待处理的更改。 |

**示例**

```javascript
> caver.rpc.governance.getPendingChanges().then(console.log)
{ 'governance.governancemode': 'single' }
```

## caver.rpc.governance.getIdxCache <a id="caver-rpc-governance-getidxcache"></a>

```javascript
caver.rpc.governance.getIdxCache([callback])
```

返回内存缓存中当前 idxCache 的数组。 idxCache 包含发生治理变化的区块编号。 默认情况下，高速缓存内存中最多可存储 1000 个数据块。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述          |
| -- | ----------- |
| 数组 | 发生治理变化的区块号。 |

**示例**

```javascript
> caver.rpc.governance.getIdxCache().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getIdxCacheFromDb <a id="caver-rpc-governance-getidxcachefromdb"></a>

```javascript
caver.rpc.governance.getIdxCacheFromDb([callback])
```

返回一个数组，其中包含发生过治理更改的所有区块编号。 idxCacheFromDb 的结果与 [idxCache](#caver-rpc-governance-getidxcache) 的结果相同或更长。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述           |
| -- | ------------ |
| 数组 | 发生治理变化的区块编号。 |

**示例**

```javascript
> caver.rpc.governance.getIdxCacheFromDb().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getItemCacheFromDb <a id="caver-rpc-governance-getitemcachefromdb"></a>

```javascript
caver.rpc.governance.getItemCacheFromDb([callback])
```

返回存储在给定块上的治理信息。 如果给定块上没有存储更改，函数将返回 null。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**参数**

| 名称   | 类型                 | 描述                           |
| ---- | ------------------ | ---------------------------- |
| 区块编号 | number \\| string | 区块编号或十六进制数字字符串，用于查询区块上的治理更改。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述            |
| -- | ------------- |
| 对象 | 特定区块中存储的治理信息。 |

**示例**

```javascript
> caver.rpc.governance.getItemCacheFromDb(540).then(console.log)
{
  'governance.governancemode': 'single',
  'governance.governingnode': '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
  'governance.unitprice': 25000000000,
  'istanbul.committeesize': 22,
  'istanbul.epoch'：30,
  'istanbul.policy': 2,
  'kip71.basefeedenominator'：30,
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

返回历时内所有节点的投票数。 这些选票是从每个块头中收集的。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                 |
| -- | ------------------ |
| 数组 | 当前投票由密码、价值和节点地址组成。 |

**示例**

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

返回特定区块的质押信息。

**参数**

| 名称               | 类型                 | 描述                                                                                |
| ---------------- | ------------------ | --------------------------------------------------------------------------------- |
| blockNumberOrTag | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback         | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                                                                                                                                     |
| -- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 对象 | 质押信息。 有关返回结果的说明，请参阅 [governance_getStakingInfo](../../../.././json-rpc/governance.md#governance_getstakinginfo) 。 |

**示例**

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
