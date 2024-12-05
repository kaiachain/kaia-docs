# 클레이튼에서 eth 네임스페이스 API를 사용할 때 주의할 점입니다.

클레이튼은 `eth` 네임스페이스 API를 지원하므로 이더리움 기반 SDK나 툴을 사용하는 개발자는 이제 기존 프로젝트를 클레이튼으로
기존 프로젝트를 클레이튼으로 쉽게 마이그레이션할 수 있습니다.
(예: 이더리움 도구의 엔드포인트 URL을 클레이튼 노드를 가리키도록 바꿀 수 있습니다).

하지만 클레이튼과 이더리움의 근본적인 설계 차이로 인해,
일부 API는 완전히 지원되지 않습니다. (예: 일부 필드는 항상 0 값입니다.)

이 문서에서는 이러한 API의 제한 사항에 대해 설명합니다.

## 블록 헤더 <a id="block_header"></a>

관련 API: [eth_getHeaderByNumber](./block.md#eth_getheaderbynumber), [eth_getHeaderByHash](./block.md#eth_getheaderbyhash).

- 경고: 설명을 주의 깊게 읽어주세요.
- 설명의 :white_check_mark: 아이콘은 해당 필드가 이더리움에서와 같은 방식으로 사용되었음을 나타냅니다.

| 이더리움 헤더 필드       | 클레이튼 헤더 필드                            | 설명                                                                                                                                                                                                                                                                                                          |
| ---------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas    | (추가됨)              | :warning: 이 필드에는 항상 `0x0` 값이 있는데, 이는 클레이튼에 baseFeePerGas 체계가 없기 때문입니다.                                                                                                                                                                                                                                      |
| difficulty       | (추가됨)              | :warning: 이 필드는 클레이튼 헤더에서 `blockScore`에 해당하며, `0x1`로 고정되어 있습니다. 이는 클레이튼의 합의 메커니즘이 작업증명을 기반으로 하지 않기 때문에 블록 난이도라는 기술적 개념이 클레이튼 코어에 적용되지 않기 때문입니다.                                                                                                                                                             |
| extraData        | extraData                             | :warning: 이 필드는 항상 빈 값을 나타내는 `0x` 값을 갖습니다. 클레이튼의 `extraData`에는 검증자 주소, 검증자 서명, 제안자 서명 등의 합의 데이터가 포함되어 있기 때문에 `eth` 네임스페이스 API에는 적용되지 않습니다.                                                                                                                                                                  |
| gasLimit         | (추가됨)              | :warning: 이 필드는 항상 `0xe8d4a50fff`(=`999999999999` 소수점)의 값을 가지며, 이는 클레이튼에 GasLimit이 없기 때문에 임의의 수치입니다. 이 수치는 작성 시점에 [이더리움의 블록 가스 제한](https://ethereum.org/en/developers/docs/gas/#block-size)보다 30배 높은 수치입니다. 자세한 내용은 [연산 비용](../../../learn/computation/computation-cost.md)을 참고하시기 바랍니다. |
| gasUsed          | gasUsed                               | :white_check_mark: 이 블록의 트랜잭션에 사용된 총 가스 양과 같은 scalar 값입니다.                                                                                                                                                                                                        |
|                  | governanceData(생략) | :warning: 이 필드는 이더리움 블록 헤더에 존재하지 않으므로 생략합니다.                                                                                                                                                                                                                                                                |
| hash             | hash                                  | :white_check_mark: 블록의 해시입니다.                                                                                                                                                                                                                                     |
| logsBloom        | logsBloom                             | :white_check_mark: 블록의 로그에 대한 블룸 필터. 보류 중인 블록인 경우 `null`.                                                                                                                                                                                                         |
| miner            | (추가됨)              | :warning: 이 필드는 블록 제안자의 주소를 반환하는데, 클레이튼의 [합의 메커니즘](../../../learn/consensus-mechanism.md)은 채굴자 대신 블록 제안자가 있는 [PBFT](../../../learn/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance)이므로 블록 제안자의 주소가 반환됩니다.                                                                                   |
| mixhash          | (추가됨)              | :warning: 클레이튼의 합의 메커니즘은 작업증명을 기반으로 하지 않기 때문에 이 필드는 항상 zeroHash (`0x00...`)를 갖습니다.                                                                                                                                                                                                       |
| nonce            | (추가됨)              | :warning: 클레이튼의 합의 메커니즘은 작업증명을 기반으로 하지 않기 때문에 이 필드는 항상 zeroNonce(`0x00...`)를 가집니다.                                                                                                                                                                                                       |
| number           | number                                | :white_check_mark: 블록 번호입니다.                                                                                                                                                                                                                                      |
| parentHash       | parentHash                            | :white_check_mark: 상위 블록의 해시입니다.                                                                                                                                                                                                                                  |
| receiptsRoot     | receiptsRoot                          | :white_check_mark: 블록의 영수증 트라이의 루트입니다.                                                                                                                                                                                                                            |
|                  | reward(생략)         | :warning: 이 필드는 이더리움 블록 헤더에 존재하지 않으므로 생략합니다.                                                                                                                                                                                                                                                                |
| sha3Uncles       | (추가됨)              | :warning: 이 필드에는 항상 `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`이 있는데, 이는 클레이튼에 언클 블록이 없기 때문에 빈 블록 헤더가 포함된 목록의 RLP 인코딩된 바이트의 Keccak256 해쉬입니다.                                                                                                                                       |
| size             | size                                  | :white_check_mark: 이 블록의 크기(바이트)입니다.                                                                                                                                                                                                           |
| stateRoot        | stateRoot                             | :white_check_mark: 블록의 최종 상태 트라이의 루트입니다.                                                                                                                                                                                                                          |
| timestamp        | timestamp                             | :white_check_mark: 블록이 콜레이트된 시점의 유닉스 타임스탬프입니다.                                                                                                                                                                                                                    |
|                  | timestampFoS(생략)   | :warning: 이 필드는 이더리움 블록 헤더에 존재하지 않으므로 생략합니다.                                                                                                                                                                                                                                                                |
| totalDifficulty  | (추가됨)              | :warning: 쿼리 블록까지 체인의 총 난이도입니다.                                                                                                                                                                                                                                                                             |
| transactionsRoot | transactionsRoot                      | :white_check_mark: 블록의 트랜잭션 트라이의 루트입니다.                                                                                                                                                                                                                           |

## 블록 <a id="block"></a>

관련 API: [eth_getBlockByHash](./block.md#eth_getblockbyhash), [eth_getBlockByNumber](./block.md#eth_getblockbynumber), [eth_getUncleByBlockHashAndIndex](./block.md#eth_getunclebyblockhashandindex), [eth_getUncleByBlockNumberAndIndex](./block.md#eth_getunclebyblocknumberandindex).

이 섹션에서는 헤더를 제외한 블록의 나머지 필드에 대해 설명합니다.

- 경고: 설명을 주의 깊게 읽어주세요.
- 설명의 :white_check_mark: 아이콘은 해당 필드가 이더리움에서와 같은 방식으로 사용되었음을 나타냅니다.

| 이더리움 헤더 필드   | 클레이튼 헤더 필드                      | 설명                                                                                                          |
| ------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
|              | voteData(생략) | :warning: 이 필드는 이더리움 블록에 존재하지 않으므로 생략합니다.                                                                   |
| uncles       | (추가됨)        | :warning: 클레이튼 코어에는 엉클 블록이라는 기술적 개념이 없기 때문에 이 필드는 항상 `[]` 값을 갖습니다.                                          |
| transactions | transactions                    | :white_check_mark: 트랜잭션 객체의 배열, 또는 마지막 파라미터에 따라 32바이트 트랜잭션 해시입니다. |

## 트랜잭션 <a id="transaction"></a>

관련 API: [eth_getTransactionByHash](./transaction.md#eth_gettransactionbyhash), [eth_getTransactionByBlockHashAndIndex](./transaction.md#eth_gettransactionbyblockhashandindex), [eth_getTransactionByBlockNumberAndIndex](./transaction.md#eth_gettransactionbyblocknumberandindex), [eth_pendingTransactions](./transaction.md#eth_pendingtransactions).

클레이튼에는 수많은 트랜잭션 유형이 있으며, 유형에 따라 데이터 구조의 필드도 달라집니다.

따라서 다양한 유형의 클레이튼 트랜잭션이 이더리움 트랜잭션으로 변환되는 과정을 확인해야 합니다. 변환 과정에서 일부 필드가 생략되거나 0 또는 더미 값으로 추가되기 때문입니다. 변환 과정에서 중요한 정보(클레이튼 기준)가 손실될 수 있습니다.

이 문서에서 이더리움레거시트랜잭션은 [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) 이전의 이더리움 트랜잭션 포맷으로 정의합니다.

eth 네임스페이스 JSON-RPC apis를 통해 클레이튼 트랜잭션을 쿼리하려고 하면, 클레이튼 트랜잭션이
이더리움 레거시 트랜잭션 유형으로 반환됩니다.

본 문서는 클레이튼 트랜잭션 -> 이더리움 레거시 트랜잭션 변환 과정에 대한 자세한 내용을 설명합니다.

- 경고: 설명을 주의 깊게 읽어주세요.
- 설명의 :white_check_mark: 아이콘은 해당 필드가 이더리움에서와 같은 방식으로 사용되었음을 나타냅니다.

### 공통 필드

다양한 클레이튼 트랜잭션 유형에 상관없이 공통적으로 입력하는 필드가 있습니다.
이 섹션에서는 이더리움 레거시 트랜잭션에서 이러한 공통 필드가 어떻게 제공되는지 설명합니다.

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 트랜잭션 필드                                                                                    | 설명                                                                                                                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash        | blockHash                                                                                       | :white_check_mark: 블록 해시입니다.                                                                                                                                                      |
| blockNumber      | blockNumber                                                                                     | :white_check_mark: 블록 번호.                                                                                                                                                         |
| from             | from                                                                                            | :white_check_mark: 받는 사람의 주소입니다.                                                                                                                                                  |
| gas              | gas                                                                                             | :white_check_mark: 발신자가 제공한 가스.                                                                                                                                                   |
| gasPrice         | gasPrice                                                                                        | :warning: The price the most you can pay (e.g. suggestGasPrice = 2\*latestBlock.baseFee ). For detailed information, see [here](../../../learn/transaction-fees/transaction-fees.md#gas-price-overview). |
| hash             | hash                                                                                            | :white_check_mark: 트랜잭션 해시입니다.                                                                                                                                                    |
| input            | (아래 섹션에서 다룸)                                                                 | 이 필드에 대한 설명은 아래 세부 트랜잭션 항목에서 다룹니다.                                                                                                                                                                                          |
| nonce            | nonce                                                                                           | :white_check_mark: 발신자가 이 트랜잭션 이전에 수행한 트랜잭션 수입니다.                                                                                                                                 |
|                  | [senderTxHash](../../../learn/transactions/transactions.md#sendertxhash)(생략) | :warning: 이 필드는 이더리움 레거시 트랜잭션에 존재하지 않으므로 생략합니다.                                                                                                                                                                             |
|                  | signatures(생략)                                                               | :warning: 이 필드는 이더리움 레거시 트랜잭션에 존재하지 않으므로 생략됩니다.                                                                                                                                                                             |
| to               | (아래 섹션에서 다룸)                                                                 | 이 필드에 대한 설명은 아래 상세 트랜잭션 항목에서 다룹니다.                                                                                                                                                                                          |
| transactionIndex | transactionIndex                                                                                | :warning: 이더리움과 거의 동일하지만, 이더리움과 달리 클레이튼은 보류 상태일 때 정수를 그대로 반환합니다.                                                                                                                                                            |
| value            | (아래 섹션에서 다룸)                                                                 | 이 필드에 대한 설명은 아래 세부 트랜잭션 항목에서 다룹니다.                                                                                                                                                                                          |
| type             | type(변환됨)                                                                    | :warning: 클레이튼에서 `type`은 트랜잭션 유형을 문자열로 반환하지만(예: `"LegacyTransaction"`), 이더리움과 일치하도록 16진수(예: `0x0`)로 변환되었습니다. 클레이튼에서만 유효한 트랜잭션 유형은 항상 `0x0`을 반환합니다.                                    |
|                  | typeInt(생략)                                                                  | :warning: 이 필드는 이더리움 레거시 트랜잭션에 존재하지 않으므로 생략합니다.                                                                                                                                                                             |
| v                | (추가됨)                                                                        | :warning: 클레이튼은 다중서명을 지원하므로 클레이튼의 트랜잭션은 둘 이상의 서명을 가질 수 있습니다. 서명[0].V`는 `v\` 필드의 값으로 사용됩니다.                                                                              |
| r                | (추가됨)                                                                        | :warning: 클레이튼은 다중서명을 지원하므로 클레이튼의 트랜잭션은 둘 이상의 서명을 가질 수 있습니다. 서명[0].R`은 `r\` 필드의 값으로 사용됩니다.                                                                              |
| s                | (추가됨)                                                                        | :warning: 클레이튼은 다중서명을 지원하므로 클레이튼의 트랜잭션은 둘 이상의 서명을 가질 수 있습니다. 서명[0].S`는 `s\` 필드의 값으로 사용됩니다.                                                                              |

### [FeeDelegation](../../../learn/transactions/fee-delegation.md)의 공통 필드

클레이튼 [FeeDelegation](../../../learn/transactions/fee-delegation.md) 트랜잭션 유형에 상관없이 공통 필드가 존재합니다.
이 섹션에서는 수수료 위임에 대한 공통 필드(위에서 다룬 공통 필드 제외)가 어떻게
이더리움 레거시 트랜잭션으로 제공되는 방식에 대해 설명합니다.

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 FeeDelegation 트랜잭션 필드                | 설명                                              |
| ---------------- | ----------------------------------------- | ----------------------------------------------- |
|                  | feePayer(생략)           | :warning: 이 필드는 이더리움 레거시 트랜잭션에 존재하지 않으므로 생략합니다. |
|                  | feePayerSignatures(생략) | :warning: 이 필드는 이더리움 레거시 트랜잭션에 존재하지 않으므로 생략됩니다. |

### [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md)의 공통 필드

클레이튼의 다양한 트랜잭션 유형에 상관없이 [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md) 트랜잭션에는 공통 필드가 존재합니다.
이 섹션에서는 위에서 설명한 공통 필드를 제외한 부분 수수료 위임의 공통 필드를
이더리움 레거시 트랜잭션으로 제공되는 방식에 대해 설명합니다.

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 PartialFeeDelegation 트랜잭션 필드 | 설명                                              |
| ---------------- | --------------------------------- | ----------------------------------------------- |
|                  | feeRatio(생략)   | :warning: 이 필드는 이더리움 레거시 트랜잭션에 존재하지 않으므로 생략합니다. |

### 트랜잭션 유형별로 다른 필드

#### 레거시 트랜잭션

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 LegacyTransaction 필드 | 설명                                                                                                |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------- |
| input            | input                     | :white_check_mark: 트랜잭션과 함께 전송된 데이터입니다.                 |
| to               | to                        | :white_check_mark: 수신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`입니다. |
| value            | value                     | :white_check_mark: peb으로 전송된 값.                         |

**클레이튼 LegacyTransaction**은 아래와 같이 이더리움 레거시 트랜잭션으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0xe2bbb1580...",
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 0, omitted */
    "value": "0x0"
  }
}
```

#### ValueTransfer

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 ValueTransfer 트랜잭션 필드 | 설명                                                                                   |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------ |
| input            | (추가)    | :warning: 이 필드는 클레이튼 ValueTransfer 트랜잭션에 존재하지 않기 때문에 항상 `0x` 값을 가지며, 이는 빈 입력을 의미합니다. |
| to               | to                         | :white_check_mark: 수신자의 주소입니다.             |
| value            | value                      | :white_check_mark: peb으로 전송된 값입니다.         |

**클레이튼 ValueTransfer 트랜잭션**은 아래와 같이 이더리움 레거시 트랜잭션으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x", /** added */
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 8, omitted */
    "value": "0x49249695"
  }
}
```

#### ValueTransferMemo

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 ValueTransferMemo 트랜잭션 필드 | 설명                                                                                |
| ---------------- | ------------------------------ | --------------------------------------------------------------------------------- |
| input            | input                          | :white_check_mark: 트랜잭션과 함께 전송된 데이터입니다. |
| to               | to                             | :white_check_mark: 수신자의 주소.             |
| value            | value                          | :white_check_mark: peb으로 전송된 값.         |

**클레이튼 ValueTransferMemo 트랜잭션**은 아래와 같이 이더리움 레거시 트랜잭션으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x32104204104", 
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 16, omitted */
    "value": "0x49249695"
  }
}
```

#### SmartContractDeploy

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 SmartContractDeploy 트랜잭션 필드     | 설명                                                                                                                     |
| ---------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
|                  | codeFormat(생략)    | :warning: 이 필드는 이더리움 레거시 트랜잭션에 존재하지 않으므로 생략합니다.                                                                        |
|                  | humanReadable(생략) | :warning: 이 필드는 이더리움 레거시 트랜잭션에 존재하지 않으므로 생략합니다.                                                                        |
| input            | input                                | :white_check_mark: 트랜잭션과 함께 전송된 데이터입니다.                                      |
| to               | to                                   | :white_check_mark: 발신자의 주소. 이 트랜잭션은 컨트랙트 생성 트랜잭션이므로 이 필드는 항상 `null` 값을 갖습니다. |
| value            | value                                | :white_check_mark: peb으로 전송된 값입니다.                                           |

**클레이튼 SmartContractDeploy 트랜잭션**은 아래와 같이 이더리움 레거시 트랜잭션으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    /** "codeFormat": "0x0", omitted */
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "humanReadable": false, omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "null",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 40, omitted */
    "value": "0x0"
  }
}
```

#### SmartContractExecution

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 SmartContractExecution 트랜잭션 필드 | 설명                                                                                |
| ---------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| input            | input                               | :white_check_mark: 트랜잭션과 함께 전송된 데이터입니다. |
| to               | to                                  | :white_check_mark: 스마트 컨트랙트의 주소         |
| value            | value                               | :white_check_mark: peb으로 전송된 값입니다.      |

**클레이튼 SmartContractExecution 트랜잭션**은 아래와 같이 이더리움 레거시 트랜잭션으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x6e71df210046227af62323ae35c0ea5e606a349c",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 48, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

#### AccountUpdate

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 AccountUpdate 트랜잭션 필드 | 설명                                                                                                                    |
| ---------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
|                  | key(생략) | :warning: 이 필드는 이더리움 레거시 트랜잭션에 존재하지 않으므로 생략됩니다.                                                                       |
| input            | (추가됨)   | :warning: 이 필드는 클레이튼 AccountUpdate 트랜잭션에 존재하지 않기 때문에 항상 빈 입력을 의미하는 `0x` 값을 가집니다.                                      |
| to               | (추가됨)   | :warning: 이 필드는 클레이튼 AccountUpdate 트랜잭션에 존재하지 않기 때문에 항상 `from`과 동일한 주소를 가지며, 이 필드의 값을 `from` 주소로 지정하는 것이 가장 의미가 있습니다. |
| value            | (추가됨)   | :warning: 이 필드는 클레이튼 AccountUpdate 트랜잭션에 존재하지 않기 때문에 항상 `0x0` 값을 갖습니다.                                                |

**클레이튼 AccountUpdate 트랜잭션**은 아래와 같이 이더리움 레거시 트랜잭션으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "key": "0x02a103bf900d727fcbb4baa9f9ffc840ba947af7c7dae52ad6ef453ab5d50942e18b2f", omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 32, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

#### Cancel

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 Cancel 트랜잭션 필드      | 설명                                                                                                               |
| ---------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| input            | (추가됨) | :warning: 이 필드는 클레이튼 Cancel 트랜잭션에 존재하지 않기 때문에 항상 `0x` 값을 가지며, 이는 빈 입력을 의미합니다.                                    |
| to               | (추가됨) | :경고로 변경합니다: 이 필드는 클레이튼 Cancel 트랜잭션에 존재하지 않기 때문에 항상 `from`과 동일한 주소를 가지며, 이 필드의 값을 `from` 주소로 지정하는 것이 가장 의미가 있습니다. |
| value            | (추가됨) | :warning: 이 필드는 클레이튼 Cancel 트랜잭션에 존재하지 않기 때문에 항상 `0x0` 값을 갖습니다.                                                  |

**클레이튼 Cancel 트랜잭션**은 아래와 같이 이더리움 레거시 트랜잭션으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x", /** added */
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 56, omitted */
    "value": "0x0" /** added */
  }
}
```

#### ChainDataAnchoring

| 이더리움 레거시 트랜잭션 필드 | 클레이튼 ChainDataAnchoring 트랜잭션 필드  | 설명                                                                                                                         |
| ---------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| input            | input                            | :white_check_mark: 트랜잭션과 함께 전송된 데이터입니다.                                          |
|                  | inputJSON(생략) | :warning: 이 필드는 이더리움 레거시 트랜잭션에 존재하지 않으므로 생략합니다.                                                                            |
| to               | (추가됨)         | :warning: 이 필드는 클레이튼 ChainDataAnchoring 트랜잭션에 존재하지 않기 때문에 항상 `from`과 동일한 주소를 가지며, 이 필드의 값을 `from` 주소로 제공하는 것이 가장 의미가 있습니다. |
| value            | (추가됨)         | :warning: 이 필드는 클레이튼 ChainDataAnchoring 트랜잭션에 존재하지 않기 때문에 항상 `0x0` 값을 갖습니다.                                                |

**클레이튼 ChainDataAnchoring 트랜잭션**은 아래와 같이 이더리움 레거시 트랜잭션으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xfec3dab64552e3148d8dbf8fba0bdcc4f170b458683065cf47e67c35e45ac395",
    "blockNumber": "0x3052bb2",
    "from": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd",
    "gas": "0x186a0",
    "gasPrice": "0x5d21dba00",
    "hash": "0x9d64d2fb416cb4e4c2c9a4575b627d291c5139d477356af767f35dc5a887c138",
    "input": "0xf8129412941294129.",
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "nonce": "0x278",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 72, omitted */
    "value": "0x0" /** added */
  }
}
```

## 트랜잭션 영수증 <a id="transaction_receipt"></a>

관련 API: [eth_getTransactionReceipt](./transaction.md#eth_gettransactionreceipt).

기본적으로 클레이튼 트랜잭션 영수증의 필드는 트랜잭션 유형에 따라 다릅니다.
클레이튼에는 다양한 트랜잭션 유형이 있기 때문에 트랜잭션 영수증의 필드도 트랜잭션 유형에 따라 달라집니다.

eth 네임스페이스 JSON-RPC apis를 통해 클레이튼 트랜잭션 영수증을 쿼리하려고 할 때,
클레이튼 트랜잭션 영수증은 이더리움 트랜잭션 영수증으로 반환됩니다.

본 문서는 클레이튼 트랜잭션 영수증 -> 이더리움 트랜잭션 영수증으로 변환하는 과정에 대한 자세한 내용을 설명합니다.

- 경고: 설명을 주의 깊게 읽어주세요.
- 설명의 :white_check_mark: 아이콘은 해당 필드가 이더리움에서와 같은 방식으로 사용되었음을 나타냅니다.

### 공통 필드

다양한 클레이튼 트랜잭션 유형에 관계없이 공통 필드가 있습니다.
(클레이튼 트랜잭션 영수증의 필드는 트랜잭션 유형에 따라 다르다는 점을 참고하세요).

이 섹션에서는 해당 공통 필드가 이더리움 트랜잭션 영수증으로 제공되는 방법을 설명합니다.

| 이더리움 트랜잭션 영수증 필드  | 클레이튼 트랜잭션 영수증 필드                                                                                | 설명                                                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash         | blockHash                                                                                       | :white_check_mark: blockHash입니다.                                                                                                         |
| blockNumber       | blockNumber                                                                                     | :white_check_mark: 블록 번호.                                                                                                                |
| contractAddress   | contractAddress                                                                                 | :white_check_mark: 트랜잭션이 컨트랙트 생성인 경우 생성된 컨트랙트 주소, 그렇지 않으면 `null`입니다.                                                                     |
| cumulativeGasUsed | (추가됨)                                                                        | :warning: 이 트랜잭션이 블록에서 실행되었을 때 사용된 총 가스 양입니다. 이더리움 필드와 동일한 의미로 제공됩니다.                                                                                                              |
| effectiveGasPrice | (추가됨)                                                                        | :warning: Dynamic gasPrice, basefee, is determined in the system via the governance processes. For more detailed, see [here](../../../learn/transaction-fees/transaction-fees.md). |
| from              | from                                                                                            | :white_check_mark: 발신자의 주소입니다.                                                                                                           |
|                   | gas(생략)                                                                      | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                                                                                                                                    |
| gasUsed           | gasUsed                                                                                         | :white_check_mark: 이 특정 트랜잭션에서만 사용한 가스 양입니다.                                                                                             |
|                   | gasPrice(생략)                                                                 | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                                                                                                                                    |
| logs              | logs                                                                                            | :white_check_mark: 트랜잭션에 의해 생성된 로그 객체의 배열입니다.                                                                                            |
| logsBloom         | logsBloom                                                                                       | :white_check_mark: 라이트 클라이언트가 관련 로그를 빠르게 검색할 수 있는 블룸 필터.                                                                                 |
|                   | nonce(생략)                                                                    | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략됩니다.                                                                                                                                    |
|                   | [senderTxHash](../../../learn/transactions/transactions.md#sendertxhash)(생략) | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략됩니다.                                                                                                                                    |
|                   | signatures(생략)                                                               | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략됩니다.                                                                                                                                    |
| status            | status                                                                                          | :white_check_mark: 1(성공) 또는 0(실패) 중 하나입니다.                                                         |
| to                | (아래 섹션에서 설명)                                                                 | 이 필드에 대한 설명은 아래 트랜잭션 세부 항목에서 다룹니다.                                                                                                                                                 |
| transactionHash   | transactionHash                                                                                 | :white_check_mark: 트랜잭션 해시입니다.                                                                                                           |
| transactionIndex  | transactionIndex                                                                                | :warning: 이더리움과 거의 동일하지만, 이더리움과 달리 클레이튼은 보류 상태일 때 정수를 그대로 반환합니다.                                                                                                                   |
| type              | type(변환됨)                                                                    | :warning: 이 필드의 값과 데이터 타입이 변환되었습니다. 이 필드의 타입은 클레이튼에서는 문자열(예: `"LegacyTransaction"`)이지만 이더리움 트랜잭션 영수증과 마찬가지로 16진수(예: `0x`)로 변환되어 제공됩니다.       |
|                   | typeInt(생략)                                                                  | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략됩니다.                                                                                                                                    |

### [FeeDelegation](../../../learn/transactions/fee-delegation.md)의 공통 필드

다양한 클레이튼 [FeeDelegation](../../../learn/transactions/fee-delegation.md) 트랜잭션 유형에 관계없이 공통 필드가 있습니다.
(클레이튼 트랜잭션 영수증의 필드는 트랜잭션 유형에 따라 다양하다는 점을 참고하세요.)

이 섹션에서는 수수료 위임에 대한 공통 필드(위에서 다룬 공통 필드 제외)가
가 이더리움 트랜잭션 영수증으로 어떻게 제공되는지 설명합니다.

| 이더리움 트랜잭션 영수증 필드 | 클레이튼 FeeDelegation 트랜잭션 영수증 필드            | 설명                                              |
| ---------------- | ----------------------------------------- | ----------------------------------------------- |
|                  | feePayer(생략)           | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다. |
|                  | feePayerSignatures(생략) | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다. |

### [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md)의 공통 필드

클레이튼의 다양한 트랜잭션 유형에 관계없이 [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md) 트랜잭션에는 공통 필드가 존재합니다.
(클레이튼 트랜잭션 영수증의 필드는 트랜잭션 유형에 따라 다르다는 점을 참고하세요).

이 섹션에서는 부분 수수료 위임에 대한 공통 필드(위에서 다룬 공통 필드 제외)
가 이더리움 트랜잭션 영수증으로 제공되는 방법을 설명합니다.

| 이더리움 트랜잭션 영수증 필드 | 클레이튼 PartialFeeDelegation 트랜잭션 영수증 필드 | 설명                                              |
| ---------------- | ------------------------------------- | ----------------------------------------------- |
|                  | feeRatio(생략)       | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다. |

### 트랜잭션 유형마다 다른 필드

#### 레거시 트랜잭션 영수증

| 이더리움 트랜잭션 영수증 필드 | 클레이튼 LegacyTransaction 영수증 필드 | 설명                                                                                                |
| ---------------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
|                  | input(생략)  | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                                                   |
| to               | to                            | :white_check_mark: 수신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`입니다. |
|                  | value(생략)  | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                                                   |

**클레이튼 LegacyTransaction 영수증**은 아래와 같이 이더리움 트랜잭션 영수증으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    /** "gas": "0x204c8e", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x1c278",
    /** "input": "0xe2b...", omitted */
    "logs": [
      {
        "address": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
        "topics": [
          "0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15",
          "0x000000000000000000000000bd4fa032e6afe41cacde8e3292fb129b857bfca8",
          "0x0000000000000000000000000000000000000000000000000000000000000003"
        ],
        "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "blockNumber": "0x47ef00c",
        "transactionHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
        "transactionIndex": "0xe",
        "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
        "logIndex": "0xa",
        "removed": false
      }
    ],
    "logsBloom": "0x00...",
    /** "nonce": "0x22aa", omitted */
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "status": "0x1",
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 0, omitted */
    /** "value": "0x0" omitted */
  }
}
```

#### ValueTransfer 트랜잭션 영수증

| 이더리움 트랜잭션 영수증 필드 | 클레이튼 ValueTransfer 트랜잭션 영수증 필드 | 설명                                                                       |
| ---------------- | ------------------------------ | ------------------------------------------------------------------------ |
| to               | to                             | :white_check_mark: 수신자의 주소입니다. |
|                  | value(생략)   | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                          |

**클레이튼 ValueTransfer 트랜잭션 영수증**은 아래와 같이 이더리움 트랜잭션 영수증으로 서비스됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 8, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### ValueTransferMemo 트랜잭션 영수증

| 이더리움 트랜잭션 영수증 필드 | 클레이튼 ValueTransferMemo 트랜잭션 영수증 필드 | 설명                                                                    |
| ---------------- | ---------------------------------- | --------------------------------------------------------------------- |
|                  | input(생략)       | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                       |
| to               | to                                 | :white_check_mark: 수신자의 주소. |
|                  | value(생략)       | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                       |

**클레이튼 ValueTransferMemo 트랜잭션**은 아래와 같이 이더리움 트랜잭션 영수증으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0x32142912492149122", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 16, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### SmartContractDeploy 트랜잭션 영수증

| 이더리움 트랜잭션 영수증 필드 | 클레이튼 SmartContractDeploy 트랜잭션 영수증 필드 | 설명                                                                                                                   |
| ---------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
|                  | codeFormat(생략)    | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                                                                      |
|                  | humanReadable(생략) | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                                                                      |
|                  | input                                | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                                                                      |
| to               | to                                   | :white_check_mark: 수신자의 주소. 이 트랜잭션은 컨트랙트 생성 트랜잭션이므로 이 필드의 값은 항상 `null`입니다. |
|                  | value                                | :warning: 이 필드는 이더리움 트랜잭션 영수증                                                                                        |

**클레이튼 SmartContractDeploy 트랜잭션 영수증**은 아래와 같이 이더리움 트랜잭션 영수증으로 전송됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    /** "codeFormat": "0x0", omitted */
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "humanReadable": false, omitted */
    /** "input": "0x6080...", omitted */
    "logs": [
      {
        "address": "0xf1ac00f758a5baf71507e1d62e2c9dab6aaaf49f",
        "topics": [
          "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x000000000000000000000000760fcf5159263b7cf39b0751e7d2bb008d09147d"
        ],
        "data": "0x",
        "blockNumber": "0x4857712",
        "transactionHash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
        "transactionIndex": "0x6",
        "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
        "logIndex": "0x42",
        "removed": false
      }
    ],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": null,
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 40, omitted */
    /** "value": "0x0" omitted */
  }
}
```

#### SmartContractExecution 트랜잭션 영수증

| 이더리움 트랜잭션 영수증 필드 | 클레이튼 SmartContractExecution 트랜잭션 영수증 필드 | 설명                                                                            |
| ---------------- | --------------------------------------- | ----------------------------------------------------------------------------- |
|                  | input                                   | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                               |
| to               | to                                      | :white_check_mark: 스마트 컨트랙트의 주소입니다. |
|                  | value                                   | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                               |

**클레이튼 SmartContractExecution 트랜잭션 영수증**은 아래와 같이 이더리움 트랜잭션 영수증으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0x32142912492149122", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 48, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### AccountUpdate 트랜잭션 영수증

| 이더리움 트랜잭션 영수증 필드 | 클레이튼 AccountUpdate 트랜잭션 영수증 필드 | 설명                                                                                                                  |
| ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
|                  | key(생략)     | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                                                                     |
| to               | (추가됨)       | :warning: 이 필드는 클레이튼 계정 업데이트 트랜잭션 영수증에 존재하지 않기 때문에 항상 `from`과 동일한 주소를 가지며, 이 필드의 값을 `from` 주소로 제공하는 것이 가장 의미가 있습니다. |

**클레이튼 AccountUpdate 트랜잭션 영수증**은 아래와 같이 이더리움 트랜잭션 영수증으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "key": "0x02a102a288c3fb864a012dbe6ca84fcd2afcd9b390cf473b4d35a0126c3164ac3e7f73", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 32, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### Cancel 트랜잭션 영수증

| 이더리움 트랜잭션 영수증 필드 | 클레이튼 Cancel 트랜잭션 영수증 필드 | 설명                                                                                                                 |
| ---------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| to               | (추가) | :warning: 이 필드는 클레이튼 Cancel 트랜잭션 영수증에 존재하지 않기 때문에 항상 `from`과 동일한 주소를 가지며, 이 필드의 값을 `from` 주소로 지정하는 것이 가장 의미가 있습니다. |

**클레이튼 Cancel 트랜잭션 영수증**은 아래와 같이 이더리움 트랜잭션 영수증으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 56, omitted */
  }
}
```

#### ChainDataAnchoring 트랜잭션 영수증

| 이더리움 트랜잭션 영수증 필드 | 클레이튼 ChainDataAnchoring 트랜잭션 영수증 필드 | 설명                                                                                                                             |
| ---------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
|                  | input(생략)        | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략됩니다.                                                                                |
|                  | inputJSON(생략)    | :warning: 이 필드는 이더리움 트랜잭션 영수증에 존재하지 않으므로 생략합니다.                                                                                |
| to               | (추가)             | :warning: 이 필드는 클레이튼 ChainDataAnchoring 트랜잭션 영수증에 존재하지 않기 때문에 항상 `from`과 동일한 주소를 가지며, 이 필드의 값을 `from` 주소로 지정하는 것이 가장 의미가 있습니다. |

**클레이튼 ChainDataAnchoring 트랜잭션 영수증**은 아래와 같이 이더리움 트랜잭션 영수증으로 제공됩니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0xf8...", omitted */
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 72, omitted */
  }
}
```
