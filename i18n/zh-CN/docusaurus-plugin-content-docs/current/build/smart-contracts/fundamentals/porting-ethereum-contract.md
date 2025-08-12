# 导入以太坊合约

在大多数情况下，您可以在 Kaia 上使用以太坊合约，无需做任何修改。
不过，要注意以下两个问题。

## 稳固支持<a id="solidity-support"></a>

- Kairos 网络目前与**伦敦**以太坊虚拟机 (EVM) 兼容。
- Mainnet 目前与**伦敦**以太坊虚拟机 (EVM) 兼容。

:::note

v1.7.0 协议升级 - 不兼容的更改，包括**伊斯坦布尔**硬分叉项目和 Kaia 自己的项目。
如果是 Kairos 网络，则从区块编号 "#75,373,312 "开始启用，如果是主网络，则从区块编号 "#86,816,005 "开始启用。

v1.7.3 协议升级 - 包括伦敦\*\*\*硬分叉产生的基本费用在内的不兼容变更。
如果是 Kairos 网络，则从区块编号 "#80,295,291 "开始启用，如果是主网络，则从区块编号 "#86,816,005 "开始启用。

v1.8.0 协议升级 - 包括伦敦\*\*\*硬分叉产生的基本费用在内的不兼容变更。
如果是 Kairos 网络，则从区块编号 "#86,513,895 "开始启用，如果是主网，则从区块编号 "#86,816,005 "开始启用。

:::

不保证向后兼容 Kaia 上的其他 EVM 版本。
因此，强烈建议根据协议升级状态使用正确的目标选项编译 Solidity 代码。

- Kairos: --evm-version london
- Mainnet: --evm-version london
- 其他（私有/服务链）：根据协议升级状态确定

请参阅 [如何设置 Solc 的 EVM 版本](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target)。

命令示例如下：

```
$ solc --evm-version london contract.sol
```

## 解耦密钥对<a id="decoupled-key-pairs"></a>

Kaia [将密钥对与地址解耦](../../../learn/accounts.md#decoupling-key-pairs-from-addresses). 如果用户[更新账户](../../transactions/basic.md#txtypeaccountupdate)，特定账户的私钥会被替换为另一个账户的私钥。 大多数情况下，这不会影响您的业务逻辑。 但是，如果您的业务逻辑包括 ecrecover，则应考虑使用 validateSender。 更多详情，请参阅 [here](../../../learn/smart-contracts/precompiled-contracts.md)。
