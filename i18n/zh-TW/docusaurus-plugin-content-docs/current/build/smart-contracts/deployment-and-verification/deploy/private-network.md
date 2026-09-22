# 使用專用網絡部署智能合約

<!-- ![](/img/banners/kaia-ken.png) -->

## 導言<a id="introduction"></a>

在本指南中，我們將指導您使用 [Kaia Hardhat Utils](https://github.com/ayo-klaytn/hardhat-utils) 在專用 Kaia 網絡上部署 Greeter 合同。通過本指南，您將學會如何

- 設立 "硬頭巾 "項目。
- 啟動一個模擬啟明星測試網的專用網絡。
- 利用 Hardhat 工具在該私有網絡上部署智能合約。

## 先決條件<a id="prerequisites"></a>

學習本教程的前提條件如下：

- 代碼編輯器：源代碼編輯器，如 [VS Code](https://code.visualstudio.com/download)。
- Docker：如果您沒有安裝 docker，請使用此 [鏈接](https://docs.docker.com/desktop/) 進行安裝。
- [Node.js 和 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)：Node 18 及以上版本。

## 設置開發環境<a id="setting-up-dev-environment"></a>

在本節中，我們將安裝 hardhat、Kaia hardhat utils 和引導項目所需的其他必要依賴項。

**第 1 步：創建項目目錄**

```js
mkdir $HOME/kaia-greeter
cd kaia-greeter 
```

**第 2 步：初始化 npm 項目**

```js
npm init -y
```

**第 3 步：安裝 hardhat、hardhat-utils 和其他依賴項**

- 在終端中複製並粘貼以下代碼，安裝 hardhat 和 hardhat-utils

```js
npm i hardhat @klaytn/hardhat-utils
```

- 複製並粘貼以下代碼以安裝其他依賴項

```js
npm install @nomiclabs/hardhat-ethers hardhat-deploy dotenv
```

:::note

hardhat-utils 插件依賴於 [hardhat-ethers](https://www.npmjs.com/package/@nomiclabs/hardhat-ethers) 和 [hardhat-deploy](https://www.npmjs.com/package/hardhat-deploy) 插件。確保在`hardhat.config.js`或`hardhat.config.ts`中要求或導入它們。

:::

:::info

(建議）安裝硬帽速記裝置。但您仍然可以使用 npx 硬頭盔執行任務。

```js
npm install hardhat-shorthand --save
```

:::

**第 4 步：初始化硬頭盔項目**

運行以下命令啟動硬頭盔項目：

```js
npx 硬頭盔啟動 
```

在本指南中，你將選擇 "創建一個空的 hardhat.config.js "項目，如下圖所示：

```js
888 888 888 888
888 888 888 888
888 888 888 888 888b.  888d888 .d88888 88888b.   8888b.  888888
888888 "88b 888P" d88" 888888 "88b "88b 888
888888 .d88888 888888 .d88888 888888
888888 888888 Y88b.
888 888 "Y888888 888 "Y88888 888 "Y888888 "Y888
👷 歡迎訪問 Hardhat v2.22.9 👷‍
?您要做什麼？ … 
  創建一個 JavaScript 項目
  創建一個 TypeScript 項目
  創建一個 TypeScript 項目（使用 Viem）
👷 創建一個空的 hardhat.config.js
  退出
```

**第 5 步：創建 .env 文件**

現在在項目文件夾中創建 `.env` 文件。該文件可幫助我們將環境變量從 `.env` 文件加載到 process.env 文件中。

在終端中複製並粘貼此命令，創建一個 `.env` 文件

```js
touch .env
```

配置您的 .env 文件如下：

```
private_key="複製並粘貼本地專用網絡提供的任意私人密鑰"
```

:::note

在下一節啟動專用網絡時，就可以訪問本地網絡提供的私鑰。

:::

**第 6 步：設置硬頭盔配置**

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

## 啟動專用網絡<a id="launching-private-network"></a>

為了啟動專用網絡，hardhat utils 插件為我們提供了一項任務，即輕鬆啟動專用網絡：

```js
hh klaytn-node
```

![](/img/build/smart-contracts/pn-run-node.png)

## 連接控制檯<a id="attaching-console"></a>

專用網絡自帶 JavaScript 控制檯。通過控制檯命令行，您可以向網絡發起部分 Kaia API 調用。要附加到 JavaScript 控制檯，請執行以下命令：

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

輸入 **kaia** 或 **personal** 可獲得可用功能列表。

:::

## 查看賬戶餘額<a id="checking-balance-in-account"></a>

當我們啟動私人網絡時，它為我們提供了賬戶列表、私人密鑰和每個賬戶的預資助值。

要查看賬戶餘額，請執行以下命令。

```js
kaia.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
```

![](/img/build/smart-contracts/pn-check-balance.png)

## 配置硬帽網絡環境<a id="configuring-hardhat-network-environment"></a>

現在我們正在運行一個獨立的本地網絡，外部客戶端（錢包、dApp）可以連接到該網絡，我們需要通過運行此命令配置 hardhat 以使用該網絡：

```js
export HARDHAT_NETWORK=localhost
hh accounts
```

```js
hh --network localhost 賬戶
```

![](/img/build/smart-contracts/pn-lh-accounts.png)

## 創建 KaiaGreeter 智能合約<a id="creating-kaiagreeter-smart-contract"></a>

在本節中，您將創建一個 KaiaGreeter 智能合約。

**步驟 1：** 在資源管理器窗格中新建一個名為 "**合同**"的文件夾，單擊 "新建文件 "按鈕並新建一個名為 "KaiaGreeter.sol "的文件。

**第 2 步：** 打開文件並粘貼以下代碼：

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

在本節中，我們將使用 hardhat-deploy 插件來部署我們的合同。

**步驟 1：** 在資源管理器窗格中，新建一個名為**deploy**的文件夾，然後單擊 "新建文件 "按鈕，創建一個名為 "deploy.js "的新文件。

**第 2 步：** 將以下代碼複製並粘貼到文件中。

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

**步驟 3：** 在終端運行以下命令，告訴 Hardhat 在專用網絡上部署你的 KaiaGreeter 合同。

```js
hh 部署 
```

![](/img/build/smart-contracts/pn-deployed-tx.png)

## 使用區塊資源管理器驗證交易<a id="verifying-transaction-using-block-explorer"></a>

**步驟 1：** 要使用本地 blockscout 瀏覽器驗證我們的交易，請在新終端中運行以下命令：

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
[+] 在瀏覽器中打開：http://localhost：4000
 網絡 blockscout_default 創建
 網絡 blockscout_default 創建
 容器 blockscout-db-1 創建
 容器 blockscout-frontend-1 創建
 容器 blockscout-smart-contract-verifier-1 創建
 容器 blockscout-創建
 Container blockscout-smart-contract-verifier-1 創建
 Container blockscout-db-1 創建
 Container blockscout-frontend-1 創建
 Container blockscout-redis_db-1 創建
 Container blockscout-backend-1 創建
 Container blockscout-backend-1 創建
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

**第 2 步：** 要訪問這個區塊資源管理器，請在瀏覽器中打開 [http://localhost:4000](http://localhost:4000)。

第 3 步：在搜索欄中複製並粘貼已部署的合同地址，然後按 Enter 鍵。您應該能看到最近部署的合同。

![](/img/build/smart-contracts/pn-verify-tx-block-explorer.png)

## 與已部署的合同互動<a id="interacting-with-deployed-contract"></a>

### 使用硬頭盔工具合同任務

1. 要調用已部署合約的只讀函數，請運行下面的命令：

```js
hh 調用 KaiaGreeter getTotalGreetings
```

![](/img/build/smart-contracts/pn-read-function.png)

2. 要向已部署的合約發送函數調用事務，請運行下面的命令：

```js
hh 發送 KaiaGreeter 問候
```

```jsx title="Result Result "
發送 KaiaGreeter#greet（tx：0xc0bd25ffb594c13d5ae1f77f7eb02f2978013c69f9f6e22694b76fa26c329e85）...ok（數據塊 2837，已用氣體：47457）
```

### 使用 Kaia SDK

**步驟 1：** 要使用 [Kaia SDK](https://github.com/kaiachain/kaia-sdk) 與已部署的合約進行交互，需要運行此命令安裝 Kaia SDK：

```js
npm install --save @kaiachain/ethers-ext
```

**步驟 2：** 在資源管理器窗格中，新建一個名為 "utils "的文件夾，然後單擊 "新建文件 "按鈕，在 utils 文件夾中新建一個名為 `kaia-sdk.js` 的文件。

第 3 步：將以下代碼複製並粘貼到文件中。

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

**步驟 4：** 要執行本文件中聲明的任何函數，請確保像執行 getTotalGreetings() 函數那樣取消註釋，然後在終端運行以下命令。

```js
node utils/kaia-sdk.js 
```

![](/img/build/smart-contracts/pn-run-kaia-sdk.png)

有關 hardhat-utils 的更深入指南，請參閱 [hardhat-utils github](https://github.com/ayo-klaytn/hardhat-utils)。此外，您還可以在 [GitHub](https://github.com/ayo-klaytn/kaia-hardhat-utils-example) 上找到本指南的完整代碼實現。