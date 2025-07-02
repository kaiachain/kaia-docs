---
sidebar_label: 使用积木探索器
---

# 如何使用区块探索器验证智能合约

## 导言

通常情况下，智能合约的部署者是唯一能接触到实际部署代码的一方，在部署者验证之前，公众无法读取合约的源代码。 然而，这正是合约验证作为智能合约开发周期中一个重要步骤的作用所在，因为它有助于提高已部署合约的透明度（对用户而言）、便利性（对开发者而言）和安全性。

不过，一旦智能合约得到验证，Kaiascan 和 OKX Kaia Explorer 等区块探索器也可以让公众使用区块探索器的用户界面与合约的公共方法进行交互。 除此之外，公众还可以直接访问经过验证的合同源代码。

在本指南中，我们将了解如何使用区块探索器验证 Kaia 网络上部署的智能合约。

## 先决条件

- [Remix IDE](https://ide.kaia.io/)和[Kaia 钱包](https://docs.kaiawallet.io/getting_started/quick_start#install-kaia-wallet)
- 从 [水龙头](https://faucet.kaia.io) 测试 KAIA 是否足够

## 开始

在本指南中，我们将介绍如何在 Kaia 生态系统中的区块资源管理器上验证单个合约和多部分合约，即

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

您可以在此页面查看 Kaia Kairos Testnet 上使用 [libaries](../../../references/sdk/sdk.md)部署智能合约的教程。 您也可以使用 [Hardhat](../../get-started/hardhat.md), [Foundry](../deploy/foundry.md), [Remix](../deploy/deploy.md#remix-ide) 等开发工具或其他工具，将智能合约部署到 Kaia Kairos Testnet。

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

### Kaiascan

要在 Kaiascan 上验证单个合同和多部分合同，请浏览[合同提交申请页面](https://kairos.kaiascan.io/contract)。

:::note

目前，Kaiascan 上的合同验证还处于测试阶段。

:::

![](/img/build/tutorials/kaiascan-con-sub-page.png)

#### 验证单一合同

1. 填写已部署合同的**合同地址** (Counter.sol)
2. 选择 "Counter.sol "示例使用的**编译器版本**
3. 选择用于 "Counter.sol "示例的**开源许可类型**。 在 "Counter.sol "示例中，选择 "**MIT License (MIT)**" 选项。 如果没有使用，请选择 **无许可证（无）**
4. 确保从 Remix IDE 下载 "Counter.sol"，并将其上载到\*\*源代码（Solidity 文件）\*\*字段中。
5. 为合同选择 **EVM 版本**。 以 "Counter.sol "为例，选择 "**伊斯坦布尔**"选项。
6. 如果在编译过程中启用了**优化**，则为**优化**选择**真**，并在**优化运行**下填写运行次数为**200**。
7. (可选）要获取该字段的 ABI 编码构造函数参数，请访问 [abi.hashex.org](http://abi.hashex.org)，获取下图所示的编码数据：

![](/img/build/tutorials/abi-hashex.png)

8. 点击**验证和发布**按钮开始验证。

![](/img/build/tutorials/counter-k-verification-page.png)

9. 验证完成后，您将收到**提交成功**信息。 现在，您可以在资源管理器搜索栏中粘贴合同地址，查看**合同源代码**、**合同 ABI**、**创建代码**和**ABI 编码值**。

> ![](/img/build/tutorials/counter-k-full-verification.png)

#### 验证多部分合同

在 Kaiascan 验证多部分合同的步骤与验证单个合同相同。 不过，需要注意的是，由于 Kaiascan 目前不支持上传文件进行验证，我们将在**下面输入 Solidity 合同代码**字段中复制并粘贴 "airdropToken_flattened.sol "文件。

![](/img/build/tutorials/airdrop-k-verification-page.png)

填写验证参数后，点击**验证和发布**按钮开始验证。 验证完成后，验证页面将刷新。 现在，您可以在资源管理器搜索栏中粘贴合同地址，查看**合同源代码**、**合同 ABI**和**创建代码**。

![](/img/build/tutorials/airdrop-k-full-verification.png)

## 结论

恭喜您遵循本指南！ 在本教程中，您将学习如何使用 Kaiascan 验证合同（单部分和多部分），以提高部署合同的透明度（对用户）、便利性（对开发人员）和安全性。 如需了解更多信息，请访问 [Kaia 文档](https://docs.kaia.io/)；如有任何问题，请访问 [Kaia 论坛](https://devforum.kaia.io/)。