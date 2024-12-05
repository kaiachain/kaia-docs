# Transaction

## klay_call <a id="klay_call"></a>

블록체인에 트랜잭션을 생성하지 않고 즉시 새 메시지 호출을 실행합니다. 에러가 발생하면 데이터 또는 JSON RPC의 에러 객체를 반환합니다.

**매개변수**

| 이름                   | Type                    | 설명                                                                                                                             |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| callObject           | Object                  | 트랜잭션 호출 개체입니다.  객체의 속성은 다음 표를 참조하세요.                                                                                           |
| block number 또는 hash | QUANTITY \| TAG \| HASH | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](./block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

:::note

참고: Klaytn v1.7.0 이전 버전에서는 정수 블록 번호, 문자열 `"earliest"` 및 `"latest"`만 사용할 수 있습니다.

:::

`callObject`에는 다음과 같은 속성이 있습니다:

| 이름       | Type         | 설명                                                                                                                |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | (선택 사항) 트랜잭션이 전송되는 주소입니다.                                                                      |
| to       | 20-byte DATA | (새 컨트랙트 배포 테스트 시 선택 사항) 트랜잭션이 전송되는 주소입니다.                                                      |
| gas      | QUANTITY     | (선택 사항) 트랜잭션 실행을 위해 제공되는 가스의 정수입니다. `klay_call`은 가스를 전혀 소비하지 않지만, 일부 실행에서는 이 매개변수가 필요할 수 있습니다. |
| gasPrice | QUANTITY     | (선택 사항) 각 유료 가스에 사용되는 가스 가격의 정수입니다.                                                            |
| value    | QUANTITY     | (선택 사항) 이 트랜잭션과 함께 전송된 값의 정수입니다.                                                               |
| input    | DATA         | (선택 사항) 메서드 서명 및 인코딩된 매개변수의 해시입니다. `data` 필드를 대체하지만, 이전 버전과의 호환성을 위해 `data` 필드는 계속 지원됩니다.      |

**리턴 값**

| Type | 설명                |
| ---- | ----------------- |
| DATA | 실행된 컨트랙트의 반환값입니다. |

컨트랙트를 배포한 경우, [klay_getTransactionReceipt](#klay_gettransactionreceipt)를 사용하여 컨트랙트 주소를 가져옵니다.

**오류**

문제가 발생하면 JSON RPC의 에러 객체를 반환합니다.
예를 들어, `REVERT` 연산코드로 메시지 호출이 종료되면 "evm: 실행이 되돌려졌습니다"라는 메시지가 포함된 오류 객체가 생성됩니다.

**예제**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_call", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}, "latest"], "id": 1}' https://public-en-baobab.klaytn.net

// Result
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000000a"}
```

## klay_estimateGas <a id="klay_estimategas"></a>

트랜잭션을 완료하는 데 필요한 가스 양에 대한 추정치를 생성하고 반환합니다. 트랜잭션은 블록체인에 추가되지 않습니다. 클레이튼 가상머신 메커니즘과 노드 성능 등 다양한 이유로 인해 이 추정치는 트랜잭션이 실제로 사용하는 가스 양보다 훨씬 많을 수 있다는 점에 유의하세요.

**매개변수**

| 이름         | Type   | 설명                                   |
| ---------- | ------ | ------------------------------------ |
| callObject | Object | 트랜잭션 호출 개체입니다.  객체의 속성은 다음 표를 참조하세요. |

`callObject`에는 다음과 같은 속성이 있습니다:

| 이름       | Type         | 설명                                                                                                           |
| -------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| from     | 20-byte DATA | (선택 사항) 트랜잭션이 전송되는 주소입니다.                                                                 |
| to       | 20-byte DATA | (새 컨트랙트 배포 테스트 시 선택 사항) 트랜잭션이 전송되는 주소입니다.                                                 |
| gas      | QUANTITY     | (선택 사항) 가스 추정을 위해 제공된 가스 상한선의 정수입니다. 가스 상한을 지정하지 않으면 Klaytn 노드는 지정된 가스 상한을 상한으로 사용합니다.    |
| gasPrice | QUANTITY     | (선택 사항) 각 유료 가스에 사용된 가스 가격의 정수입니다.                                                        |
| value    | QUANTITY     | (선택 사항) 트랜잭션과 함께 전송된 값의 정수입니다.                                                            |
| input    | DATA         | (선택 사항) 메서드 서명 및 인코딩된 매개변수의 해시입니다. `data` 필드를 대체하지만, 이전 버전과의 호환성을 위해 `data` 필드는 계속 지원됩니다. |

**리턴 값**

| Type     | 설명           |
| -------- | ------------ |
| QUANTITY | 사용한 가스 양입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_estimateGas", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}], "id": 1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x5208" // 21000
}
```

## klay_estimateComputationCost <a id="klay_estimatecomputationcost"></a>

트랜잭션을 실행하는 데 얼마나 많은 연산 비용이 소요될지 예상치를 생성하여 반환합니다.
클레이튼은 한 트랜잭션에 너무 많은 시간이 걸리지 않도록 현재 트랜잭션의 계산 비용을 `100000000`로 제한하고 있습니다.
해당 트랜잭션은 [klay_estimateGas](#klay_estimategas)처럼 블록체인에 추가되지 않습니다.

**매개변수**

모든 프로퍼티는 선택 사항이라는 점을 제외하고는 [klay_call](#klay_call) 파라미터를 참조하세요.
가스 제한을 지정하지 않으면 Klaytn 노드는 기본 가스 제한(uint64 / 2)을 상한값으로 사용합니다.

**리턴 값**

| Type     | 설명               |
| -------- | ---------------- |
| QUANTITY | 사용된 계산 비용의 양입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_estimateComputationCost","params":[{"from":"0x73718c4980728857f3aa5148e9d1b471efa3a7dd", "to":"0x069942a3ca0dabf495dba872533134205764bc9c", "value":"0x0", "input":"0x2a31efc7000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000003039"}, "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x1e8b0ad"
}
```

## klay_getTransactionByBlockHashAndIndex <a id="klay_gettransactionbyblockhashandindex"></a>

블록 해시 및 트랜잭션 인덱스 위치별로 트랜잭션에 대한 정보를 반환합니다.
이 API는 JavaScript 콘솔이 아닌 RPC 호출에서만 작동합니다.

**매개변수**

| Type         | 설명                  |
| ------------ | ------------------- |
| 32-byte DATA | 블록의 해시.             |
| QUANTITY     | 트랜잭션 인덱스 위치의 정수입니다. |

**리턴 값**

[klay_getTransactionByHash](#klay_gettransactionbyhash)를 참조하세요.

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByBlockHashAndIndex","params":["0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68", "0x0"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x0591ceb74102fc4ed54b66d27e869224d481e9f44170b25ed4a5654675043198",
    "blockNumber":"0x27",
    "from":"0xe02837b9d671e0848e599c374416f383f8910e45",
    "gas":"0xf4240",
    "gasPrice":"0x5d21dba00",
    "hash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "input":"0x",
    "nonce":"0x1",
    "senderTxHash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "signatures":[
      {
        "V":"0xfea",
        "R":"0x1924d0f36e05d368a37b8130b85067f21f0ea1d35b87bf137216cdc3c844c762",
        "S":"0x31d61be4d5cf677e60ad0fa0214e75c3167509c8d8905d7c6f85979b5f32eead"
      }
    ],
    "to":"0x44d827f98430784c8e3401748d8ba92c43df4546",
    "transactionIndex":"0x0",
    "type":"TxTypeLegacyTransaction",
    "typeInt":0,
    "value":"0xde0b6b3a7640000"
  }
}
```

## klay_getTransactionByBlockNumberAndIndex <a id="klay_gettransactionbyblocknumberandindex"></a>

블록 번호와 트랜잭션 인덱스 위치별로 트랜잭션에 대한 정보를 반환합니다.
이 API는 JavaScript 콘솔이 아닌 RPC 호출에서만 작동합니다.

**매개변수**

| Type            | 설명                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](./block.md#the-default-block-parameter)에 있는 `earliest`, `latest` 또는 `pending` 문자열 또는 블록 해시입니다. |
| QUANTITY        | 트랜잭션 인덱스 위치입니다.                                                                                                                 |

:::note

참고: Klaytn v1.7.0 이전 버전에서는 정수 블록 번호, 문자열 `"earliest"` 및 `"latest"`만 사용할 수 있습니다.

:::

**리턴 값**

[klay_getTransactionByHash](#klay_gettransactionbyhash)를 참조하세요.

**예제**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByBlockNumberAndIndex","params":["0x27", "0x0"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x0591ceb74102fc4ed54b66d27e869224d481e9f44170b25ed4a5654675043198",
    "blockNumber":"0x27",
    "from":"0xe02837b9d671e0848e599c374416f383f8910e45",
    "gas":"0xf4240",
    "gasPrice":"0x5d21dba00",
    "hash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "input":"0x",
    "nonce":"0x1",
    "senderTxHash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "signatures":[
      {
        "V":"0xfea",
        "R":"0x1924d0f36e05d368a37b8130b85067f21f0ea1d35b87bf137216cdc3c844c762",
        "S":"0x31d61be4d5cf677e60ad0fa0214e75c3167509c8d8905d7c6f85979b5f32eead"
      }
    ],
    "to":"0x44d827f98430784c8e3401748d8ba92c43df4546",
    "transactionIndex":"0x0",
    "type":"TxTypeLegacyTransaction",
    "typeInt":0,
    "value":"0xde0b6b3a7640000"
  }
}
```

## klay_getTransactionByHash <a id="klay_gettransactionbyhash"></a>

트랜잭션 해시로 요청된 트랜잭션에 대한 정보를 반환합니다.
이 API는 JavaScript 콘솔이 아닌 RPC 호출에서만 작동합니다.

**매개변수**

| Type         | 설명           |
| ------------ | ------------ |
| 32-byte DATA | 트랜잭션의 해시입니다. |

**리턴 값**

`Object` - 트랜잭션 오브젝트, 또는 트랜잭션을 찾을 수 없는 경우 `null`입니다:

| 이름                 | Type         | 설명                                                                                                                                                                                |
| ------------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA | 이 트랜잭션이 있었던 블록의 해시입니다. 보류 중인 경우 `null`.                                                                                                                                           |
| blockNumber        | QUANTITY     | 이 트랜잭션이 있던 블록 번호. 보류 중인 경우 `null`.                                                                                                                                                |
| codeFormat         | String       | (선택 사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                                 |
| feePayer           | 20-byte DATA | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                                        |
| feePayerSignatures | Array        | (선택 사항) 수수료 납부자의 서명 객체 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다.          |
| feeRatio           | QUANTITY     | (선택 사항) 수수료 납부자의 수수료 비율입니다. 30이면 수수료의 30%를 수수료 납부자가 지불합니다. 70%는 발신자가 지불합니다.                                                                                    |
| from               | 20-byte DATA | 수신자의 주소.                                                                                                                                                                          |
| gas                | QUANTITY     | 발신자가 제공한 가스.                                                                                                                                                                      |
| gasPrice           | QUANTITY     | 발신자가 제공한 가스 가격(단위: peb).                                                                                                                                       |
| hash               | 32-byte DATA | 트랜잭션의 해시입니다.                                                                                                                                                                      |
| humanReadable      | Boolean      | (선택 사항) 주소가 사람이 읽을 수 있는 경우 `true`, 주소가 사람이 읽을 수 없는 경우 `false`.                                                                                                 |
| key                | String       | (선택 사항) 새로 만든 계정의 키입니다.                                                                                                                                        |
| input              | DATA         | (선택 사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                                   |
| nonce              | QUANTITY     | 이 트랜잭션 이전에 발신자가 수행한 트랜잭션의 수입니다.                                                                                                                                                   |
| senderTxHash       | 32-byte DATA | 보낸 사람만 서명한 트랜잭션의 해시(32-byte DATA). [SenderTxHash](../../../learn/transactions/transactions.md#sendertxhash)를 참조하세요. 이 값은 수수료 위임이 아닌 트랜잭션의 경우 항상 `hash`와 동일합니다. |
| signatures         | Array        | 서명 객체의 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다.                                             |
| to                 | 20-byte DATA | 발신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`.                                                                                                                                                 |
| transactionIndex   | QUANTITY     | 블록에서 트랜잭션 인덱스 위치의 정수입니다. 보류 중일 때는 `null`입니다.                                                                                                                                      |
| type               | String       | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                                                            |
| typeInt            | QUANTITY     | 트랜잭션 유형을 나타내는 정수입니다.                                                                                                                                                              |
| value              | QUANTITY     | 전송된 값입니다(단위: peb).                                                                                                                                             |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByHash","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "hash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_getTransactionBySenderTxHash <a id="klay_gettransactionbysendertxhash"></a>

발신자 트랜잭션 해시로 요청된 트랜잭션에 대한 정보를 반환합니다.
이 API는 JavaScript 콘솔이 아닌 RPC 호출에서만 작동합니다.
이 API는 `--sendertxhashindexing`으로 인덱싱 기능이 활성화된 경우에만 올바른 결과를 반환합니다.
이는 [klay_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled) 호출을 통해 확인할 수 있습니다.

**매개변수**

| Type         | 설명                                                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| 32-byte DATA | 보낸 사람만 서명한 트랜잭션의 해시(32-byte DATA). [SenderTxHash](../../../learn/transactions/transactions.md#sendertxhash)를 참조하세요. |

**리턴 값**

`Object` - 트랜잭션 오브젝트, 또는 트랜잭션을 찾을 수 없는 경우 `null`입니다:

| 이름                 | Type         | 설명                                                                                                                                                |
| ------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA | 이 트랜잭션이 있었던 블록의 해시입니다. 보류 중인 경우 `null`.                                                                                                           |
| blockNumber        | QUANTITY     | 이 트랜잭션이 있던 블록 번호. 보류 중인 경우 `null`.                                                                                                                |
| codeFormat         | String       | (선택 사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                 |
| feePayer           | 20-byte DATA | 수수료 납부자의 주소입니다.                                                                                                                                   |
| feePayerSignatures | Array        | 수수료 납부자의 서명 객체 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다.     |
| feeRatio           | QUANTITY     | (선택 사항) 수수료 납부자의 수수료 비율입니다. 30이면 수수료의 30%를 수수료 납부자가 지불합니다. 70이면 발신자가 70%를 지불합니다.                                               |
| from               | 20-byte DATA | 수신자의 주소.                                                                                                                                          |
| gas                | QUANTITY     | 발신자가 제공한 가스.                                                                                                                                      |
| gasPrice           | QUANTITY     | 발신자가 제공한 가스 가격(단위: peb).                                                                                                       |
| hash               | 32-byte DATA | 트랜잭션의 해시.                                                                                                                                         |
| humanReadable      | Boolean      | (선택 사항) 주소가 사람이 읽을 수 있는 주소인 경우 `true`, 사람이 읽을 수 없는 주소인 경우 `false`.                                                             |
| key                | String       | (선택 사항) 새로 만든 계정의 키입니다.                                                                                                        |
| input              | DATA         | (선택 사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                   |
| nonce              | QUANTITY     | 이 트랜잭션 이전에 발신자가 만든 트랜잭션의 수입니다.                                                                                                                    |
| senderTxHash       | 32-byte DATA | 발신자만 서명한 트랜잭션의 해시입니다. [SenderTxHash](../../../learn/transactions/transactions.md#sendertxhash)를 참조하세요. 이 값은 수수료 위임이 아닌 트랜잭션의 경우 항상 `hash`와 동일합니다. |
| signatures         | Array        | 서명 개체의 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다.             |
| to                 | 20-byte DATA | 발신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`.                                                                                                                 |
| transactionIndex   | QUANTITY     | 블록에서 트랜잭션 인덱스 위치의 정수입니다. 보류 중일 때는 `null`입니다.                                                                                                      |
| type               | String       | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                            |
| typeInt            | QUANTITY     | 트랜잭션의 유형을 나타내는 정수입니다.                                                                                                                             |
| value              | QUANTITY     | 전송된 값입니다(단위: peb).                                                                                                             |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionBySenderTxHash","params":["0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "hash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_getTransactionReceipt <a id="klay_gettransactionreceipt"></a>

트랜잭션 해시별로 트랜잭션 영수증을 반환합니다.

**참고**: 보류 중인 거래에는 영수증을 사용할 수 없습니다.

**매개변수**

| 이름 | Type         | 설명           |
| -- | ------------ | ------------ |
| .  | 32-byte DATA | 트랜잭션의 해시입니다. |

**리턴 값**

`Object` - 트랜잭션 영수증 객체, 영수증을 찾을 수 없는 경우 `null`입니다.

| 이름                 | Type                                    | 설명                                                                                                                                                                       |
| ------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHash          | 32-byte DATA                            | 이 트랜잭션이 있던 블록의 해시입니다.                                                                                                                                                    |
| blockNumber        | QUANTITY                                | 이 트랜잭션이 있던 블록 번호입니다.                                                                                                                                                     |
| codeFormat         | String                                  | (선택 사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                        |
| contractAddress    | DATA                                    | 트랜잭션이 컨트랙트 생성인 경우 생성된 컨트랙트 주소, 그렇지 않으면 `null`입니다.                                                                                                                        |
| feePayer           | 20-byte DATA                            | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                               |
| feePayerSignatures | Array                                   | (선택 사항) 수수료 납부자의 서명 객체 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다. |
| feeRatio           | QUANTITY                                | (선택 사항) 수수료 납부자의 수수료 비율입니다. 30이면 수수료의 30%를 수수료 납부자가 지불합니다. 70%는 발신자가 지불합니다.                                                                           |
| from               | 20-byte DATA                            | 수신자의 주소.                                                                                                                                                                 |
| gas                | QUANTITY                                | 발신자가 제공한 가스.                                                                                                                                                             |
| effectiveGasPrice  | QUANTITY                                | 발신자 계정에서 공제된 가스당 실제 값입니다.                                                                                                                                                |
| gasPrice           | QUANTITY                                | 발신자가 제공한 가스 가격(단위: peb).                                                                                                                              |
| gasUsed            | QUANTITY                                | 이 특정 트랜잭션에서만 사용한 가스 양입니다.                                                                                                                                                |
| humanReadable      | Boolean                                 | (선택 사항) 주소가 사람이 읽을 수 있는 경우 `true`, 주소가 사람이 읽을 수 없는 경우 `false`.                                                                                        |
| key                | String                                  | (선택 사항) 새로 만든 계정의 키입니다.                                                                                                                               |
| input              | DATA                                    | (선택 사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                          |
| logs               | Array                                   | 이 트랜잭션이 생성한 로그 개체의 배열입니다.                                                                                                                                                |
| logsBloom          | 256-byte DATA                           | 라이트 클라이언트가 관련 로그를 빠르게 검색할 수 있는 블룸 필터입니다.                                                                                                                                 |
| nonce              | QUANTITY                                | 이 트랜잭션 이전에 발신자가 만든 트랜잭션의 수입니다.                                                                                                                                           |
| senderTxHash       | (선택 사항) 32-byte DATA | 수수료 납부자의 주소와 서명이 없는 트랜잭션의 해시입니다. 이 값은 수수료 위임이 아닌 트랜잭션의 경우 트랜잭션 해시 값과 항상 동일합니다.                                                                                           |
| signature          | Array                                   | 서명 개체의 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다.                                    |
| state              | QUANTITY                                | `1`(성공) 또는 `0`(실패) 중 하나입니다.                                                                                                        |
| txError            | QUANTITY                                | (선택 사항) `status`가 0인 경우 상세 오류 코드.                                                                                                                     |
| to                 | 20-byte DATA                            | 발신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`.                                                                                                                                        |
| transactionHash    | 32-byte DATA                            | 트랜잭션의 해시입니다.                                                                                                                                                             |
| transactionIndex   | QUANTITY                                | 블록에서 트랜잭션 인덱스 위치의 정수입니다.                                                                                                                                                 |
| type               | String                                  | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                                                   |
| typeInt            | QUANTITY                                | 트랜잭션의 유형을 나타내는 정수입니다.                                                                                                                                                    |
| value              | QUANTITY                                | 전송된 값입니다(단위: peb).                                                                                                                                    |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionReceipt","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "contractAddress":null,
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "effectiveGasPrice":"0x5d21dba00",
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "gasUsed":"0x7918",
    "logs":[],
    "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "status":"0x1",
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionHash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_getTransactionReceiptBySenderTxHash <a id="klay_gettransactionreceiptbysendertxhash"></a>

발신자 트랜잭션 해시별로 트랜잭션 영수증을 반환합니다.

**참고**: 보류 중인 트랜잭션에는 영수증을 사용할 수 없습니다.
이 API는 인덱싱 기능이 `--sendertxhashindexing`으로 활성화된 경우에만 올바른 결과를 반환합니다.
이는 [klay_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled)를 호출하여 확인할 수 있습니다.

**매개변수**

| 이름 | Type         | 설명                                                               |
| -- | ------------ | ---------------------------------------------------------------- |
| .  | 32-byte DATA | 수수료 지불자 서명 전 트랜잭션의 해시(senderTransactionHash). |

**리턴 값**

`Object` - 트랜잭션 영수증 객체, 영수증을 찾을 수 없는 경우 `null`입니다.

| 이름                 | Type                                    | 설명                                                                                                                                            |
| ------------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA                            | 이 트랜잭션이 있던 블록의 해시입니다.                                                                                                                         |
| blockNumber        | QUANTITY                                | 이 트랜잭션이 있던 블록 번호입니다.                                                                                                                          |
| codeFormat         | String                                  | (선택 사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                             |
| contractAddress    | DATA                                    | 트랜잭션이 컨트랙트 생성인 경우 생성된 컨트랙트 주소, 그렇지 않으면 `null`입니다.                                                                                             |
| feePayer           | 20-byte DATA                            | 수수료 납부자의 주소입니다.                                                                                                                               |
| feePayerSignatures | Array                                   | 수수료 납부자의 서명 객체 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다. |
| feeRatio           | QUANTITY                                | (선택 사항) 수수료 납부자의 수수료 비율입니다. 30이면 수수료의 30%를 수수료 납부자가 지불합니다. 70%는 발신자가 지불합니다.                                                |
| from               | 20-byte DATA                            | 수신자의 주소.                                                                                                                                      |
| gas                | QUANTITY                                | 발신자가 제공한 가스.                                                                                                                                  |
| gasPrice           | QUANTITY                                | 발신자가 제공한 가스 가격(단위: peb).                                                                                                   |
| gasUsed            | QUANTITY                                | 이 특정 트랜잭션에서만 사용한 가스 양입니다.                                                                                                                     |
| humanReadable      | Boolean                                 | (선택 사항) 주소가 사람이 읽을 수 있는 주소인 경우 `true`, 사람이 읽을 수 없는 주소인 경우 `false`.                                                         |
| key                | String                                  | (선택 사항) 새로 만든 계정의 키입니다.                                                                                                    |
| input              | DATA                                    | (선택 사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                               |
| logs               | Array                                   | 이 트랜잭션이 생성한 로그 객체의 배열입니다.                                                                                                                     |
| logsBloom          | 256-byte DATA                           | 라이트 클라이언트가 관련 로그를 빠르게 검색할 수 있는 블룸 필터입니다.                                                                                                      |
| nonce              | QUANTITY                                | 이 트랜잭션 이전에 발신자가 수행한 트랜잭션의 수입니다.                                                                                                               |
| senderTxHash       | (선택 사항) 32-byte DATA | 수수료 납부자의 주소와 서명이 없는 트랜잭션의 해시입니다. 이 값은 수수료 위임이 아닌 트랜잭션의 경우 트랜잭션 해시 값과 항상 동일합니다.                                                                |
| signature          | Array                                   | 서명 객체의 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다.         |
| state              | QUANTITY                                | `1`(성공) 또는 `0`(실패) 중 하나입니다.                                                                             |
| txError            | QUANTITY                                | (선택 사항) `status`가 0인 경우 상세 오류 코드.                                                                                          |
| to                 | 20-byte DATA                            | 발신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`.                                                                                                             |
| transactionHash    | 32-byte DATA                            | 트랜잭션의 해시.                                                                                                                                     |
| transactionIndex   | QUANTITY                                | 블록에서 트랜잭션 인덱스 위치의 정수입니다.                                                                                                                      |
| type               | String                                  | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                        |
| typeInt            | QUANTITY                                | 트랜잭션 유형을 나타내는 정수입니다.                                                                                                                          |
| value              | QUANTITY                                | 전송된 값입니다(단위: peb).                                                                                                         |

**예제**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionReceiptBySenderTxHash","params":["0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "contractAddress":null,
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "gasUsed":"0x7918",
    "logs":[],
    "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "status":"0x1",
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionHash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_sendRawTransaction <a id="klay_sendrawtransaction"></a>

새 메시지 호출 트랜잭션 또는 서명된 트랜잭션에 대한 컨트랙트 생성을 생성합니다.

**매개변수**

| Type | 설명               |
| ---- | ---------------- |
| DATA | 서명된 트랜잭션 데이터입니다. |

**반환 값**

| Type         | 설명                                       |
| ------------ | ---------------------------------------- |
| 32-byte DATA | 트랜잭션 해시 또는 트랜잭션을 아직 사용할 수 없는 경우 0 해시입니다. |

컨트랙트를 배포한 경우, [klay_getTransactionReceipt](#klay_gettransactionreceipt)를 사용하여 컨트랙트 주소를 가져옵니다.

**예시**

```shell
params: ["0x08f888820228850ba43b740082f61894a2a8854b1802d8cd5de631e690817c253d6a9153888ac7230489e8000094a2a8854b1802d8cd5de631e690817c253d6a9153f847f8458207f6a0abaaeef1ccaead65c63885b1ad35410442e4e070aff67a0c00ac73576dd958cda06b49e555f2ac5c7cff9e70b59a564214db8fafb92b131afcd5fc5aebbe257681"]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendRawTransaction","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## klay_sendTransaction <a id="klay_sendtransaction"></a>

주어진 파라미터로 트랜잭션을 구성하고, 발신자의 개인키로 트랜잭션에 서명하고, 트랜잭션을 Klaytn 네트워크에 전파합니다.

**참고**: 서명할 주소는 잠금 해제되어 있어야 합니다.

**매개변수**

트랜잭션 유형에 따라 필요한 파라미터가 달라집니다.
[클레이튼 트랜잭션 유형 작업하기](./transaction-type-support.md)에서 적절한 파라미터를 확인하세요.

**리턴 값**

| Type         | 설명         |
| ------------ | ---------- |
| 32-byte DATA | 트랜잭션 해시입니다 |

컨트랙트를 배포한 경우, [klay_getTransactionReceipt](#klay_gettransactionreceipt)를 사용하여 컨트랙트 주소를 가져옵니다.

**예제**

```shell
params: [{
  "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x76c0",
  "gasPrice": "0x5d21dba00",
  "value": "0x9184e72a",
  "input": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendTransaction","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## klay_sendTransactionAsFeePayer <a id="klay_sendtransactionasfeepayer"></a>

주어진 파라미터로 트랜잭션을 구성하고, 수수료 납부자의 개인키로 트랜잭션에 서명하고, 트랜잭션을 Klaytn 네트워크에 전파합니다.
이 API는 수수료 위임형(부분 수수료 위임형 포함) 트랜잭션만 지원합니다.

**참고**: 서명할 요금 납부자 주소는 잠금 해제되어 있어야 합니다.

**매개변수**

트랜잭션 유형에 따라 필요한 파라미터가 달라집니다.
[클레이튼 트랜잭션 유형 작업하기](./transaction-type-support.md)에서 적절한 파라미터를 확인하세요.

**리턴 값**

| Type         | 설명         |
| ------------ | ---------- |
| 32-byte DATA | 트랜잭션 해시입니다 |

컨트랙트를 배포한 경우, [klay_getTransactionReceipt](#klay_gettransactionreceipt)를 사용하여 컨트랙트 주소를 가져옵니다.

**예시**

```shell
params: [{
  "typeInt": 18,
  "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
  "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075",
  "gas": "0x4a380",
  "gasPrice": "0x5d21dba00",
  "nonce": "0x2c",
  "value": "0xf4",
  "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
  "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
  "feeRatio": 30,
  "signatures": [{
    "V": "0x4e43", 
    "R": "0xd3ff5ca7bdd0120d79e8aa875593d05022fe74ce2b7a0594218d53c0fdca7fa9", 
    "S": "0x2c100e69d2455afc9393e017514063da18b18db6f7e811d0aeaf6002515b58ef"
  }]
}]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendTransactionAsFeePayer","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x77ec2d910d0b96585373e2d6508f2b2d8c2af7d0060d2012e1cb2f0ee9d74830"
}
```

## klay_signTransaction <a id="klay_signtransaction"></a>

주어진 파라미터로 트랜잭션을 구성하고 발신자의 개인키를 사용해 트랜잭션에 서명합니다.
이 메서드는 발신자 서명을 생성하거나 클레이튼 네트워크에 제출할 준비가 된 최종 Raw 트랜잭션을 만드는 데 사용할 수 있습니다.

**참고**: 서명할 주소는 잠금 해제되어 있어야 합니다.

**매개변수**

트랜잭션 유형에 따라 필요한 파라미터가 달라집니다.
[클레이튼 트랜잭션 유형 작업하기](./transaction-type-support.md)에서 적절한 파라미터를 확인하세요.

**리턴 값**

| Type | 설명                   |
| ---- | -------------------- |
| raw  | 서명된 Raw 트랜잭션         |
| tx   | 발신자의 서명을 포함한 트랜잭션 객체 |

**예시**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_signTransaction", "params":[{"from":"0x77982323172e5b6182539d3522d5a33a944206d4", "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa", "value":"0x10000", "gas":"0x1000000", "nonce":"0x2", "gasprice":"0x25000000000"}],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":{
    "raw":"0xf86c0286025000000000840100000094cd6bfdb523a4d030890d28bf1eb6ef36307c9aaa8301000080820fe8a056d2ddd231c3c111687ab351d339240db18cd721e5aa33c601dd4fc3927fb4d1a03443443392517aa7da082aa0a00b9ee5e3e1ee007d22e57cd9ff55b5ddbf4a64",
    "tx":{
      "nonce":"0x2",
      "gasPrice":"0x5d21dba00",
      "gas":"0x1000000",
      "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa",
      "value":"0x10000",
      "input":"0x",
      "v":"0xfe8",
      "r":"0x56d2ddd231c3c111687ab351d339240db18cd721e5aa33c601dd4fc3927fb4d1",
      "s":"0x3443443392517aa7da082aa0a00b9ee5e3e1ee007d22e57cd9ff55b5ddbf4a64",
      "hash":"0xb53cc9128a19c3916c0de1914725b7337bba84666c2556d8682c72ca34c6874c"
    }
  }
}
```

## klay_signTransactionAsFeePayer <a id="klay_signtransactionasfeepayer"></a>

주어진 매개변수로 트랜잭션을 구성하고 수수료 납부자의 개인키를 사용해 트랜잭션에 서명합니다.
이 메서드는 수수료 납부자 서명을 생성하거나 클레이튼 네트워크에 제출할 준비가 된 최종 Raw 트랜잭션을 만드는 데 사용할 수 있습니다.
수수료 납부자 서명만 추출하고 싶다면, 결과에서 `feePayerSignatures`를 가져가면 됩니다.
발신자의 서명이 첨부되지 않은 경우(즉, `tx`의 `signatures`가 비어있는 경우) `raw` 트랜잭션은 최종 트랜잭션이 아니라는 점에 유의하세요.

**참고**: 서명할 요금 납부자 주소는 잠금 해제되어 있어야 합니다.

**매개변수**

트랜잭션 유형에 따라 필요한 파라미터가 달라집니다.
[클레이튼 트랜잭션 유형으로 작업하기](./transaction-type-support.md)에서 적절한 파라미터를 확인하세요.

**리턴 값**

| Type | 설명                       |
| ---- | ------------------------ |
| raw  | 서명된 Raw 트랜잭션             |
| tx   | 수수료 납부자의 서명을 포함한 트랜잭션 객체 |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransactionAsFeePayer", "params": [{"typeInt": 17, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x76c0", "gasPrice": "0x5d21dba00", "value": "0xf4", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"}], "id": 83}' http://127.0.0.1:8551

// Result
{
    "id": 83,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x11f8ba358505d21dba008276c09444711e89b0c23845b5b2ed9d3716ba42b8a3e07581f494cd01b2b44584fb143824c1ea0231bebaea826b9da4b3f98adc0000000000000000000000000000000000000000000000000000000000000001c094cd01b2b44584fb143824c1ea0231bebaea826b9df847f845824e43a0b34470d1bb588a6afe8f170333ca147e805727aa1911353ed544c31ad4863beca020322c2727091ff79458a87a424b53a4b08cc3d7d485e002e8bf0add13974507",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [
                {
                    "R": "0xb34470d1bb588a6afe8f170333ca147e805727aa1911353ed544c31ad4863bec",
                    "S": "0x20322c2727091ff79458a87a424b53a4b08cc3d7d485e002e8bf0add13974507",
                    "V": "0x4e43"
                }
            ],
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x76c0",
            "gasPrice": "0x5d21dba00",
            "hash": "0x9e76f754b884d7853814a39c0e51fcefcef6f55b872f00ddad9724c9638128b3",
            "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
            "nonce": "0x35",
            "signatures": [],
            "to": "0x44711e89b0c23845b5b2ed9d3716ba42b8a3e075",
            "type": "TxTypeFeeDelegatedValueTransferMemo",
            "typeInt": 17,
            "value": "0xf4"
        }
    }
}
```

## txError: 트랜잭션 실패에 대한 상세 정보 <a id="txerror-detailed-information-of-transaction-failures"></a>

클레이튼은 트랜잭션 영수증에 `txError` 필드를 제공하여
필드를 제공하여 개발자에게 트랜잭션 실행 실패 이유에 대한 자세한 정보를 제공합니다.
이 필드는 트랜잭션 실행이 실패한 경우에만 존재합니다.
저장 공간과 네트워크 대역폭을 절약하기 위해 `txError`는 정수 값을 포함합니다.
아래 표는 `txError`에 포함된 값의 의미를 보여줍니다.

| 오류 코드 | 설명                                                                              |
| ----- | ------------------------------------------------------------------------------- |
| 0x02  | 스마트 컨트랙트 실행 중 VM 오류 발생                                                          |
| 0x03  | 최대 호출 깊이 초과                                                                     |
| 0x04  | 컨트랙트 주소 충돌                                                                      |
| 0x05  | 컨트랙트 생성 코드 저장 공간 부족                                                             |
| 0x06  | EVM: 최대 코드 크기 초과                                                                |
| 0x07  | 가스 부족                                                                           |
| 0x08  | EVM: 쓰기 보호                                                                      |
| 0x09  | EVM: 실행 되돌리기                                                                    |
| 0x0a  | tx에 대한 연산 코드 계산 비용 제한(100000000)에 도달했습니다.                    |
| 0x0b  | 계정이 이미 존재합니다                                                                    |
| 0x0c  | 프로그램 계정이 아닙니다(예: 코드와 저장소가 있는 계정)                             |
| 0x0d  | 사람이 읽을 수 있는 주소는 현재 지원되지 않습니다                                                    |
| 0x0e  | 수수료 비율이 [1, 99] 범위를 벗어났습니다. |
| 0x0f  | AccountKeyFail을 업데이트할 수 없습니다                                                    |
| 0x10  | 다른 계정 키 유형입니다                                                                   |
| 0x11  | 계정에 계정 키가 초기화될 수 없습니다                                                           |
| 0x12  | 공개 키가 커브에 없습니다                                                                  |
| 0x13  | 키 가중치가 0입니다                                                                     |
| 0x14  | 키가 직렬화할 수 없습니다                                                                  |
| 0x15  | 중복된 키                                                                           |
| 0x16  | 가중 합계 오버플로                                                                      |
| 0x17  | 만족할 수 없는 임계값. 키의 가중 합이 임계값보다 작습니다.                                              |
| 0x18  | 길이 0입니다                                                                         |
| 0x19  | 길이 너무 깁니다                                                                       |
| 0x1a  | 중첩된 복합 유형입니다                                                                    |
| 0x1b  | 레거시 트랜잭션은 레거시 계정 키를 사용해야 합니다                                                    |
| 0x1c  | 사용되지 않는 기능                                                                      |
| 0x1d  | 지원되지 않음                                                                         |
| 0x1e  | 스마트 컨트랙트 코드 형식이 유효하지 않습니다                                                       |

## klay_getDecodedAnchoringTransactionByHash <a id="klay_getDecodedAnchoringTransactionByHash"></a>

주어진 트랜잭션 해시에 대해 트랜잭션에서 디코딩된 앵커 데이터를 반환합니다.

**매개변수**

| Type         | 설명           |
| ------------ | ------------ |
| 32-byte DATA | 트랜잭션의 해시입니다. |

**반환 값**

| 이름            | Type         | 설명                                                                                                              |
| ------------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| data          | 32-byte DATA | 이 앵커링 트랜잭션이 수행된 차일드 체인 블록의 해시입니다.                                                                               |
| data          | QUANTITY     | 앵커링 트랜잭션이 수행된 차일드 체인 블록 번호입니다.                                                                                  |
| parentHash    | 32-byte DATA | 부모 블록의 해시입니다.                                                                                                   |
| TxHash        | 32-byte DATA | 블록의 트랜잭션 시도 루트입니다.                                                                                              |
| StateRootHash | 32-byte DATA | 블록의 최종 상태 시도 루트의 해시입니다.                                                                                         |
| ReceiptHash   | 32-byte DATA | 블록의 영수증 트라이의 루트입니다.                                                                                             |
| BlockCount    | QUANTITY     | 이 앵커링 기간 동안 생성된 블록의 수입니다. 이 트랜잭션이 앵커링을 켠 후 첫 번째 앵커링 트랜잭션인 경우를 제외하고 대부분의 경우 이 숫자는 차일드 체인의 `SC_TX_PERIOD`와 동일합니다. |
| TxCount       | QUANTITY     | 이 앵커링 기간 동안 자식 체인에서 생성된 트랜잭션의 수입니다.                                                                             |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getDecodedAnchoringTransactionByHash","params":["0x499350bc5e2f6fee1ba78b4d40a7a1db0a64f3c091112e6798a02ed9a4140084"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "BlockCount":1,
      "BlockHash":"0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
      "BlockNumber":1055,
      "ParentHash":"0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
      "ReceiptHash":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "StateRootHash":"0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
      "TxCount":0,
      "TxHash":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
   }
}
```

```javascript
> klay.getDecodedAnchoringTransactionByHash("0x499350bc5e2f6fee1ba78b4d40a7a1db0a64f3c091112e6798a02ed9a4140084")
{
  BlockCount: 1,
  BlockHash: "0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
  BlockNumber: 1055,
  ParentHash: "0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
  ReceiptHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  StateRootHash: "0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
  TxCount: 0,
  TxHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```

## klay_resend <a id="klay_resend"></a>

트랜잭션을 다시 보냅니다.

지정된 트랜잭션을 풀에서 제거하고 새로운 가스 가격과 한도로 다시 삽입합니다.

**참고**: 서명할 주소는 잠금 해제되어 있어야 합니다.

**매개변수**:

| 이름              | Type     | 설명                                        |
| --------------- | -------- | ----------------------------------------- |
| transactionArgs | Object   | 트랜잭션 인수의 객체입니다. 객체의 속성은 아래 표를 참조하세요.      |
| 가스              | QUANTITY | 변경할 가스 가격의 정수                             |
| gas             | QUANTITY | (선택 사항) 변경할 가스의 정수입니다. |

트랜잭션 유형에 따라 트랜잭션Args에 필요한 파라미터가 달라집니다.
[클레이튼 트랜잭션 유형 작업하기](./transaction-type-support.md)에서 적절한 파라미터를 확인하세요.

**리턴 값**

| Type         | 설명         |
| ------------ | ---------- |
| 32-byte DATA | 트랜잭션 해시입니다 |

**예시**

```shell
> var tx = klay.pendingTransactions()[0]
> klay.resend(tx, 750000000000, 300000)
```
