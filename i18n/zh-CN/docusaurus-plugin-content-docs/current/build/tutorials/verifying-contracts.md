---
sidebar_label: 核实合同
---

# 如何使用区块探索器验证智能合约

## 导言

通常情况下，智能合约的部署者是唯一能接触到实际部署代码的一方，在部署者验证之前，公众无法读取合约的源代码。 然而，这正是合约验证作为智能合约开发周期中一个重要步骤的作用所在，因为它有助于提高已部署合约的透明度（对用户而言）、便利性（对开发者而言）和安全性。

尽管如此，一旦智能合约得到验证，Kaiascope 和 Kaiascan 等区块探索器还可以让公众使用区块探索器的用户界面与合约的公共方法进行交互。 除此之外，公众还可以直接访问经过验证的合同源代码。

在本指南中，我们将了解如何使用区块探索器验证 Kaia 网络上部署的智能合约。

## 先决条件

- [Remix IDE](https://ide.kaia.io/)和[Kaia 钱包](https://docs.kaiawallet.io/getting_started/quick_start#install-kaia-wallet)
- 从 [水龙头](https://faucet.kaia.io) 测试 KAIA 是否足够

## 开始

在本指南中，我们将介绍在 Kaia 生态系统中存在的区块探索器上验证单个合约和多部分合约的方法，这些探索器是：

- [Kaiascope](https://kaiascope.com/)
- [Kaiascan](https://www.kaiascan.io/)

废话不多说，让我们开始吧！

## 部署单一合同

要验证智能合约，首先需要在目标网络上部署合约。 因此，在本指南中，我们将把合同部署到 Kaia Kairos Testnet。 此外，在本教程中，我们将在 Remix IDE 上部署一个名为 "Counter.sol "的简单计数器合约。 代码如下所示：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Counter {
    uint256 public count;
    constructor(uint256 _initialCount) {
        count = _initialCount;
    }
    function incrementCounter() public {
        count++;
    }
    function decrementCounter() public {
        count--;
    }
    function resetCounter() public {
        count = 0;
    }
}
```

:::note

您可以查看此页面，了解使用 Kaia Kairos Testnet 上的 [libraries](../../references/sdk/sdk.md) 部署智能合约的教程。 您也可以使用 [Hardhat](../get-started/hardhat.md), [Foundry](../smart-contracts/deploy/foundry.md), [Remix](../smart-contracts/deploy/deploy.md#remix-ide) 等开发工具或其他工具（如果愿意），将智能合约部署到 Kaia Kairos Testnet。

:::

## 单一合同核查参数

在区块探索器上验证合约需要一些参数，在部署智能合约时必须考虑这些参数。 以下是与合同编译器和部署有关的一些细节，以便成功验证合同：

Remix IDE :

- 在 Remix IDE 上，导航至**Solidity 编译器选项卡**。

    - 观察用于编译和部署合同的 \*\* 编译器版本\*\*。
    - 注意合同中使用的**开源许可类型**。 这意味着在 Solidity 源文件开头使用的 SPDX 许可证标识符。 在 `Counter.sol` 文件中，我们使用了 `// SPDX-License-Identifier：MIT`
    - 注意用于部署合同的 **EVM 版本**。
    - (可选）如果在编译过程中启用了**优化**，请注意优化运行参数的值

    ![](/img/build/tutorials/counter-veri-parameters.png)

- 在 Remix IDE 上，导航至 **Kaia 选项卡**。

    - (可选） 如果合约构造函数方法接受参数，请注意构造函数参数的[ABI-编码形式](https://docs.soliditylang.org/en/develop/abi-spec.html)
    - 成功部署后，在**已部署合约**选项卡上记下智能合约的合约地址。

    ![](/img/build/tutorials/counter-veri-parametersII.png)

## 部署多部分合同

值得注意的是，部署多部分合同的步骤与部署单部分合同的步骤相同。 在本指南中，我们将部署一个名为 `airdropToken.sol` 的简单 KIP7 空投合约。 代码如下所示：

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
import "@kaiachain/contracts/access/Ownable.sol";
// the creator of the project mints certian amount of fungible tokens directly to a certain selection of wallets.
contract TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("Token Aidrop Demo", "TAD") {
    }
    // Airdrop Token
    function airdropTokens(address[] calldata wAddresses, uint[] calldata tAmount) public onlyOwner {
        require(wAddresses.length == tAmount.length, "Must be same lenght");
        for (uint256 i = 0; i < wAddresses.length; i++) {
            _mintSingleTokens(wAddresses[i], tAmount[i]);
        }
    }
    function _mintSingleTokens(address wAddress, uint amount) private {
        _mint(wAddress, amount);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
}
```

## 多部分合同核查参数

验证多部分合同的参数与验证单部分合同的参数相同。 但是，由于它们是由多个从属合同组成的，我们需要将合同的所有从属关系预处理成一个单一的 solidity 文件。 这种预处理通常被称为智能合约扁平化。

因此，我们必须将合约扁平化，以便在区块资源管理器上使用新的扁平化 Solidity 文件进行验证。

Remix IDE:

- 在 Remix IDE 上，导航至**文件资源管理器选项卡**。

    - 在**合同**文件夹下选择新创建的合同
    - 点击或用双指轻点，即可查看合同上的所有可用命令。
    - 选择 \*\* 压平\*\*

    ![](/img/build/tutorials/airdropToken-flattened.png)

    - 一旦代码被扁平化，你将看到一个名为 `airdropTokens_flattened.sol` 的新合约。

    ![](/img/build/tutorials/airdropToken-flattened-file.png)

:::note

有不同的工具可以将多部分智能合约扁平化为一个单一的 Solidity 文件，如 [Hardhat Flattener](https://hardhat.org/hardhat-runner/docs/advanced/flattening)。 请参阅相关智能合约扁平化工具的文档，了解更详细的使用说明。

:::

## 核实合同

在获得所有验证参数后，我们将在本节中详细介绍在区块资源管理器上验证单一智能合约（Counter.sol）和多部分智能合约（airdropTokens.sol）的步骤。

### 1. Kaiascope

要在 Kaiascope 上验证单份合同和多份合同，请按以下步骤操作：

#### 1.1 验证单一合同

1. 进入 [Kaiascope](https://kairos.kaiascope.com)的搜索栏，粘贴已部署的合同地址。
2. 导航至该页面上的**合同选项卡**。
3. 单击**匹配合同源代码**链接，提交合同代码以供验证。

![](/img/build/tutorials/counter-contract-tab.png)

4. 在合同验证页面，确保您的账户已连接到 Kaia 钱包或 Metamask。 在本指南中，我们将使用 Kaia 钱包。
5. 在**合同地址栏**中填写合同地址。 注：该字段通常会自动填写合同地址。
6. 选择 "Counter.sol "示例使用的**编译器版本**。
7. 选择用于 "Counter.sol "示例的**开源许可类型**。 在 "Counter.sol "示例中，选择 "**MIT License (MIT)**" 选项。 如果没有使用许可证，请选择 **无许可证（无）**。
8. 在**源代码字段**中，选择**源文本**，然后在文本字段中粘贴 "Counter.sol "的源代码。
9. 如果在编译过程中启用了**优化**，则为**优化**选择**真**，并在**优化运行**下填写运行次数为**200**。
10. 为合同选择 **EVM 版本**。 以 "Counter.sol "为例，选择 "**伊斯坦布尔**"选项。
11. 点击底部的验证码和**签名并提交**按钮，确认并开始验证。

![](/img/build/tutorials/counter-verification-page.png)

12. 签署验证请求后，您将收到验证状态通知

![](/img/build/tutorials/counter-success-popup.png)

13. 验证完成后，浏览器将显示验证结果，并显示包含合同地址的成功结果页面。 点击合同地址，查看**合同源代码**、**合同 ABI**和**字节码**。

![](/img/build/tutorials/counter-success-popup-I.png)

![](/img/build/tutorials/counter-full-verification.png)

#### 1.2 验证多部分合同

在 Kaiascope 上验证多部分合同与验证单部分合同一样简单，只是需要一些额外的步骤。 在本节中，我们将通过以下额外步骤验证 `airdropToken.sol` 合约：

- 您可以在**源代码**下选择**源文本**（Counter.sol 示例的第 3 步），或在**源代码**字段下选择**合并文件**。  在**源文本**的情况下，复制 "airdropToken_flattened.sol "中的代码并粘贴到文本字段中。 如果**实体文件**，可在 Remix IDE 上下载 "airdropToken_flattened.sol "文件并上传到字段。

a. 来源文本

![](/img/build/tutorials/airdrop-veri-field-I.png)

b. 固体文件

![](/img/build/tutorials/airdrop-veri-field-II.png)

在此之后，其他所有步骤都与验证单个合同相同。 填写验证参数后，点击**签署并提交**按钮进行确认并开始验证。

验证完成后，浏览器将显示验证结果，并显示包含合同地址的成功结果页面。 点击合同地址，查看**合同源代码**、**合同 ABI**和**字节码**。

![](/img/build/tutorials/airdrop-success-popup.png)

![](/img/build/tutorials/airdrop-success-popup-I.png)

![](/img/build/tutorials/airdrop-full-verification.png)

### 2. Kaiascan

要在 Kaiascan 上验证单个合同和多部分合同，请浏览[合同提交申请页面](https://kairos.kaiascan.io/contracts)。 不过，请确保您的账户已连接到 Kaia 钱包或 MetaMask，并按照以下步骤操作：

![](/img/build/tutorials/klaytnfinder-con-sub-page.png)

#### 2.1 核查单一合同

1. 请注意**此合同是否为令牌**字段？ 在使用官方网站 URL、官方电子邮件地址和令牌徽标图像验证令牌合约时，需要使用此字段。 在本指南中，请选择**否**，因为我们不是在验证商业代币合约。
2. 填写已部署合同的**合同地址** (Counter.sol)
3. 确保从 Remix IDE 下载 "Counter.sol"，并上载到\*\*源代码（Solidity 文件）\*\*字段。
4. 选择 "Counter.sol "示例使用的**编译器版本**
5. 选择用于 "Counter.sol "示例的**开源许可类型**。 在 "Counter.sol "示例中，选择 "**MIT License (MIT)**" 选项。 如果没有使用，请选择 **无许可证（无）**
6. 为合同选择 **EVM 版本**。 以 "Counter.sol "为例，选择 "**伊斯坦布尔**"选项。
7. 如果在编译过程中启用了**优化**，则为**优化**选择**真**，并在**优化运行**下填写运行次数为**200**。
8. (可选）要获取该字段的 ABI 编码构造函数参数，请访问 [abi.hashex.org](http://abi.hashex.org)，获取下图所示的编码数据：

![](/img/build/tutorials/abi-hashex.png)

9. 点击**签署并提交**按钮，确认并开始验证。

![](/img/build/tutorials/counter-k-verification-page.png)

10. 验证完成后，您将收到**提交成功**信息。 现在，您可以在资源管理器搜索栏中粘贴合同地址，查看**合同源代码**、**合同 ABI**、**创建代码**和**ABI 编码值**。

> ![](/img/build/tutorials/counter-k-full-verification.png)

### 2.2 验证多部分合同

在 Kaiascan 验证多部分合同的步骤与验证单个合同相同。 不过，需要注意的是，我们将在 \*\* 源代码（Solidity 文件）\*\* 字段上传 `airdropToken_flattened.sol` 文件。

![](/img/build/tutorials/airdrop-k-verification-page.png)

填写验证参数后，点击**签署并提交**按钮进行确认并开始验证。 验证完成后，您将收到**提交成功**信息。 现在，您可以在资源管理器搜索栏中粘贴合同地址，查看**合同源代码**、**合同 ABI**和**创建代码**。

![](/img/build/tutorials/airdrop-k-full-verification.png)

## 结论

恭喜您遵循本指南！ 在本教程中，您将学习如何使用 Kaiascope 和 Kaiascan 来验证合同（单部分和多部分），以提高部署合同的透明度（对用户）、便利性（对开发人员）和安全性。 如需了解更多信息，请访问 [Kaia 文档](https://docs.klaytn.foundation/)；如有任何问题，请访问 [Kaia 论坛](https://devforum.kaia.io/)。