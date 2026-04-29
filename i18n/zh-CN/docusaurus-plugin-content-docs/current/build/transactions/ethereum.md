# 以太坊兼容性

Kaia 提供封装的交易类型，以支持以太坊兼容性。 除了名为 "EthereumTxTypeEnvelope "的单字节类型分隔符外，Kaia 中的以太坊交易类型具有与以太坊设计相同的属性和 RLP 编码方案。 因此，用户可以在 Kaia 上成功部署以太坊开发工具生成的交易。 当用户使用 `eth` 命名空间 API 时，类型分隔符也会被省略，因此他们可以像使用以太坊一样使用 Kaia。 使用 `kaia` 命名空间 API，用户可以将以太坊格式化的交易作为 Kaia 交易类型进行部署和检索，而不会与现有的 Kaia 交易类型混淆。

## EthereumTxTypeEnvelope <a id="ethereumtxtypeenvelope"></a>

EthereumTxTypeEnvelope 是原始交易的单字节前缀，表示以太坊交易类型。 以太坊采用了[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)中的可扩展交易类型方案，它使用的类型编号系统与 Kaia 的冲突。 为了解决两种不同交易类型方案之间的冲突，Kaia 引入了 "EthereumTxTypeEnvelope"，允许未来以太坊交易类型的分离和扩展。

EthereumTxTypeEnvelope "是一个额外的类型分隔符，仅用于原始交易和类型编号。 它不用于交易哈希或签名哈希。 为此，使用了 EIPs 中定义的 "EthereumTransactionType"。

- EthereumTxTypeEnvelope: `0x78`
- TxHashRLP : EthereumTransactionType || TransactionPayload
- RawTransaction : EthereumTxTypeEnvelope || EthereumTransactionType || TransactionPayload

## TxTypeEthereumAccessList <a id="txtypeethereumaccesslist"></a>

TxTypeEthereumAccessList "代表 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) 中指定的以太坊交易类型。 该事务类型包含一个访问列表，即该事务要访问的地址和存储密钥列表。 由于该交易类型的存在是为了支持兼容性，因此只适用于与[AccountKeyLegacy]相关的 EOA。 与其他账户密钥类型相关的 EOA 应使用其他交易类型，如 "TxTypeValueTransfer"、"TxTypeSmartContractExecution "等。 这种交易类型可以创建账户、转移代币、部署/执行智能合约或混合使用上述交易类型。

:::note

Kaia 网络可在 "EthTxTypeCompatibleBlock "之后处理该交易类型。

:::

:::note

注意：此交易类型只支持以太坊交易类型的格式。 与 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)不同，使用访问列表不会带来交易费用方面的好处。

:::

### 属性<a id="attributes"></a>

| 属性         | 类型                                                         | 说明                                                                                                                                                                                                                  |
| :--------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type       | uint8\(Go\)                           | 由 `EthereumTxTypeEthereumAccessList` 和 `EthereumTransactionType` 连接而成的 `TxTypeEthereumAccessList` 类型。 必须为 0x7801。                                                                                                   |
| chainId    | \*big.Int （ Go\)                          | 目标链 ID。                                                                                                                                                                                                             |
| nonce      | uint64 \(Go\)                         | 用于唯一标识发件人交易的值。 如果一个发送方生成了两个具有相同 nonce 的交易，则只执行其中一个。                                                                                                                                                                 |
| gasPrice   | \*big.Int （ Go\)                          | 一个乘数，用于计算发件人将支付多少代币。 发送方将支付的代币数量通过 `gas` \* `gasPrice` 计算得出。 例如，如果 gas 为 10，gasPrice 为 10^18，发件人将支付 10 KAIA 的交易费。 见 [Unit of KAIA](../../learn/token-economics/kaia-native-token.md#units-of-kaia). |
| gas        | uint64 \(Go\)                         | 交易允许使用的最高交易费金额。                                                                                                                                                                                                     |
| to         | \*common.Address（Go\）                      | 接收转账金额的账户地址。                                                                                                                                                                                                        |
| value      | \*big.Int （ Go\)                          | 以 `kei` 为单位的 KAIA 转账金额。                                                                                                                                                                                             |
| data       | \byte （去）                                                  | 附属于事务的数据，用于执行事务。                                                                                                                                                                                                    |
| accessList | type.AccessList\(Go\) | 由 \[\](common.Address,\[]common.Hash)组成的地址和存储密钥列表。                                                                                                                                                                |
| v, r, s    | \*big.Int （ Go\)                          | 发送方为让接收方获取发送方地址而生成的加密签名。                                                                                                                                                                                            |

### 签名的 RLP 编码<a id="rlp-encoding-for-signature"></a>

为这种交易类型制作签名的 RLP 序列化过程如下：

:::note

此类交易应由伦敦签名人签名

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash 的 RLP 编码<a id="rlp-encoding-for-sendertxhash"></a>

要获取该事务类型的 `SenderTxHash` 值，RLP 序列化过程如下：

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### 交易哈希的 RLP 编码<a id="rlp-encoding-for-transaction-hash"></a>

制作交易哈希值的 RLP 序列化过程如下：

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 原始交易<a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
```

### RLP 编码 （示例）<a id="rlp-encoding-example"></a>

下面显示的是 RLP 序列化和事务对象的结果：

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

### RPC 输出 （示例）<a id="rpc-output-example"></a>

下面显示的是通过 JSON RPC 返回的事务对象。

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

TxTypeEthereumDynamicFee "代表 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 中指定的一种以太坊交易类型。 该交易类型包含 "gasTipCap "和 "gasFeeCap"，而不是 "gasPrice"。 由于该交易类型的存在是为了支持兼容性，因此只适用于与[AccountKeyLegacy]相关的 EOA。 与其他账户密钥类型相关的 EOA 应使用其他交易类型，如 "TxTypeValueTransfer"、"TxTypeSmartContractExecution "等。 这种类型的交易可以创建账户、转移代币、部署/执行智能合约，也可以是上述交易的混合体。

:::note

注意：Kaia 网络可在 "EthTxTypeCompatibleBlock "后处理此交易类型。

:::

:::note

目前，这种类型的交易只支持以太坊交易类型的格式。 与 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)不同，使用访问列表不会带来交易费用方面的好处。

:::

:::note

注意： 由于 Kaia 有固定的天然气价格，"gasTipCap "和 "gasFeeCap "应采用相应网络的天然气价格，在撰写本文时为 250 Gkei。

:::

### 属性<a id="attributes"></a>

| 属性         | 类型                                                         | 说明                                                                                                                                          |
| :--------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| type       | uint8\(Go\)                           | TxTypeEthereumDynamicFee "的类型，由 "EthereumTxTypeEnvelope "和 "EthereumTransactionType "连接而成。 必须是 `0x7802`。                                    |
| chainId    | \*big.Int （ Go\)                          | 目标链 ID。                                                                                                                                     |
| nonce      | uint64 \(Go\)                         | 用于唯一标识发件人交易的值。 如果一个发送方生成了两个具有相同 nonce 的交易，则只执行其中一个。                                                                                         |
| gasTipCap  | \*big.Int （ Go\)                          | 一个乘数，用于计算发件人除了支付 `baseFee` 以外还要支付多少费用。 由于 Kaia 有固定的天然气价格，因此 `gasTipCap` 和 `gasFeeCap` 应采用相应网络的天然气价格，在编写本报告时为 250 Gkei。                      |
| gasFeeCap  | \*big.Int （ Go\)                          | 一个乘数，用于计算发件人将支付多少代币。 发送方将支付的代币数量通过 `gas` \* `gasFeeCap` 计算。 由于 Kaia 有固定的天然气价格，因此 `gasTipCap` 和 `gasFeeCap` 应采用相应网络的天然气价格，在编写本报告时为 250 Gkei。 |
| gas        | uint64 \(Go\)                         | 交易允许使用的最高交易费金额。                                                                                                                             |
| to         | \*common.Address（Go\）                      | 接收转账金额的账户地址。                                                                                                                                |
| value      | \*big.Int （ Go\)                          | 以 `kei` 为单位的 KAIA 转账金额。                                                                                                                     |
| data       | \byte （去）                                                  | 附属于事务的数据，用于执行事务。                                                                                                                            |
| accessList | type.AccessList\(Go\) | 由 \[\](common.Address,\[]common.Hash)组成的地址和存储密钥列表。                                                                                        |
| v, r, s    | \*big.Int （ Go\)                          | 发送方为让接收方获取发送方地址而生成的加密签名。                                                                                                                    |

### 签名的 RLP 编码<a id="rlp-encoding-for-signature"></a>

为这种交易类型制作签名的 RLP 序列化过程如下：

:::note

此类交易应由伦敦签名人签名

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash 的 RLP 编码<a id="rlp-encoding-for-sendertxhash"></a>

要获取该事务类型的 `SenderTxHash` 值，RLP 序列化过程如下：

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### 交易哈希的 RLP 编码<a id="rlp-encoding-for-transaction-hash"></a>

要获得事务哈希值，RLP 序列化过程如下：

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 原始交易<a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
```

### RLP 编码 （示例）<a id="rlp-encoding-example"></a>

下面显示的是 RLP 序列化和事务对象的结果：

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

### RPC 输出 （示例）<a id="rpc-output-example"></a>

下面显示的是通过 JSON RPC 返回的事务对象。

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

TxTypeEthereumBlob "代表[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) 和[KIP-279](https://kips.kaia.io/KIPs/kip-279) 中指定的以太坊交易类型。 这种事务类型可携带二进制大型数据对象（blob），为 Kaia 上的第 2 层滚动提供经济高效的数据可用性层。 通过将 blob 数据从永久 calldata 存储中分离出来，卷积可以通过独立的 blob 费用市场以较低的成本发布数据。 EVM 无法访问 blob 数据本身；链上只能访问 "blobVersionedHashes "承诺。 由于该交易类型的存在是为了支持兼容性，因此只适用于与[AccountKeyLegacy]相关的 EOA。 该事务类型不能用于创建合同--`to` 字段不能为空。

:::note

Kaia 网络可在 "OsakaCompatibleBlock "后处理此交易类型。

:::

:::note

Kaia 的 Blob 气体参数以 1 秒钟为单位进行调整。 每个块**只允许**一个 blob。 只接受 [EIP-7594](https://eips.ethereum.org/EIPS/eip-7594) 副标题格式（V1），拒绝 V0 副标题。 Blob 边车保留了 1 814 400 个区块（约 21 天）。

:::

:::note

eth_sendRawTransaction` 需要完整的 blob 事务和侧载（`BlobTxWithBlobs\`）。 blobVersionedHashes "必须使用版本前缀 "0x01"。

:::

### 属性<a id="attributes"></a>

| 属性                                             | 类型                                                         | 说明                                                                                                          |
| :--------------------------------------------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| 类型                                             | uint8\(Go\)                           | 由 `EthereumTxTypeEthereumEnvelope` 和 `EthereumTransactionType` 连接而成的 `TxTypeEthereumBlob` 类型。 必须是 `0x7803`。 |
| chainId                                        | \*big.Int （ Go\)                          | 目标链 ID。                                                                                                     |
| 子密码                                            | uint64 \(Go\)                         | 用于唯一标识发件人交易的值。 如果一个发送方生成了两个具有相同 nonce 的交易，则只执行其中一个。                                                         |
| 最大每气优先权费用                                      | \*big.Int （ Go\)                          | 一个乘数，用于计算发件人除了支付 `baseFee` 以外还要支付多少费用。 由于 Kaia 有固定的天然气价格，因此应采用相应管网的天然气价格。                                   |
| maxFeePerGas                                   | \*big.Int （ Go\)                          | 发件人愿意为每单位气体支付的最高金额。 由于 Kaia 有固定的天然气价格，因此应采用相应管网的天然气价格。                                                      |
| 燃气                                             | uint64 \(Go\)                         | 交易允许使用的最高交易费金额。                                                                                             |
| 至                                              | \*common.Address （ Go\）                    | 接收转账金额的账户地址。 不能为零--Blob 交易不能创建合约。                                                                           |
| 价值                                             | \*big.Int （ Go\)                          | 以 `kei` 为单位的 KAIA 转账金额。                                                                                     |
| 数据                                             | \byte （去）                                                  | 附属于事务的数据，用于执行事务。                                                                                            |
| 访问列表                                           | type.AccessList\(Go\) | 由 \[\](common.Address,\[]common.Hash)组成的地址和存储密钥列表。                                                        |
| maxFeePerBlobGas (每球气体最高收费) | \*big.Int （ Go\)                          | 发送方愿意为每单位 Blob 气体支付的最高费用。 Blob 气体的定价与普通气体不同。                                                                |
| blobVersionedHashes                            | \common.Hash (Go\)     | 与该事务相关的 Blob 的版本化哈希值列表。 每个哈希值必须使用版本前缀 `0x01`。 至少需要一个哈希值。                                                    |
| v, r, s                                        | \*big.Int （ Go\)                          | 发送方为让接收方获取发送方地址而生成的加密签名。                                                                                    |

### 签名的 RLP 编码<a id="rlp-encoding-for-signature"></a>

为这种交易类型制作签名的 RLP 序列化过程如下：

:::note

此类交易应使用 Osaka Signer 进行签署

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash,<private key>)
```

### SenderTxHash 的 RLP 编码<a id="rlp-encoding-for-sendertxhash"></a>

要获取该事务类型的 "SenderTxHash"，RLP 序列化过程如下：

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 交易哈希的 RLP 编码<a id="rlp-encoding-for-transaction-hash"></a>

要获得事务哈希值，RLP 序列化过程如下：

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 原始交易<a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes, v, r, s])
```

通过 `eth_sendRawTransaction` 提交时，必须提供完整的网络表示（包括侧载）：

```javascript
BlobTxWithBlobs = rlp([TransactionPayloadBody, sidecar_version, blobs, commitments, proofs])
```

根据 EIP-7594，"sidecar_version "为 "0x01"。

### RLP 编码 （示例）<a id="rlp-encoding-example"></a>

下面显示的是 RLP 序列化和事务对象的结果：

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
    V：0x1
    R：        0x4b6905c3f06373857626004b2367caa5e1d4c60fa3091a058ddbfef34e30ff
    S: 0x659b7ede7f3439a3f07958abe448c25ddfc0ba0b530bff60356552484a854916
    Hex：      7803f8978203e982016e80850ba43b740082c35094a9ef4a5bfb21e92c06da23ed79294dab11f5a6df8084d09de08ac0855d21dba000e1a0016f2dec5826dba2b8071deb0fba09244486cc4f9b981fe26396bc3206d2a8d701a04b6905c3f0637363857626004b2367caa5e1d4c60fa3091a058ddbfef34e30ffa0659b7ede7f3439a3f07958abe448c25ddfc0ba0b530bff60356552484a854916
```

### RPC 输出 （示例）<a id="rpc-output-example"></a>

下面显示的是通过 JSON RPC 返回的事务对象。

eth_getTransactionByHash "的返回值

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

kaia_getTransactionByHash\` 的返回值

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

TxTypeEthereumSetCode "代表[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 和[KIP-228](https://kips.kaia.io/KIPs/kip-228) 中指定的以太坊交易类型。 这种交易类型允许将账户抽象功能应用于现有的电子业务约定，从而改善了用户体验。 以前，寻求智能账户功能的 EOA 所有者必须创建一个新的智能账户，并迁移所有资产和权限。 通过 SetCode 事务，用户可以就地将代码附加到现有的 EOA 上，从而无需进行成本高昂的迁移。 授权列表 "指定了一个由账户签署的"（chainId、地址、nonce）"元组列表，这些账户的代码应被设置，从而支持批量交易、气体赞助和范围授权等模式。 在另一个 SetCode 事务明确更改或删除之前，该委托一直存在。 由于该交易类型的存在是为了支持兼容性，因此只适用于与[AccountKeyLegacy]相关的 EOA。 该事务类型不能用于创建合同--"目的地 "字段不能为空。

:::note

Kaia 网络可以在 "PragueCompatibleBlock "之后处理这种交易类型。

:::

:::note

只有具有 "AccountKeyLegacy "的 EOA 才能通过授权元组分配代码。 引用其他密钥类型账户的授权图元将被跳过。 一旦 EOA 设置了代码，标准的 "TxTypeValueTransfer "事务就不能以它为目标，"TxTypeAccountUpdate "事务也不能从它发起。

:::

:::note

如 [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 所述，每个授权元组都通过`keccak256(MAGIC || rlp([chainId,地址,nonce]))`独立签名，其中`MAGIC = 0x05`。 至少需要一个授权元组。

:::

### 属性<a id="attributes-1"></a>

| 属性           | 类型                                                         | 说明                                                                                                                                                          |
| :----------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 类型           | uint8\(Go\)                           | 由 `EthereumTxTypeEthereumSetCode` 和 `EthereumTransactionType` 连接而成的 `TxTypeEthereumSetCode` 类型。 必须是 `0x7804`。                                               |
| chainId      | \*big.Int （ Go\)                          | 目标链 ID。                                                                                                                                                     |
| 扣押令          | uint64 \(Go\)                         | 用于唯一标识发件人交易的值。 如果一个发送方生成了两个具有相同 nonce 的交易，则只执行其中一个。                                                                                                         |
| 最大优先级每气收费    | \*big.Int （ Go\)                          | 一个乘数，用于计算发件人除了支付 `baseFee` 以外还要支付多少费用。 由于 Kaia 有固定的天然气价格，因此应采用相应管网的天然气价格。                                                                                   |
| maxFeePerGas | \*big.Int （ Go\)                          | 发件人愿意为每单位气体支付的最高金额。 由于 Kaia 有固定的天然气价格，因此应采用相应管网的天然气价格。                                                                                                      |
| 燃气           | uint64 \(Go\)                         | 交易允许使用的最高交易费金额。                                                                                                                                             |
| 目的地          | \*common.Address （ Go\）                    | 接收转账金额的账户地址。 不得为零--SetCode 交易不能创建合同。                                                                                                                        |
| 价值           | \*big.Int （ Go\)                          | 以 `kei` 为单位的 KAIA 转账金额。                                                                                                                                     |
| 数据           | \byte （去）                                                  | 附属于事务的数据，用于执行事务。                                                                                                                                            |
| 访问列表         | type.AccessList\(Go\) | 由 \[\](common.Address,\[]common.Hash)组成的地址和存储密钥列表。                                                                                                        |
| 授权列表         | \授权（Go\                                                   | 授权元组列表，每个元组的形式为"[chainId, address, nonce, yParity, r, s]"，其中 "address "为签名机构授权代码的合约，元组由该机构签名。 至少需要一个元组。 |
| v, r, s      | \*big.Int （ Go\)                          | 发送方为让接收方获得发送方地址而生成的加密签名。                                                                                                                                    |

### 签名的 RLP 编码<a id="rlp-encoding-for-signature-1"></a>

为这种交易类型制作签名的 RLP 序列化过程如下：

:::note

这类交易应由布拉格签名者签名

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, destination, value, data, accessList, authorizationList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash,<private key>)
```

授权列表 "中的每个授权元组都是独立签名的：

```javascript
AuthSigRLP = MAGIC || encode([chainId, address, nonce]) // MAGIC = 0x05
AuthSigHash = keccak256(AuthSigRLP)
AuthSignature = sign(AuthSigHash,<authority private key>)
```

### SenderTxHash 的 RLP 编码<a id="rlp-encoding-for-sendertxhash-1"></a>

要获取该事务类型的 `SenderTxHash` 值，RLP 序列化过程如下：

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, destination, value, data, accessList, authorizationList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 交易哈希的 RLP 编码<a id="rlp-encoding-for-transaction-hash-1"></a>

要获得事务哈希值，RLP 序列化过程如下：

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, destination, value, data, accessList, authorizationList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 原始交易<a id="raw-transaction-1"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, destination, value, data, accessList, authorizationList, v, r, s])
```

### RLP 编码 （示例）<a id="rlp-encoding-example-1"></a>

下面显示的是 RLP 序列化和事务对象的结果：

```javascript
    TX(383aafe58842af80cc63747b78181439cc8b1786b70fedfd86d966b1ea728da1)
    Contract: false
    Chaind：   0x3e9
    From：     698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce
    收件人：       698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce
    Nonce: 29
    GasTipCap: 0x0
    GasFeeCap: 0x6fc23ac00
    GasLimit 0x186a0
    Value: 0x0
    Data：     0x8129fc1c
    AccessList：[]
    AuthorizationList：[{ChainID: 0x3e9, Address：5fa0193098ecbbad437243fe0ed77a402cd62242，Nonce：30}] V：0x1
    V: 0x1
    R: 0x77b03c8fd556255dff1f7af72e7a9a8f081e1da9daeb09800d139bf22f22708e
    S: 0x26b7d4762db258e596382de1416753c65ca8e3b0855e8276eecf22d019af2805
    Hex：      7804f8ce8203e91d808506fc23ac00830186a094698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce80848129fc1cc0f85ef85c8203e9945fa0193098ecbbad437243fe0ed77a402cd622421e01a0a21df3fb047c656d5046ae6b5ea81743c047b281b07591f742a13606f09c4969a01494cb06d71cbaa002d669ff63e1d0044bb5d06a00ca550a103ac0287789614a01a077b03c8fd556255dff1f7af72e7a9a8f081e1da9daeb09800d139bf22f22708ea026b7d4762db258e596382de1416753c65ca8e3b0855e8276eecf22d019af2805
```

### RPC 输出 （示例）<a id="rpc-output-example-1"></a>

下面显示的是通过 JSON RPC 返回的事务对象。

eth_getTransactionByHash "的返回值

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

kaia_getTransactionByHash\` 的返回值

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
