# JSON-RPC API

엔드포인트 노드는 JSON-RPC API를 노출합니다. API는 다음과 같이 활성화/비활성화할 수 있습니다. 자세한 API 사양은 [JSON-RPC APIs](../../../references/json-rpc/klay/account-created)를 참조하세요.

**참고**: HTTP(`rpc`) 또는 웹소켓(`ws`) 인터페이스를 통해 API를 제공하면 모든 사용자가 이 인터페이스에 액세스할 수 있는 API(디앱, 브라우저 탭 등)에 액세스할 수 있습니다. 어떤 API를 활성화할지 활성화할 때 주의하세요. 기본적으로 카이아는 `ipc` 인터페이스를 통해 모든 API를 활성화하지만, `rpc`와 `ws`의 경우 필수 모듈을 명시적으로 활성화해야 합니다.

## API 활성화하기 <a id="enabling-apis"></a>

### 명령줄에서 <a id="from-commandline"></a>

카이아 RPC 엔드포인트를 통해 API를 제공하려면 `--${interface}api`
명령줄 인자로 지정하세요.

`ipc`는 플래그 없이 유닉스 소켓(Unix) 또는 네임드 파이프(Windows) 엔드포인트를 통해 모든 API를 제공합니다.

아래 예시와 같이 추가하려는 특정 API를 사용하여 Kaia 노드를 시작할 수 있습니다. 단, 노드를 실행한 후에는 API를 변경할 수 없다는 점에 유의하세요.

예) `klay`와 `net` 모듈을 활성화한 상태에서 카이아 노드 실행하기:

```shell
$ ken --rpcapi klay,net --rpc --{other options}
```

HTTP RPC 인터페이스는 `--rpc` 플래그를 사용하여 명시적으로 활성화해야 합니다.

### 구성 파일 사용 <a id="using-configuration"></a>

[구성 파일](../../misc/operation/configuration.md)에서 `RPC_ENABLE`, `RPC_API`, `WS_ENABLE` 및 `WS_API` 속성을 업데이트하세요.

## 사용 가능한 API 쿼리하기 <a id="querying-enabled-apis"></a>

인터페이스가 어떤 API를 제공하는지 확인하려면 `modules` JSON-RPC 메서드를 호출할 수 있습니다. `rpc` 인터페이스를 예로 들자면,

**IPC**

```javascript
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' https://public-en-kairos.node.kaia.io
```

이로써 버전 번호를 포함하여 활성화된 모든 모듈을 반환합니다:

```
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "klay":"1.0",
      "miner":"1.0",
      "net":"1.0",
      "personal":"1.0",
      "rpc":"1.0",
      "txpool":"1.0",
      "web3":"1.0"
   }
}
```

## 안전하지 않은 디버그 API 비활성화 <a id="disabling-unsafe-debug-apis"></a>

일부 디버그 네임스페이스 API는 안전하지 않거나 공개하기에 부적절합니다.
디버그 네임스페이스 API는 권한이 있는 사용자에게만 제공하는 것이 좋습니다.
그러나 공개 EN을 유지하면서 디버그 네임스페이스 API를 일반에 제공하려는 경우
안전하지 않거나 부적절한 API를 비활성화하는 `rpc.unsafe-debug.disable` 플래그를 설정하고 디버그 네임스페이스 API의 하위 집합만 활성화하도록 설정하도록 강력히 권장합니다.

활성화된 API는 다음과 같습니다:

- [VM Tracing](../.../../references/json-rpc/debug/trace-bad-block) API를 사용할 수 있지만 기능이 제한되어 있습니다([사전 정의된 tracer](../.../references/json-rpc/debug/trace-bad-block)만 허용됩니다. params/tracingOptions을 참고하세요.)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

`rpc.unsafe-debug.disable` 플래그를 설정하려면 `kend.conf` 파일에 다음 줄을 추가합니다.

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
