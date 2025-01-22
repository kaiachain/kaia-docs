# データ・アンカーを使用する

デザインのセクションで説明したように、Service Chainはデータアンカー機能をサポートしている。
このページでは、アンカー機能を有効にする方法を紹介する。
これが有効な場合、SCNは定期的に子チェーンのブロックデータを親チェーンにアンカーし、その存在と不変性を証明する。
これにより、サービスチェーンの安全性と信頼性が確保される。

## アンカーリングを有効にする<a id="enable-anchoring"></a>

### SCNの親オペレーターをチェック<a id="check-parent-operator-of-scn"></a>

SCN が正常にインストールされ、実行されていれば、親チェーンのオペレータアカウントが生成されるはずです。
親オペレータとして使用したいキーストアファイルを指定することもできますし、指定しない場合はSCNがキーを生成します。
親オペレータのアドレスは、RPC API の `subbridge_parentOperator` で確認できます。

```
$ kscn attach --datadir ~/kscnd_home
Kaia JavaScript コンソールへようこそ！

インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 > subbridge.parentOperator
 "0x726e5C8705892989DAB1E9982FBE0B0A92eC84Bf"

```

\*この親オペレータアカウントのアドレスは、`$dataDIR/parent_bridge_account` ディレクトリにあるキーストアファイルから派生したものです。

### Add KLAY to Parent Operator account<a id="add-klay-to-parent-operator-account"></a>

SCNがブロックデータをアンカリングする際、SCNは親オペレータとしてアンカリング・トランザクションを行う。
Therefore the account needs KLAY to pay the transaction fee. You should add enough KLAY to the parent operator account.

### アンカーリングを有効にする<a id="enable-anchoring"></a>

After sending KLAY, you can check the balance like below.

```javascript
> subbridge.parentOperatorBalance
1e+50
```

次に、RPC API の `subbridge.anchoring` を使って、以下のようにアンカリングを有効にする。
詳しくは[サブブリッジAPI](../../../references/json-rpc/subbridge/anchoring)を参照されたい。

```
> subbridge.anchoring(true)
true
```

## アンカーデータのチェック<a id="check-anchoring-data"></a>

アンカー機能が有効な場合、SCNは定期的にブロックデータをメインチェーンにアンカーする。
アンカーデータは以下のように確認できる。

### サブブリッジ<a id="sub-bridge"></a>

サブブリッジでは、以下のように最新のアンカーブロック番号を確認することができる。
詳しくは[サブブリッジAPI](../../../references/json-rpc/subbridge/latest-anchored-block-number)を参照されたい。

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

また、アンカリング・トランザクションのハッシュは、以下のようにサービス・チェーンのブロック番号で見つけることができる。

```javascript
> subbridge.getAnchoringTxHashByBlockNumber(1055)
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

### メインブリッジ<a id="sub-bridge"></a>

メインブリッジでは、チェーンインデキシングオプションが有効になっていれば、以下のようにサービスチェーンブロックのハッシュからアンカーのTXハッシュを見つけることができます。
詳細は[mainbridge APIs](../../../references/json-rpc/mainbridge/convert-child-chain-block-hash-to-parent-chain-tx-hash)を参照されたい。

```javascript
> mainbridge.convertChildChainBlockHashToParentChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

デコードされたアンカリング・データは、以下のようにアンカリング・トランザクションのハッシュによって取得できる。

```javascript
> kaia.getDecodedAnchoringTransactionByHash("0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51")
{
  BlockCount: 1,
  BlockHash: "0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
  BlockNumber: 1055,
  ParentHash: "0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
  ReceiptHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  StateRootHash: "0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
  TxCount: 0,
  TxHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```
