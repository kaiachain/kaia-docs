# 오라클 네트워크

## 소개

![](/img/build/tools/klaytnXorakl.png)

[오라클 네트워크](https://docs.orakl.network/docs/developers-guide/readme)는 스마트 컨트랙트가 오프체인 데이터 및 기타 리소스에 안전하게 접근할 수 있도록 하는 탈중앙화 오라클 네트워크입니다. 오라클은 [데이터 피드](https://docs.orakl.network/developers-guide/data-feed), [VRF](https://docs.orakl.network/developers-guide/vrf), [요청-응답](https://docs.orakl.network/developers-guide/request-response) 및 [준비금 증명](https://docs.orakl.network/developers-guide/proof-of-reserve) 솔루션을 제공하는 카이아 네이티브 오라클이라는 자부심을 가지고 있습니다.

오라클 네트워크를 통해 사용자는 스마트 컨트랙트에서 예측 불가능하고 편향되지 않은 무작위성을 확보할 수 있습니다. 오라클 네트워크 [검증 가능한 랜덤 함수(VRF)](https://docs.orakl.network/docs/developers-guide/verifiable-random-function-vrf#what-is-verifiable-random-function)는 스마트 컨트랙트가 VRF를 사용하여 검증 가능한 랜덤 값을 생성할 수 있도록 하며, 이는 무작위성이 필요한 다양한 dApp에서 사용될 수 있습니다. 오라클 네트워크는 개발자에게 두 가지 계정 유형을 통해 VRF 서비스에 대한 액세스를 제공합니다: [영구 계정](https://docs.orakl.network/developers-guide/readme#permanent-account) 또는 [임시 계정](https://docs.orakl.network/developers-guide/readme#temporary-account).

이 튜토리얼에서는 오라클 네트워크의 VRF 기능을 활용하여 스마트 컨트랙트에서 난수를 요청합니다.

## 전제 조건

- [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en)
- [Remix IDE](https://remix.ethereum.org/)
- [Remix 카이아 플러그인](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 테스트 KAIA 얻기

## 시작하기

다음 단계에서는 오라클 네트워크를 사용하여 스마트 컨트랙트에서 난수를 요청합니다. 이제 시작해보겠습니다!

### 1단계: 컨트랙트 상태 변수 초기화

이 단계에서는 컨트랙트 기능에 필요한 상태 변수를 초기화합니다. 우리의 소비자 컨트랙트는 우리가 상속하는 `VRFConsumerBase` 컨트랙트와 `VRFCoordinator` 컨트랙트에 대한 호출에 사용되는 `IVRFCoordinator` 인터페이스에 종속됩니다. 다음으로, 난수 결과를 저장하는 데 사용하는 `sRandomWord` 변수와 `onlyOwner` 수정자 내부에 사용되는 `sOwner` 변수를 정의합니다.

```solidity
pragma solidity ^0.8.16;

import { VRFConsumerBase } from "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import { IVRFCoordinator } from "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";

contract VRFConsumer is VRFConsumerBase {
  uint256 public sRandomWord;
  address private sOwner;

  error OnlyOwner(address notOwner);
  modifier onlyOwner() {
      if (msg.sender != sOwner) {
          revert OnlyOwner(msg.sender);
      }
      _;
  }
```

### 2단계: VRF 코디네이터 초기화하기

스마트 컨트랙트에서 난수 요청을 하려면 [VRFCoordinator](https://github.com/Bisonai-CIC/orakl/blob/master/contracts/src/v0.1/VRFCoordinator.sol) 스마트 컨트랙트를 초기화해야 합니다. 생성자 파라미터를 통해 제공된 VRFCoordinator 주소와 VRFCoordinator 인터페이스를 본딩하여 난수 요청(requestRandomWordsPayment)에 사용하는 것을 권장합니다. VRFCoordinator\` 컨트랙트는 카이아 Kairos [0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499](https://baobab.klaytnfinder.io/account/0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499)와 카이아 메인넷 [0x3F247f70DC083A2907B8E76635986fd09AA80EFb](https://www.klaytnfinder.io/account/0x3F247f70DC083A2907B8E76635986fd09AA80EFb)에 모두 배포되어 있습니다.

```solidity
  IVRFCoordinator COORDINATOR;

  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = IVRFCoordinator(coordinator);
      sOwner = msg.sender;
  }
```

### 3단계: 임시 계정으로 난수 요청하기

직접 메서드를 사용하여 난수를 요청하려면 사용자는 value 속성을 사용하여 호출과 함께 $KAIA를 보내야 합니다.

```solidity
  function requestRandomWordsDirect(
      bytes32 keyHash,
      uint32 callbackGasLimit,
      uint32 numWords,
      address refundRecipient
  )
      public
      payable
      onlyOwner
      returns (uint256 requestId)
  {
    requestId = COORDINATOR.requestRandomWords{value: msg.value}(
      keyHash,
      callbackGasLimit,
      numWords,
      refundRecipient
    );
  }
```

이 함수는 `COORDINATOR` 컨트랙트에 정의된 `requestRandomWords()` 함수를 호출하고 인자로 `keyHash`, `callbackGasLimit`, `numWords` 및 `refundRecipient`를 전달합니다. 서비스 대금은 `msg.value`를 통해 `COORDINATOR` 컨트랙트의 `requestRandomWords()`로 전송됩니다. 결제 금액이 예상 결제 금액보다 큰 경우, 초과 결제 금액은 `refundRecipient` 주소로 반환됩니다. 결과적으로 난수 요청이 생성됩니다. 'requestRandomWords' 함수의 `msg.value`를 정확하게 지정하려면 [서비스 요금 산정 방법](https://docs.orakl.network/developers-guide/vrf#get-estimated-service-fee)의 설명을 참조하세요.

### 4단계: 난수 채우기

`fulfillRandomWords` 함수는 무작위 단어 요청을 이행할 때 `VRFCoordinator` 컨트랙트에 의해 호출됩니다.

```solidity
function fulfillRandomWords(
    uint256 /* requestId */,
    uint256[] memory randomWords
)
    internal
    override
{
    // requestId should be checked if it matches the expected request
    // Generate random value between 1 and 50.
    sRandomWord = (randomWords[0] % 50) + 1;
}
```

이제 오라클 VRF 솔루션 코드가 생겼으니 실제로 작동하는 모습을 확인해 보겠습니다.

## 실제 구현

아래 예시에서는 컨트랙트에 따라 임의의 단어를 요청하고 그 구현결과를 받을 수 있습니다.

### 샘플 코드 생성 및 배포

**Remix IDE**

- [Remix IDE](https://remix.ethereum.org/)로 이동합니다.
- **파일 탐색기** 탭을 클릭하고 계약 폴더에 'consumer-vrf.sol'이라는 새 파일을 만듭니다.
- 새로 생성한 파일에 아래 코드를 붙여넣습니다.
- Remix에서 **Compile contract**을 클릭합니다.
- 플러그인을 설치한 후 왼쪽의 Kaia 탭을 클릭합니다.
- **Environment** > **Injected Caver** - **Kaikas**를 선택합니다.
- **Contract**에서 컨트랙트를 선택합니다. (예: `VRFConsumer`)
- 코디네이터 컨트랙트 주소 `0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499`(Kairos), `0x3F247f70DC083A2907B8E76635986fd09AA80EFb`(메인넷)를 전달합니다.
- **Deploy**를 클릭합니다..

**샘플 코드**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {VRFConsumerBase} from "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import {IVRFCoordinator} from "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";

contract VRFConsumer is VRFConsumerBase {
    uint256 public sRandomWord;
    address private sOwner;

    IVRFCoordinator COORDINATOR;

    error OnlyOwner(address notOwner);

    modifier onlyOwner() {
        if (msg.sender != sOwner) {
            revert OnlyOwner(msg.sender);
        }
        _;
    }

    constructor(address coordinator) VRFConsumerBase(coordinator) {
        sOwner = msg.sender;
        COORDINATOR = IVRFCoordinator(coordinator);
    }

    function requestRandomWordsDirect(
        bytes32 keyHash,
        uint32 callbackGasLimit,
        uint32 numWords,
        address refundRecipient
    ) public payable onlyOwner returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords{value: msg.value}(
            keyHash,
            callbackGasLimit,
            numWords,
            refundRecipient
        );
    }

    function fulfillRandomWords(
        uint256 /* requestId */,
        uint256[] memory randomWords
    ) internal override {
        // requestId should be checked if it matches the expected request
        // Generate random value between 1 and 50.
        sRandomWord = (randomWords[0] % 50) + 1;
    }
}
```

![](/img/build/tools/orakl-vrf-deploy.png)

### 스마트 컨트랙트와의 상호작용

스마트 컨트랙트에서 난수를 요청하려면 먼저 `requestRandomWordsDirect()` 함수를 실행해야 합니다. 이 함수가 성공적으로 실행되려면 앞서 설명한 대로 KAIA(최소 1개)를 전송하고 `keyHash`, `callbackGasLimit`, `numWords`, `refundRecipient` 파라미터를 제공해야 합니다. `keyHash` 매개변수는 요청을 이행할 수 있는 사용자를 고유하게 정의합니다. 오라클 네트워크 VRF는 각 카이아 체인에 하나의 키 해시를 제공합니다.

- Kairos: `0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c`
- Mainnet: `0x6cff5233743b3c0321a19ae11ab38ae0ddc7ddfe1e91b162fa8bb657488fb157`

나머지 매개변수의 경우 다음과 같이 설정할 수 있습니다:

- `callbackGasLimit`을 `500000`으로,
- `numWords`를 `1`로 설정한 다음,
- `refundRecipient`를 본인의 EOA 주소에 설정하세요.

이후 요청이 완료되면 `sRandomWord()` 함수를 실행할 수 있습니다. 이 s_randomResult() 함수는 난수를 반환합니다.

- **requestRandomWordsDirect()**: 이 함수를 실행하기 위해 1 KAIA를 전송합니다. 아래 이미지가 이를 설명합니다:

![](/img/build/tools/orakl-vrf-request.png)

- **sRandomWord()**: VRFCoordinator`가 난수 요청을 수행한 후, 응답은 `sRandomWord`변수에 저장됩니다. 응답을 얻으려면`s_response()\` 함수를 호출합니다.

![](/img/build/tools/orakl-vrf-response.png)

축하합니다! 방금 난수를 요청하고 스마트 컨트랙트에서 하나를 받았습니다.

## 결론

이 튜토리얼에서는 오라클 네트워크 VRF 솔루션을 사용하여 스마트 콘트랙트에서 난수를 생성하는 방법을 배웠습니다. 오라클 네트워크는 가격 피드, 데이터 요청-응답, 준비금 증명과 같은 많은 오라클 서비스를 제공합니다. 오라클 네트워크와 작동 방식에 대한 자세한 안내는 [오라클 네트워크 문서](https://docs.orakl.network)를 참조하세요.
