# Connect Remix to Kaia

![](/img/banners/kaia-remix.png)

## Overview <a href="#overview" id="overview"></a>

Remix is a browser-based IDE (Integrated Development Environment) for developing Solidity contracts. In this guide, you will learn how to: 
* Create and Upload a pre-built smart contract on Remix IDE.
* Compile the smart contract.
* Connect to Kaia Plugin for Remix IDE
* Set up deployment environment 
* Import account
* Connect Kaia to Remix using Kaia Wallet
* Connect Kaia to Remix using MetaMask
* Deploy the smart contract.
* Verify the smart contract.

This will cover connecting Remix with Kaia. If you want to know more about how to use Remix, please refer to [Remix docs](https://remix-ide.readthedocs.io/en/latest/) or [Remix IDE](https://remix.ethereum.org/).


## Creating a file on Remix <a href="#creating-a-file-on-remix" id="creating-a-file-on-remix"></a>

To start building a smart contract, click on **New File** icon in the **contracts** folder in the **File explorer** tab and name it `KaiaGreeter.sol`

Next is to copy and paste the smart contract code provided below into the newly created KaiaGreeter.sol file.

```sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract KaiaGreeter {
    uint256 totalGreetings;
    constructor() {
        console.log("Yo yo, Welcome to Kaia");
    }
    function greet() public {
        totalGreetings += 1;
        console.log(msg.sender, "says hello kaia!");
    }
    function getTotalGreetings() public view returns (uint256) {
        console.log("We have %d total waves!", totalGreetings);
        return totalGreetings;
    }
}
```

![](/img/build/smart-contracts/remix-create-new-file.png)


## Compile smart contract <a href="#compile-smart-contract" id="compile-smart-contract"></a>

To compile your contract, do the following:

* Go to the **Solidity Compiler** tab
* Select compiler version to 0.8.27
* Turn on the 'Auto compile' option.
* Cliick on the Compile KaiaGreeter.sol  button to compile `KaiaGreeter.sol` contract.
* After successful compilation, it will show a green tick mark on the Compiler tab button

![](/img/build/smart-contracts/remix-compile-contract.png)

## Connect to Kaia Plugin on Remix IDE <a href="#connect-to-kaia-plugin" id="connect-to-kaia-plugin"></a>

To connect to Kaia plugin on Remix IDE, you can either use this [Kaia Plugin for Remix](https://ide.kaia.io/) or follow this step:

* Navigate to the **Plugin manager** tab
* Insert Klaytn in the search field 
* Activate the Klaytn plugin. If Klaytn tab appears, you are ready to interact with Kaia.

![](/img/build/smart-contracts/remix-plugin-addon.png)

## Setting up deployment environment  <a href="#setting-up-deployment-env" id="setting-up-deployment-env"></a>

* Click on the Klaytn plugin.
* Select the appropriate [Environment].
* You can select Kairos, Mainnet, Injected Provider - Kaia Wallet, Injected Provider - MetaMask 
    * [Kairos]: Connects to the Kairos network
    * [Mainnet]: Connects to the Mainnet
    * [Injected Provider - Kaia Wallet]: Connects to Kaia Wallet
    * [Injected Provider - MetaMask ]: Connects to Metamask

![](/img/build/smart-contracts/remix-deploy-env.png)

## Import account <a href="#import-account" id="import-account"></a>

You can export private key or Keystore from any compatible wallet to use here.

* Click plus button next to the ACCOUNT.
* Then put private key or keystore.
* You can also import keys for the feePayer. It only supports private key.

![](/img/build/smart-contracts/remix-import-acc.png)

## Connecting Kaia to Remix using Kaia Wallet <a href="#connect-to-kaia-using-kaia-wallet" id="connect-to-kaia-using-kaia-wallet"></a> 

* Select [Injected Provider - Kaia Wallet] on the Remix Environment menu.

![](/img/build/smart-contracts/remix-kw-connect.png)


* When you see the Kaia Wallet pop-up, click [Connect].
* Once you are successfully connected to the Network, you will see the Chain ID and Account of the connected network.


## Connecting Kaia - Remix using MetaMask <a href="#connect-to-kaia-using-metamask" id="connect-to-kaia-using-metamask"></a> 

* Connect Kaia with MetaMask by referring to the [Connecting to MetaMask](./connecting-metamask.mdx).
* Select [Injected Provider - MetaMask] on the Remix Environment menu.

![](/img/build/smart-contracts/remix-mm-connect.png)

* When you see the MetaMask pop-up, select the account by clicking it.
* Once you are successfully connected to the Network, you will see the Chain ID and Account of the connected network.

## Deploying the smart contract <a href="#deploying-contract" id="deploying-contract"></a>

In this section, we will deploy the KaiaGreeter.sol contract using Kaia Wallet. Having compiled the contract in the Compile Section, follow the deployment process below:
* Set your deployment ENVIRONMENT to Injected Provider -  Kaikas Wallet. Make sure to confirm all the connection prompts to Remix. 
* Select the contract you want to deploy in the CONTRACT field.
* Click on the Deploy button. This would generate a Kaia Wallet popup that requires transaction confirmation. Simply confirm the transaction!

![](/img/build/smart-contracts/remix-deploy-contract.png)

* You can view the deployed contract on [Kaiascan](https://kairos.kaiascan.io/), and also test or debug it on Remix IDE.
