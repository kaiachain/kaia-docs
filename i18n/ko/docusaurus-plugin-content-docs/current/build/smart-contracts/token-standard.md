# 카이아 호환 토큰(KCT)

카이아 호환 토큰(KCT)은 특정 기술 사양을 구현하는 특별한 유형의 스마트 컨트랙트입니다. 카이아 위에서 토큰을 발행하고자 하는 사람은 누구나 이 사양을 따라야 합니다.

Token standards are defined in Kaia such as [KIP-7](https://kips.kaia.io/KIPs/kip-7) and [KIP-17](https://kips.kaia.io/KIPs/kip-17).

특정 기술 사양을 충족하기 위해 다른 KCT를 정의할 수 있습니다. If anyone needs other token standards, please visit [Kaia Improvement Proposal](https://github.com/kaiachain/KIPs) and propose a new token standard.

## 대체 가능한 토큰 표준 (KIP-7) <a id="fungible-token-standard-kip-7"></a>

대체 가능한 토큰은 균일성과 분할성이라는 속성을 가진 토큰입니다. 모든 대체 가능한 토큰은 각 토큰 단위가 동일한 가치를 가지므로 상호 교환이 가능합니다. 모든 달러 지폐의 가치가 1달러인 것처럼 말이죠. 대체 가능성은 대부분의 경우 암호화폐의 필수적인 특징이기 때문에 블록체인 토큰의 상당수가 대체 가능한 토큰입니다.

스마트 컨트랙트로 이러한 속성을 구현하기 위해 KIP-7 토큰 표준을 사용할 수 있습니다. KIP-7 호환 토큰은 다음과 같은 인터페이스를 구현합니다. Please note that [KIP-13](https://kips.kaia.io/KIPs/kip-13) must be implemented together. For wallet applications, [wallet interface](https://kips.kaia.io/KIPs/kip-7#wallet-interface) can be implemented.

```solidity
// IKIP7
event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);

function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function transfer(address recipient, uint256 amount) external returns (bool);
function allowance(address owner, address spender) external view returns (uint256);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
function safeTransfer(address recipient, uint256 amount, bytes data) external;
function safeTransfer(address recipient, uint256 amount) external;
function safeTransferFrom(address sender, address recipient, uint256 amount, bytes data) external;
function safeTransferFrom(address sender, address recipient, uint256 amount) external;

// IKIP7Metadata (optional)
function name() external view returns (string memory);
function symbol() external view returns (string memory);
function decimals() external view returns (uint8);

// IKIP7Mintable (optional)
function mint(address _to, uint256 _amount) external returns (bool);
function isMinter(address _account) external view returns (bool);
function addMinter(address _account) external;
function renounceMinter() external;

// IKIP7Burnable (optional)
function burn(uint256 _amount) external;
function burnFrom(address _account, uint256 _amount) external;

// IKIP7Pausable (optional)
event Paused(address _account);
event Unpaused(address _account);

function paused() external view returns (bool);
function pause() external;
function unpause() external;
function isPauser(address _account) external view returns (bool);
function addPauser(address _account) external;
function renouncePauser() external;
```

위의 인터페이스를 기반으로 개발자는 새로운 기능과 로직을 추가하여 토큰을 커스터마이징하고 Kaia 네트워크에 배포할 수 있습니다.

For more information, refer to the official [KIP-7 documentation](https://kips.kaia.io/KIPs/kip-7).

- An example implementation is available at [https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol](https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol).

## 대체 불가능한 토큰 표준 (KIP-17) <a id="non-fungible-token-standard-kip-17"></a>

대체 불가능한 토큰 (NFT)는 고유한 자산을 나타내는 특수한 유형의 토큰입니다. 대체불가형이라는 이름에서 알 수 있듯이 모든 토큰은 고유하고 분할할 수 없습니다. 대체 불가능한 토큰의 이러한 고유성은 자산 디지털화의 새로운 지평을 열어줍니다. 예를 들어 디지털 아트, 게임 아이템 또는 모든 종류의 고유한 자산을 표현하고 사람들이 이를 거래할 수 있도록 하는 데 사용할 수 있습니다.

예를 들어, 블록체인 수집 게임인 [Cryptokitties](https://www.cryptokitties.co/)는 서로 다른 유전 정보를 가진 다양한 고양이를 표현하기 위해 대체 불가능한 토큰을 구현합니다. 모든 고양이는 고유하고 서로 교환할 수 없기 때문에 고양이 토큰마다 가치가 달라집니다.

To implement non-fungible token, [KIP-17](https://kips.kaia.io/KIPs/kip-17) can be used. KIP-17 토큰 컨트랙트는 다음과 같은 인터페이스를 구현합니다. Please note that [KIP-13](https://kips.kaia.io/KIPs/kip-13) must be implemented together. For wallet applications, [wallet interface](https://kips.kaia.io/KIPs/kip-17#wallet-interface) can be implemented.

```solidity
// IKIP17
event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

function balanceOf(address _owner) external view returns (uint256);
function ownerOf(uint256 _tokenId) external view returns (address);
function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes _data) external payable;
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
function approve(address _approved, uint256 _tokenId) external payable;
function setApprovalForAll(address _operator, bool _approved) external;
function getApproved(uint256 _tokenId) external view returns (address);
function isApprovedForAll(address _owner, address _operator) external view returns (bool);

// IKIP17Metadata (optional)
function name() external view returns (string _name);
function symbol() external view returns (string _symbol);
function tokenURI(uint256 _tokenId) external view returns (string);

// IKIP17Enumerable (optional)
function totalSupply() external view returns (uint256);
function tokenByIndex(uint256 _index) external view returns (uint256);
function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256);

// IKIP17Mintable (optional)
function mint(address _to, uint256 _tokenId) public returns (bool);
function isMinter(address _account) public view returns (bool);
function addMinter(address _account) public;
function renounceMinter() public;

// IKIP17MetadataMintable (optional)
function mintWithTokenURI(address _to, uint256 _tokenId, string memory _tokenURI) public returns (bool);
function isMinter(address _account) public view returns (bool);
function addMinter(address _account) public;
function renounceMinter() public;

// IKIP17Burnable (optional)
function burn(uint256 _tokenId) public;

// IKIP17Pausable (optional)
event Paused(address _account);
event Unpaused(address _account);
function paused() public view returns (bool);
function pause() public;
function unpause() public;
function isPauser(address _account) public view returns (bool);
function addPauser(address _account) public;
function renouncePauser() public;
```

위의 인터페이스를 기반으로 개발자는 새로운 기능과 로직을 추가하여 토큰을 커스터마이징하고 Kaia 네트워크에 배포할 수 있습니다.

For more information, refer to the official [KIP-17 documentation](https://kips.kaia.io/KIPs/kip-17).

- An example implementation is available at [https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol](https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol).

## 카이아 서비스체인을 위한 토큰 표준 <a id="token-standards-for-klaytn-service-chain"></a>

서비스체인이란 카이아의 메인 블록체인 네트워크에 앵커링되는 카이아의 사이드체인을 의미합니다. 서비스체인을 구현할 때, 메인체인과 서비스체인 간의 밸류 전송을 지원하기 위해 특별한 유형의 컨트랙트가 사용됩니다. 이러한 컨트랙트는 현재 개발 중이며, 준비가 완료되면 카이아 서비스체인을 위한 토큰 사양이 KlaytnDocs에 제공될 예정입니다.

## ERC-20 및 ERC-721에 대한 참고사항 <a id="notes-on-erc-20-and-erc-721"></a>

Kaia는 토큰 표준으로 KIP-7과 KIP-17을 발표했기 때문에, 대체 가능한 토큰과 대체 불가능한 토큰 컨트랙트는 각각 ERC-20과 ERC-721을 따르기보다는 KIP-7과 KIP-17에 따라 구현할 것을 권장합니다.
KIP-7과 KIP-17은 ERC-20과 ERC-721을 기반으로 하지만, 카이아에 맞게 조정되었기 때문에 카이아 생태계에 더 적합합니다. 그러나 ERC-20과 ERC-721은 여전히 Kaia 네트워크에서 지원되지만, 카이아 생태계의 다양한 도구와 호환되지 않을 수 있습니다.
For more information about the differences on token standards, please visit [KIP-7](https://kips.kaia.io/KIPs/kip-7#differences-with-erc-20) and [KIP-17](https://kips.kaia.io/KIPs/kip-17#differences-from-erc-721).
