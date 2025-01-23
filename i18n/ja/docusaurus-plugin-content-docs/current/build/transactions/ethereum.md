# イーサリアム互換性

KaiaはEthereumとの互換性をサポートするためにラップされたトランザクションタイプを提供する。 Kaiaにおけるイーサリアムのトランザクションタイプは、`EthereumTxTypeEnvelope`と呼ばれる1バイトのタイプ区切り文字を除き、イーサリアムの設計と同じ属性とRLPエンコーディングスキームを持っています。 したがって、ユーザーはEthereum開発ツールで生成したトランザクションをKaia上で正常に展開することができます。 ユーザーが`eth`名前空間APIを使用する場合、タイプデリミターも省略されるため、Ethereumを使用するのと同じようにKaiaを使用することができます。 `kaia`名前空間APIを使用することで、ユーザーは既存のKaiaトランザクションタイプと混同することなく、EthereumフォーマットのトランザクションをKaiaトランザクションタイプとしてデプロイおよび取得することができる。

## EthereumTxTypeEnvelope <a id="ethereumtxtypeenvelope"></a>

EthereumTxTypeEnvelopeは、Ethereumのトランザクションタイプを示す生トランザクション用の1バイト接頭辞である。 Ethereumは[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)から拡張可能なトランザクション型スキームを採用しており、Kaiaと競合する型番号システムを使用している。 2つの異なるトランザクションタイプのスキーム間の衝突を解決するために、Kaiaは将来のEthereumトランザクションタイプの分離と拡張を可能にする`EthereumTxTypeEnvelope`を導入した。 Ethereumは[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)から拡張可能なトランザクション型スキームを採用しており、Kaiaと競合する型番号システムを使用している。 2つの異なるトランザクションタイプのスキーム間の衝突を解決するために、Kaiaは将来のEthereumトランザクションタイプの分離と拡張を可能にする`EthereumTxTypeEnvelope`を導入した。

`EthereumTxTypeEnvelope`は追加の型区切り文字であり、生のトランザクションと型番号付けにのみ使用される。 トランザクションハッシュや署名ハッシュには使用されない。 そのために、EIPs で定義されている `EthereumTransactionType` が使われる。

- EthereumTxTypeEnvelope: `0x78`
- TxHashRLP : EthereumTransactionType || TransactionPayload
- RawTransaction : EthereumTxTypeEnvelope || EthereumTransactionType || TransactionPayload

## TxTypeEthereumAccessList <a id="txtypeethereumaccesslist"></a>

`TxTypeEthereumAccessList`は[EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)で指定されたイーサリアム取引のタイプを表す。 このトランザクションタイプは、アクセスリスト、すなわち、トランザクションが アクセスすることになっているアドレスとストレージキーのリストを含む。 このトランザクション・タイプは互換性をサポートするために存在するため、[AccountKeyLegacy]に関連付けられた EOA でのみ機能する。 他のアカウント・キー・タイプに関連する EOA は、`TxTypeValueTransfer` や `TxTypeSmartContractExecution` などの他のトランザクション・タイプを使用すべきである。 このトランザクションタイプは、アカウントの作成、トークンの移転、スマートコントラクトのデプロイ/実行、または前述の混合が可能である。

:::note

Kaiaネットワークは `EthTxTypeCompatibleBlock` の後にこのトランザクションタイプを処理できる。

:::

:::note

注：このトランザクションタイプはイーサリアムのトランザクションタイプのフォーマットのみをサポートする。 EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)と異なり、アクセスリストを使用することによる取引手数料のメリットはない。

:::

### 属性<a id="attributes"></a>

| 属性         | タイプ                                                                                | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :--------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | uint8 (Go)                                                      | `EthereumTxTypeEnvelope` と `EthereumTransactionType` を連結した `TxTypeEthereumAccessList` 型。 これは0x7801でなければならない。                                                                                                                                                                                                                                                                                                                                                               |
| chainId    | \*big.Int (Go)                                  | デスティネーションチェーンID。                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| nonce      | uint64 (Go)                                                     | 送信者のトランザクションを一意に識別するために使用される値。 送信者のトランザクションを一意に識別するために使用される値。 同じnonceを持つ2つのトランザクションが送信者によって生成された場合、1つだけが実行される。                                                                                                                                                                                                                                                                                                                                                             |
| gasPrice   | \*big.Int (Go)                                  | 送信者がトークンで支払う金額を得るための乗数。 送信者が支払うトークンの金額は `gas` ⑭ `gasPrice` によって計算される。 送信者がトークンで支払う金額を得るための乗数。 送信者が支払うトークンの金額は `gas` ⑭ `gasPrice` によって計算される。 For example, the sender will pay 10 KLAY for a transaction fee if gas is 10 and gasPrice is 10^18. KAIAのユニット](../../learn/token-economics/kaia-native-token.md#units-of-kaia)を参照。 |
| gas        | uint64 (Go)                                                     | トランザクションが使用できる取引手数料の上限額。                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| to         | \*common.Address (Go)                           | 送金された金額を受け取る口座アドレス。                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| value      | \*big.Int (Go)                                  | 譲渡される`kei`のKAIAの量。                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| data       | []byte (Go) | トランザクションの実行に使用される、トランザクションに添付されたデータ。                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| accessList | type.AccessList (Go)                            | A list of addresses and storage keys consisting of [](common.Address, []common.Hash).                                                                                                                                                                                                           |
| v, r, s    | \*big.Int (Go)                                  | 受信者が送信者のアドレスを取得するために送信者が生成した暗号署名。                                                                                                                                                                                                                                                                                                                                                                                                                                          |

### 署名用RLPエンコーディング<a id="rlp-encoding-for-signature"></a>

このトランザクションタイプの署名を作成するために、RLPのシリアライズは以下のように進められる：

:::note

この種のトランザクションはロンドン・シグナーで署名されるべきである。

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHashのRLPエンコーディング<a id="rlp-encoding-for-sendertxhash"></a>

このトランザクションタイプの `SenderTxHash` を得るために、RLPのシリアライズは以下のように進められる：

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### トランザクション・ハッシュのRLPエンコーディング<a id="rlp-encoding-for-transaction-hash"></a>

トランザクションハッシュを作成するために、RLPのシリアライゼーションは以下のように進められる：

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 未加工取引<a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
```

### RLP Encoding (Example) <a id="rlp-encoding-example"></a>

以下は、RLPシリアライズの結果とトランザクション・オブジェクトを示している：

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

### RPC Output (Example) <a id="rpc-output-example"></a>

以下は、JSON RPCを介して返されるトランザクション・オブジェクトを示している。

`eth_getTransactionByHash` の戻り値。

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

`kaia_getTransactionByHash` の戻り値

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

`TxTypeEthereumDynamicFee` は、[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) で指定されているイーサリアム取引のタイプを表す。 この取引タイプは `gasPrice` の代わりに `gasTipCap` と `gasFeeCap` を含む。 このトランザクション・タイプは互換性をサポートするために存在するため、[AccountKeyLegacy]に関連付けられた EOA でのみ機能する。 他のアカウント・キー・タイプに関連する EOA は、`TxTypeValueTransfer` や `TxTypeSmartContractExecution` などの他のトランザクション・タイプを使用すべきである。 この種の取引は、アカウントの作成、トークンの移転、スマートコントラクトの導入/実行、または前述の混合が可能である。

:::note

注: Kaia ネットワークは `EthTxTypeCompatibleBlock` の後にこのトランザクションタイプを処理できる。

:::

:::note

現在、このタイプのトランザクションはイーサリアムのトランザクションタイプのフォーマットのみをサポートしている。 現在、このタイプのトランザクションはイーサリアムのトランザクションタイプのフォーマットのみをサポートしている。 EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)と異なり、アクセスリストを使用することによる取引手数料のメリットはない。

:::

:::note

注意: カイアのガス料金は固定なので、`gasTipCap`と`gasFeeCap`はそれぞれのネットワークのガス料金を取るべきである。

:::

### 属性<a id="attributes"></a>

| 属性         | タイプ                                                                                | 説明                                                                                                                                                                                                                                                               |
| :--------- | :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | uint8 (Go)                                                      | `EthereumTxTypeEnvelope` と `EthereumTransactionType` を連結した `TxTypeEthereumDynamicFee` の型。 0x7802\`でなければならない。                                                                                                                                                     |
| chainId    | \*big.Int (Go)                                  | デスティネーションチェーンID。                                                                                                                                                                                                                                                 |
| nonce      | uint64 (Go)                                                     | 送信者のトランザクションを一意に識別するために使用される値。 送信者のトランザクションを一意に識別するために使用される値。 同じnonceを持つ2つのトランザクションが送信者によって生成された場合、1つだけが実行される。                                                                                                                                                   |
| gasTipCap  | \*big.Int (Go)                                  | ベースフィー(`baseFee`)に加えて送信者が支払う金額を得るための乗数。 カイアのガス料金は固定なので、`gasTipCap`と`gasFeeCap`はそれぞれのネットワークのガス料金を取る必要がある。                                                                                                                                      |
| gasFeeCap  | \*big.Int (Go)                                  | 送信者がトークンで支払う金額を得るための乗数。 送信者がトークンで支払う金額を得るための乗数。 送信者が支払うトークンの量は、`gas`\* `gasFeeCap` によって計算されます。 カイアのガス料金は固定なので、`gasTipCap`と`gasFeeCap`はそれぞれのネットワークのガス料金を取る必要がある。 カイアのガス料金は固定なので、`gasTipCap`と`gasFeeCap`はそれぞれのネットワークのガス料金を取る必要がある。                                 |
| gas        | uint64 (Go)                                                     | トランザクションが使用できる取引手数料の上限額。                                                                                                                                                                                                                                         |
| to         | \*common.Address (Go)                           | 送金された金額を受け取る口座アドレス。                                                                                                                                                                                                                                              |
| value      | \*big.Int (Go)                                  | 譲渡される`kei`のKAIAの量。                                                                                                                                                                                                                                               |
| data       | []byte (Go) | トランザクションの実行に使用される、トランザクションに添付されたデータ。                                                                                                                                                                                                                             |
| accessList | type.AccessList (Go)                            | A list of addresses and storage keys consisting of [](common.Address, []common.Hash). |
| v, r, s    | \*big.Int (Go)                                  | 受信者が送信者のアドレスを取得するために送信者が生成した暗号署名。                                                                                                                                                                                                                                |

### 署名用RLPエンコーディング<a id="rlp-encoding-for-signature"></a>

このトランザクションタイプの署名を作成するために、RLPのシリアライズは以下のように進められる：

:::note

この種のトランザクションはロンドン・シグナーで署名されるべきである。

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHashのRLPエンコーディング<a id="rlp-encoding-for-sendertxhash"></a>

このトランザクションタイプの `SenderTxHash` を得るために、RLPのシリアライズは以下のように進められる：

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### トランザクション・ハッシュのRLPエンコーディング<a id="rlp-encoding-for-transaction-hash"></a>

トランザクションハッシュを得るために、RLPシリアライゼーションは以下のように進められる：

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 未加工取引<a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
```

### RLP Encoding (Example) <a id="rlp-encoding-example"></a>

以下は、RLPシリアライズの結果とトランザクション・オブジェクトを示している：

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

### RPC Output (Example) <a id="rpc-output-example"></a>

以下は、JSON RPCを介して返されるトランザクション・オブジェクトを示している。

`eth_getTransactionByHash` の戻り値。

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

`kaia_getTransactionByHash` の戻り値

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
