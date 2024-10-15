# Use Data Anchoring

As explained in the design section, Service Chain supports the data anchoring feature.
This page shows how to enable the anchoring function.
If it is enabled, SCN anchors periodically the child chain block data to the parent chain as proof of existence and immutability.
This ensures the security and credibility of the service chain.

## Enable Anchoring <a id="enable-anchoring"></a>

### Check Parent Operator of SCN <a id="check-parent-operator-of-scn"></a>

If you have installed and run an SCN successfully, the parent chain operator account should be generated.
You can provide a keystore file that you want to use as a parent operator, or if not provided, the SCN will generate the key for you.
You can check the parent operator address via RPC API, `subbridge_parentOperator`.

```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 > subbridge.parentOperator
 "0x726e5C8705892989DAB1E9982FBE0B0A92eC84Bf"

```

_This parent operator account address is derived from a keystore file in `$dataDIR/parent_bridge_account` directory._

### Add KLAY to Parent Operator account<a id="add-klay-to-parent-operator-account"></a>

When SCN anchors the block data, SCN makes an anchoring transaction as a parent operator.
Therefore the account needs KLAY to pay the transaction fee. You should add enough KLAY to the parent operator account.

### Enable Anchoring <a id="enable-anchoring"></a>

After sending KLAY, you can check the balance like below.

```javascript
> subbridge.parentOperatorBalance
1e+50
```

Then you can enable anchoring via RPC API, `subbridge.anchoring`, like below.
You can refer to [subbridge APIs](../../../references/json-rpc/subbridge/anchoring) for more details.

```
> subbridge.anchoring(true)
true
```

## Check Anchoring Data <a id="check-anchoring-data"></a>

If the anchoring feature is enabled, SCN will periodically anchor the block data to the main chain.
You can check the anchored data like below.

### Sub-Bridge <a id="sub-bridge"></a>

In Sub-Bridge, You can check the latest anchored block number like below.
You can refer to [subbridge APIs](../../../references/json-rpc/subbridge/latest-anchored-block-number) for more details.

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

Also, you can find the anchoring transaction hash by the service chain block number like below.

```javascript
> subbridge.getAnchoringTxHashByBlockNumber(1055)
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

### Main-Bridge <a id="sub-bridge"></a>

In Main-Bridge, if chain indexing option is enabled, you can find the anchoring tx hash by a service chain block hash like below.
You can refer to [mainbridge APIs](../../../references/json-rpc/mainbridge/convert-child-chain-block-hash-to-parent-chain-tx-hash) for more details.

```javascript
> mainbridge.convertChildChainBlockHashToParentChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

You can get the decoded anchoring data by anchoring transaction hash like below.

```javascript
> klay.getDecodedAnchoringTransactionByHash("0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51")
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
