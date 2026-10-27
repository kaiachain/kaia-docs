# 사설 네트워크를 통해 스마트 계약 배포하기

<!-- ![](/img/banners/kaia-ken.png) -->

## 소개 <a id="introduction"></a>

이 가이드에서는 [Kaia Hardhat Utils](https://github.com/klaytn/hardhat-utils)를 사용하여 프라이빗 Kaia 네트워크에 Greeter 계약을 배포하는 과정을 단계별로 안내해 드리겠습니다. 이 가이드를 따름으로써, 당신은 방법을 배울 것입니다:

- Hardhat 프로젝트 설정
- Kairos 테스트넷을 시뮬레이팅하는 개인 네트워크 시작합니다.
- 이 프라이빗 네트워크에 스마트 계약을 배포하기 위해 Hardhat 유틸리티를 활용하십시오.

## 필수조건 <a id="prerequisites"></a>

이 듀토리얼을 따르기 위해서, 필수조건은 다음과 같습니다.

- 코드 편집기: [VS Code](https://code.visualstudio.com/download) 같은 소스 코드 편집기.
- 도커: 도커가 설치되어 있지 않다면, 이 [링크](https://docs.docker.com/desktop/)를 통해 설치해 주세요.
- [Node.js와 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm): Node 버전 18 그리고 이상 버전.

## 개발 환경 설정하기 <a id="setting-up-dev-environment"></a>

이 섹션에서는 프로젝트 부트스트랩에 필요한 Hardhat, Kaia hardhat 유틸리티 및 기타 필수 종속성을 설치합니다.

**1단계: 프로젝트 디렉터리 만들기**

```js
mkdir $HOME/kaia-greeter
cd kaia-greeter 
```

**2단계: npm 프로젝트 초기화하기**

```js
npm init -y
```

**3단계: hardhat, hardhat-유틸리티 그리고 다른 종속성 설치하기**

- hardhat과 hardhat-유틸리티를 설치하기 위해 터미널에 아래 코드를 복사 후 붙여넣으세요.

```js
npm i hardhat @klaytn/hardhat-utils
```

- 다른 종속성을 설치하기 위해 터미널에 아래 코드를 복사 후 붙여넣으세요.

```js
npm install @nomiclabs/hardhat-ethers hardhat-deploy dotenv
```

:::note

hardhat-유틸리티 플러그인은 [hardhat-ethers](https://www.npmjs.com/package/@nomiclabs/hardhat-ethers) 및 [hardhat-deploy](https://www.npmjs.com/package/hardhat-deploy) 플러그인에 의존합니다.  `hardhat.config.js` 또는 `hardhat.config.ts`에서 해당 패키지를 요구하거나 임포트해야 합니다.

:::

:::info

(권장) hardhat 간편 설치 하지만 npx hardhat을 사용해 작업을 계속 사용할 수 있습니다.

```js
npm install hardhat-shorthand --save
```

:::

**4단계: hardhat 프로젝트 초기화하기**

hardhat 프로젝트 초기화를 위해 아래 명령어를 실행하세요:

```js
npx hardhat init 
```

이 가이드에서는 아래와 같이 “빈 hardhat.config.js 생성” 프로젝트를 선택하게 됩니다:

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
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // 배포된 계약 주소를 붙여넣으세요;

const KaiaGreeterABI = require("../artifacts/contracts/KaiaGreeter.sol/KaiaGreeter.json").abi;

async function getCode(ca) {
    const tx = await provider.getCode(ca);
    console.log(tx);
}

async function greet(ca) {
    const kaiaGreeter = new ethers.Contract(ca, KaiaGreeterABI, signer);
    const tx = await kaiaGreeter.greet();
    console.log( tx);
}

async function getTotalGreetings(ca) {
    const kaiaGreeter = new ethers.Contract(ca, KaiaGreeterABI, provider);
    const value = await kaiaGreeter.getTotalGreetings();
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

hardhat-utils에 대한 보다 자세한 안내를 보시려면 [hardhat-utils GitHub](https://github.com/klaytn/hardhat-utils)를 참조해 주세요. 또한, 이 가이드에 소개된 코드의 전체 구현 내용은 [GitHub](https://github.com/kaiachain/kaia-examples/tree/main/smart-contracts/hardhat-utils-private-network)에서 확인하실 수 있습니다.