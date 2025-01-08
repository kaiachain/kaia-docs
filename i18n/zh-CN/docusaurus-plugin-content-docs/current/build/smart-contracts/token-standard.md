# Kaia 兼容代币（KCT）

Kaia Compatible Token（KCT）是一种特殊类型的智能合约，它实现了某些技术规范。 每个想在 Kaia 上发行代币的人都必须遵守规范。

Kaia 中定义了令牌标准，如 [KIP-7](https://kips.kaia.io/KIPs/kip-7) 和 [KIP-17](https://kips.kaia.io/KIPs/kip-17)。

还可以定义其他 KCT，以满足某些技术规格。 如果有人需要其他令牌标准，请访问 [Kaia Improvement Proposal](https://github.com/kaiachain/KIPs)，提出新的令牌标准。

## 可折叠令牌标准（KIP-7）<a id="fungible-token-standard-kip-7"></a>

可变代币是具有均匀性和可分割性的代币。 每个可替代代币都可以互换，因为每个单位的代币都具有相同的价值。 就像每张一元纸币都有一元的价值一样。 在大多数情况下，可替代性是加密货币的基本特征，因此大部分区块链代币都是可替代代币。

要通过智能合约实现这些属性，可以使用 KIP-7 令牌标准。 与 KIP-7 兼容的令牌实现了以下接口。 请注意，[KIP-13](https://kips.kaia.io/KIPs/kip-13) 必须同时执行。 对于钱包应用，可执行 [钱包接口](https://kips.kaia.io/KIPs/kip-7#wallet-interface)。

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

在上述界面的基础上，开发者可以通过添加新功能和逻辑来定制令牌，并将其部署到 Kaia 网络上。

更多信息，请参阅官方 [KIP-7 文档](https://kips.kaia.io/KIPs/kip-7)。

- 实施示例见 [https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol](https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol)。

## Non-fungible Token Standard\(KIP-17\)<a id="non-fungible-token-standard-kip-17"></a>

Non-fungible token\(NFT\) 是一种特殊类型的代币，代表一种独特的资产。 正如 "不可篡改 "这个名字所暗示的，每一个代币都是独一无二、不可分割的。 不可篡改令牌的这种独特性为资产数字化开辟了新天地。 例如，它可以用来表示数字艺术、游戏物品或任何类型的独特资产，并允许人们进行交易。

例如，区块链收集游戏[Cryptokitties](https://www.cryptokitties.co/)实现了不可篡改的代币，以代表具有不同遗传信息的不同小猫。 每只小猫都是独一无二的，不可互换，因此不同的小猫代币有不同的价值。

要实现不可篡改令牌，可以使用 [KIP-17](https://kips.kaia.io/KIPs/kip-17)。 KIP-17 令牌合约执行以下接口。 请注意，[KIP-13](https://kips.kaia.io/KIPs/kip-13) 必须同时执行。 对于钱包应用，可执行 [钱包接口](https://kips.kaia.io/KIPs/kip-17#wallet-interface)。

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

在上述界面的基础上，开发者可以通过添加新功能和逻辑来定制令牌，并将其部署到 Kaia 网络上。

更多信息，请参阅官方 [KIP-17 文档](https://kips.kaia.io/KIPs/kip-17)。

- 实施示例见 [https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol](https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol)。

## Kaia 服务链的令牌标准<a id="token-standards-for-kaia-service-chain"></a>

服务链指的是锚定 Kaia 主区块链网络的 Kaia 侧链。 在实施服务链时，要使用特殊类型的合同来支持主链和服务链之间的价值转移。 这些合约目前正在开发中，一旦准备就绪，Kaia 服务链的令牌规格将在 KaiaDocs 上提供。

## 关于 ERC-20 和 ERC-721 的说明<a id="notes-on-erc-20-and-erc-721"></a>

由于 Kaia 发布了 KIP-7 和 KIP-17 作为其代币标准，因此建议分别根据 KIP-7 和 KIP-17 执行可替换和不可替换代币合约，而不是遵循 ERC-20 和 ERC-721。
KIP-7 和 KIP-17 基于 ERC-20 和 ERC-721，但它们是为 Kaia 量身定制的，因此更适合 Kaia 生态系统。 尽管 Kaia 网络仍然支持 ERC-20 和 ERC-721，但它们可能与 Kaia 生态系统中的各种工具不兼容。
有关令牌标准差异的更多信息，请访问 [KIP-7](https://kips.kaia.io/KIPs/kip-7#differences-with-erc-20) 和 [KIP-17](https://kips.kaia.io/KIPs/kip-17#differences-from-erc-721)。
