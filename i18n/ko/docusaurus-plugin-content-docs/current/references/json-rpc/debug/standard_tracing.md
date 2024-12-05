# VM 표준 추적

**참고** 일부 디버그 네임스페이스 API는 일반에 공개하기에 안전하지 않거나 부적절합니다.
디버그 네임스페이스 API는 권한이 있는 사용자에게만 제공하는 것이 좋습니다.
그러나 공개 EN을 유지하면서 디버그 네임스페이스 API를 일반에 제공하려는 경우
안전하지 않거나 부적절한 API를 비활성화하는 `rpc.unsafe-debug.disable` 플래그를 설정하고 디버그 네임스페이스 API의 하위 집합만 활성화하도록 설정할 것을 강력히 권장합니다.
활성화된 API는 다음과 같습니다:

- [VM 추적](./tracing.md) API(기능이 제한됨)(단, [사전 정의된 tracer](./tracing.md#tracing-options)만 허용됨)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

## debug_standardTraceBadBlockToFile <a id="debug_standardtracebadblocktofile"></a>

[debug_traceBadBlock](./tracing.md#debug_tracebadblock)과 유사합니다. 파일 이름 목록을 반환합니다. 참고로
파일은 이 API를 제공하는 머신에 저장됩니다.

| 클라이언트 | 메서드 호출                                                                  |
| :---: | ----------------------------------------------------------------------- |
|   콘솔  | `debug.standardTraceBadBlockToFile(hash, [options])`                    |
|  RPC  | `{"method": "debug_standardTraceBadBlockToFile", "params": [hash, {}]}` |

**매개변수**

| 이름      | 유형           | 설명                                            |
| ------- | ------------ | --------------------------------------------- |
| hash    | 32-byte DATA | 블록의 해시.                                       |
| options | Object       | [표준 추적 옵션](#standard-tracing-options)을 참조하세요. |

**리턴 값**

| 유형         | 설명                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON array | 파일 이름 목록입니다. 각각은 트랜잭션의 추적 결과를 나타냅니다. 파일 이름의 형식은 `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`입니다. |

**예시**

콘솔

```javascript
> debug.standardTraceBadBlockToFile("0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-701973544", "/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-918920039"]
```

HTTP RPC

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBadBlockToFile","params":["0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-608268252","/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-315574667"]}
```

## debug_standardTraceBlockToFile <a id="debug_standardtraceblocktofile"></a>

`standardTraceBlockToFile`은 블록 해시를 받아 데이터베이스에 이미 있는 블록을
블록을 재생합니다. 추적 결과가 포함된 파일 이름 목록을 반환합니다. 파일은 이 API를 제공하는 머신에 저장됩니다.

| 클라이언트 | 메서드 호출                                                               |
| :---: | -------------------------------------------------------------------- |
|   콘솔  | `debug.standardTraceBlockToFile(hash, [options])`                    |
|  RPC  | `{"method": "debug_standardTraceBlockToFile", "params": [hash, {}]}` |

**매개변수**

| 이름      | 유형           | 설명                                            |
| ------- | ------------ | --------------------------------------------- |
| hash    | 32-byte DATA | 블록의 해시.                                       |
| options | Object       | [표준 추적 옵션](#standard-tracing-options)을 참조하세요. |

**리턴 값**

| 유형         | 설명                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON array | 파일 이름 목록입니다. 각각은 트랜잭션의 추적 결과를 나타냅니다. 파일 이름의 형식은 `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`입니다. |

**예시**

콘솔

```javascript
> debug.standardTraceBlockToFile("0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-141224302"]
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBlockToFile","params":["0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-288181237"]}
```

## 표준 추적 옵션 <a id="standard-tracing-options"></a>

추적 API 함수에 보조 옵션 인수를 지정할 수 있습니다. 가능한 옵션은 다음과 같습니다:

- `disableStorage`: `BOOL`. 이 값을 true로 설정하면 저장소 캡처가 비활성화됩니다(기본값 = false).
- `disableMemory`: `BOOL`. true로 설정하면 메모리 캡처가 비활성화됩니다(기본값 = false).
- `disableStack`: `BOOL`. true로 설정하면 스택 캡처가 비활성화됩니다(기본값 = false).
- `txHash`: `string`. 이 값을 설정하면 지정된 트랜잭션만 추적합니다.
