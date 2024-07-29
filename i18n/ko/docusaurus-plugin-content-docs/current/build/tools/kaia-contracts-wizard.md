# Kaia Contracts Wizard

![](/img/banners/kaia-kcw.png)

## 소개

카이아는 원활한 개발자 경험을 제공하는 것을 우선시하며, 이것이 바로 Kaia Contracts Wizard(KCW)를 만든 원동력입니다. KCW는 스마트 컨트랙트를 손쉽게 부트스트랩하고 [Kaia 컨트랙트](https://github.com/klaytn/klaytn-contracts)에서 제공되는 안전하고 검증된 컴포넌트를 활용할 수 있는 대화형 도구입니다. 즉, 카이아 컨트랙트의 구성요소를 활용하여 스마트 컨트랙트를 개발하는 과정을 간소화합니다. Kaia Contracts Wizard는 OpenZeppelin 마법사의 기반 위에 구축되어 스마트 컨트랙트 개발의 보안을 더욱 강화한다는 점에 주목할 필요가 있습니다.

이 가이드에서는 다음과 같이 설명합니다:

- Kaia Contracts Wizard의 기본 기능을 이해합니다.
- Kaia Contracts Wizard를 사용하여 스마트 컨트랙트 코드 생성 및 커스터마이징하기.
- Foundry 스크립팅 시스템을 사용하여 카이아 컨트랙트를 카이아 네트워크(Kairos)에 배포합니다.

## Kaia Contracts Wizard 살펴보기

Kaia Contracts Wizard는 카이아 컨트랙트를 사용하여 스마트 컨트랙트를 작성하는 가장 빠르고 쉬운 방법이라고 자부합니다. 이번 섹션에서는 Kaia Contracts Wizard의 다양한 구성 요소와 세그먼트에 대해 자세히 살펴보겠습니다.

현재 Kaia Contracts Wizard는 다음과 같은 토큰 표준을 지원합니다:

- [KIP-7](https://kips.klaytn.foundation/KIPs/kip-7) - 카이아의 대체 가능한 토큰 표준입니다. 대체 가능이란 모든 토큰이 분할 및 교환이 가능하며, 즉 동일한 가치를 갖는다는 것을 의미합니다. 대체 가능한 토큰의 대표적인 예로는 동일한 액면가의 지폐가 동일한 가치를 갖는 법정화폐를 들 수 있습니다.
- [KIP-17](https://kips.klaytn.foundation/KIPs/kip-17) - 카이아의 대체 불가능한 토큰 표준입니다. 대체 불가능하다는 것은 각 토큰이 분할할 수 없으므로 고유하다는 것을 의미합니다. KIP17 토큰은 그림, 게임 아이템, 부동산 등 물리적 자산이든 가상의 수집품이든 고유한 아이템의 소유권을 나타낼 수 있습니다.
- [KIP-37](https://kips.klaytn.foundation/KIPs/kip-37) - 단일 스마트 컨트랙트에서 대체 가능한 토큰과 대체 불가능한 토큰을 모두 나타낼 수 있기 때문에 카이아의 멀티토큰 표준으로 알려져 있습니다.

이더리움 컨트랙트 마법사는 [이더리움 동등성](https://medium.com/klaytn/toward-ethereum-equivalence-1-introducing-klaytn-v1-8-0-971911be7ff9) 지원과 함께 [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/), [ERC721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/), [ERC1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)도 지원합니다.

Kaia Contracts Wizard는 다음 섹션으로 구성되어 있습니다:

- **토큰 표준 섹션**: 이 탭은 Kaia Contracts Wizard가 지원하는 모든 토큰 표준으로 구성되어 있습니다.

- **설정 섹션**: 이 섹션에서는 토큰 이름, 심볼, 프리 민트(컨트랙트 배포 시 토큰 공급), URI(대체 불가능한 토큰의 경우) 등 각 토큰 표준에 대한 예비 설정을 제공합니다.

- **기능 섹션**: 각 토큰 표준에서 사용할 수 있는 모든 기능으로 구성됩니다. 각 토큰에서 사용할 수 있는 다양한 확장 기능에 대한 자세한 정보는 다음 링크에서 확인할 수 있습니다:

  - [KIP7](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP7/extensions)
  - [KIP17](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP17/extensions)
  - [KIP37](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP37/extensions)

- **접근 제어 섹션**: 각 토큰 표준에 대해 사용 가능한 모든 접근 제어 메커니즘으로 구성됩니다.

- **대화형 코드 표시 섹션**: 사용자가 설정한 구성으로 생성된 스마트 컨트랙트 코드를 표시합니다.

![](/img/build/tools/kcw-image.png)

Kaia Contracts Wizard의 여러 부분을 살펴봤다면 이제 원하는 컨트랙트 종류(현재 **KIP7**, **KIP17**, **KIP37**, **ERC20**, **ERC721**, **ERC1155**, **거버너** 및 사용자 정의 컨트랙트 지원)를 선택하고 파라미터와 원하는 기능(토큰 이름, 심볼, 사전 발행량, 접근 제어 등)을 설정하면 컨트랙트 마법사가 필요한 모든 코드를 생성해줍니다. 생성된 코드는 컴파일 및 배포할 준비가 된 상태이며, 시작점으로 사용하거나 애플리케이션별 로직으로 추가 사용자 지정할 수 있습니다.

## 카이아 네트워크에서 카이아 컨트랙트 커스터마이징 및 배포하기

이 섹션에서는 Kaia Contracts Wizard에서 생성된 코드를 Foundry를 사용하여 카이아 테스트넷 Kairos에 배포합니다. 생성된 코드는 시작점으로 사용되며, KIP7 및 KIP17 토큰의 에어드랍 컨트랙트에 맞게 추가로 커스터마이징할 수 있습니다.  다른 쪽에서는 KIP37에 대해 생성된 코드가 그대로 사용됩니다.

시작해보겠습니다!

### 전제 조건

이 튜토리얼을 따라하기 위한 사전 요구 사항은 아래에 강조 표시되어 있습니다:

- [Foundry](https://book.getfoundry.sh/getting-started/installation)가 설치되어 있는지 확인합니다.
- [klaytn-foundry-starterkit](https://github.com/ayo-klaytn/klaytn-foundry-starterkit) 코드를 복제합니다.
- [MetaMask](../tutorials/connecting-metamask#install-metamask): 컨트랙트를 배포하고 트랜잭션에 서명하고 컨트랙트와 상호작용하는 데 사용됩니다.
- RPC Endpoint: you can get this from one of the supported [endpoint providers](../../references/public-en.md).
- Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.

### 시작하기

이 가이드는 KIP7 및 KIP17 토큰 표준에 대한 에어드랍 컨트랙트를 간단하게 구현하는 방법을 안내합니다. 에어드랍 콘트랙트에서 프로젝트 생성자는 각각의 토큰을 특정 지갑에 직접 채굴합니다. 다음 섹션에서는 각 토큰 에어드랍 컨트랙트를 각각 커스터마이즈하고 배포하는 방법을 살펴보겠습니다.

### Customizing Token contracts

**KIP7 컨트랙트를 KIP7 에어드랍 컨트랙트로 커스터마이징하기.**

에어드랍 컨트랙트로 수정하기 전에 KIP7 컨트랙트를 사용자 지정해야 합니다. 이를 위해서는 아래 단계를 따르세요:

1. [wizard.klaytn.foundation](https://wizard.klaytn.foundation/)으로 이동합니다.
2. **Contracts** 탭에서 **KIP7**을 선택합니다.
3. 다음으로 **SETTINGS** 탭에서 이름(KIP7 토큰 에어드랍)과 심볼(KTA)을 입력합니다. The pre-mint field is left empty
4. 그 후 **FEATURES** 탭에서 **Mintable** 기능 상자를 선택하면 **ACCESS CONTROL** 탭에서 자동으로 소유 가능 기능을 선택합니다.

이렇게 구성한 후 Kaia Contracts Wizard의 모습은 다음과 같습니다:

![](/img/build/tools/kip7-kcw.png)

생성된 코드는 다음과 같습니다:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
import "@klaytn/contracts/access/Ownable.sol";
contract KIP7TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("KIP7 Token Airdrop", "KTA") {}
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
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

다음은 위의 코드를 에어드롭 구현에 맞게 다음과 같이 수정하는 것입니다:

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
import "@klaytn/contracts/access/Ownable.sol";
contract KIP7TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("KIP7 Token Airdrop", "KTA") {
    }
    // airdrop fungible token
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

위에서 수정한 코드를 보면 `airdropTokens()`라는 새 함수를 추가한 것을 확인할 수 있습니다. 이 함수는 선택한 특정 주소로 토큰을 채굴하며 컨트랙트 생성자인 `onlyOwner`만이 호출할 수 있습니다.

그 후, _public_ **mint()** _onlyOwner_ 함수를 **_mintSingleTokens()** 비공개로 수정했습니다.

이제 KIP7 에어드랍 컨트랙트 코드가 준비되었으므로, 다음 단계는 프로젝트 디렉터리의 src 폴더에 airdropKIP7.sol이라는 새 파일을 생성하고 수정된 코드를 파일에 붙여넣는 것입니다.

**KIP17 컨트랙트를 KIP17 에어드랍 컨트랙트로 커스터마이징하기.**

에어드랍 컨트랙트로 수정하기 전에 KIP17 컨트랙트를 사용자 지정해야 합니다. 이를 위해서는 아래 단계를 따르세요:

1. [wizard.klaytn.foundation](https://wizard.klaytn.foundation/)으로 이동합니다.
2. **Contracts** 탭에서 **KIP17**을 선택합니다.
3. 다음으로 **SETTINGS** 탭에서 이름(KIP7 NFT 에어드랍)과 심볼(KNA)을 입력합니다.  기본 URI 필드는 비워둬야 합니다.
4. 이어서 **FEATURES** 탭에서 **Mintable**, **Auto-increment Ids**, **Enumerable** 기능 상자를 선택합니다. **ACCESS CONTROL** 탭의 소유 가능 기능이 자동으로 선택된 것을 확인할 수 있습니다.

이렇게 구성한 후 Kaia Contracts Wizard의 모습은 다음과 같습니다:

![](/img/build/tools/kip17-kcw.png)

생성된 코드는 다음과 같습니다:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/utils/Counters.sol";
contract KIP17NFTAirdrop is KIP17, KIP17Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() KIP17("KIP17 NFT Airdrop", "KNA") {}
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(KIP17, KIP17Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(KIP17, KIP17Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

다음은 위의 코드를 에어드랍 구현에 맞게 다음과 같이 수정하는 것입니다:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/utils/Counters.sol";
contract KIP17NftAirdrop is KIP17, KIP17Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() KIP17("KIP17 NFT Airdrop", "KNA") {}
    // Airdrop NFTs
    function airdropNfts(address[] calldata wAddresses) public onlyOwner {
        require(wAddresses.length != 0, "Must no be equal to zero");
        for (uint256 i = 0; i < wAddresses.length; i++) {
            _mintSingleNFT(wAddresses[i]);
        }
    }
    function _mintSingleNFT(address to) private {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(KIP17, KIP17Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(KIP17, KIP17Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

위에서 수정한 코드를 보면 **airdropNfts()** 라는 새로운 함수를 추가한 것을 확인할 수 있습니다. 이 함수는 선택한 특정 주소로 토큰을 채굴하며, 컨트랙트 생성자인 onlyOwner만이 호출할 수 있습니다.

그 후 **safeMint()** _public onlyOwner_ 함수를 **_mintSingleTokens()** **private**로 수정했습니다.

이제 KIP17 에어드랍 컨트랙트 코드가 준비되었으므로, 다음 단계는 프로젝트 디렉터리의 src 폴더에 airdropKIP17.sol이라는 새 파일을 생성하고 수정된 코드를 파일에 붙여넣는 것입니다.

**KIP37 컨트랙트 커스터마이징하기**

KIP37은 일괄 발행을 지원하므로 컨트랙트만 사용자 지정하여 그대로 사용할 것입니다. KIP37 컨트랙트를 사용자 지정하려면 아래 단계를 따르세요:

1. [wizard.klaytn.foundation.](https://wizard.klaytn.foundation/)으로 이동합니다.
2. **Contracts** 탭에서 **KIP37**을 선택합니다.
3. 다음으로 **SETTINGS** 탭에서 이름(KIP7 NFT 에어드랍)과 심볼(KNA)을 입력합니다.  기본 URI 필드는 비워둬야 합니다.
4. 이어서 **FEATURES** 탭에서 **Mintable**, **Auto-increment Ids**, **Enumerable** 기능 상자를 선택합니다. **ACCESS CONTROL** 탭의 Ownable 기능이 자동으로 선택된 것을 확인할 수 있습니다.

이렇게 구성한 후 Kaia Contracts Wizard의 모습은 다음과 같습니다:

![](/img/build/tools/kip37-kcw.png)

생성된 코드는 다음과 같습니다:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@klaytn/contracts/KIP/token/KIP37/KIP37.sol";
import "@klaytn/contracts/access/Ownable.sol";
contract KIP37MultiToken is KIP37, Ownable {
    constructor() KIP37("") {}
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}
```

이제 KIP37 컨트랙트 코드가 준비되었으므로, 다음 단계는 프로젝트 디렉터리의 src 폴더에 KIP37MultiToken.sol이라는 새 파일을 생성하고 생성된 코드를 붙여넣는 것입니다.

모든 카이아 컨트랙트에 대한 컨트랙트 코드를 생성했으면, 다음 단계는 Foundry Solidity 스크립트를 사용하여 카이아 테스트넷 Kairos에 배포하는 것입니다.

## Foundry 스크립트를 사용하여 생성된 스마트 컨트랙트 코드 배포하기

이 섹션에서는 Foundry를 사용하여 생성된 스마트 컨트랙트 코드를 배포하는 방법, 특히 온체인 배포를 위한 Foundry 스크립트를 살펴보겠습니다.

### 시작하기

While getting started with foundry, you must have been exposed to the preliminary way of delaying contracts using [forge create](https://book.getfoundry.sh/reference/forge/forge-create.html). 최근 Foundry 팀은 [Solidity 스크립팅](https://book.getfoundry.sh/tutorials/solidity-scripting#solidity-scripting), 즉 JavaScript 대신 Solidity로 배포 스크립트를 작성하여 Solidity를 사용하여 컨트랙트를 선언적으로 배포하는 보다 사용자 친화적인 방법을 고안해냈습니다.

이 섹션에서는 Foundry에서 Solidity 스크립팅을 사용하여 컨트랙트를 배포하겠습니다.

### 환경 구성

생성된 스마트 컨트랙트를 Kaia Kairos 테스트넷에 배포할 예정인데, 이를 위해서는 테스트 클레이로 자금을 조달한 계정의 개인키인 Kairos RPC URL 등을 설정하여 Foundry를 약간 구성해야 합니다.

모든 준비가 완료되면 .env 파일을 생성하고 변수를 추가합니다. Foundry는 프로젝트 디렉터리에 있는 .env 파일에 자동으로 로드됩니다.

.env 파일은 이 형식을 따라야 합니다:

```code
BAOBAB_RPC_URL=
// if you want to deploy to mainnet cypress
CYPRESS_RPC_URL=
PRIVATE_KEY=
```

이제 `foundry.toml` 파일을 편집해야 합니다. 프로젝트의 루트에는 이미 파일이 있을 것입니다. 파일 끝에 다음 줄을 붙여넣습니다.

```code
[rpc_endpoints]
baobab = "${BAOBAB_RPC_URL}"
// if you want to deploy to mainnet cypress
cypress = "${CYPRESS_RPC_URL}"
```

### 스크립트 작성

다음으로 폴더를 생성하고 아직 존재하지 않는 경우 이름을 스크립트로 지정해야 합니다. 그런 다음 컨트랙트를 위한 스크립트 파일을 만들어야 합니다:
airdropKIP7.s.sol
airdropKIP17.s.sol
KIP37멀티토큰.s.sol
여기에서 배포 스크립트 자체를 작성할 것입니다.  각 파일의 내용은 다음과 같아야 합니다:

1. airdropKIP7.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/airdropKIP7.sol";

contract KIP7AirdropDeployScript is Script {

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP7TokenAirdrop kip7TokenAirdrop = new KIP7TokenAirdrop();

        vm.stopBroadcast();
    }
}
```

2. airdropKIP17.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/airdropKIP17.sol";

contract KIP17AirdropDeployScript is Script {

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP17NftAirdrop kip17NftTokenAirdrop = new KIP17NftAirdrop();

        vm.stopBroadcast();
    }
}
```

3. KIP37MultiToken.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/KIP37MultiToken.sol";

contract KIP37MultiTokenDeployScript is Script {

    function setUp() public {}

    function run() public {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP37MultiToken kip37MultiToken = new KIP37MultiToken();

        vm.stopBroadcast();
    }
}
```

각 코드 줄의 기능을 살펴보겠습니다.

먼저 각 스크립트 파일에 대해 SPDX-라이선스 및 프라그마 버전을 선언했습니다. 각 스크립트 파일은 Solidity 프로그램이기 때문에 스마트 컨트랙트처럼 작동하지만 배포되지는 않는 SPDX-라이선스 및 프라그마 버전을 선언해야 한다는 점에 유의하세요.

다음으로 컨트랙트 배포에 사용할 몇 가지 스크립팅 유틸리티를 제공하는 [Forge Std/Script.sol](https://github.com/foundry-rs/forge-std/blob/master/src/Script.sol)을 가져왔습니다. Subsequently, we imported the contract to be deployed. 이 경우 각 스크립트에 대해 **airdropKIP7**, **airdropKIP17**, **KIP37MultiToken**을 가져왔습니다.

그런 다음 각 스크립트 파일에 대해 Forge Std 라이브러리에서 스크립트를 상속하는 **KIP7AirdropDeployScript**, **KIP17AirdropDeployScript**, **KIP37MultiTokenDeployScript**라는 컨트랙트를 생성했습니다.

다음으로 **run()** 함수를 선언했습니다. run() 함수는 스크립트를 실행하기 위한 시작점입니다. 우리는
그런 다음 .env 파일에서 개인 키를 로드하는 **deployerPrivateKey** 변수를 선언했습니다.

그 후, 트랜잭션 서명을 위해 배포자 프라이빗 키를 전달한 후 메인 스크립트 컨트랙트에서 호출과 컨트랙트 생성을 기록하는 **vm.startBroadcast(deployerPrivateKey)** 특수 치트 코드를 호출했습니다.

We then created the respective contract. 이 컨트랙트 생성은 이전에 vm.startBroadcast() 치트 코드를 호출했기 때문에 위조로 기록됩니다.

이제 각 라인이 무엇을 수반하는지에 대한 개요를 살펴보았으니 이제 컨트랙트 배포로 넘어가도 됩니다.  이 [링크](https://book.getfoundry.sh/tutorials/solidity-scripting#writing-the-script)를 클릭하여 스크립트 작성 및 기타 세부 사항에 대해 자세히 알아보세요.

프로젝트 실행의 루트에서

```bash
// To load the variables in the .env file
source .env
```

각 컨트랙트를 배포하려면 아래 명령어를 실행합니다:

1. airdropKIP7

```bash
forge script script/airdropKIP7.s.sol:KIP7AirdropDeployScript --rpc-url $BAOBAB_RPC_URL --broadcast --skip-simulation -vvvv
```

2. airdropKIP17

```bash
forge script script/airdropKIP17.s.sol:KIP17AirdropDeployScript --rpc-url $BAOBAB_RPC_URL --broadcast --skip-simulation -vvvv
```

3. KIP37MultiToken

```bash
forge script script/KIP37MultiToken.s.sol:KIP37MultiTokenDeployScript --rpc-url $BAOBAB_RPC_URL --broadcast --skip-simulation -vvvv
```

각 명령에 대해 명령이 성공했다면 터미널은 다음과 같이 표시되어야 합니다:

![](/img/build/tools/deploy-kcw-contracts.png)

스크립트 명령에 대해 자세히 알아보려면 이 [가이드](https://book.getfoundry.sh/reference/forge/forge-script)를 참조하세요.

## 결론

이 튜토리얼에서는 Kaia 컨트랙트 마법사와 그 기능, 그리고 KCW를 사용하여 컨트랙트를 커스터마이징하는 방법에 대해 배웠습니다. 또한 스마트 컨트랙트 코드를 생성하는 방법과 생성된 스마트 컨트랙트 코드를 시작점으로 삼아 애플리케이션별 로직으로 추가 커스터마이징하는 방법도 보여드렸습니다.

또한, 생성된 컨트랙트를 Foundry Solidity 스크립팅을 사용하여 카이아 Kairos 테스트넷에 배포했습니다. Remix IDE 또는 다른 스마트 컨트랙트 개발 환경을 사용하여 Kaia Contracts Wizard를 통해 파생되거나 커스터마이징된 스마트 컨트랙트를 배포할 수 있습니다. 다음 링크에서 해당 튜토리얼을 찾을 수 있습니다:

- [Remix에 연결하기](../tutorials/connecting-remix.md#connecting-klaytn-remix-using-metamask)
- [Hardhat을 이용한 스마트 컨트랙트 배포하기](../get-started/hardhat.md)
- [Truffle을 이용한 스마트 컨트랙트 배포하기](../smart-contracts/samples/erc-20.md#2-2-deploying-smart-contract-using-truffle)
