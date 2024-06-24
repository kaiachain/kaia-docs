# Deploy smart contracts

## 1. Klaystagram dApp 클론하기 <a id="2-clone-klaystagram-dapp"></a>

### Klaystagram 저장소 복제 <a id="1-clone-klaystagram-repository"></a>

```text
$ git clone https://github.com/klaytn/klaystagram
```

### Klaystagram dApp 설치 및 실행 <a id="2-install-run-klaystagram-dapp"></a>

방금 복제한 패키지는 수정 없이 바로 실행할 수 있습니다.

샘플 컨트랙트는 이미 Baobab 테스트넷에 배포되어 있으며, contract ABI는 저희 패키지에 포함되어 있습니다.\
Klaystagram 프론트엔드 코드는 초기에 Baobab 테스트넷의 스마트 컨트랙트에 연결하도록 구성됩니다.\
컨트랙트를 배포할 테스트넷 KLAY 받기

앱을 바로 실행하여 작동 방식을 확인하려면 아래에 입력하세요.

> 첫 페이지에 언급된 테스트 환경을 따르는 것을 적극 권장합니다.

```text
$ npm install
$ npm run local
```

⚠ 작동하지 않는 경우 파일 및 디렉터리 권한을 확인하세요.

애플리케이션이 바로 팝업됩니다!
(**처음에는 많은 피드 이미지를 로드하는 데 시간이 오래 걸릴 수 있습니다.**)

## 2. Klaystagram 스마트 컨트랙트 작성하기 <a id="4-write-klaystagram-smart-contract"></a>

1. 배경
2. Contract setup
3. 이벤트 및 데이터 구조 설정
4. 함수 쓰기\
   4.1. `uploadPhoto`\
   4.2. `transferOwnership`\
   4.3. `getPhoto`

### 1) 배경 <a id="1-background"></a>

우리는 "Klaystagram"이라는 간단한 컨트랙트를 맺을 것입니다.

- 다양한 사진 데이터를 저장하기 위해 정의된 `PhotoData` 구조체입니다.
- 사용자는 `uploadPhoto`, `transferOwnership` 함수를 통해 사진을 업로드하고 소유권 사진을 전송할 수 있습니다.

### 2. 컨트랙트 설정 <a id="2-contract-setup"></a>

- Solidity 버전을 지정합니다. 0.5.6 안정 버전 사용을 권장합니다.
- 대체 불가능한 토큰을 만들기 위해 ERC721 표준을 사용할 것입니다.
  - `ERC721.sol`과 `ERC721Enumerable.sol`을 가져옵니다.
  - ERC721에 대한 자세한 정보는 [erc721.org](http://erc721.org)에서 확인하시기 바랍니다.

```text
pragma solidity 0.5.6;

import "./ERC721/ERC721.sol";
import "./ERC721/ERC721Enumerable.sol";

contract Klaystagram is ERC721, ERC721Enumerable {
```

### 이벤트 및 데이터 구조 설정 <a id="3-set-events-and-data-structure"></a>

블록체인에서 활동을 추적하기 위해 이벤트를 설정해야 합니다.

데이터 구조의 경우, `_photoList` 매핑은 특정 `PhotoData` 구조체에 매핑하기 위해 uint256 `tokenId`를 사용합니다. PhotoUploaded 이벤트를 정의하면 트랜잭션 영수증은 이를 포함하는 함수가 호출될 때마다 이 이벤트를 기록합니다.

```text
event PhotoUploaded (uint indexed tokenId, bytes photo, string title, string location, string description, uint256 timestamp);

mapping (uint256 => PhotoData) private _photoList;

struct PhotoData {
    uint256 tokenId;                       // Unique token id, starts from 1 and increases by 1
    address[] ownerHistory;                // History of all previous owners
    bytes photo;                           // Image source
    string title;                          // Title of photo
    string location;                       // Location where photo is taken
    string description;                    // Short description about the photo
    uint256 timestamp;                     // Uploaded time
}
```

### 함수 쓰기 <a id="4-write-functions"></a>

컨트랙트와 상호작용하는 몇 가지 함수를 작성해 봅시다. 이 튜토리얼에서는 `uploadPhoto`와 `transferOwnership`이라는 두 가지 함수만 살펴봅시다. 전체 함수 집합을 보려면 Klaystagram.sol을 확인하세요.

#### 4-1) `uploadPhoto` <a id="4-1-uploadphoto"></a>

`uploadPhoto` 함수는 사진의 이미지 소스를 포함한 4개의 인수를 받습니다. 간단하게 하기 위해 `tokenId`는 1에서 시작하여 1씩 증가합니다.

`_mint` 함수는 ERC721 컨트랙트에서 가져온 것입니다. 새 토큰을 생성하고 특정 주소(이 경우 `msg.sender`)에 할당합니다. 이 애플리케이션에서 로그인한 사용자는 자신의 개인 키로 트랜잭션을 생성합니다. 따라서 `msg.sender`는 사용자의 공개 주소가 됩니다.

마지막으로, `PhotoData` 구조체를 초기화하고, `_photoList` 매핑 안에 위치시킨 다음, 소유자 주소를 `ownerHistory` 배열에 푸시합니다. 그리고 방금 생성한 이벤트를 발생시키는 것을 잊지 마세요. 위에서 언급했듯이 이 이벤트는 트랜잭션 영수증에 포함될 것입니다.

```text
function uploadPhoto(bytes memory photo, string memory title, string memory location, string memory description) public {
    uint256 tokenId = totalSupply() + 1;

    _mint(msg.sender, tokenId);

    address[] memory ownerHistory;

    PhotoData memory newPhotoData = PhotoData({
        tokenId : tokenId,
        ownerHistory : ownerHistory,
        photo : photo,
        title: title,
        location : location,
        description : description,
        timestamp : now
    });

    _photoList[tokenId] = newPhotoData;
    _photoList[tokenId].ownerHistory.push(msg.sender);

    emit PhotoUploaded(tokenId, photo, title, location, description, now);
}
```

#### 4-2) `transferOwnership` <a id="4-2-transferownership"></a>

Let's take a look at `transferOwnership` function. 사진 소유권을 이전할 때는 두 가지 작업을 수행해야 합니다. 먼저 소유자를 재할당하고, 새로운 소유자 주소를`ownerHistory\` 배열에 푸시해야 합니다.

이를 위해 `transferOwnership`은 먼저 ERC721 표준의 `safeTransferFrom` 함수를 호출하고, 이 함수는 결국 `transferFrom` 함수를 호출합니다. 위에서 언급했듯이 토큰 전송이 성공적으로 완료된 직후에는 새로운 소유자 정보를 `ownerHistory` 배열에 푸시해야 하는데, 바로 이 때문에 `transferFrom`이 아래와 같이 오버라이드됩니다.

```text
/**
  * @notice safeTransferFrom function checks whether receiver is able to handle ERC721 tokens,
  *  thus less possibility of tokens being lost. After checking is done, it will call transferFrom function defined below
  */
function transferOwnership(uint256 tokenId, address to) public returns(uint, address, address, address) {
    safeTransferFrom(msg.sender, to, tokenId);
    uint ownerHistoryLength = _photoList[tokenId].ownerHistory.length;
    return (
        _photoList[tokenId].tokenId,
        //original owner
        _photoList[tokenId].ownerHistory[0],
        //previous owner, length cannot be less than 2
        _photoList[tokenId].ownerHistory[ownerHistoryLength-2],
        //current owner
        _photoList[tokenId].ownerHistory[ownerHistoryLength-1]);
}

/**
  * @notice Recommend using transferOwnership, which uses safeTransferFrom function
  * @dev Override transferFrom function to make sure that every time ownership transfers
  *  new owner address gets pushed into ownerHistory array
  */
function transferFrom(address from, address to, uint256 tokenId) public {
    super.transferFrom(from, to, tokenId);
    _photoList[tokenId].ownerHistory.push(to);
}
```

#### 4-3) `getPhoto` <a id="4-3-getphoto"></a>

마지막으로 스마트 컨트랙트에 저장된 데이터를 가져오는 getter 함수를 만들어 보겠습니다. 하나의 함수를 호출하여 특정 사진에 관한 모든 정보를 가져오고 싶습니다. 따라서 `getPhoto` 함수는 인덱스(토큰 ID)를 인자로 받아 PhotoData 구조체의 모든 요소를 반환합니다.

```text
function getPhoto(uint tokenId) public view
returns(uint256, address[] memory, bytes memory, string memory, string memory, string memory, uint256) {
    require(_photoList[tokenId].tokenId != 0, "Photo does not exist");
    return (
        _photoList[tokenId].tokenId,
        _photoList[tokenId].ownerHistory,
        _photoList[tokenId].photo,
        _photoList[tokenId].title,
        _photoList[tokenId].location,
        _photoList[tokenId].description,
        _photoList[tokenId].timestamp);
}
```

This is it, now we can deploy this contract!

## 3. 컨트랙트 배포 <a href="#3.-deploy-contract" id="3.-deploy-contract"></a>

1. Get some testnet KAIA to deploy contract
2. Truffle 구성
3. 배포 설정 (배포할 컨트랙트 선택)
4. 배포

### 1) KLAY 받기 <a href="#1-get-some-klay" id="1-get-some-klay"></a>

컨트랙트를 배포하려면 가스값을 지불하기 위해 계정에 약간의 KLAY가 필요합니다. 테스트넷의 클레이튼 지갑을 통해 150 KLAY를 받을 수 있습니다.

1. [Baobab 클레이튼 지갑](https://baobab.wallet.klaytn.foundation/create)에서 클레이튼 계정을 생성합니다 -> Truffle 설정에 `PRIVATE `key\\`가 사용됩니다. 따라서 어딘가에 복사해 두세요.

2. 클레이튼 계정을 생성한 후, [Baobab 클레이튼 Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 Faucet를 실행하여 Baobab 테스트넷 KLAY 5개를 받습니다.

![create-계정 생성 및 실행-KLAY Faucet](/img/build/tutorials/klaystagram-run-faucet.png)

### Truffle 구성 <a href="#2-truffle-configuration" id="2-truffle-configuration"></a>

`truffle-config.js`는 배포 구성을 포함한 구성 파일입니다. 이전 단계에서 방금 생성한 `Private `key`를 사용하여 컨트랙트를 배포할 것입니다. 충분한 KLAY가 있는 `Private `key`를 Truffle-config.js에 붙여넣습니다.

_경고: 개인키를 노출해서는 안 됩니다. 그렇지 않으면 계정이 해킹될 수 있습니다._

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

// Paste your `Private key` that has enough KLAY to truffle.js
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

#### `networks` 속성 <a href="#네트워크-프로퍼티" id="networks-property"></a>

위의 `networks` 속성을 참조하십시오. `klaytn` 네트워크에는 4개의 프로퍼티가 있습니다.\
`provider`, `network_id`, `gas`, `gasPrice`

- `provider: () => new HDWalletProvider(PRIVATE_KEY, URL)` 이름 그대로 위에서 정의한 개인키와 URL을 삽입합니다.
- `network_id: NETWORK_ID` 클레이튼에서 네트워크 아이디를 지정하는데, 클레이튼 Baobab 네트워크(테스트넷)를 사용하려면 `1001`로 설정해야 합니다.
- `gas: GASLIMIT` 지출하고자 하는 최대 가스입니다.
- `gasPrice: null` 가스 단위당 가격입니다. 현재 클레이튼에서 가스 가격은 `'25000000000'`로 고정되어 있습니다. 이를 `null`로 설정하면 Truffle이 자동으로 가스 가격을 설정합니다.

#### `compiler` 속성 <a href="#컴파일러-프로퍼티" id="컴파일러-프로퍼티"></a>

Solidity 컨트랙트의 경우 0.5.6 버전을 사용했으므로 여기에 컴파일러 버전을 지정하세요.

### 배포 설정 <a href="#3-deploy-setup" id="3-deploy-setup"></a>

`migrations/2_deploy_contracts.js`:

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

`contracts/` 디렉터리에 어떤 계약 코드를 배포할지 지정할 수 있습니다.

1. 다음을 통해 컨트랙트 파일(`Klaystagram.sol`)을 가져옵니다.

   `const Klaystagram = artifacts.require('./Klaystagram.sol')`
2. `deployer`를 사용하여 컨트랙트를 배포하는 `deployer.deploy(Klaystagram)`를 사용합니다.
3. 컨트랙트를 배포한 후 로직을 추가하려면 `.then()`을 사용합니다(선택 사항).
4. 컨트랙트의 `deployedABI`와 `deployedAddress`를 저장하려면 `fs` node.js 모듈을 사용합니다.

   `fs.writeFile(filename, content, callback)` (선택 사항)

참고: `artifacts.require()`에 대한 자세한 내용은 Truffle 공식 문서 [Truffle 문서](https://trufflesuite.com/docs/truffle/getting-started/running-migrations#artifacts-require-)를 참고하세요.

### 배포 <a href="#4-deploy" id="4-deploy"></a>

![배포 컨트랙트](/img/build/tutorials/klaystagram-deploy-contract.png)

`truffle-config.js` 및 `migrations/2_deploy_contracts.js` 구성에 따라 컨트랙트를 배포합니다.

배포가 성공하면 터미널에 배포된 컨트랙트 주소가 표시됩니다.

참조) `--reset` 옵션\
이 옵션을 제공하면 트러플은 컨트랙트가 변경되지 않았더라도 컨트랙트를 다시 컴파일하고 다시 배포합니다\
예) `$ truffle deploy --reset --network baobab`

## 4. 앱 실행

[![클레이스타그램 소개 영상](/img/build/tutorials/klaystagram-video-poster.png)](https://vimeo.com/327033594)

브라우저에서 앱을 실행합니다.\
`$ npm run local`을 실행하면 브라우저가 열리고 앱이 실행됩니다.
