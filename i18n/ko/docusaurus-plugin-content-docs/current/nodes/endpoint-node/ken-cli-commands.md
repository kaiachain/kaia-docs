# ken CLI 명령어

이 문서는 Kaia 엔드포인트 노드 관리를 위한 `ken` 명령줄 인터페이스(CLI)에 대한 개요를 제공합니다. 'Ken' CLI는 개발자가 Kaia 네트워크와 상호 작용하고, 계정을 관리하고, 엔드포인트 노드와 관련된 다양한 작업을 수행할 수 있는 강력한 도구입니다.

- [개요](#overview)
- [기본 명령](#basic-commands)
- [계정 관리](#account-management)
- [자바스크립트 콘솔](#javascript-console)
- [모듈 API](#module-apis)

## 개요

**사용 방법:**

```
ken [옵션] 명령 [명령 옵션] [인수...]
```

'ken'에는 다음과 같은 명령이 있습니다:

**명령:**

- '계정' - 계정 관리
- 'attach\` - 대화형 자바스크립트 환경 시작(노드에 연결)
- 콘솔\` - 대화형 자바스크립트 환경 시작
- `dumpconfig` - 구성 값 표시
- dumpgenesis\` - 제네시스 블록 JSON 구성을 stdout으로 덤프합니다(이 명령은 Kaia v1.7.0부터 지원됩니다.).
- `init` - 새로운 제네시스 블록을 부트스트랩하고 초기화합니다.
- '스냅샷' - 스냅샷을 기반으로 하는 명령어 세트
- 버전\` - 버전 번호 표시
- '도움말, h\` - 하나의 명령에 대한 명령 목록 또는 도움말을 표시합니다.

각 명령에 대한 자세한 사용 지침을 보려면 `-h` 옵션을 입력합니다.

```bash
$ ken account -h
계정 관리, 모든 기존 계정 나열, 새
계정으로 개인 키 가져오기, 새 계정 만들기 또는 기존 계정 업데이트.
...
키는 <DATADIR>/keystore에 저장됩니다.
전체 디렉터리 또는 그 안의 개별 키(
)를 복사하여 카이아 노드 간에 전송하는 것은 안전합니다.
키를 정기적으로 백업하세요.

사용법:
ken account 명령 [명령 옵션] [인수...]

명령:
list 기존 계정 요약 인쇄
new 새 계정 만들기
update 기존 계정 업데이트
import 새 계정으로 개인키 가져오기
```

## 기본 명령

### 네트워크 초기화

```bash
$ ken init -h
init [명령 옵션] [인수...]

init 명령은 네트워크에 대한 새 제네시스 블록과 정의를 초기화합니다.
이는 파괴적인 작업이며
참여하게 될 네트워크를 변경합니다.
...
```

## 계정 관리

:::warning

비밀번호를 기억하세요. 계정의 비밀번호를 잊어버리면 해당 계정에 액세스할 수 없게 됩니다. 여기에는 '비밀번호 찾기' 옵션이 없습니다. 절대 잊지 마세요.

:::

Kaia는 개발자가 계정을 관리할 수 있는 편리한 명령줄 도구인 `ken`과 `JavaScript 콘솔` 두 가지를 제공합니다. 암호화되지 않은 형식으로 개인키를 내보내는 것은 지원되지 않습니다.

### 데이터 디렉토리

키스토어 파일은 `<DATADIR>/keystore`에 저장됩니다. 데이터 디렉터리는 아래와 같이 지정할 수 있습니다. 데이터디르`옵션과 함께`ken account`명령을 실행하는 것을 적극 권장합니다. 엔드포인트 노드와 계정을 원활하게 공유하려면 데이터 디렉터리가`kend.conf`에 설정된 `DATA_DIR\`을 가리키도록 설정하세요.

```bash
$ ken 계정 새로 만들기 --datadir <DATADIR>
$ ken 계정 새로 만들기 --datadir "~/kend_home"
```

데이터 디렉터리를 지정하지 않으면 기본 위치는 다음과 같습니다:

- **Mac**: `~/Library/KEN`
- **Linux**: `~/.ken`

### 계정 명령

카이아 엔드포인트 노드 바이너리 `ken`은 `account` 명령을 통해 계정 관리를 제공합니다. 계정\` 명령을 사용하면 새 계정을 만들고, 기존 계정을 모두 나열하고, 새 계정으로 개인 키를 가져오고, 최신 키 형식으로 마이그레이션하고, 비밀번호를 변경할 수 있습니다.

**용도:**

```bash
$ ken account <command> [옵션...] [인수...]
```

**명령어:**

```bash
ken account -help
...
명령:
list 기존 계정 요약 인쇄
new 새 계정 만들기
update 기존 계정 업데이트
import 새 계정으로 개인 키 가져오기
...
```

하위 명령에 대한 정보는 `ken account <command> --help`로 확인할 수 있습니다.

```bash
$ ken account list --help
list [명령 옵션] [인수...

모든 계정에 대한 간단한 요약 출력

KAIA 옵션:
--dbtype 값 블록체인 스토리지 데이터베이스 유형("leveldb", "badger") (기본값: "leveldb")
--datadir "/Users/ethan/Library/KEN" 데이터베이스 및 키스토어용 데이터 디렉토리
--keystore 키스토어용 디렉토리 (기본값 = datadir 내부)

데이터베이스 옵션:
--db.no-partitioning 영구 저장소를 위해 파티션된 데이터베이스를 사용하지 않습니다.
```

### 새 계정 만들기

그러면 새 계정이 생성되고 화면에 주소가 인쇄됩니다. 키스토어 파일은 데이터 디렉터리 아래에 생성됩니다.

#### 카이아 키스토어 파일

계정을 만들면 키스토어 파일이 생성됩니다. 키스토어 파일은 거래에 서명할 때 사용할 고유한 Kaia 개인키의 암호화된 버전입니다. 키스토어 파일 이름은 다음과 같은 형식을 갖습니다:

```
UTC--<created_at UTC ISO8601>-.<address hex>
```

Kaia 노드 간에 전체 디렉토리 또는 그 안에 있는 개별 키스토어 파일을 전송하는 것은 안전합니다. 다른 노드에서 노드에 키를 추가하는 경우 계정 순서가 변경될 수 있다는 점에 유의하세요. 따라서 스크립트나 코드 스니펫의 인덱스에 의존하지 않도록 하세요.

#### ken CLI

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

:::warning

비밀번호 파일은 테스트용으로만 사용해야 하며, 비밀번호를 파일에 저장하거나 다른 방식으로 노출하는 것은 좋지 않습니다. 비밀번호 파일에 비밀번호 플래그를 사용하는 경우에는 본인 이외의 다른 사람이 파일을 읽거나 나열할 수 없도록 하는 것이 가장 좋습니다. 이를 달성하는 방법은 다음과 같습니다:

```bash
터치 /경로/에/패스워드
$ chmod 700 /경로/에/패스워드
$ cat > /경로/에/패스워드
여기에 패스워드를 입력합니다
^D
```

:::

### 계정 가져오기

키 파일을 사용하여 계정을 가져올 수 있습니다. 키 파일에는 암호화되지 않은 개인 키가 16진수로 인코딩된 표준 EC 원시 바이트가 포함된 것으로 가정합니다. 간단히 말해서, 앞의 '0x'가 없는 일반 텍스트로 된 개인 키입니다.

이렇게 하면 지정된 키 파일에서 암호화되지 않은 개인 키를 가져오고, 새 계정을 만들고, 데이터 디렉터리 아래에 키 저장소 파일을 생성하고, 콘솔에 주소를 인쇄합니다. 나중에 계정을 잠금 해제하려면 비밀번호를 기억해 두어야 합니다.

**참고**: 키스토어 파일을 다른 Kaia 인스턴스에 직접 복사할 수 있다면 이 가져오기/내보내기 메커니즘이 필요하지 않습니다.

#### ken CLI

```bash
$ ken 계정 가져오기 --datadir <datadir> <keyfile>
$ ken 계정 가져오기 --password <passwordfile> --datadir <datadir> <keyfile>
```

### 계정 목록

그러면 데이터 디렉터리 아래에 생성된 모든 계정의 목록이 반환됩니다.

#### ken CLI

명령줄에서 다음을 사용하여 CLI를 호출합니다:

```bash
$ ken 계정 목록 --datadir <DATADIR>
$ ken 계정 목록 --datadir ~/kend_home
계정 #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**참고**: 다른 노드에서 키스토어 파일을 복사하거나 파일을 제거하면 반환된 계정 목록의 순서가 변경될 수 있습니다. 따라서 인덱스에 의존하지 않거나 키스토어 파일을 복사하거나 제거할 경우 스크립트에서 계정 인덱스를 확인하고 업데이트하는지 확인하세요.

### 계정 잠금 해제

비대화형으로 계정을 사용하려면 계정을 잠금 해제해야 합니다.

#### ken CLI

쉼표로 구분된 계정 목록(16진수 또는 인덱스)을 인수로 받는 `--unlock "{address},{address}"` 옵션을 사용하여 명령줄에서 EN을 시작하면 한 세션에 대해 프로그래밍 방식으로 계정 잠금을 해제할 수 있습니다. 이는 RPC를 통해 디앱에서 계정을 사용하려는 경우에 유용합니다.

'--잠금해제'를 누르면 목록의 첫 번째 계정이 잠금 해제됩니다. 이 기능은 프로그래밍 방식으로 계정을 만들었을 때 유용하며, 실제 계정을 몰라도 잠금 해제할 수 있습니다.

계정을 만들고 계정을 잠금 해제하여 노드를 시작합니다:

```bash
$ ken account new --password <(echo 이것은 비밀이 아님) --datadir <DATADIR>
$ ken --password <(echo "이것은 비밀이 아님") --unlock primary --datadir <DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

특정 계정이 잠금 해제된 상태에서 노드를 시작하려면 계정 목록에서 주소 위치를 가리키는 주소 또는 인덱스(생성 순서에 해당)를 사용할 수 있습니다.

```bash
$ ken --unlock "0" --datadir <DATADIR>
$ ken --unlock "2" --datadir <DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir <DATADIR>
```

명령줄을 사용하면 여러 계정을 잠금 해제할 수 있습니다. 이 경우 잠금 해제 인수는 쉼표로 구분된 계정 주소 또는 인덱스 목록입니다.

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir <DATADIR>
```

이 구조를 비대화형으로 사용하는 경우, 비밀번호 파일에는 해당 계정에 대한 각각의 비밀번호가 한 줄에 하나씩 포함되어야 합니다.

## JavaScript 콘솔 <a id="javascript-console"></a>

Kaia 엔드포인트 노드는 JavaScript 콘솔과 함께 제공됩니다. 콘솔 명령줄에서 EN에 Kaia API 호출의 일부를 시작할 수 있습니다. JavaScript 콘솔에 접속하려면 다음 명령을 실행하세요.

JavaScript 콘솔에 연결하려면 EN이 실행 중 상태여야 합니다. 자세한 내용은 [EN 시작하기](https://docs.kaia.io/nodes/endpoint-node/install-endpoint-nodes/)를 참조하세요. EN을 시작하고 다음과 같이 콘솔에 연결합니다.

### 사용법

```bash
kend start
kend를 시작합니다: OK
$ ken attach --datadir ~/kend_home
Kaia JavaScript 콘솔에 오신 것을 환영합니다!
인스턴스: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
datadir: ~/kend_home
modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>.
```

attach`명령은 실행 중인 노드에 연결하고,`console\` 명령은 노드를 시작하여 연결합니다.

- 'attach\` - 대화형 자바스크립트 환경 시작(노드에 연결)
- 콘솔\` - 대화형 자바스크립트 환경 시작

### 데이터 디렉토리

계정을 만들면 키스토어 파일은 `<DATADIR>/keystore`에 저장됩니다. <DATADIR>`는 `kend.conf`에 설정된 `DATA_DIR`입니다. 주어진 예제로 빠른 시작 가이드를 따르는 경우 `~/kend_home\`이어야 합니다.

### 콘솔 명령

개인`또는`카이아\`를 입력하면 사용 가능한 기능 목록을 확인할 수 있습니다. 이 튜토리얼에서는 다음 기능을 살펴보겠습니다:

- `personal.newAccount()`
- `personal.importRawKey()`
- `personal.unlockAccount()`
- `kaia.accounts`
- `kaia.getBalance()`

### 콘솔을 통해 계정 만들기

콘솔에서 다음 함수를 호출하여 계정을 만들 수 있습니다:

```javascript
> personal.newAccount("암호문구")
```

계정은 암호화된 형식으로 저장됩니다. 나중에 계정을 잠금 해제하려면 이 비밀번호를 반드시 기억해 두어야 합니다.

### 콘솔을 통해 계정 가져오기

```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// Kaia 지갑 키 사용
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

### 콘솔을 통해 계정 나열

콘솔을 사용할 때

```javascript
> kaia.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

### 콘솔을 통한 계정 잠금 해제

콘솔에서 일정 기간(초 단위) 동안 계정을 한 번에 하나씩 잠금 해제할 수도 있습니다.

```javascript
> personal.unlockAccount(주소, "비밀번호", 300)
```

콘솔 기록이 기록되므로 계정이 노출될 수 있으므로 여기에 비밀번호 인수를 사용하지 않는 것이 좋습니다. 경고를 받았습니다.

### 계정 잔액 확인

#### 자바스크립트 콘솔

계정 잔액을 확인하려면

```javascript
> kaia.fromPeb(kaia.getBalance("{account}"), "KAIA")
6.5
```

자바스크립트 함수를 사용하여 모든 잔액을 인쇄합니다:

```javascript
function checkAllBalances() {
  var totalBal = 0;
  for (var acctNum in kaia.accounts) {
    var acct = kaia.accounts[acctNum];
    var acctBal = kaia.fromPeb(kaia.getBalance(acct), "KAIA");
    totalBal += parseFloat(acctBal);
    console.log("kaia.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + "KAIA");
  }
  console.log("총잔액: " + totalBal + " KAIA");
};
```

그런 다음 다음을 사용하여 실행할 수 있습니다:

```javascript
> checkAllBalances();
kaia.accounts[0]: 0xd1ade25ccd3d550a7eb532ac759cac7be09c2719 잔액: 63.11848 KAIA
kaia.accounts[1]: 0xda65665fc30803cb1fb7e6d86691e20b1826dee0 잔액: 0 KAIA
kaia.accounts[2]: 0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32 잔액: 1 KAIA
kaia.accounts[3]: 0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99 잔액: 6 KAIA
```

이 함수는 `ken`을 재시작하면 사라지므로 자주 사용하는 함수는 나중에 호출할 수 있도록 저장해두면 도움이 될 수 있습니다. 먼저 `checkAllBalances()` 함수 정의를 컴퓨터의 파일에 저장합니다. 예: `/Users/username/klayload.js`. 그런 다음 대화형 콘솔에서 파일을 로드합니다:

```javascript
> 로드 스크립트("/사용자/사용자 이름/klayload.js")
true
```

이 파일은 수동으로 명령을 입력한 것처럼 자바스크립트 환경을 수정합니다. 자유롭게 실험해 보세요!

## 모듈 API <a id="module-apis"></a>

콘솔 프롬프트에 모듈 이름을 입력하면 해당 모듈의 사용 가능한 프로퍼티와 함수를 확인할 수 있습니다. 기능에 대한 자세한 내용은 [Kaia API](https://docs.kaia.io/references/json-rpc/kaia/account-created/)를 참조하세요.

```javascript
> 개인
{
  listAccounts: [...],
  listWallets: [...],
  deriveAccount: function(),
  ecRecover: function(),
  getListAccounts: function(callback),
  getListWallets: function(callback),
  importRawKey: function(),
  lockAccount: function(),
  ...
}

> personal.listAccounts
["0x960dba2500ab529693ef8e299210768aa0d55ec8", "0x09a04dc9ac3cd92de5ff0d45ae50ff1b618305d9", "0x36662211c072dadbf5fc1e37087ddebd36df986abd", "0xbf9683cf04520eeba6d936a3478de29437c5d048"]
>
```