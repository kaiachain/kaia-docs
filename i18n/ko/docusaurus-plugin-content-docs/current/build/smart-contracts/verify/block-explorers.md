---
sidebar_label: Using Block Explorers
---

# 블록 탐색기로 스마트 컨트랙트 검증하기

## 소개

일반적으로 스마트 컨트랙트 배포자는 실제로 배포된 코드에 접근할 수 있는 유일한 당사자이며, 일반인은 배포자가 검증하기 전까지는 컨트랙트의 소스 코드를 읽을 수 없습니다. 그러나 스마트 컨트랙트 개발 주기에서 중요한 단계인 컨트랙트 검증은 배포된 컨트랙트의 투명성(사용자), 편의성(개발자), 보안을 개선하는 데 도움이 되기 때문에 중요한 역할을 합니다.

스마트 컨트랙트의 유효성이 확인되면 Kaiascope와 Kaiafinder와 같은 블록 탐색기를 통해 대중이 블록 탐색기의 사용자 인터페이스를 사용하여 컨트랙트의 공개 메서드와 상호작용할 수 있습니다. 이는 대중이 검증된 컨트랙트 소스 코드에 직접 접근할 수 있는 것 외에도 추가적인 기능입니다.

이 가이드에서는 블록 탐색기를 사용하여 Klaytn 네트워크에 배포된 스마트 컨트랙트를 검증하는 방법을 살펴보겠습니다.

## 전제조건

- [Remix IDE](https://ide.klaytn.foundation/) 및 [Kaikas Wallet](https://kaikas.zendesk.com/hc/en-us/articles/6657796272793-How-do-I-install-PC-Kaikas-)
- [faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 충분한 테스트 KAIA 준비

## 시작하기

이 가이드에서는 카이아 생태계에 존재하는 블록 탐색기, 즉 다음과 같은 블록에서 단일 컨트랙트와 다중 컨트랙트를 모두 검증하는 방법을 살펴볼 것입니다:

- [Kaiascope](http://scope.klaytn.com)
- [Kaiafinder](https://www.klaytnfinder.io/)

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
5. **contract address 필드**에 계약 주소를 입력합니다. Note: This field is usually filled with the contract address automatically.
6. Select the **compiler version** used for the `Counter.sol` example.
7. Select the **Open Source License Type** used for the `Counter.sol` example. For `Counter.sol` example, select the option, **MIT License (MIT)**. If there was none used, select **No License (None)**.
8. In the **Source Code field**, select **Source Text** and paste the source code for `Counter.sol` in the text-field.
9. Select **True** for **Optimization** if it was enabled during compilation, and fill in the number of runs under **Optimization Runs** to be **200**.
10. Select the **EVM version** for the contract. For `Counter.sol` example, select the option **Istanbul**.
11. Click on the CAPTCHA at the bottom and the **Sign and Submit** button to confirm and begin verification.

![](/img/build/tutorials/counter-verification-page.png)

12. After signing the verification request, you will get a verification status notification

![](/img/build/tutorials/counter-success-popup.png)

13. Once verification is done, the result of the verification will be displayed in the browser, and a success result page with the contract address. Click on the contract address to view the **Contract Source Code**, **Contract ABI**, and **Bytecode**.

![](/img/build/tutorials/counter-success-popup-I.png)

![](/img/build/tutorials/counter-full-verification.png)

#### 1.2 Verifying multi-part contract

Verifying a multi-part contract on Klaytnscope is as straightforward as verifying a single contract, except that it requires some additional steps. In this section, we will be verifying the `airdropToken.sol` contract with the following additional steps:

- You can either Select **Source Text** under **Source Code** (step 3 of the Counter.sol example) or **Solidity File(s)** under the **Source Code** field.  In the case of **Source Text**, copy the code in the `airdropToken_flattened.sol` and paste in the text field. If **Solidity File(s)**, you can download the `airdropToken_flattened.sol` file on Remix IDE and upload to the field.

a. Source Text

![](/img/build/tutorials/airdrop-veri-field-I.png)

b. Solidity File(s)

![](/img/build/tutorials/airdrop-veri-field-II.png)

After this, every other step remains the same as verifying a single contract. Having filled the verification parameter, click on the **Sign and Submit** button to confirm and begin verification.

Once verification is done, the result of the verification will be displayed in the browser, and a success result page with the contract address. Click on the contract address to view the **Contract Source Code**, **Contract ABI**, and **Bytecode**.

![](/img/build/tutorials/airdrop-success-popup.png)

![](/img/build/tutorials/airdrop-success-popup-I.png)

![](/img/build/tutorials/airdrop-full-verification.png)

### 2. Kaiafinder

To verify a single contract and multi-part contracts on Klaytnfinder, navigate to the [contract submission request page](https://baobab.klaytnfinder.io/contracts). However, make sure your account is connected to either Kaikas or MetaMask and follow the steps below:

![](/img/build/tutorials/klaytnfinder-con-sub-page.png)

#### 2.1 Verifying single contract

1. Observe the **Is this contract for a token** field? This field is needed when trying to verify a token contract with its official website URL, official email address, and token logo image. For the sake of this guide, select **No** as we are not verifying a commercial token contract.
2. Fill in the **contract address** for the deployed contract (Counter.sol)
3. Make sure to download `Counter.sol` from Remix IDE and upload in the **Source Code (Solidity File)** field
4. Select the **compiler version** used for the `Counter.sol` example
5. Select the **Open Source License Type** used for the `Counter.sol` example. For `Counter.sol` example, select the option, **MIT License (MIT)**. If there was none used, select **No License (None)**
6. Select the **EVM version** for the contract. For `Counter.sol` example, select the option **Istanbul**.
7. Select **True** for **Optimization** if it was enabled during compilation, and fill in the number of runs under **Optimization Runs** to be **200**.
8. (optional) To get the ABI-encoded constructor arguments for this field, navigate to [abi.hashex.org](http://abi.hashex.org) to get the encoded data following the image below:

![](/img/build/tutorials/abi-hashex.png)

9. Click on the **Sign and Submit** button to confirm and begin verification.

![](/img/build/tutorials/counter-k-verification-page.png)

10. Once verification is done, you will get a **Submission Successful** message. Now you can paste the contract address in the explorer search bar  to view the **Contract Source Code**, **Contract ABI**, **Creation Code** and **ABI-encoded Value**.

> ![](/img/build/tutorials/counter-k-full-verification.png)

### 2.2 Verifying multiple-part contract

Verifying a multi-part contract on Klaytnfinder follows the same step as verifying a single contract. However, it is important to note we will be uploading the `airdropToken_flattened.sol` file in the **Source Code(Solidity File)** field.

![](/img/build/tutorials/airdrop-k-verification-page.png)

After filling the verification parameters, click on the **Sign and Submit** button to confirm and begin verification. Once verification is done, you will get a **Submission Successful** message. Now you can paste the contract address in the explorer search bar to view the **Contract Source Code**, **Contract ABI**, and **Creation Code**.

![](/img/build/tutorials/airdrop-k-full-verification.png)

## Conclusion

Congratulations on following this guide! In this tutorial, you learnt how to verify contracts (both single and multi-part) using Klaytnscope and Klaytnfinder solely to enhance the transparency (for users), convenience (for developers), and security of deployed contracts. Visit [Klaytn Docs](https://docs.klaytn.foundation/) for more information and [Klaytn Forum](https://forum.klaytn.foundation/) if you have any questions.
