# Build a dApp using Scaffold-ETH 2

![](/img/banners/kaia-scaffold.png)

## Introduction <a href="#introduction" id="introduction"></a>

Scaffold-ETH 2 is an open-source toolkit for building decentralized applications (dApps) on Ethereum and other EVM-compatible blockchains, like Kaia. Developers can easily deploy a Solidity smart contract and launch a dApp with a React frontend thanks to Scaffold-ETH 2.

The Scaffold-ETH 2 toolkit was built using Next.js, RainbowKit, Hardhat, Foundry, Wagmi, and TypeScript. Developers can easily create, test, and deploy smart contracts using Hardhat or Foundry, as well as build a React frontend using Next.js.

In this tutorial, you will learn how to deploy, run a contract and build a dApp on Kaia using Scaffold-ETH 2.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

To get started with in this guide, you will need:
* [Node (>= v18.17)](https://nodejs.org/en/download/)
* Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
* Familiarity with Javascript and React basics such as hooks
* [Metamask Wallet](https://metamask.io/download/)
* Test KAIA from [Faucet](https://faucet.kaia.io)
* RPC Endpoint: you can obtain this from one of the supported [endpoint providers](https://docs.kaia.io/references/public-en/)

## Setting up development environment <a href="#setting-up-dev-environment" id="setting-up-dev-environment"></a>

To install Scaffold-ETH 2, you have two options, either to install by cloning [Scaffold-ETH 2 repository](https://github.com/scaffold-eth/scaffold-eth-2) or by using `npx create-eth@latest`.

For the sake of this guide, we will use the npx method to bootstrap our Scaffold-ETH 2 project. 

Bootstrap a Scaffold-ETH 2 project by running the command below: 

```bash
npx create-eth@latest
```

You will be presented with a series of prompts:

**Project Name**: Input your project name: Enter a name for your project, e.g., kaia-scaffold-example.

**Solidity Framework**; What solidity framework do you want to use?: Choose your preferred solidity framework (Hardhat, Foundry). For this guide, we will use the Hardhat framework.

**Install packages?**: Press Enter for yes (default option) or type n and press Enter for no
Once the setup is complete, navigate to the project directory.

```bash
cd project-name
// e.g  cd kaia_scaffold
```

![Scaffold-ETH setup](/img/build/tutorials/scaffold-1.png)



## Highlight of the development process with Scaffold-ETH 2 <a href="#highlight-of-dev-environment" id="highlight-of-dev-environment"></a>

The process for developing a project with Scaffold-ETH 2 can be outlined as follows:

1. Update the network configurations in Hardhat for Kaia
2. Add your smart contracts to the **packages/hardhat/contracts**
3. Edit your deployment scripts in the **packages/hardhat/deploy**
4. Deploy your smart contracts to Kaia
5. Verify your smart contracts with hardhat verify plugin
6. Configure your frontend to target Kaia in the **packages/nextjs/scaffold.config.ts** file
7. Edit your frontend as needed in the **packages/nextjs/pages** directory

For the sake of this guide, we’ll use the default sample contract and frontend available after Scaffold-ETH 2 installation. All that is required is to modify these components for Kaia. In that case, we’ll split the configurations into **Hardhat** and **Next.js** configurations.

## Hardhat Configuration 
In this section, you'll modify the network configurations in the Hardhat configuration file to target Kaia under the **packages/hardhat** folder.

### Configure Hardhat for Kaia
To configure hardhat for Kaia, you need to create a .env file and also modify hardhat.config.ts to support Kaia. 

**Step 1: Create .env**

To create .env file, copy and paste the code below in your terminal

```bash
touch packages/hardhat/.env
```

You can refer to the **.env.example** file for the variables that are already used in the hardhat.config.js file. For Kaia, you'll only need to create one variable: **DEPLOYED_PRIVATE_KEY**.

**Step 2: Edit your .env file to include this variable:**

```bash
DEPLOYER_PRIVATE_KEY=INSERT_PRIVATE_KEY
```

The private key stated in your **.env** file corresponds to the account that will deploy and interact with the smart contracts in your Hardhat project.

**Step 3: Modify hardhat.config.ts**

The next thing we want to do is to configure **hardhat.config.ts** to support Kaia.

Set the constant **defaultNetwork** to the network you are deploying the smart contract to. 

```js
    kairos: {
      chainId: 1001,
      url: "https://responsive-green-emerald.kaia-kairos.quiknode.pro/",
      accounts: [deployerPrivateKey],
    },
```

Add the network configurations for Kaia under the networks configuration object

```js
network: "kairos",

```

For more information on using Hardhat with Kaia, please check [Hardhat guide](https://docs.kaia.io/build/get-started/hardhat/) for more details.

### Deploy Contract to Kaia
After configuring Hardhat to support the Kaia network, the next step is to compile and deploy the sample contract. 

First, you can compile your contract by running:

```bash
yarn compile
```
![Compile](/img/build/tutorials/scaffold-2.png)

Then, you can run the following command from the root directory of your project:


```
yarn deploy
```
![Deploy](/img/build/tutorials/scaffold-6.png)

Note: 

> If you did not set the defaultNetwork config in the hardhat.config.ts file, you can append --network INSERT_NETWORK to the command. For example, the following command would deploy a contract to Kaia.

> yarn deploy --network kaia

### Verify Your Deployed Contract <a href="#verify-deployed-contract" id="verify-deployed-contract"></a>

 To verify our already deployed contract, we'll use the hardhat verify plugin. All that is required is to add the following configuration to your **hardhat.config.ts** under the etherscan configuration object for Kairos Testnet. 

```js
  etherscan: {
    apiKey: {
      kairos: "unnecessary",
    },
    customChains: [
      {
        network: "kairos",
        chainId: 1001,
        urls: {
          apiURL: "https://api-baobab.klaytnscope.com/api",
          browserURL: "https://kairos.kaiascope.com",
        },
      },
    ],
  },
```

Next is to copy and paste the following command in your terminal to verify the smart contract:

Example

```js
yarn hardhat-verify --network network_name contract_address "Constructor arg 1"
```
Actual
```js
yarn hardhat-verify --network kairos 0x7fc9656fc8c8ab433867e58b7c6afc19ec4275da
 "0x7fc9656fc8c8ab433867e58b7c6afc19ec4275da"
```
As you can see above, to verify your contracts, you have to pass in the network name, contract address and constructor arguments (if any). After a short wait, the console will display the verification result and, if successful, the URL to the verified contract on Kaiascope will be provided.

![Verify](/img/build/tutorials/scaffold-verify.png)
 
![Verify on Kaiascope](/img/build/tutorials/scaffold-3.png)


For more information about verifying smart contracts on Kaia using the Hardhat Verify plugin, please refer to the H[ardhat-Verify-Plugins guide](https://docs.kaia.io/build/smart-contracts/verify/hardhat/).

## Next.js Configuration <a href="#nextjs-configuration" id="nextjs-configuration"></a>

In this section, you'll modify the Next.js configuration to target Kairos Testnet (where the smart contract was deployed to) under the **packages/nextjs** folder. In this folder, we intend to modify the **targetNetwork** array in the scaffoldConfig object in **scaffold.config.ts** file. 

### Modify the targetNetwork array <a href="#modify-targetnetwork-array" id="modify-targetnetwork-array"></a>

```js
targetNetworks: [chains.klaytnBaobab],
```

That's all required to configure Next.js! Next, is to launch the dApp in your localhost. 

### Launch the dApp in your Localhost <a href="#launch-dapp-in-localhost" id="launch-dapp-in-localhost"></a>

After making all the necessary configurations, you can now launch the example dApp on your localhost.

To do so, run:

```bash
yarn start
```

![Run dApp](/img/build/tutorials/scaffold-4.png)



You should now be able to access a React-based dApp frontend at http://localhost:3001/. Feel free to  interact with the dApp by connecting your wallet or checking out the contract debugger page.

![Scaffold dApp](/img/build/tutorials/scaffold-5.png)


## Conclusion

Congratulations! You have successfully used Scaffold-ETH 2 to deploy a contract and run a dApp on Kaia. Now that you understand the workings of Scaffold-ETH 2, feel free to create and deploy your own smart contracts and modify the frontend to fit your dApp's needs!

Visit [Scaffold-ETH 2 Docs](https://docs.scaffoldeth.io/) for more information and [Kaia Forum](https://devforum.kaia.io/) if you have any questions.














