# 使用 Foundry 部署智能合约

![](/img/banners/kaia-foundry.png)

## 导言

Foundry 是一个用 Rust 编写的智能合约开发框架，开发人员可以通过 solidity 脚本从命令行管理和编译合约、运行测试、部署合约并与网络交互。

Foundry 由四个主要 CLI 工具组成，可实现快速、模块化的智能合约开发，它们是

- [Forge](https://github.com/foundry-rs/foundry/tree/master/forge)：  您可以使用 Forge 部署、测试和编译智能合约。
- [Cast](https://github.com/foundry-rs/foundry/tree/master/cast)：Cast 使与 EVM 智能合约的交互变得简单。 这包括获取链数据、发送交易等。
- [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil)：您需要启动本地节点吗？ Anvil 是 Foundry 提供的本地节点环境。
- [Chisel](https://github.com/foundry-rs/foundry/blob/master/chisel)：快速、实用、冗长的 solidity REPL。

在本指南中，您将

- 创建一个简单的铸造项目。
- 使用 Foundry 编译和测试示例智能合约。
- 使用 Foundry 向 Kaia Kairos 网络部署智能合约。
- 探索使用铸铁和铁砧分叉主网。

## 先决条件

学习本教程的前提条件如下：

- 代码编辑器：源代码编辑器，如 [VS Code](https://code.visualstudio.com/download)。
- [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask)：用于部署合约、签署事务和与合约交互。
- RPC 端点：您可以从支持的[端点提供者](../../../references/public-en.md)中获取。
- 从 [水龙头](https://faucet.kaia.io)测试 KAIA：为账户注入足够的 KAIA。
- 安装 [Rust](https://www.rust-lang.org/tools/install) 和 [Foundry](https://github.com/foundry-rs/foundry#installation)。

## 设置开发环境

要检查 foundry 安装是否成功，请运行下面的命令：

```bash
forge -V
```

**输出**

![](/img/build/get-started/forge-version.png)

成功安装 Foundry 后，您现在可以使用 Foundry 中的 CLI 工具（锻造、铸造、铁砧、凿子）。 让我们按以下步骤建立一个代工厂项目：

**步骤 1**：要启动一个新项目，请运行以下命令：

```bash
forge init foundry_example 
```

**第 2 步**：进入项目文件夹。

```bash
cd foundry_example
ls	 
```

初始化 foundry 项目后，当前目录应包括

- **src**：智能合约的默认目录。
- **测试**：测试的默认目录。
- **foundry.toml**：默认项目配置文件。
- **lib**：项目依赖项的默认目录。
- **script**：solidity 脚本文件的默认目录。

## 智能合约样本

在本节中，我们将在初始化的代工厂项目中使用示例计数器合同。 src/`文件夹中的`counter.sol\` 文件应如下所示：

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Counter {
    uint256 public number;
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
}
```

**代码演练**

这就是你的智能合约。 **第 1** 行显示它使用的是 0.8.13 或更高版本的 Solidity。 从第4-12**行开始，创建一个智能合约 "Counter"。 该合约只需使用**setNumber**函数存储一个新数字，并通过调用**increment\*\*函数将其递增。

## 测试智能合约

Foundry allows us to write tests in solidity as opposed to writing tests in javascript in other smart contract development frameworks. 在我们初始化的 foundry 项目中，"test/Counter.t.sol "就是一个用 solidity 编写的测试示例。 代码如下

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Counter.sol";
contract CounterTest is Test {
    Counter public counter;
    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }
    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

上面的代码显示您导入了 forge 标准库和 Counter.sol。

上述测试可检查以下内容：

- 人数是否在增加？
- 数字是否等于设定的数字？

要检查测试是否正常，请运行以下命令：

```bash
forge test
```

**输出**

![](/img/build/get-started/forge-test.png)

要了解有关编写测试、高级测试和其他功能的更多信息，请参阅 [Foundry 文档](https://book.getfoundry.sh/forge/tests)。

## 编制合同

使用此命令编译合同：

```bash
forge build 
```

## 部署您的合同

要使用 foundry 部署合同，必须提供 RPC URL 和将部署合同的账户的私钥。 请查看 Kaia 上的 [rpc-providers](../../../references/public-en.md) 列表，找到您的 rpc-url，并使用 [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask) 创建一个账户。

**第 1 步**：要将合同部署到 Kaia Kairos 网络，请运行以下命令：

```bash
$ forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/Counter.sol:Counter
```

**举例**

```bash
forge create --rpc-url https://public-en-kairos.node.kaia.io --private-key hhdhdhdhprivatekeyhdhdhud src/Counter.sol:Counter
```

**警告：用 MetaMask 中的私人密钥替换私人密钥参数。 请务必小心，不要暴露您的私人密钥**。

**输出**

![](/img/build/get-started/foundry-create.png)

**第 2 步**：打开 [Kaiascope](https://kairos.kaiascope.com/tx/0x83c8b55f3fd90110f9b83cd20df2b2bed76cfeb42447725af2d60b2885f479d3?tabId=internalTx)，检查计数器合约是否部署成功。

**第 3 步**：在搜索栏中复制并粘贴交易哈希值，然后按 Enter 键。 您应该能看到最近部署的合同。

![](/img/build/get-started/forge-scope.png)

## 与合同互动

成功部署智能合约后，您需要正确调用和执行函数。 让我们使用 [Cast](https://book.getfoundry.sh/reference/cast/cast-send.html) 与 Kaia Kairos Network 上部署的合约互动吧。  在本节中，您将学习如何使用 [cast call](https://book.getfoundry.sh/reference/cast/cast-call) 执行 "只读 "函数和 [cast send](https://book.getfoundry.sh/reference/cast/cast-send) 执行 "写入 "函数。

**A. 调用**：要获取存储在合约中的数字，需要调用 `number` 函数。 运行下面的命令查看实际操作。

```bash
cast call YOUR_CONTRACT_ADDRESS "number()" --rpc-url RPC-API-ENDPOINT-HERE
```

**举例**

```bash
cast call 0x7E80F70EeA1aF481b80e2F128490cC9F7322e164 "number()" --rpc-url https://public-en-kairos.node.kaia.io
```

**输出**

![](/img/build/get-started/cast-call-number.png)

您应该得到十六进制格式的数据：

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```

不过，为了得到您想要的结果，请使用投影法转换上述结果。 在这种情况下，数据是一个数字，因此可以将其转换为基数 10，得到结果 0：

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```

**输出**

![](/img/build/get-started/cast-call-0.png)

**B. 发送**：要签署并发布一个事务，例如在计数器合约中执行一个 `setNumber` 函数，请运行下面的命令：

```bash
cast send --rpc-url=<RPC-URL> <CONTRACT-ADDRESS> “setNumber(uint256)” arg --private-key=<PRIVATE-KEY>
```

**举例**

```bash
cast send --rpc-url=https://public-en-kairos.node.kaia.io 0x7E80F70EeA1aF481b80e2F128490cC9F7322e164 "setNumber(uint256)"  10 --private-key=<private key>
```

**输出**

![](/img/build/get-started/cast-send-setNum.png)

**交叉检查编号**

```bash
cast call 0x7E80F70EeA1aF481b80e2F128490cC9F7322e164 "number()" --rpc-url https://public-en-kairos.node.kaia.io
```

**输出**

![](/img/build/get-started/cast-call-10.png)

您应该得到十六进制格式的数据：

```bash
0x000000000000000000000000000000000000000000000000000000000000000a
```

不过，为了得到您想要的结果，请使用投影法转换上述结果。 在本例中，数据是一个数字，因此可以将其转换为基数 10，得到结果 10：

```bash
cast --to-base 0x000000000000000000000000000000000000000000000000000000000000000a 10
```

**输出**

![](/img/build/get-started/cast-call-result-10.png)

## 使用 Cast 和 Anvil 分叉主网

Foundry 允许我们将主网分叉到本地开发网络（[Anvil](https://book.getfoundry.sh/reference/anvil/)）。 此外，您还可以使用 [Cast](https://book.getfoundry.sh/reference/cast/)，在真实网络上与合同进行交互和测试。

### 开始

现在，您已经启动并运行了 Foundry 项目，可以运行下面的命令 fork 主网：

```bash
anvil --fork-url rpc-url
```

**举例**

```bash
anvil --fork-url https://archive-en.node.kaia.io
```

**输出**

![](/img/build/get-started/anvil-localnode.png)

成功运行该命令后，您的终端看起来就像上图一样。 您将拥有 10 个账户，这些账户拥有公钥和私钥以及 10,000 个预付代币。 分叉链的 RPC 服务器正在侦听 `127.0.0.1:8545`。

要验证您是否已分叉网络，可以查询最新的区块编号：

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

您可以使用 [十六进制转十进制](https://www.rapidtables.com/convert/number/hex-to-decimal.html)转换上述任务的结果。 您应该从分叉网络时获得最新的区块编号。 要验证这一点，请对照 [Kaiascope](https://kaiascope.com/block/118704896?tabId=txList)上的区块编号。

### 插图

在本节中，您将了解如何将 oUSDC 代币从持有 oUSDC 的人转入 Anvil 创建的账户 (0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob)

**转移 oUSDC**

访问 Kaiascope 并搜索 oUSDC 代币持有者（此处）。 让我们随便选一个账户。 在本例中，我们将使用 `0x8e61241e0525bd45cfc43dd7ba0229b422545bca`。

让我们将合同和账户导出为环境变量：

```bash
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export oUSDC=0x754288077d0ff82af7a5317c7cb8c444d421d103
export oUSDCHolder=0x8e61241e0525bd45cfc43dd7ba0229b422545bca
```

我们可以使用投币电话查看鲍勃的余额：

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**输出**

![](/img/build/get-started/oUsdcBob4.png)

同样，我们也可以使用调用功能查看 oUSDC 持有者的余额：

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**输出**

![](/img/build/get-started/oUsdcHolder4.png)

让我们使用 "发送 "功能将一些代币从幸运用户转给 Alice：

````bash
cast rpc anvil_impersonateAccount $oUSDCHolder    
cast send $oUSDC \
--unlocked \
--from $oUSDCHolder\
 "transfer(address,uint256)(bool)" \
 $BOB \
 1000000
```0000
````

**输出**

![](/img/build/get-started/cast-send.png)

让我们检查一下转账是否成功：

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**输出**

![](/img/build/get-started/oUsdcBobAfter.png)

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**输出**

![](/img/build/get-started/oUsdcHolderAfter.png)

有关代工的更深入指南，请参阅 [Foundry Docs](https://book.getfoundry.sh/)。 此外，您还可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/foundry) 上找到本指南的完整实现代码。