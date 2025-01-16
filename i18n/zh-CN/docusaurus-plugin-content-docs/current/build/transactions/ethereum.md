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
