# Configuration

## eth_coinbase <a id="eth_coinbase"></a>

클라이언트 코인베이스 주소를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형           | 설명              |
| ------------ | --------------- |
| 20-byte DATA | 현재 코인베이스 주소입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
}
```

## eth_etherbase <a id="eth_etherbase"></a>

클라이언트 이더베이스 주소를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형           | 설명              |
| ------------ | --------------- |
| 20-byte DATA | 현재 이더베이스 주소입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_etherbase","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
}
```

## eth_chainId <a id="eth_chainid"></a>

요청된 노드에 설정된 현재 체인아이디를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명                |
| -------- | ----------------- |
| QUANTITY | 체인의 체인 ID를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x2019"
}
```

## eth_gasPrice <a id="eth_gasprice"></a>

가스 가격 제안을 peb 단위로 반환합니다.

**참고**: 이 API는 이더리움과 다른 동작 방식을 가지고 있습니다. 이더리움처럼 가스 가격을 제안하는 대신 클레이튼의 가스 가격을 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명                                           |
| -------- | -------------------------------------------- |
| QUANTITY | 현재 가스 가격(단위: peb)의 정수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston (Gwei)
}
```
