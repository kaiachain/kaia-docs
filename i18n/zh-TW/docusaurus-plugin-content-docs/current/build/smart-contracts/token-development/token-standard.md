# Kaia 兼容代幣（KCT）

Kaia Compatible Token（KCT）是一種特殊類型的智能合約，它實現了某些技術規範。 每個想在 Kaia 上發行代幣的人都必須遵守規範。

Kaia 中定義了令牌標準，如 [KIP-7](https://kips.kaia.io/KIPs/kip-7) 和 [KIP-17](https://kips.kaia.io/KIPs/kip-17)。

還可以定義其他 KCT，以滿足某些技術規格。 如果有人需要其他令牌標準，請訪問 [Kaia Improvement Proposal](https://github.com/kaiachain/KIPs)，提出新的令牌標準。

## 可摺疊令牌標準（KIP-7）<a id="fungible-token-standard-kip-7"></a>

可變代幣是具有均勻性和可分割性的代幣。 每個可替代代幣都可以互換，因為每個單位的代幣都具有相同的價值。 就像每張一元紙幣都有一元的價值一樣。 在大多數情況下，可替代性是加密貨幣的基本特徵，因此大部分區塊鏈代幣都是可替代代幣。

要通過智能合約實現這些屬性，可以使用 KIP-7 令牌標準。 與 KIP-7 兼容的令牌實現了以下接口。 請注意，[KIP-13](https://kips.kaia.io/KIPs/kip-13) 必須同時執行。 對於錢包應用，可執行 [錢包接口](https://kips.kaia.io/KIPs/kip-7#wallet-interface)。

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

在上述界面的基礎上，開發者可以通過添加新功能和邏輯來定製令牌，並將其部署到 Kaia 網絡上。

更多信息，請參閱官方 [KIP-7 文檔](https://kips.kaia.io/KIPs/kip-7)。

- 實施示例見 [https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol](https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol)。

## Non-fungible Token Standard\(KIP-17\)<a id="non-fungible-token-standard-kip-17"></a>

Non-fungible token\(NFT\) 是一種特殊類型的代幣，代表一種獨特的資產。 正如 "不可篡改 "這個名字所暗示的，每一個代幣都是獨一無二、不可分割的。 不可篡改令牌的這種獨特性為資產數字化開闢了新天地。 例如，它可以用來表示數字藝術、遊戲物品或任何類型的獨特資產，並允許人們進行交易。

例如，區塊鏈收集遊戲[Cryptokitties](https://www.cryptokitties.co/)實現了不可篡改的代幣，以代表具有不同遺傳信息的不同小貓。 每隻小貓都是獨一無二的，不可互換，因此不同的小貓代幣有不同的價值。

要實現不可篡改令牌，可以使用 [KIP-17](https://kips.kaia.io/KIPs/kip-17)。 KIP-17 令牌合約執行以下接口。 請注意，[KIP-13](https://kips.kaia.io/KIPs/kip-13) 必須同時執行。 對於錢包應用，可執行 [錢包接口](https://kips.kaia.io/KIPs/kip-17#wallet-interface)。

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

在上述界面的基礎上，開發者可以通過添加新功能和邏輯來定製令牌，並將其部署到 Kaia 網絡上。

更多信息，請參閱官方 [KIP-17 文檔](https://kips.kaia.io/KIPs/kip-17)。

- 實施示例見 [https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol](https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol)。

## Kaia 服務鏈的令牌標準<a id="token-standards-for-kaia-service-chain"></a>

服務鏈指的是錨定 Kaia 主區塊鏈網絡的 Kaia 側鏈。 在實施服務鏈時，要使用特殊類型的合同來支持主鏈和服務鏈之間的價值轉移。 這些合約目前正在開發中，一旦準備就緒，Kaia 服務鏈的令牌規格將在 KaiaDocs 上提供。

## 關於 ERC-20 和 ERC-721 的說明<a id="notes-on-erc-20-and-erc-721"></a>

由於 Kaia 發佈了 KIP-7 和 KIP-17 作為其代幣標準，因此建議分別根據 KIP-7 和 KIP-17 執行可替換和不可替換代幣合約，而不是遵循 ERC-20 和 ERC-721。
KIP-7 和 KIP-17 基於 ERC-20 和 ERC-721，但它們是為 Kaia 量身定製的，因此更適合 Kaia 生態系統。 儘管 Kaia 網絡仍然支持 ERC-20 和 ERC-721，但它們可能與 Kaia 生態系統中的各種工具不兼容。
有關令牌標準差異的更多信息，請訪問 [KIP-7](https://kips.kaia.io/KIPs/kip-7#differences-with-erc-20) 和 [KIP-17](https://kips.kaia.io/KIPs/kip-17#differences-from-erc-721)。
