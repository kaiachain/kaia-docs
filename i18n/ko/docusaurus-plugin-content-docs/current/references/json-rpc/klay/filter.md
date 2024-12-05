# Filter

## klay_getFilterChanges <a id="klay_getfilterchanges"></a>

필터에 대한 폴링 메서드로, 마지막 폴링 이후 발생한 로그 배열을 반환합니다.

**매개변수**

| 이름       | 유형     | 설명                                            |
| -------- | ------ | --------------------------------------------- |
| QUANTITY | String | 필터 ID(_예:_, "0x16" // 22). |

**리턴 값**

`Array`- 로그 객체의 배열, 또는 마지막 폴링 이후 변경된 사항이 없는 경우 빈 배열입니다.

- [klay_newBlockFilter](#klay_newblockfilter)로 생성된 필터의 경우, 반환값은 블록 해시(32-byte DATA)입니다.
- [klay_newPendingTransactionFilter](#klay_newpendingtransactionfilter)로 생성된 필터의 경우, 반환은 트랜잭션
  해시(32-byte DATA), \*예: \*, `["0x6345343454645..."]`입니다.
- [klay_newFilter](#klay_newfilter)로 생성된 필터의 경우, 로그는 다음과 같은 파라미터를 가진 객체입니다:

| 이름               | 유형           | 설명                                                                                                                                                  |
| ---------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| removed          | TAG          | `true` 체인 재구성으로 인해 로그가 제거된 경우. 유효한 로그인 경우 `false`.                                                                                                  |
| logIndex         | QUANTITY     | 블록에서 로그 인덱스 위치의 정수입니다. 보류 중인 로그인 경우 `null`.                                                                                                         |
| transactionIndex | QUANTITY     | 로그가 생성된 트랜잭션 인덱스 위치의 정수입니다. 보류 중일 때는 `null`.                                                                                                        |
| transactionHash  | 32-byte DATA | 이 로그가 생성된 트랜잭션의 해시입니다. 보류 중일 때는 `null`입니다.                                                                                                          |
| blockHash        | 32-byte DATA | 이 로그가 들어있는 블록의 해시입니다. 보류 중일 때는 `null`입니다.                                                                                                           |
| blockNumber      | QUANTITY     | 이 로그가 있던 블록 번호입니다. 보류 중인 경우 `null`.                                                                                                                 |
| address          | 20-byte DATA | 이 로그가 발생한 주소입니다.                                                                                                                                    |
| data             | DATA         | 로그의 인덱싱되지 않은 인수를 포함합니다.                                                                                                                             |
| topics           | DATA Array   | 인덱싱된 로그 인수의 0\~4개 32-byte DATA 배열입니다. (Solidity에서: 첫 번째 토픽은 이벤트 서명의 해시입니다(_예:_ `Deposit(주소,byte32,uint256)`). |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getFilterChanges","params":["0x16"],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
    "id":1,
    "jsonrpc":"2.0",
    "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
        ...
    }]
}
```

## klay_getFilterLogs <a id="klay_getfilterlogs"></a>

[klay_newFilter](#klay_newfilter)를 사용하여 얻은 기존 아이디의 필터와 일치하는 모든 로그의 배열을 반환합니다.  [klay_newBlockFilter](#klay_newblockfilter) 또는 [klay_newPendingTransactionFilter](#klay_newpendingtransactionfilter)와 같은 다른 필터 생성 함수에서 반환된 필터 ID는 이 함수와 함께 사용할 수 없습니다,

클레이튼 노드의 리소스를 안전하게 관리하기 위해 두 가지 노드 설정으로 이 API의 실행을 제한할 수 있습니다.

- 단일 쿼리에서 반환되는 최대 결과 수 (기본값: 10,000개).
- 단일 쿼리의 실행 시간 제한 (기본값: 10초).

**매개변수**

| 이름       | 유형     | 설명    |
| -------- | ------ | ----- |
| QUANTITY | String | 필터 ID |

**리턴 값**

[klay_getFilterChanges](#klay_getfilterchanges)를 참조하세요.

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getFilterLogs","params":["0xd32fd16b6906e67f6e2b65dcf48fc272"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":[{
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"],
      "data":"0x0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000007b",
      "blockNumber":"0x54",
      "transactionHash":"0xcd4703cd62bd930d4652999bce8dcb75b7ade49d922fa42dc11e568c52a5fa6f",
      "transactionIndex":"0x0",
      "blockHash":"0x9a49f30f1d1876ff3913bd0aa58f328822e7a369cb13e0640b82234f26e781bb",
      "logIndex":"0x0",
      "removed":false
  }]
}
```

## klay_getLogs <a id="klay_getlogs"></a>

지정된 필터 객체와 일치하는 모든 로그의 배열을 반환합니다.

클레이튼 노드의 리소스를 안전하게 관리하기 위해 두 가지 노드 설정으로 이 API의 실행을 제한할 수 있습니다.

- 단일 쿼리에서 반환되는 최대 결과 수 (기본값: 10,000개).
- 단일 쿼리의 실행 시간 제한 (기본값: 10초).

**매개변수**

`Object` - 필터 옵션입니다:

| 이름        | 유형                    | 설명                                                                                                                                                                                                             |
| --------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | QUANTITY \| TAG       | (선택 사항, 기본값: `"latest"`) 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](block.md#the-default-block-parameter)에 있는 `earliest`, `latest` 또는 `pending` 문자열입니다.                                               |
| toBlock   | QUANTITY \| TAG       | (선택 사항, 기본값: `"latest"`) 정수 또는 16진수 블록 번호 또는 [기본 블록 매개 변수](block.md#the-default-block-parameter)에 있는 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다.                                        |
| address   | 20-byte DATA \| Array | (선택 사항) 컨트랙트 주소 또는 로그가 시작될 주소 목록입니다.                                                                                                                                                        |
| topics    | DATA Array            | (선택 사항) 32바이트 데이터 토픽 배열입니다. 토픽은 순서에 따라 달라집니다. 각 토픽은 "또는" 옵션이 있는 DATA 배열일 수도 있습니다.                                                                                                           |
| blockHash | 32-byte DATA          | (선택 사항) 반환되는 로그를 32바이트 해시 블록Hash를 사용하여 단일 블록으로 제한하는 필터 옵션입니다. 블록해시를 사용하는 것은 블록해시가 블록해시인 블록 번호를 fromBlock = toBlock으로 사용하는 것과 동일합니다. 필터 조건에 blockHash가 있으면 fromBlock이나 toBlock 모두 허용되지 않습니다. |

:::note

참고: Klaytn v1.7.0 이전 버전에서는 정수 블록 번호, 문자열 `"earliest"` 및 `"latest"`만 사용할 수 있습니다.

:::

**리턴 값**

[klay_getFilterChanges](#klay_getfilterchanges)를 참조하세요.

**예시**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getLogs","params":[{"fromBlock":"0x1","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b"}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":[
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xfa9b2165fc71c1d6ffa03291c7f5d223ea363ec063d747eec9ce2d30d24855ef"],
      "data":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000001341646472657373426f6f6b436f6e747261637400000000000000000000000000",
      "blockNumber":"0xd3b5",
      "transactionHash":"0x57ca8ff0a0d454d4c5418694c21bc4ef3de26cf7cd18dd404d6a7189a826bfe0",
      "transactionIndex":"0x0",
      "blockHash":"0x279251a907c6ab1fb723595511ff401432e7c2437d54189298f53a7d33ce3a60",
      "logIndex":"0x0",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xfa3e1e272694072320aad73a3fadd8876c4bf8f40899c6c7ce2fda9f4e652cfa"],
      "data":"0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000300000000000000000000000041383b6ee0ea5108d6b139165a9c85351aacd39800000000000000000000000057f7439898e652fa9b5654022297588532e5e0370000000000000000000000005b5b7a718a4124eb746ae00b1ce6edcaa5ab55bc",
      "blockNumber":"0xd3b5",
      "transactionHash":"0x57ca8ff0a0d454d4c5418694c21bc4ef3de26cf7cd18dd404d6a7189a826bfe0",
      "transactionIndex":"0x0",
      "blockHash":"0x279251a907c6ab1fb723595511ff401432e7c2437d54189298f53a7d33ce3a60",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000286d09b578d6126e09296dfe6c775ea7d0cf06e9000000000000000000000000860350f6d774efd16046335c388b832b910d3f8c00000000000000000000000061a7cbdd597848494fa85cbb76f9c63ad9c06cad",
      "blockNumber":"0x14d96",
      "transactionHash":"0x73282602d2f908180f47e3c8673f41c0899cbbb2d606976c2f77188ffa57d6e7",
      "transactionIndex":"0x0",
      "blockHash":"0xa5268a093cd5df7eccde18217a7019a35ab761088312027af16682aafa704ee3",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002f91d1b79dd06da1b622122d61e05e64562de61e0000000000000000000000006e76e0ce76dfba55060400144318d4821a58510600000000000000000000000031b93ca83b5ad17582e886c400667c6f698b8ccd",
      "blockNumber":"0x14e4e",
      "transactionHash":"0xf9d86ed451d67abc68c517f7fa0e0a7a8e3dedec23f56febda2b7f52d35185b6",
      "transactionIndex":"0x0",
      "blockHash":"0x7ddf4a0a203d40afc1706aa24b787da601e1bce326319349d0eeef6c41656fa5",
      "logIndex":"0x1",
      "removed":false
    }
  ]
}
```

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getLogs","params":[{"fromBlock":"earliest","toBlock":"latest","topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"]}],"id":2}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":2,
  "result":[
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000286d09b578d6126e09296dfe6c775ea7d0cf06e9000000000000000000000000860350f6d774efd16046335c388b832b910d3f8c00000000000000000000000061a7cbdd597848494fa85cbb76f9c63ad9c06cad",
      "blockNumber":"0x14d96",
      "transactionHash":"0x73282602d2f908180f47e3c8673f41c0899cbbb2d606976c2f77188ffa57d6e7",
      "transactionIndex":"0x0",
      "blockHash":"0xa5268a093cd5df7eccde18217a7019a35ab761088312027af16682aafa704ee3",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002f91d1b79dd06da1b622122d61e05e64562de61e0000000000000000000000006e76e0ce76dfba55060400144318d4821a58510600000000000000000000000031b93ca83b5ad17582e886c400667c6f698b8ccd",
      "blockNumber":"0x14e4e",
      "transactionHash":"0xf9d86ed451d67abc68c517f7fa0e0a7a8e3dedec23f56febda2b7f52d35185b6",
      "transactionIndex":"0x0",
      "blockHash":"0x7ddf4a0a203d40afc1706aa24b787da601e1bce326319349d0eeef6c41656fa5",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000a2b1264624c92257dd8e7f0cac42d451061d1510000000000000000000000000b381ee81e319e5ec48f42d0b47b5e4361c9a6f740000000000000000000000003855407fa65c4c5104648b3a9e495072df62b585",
      "blockNumber":"0x14f38",
      "transactionHash":"0xc8f8c637ea9fcbe71e23fe0779b59fb10173e8c4fd7e49bce3cce76ff67d353d",
      "transactionIndex":"0x0",
      "blockHash":"0xb1717038e443f517bd7a8c37b66fb731fed573f5fa5486ebbbb5e4c9060be50b",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000009dd579f23912665b956b0cd50387b29a62052732000000000000000000000000c98a86af2eca2989c0cb2a2b8d4bb841f11e94ab000000000000000000000000f65e07b6626ab43ecea744803fa46bd4a89bfdb6",
      "blockNumber":"0x14fe7",
      "transactionHash":"0x14da1883bb2aae487ce1cb93cd39bc9bb802adbba083f337051877358150ab3f",
      "transactionIndex":"0x0",
      "blockHash":"0xcd820189f00e9a6faaea7313437b92114e69bd32e18b4a28e7763117716c6fa9",
      "logIndex":"0x1",
      "removed":false
    }
  ]
}
```

## klay_newBlockFilter <a id="klay_newblockfilter"></a>

노드에 필터를 생성하여 새 블록이 도착할 때 알림을 보냅니다.
상태가 변경되었는지 확인하려면 [klay_getFilterChanges](#klay_getfilterchanges)를 호출하세요.

**매개변수**

없음

**리턴 값**

| 유형       | 설명     |
| -------- | ------ |
| QUANTITY | 필터 ID. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newBlockFilter","params":[],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":"0xc2f2e8168a7e38b5d979d0f7084130ee"
}
```

## klay_newFilter <a id="klay_newfilter"></a>

필터 옵션에 따라 필터 객체를 생성하여 상태가 변경될 때 알림(로그)을 보냅니다.

- 상태가 변경되었는지 확인하려면 [klay_getFilterChanges](#klay_getfilterchanges)를 호출하세요.
- `klay_newFilter`로 생성한 필터와 일치하는 모든 로그를 가져오려면 다음과 같이 호출합니다.

\*\*토픽 필터 지정 시 참고 사항: \*\*주제 필터 지정 시 참고 사항
토픽은 순서에 따라 달라집니다. 토픽이 `[A, B]`인 로그가 있는 트랜잭션은 다음 토픽 필터에 의해 일치됩니다:

- `[]` "아무거나"
- `[A]` "첫 번째 위치의 A(및 그 이후의 모든 것)".
- `[null, B]` "첫 번째 위치의 모든 항목과 두 번째 위치의 B(및 그 이후의 모든 항목)"
- `[A, B]` "첫 번째 위치의 A와 두 번째 위치의 B(및 그 이후의 모든 것)"
- `[[A, B]], [A, B]]` "(A 또는 B) 첫 번째 위치 AND (A 또는 B) 두 번째 위치(및 그 이후 모든 것)"

**매개변수**

`Object` - 필터 옵션입니다:

| 이름        | 유형                    | 설명                                                                                                                                                                     |
| --------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | QUANTITY \| TAG       | (선택 사항, 기본값: `"latest"`) 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `pending` 문자열입니다. |
| toBlock   | QUANTITY \| TAG       | (선택 사항, 기본값: `"latest"`) 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `pending` 문자열입니다. |
| address   | 20-byte DATA \| Array | (선택 사항) 컨트랙트 주소 또는 로그가 시작될 주소 목록입니다.                                                                                                                |
| topics    | DATA Array            | (선택 사항) 32바이트 데이터 토픽 배열입니다. 토픽은 순서에 따라 달라집니다. 각 토픽은 "또는" 옵션이 있는 DATA 배열일 수도 있습니다.                                                                   |

:::note

참고: Klaytn v1.7.0 이전 버전에서는 정수 블록 번호, 문자열 `"earliest"` 및 `"latest"`만 사용할 수 있습니다.

:::

**리턴 값**

| 유형       | 설명    |
| -------- | ----- |
| QUANTITY | 필터 ID |

**예시**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newFilter","params":[{"fromBlock":"earliest","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b","topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{"jsonrpc":"2.0","id":1,"result":"0xd32fd16b6906e67f6e2b65dcf48fc272"}
```

## klay_newPendingTransactionFilter <a id="klay_newpendingtransactionfilter"></a>

노드에 필터를 생성하여 새로운 보류 트랜잭션이 도착할 때 알림을 보냅니다.
상태가 변경되었는지 확인하려면 [klay_getFilterChanges](#klay_getfilterchanges)를 호출합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명        |
| -------- | --------- |
| QUANTITY | 필터 ID입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newPendingTransactionFilter","params":[],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":"0x90cec22a723fcc725fb2462733c2880f"
}
```

## klay_subscribe <a id="klay_subscribe"></a>

웹소켓을 통한 RPC Pub/Sub 또는 HTTP를 통한 필터를 사용하여 특정 이벤트에 대한 새 구독을 생성합니다.
이를 통해 클라이언트는 이벤트를 폴링하는 대신 이벤트를 기다릴 수 있습니다.

노드는 생성된 각 구독에 대한 구독 ID를 반환합니다.
구독과 일치하는 각 이벤트에 대해 관련 데이터가 포함된 알림이 구독 ID와 함께 전송됩니다.
연결이 닫히면 해당 연결을 통해 만들어진 모든 구독이 제거됩니다.

**매개변수**

`Object` - 알림 유형: `"newHeads"` 또는 `"logs"`.

`"newHeads"`는 블록체인에 추가된 각 블록을 알려줍니다.
`"logs"`는 새 블록에 포함된 로그를 알려줍니다. 이 유형은 필터 옵션을 지정하는 두 번째 매개변수가 필요합니다. 자세한 내용은 [klay_newFilter > 매개변수](#klay_newfilter)를 참조하세요.

**리턴 값**

| 유형       | 설명                                                                |
| -------- | ----------------------------------------------------------------- |
| QUANTITY | 구독이 생성될 때의 구독 ID입니다. 구독과 일치하는 각 이벤트에 대해 관련 데이터가 포함된 알림이 함께 전달됩니다. |

**예시**

이 API는 웹소켓 도구인 [`wscat`](https://www.npmjs.com/package/wscat)과 함께 사용하기에 적합합니다.

```shell
// Request
wscat -c http://localhost:8552
> {"jsonrpc":"2.0", "id": 1, "method": "klay_subscribe", "params": ["newHeads"]}

// Result
< {"jsonrpc":"2.0","id":1,"result":"0x48bb6cb35d6ccab6eb2b4799f794c312"}
< {"jsonrpc":"2.0","method":"klay_subscription","params":{"subscription":"0x48bb6cb35d6ccab6eb2b4799f794c312","result":{"parentHash":"0xc39755b6ac01d1e8c58b1088e416204f7af5b6b66bfb4f474523292acbaa7d57","reward":"0x2b2a7a1d29a203f60e0a964fc64231265a49cd97","stateRoot":"0x12aa1d3ab0440d844c28fbc6f89d26082f39a8435b512fa487ff55c2056aceb3","number":"0x303bea4”, ... ... }}}
```

```shell
// Request
wscat -c http://localhost:8552
> {"jsonrpc":"2.0", "id": 1, "method": "klay_subscribe", "params": ["logs", {"fromBlock":"earliest","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b","topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]}]}

// Result
< {"jsonrpc":"2.0","id":1,"result":"0xbdab16c8e4ae1b9e6930c78359de3e0e"}
< {"jsonrpc":"2.0","method":"klay_subscription","params":{"subscription":"0xbdab16c8e4ae1b9e6930c78359de3e0e","result":{"address":"0x2e4bb340e26caffb4073d7f1151f37d17524cdbc","topics":["0xb1a7310b1a46c788fcf30784cad70442d5232acaef480b0c094c76bee8d9c77d"],"data":"0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000d2588fe96a34c56a5d0a484cb603bc16fc5cdbbc","blockNumber":"0x3041201","transactionHash":"0xdacdebc77006fc566f65448524a0bc770056d8c7a05244bc7bfb2123b1bd398c","transactionIndex":"0x0","blockHash":"0x899b2dbfe96a34ce5d965dbcfcf39d072b4ce1097d479923e6b6355f3e2609ec","logIndex":"0x0","removed":false}}}
```

## klay_uninstallFilter <a id="klay_uninstallfilter"></a>

지정된 아이디를 가진 필터를 제거합니다. 감시가 더 이상 필요하지 않을 때 항상 호출해야 합니다.
또한 일정 기간 동안 [klay_getFilterChanges](#klay_getfilterchanges)로 요청하지 않으면 필터가 타임아웃됩니다.

**매개변수**

| 이름     | 유형       | 설명        |
| ------ | -------- | --------- |
| filter | QUANTITY | 필터 ID입니다. |

**리턴 값**

| 유형   | 설명                                         |
| ---- | ------------------------------------------ |
| bool | 필터가 성공적으로 제거되면 `true`, 그렇지 않으면 `false`입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_uninstallFilter","params":["0xb"],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": true
}
```

## klay_unsubscribe <a id="klay_unsubscribe"></a>

웹소켓을 통한 RPC Pub/Sub 또는 HTTP를 통한 필터를 사용하여 특정 구독 ID로 구독을 취소합니다.
구독을 생성한 연결만 구독을 취소할 수 있습니다.

**매개변수**

| 유형       | 설명        |
| -------- | --------- |
| QUANTITY | 구독 ID입니다. |

**리턴 값**

| 유형   | 설명                                         |
| ---- | ------------------------------------------ |
| bool | 구독이 성공적으로 취소되면 `true`, 그렇지 않으면 `false`입니다. |

**예시**

이 API는 웹소켓 도구인 [`wscat`](https://www.npmjs.com/package/wscat)과 함께 사용하기에 적합합니다.

```shell
// Request
> {"jsonrpc":"2.0", "id": 1, "method": "klay_unsubscribe", "params": ["0xab8ac7a4045025d0c2807d63060eea6d"]}

// Result
< {"jsonrpc":"2.0","id":1,"result":true}
```
