# Ethereum Compatibility

Kaia provides wrapped transaction types to support Ethereum compatibility. Ethereum transaction types in Kaia have the same attributes and RLP encoding schemes with Ethereum's design except for the single-byte type delimiter called `EthereumTxTypeEnvelope`. Therefore, users can successfully deploy transactions generated by Ethereum development tools on Kaia. The type delimiter is also omitted when users use `eth` namespace APIs, so they can use Kaia just as if they were using Ethereum. Using `kaia` namespace APIs, users can deploy and retrieve Ethereum formatted transactions as a type of Kaia transactions without getting confused with the existing Kaia transaction types.  

## EthereumTxTypeEnvelope <a id="ethereumtxtypeenvelope"></a>

EthereumTxTypeEnvelope is a single-byte prefix for raw transactions that denotes Ethereum transaction types. Ethereum has adopted an extendable transaction type scheme from [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) and it uses a type numbering system that conflicts with Kaia's. To resolve the conflict between two different transaction type schemes, Kaia has introduced `EthereumTxTypeEnvelope` which allows for separation and expansion for future Ethereum transaction types. 

`EthereumTxTypeEnvelope` is an additional type delimiter and used only for raw transactions and type numbering. It is not used for transaction hash or signature hash. For that purpose, `EthereumTransactionType` as defined in EIPs is used. 
- EthereumTxTypeEnvelope: `0x78`
- TxHashRLP : EthereumTransactionType || TransactionPayload
- RawTransaction : EthereumTxTypeEnvelope || EthereumTransactionType || TransactionPayload

## TxTypeEthereumAccessList <a id="txtypeethereumaccesslist"></a>

`TxTypeEthereumAccessList` represents a type of Ethereum transaction specified in [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930). This transactions type contains an access list, a list of addresses and storage keys that the transaction is supposed to access. Since this transaction type exists to support compatibility, it only works with EOAs associated with [AccountKeyLegacy]. EOAs associated with other account key types should use other transaction types such as `TxTypeValueTransfer`, `TxTypeSmartContractExecution`, and so on. This transaction type can create accounts, transfer tokens, deploy/execute smart contracts or a mix of the aforementioned. 

:::note
 
Kaia networks can process this transaction type after the `EthTxTypeCompatibleBlock`

:::

:::note
 
NOTE: This transaction type only supports the format of the Ethereum transaction type. Unlike [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930), there are no benefits in terms of transaction fee from using access list.

:::

### Attributes <a id="attributes"></a>

| Attribute | Type | Description |
| :--- | :--- | :--- |
| type | uint8 \(Go\) | The type of `TxTypeEthereumAccessList` that is a concatenation of `EthereumTxTypeEnvelope` and `EthereumTransactionType`. This must be 0x7801. |  
| chainId | \*big.Int \(Go\) | The destination chain ID. |
| nonce | uint64 \(Go\) | A value used to uniquely identify a sender’s transaction. If two transactions with the same nonce are generated by a sender, only one is executed. |
| gasPrice | \*big.Int \(Go\) | A multiplier to get how much the sender will pay in tokens. The amount of tokens the sender will pay is calculated via `gas` \* `gasPrice`. For example, the sender will pay 10 KAIA for a transaction fee if gas is 10 and gasPrice is 10^18. See [Unit of KAIA](../../learn/token-economics/kaia-native-token.md#units-of-kaia). |
| gas | uint64 \(Go\) | The maximum amount of transaction fee the transaction is allowed to use. |
| to | \*common.Address \(Go\) | The account address that will receive the transferred value. |
| value | \*big.Int \(Go\) | The amount of KAIA in `kei` to be transferred. |
| data | \[\]byte \(Go\) | Data attached to the transaction, used for transaction execution. |
| accessList | type.AccessList \(Go\) | A list of addresses and storage keys consisting of \[\](common.Address, []common.Hash). |
| v, r, s | \*big.Int \(Go\) | The cryptographic signature generated by the sender to let the receiver obtain the sender's address. |

### RLP Encoding for Signature <a id="rlp-encoding-for-signature"></a>

To make a signature for this transaction type, the RLP serialization proceeds as follows:

:::note
 
This type of transaction should be signed with London Signer

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### RLP Encoding for SenderTxHash <a id="rlp-encoding-for-sendertxhash"></a>

To obtain `SenderTxHash` for this transaction type, the RLP serialization proceeds as follows:

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### RLP Encoding for Transaction Hash <a id="rlp-encoding-for-transaction-hash"></a>

To make a transaction hash, the RLP serialization proceeds as follows:

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### Raw Transaction <a id="raw-transaction"></a>
```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
```

### RLP Encoding \(Example\) <a id="rlp-encoding-example"></a>

The following shows the result of the RLP serialization and the transaction object:

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

### RPC Output \(Example\) <a id="rpc-output-example"></a>

The following shows a transaction object returned via JSON RPC.

The return of `eth_getTransactionByHash`
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

The return of `kaia_getTransactionByHash`
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

`TxTypeEthereumDynamicFee` represents a type of Ethereum transaction specified in [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). This transaction type contains `gasTipCap` and `gasFeeCap` instead of `gasPrice`. Since this transaction type exists to support compatibility, it only works with EOAs associated with [AccountKeyLegacy]. EOAs associated with other account key types should use other transaction types such as `TxTypeValueTransfer`, `TxTypeSmartContractExecution`, and so on. This type of transaction can create accouns, transfer tokens, deploy/execute smart contracts, or a mix of the aforementioned. 

:::note
 
NOTE: Kaia networks can process this transaction type after the `EthTxTypeCompatibleBlock`

:::

:::note
 
Currently, this type of transaction only supports the format of the Ethereum transaction type. Unlike [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930), there are no benefits in terms of transaction fees from using access list.

:::

:::note
 
NOTE: Since Kaia has a fixed gas price, `gasTipCap` and `gasFeeCap` should take the gas price for the respective network, which is 250 Gkei at the time of writing.

:::

### Attributes <a id="attributes"></a>

| Attribute | Type | Description |
| :--- | :--- | :--- |
| type | uint8 \(Go\) | The type of `TxTypeEthereumDynamicFee` that is a concatenation of `EthereumTxTypeEnvelope` and `EthereumTransactionType`. It must be `0x7802`. |  
| chainId | \*big.Int \(Go\) | The destination chain ID. |
| nonce | uint64 \(Go\) | A value used to uniquely identify a sender’s transaction. If two transactions with the same nonce are generated by a sender, only one is executed. |
| gasTipCap | \*big.Int \(Go\) | A multiplier to get how much the sender will pay in addition to `baseFee`. Since Kaia has a fixed gas price, `gasTipCap` and `gasFeeCap` should take the gas price for the respective network, which is 250 Gkei at the time of writing. |
| gasFeeCap | \*big.Int \(Go\) | A multiplier to get how much the sender will pay in tokens. The amount of tokens the sender will pay is calculated via `gas` \* `gasFeeCap`. Since Kaia has a fixed gas price, `gasTipCap` and `gasFeeCap` should take the gas price for the respective network, which is 250 Gkei at the time of writing. |
| gas | uint64 \(Go\) | The maximum amount of transaction fee the transaction is allowed to use. |
| to | \*common.Address \(Go\) | The account address that will receive the transferred value. |
| value | \*big.Int \(Go\) | The amount of KAIA in `kei` to be transferred. |
| data | \[\]byte \(Go\) | Data attached to the transaction, used for transaction execution. |
| accessList | type.AccessList \(Go\) | A list of addresses and storage keys consisting of \[\](common.Address, []common.Hash). |
| v, r, s | \*big.Int \(Go\) | The cryptographic signature generated by the sender to let the receiver obtain the sender's address. |

### RLP Encoding for Signature <a id="rlp-encoding-for-signature"></a>

To make a signature for this transaction type, the RLP serialization proceeds as follows:

:::note
 
This type of transaction should be signed with London Signer

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### RLP Encoding for SenderTxHash <a id="rlp-encoding-for-sendertxhash"></a>

To obtain `SenderTxHash` for this transaction type, the RLP serialization proceeds as follows:

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### RLP Encoding for Transaction Hash <a id="rlp-encoding-for-transaction-hash"></a>

To obtain a transaction hash, the RLP serialization proceeds as follows:

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### Raw Transaction <a id="raw-transaction"></a>
```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
```

### RLP Encoding \(Example\) <a id="rlp-encoding-example"></a>

The following shows the result of the RLP serialization and the transaction object:

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

### RPC Output \(Example\) <a id="rpc-output-example"></a>

The following shows a transaction object returned via JSON RPC.

The return of `eth_getTransactionByHash`
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

The return of `kaia_getTransactionByHash`
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
