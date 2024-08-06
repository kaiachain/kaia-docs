# 크로스체인 밸류 전송

이 섹션에서는 제공된 테스트 코드를 사용하여 Kairos 네트워크와 서비스체인 간에 ERC-20 밸류 전송을 활성화하는 방법을 설명합니다.
운영자 계정에 KAIA를 추가하고 브리지 컨트랙트와 ERC-20 컨트랙트를 배포합니다.
그런 다음 SCN에 컨트랙트 주소를 등록합니다. 그리고 ERC-20 밸류 전송을 테스트합니다.

## 전제 조건 <a id="prerequisites"></a>

- 서비스체인을 설치하고, [Kairos에 연결하기](en-scn-connection.md)의 지침에 따라 서비스체인을 Kairos EN에 연결했다고 가정합니다.
- 리파지토리 [servicechain-value-transfer-examples](https://github.com/klaytn/servicechain-value-transfer-examples)를 복제합니다.
- `Node.js`(v14) 및 `npm`을 설치합니다([설치 방법](https://nodejs.org/en/download/package-manager/)).
  - 이 예제에서는 두 가지 패키지인 axios와 caver-js를 활용하며, 두 패키지 모두 v14를 지원합니다.

## ERC-20 토큰 전송(원스텝) <a id="erc-20-token-transfer-onestep"></a>

### 1단계: 운영자 계정에 KAIA를 추가합니다. <a id="step-1-add-klay-to-the-operator-accounts"></a>

SCN에 접속하여 `subbridge.parentOperator`와 `subbridge.childOperator`를 실행하여 계정 주소를 확인합니다.

```
$ kscn attach --datadir ~/data
> subbridge.childOperator
"0x10221f7f9355017cd0c11444e7eecb99621bacce"
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

![](/img/nodes/sc-vt-add-klay.png)

`subbridge.parentOperator`와 `subbridge.childOperator`는 트랜잭션을 전송하기에 충분한 KAIA를 가지고 있어야 합니다. `subbridge.parentOperator`는 Kairos 네트워크의 계정이고, `subbridge.childOperator`는 서비스체인 네트워크의 계정이라는 점에 유의하세요.
[Kairos 월렛](https://baobab.wallet.klaytn.foundation/)에서 테스트 계정을 생성하고 Faucet에서 테스트 KAIA를 받습니다. 그런 다음 `parentOperator`에게 KAIA를 전송합니다. childOperator`는 `homi\\`가 생성한 테스트 계정에서 KAIA를 가져와야 합니다([EN 설정 및 SCN 연결 가이드](en-scn-connection.md) 참조).

```
$ kscn account import ~/homi-output/keys_test/testkey1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {80119c31cdae67c42c8296929bb4f89b2a52cec4}
```

```
$ kscn attach --datadir ~/data
> personal.unlockAccount("80119c31cdae67c42c8296929bb4f89b2a52cec4")
Unlock account 80119c31cdae67c42c8296929bb4f89b2a52cec4
Passphrase:
True
> kaia.sendTransaction({from:"80119c31cdae67c42c8296929bb4f89b2a52cec4", to:subbridge.childOperator, value: web3.toPeb(1000, "KAIA")})
"0x84caab84ebf0c4bb4ecf0a7849f1de3e479f1863a95f70c51047a7ca7bc64b33"
```

운영자 계정에 잔액이 충분한지 확인합니다. 서브 브리지가 설치된 SCN 노드의 콘솔에서 다음과 같이 조회할 수 있습니다:

```
> kaia.getBalance(subbridge.childOperator)
1e+21
> subbridge.childOperatorBalance
1e+21
> subbridge.parentOperatorBalance
1e+18
```

### 2단계: 컨트랙트 배포 <a id="step-2-deploy-contracts"></a>

- SCN에 연결하고 컨트랙트 배포를 위한 노드 환경을 준비합니다.
  리포지토리 [servicechain-value-transfer-examples](https://github.com/klaytn/servicechain-value-transfer-examples)를 복제합니다.

![](/img/nodes/sc-vt-deploy.png)

이 단계에서는 부모 체인뿐만 아니라 자식 체인에 브리지 컨트랙트와 토큰 컨트랙트를 모두 배포합니다.
토큰 컨트랙트는 발행/전송 테스트를 위한 것이고, 브리지 컨트랙트는 밸류 전송 요청을 수신/처리하는 데 사용됩니다.

```bash
$ git clone https://github.com/klaytn/servicechain-value-transfer-examples
$ cd servicechain-value-transfer-examples
$ npm install
$ cd erc20
```

텍스트 편집기에서 아래와 같이 `bridge_info.json`을 편집합니다.

- `child` 섹션의 `url`(서비스체인 네트워크의 SCN 노드)을 `kscnd.conf`의 `RPC_PORT`에서 SCN 노드 IP와 적절한 포트 번호로 바꿉니다.
- `child.key`를 `homi`가 생성한 `testkey1`로 바꿉니다.
- `child.operator`를 이전 단계에서 살펴본 `subbridge.childOperator` 주소로 설정합니다.
- `parent` 섹션(Kairos 네트워크의 EN 노드)의 `url`을 EN 노드 IP로 바꾸고 `kend.conf`의 `RPC_PORT`에서 적절한 포트 번호로 바꿉니다.
- `parent.key`를 이전 단계의 [Kairos 지갑](https://baobab.wallet.klaytn.foundation/)에서 생성한 테스트 계정의 프라이빗 키로 바꿉니다.
- `parent.operator`를 이전 단계의 `subbridge.parentOperator`로 설정합니다.

```
{
     "child" : {
         "url": "http://192.168.0.1:7551",
         "key": "0x66cb283353589a10866b58d388e9d956e5a9c873a8c78fa4411d460c19c494ea",
         "operator": "0x10221f7f9355017cd0c11444e7eecb99621bacce"
     },
     "parent" : {
         "url": "http://192.168.0.5:8551",
         "key": "0x26f4b5ac42ceabcfd3b23a991fdbfc792d10ce700a99582fdf9185a8f163b790",
         "operator": "0x3ce216beeafc62d20547376396e89528e1d778ca"
     }
 }
```

`node erc20-deploy.js` 명령을 실행하여 토큰 배포를 수행합니다. 이 스크립트는 브리지 컨트랙트와 토큰 컨트랙트를 모두 배포하며, 브리지 페어를 초기화하기 위한 API 사용량을 출력합니다.

```
$ node erc20-deploy.js
------------------------- erc20-deploy START -------------------------
> info.bridge: 0xEa024d8101E112330f2d7B1a7e7932034E206721
> info.token: 0xbE641028610F628835C36F12bE62d54d74308D70
> info.bridge: 0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463
> info.token: 0x52F8Fa79Fa6D37b18b7AC8f9Ca835373f3C9270f
> subbridge.registerBridge("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463")
> subbridge.subscribeBridge("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463")
> subbridge.registerToken("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463", "0xbE641028610F628835C36F12bE62d54d74308D70", "0x52F8Fa79Fa6D37b18b7AC8f9Ca835373f3C9270f")
------------------------- erc20-deploy END -------------------------
```

### 3단계: 토큰 전송 <a id="step-3-token-transfer"></a>

![](/img/nodes/sc-vt-transfer.png)

`node erc20-transfer-1step.js` 명령으로 토큰 전송을 수행합니다. 이 1단계 토큰 전송을 수행하려면 ERC-20 토큰 구현을 수정해야 합니다. 토큰 컨트랙트 수정을 원하지 않거나 이미 배포된 토큰 컨트랙트가 있는 경우, [ERC-20 토큰 전송(2단계)](#erc-20-token-transfer-twostep)을 참고하시기 바랍니다.

```
$ node erc20-transfer-1step.js
------------------------- erc20-transfer-1step START -------------------------
alice balance: 0
requestValueTransfer..
alice balance: 100
------------------------- erc20-transfer-1step END -------------------------
```

결과가 `alice balance: 100`이면 성공적으로 실행된 것입니다.

## ERC-20 토큰 전송(2단계) <a id="erc-20-token-transfer-twostep"></a>

2단계 토큰 전송 예제를 위해 erc20-transfer-2step.js를 실행합니다. 이 2단계 토큰 전송 예제에서는 수정하지 않은 ERC-20 토큰 컨트랙트를 사용할 수 있습니다.
2단계 전송은 (1) 브리지 컨트랙트를 먼저 승인한 다음, (2) 컨트랙트 함수 `requestERC20Transfer()`를 호출하는 두 번의 함수 호출로 구성됩니다.
이미 브리지 컨트랙트와 토큰 컨트랙트를 모두 배포했기 때문에 이 섹션에서는 컨트랙트를 배포하지 않습니다. 배포하지 않았다면 먼저 배포해야 합니다. `node erc20-deploy.js`를 사용하여 컨트랙트를 배포할 수 있습니다.

```
$ node erc20-transfer-2step.js
> ------------------------- erc20-transfer-2step START -------------------------
> alice balance: 100
> requestValueTransfer..
> alice balance: 200
------------------------- erc20-transfer-2step END -------------------------
```

## ERC-20 인터페이스를 통한 KIP-7 토큰 전송(2단계) <a id="kip-7-token-transfer-via-erc-20-interface-two-step"></a>

[KIP-7](https://kips.kaia.io/KIPs/kip-7) is a token standard compatible with ERC-20. KIP-7 토큰 컨트랙트에 `requestERC20Transfer()` 함수를 호출하여 부모 체인과 자식 체인 간에 KIP-7 토큰을 전송할 수 있습니다.
ERC-20 인터페이스를 통해 KIP-7 토큰을 전송하는 경우, `approve()` 함수를 호출하여 트랜잭션 발신자를 대신하여 브리지가 토큰을 전송할 수 있도록 합니다. 그런 다음 `requestERC20Transfer()` 함수를 호출합니다.
아래 명령은 브리지 컨트랙트와 KIP-7 컨트랙트를 배포합니다.

```
$ node kip7-deploy.js
> ------------------------- kip7-deploy START -------------------------
> info.bridge: 0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE
> info.token: 0xE0E2fC6C7d1eB069153E0c12a4C87B01586b39e7
> info.bridge: 0xEb502159A4B4E876B1cb423f250DCC0d276e01b6
> info.token: 0xd4f02Ca1d49674056A9ec78fbBDc9e1e97726A4F
> subbridge.registerBridge("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6")
> subbridge.subscribeBridge("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6")
> subbridge.registerToken("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6", "0xE0E2fC6C7d1eB069153E0c12a4C87B01586b39e7", "0xd4f02Ca1d49674056A9ec78fbBDc9e1e97726A4F")
------------------------- kip7-deploy END -------------------------
```

아래 명령은 `requestERC20Transfer()`로 ERC-20 인터페이스를 사용하여 KIP-7 토큰을 전송하는 예제입니다.

```
$ node kip7-transfer-2step-erc20-interface.js
> ------------------------- kip7-transfer-2step-erc20-interface START -------------------------
> alice balance: 0
> requestValueTransfer..
> alice balance: 100
> ------------------------- kip7-transfer-2step-erc20-interface END -------------------------
```

다른 사례는 [서비스 체인 밸류 전송 예시](https://github.com/klaytn/servicechain-value-transfer-examples)를 참조하세요.

## KIP-7 및 KIP-17에 대한 네이티브 지원 (구현 예정) <a id="native-support-for-kip-7-and-kip-17-to-be-implemented"></a>

현재 카이아 팀이 제공하는 브리지 컨트랙트는 토큰 전송을 위해 `requestERC20Transfer()`와 `requestERC721Transfer()`만 지원하고 있습니다. KIP-7과 KIP-17에 해당하는 요청 함수는 곧 지원될 예정입니다. 구현이 완료되기 전에는 위에서 볼 수 있듯이 ERC-20 인터페이스를 사용하여 KIP-7 토큰을 전송할 수 있습니다.

## ERC-721, KIP-17, KAIA용 밸류 전송 <a id="value-transfer-for-erc721-kip17-and-klay"></a>

ERC-721, KIP-17, KAIA의 워크플로는 위와 동일합니다. [`erc721`](https://github.com/klaytn/servicechain-value-transfer-examples/tree/main/erc721), [`kip17`](https://github.com/klaytn/servicechain-value-transfer-examples/tree/main/kip17), [`klay`](https://github.com/klaytn/servicechain-value-transfer-examples/tree/main/klay) 디렉터리에 해당 예제 소스 코드가 포함되어 있습니다.
