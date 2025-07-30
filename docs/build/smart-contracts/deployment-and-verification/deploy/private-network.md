# Deploying smart contract using Private Network

<!-- ![](/img/banners/kaia-ken.png) -->

## Introduction <a id="introduction"></a>

In this guide, we will walk you through the process of deploying a Greeter contract on a private Kaia network using [Kaia Hardhat Utils](https://github.com/ayo-klaytn/hardhat-utils). By following this guide, you'll learn how to:

- Set up a Hardhat project.
- Launch a private network simulating the Kairos Testnet.
- Utilize Hardhat utils to deploy smart contracts on this private network.

## Prerequisite <a id="prerequisites"></a>

To follow this tutorial, the following are the prerequisites:

- Code editor: a source-code editor such as [VS Code](https://code.visualstudio.com/download).
- Docker: if you don’t have docker installed, kindly install using this [link](https://docs.docker.com/desktop/)
- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm): Node version 18 and above. 

## Setting Up your Development Environment <a id="setting-up-dev-environment"></a>

In this section, we will install hardhat, Kaia hardhat utils and other necessary dependencies needed for bootstrapping our project. 

**Step 1: Create a project directory**

```js 
mkdir $HOME/kaia-greeter
cd kaia-greeter 
```

**Step 2: Initialize an npm project**

```js
npm init -y
```

**Step 3: Install hardhat, hardhat-utils and other dependencies** 

* Copy and paste the code below in your terminal to install hardhat and hardhat-utils

```js
npm i hardhat @klaytn/hardhat-utils
```

* Copy and paste the code below to install other dependencies

```js
npm install @nomiclabs/hardhat-ethers hardhat-deploy dotenv
```

:::note

The hardhat-utils plugin depends on  [hardhat-ethers](https://www.npmjs.com/package/@nomiclabs/hardhat-ethers) and [hardhat-deploy](https://www.npmjs.com/package/hardhat-deploy) plugin.  Make sure to require or import them in your `hardhat.config.js` or `hardhat.config.ts`.

:::

:::info

(Recommended) Install hardhat shorthand. But you can still use the tasks with npx hardhat.

```js
npm install hardhat-shorthand --save
```
:::

**Step 4: Initialize a hardhat project**

Run the command below to initiate an hardhat project:

```js
npx hardhat init 
```

For this guide, you'll be selecting "create an empty hardhat.config.js" project as seen below:

```js
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
👷 Welcome to Hardhat v2.22.9 👷‍
? What do you want to do? … 
  Create a JavaScript project
  Create a TypeScript project
  Create a TypeScript project (with Viem)
❯ Create an empty hardhat.config.js
  Quit
```

**Step 5: Create a .env file**

Now create your `.env` file in the project folder. This file helps us load environment variables from an `.env` file into process.env.

Copy and paste this command in your terminal to create a `.env` file

```js
touch .env
```

Configure your .env file to look like this:

```
PRIVATE_KEY="COPY & PASTE ANY OF THE PRIVATE KEY PROVIDED BY LOCAL PRIVATE NETWORK"
```

:::note

When you launch the private network in the next section, you will be able to access the private key provided by the local network.

:::

**Step 6: Setup Hardhat Configs**

Modify your `hardhat.config.js` with the following configurations:

```js
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("@klaytn/hardhat-utils");
require('dotenv').config()

const accounts = [
  process.env.PRIVATE_KEY
];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: process.env.RPC_URL || "http://localhost:8545",
      accounts: accounts,
    },
    kairos: {
      url: process.env.RPC_URL || "https://public-en-kairos.node.kaia.io",
      accounts: accounts,
    },
    kaia: {
      url: process.env.RPC_URL || "https://public-en.node.kaia.io",
      accounts: accounts,
    }
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
};
```

## Launching the Private Network <a id="launching-private-network"></a>

To launch a  private network, the hardhat utils plugin provides us a task to easily launch one viz:

```js
hh klaytn-node
```

![](/img/build/smart-contracts/pn-run-node.png)

## Attaching Console <a id="attaching-console"></a>

The private network comes with a JavaScript console. From the console command line, you can initiate part of Kaia API calls to your network. To attach to the JavaScript console, execute the following command: 

```js
hh klaytn-node --attach
```

```jsx title="Result Result "
Welcome to the Kaia JavaScript console!
 instance: Klaytn/v0.9.2/linux-amd64/go1.22.1
  datadir: /klaytn
  modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 kaia:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0
```

:::note

Type **kaia** or **personal** to get the list of available functions.

:::

## Checking the Balance in your account <a id="checking-balance-in-account"></a>

When we launched the private network, it provided us with a list of accounts, private key and  pre-funded values for each account.  

To see the balance of the account, execute the following command.

```js
kaia.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
```

![](/img/build/smart-contracts/pn-check-balance.png)

## Configuring hardhat network environment <a id="configuring-hardhat-network-environment"></a>

Now that we are running a stand alone local network, which external clients (wallets, dApp) can connect to, we need to configure hardhat to use this network by running this command:

```js
export HARDHAT_NETWORK=localhost
hh accounts
```

```js
hh --network localhost accounts
```

![](/img/build/smart-contracts/pn-lh-accounts.png)

## Creating KaiaGreeter Smart Contract <a id="creating-kaiagreeter-smart-contract"></a>

In this section, you will create a KaiaGreeter smart contract.

**Step 1:** Create a new folder named  **contracts** folder in the Explorer pane, click the New File button and create a new file named `KaiaGreeter.sol`

**Step 2:** Open the file and paste the following code:

```js
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

## Deploying KaiaGreeter <a id="deploying-kaiagreeter"></a>

In this section we will use the hardhat-deploy plugin to deploy our contracts. 

**Step 1:** In the Explorer pane, Create a new folder called **deploy** and click the New File button to create a new file named `deploy.js`. 

**Step 2:** Copy and paste the following code inside the file.

```js
module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  await deploy('KaiaGreeter', {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ['KaiaGreeter'];
```

**Step 3:** In the terminal, run the following command which tells Hardhat to deploy your KaiaGreeter contract on the private network.

```js
hh deploy 
```

![](/img/build/smart-contracts/pn-deployed-tx.png)

## Verifying transaction using Block Explorer <a id="verifying-transaction-using-block-explorer"></a>

**Step 1:** To verify our transactions using a local blockscout explorer, run the command below in a new terminal: 

```js
hh explorer --network localhost
```

```js
[+] Using env: {
  DOCKER_RPC_HTTP_URL: 'http://host.docker.internal:8545/',
  DOCKER_LISTEN: '0.0.0.0:4000',
  DOCKER_DISABLE_TRACER: 'false',
  DOCKER_DEBUG: '0'
}
[+] Open in the browser: http://localhost:4000
 Network blockscout_default  Creating
 Network blockscout_default  Created
 Container blockscout-db-1  Creating
 Container blockscout-frontend-1  Creating
 Container blockscout-smart-contract-verifier-1  Creating
 Container blockscout-redis_db-1  Creating
 Container blockscout-smart-contract-verifier-1  Created
 Container blockscout-db-1  Created
 Container blockscout-frontend-1  Created
 Container blockscout-redis_db-1  Created
 Container blockscout-backend-1  Creating
 Container blockscout-backend-1  Created
 Container blockscout-frontend-1  Starting
 Container blockscout-redis_db-1  Starting
 Container blockscout-smart-contract-verifier-1  Starting
 Container blockscout-db-1  Starting
 Container blockscout-db-1  Started
 Container blockscout-redis_db-1  Started
 Container blockscout-smart-contract-verifier-1  Started
 Container blockscout-backend-1  Starting
 Container blockscout-frontend-1  Started
 Container blockscout-backend-1  Started
```

**Step 2:** To access this block explorer, open up [http://localhost:4000](http://localhost:4000) in your browser. 


Step 3: Copy and paste the deployed contract address in the search field and press Enter. You should see the recently deployed contract.

![](/img/build/smart-contracts/pn-verify-tx-block-explorer.png)

## Interacting with deployed contract <a id="interacting-with-deployed-contract"></a>

### using hardhat utils contract task

1. To call a read-only function of the deployed contract, run the command below:

```js
hh call KaiaGreeter getTotalGreetings
```

![](/img/build/smart-contracts/pn-read-function.png)


2. To send a function invoking transaction to the deployed contract, run the command below:

```js
hh send KaiaGreeter greet
```

```jsx title="Result Result "
sent KaiaGreeter#greet (tx: 0xc0bd25ffb594c13d5ae1f77f7eb02f2978013c69f9f6e22694b76fa26c329e85)...ok (block 2837, gas used: 47457)
```

### using Kaia SDK

**Step 1:** To interact with the deployed contract using [Kaia SDK](https://github.com/kaiachain/kaia-sdk), you need to install Kaia SDK by running this command:

```js
npm install --save @kaiachain/ethers-ext
```

**Step 2:** In the Explorer pane, Create a new folder called "utils" and click the New File button to create a new file named `kaia-sdk.js` in the utils folder.

Step 3:  Copy and paste the following code inside the file.

```js
const { JsonRpcProvider, Wallet } = require("@kaiachain/ethers-ext");
const { ethers } = require("ethers");
require('dotenv').config()

const provider = new JsonRpcProvider("http://127.0.0.1:8545/")

const privKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privKey, provider);
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // PASTE DEPLOYED CONTRACT ADDRESS;

const KaiaGreeterABI = require("../artifacts/contracts/KaiaGreeter.sol/KaiaGreeter.json").abi;

async function getCode(ca) {
    const tx = await provider.getCode(ca);
    console.log(tx);
}

async function greet(ca) {
    const klaytnGreeter = new ethers.Contract(ca, KaiaGreeterABI, signer);
    const tx = await klaytnGreeter.greet();
    console.log( tx);
}

async function getTotalGreetings(ca) {
    const klaytnGreeter = new ethers.Contract(ca, KaiaGreeterABI, provider);
    const value = await klaytnGreeter.getTotalGreetings();
    console.log(value.toString());
}

// getCode(contractAddress);
getTotalGreetings(contractAddress);
// greet(contractAddress);
```
**Step 4:** To execute any of the functions declared in this file, make sure to uncomment them as we did for the getTotalGreetings() function, then run the following command in your terminal. 

```js
node utils/kaia-sdk.js 
```

![](/img/build/smart-contracts/pn-run-kaia-sdk.png)

For a more in-depth guide on hardhat-utils, please refer to [hardhat-utils github](https://github.com/ayo-klaytn/hardhat-utils). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/ayo-klaytn/kaia-hardhat-utils-example)