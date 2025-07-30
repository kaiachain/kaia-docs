# Use Kaia Safe

## Create a Safe

Here you will see how to create a Safe and evaluate its benefits on the Kaia Network.

**Step 1:** Navigate to [Kaia Safe App](https://safe.kaia.io/). By navigating to the application on your web browser, you can explore the functionality of Kaia Safe.

**Step 2:** Connect your [wallet](https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/). At the moment, Kaia Safe support various wallets like [Kaia Wallet](https://docs.kaiawallet.io/), [MetaMask](../../../tutorials/connecting-metamask.mdx) wallet, etc. 

For the sake of this guide, we will be using MetaMask. Make sure you have Kaia networks([Mainnet](../../../tutorials/connecting-metamask.mdx#connect-to-kaia-network) or [Kairos Testnet](../../../tutorials/connecting-metamask.mdx#connect-to-kaia-network)) added to your MetaMask wallet to connect successfully.

![](/img/build/tools/kaia-safe/kaia-safe-connect-wallet.png)

**Step 3:**  Once your wallet is connected, click **Create Account** and give your new Safe a **name**. This name is linked to your safe account, which is a multi-signature wallet that holds and stores all of your funds.

**Step 4:** Add owners/signers by inputting the addresses that have permission to submit and approve transactions. You can add as many signers as you want and remove or replace any of them at any time.

**Step 5:** Choose how many signer confirmations a transaction in your Safe account needs to be approved. It is important to note that by default our app allows one signer confirmation. But it is advisable to use a threshold higher than 1 to ensure a secured safe account. Good practice is to use a threshold of 51% of the total owners e.g, 2 out of 3, 3 out of 5 etc as shown below:

![](/img/build/tools/kaia-safe/kaia-safe-create-acct.gif)

**Step 6:** Review and deploy Safe

Once you are completely satisfied with all of your Safe parameters, you can submit the creation of your Safe account and proceed with the on-screen instructions to complete the account creation.

![](/img/build/tools/kaia-safe/kaia-safe-create-review.gif)

Congratulations on successfully creating your Kaia Safe account!

## Add assets

In this section, you will see how to add assets (KAIA, FT, NFT)  to your safe account and keep your funds safe.

### KAIA Deposits

Below are the steps to add **KAIA** to your safe account

**Step 1:** Copy your Safe address from your account dashboard.

![](/img/build/tools/kaia-safe/ks-deposit-copy-addr.png)

**Step 2:** Open your Metamask wallet and click **send** to send asset to your safe account. 

Note that there are different ways to send assets to your Safe account. You can send from your [hardware wallet](https://www.ledger.com/academy/crypto-hardware-wallet), [web wallet](https://medium.com/arcana-network-blog/why-web-wallets-e77c776e4d5e), or even a smart contract. In this case, we're making use of a web wallet called MetaMask.


![](/img/build/tools/kaia-safe/ks-token-send-btn.png)

**Step 3:** Paste your safe address in the search field as seen below.

**Step 4:** Input **amount** and click **next**.

![](/img/build/tools/kaia-safe/ks-token-send-details.png)


**Step 5:** Confirm the transaction and check your asset dashboard. You can see the amount being transferred from your metamask account to your Kaia Safe account. 

![](/img/build/tools/kaia-safe/kaia-safe-klay-bal.png)

### KIP-7 Deposits

Now we will see how to deposit KIP7 (fungible tokens) to our safe by following the below steps.

**Step 1:** Copy your Safe address from your account dashboard.

![](/img/build/tools/kaia-safe/ks-deposit-ft-copy.png)

**Step 2:** Open your Metamask Wallet and navigate to **assets** tab.

**Step 3:** Select the token you will love to send and click **send**.

![](/img/build/tools/kaia-safe/ks-ft-send-btn.png)

**Step 4:** Repeat step **3**, **4**, **5** of **KAIA** Deposits above.

![](/img/build/tools/kaia-safe/ks-ft-send-details.png)


**Step 5:** View your assets dashboard, you can see the KIP7 tokens being transferred to your safe account. Similarly you can transfer any Fungible token to your safe account.

![](/img/build/tools/kaia-safe/ks-ft-balance.png)

### KIP-17 (NFTs) Deposits

Now we  will see how to deposit KIP17 (Non Fungible tokens) to our safe by following the steps below.

You can transfer your NFT’s to your safe account in many different ways. Here is an example on how to transfer NFT to the safe account using  [OpenSea](https://opensea.io/about).

1. Navigate to your [OpenSea account](https://testnets.opensea.io/account) profile page
2. Navigate to an NFT you ll love to transfer. Make sure to select a NFT on the Kaia Network(Mainnet or Kairos)
3. On the next page, click on the transfer button. 
4. Paste the safe address in the text box and transfer to safe 
5. Under Assets section in Kaia Safe you can find NFT’s from OpenSea. 

![](/img/build/tools/kaia-safe/kaia-safe-trf-nft.gif)

Please refer to this [guide](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea) from OpenSea for more details on transferring NFTs.

## Send assets

In this section, you'll learn how to send KAIA and KIP-7 tokens from your Kaia Safe account.

### Send KAIA & KIP7 Tokens <a id="Send KAIA from Safe"></a>

**Step 1:** Click the **New Transaction** button in the side menu and select **Send tokens** to begin a new asset transfer.

![](/img/build/tools/kaia-safe/kaia-safe-init-send-token.gif)

**Step 2:** Choose assets to transfer. 

* **KAIA**
  
> Note: Add the **recipient address** and the **amount** of KAIA to send the transfer KAIA.

![](/img/build/tools/kaia-safe/kaia-safe-send-token-details.gif)
  
* **KIP-7 Tokens**

Select the tokens you want to send in the asset drop-down as seen in the image above.

> Note: Add the recipient address and the number of tokens to transfer KIP7 tokens.
  

**Step 3:** Review and submit the transaction. You will need to sign the transaction with your signer wallet, and it will be executed once the confirmation threshold is reached.

![](/img/build/tools/kaia-safe/kaia-safe-review-send-tokens.gif)

### Send NFTs <a id="Send NFTs from Safe"></a>

In this section, you'll learn how to send your non-fungible tokens from your Kaia Safe account. 

**Step 1:** Click the **New Transaction** button in the side menu and select **Send NFTs** to begin a new asset transfer.

![](/img/build/tools/kaia-safe/kaia-safe-init-send-nft.gif)

**Step 2:** Choose assets to transfer.

![](/img/build/tools/kaia-safe/kaia-safe-send-nft-details.gif)

**Step 3:** Review and submit the transaction. You will need to sign the transaction with your signer wallet, and it will be executed once the confirmation threshold is reached.

![](/img/build/tools/kaia-safe/kaia-safe-review-send-nft.gif)

## Further Notes <a id="Points to Note"></a>

The following are things you will want to keep in mind while using Kaia Safe:

### Transaction Fees <a id="Transaction Fees"></a>

Kaia Safe transactions, whether asset transfers or contract interactions, incur a fee that will be paid by the signer that executes the transaction (usually the last signer to reach the required threshold of signatures).

### Safe Nonce <a id="Safe Nonce"></a>

For security reasons, transactions made with Safe need to be executed in order. To achieve this, a number called **nonce** is assigned to a transaction to ensure that each transaction can be executed once. 

![](/img/build/tools/kaia-safe/ks-nounce.png)

At any given time, only transactions with a nonce _last executed transaction +1_ can be executed. Transactions with a higher nonce are queued for execution. So, whenever a transaction is completed, the next transaction in the queue is made available for execution, provided it has accumulated enough signatures.

![](/img/build/tools/kaia-safe/ks-pending-tx.png)

### Chain-specific addresses <a id="Chain-specific addresses"></a>

You can choose to copy address with chain prefix

* Copy addresses with chain prefix:

![](/img/build/tools/kaia-safe/ks-chain-spec-addr.png)


When copying your safe address from your dashboard to paste in your wallet as seen above, you can either choose to add the chain name or not by clicking the checkbox. It is suggested that you leave it unchecked to avoid the error below.

![](/img/build/tools/kaia-safe/ks-chain-addr-err.png)