---
title: Safe Wallet overview
sidebar_label: Safe Wallet overview
---

# Safe Wallet overview

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 31, 2026**. Please use **Safe Wallet** for Kaia at [app.safe.global](https://app.safe.global) to manage your accounts going forward. See [Migrate to Safe Global](./migrate-to-safe-global.md) if you already have a Safe.

:::

[Safe Wallet](https://app.safe.global) is Safe Global's official interface for [Safe Smart Accounts](https://docs.safe.global/home/what-is-safe). A Safe Smart Account is a smart contract wallet: instead of one private key controlling the funds, a set of signers must approve each transaction according to a confirmation threshold. Kaia Mainnet and Kairos Testnet are both available—connect an owner wallet, select the network, then create or open a Safe.

## Key concepts

| Concept | What it means |
| --- | --- |
| **Signers (owners)** | The addresses allowed to propose and confirm transactions. Add, remove, or replace them at any time from **Settings**. |
| **Threshold** | How many signer confirmations a transaction needs before it can execute (for example 2 of 3). Keep it above 1. |
| **[Modules](https://docs.safe.global/advanced/smart-account-modules)** | Optional contracts that extend what the account can do—recovery, spending allowances, automation. A module can move funds without signer approval, so only enable ones you trust. |
| **[Guards](https://docs.safe.global/advanced/smart-account-guards)** | Optional contracts that check every transaction before and after execution, letting you enforce custom rules. |
| **Safe Apps** | Third-party apps embedded in the interface, such as the Transaction Builder and CSV Airdrop used in the guides below. |

For the full picture of how the account works on-chain, read [How do Safe Smart Accounts work?](https://docs.safe.global/advanced/smart-account-overview).

## Workspace

[Workspace](https://safe.global/blog/introducing-workspace-the-onchain-operating-environment-for-treasury-teams) is Safe Global's environment for teams that run more than one Safe. It sits on top of the same smart accounts—it changes how a team coordinates, not how transactions execute or who holds keys.

* **Unified dashboard** — balances and pending transactions across every account in the space, in one view.
* **[Security Hub](https://safe.global/blog/workspace-security-hub)** — signers, threshold, modules, guards, recovery options, and Safe version for each account, plus automated checks against its on-chain configuration.
* **Shared address book** — one set of labelled addresses for the whole team instead of a per-browser local list.
* **Email login** — teammates can sign in with an email one-time passcode or Google to view balances, follow pending transactions, and manage contacts without holding a key. Signing still requires an owner wallet.

That last point is useful for finance, compliance, and operations reviewers on Kaia who need visibility into a treasury Safe but should never be signers on it.

## Safe Global documentation

Safe Wallet, the Safe Smart Account contracts, the Safe Core SDK, and the backend services are all built and maintained by Safe Global, and documented at [docs.safe.global](https://docs.safe.global).

The Kaia docs cover what is specific to Kaia: supported networks, chain IDs, and walkthroughs of common tasks. For how Safe itself works—contract versions, module and guard behaviour, API schemas, SDK reference—refer to Safe Global's documentation, which the Safe team keeps current.

### Where to look

| If you want to… | Go to |
| --- | --- |
| Understand what a Safe Smart Account is | [What is Safe?](https://docs.safe.global/home/what-is-safe) |
| Learn the account architecture, modules, and guards | [How do Safe Smart Accounts work?](https://docs.safe.global/advanced/smart-account-overview) |
| Look up contract functions, events, and versions | [Smart Account Reference](https://docs.safe.global/reference-smart-account/overview) |
| Build with the Safe SDK (Starter, Protocol, API, Relay Kits) | [SDK Overview](https://docs.safe.global/sdk/overview) |
| Query Safes, transactions, and signatures over HTTP | [Safe Infrastructure](https://docs.safe.global/core-api/api-overview) · [Transaction Service](https://docs.safe.global/core-api/transaction-service-overview) |
| Check which chains a Safe service supports | [Supported Networks](https://docs.safe.global/advanced/smart-account-supported-networks) |
| Get help with the Safe Wallet app itself | [Safe Help Center](https://help.safe.global) |
| Clarify Safe terminology | [Glossary](https://docs.safe.global/home/glossary) |

If a page here is out of date compared with Safe Global's documentation, follow Safe Global and [open an issue](https://github.com/kaiachain/kaia-docs/issues) so we can update the Kaia page.

## Kaia networks

| Network | Chain ID |
| --- | --- |
| Kaia Mainnet | 8217 |
| Kairos Testnet | 1001 |

Select the network from the chain switcher in Safe Wallet before creating or opening an account—a Safe deployed on Kairos is not visible while Mainnet is selected. When using the [API Kit](./safe-wallet-api-kit.md) or other Safe SDK tooling, pass the matching chain ID and take the Transaction Service endpoint from [Safe Global's supported networks](https://docs.safe.global/advanced/smart-account-supported-networks) rather than hardcoding one.

## Kaia-specific guides

* [Migrate to Safe Global](./migrate-to-safe-global.md) — move an existing Safe to Safe Wallet
* [Create and manage Safes](./use-safe-wallet.md) — create a Safe on Kaia, add assets, send transactions
* [Contract interaction](./contract-interaction.md) — call a contract from a Safe on Kaia
* [Transaction builder](./tx-builder.md) and [CSV airdrop](./csv-airdrop.md) — batching on Kaia
* [API Kit](./safe-wallet-api-kit.md) — Safe Transaction Service with Kaia chain IDs
* [FAQs](./faqs.md)
