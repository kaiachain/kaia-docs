# Deploying smart contract using Thirdweb

![](/img/banners/kaia-thirdweb.png)

## Introduction <a id="introduction"></a>

This section will guide you through deploying a Marketplace contract and a corresponding NFT collection contract to Kaia Network using [ThirdWeb](https://portal.thirdweb.com/). Thirdweb is a complete web3 development framework that provides everything you need to connect your apps and games to decentralized networks.

Marketplace contract allows users to list NFTs for direct sale or auction, thus enhancing the buying and selling of NFTs, just like it’s done on OpenSea.

By the end of this guide, you will be able to:

* create and customize contracts using thirdweb.
* compile, deploy, and interact with your smart contract using thirdweb.

## Getting Started <a id="getting-started"></a>

In this article, we will explore the different means to create, customize, and deploy contracts using thirdweb, viz.
* Using the thirdweb dashboard
* Using the thirdweb CLI

For this guide, we will be demonstrating how to deploy a MarketPlace contract using the thirdweb dashboard and also deploying a corresponding nft collection to be listed on the marketplace using the thirdweb CLI.

> Note: We will not be explaining the mechanics of the marketplace contract as our focus is to explore thirdweb dashboard and CLI for creating, deploying, and interacting with smart contracts.  

## Creating and deploying marketplace contract using thirdweb dashboard <a id="creating-and-deploying-thirdweb-dashboard"></a>

In this section, we will create and deploy a marketplace contract using thirdweb dashboard. To do this, follow the steps below:

1. Head over to [thirdweb dashboard](https://thirdweb.com/dashboard?ref=blog.thirdweb.com) and select the **MarketPlace** contract from the list of contracts.

![](/img/build/get-started/marketplace-explore.png)

2. Click **Deploy Now** in the contract overview dashboard.

![](/img/build/get-started/marketplace-deploy.png)

3. Configure the marketplace contract to include the following parameters: the **name** of the marketplace, its **description**, and **image**.

![](/img/build/get-started/marketplace-contract-details.png)

4. Click **Deploy Now** as seen in the image above and wait for the transaction to complete.

![](/img/build/get-started/marketplace-deployed.png)

Once the transaction has been successfully executed, you can verify your deployment by pasting the contract address in the search bar of [Kaiascope](https://kaiascope.com/).

## Creating and deploying an NFT collection contract using thirdweb CLI <a id="creating-deploying-using-thirdweb-cli"></a>

In this section, we will create and deploy the NFT collection to be listed in our Marketplace using [thirdweb CLI](https://portal.thirdweb.com/cli?ref=blog.thirdweb.com). To do this, follow the steps below:

### Creating the contract <a id="creating-the-contract"></a>

1. Run this command in your terminal to create your contract:

```bash
npx thirdweb create --contract
```

2. Enter your preferred values for the command-line prompts:

    i. Give your project a name.

    ii. Choose your preferred framework: **Hardhat** or **Foundry**.

    iii. Name your smart contract.

    iv. Choose the type of base contract: **Empty**, **ERC20**, **ERC721**, or **ERC1155**. Add any desired **extensions**. For this tutorial, we will select ERC721 and setting the extension to none. 

![](/img/build/get-started/thirdweb-cli-info.png)

3. Once created, navigate to your project’s root directory and open your project in your preferred code editor.

4. If you open the contracts folder, your contract should look like this:

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

The contract above demonstrates basic [ERC721Base](https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Base.sol) functionality. It imports and inherits the **ERC721Base** contract, and it also implements the required methods, including the constructor and its dependent parameters.

You can modify the contract to your desired custom logic, and once done, your contract is ready for deployment.

### Deploying the contract <a id="deploying-the-contracts"></a>

1. Navigate to your project root folder and run the command in your terminal:

```bash
npx thirdweb deploy
```

Executing this command will trigger the following actions:
  * detects the framework (hardhat, foundry)
  * compiles all the contracts in the current directory.
  * allows you to select which contract(s) you wish to deploy.
  * upload your compiled smart contract code (in the form of an Application Binary Interface, or ABI) to IPFS.

2. When deployment is complete, a dashboard interface will open to fill out the remaining parameters.
    * **_name**: contract name
    * **_symbol**: symbol or "ticker"
    * **_royaltyRecipient**: wallet address to receive royalties from secondary sales
    * **_royaltyBps**: basis points (bps) that will be given to the royalty recipient for each secondary sale, e.g., 500 = 5%

3. Select `Kaia Mainnet` as the network to deploy the contract to.

![](/img/build/get-started/nft-collection-deploy.png)

4. Once your smart contract is deployed, you can manage additional settings and functionalities through its dashboard. For example, you can upload NFTs, configure permissions and access control, and add new features.

You can learn more about thirdweb deploy command in this [deploy guide](https://portal.thirdweb.com/deploy/getting-started).

## Interacting with deployed contracts <a id="interacting-with-deployed-contracts"></a>

In this section, we will mint an NFT and also transferring it to another account using the **mint** and **transferfrom** function respectively. Let's go over it in the following steps:

### Minting the NFT <a id="minting-nft"></a>

1. Navigate to the newly deployed contract (**puppyKlan-NC**) dashboard.
2. Click on the **mint** function in the **NFTs** tab under the contract dashboard.

![](/img/build/get-started/puppy-mint-btn.png)

3. Fill in the parameters needed for minting the NFT: **name**, **media**, **description**, and **properties**.

![](/img/build/get-started/puppy-mint-details.png)

4. Verify your input and click the **Mint NFT** button.
5. Confirm the transaction and wait for it to complete. Once done, you should see your NFT added to the dashboard, like below:

![](/img/build/get-started/puppy-minted.png)

### Transferring the NFT to a new owner <a id="transferring-nft-to-new-owner"></a>

1. Head to the Explorer tab in the contract (**puppyKlan-NC**) dashboard.
2. Select the **transferFrom** function under the Write tab, as shown below.
3. Fill in the necessary function arguments: from (address), to (address), and id (uint256).

![](/img/build/get-started/puppy-transferfrom.png)

4. Confirm the transaction and wait for it to complete.

## Conclusion <a id="conclusion"></a>

Congratulations! if you made it to the end of this guide. If you have any questions, visit the [Kaia Forum](https://devforum.kaia.io/) or reach out to the [official thirdweb support](https://support.thirdweb.com/). However, below is a list of useful resources you might need while further building with Thirdweb on Kaia.

* [Thirdweb Docs](https://portal.thirdweb.com/)
* [How to build a dApp using Thirdweb](https://blog.thirdweb.com/guides/how-to-build-a-dapp/)
* [Create your own NFT marketplace with NextJS and TypeScript](https://blog.thirdweb.com/guides/nft-marketplace-with-typescript-next/)

