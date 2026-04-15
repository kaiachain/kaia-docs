# 成为验证员

## 概述<a id="overview"></a>

:::info 无许可阶段 1

本指南介绍现有全球控制中心如何在**无权限第一阶段**期间通过验证器管理门户管理其验证器。 通过无许可网络向任何人开放参与将在\*\*第二阶段（计划于 9 月下旬）\*\*进行，届时本指南将进行更新。 详见 [无权限实施概述](https://govforum.kaia.io/t/permissionless-implementation-overview/1218) 和 [PGT 路线图](https://govforum.kaia.io/t/pgt-permissionless-governance-tokenomics-roadmap-introduction/1447)。

:::

Kaia 提供[验证器管理门户](https://portal.kaia.io/validators)，用于注册和管理验证器信息。 本指南将向您介绍验证者如何使用门户网站加入 Kaia 网络。

由于验证器操作所需的信息必须记录在链上合约中，因此任何验证器都可以使用门户网站发送写入或更新该信息的交易。 该门户网站还可让验证者在将新验证者加入 Kaia 网络或将现有验证者从 Kaia 网络中撤出时，管理他们拥有的定标合同。

该门户网站目前支持以下功能。

门户网站首页](/img/nodes/become-a-validator/image01.png)

- **主页**：主屏幕，显示验证器管理器部署的定标合同。
- **部署定标合约**：部署新的定标合约。
- **管理定标**：修改已部署定标合约的信息。
- **成为验证者**：注册已部署的定投合约，成为验证者。
- **管理验证器**：修改已安装验证器的信息。
- **待处理请求**：Kaia 团队使用的管理屏幕。

:::note

testnet 也支持上述所有功能。 我们建议首先在 testnet 上执行任何测试操作。

:::

## 您的工作<a id="what-youll-do"></a>

入职流程依次见以下几页：

1. [前提条件](./prerequisites.md) - 连接验证管理器钱包（推荐使用 Kaia Safe）并准备好所需账户。
2. [Validator Onboarding](./onboarding.md) - 部署并初始化您的定投合约，然后提交加入请求。
3. [管理定标合同](./manage-staking.md) - 更新管理员、定标/取消定标 KAIA、更改奖励地址、管理多重 ID 等。
4. [管理验证信息](./manage-validator.md) - 转移经理账户、申请离职和管理辅助定投合同。

## 相关资源<a id="related-resources"></a>

- [Kaia Safe 用户指南](../../../build/wallets/kaia-safe/kaia-safe.md)
- [KIP-277：自我验证器注册](https://kips.kaia.io/KIPs/kip-277)
- [KIP-163：再授权](https://kips.kaia.io/KIPs/kip-163)
