# 使用数据锚定

如设计部分所述，服务链支持数据锚定功能。
本页介绍如何启用锚定功能。
如果启用，SCN 会定期将子链区块数据锚定到父链上，以证明其存在性和不变性。
这确保了服务链的安全性和可信度。

## 启用锚定<a id="enable-anchoring"></a>

### 检查 SCN 的父操作员<a id="check-parent-operator-of-scn"></a>

如果已成功安装并运行 SCN，则应生成父链操作员账户。
您可以提供要用作父操作符的密钥存储文件，如果没有提供，SCN 将为您生成密钥。
您可以通过 RPC API "subbridge_parentOperator "检查父操作符地址。

```
$ kscn attach --datadir ~/kscnd_home
欢迎来到 Kaia JavaScript 控制台！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 > subbridge.parentOperator
 "0x726e5C8705892989DAB1E9982FBE0B0A92eC84Bf"

```

_`该父操作员账户地址来自$dataDIR/parent_bridge_account` 目录中的密钥存储文件。_

### 将 KAIA 加入家长运营商帐户<a id="add-kaia-to-parent-operator-account"></a>

当 SCN 锚定区块数据时，SCN 将作为父操作员进行锚定交易。
因此，账户需要 KAIA 支付交易费。 您应该为父操作员账户添加足够的 KAIA。

### 启用锚定<a id="enable-anchoring"></a>

发送 KAIA 后，您可以像下面这样查看余额。

```javascript
> subbridge.parentOperatorBalance
1e+50
```

然后，您可以通过 RPC API `subbridge.anchoring` 启用锚定功能，如下所示。
有关详情，请参阅 [subbridge APIs](../../../references/json-rpc/subbridge/anchoring)。

```
> subbridge.anchoring(true)
true
```

## 检查锚定数据<a id="check-anchoring-data"></a>

如果启用了锚定功能，SCN 将定期把区块数据锚定到主链上。
您可以查看下面的锚定数据。

### 分桥<a id="sub-bridge"></a>

在子桥中，您可以查看最新的锚定区块编号，如下所示。
有关详情，请参阅 [subbridge APIs](../../../references/json-rpc/subbridge/latest-anchored-block-number)。

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

此外，您还可以通过服务链区块编号找到锚定交易哈希值，如下所示。

```javascript
> subbridge.getAnchoringTxHashByBlockNumber(1055)
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

### 主桥<a id="sub-bridge"></a>

在主桥中，如果启用了链索引选项，就可以通过服务链块哈希值找到锚定 tx 哈希值，如下所示。
详细信息请参阅 [mainbridge APIs](../../../references/json-rpc/mainbridge/convert-child-chain-block-hash-to-parent-chain-tx-hash) 。

```javascript
> mainbridge.convertChildChainBlockHashToParentChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

您可以通过锚点交易哈希值获取解码后的锚点数据，如下所示。

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
