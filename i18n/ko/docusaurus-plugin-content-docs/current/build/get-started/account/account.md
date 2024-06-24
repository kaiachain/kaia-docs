# 계정 기본 사항

**`경고`**: 비밀번호를 기억하세요. 계정의 비밀번호를 잊어버리면 해당 계정에 액세스할 수 없습니다. **"비밀번호를 잊어버렸습니다"라는 옵션은 없습니다. 절대 분실하지 마세요.**

카이아는 개발자가 계정을 관리할 수 있는 두 가지 편리한 명령줄 도구인 `ken`과 `JavaScript 콘솔`을 제공합니다. 개인키를 암호화되지 않은 형식으로 내보내는 것은 지원되지 않는다는 점에 유의하세요.

## ken <a id="ken"></a>

카이아 엔드포인트 노드 바이너리 `ken`은 `account` 명령어를 통해 계정 관리를 제공합니다. `account` 명령어를 사용하면 새 계정을 생성하고, 기존 계정을 모두 나열하고, 개인키를 새 계정으로 가져오고, 최신 키 형식으로 마이그레이션하고, 비밀번호를 변경할 수 있습니다.

### 사용법 <a id="usage"></a>

```bash
$ ken account <command> [options...] [arguments...]
```

**예시**

```bash
$ ken account -help
...
COMMANDS:
     list    Print summary of existing accounts
     new     Create a new account
     update  Update an existing account
     import  Import a private key into a new account
...
```

하위 명령에 대한 정보는 `ken account <command> --help`로 확인할 수 있습니다.

```text
$ ken account list --help
list [command options] [arguments...]

Print a short summary of all accounts

KAIA OPTIONS:
  --dbtype value                        Blockchain storage database type ("leveldb", "badger") (default: "leveldb")
  --datadir "/Users/ethan/Library/KEN"  Data directory for the databases and keystore
  --keystore                            Directory for the keystore (default = inside the datadir)

DATABASE OPTIONS:
  --db.no-partitioning  Disable partitioned databases for persistent storage
```

### 데이터 디렉터리 <a id="data-directory"></a>

키스토어 파일은 `<DATADIR>/keystore`에 저장됩니다. 데이터 디렉터리는 아래와 같이 지정할 수 있습니다. '--datadir' 옵션과 함께 `ken account` 명령을 실행하는 것을 권장합니다. 데이터 디렉터리가 `kend.conf`에서 설정한 `DATA_DIR`을 가리키도록 설정하면 엔드포인트 노드와 계정을 원활하게 공유할 수 있습니다.

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --datadir "~/kend_home"
```

데이터 디렉터리를 지정하지 않으면 기본 위치는 다음과 같습니다.

- Mac: `~/Library/KEN`
- Linux: `~/.ken`

## JavaScript 콘솔 <a id="javascript-console"></a>

JavaScript 콘솔에 연결하려면 EN이 실행 중 상태여야 합니다. 자세한 내용은 [EN 시작하기](../../smart-contracts/deploy/ken.md)를 참조하세요. 다음과 같이 EN을 시작하고 콘솔에 연결합니다.

### 사용법 <a id="usage"></a>

```bash
$ kend start
Starting kend: OK

$ ken attach ~/kend_home/kaia.ipc
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

**예시**

`personal` 또는 `klay`를 입력하면 사용 가능한 함수 목록을 볼 수 있습니다. 이 튜토리얼에서는 다음 함수를 살펴보겠습니다.

```bash
> personal.newAccount()
> personal.importRawKey()
> personal.unlockAccount()
> kaia.accounts
> kaia.getBalance()
```

### 데이터 디렉터리 <a id="data-directory"></a>

계정을 생성하면 키스토어 파일은 `<DATADIR>/keystore`에 저장됩니다. `<DATADIR>`은 'kend.conf'에 설정된 'DATA_DIR'입니다. 주어진 예제로 빠른 시작 가이드를 따르는 경우 `~/kend_home`이어야 합니다.
