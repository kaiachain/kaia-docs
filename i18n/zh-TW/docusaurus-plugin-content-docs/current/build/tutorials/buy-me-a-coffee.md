# 構建 "我買咖啡 "應用程序

## 目錄<a href="#table-of-contents" id="table-of-contents"></a>

- [1. 項目設置](#1-project-setup)
- [2. 創建 "請我喝咖啡 "智能合約](#2-creating-a-buy-me-a-coffee-smart-contract)
- [3. 使用腳本測試合同功能](#3-testing-the-contracts-functionalities-using-scripts)
- [4. 將 BMC 智能合約部署到 Kaia Testnet ](#4-deploying-bmc-smart-contract)
- [5. 使用 React 和 Web3Onboard 構建 BMC 前端](#5-building-the-bmc-frontend-with-react-and-web3onboard)
- [6. 使用 Fleek 在 IPFS 上部署前端代碼](#6-deploying-frontend-code-on-ipfs-using-fleek)
- [7. 結論](#7-conclusion)

## 導言<a href="#1-introduction" id="1-introduction"></a>

Buy Me a Coffee (BMC) 是一個創作者從粉絲或觀眾那裡獲得資金支持和捐贈的平臺。 這些創作者可以是作家、藝術家、音樂家、視頻創作者等。在這個平臺的幫助下，粉絲可以在創作者的成功故事中扮演重要角色，受眾可以對創作者完成的工作表示讚賞，創作者也可以將自己的作品貨幣化。

從高層次上講，Buy-me-a-Coffee 簡化了創作者接受付款的流程，增強了創作者與受眾之間的互動。 這些都是 BMC 平臺上令人興奮的功能。 好的一面是，想象一下區塊鏈上的這個平臺。 現在，創作者將獲得更多好處，例如

- 完全付費，而傳統的 BMC 則對創作者獲得的任何支持收取 5%的費用。
- 透明度高，因為所有交易都記錄在區塊鏈上。
- 無需任何中間環節，直接從粉絲那裡獲得支持費。
- 去中心化，即沒有中央機構控制平臺。

在本教程中 您將構建一個去中心化版本的 Buy Me a Coffee (BMC) 平臺（前端 + 智能合約）。 該平臺將是傳統 BMC 平臺的最小化實現，支持者可以在該平臺上向您支付小費，而您則可以作為合約的所有者，提取交付給 BMC 智能合約的任何小費。 支持者可以通過該網站在咖啡交易中一起發送測試 KAIA 和可愛的信息。

本指南結束時，您將使用以下方法創建此 dApp：

- Solidity：編寫 BMC 智能合約
- NextJs 和 Tailwind：為我們的 BMC dApp 構建前端網站
- Web3Onboard：實現與 Kaia Testnet Kairos 的多錢包連接。
- Fleek：有了 Fleek，我們就能在 IPFS 上託管 BMC dApp。

## 先決條件<a href="#2-prerequisites" id="2-prerequisites"></a>

要完成本教程，您需要

- [Node.js](https://nodejs.org/en/download/package-manager)
- 熟悉 Javascript 和 React 基礎知識，如鉤子等
- 安裝必要的錢包，如 [Coinbase Wallet](https://www.coinbase.com/wallet/downloads) 和 [Metamask Wallet](https://metamask.io/download/)
- 從 [水龍頭](https://faucet.kaia.io) 測試 KAIA。
- RPC 端點：您可以從支持的[端點提供程序](../../references/public-en.md)中獲取。
- 在 [Fleek](https://app.fleek.co/) 上創建賬戶。

## 1. 項目設置<a id="1-project-setup"></a>

在本節中，我們將初始化項目文件夾。 該文件夾將包含兩個單獨的文件夾：

1. frontend 文件夾--其中包含我們 dApp 前端實現的代碼
2. smart-contract 文件夾--其中包含 BMC dApp 的智能合約代碼。

要創建項目文件夾，請在終端中粘貼以下代碼

```bash
mkdir BuyMeACoffee
cd BuyMeACoffee
```

### 1.1. 前臺文件夾

該文件夾包含用於構建項目前端網站的工具。 在本指南中，我們將使用 Next 的 [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) 工具來引導我們的 Next.js 和 Tailwind CSS 項目。 請按照以下步驟安裝必要的依賴項，並創建前臺文件夾：

#### 步驟 1 - 創建前臺文件夾

將下面的代碼粘貼到 BuyMeACoffee 文件夾中，使用 create-next-app 工具創建前端文件夾：

```bash
npx create-next-app frontend
cd frontend
```

#### 步驟 2 - 下載 Tailwind 依賴項並設置其配置

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 步驟 3 - 修改 `tailwind.config.js`

導航至 `tailwind.config.js` 文件，並替換為以下代碼：

```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### 步驟 4 - 替換 styles/global.css 中的代碼

導航至 styles/global.css 文件，並用下面的代碼替換：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

我們已經成功建立了前端項目文件夾。 稍後將討論更多內容。 下一步是設置智能合約文件夾。

### 1.2. 智能合約文件夾

該文件夾包含 BuyMeACoffee 功能的智能合約。 請按照以下步驟安裝必要的依賴項，並創建我們的智能合約文件夾：

#### 步驟 1 - 創建智能合約文件夾

要創建該文件夾，請導航至項目目錄：BuyMeACoffee 並運行以下命令創建智能合約文件夾：

```bash
cd ..
mkdir smart-contract
cd smart-contract
```

#### 步驟 2 - 生成硬禮帽項目模板

該模板適用於編寫、測試和部署智能合約。 首先，在終端運行下面的代碼，啟動一個新的 npm 項目：

```bash
npm init -y
```

這將為您創建一個 package.json 文件，看起來像這樣：

```json
{
  "name": "buymeacoffee",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

然後，安裝 hardhat 和其他依賴項，如 hardhat-toolbox 和 dotenv。 為此，請用下面的代碼替換 package.json 文件：

```json
{
  "name": "buymeacoffee",
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^2.0.2",
    "hardhat": "^2.14.0"
  },
  "dependencies": {
    "dotenv": "^16.0.3"
  }
}
```

最後，在終端中運行 `npm install`。

成功安裝所有依賴項（hardhat、hardhat-toolbox、dotenv）後，您可以通過以下方式確認 hardhat 的安裝：

a. 檢查當前版本：

```bash
 npx hardhat --version 
```

控制檯應打印出當前安裝的版本，在我們的例子中是 **2.14.0.**

b. 查看項目目錄 當前目錄應包括

- **contracts/** - 這是包含智能合約的文件夾。
- **scripts/** - 此文件夾包含在區塊鏈網絡上部署合約的代碼
- **test/** - 該文件夾包含測試智能合約的所有單元測試
- **hardhat.config.ts** - 該文件包含對 Hardhat 工作非常重要的配置，
  智能合約的部署。

## 2. 創建 "請我喝咖啡 "智能合約<a id="creating-a-buy-me-a-coffee-contract"></a>

在本節中，我們將創建容納 BMC 功能的智能合約。 要開始操作，請導航至您的**合同**文件夾，創建一個名為 "BuyMeACoffee.sol "的新文件，並粘貼以下代碼：

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract BuyMeACoffee {
    // event to emit when a message is sent with tip
    event NewCoffee(address indexed _sender, string name, string _message, uint256 _timestamp);

    // address of contract deployer
    address payable owner;
    constructor() {
        // stores deployer as owner
        owner = payable(msg.sender);
    }

    // struct of BuyMeACoffe Tx
    struct BuyCoffee {
        address sender;
        string name;
        uint timestamp;
        string message;
    }

    // maps id to BuyCoffee struct
    mapping (uint => BuyCoffee) idToBuyCoffee;

    // id 
    uint public coffeeId;

    // buy coffee function
    function buyCoffee(string memory name, string memory message) public payable {
	  // Must accept more than 0 KAIA for a coffee.
        require(msg.value > 0, "Tip must be greater than zero");
        coffeeId++;
	
	// Add the coffee tx to storage
        BuyCoffee storage coffee = idToBuyCoffee[coffeeId];
        coffee.message = message;
        coffee.name = name;
        coffee.sender = msg.sender;
        coffee.timestamp = block.timestamp;
         // Emit a NewCoffee event with details about the coffee tx.
        emit NewCoffee(msg.sender, name, message, block.timestamp);
    }

    // withdraw coffee tips to the contract owner
    function withdrawCoffeTips() public {
        require(owner == msg.sender, "Not owner");
        require(owner.send(address(this).balance) );
    }

     // get all coffee
    function getAllCoffee(uint _id) public view returns(BuyCoffee[] memory c){
        require(_id <= coffeeId, "Non-existent id");
        c = new BuyCoffee[](_id);
        for(uint i = 0; i < _id; i++) {
            c[i] = idToBuyCoffee[i + 1];
        }
    }
}
```

讓我們快速瞭解一下每行代碼的作用：

當執行 buyCoffee 函數時，**NewCoffee** 事件就會發生。 它會記錄下發件人地址、發件人姓名、發送的信息和時間戳。

接下來是 **owner** 變量，它代表合同部署者。 然後，我們在構造函數中將 **msg.sender** 設置為合約的所有者。

創建 **coffeeId** 是為了跟蹤所創建的咖啡交易。

隨後，我們聲明瞭一個**buyMeACoffee 結構**，其中存儲了與咖啡交易相關的所有數據：地址發送者、字符串名稱、uint 時間戳、字符串消息。 然後，我們使用 **idToBuyCoffee** 變量將此結構映射為一個 id。

buyCoffee 功能是 BMC 智能合約的核心實現。 這是一個應付款函數，需要兩個參數，即發件人的姓名和地址。 它檢查發送的 KAIA 金額是否大於零。 接下來，它會增加 coffeeId，然後將咖啡 tx 或信息添加到區塊鏈中。 最後，它會發出一個 NewCoffee 事件，其中包含咖啡 tx 的詳細信息。

我們創建了一個 \*\*withdraw()\*\*函數，用於向所有者提取合同的總餘額（`address(this).balance`）。

最後，創建了一個 **getAllCoffee()** 函數。 它將返回所有加班創建的咖啡交易。

現在我們已經完成了 BMC 智能合約的編寫，下一步就是測試智能合約的功能，在 **Kaia Testnet Kairos** 上部署智能合約並與之交互。

## 3. 使用腳本測試合同功能<a id="testing-bmc-contract-using-scripts"></a>

在本節中，我們將編寫腳本來測試智能合約的功能。 要開始使用，請導航至腳本文件夾，新建一個名為 `bmc-sample.js` 的文件，並在其中粘貼以下代碼：

```js
const hre = require("hardhat");
// Logs the KAIA balances of a specific address.
async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt)
}

// Logs the KAIA balances for a list of addresses.
async function getBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
      console.log(`address ${idx} balances`, await getBalance(address));
      idx++;
  }
}

// Logs all the coffee info stored on-chain from coffee tx.
async function getAllCoffee(memos) {
  for (const memo of memos) {
      const timestamp = memo.timestamp;
      const sender = memo.sender;
      const name = memo.name;
      const message = memo.message
      console.log(`At ${timestamp}, ${name}, with ${sender}, said: "${message}"`);
  }
}

async function main() {
  const [owner, tipper1, tipper2, tipper3 ] = await hre.ethers.getSigners();
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffe = await BuyMeACoffee.deploy();
  await buyMeACoffe.deployed();
  console.log(`BuyMeACoffee Contract Address`, buyMeACoffe.address);
  // (========Check Balance==========)
  const addressses = [owner.address, tipper1.address, buyMeACoffe.address];
  console.log("======GET BALANCE=======");
  await getBalances(addressses);
  // Buy Coffee for owner
  const tip = {value: hre.ethers.utils.parseEther("1")}
  await buyMeACoffe.connect(tipper1).buyCoffee("Alice", "Hi Jude", tip);
  await buyMeACoffe.connect(tipper2).buyCoffee("Bob", "Hi Alice", tip);
  await buyMeACoffe.connect(tipper3).buyCoffee("Japhet", "Hi Ox", tip);
  // check balance after tipping 
  console.log("======GET BALANCE AFTER TIPPING=======");
  await getBalances(addressses);
  // withdraw coffee tips
  await buyMeACoffe.connect(owner).withdrawCoffeTips();
  // check balance after withdrawing tip 
  console.log("======GET BALANCE AFTER WITHDRAWING TIP=======");
  await getBalances(addressses);
  // get the current coffee tx id.
  const coffeeId = await buyMeACoffe.coffeeId()
  const id = coffeeId.toString();
  console.log(coffeeId.toString());
  // get all existing coffee tx
  const allCoffee = await buyMeACoffe.getAllCoffee(id);
  
  await getAllCoffee(allCoffee);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

像往常一樣，讓我們來看看每行代碼的作用：

您會注意到，在代碼頂端有一些輔助函數，用於獲取單個地址和多個地址的餘額。 代碼中還有一個主函數，其中包含測試智能合約的功能。

讓我們來看看 **main()** 函數中的代碼。

首先，我們通過調用`await hre.ethers.getSigners()` 來設置賬戶列表（所有者、小費 1、小費 2、小費 3），以便進行測試。

接下來，我們創建了一個合同實例並進行了部署。 在這種情況下，就是 BuyMeACoffee.sol 合同。

然後，我們設置收件人列表，使用 **getBalances()** 函數檢查他們的餘額。 然後，我們在三個不同的實例中調用了**buyCoffee**函數。 接下來，我們檢查了每個地址在咖啡交易後的餘額。

然後，我們調用**提款**函數，將所有資金提取到所有者的地址。 接下來，我們檢查了取款後的地址餘額。

最後，我們調用\*\*getAllCoffee()\*\*函數，獲取智能合約中的所有咖啡交易。 要查看腳本的運行情況，請運行下面的命令：

```bash
npx hardhat run scripts/bmc-coffee.js
```

終端中的輸出結果應該如下所示：

```bash
Ayomitans-MacBook-Pro:smart-contract oxpampam$ npx hardhat run scripts/bmc-sample.js
BuyMeACoffee Contract Address 0x5FbDB2315678afecb367f032d93F642f64180aa3
======GET BALANCE=======
address 0 balances 9999.998295071875
address 1 balances 10000.0
address 2 balances 0.0
======GET BALANCE AFTER TIPPING=======
address 0 balances 9999.998295071875
address 1 balances 9998.999752128832448226
address 2 balances 3.0
======GET BALANCE AFTER WITHDRAWING TIP=======
address 0 balances 10002.998249102355276178
address 1 balances 9998.999752128832448226
address 2 balances 0.0
3
At 1686307885, Alice, with 0x70997970C51812dc3A010C7d01b50e0d17dc79C8, said: "Hi Jude"
At 1686307886, Bob, with 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, said: "Hi Alice"
At 1686307887, Japhet, with 0x90F79bf6EB2c4f870365E785982E1f101E93b906, said: "Hi Ox"
```

## 4. 部署 BMC 智能合約

### 4.1 向 Kaia Testnet 部署 BMC 智能合約 <a id="deploying-bmc-contract"></a>

在成功測試了 BMC 智能合約的功能後，讓我們按以下步驟將其部署到 Kaia Testnet Kairos：

#### 步驟 1 - 創建 .env 文件

現在，在項目文件夾中創建 .env 文件。 該文件可幫助我們將 .env 文件中的環境變量加載到 process.env 文件中。

在終端中粘貼此命令以創建 .env 文件

```bash
touch .env
```

創建文件後，讓我們把 .env 文件配置成這樣：

```bash
KAIROS_TESTNET_URL= "您的 RPC URL"
PRIVATE_KEY= "從 metamask 錢包複製的您的私人密鑰"
```

#### 步驟 2 - 設置硬頭盔配置

將此配置粘貼到 hardhat.config.js 文件中

```
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const KAIROS_TESTNET_URL = process.env.KAIROS_TESTNET_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    kairos: {
      url: KAIROS_TESTNET_URL,
      accounts: [PRIVATE_KEY],
    }
  }
};
```

#### 步驟 3 - 創建部署腳本

要創建一個新的部署腳本，將此智能合約部署到指定網絡，請創建一個新文件 scripts/deploy.js，並粘貼以下代碼：

```js
const hre = require("hardhat");
async function main() {
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffe = await BuyMeACoffee.deploy();
  await buyMeACoffe.deployed();
  console.log(`BuyMeACoffee Contract Address`, buyMeACoffe.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

現在，我們的配置已全部就緒，讓我們運行下面的命令將其部署到 Kaia Testnet Kairos：

```bash
npx hardhat run scripts/deploy.js --network kairos
```

合同部署成功後，您的終端應該是這樣的：

```bash
BuyMeACoffee Contract Address 0x0bEd1ed7B205d8c18e38A20b5BaB6e265A96d1AC
```

恭喜您在 Kaia Kairos 網絡上部署了 BMC 智能合約！ 您可以在 [KaiaScan](https://www.kaiascan.io/) 的搜尋欄位貼上您的地址，以驗證這項交易。

### 4.2 與 BMC 智能合約互動 <a id="interacting-with-bmc-contract"></a>

在本節中，您將學習如何使用硬帽腳本提取發送到智能合約中的咖啡提示。 要開始使用，請在腳本文件夾中新建一個文件 `withdraw.js` 並粘貼下面的代碼：

```js
const hre = require("hardhat");

// contract address of BMC Contract
const buyMeACoffeAddress = "Paste BMC contract address";

// address of the contract deployer
// useful when calling the withdrawCoffeTips() function
// ensure that this address is the SAME address as the original contract deployer
const deployerAddress = "Paste deployer address";
// get the balance of a specified address
async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt)
}

async function main() {
  
  // initialize the deployerAddress to a signer object
  // this will be useful when calling the withdrawCoffeTips() to the owner address
  const signer = await hre.ethers.getSigner(deployerAddress);

  // instantiate the BMC contract
  const BuyMeACoffee = await hre.ethers.getContractAt("BuyMeACoffee", buyMeACoffeAddress, signer);

  const balanceBefore = await getBalance(signer.address);
  const contractBalance = await getBalance(BuyMeACoffee.address);
  console.log(`Owner balance before withdrawing tips: ${balanceBefore} KAIA`);
  console.log(`Contract balance before withdrawing tips:  ${contractBalance} KAIA`);

    // Withdraw funds if there are funds to withdraw.
    if (contractBalance !== "0.0") {
        console.log("withdrawing funds..")
        const withdrawCoffeTxn = await BuyMeACoffee.withdrawCoffeTips();
        await withdrawCoffeTxn.wait();
        // check owner's balance after withdrawing coffee tips
        const balanceAfter = await getBalance(signer.address);
        console.log(`Owner balance after withdrawing tips ${balanceAfter} KAIA`);
      } else {
        console.log("no funds to withdraw!");
      }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

從上面的代碼可以看出，在實例化 BMC 合約後，腳本只有在合約餘額大於零時才會執行 withdrawCoffeTips 函數。  有道理吧？

是的！ 在合同沒有資金的情況下，它會打印 "無資金可提取"，從而為我們節省了一些調用合同的汽油。

讓我們運行下面的腳本，看看它是如何運行的：

```bash
npx hardhat run scripts/withdraw.js --network kairos
```

成功執行腳本後，您的終端應該是這樣的：

```bash
Ayomitans-MacBook-Pro:smart-contract oxpampam$ npx hardhat run scripts/withdraw.js --network kairos
提現提示前的所有者餘額：155.8337532 KAIA
提取提示前的合同餘額：  2.0 KAIA
withdrawing funds...
提取提示後的所有者餘額 157.83298835 KAIA
```

從輸出結果可以看出，提取咖啡小費後，所有者餘額增加了 2 KAIA。

現在，我們已經部署了合同並測試了所有功能，是時候構建前端了。

前端將使 BMC 功能上線，即我們現在可以直觀地看到如何與 BMC 智能合約進行交互。

## 5. 使用 React 和 Web3Onboard 構建 BMC 前端<a id="builidng-bmc-frontend-with-react-and-web3onboard"></a>

在本節中，我們將使用 Next.js 和 Web3Onbaord 構建 dApp 前端網站。 要開始操作，您必須導航到之前創建的前臺文件夾。

```bash
cd ..
cd frontend 
```

下一步是安裝必要的依賴項，以啟動並運行我們的 BMC 前端網站。  以下是需要安裝的軟件包：

1. Web3Onboard 軟件包：Web3-Onboard 是一個與鏈無關的錢包庫，支持在 Kaia 區塊鏈等 EVM 兼容網絡上構建的 dApp 中兼容多個錢包。
2. ether.js：Web3-Onboard 提供商可與 [ethers.js](https://docs.ethers.org/v6/) 和 [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html) 等庫一起使用。 在本指南中，我們將使用 ethers.js 進行 Kaia 區塊鏈調用，如獲取用戶賬戶、獲取餘額、簽署交易、發送交易、讀取和寫入智能合約。

重要提示：我們需要編輯 frontend/pages 文件夾中的 2 個文件

- **_app.js**
- **index.js**

### 5.1 設置 Web3Onboard 提供程序和錢包模塊<a id="setting-up-web3onboard-provider-and-wallet-modules"></a>

#### 步驟 1 - 安裝 @web3-onboard/react

```bash
npm install @web3-onboard/react
```

在`_app.js`文件中，導入 web3OnboardProvider 和 init 函數。 更多內容稍後討論。

```js
import { Web3OnboardProvider, init } from '@web3-onboard/react'
```

#### 步驟 2 - 安裝和實例化錢包模塊

在這一步中，您可以使用錢包模塊在您的 dApp 中添加儘可能多的錢包。 但在本指南中，您將在 web3-Onboard 實現中添加 Coinbase 錢包、WalletConnect、注入式錢包。

```bash
npm install @web3-onboard/coinbase // Coinbase Wallet
npm install @web3-onboard/walletconnect // WalletConnect
npm install @web3-onboard/injected-wallets  // Used to connect to Metamask
```

在您的 `_app.js` 文件中，導入並實例化錢包模塊，以便與您的 dApp 集成。 請注意，每個模塊都有自己獨特的選項參數，如備用 JSON RPC URL 或默認鏈 ID。

```js
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();
const modules = [coinbaseWalletSdk, walletConnect, injected];
```

#### 步驟 3 - 安裝醚類

```bash
npm install --save ethers
```

#### 步驟 4 - 使用 Web3OnboardProvider 實例化 Web3Onboard

Web3OnboardProvider 提供了管理全局狀態的更好方法。 它簡化了在應用程序周圍包裝提供程序對象的過程，初始化的 Web3Onboard 實例將在所有子組件中可用。

Init 函數初始化 web3-Onboard，使其可供所有鉤子使用。

要查看具體操作，請在您的 `_app.js`文件中粘貼前一段代碼下面的代碼：

```js
const ETH_MAINNET_RPC_URL = `https://eth-mainnet.g.alchemy.com/v2/demo`;
const KAIA_MAINNET_URL = `https://public-en.node.kaia.io`;
const KAIROS_TESTNET_URL = `https://public-en-kairos.node.kaia.io`;
  const web3Onboard =  init({
    wallets: modules,
    chains: [
      {
        id: "0x1", // chain ID must be in hexadecimal
        token: "ETH",
        namespace: "evm",
        label: "Ethereum Mainnet",
        rpcUrl: ETH_MAINNET_RPC_URL
      },
      {
        id: "0x2019", // chain ID must be in hexadecimal
        token: "KAIA",
        namespace: "evm",
        label: "Kaia Mainnet",
        rpcUrl: KAIA_MAINNET_URL
      },
      {
        id: "0x3e9", // chain ID must be in hexadecimel
        token: "KAIA",
        namespace: "evm",
        label: "Kairos Testnet",
        rpcUrl: KAIROS_TESTNET_URL
      },
     // you can add as much supported chains as possible
    ],
    appMetadata: {
      name: "Kaia-web3-onboard-App", // change to your dApp name
      icon: "paste your icon url"
      logo: "paste your logo url"
      description: "Web3Onboard-Kaia",
      recommendedInjectedWallets: [
        { name: "Coinbase", url: "https://wallet.coinbase.com/" },
        { name: "MetaMask", url: "https://metamask.io" }
      ]
    }
  })
export default function App({ Component, pageProps }) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Component {...pageProps} />
    </Web3OnboardProvider>
 )
}
```

設置好 _app.js 文件後，我們就可以在所有子組件中使用應用程序的提供程序對象和 web3Onboard 實例了。接下來，我們要在 `index.js` 文件中構建前端邏輯

- Index.js

該頁面處理錢包連接和向 BMC 智能合約發送咖啡，由合約部署者撤回。

```js
import React, { useEffect, useState } from 'react';
import { useConnectWallet } from '@web3-onboard/react'
import abi from "../utils/BuyMeACoffee.json"
import { ethers } from "ethers";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [coffee, setGetCoffee] = useState([]);
  const [coffeeContract, setCoffeeContract] = useState();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const contractAddress = "Paste BMC contract address";
  const contractABI = abi.abi;
  const getCoffee = async () => {
    try {
       console.log("getting coffee Id")
       const coffeeId = await coffeeContract.coffeeId();
       console.log(coffeeId.toString());
       const getCoffee = await coffeeContract.getAllCoffee(coffeeId.toString());
       setGetCoffee(getCoffee);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let ethersProvider
    if (wallet) {
       ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    }
  
    
    if (ethersProvider) {
      try {
        const getCoffeContract = async () => {
          const signer =  await ethersProvider.getSigner();
    
          const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);
    
          setCoffeeContract(buyMeACoffee)
        }
        getCoffeContract();
      } catch (error) {
        console.log(error);
      }
    }
  }, [wallet])
  useEffect(() => {
    const onNewCoffee = (from, timestamp, name, message) => {
      console.log("Coffee received: ", from, timestamp, name, message);
      setGetCoffee((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name
        }
      ]);
    };
      if (wallet && coffeeContract) {
        getCoffee()
        coffeeContract.on("NewCoffee", onNewCoffee);    
      } else {
        console.log("provider not initialized yet");
      }
  }, [wallet, coffeeContract])
  const onNameChange = (event) => {
    setName(event.target.value);
  }
  const onMessageChange = (event) => {
    setMessage(event.target.value);
  }
  const buyCoffee = async (e) => {
    e.preventDefault();
    try {
      if (!wallet && !coffeeContract) {
        console.log("provider not initialized yet");
        return;
      }
        console.log("buying coffee..")
        const coffeeTxn = await coffeeContract.buyCoffee(name, message, {value: ethers.parseEther("1.0")});
        const coffeTx =  await coffeeTxn.wait();
        console.log("mined ", coffeTx.hash);
        console.log("coffee sent!");
        // clear target value fields
        e.target.inputName.value = "";
        e.target.inputAmount.value = "";
        // Clear the form fields.
        setName("");
        setMessage("");
        // set all coffees
        await getCoffee();
    } catch (error) {
      console.log(error);
    }
  };

  return (
     <main className='coffeeMain max-w-8xl min-h-[100vh] p-10 bg-black mt-0 shadow-2xl m-auto flex flex-col justify-center items-center bg-[url("https://static.vecteezy.com/system/resources/previews/001/330/185/original/coffee-cup-on-hand-drawn-doodle-background-free-vector.jpg")]'>
        <div className='coffeContent'>
          <div className='compOne flex flex-col justify-center items-center'>
            <h1 className='text-white text-center text-2xl'>Buy me a coffee</h1>
            { wallet ?
            ( <div>
                <form onSubmit={buyCoffee} className="flex flex-col justify-center items-center mt-4">
                  <input type="text" name='inputName' placeholder="Enter your name" className="p-5 rounded-md bg-black text-white border-solid border-2 border-white outline-0" onChange={onNameChange} />
                  <input type="text" name='inputAmount' placeholder="Send your message" className="p-5 rounded-md bg-black text-white border-solid border-2 border-white mt-3 outline-0" onChange={onMessageChange}/>
                  <input type="submit" value="Send Coffee" className="p-3 mt-4 rounded-2xl bg-white text-black cursor-pointer"/>
                </form>
            </div> ) : (    <button className='text-black bg-white p-3 rounded-lg mt-3 cursor-pointer' disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect'}
      </button>)
        
            }
          </div>
          <div className="comp2 flex flex-col justify-normal items-center py-3 px-10">
            {wallet && ( 
              <div className="flex mt-5 mb-3">
                  <h1 className="text-white text-2xl">Coffee Transaction</h1>
              </div>
              ) }
              <div className="coffeeTransaction w-[1300px] flex flex-row gap-5 overflow-x-scroll">
              {/* grid gap-4 grid-cols-2 */}
                {wallet && (coffee.map((coff, id) => {
                      return (
                        <div key={id} className=" border-solid border-2 border-white p-5 w-auto rounded-2xl mb-3">
                          <p className=" text-white font-bold">"{coff.message}"</p>
                          <p className=" text-white">From: {coff.name} at {`${new Date(coff.timestamp.toString() * 1000)}`}</p>
                        </div>
                      )
                }))}
              </div>
            </div>
        </div>
    </main>
  )
}
```

### 上述代碼的重要說明

1. 獲取合約 ABI：  合約 ABI 向前端代碼指定了智能合約上可調用的函數。 要獲取合同 abi，請導航至 smart-contract 文件夾，並按照以下路徑複製該文件中的文本 **artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json**.  接下來，我們在 **frontend/src** 文件夾中創建了一個 utils 文件夾。 然後將其粘貼到新創建的名為 BuyMeACoffee.json 文件中。

2. 將 BMC 合同地址更改為 BMC 部署的合同地址。

現在，如果應用程序尚未運行，你可以進入 shell，使用 `npm run dev` 啟動本地服務器，測試你的更改。 網站應在幾秒鐘內加載完畢，用戶界面應如下所示：

連接錢包頁面：

![](/img/build/tutorials/bmc-cw.png)

發送咖啡的前端網站

![](/img/build/tutorials/bmc-frontend.png)

現在，讓我們探索一下我們的網站和代碼。

從上面的截圖中您可以看到，當您第一次訪問 dApp 時，它會要求您連接一個錢包。  接下來會彈出 Web3Onboard 實例中已初始化的可用錢包列表。

然後，選擇您所需的錢包；如上圖所示，我們選擇了 MetaMask。 連接錢包後，您會在網站右上方看到一個用戶界面組件，其中包含所連接錢包的詳細信息。 您還可以在頁面上看到咖啡交易表單，其中包含發送者的姓名和信息，以及其他訪客之前向智能合約支付的咖啡。

## 6. 使用 Fleek 在 IPFS 上部署前端代碼<a id="deploying-bmc-frontend-to-ipfs-using-fleek"></a>

Fleek 是一種基礎設施，使我們能夠在 IPFS 上構建現代網站和應用程序。 有了 fleek，您的網站或應用程序將變得無權限、無信任、無審查，並且不受集中式看門人的限制。 在本教程中，我們將把 Next js 應用程序部署到 Fleek，而不是 Vercel 等傳統平臺。
是的，你說對了！ 我們正在一個分散託管平臺上部署一個分散應用程序！

以下是將 BMC dApp 部署到 Fleek 的步驟：

1. 確保在前端代碼中確認這些配置：

   a. 打開 package.json，添加以下腳本：

   ```js
   	"scripts": {
   	 "dev": "next",
   	 "build": "next build",
   	  "start": "next start",
   		  "export": "next export"  
   	}
   ```

   b. 將下面的代碼粘貼到根目錄下的 next.config.js 文件中：

   ```js
   	module.exports = {
   		exportTrailingSlash: true,
   	};
   ```

如需瞭解更多信息，請訪問本 [指南](https://blog.fleek.co/posts/fleek-nextJS)

2. 導航至 Fleek 上的儀錶板，點擊 \*\* 添加新網站\*\*

![](/img/build/tutorials/fleek-addsite.png)

3. 連接 GitHub 賬戶以訪問您的軟件源。

![](/img/build/tutorials/fleek-cg.png)

4. 選擇要部署的版本庫。

5. 在下一頁，在 "基本構建設置 "選項卡中選擇 "**下一個 Js** 框架"，Fleek 將自動填充其他字段。

6. 點擊部署網站

7. 如果出現 **npm WARN EBADENGINE 不支持的引擎**，如下圖所示：

![](/img/build/tutorials/fleek-err.png)

前往**部署**選項卡中的**部署設置**，將**Docker 鏡像名稱**更改為**節點:最新**，如下圖所示：

![](/img/build/tutorials/fleek-err-fix.png)

8. 現在，您的網站應能輕鬆構建並部署到 IPFS。
9. 點擊生成的鏈接查看您的網站。

![](/img/build/tutorials/fleek-site-url.png)

瞧 我們在 IPFS 上部署並託管了 BMC dApp。

## 7. 結論<a id="conclusion"></a>

如果您已經走到這一步，那麼恭喜您！ 在本教程中，您將學會如何使用 Solidity、NextJs、Web3Onboard 和 Fleek 創建一個全棧的 Buy Me A Coffee dApp。 這是在去中心化平臺上創建去中心化應用程序的第一步。

在此基礎上，您還可以在前臺探索一些其他選項，比如除了靜態發送 1 KAIA 咖啡外，還可以添加一個新的輸入字段，用於輸入要發送的咖啡量。 您可以訪問 [github](https://github.com/ayo-klaytn/buy-me-a-coffee) 上的完整代碼庫，也可以使用 [link](https://spring-fog-0605.on.fleek.co/) 測試網站。

如果您想了解更多信息，請訪問 [Kaia 文檔](https://docs.klaytn.foundation/)、[Web3Onboard 文檔](https://onboard.blocknative.com/docs/modules/react) 和 [Fleek 文檔](https://docs.fleek.co/tutorials/hosting/)。 如果您有任何問題，請訪問 [Kaia 論壇](https://devforum.kaia.io/)。
