---
title: Safe Wallet overview
sidebar_label: Safe Wallet overview
---

# Safe Wallet overview

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 9, 2026**. Please use **Safe Wallet** for Kaia at [app.safe.global](https://app.safe.global) to manage your accounts going forward. Your existing Safe accounts will be automatically compatible with Safe Wallet.

:::

Safe Wallet is the [Safe](https://safe.global) (Safe Global) web interface for [Safe smart accounts](https://docs.safe.global/home/what-is-safe) on Kaia. You manage owners, thresholds, assets, and transactions through [app.safe.global](https://app.safe.global), with Kaia Mainnet and Kairos available when you select the network in the UI.

## Product and documentation

For architecture, smart account behaviour, and backend services (Transaction Service, Client Gateway, and related APIs), use the official Safe Global resources:

* [What is Safe?](https://docs.safe.global/home/what-is-safe)
* [Safe Wallet Help Center](https://help.safe.global)
* [Safe documentation](https://docs.safe.global)
* [Safe Transaction Service overview](https://docs.safe.global/core-api/transaction-service-overview)

## Kaia networks

| Network | Chain ID |
| --- | --- |
| Kaia Mainnet | 8217 |
| Kairos Testnet | 1001 |

When using the [API Kit](./kaia-safe-api-kit.md) or other Safe SDK tooling, pass the correct Kaia chain ID. Service endpoints may change as `safe.kaia.io` sunsets; prefer Safe Global Transaction Service documentation for supported chains and configuration.

## Historical note

Kaia previously operated a Kaia-hosted Safe stack (UI and infrastructure). That stack is being retired in favour of Safe Wallet at [app.safe.global](https://app.safe.global). Legacy repository references such as [kaia-safe-infrastructure](https://github.com/kaiachain/kaia-safe-infrastructure) describe the older deployment model and are not the primary path for new integrations.
