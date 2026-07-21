---
title: 常见问题
sidebar_label: 常见问题解答
---

# 常见问题

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月9日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 版 Safe Wallet 来管理您的账户。

:::

## 迁移到 Safe Global 会影响我现有的 Safe 吗？ <a id="Does moving to Safe Global affect my existing Safe"></a>

不。 您的保险箱是一个链上智能账户。 Safe Global 是针对同一批合约设计的另一种 **UI**。 您的“安全”地址、所有者、阈值和资产均保持不变。 您无需重新创建“保险箱”，也无需转账。

详情请参阅 **[迁移至 Safe Global](./migrate-to-safe-global.md)**。

## 我的“保险箱”会自动显示在 app.safe.global 上吗？ <a id="Will my Safe appear automatically"></a>

在大多数情况下，是的：连接所有者钱包，选择 **Kaia** 或 **Kairos**，然后打开您现有的保险库。 如果未显示，请使用\*\*“添加现有保险库”\*\* / **“加载”**，并粘贴保险库地址。

可选的本地数据（通讯录、昵称）可能需要从 `safe.kaia.io` 进行一次导出，然后在 Safe Wallet 的 **设置 → 数据** 中导入。 这不会影响链上的所有权或余额。

## 创建“保险箱”后，我可以添加新所有者吗？ <a id="Can i add new owners after creating a safe"></a>

是的。 在 Safe Wallet 中，打开 **设置** 来管理 Safe 所有者：添加、移除、替换或重命名所有者。 您必须以当前所有者的身份登录，且任何更改均需达到常规的确认门槛。

典型流程：

1. 打开**设置** → 所有者/签名人管理。
2. 添加新业主（姓名 + 地址）。
3. 如有必要，请调整签名策略。
4. 审核并提交；其他所有者将像任何“安全交易”一样进行确认。

随着 Safe Wallet 的不断发展，界面标签可能会略有变化——请参阅 [帮助中心](https://help.safe.global) 以查看最新的截图。

## 我可以更改所需的确认次数吗？ <a id="Can i change the number of required signer confirmation"></a>

是的。 在**设置**中，修改所需的确认阈值，然后根&#x636E;_&#x5F53;&#x524D;_&#x653F;策提交并收集所有者的签名。

## 如何添加一个现有的保险箱？ <a id="How do i add an existing safe"></a>

您可以通过连接所有者钱包或添加保险箱地址，在 [app.safe.global](https://app.safe.global) 上打开现有的保险箱。 用例包括：

- 通过另一台浏览器或设备访问同一个“保险箱”
- 与他人将你设为所有者的保险箱进行交互
- 以只读模式查看保险箱

Safe Wallet 还支持导入/导出通讯录及相关数据，该功能可在 **设置** 中找到。 建议在 Safe Wallet 中通过地址或所有者关联来添加保险箱，而不是依赖即将停用的 `safe.kaia.io` 用户界面。

## Common Safe 设置提示

并没有一种放之四海皆准的最佳配置——这取决于您的具体使用场景。 有用的默认设置：

**有多少位所有者？**  
对于团队，请设置多位所有者，以便多人可以进行审批。 管理较大余额的个人通常会使用多台自有设备或多个账户，以确保冗余。

**什么阈值？**  
请将阈值设为大于1，这样单个被盗的密钥就无法单独转移资金。 约51%的拥有者（例如3人中的2人、5人中的3人）这一阈值有助于恢复：剩余的拥有者仍可替代一位缺席的拥有者。

**哪些钱包兼容？**  
Kaia 上的 Safe Wallet 支持常见的 EOA 钱包，例如 [Kaia Wallet](https://docs.kaiawallet.io/) 和 [MetaMask](../../tutorials/connecting-metamask.mdx)。 请查看 Safe Wallet 的连接流程，了解当前的钱包列表。

## 更多帮助

- [Safe Wallet 帮助中心](https://help.safe.global)
- [安全文档](https://docs.safe.global)
