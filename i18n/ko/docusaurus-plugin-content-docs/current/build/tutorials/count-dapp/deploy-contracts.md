# Deploy smart contracts

## 1. Count dApp 클론 <a id="2-clone-count-dapp"></a>

### 1. Count dApp 리포지토리 클론 <a id="1-clone-count-dapp-repository"></a>

```text
$ git clone https://github.com/klaytn/countbapp
```

### 2. Count dApp 설치 및 실행 <a id="2-install-run-count-dapp"></a>

방금 복제한 패키지는 수정 없이 바로 실행할 수 있습니다.

컨트랙트를 배포할 테스트넷 KAIA 받기\
샘플 컨트랙트는 이미 Kairos 테스트넷에 배포되어 있으며, contract ABI는 저희 패키지에 포함되어 있습니다.\
Klaystagram 프론트엔드 코드는 초기에 Kairos 테스트넷의 스마트 컨트랙트에 연결하도록 구성됩니다.

앱을 바로 실행하여 작동 방식을 확인하려면 아래에 입력하세요.

> 첫 페이지에 언급된 테스트 환경을 따르는 것을 적극 권장합니다.

```text
$ npm install
$ npm run local
```

⚠ 작동하지 않는 경우 파일 및 디렉터리 권한을 확인하세요. '[오류: EACCES: 권한 거부](https://stackoverflow.com/questions/38323880/error-eacces-permission-denied)'가 발생하면 `sudo chmod -R 755 /yourProjectDirectoryName` 명령이 도움이 될 수 있습니다.

애플리케이션이 바로 팝업됩니다!

## 2. Klaystagram 스마트 컨트랙트 작성하기 <a id="4-write-klaystagram-smart-contract"></a>

1. 배경
2. 변수 정의
3. 함수 정의
4. 더 많은 작업을 해봅시다.\
   4.1. 변수 추가\
   4.2. 기능 업데이트

### 1) 배경 <a id="1-background"></a>

"Count"라는 매우 간단한 컨트랙트를 만들겠습니다.

a. `count`라는 저장 변수가 하나만 있을 것입니다.\
b.\
b. 사용자는 `count` 변수를 1만큼 증가시키거나 1만큼 감소시킬 수 있습니다. 따라서 `count` 변수를 1만큼 증가시키는 `plus` 함수와 `count` 변수를 1만큼 감소시키는 `minus` 함수의 두 가지 함수가 있습니다. 그게 다입니다!

### 2. 변수 정의 <a id="2-define-the-variable"></a>

변수를 설정하기 전에 Solidity 버전을 지정해야 합니다. 0.5.6 안정 버전 사용을 권장합니다.

```text
Solidity 버전을 지정합니다.
```

그런 다음 컨트랙트의 이름을 "Count"로 지정합니다.

```text
pragma solidity 0.5.6;

contract Count { // set contract names to "Count"

}
```

변수 `count`를 `uint`(부호 없는 정수) 유형으로 선언하고 0으로 초기화해야 합니다.

```text
pragma solidity 0.5.6;

contract Count {
  uint public count = 0; // Declare count variable as uint type and initialize its value to 0.
}
```

### 함수 쓰기 <a id="4-write-functions"></a>

`plus`와 `minus`라는 두 개의 함수가 필요합니다. 각 함수의 역할은 다음과 같습니다:\
`plus` - `count`를 1씩 증가시킵니다. (카운트 = 카운트 + 1)\
`minus` - `count`를 1만큼 감소시킵니다. (카운트 = 카운트 - 1)

```text
pragma solidity 0.5.6;

contract Count {
  uint public count = 0;

  function plus() public { // Make a public function called 'plus'
    count = count + 1; // 'plus' function increases count variable by 1.
  }

  function minus() public { // Make a public function called 'plus'
    count = count - 1; // 'minus' function decreases count variable by 1.
  }
}
```

참고\
컨트랙트 외부에서 함수를 호출할 수 있도록 하려면 함수를 `public`으로 선언해야 합니다.

```text
function plus() public { … }
```

### 4. 뭔가 더 해봅시다 <a id="4-let-s-do-something-more"></a>

기능을 하나 더 추가하려고 합니다. 마지막 참가자의 지갑 주소를 기억하는 것은 어떨까요?

#### 4-1) 변수 추가 <a id="4-1-add-a-variable"></a>

따라서 `lastParticipant`라는 변수를 `address` 유형으로 갖게 됩니다:\
`address public lastParticipant;`

```text
pragma solidity 0.5.6;

contract Count {
  uint public count = 0;
  address public lastParticipant;

  function plus() public { // Make a public function called 'plus'
    count = count + 1; // 'plus' function increases count variable by 1.
  }

  function minus() public { // Make a public function called 'plus'
    count = count - 1; // 'minus' function decreases count variable by 1.
  }
}
```

#### 4-2) `transferOwnership` <a id="4-2-transferownership"></a>

마지막 참가자의 주소를 추적하기 위해 아래와 같이 `lastParticipant`에 주소를 저장합니다:

```text
pragma solidity 0.5.6;

contract Count {
  uint public count = 0;
  address public lastParticipant;

  function plus() public {
    count = count + 1;
    lastParticipant = msg.sender; // store msg.sender to lastParticipant
  }

  function minus() public {
    count = count - 1;
    lastParticipant = msg.sender; // store msg.sender to lastParticipant
  }
}
```

_참고_\
1\) `public` 변수나 함수를 `public`로 선언하면 블록체인 외부에서 접근할 수 있습니다. 프론트엔드 애플리케이션에서 컨트랙트 공개 메서드 및 변수와 상호작용하는 방법은 [Count 컴포넌트](code-overview/count-component.md) 챕터에서 확인할 수 있습니다.

(`fs.writeFile(filename, content, callback)`)\
이 후처리를 통해 컨트랙트 주소와 ABI는 디렉터리에 `deployedABI`와 `deployedAddress`로 저장됩니다..\
2\) `msg.sender`\
`msg.sender`는 현재 트랜잭션을 시작한 주소입니다.\
트랜잭션 발신자의 주소를 얻으려면 `msg.sender` 변수를 사용할 수 있습니다.

```text
lastParticipant = msg.sender;
```

이 줄은 `lastParticipant`가 `msg.sender`를 갖도록 만듭니다.

## 3. Deploy Contract

1. Truffle 구성
2. 배포 설정
3. 배포

### Truffle 구성 <a href="#2-truffle-configuration" id="2-truffle-configuration"></a>

`truffle-config.js`는 배포 구성을 포함한 구성 파일입니다. Truffle-config.js에서 아래 항목을 구성할 수 있습니다.

**1) 누가 컨트랙트를 배포할 것인가(어떤 카이아 계정이 컨트랙트를 배포할 것인가)?**\
**2) 어느 네트워크에 배포할 것인가?**\
**3) 컨트랙트를 배포하기 위해 얼마나 많은 가스를 지불할 의향이 있는가?**

컨트랙트를 배포하는 방법에는 두 가지가 있는데, 첫 번째는 `private `key`를 사용하고 다른 하나는 `unlocked account\\`을 사용합니다.

#### 배포 방법 1: 개인 키로 <a href="#deploy-method-1-by-private-key" id="deploy-method-1-by-private-key"></a>

_경고: 개인키를 노출해서는 안 됩니다. 그렇지 않으면 계정이 해킹될 수 있습니다._

개인 키를 사용하여 컨트랙트를 배포하려면 `provider` 옵션이 필요합니다.

`provider: () => new HDWalletProvider(PRIVATE_KEY, URL)` 이름 그대로 위에서 정의한 개인키와 URL을 삽입합니다.

example)

```javascript
{
 ...,
 provider: new HDWalletProvider(
   'YOUR PRIVATE KEY',
   'https://public-en-baobab.klaytn.net', // If you're running full node you can set your node's rpc url.
  ),
 ...
}
```

```javascript
// truffle-config.js

const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

/**
 * truffle network variables
 * for deploying contract to klaytn network.
 */
const NETWORK_ID = '1001'

/**
 * URL: URL for the remote node you will be using
 * PRIVATE_KEY: Private key of the account that pays for the transaction (Change it to your own private key)
 */
const URL = 'https://public-en-baobab.klaytn.net'

// Paste your `Private key` that has enough KAIA to truffle.js
const PRIVATE_KEY = 'your_private_key'

module.exports = {
  networks: {
    klaytn: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: '8500000',
      gasPrice: null,
    },
  },

  // Specify the version of compiler, we use 0.5.6
  compilers: {
    solc: {
      version: '0.5.6',
    },
  },
}
```

위의 `networks` 속성을 참조하십시오. `klaytn` 네트워크에는 4개의 프로퍼티가 있습니다.\
`provider`, `network_id`, `gas`, `gasPrice`

`provider: 새로운 HDWalletProvider(PRIVATE_KEY, URL)` 줄은 컨트랙트 배포자 계정과 대상 네트워크 노드 URL을 알려줍니다.

`network_id: NETWORK_ID` 카이아에서 네트워크 아이디를 지정하는데, 카이아 Kairos 네트워크(테스트넷)를 사용하려면 `1001`로 설정해야 합니다. Kairos 네트워크(테스트넷)의 경우 `1001`을 사용합니다.

`gas: GASLIMIT` 지출하고자 하는 최대 가스입니다.

`gasPrice: null` 가스 단위당 가격입니다. 현재 카이아에서 가스 가격은 `'25000000000'`로 고정되어 있습니다. 이를 `null`로 설정하면 Truffle이 자동으로 가스 가격을 설정합니다.

#### 배포 방법 2: 잠금 해제된 계정으로 배포(어려움) <a href="#deploy-method-2-by-unlocked-account-difficult" id="deploy-method-2-by-unlocked-account-difficult"></a>

`$ klay attach http://localhost:8551`를 입력하여 카이아 노드 콘솔에 접속합니다.\
노드에 카이아 계정이 없는 경우, 콘솔에서 `personal.newAccount()`를 입력하여 계정을 생성합니다.\
이미 계정이 있는 경우 `personal.unlockAccount()`를 통해 계정을 잠금 해제합니다.

계정이 잠금 해제되었는지 확인한 후, `host`, `port`, `network_id`, `from` 속성을 설정해야 합니다.\ 1) 배포할 네트워크(`host`, `port`, `network_id`)\
2\) 배포할 대상(`from`) 3) 컨트랙트를 배포하기 위해 감내할 가스 양(`gas`) 1) Which network to deploy (`host`, `port`, `network_id`)\
2\) Who will deploy (`from`) 3) How much gas will you endure to deploy your contract (`gas`)

잠금 해제된 계정 주소를 `from`에 넣습니다. 자체 카이아 풀 노드를 실행하는 경우, 노드의 호스트를 `host`로, 노드의 포트를 `port`로 설정합니다.

example)

```javascript
{
  host: 'localhost',
  port: 8551,
  from: '0xd0122fc8df283027b6285cc889f5aa624eac1d23',
  network_id: NETWORK_ID,
  gas: GASLIMIT,
  gasPrice: null,
}
```

### 2. Deploy setup (Which contract do you want to deploy?) 컨트랙트 배포 <a href="#3.-deploy-contract" id="3.-deploy-contract"></a>

`migrations/2_deploy_contacts.js`:

```javascript
const Klaystagram = artifacts.require('./Klaystagram.sol')
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(Klaystagram)
    .then(() => {
    if (Klaystagram._json) {
      // 1. Record recently deployed contract's abi file to 'deployedABI'
      fs.writeFile(
        'deployedABI',
        JSON.stringify(Klaystagram._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${Klaystagram._json.contractName} is recorded on deployedABI file`)
        })
    }

    // 2. Record recently deployed contract's address to 'deployedAddress'
    fs.writeFile(
      'deployedAddress',
      Klaystagram.address,
      (err) => {
        if (err) throw err
        console.log(`The deployed contract address * ${Klaystagram.address} * is recorded on deployedAddress file`)
    })
  })
}
```

`contracts/` 디렉터리에 배포할 컨트랙트 코드를 지정할 수 있습니다. 먼저, `const Count = artifacts.require('./Count.sol')`를 통해 이 파일에 있는 컨트랙트 파일(`Count.sol`)을 가져와야 합니다. 그리고 `deployer`를 사용하여 `deployer.deploy(Count)`를 통해 컨트랙트를 배포합니다. 이를 위해 `fs` node.js 모듈을 사용합니다. `fs.writeFile(filename, content, callback)` (선택 사항) 참고: `artifacts.require()`에 대한 자세한 내용은 Truffle 공식 문서 [Truffle 문서](https://trufflesuite.com/docs/truffle/getting-started/running-migrations#artifacts-require-)를 참고하세요. 배포 <a href="#4-deploy" id="4-deploy"></a>

### 배포 설정 <a href="#3-deploy-setup" id="3-deploy-setup"></a>

컨트랙트를 배포하려면 KAIA가 필요합니다. 테스트넷의 카이아 지갑을 통해 150 KAIA를 받을 수 있습니다.

- [Kairos 카이아 지갑](https://baobab.wallet.klaytn.foundation/create)에서 카이아 계정을 생성합니다 -> Truffle 설정에 `PRIVATE `key\\`가 사용됩니다. 카이아 계정을 생성한 후, [Kairos 카이아 Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 Faucet를 실행하여 Kairos 테스트넷 KAIA 5개를 받습니다.

![배포 컨트랙트](/img/build/tutorials/klaystagram-deploy-contract.png)

`truffle-config.js` 및 `migrations/2_deploy_contracts.js` 구성에 따라 컨트랙트를 배포합니다.

cf) `--reset` option\
After deploying your contract, if you type `$ truffle deploy --network kairos` again, nothing will happen.\
Because truffle deploys a contract only when there are changes in the contract, otherwise truffle will not do anything.\
If you want to re-deploy your contract anyway, there is an option `--reset`.\
If you provide this option, truffle will deploy your contract even the content of contract hasn't changed.\
ex) `$ truffle deploy --reset --network kairos`

To recap,

- `truffle-config.js`는 `target network`, `deployer account` 및 `gas limit`을 구성합니다.
- 2. 컨트랙트 설정 <a id="2-contract-setup"></a>
- `target network`: 노드 `https://public-en-baobab.klaytn.net`에 컨트랙트를 배포합니다.
- `deployer account`: '0xd0122fc8df283027b6285cc889f5aa624eac1d23'이 이 컨트랙트를 배포합니다.
- `gas limit`: 컨트랙트 배포를 위해 최대 '20000000' 가스까지 견딜 수 있습니다.
- `contract`: Count 컨트랙트를 배포합니다.

배포가 성공하면 터미널에 배포된 컨트랙트 주소가 표시됩니다.

## 4. 앱 실행

![실행](/img/build/tutorials/tutorial-4run-app.gif)

브라우저에서 앱을 실행합니다.\
`$ npm run local`을 실행하면 브라우저가 열리고 앱이 실행됩니다.
