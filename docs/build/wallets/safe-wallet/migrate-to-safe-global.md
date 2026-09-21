---
title: Migrate to Safe Global
sidebar_label: Migrate to Safe Global
---

# Migrate to Safe Global

Kaia previously ran **Kaia Safe** (`safe.kaia.io`), a hosted fork of Gnosis Safe. That interface was retired on **August 31, 2026** and is no longer available.

Kaia Mainnet and Kairos Testnet are supported natively on [Safe Global](https://app.safe.global). Create and manage Safes on Kaia through Safe Wallet at [app.safe.global](https://app.safe.global).

## Your existing Safe accounts are unaffected

Your Safe is a smart contract on Kaia. Retiring the Kaia-hosted interface changed only the **web front end**, not your on-chain account.

Unchanged:

* Safe address
* Owners and confirmation threshold
* Assets (KAIA, tokens, NFTs)
* On-chain transaction history

You do **not** need to redeploy, recreate, or move funds to a new Safe. Safes created through Kaia Safe appear on Safe Global as soon as you connect an owner wallet.

## Open your existing Safe on Safe Global

1. Open [app.safe.global](https://app.safe.global).
2. Connect a wallet that is an **owner** of your Safe (for example Kaia Wallet or MetaMask).
3. Your Safe should appear, labeled with its network (**Kaia** or **Kairos**). If it does not, go to [app.safe.global/welcome/accounts](https://app.safe.global/welcome/accounts) and click **Manage list** to see the Safes associated with your connected wallet.

## Address book labels

The address book—the names and labels you saved for addresses—was stored locally in the `safe.kaia.io` interface rather than on-chain, and was the one thing that did not carry over automatically. Since that interface has been retired, saved labels can no longer be exported and need to be re-entered in Safe Wallet under **Address book**.

This affects labels only. Ownership, balances, and transaction history are on-chain and unaffected.

## Next steps

* [Use Safe Wallet on Kaia](./use-safe-wallet.md) — create a Safe, add assets, and send transactions
* [Safe Wallet overview](./overview.md) — networks and Safe Global resources
* [FAQs](./faqs.md) — more account management questions
* [Safe Wallet Help Center](https://help.safe.global) — help with the Safe Wallet app itself
