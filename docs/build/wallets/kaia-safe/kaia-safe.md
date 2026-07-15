---
title: Safe Wallet
sidebar_label: Safe Wallet
---

# Safe Wallet

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 9, 2026**. Please use **Safe Wallet** for Kaia at [app.safe.global](https://app.safe.global) to manage your accounts going forward. Your existing Safe accounts will be automatically compatible with Safe Wallet.

:::

## Introduction

[Safe](https://safe.global) (Safe Global) provides the industry-standard multisig smart account stack for EVM networks. **Safe Wallet** is Safe’s web app for creating and managing those accounts—available at [app.safe.global](https://app.safe.global).

Kaia Mainnet and Kairos Testnet are supported in Safe Wallet. Connect an owner wallet, select **Kaia** or **Kairos**, then create or open a Safe.

In a typical setup on Kaia, most users start with single-key wallets such as Kaia Wallet or MetaMask (externally owned accounts, or EOAs). Those accounts rely on one key pair and create a single point of failure—unsuitable for organisational treasuries, as in the [Wintermute hack](https://www.certik.com/resources/blog/uGiY0j3hwOzQOMcDPGoz9-wintermute-hack-), where $162.5 million was lost.

Safe Wallet removes that single point of failure: multiple owners must sign according to a confirmation threshold before a transaction executes.

For product behaviour, architecture, and APIs, use Safe’s own docs:

* [What is Safe?](https://docs.safe.global/home/what-is-safe)
* [Safe documentation](https://docs.safe.global)
* [Help Center](https://help.safe.global)

## What are multi-sig wallets? <a id="What are Multisig Wallets"></a>

A multi-signature wallet is a digital wallet that requires two, three, or more private keys from different sources to confirm and execute a crypto transaction.

For example, you can imagine a multi-signature wallet as a vault with three locks. The three keys are held by three different individuals, so their joint consent is required to open it.

Main benefits of multisig wallets:

* **Store assets securely:** Companies and protocols can store funds without relying on a single private key or a single actor moving funds without authorization.
* **Enable decentralised decision making:** Teams can make on-chain decisions about which transactions to execute.
* **Shared control:** Only parties with the necessary keys can approve and execute transactions according to the configured threshold.

## Benefits on Kaia <a id="Benefits of Kaia Safe"></a>

* **Store and transfer KAIA and tokens:** Deposit and transfer native KAIA and fungible or non-fungible tokens (for example ERC-20 / KIP-7 and ERC-721 / KIP-17).
* **Owners and threshold:** Configure multiple owners and a confirmation threshold for flexible, secure control.
* **Safe Apps:** Extend Safe Wallet with apps for batching, contract calls, and other workflows—for example **Transaction Builder** and CSV-based airdrops when available in the Apps catalog.
* **Transactions and confirmations:** Propose, collect signatures, and execute transactions according to your threshold.
* **Account recovery:** If a key is lost, remaining owners who meet the threshold can still manage the account (for example by replacing a lost owner).

Existing accounts created on the former Kaia-hosted Safe UI remain compatible with Safe Wallet at [app.safe.global](https://app.safe.global).

## Next steps

* [Use Safe Wallet on Kaia](./use-kaia-safe.md) — create a Safe, add assets, and send transactions
* [Overview](./overview.md) — networks, migration notes, and Safe Global resources
