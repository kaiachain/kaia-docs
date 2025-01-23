# caver.rpc.governance

caver.rpc.governance "使用 "governance "名稱空間提供 JSON-RPC 調用。

## caver.rpc.governance.vote <a id="caver-rpc-governance-vote"></a>

```javascript
caver.rpc.governance.vote(key, value [, callback])
```

提交新的投票。 如果節點有權根據治理模式進行投票，則可以提交投票。 否則，將出現錯誤並忽略投票。

**參數**

| 名稱       | 類型               | 描述                                                 |
| -------- | ---------------- | -------------------------------------------------- |
| key      | string           | 要更改的配置設置名稱。 鍵的形式為 "domain.field"。  |
| 值        | 字符串 \| 數字 \| 布爾值 | 每個鍵的各種類型的值。                                        |
| callback | function         | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

有關 `caver.rpc.governance.vote` 的 `key` 和 `value` 的更多詳情，請參閱 [governance_vote](../../../../json-rpc/governance.md#governance_vote) 。

**回報價值**

承諾 "返回 "字符串

| 類型  | 描述    |
| --- | ----- |
| 字符串 | 投票結果。 |

**示例**

```javascript
> caver.rpc.governance.vote('governance.governancemode', 'ballot').then(console.log)
您的投票已成功投出。
```

## caver.rpc.governance.showTally <a id="caver-rpc-governance-showtally"></a>

```javascript
caver.rpc.governance.showTally([callback])
```

提供當前治理投票的統計結果。 它以百分比顯示總批准率。 當比率超過 50%時，建議的修改將獲得通過。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型 | 描述                     |
| -- | ---------------------- |
| 數組 | 一個數組，包含表決值和以百分比表示的支持率。 |

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

提供 CN 擁有的所有投票權的總和。 每個 CN 有 1.0 ~ 2.0 個投票權。 在 "無 "和 "單一 "治理模式下，總投票權不提供任何信息。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述    |
| -- | ----- |
| 數量 | 總投票權。 |

**示例**

```javascript
> caver.rpc.governance.getTotalVotingPower().then(console.log)
3
```

## caver.rpc.governance.getMyVotingPower <a id="caver-rpc-governance-getmyvotingpower"></a>

```javascript
caver.rpc.governance.getMyVotingPower([callback])
```

提供節點的投票權。 投票權可以是 1.0 ~ 2.0。 在 "無 "和 "單一 "治理模式下，總投票權不提供任何信息。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述      |
| -- | ------- |
| 數量 | 節點的投票權。 |

**示例**

```javascript
> caver.rpc.governance.getMyVotingPower().then(console.log)1    

```

## caver.rpc.governance.getMyVotes <a id="caver-rpc-governance-getmyvotes"></a>

```javascript
caver.rpc.governance.getMyVotes([callback])
```

提供我在當期的投票信息。 當用戶節點生成一個新的區塊時，每一票都會存儲在一個區塊中。 當期結束後，該信息將被清除。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型 | 描述          |
| -- | ----------- |
| 數組 | 節點在當期的投票狀態。 |

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

提供初始鏈配置。 由於 chainConfig 只存儲初始配置，如果通過投票對治理進行了更改，其結果將與當前狀態不同。 要查看當前信息，請使用 itemsAt。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述    |
| -- | ----- |
| 對象 | 初始鏈配置 |

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

提供用戶正在使用的節點地址。 它來自節點密鑰，用於簽署共識信息。 而 "governingnode "的值必須是驗證器的節點地址之一。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述     |
| --- | ------ |
| 字符串 | 節點的地址。 |

**示例**

```javascript
> caver.rpc.governance.getNodeAddress().then(console.log)
0xbeafcca672100a88a953fcf5e882cb763f9e3de9
```

## caver.rpc.governance.getItemsAt <a id="caver-rpc-governance-getitemsat"></a>

```javascript
caver.rpc.governance.getItemsAt([blockNumberOrTag] [, callback])
```

返回特定區塊的治理項目。 它是該區塊之前的投票結果，用作給定區塊編號的鏈配置。

**參數**

| 名稱               | 類型                 | 描述                                                                                |
| ---------------- | ------------------ | --------------------------------------------------------------------------------- |
| blockNumberOrTag | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback         | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `number`

| 類型 | 描述    |
| -- | ----- |
| 對象 | 治理項目。 |

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

返回已獲得足夠票數但尚未最終確定的項目列表。 在當期結束時，這些更改將被最終確定，其結果將從下下期開始生效。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                |
| -- | ----------------- |
| 對象 | 由密碼和值組成的當前待處理的更改。 |

**示例**

```javascript
> caver.rpc.governance.getPendingChanges().then(console.log)
{ 'governance.governancemode': 'single' }
```

## caver.rpc.governance.getIdxCache <a id="caver-rpc-governance-getidxcache"></a>

```javascript
caver.rpc.governance.getIdxCache([callback])
```

返回內存緩存中當前 idxCache 的數組。 idxCache 包含發生治理變化的區塊編號。 默認情況下，高速緩存內存中最多可存儲 1000 個數據塊。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述          |
| -- | ----------- |
| 數組 | 發生治理變化的區塊號。 |

**示例**

```javascript
> caver.rpc.governance.getIdxCache().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getIdxCacheFromDb <a id="caver-rpc-governance-getidxcachefromdb"></a>

```javascript
caver.rpc.governance.getIdxCacheFromDb([callback])
```

返回一個數組，其中包含發生過治理更改的所有區塊編號。 idxCacheFromDb 的結果與 [idxCache](#caver-rpc-governance-getidxcache) 的結果相同或更長。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述           |
| -- | ------------ |
| 數組 | 發生治理變化的區塊編號。 |

**示例**

```javascript
> caver.rpc.governance.getIdxCacheFromDb().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getItemCacheFromDb <a id="caver-rpc-governance-getitemcachefromdb"></a>

```javascript
caver.rpc.governance.getItemCacheFromDb([callback])
```

返回存儲在給定塊上的治理信息。 如果給定塊上沒有存儲更改，函數將返回 null。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**參數**

| 名稱   | 類型                 | 描述                           |
| ---- | ------------------ | ---------------------------- |
| 區塊編號 | number \\| string | 區塊編號或十六進制數字字符串，用於查詢區塊上的治理更改。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述            |
| -- | ------------- |
| 對象 | 特定區塊中存儲的治理信息。 |

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

返回歷時內所有節點的投票數。 這些選票是從每個塊頭中收集的。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                 |
| -- | ------------------ |
| 數組 | 當前投票由密碼、價值和節點地址組成。 |

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

返回特定區塊的質押信息。

**參數**

| 名稱               | 類型                 | 描述                                                                                |
| ---------------- | ------------------ | --------------------------------------------------------------------------------- |
| blockNumberOrTag | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback         | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                                                                                                                                     |
| -- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 對象 | 質押信息。 有關返回結果的說明，請參閱 [governance_getStakingInfo](../../../.././json-rpc/governance.md#governance_getstakinginfo) 。 |

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
