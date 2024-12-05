---
description: 네트워크 구성을 쿼리하는 데 사용되는 API입니다.
---

# net

네임스페이스 `net`은 클레이튼 네트워크와 관련된 함수를 제공합니다.

## net_networkID <a id="net_networkid"></a>

네트워크 식별자(네트워크 ID)를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명                                                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY | 네트워크 식별자의 정수입니다. <br />- `"1001"`: 클레이튼 Baobab 테스트넷 <br />- `"8217"`: 클레이튼 Cypress 메인넷 <br />- `"8217"`: 클레이튼 Cypress 메인넷. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_networkID","params":[],"id":67}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```

## net_listening <a id="net_listening"></a>

클라이언트가 네트워크 연결을 적극적으로 수신 대기 중이면 `true`를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형   | 설명                            |
| ---- | ----------------------------- |
| bool | 들을 때 `true`, 그렇지 않으면 `false`. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}' https://public-en-baobab.klaytn.net

// Result
{
    "id":67,
    "jsonrpc":"2.0",
    "result":true
}
```

## net_peerCount <a id="net_peercount"></a>

현재 클라이언트에 연결된 피어 수를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명               |
| -------- | ---------------- |
| QUANTITY | 연결된 피어 수의 정수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}' https://public-en-baobab.klaytn.net

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": "0x3" // 2
}
```

## net_peerCountByType <a id="net_peercountbytype"></a>

유형별로 연결된 노드 수와 키/값 쌍으로 연결된 노드의 총 수를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형          | 설명                           |
| ----------- | ---------------------------- |
| JSON string | 유형별 연결된 피어 수와 연결된 총 피어 수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCountByType","params":[],"id":74}' https://public-en-baobab.klaytn.net

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": {"en":3,"pn":2,"total":5}
}
```

## net_version <a id="net_version"></a>

현재 클레이튼 프로토콜 버전을 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명                                                                                             |
| -------- | ---------------------------------------------------------------------------------------------- |
| QUANTITY | 클레이튼 프로토콜 버전의 정수입니다. <br />- `"1001"`: 클레이튼 Baobab 테스트넷입니다. <br/>- `"8217"`: 클레이튼 Cypress 메인넷. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}' https://public-en-baobab.klaytn.net
// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```
