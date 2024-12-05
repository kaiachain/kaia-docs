# Account

## eth_accounts <a id="eth_accounts"></a>

클라이언트가 소유한 주소 목록을 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형                    | 설명             |
| --------------------- | -------------- |
| Array of 20-byte DATA | 클라이언트가 소유한 주소. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f"]
}
```

## eth_getBalance <a id="eth_getbalance"></a>

주어진 주소의 계정 잔액을 반환합니다.

**매개변수**

| 이름                   | 유형                      | 설명                                                                                                                                            |
| -------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| address              | 20-byte DATA            | 잔액을 확인할 주소.                                                                                                                                   |
| block number 또는 hash | QUANTITY \| TAG \| HASH | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](../eth/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열, 또는 블록 해시입니다. |

**리턴 값**

| 유형       | 설명                                        |
| -------- | ----------------------------------------- |
| QUANTITY | 현재 잔액(단위: peb)의 정수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

## eth_getCode <a id="eth_getcode"></a>

지정된 주소의 코드를 반환합니다.

**매개변수**

| 유형                      | 설명                                                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA            | 주소                                                                                                                                            |
| QUANTITY \| TAG \| HASH | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](../eth/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열, 또는 블록 해시입니다. |

**리턴 값**

| 유형   | 설명         |
| ---- | ---------- |
| data | 주어진 주소의 코드 |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result":   "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```

## eth_getTransactionCount <a id="eth_gettransactioncount"></a>

주소에서 _발송된_ 트랜잭션의 수를 반환합니다.

**매개변수**

| 유형                      | 설명                                                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA            | 주소                                                                                                                                            |
| QUANTITY \| TAG \| HASH | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](../eth/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열, 또는 블록 해시입니다. |

**리턴 값**

| 유형       | 설명                        |
| -------- | ------------------------- |
| QUANTITY | 이 주소에서 전송된 트랜잭션 수의 정수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":1}' http://localhost:8551

// Result
{
 "jsonrpc": "2.0",
 "id":1,
 "result": "0x1" // 1
}
```

## eth_sign <a id="eth_sign"></a>

서명 메서드는 클레이튼 고유의 서명을 계산합니다:

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

메시지에 접두사를 추가하면 계산된 서명이 클레이튼 전용 서명으로 인식될 수 있습니다. 이를 통해 악의적인 dApp이 임의의 데이터(예: 트랜잭션)에 서명하고 이를 사칭에 사용하는 오용을 방지할 수 있습니다.

**참고**: 서명할 주소는 잠금 해제되어 있어야 합니다.

**매개변수**

| 이름      | 유형           | 설명      |
| ------- | ------------ | ------- |
| account | 20-byte DATA | 주소      |
| message | N-byte DATA  | 서명할 메시지 |

**리턴 값**

| 유형   | 설명 |
| ---- | -- |
| data | 서명 |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```
