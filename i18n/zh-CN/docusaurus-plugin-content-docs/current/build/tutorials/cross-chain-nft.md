# 利用链式链接 CCIP 在 Kaia 上构建跨链 NFT：实用指南

## 介绍

NFT 已成为区块链技术最广为人知的用例之一，能够创建独一无二、可验证的数字资产。 然而，传统的 NFT 实现方式被束缚在单个区块链上。 这种限制降低了灵活性，使资产无法在社区、流动性和效用可能不同的生态系统中自由流动。

跨链 NFT 允许 NFT 在区块链之间无缝移动，同时保留其唯一性和出处，从而解决了这一难题。 借助 Chainlink 的跨链互操作性协议 (CCIP)，开发人员可以使用标准化的安全消息框架在链之间建立可靠的桥梁。

在本指南中，您将使用 "先烧后铸 "模式构建和部署跨链 NFT。 NFT 将在源链上刻录，并以相同的 tokenId 和元数据在目标链上重新铸模，确保任何时候都只存在一个有效副本。

## 要求

开始之前，请确保您已做好以下设置：

- [Node.js](https://nodejs.org/) 和 [npm](https://www.npmjs.com/)
- 硬礼帽
  - 安装：npm install --save-dev hardhat
  - 初始化项目： `npx hardhat --init`
- [MetaMask](https://metamask.io/en-GB/download) 钱包
  - 创建或设置开发钱包。
  - 将 Kaia Kairos 测试网络和以太坊 Sepolia 网络添加到 MetaMask 中。
- 从水龙头测试代币
  - [KAIA](https://faucet.kaia.io/): 在部署合约或发送交易时支付 Kaia 上的燃气费。
  - [LINK](https://faucets.chain.link/kaia-testnet) (testnet)：使用 LINK 支付时涵盖 CCIP 费用。
  - [Sepolia ETH](https://faucets.chain.link/sepolia): 支付 Sepolia 上的燃气费，如果选择，还可支付本地 ETH 中的 CCIP 费用。
- [Filebase](https://filebase.com/) 账户
  - 需要上传和检索 NFT 元数据（IPFS 存储）。

## 跨链 NFT 如何工作？

NFT 是记录在单一区块链上的唯一数字代币。 其核心行为，包括铸币、转让和所有权，由与该链绑定的智能合约定义。 正因为如此，如果没有额外的机制，NFT 无法自然地在区块链之间移动。 为了实现互操作性，开发人员会在多个链上部署配套合约，并通过跨链消息传递将它们连接起来。 这就是跨链 NFT：存在于不同区块链上的等价代币，但在任何时候都只有一个副本处于活动状态。

跨链 NFT 通常有三种实现方式：

- **焚烧和铸币**：在源链上烧制 NFT，然后在目的链上铸造等价物。

- **锁定和铸币**：在源链上锁定 NFT，并在目标链上铸造副本。 返回时需要烧毁复制品才能解锁原件。

- **锁定和解锁**：在多个链上部署相同的集合。 所有者锁定一条链上的 NFT，就能解锁另一条链上的对应 NFT，确保一次只能使用一个副本。

在本指南中，我们将在跨链 NFT 中使用燃烧和薄荷模型。 NFT 将从一条链上移除，然后在另一条链上重新创建，整个过程由 Chainlink CCIP 提供动力。

## 入门

在本指南中，您将使用 Chainlink CCIP 在 Kaia Kairos Testnet 和 Ethereum Sepolia 之间铸币和传输跨链 NFT。

到最后，您将能够

- 初始化为 Kairos Testnet 和 Ethereum Sepolia 配置的 Hardhat 项目
- 将 Chainlink CCIP 合同和接口添加为依赖项
- 实施跨链 NFT 合约，为跨链转账提供烧钱机制
- 将合同部署到两个网络，并跨链发送 NFT。

### 创建硬礼帽项目

在本教程中，我们将使用 [Hardhat 3](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3) 来部署合同并与之交互。 Hardhat 3 提供了一些新功能，例如对加密密钥存储的本地支持、在 Solidity 中编写测试的能力以及改进的项目工具。

请按照以下步骤设置项目：

1. 验证 Node.js 和 npm 的安装

   运行以下命令验证 Node.js 和 npm 是否已安装：

```bash
node -v
npm -v
```

2. 初始化新项目目录

   创建一个新文件夹，导航进入，然后初始化一个 Node.js 项目：

```bash
mkdir ccip-nft-kaia-hardhat-example  
cd ccip-nft-kaia-hardhat-example  
npm init -y  
```

3. 创建 Hardhat 项目

   运行：

```bash
npx hardhat --init 
```

出现提示时，选择包含 Node.js 测试运行器和ether 的示例项目。 在当前目录下对其进行初始化，并安装所有需要的依赖项。

### 安装所需合同

安装 Chainlink CCIP 合同：

```bash
npm i @chainlink/contracts-ccip --save-dev
```

安装标准链锁合同：

```bash
npm i @chainlink/contracts --save-dev
```

安装 OpenZeppelin 合约（提供 ERC-721 和其他基本实现）：

```bash
npm i @openzeppelin/contracts --save-dev
```

## 配置 NFT 元数据

在撰写合同之前，让我们先确定一下我们要铸造的 NFT 的规格。 每个 NFT 都需要描述其名称、说明和图像的元数据，这些数据存储在一个 JSON 文件中，并托管在 IPFS 上。

在本指南中，我们将使用 Filebase 来存储图像和元数据。 如果您想创建自己的 NFT，请通过 Filebase 将图像和元数据 JSON 文件上传到 IPFS。 上传后，单击 "文件 "选项卡中的文件名并复制 IPFS URL。 它看起来类似于这样：

```bash
https://disastrous-turquoise-parakeet.myfilebase.com/ipfs/QmY1LZF8JHo2r3h4X5VzLLXtJujqnBFGTyo2aqR9joXnt8 
```

下面是您可以使用的元数据文件示例：

```json
{
    "name": "Kairos NFT",
    "description": "gkaia frens! gazuaaaaa!!!",
    "image": "https://disastrous-turquoise-parakeet.myfilebase.com/ipfs/QmRvQc4wZCp6NF7dFL4ywiWTG7FSH3KKGUAkXGgsdYfcKi"
}
```

## 编写智能合约

在本节中，您将使用由 Chainlink CCIP 支持的 "烧钱-铸币 "模式来实现在区块链之间进行 NFT 传输的合约。

在项目的合约目录下新建一个名为 "CrosschainNFT.sol "的文件，并粘贴以下代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Client} from "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";
import {IAny2EVMMessageReceiver} from "@chainlink/contracts-ccip/contracts/interfaces/IAny2EVMMessageReceiver.sol";
import {OwnerIsCreator} from "@chainlink/contracts/src/v0.8/shared/access/OwnerIsCreator.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
 // Source chain is Ethereum Sepolia
 // Destination chain is Kairos Testnet
contract CrosschainNFT is ERC721, ERC721URIStorage, ERC721Burnable, IAny2EVMMessageReceiver, ReentrancyGuard, OwnerIsCreator {
    using SafeERC20 for IERC20;
    enum PayFeesIn {
        Native,
        LINK
    }
    error InvalidRouter(address router);
    error OnlyOnEthereumSepolia();
    error NotEnoughBalanceForFees(uint256 currentBalance, uint256 calculatedFees);
    error NothingToWithdraw();
    error FailedToWithdrawEth(address owner, address target, uint256 value);
    error ChainNotEnabled(uint64 chainSelector);
    error SenderNotEnabled(address sender);
    error OperationNotAllowedOnCurrentChain(uint64 chainSelector);
    struct crosschainNFTDetails {
        address crosschainNFTAddress;
        bytes ccipExtraArgsBytes;
    }
    uint256 constant ETHEREUM_SEPOLIA_CHAIN_ID = 11155111;
    string tokenNFTURI = "https://disastrous-turquoise-parakeet.myfilebase.com/ipfs/QmY1LZF8JHo2r3h4X5VzLLXtJujqnBFGTyo2aqR9joXnt8";
    IRouterClient internal immutable i_ccipRouter;
    LinkTokenInterface internal immutable i_linkToken;
    uint64 private immutable i_currentChainSelector;
    uint256 private _nextTokenId;
    mapping(uint64 destChainSelector => crosschainNFTDetails crosschainNFTPerChain) public s_chains;
    event ChainEnabled(uint64 chainSelector, address xNftAddress, bytes ccipExtraArgs);
    event ChainDisabled(uint64 chainSelector);
    event CrossChainSent(
        address from, address to, uint256 tokenId, uint64 sourceChainSelector, uint64 destinationChainSelector
    );
    event CrossChainReceived(
        address from, address to, uint256 tokenId, uint64 sourceChainSelector, uint64 destinationChainSelector
    );
    modifier onlyRouter() {
        if (msg.sender != address(i_ccipRouter)) {
            revert InvalidRouter(msg.sender);
        }
        _;
    }
    modifier onlyOnEthereumSepolia() {
        if (block.chainid != ETHEREUM_SEPOLIA_CHAIN_ID) {
            revert OnlyOnEthereumSepolia();
        }
        _;
    }
    modifier onlyEnabledChain(uint64 _chainSelector) {
        if (s_chains[_chainSelector].crosschainNFTAddress == address(0)) {
            revert ChainNotEnabled(_chainSelector);
        }
        _;
    }
    modifier onlyEnabledSender(uint64 _chainSelector, address _sender) {
        if (s_chains[_chainSelector].crosschainNFTAddress != _sender) {
            revert SenderNotEnabled(_sender);
        }
        _;
    }
    modifier onlyOtherChains(uint64 _chainSelector) {
        if (_chainSelector == i_currentChainSelector) {
            revert OperationNotAllowedOnCurrentChain(_chainSelector);
        }
        _;
    }
    constructor(address ccipRouterAddress, address linkTokenAddress, uint64 currentChainSelector)
        ERC721("Cross Chain NFT", "XNFT")
    {
        if (ccipRouterAddress == address(0)) revert InvalidRouter(address(0));
        i_ccipRouter = IRouterClient(ccipRouterAddress);
        i_linkToken = LinkTokenInterface(linkTokenAddress);
        i_currentChainSelector = currentChainSelector;
    }
    function mint() external onlyOnEthereumSepolia {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenNFTURI);
    }
    function enableChain(uint64 chainSelector, address crosschainNFTAddress, bytes memory ccipExtraArgs)
        external
        onlyOwner
        onlyOtherChains(chainSelector)
    {
        s_chains[chainSelector] = crosschainNFTDetails({crosschainNFTAddress: crosschainNFTAddress, ccipExtraArgsBytes: ccipExtraArgs});
        emit ChainEnabled(chainSelector, crosschainNFTAddress, ccipExtraArgs);
    }
    function disableChain(uint64 chainSelector) external onlyOwner onlyOtherChains(chainSelector) {
        delete s_chains[chainSelector];
        emit ChainDisabled(chainSelector);
    }
    function crossChainTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        uint64 destinationChainSelector,
        PayFeesIn payFeesIn
    ) external nonReentrant onlyEnabledChain(destinationChainSelector) returns (bytes32 messageId) {
        string memory tokenUri = tokenURI(tokenId);
        _burn(tokenId);
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(s_chains[destinationChainSelector].crosschainNFTAddress),
            data: abi.encode(from, to, tokenId, tokenUri),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: s_chains[destinationChainSelector].ccipExtraArgsBytes,
            feeToken: payFeesIn == PayFeesIn.LINK ? address(i_linkToken) : address(0)
        });
        // Get the fee required to send the CCIP message
        uint256 fees = i_ccipRouter.getFee(destinationChainSelector, message);
        if (payFeesIn == PayFeesIn.LINK) {
            if (fees > i_linkToken.balanceOf(address(this))) {
                revert NotEnoughBalanceForFees(i_linkToken.balanceOf(address(this)), fees);
            }
            // Approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
            i_linkToken.approve(address(i_ccipRouter), fees);
            // Send the message through the router and store the returned message ID
            messageId = i_ccipRouter.ccipSend(destinationChainSelector, message);
        } else {
            if (fees > address(this).balance) {
                revert NotEnoughBalanceForFees(address(this).balance, fees);
            }
            // Send the message through the router and store the returned message ID
            messageId = i_ccipRouter.ccipSend{value: fees}(destinationChainSelector, message);
        }
        emit CrossChainSent(from, to, tokenId, i_currentChainSelector, destinationChainSelector);
    }
    /// @inheritdoc IAny2EVMMessageReceiver
    function ccipReceive(Client.Any2EVMMessage calldata message)
        external
        virtual
        override
        onlyRouter
        nonReentrant
        onlyEnabledChain(message.sourceChainSelector)
        onlyEnabledSender(message.sourceChainSelector, abi.decode(message.sender, (address)))
    {
        uint64 sourceChainSelector = message.sourceChainSelector;
        (address from, address to, uint256 tokenId, string memory tokenUri) =
            abi.decode(message.data, (address, address, uint256, string));
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
        emit CrossChainReceived(from, to, tokenId, sourceChainSelector, i_currentChainSelector);
    }
    function withdraw(address _beneficiary) public onlyOwner {
        uint256 amount = address(this).balance;
        if (amount == 0) revert NothingToWithdraw();
        (bool sent,) = _beneficiary.call{value: amount}("");
        if (!sent) revert FailedToWithdrawEth(msg.sender, _beneficiary, amount);
    }
    function withdrawToken(address _beneficiary, address _token) public onlyOwner {
        uint256 amount = IERC20(_token).balanceOf(address(this));
        if (amount == 0) revert NothingToWithdraw();
        IERC20(_token).safeTransfer(_beneficiary, amount);
    }
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    function getCCIPRouter() public view returns (address) {
        return address(i_ccipRouter);
    }
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return interfaceId == type(IAny2EVMMessageReceiver).interfaceId || super.supportsInterface(interfaceId);
    }
}
```

### 代码演练

CrosschainNFT 是一种 ERC-721 合约，它集成了 Chainlink CCIP，可在区块链之间传输 NFT。 它会在源链上刻录 NFT，并用相同的 tokenId 和 tokenURI 在目标链上重新刻录。 该合约通过 enableChain 维护经批准的目标链注册表，依靠 Chainlink 路由器（IRouterClient）进行跨链消息传递，并支持以本地天然气代币或 LINK 支付费用。

主要功能

- 启用链

允许合约所有者注册目标区块链。 它会在 s_chains 映射中存储对应的 NFT 合约地址和 CCIP 参数，将链作为有效的传输目标列入白名单。 设置完成后，会发出 ChainEnabled 事件。

- 交叉链转移从

执行 NFT 跨链转移。 它首先检查目标链是否已启用，然后检索 NFT 元数据（tokenURI）并在源链上刻录令牌。 然后，它将建立一个包含转账详情的 CCIP 报文，计算所需费用，并以 LINK 或本地天然气支付。 一旦信息通过路由器发送，就会发出 CrossChainSent 事件来记录传输过程。

现在，"CrosschainNFT.sol "的核心流程已经清楚，让我们进入下一步。

## 编译智能合约

要编译智能合约，请运行

```bash
npx hardhat build
```

## 部署智能合约

在本节中，我们将配置必要的变量，然后在 Ethereum Sepolia（源链）和 Kairos Testnet（目的链）上部署 "CrosschainNFT.sol "合约。

### 使用加密密钥库

Hardhat 3 的优势之一是能将私钥和 RPC URL 等敏感值存储在加密的密钥库中，而不是纯文本文件中。 在本指南中，我们将为 Sepolia 和 Kairos 的 _PRIVATE_KEY_ 和 _RPC URL_ 加密。

**添加私人密钥**

```bash
npx hardhat keystore set PRIVATE_KEY
```

第一次运行该命令时，Hardhat 会提示你为密钥存储创建一个密码。 每次添加或更新值时都需要这个密码。

**为每个网络添加 RPC URL**

```bash
npx hardhat keystore set KAIROS_RPC_URL
npx hardhat keystore set SEPOLIA_RPC_URL
```

最后，编辑 `hardhat.config.ts` 文件，加载这些加密值并配置两个网络。

```typescript
import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable } from "hardhat/config";
const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    kairosTestnet: {
      type: "http",
      chainType: "l1",
      url: configVariable("KAIROS_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
    ethereumSepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
};
export default config;
```

下一步是分别在 Ethereum Sepolia 和 Kairos Testnet 上部署 CrosschainNFT 智能合约。

### 在以太坊 Sepolia 上部署 CrosschainNFT.sol

部署前，从 [Chainlink CCIP Directory](https://docs.chain.link/ccip/directory/testnet/chain/ethereum-testnet-sepolia) 中获取以太坊 Sepolia 的以下值：

- 链条选择器
- CCIP 路由器地址
- LINK 令牌地址

您的部署脚本将需要这些值。 接下来，导航到项目中的_ignition/modules_文件夹，创建一个名为 "deployEthereumSepolia.ts "的新文件，并粘贴以下代码：

```typescript
// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const ETHEREUM_SEPOLIA_ROUTER_ADDRESS = `0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59`;
const ETHEREUM_SEPOLIA_LINK_TOKEN_ADDRESS = `0x779877A7B0D9E8603169DdbD7836e478b4624789`;
const ETHEREUM_SEPOLIA_CHAIN_SELECTOR = `16015286601757825753`;
const CrosschainNFTSepoliaModule = buildModule("CrosschainNFTSepoliaModule", (m) => {
  const crosschainNFTSepolia = m.contract("CrosschainNFT", [ETHEREUM_SEPOLIA_ROUTER_ADDRESS, ETHEREUM_SEPOLIA_LINK_TOKEN_ADDRESS, ETHEREUM_SEPOLIA_CHAIN_SELECTOR], {
  });
  return { crosschainNFTSepolia };
});
export default CrosschainNFTSepoliaModule;
```

运行部署脚本：

```bash
npx hardhat ignition deploy ignition/modules/deployEthereumSepolia.ts --network ethereumSepolia
```

### 将 CrosschainNFT.sol 部署到 Kairos 测试网

部署前，从 [Chainlink CCIP Directory](https://docs.chain.link/ccip/directory/testnet/chain/kaia-testnet-kairos) 中获取下列 Kairos Testnet 的值：

- 链条选择器
- CCIP 路由器地址
- LINK 令牌地址

您的部署脚本将需要这些值。 然后，导航到项目中的 _ignition/modules_ 文件夹，创建一个名为 `deployKairosTestnet.ts` 的新文件，并粘贴以下代码：

```typescript
// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const KAIROS_TESTNET_ROUTER_ADDRESS = `0x41477416677843fCE577748D2e762B6638492755`;
const KAIROS_TESTNET_LINK_TOKEN_ADDRESS = `0xAF3243f975afe2269Da8Ffa835CA3A8F8B6A5A36`;
const KAIROS_TESTNET_CHAIN_SELECTOR = `2624132734533621656`;
const CrosschainNFTKairosModule = buildModule("CrosschainNFTKairosModule", (m) => {
  const crosschainNFTKairos = m.contract("CrosschainNFT", [KAIROS_TESTNET_ROUTER_ADDRESS, KAIROS_TESTNET_LINK_TOKEN_ADDRESS, KAIROS_TESTNET_CHAIN_SELECTOR], {
  });
  return { crosschainNFTKairos };
});
export default CrosschainNFTKairosModule;
```

运行部署脚本：

```bash
npx hardhat ignition deploy ignition/modules/deployKairosTestnet.ts --network kairosTestnet
```

## 与智能合约互动

在本节中，我们将分别通过执行 enableChain、mint 和 crosschainTransfer 函数与已部署的 CrosschainNFT 智能合约进行交互。

### 步骤 1：在以太坊 Sepolia 上，调用 enableChain

在调用 enableChain 之前，请准备好以下值：

- **Sepolia合约地址**：部署在以太坊Sepolia上的CrosschainNFT.sol合约的地址。
- **Kairos 合约地址**：部署在 Kairos Testnet 上的 CrosschainNFT.sol 合约的地址。
- **链选择器**：2624132734533621656（Kairos Testnet 的 CCIP 链选择器）。
- **CCIP extraArgs**：0x97a657c900000000000000000000000000000000000000000007A120 （这是 extraArgs 的默认编码值，gasLimit 设置为 500,000）。

接下来，在脚本文件夹中新建一个 TypeScript 文件，命名为 "enableChainSepolia.ts"，并粘贴以下代码：

```typescript
// scripts/enableChainSepolia.ts
import { network } from "hardhat";
async function main() {
  const connection = await network.connect({
    network: "ethereumSepolia"
  });
  const { ethers } = connection;
  const [signer] = await ethers.getSigners();
  console.log(`Using account: ${signer.address}`);
  // Get the contract factory by name
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);
  // Contract addresses and parameters
  const crosschainNFTAddressEthereumSepolia = `0xb1fe42BBd7842703820C7480c22409b872319B22`;
  const crosschainNFTAddressKairosTestnet = `0x8c464Bb9Bf364F68b898ed0708b8f5F66EF6Cfb1`;
  const chainSelectorKairosTestnet = `2624132734533621656`;
  const ccipExtraArgs = `0x97a657c9000000000000000000000000000000000000000000000000000000000007A120`;
  // Attach to the deployed contract
  const crosschainNFTSepolia = CrosschainNFT.attach(crosschainNFTAddressEthereumSepolia);
  console.log(`Enabling chain for Kairos Testnet...`);
  const tx = await crosschainNFTSepolia.enableChain(
    chainSelectorKairosTestnet,
    crosschainNFTAddressKairosTestnet,
    ccipExtraArgs
  );
  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);
  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`Chain enabled successfully!`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

运行以下命令调用该函数：

```bash
npx hardhat run scripts/enableChainSepolia.ts --network ethereumSepolia
```

### 步骤 2：在 Kairos Testnet 上，调用 enableChain

在调用 enableChain 之前，请准备好以下值：

- **Kairos合约地址**：部署在Kairos测试网上的CrosschainNFT.sol合约的地址
- **Sepolia合约地址**：部署在以太坊Sepolia上的CrosschainNFT.sol合约的地址
- **链选择器**：16015286601757825753 （Kairos Testnet 的 CCIP 链选择器）
- **CCIP extraArgs**：0x97a657c900000000000000000000000000000000000000000007A120 （这是 extraArgs 的默认编码值，气体限值设置为 500,000）

接下来，在脚本文件夹中新建一个 TypeScript 文件，命名为 "enableChainKairos.ts"，并粘贴以下代码：

```typescript
// scripts/enableChainKairos.ts
import { network } from "hardhat";
async function main() {
  const connection = await network.connect({
    network: "kairosTestnet"
  });
  const { ethers } = connection;
  const [signer] = await ethers.getSigners();
  console.log(`Using account: ${signer.address}`);
  // Get the contract factory by name
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);
  // Contract addresses and parameters 
  const crosschainNFTAddressKairosTestnet = `0x8c464Bb9Bf364F68b898ed0708b8f5F66EF6Cfb1`;
  const crosschainNFTAddressEthereumSepolia = `0xb1fe42BBd7842703820C7480c22409b872319B22`;
  const chainSelectorEthereumSepolia = `16015286601757825753`;
  const ccipExtraArgs = `0x97a657c9000000000000000000000000000000000000000000000000000000000007A120`;
  // Attach to the deployed contract on Kairos
  const crosschainNFTKairos = CrosschainNFT.attach(crosschainNFTAddressKairosTestnet);
  console.log(`Enabling chain for Ethereum Sepolia...`);
  const tx = await crosschainNFTKairos.enableChain(
    chainSelectorEthereumSepolia,         
    crosschainNFTAddressEthereumSepolia,    
    ccipExtraArgs                 
  );
  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);
  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`Chain enabled successfully!`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

运行以下命令调用该函数：

```bash
npx hardhat run scripts/enableChainKairos.ts --network KairosTestnet
```

### 第 3 步：在以太坊 Sepolia 上使用 LINK 为合约提供资金

为支付 CCIP 费用，请使用 LINK 为部署在以太坊 Sepolia（crosschainNFTAddressEthereumSepolia）上的 CrosschainNFT 合约提供资金。 您可以从提供的 [水龙头](https://faucets.chain.link/sepolia) 中获取测试 LINK。 在本指南中，发送 3 个 LINK 即可。

![](/img/build/tutorials/cc-ccip-fund-link.png)

### 步骤 4：在以太坊 Sepolia 上铸币一个新的 CrosschainNFT

接下来，在部署到以太坊 Sepolia 的 CrosschainNFT 合约上创建一个新的 NFT。

在脚本文件夹中创建一个新的 TypeScript 文件，命名为 "mint.ts"，并粘贴以下代码：

```typescript
// scripts/mint.ts
import { network } from "hardhat";
async function main() {
  // Connect to the network
  const connection = await network.connect({
    network: "ethereumSepolia"
  });
if (connection.networkName !== "ethereumSepolia") {
    console.error(`Must be called from Ethereum Sepolia`);
    process.exitCode = 1;
    return;
  }
  const { ethers } = connection;
  const [signer] = await ethers.getSigners();
  console.log(`Using account: ${signer.address}`);
  // Get the contract factory
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);
  const crosschainNFTAddressEthereumSepolia = `0xb1fe42BBd7842703820C7480c22409b872319B22`
  // Attach to the deployed contract
  const crosschainNFT = CrosschainNFT.attach(crosschainNFTAddressEthereumSepolia);
  console.log(`Minting NFT...`);
  const tx = await crosschainNFT.mint();
  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);
  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`NFT minted successfully!`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

该脚本将处理铸币过程，并为跨链传输 NFT 做好准备。

运行以下命令调用该函数：

```bash
npx hardhat run scripts/mint.ts --network ethereumSepolia
```

### 步骤 5：跨链转移 NFT

在以太坊 Sepolia 上，您将调用 crossChainTransferFrom 函数将您的 NFT 发送到 Kairos Testnet。

准备以下值：

- **来自**：您在以太坊 Sepolia 上的 EOA 地址
- **收件人**\*：收件人在 Kairos Testnet 上的 EOA 地址（也可以是您自己的地址）
- **tokenId**：要转移的 NFT 的 ID
- **目标链选择器**：2624132734533621656（Kairos Testnet 的 CCIP 链选择器）
- **payFeesIn**：1（表示将在 LINK 中支付 CCIP 费用）

运行传输脚本

在脚本文件夹中新建一个 TypeScript 文件，命名为 "crossChainTransferNFT.ts"，并粘贴以下代码：

```typescript
// scripts/crossChainTransferNFT.ts
import { network } from "hardhat";
async function main() {
  // Connect to the network
  const connection = await network.connect({
    network: "ethereumSepolia"
  });
    // Check if we're on the correct network
  if (connection.networkName !== "ethereumSepolia") {
    console.error(`Must be called from Ethereum Sepolia`);
    process.exitCode = 1;
    return;
  }
  const { ethers } = connection;
  const [signer] = await ethers.getSigners();
  console.log(`Using account: ${signer.address}`);
  // Get the contract factory
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);
  const crosschainNFTAddressEthereumSepolia = `0xb1fe42BBd7842703820C7480c22409b872319B22`;
  // Transfer parameters
  const from = `0x7b467A6962bE0ac80784F131049A25CDE27d62Fb`;
  const to = `0x7b467A6962bE0ac80784F131049A25CDE27d62Fb`;
  const tokenId = 0; // Put NFT token id here
  const destinationChainSelector = "2624132734533621656"; // Kairos Testnet
  const payFeesIn = 1; // 0 - Native, 1 - LINK
  // Attach to the deployed contract
  const crosschainNFT = CrosschainNFT.attach(crosschainNFTAddressEthereumSepolia);
  const tx = await crosschainNFT.crossChainTransferFrom(
    from,
    to,
    tokenId,
    destinationChainSelector,
    payFeesIn
  );
  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);
  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`Cross-chain transfer initiated successfully!`);
  console.log(`Note: The NFT will arrive on Kairos Testnet after CCIP processes the message.`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

然后用

```bash
npx hardhat run scripts/crossChainTransferNFT.ts --network ethereumSepolia
```

验证转移

您可以在 [CCIP Explorer](https://ccip.chain.link/#/side-drawer/msg/0x2a43cf8076ed6290dd0bf8bdbbc87abe2d238da43b6bf514e70909dd0f35c9db) 上监控跨链转账，在 [Kaiascan](https://kairos.kaiascan.io/nft/0x7dcdaa882603b1cfeee42d1c382a1ecba595d87c/0?tabId=nftTokenTransfer&page=1) 上确认交易。

![](/img/build/tutorials/cc-nft-ccip-explorer.png)

![](/img/build/tutorials/cc-nft-ccip-kaiascan.png)

NFT 到达 Kairos Testnet 后，将其添加到您的 MetaMask 钱包中：

1. 在 MetaMask 中打开 NFT 选项卡。
2. 单击导入 NFT。
3. 输入 Kairos Testnet 上的 CrosschainNFT 合约地址和您收到的 tokenId（例如 0）。

现在，您的 NFT 将出现在 MetaMask 钱包中。

![](/img/build/tutorials/cc-ccip-mm-view-nft.png)

## 结论

在本教程中，您将学习如何使用 Chainlink CCIP 在 Kaia Kairos Testnet 和 Ethereum Sepolia 之间使用烧毁和铸币模型传输 NFT。

要深入了解 CCIP 并探索其他用例，请访问官方[Chainlink CCIP Documentation](https://docs.chain.link/ccip)。




