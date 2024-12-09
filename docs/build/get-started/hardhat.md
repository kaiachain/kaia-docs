# Deploy your first smart contract using Hardhat

![](/img/banners/kaia-hardhat.png)

## Introduction

This section will guide you through deploying a Soulbound Token to the Kaia Kairos Network using [Hardhat](https://hardhat.org/). 

Hardhat is a smart-contract development environment that will help you:
* Develop and compile smart contracts.
* Debug, test, and deploy smart contracts and dApps.

Soul-bound tokens(SBTs) are non-transferable NFTs. Meaning once acquired, they cannot be sold or transferred to another user. To learn more about SBTs, how it works and their use case, you can check out this [reference article](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) published by Vitalik Buterin.

By the end of this guide you will be able to: 
* Set up a Hardhat project on Kaia.
* Create a simple soul-bound token.
* Compile your smart contract using Hardhat.
* Test, deploy, and interact with your smart contract using Hardhat.
* Explore Hardhat forking feature.


## Pre-requisites

To follow this tutorial, the following are the prerequisites:

* Code editor: a source-code editor such [VS Code](https://code.visualstudio.com/download).
* [Metamask](../tutorials/connecting-metamask.mdx#install-metamask): used to deploy the contracts, sign transactions and interact with the contracts.
* RPC Endpoint: you can get this from one of the supported [Endpoint Providers](../../references/public-en.md).
* Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.
* [NodeJS and NPM](https://nodejs.org/en/)

## Setting Up Your Development Environment

To make use of hardhat, we need to set up our development environment and get hardhat installed. Let's do this in the following steps:

**Step 1**: Create a project directory

```bash
mkdir soulbound-tokens
cd soulbound-tokens
```

**Step 2**: Initialize an npm project

Paste this command in your terminal to create a package.json file

```bash
npm init -y
```

**Step 3**: Install hardhat and other dependencies:

* Paste the code below in your terminal to install hardhat

```bash
npm install --save-dev hardhat
```

* Paste the code below to install other dependencies

```bash
npm install dotenv @kaiachain/contracts
```

> Note: This installs other dependencies needed for this project ranging from `hardhat`, `klaytn/contract`, `dotenv` et al. 


**Step 4**: Initialise a hardhat project:

Run the command below to initiate an hardhat project

```bash
npx hardhat
```
For this guide, you'll be selecting a typescript project as seen below:

![](/img/build/get-started/hardhat-init.png) 

![](/img/build/get-started/hardhat-init-ii.png)

> Note: While initializing the project, you will get a prompt to install `hardhat-toolbox` plugin. The plugin bundles all the commonly used packages and Hardhat plugins recommended to start developing with Hardhat.

After initializing a hardhat project, your current directory should include:

**contracts/** – this folder contains smart contract code.

**ignition/modules/** – this folder contains code that deploys your contracts on the blockchain network.

**test/** – this folder contains all unit tests that test your smart contract.

**hardhat.config.js** – this file contains configurations important for the work of Hardhat and the deployment of the soul-bound token.

**Step 5**: Create a .env file

Now create your .env file in the project folder. This file helps us load environment variables from an .env file into process.env. 

* Paste this command in your terminal to create a .env file

```bash
touch .env
```

* After creating our file, let's configure our .env file to look like this:

```js
 KAIROS_TESTNET_URL= "Your Kairos RPC link"
 PRIVATE_KEY= "your private key copied from MetaMask wallet"
```

> Note: You can also choose to use the [configuration variable](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables) functionality provided by hardhat to configure variables that shouldn't be included in the code repository.

**Step 6**: Setup Hardhat Configs

Modify your `hardhat.config.js` with the following configurations:

```js
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()


module.exports = {
  solidity: "0.8.17",
  networks: {
    kairos: {
      url: process.env.KAIROS_TESTNET_URL || "",
      gasPrice: 250000000000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  }
};

```

Now that we have our development environment all set, let's get into writing our soul-bound token  smart contract.

## Creating SBT Smart Contract

In this section, you will use the [Kaia Contracts](https://github.com/kaiachain/kaia-contracts): a library for secure smart contract development built on a solid foundation of community-vetted code. It is a fork of open zeppelin contracts. 

> Note: You already installed this library in **step 3** of the `Setting Development Environment` section.

**Step 1**: Select the contracts folder in the Explorer pane, click the New File button and create a new file named `SBT.sol`

**Step 2**: Open the file and paste the following code:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@kaiachain/contracts/KIP/token/KIP17/KIP17.sol";
import "@kaiachain/contracts/utils/Counters.sol";
import "@kaiachain/contracts/access/Ownable.sol";

contract SoulBoundToken is KIP17, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() KIP17("SoulBoundToken", "SBT") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }


    function _beforeTokenTransfer(address from, address to, uint256) pure override internal {
        require(from == address(0) || to == address(0), "This a Soulbound token. It cannot be transferred.");
    }

    function _burn(uint256 tokenId) internal override(KIP17) {
        super._burn(tokenId);
    }
}
```

**Code Walkthrough**

This is your smart contract. **line 1** shows that Hardhat uses the Solidity version 0.8.7 or greater. Other than that, it imports KIP17.sol and other supporting contracts. From **lines 6-12**, a smart contract that inherits KIP17 is been created. Also, the token name and symbol was passed in the constructor.

As you can see in the code above, the token name and symbol have been set to **SoulBoundToken** and **SBT** respectively. You can change the token name and symbol to anything you desire.

One major thing in this contract is that it prohibits token transfer, which makes the issued tokens soulbond.

## Testing SBT Smart Contract

In this section, we would be testing some of our contract functionalities.

**Step 1**: In the Explorer pane, select the test folder and click the New File button to create a new file named `sbtTest.js`

**Step 2**: Copy the code below in the `sbtTest.js` file.

```js
// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("Token contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call ethers.deployContract() and call the 
    // waitForDeployment() method, which happens onces its transaction has been
    // mined.

    const sbtContract = await ethers.deployContract("SoulBoundToken");

    await sbtContract.waitForDeployment();

    // Fixtures can return anything you consider useful for your tests
    return { sbtContract, owner, addr1, addr2 };
  }

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define each
    // of your tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it("Should mint SBT to owner", async function () {
      const { sbtContract, owner } = await loadFixture(deployTokenFixture);
      const safemint = await sbtContract.safeMint(owner.address);
      expect(await sbtContract.ownerOf(0)).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should prohibit token transfer using transferFrom", async function () {
      const { sbtContract, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );

      const safemintTx = await sbtContract.safeMint(owner.address);

      // prohibit token transfer of token id (0) from owner to addr1
      await expect(
        sbtContract.transferFrom(owner.address, addr1.address, 0)
      ).to.be.reverted;
    });

    it("Should prohibit token transfer using safeTransferFrom", async function () {
      const { sbtContract, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );

      const safemintTx = await sbtContract.safeMint(owner.address);

      // prohibit token transfer of token id (0) from owner to addr1
      await expect(sbtContract['safeTransferFrom(address,address,uint256)'](
        owner.address,
        addr1.address,
        0 
      )).to.be.reverted;
    });
  });
})
```

In the code you just copied, line 7 & 12 shows you imported expect from [Chai](https://www.chaijs.com/api/bdd/) and [loadFixture](https://hardhat.org/tutorial/testing-contracts#reusing-common-test-setups-with-fixtures) from hardhat-network-helpers.

The tests above check the following:

* Is the owner of a particular token id the same as who it was minted to?
* Did it prohibit transfer of tokens between accounts?

**Step 3**: To run your test, run the command below:

```bash
npx hardhat test test/sbtTest.js 
```

![](/img/build/get-started/sbtTest.png)

For more in-depth guide on testing, please check [Hardhat testing](https://hardhat.org/hardhat-runner/docs/guides/test-contracts). 

## Deploying the smart contract

Scripts are JavaScript/Typescript files that help you deploy contracts to the blockchain network. In this section, you will create a script for the smart contract.

**Step 1**: In the Explorer pane, select the "scripts" folder and click the New File button to create a new file named `sbtDeploy.js`.

**Step 2**: Copy and paste the following code inside the file.

> Note: input your MetaMask wallet address in the `deployerAddr` variable.

```js
const { ethers } = require("hardhat");

async function main() {

  const deployerAddr = "Your Metamask wallet address";
  const deployer = await ethers.getSigner(deployerAddr);

  console.log(`Deploying contracts with the account: ${deployer.address}`);
  console.log(`Account balance: ${(await deployer.provider.getBalance(deployerAddr)).toString()}`);


  const sbtContract = await ethers.deployContract("SoulBoundToken");
  await sbtContract.waitForDeployment();

console.log(`Congratulations! You have just successfully deployed your soul bound tokens.`);
console.log(`SBT contract address is ${sbtContract.target}. You can verify on https://kairos.kaiascope.com/account/${sbtContract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**Step 3**: In the terminal, run the following command which tells Hardhat to deploy your SBT token on the Kaia Test Network (Kairos) 

```bash
npx hardhat run ignition/modules/sbtDeploy.js --network kairos
```

![](/img/build/get-started/sbtDeploy.png)

**Step 4**: Open [Kaiascope](https://kairos.kaiascope.com/) to check if the SBT token has been deployed successfully.

**Step 5**: Copy and paste the deployed contract address in the search field and press Enter. You should see the recently deployed contract.

![](/img/build/get-started/sbtKS.png)

## Hardhat Forking

Hardhat provides developers the functionality of simulating the mainnet (at any given block) to a local development network. One of the major benefit of this feature is that it enables developers to interact with deployed contract and also write test for complex cases.  
 
For this feature to work effectively, you need to connect to an archive node. You can read more about this feature [here](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#forking-other-networks) 

### Forking Mainnet

Now that we have our Hardhat project set up let’s fork the Kaia Mainnet using Hardhat.  Open your terminal and run this command

```bash
npx hardhat node --fork <YOUR ARCHIVE NODE URL>

npx hardhat node --fork https://archive-en.node.kaia.io
```

You can also configure `hardhat.config.js` - Hardhat Network to always do this:

```
networks: {
  hardhat: {
    forking: {
      url: "<YOUR ARCHIVE NODE URL>",
    }
  }
}
```

**Output**

![](/img/build/get-started/hardhat-fork.png)

After successfully running this command, your terminal looks like the above image.  You'll have 20 development accounts that are pre-funded with 10,000 test tokens.


The forked chain's RPC server is listening at `http://127.0.0.1:8545/`.  You can verify the forked network by querying the latest block number. Let's try to make a cURL to the RPC to get the block number.  Open a new terminal window and use the following command: 

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

**Output**

![](/img/build/get-started/hardhat-fork-bn.png)

The output is an hexadecimal as seen above. To get the block number from the hex, convert the hex to a decimal using this [tool](https://www.rapidtables.com/convert/number/hex-to-decimal.html). You should get the latest block number from the time you forked the network. You can confirm the block number on [kaiascope](https://kaiascope.com/).

### Forking at a Block

With hardhat, you can fork the mainnet at a particular block.  In that case, let’s fork the chain at block number `105701850`.

```bash
npx hardhat node --fork <YOUR ARCHIVE NODE URL> --fork-block-number 105701850

npx hardhat node --fork https://archive-en.node.kaia.io --fork-block-number 105701850
```

To confirm the forked chain at the stated block, open a new terminal window and use the following command: 

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

![](/img/build/get-started/hardhat-fork-bnII.png)

The output returns hexadecimal which when converted using this [tool](https://www.rapidtables.com/convert/number/hex-to-decimal.html) should be equal to `105701850`.


For more in-depth guide on Hardhat, please refer to [Hardhat Docs](https://hardhat.org/hardhat-runner/docs/getting-started). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/hardhat/soulbound-tokens)
