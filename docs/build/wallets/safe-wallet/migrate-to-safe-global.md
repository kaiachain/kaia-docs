---
title: Migrate to Safe Global
sidebar_label: Migrate to Safe Global
---

# Migrate to Safe Global

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 9, 2026**. Please use **Safe Wallet** for Kaia at [app.safe.global](https://app.safe.global) to manage your accounts going forward.

:::

## What changed?

Kaia previously offered **Kaia Safe** (`safe.kaia.io`), a hosted fork of Gnosis Safe.

**Kaia Mainnet** and **Kairos Testnet** are now supported natively on [Safe Global](https://app.safe.global). Create and manage Safes on Kaia through Safe Wallet at [app.safe.global](https://app.safe.global)—not the Kaia-hosted UI.

## Will this affect my existing Safe accounts?

**No.** Your Safe accounts are smart contracts on Kaia. Moving to Safe Global changes only the **web interface**, not your on-chain Safe.

**Unchanged**

* Safe address
* Owners and confirmation threshold
* Assets (KAIA, tokens, NFTs)
* On-chain transaction history

**What you should update**

* Use [app.safe.global](https://app.safe.global) instead of `safe.kaia.io`
* Select **Kaia Mainnet** or **Kairos Testnet** in Safe Wallet
* Update bookmarks that still point at `safe.kaia.io`
* Optionally export/import local UI data (address book, nicknames) if you want those labels in the new interface

This has been verified: existing Safes created via Kaia Safe appear on Safe Global when you connect an owner wallet and select the correct network (**Kaia** or **Kairos**). You do **not** need to redeploy, recreate, or move funds to a new Safe.

## How to open your existing Safe on Safe Global

1. Open [app.safe.global](https://app.safe.global).
2. Connect a wallet that is an **owner** of your Safe (for example Kaia Wallet or MetaMask).
3. Select **Kaia Mainnet** or **Kairos Testnet**.
4. Your existing Safe should appear. If it does not, use **Add existing Safe** / **Load**, paste the Safe address, and confirm the network.

Optional: before `safe.kaia.io` sunsets, export local data (address book and settings) from the old UI and import it under **Settings → Data** in Safe Wallet if you want to keep nicknames and related browser data. This is optional and does not affect on-chain ownership or balances.

## Quick answers

* **Do I need to create a new Safe?** No.
* **Do my funds or owners change?** No.
* **Can I keep using `safe.kaia.io`?** Only until **August 9, 2026**. Switch to [app.safe.global](https://app.safe.global) now.
* **Where do I get more help?** [Safe Wallet Help Center](https://help.safe.global) and [FAQs](./faqs.md).

## Next steps

* [Use Safe Wallet on Kaia](./use-safe-wallet.md) — create a Safe, add assets, and send transactions
* [Safe Wallet overview](./overview.md) — networks and Safe Global resources
* [FAQs](./faqs.md) — more account management questions
