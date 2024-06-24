# 토큰 전송

카이아 디자인 섹션에서 설명한 것처럼 서비스체인은 부모체인과 자식체인 간의 밸류(KLAY, ERC-20, ERC-721) 전송을 지원합니다.
이 페이지는 SCN에서 밸류 전송 기능을 활성화하는 방법을 보여줍니다.

EN과 SCN을 설정한 후 체인 간 밸류 전송을 활성화하려면 다음 절차가 필요합니다.

1. SCN에 접속하여 `subbridge.parentOperator`와 `subbridge.childOperator`를 실행하여 계정 주소를 확인합니다.
2. `parent.operator`를 이전 단계의 `subbridge.parentOperator`로 설정합니다.
3. 토큰(ERC-20 또는 721) 컨트랙트를 부모/자식 체인에 배포합니다. (KLAY 전송만 필요한 경우, 3단계와 4단계를 건너뛸 수 있습니다.)
4. 토큰 컨트랙트를 부모/자식 체인의 브리지 컨트랙트에 등록합니다.
5. 부모/자식 체인에 있는 브리지 컨트랙트를 구독합니다.

단계를 수행하기 전에 메커니즘의 이면을 이해하기 위해 높은 수준의 시스템 아키텍처를 살펴 보겠습니다.

## 시스템 구조 <a id="system-architecture"></a>

그림 1은 브리지/토큰 컨트랙트와 브리지 노드가 있는 서비스 체인의 시스템 아키텍처를 보여줍니다.

아래 컨트랙트는 메인/서브 브리지를 통해 서로 통신하며 사용자의 밸류 전송 요청을 처리합니다.

- 브리지 컨트랙트
- ERC-20 컨트랙트(필요한 경우)
- ERC-721 컨트랙트(필요한 경우)

![그림 1. 서비스 체인 아키텍처](/img/nodes/sc_arch.png)

## <a id="step-1-add-klay-to-the-operator-accounts"></a>

서비스체인에는 부모 체인 브리지 오퍼레이터 계정과 서비스 체인 브리지 오퍼레이터 계정의 두 가지 오퍼레이터 계정이 있습니다. 각 오퍼레이터 계정은 트랜잭션에 서명하는 데 사용됩니다.
트랜잭션이 부모 체인으로 값을 이동하면 부모 체인 브리지 오퍼레이터 계정이 트랜잭션에 서명합니다. 자식 체인에는 자식 체인 브리지 오퍼레이터 계정이 사용됩니다.
사용자가 '값 전송 요청' 트랜잭션을 제출하면 하위 브리지는 브리지 오퍼레이터 계정이 서명한 '값 전송 처리' 트랜잭션을 생성합니다.
그런 다음 `parentOperator`에게 KAIA를 전송합니다.
서비스 체인의 가스 가격이 0이 아닌 값으로 설정된 경우, 서비스 체인 브리지 오퍼레이터의 잔액에도 KAIA가 있어야 합니다.

### 키 저장소 및 비밀번호 파일 <a id="keystore-and-password-file"></a>

SCN이 부팅될 때 부모/자식 운영자의 키가 없는 경우 키스토어 파일과 비밀번호 파일이 자동으로 생성됩니다.
특정 계정을 운영자로 사용하려면 키를 제공하면 됩니다. SCN을 부팅하기 전에 아래 파일을 지정된 경로에 배치합니다.
비밀번호 파일에는 키스토어 파일의 비밀번호 문자열이 있어야 합니다.
비밀번호 파일 이름은 해당 키스토어 파일의 계정 주소여야 합니다.

**파일**

- 키스토어 파일 : `UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b`
- 비밀번호 파일 : `0x2eD72a9D7fe5da7672fD21567e07302431649B0B`

**파일 경로**

- 상위 체인 브리지 오퍼레이터: $datadir/parent_bridge_account
- 자식 체인 브리지 오퍼레이터 : $datadir/child_bridge_account

```javascript
> pwd
/$dataDIR/child_bridge_account

> ls
0x2eD72a9D7fe5da7672fD21567e07302431649B0B
UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b

> cat 0x2eD72a9D7fe5da7672fD21567e07302431649B0B
%S~f5qqM38cB47jL%

> cat UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b
{"address":"2ed72a9d7fe5da7672fd21567e07302431649b0b","crypto":{"cipher":"aes-128-ctr","ciphertext":"6486509e8158bf4984608cbc5562cf2c9a27cd988a98e543731b39251144e633","cipherparams":{"iv":"96d7e5b6a936278c0797faae6cb3d903"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"8928ba41b8228af19390ec881c51452fa3ea973ad2c253ca0f5bc9197a8b24c4"},"mac":"9c8ec63694c20a473e0ea33840e7d16e9f1a20afc52b3244b703a3ac0a66cfa3"},"id":"9ae10527-7fd3-4aae-a4eb-316af211494e","version":3}
```

### 브리지 오퍼레이터 주소 확인 <a id="check-bridge-operator-addresses"></a>

SCN을 정상적으로 실행했다면, 아래와 같이 RPC API를 사용하여 부모/자식 체인 브리지 오퍼레이터 주소를 확인할 수 있습니다.

```
$ kscn attach ~/kscnd_home/kaia.ipc
Welcome to the Kaia JavaScript console!

instance: Kaia/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

자세한 내용은 [subbridge API](../../../references/json-rpc/subbridge/parent-operator)를 참조하세요.

### 브리지 오퍼레이터에게 KAIA 보내기 <a id="send-klay-to-bridge-operators"></a>

`subbridge.parentOperator`와 `subbridge.childOperator`는 트랜잭션을 전송하기에 충분한 KAIA를 가지고 있어야 합니다.
서비스 체인의 가스 가격이 0이 아닌 값으로 설정된 경우, 서비스 체인 브리지 오퍼레이터의 잔액에도 KAIA가 있어야 합니다.

운영자 계정을 충전한 후 아래와 같이 잔액을 확인할 수 있습니다.

**자식 체인 브리지 운영자**

```
$ kscn attach ~/kscnd_home/kaia.ipc
Welcome to the Kaia JavaScript console!

 instance: Kaia/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.parentOperatorBalance
1e+50
```

**상위 체인 브리지 오퍼레이터**

```
$ kscn attach ~/kscnd_home/kaia.ipc
Welcome to the Kaia JavaScript console!

 instance: Kaia/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.childOperatorBalance
1e+50
```

## 브리지 컨트랙트 <a id="bridge-contract"></a>

토큰 컨트랙트는 발행/전송 테스트를 위한 것이고, 브리지 컨트랙트는 밸류 전송 요청을 수신/처리하는 데 사용됩니다.
사용자는 브리지 컨트랙트에 KAIA 전송을 요청하여 자신의 KAIA를 다른 체인으로 전송할 수 있습니다.
KIP-7 토큰 컨트랙트에 `requestERC20Transfer()` 함수를 호출하여 부모 체인과 자식 체인 간에 KIP-7 토큰을 전송할 수 있습니다.

### 배포 <a id="deployment"></a>

서브 브리지는 브리지 컨트랙트 배포 API를 제공합니다. 아래와 같이 단일 RPC 호출을 사용하여 두 체인에 브리지 컨트랙트를 배포할 수 있습니다.
이 작업을 수행하기 전에 메인 브리지와 서브 브리지를 연결해야 합니다. 자세한 가이드는 [브리지 구성](bridge-configuration.md)을 참고하시기 바랍니다.

```javascript
$ kscn attach ~/kscnd_home/kaia.ipc
Welcome to the Kaia JavaScript console!

instance: Kaia/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.deployBridge()
["0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5"]

> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: false
}]
```

자세한 내용은 [subbridge API](../../..references/json-rpc/subbridge/deploy-bridge)를 참조하세요.

`subbridge_listBridge`는 브리지 컨트랙트 주소와 해당 컨트랙트의 구독 상태를 보여줍니다.
서브브릿지는 브리지 컨트랙트 주소 목록을 파일에 저장합니다. 재부팅 시 서브브릿지는 파일에서 브리지 컨트랙트 목록을 다시 로드합니다.

### 구독 <a id="subscribing"></a>

브리지 컨트랙트를 배포한 후, 서브 브리지가 배포된 브리지 컨트랙트를 구독하도록 하여 밸류 전송을 활성화해야 합니다. 이는 다른 RPC API 호출인 `subbridge_subscribeBridge`를 사용하여 수행할 수 있습니다.

```javascript
> subbridge.subscribeBridge("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5")
null

> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: true
}]
```

### 전제 조건 <a id="prerequisites"></a>

구독이 완료되면 SCN은 사용자의 "밸류 전송 요청" 트랜잭션을 자동으로 처리합니다.
이 섹션에서는 브리지 컨트랙트 상태를 확인하는 방법을 설명합니다.

브리지 컨트랙트에는 두 개의 nonce, 즉 `requestNonce`와 `handleNonce`가 있습니다.
인체인 트랜잭션과 달리 서브 브리지는 상위 nonce 요청을 하위 nonce 요청보다 먼저 처리할 수 있습니다.

- requestNonce : 이 브리지 컨트랙트에 대한 사용자의 "크로스 체인 밸류 전송" 요청 횟수입니다.
- handleNonce : 서브 브리지가 처리한 가장 높은 nonce입니다.
- lowerHandleNonce : 서브 브리지가 처리해야 하는 가장 낮은 nonce.

따라서 nonce가 다음과 같이 업데이트되면 크로스 체인 밸류 전송이 올바르게 처리되었다고 말할 수 있습니다.

- 부모 체인 브리지 컨트랙트의 "handleNonce"와 "lowerHandleNonce"는 자식 체인 브리지 컨트랙트의 "requestNonce"에 계속 접근합니다.
- "handleNonce"와 "lowerHandleNonce"는 부모 체인 브리지 컨트랙트의 "requestNonce"에 계속 접근합니다.

"handleNonce"가 대응하는 브리지 컨트랙트의 "requestNonce"와 같고 "lowerHandleNonce"가 "handleNonce"보다 1보다 크면 사용자의 요청이 모두 처리된 것입니다.

### 로그 <a id="log"></a>

아래는 정상 작동 중 SCN의 일반적인 로그 출력입니다.
1초마다 브리지 컨트랙트의 상태가 출력됩니다.

```
INFO[10/16,19:37:40 +09] [45] VT : Parent -> Child Chain                request=8699 handle=4826 lowerHandle=4826 pending=3873
INFO[10/16,19:37:40 +09] [45] VT : Child -> Parent Chain                request=7894 handle=4207 lowerHandle=4207 pending=3687
```

이 로그는 request, handle, lowerHandle, pending nonce를 보여줍니다.
각 값은 아래와 같은 의미를 가집니다.

- request: 가입된 모든 브리지 컨트랙트의 값 전송 요청 nonce의 합계입니다.
- handle: 가입된 모든 브리지 컨트랙트의 상위 핸들 nonce의 합입니다.
- lowerHandle: 가입된 모든 브리지 컨트랙트의 하위 핸들 nonce의 합입니다.
- pending : `request`와 `lowerHandle`의 차이입니다.

### RPC API <a id="rpc-api"></a>

아래와 같이 브리지 컨트랙트의 상태를 확인할 수 있습니다.
You can refer to the [subbridge API](../../../references/json-rpc/subbridge/get-bridge-information) for more details.

```javascript
> subbridge.getBridgeInformation("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")
{
  counterPart: "0x22c41ae528627b790233d2e59ea520be12350eb5",
  handleNonce: 0,
  lowerHandleNonce: 0,
  isRunning: true,
  isSubscribed: true,
  onServiceChain: true,
  pendingEventSize: 0,
  requestNonce: 0
}
```

## ERC-20 토큰 전송(2단계) <a id="erc-20-token-transfer-twostep"></a>

서비스체인은 ERC-20/721 밸류 전송도 지원합니다.
이를 지원하려면 서비스 체인과 호환되는 ERC-20/721 토큰 컨트랙트를 부모 체인 및 자식 체인 모두에 배포해야 합니다.
ERC-20/721 토큰 컨트랙트 코드의 경우,
[토큰 표준](../../../build/smart-contracts/token-standard.md)을 참조하세요.

### 배포 <a id="deployment"></a>

SCN은 아직 ERC-20/721 토큰을 배포하는 API를 지원하지 않습니다. caver-js를 통해 토큰을 배포해야 합니다.
ERC-20/721 컨트랙트를 배포할 때는 올바른 브리지 오퍼레이터 계정을 사용해야 합니다. 메인 체인 배포에는 부모 오퍼레이터 계정을, 서비스 체인 배포에는 자식 오퍼레이터 계정을 사용하세요.
잘못된 계정으로 토큰 컨트랙트를 배포한 경우 밸류 전송이 작동하지 않으므로 올바른 계정으로 토큰 컨트랙트를 다시 배포해야 합니다.

### 등록 <a id="register"></a>

토큰 컨트랙트를 배포한 후에는 아래와 같이 부모/자식 체인에 있는 브리지 컨트랙트에 토큰 컨트랙트를 등록해야 합니다.

```javascript
> subbridge.registerToken("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5", "0x376b72abe1b29cace831bd3f5acdfa967814c9cd", "0x53160735f7cc6ff75e48619f368bb94daff66a1b")
null
```

이 명령은 자식 체인 토큰("0x376b72abe1b29cace831bd3f5acdfa967814c9cd")을 자식 체인 브리지 컨트랙트("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")와 함께 등록합니다. 이 단계에서는 부모 체인뿐만 아니라 자식 체인에 브리지 컨트랙트와 토큰 컨트랙트를 모두 배포합니다.

자세한 내용은 [Service Chain API](../../../references/json-rpc/subbridge/register-token)를 참조하세요.

## 밸류 전송 요청 <a id="request-value-transfer"></a>

이 섹션에서는 사용자가 밸류 전송을 요청하기 위해 호출할 컨트랙트 메서드에 대해 설명합니다.
요청 트랜잭션은 0 값을 허용하지 않습니다(KLAY/ERC-20).

### KAIA 전송 <a id="klay-transfer"></a>

사용자는 아래 방법을 사용하여 **브릿지 컨트랙트**에 "밸류 전송 요청" 트랜잭션을 생성할 수 있습니다.

#### fallback <a id="fallback"></a>

사용자가 브리지의 폴백 기능을 호출하면 상대방 체인에서 요청하는 사용자와 동일한 계정 주소로 KAIA 전송을 요청합니다.

```solidity
function () external payable;
```

#### requestKLAYTransfer <a id="requestklaytransfer"></a>

사용자가 `_to`와 함께 이 함수를 호출하면 상대방 체인에 있는 `_to` 주소로 KAIA 전송을 요청합니다.

```solidity
function requestKAIATransfer(address _to, uint256 _value, bytes calldata _extraData) external payable
```

### ERC-20 토큰 전송(원스텝) <a id="erc-20-token-transfer-onestep"></a>

#### 2단계 전송은 (1) 브리지 컨트랙트를 먼저 승인한 다음, (2) 컨트랙트 함수 `requestERC20Transfer()`를 호출하는 두 번의 함수 호출로 구성됩니다.

사용자는 브리지 컨트랙트에 토큰을 [승인](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve)한 후 아래 방법을 사용하여 브리지 컨트랙트에 "밸류 전송 요청" 트랜잭션을 할 수 있습니다.

```solidity
function requestERC20Transfer(address _tokenAddress, address _to, uint256 _value,uint256 _feeLimit,bytes memory _extraData) external
```

#### 이 1단계 토큰 전송을 수행하려면 ERC-20 토큰 구현을 수정해야 합니다.

사용자는 승인 없이 아래 방법을 사용하여 **ERC-20 컨트랙트**에 직접 "요청값 전송" 트랜잭션을 생성할 수 있습니다.
그러면 ERC-20 컨트랙트가 해당 기능을 구현해야 합니다.

```solidity
function requestValueTransfer(uint256 _amount, address _to, uint256 _feeLimit, bytes calldata _extraData) external
```

### ERC-721, KIP-17, KAIA용 밸류 전송 <a id="value-transfer-for-erc721-kip17-and-klay"></a>

#### 2단계: 컨트랙트 배포 <a id="step-2-deploy-contracts"></a>

사용자는 브리지 컨트랙트에 토큰을 [승인](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve)한 후 아래 방법을 사용하여 브리지 컨트랙트에 "밸류 전송 요청" 트랜잭션을 할 수 있습니다.

```solidity
function requestERC721Transfer(address _tokenAddress, address _to, uint256 _tokenId, bytes memory _extraData) external
```

#### ERC-721 컨트랙트를 통한 1단계 요청 <a id="1-step-request-via-erc-721-contract"></a>

사용자는 승인 없이 아래 방법을 사용하여 **ERC-721 컨트랙트**에 직접 "밸류 전송 트랜잭션을 요청" 할 수 있습니다.
그러면 ERC-721 컨트랙트가 해당 기능을 구현합니다.

```solidity
function requestValueTransfer(uint256 _uid, address _to) external
```

### onERC721Received() <a id="unsupported-onERC721Received"></a>

ERC-721 표준에는 [onERC721Received](https://eips.ethereum.org/EIPS/eip-721) 콜백 함수가 있습니다.
현재 카이아 팀이 제공하는 브리지 컨트랙트는 토큰 전송을 위해 `requestERC20Transfer()`와 `requestERC721Transfer()`만 지원하고 있습니다.

아니면 `onERC721Recieved()`와 같은 추가 작업은 이벤트 수신과 같은 다른 방식으로 구현해야 합니다(예: `event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)`).

## 밸류 전송 복구

여러 가지 이유로 밸류 전송 요청이 실패할 수 있습니다. 서브 브리지에서 메인 브리지로 또는 메인 브리지에서 서브 브리지로 KAIA 전송을 요청했다고 가정해 봅시다.
이 경우 수신자 측의 브리지 컨트랙트에 요청된 KAIA 수량보다 충분한 KAIA가 있어야 합니다. 그렇지 않으면 반환 값에 오류 알림 없이 전송이 실패합니다.
밸류 전송 복구 기능은 처리되지 않은 이벤트를 찾아 일정 간격으로 이벤트 풀에 다시 삽입하는 기능으로, 상대방 브리지가 해당 이벤트를 성공적으로 처리할 수 있을 때 실패한 트랜잭션이 다시 성공할 수 있습니다.
위 예시의 경우, 실패한 트랜잭션은 상대 브리지에 충분한 KAIA가 있을 때 밸류 전송 복구에 의해 최종적으로 처리될 것입니다.
값 전송 복구를 기본값으로 설정하기 위해서는 두 가지 속성을 설정해야 합니다:

```
SC_VTRECOVERY=1
SC_VTRECOVERY_INTERVAL=5
```

`SC_VTRECOVERY=1`을 설정하면 값 전송 복구가 자동으로 실행됩니다. `SC_VTRECOVERY_INTERVAL`은 밸류 전송 복구가 실행되는 간격을 의미합니다.

## ERC-20 인터페이스를 통한 KIP-7 토큰 전송(2단계) <a id="kip-7-token-transfer-via-erc-20-interface-two-step"></a>

서비스체인에는 KAIA/ERC-20 전송에 대한 수수료 징수 기능이 있습니다.

**곧 업데이트될 예정입니다.**

## 브리지 컨트랙트 커스터마이징 <a id="customizing-your-bridge-contract"></a>

서비스체인에서는 고유한 서비스를 위해 원래 브리지 컨트랙트를 상속하는 사용자 지정 브리지 컨트랙트를 사용할 수 있습니다.
이 섹션에서는 브리지 컨트랙트를 사용자 정의하는 방법을 설명하고 예제 코드를 제시합니다.

**곧 업데이트될 예정입니다.**
