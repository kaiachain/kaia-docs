# 프로필 노드 데이터

프로파일링은 Kaia 노드의 성능을 이해하고 최적화하는 데 필수적인 도구입니다. 이 튜토리얼에서는 Kaia의 디버그 API와 `net/http/pprof` Go 패키지를 활용하여 Kaia 노드 운영자가 사용할 수 있는 다양한 프로파일링 기법에 대해 안내합니다.

## 전제 조건

시작하기 전에 다음 사항을 확인하세요:

- **노드 설정:** Kaia 노드가 올바르게 설치되어 실행 중입니다.

- **노드 콘솔에 액세스하기:** [노드 콘솔](../../nodes/endpoint-node/ken-cli-commands.md#javascript-console)을 통해 노드와 상호 작용해야 합니다.

- **도구:** Go를 시스템에 설치하여 `go tool pprof` 및 `go tool trace`를 사용합니다. 실행하여 확인할 수 있습니다:

```bash
go version
```

## 1\. 프로파일링 관리하기: 시작, 중지 및 상태 확인 방법

Kaia 노드는 여러 가지 프로파일링 방법을 제공하는 `debug` API를 제공합니다. 노드의 콘솔 또는 [JSON-RPC API 호출](https://docs.kaia.io/references/json-rpc/debug/start-p-prof/)을 통해 이러한 메서드와 상호 작용할 수 있습니다.

### 1.1 pprof HTTP 서버 시작하기

pprof HTTP 서버를 사용하면 프로파일링 데이터를 효율적으로 수집하고 분석할 수 있습니다.

```bash
# Start pprof server with default settings (localhost:6060)
> debug.startPProf()

# Start pprof server on a specific address and port
> debug.startPProf("localhost", 8080)
```

#### pprof 엔드포인트에 액세스

pprof 서버가 실행 중이면 다음 주소에서 프로파일링 데이터에 액세스합니다:

- [http://localhost:6060/debug/pprof/](http://localhost:6060/debug/pprof/) - 사용 가능한 프로필 개요.
- [http://localhost:6060/memsize/](http://localhost:6060/memsize/) - 메모리 크기 보고서.
- [http://localhost:6060/debug/vars](http://localhost:6060/debug/vars) - Prometheus 메트릭용 내보내기.

### 1.2 pprof HTTP 서버 중지하기

```bash
> debug.stopPProf()
```

### 1.3 pprof가 실행 중인지 확인하기

```bash
> debug.isPProfRunning()
true  # if running
false # if not running
```

## 2\. 프로필 수집

pprof 서버가 실행되면 여러 가지 방법을 사용하여 다양한 프로파일을 수집하여 노드의 성능을 분석할 수 있습니다.

### 2.1 웹 인터페이스를 사용하여 수집

다음 예시와 같이 웹 브라우저에 각각의 엔드포인트를 입력하여 다양한 프로필을 수집하세요:

**힙 프로필 수집**

`http://localhost:6060/debug/pprof/heap`

**30초 CPU 프로파일 수집**

`http://localhost:6060/debug/pprof/profile?seconds=30`

**debug=2로 고루틴 프로파일 수집**

`http://localhost:6060/debug/pprof/goroutine?debug=2`

### 2.2 API 호출을 사용하여 수집

다음 예시와 같이 노드 콘솔에 각 명령을 입력하여 프로필을 수집하거나 구성합니다:

```bash
# Collect 30-second CPU profile
> debug.cpuProfile("cpu.profile", 30)

# Collect 30-second block profile
> debug.blockProfile("block.profile", 30)

# Set mutex profiling fraction
> debug.setMutexProfileFraction(1)
```

### 2.3 `go tool pprof`'를 사용하여 수집하기

pprof 웹 인터페이스에 액세스할 수 없는 경우, `go tool pprof`를 사용하여 로컬에서 프로파일링 결과를 생성하고 분석할 수 있습니다.

#### 사용 가능한 프로필 유형 식별

지원되는 프로필은 다음과 같습니다:

- `allocs`: 과거의 모든 메모리 할당의 샘플링입니다.
- `block`: 동기화 프리미티브에 대한 차단으로 이어진 스택 추적.
- `goroutine`: 현재 모든 고루틴의 트레이스를 스택합니다. 복구되지 않은 패닉과 동일한 형식으로 내보내려면 쿼리 매개변수로 `debug=2`를 사용합니다.
- `heap`: 라이브 객체의 메모리 할당 샘플링입니다. 힙 샘플을 채취하기 전에 `gc` GET 매개변수를 지정하여 가비지 컬렉션을 실행할 수 있습니다.
- `mutex`: 경합 중인 뮤텍스 보유자의 흔적을 스택에 쌓습니다.
- `profile`: CPU 프로파일. `seconds` GET 매개변수에 기간을 지정할 수 있습니다. 프로필 파일을 받은 후 `go tool pprof` 명령을 사용하여 프로필을 조사합니다.
- `threadcreate`: 새 OS 스레드를 생성한 스택 추적을 추적합니다.
- `trace`: 현재 프로그램의 실행 흔적입니다. `seconds` GET 매개변수에 기간을 지정할 수 있습니다. 추적 파일을 받은 후 `go tool trace` 명령을 사용하여 추적을 조사합니다.

#### `go tool pprof`를 사용하여 프로필 수집하기

```bash
go tool pprof http://localhost:6060/debug/pprof/<profiletype>
```

`<0>`를 위에 나열된 지원되는 프로필 중 하나(예: `heap`, `profile`)로 바꿉니다.

#### 명령 예제

```bash
# Collect heap profile
go tool pprof http://localhost:6060/debug/pprof/heap

# Collect 30-second CPU profile
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# Collect goroutine profile with debug=2
go tool pprof http://localhost:6060/debug/pprof/goroutine?debug=2
```

#### 텍스트 프로파일링 파일 생성

텍스트 기반 프로파일링 보고서를 생성하려면 `go tool pprof`와 함께 `-text` 옵션을 사용하세요.

```bash
# Generate text-based CPU profile
go tool pprof -text cpu.profile
```

#### pprof 추가 옵션

프로필을 수집할 때 추가 쿼리 매개변수 및 옵션을 사용하여 프로파일링을 추가로 사용자 지정할 수 있습니다.

- **응답 형식(`debug=N`):**

  - **바이너리 형식(기본값):** `N = 0`
  - **일반 텍스트 형식:** `N > 0`

  **예시:**

```bash
go tool pprof http://localhost:6060/debug/pprof/allocs?debug=1
```

- **가비지 컬렉션(`gc=N`):**

  - **프로파일링 전 GC 실행:** 힙 프로파일을 캡처하기 전에 가비지 수집 주기를 트리거하려면 `gc=1`을 설정하세요.

  **예시:**

```bash
go tool pprof http://localhost:6060/debug/pprof/heap?gc=1
```

- **지속 시간 매개변수(`초=N`):**

  - **할당, 블록, 고루틴, 힙, 뮤텍스, 스레드 생성 프로필:**

    - `seconds=N`은 주어진 기간을 기준으로 델타 프로파일을 반환합니다.

  - **CPU 프로파일 및 트레이스 프로파일:**

    - `seconds=N`은 CPU 프로파일 또는 추적을 실행할 기간을 지정합니다.

  **예시:**

```bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
```

### 2.4 Go 설치 없이 수집

프로그램에 Go가 설치되지 않은 경우(`go version`을 실행하여 확인할 수 있음) 다음 단계에 따라 프로파일링 데이터를 로컬에 다운로드하여 저장하세요:

1. `wget`을 사용하여 프로필 파일을 다운로드합니다.

```bash
wget -O memory_profile http://localhost:6060/debug/pprof/heap
```

2. `scp`를 사용하여 프로필 파일을 로컬 컴퓨터로 전송합니다.

```bash
scp <user>@<node_ip>:memory_profile memory_profile
```

참고: `<user>`를 SSH 사용자 이름으로, `<node_ip>`를 Kaia 노드의 IP 주소로 바꾸세요.

## 3\. 메모리 프로파일링

앞서 언급했듯이 메모리 프로파일링은 go pprof에서 제공하는 힙 정보를 말합니다. Kaia 노드에서 제공하는 디버그 네임스페이스의 writeMemProfile을 통해서도 수집할 수 있습니다.

```bash
# Using go tool pprof
> go tool pprof http://localhost:6060/debug/pprof/heap
# Using Node Console
> debug.writeMemProfile("mem.profile")
```

메모리 프로파일링은 메모리 누수와 같은 메모리 관련 문제를 분석하는 데 매우 중요합니다. 메모리 프로파일링의 세분성을 제어하려면 `MemProfileRate` 변수를 조정하면 이 과정에서 도움이 될 수 있습니다. 이 값은 노드 실행 초기(예: `메인` 함수의 시작 부분)에 가능한 한 빨리 설정해야 합니다.

:::note

Kaia는 `MemProfileRate` 변수를 쉽게 설정할 수 있는 `--memprofilerate` 플래그를 제공합니다. 따라서 플래그로만 사용할 수 있으므로 노드를 시작할 때 설정해야 하며 API 호출을 통해 변경할 수 없습니다.

:::

```bash
var MemProfileRate int = 512 * 1024
```

- **`MemProfileRate `:** 설정
  - **프로필 최대 할당량:** `1`로 설정합니다.
  - **프로파일링 비활성화:** `0`으로 설정합니다.
  - **기본 설정:** `512 * 1024`(512KB당 약 1개의 할당 프로파일).

**영향:**

- **더 높은 프로파일링 속도(더 낮은 `MemProfileRate`):** 세분성은 증가하지만 성능 오버헤드가 발생할 수 있습니다.
- **낮은 프로파일링 속도(높은 `MemProfileRate`):** 프로파일링 세부 정보를 줄여 성능에 미치는 영향을 최소화합니다.

**모범 사례:**

- **일관성:** 정확한 프로파일링 데이터를 유지하기 위해 노드의 런타임 내내 `MemProfileRate`가 일정하게 유지되도록 합니다.
- **초기 구성:** 일관된 프로파일링 정보를 캡처하려면 프로그램을 처음 시작할 때 `MemProfileRate`를 설정합니다.

## 4\. 프로필 분석

프로파일링 데이터를 수집한 후 `go tool pprof`를 사용하여 저장된 프로파일 파일을 분석하고 시각화합니다.

### 4.1 웹 인터페이스를 사용하여 분석

예를 들어, 아래와 같이 웹 인터페이스를 통해 메모리 사용량을 시각적으로 보여주는 Go의 pprof 도구를 사용하여 메모리 프로필 데이터를 시각적으로 분석할 수 있습니다:

```bash
go tool pprof -http=0.0.0.0:8081 cpu.profile
```

### 4.2 명령줄을 사용하여 분석

터미널 내 텍스트 기반 인터페이스에서 Go의 pprof 도구를 사용하여 메모리 프로필 데이터를 분석할 수도 있습니다:

```bash
go tool pprof cpu.profile
```

- **일반적인 `pprof` 명령:**

  - `top `: 리소스를 가장 많이 소비하는 함수를 표시합니다.
  - `list <0>`: 특정 함수에 대한 주석이 달린 소스 코드를 표시합니다.
  - `web`: 웹 브라우저에서 프로필의 시각화를 생성합니다.
  - `pdf `를 클릭합니다: 프로필의 PDF 보고서를 생성합니다.

- **사용 예:**

```bash
go tool pprof cpu.profile
# Inside the pprof interactive shell:
> top
> list main.functionName
> web
```

:::note

시각적 그래프를 생성하려면 `web` 및 `pdf` 명령에 대한 Graphviz가 설치되어 있는지 확인합니다.

:::

## 5\. 결론

이 프로파일링 튜토리얼을 따라 Kaia 노드 운영자는 성능 병목 현상을 효과적으로 식별 및 해결하고, 리소스 사용을 최적화하며, 노드를 원활하고 효율적으로 운영할 수 있습니다. 정기적인 프로파일링과 강력한 모니터링 및 로깅 관행은 블록체인 네트워크 내에서 카이아 노드의 안정성과 성능을 유지하는 데 크게 기여할 것입니다.
