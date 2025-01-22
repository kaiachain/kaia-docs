# 使用专用网络部署智能合约

<!-- ![](/img/banners/kaia-ken.png) -->

## 导言<a id="introduction"></a>

在本指南中，我们将指导您使用 [Kaia Hardhat Utils](https://github.com/ayo-klaytn/hardhat-utils) 在专用 Kaia 网络上部署 Greeter 合同。 通过本指南，您将学会如何

- 设立 "硬头巾 "项目。
- 启动一个模拟启明星测试网的专用网络。
- 利用 Hardhat 工具在该私有网络上部署智能合约。

## 先决条件<a id="prerequisites"></a>

学习本教程的前提条件如下：

- 代码编辑器：源代码编辑器，如 [VS Code](https://code.visualstudio.com/download)。
- Docker：如果您没有安装 docker，请使用此 [链接](https://docs.docker.com/desktop/) 进行安装。
- [Node.js 和 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)：Node 18 及以上版本。

## 设置开发环境<a id="setting-up-dev-environment"></a>

在本节中，我们将安装 hardhat、Kaia hardhat utils 和引导项目所需的其他必要依赖项。

**第 1 步：创建项目目录**

```js
mkdir $HOME/kaia-greeter
cd kaia-greeter 
```

**第 2 步：初始化 npm 项目**

```js
npm init -y
```

**第 3 步：安装 hardhat、hardhat-utils 和其他依赖项**

- 在终端中复制并粘贴以下代码，安装 hardhat 和 hardhat-utils

```js
npm i hardhat @klaytn/hardhat-utils
```

- 复制并粘贴以下代码以安装其他依赖项

```js
npm install @nomiclabs/hardhat-ethers hardhat-deploy dotenv
```

:::note

hardhat-utils 插件依赖于 [hardhat-ethers](https://www.npmjs.com/package/@nomiclabs/hardhat-ethers) 和 [hardhat-deploy](https://www.npmjs.com/package/hardhat-deploy) 插件。  确保在`hardhat.config.js`或`hardhat.config.ts`中要求或导入它们。

:::

:::info

(建议）安装硬帽速记装置。 但您仍然可以使用 npx 硬头盔执行任务。

```js
npm install hardhat-shorthand --save
```

:::

**第 4 步：初始化硬头盔项目**

运行以下命令启动硬头盔项目：

```js
npx 硬头盔启动 
```

在本指南中，你将选择 "创建一个空的 hardhat.config.js "项目，如下图所示：

```js
888 888 888 888
888 888 888 888
888 888 888 888 888b.  888d888 .d88888 88888b.   8888b.  888888
888888 "88b 888P" d88" 888888 "88b "88b 888
888888 .d88888 888888 .d88888 888888
888888 888888 Y88b.
888 888 "Y888888 888 "Y88888 888 "Y888888 "Y888
👷 欢迎访问 Hardhat v2.22.9 👷‍
?您要做什么？ … 
  创建一个 JavaScript 项目
  创建一个 TypeScript 项目
  创建一个 TypeScript 项目（使用 Viem）
👷 创建一个空的 hardhat.config.js
  退出
```

**第 5 步：创建 .env 文件**

现在在项目文件夹中创建 `.env` 文件。 该文件可帮助我们将环境变量从 `.env` 文件加载到 process.env 文件中。

在终端中复制并粘贴此命令，创建一个 `.env` 文件

```js
touch .env
```

配置您的 .env 文件如下：

```
private_key="复制并粘贴本地专用网络提供的任意私人密钥"
```

:::note

在下一节启动专用网络时，就可以访问本地网络提供的私钥。

:::

**第 6 步：设置硬头盔配置**

用以下配置修改 `hardhat.config.js`：

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

## 启动专用网络<a id="launching-private-network"></a>

为了启动专用网络，hardhat utils 插件为我们提供了一项任务，即轻松启动专用网络：

```js
hh klaytn-node
```

![](/img/build/smart-contracts/pn-run-node.png)

## 连接控制台<a id="attaching-console"></a>

专用网络自带 JavaScript 控制台。 通过控制台命令行，您可以向网络发起部分 Kaia API 调用。 要附加到 JavaScript 控制台，请执行以下命令：

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

输入 **kaia** 或 **personal** 可获得可用功能列表。

:::

## 查看账户余额<a id="checking-balance-in-account"></a>

当我们启动私人网络时，它为我们提供了账户列表、私人密钥和每个账户的预资助值。

要查看账户余额，请执行以下命令。

```js
kaia.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
```

![](/img/build/smart-contracts/pn-check-balance.png)

## 配置硬帽网络环境<a id="configuring-hardhat-network-environment"></a>

现在我们正在运行一个独立的本地网络，外部客户端（钱包、dApp）可以连接到该网络，我们需要通过运行此命令配置 hardhat 以使用该网络：

```js
export HARDHAT_NETWORK=localhost
hh accounts
```

```js
hh --network localhost 账户
```

![](/img/build/smart-contracts/pn-lh-accounts.png)

## 创建 KaiaGreeter 智能合约<a id="creating-kaiagreeter-smart-contract"></a>

在本节中，您将创建一个 KaiaGreeter 智能合约。

**步骤 1：** 在资源管理器窗格中新建一个名为 "**合同**"的文件夹，单击 "新建文件 "按钮并新建一个名为 "KaiaGreeter.sol "的文件。

**第 2 步：** 打开文件并粘贴以下代码：

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

## 部署 KaiaGreeter<a id="deploying-kaiagreeter"></a>

在本节中，我们将使用 hardhat-deploy 插件来部署我们的合同。

**步骤 1：** 在资源管理器窗格中，新建一个名为**deploy**的文件夹，然后单击 "新建文件 "按钮，创建一个名为 "deploy.js "的新文件。

**第 2 步：** 将以下代码复制并粘贴到文件中。

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

**步骤 3：** 在终端运行以下命令，告诉 Hardhat 在专用网络上部署你的 KaiaGreeter 合同。

```js
hh 部署 
```

![](/img/build/smart-contracts/pn-deployed-tx.png)

## 使用区块资源管理器验证交易<a id="verifying-transaction-using-block-explorer"></a>

**步骤 1：** 要使用本地 blockscout 浏览器验证我们的交易，请在新终端中运行以下命令：

```js
hh explorer --network localhost
```

```js
[+] 使用 env： {
  DOCKER_RPC_HTTP_URL：'http://host.docker.internal:8545/',
  DOCKER_LISTEN: '0.0.0.0:4000',
  DOCKER_DISABLE_TRACER: 'false',
  DOCKER_DEBUG: '0'
}
[+] 在浏览器中打开：http://localhost：4000
 网络 blockscout_default 创建
 网络 blockscout_default 创建
 容器 blockscout-db-1 创建
 容器 blockscout-frontend-1 创建
 容器 blockscout-smart-contract-verifier-1 创建
 容器 blockscout-创建
 Container blockscout-smart-contract-verifier-1 创建
 Container blockscout-db-1 创建
 Container blockscout-frontend-1 创建
 Container blockscout-redis_db-1 创建
 Container blockscout-backend-1 创建
 Container blockscout-backend-1 创建
 Container blockscout-frontend-1 Starting
 Container blockscout-redis_db-1 Starting
 Container blockscout-smart-contract-verifier-1 Starting
 Container blockscout-db-1 Starting
 Container blockscout-db-1 Started
 Container blockscout-redis_db-1 Started
 Container blockscout-smart-contract-verifier-1 Started
 Container blockscout-backend-1 Started
 Container blockscout-frontend-1 Started
 Container blockscout-backend-1 Started
```

**第 2 步：** 要访问这个区块资源管理器，请在浏览器中打开 [http://localhost:4000](http://localhost:4000)。

第 3 步：在搜索栏中复制并粘贴已部署的合同地址，然后按 Enter 键。 您应该能看到最近部署的合同。

![](/img/build/smart-contracts/pn-verify-tx-block-explorer.png)

## 与已部署的合同互动<a id="interacting-with-deployed-contract"></a>

### 使用硬头盔工具合同任务

1. 要调用已部署合约的只读函数，请运行下面的命令：

```js
hh 调用 KaiaGreeter getTotalGreetings
```

![](/img/build/smart-contracts/pn-read-function.png)

2. 要向已部署的合约发送函数调用事务，请运行下面的命令：

```js
hh 发送 KaiaGreeter 问候
```

```jsx title="Result Result "
发送 KaiaGreeter#greet（tx：0xc0bd25ffb594c13d5ae1f77f7eb02f2978013c69f9f6e22694b76fa26c329e85）...ok（数据块 2837，已用气体：47457）
```

### 使用 Kaia SDK

**步骤 1：** 要使用 [Kaia SDK](https://github.com/kaiachain/kaia-sdk) 与已部署的合约进行交互，需要运行此命令安装 Kaia SDK：

```js
npm install --save @kaiachain/ethers-ext
```

**步骤 2：** 在资源管理器窗格中，新建一个名为 "utils "的文件夹，然后单击 "新建文件 "按钮，在 utils 文件夹中新建一个名为 `kaia-sdk.js` 的文件。

第 3 步：将以下代码复制并粘贴到文件中。

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

**步骤 4：** 要执行本文件中声明的任何函数，请确保像执行 getTotalGreetings() 函数那样取消注释，然后在终端运行以下命令。

```js
node utils/kaia-sdk.js 
```

![](/img/build/smart-contracts/pn-run-kaia-sdk.png)

有关 hardhat-utils 的更深入指南，请参阅 [hardhat-utils github](https://github.com/ayo-klaytn/hardhat-utils)。 此外，您还可以在 [GitHub](https://github.com/ayo-klaytn/kaia-hardhat-utils-example) 上找到本指南的完整代码实现。
