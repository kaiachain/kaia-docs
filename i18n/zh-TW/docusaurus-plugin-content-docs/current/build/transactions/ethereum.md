# 以太坊兼容性

Kaia 提供封裝的交易類型，以支持以太坊兼容性。 除了名為 "EthereumTxTypeEnvelope "的單字節類型分隔符外，Kaia 中的以太坊交易類型具有與以太坊設計相同的屬性和 RLP 編碼方案。 因此，用戶可以在 Kaia 上成功部署以太坊開發工具生成的交易。 當用戶使用 `eth` 命名空間 API 時，類型分隔符也會被省略，因此他們可以像使用以太坊一樣使用 Kaia。 使用 `kaia` 命名空間 API，用戶可以將以太坊格式化的交易作為 Kaia 交易類型進行部署和檢索，而不會與現有的 Kaia 交易類型混淆。

## EthereumTxTypeEnvelope <a id="ethereumtxtypeenvelope"></a>

EthereumTxTypeEnvelope 是原始交易的單字節前綴，表示以太坊交易類型。 以太坊採用了[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)中的可擴展交易類型方案，它使用的類型編號系統與 Kaia 的衝突。 為了解決兩種不同交易類型方案之間的衝突，Kaia 引入了 "EthereumTxTypeEnvelope"，允許未來以太坊交易類型的分離和擴展。

EthereumTxTypeEnvelope "是一個額外的類型分隔符，僅用於原始交易和類型編號。 它不用於交易哈希或簽名哈希。 為此，使用了 EIPs 中定義的 "EthereumTransactionType"。

- EthereumTxTypeEnvelope: `0x78`
- TxHashRLP : EthereumTransactionType || TransactionPayload
- RawTransaction : EthereumTxTypeEnvelope || EthereumTransactionType || TransactionPayload

## TxTypeEthereumAccessList <a id="txtypeethereumaccesslist"></a>

TxTypeEthereumAccessList "代表 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) 中指定的以太坊交易類型。 該事務類型包含一個訪問列表，即該事務要訪問的地址和存儲密鑰列表。 由於該交易類型的存在是為了支持兼容性，因此只適用於與[AccountKeyLegacy]相關的 EOA。 與其他賬戶密鑰類型相關的 EOA 應使用其他交易類型，如 "TxTypeValueTransfer"、"TxTypeSmartContractExecution "等。 這種交易類型可以創建賬戶、轉移代幣、部署/執行智能合約或混合使用上述交易類型。

:::note

Kaia 網絡可在 "EthTxTypeCompatibleBlock "之後處理該交易類型。

:::

:::note

注意：此交易類型只支持以太坊交易類型的格式。 與 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)不同，使用訪問列表不會帶來交易費用方面的好處。

:::

### 屬性<a id="attributes"></a>

| 屬性         | 類型                                                         | 說明                                                                                                                                                                                                                    |
| :--------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | uint8\(Go\)                           | 由 `EthereumTxTypeEthereumAccessList` 和 `EthereumTransactionType` 連接而成的 `TxTypeEthereumAccessList` 類型。 必須為 0x7801。                                                                                                     |
| chainId    | \*big.Int （ Go\)                          | 目標鏈 ID。                                                                                                                                                                                                               |
| nonce      | uint64 \(Go\)                         | 用於唯一標識發件人交易的值。 如果一個發送方生成了兩個具有相同 nonce 的交易，則只執行其中一個。                                                                                                                                                                   |
| gasPrice   | \*big.Int （ Go\)                          | 一個乘數，用於計算發件人將支付多少代幣。 發送方將支付的代幣數量通過 `gas` \* `gasPrice` 計算得出。 例如，如果 gas 為 10，gasPrice 為 10^18，發件人將支付 10 KAIA 的交易費。 See [Unit of KAIA](../../learn/token-economics/kaia-native-token.md#units-of-kaia). |
| gas        | uint64 \(Go\)                         | 交易允許使用的最高交易費金額。                                                                                                                                                                                                       |
| to         | \*common.Address（Go\）                      | 接收轉賬金額的賬戶地址。                                                                                                                                                                                                          |
| value      | \*big.Int （ Go\)                          | 以 `kei` 為單位的 KAIA 轉賬金額。                                                                                                                                                                                               |
| data       | \byte （去）                                                  | 附屬於事務的數據，用於執行事務。                                                                                                                                                                                                      |
| accessList | type.AccessList\(Go\) | 由 \[\](common.Address,\[]common.Hash)組成的地址和存儲密鑰列表。                                                                                                                                                                  |
| v, r, s    | \*big.Int （ Go\)                          | 發送方為讓接收方獲取發送方地址而生成的加密簽名。                                                                                                                                                                                              |

### 簽名的 RLP 編碼<a id="rlp-encoding-for-signature"></a>

為這種交易類型製作簽名的 RLP 序列化過程如下：

:::note

此類交易應由倫敦簽名人簽名

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash 的 RLP 編碼<a id="rlp-encoding-for-sendertxhash"></a>

要獲取該事務類型的 `SenderTxHash` 值，RLP 序列化過程如下：

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### 交易哈希的 RLP 編碼<a id="rlp-encoding-for-transaction-hash"></a>

製作交易哈希值的 RLP 序列化過程如下：

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 原始交易<a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
```

### RLP 編碼 （示例）<a id="rlp-encoding-example"></a>

下面顯示的是 RLP 序列化和事務對象的結果：

```javascript
    TX(3a3ab67168de40b1f8a2141a70a4e2f551f90d7814b2fbcb3ac99ad8d8d0b641)
    Contract: false
    Chaind:   0x2
    From:     a94f5374fce5edbc8e2a8697c15331677e6ebf0b
    To:       7b65b75d204abed71587c9e519a89277766ee1d0
    Nonce:    1234
    GasPrice: 0x19
    GasLimit  0xf4240
    Value:    0xa
    Data:     0x31323334
    AccessList: [{0000000000000000000000000000000000000001 [0000000000000000000000000000000000000000000000000000000000000000]}]
    V:        0x1
    R:        0xbfc80a874c43b71b67c68fa5927d1443407f31aef4ec6369bbecdb76fc39b0c0
    S:        0x193e62c1dd63905aee7073958675dcb45d78c716a9a286b54a496e82cb762f26
    Hex:      7801f8a1028204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a8431323334f838f7940000000000000000000000000000000000000001e1a0000000000000000000000000000000000000000000000000000000000000000001a0bfc80a874c43b71b67c68fa5927d1443407f31aef4ec6369bbecdb76fc39b0c0a0193e62c1dd63905aee7073958675dcb45d78c716a9a286b54a496e82cb762f26
        

```

### RPC 輸出 （示例）<a id="rpc-output-example"></a>

下面顯示的是通過 JSON RPC 返回的事務對象。

eth_getTransactionByHash "的返回值

```javascript
{
  "blockHash": "0x7bd7e8a92ecaa5781a15a8b6fff589f8ac8a79325b517a1ba5d5f2f3d7af1b00",
  "blockNumber": "0x1c8f4b",
  "from": "0x5618e15ec2916bbe6cf2cce20ce31e61d6062cac",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "hash": "0x3f67e48c2090f560234f555cd4edf7853b6327aa9a6a795be1efe3f360dac118",
  "input": "0x1122",
  "nonce": "0x11",
  "to": "0x5dce87b5bfcde54023811b168dc97a9f10913957",
  "transactionIndex": "0x0",
  "value": "0x186a0",
  "type": "0x1",
  "accessList": [
      {
          "address": "0x0000000000000000000000000000000000000001",
          "storageKeys": [
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ]
      }
  ],
  "chainId": "0x2710",
  "v": "0x1",
  "r": "0xebb2d2144293c257e27aaa1d22156f322b0d2d7385257f186c117899d791f174",
  "s": "0x5cea970287c9f0f9754050a552c458c066d8f3b3e4639f561b22ce4cb7553ac0"
}
```

kaia_getTransactionByHash\` 的返回值

```javascript
{
  "accessList": [
      {
          "address": "0x0000000000000000000000000000000000000001",
          "storageKeys": [
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ]
      }
  ],
  "blockHash": "0x7bd7e8a92ecaa5781a15a8b6fff589f8ac8a79325b517a1ba5d5f2f3d7af1b00",
  "blockNumber": "0x1c8f4b",
  "chainID": "0x2710",
  "from": "0x5618e15ec2916bbe6cf2cce20ce31e61d6062cac",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "hash": "0x3f67e48c2090f560234f555cd4edf7853b6327aa9a6a795be1efe3f360dac118",
  "input": "0x1122",
  "nonce": "0x11",
  "senderTxHash": "0x3f67e48c2090f560234f555cd4edf7853b6327aa9a6a795be1efe3f360dac118",
  "signatures": [
      {
          "V": "0x1",
          "R": "0xebb2d2144293c257e27aaa1d22156f322b0d2d7385257f186c117899d791f174",
          "S": "0x5cea970287c9f0f9754050a552c458c066d8f3b3e4639f561b22ce4cb7553ac0"
      }
  ],
  "to": "0x5dce87b5bfcde54023811b168dc97a9f10913957",
  "transactionIndex": "0x0",
  "type": "TxTypeEthereumAccessList",
  "typeInt": 30721,
  "value": "0x186a0"
}
```

## TxTypeEthereumDynamicFee <a id="txtypeethereumdynamicfee"></a>

TxTypeEthereumDynamicFee "代表 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 中指定的一種以太坊交易類型。 該交易類型包含 "gasTipCap "和 "gasFeeCap"，而不是 "gasPrice"。 由於該交易類型的存在是為了支持兼容性，因此只適用於與[AccountKeyLegacy]相關的 EOA。 與其他賬戶密鑰類型相關的 EOA 應使用其他交易類型，如 "TxTypeValueTransfer"、"TxTypeSmartContractExecution "等。 這種類型的交易可以創建賬戶、轉移代幣、部署/執行智能合約，也可以是上述交易的混合體。

:::note

注意：Kaia 網絡可在 "EthTxTypeCompatibleBlock "後處理此交易類型。

:::

:::note

目前，這種類型的交易只支持以太坊交易類型的格式。 與 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)不同，使用訪問列表不會帶來交易費用方面的好處。

:::

:::note

注意： 由於 Kaia 有固定的Gas 價格，"gasTipCap "和 "gasFeeCap "應採用相應網絡的Gas 價格，在撰寫本文時為 250 Gkei。

:::

### 屬性<a id="attributes"></a>

| 屬性         | 類型                                                         | 說明                                                                                                                                            |
| :--------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | uint8\(Go\)                           | TxTypeEthereumDynamicFee "的類型，由 "EthereumTxTypeEnvelope "和 "EthereumTransactionType "連接而成。 必須是 `0x7802`。                                      |
| chainId    | \*big.Int （ Go\)                          | 目標鏈 ID。                                                                                                                                       |
| nonce      | uint64 \(Go\)                         | 用於唯一標識發件人交易的值。 如果一個發送方生成了兩個具有相同 nonce 的交易，則只執行其中一個。                                                                                           |
| gasTipCap  | \*big.Int （ Go\)                          | 一個乘數，用於計算發件人除了支付 `baseFee` 以外還要支付多少費用。 由於 Kaia 有固定的Gas 價格，因此 `gasTipCap` 和 `gasFeeCap` 應採用相應網絡的Gas 價格，在編寫本報告時為 250 Gkei。                      |
| gasFeeCap  | \*big.Int （ Go\)                          | 一個乘數，用於計算發件人將支付多少代幣。 發送方將支付的代幣數量通過 `gas` \* `gasFeeCap` 計算。 由於 Kaia 有固定的Gas 價格，因此 `gasTipCap` 和 `gasFeeCap` 應採用相應網絡的Gas 價格，在編寫本報告時為 250 Gkei。 |
| gas        | uint64 \(Go\)                         | 交易允許使用的最高交易費金額。                                                                                                                               |
| to         | \*common.Address（Go\）                      | 接收轉賬金額的賬戶地址。                                                                                                                                  |
| value      | \*big.Int （ Go\)                          | 以 `kei` 為單位的 KAIA 轉賬金額。                                                                                                                       |
| data       | \byte （去）                                                  | 附屬於事務的數據，用於執行事務。                                                                                                                              |
| accessList | type.AccessList\(Go\) | 由 \[\](common.Address,\[]common.Hash)組成的地址和存儲密鑰列表。                                                                                          |
| v, r, s    | \*big.Int （ Go\)                          | 發送方為讓接收方獲取發送方地址而生成的加密簽名。                                                                                                                      |

### 簽名的 RLP 編碼<a id="rlp-encoding-for-signature"></a>

為這種交易類型製作簽名的 RLP 序列化過程如下：

:::note

此類交易應由倫敦簽名人簽名

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash 的 RLP 編碼<a id="rlp-encoding-for-sendertxhash"></a>

要獲取該事務類型的 `SenderTxHash` 值，RLP 序列化過程如下：

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### 交易哈希的 RLP 編碼<a id="rlp-encoding-for-transaction-hash"></a>

要獲得事務哈希值，RLP 序列化過程如下：

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 原始交易<a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
```

### RLP 編碼 （示例）<a id="rlp-encoding-example"></a>

下面顯示的是 RLP 序列化和事務對象的結果：

```javascript
    TX(be74e122acf00c2f257e8698ecf01140b58b2880de3f24d0875730425eccb45a)
    Contract: false
    Chaind:   0x2
    From:     a94f5374fce5edbc8e2a8697c15331677e6ebf0b
    To:       7b65b75d204abed71587c9e519a89277766ee1d0
    Nonce:    1234
    GasTipCap: 0x19
    GasFeeCap: 0x19
    GasLimit  0xf4240
    Value:    0xa
    Data:     0x31323334
    AccessList: [{0000000000000000000000000000000000000001 [0000000000000000000000000000000000000000000000000000000000000000]}]
    V:        0x0
    R:        0xca14aa0bada2da7ca1b143c16e2dd4a69f2a1e77ce54c7f6d440fe828a777f4f
    S:        0x117f0f78aed398b2995b5ee7c67ace25d52be3c72c1384c2aaa9683b351556
    Hex:      7802f8a1028204d21919830f4240947b65b75d204abed71587c9e519a89277766ee1d00a8431323334f838f7940000000000000000000000000000000000000001e1a0000000000000000000000000000000000000000000000000000000000000000080a0ca14aa0bada2da7ca1b143c16e2dd4a69f2a1e77ce54c7f6d440fe828a777f4f9f117f0f78aed398b2995b5ee7c67ace25d52be3c72c1384c2aaa9683b351556
```

### RPC 輸出 （示例）<a id="rpc-output-example"></a>

下面顯示的是通過 JSON RPC 返回的事務對象。

eth_getTransactionByHash "的返回值

```javascript
{
  "blockHash": "0x55792fe186e3d1515fe35a68c2c8d7977b2d7db184d80526f906c53222b77833",
  "blockNumber": "0x1c944d",
  "from": "0x5618e15ec2916bbe6cf2cce20ce31e61d6062cac",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "maxFeePerGas": "0x5d21dba00",
  "maxPriorityFeePerGas": "0x5d21dba00",
  "hash": "0x5db239963029ad9ef6c3331b10ae455638316e330b0efdae2cc1f8e86884e66e",
  "input": "0x1122",
  "nonce": "0x13",
  "to": "0xa0f1633f4c666d7fe5ba912bd5caf03d3655ac31",
  "transactionIndex": "0x0",
  "value": "0x186a0",
  "type": "0x2",
  "accessList": [
      {
          "address": "0x0000000000000000000000000000000000000001",
          "storageKeys": [
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ]
      }
  ],
  "chainId": "0x2710",
  "v": "0x1",
  "r": "0x27e007cbe79fd8cc9b89dd798bdd5aa62d038273bf006c7c3b40e13a938ab807",
  "s": "0x6209bb328855f02fa2671fecb41efd9f191b03ecab5e580227fa2a0674879384"
}
```

kaia_getTransactionByHash\` 的返回值

```javascript
{
  "accessList": [
      {
          "address": "0x0000000000000000000000000000000000000001",
          "storageKeys": [
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ]
      }
  ],
  "blockHash": "0x55792fe186e3d1515fe35a68c2c8d7977b2d7db184d80526f906c53222b77833",
  "blockNumber": "0x1c944d",
  "chainId": "0x2710",
  "from": "0x5618e15ec2916bbe6cf2cce20ce31e61d6062cac",
  "gas": "0x174876e800",
  "hash": "0x5db239963029ad9ef6c3331b10ae455638316e330b0efdae2cc1f8e86884e66e",
  "input": "0x1122",
  "maxFeePerGas": "0x5d21dba00",
  "maxPriorityFeePerGas": "0x5d21dba00",
  "nonce": "0x13",
  "senderTxHash": "0x5db239963029ad9ef6c3331b10ae455638316e330b0efdae2cc1f8e86884e66e",
  "signatures": [
      {
          "V": "0x1",
          "R": "0x27e007cbe79fd8cc9b89dd798bdd5aa62d038273bf006c7c3b40e13a938ab807",
          "S": "0x6209bb328855f02fa2671fecb41efd9f191b03ecab5e580227fa2a0674879384"
      }
  ],
  "to": "0xa0f1633f4c666d7fe5ba912bd5caf03d3655ac31",
  "transactionIndex": "0x0",
  "type": "TxTypeEthereumDynamicFee",
  "typeInt": 30722,
  "value": "0x186a0"
}
```

## TxTypeEthereumBlob<a id="txtypeethereumblob"></a>

TxTypeEthereumBlob」代表 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) 和 [KIP-279](https://kips.kaia.io/KIPs/kip-279) 中指定的 Ethereum 交易類型。 此交易類型可攜帶二進位大型物件 (blob) 資料，為 Kaia 上的第 2 層捲動提供具成本效益的資料可用性層。 透過將 blob 資料與永久 calldata 儲存分離，rollup 可以透過獨立的 blob 費用市場，以較低的成本發佈資料。 EVM 無法存取 blob 資料本身；只有「blobVersionedHashes」承諾可在鏈上存取。 由於此交易類型的存在是為了支援相容性，因此它只適用於與 [AccountKeyLegacy] 相關聯的 EOA。 此交易類型不能用來建立契約 - `to` 欄位不能為零。

:::note

Kaia 網路可以在 `OsakaCompatibleBlock` 之後處理此交易類型。

:::

:::note

Kaia 的 Blob Gas 參數是針對 1 秒的區塊調整的。 每個區塊只允許 \*\* 一個 blob。 只接受 [EIP-7594](https://eips.ethereum.org/EIPS/eip-7594) 副檔格式 (V1) - 拒絕 V0 副檔。 Blob sidecars 會保留 1,814,400 個區塊（約 21 天）。

:::

:::note

`eth_sendRawTransaction` 需要完整的 blob 交易與 sidecar (`BlobTxWithBlobs`)。 `blobVersionedHashes` 必須使用版本前綴 `0x01`。

:::

### 屬性<a id="attributes"></a>

| 屬性                                                 | 類型                                                         | 說明                                                                                                     |
| :------------------------------------------------- | :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| 類型                                                 | uint8\(Go\)                           | 由 `EthereumTxTypeEthereumBlob` 和 `EthereumTransactionType` 組成的 `TxTypeEthereumBlob` 類型。 這必須是 `0x7803`。 |
| chainId                                            | \*big.Int\(Go\)       | 目的地鏈 ID。                                                                                               |
| 扣球                                                 | uint64 \(Go\)                         | 用來唯一識別寄件者交易的值。 如果寄件者產生兩個具有相同 nonce 的交易，則只會執行其中一個。                                                      |
| maxPriorityFeePerGas (每瓦斯最高優先費) | \*big.Int\(Go\)       | 一個乘數，用來取得寄件者在 `baseFee` 以外要支付的金額。 由於 Kaia 有固定的瓦斯價格，因此這應該是各個網路的瓦斯價格。                                    |
| maxFeePerGas                                       | \*big.Int\(Go\)       | 寄件人願意為每單位瓦斯支付的最高金額。 由於 Kaia 有固定的瓦斯價格，因此這應該是各個網路的瓦斯價格。                                                  |
| 氣體                                                 | uint64 \(Go\)                         | 交易允許使用的最高交易費用。                                                                                         |
| 至                                                  | \*common.Address （Go\）                     | 接收轉移值的帳戶地址。 不得為 nil - blob 交易無法建立契約。                                                                   |
| 價值                                                 | \*big.Int\(Go\)       | 要轉移的 KAIA `kei` 金額。                                                                                    |
| 資料                                                 | \byte \(Go\)                          | 附加到交易的資料，用於交易執行。                                                                                       |
| 存取清單                                               | type.AccessList\(Go\) | 由 \[\](common.Address,\[]common.Hash)組成的位址和儲存金鑰清單。                                                   |
| maxFeePerBlobGas (每桶瓦斯最高收費)     | \*big.Int\(Go\)       | 寄件者願意支付的每單位 Blob Gas 的最高費用。 Blob 瓦斯的價格獨立於一般瓦斯。                                                         |
| blobVersionedHashes                                | \common.Hash (Go\)     | 與此交易相關的 Blob 的版本化雜湊清單。 每個散列必須使用版本前綴 `0x01`。 至少需要一個哈希值。                                                 |
| v, r, s                                            | \*big.Int\(Go\)       | 寄件者為了讓接收者取得寄件者的地址而產生的加密簽章。                                                                             |

### 簽名的 RLP 編碼<a id="rlp-encoding-for-signature"></a>

要為此交易類型製作簽章，RLP 序列化的步驟如下：

:::note

此類交易應使用大阪簽章器簽章

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash,<private key>)
```

### SenderTxHash 的 RLP 編碼<a id="rlp-encoding-for-sendertxhash"></a>

要取得此交易類型的「SenderTxHash」，RLP 序列化的步驟如下：

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 交易切細值的 RLP 編碼<a id="rlp-encoding-for-transaction-hash"></a>

要取得交易切細值，RLP 序列化的步驟如下：

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 原始交易<a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes, v, r, s])
```

當透過 `eth_sendRawTransaction` 遞交時，必須提供完整的網路表示，包括 sidecar：

```javascript
BlobTxWithBlobs = rlp([TransactionPayloadBody, sidecar_version, blobs, commitments, proofs])
```

其中 `sidecar_version` 根據 EIP-7594 為 `0x01`。

### RLP 編碼 \(Example\)<a id="rlp-encoding-example"></a>

以下顯示 RLP 序列化的結果和交易物件：

```javascript
    TX(b4687ea17a0908a4dce2d83f8c2566881474b9da30ee8b8979b028778761c9d7)
    Contract: false
    Chaind：   0x3e9
    From：     0a3fa1b8fbdaeabcd2a7cb13abb87e8d1bd0a3b5
    To: a9ef4a5bfb21e92c06da23ed79294dab11f5a6df
    Nonce: 366
    GasTipCap: 0x0
    GasFeeCap: 0xba43b7400
    GasLimit 0xc350
    Value: 0x0
    Data：     0xd09de08a
    AccessList：[]
    MaxFeePerBlobGas: 0x5d21dba000
    BlobVersionedHashes：[016f2dec5826dba2b8071deb0fba09244486cc4f9b981fe26396bc3206d2a8d7]
    V： 0x1
    R：        0x4b6905c3f0637363857626004b2367caa5e1d4c60fa3091a058ddbfef34e30ff
    S: 0x659b7ede7f3439a3f07958abe448c25ddfc0ba0b530bff60356552484a854916
    Hex：      7803f8978203e982016e80850ba43b740082c35094a9ef4a5bfb21e92c06da23ed79294dab11f5a6df8084d09de08ac0855d21dba000e1a0016f2dec5826dba2b8071deb0fba09244486cc4f9b981fe26396bc3206d2a8d701a04b6905c3f0637363857626004b2367caa5e1d4c60fa3091a058ddbfef34e30ffa0659b7ede7f3439a3f07958abe448c25ddfc0ba0b530bff60356552484a854916
```

### RPC 輸出 (Example\)<a id="rpc-output-example"></a>

以下顯示透過 JSON RPC 傳回的交易物件。

eth_getTransactionByHash\` 的回傳值

```javascript
{
  "blockHash"："0x1683db8c05f898cd9084a8905b3fa2a64b1380b6543e963ea15d2858b241c339",
  "blockNumber"："0xc77238e",
  "from"："0x0a3fa1b8fbdaeabcd2a7cb13abb87e8d1bd0a3b5",
  "gas"："0xc350",
  "gasPrice"："0x5d21dba00",
  "maxFeePerGas"："0xba43b7400",
  "maxPriorityFeePerGas"："0x0",
  "maxFeePerBlobGas"："0x5d21dba000",
  "hash"："0xb4687ea17a0908a4dce2d83f8c2566881474b9da30ee8b8979b028778761c9d7",
  "input"："0xd09de08a",
  "nonce"："0x16e",
  "to"："0xa9ef4a5bfb21e92c06da23ed79294dab11f5a6df",
  "transactionIndex"："0x0",
  "value"："0x0",
  "type"："0x3",
  "accessList"：[],
  "chainId"："0x3e9",
  "blobVersionedHashes"：[
      "0x016f2dec5826dba2b8071deb0fba09244486cc4f9b981fe26396bc3206d2a8d7"
  ],
  "v"："0x1",
  "r"："0x4b6905c3f0637363857626004b2367caa5e1d4c60fa3091a058ddbfef34e30ff",
  "s"："0x659b7ede7f3439a3f07958abe448c25ddfc0ba0b530bff60356552484a854916"
}
```

`kaia_getTransactionByHash` 的回傳值

```javascript
{
  "accessList"：[],
  "blobVersionedHashes"：[
      "0x016f2dec5826dba2b8071deb0fba09244486cc4f9b981fe26396bc3206d2a8d7"
  ],
  "blockHash"："0x1683db8c05f898cd9084a8905b3fa2a64b1380b6543e963ea15d2858b241c339",
  "blockNumber"："0xc77238e",
  "chainId"："0x3e9",
  "from"："0x0a3fa1b8fbdaeabcd2a7cb13abb87e8d1bd0a3b5",
  "gas"："0xc350",
  "gasPrice"："0x5d21dba00",
  "hash"："0xb4687ea17a0908a4dce2d83f8c2566881474b9da30ee8b8979b028778761c9d7",
  "input"："0xd09de08a",
  "maxFeePerBlobGas"："0x5d21dba000",
  "maxFeePerGas"："0xba43b7400",
  "maxPriorityFeePerGas"："0x0",
  "nonce"："0x16e",
  "senderTxHash"："0xb4687ea17a0908a4dce2d83f8c2566881474b9da30ee8b8979b028778761c9d7",
  "signatures"：[
      {
          "V"："0x1",
          "R"："0x4b6905c3f0637363857626004b2367caa5e1d4c60fa3091a058ddbfef34e30ff",
          "S"："0x659b7ede7f3439a3f07958abe448c25ddfc0ba0b530bff60356552484a854916"
      }
  ],
  "to"："0xa9ef4a5bfb21e92c06da23ed79294dab11f5a6df",
  "transactionIndex"："0x0",
  "type"："TxTypeEthereumBlob",
  "typeInt"：30723,
  "value"："0x0"
}
```

## TxTypeEthereumSetCode<a id="txtypeethereumsetcode"></a>

TxTypeEthereumSetCode」代表 [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 和 [KIP-228](https://kips.kaia.io/KIPs/kip-228) 中指定的 Ethereum 交易類型。 此交易類型允許對已存在的 EOA 進行帳戶抽象，從而改善了用戶體驗。 在此之前，尋求智慧型帳戶功能的 EOA 擁有人必須建立新的智慧型帳戶，並遷移所有資產和權限。 透過 SetCode 交易，使用者可以就地將代碼附加到現有的 EOA，省去了成本高昂的移轉過程。 `authorizationList` 指定了由應設定其代碼的帳戶簽署的 `(chainId、address、nonce)` 元組清單，使批次交易、瓦斯贊助和範圍授權等模式成為可能。 該委託會持續存在，直到另一個 SetCode 交易明確地變更或移除為止。 由於此交易類型的存在是為了支援相容性，因此它只適用於與 [AccountKeyLegacy] 相關聯的 EOA。 此交易類型不可用於建立合約 - `目的地`欄位不可為零。

:::note

Kaia 網路可在「PragueCompatibleBlock」之後處理此交易類型。

:::

:::note

只有具有 `AccountKeyLegacy` 的 EOA 才能透過授權元組來指定代碼。 會跳過引用其他 key 類型帳號的授權元組。 一旦 EOA 已設定代碼，標準的 `TxTypeValueTransfer ` 交易就無法以它為目標，而 `TxTypeAccountUpdate ` 交易也無法從它產生。

:::

:::note

根據 [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 的規定，每個授權元組都會透過 `keccak256(MAGIC || rlp([chainId,地址,nonce]))`獨立簽署，其中 `MAGIC = 0x05`。 至少需要一個授權元組。

:::

### 屬性<a id="attributes-1"></a>

| 屬性                                                 | 類型                                                         | 說明                                                                                                           |
| :------------------------------------------------- | :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| 類型                                                 | uint8\(Go\)                           | 由 `EthereumTxTypeEthereumSetCode` 和 `EthereumTransactionType` 組成的 `TxTypeEthereumSetCode` 類型。 這必須是 `0x7804`。 |
| chainId                                            | \*big.Int\(Go\)       | 目的地鏈 ID。                                                                                                     |
| 扣球                                                 | uint64 \(Go\)                         | 用來唯一識別寄件者交易的值。 如果寄件者產生兩個具有相同 nonce 的交易，則只會執行其中一個。                                                            |
| maxPriorityFeePerGas (每瓦斯最高優先費) | \*big.Int\(Go\)       | 一個乘數，用來取得寄件者在 `baseFee` 以外要支付的金額。 由於 Kaia 有固定的瓦斯價格，因此這應該是各個網路的瓦斯價格。                                          |
| maxFeePerGas                                       | \*big.Int\(Go\)       | 寄件人願意為每單位瓦斯支付的最高金額。 由於 Kaia 有固定的瓦斯價格，因此這應該是各個網路的瓦斯價格。                                                        |
| 氣體                                                 | uint64 \(Go\)                         | 交易允許使用的最高交易費用。                                                                                               |
| 目的地                                                | \*common.Address （Go\）                     | 接收轉移值的帳戶地址。 不得為 nil - SetCode 交易無法建立契約。                                                                      |
| 價值                                                 | \*big.Int\(Go\)       | 要轉移的 KAIA `kei` 金額。                                                                                          |
| 資料                                                 | \byte \(Go\)                          | 附加到交易的資料，用於交易執行。                                                                                             |
| 存取清單                                               | type.AccessList\(Go\) | 由 \[\](common.Address,\[]common.Hash)組成的位址和儲存金鑰清單。                                                         |
| 授權清單                                               | \授權(Go\)                               | 授權元組清單，每個元組的形式為 `[chainId、address、nonce、yParity、r、s]`，其中 `address` 為簽署權限委託其代碼的契約，而元組則由權限簽署。 至少需要一個元組。        |
| v, r, s                                            | \*big.Int\(Go\)       | 寄件者為了讓接收者取得寄件者的地址而產生的加密簽章。                                                                                   |

### 簽名的 RLP 編碼<a id="rlp-encoding-for-signature-1"></a>

要為此交易類型製作簽章，RLP 序列化的步驟如下：

:::note

此類交易應使用 Prague Signer 簽署

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, destination, value, data, accessList, authorizationList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash,<private key>)
```

在 `authorizationList` 中的每個授權元組都會獨立簽署為：

```javascript
AuthSigRLP = MAGIC || encode([chainId, address, nonce]) // MAGIC = 0x05
AuthSigHash = keccak256(AuthSigRLP)
AuthSignature = sign(AuthSigHash,<authority private key>)
```

### SenderTxHash 的 RLP 編碼<a id="rlp-encoding-for-sendertxhash-1"></a>

要取得此交易類型的「SenderTxHash」，RLP 序列化的步驟如下：

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, destination, value, data, accessList, authorizationList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 交易切細值的 RLP 編碼<a id="rlp-encoding-for-transaction-hash-1"></a>

要取得交易切細值，RLP 序列化的步驟如下：

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, destination, value, data, accessList, authorizationList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 原始交易<a id="raw-transaction-1"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, destination, value, data, accessList, authorizationList, v, r, s])
```

### RLP 編碼 \(Example\)<a id="rlp-encoding-example-1"></a>

以下顯示 RLP 序列化的結果和交易物件：

```javascript
    TX(383aafe58842af80cc63747b78181439cc8b1786b70fedfd86d966b1ea728da1)
    Contract: false
    Chaind：   0x3e9
    From：     698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce
    To：       698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce
    Nonce: 29
    GasTipCap: 0x0
    GasFeeCap: 0x6fc23ac00
    GasLimit 0x186a0
    Value: 0x0
    Data：     0x8129fc1c
    AccessList：[]
    AuthorizationList：[{ChainID: 0x3e9, Address：5fa0193098ecbbad437243fe0ed77a402cd62242，Nonce：30}] 。
    V: 0x1
    R: 0x77b03c8fd556255dff1f7af72e7a9a8f081e1da9daeb09800d139bf22f22708e
    S: 0x26b7d4762db258e596382de1416753c65ca8e3b0855e8276eecf22d019af2805
    Hex：      7804f8ce8203e91d808506fc23ac00830186a094698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce80848129fc1cc0f85ef85c8203e9945fa0193098ecbbad437243fe0ed77a402cd622421e01a0a21df3fb047c656d5046ae6b5ea81743c047b281b07591f742a13606f09c4969a01494cb06d71cbaa002d669ff63e1d0044bb5d06a00ca550a103ac0287789614a01a077b03c8fd556255dff1f7af72e7a9a8f081e1da9daeb09800d139bf22f22708ea026b7d4762db258e596382de1416753c65ca8e3b0855e8276eecf22d019af2805
```

### RPC 輸出 (Example\)<a id="rpc-output-example-1"></a>

以下顯示透過 JSON RPC 傳回的交易物件。

eth_getTransactionByHash\` 的回傳值

```javascript
{
  "blockHash"："0xb76e4a38c1311159ed6fe704f4b220294589accf1c5ec440a471fd4201c6c968",
  "blockNumber"："0xb35bcdd",
  "from"："0x698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce",
  "gas"："0x186a0",
  "gasPrice"："0x5d21dba00",
  "maxFeePerGas"："0x6fc23ac00",
  "maxPriorityFeePerGas"："0x0",
  "hash"："0x383aafe58842af80cc63747b78181439cc8b1786b70fedfd86d966b1ea728da1",
  "input"："0x8129fc1c",
  "nonce"："0x1d",
  "to"："0x698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce",
  "transactionIndex"："0x0",
  "value"："0x0",
  "type"："0x4",
  "accessList"：[],
  "chainId"："0x3e9",
  "authorizationList"：[
      {
          "chainId"："0x3e9",
          "address"："0x5fa0193098ecbbad437243fe0ed77a402cd62242",
          "nonce"："0x1e",
          "yParity"："0x1",
          "r"："0xa21df3fb047c656d5046ae6b5ea81743c047b281b07591f742a13606f09c4969",
          "s"："0x1494cb06d71cbaa002d669ff63e1d0044bb5d06a00ca550a103ac0287789614a"
      }
  ],
  "v"："0x1",
  "r"："0x77b03c8fd556255dff1f7af72e7a9a8f081e1da9daeb09800d139bf22f22708e",
  "s"："0x26b7d4762db258e596382de1416753c65ca8e3b0855e8276eecf22d019af2805"
}
```

`kaia_getTransactionByHash` 的回傳值

```javascript
{
  "accessList"：[],
  "authorizationList"：[
      {
          "chainId"："0x3e9",
          "address"："0x5fa0193098ecbbad437243fe0ed77a402cd62242",
          "nonce"："0x1e",
          "yParity"："0x1",
          "r"："0xa21df3fb047c656d5046ae6b5ea81743c047b281b07591f742a13606f09c4969",
          "s"："0x1494cb06d71cbaa002d669ff63e1d0044bb5d06a00ca550a103ac0287789614a"
      }
  ],
  "blockHash"："0xb76e4a38c1311159ed6fe704f4b220294589accf1c5ec440a471fd4201c6c968",
  "blockNumber"："0xb35bcdd",
  "chainId"："0x3e9",
  "from"："0x698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce",
  "gas"："0x186a0",
  "gasPrice"："0x5d21dba00",
  "hash"："0x383aafe58842af80cc63747b78181439cc8b1786b70fedfd86d966b1ea728da1",
  "input"："0x8129fc1c",
  "maxFeePerGas"："0x6fc23ac00",
  "maxPriorityFeePerGas"："0x0",
  "nonce"："0x1d",
  "senderTxHash"："0x383aafe58842af80cc63747b78181439cc8b1786b70fedfd86d966b1ea728da1",
  "signatures"：[
      {
          "V"："0x1",
          "R"："0x77b03c8fd556255dff1f7af72e7a9a8f081e1da9daeb09800d139bf22f22708e",
          "S"："0x26b7d4762db258e596382de1416753c65ca8e3b0855e8276eecf22d019af2805"
      }
  ],
  "to"："0x698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce",
  "transactionIndex"："0x0",
  "type"："TxTypeEthereumSetCode",
  "typeInt"：30724,
  "value"："0x0"
}
```
