# Transaction

## eth_call <a id="eth_call"></a>

블록체인에 트랜잭션을 생성하지 않고 즉시 새 메시지 호출을 실행합니다. eth_call 메서드는
내부 컨트랙트 상태를 쿼리하거나, 컨트랙트에 코딩된 유효성 검사를 실행하거나, 트랜잭션을 실시간으로 실행하지 않고도 트랜잭션의 효과를 테스트하는 데에도 사용할 수 있습니다.

**매개변수**

| 이름               | Type            | 설명                                                                                                                                                                                                |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject       | Object          | 트랜잭션 호출 객체입니다. 객체의 속성은 다음 표를 참조하세요.                                                                                                                                                               |
| blockNumberOrTag | QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](./block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. 블록 번호는 필수이며 지정된 트랜잭션이 실행되어야 하는 컨텍스트(상태)를 정의합니다. |
| stateOverrideSet | Object          | 상태 오버라이드 세트는 선택적 주소-상태 매핑으로, 각 항목은 호출을 실행하기 전에 임시로 재정의할 일부 상태를 지정합니다.                                                                                                                             |

`callObject`에는 다음과 같은 속성이 있습니다:

| 이름       | Type         | 설명                                                                                                          |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | (선택 사항) 트랜잭션이 전송된 것으로 시뮬레이션되는 주소입니다. 주소를 지정하지 않으면 `0x00...0` 주소가 사용됩니다.                  |
| to       | 20-byte DATA | (선택 사항) 트랜잭션이 전송되는 주소입니다.                                                                |
| gas      | QUANTITY     | (선택 사항) 무한 루프를 피하기 위한 코드 실행의 최대 가스 허용량. 기본값은 2^63 또는 노드 운영자가 --rpc.gascap을 통해 지정한 값입니다.  |
| gasPrice | QUANTITY     | (선택 사항) 실행 중 각 가스 단위에 대한 지불을 시뮬레이션할 `peb`의 수입니다. 기본값은 `0`peb입니다.                         |
| value    | QUANTITY     | (선택 사항) 트랜잭션과 함께 전송을 시뮬레이션할 `peb`의 양입니다. 기본값은 `0`입니다.                                    |
| input    | DATA         | (선택 사항) 메서드 서명 및 인코딩된 매개변수의 해시입니다. `data` 필드를 대체하지만 이전 버전과의 호환성을 위해 `data` 필드는 계속 지원됩니다. |

**예시 - callObject**

```json
{
  "from": "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3",
  "to": "0xebe8efa441b9302a0d7eaecc277c09d20d684540",
  "gas": "0x1bd7c",
  "input": "0xd459fc46000000000000000000000000000000000000000000000000000000000046c650dbb5e8cb2bac4d2ed0b1e6475d37361157738801c494ca482f96527eb48f9eec488c2eba92d31baeccfb6968fad5c21a3df93181b43b4cf253b4d572b64172ef000000000000000000000000000000000000000000000000000000000000008c00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000002b85c0c828d7a98633b4e1b65eac0c017502da909420aeade9a280675013df36bdc71cffdf420cef3d24ba4b3f9b980bfbb26bd5e2dcf7795b3519a3fd22ffbb2000000000000000000000000000000000000000000000000000000000000000238fb6606dc2b5e42d00c653372c153da8560de77bd9afaba94b4ab6e4aa11d565d858c761320dbf23a94018d843772349bd9d92301b0ca9ca983a22d86a70628"
}
```

`stateOverrideSet`에는 다음과 같은 속성이 있습니다:

| 이름        | Type     | 설명                                                                           |
| --------- | -------- | ---------------------------------------------------------------------------- |
| balance   | Quantity | (선택 사항) 호출을 실행하기 전에 계정에 설정할 가짜 잔액입니다.                     |
| nonce     | Quantity | (선택 사항) 호출을 실행하기 전에 계정에 설정할 가짜 nonce입니다.                  |
| code      | DATA     | (선택 사항) 호출을 실행하기 전에 계정에 주입할 가짜 EVM 바이트코드입니다.              |
| state     | Object   | (선택 사항) 호출을 실행하기 전에 계정 저장소의 모든 슬롯을 재정의할 가짜 키-값 매핑입니다.     |
| stateDiff | Object   | (선택 사항) 호출을 실행하기 전에 계정 저장소의 개별 슬롯을 재정의하기 위한 가짜 키-값 매핑입니다. |

상태 재정의 세트의 목표는 여러 가지가 있습니다:

- dApp이 체인에 배포하는 데 필요한 컨트랙트 코드의 양을 줄이기 위해 사용할 수 있습니다. 단순히 내부 상태를 반환하거나
  내부 상태를 반환하거나 사전 정의된 유효성 검사를 수행하는 코드는 체인에서 벗어나 온디맨드 방식으로 노드에 공급할 수 있습니다.
- 체인에 배포된 코드를 사용자 정의 메서드로 확장하여 스마트 컨트랙트 분석에 사용할 수 있습니다. 이렇게 하면 커스텀 코드를 실행하기 위해 샌드박스에서 전체 상태를 다운로드하고 재구성할 필요가 없습니다.
- 코드 또는 상태를 선택적으로 재정의하고 실행이 어떻게 변경되는지 확인하여 스마트 컨트랙트를 디버깅하는 데 사용할 수 있습니다. 전문화된 도구가 필요할 수 있습니다.

**예시 - stateOverrideSet**

```json
{
  "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3": {
    "balance": "0xde0b6b3a7640000"
  },
  "0xebe8efa441b9302a0d7eaecc277c09d20d684540": {
    "code": "0x...",
    "state": {
      "0ccfa7da0b3522161999fd723e497b1a3556598653325c2fe7f0b2a98c9d6aae": "c70447ca5ce4344e32ae8234c5e70a446e26b39a5b636b502983ea7a555ab21c"
    }
  }
}
```

**예시**

의미 있는 방식으로 통화를 테스트하려면 아래와 같이 테스트 환경을 설정해야 합니다.

- KIP-7 컨트랙트를 배포하여 호출을 테스트하거나 이미 배포된 컨트랙트와 함께 사용할 수 있습니다.
  - 이 예제에서는 KIP-7 컨트랙트 함수 `totalSupply`를 사용하여 호출이 작동하는지 여부를 확인하겠습니다.
  - `totalSupply`를 호출하려면 `0x18160ddd`라는 함수 시그니처를 알고 있어야 합니다.

이 예제에서는

- KIP-7 컨트랙트 주소: `0xbE3892d33620bE5aca8c75D39e7401871194d290` (기존 컨트랙트를 사용해야 합니다.
- 발신자 주소: `0xca7a99380131e6c76cfa622396347107aeedca2d`

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_call", "params": [{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0xbE3892d33620bE5aca8c75D39e7401871194d290", "input": "0x18160ddd"}, "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x0000000000000000000000000000000000000000000000000de0b6b3a7640000"}
```

**예시 - StateOverrides**

위의 예제에 따라 상태 재정의 기능을 사용하여 호출을 테스트해 보겠습니다.

- 이미 배포된 KIP-7 컨트랙트의 주소인 `0xbE3892d33620bE5aca8c75D39e7401871194d290`의 바이트코드로 대체합니다.
- 대체할 바이트코드는
  는 `6080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e64cec114604e5780636057361d146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a9565b005b60008054905090565b80600081905550505600a165627a7a723058207783dba41884f73679e167576362b7277f88458815141651f48ca38c25b498f80029`
  .
  - 이 바이트코드의 원본 소스 코드는 아래와 같습니다.

```solidity
pragma solidity ^0.4.24;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

이제 `0xbE3892d33620bE5aca8c75D39e7401871194d290`(KIP-7 컨트랙트)의 상태를 다른 컨트랙트의
바이트 코드(스토리지 컨트랙트)
스토리지 컨트랙트의 `retrieve`(함수 서명: `0x2e64cec1`)를 호출합니다.

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_call", "params": [{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0xbE3892d33620bE5aca8c75D39e7401871194d290", "input": "0x2e64cec1"}, "latest", {"0xbE3892d33620bE5aca8c75D39e7401871194d290": {"code":"0x6080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e64cec114604e5780636057361d146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a9565b005b60008054905090565b80600081905550505600a165627a7a723058207783dba41884f73679e167576362b7277f88458815141651f48ca38c25b498f80029"}}], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x0000000000000000000000000000000000000000000000000000000000000000"}
```

## eth_estimateGas <a id="eth_estimategas"></a>

트랜잭션을 완료하는 데 필요한 가스 양에 대한 추정치를 생성하고 반환합니다. 트랜잭션
은 블록체인에 추가되지 않습니다. 추정치는 EVM 메커니즘을 비롯한 다양한 이유로 인해 트랜잭션이 실제로 사용하는 가스 양보다 훨씬 많을 수 있습니다.

**매개변수**

| 이름         | Type   | 설명                                  |
| ---------- | ------ | ----------------------------------- |
| callObject | Object | 트랜잭션 호출 객체입니다. 객체의 속성은 다음 표를 참조하세요. |

`callObject`에는 다음과 같은 속성이 있습니다:

| 이름       | Type         | 설명                                                                                                          |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | (선택 사항) 트랜잭션이 전송된 것으로 시뮬레이션되는 주소입니다. 주소를 지정하지 않으면 `0x00...0` 주소가 사용됩니다.                  |
| to       | 20-byte DATA | (선택 사항) 트랜잭션이 전송되는 주소입니다.                                                                |
| gas      | QUANTITY     | (선택 사항) 무한 루프를 피하기 위한 코드 실행의 최대 가스 허용량. 기본값은 2^63 또는 노드 운영자가 --rpc.gascap을 통해 지정한 값입니다.  |
| gasPrice | QUANTITY     | (선택 사항) 실행 중 각 가스 단위에 대한 지불을 시뮬레이션할 `peb`의 수입니다. 기본값은 `0`peb입니다.                         |
| value    | QUANTITY     | (선택 사항) 트랜잭션과 함께 전송을 시뮬레이션할 `peb`의 양입니다. 기본값은 `0`입니다.                                    |
| input    | DATA         | (선택 사항) 메서드 서명 및 인코딩된 매개변수의 해시입니다. `data` 필드를 대체하지만 이전 버전과의 호환성을 위해 `data` 필드는 계속 지원됩니다. |

**예시 - callObject**

```json
{
  "from": "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3",
  "to": "0xebe8efa441b9302a0d7eaecc277c09d20d684540",
  "gas": "0x1bd7c",
  "input": "0xd459fc46000000000000000000000000000000000000000000000000000000000046c650dbb5e8cb2bac4d2ed0b1e6475d37361157738801c494ca482f96527eb48f9eec488c2eba92d31baeccfb6968fad5c21a3df93181b43b4cf253b4d572b64172ef000000000000000000000000000000000000000000000000000000000000008c00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000002b85c0c828d7a98633b4e1b65eac0c017502da909420aeade9a280675013df36bdc71cffdf420cef3d24ba4b3f9b980bfbb26bd5e2dcf7795b3519a3fd22ffbb2000000000000000000000000000000000000000000000000000000000000000238fb6606dc2b5e42d00c653372c153da8560de77bd9afaba94b4ab6e4aa11d565d858c761320dbf23a94018d843772349bd9d92301b0ca9ca983a22d86a70628"
}
```

**리턴 값**

| Type     | 설명           |
| -------- | ------------ |
| QUANTITY | 사용한 가스 양입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "eth_estimateGas", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}], "id": 1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x5208" // 21000
}
```

## eth_getTransactionByBlockHashAndIndex <a id="eth_gettransactionbyblockhashandindex"></a>

블록 해시 및 트랜잭션 인덱스 위치별로 트랜잭션에 대한 정보를 반환합니다.

이 API를 사용하기 전에 [주의-트랜잭션](./caution.md#transaction)을 확인하세요.

**매개변수**

| Type         | 설명                  |
| ------------ | ------------------- |
| 32-byte DATA | 블록의 해시.             |
| QUANTITY     | 트랜잭션 인덱스 위치의 정수입니다. |

**리턴 값**

[eth_getTransactionByHash](#eth_gettransactionbyhash)를 참조하세요.

**예시**

다양한 트랜잭션 유형의 예시를 보려면 [eth_getTransactionByHash](#eth_gettransactionbyhash)를 확인하세요.

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68", "0x0"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gas": "0x19a28",
    "gasPrice": "0x5d21dba00",
    "hash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "input": "0xa9059cbb000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8000000000000000000000000000000000000000000000000000000000cd0a3c0",
    "nonce": "0x1bea18",
    "r": "0x85d848276f22f8ce5aa17cd27ded21269e17cacc258ef2aaece296497803aa9",
    "s": "0x2d9ae07f349c66628b02db7033a8a35d18f6338c39f995d7e8336d635002df54",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionIndex": "0x3",
    "type": "0x0",
    "v": "0x25",
    "value": "0x0"
  }
}
```

## eth_getTransactionByBlockNumberAndIndex <a id="eth_gettransactionbyblocknumberandindex"></a>

블록 번호와 트랜잭션 인덱스 위치별로 트랜잭션에 대한 정보를 반환합니다.

이 API를 사용하기 전에 [주의-트랜잭션](./caution.md#transaction)을 확인하세요.

**매개변수**

| Type            | 설명                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](./block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |
| QUANTITY        | 트랜잭션 인덱스 위치입니다.                                                                                                                |

**리턴 값**

[eth_getTransactionByHash](#eth_gettransactionbyhash)를 참조하세요.

**예시**

다양한 트랜잭션 유형의 예시를 보려면 [eth_getTransactionByHash](#eth_gettransactionbyhash)를 확인하세요.

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x27", "0x0"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gas": "0x19a28",
    "gasPrice": "0x5d21dba00",
    "hash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "input": "0xa9059cbb000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8000000000000000000000000000000000000000000000000000000000cd0a3c0",
    "nonce": "0x1bea18",
    "r": "0x85d848276f22f8ce5aa17cd27ded21269e17cacc258ef2aaece296497803aa9",
    "s": "0x2d9ae07f349c66628b02db7033a8a35d18f6338c39f995d7e8336d635002df54",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionIndex": "0x3",
    "type": "0x0",
    "v": "0x25",
    "value": "0x0"
  }
}
```

## eth_getTransactionByHash <a id="eth_gettransactionbyhash"></a>

트랜잭션 해시로 요청된 트랜잭션에 대한 정보를 반환합니다.

이 API를 사용하기 전에 [주의-트랜잭션](./caution.md#transaction)을 확인하세요.

**매개변수**

| Type         | 설명           |
| ------------ | ------------ |
| 32-byte DATA | 트랜잭션의 해시입니다. |

**리턴 값**

트랜잭션 유형에 따라 트랜잭션 필드가 달라질 수 있습니다. 현재 이더리움의 트랜잭션 유형은 다음 세 가지입니다: Legacy, [AccessList](https://eips.ethereum.org/EIPS/eip-2930), [DynamicFee](https://eips.ethereum.org/EIPS/eip-1559).

`Object` - 트랜잭션 오브젝트, 또는 트랜잭션을 찾을 수 없는 경우 `null`입니다:

**레거시 트랜잭션**

| 이름               | Type         | 설명                                          |
| ---------------- | ------------ | ------------------------------------------- |
| blockHash        | 32-byte DATA | 이 트랜잭션이 있던 블록의 해시입니다. 보류 중인 경우 `null`.      |
| blockNumber      | QUANTITY     | 트랜잭션이 있었던 블록 번호입니다. 보류 중인 경우 `null`.        |
| from             | 20-byte DATA | 수신자의 주소.                                    |
| gas              | QUANTITY     | 발신자가 제공한 가스.                                |
| gasPrice         | QUANTITY     | 발신자가 제공한 가스 가격(단위: peb). |
| hash             | 32-byte DATA | 트랜잭션 해시.                                    |
| input            | DATA         | 트랜잭션과 함께 전송된 데이터입니다.                        |
| nonce            | QUANTITY     | 이 트랜잭션 이전에 발신자가 수행한 트랜잭션 수입니다.              |
| to               | 20-byte DATA | 발신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`.           |
| value            | QUANTITY     | 이 트랜잭션과 함께 전송된 값의 정수입니다.                    |
| transactionIndex | QUANTITY     | 블록에서 트랜잭션 인덱스 위치의 정수입니다. 보류 중인 경우 `null`.   |
| type             | QUANTITY     | 트랜잭션의 유형을 나타내는 정수입니다.                       |
| v                | QUANTITY     | ECDSA 복구 ID.                                |
| r                | 32-byte DATA | ECDSA 서명 r.                                 |
| s                | 32-byte DATA | ECDSA 서명 s.                                 |

**예시 - Legacy 트랜잭션**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gas": "0x19a28",
    "gasPrice": "0x5d21dba00",
    "hash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "input": "0xa9059cbb000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8000000000000000000000000000000000000000000000000000000000cd0a3c0",
    "nonce": "0x1bea18",
    "r": "0x85d848276f22f8ce5aa17cd27ded21269e17cacc258ef2aaece296497803aa9",
    "s": "0x2d9ae07f349c66628b02db7033a8a35d18f6338c39f995d7e8336d635002df54",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionIndex": "0x3",
    "type": "0x0",
    "v": "0x25",
    "value": "0x0"
  }
}
```

**AccessList 트랜잭션**

| 이름               | Type         | 설명                                                         |
| ---------------- | ------------ | ---------------------------------------------------------- |
| blockHash        | 32-byte DATA | 이 트랜잭션이 있던 블록의 해시입니다. 보류 중일 때는 `null`입니다.                  |
| blockNumber      | QUANTITY     | 이 트랜잭션이 있던 블록 번호입니다. 보류 중일 때는 `null`입니다.                   |
| from             | 20-byte DATA | 수신자의 주소.                                                   |
| gas              | QUANTITY     | 발신자가 제공한 가스.                                               |
| gasPrice         | QUANTITY     | 발신자가 제공한 가스 가격(peb 단위).                 |
| hash             | 32-byte DATA | 트랜잭션의 해시.                                                  |
| input            | DATA         | 트랜잭션과 함께 전송된 데이터입니다.                                       |
| nonce            | QUANTITY     | 발신자가 이 트랜잭션 이전에 수행한 트랜잭션 수입니다.                             |
| to               | 20-byte DATA | 발신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`.                          |
| value            | QUANTITY     | 이 트랜잭션과 함께 전송된 값의 정수입니다.                                   |
| transactionIndex | QUANTITY     | 블록에서 트랜잭션 인덱스 위치의 정수입니다. 보류 중일 때는 `null`입니다.               |
| type             | QUANTITY     | 트랜잭션 유형을 나타내는 정수입니다.                                       |
| accessList       | Array        | [accessList](https://eips.ethereum.org/EIPS/eip-2930)의 배열. |
| chainId          | QUANTITY     | 요청된 노드에 설정된 체인 아이디입니다.                                     |
| v                | QUANTITY     | ECDSA 복구 ID.                                               |
| r                | 32-byte DATA | ECDSA 서명 r.                                                |
| s                | 32-byte DATA | ECDSA 서명 s.                                                |

**예시 - AccessList 트랜잭션**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xfe134fa592b5acdd353fc3c25c3ba9979b8582fee3e5ac9740f418813b405038"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x12bb73d1bfd0b8ec005839acc69926d5699005c7738455848b3438a549457457",
    "blockNumber": "0x3c",
    "from": "0x3753f5bf8cca929eeeb4b74f200dfc6375ad5444",
    "gas": "0x52080",
    "gasPrice": "0x99999",
    "hash": "0xfe134fa592b5acdd353fc3c25c3ba9979b8582fee3e5ac9740f418813b405038",
    "input": "0x",
    "nonce": "0x3",
    "to": "0xca7a99380131e6c76cfa622396347107aeedca2d",
    "transactionIndex": "0x0",
    "value": "0x1",
    "type": "0x1",
    "accessList": [
      {
        "address": "0xca7a99380131e6c76cfa622396347107aeedca2d",
        "storageKeys": [
          "0x0709c257577296fac29c739dad24e55b70a260497283cf9885ab67b4daa9b67f"
        ]
      }
    ],
    "chainId": "0x2edaf",
    "v": "0x0",
    "r": "0x7c2568b6970bc2a87f828ef10dbd83057369cb62cf7c9e2b21357f04c3685cf0",
    "s": "0x21a32ce836b06acadcf507748909e5d7efaf49825b6eafff583b1e751e0cd306"
  }
}
```

**DynamicFee 트랜잭션**

| 이름                   | Type         | 설명                                                            |
| -------------------- | ------------ | ------------------------------------------------------------- |
| blockHash            | 32-byte DATA | 이 트랜잭션이 있었던 블록의 해시입니다. 보류 중일 때는 `null`입니다.                    |
| blockNumber          | QUANTITY     | 트랜잭션이 있었던 블록 번호입니다. 보류 중일 때는 `null`입니다.                       |
| from                 | 20-byte DATA | 수신자의 주소.                                                      |
| gas                  | QUANTITY     | 발신자가 제공한 가스.                                                  |
| gasPrice             | QUANTITY     | 발신자가 제공한 가스 가격(단위: peb).                   |
| maxFeePerGas         | QUANTITY     | 트랜잭션을 실행하기 위해 지불할 최대 금액입니다.                                   |
| maxPriorityFeePerGas | QUANTITY     | 동적 수수료 트랜잭션에 대한 가스 팁 상한(peb 단위)입니다.        |
| hash                 | 32-byte DATA | 트랜잭션의 해시입니다.                                                  |
| input                | DATA         | 트랜잭션과 함께 전송된 데이터입니다.                                          |
| nonce                | QUANTITY     | 이 트랜잭션 이전에 발신자가 수행한 트랜잭션 수입니다.                                |
| to                   | 20-byte DATA | 발신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`.                             |
| value                | QUANTITY     | 이 트랜잭션과 함께 전송된 값의 정수입니다.                                      |
| transactionIndex     | QUANTITY     | 블록에서 트랜잭션 인덱스 위치의 정수입니다. 보류 중일 때는 `null`입니다.                  |
| type                 | QUANTITY     | 트랜잭션의 유형을 나타내는 정수입니다.                                         |
| accessList           | Array        | [accessList](https://eips.ethereum.org/EIPS/eip-2930)의 배열입니다. |
| chainId              | QUANTITY     | 요청된 노드에 설정된 체인 아이디입니다.                                        |
| v                    | QUANTITY     | ECDSA 복구 ID.                                                  |
| r                    | 32-byte DATA | ECDSA 서명 r.                                                   |
| s                    | 32-byte DATA | ECDSA 서명 s.                                                   |

**예시 - DynamicFee 트랜잭션**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x40e64aac79b2e51b05d41adc005e45d4618ad5e8783f8fac9e3af63b4f6cf27d"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x2228ad3dd7588af51060adbdd6b4ac8c50ef91d59bea5399b2fa439138720886",
    "blockNumber": "0x4a",
    "from": "0x3753f5bf8cca929eeeb4b74f200dfc6375ad5444",
    "gas": "0x52080",
    "gasPrice": "0xa6528",
    "maxFeePerGas": "0xb6adf",
    "maxPriorityFeePerGas": "0x99999",
    "hash": "0x40e64aac79b2e51b05d41adc005e45d4618ad5e8783f8fac9e3af63b4f6cf27d",
    "input": "0x",
    "nonce": "0x4",
    "to": "0xca7a99380131e6c76cfa622396347107aeedca2d",
    "transactionIndex": "0x0",
    "value": "0x1",
    "type": "0x2",
    "accessList": [
      {
        "address": "0xca7a99380131e6c76cfa622396347107aeedca2d",
        "storageKeys": [
          "0x0709c257577296fac29c739dad24e55b70a260497283cf9885ab67b4daa9b67f"
        ]
      }
    ],
    "chainId": "0x2edaf",
    "v": "0x0",
    "r": "0xf7de95e3d4893cdb53c88fd5f7ec37a32df24da6a390259e470a5192cbefba46",
    "s": "0x2ba8cecb1332088ffc017cd9a08e613dabc306d16e593a42cda6f57def901292"
  }
}
```

## eth_getTransactionReceipt <a id="eth_gettransactionreceipt"></a>

트랜잭션 해시별로 트랜잭션 영수증을 반환합니다.

**참고**: 보류 중인 거래에는 영수증을 사용할 수 없습니다.

이 API를 사용하기 전에 [주의-TransactionReceipt](./caution.md#transaction_receipt)을 확인하시기 바랍니다.

**매개변수**

| 이름   | Type         | 설명           |
| ---- | ------------ | ------------ |
| Hash | 32-byte DATA | 트랜잭션의 해시입니다. |

**리턴 값**

`Object` - 트랜잭션 영수증 객체, 영수증을 찾을 수 없는 경우 `null`입니다.

| 이름                | Type          | 설명                                                                                                                                                                |
| ----------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash         | 32-byte DATA  | 이 트랜잭션이 있던 블록의 해시입니다.                                                                                                                                             |
| blockNumber       | QUANTITY      | 이 트랜잭션이 있던 블록 번호입니다.                                                                                                                                              |
| contractAddress   | DATA          | 트랜잭션이 컨트랙트 생성인 경우 생성된 컨트랙트 주소, 그렇지 않으면 `null`입니다.                                                                                                                 |
| cumulativeGasUsed | QUANTITY      | 이 트랜잭션이 블록에서 실행되었을 때 사용된 총 가스 양입니다.                                                                                                                               |
| effectiveGasPrice | QUANTITY      | 발신자 계정에서 공제된 가스당 실제 값입니다. EIP-1559 이전에는 트랜잭션의 가스 가격과 같습니다. 이후에는 baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas)와 같습니다. |
| from              | 20-byte DATA  | 수신자의 주소.                                                                                                                                                          |
| logs              | Array         | 이 트랜잭션이 생성한 로그 오브젝트의 배열입니다.                                                                                                                                       |
| logsBloom         | 256-byte DATA | 라이트 클라이언트가 관련 로그를 빠르게 검색할 수 있는 블룸 필터.                                                                                                                             |
| status            | QUANTITY      | `1`(성공) 또는 `0`(실패) 중 하나입니다.                                                                                                 |
| to                | 20-byte DATA  | 발신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`.                                                                                                                                 |
| transactionHash   | 32-byte DATA  | 트랜잭션의 해시.                                                                                                                                                         |
| transactionIndex  | QUANTITY      | 블록에서 트랜잭션 인덱스 위치의 정수입니다.                                                                                                                                          |
| type              | QUANTITY      | 트랜잭션의 유형을 나타내는 정수입니다.                                                                                                                                             |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "contractAddress": null,
    "cumulativeGasUsed": "0x8dc5d",
    "effectiveGasPrice": "0x315c2f4800",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gasUsed": "0xf6e9",
    "logs": [
      {
        "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
        "blockNumber": "0xd017a7",
        "data": "0x000000000000000000000000000000000000000000000000000000000cd0a3c0",
        "logIndex": "0x13",
        "removed": false,
        "topics": [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "0x00000000000000000000000046705dfff24256421a05d056c29e81bdc09723b8",
          "0x000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8"
        ],
        "transactionHash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
        "transactionIndex": "0x3"
      }
    ],
    "logsBloom": "0x00000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000400000000000000000008000000000000008000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000080000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000004000800000000000000000000000000000000000000000000000000000000000000",
    "status": "0x1",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionHash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "transactionIndex": "0x3",
    "type": "0x0"
  }
}
```

## eth_sendRawTransaction <a id="eth_sendrawtransaction"></a>

새 메시지 호출 트랜잭션 또는 서명된 트랜잭션에 대한 컨트랙트 생성을 생성합니다.

**매개변수**

| Type | 설명               |
| ---- | ---------------- |
| DATA | 서명된 트랜잭션 데이터입니다. |

**리턴 값**

| Type         | 설명                                       |
| ------------ | ---------------------------------------- |
| 32-byte DATA | 트랜잭션 해시 또는 트랜잭션을 아직 사용할 수 없는 경우 0 해시입니다. |

컨트랙트를 배포한 경우, [eth_getTransactionReceipt](#eth_gettransactionreceipt)를 사용하여 컨트랙트 주소를 가져옵니다.

**예시**

```shell
params: ["0x02f8738203e982022980850ba43b740082f61894a2a8854b1802d8cd5de631e690817c253d6a9153888ac7230489e8000080c001a0493a13b7eb1ad33c0b9043e4de1f2a5e8736407c8f039dd91b8bcba847c6b21ca0060b8063e42f8acc2bcc7d9d2e454491666452f3683cbc0dd768604b27bce6e3"]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## eth_sendTransaction <a id="eth_sendtransaction"></a>

주어진 파라미터로 트랜잭션을 구성하고, 발신자의 개인키로 트랜잭션에 서명하고, 트랜잭션을 클레이튼 네트워크에
트랜잭션을 클레이튼 네트워크에 전파합니다.

**참고**: 서명할 주소는 잠금 해제되어 있어야 합니다.

**매개변수**:

| 이름              | Type   | 설명                                   |
| --------------- | ------ | ------------------------------------ |
| transactionArgs | Object | 트랜잭션 인수의 객체입니다. 객체의 속성은 아래 표를 참조하세요. |

`transactionArgs`에는 다음과 같은 속성이 있습니다:

| 이름                   | Type         | 설명                                                                                                          |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| from                 | 20-byte DATA | 트랜잭션이 전송된 주소입니다.                                                                                            |
| to                   | 20-byte DATA | (새 컨트랙트 생성 시 필요하지 않음) 트랜잭션이 전달되는 주소입니다.                                                  |
| gas                  | QUANTITY     | (선택 사항) 트랜잭션 실행을 위해 제공된 가스의 정수입니다. 사용하지 않은 가스를 반환합니다.                                    |
| maxFeePerGas         | QUANTITY     | (선택 사항) 트랜잭션 실행에 지불할 최대 금액입니다.                                                           |
| maxPriorityFeePerGas | QUANTITY     | (선택 사항) 동적 수수료 트랜잭션에 대한 가스 팁 상한(peb 단위).                              |
| input                | DATA         | (선택 사항) 메서드 서명의 해시 및 인코딩된 매개변수입니다. `data` 필드를 대체하지만 이전 버전과의 호환성을 위해 `data` 필드는 계속 지원됩니다. |
| value                | QUANTITY     | (선택 사항) 이 트랜잭션과 함께 전송된 값의 정수입니다.                                                         |
| nonce                | QUANTITY     | (선택 사항) nonce의 정수입니다.                                                                    |

**리턴 값**

| Type         | 설명                                       |
| ------------ | ---------------------------------------- |
| 32-byte DATA | 트랜잭션 해시 또는 트랜잭션을 아직 사용할 수 없는 경우 0 해시입니다. |

컨트랙트를 배포한 경우, [eth_getTransactionReceipt](#eth_gettransactionreceipt)를 사용하여 컨트랙트 주소를 가져옵니다.

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee", "value": "0x1", "gas": "0x9999", "maxFeePerGas": "0x5d21dba00", "maxPriorityPerGas": "0x5d21dba00"}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## eth_signTransaction <a id="eth_signtransaction"></a>

나중에 eth_sendRawTransaction을 사용하여 네트워크에 제출할 수 있는 트랜잭션에 서명합니다.

**참고**: 서명할 주소는 잠금 해제되어 있어야 합니다.

**매개변수**:

| 이름              | Type   | 설명                                   |
| --------------- | ------ | ------------------------------------ |
| transactionArgs | Object | 트랜잭션 인수의 객체입니다. 객체의 속성은 아래 표를 참조하세요. |

`transactionArgs`에는 다음과 같은 속성이 있습니다:

| 이름                   | Type         | 설명                                                                                                          |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| from                 | 20-byte DATA | 트랜잭션이 전송된 주소입니다.                                                                                            |
| to                   | 20-byte DATA | (새 컨트랙트 생성 시 필요하지 않음) 트랜잭션이 전달되는 주소입니다.                                                  |
| gas                  | QUANTITY     | 트랜잭션 실행을 위해 제공된 가스의 정수입니다. 사용하지 않은 가스를 반환합니다.                                                               |
| maxFeePerGas         | QUANTITY     | 트랜잭션 실행에 지불할 최대 금액입니다.                                                                                      |
| maxPriorityFeePerGas | QUANTITY     | 동적 수수료 트랜잭션에 대한 가스 팁 상한(peb 단위)입니다.                                                      |
| input                | DATA         | (선택 사항) 메서드 서명 및 인코딩된 매개변수의 해시입니다. `data` 필드를 대체하지만 이전 버전과의 호환성을 위해 `data` 필드는 계속 지원됩니다. |
| value                | QUANTITY     | (선택 사항) 이 트랜잭션과 함께 전송된 값의 정수입니다.                                                         |
| nonce                | QUANTITY     | nonce의 정수입니다.                                                                                               |

**리턴 값**

`Object` - 서명된 트랜잭션 객체입니다.

| 이름  | Type   | 설명                                                          |
| --- | ------ | ----------------------------------------------------------- |
| raw | DATA   | `rawTransaction` 문자열(RLP 인코딩된 트랜잭션 문자열). |
| tx  | Object | 트랜잭션 개체입니다. 객체의 속성은 다음 표를 참조하세요.                            |

tx\`에는 다음과 같은 속성이 있습니다:

| 이름                   | Type         | 설명                                                                        |
| -------------------- | ------------ | ------------------------------------------------------------------------- |
| type                 | QUANTITY     | 트랜잭션의 유형을 나타내는 정수입니다.                                                     |
| nonce                | QUANTITY     | 이 트랜잭션이 있던 블록 번호입니다.                                                      |
| gasPrice             | QUANTITY     | 발신자가 제공한 가스 가격(단위: peb). 레거시 트랜잭션이 아닌 경우 `null`.       |
| maxFeePerGas         | QUANTITY     | 트랜잭션을 실행하기 위해 지불할 최대 금액입니다. 레거시 트랜잭션인 경우 `null`.                          |
| maxPriorityFeePerGas | QUANTITY     | 동적 수수료 트랜잭션에 대한 가스 팁 상한(단위: peb). 레거시 트랜잭션인 경우 `null`. |
| gas                  | QUANTITY     | 발신자가 제공한 가스.                                                              |
| value                | QUANTITY     | 이 트랜잭션과 함께 전송된 값의 정수입니다.                                                  |
| v                    | QUANTITY     | ECDSA 복구 ID.                                                              |
| r                    | 32-byte DATA | ECDSA 서명 r.                                                               |
| s                    | 32-byte DATA | ECDSA 서명 s.                                                               |
| chainId              | QUANTITY     | 요청 노드에 설정된 체인 아이디입니다.                                                     |
| accessList           | Array        | [accessList](https://eips.ethereum.org/EIPS/eip-2930)의 배열입니다.             |
| hash                 | 32-byte DATA | 트랜잭션의 해시입니다.                                                              |

**예시**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "raw": "0x02f86f8302edaf048505d21dba008505d21dba00829999948c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee0180c001a0b6e16781d247b505aa8eaf363a6ea61e7c23c77ad64846ffda28e73e31304884a05a296904cd009506cb5ed006af016d2c5dab255966af9ba6f8fc352f75e9b079",
    "tx": {
      "type": "0x2",
      "nonce": "0x4",
      "gasPrice": null,
      "maxPriorityFeePerGas": "0x5d21dba00",
      "maxFeePerGas": "0x5d21dba00",
      "gas": "0x9999",
      "value": "0x1",
      "input": "0x",
      "v": "0x1",
      "r": "0xb6e16781d247b505aa8eaf363a6ea61e7c23c77ad64846ffda28e73e31304884",
      "s": "0x5a296904cd009506cb5ed006af016d2c5dab255966af9ba6f8fc352f75e9b079",
      "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
      "chainId": "0x2edaf",
      "accessList": [],
      "hash": "0x9cfbea4942b334050660ec7207f3323ee13e3196b06279f922404384acbf7b47"
    }
  }
}
```

## eth_fillTransaction <a id="eth_filltransaction"></a>

주어진 서명되지 않은 트랜잭션의 기본값(nonce, gas, gasPrice 또는 1559 필드)을 채우고 호출자에게 반환반환하여 추가 처리(서명 + 브로드캐스트)를 진행합니다.

**매개변수**:

매개변수는 eth_sendTransaction과 동일합니다. [eth_sendtransaction](#eth_sendtransaction)을 참조하세요.

**반환 값**

[eth_signTransaction](#eth_signtransaction)을 참조하세요.

**예시**

```shell
// Request
curl http://localhost:8551 -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_fillTransaction", "params":[{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee", "value": "0x1", "gas": "0x9999", "maxFeePerGas": "0x5d21dba00"}],"id":1}'

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "raw": "0x02ef8302edaf808505d21dba008505d21dba00829999948c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee0180c0808080",
    "tx": {
      "type": "0x2",
      "nonce": "0x0",
      "gasPrice": null,
      "maxPriorityFeePerGas": "0x5d21dba00",
      "maxFeePerGas": "0x5d21dba00",
      "gas": "0x9999",
      "value": "0x1",
      "input": "0x",
      "v": "0x0",
      "r": "0x0",
      "s": "0x0",
      "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
      "chainId": "0x2edaf",
      "accessList": [],
      "hash": "0x83e382bfb39249dc0e2b4283702bc1c0685deffad1316d166546da9c4c14c59d"
    }
  }
}
```

## eth_pendingTransactions <a id="eth_pendingtransactions"></a>

트랜잭션 풀에 있고 발신 주소가 이 노드가 관리하는 계정 중 하나인 트랜잭션을 반환합니다.

**매개변수**:

없음

**반환 값**

| 이름                  | Type  | 설명                                                                                                     |
| ------------------- | ----- | ------------------------------------------------------------------------------------------------------ |
| pendingTransactions | Array | 트랜잭션 배열입니다. 반환된 트랜잭션 객체에 대해서는 [eth_signTransaction](#eth_signtransaction)를 참조하세요. |

**예시**

```shell
// Request
curl http://localhost:8551 -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_pendingTransactions", "params":[],"id":1}'

// Result
{
  "jsonrpc": "2.0",
  "id": 39,
  "result": [
    {
      "blockHash": null,
      "blockNumber": null,
      "from": "0xca7a99380131e6c76cfa622396347107aeedca2d",
      "gas": "0x5208",
      "gasPrice": "0x5d21dba00",
      "maxFeePerGas": "0x5d21dba00",
      "maxPriorityFeePerGas": "0x5d21dba00",
      "hash": "0xb5cd867ccc356b86634092919fb1acf4e315618d6c804df3ec3d30d66b6baba5",
      "input": "0x",
      "nonce": "0xdb",
      "to": "0x3e2ac308cd78ac2fe162f9522deb2b56d9da9499",
      "transactionIndex": null,
      "value": "0x1",
      "type": "0x2",
      "accessList": [],
      "chainId": "0x2edaf",
      "v": "0x1",
      "r": "0x73992e7c3b9f6cd73176969efa8509d8e9ae0739e24b03d514508f8ef03f19ef",
      "s": "0x7035dd8639e82ea3ba922ff02e1f21f4cff92d0de33050934f5c70908d61e8c3"
    }
  ]
}
```

## eth_resend <a id="eth_resend"></a>

트랜잭션을 다시 보냅니다.

지정된 트랜잭션을 풀에서 제거하고 새로운 가스 가격과 한도로 다시 삽입합니다.

**참고**: 서명할 주소는 잠금 해제되어 있어야 합니다.

**매개변수**:

| 이름              | Type     | 설명                                        |
| --------------- | -------- | ----------------------------------------- |
| transactionArgs | Object   | 트랜잭션 인수의 객체입니다. 객체의 속성은 아래 표를 참조하세요.      |
| 가스              | QUANTITY | 변경할 가스 가격의 정수                             |
| gas             | QUANTITY | (선택 사항) 변경할 가스의 정수입니다. |

`transactionArgs`에는 다음과 같은 속성이 있습니다:

| 이름                   | Type         | 설명                                                                                                          |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| from                 | 20-byte DATA | 트랜잭션이 전송된 주소입니다.                                                                                            |
| to                   | 20-byte DATA | 트랜잭션이 전달되는 주소입니다.                                                                                           |
| gas                  | QUANTITY     | (선택 사항) 트랜잭션 실행을 위해 제공된 가스의 정수입니다. 사용하지 않은 가스를 반환합니다.                                    |
| maxFeePerGas         | QUANTITY     | (선택 사항) 트랜잭션 실행을 위해 지불할 최대 금액입니다.                                                        |
| maxPriorityFeePerGas | QUANTITY     | (선택 사항) 동적 수수료 트랜잭션에 대한 가스 팁 상한(peb 단위).                              |
| input                | DATA         | (선택 사항) 메서드 서명 및 인코딩된 매개변수의 해시입니다. `data` 필드를 대체하지만 이전 버전과의 호환성을 위해 `data` 필드는 계속 지원됩니다. |
| value                | QUANTITY     | (선택 사항) 이 트랜잭션과 함께 전송된 값의 정수입니다.                                                         |
| nonce                | QUANTITY     | (선택 사항) nonce의 정수입니다.                                                                    |

**리턴 값**

| Type         | 설명              |
| ------------ | --------------- |
| 32-byte DATA | transactionHash |

**예시**

```shell
> var tx = eth.pendingTransactions()[0]
> eth.resend(tx, 750000000000, 300000)
```
