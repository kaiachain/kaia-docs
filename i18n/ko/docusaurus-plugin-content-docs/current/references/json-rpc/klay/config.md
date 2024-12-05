# 구성

## klay_chainID <a id="klay_chainid"></a>

체인의 체인 ID를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명            |
| -------- | ------------- |
| QUANTITY | 체인 ID의 정수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_chainID","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x7e2"
}
```

## klay_clientVersion <a id="klay_clientversion"></a>

클레이튼 노드의 현재 클라이언트 버전을 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형     | 설명                       |
| ------ | ------------------------ |
| string | 클레이튼 노드의 현재 클라이언트 버전입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_clientVersion","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"Klaytn/v0.9.1+3518232250/linux-amd64/go1.11.2"
}
```

## klay_gasPrice <a id="klay_gasprice"></a>

가스 가격 제안을 peb 단위로 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명                                           |
| -------- | -------------------------------------------- |
| QUANTITY | 현재 가스 가격(단위: peb)의 정수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPrice","params":[],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
}
```

## klay_gasPriceAt <a id="klay_gaspriceat"></a>

아래에 설명된 조건에 따라 다른 값을 반환합니다. 반환 값의 단위는 peb입니다.

- 헤더에 `baseFee`가 정의되지 않은 경우, 거버넌스 파라미터의 단가를 반환합니다.
- 블록이 보류 중인 블록인 경우 txpool의 가스 가격을 반환합니다.
- 그렇지 않으면 주어진 블록의 기본 수수료를 반환합니다.

**매개변수**

| 유형     | 설명                        |
| ------ | ------------------------- |
| number | 블록 번호. 생략하면 최신 단가가 반환됩니다. |

**리턴 값**

| 유형       | 설명                                           |
| -------- | -------------------------------------------- |
| QUANTITY | 현재 가스 가격(단위: peb)의 정수입니다. |

**예시**

```javascript
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPriceAt","params":["0x64"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
}
```

## klay_isParallelDBWrite <a id="klay_isparalleldbwrite"></a>

노드가 블록체인 데이터를 병렬 방식으로 쓰고 있는 경우 `true`를 반환합니다. 기본적으로 활성화되어 있습니다.

**매개변수**

없음

**리턴 값**

| 유형   | 설명                                                                              |
| ---- | ------------------------------------------------------------------------------- |
| bool | `true`는 노드가 블록체인 데이터를 병렬 방식으로 쓰고 있음을 의미합니다. 노드가 직렬 방식으로 데이터를 쓰고 있다면 `false`입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isParallelDBWrite","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

## klay_isSenderTxHashIndexingEnabled <a id="klay_issendertxhashindexingenabled"></a>

노드가 발신자 트랜잭션 해시와 트랜잭션 해시 매핑 정보를 인덱싱하는 경우 `true`를 반환합니다.
기본적으로 비활성화되어 있으며 `--sendertxhashindexing`으로 활성화할 수 있습니다.

**매개변수**

없음

**리턴 값**

| 유형   | 설명                                                       |
| ---- | -------------------------------------------------------- |
| bool | `true`는 노드가 발신자 트랜잭션 해시를 트랜잭션 해시 매핑 정보에 인덱싱하고 있음을 의미합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isSenderTxHashIndexingEnabled","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

## klay_protocolVersion <a id="klay_protocolversion"></a>

노드의 클레이튼 프로토콜 버전을 반환합니다.
Cypress/Baobab의 현재 버전(v1.9.0 기준)은 `istanbul/65`입니다.

**매개변수**

없음

**리턴 값**

| 유형     | 설명                   |
| ------ | -------------------- |
| string | 노드의 클레이튼 프로토콜 버전입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_protocolVersion","params":[],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x40"
}
```

## klay_rewardbase <a id="klay_rewardbase"></a>

현재 노드의 보상베이스를 반환합니다. 리워드베이스는 블록 보상이 지급되는 계정의 주소입니다. CN에만 필요합니다.

**매개변수**

없음

**리턴 값**

| 유형           | 설명  |
| ------------ | --- |
| 20-byte DATA | 주소. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_rewardbase","id":1}' https://public-en-baobab.klaytn.net

// Result - If requested from non-CN nodes
{
    "jsonrpc":"2.0",
    "id":1,
    "error":{
        "code":-32000,
        "message":"rewardbase must be explicitly specified"
        }
}

// Result - If requested from CN nodes
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x96Fd91f34Cc8da9f6338C106Ba37aA8B48FB4Fa5"
}
```
