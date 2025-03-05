# 将 Remix 连接到 Kaia

![](/img/banners/kaia-remix.png)

## 概述<a href="#overview" id="overview"></a>

Remix 是一个基于浏览器的集成开发环境，用于开发 Solidity 合约。 在本指南中，您将学习如何

- 在 Remix IDE 上创建并上传预构建的智能合约。
- 编译智能合约
- 连接至 Remix IDE 的 Kaia 插件
- 设置部署环境
- 导入账户
- 使用 Kaia 钱包将 Kaia 连接到 Remix
- 使用 MetaMask 将 Kaia 连接到 Remix
- 部署智能合约。
- 验证智能合约。

这将包括与 Kaia 的 Remix 连接。 如果您想进一步了解如何使用 Remix，请参阅 [Remix docs](https://remix-ide.readthedocs.io/en/latest/) 或 [Remix IDE](https://remix.ethereum.org/)。

## 在 Remix 上创建文件<a href="#creating-a-file-on-remix" id="creating-a-file-on-remix"></a>

要开始构建智能合约，请点击**文件资源管理器**选项卡中**合约**文件夹下的**新建文件**图标，并将其命名为`KaiaGreeter.sol`。

下一步是将下面提供的智能合约代码复制并粘贴到新创建的 KaiaGreeter.sol 文件中。

```sol
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

![](/img/build/smart-contracts/remix-create-new-file.png)

## 编译智能合约<a href="#compile-smart-contract" id="compile-smart-contract"></a>

要编制合同，请执行以下操作：

- 转到 **Solidity Compiler** 选项卡
- 选择编译器版本为 0.8.27
- 打开 "自动编译 "选项。
- 点击 "编译 KaiaGreeter.sol" 按钮，编译 "KaiaGreeter.sol "合同。
- 编译成功后，编译器选项卡按钮上将显示绿色的"√"标记

![](/img/build/smart-contracts/remix-compile-contract.png)

## 在 Remix IDE 上连接 Kaia 插件<a href="#connect-to-kaia-plugin" id="connect-to-kaia-plugin"></a>

要在 Remix IDE 上连接 Kaia 插件，可以使用 [Kaia Plugin for Remix](https://ide.kaia.io/)，或按照此步骤操作：

- 导航至**插件管理器**选项卡
- 在搜索栏中输入 Klaytn
- 激活 Klaytn 插件。 如果 Klaytn 标签出现，您就可以与 Kaia 互动了。

![](/img/build/smart-contracts/remix-plugin-addon.png)

## 设置部署环境 <a href="#setting-up-deployment-env" id="setting-up-deployment-env"></a>

- 点击 Klaytn 插件。
- 选择适当的 [环境]。
- 您可以选择 Kairos、主网、注入式提供程序 - Kaia 钱包、注入式提供程序 - MetaMask
    - [凯罗斯]：连接至 Kairos 网络
    - [主网]：连接到主网
    - [注入式提供程序 - Kaia 钱包]：连接至 Kaia 钱包
    - [注入式提供程序 - MetaMask ]：连接到 MetaMask

![](/img/build/smart-contracts/remix-deploy-env.png)

## 导入账户<a href="#import-account" id="import-account"></a>

您可以从任何兼容的钱包中导出私钥或 Keystore 在此使用。

- 单击 ACCOUNT 旁边的加号按钮。
- 然后放入私钥或密钥库。
- 您还可以为缴费人导入密钥。 它只支持私钥。

![](/img/build/smart-contracts/remix-import-acc.png)

## 使用 Kaia 钱包将 Kaia 连接到 Remix<a href="#connect-to-kaia-using-kaia-wallet" id="connect-to-kaia-using-kaia-wallet"></a>

- 在 Remix 环境菜单中选择 [注入式提供程序 - Kaia 钱包]。

![](/img/build/smart-contracts/remix-kw-connect.png)

- 看到 Kaia 钱包弹出窗口时，点击 [连接]。
- 成功连接到网络后，您将看到所连接网络的链 ID 和账户。

## 连接 Kaia - 使用 MetaMask 混音<a href="#connect-to-kaia-using-metamask" id="connect-to-kaia-using-metamask"></a>

- 参照[连接到 MetaMask](./connecting-metamask.mdx）连接 Kaia 和 MetaMask。
- 在 Remix 环境菜单上选择 [注入式提供程序 - 元掩码]。

![](/img/build/smart-contracts/remix-mm-connect.png)

- 看到弹出的 MetaMask 窗口时，点击它来选择账户。
- 成功连接到网络后，您将看到所连接网络的链 ID 和账户。

## 部署智能合约<a href="#deploying-contract" id="deploying-contract"></a>

在本节中，我们将使用 Kaia 钱包部署 KaiaGreeter.sol 合约。 在 "编译 "部分编译合同后，请按照以下部署流程进行部署：

- 将部署环境设置为注入式提供商 - Kaikas 钱包。 确保确认所有与 Remix 的连接提示。
- 在 CONTRACT（合同）字段中选择要部署的合同。
- 单击 "部署 "按钮。 这将弹出一个 Kaia 钱包，要求确认交易。 只需确认交易即可！

![](/img/build/smart-contracts/remix-deploy-contract.png)

- 您可以在 [Kaiascan](https://kairos.kaiascan.io/)上查看已部署的合约，也可以在 Remix IDE 上进行测试或调试。
