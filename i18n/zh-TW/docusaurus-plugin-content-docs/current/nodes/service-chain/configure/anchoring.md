# 使用數據錨定

如設計部分所述，服務鏈支持數據錨定功能。
本頁介紹如何啟用錨定功能。
如果啟用，SCN 會定期將子鏈區塊數據錨定到父鏈上，以證明其存在性和不變性。
這確保了服務鏈的安全性和可信度。

## 啟用錨定<a id="enable-anchoring"></a>

### 檢查 SCN 的父操作員<a id="check-parent-operator-of-scn"></a>

如果已成功安裝並運行 SCN，則應生成父鏈操作員賬戶。
您可以提供要用作父操作符的密鑰存儲文件，如果沒有提供，SCN 將為您生成密鑰。
您可以通過 RPC API "subbridge_parentOperator "檢查父操作符地址。

```
$ kscn attach --datadir ~/kscnd_home
歡迎來到 Kaia JavaScript 控制檯！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 > subbridge.parentOperator
 "0x726e5C8705892989DAB1E9982FBE0B0A92eC84Bf"

```

_`該父操作員賬戶地址來自$dataDIR/parent_bridge_account` 目錄中的密鑰存儲文件。_

### 將 KAIA 加入家長運營商帳戶<a id="add-kaia-to-parent-operator-account"></a>

當 SCN 錨定區塊數據時，SCN 將作為父操作員進行錨定交易。
因此，賬戶需要 KAIA 支付交易費。 您應該為父操作員賬戶添加足夠的 KAIA。

### 啟用錨定<a id="enable-anchoring"></a>

發送 KAIA 後，您可以像下面這樣查看餘額。

```javascript
> subbridge.parentOperatorBalance
1e+50
```

然後，您可以通過 RPC API `subbridge.anchoring` 啟用錨定功能，如下所示。
有關詳情，請參閱 [subbridge APIs](../../../references/json-rpc/subbridge/anchoring)。

```
> subbridge.anchoring(true)
true
```

## 檢查錨定數據<a id="check-anchoring-data"></a>

如果啟用了錨定功能，SCN 將定期把區塊數據錨定到主鏈上。
您可以查看下面的錨定數據。

### 分橋<a id="sub-bridge"></a>

在子橋中，您可以查看最新的錨定區塊編號，如下所示。
有關詳情，請參閱 [subbridge APIs](../../../references/json-rpc/subbridge/latest-anchored-block-number)。

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

此外，您還可以通過服務鏈區塊編號找到錨定交易哈希值，如下所示。

```javascript
> subbridge.getAnchoringTxHashByBlockNumber(1055)
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

### 主橋<a id="sub-bridge"></a>

在主橋中，如果啟用了鏈索引選項，就可以通過服務鏈塊哈希值找到錨定 tx 哈希值，如下所示。
詳細信息請參閱 [mainbridge APIs](../../../references/json-rpc/mainbridge/convert-child-chain-block-hash-to-parent-chain-tx-hash) 。

```javascript
> mainbridge.convertChildChainBlockHashToParentChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

您可以通過錨點交易哈希值獲取解碼後的錨點數據，如下所示。

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
