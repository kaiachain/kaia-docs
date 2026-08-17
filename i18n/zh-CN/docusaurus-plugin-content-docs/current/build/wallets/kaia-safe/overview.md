---
title: Safe Wallet 概述
sidebar_label: Safe Wallet 概述
---

# Safe Wallet 概述

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月9日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia 版 **Safe Wallet** 来管理您的账户。 您现有的 Safe 账户将自动与 Safe Wallet 兼容。

:::

Safe Wallet 是 [Safe](https://safe.global)（Safe Global）为 Kaia 平台上的 [Safe 智能账户](https://docs.safe.global/home/what-is-safe) 提供的网页界面。 您可通过 [app.safe.global](https://app.safe.global) 管理所有者、阈值、资产和交易，在用户界面中选择网络时，可使用 Kaia 主网和 Kairos。

## 产品与文档

关于架构、智能账户行为以及后端服务（交易服务、客户端网关及相关 API），请参考官方的 Safe Global 资源：

- [什么是“安全”？](https://docs.safe.global/home/what-is-safe)
- [Safe Wallet 帮助中心](https://help.safe.global)
- [安全文档](https://docs.safe.global)
- [安全交易服务概述](https://docs.safe.global/core-api/transaction-service-overview)

## Kaia 网络

| 网络         | 链 ID |
| ---------- | ---- |
| Kaia 主网    | 8217 |
| Kairos 测试网 | 1001 |

使用 [API 工具包](./kaia-safe-api-kit.md) 或其他 Safe SDK 工具时，请传入正确的 Kaia 链 ID。 随着 `safe.kaia.io` 的停用，服务端点可能会发生变化；有关受支持的区块链和配置信息，请优先参考 Safe 全局交易服务文档。

## 历史注释

Kaia 此前曾运营一个由 Kaia 托管的 Safe 堆栈（包括用户界面和基础设施）。 该堆栈即将停用，取而代之的是 [app.safe.global](https://app.safe.global) 上的 Safe Wallet。 诸如 [kaia-safe-infrastructure](https://github.com/kaiachain/kaia-safe-infrastructure) 之类的旧版仓库参考文档描述的是较早的部署模型，并非新集成的主要途径。
