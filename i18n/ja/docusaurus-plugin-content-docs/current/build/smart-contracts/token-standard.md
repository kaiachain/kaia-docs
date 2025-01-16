# Klaytn Compatible Tokens (KCTs)

Klaytn Compatible Token (KCT) is a special type of smart contract that implements certain technical specifications. Everyone who wants to issue tokens on top of Klaytn must follow the specification.

Kaiaでは、[KIP-7](https://kips.kaia.io/KIPs/kip-7)や[KIP-17](https://kips.kaia.io/KIPs/kip-17)といったトークンの規格が定義されている。

その他のKCTは、特定の技術仕様を満たすように定義することができる。 他のトークン規格が必要な方は、[カイア改善提案](https://github.com/kaiachain/KIPs)にアクセスして、新しいトークン規格を提案してください。

## Fungible Token Standard (KIP-7) <a id="fungible-token-standard-kip-7"></a>

菌類トークンとは、均一性と可分性の特性を持つトークンのことである。 各トークンは同じ価値を持つため、すべてのカンジブル・トークンは交換可能である。 すべてのドル紙幣が同じ1ドルの価値を持つように。 ほとんどの場合、暗号通貨には両替性が不可欠であるため、ブロックチェーントークンの大部分は両替可能なトークンである。

これらの特性をスマート・コントラクトで実装するために、KIP-7トークン標準を使用することができる。 KIP-7 互換トークンは以下のインタフェースを実装する。 なお、[KIP-13](https://kips.kaia.io/KIPs/kip-13)は必ず一緒に実装すること。 ウォレットアプリケーションのために、[ウォレットインターフェース](https://kips.kaia.io/KIPs/kip-7#wallet-interface)を実装することができる。

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

Based on the interface above, developers may customize tokens by adding new features and logics, and deploy them on Klaytn network.

詳細については、公式の[KIP-7ドキュメント](https://kips.kaia.io/KIPs/kip-7)を参照してください。

- 実装例は[https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol](https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol)にある。

## Non-fungible Token Standard (KIP-17) <a id="non-fungible-token-standard-kip-17"></a>

Non-fungible token (NFT) is a special type of token that represents a unique asset. Non-fungibleという名前が示すように、すべてのトークンは一意であり、分割不可能である。 この非可菌トークンの独自性は、資産のデジタル化に新たな地平を開く。 例えば、デジタルアート、ゲームアイテム、あるいはあらゆる種類のユニークな資産を表現し、人々がそれらを取引できるようにするために使用することができる。

例えば、ブロックチェーン・コレクション・ゲーム[Cryptokitties](https://www.cryptokitties.co/)は、異なる遺伝情報を持つ異なる子猫を表現するために、非可菌トークンを実装している。 すべてのキティは一意であり、交換不可能であるため、キティ・トークンによって価値が異なる。

非可溶性トークンを実装するには、[KIP-17](https://kips.kaia.io/KIPs/kip-17)を使用することができます。 KIP-17トークンコントラクトは以下のインタフェースを実装する。 なお、[KIP-13](https://kips.kaia.io/KIPs/kip-13)は必ず一緒に実装すること。 ウォレットアプリケーションのために、[ウォレットインターフェース](https://kips.kaia.io/KIPs/kip-17#wallet-interface)を実装することができる。

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

Based on the interface above, developers may customize tokens by adding new features and logics, and deploy them on Klaytn network.

詳しくは、公式の[KIP-17ドキュメント](https://kips.kaia.io/KIPs/kip-17)を参照してください。

- 実装例は[https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol](https://github.com/kaiachain/kaia-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol)にある。

## Token Standards for Klaytn Service Chain <a id="token-standards-for-klaytn-service-chain"></a>

Service chain refers to Klaytn's side chain that anchors to Klaytn's main blockchain network. サービス・チェーンを実施する場合、メイン・チェーンとサービス・チェーン間の価値移転をサポートするために、特別なタイプの契約が使用される。 These contracts are currently under development, and when they are ready, the token specifications for Klaytn service chain will be provided on KlaytnDocs.

## ERC-20およびERC-721に関する注意事項<a id="notes-on-erc-20-and-erc-721"></a>

Since Klaytn published KIP-7 and KIP-17 as its token standards, it is recommended to implement fungible and non-fungible token contracts according to KIP-7 and KIP-17, respectively, rather than following ERC-20 and ERC-721.
KIP-7 and KIP-17 are based on ERC-20 and ERC-721, but they are tailored for Klaytn and thus more suitable on Klaytn ecosystem. Yet ERC-20 and ERC-721 are still supported on Klaytn network, they may not be compatible with various tools in Klaytn ecosystem.
トークン規格の違いについては、[KIP-7](https://kips.kaia.io/KIPs/kip-7#differences-with-erc-20)、[KIP-17](https://kips.kaia.io/KIPs/kip-17#differences-from-erc-721)をご覧ください。
