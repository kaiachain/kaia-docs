---
title: 将旧版 WKLAY 转换为 KAIA
sidebar_label: 解锁经典版 WKLAY
description: 使用 Kaiascan 从旧版 WKLAY 包装合约中提取 KAIA，并解包标准版 WKAIA。
---

# 将旧版 WKLAY 转换为 KAIA

Kaia 主网上的官方、标准 WKAIA（原 WKLAY）合约为 [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432)， 这是 Kaia 生态系统中公认的标准。有关背景信息，请参见 [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md)。

如果您曾使用过早期采用代币封装方案的旧版去中心化应用（dapp）或交易平台，您可能仍在**旧版 WKLAY 合约**中持有余额 [`0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2) 中仍持有余额。没有哪个 DApp 前端会为你解包该合约，因此你必须通过区块浏览器直接调用它。

本指南将逐步介绍如何在 [Kaiascan](https://kaiascan.io) 上完成此操作。

:::info 您持有哪份合同？

这两份合同涉及的部署互不相关。开始之前，请在您的钱包中或查看为您充值该余额的交易记录，确认代币合约地址——以下步骤仅适用于从旧版合约中找回资金。要展开规范的WKAIA，请参阅[展开规范的WKAIA](#unwrap-canonical-wkaia)。

:::

## 步骤 1：打开旧版合同

访问 Kaiascan 上的旧版合约页面：

[`https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2)

![Kaiascan 上的 WKLAY 旧版合约页面](/img/build/tutorials/unwrap-legacy-wklay/01-legacy-contract-page.png)

## 第 2 步：查看您的确切余额

1. 选择“**合同**”选项卡，然后点击“**阅读合同**”。
2. 展开 `balanceOf(address)` 函数，并输入您的钱包地址。
3. 点击**查询**（或**重新查询**）以查询您的余额。
4. 请完全按照所示内容复制返回值。

![在“读取合约”选项卡上读取 balanceOf](/img/build/tutorials/unwrap-legacy-wklay/02-read-contract-balanceof.png)

:::caution 复制原始值，不要进行转换

`balanceOf` 返回以 **kei**（最小单位）为单位的余额，而非以 KAIA 为单位。 1 KAIA 等于<sup>1018</sup>kei，因此余额 `100000000000000000` 相当于 0.1 KAIA。

步骤 3 需要相同的原始数值。请原样粘贴——不要四舍五入、删除位数或将其转换为KAIA格式，否则可能会提取错误的金额，或者交易将被撤销。

:::

## 第 3 步：提取您的代币

1. 切换到“**编写合约**”选项卡。
2. 点击\*\*“连接到 Web3”\*\*，并连接存放该余额的钱包。
3. 展开 `withdraw(wad: uint256)` 函数，并将你在第 2 步中复制的精确数值粘贴进去。
4. 提交后，请在您的钱包中确认该交易。

![显示“提现”功能的“编写合约”选项卡](/img/build/tutorials/unwrap-legacy-wklay/03-write-contract-withdraw.png)

您需要在同一钱包中持有少量 KAIA，用于支付此笔交易的手续费。

## 第 4 步：验证

交易确认后，请查看您的钱包余额——解封的 KAIA 将计入与发送交易相同的地址。

您可以在Kaiascan中该交易的\*\*“内部交易”\*\*标签页中确认该转账，因为合约将KAIA作为内部转账而非代币转账返回。以下是[一笔成功的解锁交易示例](https://kaiascan.io/tx/0x05117dc2ac21d2373fce1b6afa260ab8f9c1f747f7c9894fa302c67b2c96631d?tabId=internalTx&page=1)。

![在Kaiascan上验证unwrap交易](/img/build/tutorials/unwrap-legacy-wklay/04-verify-transaction.png)

## 揭开WKAIA的真实面貌

如果您的余额位于标准 WKAIA 合约 [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432) 中，您有两种选择。

**使用去中心化应用（推荐）。** Kaia 生态系统的兑换服务可一键解封标准 WKAIA —— 例如 [DragonSwap](https://dgswap.io/swap/?outputCurrency=KAIA&inputCurrency=0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432)。

**手动操作。** 按照上文所述的 Kaiascan 操作步骤，但请使用规范合约的地址页面，而不是旧版地址页面。

## 相关

- [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md) —— 标准的封装式 KAIA 实现
- [合约地址](../../references/contract-addresses.md) —— 主网和 Kairos 上的已部署系统合约地址
