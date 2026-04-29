# 이더리움 호환성

Kaia는 이더리움 호환성을 지원하기 위해 랩드 트랜잭션 타입을 제공합니다. Kaia의 이더리움 트랜잭션 타입은 `EthereumTxTypeEnvelope`라는 단일 바이트 타입 구분자를 제외하고는 이더리움의 설계와 동일한 속성과 RLP 인코딩 스키마를 가지고 있습니다. 따라서 사용자는 이더리움 개발 도구에서 생성한 트랜잭션을 Kaia에 성공적으로 배포할 수 있습니다. 사용자가 `eth` 네임스페이스 API를 사용할 때도 타입 구분자는 생략되므로 이더리움을 사용하는 것처럼 Kaia를 사용할 수 있습니다. 사용자는 `klay` 네임스페이스 API를 사용하면 기존 Kaia 트랜잭션 유형과 혼동하지 않고 이더리움 형식의 트랜잭션을 Kaia 트랜잭션의 한 유형으로 배포하고 조회할 수 있습니다.

## EthereumTxTypeEnvelope <a id="ethereumtxtypeenvelope"></a>

EthereumTxTypeEnvelope는 EthereumTransactionType을 나타내는 Raw 트랜잭션의 1바이트 접두사입니다. 이더리움은 [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)의 확장 가능한 트랜잭션 유형 체계를 채택했으며, 이는 Kaia와 상충되는 유형 번호 체계를 사용합니다. 서로 다른 두 트랜잭션 타입 체계 간의 충돌을 해결하기 위해 Kaia는 향후 이더리움 트랜잭션 타입을 분리 및 확장할 수 있는 `EthereumTxTypeEnvelope`를 도입했습니다.

`EthereumTxTypeEnvelope`는 추가 유형 구분자이며, Raw 트랜잭션과 유형 번호 지정에만 사용됩니다. 트랜잭션 해시나 서명 해시에는 사용되지 않습니다. 이를 위해 EIP에 정의된 `EthereumTransactionType`이 사용됩니다.

- EthereumTxTypeEnvelope: `0x78`
- TxHashRLP : EthereumTransactionType || TransactionPayload
- RawTransaction : EthereumTxTypeEnvelope || EthereumTransactionType || TransactionPayload

## TxTypeEthereumAccessList <a id="txtypeethereumaccesslist"></a>

`TxTypeEthereumAccessList`는 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)에 명시된 이더리움 트랜잭션의 유형을 나타냅니다. 이 트랜잭션 유형에는 액세스 목록, 트랜잭션이 액세스해야 하는 주소 및 저장 키 목록이 포함되어 있습니다. 이 트랜잭션 유형은 호환성을 지원하기 위해 존재하므로 [AccountKeyLegacy]와 연결된 EOA에서만 작동합니다. 다른 계정 키 유형과 연결된 EOA는 `TxTypeValueTransfer`, `TxTypeSmartContractExecution` 등과 같은 다른 트랜잭션 유형을 사용해야 합니다. 이 트랜잭션 유형은 계정 생성, 토큰 전송, 스마트 컨트랙트 배포/실행 또는 앞서 언급한 여러 가지를 혼합하여 수행할 수 있습니다.

:::note

Kaia 네트워크는 이 트랜잭션 유형을 `EthTxTypeCompatibleBlock` 이후에 처리할 수 있습니다.

:::

:::note

참고: 이 트랜잭션 유형은 EthereumTransactionType 형식만 지원합니다. EIP-2930](https\://eips.ethereum.org/EIPS/eip-2930)과 달리 액세스 리스트 사용으로 인한 트랜잭션 수수료 측면의 혜택은 없습니다.

:::

### 속성 <a id="attributes"></a>

| 속성         | 유형                                                                                 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :--------- | :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | uint8 (Go)                                                      | `EthereumTxTypeEnvelope`와 `EthereumTransactionType`을 연결한 `TxTypeEthereumAccessList`의 유형입니다. 이 값은 0x7801이어야 합니다.                                                                                                                                                                                                                                                                              |
| chainId    | \*big.Int (Go)                                  | 대상 체인 ID입니다.                                                                                                                                                                                                                                                                                                                                                                                                 |
| nonce      | uint64 (Go)                                                     | 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 발신자가 동일한 nonce를 가진 두 개의 트랜잭션을 생성한 경우 하나만 실행됩니다.                                                                                                                                                                                                                                                                                                            |
| gasPrice   | \*big.Int (Go)                                  | 발신자가 토큰으로 지불할 금액을 얻기 위한 승수입니다. 발신자가 지불할 토큰의 양은 `gas` \* `gasPrice`를 통해 계산됩니다. 예를 들어, 가스값이 10이고 가스가격이 10^18이면 발신자는 트랜잭션 수수료로 10 KAIA를 지불하게 됩니다. KAIA 단위](../../learn/token-economics/kaia-native-token.md#units-of-kaia)를 참조하세요. |
| gas        | uint64 (Go)                                                     | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                                                                                                                                                                                                                                                                            |
| to         | \*common.Address (Go)                           | 이체된 값을 받을 계좌 주소입니다.                                                                                                                                                                                                                                                                                                                                                                                          |
| value      | \*big.Int (Go)                                  | 이체할 `peb` 단위의 KAIA 금액입니다.                                                                                                                                                                                                                                                                                                                                                                                    |
| data       | []byte (Go) | 트랜잭션 실행에 사용되는 트랜잭션에 첨부된 데이터입니다.                                                                                                                                                                                                                                                                                                                                                                              |
| accessList | type.AccessList (Go)                            | [](common.Address, []common.Hash)로 구성된 주소 및 저장키 목록입니다.                                                                                                                                                                                            |
| v, r, s    | \*big.Int (Go)                                  | 수신자가 발신자의 주소를 얻을 수 있도록 발신자가 생성한 암호화 서명입니다.                                                                                                                                                                                                                                                                                                                                                                   |

### 서명을 위한 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

이 트랜잭션 유형에 대한 서명을 만들기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

:::note

이러한 유형의 거래는 London 서명자로 서명해야 합니다.

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash용 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

이 트랜잭션 유형에 대한 `SenderTxHash`를 얻기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### 트랜잭션 해시를 위한 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

트랜잭션 해시를 만들기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### Raw 트랜잭션 <a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
```

### RLP 인코딩 (예제) <a id="rlp-encoding-example"></a>

다음은 RLP 직렬화 결과와 트랜잭션 객체를 보여줍니다:

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

### RPC 출력 (예제) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 객체를 보여줍니다.

`eth_getTransactionByHash`의 반환값입니다.

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

`klay_getTransactionByHash`의 반환값입니다.

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

`TxTypeEthereumDynamicFee`는 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)에 명시된 이더리움 트랜잭션의 유형을 나타냅니다. 이 트랜잭션 유형에는 `gasPrice` 대신 `gasTipCap`과 `gasFeeCap`이 포함됩니다. 이 트랜잭션 유형은 호환성을 지원하기 위해 존재하므로, [AccountKeyLegacy]와 연결된 EOA에서만 작동합니다. 다른 계정 키 유형과 연결된 EOA는 `TxTypeValueTransfer`, `TxTypeSmartContractExecution` 등과 같은 다른 트랜잭션 유형을 사용해야 합니다. 이러한 유형의 트랜잭션은 계정 생성, 토큰 전송, 스마트 컨트랙트 배포/실행 또는 앞서 언급한 여러 가지를 혼합하여 수행할 수 있습니다.

:::note

참고: Kaia 네트워크는 이 트랜잭션 유형을 `EthTxTypeCompatibleBlock` 이후에 처리할 수 있습니다.

:::

:::note

현재 이 트랜잭션 유형은 EthereumTransactionType 형식만 지원합니다. [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)과 달리 액세스 리스트 사용으로 인한 트랜잭션 수수료 혜택은 없습니다.

:::

:::note

참고: Kaia는 가스 가격이 고정되어 있으므로, `gasTipCap`과 `gasFeeCap`은 해당 네트워크의 가스 가격(현재 250 ston)을 사용해야 합니다.

:::

### 속성 <a id="attributes"></a>

| 속성         | 유형                                                                                 | 설명                                                                                                                                                                                                                                          |
| :--------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type       | uint8 (Go)                                                      | `TxTypeEthereumDynamicFee`의 유형으로, `EthereumTxTypeEnvelope`와 `EthereumTransactionType`을 연결한 것입니다. 반드시 `0x7802`여야 합니다.                                                                                        |
| chainId    | \*big.Int (Go)                                  | 대상 체인 ID입니다.                                                                                                                                                                                                                |
| nonce      | uint64 (Go)                                                     | 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 발신자가 동일한 nonce를 가진 두 개의 트랜잭션을 생성한 경우 하나만 실행됩니다.                                                                                                                           |
| gasTipCap  | \*big.Int (Go)                                  | 발신자가 `baseFee`에 추가로 지불할 금액을 얻기 위한 승수입니다. Kaia는 가스 가격이 고정되어 있기 때문에 `gasTipCap`과 `gasFeeCap`은 해당 네트워크의 가스 가격(현재 250 ston)을 가져와야 합니다.                                                       |
| gasFeeCap  | \*big.Int (Go)                                  | 발신자가 토큰으로 지불할 금액을 얻기 위한 승수입니다. 발신자가 지불할 토큰의 양은 `gas` \* `gasFeeCap`을 통해 계산됩니다. Kaia는 가스 가격이 고정되어 있기 때문에 `gasTipCap`과 `gasFeeCap`은 해당 네트워크의 가스 가격(현재 250 ston)을 가져와야 합니다. |
| gas        | uint64 (Go)                                                     | 트랜잭션이 사용할 수 있는 트랜잭션 수수료의 최대 금액입니다.                                                                                                                                                                                          |
| to         | \*common.Address (Go)                           | 이체된 값을 받을 계정 주소입니다.                                                                                                                                                                                                         |
| value      | \*big.Int (Go)                                  | 이체할 `peb` 단위의 KAIA 금액입니다.                                                                                                                                                                                                   |
| data       | []byte (Go) | 트랜잭션 실행에 사용되는 트랜잭션에 첨부된 데이터입니다.                                                                                                                                                                                             |
| accessList | type.AccessList (Go)                            | [](common.Address, []common.Hash)로 구성된 주소 및 저장키 목록입니다.           |
| v, r, s    | \*big.Int (Go)                                  | 수신자가 발신자의 주소를 얻을 수 있도록 발신자가 생성한 암호화 서명입니다.                                                                                                                                                                                  |

### 서명을 위한 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

이 트랜잭션 유형에 대한 서명을 만들기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

:::note

이러한 유형의 거래는 London 서명자로 서명해야 합니다.

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash용 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

이 트랜잭션 유형에 대한 `SenderTxHash`를 얻기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### 트랜잭션 해시를 위한 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

트랜잭션 해시를 얻기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### Raw 트랜잭션 <a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
```

### RLP 인코딩 (예제) <a id="rlp-encoding-example"></a>

다음은 RLP 직렬화 결과와 트랜잭션 객체를 보여줍니다:

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

### RPC 출력 (예제) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 객체를 보여줍니다.

`eth_getTransactionByHash`의 반환값입니다.

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

`klay_getTransactionByHash`의 반환값입니다.

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

## Tx타입이더리움블롭 <a id="txtypeethereumblob"></a>

'TxTypeEthereumBlob'은 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) 및 [KIP-279](https://kips.kaia.io/KIPs/kip-279)에 명시된 이더리움 트랜잭션 유형을 나타냅니다. 이 트랜잭션 유형은 바이너리 대용량 객체(블롭)의 데이터를 전달하여 Kaia의 레이어 2 롤업을 위한 비용 효율적인 데이터 가용성 계층을 제공합니다. 블롭 데이터를 영구 콜데이터 스토리지에서 분리함으로써 롤업은 독립적인 블롭 요금 시장을 통해 더 저렴한 비용으로 데이터를 게시할 수 있습니다. 블롭 데이터 자체는 EVM에서 액세스할 수 없으며, `blobVersionedHashes` 커밋만 온체인에서 액세스할 수 있습니다. 이 트랜잭션 유형은 호환성을 지원하기 위해 존재하므로 [AccountKeyLegacy]와 연결된 EOA에서만 작동합니다. 이 트랜잭션 유형은 컨트랙트를 생성하는 데 사용할 수 없으며, 'to' 필드가 0이 아니어야 합니다.

:::note

카이아 네트워크는 '오사카 호환 블록' 이후 이 트랜잭션 유형을 처리할 수 있습니다.

:::

:::note

Kaia의 블롭 가스 파라미터는 1초 블록에 맞게 조정됩니다. 블록당 하나의 블롭\*\*만 허용됩니다. EIP-7594](https://eips.ethereum.org/EIPS/eip-7594) 사이드카 형식(V1)만 허용되며, V0 사이드카는 거부됩니다. 블롭 사이드카는 1,814,400블록(~21일) 동안 유지됩니다.

:::

:::note

eth_sendRawTransaction`은 사이드카가 있는 전체 블롭 트랜잭션(`BlobTxWithBlobs`)을 필요로 합니다. 블로브 버전 해시`는 버전 접두사 `0x01`을 사용해야 합니다.

:::

### 속성 <a id="attributes"></a>

| 속성                  | 유형                                                                                                                | 설명                                                                                                                                                                                                                                    |
| :------------------ | :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 유형                  | uint8 \(Go\)                                                                                 | 이더리움 트랜잭션 유형은 '이더리움 트랜잭션 유형'과 '이더리움 트랜잭션 유형'을 연결한 `TxTypeEthereumBlob`의 유형입니다. '0x7803'이어야 합니다.                                                                                                       |
| 체인아이디               | \*big.Int \(Go\)                                                             | 대상 체인 ID입니다.                                                                                                                                                                                                          |
| nonce               | uint64 \(Go\)                                                                                | 발신자의 거래를 고유하게 식별하는 데 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성한 경우, 하나만 실행됩니다.                                                                                                                         |
| 최대 우선순위 수수료 가스당     | \*big.Int \(Go\)                                                             | 발신자가 'baseFee'에 추가로 지불할 금액을 얻기 위한 승수입니다. Kaia는 가스 가격이 고정되어 있으므로 각 네트워크의 가스 가격을 적용해야 합니다.                                                                                                              |
| 최대 가스당 수수료          | \*big.Int \(Go\)                                                             | 발신자가 가스 단위당 지불할 의사가 있는 최대 금액입니다. Kaia는 가스 가격이 고정되어 있으므로 각 네트워크의 가스 가격을 적용해야 합니다.                                                                                                                      |
| 가스                  | uint64 \(Go\)                                                                                | 거래에 사용할 수 있는 최대 거래 수수료 금액입니다.                                                                                                                                                                                         |
| 에                   | \*공통 주소 \(이동\)                                                                               | 송금된 금액을 받을 계정 주소입니다. 0이 아니어야 합니다 - 블롭 트랜잭션은 컨트랙트를 생성할 수 없습니다.                                                                                                                                         |
| 값                   | \*big.Int \(Go\)                                                             | 전송할 `kei`의 KAIA 금액입니다.                                                                                                                                                                                                |
| 데이터                 | \[\]바이트 \(Go\)                         | 트랜잭션 실행에 사용되는 트랜잭션에 첨부된 데이터입니다.                                                                                                                                                                                       |
| accessList          | type.AccessList \(Go\)                                                       | 주소 및 저장 키 목록 \[\](common.Address, []common.Hash)로 구성됩니다. |
| 최대 수수료당 블롭 가스       | \*big.Int \(Go\)                                                             | 발신자가 지불할 의사가 있는 블롭 가스 단위당 최대 수수료입니다. 블롭 가스는 일반 가스와 독립적으로 가격이 책정됩니다.                                                                                                                                   |
| blobVersionedHashes | \[\]common.Hash \(Go\) | 이 트랜잭션과 관련된 블롭의 버전이 지정된 해시 목록입니다. 각 해시는 버전 접두사 '0x01'을 사용해야 합니다. 하나 이상의 해시가 필요합니다.                                                                                                    |
| V, R, S             | \*big.Int \(Go\)                                                             | 수신자가 발신자의 주소를 얻을 수 있도록 발신자가 생성한 암호화 서명입니다.                                                                                                                                                                            |

### 서명을 위한 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

이 트랜잭션 유형에 대한 서명을 만들기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

:::note

이러한 유형의 거래는 오사카 서명자로 서명해야 합니다.

:::

```javascript
SigRLP = 이더리움 트랜잭션 유형 || encode([체인아이디, 논스, 최대 우선순위 수수료 가스, 최대 수수료 가스, 가스 제한, to, 값, 데이터, 액세스 목록, 최대 수수료 블롭 가스, 블롭 버전 해시])
SigHash = keccak256(SigRLP)
서명 = sign(SigHash, <private key>)
```

### SenderTxHash용 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

이 트랜잭션 유형에 대한 `SenderTxHash`를 얻기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

```javascript
SenderTxHashRLP = 이더리움 트랜잭션 유형 || encode([체인아이디, 논스, 최대 우선순위 수수료, 최대 수수료 가스, 가스 제한, to, 값, 데이터, 액세스 목록, 최대 수수료 블롭 가스, 블롭 버전 해시, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 트랜잭션 해시용 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

트랜잭션 해시를 얻기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

```javascript
TxHashRLP = 이더리움 트랜잭션 유형 || encode([체인아이디, 논스, 최대우선순위수수료, 최대수수료가스, 가스제한, to, 값, 데이터, 접근목록, 최대수수료블롭가스, 블롭버전드해시, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 원시 트랜잭션 <a id="raw-transaction"></a>

```javascript
RawTx = 이더리움 트랜잭션 유형 엔벨로프 || 이더리움 트랜잭션 유형 || encode([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes, v, r, s]))
```

이더리움 트랜잭션\`을 통해 제출할 때는 사이드카를 포함한 전체 네트워크 표현을 제공해야 합니다:

```javascript
BlobTxWith블롭 = rlp([트랜잭션페이로드바디, 사이드카_버전, 블롭, 커미트먼트, 증명])
```

여기서 '사이드카_버전'은 EIP-7594에 따라 '0x01'입니다.

### RLP 인코딩 \(예제\) <a id="rlp-encoding-example"></a>

다음은 RLP 직렬화 결과와 트랜잭션 객체를 보여줍니다:

```javascript
    TX(b4687ea17a0908a4dce2d83f8c2566881474b9da30ee8b8979b028778761c9d7)
    계약: false
    체인드:   0x3e9
    발신자     0a3fa1b8fbdaeabcd2a7cb13abb87e8d1bd0a3b5
    To: a9ef4a5bfb21e92c06da23ed79294dab11f5a6df
    Nonce: 366
    GasTipCap: 0x0
    GasFeeCap: 0xba43b7400
    GasLimit 0xc350
    Value: 0x0
    Data:     0xd09de08a
    AccessList: []
    MaxFeePerBlobGas: 0x5d21dba000
    BlobVersionedHashes: [016f2dec5826dba2b8071deb0fba09244486cc4f9b981fe26396bc3206d2a8d7]
    V: 0x1
    R:        0x4b6905c3f0637363857626004b2367caa5e1d4c60fa3091a058ddbfef34e30ff
    S: 0x659b7ede7f3439a3f07958abe448c25ddfc0ba0b530bff60356552484a854916
    Hex:      7803f8978203e982016e80850ba43b740082c35094a9ef4a5bfb21e92c06da23ed79294dab11f5a6df8084d09de08ac0855d21dba000e1a0016f2dec5826dba2b8071deb0fba09244486cc4f9b981fe26396bc3206d2a8d701a04b6905c3f0637363857626004b2367caa5e1d4c60fa3091a058ddbfef34e30ffa0659b7ede7f3439a3f07958abe448c25ddfc0ba0b530bff60356552484a854916
```

### RPC 출력 \(예제\) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 객체를 보여줍니다.

에셋_겟트랜잭션바이해시\` 반환값

```javascript
{
  "blockHash": "0x1683db8c05f898cd9084a8905b3fa2a64b1380b6543e963ea15d2858b241c339",
  "blockNumber": "0xc77238e",
  "from": "0x0a3fa1b8fbdaeabcd2a7cb13abb87e8d1bd0a3b5",
  "gas": "0xc350",
  "gasPrice": "0x5d21dba00",
  "maxFeePerGas": "0xba43b7400",
  "maxPriorityFeePerGas": "0x0",
  "maxFeePerBlobGas": "0x5d21dba000",
  "해시": "0xb4687ea17a0908a4dce2d83f8c2566881474b9da30ee8b8979b028778761c9d7",
  "input": "0xd09de08a",
  "nonce": "0x16e",
  "to": "0xa9ef4a5bfb21e92c06da23ed79294dab11f5a6df",
  "트랜잭션인덱스": "0x0",
  "value": "0x0",
  "type": "0x3",
  "accessList": [],
  "chainId": "0x3e9",
  "blobVersionedHashes": [
      "0x016f2dec5826dba2b8071deb0fba09244486cc4f9b981fe26396bc3206d2a8d7"
  ],
  "v": "0x1",
  "r": "0x4b6905c3f0637363857626004b2367caa5e1d4c60fa3091a058ddbfef34e30ff",
  "s": "0x659b7ede7f3439a3f07958abe448c25ddfc0ba0b530bff60356552484a854916"
}
```

카이아_겟트랜잭션바이해시\`의 반환값은 다음과 같습니다.

```javascript
{
  "accessList": [],
  "blobVersionedHashes": [
      "0x016f2dec5826dba2b8071deb0fba09244486cc4f9b981fe26396bc3206d2a8d7"
  ],
  "blockHash": "0x1683db8c05f898cd9084a8905b3fa2a64b1380b6543e963ea15d2858b241c339",
  "blockNumber": "0xc77238e",
  "chainId": "0x3e9",
  "from": "0x0a3fa1b8fbdaeabcd2a7cb13abb87e8d1bd0a3b5",
  "gas": "0xc350",
  "gasPrice": "0x5d21dba00",
  "해시": "0xb4687ea17a0908a4dce2d83f8c2566881474b9da30ee8b8979b028778761c9d7",
  "input": "0xd09de08a",
  "maxFeePerBlobGas": "0x5d21dba000",
  "maxFeePerGas": "0xba43b7400",
  "maxPriorityFeePerGas": "0x0",
  "nonce": "0x16e",
  "senderTxHash": "0xb4687ea17a0908a4dce2d83f8c2566881474b9da30ee8b8979b028778761c9d7",
  "signatures": [
      {
          "V": "0x1",
          "R": "0x4b6905c3f0637363857626004b2367caa5e1d4c60fa3091a058ddbfef34e30ff",
          "S": "0x659b7ede7f3439a3f07958abe448c25ddfc0ba0b530bff60356552484a854916"
      }
  ],
  "to": "0xa9ef4a5bfb21e92c06da23ed79294dab11f5a6df",
  "트랜잭션인덱스": "0x0",
  "type": "TxTypeEthereumBlob",
  "typeInt": 30723,
  "value": "0x0"
}
```

## Tx타입이더리움세트코드 <a id="txtypeethereumsetcode"></a>

'TxTypeEthereumSetCode'는 [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 및 [KIP-228](https://kips.kaia.io/KIPs/kip-228)에 명시된 이더리움 트랜잭션 유형을 나타냅니다. 이 트랜잭션 유형은 이미 존재하는 EOA에 계정 추상화 기능을 허용하여 사용자 경험을 개선합니다. 이전에는 스마트 계정 기능을 원하는 EOA 소유자는 스마트 계정을 새로 만들고 모든 자산과 권한을 마이그레이션해야 했습니다. SetCode 트랜잭션을 사용하면 사용자가 기존 EOA에 코드를 그대로 첨부할 수 있으므로 비용이 많이 드는 마이그레이션이 필요하지 않습니다. 권한 부여 목록`은 코드가 설정되어야 하는 계정이 서명한 `(체인아이디, 주소, 논스)\` 튜플 목록을 지정하여 일괄 거래, 가스 후원, 범위 위임과 같은 패턴을 가능하게 합니다. 위임은 다른 SetCode 트랜잭션에 의해 명시적으로 변경되거나 제거될 때까지 유지됩니다. 이 트랜잭션 유형은 호환성을 지원하기 위해 존재하므로 [AccountKeyLegacy]와 연결된 EOA에서만 작동합니다. 이 트랜잭션 유형은 컨트랙트 생성에 사용할 수 없으며, '대상' 필드가 0이 아니어야 합니다.

:::note

카이아 네트워크는 이 트랜잭션 유형을 `PragueCompatibleBlock` 이후에 처리할 수 있습니다.

:::

:::note

계정 키 레거시`가 있는 EOA만 권한 부여 튜플을 통해 코드를 할당할 수 있습니다. 다른 키 유형을 가진 계정을 참조하는 권한 부여 튜플은 건너뜁니다. EOA에 코드가 설정되면 표준 `TxTypeValueTransfer`트랜잭션은 이를 대상으로 할 수 없으며,`TxTypeAccountUpdate\` 트랜잭션은 이로부터 시작될 수 없습니다.

:::

:::note

EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)에 명시된 대로, 각 인증 튜플은 `keccak256(MAGIC || rlp([chainId, 주소, nonce]))`를 통해 독립적으로 서명되며, 여기서 `MAGIC = 0x05`입니다. 하나 이상의 인증 튜플이 필요합니다.

:::

### 속성 <a id="attributes-1"></a>

| 속성              | 유형                                                                                          | 설명                                                                                                                                                                                                                                    |
| :-------------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 유형              | uint8 \(Go\)                                                           | 이더리움 트랜잭션 유형은 '이더리움 트랜잭션 유형'과 '이더리움 트랜잭션 유형'을 연결한 `TxTypeEthereumSetCode`의 유형입니다. '0x7804'여야 합니다.                                                                                                     |
| 체인아이디           | \*big.Int \(Go\)                                       | 대상 체인 ID입니다.                                                                                                                                                                                                          |
| nonce           | uint64 \(Go\)                                                          | 발신자의 거래를 고유하게 식별하는 데 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성한 경우, 하나만 실행됩니다.                                                                                                                         |
| 최대 우선순위 수수료 가스당 | \*big.Int \(Go\)                                       | 발신자가 `기본 수수료`에 추가로 지불할 금액을 얻기 위한 승수입니다. Kaia는 가스 가격이 고정되어 있으므로 각 네트워크의 가스 가격을 적용해야 합니다.                                                                                                               |
| 최대 가스당 수수료      | \*big.Int \(Go\)                                       | 발신자가 가스 단위당 지불할 의사가 있는 최대 금액입니다. Kaia는 가스 가격이 고정되어 있으므로 각 네트워크의 가스 가격을 적용해야 합니다.                                                                                                                      |
| 가스              | uint64 \(Go\)                                                          | 거래에 사용할 수 있는 최대 거래 수수료 금액입니다.                                                                                                                                                                                         |
| 목적지             | \*공통 주소 \(이동\)                                                         | 송금된 금액을 받을 계정 주소입니다. 0이 아니어야 합니다 - SetCode 트랜잭션은 컨트랙트를 생성할 수 없습니다.                                                                                                                                    |
| 값               | \*big.Int \(Go\)                                       | 전송할 `kei`의 KAIA 금액입니다.                                                                                                                                                                                                |
| 데이터             | \[\]바이트 \(Go\)   | 트랜잭션 실행에 사용되는 트랜잭션에 첨부된 데이터입니다.                                                                                                                                                                                       |
| accessList      | type.AccessList \(Go\)                                 | 주소 및 저장 키 목록 \[\](common.Address, []common.Hash)로 구성됩니다. |
| 권한 부여 목록        | \[\]권한 부여 \(이동\) | 인증 튜플의 목록으로, 각 튜플은 `[체인아이디, 주소, 논스, 와이패리티, r, s]` 형식이며, 여기서 `주소`는 서명 권한이 코드를 위임한 컨트랙트이고 튜플은 권한이 서명합니다. 적어도 하나의 튜플이 필요합니다.                                                                             |
| V, R, S         | \*big.Int \(Go\)                                       | 수신자가 발신자의 주소를 얻을 수 있도록 발신자가 생성한 암호화 서명입니다.                                                                                                                                                                            |

### 서명을 위한 RLP 인코딩 <a id="rlp-encoding-for-signature-1"></a>

이 트랜잭션 유형에 대한 서명을 만들기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

:::note

이러한 유형의 거래는 프라하 서명자로 서명해야 합니다.

:::

```javascript
SigRLP = 이더리움 트랜잭션 유형 || encode([체인아이디, 논스, 최대 우선순위 수수료 가스당, 최대 수수료 가스당, 가스 제한, 대상, 값, 데이터, 액세스 목록, 승인 목록])
SigHash = keccak256(SigRLP)
서명 = 서명(SigHash, <private key>)입니다.
```

권한 부여 목록\` 내의 각 권한 부여 튜플은 독립적으로 서명됩니다:

```javascript
AuthSigRLP = MAGIC || encode([chainId, address, nonce]) // MAGIC = 0x05
AuthSigHash = keccak256(AuthSigRLP)
AuthSignature = sign(AuthSigHash, <authority private key>)
```

### SenderTxHash용 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash-1"></a>

이 트랜잭션 유형에 대한 `SenderTxHash`를 얻기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

```javascript
SenderTxHashRLP = 이더리움 트랜잭션 유형 || encode([체인아이디, 논스, 최대 우선순위 수수료, 최대 수수료, 가스 제한, 대상, 값, 데이터, 액세스 목록, 권한 부여 목록, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 트랜잭션 해시용 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash-1"></a>

트랜잭션 해시를 얻기 위해 RLP 직렬화는 다음과 같이 진행됩니다:

```javascript
TxHashRLP = 이더리움 트랜잭션 유형 || encode([체인아이디, 논스, 최대 우선순위 수수료, 최대 수수료, 가스 제한, 대상, 값, 데이터, 액세스 목록, 권한 부여 목록, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### 원시 거래 <a id="raw-transaction-1"></a>

```javascript
RawTx = 이더리움 트랜잭션 유형 봉투 || 이더리움 트랜잭션 유형 || 인코딩([체인아이디, 논스, 최대 우선순위 수수료, 최대 수수료, 가스 제한, 대상, 값, 데이터, 액세스 목록, 권한 부여 목록, v, r, s])
```

### RLP 인코딩 \(예제\) <a id="rlp-encoding-example-1"></a>

다음은 RLP 직렬화 결과와 트랜잭션 객체를 보여줍니다:

```javascript
    TX(383aafe58842af80cc63747b78181439cc8b1786b70fedfd86d966b1ea728da1)
    계약: false
    체인드:   0x3e9
    From:     698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce
    받는 사람:       698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce
    논스: 29
    가스 팁 캡: 0x0
    가스 수수료 캡: 0x6fc23ac00
    가스 제한 0x186a0
    값: 0x0
    데이터:     0x8129fc1c
    AccessList: []
    AuthorizationList: [{ChainID: 0x3e9, Address: 5FA0193098ECBBAD437243FE0ED77A402CD62242, Nonce: 30}]
    V: 0x1
    R: 0x77b03c8fd556255dff1f7af72e7a9a8f081e1da9daeb09800d139bf22f22708e
    S: 0x26b7d4762db258e596382de1416753c65ca8e3b0855e8276eecf22d019af2805
    Hex:      7804f8ce8203e91d808506fc23ac00830186a094698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce80848129fc1cc0f85ef85c8203e9945fa0193098ecbbad437243fe0ed77a402cd622421e01a0a21df3fb047c656d5046ae6b5ea81743c047b281b07591f742a13606f09c4969a01494cb06d71cbaa002d669ff63e1d0044bb5d06a00ca550a103ac0287789614a01a077b03c8fd556255dff1f7af72e7a9a8f081e1da9daeb09800d139bf22f22708ea026b7d4762db258e596382de1416753c65ca8e3b0855e8276eecf22d019af2805
```

### RPC 출력 \(예제\) <a id="rpc-output-example-1"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 객체를 보여줍니다.

에셋_겟트랜잭션바이해시\` 반환값

```javascript
{
  "blockHash": "0xb76e4a38c1311159ed6fe704f4b220294589accf1c5ec440a471fd4201c6c968",
  "blockNumber": "0xb35bcdd",
  "from": "0x698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce",
  "gas": "0x186a0",
  "gasPrice": "0x5d21dba00",
  "maxFeePerGas": "0x6fc23ac00",
  "maxPriorityFeePerGas": "0x0",
  "해시": "0x383aafe58842af80cc63747b78181439cc8b1786b70fedfd86d966b1ea728da1",
  "input": "0x8129fc1c",
  "nonce": "0x1d",
  "to": "0x698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce",
  "transactionIndex": "0x0",
  "value": "0x0",
  "type": "0x4",
  "accessList": [],
  "chainId": "0x3e9",
  "authorizationList": [
      {
          "chainId": "0x3e9",
          "주소": "0x5fa0193098ecbbad437243fe0ed77a402cd62242",
          "nonce": "0x1e",
          "y패리티": "0x1",
          "r": "0xa21df3fb047c656d5046ae6b5ea81743c047b281b07591f742a13606f09c4969",
          "s": "0x1494cb06d71cbaa002d669ff63e1d0044bb5d06a00ca550a103ac0287789614a"
      }
  ],
  "v": "0x1",
  "r": "0x77b03c8fd556255dff1f7af72e7a9a8f081e1da9daeb09800d139bf22f22708e",
  "s": "0x26b7d4762db258e596382de1416753c65ca8e3b0855e8276eecf22d019af2805"
}
```

카이아_겟트랜잭션바이해시\` 반환값

```javascript
{
  "accessList": [],
  "authorizationList": [
      {
          "chainId": "0x3e9",
          "주소": "0x5fa0193098ecbbad437243fe0ed77a402cd62242",
          "nonce": "0x1e",
          "y패리티": "0x1",
          "r": "0xa21df3fb047c656d5046ae6b5ea81743c047b281b07591f742a13606f09c4969",
          "s": "0x1494cb06d71cbaa002d669ff63e1d0044bb5d06a00ca550a103ac0287789614a"
      }
  ],
  "blockHash": "0xb76e4a38c1311159ed6fe704f4b220294589accf1c5ec440a471fd4201c6c968",
  "blockNumber": "0xb35bcdd",
  "chainId": "0x3e9",
  "from": "0x698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce",
  "gas": "0x186a0",
  "gasPrice": "0x5d21dba00",
  "해시": "0x383aafe58842af80cc63747b78181439cc8b1786b70fedfd86d966b1ea728da1",
  "input": "0x8129fc1c",
  "maxFeePerGas": "0x6fc23ac00",
  "maxPriorityFeePerGas": "0x0",
  "nonce": "0x1d",
  "senderTxHash": "0x383aafe58842af80cc63747b78181439cc8b1786b70fedfd86d966b1ea728da1",
  "signatures": [
      {
          "V": "0x1",
          "R": "0x77b03c8fd556255dff1f7af72e7a9a8f081e1da9daeb09800d139bf22f22708e",
          "S": "0x26b7d4762db258e596382de1416753c65ca8e3b0855e8276eecf22d019af2805"
      }
  ],
  "to": "0x698f9bd1a4fc200f8d0c7997810e02a77ca6d5ce",
  "트랜잭션인덱스": "0x0",
  "type": "TxTypeEthereumSetCode",
  "typeInt": 30724,
  "value": "0x0"
}
```
