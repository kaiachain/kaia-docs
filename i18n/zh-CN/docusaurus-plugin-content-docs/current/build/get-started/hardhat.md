# 使用 Hardhat 部署第一个智能合约

![](/img/banners/kaia-hardhat.png)

## 导言

本节将指导你使用 [Hardhat](https://hardhat.org/) 向凯亚-凯罗斯网络部署灵魂令牌。

Hardhat 是一个智能合约开发环境，它将为您提供帮助：

- 开发和编译智能合约。
- 调试、测试和部署智能合约和 dApp。

灵魂代币（SBT）是不可转让的 NFT。 也就是说，一旦获得，就不得出售或转让给其他用户。 要了解有关 SBT、其工作原理和使用案例的更多信息，可以查看 Vitalik Buterin 发表的这篇 [参考文章](https://vitalik.eth.limo/general/2022/01/26/soulbound.html)。

完成本指南后，您将能够

- 在 Kaia 上建立一个 "Hardhat "项目。
- 创建一个简单的灵魂绑定令牌。
- 使用 Hardhat 编译智能合约。
- 使用 Hardhat 测试、部署智能合约并与之交互。
- 探索 Hardhat 分叉功能。

## 先决条件

学习本教程的前提条件如下：

- 代码编辑器：源代码编辑器，如 [VS Code](https://code.visualstudio.com/download)。
- [Metamask](../tutorials/connecting-metamask.mdx#install-metamask)：用于部署合约、签署事务和与合约交互。
- RPC 端点：可从支持的[端点提供程序](../../references/public-en.md)中获取。
- 从 [水龙头](https://faucet.kaia.io)测试 KAIA：为账户注入足够的 KAIA。
- [NodeJS和NPM](https://nodejs.org/en/)

## 设置开发环境

要使用 hardhat，我们需要建立开发环境并安装 hardhat。 让我们按以下步骤来做：

**第 1**步创建项目目录

```bash
mkdir soulbound-tokens
cd soulbound-tokens
```

**步骤 2**：初始化 npm 项目

在终端中粘贴此命令以创建 package.json 文件

```bash
npm init -y
```

**第 3 步**：安装 hardhat 和其他依赖项：

- 在终端中粘贴下面的代码安装 hardhat

```bash
npm install --save-dev hardhat
```

- 粘贴下面的代码以安装其他依赖项

```bash
npm install dotenv @kaiachain/contracts
```

> 注意：这将安装本项目所需的其他依赖项，包括 `hardhat`、`kaiachain/contract`、`dotenv` 等。

**第 4 步**：初始化硬头盔项目：

:::note
本指南使用 Hardhat v2。 如果您希望使用 Hardhat v3，请参阅本<a href="https://docs.kaia.io/build/cookbooks/secure-wallet-cookbook/#33-recipe-securely-managing-accounts-in-a-hardhat-project" target="_self">设置指南 </a>获取配置说明
:::

运行以下命令启动硬头盔项目

```bash
npx hardhat --init
```

![](/img/build/get-started/hh2-cli.png)

在本指南中，您将选择一个使用 Mocha 和 Ethers 的 Javascript 项目，如下所示：

![](/img/build/get-started/hh2-cli-ii.png)

接受提示的默认答案。

初始化硬帽项目后，当前目录应包括

**contracts/** - 此文件夹包含智能合约代码。

**ignition/modules/** - 该文件夹包含在区块链网络上部署合约的代码。

**test/** - 该文件夹包含测试智能合约的所有单元测试。

**hardhat.config.js**--该文件包含对 Hardhat 工作和部署 soulbound 令牌非常重要的配置。

**第 5** 步创建`.env`文件

现在在项目文件夹中创建 `.env` 文件。 该文件可帮助我们将环境变量从 `.env` 文件加载到 process.env 文件中。

- 在终端中粘贴此命令以创建 `.env` 文件

```bash
touch .env
```

- 创建文件后，让我们把 `.env` 文件配置成这样：

```js
 KAIROS_TESTNET_URL= "Kairos RPC URL"
 PRIVATE_KEY= "从 MetaMask 钱包复制的私人密钥"
```

> 注：你也可以选择使用 hardhat 提供的[配置变量](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables) 功能来配置不应包含在代码库中的变量。

**第 6 步**：设置Hardhat配置

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

现在，我们的开发环境已经准备就绪，让我们开始编写灵魂代币智能合约吧。

## 创建 SBT 智能合约

在本节中，您将使用 [Kaia Contracts](https://github.com/kaiachain/kaia-contracts)：这是一个建立在社区验证代码坚实基础上的安全智能合约开发库。 它是开放式齐柏林合同的分叉。

> 注意：您已在 "设置开发环境 "一节的第 3\*\* 步安装了该库。

**步骤 1**：在资源管理器窗格中选择合同文件夹，单击 "新建文件 "按钮并创建名为 "SBT.sol "的新文件

**第 2**步打开文件并粘贴以下代码：

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

**代码演练**

这就是你的智能合约。 **第 1** 行显示 Hardhat 使用的是 0.8.7 或更高版本的 Solidity。 除此之外，它还导入了 KIP17.sol 和其他辅助合同。 从第6-12\*\*行开始，创建了一个继承KIP17的智能合约。 此外，构造函数中还传递了标记名称和符号。

如上代码所示，令牌名称和符号已分别设置为 **SoulBoundToken** 和 **SBT**。 您可以随意更改令牌名称和符号。

该合约的一个主要特点是禁止代币转让，这使得发行的代币成为灵魂债券。

## 测试 SBT 智能合约

在本节中，我们将测试一些合同功能。

**步骤 1**：在资源管理器窗格中，选择测试文件夹并单击 "新建文件 "按钮，创建一个名为 "sbtTest.js "的新文件。

**步骤 2**：在 `sbtTest.js` 文件中复制以下代码。

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

在你刚刚复制的代码中，第 7 行和第 12 行显示你从 hardhat-network-helpers 的 [Chai](https://www.chaijs.com/api/bdd/) 和 [loadFixture](https://hardhat.org/tutorial/testing-contracts#reusing-common-test-setups-with-fixtures) 中导入了 expect。

上述测试可检查以下内容：

- 特定代币 ID 的所有者是否与该代币的铸造者相同？
- 是否禁止在账户之间转移代币？

**第 3 步**：要运行测试，请运行以下命令：

```bash
npx 硬帽测试 test/sbtTest.js 
```

![](/img/build/get-started/hh2-run-test.png)

如需更深入的测试指南，请查看 [Hardhat 测试](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)。

## 部署智能合约

Ignition 模块是 JavaScript/Typescript 文件，可帮助您将合约部署到区块链网络。 在本节中，您将为智能合约创建一个模块。

**步骤 1**：在资源管理器窗格中，选择**ignition/module**文件夹，然后单击 "新建文件 "按钮，创建一个名为 "sbtDeploy.js "的新文件。

**第 2**步将以下代码复制并粘贴到文件中。

```javascript
// 此设置使用 Hardhat Ignition 管理智能合约部署。
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("SBTModule", (m) => {

  const sbt = m.contract("SoulBoundToken", []);

  return { sbt };
})；
```

**第 3 步**：在终端运行以下命令，让 Hardhat 在 Kaia Kairos 测试网上部署 SBT 令牌。

```bash
npx hardhat ignition deploy ./ignition/modules/sbtDeploy.js --network kairos
```

![](/img/build/get-started/hh-deploy.png)

**第 4 步**：打开 [KaiaScan](https://kairos.kaiascan.io/) 检查 SBT 令牌是否已成功部署。

**第 5 步**：在搜索栏中复制并粘贴部署的合同地址，然后按 Enter 键。 您应该能看到最近部署的合同。

![](/img/build/get-started/hh-deploy-kaiascan.png)

## 硬帽叉

Hardhat 为开发人员提供了在本地开发网络中模拟主网（任何给定区块）的功能。 这一功能的主要好处之一是，它能让开发人员与已部署的合同进行交互，还能为复杂的案例编写测试。

要使该功能有效运行，您需要连接到存档节点。 您可在 [此处](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#forking-other-networks) 阅读有关此功能的更多信息。

### 分叉主网

现在，我们已经建立了 Hardhat 项目，让我们使用 Hardhat fork Kaia 主网。  打开终端，运行以下命令

```bash
npx hardhat node --fork<YOUR ARCHIVE NODE URL>

npx hardhat node --fork https://archive-en.node.kaia.io
```

您也可以配置 `hardhat.config.js` - Hardhat Network 始终这样做：

```
networks: {
  hardhat: {
    forking: {
      url: "<YOUR ARCHIVE NODE URL>",
    }
  }
}
```

**输出**

![](/img/build/get-started/hh2-fork-instance.png)

成功运行该命令后，您的终端看起来就像上图一样。  您将拥有 20 个开发账户，这些账户预存了 10,000 个测试代币。

分叉链的 RPC 服务器正在`http://127.0.0.1:8545/`监听。  您可以通过查询最新的区块编号来验证分叉网络。 让我们尝试使用 cURL 访问 RPC，以获取区块编号。  打开一个新的终端窗口，使用以下命令：

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

**输出**

![](/img/build/get-started/hh2-forked-ins-i.png)

输出结果为十六进制，如上图所示。 要从十六进制中获取块编号，请使用此 [工具](https://www.rapidtables.com/convert/number/hex-to-decimal.html) 将十六进制转换为十进制。 您应该从分叉网络时获得最新的区块编号。 您可以在 [KaiaScan](https://kaiascan.io/) 上确认区块编号。

### 在街区分叉

使用硬头盔，您可以在特定区块分叉主网。  在这种情况下，让我们在区块编号 "105701850 "处分叉链。

```bash
npx hardhat node --fork<YOUR ARCHIVE NODE URL> --fork-block-number 105701850

npx hardhat node --fork https://archive-en.node.kaia.io --fork-block-number 105701850
```

要在指定区块确认分叉链，请打开一个新的终端窗口并使用以下命令：

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

![](/img/build/get-started/hh2-forked-ins-ii.png)

输出返回十六进制，使用此 [工具](https://www.rapidtables.com/convert/number/hex-to-decimal.html) 转换后应等于 `105701850`。

有关 Hardhat 的更深入指南，请参阅 [Hardhat 文档](https://hardhat.org/hardhat-runner/docs/getting-started)。 此外，您还可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/hardhat/soulbound-tokens) 上找到本指南的完整代码实现。
