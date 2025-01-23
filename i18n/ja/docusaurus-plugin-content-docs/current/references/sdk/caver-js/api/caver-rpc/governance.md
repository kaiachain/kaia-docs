# ケイバー

`caver.rpc.governance` は `governance` 名前空間を持つ JSON-RPC コールを提供する。

## caver.rpc.governance.vote <a id="caver-rpc-governance-vote"></a>

```javascript
caver.rpc.governance.vote(key, value [, callback])
```

新しい投票を提出する。 ノードがガバナンス・モードに基づいて投票権を持つ場合、投票を提出することができる。 そうでない場合はエラーとなり、投票は無視される。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                  |
| ------ | ----------- | ----------------------------------------------------------------------------------- |
| キー     | ストリング       | 変更するコンフィギュレーション設定の名前。 キーは "domain.field "という形式である。                  |
| 価値     | string \\ | 各キーには様々なタイプの値がある。                                                                   |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

`caver.rpc.governance.vote`の `key` と `value` の詳細については、[governance_vote](../../../../json-rpc/governance.md#governance_vote) を参照してください。

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明      |
| ----- | ------- |
| ストリング | 投票提出の結果 |

**例**

```javascript
> caver.rpc.governance.vote('governance.governancemode', 'ballot').then(console.log)
あなたの投票は成功しました。
```

## caver.rpc.governance.showTally <a id="caver-rpc-governance-showtally"></a>

```javascript
caver.rpc.governance.showTally([コールバック])
```

ガバナンスの現在の投票数を表示します。 総支持率をパーセンテージで示す。 50％以上の場合、変更案は可決される。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `Array` を返す。

| タイプ | 説明                                          |
| --- | ------------------------------------------- |
| 配列  | 投票値と賛成率 (パーセンテージ) を含む配列。 |

**例**

```javascript
> caver.rpc.governance.showTally().then(console.log)
[
  {
    Key: 'governance.unitprice',
    Value: 25000000000,
    ApprovalPercentage: 33.33333333333333
  }
]。
```

## caver.rpc.governance.getTotalVotingPower <a id="caver-rpc-governance-gettotalvotingpower"></a>

```javascript
caver.rpc.governance.getTotalVotingPower([コールバック])
```

CNが持つすべての議決権の合計を提供する。 各CNは1.0～2.0の投票権を持つ。 none」と「single」のガバナンス・モードでは、totalVotingPowerは何の情報も提供しない。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

プロミス`は `number\` を返す。

| タイプ | 説明   |
| --- | ---- |
| 番号  | 総議決権 |

**例**

```javascript
> caver.rpc.governance.getTotalVotingPower().then(console.log)
3
```

## caver.rpc.governance.getMyVotingPower <a id="caver-rpc-governance-getmyvotingpower"></a>

```javascript
caver.rpc.governance.getMyVotingPower([コールバック])
```

ノードの投票権を提供する。 投票権は1.0～2.0の間である。 none」と「single」のガバナンス・モードでは、totalVotingPowerは何の情報も提供しない。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

プロミス`は `number\` を返す。

| タイプ | 説明       |
| --- | -------- |
| 番号  | ノードの投票力。 |

**例**

```javascript
> caver.rpc.governance.getMyVotingPower().then(console.log)
1
```

## caver.rpc.governance.getMyVotes <a id="caver-rpc-governance-getmyvotes"></a>

```javascript
caver.rpc.governance.getMyVotes([コールバック])
```

エポックにおける私の投票情報を提供する。 ユーザーのノードが新しいブロックを生成すると、各投票はブロックに保存される。 現在のエポックが終了すると、この情報はクリアされる。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `Array` を返す。

| タイプ | 説明                |
| --- | ----------------- |
| 配列  | エポックにおけるノードの投票状況。 |

**例**

```javascript
> caver.rpc.governance.getMyVotes().then(console.log)
[
  {
    Key: 'governance.unitprice',
    Value: 25000000000,
    Casted: true,
    BlockNum：76899
  }.
]
```

## caver.rpc.governance.getChainConfig <a id="caver-rpc-governance-getchainconfig"></a>

```javascript
caver.rpc.governance.getChainConfig([コールバック])
```

チェーンの初期設定を行う。 初期設定を保存しているだけなので、投票によってガバナンスに変更があった場合、chainConfigの結果は現在の状態とは異なる。 現在の情報を見るには、itemsAtを使用してください。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明        |
| ------ | --------- |
| オブジェクト | チェーンの初期構成 |

**例**

```javascript
> caver.rpc.governance.getChainConfig().then(console.log)
{
  chainId：10000,
  istanbul: { epoch: 30, policy: 2, sub: 22 },
  unitPrice: 25000000000,
  deriveShaImpl: 2,
  governance：{
    governingNode：'0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
    governanceMode: 'single',
    reward: {
      mintingAmount：640000000000000,
      ratio: '50/40/10',
      useGiniCoeff: true,
      deferredTxFee: true,
      stakingUpdateInterval: 60,
      proposerUpdateInterval：30,
      minimumStake: 5000000
    },
    kip71: {
      lowerboundbasefee: 25000000000,
      upperboundbasefee: 750000000000,
      gastarget: 30000000,
      maxblockgasusedforbasefee: 60000000,
      basefeedenominator: 20
    }.
  }
}
```

## caver.rpc.governance.getNodeAddress <a id="caver-rpc-governance-getnodeaddress"></a>

```javascript
caver.rpc.governance.getNodeAddress([コールバック])
```

ユーザーが使用しているノードのアドレスを提供する。 これはノードキーから派生し、コンセンサスメッセージの署名に使用される。 また、"governingnode "の値はバリデータのノードアドレスのいずれかでなければならない。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明        |
| ----- | --------- |
| ストリング | ノードのアドレス。 |

**例**

```javascript
> caver.rpc.governance.getNodeAddress().then(console.log)
0xbeafcca672100a88a953fcf5e882cb763f9e3de9
```

## caver.rpc.governance.getItemsAt <a id="caver-rpc-governance-getitemsat"></a>

```javascript
caver.rpc.governance.getItemsAt([blockNumberOrTag] [, callback])
```

特定のブロックのガバナンス項目を返す。 これはブロックの過去の投票結果であり、指定されたブロック番号のチェーンのコンフィギュレーションとして使用される。

**パラメーター**

| 名称          | タイプ         | 説明                                                                                             |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------- |
| ブロック番号またはタグ | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック      | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明         |
| ------ | ---------- |
| オブジェクト | ガバナンスの項目だ。 |

**例**

```javascript
> caver.rpc.governance.getItemsAt().then(console.log)
{
  'governance.governancemode': 'ballot',
  'governance.governingnode': '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
  'governance.unitprice': 25000000000,
  'istanbul.committeesize': 22,
  'istanbul.epoch'：30,
  'istanbul.policy': 2,
  'kip71.basefeedenominator': 20,
  'kip71.gastarget': 30000000,
  'kip71.lowerboundbasefee': 25000000000,
  'kip71.maxblockgasusedforbasefee': 60000000,
  'kip71.upperboundbasefee': 750000000000,
  'reward.deferredtxfee': true,
  'reward.minimumstake': '5000000',
  'reward.mintingamount': '640000000000000',
  'reward.proposerupdateinterval': 30,
  'reward.ratio': '50/40/10',
  'reward.stakingupdateinterval': 60,
  'reward.useginicoeff': true
}.

> caver.rpc.governance.getItemsAt('latest').then(console.log)
```

## caver.rpc.governance.getPendingChanges <a id="caver-rpc-governance-getpendingchanges"></a>

```javascript
caver.rpc.governance.getPendingChanges([コールバック])
```

十分な票数を獲得しているが、まだ確定していない項目のリストを返します。 現在のエポックが終了した時点で、これらの変更は確定され、その結果は次のエポック以降のエポックから有効になる。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                  |
| ------ | ------------------- |
| オブジェクト | キーと値で構成される現在保留中の変更。 |

**例**

```javascript
> caver.rpc.governance.getPendingChanges().then(console.log)
{ 'governance.governancemode': 'single' }
```

## caver.rpc.governance.getIdxCache <a id="caver-rpc-governance-getidxcache"></a>

```javascript
caver.rpc.governance.getIdxCache([コールバック])
```

メモリキャッシュ内の現在の idxCache の配列を返します。 idxCacheには、ガバナンスの変更が行われたブロック番号が含まれる。 キャッシュはデフォルトで1000ブロック番号までメモリー上に持つことができる。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ | 説明                   |
| --- | -------------------- |
| 配列  | ガバナンスの変更が行われたブロック番号。 |

**例**

```javascript
> caver.rpc.governance.getIdxCache().then(console.log)
[ 0, 60, 321180 ]。
```

## caver.rpc.governance.getIdxCacheFromDb <a id="caver-rpc-governance-getidxcachefromdb"></a>

```javascript
caver.rpc.governance.getIdxCacheFromDb([コールバック])
```

ガバナンスの変更が行われたすべてのブロック番号を含む配列を返します。 idxCacheFromDb の結果は、[idxCache](#caver-rpc-governance-getidxcache) の結果と同じか長くなります。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ | 説明                   |
| --- | -------------------- |
| 配列  | ガバナンスの変更が行われたブロック番号。 |

**例**

```javascript
> caver.rpc.governance.getIdxCacheFromDb().then(console.log)
[ 0, 60, 321180 ]。
```

## caver.rpc.governance.getItemCacheFromDb <a id="caver-rpc-governance-getitemcachefromdb"></a>

```javascript
caver.rpc.governance.getItemCacheFromDb([コールバック])
```

与えられたブロックに格納されているガバナンス情報を返す。 与えられたブロックに変更が保存されていない場合、この関数はnullを返す。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**パラメーター**

| 名称     | タイプ         | 説明                                             |
| ------ | ----------- | ---------------------------------------------- |
| ブロック番号 | number \\ | ブロック番号、または16進数文字列で、そのブロックで行われたガバナンスの変更を問い合わせる。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                  |
| ------ | ------------------- |
| オブジェクト | 所定のブロックにガバナンス情報を格納。 |

**例**

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
  'reward.mintingamount': '640000000000000',
  'reward.proposerupdateinterval': 30,
  'reward.ratio': '50/40/10',
  'reward.stakingupdateinterval': 60,
  'reward.useginicoeff': true
}.

> caver.rpc.governance.getItemCacheFromDb(1).then(console.log)
null
```

## caver.rpc.governance.getVotes <a id="caver-rpc-governance-getvotes"></a>

```javascript
caver.rpc.governance.getVotes([コールバック])
```

エポック内の全ノードの得票数を返す。 これらの票は各ブロックのヘッダーから集められる。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ | 説明                       |
| --- | ------------------------ |
| 配列  | キー、値、ノードアドレスで構成される現在の投票。 |

**例**

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
}]。
```

## caver.rpc.governance.getStakingInfo <a id="caver-rpc-governance-getstakinginfo"></a>

```javascript
caver.rpc.governance.getStakingInfo([blockNumberOrTag] [, callback])
```

特定のブロックのステーキング情報を返す。

**パラメーター**

| 名称          | タイプ         | 説明                                                                                             |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------- |
| ブロック番号またはタグ | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック      | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | ステーキング情報 返される結果については、[governance_getStakingInfo](../../../../json-rpc/governance.md#governance_getstakinginfo) を参照のこと。 |

**例**

```javascript
> caver.rpc.governance.getStakingInfo().then(console.log)
{
  BlockNum：321600,
  CouncilNodeAddrs：[],
  CouncilStakingAddrs：[],
  CouncilRewardAddrs：[],
  KIRAddr: '0x000000000000000000000000',
  PoCAddr: '0x000000000000000000000000',
  UseGini: false,
  Gini: -1,
  CouncilStakingAmounts：[]
}.
```
