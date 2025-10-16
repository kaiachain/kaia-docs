# Solidity - 智能合约语言

本章只介绍高级概念、开发过程和用 Solidity 编写的示例，因为 Solidity 在其官方网站上已有详尽的文档说明。 有关语言规范或实现，请参阅下面的 [参考文献](#参考文献)。 本章内容基于 [参考文献](#参考文献）中列出的多个网站。

## 坚固和卡娅<a id="solidity-and-kaia"></a>

[Solidity](https://github.com/ethereum/solidity)是一种高级、静态类型化、面向合约的语言，用于在以太坊平台上实现智能合约。 虽然 Solidity 最初是为以太坊设计的，但它在编写智能合约方面具有足够的通用性；因此，它也可用于其他区块链平台，如 Kaia。

Kaia 正式兼容**伦敦**以太坊虚拟机（EVM）版本。 不保证向后兼容 Kaia 上的其他 EVM 版本。 因此，强烈建议使用 Istanbul 目标选项编译 Solidity 代码。 请参阅 [如何设置 Solc 的 EVM 版本](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target)。

:::note

v1.7.0 协议升级 - 不兼容的更改，包括**伊斯坦布尔**硬分叉项目和 Kaia 自己的项目。
如果是 Kairos 网络，则从区块编号 "#75,373,312 "开始启用，如果是主网络，则从区块编号 "#86,816,005 "开始启用。

v1.7.3 协议升级 - 包括伦敦\*\*\*硬分叉产生的基本费用在内的不兼容变更。
如果是 Kairos 网络，则从区块编号 "#80,295,291 "开始启用，如果是主网络，则从区块编号 "#86,816,005 "开始启用。

v1.8.0 协议升级 - 包括伦敦\*\*\*硬分叉产生的基本费用在内的不兼容变更。
如果是 Kairos 网络，则从区块编号 "#86,513,895 "开始启用，如果是主网，则从区块编号 "#86,816,005 "开始启用。

:::

在为 Kaia 开发智能合约时，可以使用 [Remix](https://remix.ethereum.org/) （一个基于浏览器的 IDE）和 [Hardhat](https://hardhat.org/docs) （一个开发框架）等开发工具。 Kaia 团队将努力保持以太坊开发工具与 Kaia 开发工具之间的兼容性，但在必要时可能会选择向 Kaia 智能合约开发人员提供这些工具的增强版或更新版。

使用 Remix 或 Hardhat 开发智能合约非常方便，但 Solidity 编译器也可在本地使用，只需按照下面网页中的说明构建或安装即可：

- [安装 Solidity 编译器](https://docs.soliditylang.org/en/latest/installing-solidity.html)

请注意，有两种命令行 Solidity 编译器：

- _solc_：全功能编译器
  - 包含在 Solidity 文档中
- _solcjs_：用于 _solc_ 的 Javascript 绑定
  - 作为独立项目 [solc-js] 维护(https://github.com/ethereum/solc-js)
  - _solcjs_ 的命令行选项与 _solc_ 的命令行选项不兼容。

其他有助于入门 Solidity 的资料包括以下内容：

- [顶级稳固性教程](https://medium.com/coinmonks/top-solidity-tutorials-4e7adcacced8)

## 如何编写智能合约<a id="how-to-write-a-smart-contract"></a>

本节以 Solidity 源代码为例，让读者了解智能合约的外观以及如何编写合约。 请注意，此处包含的代码仅供解释之用，并不用于生产目的。 在代码中，"(require) "表示任何 Solidity 源文件都需要该行，而"(optional) "则表示不一定需要该行。 符号 `Ln:` 并非 Solidity 代码的一部分，在此加入只是为了显示行号。 请不要在实际使用的源代码中使用这些符号。

```text
L01: pragma solidity 0.5.12;   // (required) version pragma
L02:
L03: import "filename";        // (optional) importing other source files
L04:
L05: // (optional) smart contract definition
L06: contract UserStorage {
L07:    mapping(address => uint) userData;  // state variable
L08:
L09:    function set(uint x) public {
L10:       userData[msg.sender] = x;
L11:    }
L12:
L13:    function get() public view returns (uint) {
L14:       return userData[msg.sender];
L15:    }
L16:
L17:    function getUserData(address user) public view returns (uint) {
L18:       return userData[user];
L19:    }
L20: }
```

上述代码不言自明，因此熟悉其他编程语言的人可以跳过本节的解释，直接跳到下一节。 不过，对于那些不清楚代码作用的人，或者对于 Solidity 是第一种编程语言的人，我们会在下面附上源代码的简短说明：

- 代码中以双斜线开头的部分是注释，而不是代码；它们用于注释和解释代码。  编译器会忽略注释。
- L01 "中的 "pragma "语句表示编译器的最小版本。
- L03`中的`import` 语句从"`filename\`"导入所有全局符号。 文件名 "应为实际文件名。
- `L05` - `L20` 定义了一个名为 `UserStorage` 的智能合约。  关键字 `contract` 位于合约名称之前，声明代码代表一个智能合约。  Solidity 中的契约类似于面向对象语言中的类。  每个合约可包含状态变量、函数、函数修改器、事件、结构类型和枚举类型的声明。  此外，合同还可以继承其他合同。  示例代码包含一个合同定义，但一个 Solidity 文件可能包含多个合同定义。
- 在`L07`中，`userData`是映射类型的状态变量。  状态变量永久保存在合约存储器中。  状态变量 `userData` 维护着 `address` 和 `uint` 值之间的映射。  地址 "类型保存一个 20 字节的地址（Kaia 使用的 20 字节地址与以太坊类似）。
- `L09` 定义了一个公共函数 `set`，用于在 `userData` 中保存信息发送者的 `x` 值。  变量 "msg.sender "是 Solidity 中定义的一个特殊变量，表示消息（即当前呼叫）发送者的地址。  关键字 "public "表示该函数是合约接口的一部分，可在外部或内部调用。
- L13`中的函数`get` 和 L17` 中的函数 `getUserData` 是用 `view` 声明的，这意味着函数承诺不修改任何状态变量。  它们的声明包括 `returns (uint)`，这意味着它们返回一个 `uint` 值。

有关 Solidity 语言语法和语义的更多信息，请参阅 [Solidity 文档](https://docs.soliditylang.org/)。

## 如何编译、部署和执行<a id="how-to-compile-deploy-and-execute"></a>

编译 Solidity 代码的一种方法是使用命令行编译器 _solc_。 这种编译器可以产生各种输出，从简单的二进制文件和汇编到抽象语法树（parse tree\ ）。 假设上面的代码保存在 `UserStorage.sol`（上面显示的源文件中不包括 `L03`），编译文件 `UserStorage.sol`的一些示例如下。

```bash
$ solc --bin UserStorage.sol
```

- 该命令将以二进制_即_字节码_的形式打印编译输出。

```bash
solc -o output --bin --ast --asm UserStorage.sol
```

- 编译器会生成二进制文件、抽象语法树和汇编代码，并将它们作为单独的文件存放在 "输出 "目录下。

```bash
solc --optimize --bin UserStorage.sol
```

- 为提高性能，可在编译过程中使用 `--optimize` 标记激活优化器。

下面列出了一些用于编译、部署和执行智能合约的资源。

- [使用Solidity命令行编译器](https://docs.soliditylang.org/en/latest/using-the-compiler.html)
- [使用 Remix 编译合同](https://remix-ide.readthedocs.io/en/stable/compile.html)
- [Running transactions with Remix](https://remix-ide.readthedocs.io/en/stable/run.html)
- [Remix Learneth 教程](https://remix-ide.readthedocs.io/en/latest/remix_tutorials_learneth.html)

注：本部分内容今后将进行更新。

## 调试智能合约<a id="debugging-smart-contracts"></a>

由于缺乏成熟的调试工具，调试 Solidity 代码比调试用其他编程语言编写的代码更加困难。 下面，我们列出了一些用于 Solidity 调试的资源。

- [使用 Remix 调试交易](https://remix-ide.readthedocs.io/en/latest/debugger.html)
- [使用 Remix 调试事务的教程](https://remix-ide.readthedocs.io/en/latest/tutorial_debug.html)
- [使用 Hardhat 网络调试](https://hardhat.org/tutorial/debugging-with-hardhat-network)

注：本部分内容今后将进行更新。

## 智能合约最佳实践<a id="smart-contract-best-practices"></a>

要消除智能合约中的安全问题和代码质量问题，必须学习并遵循 Solidity 编程的最佳实践。 在此，我们展示了 Solidity 最佳实践的参考资料。

- [智能合约安全最佳实践](./best-practices-for-smart-contract-security.mdx)
- [编写安全智能合约代码的最佳实践](https://www.nethermind.io/blog/best-practices-for-writing-secure-smart-contract-code)

## 参考资料<a id="references"></a>

- [Solidity GitHub 页面](https://github.com/ethereum/solidity)
- [Solidity文档](https://solidity.readthedocs.io/en/latest/index.html)
- [混音文档](https://remix-ide.readthedocs.io/en/latest/)
- [硬礼帽文档](https://hardhat.org/docs)
- [Foundry文档](https://book.getfoundry.sh/)
