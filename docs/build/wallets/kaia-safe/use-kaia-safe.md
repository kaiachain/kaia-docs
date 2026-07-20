---
title: Use Safe Wallet on Kaia
sidebar_label: Create and manage Safes
---

# Use Safe Wallet on Kaia

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 9, 2026**. Please use Safe Wallet for Kaia Network at [app.safe.global](https://app.safe.global) to manage your accounts going forward. Your existing Safe Accounts will be automatically compatible with Safe Wallet.

:::

## Create a Safe

Here is how to create a Safe smart account on Kaia with Safe Wallet.

**Step 1:** Open [Safe Wallet](https://app.safe.global/welcome) in your browser.

![](/img/build/wallets/ks-welcome-page-sw.png)

**Step 2:** Connect your wallet. Safe Wallet supports wallets such as [Kaia Wallet](https://docs.kaiawallet.io/) and [MetaMask](../../tutorials/connecting-metamask.mdx). Ensure **Kaia Mainnet** or **Kairos Testnet** is selected in your wallet and in Safe Wallet.

![](/img/build/wallets/ks-connect-wallet-sw.png)

**Step 3:** Click **Create account** (or equivalent) and give your Safe a name.

![](/img/build/wallets/ks-add-safe-name.png)

**Step 4:** Add owners/signers by entering the addresses that can submit and approve transactions. You can add as many owners as you need and change them later.

**Step 5:** Choose how many owner confirmations a transaction needs. Prefer a threshold greater than 1. A common practice is about 51% of owners (for example 2 of 3, or 3 of 5).

![](/img/build/wallets/ks-add-signers-sw.png)

**Step 6:** Review the parameters, then deploy the Safe and follow the on-screen prompts.

![](/img/build/wallets/ks-review-create-safe-sw.png)

**Step 7:** After deployment, start using your Safe and open the account UI.

![](/img/build/wallets/ks-start-using-wallet-sw.png)

![](/img/build/wallets/ks-safe-ui-sw.png)

Your Safe account is ready.

## Add assets

You can fund a Safe by sending KAIA, fungible tokens, or NFTs to the Safe address shown in the account dashboard.

### KAIA deposits

1. Copy your Safe address from the account dashboard.
2. From a wallet (for example MetaMask, a hardware wallet, or another funded account), send KAIA to that address.
3. When the transfer confirms, the balance appears under **Assets** in Safe Wallet.

You can fund the Safe from any address that can transfer to Kaia accounts. For network setup in MetaMask, see [Connect MetaMask to Kaia](../../tutorials/connecting-metamask.mdx).

### Fungible token deposits

1. Copy your Safe address.
2. In your wallet’s token list, select the token and send it to the Safe address.
3. Confirm the transfer and verify the balance under **Assets** in Safe Wallet.

### NFT deposits

Transfer NFTs to the Safe address from a marketplace or wallet that supports Kaia (Mainnet or Kairos). For example, on [OpenSea](https://opensea.io/), open the NFT, use transfer, and paste the Safe address. After confirmation, the NFT appears under **Assets** / NFTs in Safe Wallet. See OpenSea’s [transfer guide](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea) for product-specific steps.

## Send assets

### Send KAIA and tokens

**Step 1:** Click **New transaction** and select **Send tokens**.

![](/img/build/wallets/ks-new-tx-sw.gif)

**Step 2:** Choose the asset, enter the recipient address and amount.

![](/img/build/wallets/ks-send-details-sw.gif)

**Step 3:** Review and submit. Sign with your owner wallet; the transaction executes once the confirmation threshold is reached.

![](/img/build/wallets/ks-review-send-tx-sw.gif)

### Send NFTs

1. Click **New transaction** and select **Send NFTs** (or the equivalent NFT transfer flow in Safe Wallet).
2. Choose the NFT and recipient.
3. Review, collect the required signatures, and execute.

For UI details that change over time, see the [Safe Wallet Help Center](https://help.safe.global).

## Further notes

### Transaction fees

Safe transactions (asset transfers or contract interactions) incur a network fee paid by the owner that **executes** the transaction (typically the last signer to reach the threshold).

### Safe nonce

For security, Safe transactions must be executed in order. Each transaction has a **nonce**. Only the transaction with nonce *last executed + 1* can be executed; higher nonces remain queued until earlier ones complete and enough signatures are collected.

### Chain-specific address prefixes

When copying a Safe address from the dashboard, avoid including a chain name prefix if your destination wallet does not accept it—paste the bare address to prevent transfer errors.

## More help

* [Safe Wallet Help Center](https://help.safe.global)
* [Safe documentation](https://docs.safe.global)
