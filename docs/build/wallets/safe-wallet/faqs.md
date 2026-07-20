---
title: Frequently asked questions
sidebar_label: FAQs
---

# Frequently asked questions

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 9, 2026**. Please use Safe Wallet for Kaia Network at [app.safe.global](https://app.safe.global) to manage your accounts going forward.

:::

## Does moving to Safe Global affect my existing Safe? <a id="Does moving to Safe Global affect my existing Safe"></a>

No. Your Safe is an on-chain smart account. Safe Global is a different **UI** for the same contracts. Your Safe address, owners, threshold, and assets are unchanged. You do not need to recreate the Safe or transfer funds.

See **[Migrate to Safe Global](./migrate-to-safe-global.md)** for full details.

## Will my Safe appear automatically on app.safe.global? <a id="Will my Safe appear automatically"></a>

In most cases, yes: connect an owner wallet, select **Kaia** or **Kairos**, and open your existing Safe. If it does not show up, use **Add existing Safe** / **Load** and paste the Safe address.

Optional local data (address book, nicknames) may need a one-time export from `safe.kaia.io` and import under **Settings → Data** in Safe Wallet. That does not affect on-chain ownership or balances.

## Can I add new owners after creating a Safe? <a id="Can i add new owners after creating a safe"></a>

Yes. In Safe Wallet, open **Settings** to manage Safe owners: add, remove, replace, or rename owners. You must be connected as a current owner, and changes require the usual confirmation threshold.

Typical flow:

1. Open **Settings** → owner / signer management.
2. Add a new owner (name + address).
3. Adjust the signature policy if needed.
4. Review and submit; other owners confirm like any Safe transaction.

UI labels can vary slightly as Safe Wallet evolves—see the [Help Center](https://help.safe.global) for the latest screenshots.

## Can I change the number of required confirmations? <a id="Can i change the number of required signer confirmation"></a>

Yes. In **Settings**, change the required confirmation threshold, then submit and collect owner signatures according to the *current* policy.

## How do I add an existing Safe? <a id="How do i add an existing safe"></a>

You can open an existing Safe at [app.safe.global](https://app.safe.global) by connecting an owner wallet or adding the Safe address. Use cases include:

* Accessing the same Safe from another browser or device
* Interacting with a Safe where someone else made you an owner
* Viewing a Safe in read-only mode

Safe Wallet also supports import/export of address book and related data where that feature is available in **Settings**. Prefer adding the Safe by address or owner connection on Safe Wallet rather than relying on the sunsetting `safe.kaia.io` UI.

## Common Safe setup tips

There is no single best configuration—it depends on your use case. Useful defaults:

**How many owners?**  
For teams, use multiple owners so more than one person can approve. Individuals managing larger balances often use several of their own devices/accounts for redundancy.

**What threshold?**  
Use a threshold greater than 1 so one compromised key cannot move funds alone. A threshold around 51% of owners (for example 2 of 3, 3 of 5) helps with recovery: remaining owners can still replace a lost owner.

**What wallets are compatible?**  
Safe Wallet on Kaia works with common EOA wallets such as [Kaia Wallet](https://docs.kaiawallet.io/) and [MetaMask](../../tutorials/connecting-metamask.mdx). Check Safe Wallet’s connect flow for the current wallet list.

## More help

* [Safe Wallet Help Center](https://help.safe.global)
* [Safe documentation](https://docs.safe.global)
