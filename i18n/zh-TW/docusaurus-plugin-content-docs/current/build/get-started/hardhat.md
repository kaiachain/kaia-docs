# 使用 Hardhat 部署第一個智能合約

![](/img/banners/kaia-hardhat.png)

## 導言

本節將指導你使用 [Hardhat](https://hardhat.org/) 向Kaia-Kairos網絡部署靈魂令牌。

Hardhat 是一個智能合約開發環境，它將為您提供幫助：

- 開發和編譯智能合約。
- 調試、測試和部署智能合約和 dApp。

Soulbound tokens(SBTs) 是不可轉讓的 NFT。 也就是說，一旦獲得，就不得出售或轉讓給其他用戶。 要了解有關 SBT、其工作原理和使用案例的更多信息，可以查看 Vitalik Buterin 發表的這篇 [參考文章](https://vitalik.eth.limo/general/2022/01/26/soulbound.html)。

完成本指南後，您將能夠

- 在 Kaia 上建立一個 "Hardhat "項目。
- 建立一個簡單的靈界信物。
- 使用 Hardhat 編譯智能合約。
- 使用 Hardhat 測試、部署智能合約並與之交互。
- 探索 Hardhat 分叉功能。

## 先決條件

學習本教程的前提條件如下：

- 代碼編輯器：源代碼編輯器，如 [VS Code](https://code.visualstudio.com/download)。
- [Metamask](../tutorials/connecting-metamask.mdx#install-metamask)：用於部署合約、簽署事務和與合約交互。
- RPC 端點：可從支持的[端點提供程序](../../references/public-en.md)中獲取。
- 從 [Faucet](https://faucet.kaia.io)測試 KAIA：為賬戶注入足夠的 KAIA。
- [NodeJS和NPM](https://nodejs.org/en/)

## 設置開發環境

要使用 hardhat，我們需要建立開發環境並安裝 hardhat。 讓我們按以下步驟來做：

**第 1**步創建項目目錄

```bash
mkdir soulbound-tokens
cd soulbound-tokens
```

**步驟 2**：初始化 npm 項目

在終端中粘貼此命令以創建 package.json 文件

```bash
npm init -y
```

**第 3 步**：安裝 hardhat 和其他依賴項：

- 在終端中粘貼下面的代碼安裝 hardhat

```bash
npm install --save-dev hardhat
```

- 粘貼下面的代碼以安裝其他依賴項

```bash
npm install dotenv @kaiachain/contracts
```

> 注意: 這會安裝本專案所需的其他相依性，包括 `hardhat`、`kaiachain/contract`、`dotenv` 等。

**第 4 步**：初始化硬頭盔項目：

:::note
本指南使用 Hardhat v2。 如果您偏好使用 Hardhat v3，請參考此<a href="https://docs.kaia.io/build/cookbooks/secure-wallet-cookbook/#33-recipe-securely-managing-accounts-in-a-hardhat-project" target="_self">設定指南 </a>的設定指示
:::

運行以下命令啟動硬頭盔項目

```bash
npx hardhat --init
```

![](/img/build/get-started/hh2-cli.png)

在本指南中，您將選擇一個使用 Mocha 和 Ethers 的 Javascript 專案，如下所示：

![](/img/build/get-started/hh2-cli-ii.png)

接受提示的預設答案。

初始化硬帽項目後，當前目錄應包括

**contracts/** - 此文件夾包含智能合約代碼。

**ignition/modules/** - 該文件夾包含在區塊鏈網絡上部署合約的代碼。

**test/** - 該文件夾包含測試智能合約的所有單元測試。

**hardhat.config.js** - 此檔案包含對 Hardhat 工作和部署 soulbound 令牌很重要的設定。

**步驟 5**：建立`.env`檔案

現在在專案資料夾中建立您的 `.env` 檔案。 此檔案可協助我們將 `.env` 檔案中的環境變數載入 process.env。

- 在終端機中貼上此指令以建立`.env`檔案

```bash
touch .env
```

- 建立檔案後，讓我們將 `.env` 檔案設定成這樣：

```js
 KAIROS_TESTNET_URL= 「您的 Kairos RPC URL」
 PRIVATE_KEY= 「您從 MetaMask 皮夾複製的私密金鑰」
```

> 注：你也可以選擇使用 hardhat 提供的[配置變量](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables) 功能來配置不應包含在代碼庫中的變量。

**第 6 步**：設置Hardhat配置

用以下配置修改 `hardhat.config.js`：

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

現在我們的開發環境都已準備就緒，讓我們開始撰寫我們的 soulbound 代幣智慧型契約。

## 創建 SBT 智能合約

在本節中，您將使用 [Kaia Contracts](https://github.com/kaiachain/kaia-contracts)：這是一個建立在社區驗證代碼堅實基礎上的安全智能合約開發庫。 它是開放式齊柏林合同的分叉。

> 注意：您已在 "設置開發環境 "一節的第 3\*\* 步安裝了該庫。

**步驟 1**：在資源管理器窗格中選擇合同文件夾，單擊 "新建文件 "按鈕並創建名為 "SBT.sol "的新文件

**第 2**步打開文件並粘貼以下代碼：

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

**代碼演練**

這就是你的智能合約。 **第 1** 行顯示 Hardhat 使用的是 0.8.7 或更高版本的 Solidity。 除此之外，它還導入了 KIP17.sol 和其他輔助合同。 從第6-12\*\*行開始，創建了一個繼承KIP17的智能合約。 此外，構造函數中還傳遞了標記名稱和符號。

如上代碼所示，令牌名稱和符號已分別設置為 **SoulBoundToken** 和 **SBT**。 您可以隨意更改令牌名稱和符號。

該合約的一個主要特點是禁止代幣轉讓，這使得發行的代幣成為靈魂債券。

## 測試 SBT 智能合約

在本節中，我們將測試一些合同功能。

**步驟 1**：在資源管理器窗格中，選擇測試文件夾並單擊 "新建文件 "按鈕，創建一個名為 "sbtTest.js "的新文件。

**步驟 2**：在 `sbtTest.js` 文件中複製以下代碼。

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

在你剛剛複製的代碼中，第 7 行和第 12 行顯示你從 hardhat-network-helpers 的 [Chai](https://www.chaijs.com/api/bdd/) 和 [loadFixture](https://hardhat.org/tutorial/testing-contracts#reusing-common-test-setups-with-fixtures) 中導入了 expect。

上述測試可檢查以下內容：

- 特定代幣 ID 的所有者是否與該代幣的鑄造者相同？
- 是否禁止在賬戶之間轉移代幣？

**第 3 步**：要運行測試，請運行以下命令：

```bash
npx 硬帽測試 test/sbtTest.js 
```

![](/img/build/get-started/hh2-run-test.png)

如需更深入的測試指南，請查看 [Hardhat 測試](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)。

## 部署智能合約

Ignition 模組是 JavaScript/Typescript 檔案，可協助您將契約部署到區塊鏈網路。 在本節中，您將為智慧契約建立一個模組。

**步驟 1**：在資源總管窗格中，選擇 **ignition/module** 資料夾，然後按一下「新增檔案」按鈕，建立一個名為 `sbtDeploy.js` 的新檔案。

**第 2**步將以下代碼複製並粘貼到文件中。

```javascript
// 此設定使用 Hardhat Ignition 管理智慧契約部署。
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("SBTModule", (m) => {

  const sbt = m.contract("SoulBoundToken", []);

  return { sbt };
})；
```

**步驟 3**：在終端機執行下列指令，告訴 Hardhat 在 Kaia Kairos Testnet 上部署您的 SBT 令牌。

```bash
npx hardhat ignition deploy ./ignition/modules/sbtDeploy.js --network kairos
```

![](/img/build/get-started/hh-deploy.png)

**步驟 4**：開啟 [KaiaScan](https://kairos.kaiascan.io/) 檢查 SBT 令牌是否已成功部署。

**第 5 步**：在搜索欄中複製並粘貼部署的合同地址，然後按 Enter 鍵。 您應該能看到最近部署的合同。

![](/img/build/get-started/hh-deploy-kaiascan.png)

## 硬帽叉

Hardhat 為開發人員提供了在本地開發網絡中模擬主網（任何給定區塊）的功能。 這一功能的主要好處之一是，它能讓開發人員與已部署的合同進行交互，還能為複雜的案例編寫測試。

要使該功能有效運行，您需要連接到存檔節點。 您可在 [此處](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#forking-other-networks) 閱讀有關此功能的更多信息。

### 分叉主網

現在，我們已經建立了 Hardhat 項目，讓我們使用 Hardhat fork Kaia 主網。  打開終端，運行以下命令

```bash
npx hardhat node --fork<YOUR ARCHIVE NODE URL>

npx hardhat node --fork https://archive-en.node.kaia.io
```

您也可以配置 `hardhat.config.js` - Hardhat Network 始終這樣做：

```
networks: {
  hardhat: {
    forking: {
      url: "<YOUR ARCHIVE NODE URL>",
    }
  }
}
```

**輸出**

![](/img/build/get-started/hh2-fork-instance.png)

成功運行該命令後，您的終端看起來就像上圖一樣。  您將擁有 20 個開發賬戶，這些賬戶預存了 10,000 個測試代幣。

分叉鏈的 RPC 服務器正在`http://127.0.0.1:8545/`監聽。  您可以通過查詢最新的區塊編號來驗證分叉網絡。 讓我們嘗試使用 cURL 訪問 RPC，以獲取區塊編號。  打開一個新的終端窗口，使用以下命令：

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

**輸出**

![](/img/build/get-started/hh2-forked-ins-i.png)

輸出結果為十六進制，如上圖所示。 要從十六進制中獲取塊編號，請使用此 [工具](https://www.rapidtables.com/convert/number/hex-to-decimal.html) 將十六進制轉換為十進制。 您應該從分叉網絡時獲得最新的區塊編號。 您可以在 [KaiaScan](https://kaiascan.io/) 上確認區塊號碼。

### 在街區分叉

使用硬頭盔，您可以在特定區塊分叉主網。  在這種情況下，讓我們在區塊編號 "105701850 "處分叉鏈。

```bash
npx hardhat node --fork<YOUR ARCHIVE NODE URL> --fork-block-number 105701850

npx hardhat node --fork https://archive-en.node.kaia.io --fork-block-number 105701850
```

要在指定區塊確認分叉鏈，請打開一個新的終端窗口並使用以下命令：

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

![](/img/build/get-started/hh2-forked-ins-ii.png)

輸出返回十六進制，使用此 [工具](https://www.rapidtables.com/convert/number/hex-to-decimal.html) 轉換後應等於 `105701850`。

有關 Hardhat 的更深入指南，請參閱 [Hardhat 文檔](https://hardhat.org/hardhat-runner/docs/getting-started)。 此外，您還可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/hardhat/soulbound-tokens) 上找到本指南的完整代碼實現。
