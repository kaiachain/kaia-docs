---
sidebar_label: 블록 탐색기 사용하기
---

# 블록 탐색기로 스마트 컨트랙트 검증하기

## 소개

일반적으로 스마트 컨트랙트 배포자는 실제로 배포된 코드에 접근할 수 있는 유일한 당사자이며, 일반인은 배포자가 검증하기 전까지는 컨트랙트의 소스 코드를 읽을 수 없습니다. 그러나 스마트 컨트랙트 개발 주기에서 중요한 단계인 컨트랙트 검증은 배포된 컨트랙트의 투명성(사용자), 편의성(개발자), 보안을 개선하는 데 도움이 되기 때문에 중요한 역할을 합니다.

Having said that, once a smart contract is validated, block explorers like Kaiascope and Kaiascan also make it possible for the public to interact with the contract's public methods using the block explorer's user interface. 이는 대중이 검증된 컨트랙트 소스 코드에 직접 접근할 수 있는 것 외에도 추가적인 기능입니다.

이 가이드에서는 블록 탐색기를 사용하여 Klaytn 네트워크에 배포된 스마트 컨트랙트를 검증하는 방법을 살펴보겠습니다.

## 전제조건

- [Remix IDE](https://ide.klaytn.foundation/) 및 [Kaikas Wallet](https://kaikas.zendesk.com/hc/en-us/articles/6657796272793-How-do-I-install-PC-Kaikas-)
- Enough test KAIA from [faucet](https://faucet.kaia.io)

## 시작하기

이 가이드에서는 카이아 생태계에 존재하는 블록 탐색기, 즉 다음과 같은 블록에서 단일 컨트랙트와 다중 컨트랙트를 모두 검증하는 방법을 살펴볼 것입니다:

- [Kaiascope](http://scope.klaytn.com)
- [Kaiascan](https://www.kaiascan.io/)

더 이상 고민할 필요 없이 시작해 봅시다!

## 단일 컨트랙트 배포하기

스마트 컨트랙트를 검증하려면 먼저 컨트랙트를 대상 네트워크에 배포해야 합니다. 따라서 이 가이드에서는 카이아 Kairos 테스트넷에 컨트랙트를 배포하겠습니다. 또한, 이 튜토리얼에서는 'Counter.sol'이라는 간단한 카운터 컨트랙트를 Remix IDE에 배포할 것입니다. 코드는 아래와 같습니다:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Counter {
    uint256 public count;
    constructor(uint256 _initialCount) {
        count = _initialCount;
    }
    function incrementCounter() public {
        count++;
    }
    function decrementCounter() public {
        count--;
    }
    function resetCounter() public {
        count = 0;
    }
}
```

:::note

이 페이지에서 카이아 Kairos 테스트넷에서 [라이브러리](../../references/sdk/sdk.md)를 사용하여 스마트 컨트랙트를 배포하는 튜토리얼을 확인할 수 있습니다. 또한, [하드햇](../get-started/hardhat.md), [Foundry](../smart-contracts/deploy/foundry.md), [Remix](../smart-contracts/deploy/deploy.md#remix-ide) 또는 다른 개발자 도구를 사용하여 카이아 Kairos 테스트넷에 스마트 컨트랙트를 배포할 수 있습니다.

:::

## 단일 컨트랙트 검증을 위한 파라미터

블록 탐색기에서 컨트랙트를 검증하려면 몇 가지 매개변수가 필요하며, 스마트 컨트랙트를 배포할 때 이를 고려해야 합니다. 다음은 컨트랙트를 성공적으로 검증하기 위해 컨트랙트의 컴파일러 및 배포와 관련된 몇 가지 세부 사항입니다:

Remix IDE :

- Remix IDE에서 **Solidity compiler 탭**으로 이동합니다.

  - 컨트랙트를 컴파일하고 배포하는 데 사용된 **compiler version**을 확인합니다.
  - 컨트랙트에 사용된 **Open Source License Type**을 확인합니다. 이는 Solidity 소스 파일의 시작 부분에 사용된 SPDX 라이선스 식별자를 의미합니다. Counter.sol`파일에서는`// SPDX-License-Identifier: MIT\\`를 사용했습니다.
  - 컨트랙트 배포에 사용된 **EVM version**을 확인합니다.
  - (선택 사항) 컴파일 중에 **optimization**이 활성화된 경우, 최적화 실행 파라미터의 값을 기록해 두세요.

  ![](/img/build/tutorials/counter-veri-parameters.png)

- Remix IDE에서 **Kaia 탭**으로 이동합니다.

  - (선택 사항) 컨트랙트 생성자 메서드가 인수를 허용하는 경우, 생성자 인수의 [ABI 인코딩된 형식](https://docs.soliditylang.org/en/develop/abi-spec.html)을 기록해둡니다.
  - 배포에 성공한 후 **Deployed Contracts** 탭에서 스마트 컨트랙트의 컨트랙트 주소를 기록해 두세요.

  ![](/img/build/tutorials/counter-veri-parametersII.png)

## 여러 부분으로 구성된 컨트랙트 배포하기

여러 부분으로 구성된 컨트랙트를 배포하는 것은 단일 컨트랙트를 배포하는 것과 동일한 단계를 포함한다는 점에 유의해야 합니다. 이 가이드에서는 'airdropToken.sol'이라는 간단한 KIP7 에어드랍 컨트랙트를 배포하겠습니다. 코드는 아래와 같습니다:

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
import "@klaytn/contracts/access/Ownable.sol";
// the creator of the project mints certian amount of fungible tokens directly to a certain selection of wallets.
contract TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("Token Aidrop Demo", "TAD") {
    }
    // Airdrop Token
    function airdropTokens(address[] calldata wAddresses, uint[] calldata tAmount) public onlyOwner {
        require(wAddresses.length == tAmount.length, "Must be same lenght");
        for (uint256 i = 0; i < wAddresses.length; i++) {
            _mintSingleTokens(wAddresses[i], tAmount[i]);
        }
    }
    function _mintSingleTokens(address wAddress, uint amount) private {
        _mint(wAddress, amount);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
}
```

## 멀티 파트 컨트랙트 검증을 위한 파라미터

다중 컨트랙트 검증을 위한 파라미터는 단일 컨트랙트 검증을 위한 파라미터와 동일합니다. 그러나 다중 컨트랙트는 여러 개의 종속 컨트랙트로 구성되어 있기 때문에 컨트랙트의 모든 종속성을 하나의 Solidity 파일로 사전 처리해야 합니다. 이러한 전처리를 보통 스마트 컨트랙트 평탄화라고 합니다.

따라서 블록 탐색기에서 새로 평탄화된 Solidity 파일을 사용하여 컨트랙트를 검증할 수 있도록 컨트랙트를 평탄화해야 합니다.

Remix IDE:

- Remix IDE에서 **File explorer 탭**으로 이동합니다.

  - **contracts** 폴더에서 새로 생성한 컨트랙트를 선택합니다.
  - 두 손가락으로 클릭하거나 탭하여 컨트랙트에서 사용 가능한 모든 명령을 확인합니다.
  - **flatten**을 선택합니다.

  ![](/img/build/tutorials/airdropToken-flattened.png)

  - 코드가 평탄화되면 `airdropTokens_flattened.sol`이라는 이름의 새 컨트랙트가 표시됩니다.

  ![](/img/build/tutorials/airdropToken-flattened-file.png)

:::note

[Hardhat Flattener](https://hardhat.org/hardhat-runner/docs/advanced/flattening)와 같이 여러 부분으로 구성된 스마트 컨트랙트를 단일 Solidity 파일로 평탄화하는 다양한 도구가 있습니다. 자세한 사용법은 각 스마트 컨트랙트 평탄화 도구의 설명서를 참조하시기 바랍니다.

:::

## 컨트랙트 검증

모든 검증 매개변수를 얻었으면, 이 섹션에서는 블록 탐색기에서 단일 스마트 컨트랙트(Counter.sol)와 여러 부분으로 구성된 스마트 컨트랙트(airdropTokens.sol)를 검증하는 단계를 살펴보겠습니다.

### 1. Kaiascope

Kaiascope에서 단일 컨트랙트와 다중 파트 컨트랙트를 확인하려면 아래 단계를 따르세요:

#### 1.1 단일 컨트랙트 검증하기

1. [Kaiascope](https://baobab.klaytnscope.com)의 검색창으로 이동하여 배포된 컨트랙트 주소를 붙여넣습니다.
2. 해당 페이지의 **contract 탭**으로 이동합니다.
3. **Match Contract Source Code** 링크를 클릭하여 확인을 위해 컨트랙트 코드를 제출합니다.

![](/img/build/tutorials/counter-contract-tab.png)

4. 컨트랙트 확인 페이지에서 계정이 Kaikas 또는 Metamask 중 하나에 연결되어 있는지 확인합니다. 이 가이드에서는 Kaikas를 사용하겠습니다.
5. **contract address 필드**에 컨트랙트 주소를 입력합니다. 참고: 이 필드는 일반적으로 계약 주소로 자동으로 채워집니다.
6. `Counter.sol` 예제에 사용된 **compiler version**을 선택합니다.
7. `Counter.sol` 예제에 사용된 **Open Source License Type**을 선택합니다. Counter.sol\\` 예제의 경우, **MIT License (MIT)** 옵션을 선택합니다. 사용된 라이선스가 없는 경우 \*\*No License (None)\*\*을 선택합니다.
8. **Source Code 필드**에서 **Source Text**를 선택하고 텍스트 필드에 `Counter.sol`의 소스 코드를 붙여넣습니다.
9. 컴파일 시 **Optimization**가 활성화된 경우 **True**를 선택하고, **Optimization Runs**의 실행 횟수를 **200**으로 입력합니다.
10. 컨트랙트의 **EVM version**을 선택합니다. `Counter.sol` 예제의 경우, **Istanbul** 옵션을 선택합니다.
11. 하단의 보안 문자를 클릭하고 **Sign and Submit** 버튼을 클릭하여 확인하고 확인을 시작합니다.

![](/img/build/tutorials/counter-verification-page.png)

12. 인증 요청에 서명하면 인증 상태 알림을 받게 됩니다.

![](/img/build/tutorials/counter-success-popup.png)

13. 인증이 완료되면 브라우저에 인증 결과가 표시되고 계약 주소가 포함된 성공 결과 페이지가 표시됩니다. 컨트랙트 주소를 클릭하면 **Contract Source Code**, **Contract ABI**, **Bytecode**를 볼 수 있습니다.

![](/img/build/tutorials/counter-success-popup-I.png)

![](/img/build/tutorials/counter-full-verification.png)

#### 1.2 멀티파티 컨트랙트 검증하기

Kaiascope에서 다중 컨트랙트를 검증하는 것은 몇 가지 추가 단계가 필요하다는 점을 제외하면 단일 컨트랙트를 검증하는 것만큼 간단합니다. 이 섹션에서는 다음과 같은 추가 단계를 통해 `airdropToken.sol` 컨트랙트를 검증하겠습니다:

- **Source Code**에서 **Source Text**를 선택하거나(Counter.sol 예시의 3단계) **Source Code** 필드에서 \*\*Solidity 파일(들)\*\*을 선택할 수 있습니다.  **Source Text**의 경우, `airdropToken_flattened.sol`에 있는 코드를 복사하여 텍스트 필드에 붙여넣습니다. \*\*Solidity 파일(들)\*\*의 경우, Remix IDE에서 `airdropToken_flattened.sol` 파일을 다운로드하여 해당 필드에 업로드할 수 있습니다.

a. 소스 텍스트

![](/img/build/tutorials/airdrop-veri-field-I.png)

b. Solidity 파일

![](/img/build/tutorials/airdrop-veri-field-II.png)

그 이후에는 다른 모든 단계는 단일 컨트랙트를 검증하는 것과 동일하게 유지됩니다. 인증 파라미터를 입력한 후 **Sign and Submit** 버튼을 클릭하여 확인하고 인증을 시작합니다.

인증이 완료되면 브라우저에 인증 결과가 표시되고 계약 주소가 포함된 성공 결과 페이지가 표시됩니다. 컨트랙트 주소를 클릭하면 **Contract Source Code**, **Contract ABI**, **Bytecode**를 볼 수 있습니다.

![](/img/build/tutorials/airdrop-success-popup.png)

![](/img/build/tutorials/airdrop-success-popup-I.png)

![](/img/build/tutorials/airdrop-full-verification.png)

### 2. Kaiascan

To verify a single contract and multi-part contracts on Kaiascan, navigate to the [contract submission request page](https://kairos.kaiascan.io/contracts). 단, 계정이 Kaikas 또는 Metamask에 연결되어 있는지 확인하고 아래 단계를 따르세요:

![](/img/build/tutorials/klaytnfinder-con-sub-page.png)

#### 2.1 단일 컨트랙트 확인

1. **Is this contract for a token** 필드를 확인합니다. 이 필드는 공식 웹사이트 URL, 공식 이메일 주소, 토큰 로고 이미지가 있는 토큰 컨트랙트를 확인하려고 할 때 필요합니다. 이 가이드에서는 상업용 토큰 계약을 확인하지 않으므로 **No**를 선택하세요.
2. 배포된 컨트랙트(Counter.sol)의 **contract address**를 입력합니다.
3. Remix IDE에서 'Counter.sol'을 다운로드하여 **Source Code (Solidity File)** 필드에 업로드합니다.
4. `Counter.sol` 예제에 사용된 **compiler version**을 선택합니다.
5. `Counter.sol` 예제에 사용된 **Open Source License Type**을 선택합니다. Counter.sol\\` 예제의 경우, **MIT License (MIT)** 옵션을 선택합니다. 사용된 라이선스가 없는 경우 \*\*No License (None)\*\*을 선택합니다.
6. 컨트랙트의 **EVM version**을 선택합니다. `Counter.sol` 예제의 경우, **Istanbul** 옵션을 선택합니다.
7. 컴파일 시 **Optimization**가 활성화된 경우 **True**를 선택하고, **Optimization Runs**의 실행 횟수를 **200**으로 입력합니다.
8. (선택 사항) 이 필드에 대한 ABI 인코딩된 생성자 인수를 가져오려면 [abi.hashex.org](http://abi.hashex.org)로 이동하여 아래 이미지에 따라 인코딩된 데이터를 가져옵니다:

![](/img/build/tutorials/abi-hashex.png)

9. **Sign and Submit** 버튼을 클릭하여 확인하고 확인을 시작합니다.

![](/img/build/tutorials/counter-k-verification-page.png)

10. 인증이 완료되면 **Submission Successful** 메시지가 표시됩니다. 이제 탐색기 검색창에 컨트랙트 주소를 붙여넣어 **Contract Source Code**, **Contract ABI**, **Creation Code** 및 **ABI-encoded Value**을 볼 수 있습니다.

> ![](/img/build/tutorials/counter-k-full-verification.png)

### 2.2 다중 컨트랙트 검증하기

Verifying a multi-part contract on Kaiascan follows the same step as verifying a single contract. 다만, **Source Code(Solidity File)** 필드에 `airdropToken_flattened.sol` 파일을 업로드할 것이라는 점에 유의해야 합니다.

![](/img/build/tutorials/airdrop-k-verification-page.png)

확인 매개변수를 입력한 후 **Sign and Submit** 버튼을 클릭하여 확인하고 확인을 시작합니다. 인증이 완료되면 **Submission Successful** 메시지가 표시됩니다. 이제 탐색기 검색창에 컨트랙트 주소를 붙여넣어 **Contract Source Code**, **Contract ABI**, **Creation Code**를 볼 수 있습니다.

![](/img/build/tutorials/airdrop-k-full-verification.png)

## 결론

이 가이드를 따라해 주셔서 감사합니다! In this tutorial, you learnt how to verify contracts (both single and multi-part) using Kaiascope and Kaiascan solely to enhance the transparency (for users), convenience (for developers), and security of deployed contracts. 자세한 내용은 [Kaia Docs](https://docs.klaytn.foundation/)를, 궁금한 점이 있으면 [Kaia Forum](https://forum.klaytn.foundation/)을 참조하세요.
