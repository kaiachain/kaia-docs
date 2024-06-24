# Thirdweb으로 스마트 컨트랙트 배포하기

![](/img/build/get-started/klaytnXthirdweb.png)

## 소개 <a id="introduction"></a>

이 장에서는 [Thirdweb](https://portal.thirdweb.com/)을 사용하여 마켓플레이스 컨트랙트와 그에 해당하는 NFT 수집 컨트랙트를 Kaia 네트워크에 배포하는 방법을 안내합니다. Thirdweb은 앱과 게임을 탈중앙화 네트워크에 연결하는 데 필요한 모든 것을 제공하는 완전한 웹 3.0 개발 프레임워크입니다.

마켓플레이스 컨트랙트를 사용하면 사용자가 직접 판매 또는 경매를 위해 NFT를 등록할 수 있으며, 오픈시에서와 마찬가지로 NFT의 구매와 판매를 향상시킬 수 있습니다.

이 가이드가 끝나면 다음을 수행할 수 있습니다:

- Thirdweb을 사용해 컨트랙트를 생성하고 사용자 정의할 수 있습니다.
- Thirdweb을 사용하여 스마트 컨트랙트를 컴파일, 배포, 상호작용할 수 있습니다.

## 시작하기 <a id="getting-started"></a>

이 문서에서는 thirdweb을 사용하여 컨트랙트를 생성, 사용자 정의 및 배포하는 다양한 방법을 살펴보겠습니다.

- thirdweb 대시보드 사용
- thirdweb CLI 사용

이 가이드에서는 셋째웹 대시보드를 사용하여 마켓플레이스 컨트랙트를 배포하는 방법과 셋째웹 CLI를 사용하여 마켓플레이스에 상장할 해당 NFT 컬렉션을 배포하는 방법을 보여드리겠습니다.

> 참고: 스마트 컨트랙트 생성, 배포, 상호작용을 위한 thirdweb 대시보드와 CLI를 살펴보는 데 중점을 두었으므로 마켓플레이스 컨트랙트의 메커니즘은 설명하지 않겠습니다.

## Thirdweb 대시보드를 사용하여 마켓플레이스 컨트랙트 만들기 및 배포하기 <a id="creating-and-deploying-thirdweb-dashboard"></a>

이 섹션에서는 thirdweb 대시보드를 사용하여 마켓플레이스 컨트랙트를 만들고 배포하겠습니다. 이렇게 하려면 아래 단계를 따르세요:

1. [thirdweb 대시보드](https://thirdweb.com/dashboard?ref=blog.thirdweb.com)로 이동하여 컨트랙트 목록에서 **MarketPlace** 컨트랙트를 선택합니다.

![](/img/build/get-started/marketplace-explore.png)

2. 컨트랙트 개요 대시보드에서 **Deploy Now**를 클릭합니다.

![](/img/build/get-started/marketplace-deploy.png)

3. 마켓플레이스의 **name**, **description**, **image** 등의 파라미터를 포함하도록 마켓플레이스 컨트랙트를 구성합니다.

![](/img/build/get-started/marketplace-contract-details.png)

4. 위 이미지와 같이 **Deploy Now**를 클릭하고 트랜잭션이 완료될 때까지 기다립니다.

![](/img/build/get-started/marketplace-deployed.png)

트랜잭션이 성공적으로 실행되면, 컨트랙트 주소를 [Klaytnscope](https://klaytnscope.com/)의 검색창에 붙여넣으면 배포를 확인할 수 있습니다.

## Thirdweb CLI를 사용하여 NFT 수집 컨트랙트 생성 및 배포 <a id="creating-deploying-using-thirdweb-cli"></a>

이 섹션에서는 [thirdweb CLI](https://portal.thirdweb.com/cli?ref=blog.thirdweb.com)를 사용하여 마켓플레이스에 상장할 NFT 컬렉션을 생성하고 배포하겠습니다. 이렇게 하려면 아래 단계를 따르세요:

### 컨트랙트 만들기 <a id="creating-the-contract"></a>

1. 터미널에서 다음 명령을 실행하여 컨트랙트를 생성합니다:

```bash
npx thirdweb create --contract
```

2. 명령줄 프롬프트에 원하는 값을 입력합니다:

   i. 프로젝트 이름을 지정합니다.

   ii. 선호하는 프레임워크를 선택합니다: **Hardhat** 또는 **Foundry**.

   iii. 스마트 컨트랙트의 이름을 지정합니다.

   iv. 기본 컨트랙트 유형을 선택합니다: **Empty**, **ERC20**, **ERC721**, 또는 **ERC1155**. 원하는 **extensions**을 추가합니다. 이 튜토리얼에서는 ERC721을 선택하고 확장을 없음으로 설정하겠습니다.

![](/img/build/get-started/thirdweb-cli-info.png)

3. 프로젝트가 생성되면 프로젝트의 루트 디렉토리로 이동하여 원하는 코드 편집기에서 프로젝트를 엽니다.

4. 계약 폴더를 열면 계약이 다음과 같이 보일 것입니다:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@thirdweb-dev/contracts/base/ERC721Base.sol";
contract nftcollection is ERC721Base {
      constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC721Base(
            _defaultAdmin,
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {}
}
```

위의 컨트랙트는 기본적인 [ERC721Base](https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Base.sol) 기능을 보여줍니다. 이는 **ERC721Base** 컨트랙트를 가져와 상속하며, 생성자 및 종속 파라미터를 포함한 필수 메서드도 구현합니다.

컨트랙트를 원하는 사용자 정의 로직으로 수정할 수 있으며, 수정이 완료되면 컨트랙트를 배포할 준비가 된 것입니다.

### 컨트랙트 배포하기 <a id="deploying-the-contracts"></a>

1. 프로젝트 루트 폴더로 이동하여 터미널에서 다음 명령을 실행합니다:

```bash
npx thirdweb deploy
```

이 명령을 실행하면 다음 작업이 트리거됩니다:

- 프레임워크(hardhat, foundry)를 감지합니다.
- 현재 디렉토리에 있는 모든 컨트랙트를 컴파일합니다.
- 배포하고자 하는 컨트랙트를 선택할 수 있습니다.
- 컴파일된 스마트 컨트랙트 코드(애플리케이션 바이너리 인터페이스 또는 ABI 형태)를 IPFS에 업로드합니다.

2. 배포가 완료되면 대시보드 인터페이스가 열리고 나머지 파라미터를 입력할 수 있습니다.
   - **_name**: 컨트랙트 이름
   - **_symbol**: 심볼 또는 "티커"
   - 배포할 컨트랙트를 선택할 수 있습니다.
   - **_name**: 컨트랙트 이름
     **_symbol**: 심볼 또는 "티커"
     **_royaltyRecipient**: 2차 판매에서 로열티를 받을 지갑 주소
     **_royaltyBps**: 각 2차 판매에 대해 로열티 수령자에게 지급할 베이시스 포인트(bps)(예: 500 = 5%)

3. 컨트랙트를 배포할 네트워크로 `Kaia Mainnet`를 선택합니다.

![](/img/build/get-started/nft-collection-deploy.png)

4. 스마트 컨트랙트가 배포되면 대시보드를 통해 추가 설정과 기능을 관리할 수 있습니다. 예를 들어, NFT를 업로드하고, 권한과 액세스 제어를 구성하고, 새로운 기능을 추가할 수 있습니다.

Thirdweb 배포 명령에 대한 자세한 내용은 [배포 가이드](https://portal.thirdweb.com/deploy/getting-started)에서 확인할 수 있습니다.

## 배포된 컨트랙트와 상호작용하기 <a id="interacting-with-deployed-contracts"></a>

이 섹션에서는 각각 **mint**와 **transferfrom** 함수를 사용하여 NFT를 발행하고 다른 계정으로 전송하는 방법을 살펴보겠습니다. 다음 단계를 통해 살펴보겠습니다:

### NFT 발행하기 <a id="minting-nft"></a>

1. 새로 배포된 컨트랙트(**puppyKlan-NC**) 대시보드로 이동합니다.
2. 컨트랙트 대시보드 아래의 **NFT** 탭에서 **mint** 기능을 클릭합니다.

![](/img/build/get-started/puppy-mint-btn.png)

3. NFT를 발행하는 데 필요한 파라미터를 입력합니다: **name**, **media**, **description**, **properties**를 입력합니다.

![](/img/build/get-started/puppy-mint-details.png)

4. 입력을 확인하고 **Mint NFT** 버튼을 클릭합니다.
5. 트랜잭션을 확인하고 완료될 때까지 기다립니다. 완료되면 아래와 같이 대시보드에 NFT가 추가된 것을 확인할 수 있습니다:

![](/img/build/get-started/puppy-minted.png)

### NFT를 새 소유자에게 이전하기 <a id="transferring-nft-to-new-owner"></a>

1. 컨트랙트(**puppyKlan-NC**) 대시보드의 탐색기 탭으로 이동합니다.
2. 아래와 같이 쓰기 탭에서 **transferFrom** 기능을 선택합니다.
3. 필요한 함수 인수를 입력합니다: from(address), to(address), id(uint256).

![](/img/build/get-started/puppy-transferfrom.png)

4. 트랜잭션을 확인하고 완료될 때까지 기다립니다.

## 결론 <a id="conclusion"></a>

축하드립니다! 이 가이드를 끝까지 완료하셨군요. 궁금한 점이 있으시다면, [카이아 포럼](https://forum.klaytn.foundation/)을 방문하시거나 [공식 thirdweb 지원](https://support.thirdweb.com/)으로 문의해 주세요. 하지만 아래는 카이아에서 Thirdweb으로 빌드하는 동안 필요한 유용한 리소스 목록입니다.

- [Thirdweb 문서](https://portal.thirdweb.com/)
- [Thirdweb을 사용해 dApp을 구축하는 방법](https://blog.thirdweb.com/guides/how-to-build-a-dapp/)
- [NextJS와 TypeScript로 나만의 NFT 마켓플레이스 만들기](https://blog.thirdweb.com/guides/nft-marketplace-with-typescript-next/)
