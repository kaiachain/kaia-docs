# Building Cross-Chain NFTs on Kaia with Chainlink CCIP: A Practical Guide

## Introduction

NFTs have become one of the most recognizable use cases of blockchain technology, enabling the creation of unique, verifiable digital assets. However, traditional NFT implementations are bound to a single blockchain. This limitation reduces flexibility and prevents assets from moving freely across ecosystems where communities, liquidity, and utility may differ.

Cross-chain NFTs solve this challenge by allowing NFTs to move seamlessly between blockchains while preserving their uniqueness and provenance. With Chainlink’s Cross-Chain Interoperability Protocol (CCIP), developers can build reliable bridges between chains using a standardized, secure messaging framework.

In this guide, you will build and deploy a Crosschain NFT using the burn-and-mint model. An NFT will be burned on the source chain and re-minted on the destination chain with the same tokenId and metadata, ensuring that only one valid copy exists at any given time. 

## Prerequisites

Before you begin, make sure you have the following setup:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- Hardhat
    - Install: `npm install --save-dev hardhat`
    - Initialize a project: `npx hardhat --init`
- [MetaMask](https://metamask.io/en-GB/download) wallet
    - Create or set up a development wallet.
    - Add both the Kaia Kairos Testnet and Ethereum Sepolia network to MetaMask.
- Test tokens from faucets
    - [KAIA](https://faucet.kaia.io/): pays gas fees on Kaia when deploying contracts or sending transactions.
    - [LINK](https://faucets.chain.link/kaia-testnet) (testnet): covers CCIP fees when paying in LINK.
    - [Sepolia ETH](https://faucets.chain.link/sepolia): pays gas fees on Sepolia and can also cover CCIP fees in native ETH if selected.
- [Filebase](https://filebase.com/) account
    - Needed to upload and retrieve NFT metadata (IPFS storage).


## How Do Cross-Chain NFTs Work?

An NFT is a unique digital token recorded on a single blockchain. Its core behavior, including minting, transfers, and ownership, is defined by a smart contract tied to that chain. Because of this, an NFT cannot naturally move across blockchains without additional mechanisms. To enable interoperability, developers deploy companion contracts on multiple chains and link them through cross-chain messaging. The result is a cross-chain NFT: equivalent tokens that exist across blockchains, but only one copy is active at any given time.

Cross-chain NFTs are typically implemented in one of three ways:

- **Burn and mint**: The NFT is burned on the source chain, then an equivalent is minted on the destination chain.

- **Lock and mint**: The NFT is locked on the source chain, and a duplicate is minted on the destination. Returning requires burning the duplicate to unlock the original.

- **Lock and unlock**: Identical collections are deployed on multiple chains. An owner locks the NFT on one chain to unlock its counterpart on another, ensuring only one copy can be used at a time.

In this guide, we will use the burn and mint model for our Crosschain NFT. The NFT will be removed from one chain and recreated on another, with the entire process powered by Chainlink CCIP.

## Getting Started

In this guide, you will mint and transfer a Cross-chain NFT between Kaia Kairos Testnet and Ethereum Sepolia using Chainlink CCIP.

By the end, you will be able to:

- Initialize a Hardhat project configured for both Kairos Testnet and Ethereum Sepolia
- Add Chainlink CCIP contracts and interfaces as dependencies
- Implement a Cross-chain NFT contract with a burn-and-mint mechanism for cross-chain transfers
- Deploy the contract to both networks and send an NFT across chains. 


### Creating a Hardhat Project

In this tutorial, we will use [Hardhat 3](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3) to deploy and interact with our contract. Hardhat 3 provides new features such as native support for encrypted keystores, the ability to write tests in Solidity, and improved project tooling.

Follow the steps below to set up your project:

1. Verify Node.js and npm installation

    Run the following commands to verify that Node.js and npm are installed:

```bash
node -v
npm -v
```

2. Initialize a new project directory

    Create a new folder, navigate into it, and initialize a Node.js project:

```bash
mkdir ccip-nft-kaia-hardhat-example  
cd ccip-nft-kaia-hardhat-example  
npm init -y  
```

3. Create a Hardhat project

    Run:

```bash
npx hardhat --init 
```

When prompted, select the sample project that includes the Node.js test runner and ethers. Initialize it in the current directory and install all required dependencies.

### Installing Required Contracts

Install the Chainlink CCIP contracts:

```bash
npm i @chainlink/contracts-ccip --save-dev
```

Install the standard Chainlink contracts:

```bash
npm i @chainlink/contracts --save-dev
```

Install the OpenZeppelin contracts (provides ERC-721 and other base implementations):

```bash
npm i @openzeppelin/contracts --save-dev
```

## Configuring NFT Metadata

Before writing the contract, let’s define the specifications of the NFT we will mint. Each NFT needs metadata describing its name, description, and image, stored in a JSON file and hosted on IPFS.

For this guide, we will use Filebase to store both the image and the metadata. If you want to create your own NFT, upload your image and metadata JSON file to IPFS through Filebase. After uploading, click the file name in the Files tab and copy the IPFS URL. It will look similar to this:

```bash
https://disastrous-turquoise-parakeet.myfilebase.com/ipfs/QmY1LZF8JHo2r3h4X5VzLLXtJujqnBFGTyo2aqR9joXnt8 
```

Here is a sample metadata file you can use: 

```json
{
    "name": "Kairos NFT",
    "description": "gkaia frens! gazuaaaaa!!!",
    "image": "https://disastrous-turquoise-parakeet.myfilebase.com/ipfs/QmRvQc4wZCp6NF7dFL4ywiWTG7FSH3KKGUAkXGgsdYfcKi"
}
```

## Writing the Smart Contract

In this section, you will implement the contract that enables NFT transfers between blockchains using the burn-and-mint model powered by Chainlink CCIP.

Create a new file in your project’s contracts directory named `CrosschainNFT.sol`, and paste the following code into it:

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

### Code Walkthrough

CrosschainNFT is an ERC-721 contract that integrates Chainlink CCIP to transfer NFTs between blockchains. It burns the NFT on the source chain and re-mints it on the destination with the same tokenId and tokenURI. The contract maintains a registry of approved destination chains through enableChain, relies on the Chainlink Router (IRouterClient) for cross-chain messaging, and supports fee payments in either native gas tokens or LINK.

Key Functions

- enableChain

Allows the contract owner to register a destination blockchain. It stores the counterpart NFT contract address and CCIP arguments in the s_chains mapping, whitelisting the chain as a valid transfer target. A ChainEnabled event is emitted when the setup is complete.


- crossChainTransferFrom

Executes the transfer of an NFT across chains. It first checks that the destination chain is enabled, then retrieves the NFT metadata (tokenURI) and burns the token on the source chain. Next, it builds a CCIP message with the transfer details, calculates the required fee, and pays it in either LINK or native gas. Once the message is sent through the router, a CrossChainSent event is emitted to log the transfer.


Now that the core flow of the `CrosschainNFT.sol` is clear, let’s move on to the next step.

## Compiling the smart contracts

To compile your smart contracts, run:

```bash
npx hardhat build
```

## Deploying the Smart Contract

In this section, we will configure the necessary variables and then deploy the `CrosschainNFT.sol `contract on both Ethereum Sepolia(Source chain) and Kairos Testnet (Destination chain).

### Using the Encrypted Keystore

One of the benefits of Hardhat 3 is the ability to store sensitive values, such as private keys and RPC URLs, in an encrypted keystore instead of plain text files. In this guide, we will encrypt our *PRIVATE_KEY* and *RPC URLs* for Sepolia and Kairos.

**Add your private key**

```bash
npx hardhat keystore set PRIVATE_KEY
```

The first time you run this command, Hardhat will prompt you to create a password for the keystore. You’ll need this password whenever you add or update values.

**Add RPC URLs for each network**

```bash
npx hardhat keystore set KAIROS_RPC_URL
npx hardhat keystore set SEPOLIA_RPC_URL
```

Finally, edit your `hardhat.config.ts` file to load these encrypted values and configure the two networks.

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

The next step is to deploy the CrosschainNFT smart contract to Ethereum Sepolia and Kairos Testnet respectively.

### Deploy CrosschainNFT.sol to Ethereum Sepolia

Before deployment, get the following values for Ethereum Sepolia from the [Chainlink CCIP Directory](https://docs.chain.link/ccip/directory/testnet/chain/ethereum-testnet-sepolia):

- Chain selector
- CCIP router address
- LINK token address

These values will be required in your deployment script. Next, navigate to the *ignition/modules* folder in your project and create a new file named: `deployEthereumSepolia.ts` and paste the following code into it:

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

Run the deployment script:

```bash
npx hardhat ignition deploy ignition/modules/deployEthereumSepolia.ts --network ethereumSepolia
```

### Deploy CrosschainNFT.sol to Kairos Testnet

Before deployment, get the following values for Kairos Testnet from the [Chainlink CCIP Directory](https://docs.chain.link/ccip/directory/testnet/chain/kaia-testnet-kairos):

- Chain selector
- CCIP router address
- LINK token address

These values will be required in your deployment script. Next, navigate to the *ignition/modules* folder in your project and create a new file named: `deployKairosTestnet.ts` and paste the following code into it:

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

Run the deployment script:

```bash
npx hardhat ignition deploy ignition/modules/deployKairosTestnet.ts --network kairosTestnet
```

## Interacting with the Smart Contract

In this section, we will interact with the deployed CrosschainNFT smart contract by executing the enableChain, mint and crosschainTransfer function respectively. 

### Step 1: On Ethereum Sepolia, Call enableChain

Prepare the following values before calling enableChain:

- **Sepolia contract address**: the address of the CrosschainNFT.sol contract deployed on Ethereum Sepolia.
- **Kairos contract address**: the address of the CrosschainNFT.sol contract deployed on Kairos Testnet.
- **Chain selector**: 2624132734533621656 (the CCIP chain selector for Kairos Testnet).
- **CCIP extraArgs**: 0x97a657c9000000000000000000000000000000000000000000000000000000000007A120 (This is the default encoded value of extraArgs with a gasLimit set to 500,000).

Next, create a new TypeScript file in the scripts folder, name it: `enableChainSepolia.ts` and paste the following code into it:

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

Call the function by running the following command:

```bash
npx hardhat run scripts/enableChainSepolia.ts --network ethereumSepolia
```

### Step 2: On Kairos Testnet, Call enableChain

Prepare the following values before calling enableChain:

- **Kairos contract address**: the address of the CrosschainNFT.sol contract deployed on Kairos Testnet
- **Sepolia contract address**: the address of the CrosschainNFT.sol contract deployed on Ethereum Sepolia
- **Chain selector**: 16015286601757825753 (the CCIP chain selector for Kairos Testnet)
- **CCIP extraArgs**: 0x97a657c9000000000000000000000000000000000000000000000000000000000007A120 (This is the default encoded value of extraArgs with a gasLimit set to 500,000)

Next, create a new TypeScript file in the scripts folder, name it: `enableChainKairos.ts`  and paste the following code into it:

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

Call the function by running the following command:

```bash
npx hardhat run scripts/enableChainKairos.ts --network KairosTestnet
```

### Step 3: Fund the Contract with LINK on Ethereum Sepolia

To cover CCIP fees, fund the CrosschainNFT contract deployed on Ethereum Sepolia (crosschainNFTAddressEthereumSepolia) with LINK. You can obtain test LINK from the [faucet](https://faucets.chain.link/sepolia) provided. For this guide, sending 3 LINK will be sufficient.

![](/img/build/tutorials/cc-ccip-fund-link.png)

### Step 4: Mint a New CrosschainNFT on Ethereum Sepolia

Next, mint a fresh NFT on the CrosschainNFT contract deployed to Ethereum Sepolia.

Create a new TypeScript file in the scripts folder, name it `mint.ts` and paste the following code into it:

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

This script will handle the minting process and prepare the NFT for cross-chain transfer.

Call the function by running the following command:

```bash
npx hardhat run scripts/mint.ts --network ethereumSepolia
```

### Step 5: Transfer the NFT Across Chains

On Ethereum Sepolia, you will call the crossChainTransferFrom function to send your NFT to Kairos Testnet.

Pepare the following values:

- **from**: your EOA address on Ethereum Sepolia
- **to**: the recipient’s EOA address on Kairos Testnet (this can also be your own address)
- **tokenId**: the ID of the NFT you want to transfer
- **destinationChainSelector**: 2624132734533621656 (the CCIP chain selector for Kairos Testnet)
- **payFeesIn**: 1 (indicates that CCIP fees will be paid in LINK)

Run the transfer script

Create a new TypeScript file in the scripts folder, name it `crossChainTransferNFT.ts` and paste the following code into it:

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

Then execute the script with:

```bash
npx hardhat run scripts/crossChainTransferNFT.ts --network ethereumSepolia
```

Verify the transfer

You can monitor the cross-chain transfer on [CCIP Explorer](https://ccip.chain.link/#/side-drawer/msg/0x2a43cf8076ed6290dd0bf8bdbbc87abe2d238da43b6bf514e70909dd0f35c9db) and confirm the transaction on [Kaiascan](https://kairos.kaiascan.io/nft/0x7dcdaa882603b1cfeee42d1c382a1ecba595d87c/0?tabId=nftTokenTransfer&page=1).


![](/img/build/tutorials/cc-nft-ccip-explorer.png)


![](/img/build/tutorials/cc-nft-ccip-kaiascan.png)

Once the NFT arrives on Kairos Testnet, add it to your MetaMask wallet:

1. Open the NFT tab in MetaMask.
2. Click Import NFT.
3. Enter the CrosschainNFT contract address on Kairos Testnet and the tokenId you received (for example, 0).

Your NFT will now appear inside your MetaMask wallet.

![](/img/build/tutorials/cc-ccip-mm-view-nft.png)

## Conclusion

In this tutorial, you learned how to use Chainlink CCIP to transfer NFTs between Kaia Kairos Testnet and Ethereum Sepolia using the burn-and-mint model.

To dive deeper into CCIP and explore additional use cases, visit the official [Chainlink CCIP Documentation](https://docs.chain.link/ccip).




