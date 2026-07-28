---
title: Migrate to Safe Global
sidebar_label: Migrate to Safe Global
---

# Migrate to Safe Global

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 31, 2026**. Please use **Safe Wallet** for Kaia at [app.safe.global](https://app.safe.global) to manage your accounts going forward.

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
* Update bookmarks that still point at `safe.kaia.io`
* [Export your Address Book](#export-your-address-book) before the sunset date if you want to keep your saved names and labels

This has been verified: existing Safes created via Kaia Safe appear on Safe Global when you connect an owner wallet. You do **not** need to redeploy, recreate, or move funds to a new Safe.

## How to open your existing Safe on Safe Global

1. Open [app.safe.global](https://app.safe.global).
2. Connect a wallet that is an **owner** of your Safe (for example Kaia Wallet or MetaMask).
3. Your existing Safe should appear, labeled with its network (**Kaia** or **Kairos**). If it does not, go to [app.safe.global/welcome/accounts](https://app.safe.global/welcome/accounts) and click **Manage list** to see the Safes associated with your connected wallet.

## Export your Address Book

Your Address Book—the names and labels you saved for addresses—is stored locally in the `safe.kaia.io` interface, not on-chain. It is the only thing that does **not** carry over automatically, so export it before the sunset date if you want to keep it.

1. In `safe.kaia.io`, go to **Settings → Data → Data export** and download the file.
2. Navigate to [app.safe.global/welcome/accounts](https://app.safe.global/welcome/accounts) and upload that file under **Import your Safe data**.

This step is optional and does not affect on-chain ownership or balances.

## Quick answers

* **Do I need to create a new Safe?** No.
* **Do my funds or owners change?** No.
* **Can I keep using `safe.kaia.io`?** Only until **August 31, 2026**. Switch to [app.safe.global](https://app.safe.global) now.
* **Where do I get more help?** [Safe Wallet Help Center](https://help.safe.global) and [FAQs](./faqs.md).

## Next steps

* [Use Safe Wallet on Kaia](./use-safe-wallet.md) — create a Safe, add assets, and send transactions
* [Safe Wallet overview](./overview.md) — networks and Safe Global resources
* [FAQs](./faqs.md) — more account management questions
