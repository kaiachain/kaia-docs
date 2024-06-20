# 이더리움 호환성

카이아는 이더리움 호환성을 지원하기 위해 랩드 트랜잭션 타입을 제공합니다. 카이아의 이더리움 트랜잭션 타입은 `EthereumTxTypeEnvelope`라는 단일 바이트 타입 구분자를 제외하고는 이더리움의 설계와 동일한 속성과 RLP 인코딩 스키마를 가지고 있습니다. 따라서 사용자는 이더리움 개발 도구에서 생성한 트랜잭션을 카이아에 성공적으로 배포할 수 있습니다. 사용자가 `eth` 네임스페이스 API를 사용할 때도 타입 구분자는 생략되므로 이더리움을 사용하는 것처럼 카이아를 사용할 수 있습니다. 사용자는 `klay` 네임스페이스 API를 사용하면 기존 카이아 트랜잭션 유형과 혼동하지 않고 이더리움 형식의 트랜잭션을 카이아 트랜잭션의 한 유형으로 배포하고 조회할 수 있습니다.

## EthereumTxTypeEnvelope <a id="ethereumtxtypeenvelope"></a>

EthereumTxTypeEnvelope는 EthereumTransactionType을 나타내는 Raw 트랜잭션의 1바이트 접두사입니다. 이더리움은 [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)의 확장 가능한 트랜잭션 유형 체계를 채택했으며, 이는 Kaia와 상충되는 유형 번호 체계를 사용합니다. 서로 다른 두 트랜잭션 타입 체계 간의 충돌을 해결하기 위해 Kaia는 향후 이더리움 트랜잭션 타입을 분리 및 확장할 수 있는 `EthereumTxTypeEnvelope`를 도입했습니다.

`EthereumTxTypeEnvelope`는 추가 유형 구분자이며, Raw 트랜잭션과 유형 번호 지정에만 사용됩니다. 트랜잭션 해시나 서명 해시에는 사용되지 않습니다. 이를 위해 EIP에 정의된 `EthereumTransactionType`이 사용됩니다.

- EthereumTxTypeEnvelope: `0x78`
- TxHashRLP : EthereumTransactionType || TransactionPayload
- RawTransaction : EthereumTxTypeEnvelope || EthereumTransactionType || TransactionPayload

## TxTypeEthereumAccessList <a id="txtypeethereumaccesslist"></a>

`TxTypeEthereumAccessList`는 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)에 명시된 이더리움 트랜잭션의 유형을 나타냅니다. 이 트랜잭션 유형에는 액세스 목록, 트랜잭션이 액세스해야 하는 주소 및 저장 키 목록이 포함되어 있습니다. 이 트랜잭션 유형은 호환성을 지원하기 위해 존재하므로 [AccountKeyLegacy]와 연결된 EOA에서만 작동합니다. 다른 계정 키 유형과 연결된 EOA는 `TxTypeValueTransfer`, `TxTypeSmartContractExecution` 등과 같은 다른 트랜잭션 유형을 사용해야 합니다. 이 트랜잭션 유형은 계정 생성, 토큰 전송, 스마트 컨트랙트 배포/실행 또는 앞서 언급한 여러 가지를 혼합하여 수행할 수 있습니다.

:::note

카이아 네트워크는 이 트랜잭션 유형을 `EthTxTypeCompatibleBlock` 이후에 처리할 수 있습니다.

:::

:::note

참고: 이 트랜잭션 유형은 EthereumTransactionType 형식만 지원합니다. EIP-2930](https\://eips.ethereum.org/EIPS/eip-2930)과 달리 액세스 리스트 사용으로 인한 트랜잭션 수수료 측면의 혜택은 없습니다.

:::

### 속성 <a id="attributes"></a>

| 속성         | 유형                                                                                 | 설명                                                                                                                                                                                                                                                                                   |
| :--------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | uint8 (Go)                                                      | `EthereumTxTypeEnvelope`와 `EthereumTransactionType`을 연결한 `TxTypeEthereumAccessList`의 유형입니다. 이 값은 0x7801이어야 합니다.                                                                                                                                      |
| chainId    | \*big.Int (Go)                                  | 대상 체인 ID입니다.                                                                                                                                                                                                                                                         |
| nonce      | uint64 (Go)                                                     | 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 발신자가 동일한 nonce를 가진 두 개의 트랜잭션을 생성한 경우 하나만 실행됩니다.                                                                                                                                                                    |
| gasPrice   | \*big.Int (Go)                                  | 발신자가 토큰으로 지불할 금액을 얻기 위한 승수입니다. 발신자가 지불할 토큰의 양은 `gas` \* `gasPrice`를 통해 계산됩니다. 예를 들어, 가스값이 10이고 가스가격이 10^18이면 발신자는 트랜잭션 수수료로 10 KAIA를 지불하게 됩니다. [KLAY 단위]를 참고하세요. |
| gas        | uint64 (Go)                                                     | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                                                                                                                                    |
| to         | \*common.Address (Go)                           | 이체된 값을 받을 계좌 주소입니다.                                                                                                                                                                                                                                                  |
| value      | \*big.Int (Go)                                  | 이체할 `peb` 단위의 KAIA 금액입니다.                                                                                                                                                                                                                                            |
| data       | []byte (Go) | 트랜잭션 실행에 사용되는 트랜잭션에 첨부된 데이터입니다.                                                                                                                                                                                                                                      |
| accessList | type.AccessList (Go)                            | [](common.Address, []common.Hash)로 구성된 주소 및 저장키 목록입니다.                                                    |
| v, r, s    | \*big.Int (Go)                                  | 수신자가 발신자의 주소를 얻을 수 있도록 발신자가 생성한 암호화 서명입니다.                                                                                                                                                                                                                           |

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

참고: 카이아 네트워크는 이 트랜잭션 유형을 `EthTxTypeCompatibleBlock` 이후에 처리할 수 있습니다.

:::

:::note

현재 이 트랜잭션 유형은 EthereumTransactionType 형식만 지원합니다. [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)과 달리 액세스 리스트 사용으로 인한 트랜잭션 수수료 혜택은 없습니다.

:::

:::note

참고: 카이아는 가스 가격이 고정되어 있으므로, `gasTipCap`과 `gasFeeCap`은 해당 네트워크의 가스 가격(현재 250 ston)을 사용해야 합니다.

:::

### 속성 <a id="attributes"></a>

| 속성         | 유형                                                                                 | 설명                                                                                                                                                                                                                                         |
| :--------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | uint8 (Go)                                                      | `TxTypeEthereumDynamicFee`의 유형으로, `EthereumTxTypeEnvelope`와 `EthereumTransactionType`을 연결한 것입니다. 반드시 `0x7802`여야 합니다.                                                                                       |
| chainId    | \*big.Int (Go)                                  | 대상 체인 ID입니다.                                                                                                                                                                                                               |
| nonce      | uint64 (Go)                                                     | 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 발신자가 동일한 nonce를 가진 두 개의 트랜잭션을 생성한 경우 하나만 실행됩니다.                                                                                                                          |
| gasTipCap  | \*big.Int (Go)                                  | 발신자가 `baseFee`에 추가로 지불할 금액을 얻기 위한 승수입니다. 카이아는 가스 가격이 고정되어 있기 때문에 `gasTipCap`과 `gasFeeCap`은 해당 네트워크의 가스 가격(현재 250 ston)을 가져와야 합니다.                                                       |
| gasFeeCap  | \*big.Int (Go)                                  | 발신자가 토큰으로 지불할 금액을 얻기 위한 승수입니다. 발신자가 지불할 토큰의 양은 `gas` \* `gasFeeCap`을 통해 계산됩니다. 카이아는 가스 가격이 고정되어 있기 때문에 `gasTipCap`과 `gasFeeCap`은 해당 네트워크의 가스 가격(현재 250 ston)을 가져와야 합니다. |
| gas        | uint64 (Go)                                                     | 트랜잭션이 사용할 수 있는 트랜잭션 수수료의 최대 금액입니다.                                                                                                                                                                                         |
| to         | \*common.Address (Go)                           | 이체된 값을 받을 계정 주소입니다.                                                                                                                                                                                                        |
| value      | \*big.Int (Go)                                  | 이체할 `peb` 단위의 KAIA 금액입니다.                                                                                                                                                                                                  |
| data       | []byte (Go) | 트랜잭션 실행에 사용되는 트랜잭션에 첨부된 데이터입니다.                                                                                                                                                                                            |
| accessList | type.AccessList (Go)                            | [](common.Address, []common.Hash)로 구성된 주소 및 저장키 목록입니다.          |
| v, r, s    | \*big.Int (Go)                                  | 수신자가 발신자의 주소를 얻을 수 있도록 발신자가 생성한 암호화 서명입니다.                                                                                                                                                                                 |

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
