# Gas

## klay_feeHistory<a id="klay_feehistory"></a>

가스당 기본 수수료와 요청된 블록 범위에 대한 가스 내역당 거래 유효 우선순위 수수료를 반환합니다(가능한 경우).

:::note

**참고**: 이 API는 Klaytn v1.8.0 이후부터 적용됩니다.

:::

**매개변수**

| 이름                | 유형              | 설명                                                                                                                                                                         |
| ----------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockCount        | QUANTITY        | 요청된 범위의 블록 수(16진수). 한 번의 쿼리로 1(0x1)에서 1024(0x400)개의 블록을 요청할 수 있습니다. 모든 블록을 사용할 수 없는 경우 요청된 것보다 적은 블록이 반환될 수 있습니다. |
| lastBlock         | QUANTITY \| TAG | 요청된 범위에서 가장 높은 번호의 블록을 블록 번호 또는 블록 태그로 반환합니다.                                                                                                                              |
| rewardPercentiles | FLOAT Array     | 0에서 100 사이의 부동 소수점 값 배열입니다.                                                                                                                                                |

**리턴 값**

| 이름            | 유형             | 설명                                                                            |
| ------------- | -------------- | ----------------------------------------------------------------------------- |
| oldestBlock   | QUANTITY       | 반환된 범위의 가장 낮은 번호의 블록(16진수).                                |
| baseFeePerGas | QUANTITY Array | 가스당 블록 기본 수수료의 배열입니다. 이 값은 최신 블록에서 파생될 수 있으므로 반환된 범위 중 가장 최신 블록 다음 블록이 포함됩니다. |
| gasUsedRatio  | FLOAT Array    | 블록당 가스 사용 비율의 배열입니다. 이 값은 가스 사용량과 가스 제한의 비율로 계산됩니다.                           |
| reward        | QUANTITY Array | 단일 블록의 가스 데이터 포인트당 유효 우선권 수수료의 배열입니다. 블록이 비어 있으면 모두 0이 반환됩니다.                 |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_feeHistory","params":["0x10", "latest", [0.1, 0.2, 0.3]],"id":1}' http://localhost:8551
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "oldestBlock": "0xa5b",
    "reward": [
      [ "0x0", "0x0", "0x0" ],
      ...
      [ "0x5d21dba00", "0x5d21dba00", "0x5d21dba00" ]
    ],
    "baseFeePerGas": [ "0x0", ..., "0x0" ],
    "gasUsedRatio": [ 0, ..., 0.0002963777000002964 ]
  }
}
```

## klay_maxPriorityFeePerGas <a id="klay_maxpriorityfeepergas"></a>

동적 수수료 트랜잭션에 대한 가스 팁 상한에 대한 제안을 peb으로 반환합니다.

:::note

**참고**: 이 API는 Klaytn v1.8.0 이후부터 적용됩니다.

:::

**매개변수**

없음

**리턴 값**

| 유형       | 설명                                       |
| -------- | ---------------------------------------- |
| QUANTITY | 현재 가스 가격(peb)의 정수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_maxPriorityFeePerGas","params":[],"id":1}' http://localhost:8551
// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 Ston
}
```
