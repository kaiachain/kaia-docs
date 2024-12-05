# 기타

## klay_sha3 <a id="klay_sha3"></a>

주어진 데이터의 Keccak-256(표준화된 SHA3-256이 아님)을 반환합니다.

**매개변수**

| 이름   | 유형   | 설명                   |
| ---- | ---- | -------------------- |
| data | DATA | SHA3 해시로 변환할 데이터입니다. |

**리턴 값**

| 유형           | 설명                   |
| ------------ | -------------------- |
| 32-byte DATA | 주어진 데이터의 SHA3 결과입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sha3","params":["0x11223344"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73"
}
```

## klay_recoverFromTransaction <a id="klay_recoverFromTransaction"></a>

RLP 인코딩된 트랜잭션 바이트에서 복구된 발신자 주소를 반환합니다.
트랜잭션의 발신자 주소가 복합 계정 키 유형인 경우 서명에서 추출한 주소가 아닌 발신자 주소를 반환합니다.
복구에 실패하면 0x0 주소를 반환합니다.

**매개변수**

| 이름           | 유형              | 설명                                                                                                                   |
| ------------ | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| data         | DATA            | RLP 인코딩된 트랜잭션 바이트                                                                                                    |
| block number | QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

**리턴 값**

| 유형           | 설명      |
| ------------ | ------- |
| 20-byte DATA | 복구된 주소. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_recoverFromTransaction","params":["0x08f88307850ba43b74008366926694000000000000000000000000000000000000dead843b9aca00945bd2fb3c21564c023a4a735935a2b7a238c4cceaf847f8458207f6a09c57511347c7b88c3539a6584b4d57991f6c4665ffcde89da0e9895eb078bef7a0296f4fd2a765567e034f4754cf31a9902c49d6a1d465a2e3fd10b165476cffa8", "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0xe15cd70a41dfb05e7214004d7d054801b2a2f06b"
}
```

## klay_recoverFromMessage <a id="klay_recoverFromMessage"></a>

메시지 서명에서 서명자 주소를 반환합니다.
메시지가 주어진 계정으로 서명되었는지 검증합니다.
클레이튼에는 여러 가지 [accountKey](../../../learn/accounts.md#account-key) 타입이 있습니다.
따라서 주소(계정) 인자에 AccountKeyWeightedMultisig와 같은 복합 계정키가 있고
와 같은 복합 계정키가 있고 서명이 계정의 멤버 개인키에 의해 생성된 경우,
계정 주소가 아닌 회원의 개인키와 쌍을 이룬 주소를 얻게 됩니다.
또한 메시지 서명에 사용된 키가 계정의 구성원임을 확인할 수 있습니다.
또한 이 기능에는 메시지에 서명할 때 두 가지 종류의 접두사로 서명의 유효성을 검사하는 기능이 있습니다.

**파라미터**

| 이름           | 유형              | 설명                                                                                                                   |
| ------------ | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| address      | String          | 서명자 계정의 주소입니다.                                                                                                       |
| message      | DATA            | 메시지 바이트                                                                                                              |
| signature    | 65바이트 데이터       | 서명 바이트                                                                                                               |
| block number | QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

**리턴 값**

| 유형           | 설명      |
| ------------ | ------- |
| 20-byte DATA | 복구된 주소. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{
  "jsonrpc":"2.0",
  "method":"klay_recoverFromMessage"
  ,"params":[
"0xA2a8854b1802D8Cd5De631E690817c253d6a9153",
"0xdeadbeef", 
"0x1e6338d6e4a8d688a25de78cf2a92efec9a92e52eb8425acaaee8c3957e68cdb3f91bdc483f0ed05a0da26eca3be4c566d087d90dc2ca293be23b2a9de0bcafc1c", 
"latest"
], 
  "Id":1
}
' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0xa2a8854b1802d8cd5de631e690817c253d6a9153"
}
```

## klay_forkStatus <a id="klay_forkStatus"></a>

전체 하드포크 목록과 지정된 블록에서의 효과를 반환합니다.

**매개변수**

| 이름           | 유형              | 설명                                                                                                                   |
| ------------ | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| block number | QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

**리턴 값**

| 유형   | 설명          |
| ---- | ----------- |
| JSON | 포크 목록과 그 효과 |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_forkStatus","params":["latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "EthTxType": true,
    "Istanbul": true,
    "KIP103": false,
    "Kore": true,
    "London": true,
    "Magma": true,
    "Shanghai": false
  }
}
```

## klay_createAccessList <a id="klay_createaccesslist"></a>

이 메서드는 주어진 `Transaction`을 기반으로 `accessList`를 생성합니다.
`accessList`에는 발신자 계정과 사전 컴파일을 제외한 트랜잭션이 읽고 쓴 모든 스토리지 슬롯과 주소가 포함됩니다.
이 메서드는 [`klay_call`](./transaction.md#klay_call)과 동일한 트랜잭션 호출 객체 및 `blockNumberOrTag` 객체를 사용합니다.
accessList는 가스비 증가로 인해 접근이 불가능해진 컨트랙트를 해제하는 데 사용할 수 있습니다.
트랜잭션에 `accessList`를 추가해도 액세스 목록이 없는 트랜잭션에 비해 가스 사용량이 줄어들지는 않습니다.

**매개변수**

| 이름               | 유형              | 설명                                                                                                                                                                                                |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject       | Object          | 트랜잭션 호출 오브젝트. 개체의 속성은 [`klay_call`](./transaction.md#klay_call)을 참조하세요.                                                                                                                           |
| blockNumberOrTag | QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](./block.md#the-default-block-parameter)에서와 같이 문자열 `"earliest"`, `"latest"` 또는 `"pending"`입니다. 블록 번호는 필수이며 지정된 트랜잭션이 실행되어야 하는 컨텍스트(상태)를 정의합니다. |

**리턴 값**

| 유형     | 설명                                                   |
| ------ | ---------------------------------------------------- |
| Object | 트랜잭션에 사용된 주소 및 저장 키 목록과 액세스 목록이 추가될 때 소비된 가스를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_createAccessList", "params": [{"from": "0x8cd02c6cbd8375b39b06577f8d50c51d86e8d5cd", "data": "0x608060806080608155"}, "latest"], "id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    "accessList": [{
      "address": "0xa02457e5dfd32bda5fc7e1f1b008aa5979568150",
      "storageKeys": ["0x0000000000000000000000000000000000000000000000000000000000000081"]
    }],
    "gasUsed": "0x128ee"
  }
}
```
