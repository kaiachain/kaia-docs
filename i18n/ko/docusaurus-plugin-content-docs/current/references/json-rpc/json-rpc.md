# RPC API 레퍼런스

이 문서는 클레이튼 API를 사용하는 방법을 설명합니다. 툴킷 API를 제외한 대부분의 API는 원격 프로토콜 (RPC, 웹소켓)과 클레이튼 JavaScript 콘솔을 지원합니다. 이 문서는 `ken`을 예로 작성되었지만 대부분의 API는 `kcn`과 `kpn`에서도 사용할 수 있습니다.

**참고**: 원격 프로토콜과 클레이튼 JavaScript 콘솔을 모두 지원하지 않는 API는 거의 없으므로, 원격 프로토콜에서 사용할 수 있는 API 위주로 문서화했습니다. 나머지 API는 나중에 문서화할 예정입니다.

## API 활성화하기 <a id="enabling-apis"></a>

클레이튼 RPC 엔드포인트를 통해 API를 제공하려면 `--${interface}api` 명령줄 인자로 지정해 주세요.

`ipc`는 플래그 없이 유닉스 소켓 (Unix) 또는 네임드 파이프 (Windows) 엔드포인트를 통해 모든 API를 제공합니다.

아래 예시처럼 추가하고 싶은 특정 API로 Klaytn 노드를 시작할 수 있습니다. 하지만 노드를 실행한 후에는 API를 변경할 수 없다는 점에 유의하세요.

예시) `klay` 및 `net` 모듈을 활성화한 상태에서 Klaytn 노드를 실행합니다:

```bash
$ ken --rpcapi klay,net --rpc --{other options}
```

HTTP RPC 인터페이스는 `--rpc` 플래그를 사용하여 명시적으로 활성화해야 합니다.

**참고**: HTTP (`rpc`) 또는 웹소켓 (`ws`) 인터페이스를 통해 API를 제공하면 이 인터페이스에 액세스할 수 있는 모든 사용자(dApp, 브라우저 탭 등)가 API에 액세스할 수 있게 됩니다. 어떤 API를 활성화할지 주의하세요. 기본적으로 Klay는 IPC (`ipc`) 인터페이스를 통해 모든 API를 활성화하지만 `rpc`와 `ws`의 경우 필수 모듈을 명시적으로 활성화해야 합니다.

인터페이스가 어떤 API를 제공하는지 확인하려면 `modules` JSON-RPC 메서드를 호출할 수 있습니다. 예를 들어 `rpc` 인터페이스를 통해:

**IPC**

```bash
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```bash
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' https://public-en-baobab.klaytn.net
```

를 입력하면 버전 번호를 포함하여 활성화된 모든 모듈이 표시됩니다:

```text
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "istanbul":"1.0",
      "klay":"1.0",
      "eth":"1.0",
      "miner":"1.0",
      "net":"1.0",
      "personal":"1.0",
      "rpc":"1.0",
      "txpool":"1.0",
      "web3":"1.0"
   }
}
```

## 안전하지 않은 디버그 API 비활성화하기 <a id="disabling-unsafe-debug-apis"></a>

일부 디버그 네임스페이스 API는 공개하기에 안전하지 않거나 부적절합니다.
디버그 네임스페이스 API는 권한이 있는 사용자에게만 제공하는 것이 좋습니다.
그러나 공개 EN을 유지하면서 디버그 네임스페이스 API를 일반에 제공하려면
안전하지 않거나 부적절한 API를 비활성화하는 `rpc.unsafe-debug.disable` 플래그를 설정하고 디버그 네임스페이스 API의 하위 집합만 사용하도록 설정할 것을 강력히 권장합니다.

다른 모든 디버그 네임스페이스 API **제외** 다음 API는 `rpc.unsafe-debug.disable` 플래그를 사용하여 제한됩니다:

- [VM 추적](./debug/tracing.md) API, 그러나 기능이 제한됨([사전 정의된 tracer](./debug/tracing.md#tracing-options)만 허용됨)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

`rpc.unsafe-debug.disable` 플래그를 설정하려면 `kend.conf` 파일에 다음 줄을 추가합니다.

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
