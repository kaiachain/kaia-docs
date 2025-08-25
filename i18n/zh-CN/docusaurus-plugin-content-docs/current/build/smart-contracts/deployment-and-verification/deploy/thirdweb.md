# 使用 Thirdweb 部署智能合约

![](/img/banners/kaia-thirdweb.png)

## 导言<a id="introduction"></a>

本节将指导您使用 [ThirdWeb](https://portal.thirdweb.com/)，在 Kaia Network 上部署 Marketplace 合同和相应的 NFT 收集合同。 Thirdweb 是一个完整的 Web3 开发框架，可为您提供将应用程序和游戏连接到去中心化网络所需的一切。

市场合约允许用户列出 NFT 进行直接销售或拍卖，从而加强了 NFT 的买卖，就像在 OpenSea 上所做的那样。

完成本指南后，您将能够

- 使用 thirdweb 创建和定制合同。
- 使用 thirdweb 对智能合约进行编译、部署和交互。

## 入门<a id="getting-started"></a>

在本文中，我们将探讨使用 thirdweb 创建、自定义和部署合同的不同方法，即

- 使用第三网络仪表板
- 使用 thirdweb CLI

在本指南中，我们将演示如何使用 thirdweb 控制面板部署 MarketPlace 合同，并使用 thirdweb CLI 部署相应的 nft 集合，以便在市场上列出。

> 注：我们将不解释市场合约的机制，因为我们的重点是探索用于创建、部署和与智能合约交互的 thirdweb 面板和 CLI。

## 使用 thirdweb 仪表板创建和部署市场合同<a id="creating-and-deploying-thirdweb-dashboard"></a>

在本节中，我们将使用 thirdweb 面板创建并部署市场合同。 为此，请按照以下步骤操作：

1. 前往 [thirdweb dashboard](https://thirdweb.com/dashboard?ref=blog.thirdweb.com)，从合同列表中选择 **MarketPlace** 合同。

![](/img/build/get-started/marketplace-explore.png)

2. 在合同概览仪表板中单击**立即部署**。

![](/img/build/get-started/marketplace-deploy.png)

3. 配置市场合同，使其包含以下参数：市场的**名称**、**描述**和**图像**。

![](/img/build/get-started/marketplace-contract-details.png)

4. 点击 **立即部署**，如上图所示，然后等待交易完成。

![](/img/build/get-started/marketplace-deployed.png)

交易成功执行后，您可以在 [KaiaScan](https://kaiascan.io/) 的搜索栏中粘贴合同地址，以验证您的部署。

## 使用 thirdweb CLI 创建和部署 NFT 收集合同<a id="creating-deploying-using-thirdweb-cli"></a>

在本节中，我们将使用 [thirdweb CLI](https://portal.thirdweb.com/cli?ref=blog.thirdweb.com)创建和部署将在 Marketplace 中列出的 NFT 程序集。 为此，请按照以下步骤操作：

### 创建合同<a id="creating-the-contract"></a>

1. 在终端中运行此命令来创建合同：

```bash
npx thirdweb create --contract
```

2. 输入您喜欢的命令行提示值：

   i. 为项目命名

   ii. 选择您喜欢的框架：**Hardhat** 或 **Foundry**.

   iii. 为智能合约命名

   iv. 选择基本合同类型：**空**、**ERC20**、**ERC721** 或 **ERC1155**。 添加任何所需的**扩展名**。 在本教程中，我们将选择 ERC721，并将扩展名设置为 "无"。

![](/img/build/get-started/thirdweb-cli-info.png)

3. 创建完成后，请导航至项目根目录，并在首选代码编辑器中打开项目。

4. 打开合同文件夹，合同应该是这样的：

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@thirdweb-dev/contracts/base/ERC721Base.sol";
contract nftcollection is ERC721Base {
      constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC721Base(
            _defaultAdmin,
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {}
}
```

上述合约演示了[ERC721Base](https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Base.sol) 的基本功能。 它导入并继承了 **ERC721Base** 合约，还实现了所需的方法，包括构造函数及其从属参数。

您可以根据自己需要的自定义逻辑修改合同，一旦完成，您的合同就可以部署了。

### 部署合同<a id="deploying-the-contracts"></a>

1. 导航至项目根文件夹，在终端中运行该命令：

```bash
npx thirdweb deploy
```

执行该命令将触发以下操作：

- 检测框架（硬帽、代工厂）
- 编译当前目录下的所有合同。
- 允许您选择要部署的合同。
- 将编译好的智能合约代码（以应用程序二进制接口（ABI）的形式）上传到 IPFS。

2. 部署完成后，将打开一个仪表板界面，填写其余参数。
   - **_name**：合同名称
   - **_symbol**：符号或 "股票代码"
   - **_版税收款人**：接收二次销售版税的钱包地址
   - **_特许权使用费基点**：每次二次销售将给予特许权使用费收取人的基点 (bps)，如 500 = 5%。

3. 选择 "Kaia Mainnet "作为部署合同的网络。

![](/img/build/get-started/nft-collection-deploy.png)

4. 智能合约部署完成后，您可以通过其仪表板管理其他设置和功能。 例如，您可以上传 NFT、配置权限和访问控制以及添加新功能。

有关 thirdweb 部署命令的更多信息，请参阅 [deploy guide](https://portal.thirdweb.com/deploy/getting-started) 。

## 与已部署的合同互动<a id="interacting-with-deployed-contracts"></a>

在本节中，我们将分别使用**mint**和**transferfrom**函数铸造一个 NFT 并将其转入另一个账户。 让我们按以下步骤来了解一下：

### 铸币厂<a id="minting-nft"></a>

1. 导航至新部署的合同 (**puppyKlan-NC**) 面板。
2. 点击合同仪表板下**NFTs**选项卡中的**mint**功能。

![](/img/build/get-started/puppy-mint-btn.png)

3. 填写铸造 NFT 所需的参数：**名称**、媒体\*\*、描述**和属性**。

![](/img/build/get-started/puppy-mint-details.png)

4. 核对输入内容，然后点击 **Mint NFT** 按钮。
5. 确认交易，等待交易完成。 完成后，您会看到仪表板上添加了 NFT，如下图所示：

![](/img/build/get-started/puppy-minted.png)

### 向新业主转让 NFT<a id="transferring-nft-to-new-owner"></a>

1. 前往合同 (**puppyKlan-NC**) 面板中的资源管理器选项卡。
2. 在 "写 "选项卡下选择 **transferFrom** 功能，如下图所示。
3. 填写必要的函数参数：from（地址）、to（地址）和 id（uint256）。

![](/img/build/get-started/puppy-transferfrom.png)

4. 确认交易，等待交易完成。

## 结论<a id="conclusion"></a>

祝贺你 如果您读到了本指南的结尾。 如果您有任何问题，请访问 [Kaia 论坛](https://devforum.kaia.io/) 或联系 [官方第三网络支持](https://support.thirdweb.com/)。 不过，以下是您在 Kaia 上进一步使用 Thirdweb 时可能需要的有用资源列表。

- [Thirdweb文档](https://portal.thirdweb.com/)
- [如何使用 Thirdweb 构建 dApp](https://blog.thirdweb.com/guides/how-to-build-a-dapp/)
- [使用 NextJS 和 TypeScript 创建自己的 NFT 市场](https://blog.thirdweb.com/guides/nft-marketplace-with-typescript-next/)

