---
sidebar_label: 블록 탐색기 사용하기
---

# 블록 탐색기로 스마트 컨트랙트 검증하기

## 소개

일반적으로 스마트 컨트랙트 배포자는 실제로 배포된 코드에 접근할 수 있는 유일한 당사자이며, 일반인은 배포자가 검증하기 전까지는 컨트랙트의 소스 코드를 읽을 수 없습니다. 그러나 스마트 컨트랙트 개발 주기에서 중요한 단계인 컨트랙트 검증은 배포된 컨트랙트의 투명성(사용자), 편의성(개발자), 보안을 개선하는 데 도움이 되기 때문에 중요한 역할을 합니다.

하지만 스마트 콘트랙트가 검증되면 KaiaScan과 OKX Kaia 익스플로러와 같은 블록 탐색기를 통해 대중이 블록 탐색기의 사용자 인터페이스를 사용해 콘트랙트의 공개 메소드와 상호작용할 수 있습니다. 이는 대중이 검증된 컨트랙트 소스 코드에 직접 접근할 수 있는 것 외에도 추가적인 기능입니다.

이 가이드에서는 블록 탐색기를 사용하여 Klaytn 네트워크에 배포된 스마트 컨트랙트를 검증하는 방법을 살펴보겠습니다.

## 전제조건

- [Remix IDE](https://ide.kaia.io/) and [Kaia Wallet](https://docs.kaiawallet.io/getting_started/quick_start#install-kaia-wallet)
- Enough test KAIA from [faucet](https://faucet.kaia.io)

## 시작하기

이 가이드에서는 Kaia 생태계에 존재하는 블록 탐색기에서 단일 컨트랙트와 다중 파트 컨트랙트를 모두 검증하는 방법을 살펴보겠습니다:

- [Kaiascan](https://www.kaiascan.io/)
- [OKLink](https://www.oklink.com/kaia)

더 이상 고민할 필요 없이 시작해 봅시다!

## 단일 컨트랙트 배포하기

스마트 컨트랙트를 검증하려면 먼저 컨트랙트를 대상 네트워크에 배포해야 합니다. 따라서 이 가이드에서는 Kaia Kairos 테스트넷에 컨트랙트를 배포하겠습니다. 또한, 이 튜토리얼에서는 'Counter.sol'이라는 간단한 카운터 컨트랙트를 Remix IDE에 배포할 것입니다. 코드는 아래와 같습니다:

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

이 페이지에서 Kaia Kairos 테스트넷에서 [라이브러리](../../references/sdk/sdk.md)를 사용하여 스마트 컨트랙트를 배포하는 튜토리얼을 확인할 수 있습니다. 또한, [하드햇](../get-started/hardhat.md), [Foundry](../smart-contracts/deploy/foundry.md), [Remix](../smart-contracts/deploy/deploy.md#remix-ide) 또는 다른 개발자 도구를 사용하여 Kaia Kairos 테스트넷에 스마트 컨트랙트를 배포할 수 있습니다.

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
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
import "@kaiachain/contracts/access/Ownable.sol";
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

  - Once the code is flattened, you will see a new contract named `airdropTokens_flattened.sol`.

  ![](/img/build/tutorials/airdropToken-flattened-file.png)

:::note

[Hardhat Flattener](https://hardhat.org/hardhat-runner/docs/advanced/flattening)와 같이 여러 부분으로 구성된 스마트 컨트랙트를 단일 Solidity 파일로 평탄화하는 다양한 도구가 있습니다. 자세한 사용법은 각 스마트 컨트랙트 평탄화 도구의 설명서를 참조하시기 바랍니다.

:::

## 컨트랙트 검증

모든 검증 매개변수를 얻었으면, 이 섹션에서는 블록 탐색기에서 단일 스마트 컨트랙트(Counter.sol)와 여러 부분으로 구성된 스마트 컨트랙트(airdropTokens.sol)를 검증하는 단계를 살펴보겠습니다.

### Kaiascan

To verify a single contract and multi-part contracts on Kaiascan, navigate to the [contract submission request page](https://kairos.kaiascan.io/contract).

:::note

Verification of contracts on Kaiascan is currently in beta.

:::

![](/img/build/tutorials/kaiascan-con-sub-page.png)

#### 단일 계약 확인

1. 배포된 컨트랙트(Counter.sol)의 **contract address**를 입력합니다.
2. `Counter.sol` 예제에 사용된 **compiler version**을 선택합니다.
3. `Counter.sol` 예제에 사용된 **Open Source License Type**을 선택합니다. Counter.sol\\` 예제의 경우, **MIT License (MIT)** 옵션을 선택합니다. 사용된 라이선스가 없는 경우 \*\*No License (None)\*\*을 선택합니다.
4. Make sure to download `Counter.sol` from Remix IDE and upload it in the **Source Code (Solidity File)** field
5. 컨트랙트의 **EVM version**을 선택합니다. `Counter.sol` 예제의 경우, **Istanbul** 옵션을 선택합니다.
6. 컴파일 시 **Optimization**가 활성화된 경우 **True**를 선택하고, **Optimization Runs**의 실행 횟수를 **200**으로 입력합니다.
7. (선택 사항) 이 필드에 대한 ABI 인코딩된 생성자 인수를 가져오려면 [abi.hashex.org](http://abi.hashex.org)로 이동하여 아래 이미지에 따라 인코딩된 데이터를 가져옵니다:

![](/img/build/tutorials/abi-hashex.png)

8. Click on the **Verify and Publish** button to begin verification.

![](/img/build/tutorials/counter-k-verification-page.png)

9. 인증이 완료되면 **Submission Successful** 메시지가 표시됩니다. 이제 탐색기 검색창에 컨트랙트 주소를 붙여넣어 **Contract Source Code**, **Contract ABI**, **Creation Code** 및 **ABI-encoded Value**을 볼 수 있습니다.

> ![](/img/build/tutorials/counter-k-full-verification.png)

#### 여러 부분으로 구성된 계약 확인

Verifying a multi-part contract on Kaiascan follows the same step as verifying a single contract. 단, KaiaScan은 현재 검증을 위한 파일 업로드를 지원하지 않으므로 **아래 솔리디티 컨트랙트 코드 입력** 필드에 `airdropToken_flattened.sol` 파일을 복사하여 붙여넣어야 합니다.

![](/img/build/tutorials/airdrop-k-verification-page.png)

After filling in the verification parameters, click on the **Verify and Publish** button to begin verification. Once verification is done, the verification page will refresh. 이제 탐색기 검색창에 컨트랙트 주소를 붙여넣어 **Contract Source Code**, **Contract ABI**, **Creation Code**를 볼 수 있습니다.

![](/img/build/tutorials/airdrop-k-full-verification.png)

### OKLink

OKLink에서 단일 계약 및 여러 부분으로 구성된 계약을 확인하려면 [계약 예비 확인 페이지](https://web3.okx.com/explorer/kaia/verify-contract-preliminary)로 이동하세요.

:::note
OK링크 지원은 현재 Kaia 메인넷으로 제한되어 있으므로, 계약 확인은 메인넷 배포에 대해서만 가능합니다.
:::

#### 단일 계약 확인

1. 배포된 컨트랙트(Counter.sol)의 **컨트랙트 주소**를 입력합니다.
2. 컴파일러 유형\*\*을 선택합니다. 이 가이드에서는 \*\*솔리디티(단일 파일)\*\*를 선택합니다.
3. Counter.sol 예제에 사용된 **컴파일러 버전**을 선택합니다: **v0.8.30+commit.73712a01**을 선택한 후 **다음**을 클릭합니다.
4. 계약 소스 코드\*\* 필드에 Remix IDE에서 Counter.sol을 업로드해야 합니다.
5. 컴파일 중에 **최적화**가 활성화된 경우 True를 선택하고 최적화 실행 횟수 아래에 실행 횟수를 200으로 입력합니다.
6. Counter.sol 예제에 사용된 **오픈 소스 라이선스 유형**을 선택합니다. Counter.sol 예제의 경우 **MIT 라이선스(MIT)** 옵션을 선택합니다. 사용한 라이선스가 없는 경우 \*\*라이선스 없음(없음)\*\*을 선택합니다.
7. 계약의 **EVM 버전**을 선택합니다. Counter.sol 예제의 경우 **기본값** 옵션을 선택합니다.
8. 제출\*\* 버튼을 클릭하여 인증을 시작합니다.

![](/img/build/smart-contracts/verify/oklink-sp-verification-params.png)

9. 인증이 완료되면 인증 성공 메시지가 표시됩니다.

![](/img/build/smart-contracts/verify/oklink-sp-contract-verification-success.png)

이제 탐색기 검색창에 계약 주소를 붙여넣어 계약 소스 코드, 계약 ABI 및 계약 배포 바이트코드를 볼 수 있습니다.

![](/img/build/smart-contracts/verify/oklink-sp-contract-badge.png)

#### 여러 부분으로 구성된 계약 확인

OK링크에서 여러 부분으로 구성된 계약을 확인하는 것은 단일 계약을 확인하는 것과 동일한 단계를 따릅니다. 단, 현재 오케이링크는 검증을 위한 파일 업로드를 지원하지 않으므로 **계약 소스 코드** 필드에 `airdropToken_flattened.sol` 파일을 복사하여 붙여넣어야 합니다.

![](/img/build/smart-contracts/verify/oklink-mp-verification-params.png)

인증 매개변수를 입력한 후 제출 버튼을 클릭하여 인증을 시작합니다. 인증이 완료되면 인증 성공 메시지가 표시됩니다.

![](/img/build/smart-contracts/verify/oklink-mp-contract-verification-success.png)

이제 탐색기 검색창에 컨트랙트 주소를 붙여넣어 컨트랙트 소스 코드, 컨트랙트 ABI 및 컨트랙트 배포 바이트코드를 볼 수 있습니다.

![](/img/build/smart-contracts/verify/oklink-mp-contract-badge.png)

## 결론

이 가이드를 따라해 주셔서 감사합니다! 이 튜토리얼에서는 배포된 계약의 투명성(사용자를 위한), 편의성(개발자를 위한), 보안을 강화하기 위해 KaiaScan과 OKLink를 사용하여 계약(단일 및 다중 부분 모두)을 확인하는 방법을 배웠습니다. Visit [Kaia Docs](https://docs.kaia.io/) for more information and [Kaia Forum](https://devforum.kaia.io/) if you have any questions.