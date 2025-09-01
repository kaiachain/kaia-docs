# Kaia Contracts Wizard

![](/img/banners/kaia-kcw.png)

## 导言

Kaia 优先考虑提供无缝的开发人员体验，这也是创建 Kaia 合同向导（KCW）的驱动力。 KCW 是一种交互式工具，可让您毫不费力地启动智能合约，并利用 [Kaia Contracts](https://github.com/kaiachain/kaia-contracts) 中经过测试的安全组件。 从本质上讲，它通过利用 Kaia 合约的组件简化了智能合约的开发过程。 值得注意的是，Kaia 合约向导建立在 OpenZeppelin 向导的基础之上，进一步加强了智能合约开发的安全性。

在本指南中，您将

- 了解 Kaia 合同向导的基本功能。
- 使用 Kaia Contracts Wizard 生成和定制智能合约代码。
- 使用 Foundry 脚本系统将 Kaia 合同部署到 Kaia 网络 (Kairos)。

## 探索 Kaia 合同向导

Kaia Contracts Wizard 将自己定位为使用 Kaia Contracts 编写智能合约的最快、最简单的方法。 在本节中，我们将深入了解 Kaia 合同向导的各个组件和部分。

目前，Kaia 合约向导支持以下令牌标准：

- [KIP-7](https://kips.kaia.io/KIPs/kip-7) - 这是 Kaia 的可替代令牌标准。 可互换是指所有代币都可分割和互换，即具有相同的价值。 可替代代币的一个典型例子就是法定货币，每张等面值的钞票都具有相同的价值。
- [KIP-17](https://kips.kaia.io/KIPs/kip-17) - 这是 Kaia 的不可篡改令牌标准。 不可窜改是指每个标记都是不可分割的，因此也是独一无二的。 KIP17 代币可以代表一个独特物品的所有权，无论是实物财产还是虚拟收藏品，如图片、游戏中的物品、不动产等。
- [KIP-37](https://kips.kaia.io/KIPs/kip-37) - 这被称为 Kaia 的多令牌标准，因为它可以在单个智能合约中同时表示可替换令牌和不可替换令牌。

与我们的 [Ethereum Equivalence](https://medium.com/klaytn/toward-ethereum-equivalence-1-introducing-klaytn-v1-8-0-971911be7ff9) 支持一致，Kaia 合约向导也支持 [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)、[ERC721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)、[ERC1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)。

Kaia 合同向导由以下部分组成：

- **令牌标准部分**：该选项卡包含 Kaia 合约向导支持的所有不同令牌标准。

- **设置部分**：该部分提供每个代币标准的初步设置，如代币名称、符号、预铸币（合约部署时的代币供应）和 URI（针对不可兑换代币）。

- **功能部分**：包括每个令牌标准的所有功能。 您可以在以下链接中找到更多关于每种令牌可用的不同扩展名的信息：

  - [KIP7](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP7/extensions)
  - [KIP17](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP17/extensions)
  - [KIP37](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP37/extensions)

- **访问控制部分**：包括每个令牌标准的所有可用访问控制机制。

- **交互式代码显示部分**：显示根据用户设置的配置生成的智能合约代码。

![](/img/build/tools/kcw-image.png)

在了解了 Kaia 合约向导的各个部分后，您现在可以选择想要的合约类型（目前支持 **KIP7**、**KIP17**、**KIP37**、**ERC20**、**ERC721**、**ERC1155**、**Governor** 和自定义合约），设置参数和所需功能（令牌名称、符号、预铸币量、访问控制等），然后合约向导将生成所有必要的代码。 因此，生成的代码可以随时进行编译和部署，也可以作为起点，通过特定的应用逻辑进行进一步定制。

## 在 Kaia 网络上定制和部署 Kaia 合约

在本节中，您将使用 Foundry 将 kaia 合约向导生成的代码部署到 Kaia Testnet Kairos。 生成的代码将作为起点，并进一步定制，以适应 KIP7 和 KIP17 代币的空投合约。  而在另一端，生成的 KIP37 代码将按原样使用。

让我们开始吧！

### 先决条件

要跟上本教程，先决条件如下：

- 确保安装了 [foundry](https://book.getfoundry.sh/getting-started/installation)。
- 克隆 [kaia-foundry-starterkit](https://github.com/ayo-klaytn/kaia-foundry-starterkit) 代码。
- [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask)：用于部署合同、签署交易和与合同交互。
- RPC 端点：可从受支持的 [端点提供程序](../../../references/public-en.md) 中获取。
- 从 [水龙头](https://faucet.kaia.io)测试 KAIA：为账户注入足够的 KAIA。

### 开始

本指南将指导您简单实现 KIP7 和 KIP17 令牌标准的空投合约。 在空投合约中，项目的创建者会直接向特定的钱包铸造各自的代币。 在接下来的章节中，我们将分别介绍如何定制和部署每种令牌空投合约。

### 定制令牌合约

**将 KIP7 合同定制为 KIP7 空投合同。**

在将 KIP7 合同修改为空投合同之前，您需要对其进行定制。 为此，请按照以下步骤操作：

1. 导航至 [wizard.kaia.io](https://wizard.kaia.io)。
2. 在**合同**选项卡上选择**KIP7**
3. 下一步是在**设置**选项卡中填写名称（KIP7 代币空投）和符号（KTA）。 铸币前区域为空
4. 随后，在**功能**选项卡上，勾选**可薄荷**功能框，它就会自动选择**访问控制**选项卡上的可拥有功能。

进行这些配置后，Kaia 合同向导就会变成这样：

![](/img/build/tools/kip7-kcw.png)

以下是生成的代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
import "@kaiachain/contracts/access/Ownable.sol";
contract KIP7TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("KIP7 Token Airdrop", "KTA") {}
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
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

接下来要做的就是修改上面的代码，以适应我们的空投执行，看起来就像这样：

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
import "@kaiachain/contracts/access/Ownable.sol";
contract KIP7TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("KIP7 Token Airdrop", "KTA") {
    }
    // airdrop fungible token
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

从上面修改的代码中可以看到，我们添加了一个名为 `airdropTokens()` 的新函数。 该函数向某些选定的地址铸造代币，且只能由合约的创建者--"onlyOwner"--调用。

随后，我们将_公共_ **mint()** _onlyOwner_函数修改为**_mintSingleTokens()** 私有。

现在我们已经准备好 KIP7 空投合同代码，下一步是在项目目录的 src 文件夹中新建一个名为 airdropKIP7.sol 的文件，并将修改后的代码粘贴到该文件中。

**将 KIP17 合同定制为 KIP17 空投合同。**

在将 KIP17 合同修改为空投合同之前，您需要对其进行定制。 为此，请按照以下步骤操作：

1. 导航至 [wizard.kaia.io](https://wizard.kaia.io/)。
2. 在**合同**选项卡上选择**KIP17**
3. 下一步是在**设置**选项卡中填写名称（KIP7 NFT Airdrop）和符号（KNA）。  基础 URI 字段应为空。
4. 随后，在**特性**选项卡上，勾选**可编辑**、**自动递增索引**和**可数**特性框。 您会发现**访问控制**选项卡中的 "可拥有 "功能已被自动选中。

进行这些配置后，Kaia 合同向导就会变成这样：

![](/img/build/tools/kip17-kcw.png)

以下是生成的代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP17/KIP17.sol";
import "@kaiachain/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@kaiachain/contracts/access/Ownable.sol";
import "@kaiachain/contracts/utils/Counters.sol";
contract KIP17NFTAirdrop is KIP17, KIP17Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() KIP17("KIP17 NFT Airdrop", "KNA") {}
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(KIP17, KIP17Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(KIP17, KIP17Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

接下来要做的就是修改上面的代码，以适应我们的空投执行，看起来就像这样：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP17/KIP17.sol";
import "@kaiachain/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@kaiachain/contracts/access/Ownable.sol";
import "@kaiachain/contracts/utils/Counters.sol";
contract KIP17NftAirdrop is KIP17, KIP17Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() KIP17("KIP17 NFT Airdrop", "KNA") {}
    // Airdrop NFTs
    function airdropNfts(address[] calldata wAddresses) public onlyOwner {
        require(wAddresses.length != 0, "Must no be equal to zero");
        for (uint256 i = 0; i < wAddresses.length; i++) {
            _mintSingleNFT(wAddresses[i]);
        }
    }
    function _mintSingleNFT(address to) private {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(KIP17, KIP17Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(KIP17, KIP17Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

从上面修改的代码中可以看到，我们添加了一个名为 **airdropNfts()** 的新函数。 该函数向某些选定的地址铸造代币，并且只能由合约的创建者（onlyOwner）调用。

随后，我们将 **safeMint()** _public onlyOwner_ 函数修改为 **_mintSingleTokens()** **private**。

现在我们已经准备好 KIP17 空投合同代码，下一步是在项目目录的 src 文件夹中新建一个名为 airdropKIP17.sol 的文件，并将修改后的代码粘贴到该文件中。

**定制 KIP37 合同。**

由于 KIP37 支持批量铸币，我们将只对合同进行定制并按原样使用。 要定制我们的 KIP37Contract，请按以下步骤操作：

1. 导航至 [wizard.kaia.io](https://wizard.kaia.io)
2. 在**合同**选项卡上选择**KIP37**
3. 下一步是在**设置**选项卡中填写名称（KIP7 NFT Airdrop）和符号（KNA）。  基础 URI 字段应为空。
4. 随后，在**特性**选项卡上，勾选**可编辑**、**自动递增索引**和**可数**特性框。 您会发现**访问控制**选项卡中的 "可拥有 "功能已被自动选中。

进行这些配置后，Kaia 合同向导就会变成这样：

![](/img/build/tools/kip37-kcw.png)

以下是生成的代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP37/KIP37.sol";
import "@kaiachain/contracts/access/Ownable.sol";
contract KIP37MultiToken is KIP37, Ownable {
    constructor() KIP37("") {}
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}
```

现在我们已经准备好 KIP37 合约代码，下一步是在项目目录的 src 文件夹中新建一个名为 KIP37MultiToken.sol 的文件，并将生成的代码粘贴到其中。

为所有 Kaia 合同生成合同代码后，下一步就是使用 Foundry solidity 脚本部署到 Kaia 测试网 Kairos。

## 使用 Foundry 脚本部署生成的智能合约代码

在本节中，我们将使用 Foundry 部署生成的智能合约代码，特别是在链上部署的 Foundry 脚本。

### 开始

在开始使用铸造时，您一定初步接触过使用 [forge create](https://book.getfoundry.sh/reference/forge/forge-create.html)来延迟合同的方法。 最近，Foundry 团队提出了一种使用 Solidity 声明式部署合约的更友好方法，称为 [Solidity Scripting](https://book.getfoundry.sh/tutorials/solidity-scripting#solidity-scripting)，即用 solidity 而不是 JavaScript 编写部署脚本。

在本节中，我们将在 Foundry 中使用 solidity 脚本部署我们的合约。

### 环境配置

我们将把生成的智能合约部署到 Kaia Kairos 测试网络，但为此我们需要对 Foundry 进行一些配置，比如设置 Kairos RPC URL、使用 KAIA 测试资金的账户私钥等。

完成所有步骤后，创建一个 .env 文件并添加变量。 Foundry 会自动加载项目目录中的 .env 文件。

.env 文件应遵循以下格式：

```code
KAIROS_RPC_URL=
// 如果要部署到主网
MAINNET_RPC_URL=
PRIVATE_KEY=
```

现在我们需要编辑 `foundry.toml` 文件。 项目根目录中应该已经有一个。 将以下几行粘贴到文件末尾

```code
[rpc_endpoints]
kairos = "${KAIROS_RPC_URL}"
// 如果要部署到主网
mainnet = "${MAINNET_RPC_URL}"
```

### 编写剧本

接下来，我们必须创建一个文件夹，并将其命名为脚本（如果还不存在的话）。 然后，我们需要为合同创建一个脚本文件，即：
airdropKIP7.s.sol
airdropKIP17.s.sol
KIP37MultiToken.s.sol
这就是我们要编写的部署脚本。  每个文件的内容应如下所示：

1. airdropKIP7.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/airdropKIP7.sol";

contract KIP7AirdropDeployScript is Script {

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP7TokenAirdrop kip7TokenAirdrop = new KIP7TokenAirdrop();

        vm.stopBroadcast();
    }
}
```

2. airdropKIP17.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/airdropKIP17.sol";

contract KIP17AirdropDeployScript is Script {

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP17NftAirdrop kip17NftTokenAirdrop = new KIP17NftAirdrop();

        vm.stopBroadcast();
    }
}
```

3. KIP37MultiToken.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/KIP37MultiToken.sol";

contract KIP37MultiTokenDeployScript is Script {

    function setUp() public {}

    function run() public {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP37MultiToken kip37MultiToken = new KIP37MultiToken();

        vm.stopBroadcast();
    }
}
```

让我们来看看每行代码的作用。

首先，我们为每个脚本文件声明了 SPDX 许可证和 pragma 版本。 请注意，由于每个脚本文件都是一个 solidity 程序，我们仍需声明 SPDX 许可证和 pragma 版本，使其像智能合约一样工作，但永远不会部署。

接下来，我们导入 [Forge Std/Script.sol](https://github.com/foundry-rs/forge-std/blob/master/src/Script.sol)，它提供了一些用于部署合同的脚本工具。 随后，我们导入要部署的合同。 在这种情况下，每个脚本都需要 **airdropKIP7**、**airdropKIP17**、**KIP37MultiToken**。

然后，我们为每个脚本文件创建了名为 **KIP7AirdropDeployScript**、**KIP17AirdropDeployScript**、**KIP37MultiTokenDeployScript** 的合约，这些脚本文件继承了 Forge Std 库中的脚本。

接下来，我们声明了 **run()** 函数。 函数 run() 是执行脚本的入口点。 然后，我们在
中声明了一个 **deployerPrivateKey** 变量，用于从 .env 文件中加载私钥。

随后，我们调用了**vm.startBroadcast(deployerPrivateKey)** 特殊作弊代码，该代码记录了主脚本合约的调用和合约创建，并传递了用于签署事务的 deployerPrivateKey。

然后，我们创建了相应的合同。 由于我们之前调用了 vm.startBroadcast() 作弊代码，因此 forge 将记录此合约创建过程。

现在，我们已经对每一行的内容有了大致的了解，您可以继续部署合同了。  点击此 [链接](https://book.getfoundry.sh/tutorials/solidity-scripting#writing-the-script)，了解更多关于编写脚本和其他细节的信息。

在项目根部运行

```bash
// To load the variables in the .env file
source .env
```

要部署每份合同，请运行以下命令：

1. airdropKIP7

```bash
forge script script/airdropKIP7.s.sol:KIP7AirdropDeployScript --rpc-url $KAIROS_RPC_URL --broadcast --skip-simulation -vvvv
```

2. airdropKIP17

```bash
forge script script/airdropKIP17.s.sol:KIP17AirdropDeployScript --rpc-url $KAIROS_RPC_URL --broadcast --skip-simulation -vvvv
```

3. KIP37MultiToken

```bash
forge script script/KIP37MultiToken.s.sol:KIP37MultiTokenDeployScript --rpc-url $KAIROS_RPC_URL --broadcast -skip-simulation -vvvv
```

如果每条命令都执行成功，终端应该如下所示：

![](/img/build/tools/deploy-kcw-contracts.png)

请参阅本 [指南](https://book.getfoundry.sh/reference/forge/forge-script)，了解有关脚本命令的更多信息。

## 结论

在本教程中，您将了解 Kaia 合同向导、其功能以及如何使用 KCW 自定义合同。 本指南还演示了如何生成智能合约代码，以及如何将生成的智能合约代码作为起点，并通过特定应用逻辑进一步定制。

此外，我们还使用 Foundry solidity 脚本将生成的合同部署到 Kaia Kairos Testnet。 您可以使用 Remix IDE 或任何智能合约开发环境来部署从 Kaia Contracts Wizard 派生或定制的智能合约。 您可以在以下链接中找到相应的教程：

- [Connecting to Remix](../../tutorials/connecting-remix.md#connecting-kaia-remix-using-metamask)
- [使用 Hardhat 部署智能合约](../../get-started/hardhat.md)