# KEN으로 스마트 컨트랙트 배포하기

![](/img/build/get-started/klaytnXken.png)

시작하기 전에 몇 가지 카이아 관련 용어에 대해 알아봅시다.

- **엔드포인트 노드 \(EN\)**: 카이아 네트워크에 대한 JSON-RPC API 요청을 처리하는 노드입니다. 엔드포인트 노드는 컨센서스에 참여하지 않습니다.
- **KLAY**: 카이아 네이티브 코인.
- **caver-js**: 카이아 JSON-RPC API의 JavaScript 구현.
- **Kairos**: 카이아 테스트넷

이 단계별 가이드는 Kairos 테스트넷의 엔드포인트 노드 \(EN\)을 시작하고 새 계정으로 기본 스마트 컨트랙트를 구축하는 과정을 단계별로 안내합니다. 이 튜토리얼은 EN을 설정하는 방법과 EN을 통해 스마트 컨트랙트를 배포하는 방법의 두 부분으로 구성되어 있습니다.

> 스마트 컨트랙트를 배포하고 트랜잭션을 제출하려면 KAIA에서 트랜잭션 수수료가 필요하기 때문에 본 가이드에서는 **Kairos** 테스트넷을 사용합니다. 개발 목적으로 테스트넷 KAIA는 [Kairos Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 받을 수 있습니다.

## 엔드포인트 노드 시작 <a href="#launch-an-en" id="launch-an-en"></a>

### 엔드포인트 노드 다운로드 및 초기화(EN) <a href="#download-and-initialize-an-endpoint-node-en" id="download-and-initialize-an-endpoint-node-en"></a>

제공된 [ken 바이너리 패키지](../../../nodes/downloads/downloads.md#get-the-packages)의 압축을 풀고 파일을 klaytn 폴더에 복사합니다.

**참고**: `ken`으로 시작하는 적절한 패키지를 다운로드하세요.

Mac 사용자의 경우, 다음 명령으로 다운로드한 파일의 압축을 풉니다.

```bash
$ tar zxf ken-baobab-vX.X.X-X-darwin-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-darwin-amd64/bin
```

Linux 사용자의 경우, 다음 명령으로 다운로드한 파일의 압축을 풉니다.

```bash
$ tar zxf ken-baobab-vX.X.X-X-linux-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-linux-amd64/bin
```

블록체인 데이터를 저장할 데이터 디렉터리를 만들어야 합니다. 이 튜토리얼에서는 홈 디렉터리에 `kend_home` 폴더를 만들겠습니다.

```bash
$ mkdir -p ~/kend_home
```

### EN 구성하기 <a href="#configuring-the-en" id="configuring-the-en"></a>

구성 파일인 `kend.conf`는 `ken-xxxxx-amd64/conf/` 아래에 있습니다. 설정 가능한 파라미터에 대한 자세한 내용은 [EN 구성 가이드](../../../misc/operation/configuration.md)를 참고하시기 바랍니다. Kairos 테스트넷의 EN을 실행하려면 아래와 같이 `kend.conf` 파일을 업데이트합니다.

```
# cypress, baobab is only available if you don't specify NETWORK_ID.
NETWORK="baobab"
# if you specify NETWORK_ID, a private network is created.
NETWORK_ID=
...
RPC_API="klay,net" # net module should be opened for truffle later on.
...
DATA_DIR=~/kend_home
```

### EN 론칭하기 <a href="#launching-the-en" id="launching-the-en"></a>

EN을 실행하려면 다음 명령을 실행합니다.

```bash
$ kend start
 Starting kend: OK
```

### EN 확인 <a href="#checking-the-en" id="checking-the-en"></a>

EN이 실행 중인지 확인하려면 다음 명령을 실행하세요.

```bash
$ kend status
kend is running
```

### EN 로그 확인하기 <a href="#checking-the-log-of-the-en" id="checking-the-log-of-the-en"></a>

EN의 로그를 확인하려면 다음 명령을 실행하세요.

```bash
$ tail -f ~/kend_home/logs/kend.out
...
INFO[03/26,15:37:49 +09] [5] Imported new chain segment                blocks=1    txs=0  mgas=0.000  elapsed=2.135ms   mgasps=0.000    number=71340 hash=f15511…c571da cache=155.56kB
...
```

### 문제 해결 <a href="#troubleshooting" id="troubleshooting"></a>

카이아 엔드포인트 노드 실행에 문제가 있는 경우 [문제 해결](../../../misc/operation/troubleshooting.md)을 참고하시기 바랍니다.

## 계정 충전하기 <a id="top-up-your-account"></a>

### 콘솔에 연결하기 <a id="attaching-to-the-console"></a>

카이아 엔드포인트 노드는 JavaScript 콘솔과 함께 제공됩니다. 콘솔 명령줄에서 EN에 카이아 API 호출의 일부를 시작할 수 있습니다. JavaScript 콘솔에 접속하려면 다음 명령을 실행하세요.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Kaia JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 
 >
```

**참고**: 모든 블록을 다운로드할 때까지 기다려야 합니다. Enter `klay.blockNumber` in a console and check whether it matches the current block number [here](https://baobab.klaytnscope.com/)

**참고**: 사용 가능한 기능 목록을 보려면 `klay` 또는 `personal`을 입력하세요.

### 카이아 계정 생성하기 <a id="creating-a-new-klaytn-account"></a>

JavaScript 콘솔에서 새 카이아 계정을 생성하려면 다음 명령을 실행합니다. 입력한 비밀번호로 개인키가 암호화됩니다.

```javascript
> personal.newAccount()
Passphrase:  # enter your passphrase
Repeat passphrase:
"0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd" # created account address
```

키스토어 파일은 `kend.conf`에 설정된 EN 데이터 디렉터리 `DATA_DIR`의 `keystore` 폴더에 생성됩니다. 빠른 시작 기본 지침을 따르는 경우 `~/kend_home/keystore/`가 되어야 합니다.

```javascript
$ ls ~/kend_home/keystore/
UTC--2019-06-24T11-20-15.590879000Z--75a59b94889a05c03c66c3c84e9d2f8308ca4abd
```

### 카이아 계정 잠금 해제하기 <a id="unlocking-the-klaytn-account"></a>

생성한 계정을 잠금 해제하려면 다음 명령을 실행합니다. 300초 동안 계정이 잠금 해제됩니다.

**Note**: If you want to manually set the unlock duration, refer to this [link](../../../../references/json-rpc/personal/unlock-account).

**`경고`**: 계정 잠금 해제는 신중하게 수행하지 않으면 매우 위험할 수 있습니다. 해커가 EN을 해킹하면 해커가 토큰을 탈취할 가능성이 있습니다. 더 안전한 방법을 사용하려면 [개인키를 사용한 배포 가이드](../../tutorials/count-dapp/deploy-contracts.md#deploy-method-1-by-private-key)를 참조하세요.

```javascript
> personal.unlockAccount('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # account address to unlock
Unlock account 75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase: # enter your passphrase
true
```

### Kairos Faucet에서 테스트넷 KAIA 받기 <a id="getting-testnet-klay-from-the-baobab-faucet"></a>

- KlaytnWallet에서 Kairos Faucet 사용하기.

- [https://baobab.wallet.klaytn.foundation](https://baobab.wallet.klaytn.foundation/)에 접속합니다.

- 월렛에서 새 계정을 생성하거나 위의 EN JavaScript 콘솔에서 생성한 키스토어 파일을 사용하여 월렛에 로그인할 수 있습니다.

- 왼쪽 창 메뉴에서 "KLAY Faucet"로 이동하여 "Run Faucet" 버튼을 클릭하고 150 KAIA를 받습니다.

  KAIA Faucet은 24시간에 한 번씩 실행할 수 있습니다.

- KAIA를 받기 위해 새 계정을 생성한 경우, EN에서 생성한 계정으로 KAIA를 보내세요.

### 계정 잔액 확인하기 <a id="checking-the-balance-in-your-account"></a>

계정 잔액을 확인하려면 다음 명령을 실행하세요.

기본 단위는 peb \(1 KAIA = 10^18 peb\)입니다. KAIA 단위에 대한 자세한 정보는 [KLAY 단위](../../../learn/klaytn-native-coin-klay.md#units-of-klay)에서 확인할 수 있습니다.

```javascript
> klay.getBalance('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # enter your account address
1e+21  # 1000 KAIA
```

### 콘솔 종료하기 <a id="exiting-the-console"></a>

JavaScript 콘솔을 종료하려면 다음 명령을 실행합니다.

```javascript
> exit
$
```

## 개발 도구 설치 <a id="install-development-tools"></a>

### caver-js 설치하기 <a id="installing-caver-js"></a>

이렇게 klaytn 프로젝트 디렉터리를 생성하는 것이 좋습니다:

```bash
$ mkdir $HOME/klaytn
```

> 진행하려면 `npm`과 `node.js`가 설치되어 있어야 합니다. 시스템에 설치하려면 [get-npm](https://www.npmjs.com/get-npm) 및 [node.js](https://nodejs.org/en/)를 참조하세요.

[caver-js](../../../references/sdk/caver-js/caver-js.md)는 카이아 네트워크를 위한 JSON RPC 프레임워크입니다(이더리움의 web3.js에 해당). caver-js를 설치에 앞서에 `npm init` 명령어를 통해 `package.json` 파일을 생성한 후, `npm install caver-js`를 입력해 caver-js를 설치해야 합니다.

```bash
$ npm init # initialize npm at the klaytn project directory
$ npm install caver-js
```

**참고**: caver-js를 이미 설치한 경우 최신 버전으로 업데이트하세요.

```bash
$ npm cache clean --force # initialize npm cache
$ npm install caver-js@latest # update caver-js to the latest version
```

caver-js를 업데이트하는 동안 다음과 같은 오류가 발생하면 `websocket` 디렉터리에서 `.git` 폴더를 제거하세요.

```bash
npm ERR! path /Users/username/klaytn/node_modules/websocket
npm ERR! code EISGIT
npm ERR! git /Users/username/klaytn/node_modules/websocket: Appears to be a git repo or submodule.
npm ERR! git     /Users/username/klaytn/node_modules/websocket
npm ERR! git Refusing to remove it. Update manually,
npm ERR! git or move it out of the way first.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/username/.npm/_logs/2019-06-25T01_49_37_032Z-debug.log​

$ rm /Users/username/klaytn/node_modules/websocket/.git
```

**참고:** web3.js에서 `web3.eth...`로 시작하는 모든 함수 호출의 경우 `caver.klay...`로 대체해야 합니다.

`web3.eth.sendTransaction({ ... })` \(X\)

`caver.klay.sendTransaction({ ... })` \(O\)

### Truffle 설치하기 <a id="installing-truffle"></a>

이 튜토리얼에서는 Truffle을 사용하여 Solidity로 작성된 스마트 컨트랙트를 컴파일하고 배포합니다. 현재 Kaia는 Truffle 버전 4.1.15를 지원합니다. Truffle에 대한 자세한 내용은 다음 사이트를 참고하세요:

- Truffle 저장소 - [https://github.com/trufflesuite/truffle](https://github.com/trufflesuite/truffle)
- Truffle 문서 - [https://trufflesuite.com/docs](https://trufflesuite.com/docs)

Truffle을 전역적 또는 지역적으로 설치할 수 있습니다.

- Globally using npm by executing the following commands:

```bash
$ sudo npm install -g truffle@4.1.15
$ cd /usr/local/lib/node_modules/truffle
$ sudo npm install solc@0.5.6
$ cd -
```

또는

- 지역적으로 설치하려면 다음 명령을 실행합니다.

```bash
# Assuming you are in $HOME/klaytn/.
$ npm install truffle@4.1.15
$ cd node_modules/truffle
$ npm install solc@0.5.6
$ cd -
$ ln -s node_modules/truffle/build/cli.bundled.js truffle
$ export PATH=`pwd`:$PATH
```

### vvisp 설치하기 <a id="installing-vvisp"></a>

vvisp는 스마트 컨트랙트 개발을 위한 사용하기 쉬운 CLI 도구/프레임워크이며, [HEACHI LABS](https://henesis.io/)에서 제공합니다. 명령어 하나로 카이아 스마트 컨트랙트의 환경 설정, 배포, 실행을 쉽게 할 수 있습니다. Truffle 프레임워크를 지원하므로 Truffle에 익숙한 개발자도 어려움 없이 vvisp를 사용할 수 있습니다.

여기서는 vvisp를 설치하고 이를 이용해 카이아 dApp 개발 환경을 설정하는 방법을 소개합니다.

- vvisp 리포지토리 - [https://github.com/HAECHI-LABS/vvisp](https://github.com/HAECHI-LABS/vvisp)
- vvisp 문서 - [https://github.com/HAECHI-LABS/vvisp/blob/dev/README_KLAYTN.md](https://github.com/HAECHI-LABS/vvisp/blob/dev/README_KLAYTN.md)

다음 명령어를 실행하여 npm 또는 yarn이 있는 경우 vvisp를 쉽게 설치할 수 있습니다:

```bash
$ npm install -g @haechi-labs/vvisp
# or if you use yarn
$ yarn global add @haechi-labs/vvisp
```

설치가 완료되면 vvisp 명령을 사용하여 제대로 설치되었는지 확인할 수 있습니다. **참고**: **v2.1.0** 이상의 버전을 사용해야 합니다.

```bash
$ vvisp
Usage: vvisp <command> [options]

where <command> is one of: compile, console, deploy-contract, deploy-service, flatten, gen-script, init

Options:
  -v, --version  output the version number
  -h, --help     output usage information

Commands:

   compile [files...]                       compile the smart contracts

   console [script-api-path]                run interactive shell to execute contract scripts

   deploy-contract <file> [arguments...]    deploy the smart contracts

   deploy-service                           deploy or upgrade smart contract service using the deployment configure file

   flatten <files...>                       flatten the smart contracts

   gen-script [files...]                    generate javascript libraries communicating the smart contracts

   init [name]                              initialize directory to use vvisp

# you can check installed version.
$ vvisp --version
v2.1.0
```

## 스마트 컨트랙트 배포 <a id="deploy-a-smart-contract"></a>

이제 카이아 스마트 컨트랙트를 개발하고 배포할 준비가 되었습니다!

### 프로젝트 디렉터리 만들기 <a id="creating-a-project-directory"></a>

먼저 소스 코드가 있는 디렉터리를 만듭니다.

```bash
$ mkdir klaytn-testboard
$ cd klaytn-testboard
```

### Truffle 초기화하기 <a id="initializing-truffle"></a>

컨트랙트 배포를 위해 Truffle을 초기화합니다.

```bash
$ truffle init
```

### Solidity에서 간단한 스마트 컨트랙트 작성하기 <a id="writing-a-simple-smart-contract-in-solidity"></a>

`klaytn-testboard/contracts` 디렉터리에 `KaiaGreeter.sol`을 생성합니다.

```bash
$ cd contracts
$ touch KlaytnGreeter.sol
$ vi KlaytnGreeter.sol
```

KaiaGreeter.sol에 다음 코드를 작성합니다.

```text
pragma solidity 0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

### 마이그레이션 스크립트 수정하기 <a id="modifying-the-migration-script"></a>

```bash
$ cd ..
$ cd migrations
$ vi 1_initial_migration.js
```

1_initial_migration.js\\`를 다음과 같이 수정합니다.

```javascript
const Migrations = artifacts.require("./Migrations.sol");
const KaiaGreeter = artifacts.require("./KaiaGreeter.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KaiaGreeter, 'Hello, Klaytn');
};
```

### Truffle을 사용하여 스마트 컨트랙트 배포하기 <a id="deploying-a-smart-contract-using-truffle"></a>

Truffle.js에 카이아의 네트워크 정보를 입력합니다.

**`경고`**: 현재 Kaia Kairos 네트워크의 가스 가격은 25Gpeb \(**다른 숫자를 사용하려고 하면 오류를 반환합니다**\)로 고정되어 있습니다.

```bash
$ cd ..
$ vi truffle-config.js
```

아래와 같이 구성을 수정합니다.

```javascript
// truffle-config.js
module.exports = {
    networks: {
        klaytn: {
            host: '127.0.0.1',
            port: 8551,
            from: '0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd', // enter your account address
            network_id: '1001', // Baobab network id
            gas: 20000000, // transaction gas limit
            gasPrice: 25000000000, // gasPrice of Baobab is 25 Gpeb
        },
    },
    compilers: {
      solc: {
        version: "0.5.6"    // Specify compiler's version to 0.5.6
      }
  }
};
```

다음 명령을 사용하여 컨트랙트를 배포합니다.

**참고**: 배포할 네트워크를 선택하려면 `--network`를 사용하고 덮어쓰려면 `--reset`을 사용합니다.

**참고**: 카이아 노드가 실행 중인지 확인하세요.

컨트랙트 주소 뒤에 `KaiaGreeter`'가 표시됩니다:

```bash
$ truffle deploy --network klaytn --reset
Using network 'klaytn'.
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x0f5108bd9e51fe6bf71dfc472577e3f55519e0b5d140a99bf65faf26830acfca
  Migrations: 0x97b1b3735c8f2326a262dbbe6c574a8ea1ba0b7d
  Deploying KlaytnGreeter...
  ... 0xcba53b6090cb4a118359b27293ba95116a8f35f66ae50fbd23ae1081ce9ffb9e
  KlaytnGreeter: [SAVE THIS ADDRESS!!] # this is your smart contract address
Saving successful migration to network...
  ... 0x14eb68727ca5a0ac767441c9b7ab077336f9311f71e9854d42c617aebceeec72
Saving artifacts...
```

**`경고`**: 계정이 잠겨 있으면 오류를 반환합니다.

```bash
Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... undefined
Error encountered, bailing. Network state unknown. Review successful transactions manually.
Error: authentication needed: password or unlock
```

이렇게 계정을 잠금 해제할 수 있습니다.

```javascript
> personal.unlockAccount('0x775a59b94889a05c03c66c3c84e9d2f8308ca4abd')
Unlock account 0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase:
true
```

And then you are ready to go. 다시 배포해 보세요.

## 배포 확인 <a id="check-the-deployment"></a>

### caver-js를 사용하여 배포된 바이트 코드 확인하기 <a id="checking-the-deployed-byte-code-using-caver-js"></a>

배포된 스마트 컨트랙트의 바이트 코드를 확인하려면 `getCode`를 사용합니다.

먼저 테스트 파일을 만들어서 엽니다.

```bash
$ touch test-klaytn.js
$ open test-klaytn.js
```

다음 테스트 코드를 작성합니다. Make sure you enter the contract address you just deployed.

```javascript
// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// enter your smart contract address
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'
caver.klay.getCode(contractAddress).then(console.log);
```

코드를 실행합니다.

```bash
$ node test-klaytn.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151818401526020810190506100a2565b50505050905090810190601f1680156100ea5780820380516001836020036101000a031916815260200191505b509250505060405180...
```

### 배포된 스마트 컨트랙트에서 함수 호출하기 <a id="calling-functions-in-the-deployed-smart-contract"></a>

JavaScript를 사용하여 컨트랙트에서 `greet()`를 호출합니다.

**참고**: 스마트 컨트랙트에서 특정 함수를 호출하기 위해서는 ABI \(Application Binary Interface\) 파일이 필요합니다. Truffle은 컨트랙트를 배포할 때 `./build/contracts/`에 `abi` 속성이 포함된 .json 파일을 자동으로 생성합니다.

위에 작성한 테스트 코드에 다음 줄을 추가합니다.

```javascript
// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// enter your smart contract address
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'

caver.klay.getCode(contractAddress).then(console.log);
// add lines
const KaiaGreeter = require('./build/contracts/KaiaGreeter.json');
// enter your smart contract address
const klaytnGreeter = new caver.klay.Contract(KaiaGreeter.abi, contractAddress);
klaytnGreeter.methods.greet().call().then(console.log);
```

테스트 코드를 실행합니다.

```bash
$ node test-klaytn.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151... # This is from caver.klay.getCode
Hello, Kaia # This is from KlyatnGreeter.methods.greet()
```

**"안녕하세요, 카이아입니다"라는 메시지가 표시되면 작업을 완료한 것입니다. 축하합니다!**
