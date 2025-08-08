# Kaia Compatible Tokens (KCTs)

Kaia Compatible Token (KCT) is a special type of smart contract that implements certain technical specifications. Everyone who wants to issue tokens on top of Kaia must follow the specification.  

Token standards are defined in Kaia such as [KIP-7](https://kips.kaia.io/KIPs/kip-7) and [KIP-17](https://kips.kaia.io/KIPs/kip-17).

Other KCTs can be defined to meet certain technical specifications. If anyone needs other token standards, please visit [Kaia Improvement Proposal](https://github.com/kaiachain/KIPs) and propose a new token standard.

## Fungible Token Standard \(KIP-7\) <a id="fungible-token-standard-kip-7"></a>

Fungible tokens are tokens that have properties of uniformity and divisibility. Every fungible token is interchangeable as each unit of token possesses the same value. Just like every dollar bill has the same value of one dollar. Since fungibility is essential feature to crypto currency in most cases, large proportion of blockchain tokens are fungible tokens.

To implement these properties with smart contracts, KIP-7 token standard can be used. KIP-7-compatible tokens implement the following interface. Please note that [KIP-13](https://kips.kaia.io/KIPs/kip-13) must be implemented together. For wallet applications, [wallet interface](https://kips.kaia.io/KIPs/kip-7#wallet-interface) can be implemented.

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

Based on the interface above, developers may customize tokens by adding new features and logics, and deploy them on Kaia network.

For more information, refer to the official [KIP-7 documentation](https://kips.kaia.io/KIPs/kip-7).

* An example implementation is available at [https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol](https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol).

## Non-fungible Token Standard \(KIP-17\) <a id="non-fungible-token-standard-kip-17"></a>

Non-fungible token \(NFT\) is a special type of token that represents a unique asset. As the name non-fungible implies, every single token is unique and non-divisible. This uniqueness of non-fungible token opens up new horizons of asset digitization. For example, it can be used to represent digital art, game items, or any kind of unique assets and allow people to trade them.

For example, a blockchain collection game [Cryptokitties](https://www.cryptokitties.co/) implements non-fungible token to represent different kitties that have different genetic information. Every kitty is unique and non-interchangeable, resulting in different values for different kitty tokens.

To implement non-fungible token, [KIP-17](https://kips.kaia.io/KIPs/kip-17) can be used. KIP-17 token contracts implement the following interface. Please note that [KIP-13](https://kips.kaia.io/KIPs/kip-13) must be implemented together. For wallet applications, [wallet interface](https://kips.kaia.io/KIPs/kip-17#wallet-interface) can be implemented.

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

Based on the interface above, developers may customize tokens by adding new features and logics, and deploy them on Kaia network.

For more information, refer to the official [KIP-17 documentation](https://kips.kaia.io/KIPs/kip-17).

* An example implementation is available at [https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol](https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol).

## Token Standards for Kaia Service Chain <a id="token-standards-for-kaia-service-chain"></a>

Service chain refers to Kaia's side chain that anchors to Kaia's main blockchain network. When implementing a service chain, special type of contracts are used to support value transfer between the main chain and the service chain. These contracts are currently under development, and when they are ready, the token specifications for Kaia service chain will be provided on KaiaDocs.

## Notes on ERC-20 and ERC-721 <a id="notes-on-erc-20-and-erc-721"></a>
Since Kaia published KIP-7 and KIP-17 as its token standards, it is recommended to implement fungible and non-fungible token contracts according to KIP-7 and KIP-17, respectively, rather than following ERC-20 and ERC-721.
KIP-7 and KIP-17 are based on ERC-20 and ERC-721, but they are tailored for Kaia and thus more suitable on Kaia ecosystem. Yet ERC-20 and ERC-721 are still supported on Kaia network, they may not be compatible with various tools in Kaia ecosystem. 
For more information about the differences on token standards, please visit [KIP-7](https://kips.kaia.io/KIPs/kip-7#differences-with-erc-20) and [KIP-17](https://kips.kaia.io/KIPs/kip-17#differences-from-erc-721).
