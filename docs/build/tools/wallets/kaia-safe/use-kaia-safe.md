# Use Kaia Safe

## Create a Safe

Here you will see how to create a Safe and evaluate its benefits on the Kaia Network.

**Step 1:** Navigate to [Kaia Safe App](https://safe.klaytn.foundation/). By navigating to the application on your web browser, you can explore the functionality of Kaia Safe.

**Step 2:** Connect your [wallet](https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/). At the moment, Kaia Safe support various wallets like [Kaikas](https://docs.kaikas.io/), [MetaMask](../../../tutorials/connecting-metamask) wallet, etc. 

For the sake of this guide, we will be using MetaMask. Make sure you have Kaia networks([Cypress](../../../tutorials/connecting-metamask#connect-to-klaytn-cypress-network-mainnet) or [Baobab](../../../tutorials/connecting-metamask#connect-to-klaytn-baobab-network-testnet)) added to your MetaMask wallet to connect successfully.

![](/img/build/tools/kaia-safe/ks-connect-wallet.png)

**Step 3:**  Once your wallet is connected, click **Create New Safe** and give your new Safe a **name**. This name is linked to your safe account, which is a multi-signature wallet that holds and stores all of your funds.

**Step 4:** Add owners/signers by inputting the addresses that have permission to submit and approve transactions. You can add as many signers as you want and remove or replace any of them at any time.

**Step 5:** Choose how many signer confirmations a transaction in your Safe account needs to be approved. It is important to note that by default our app allows one signer confirmation. But it is advisable to use a threshold higher than 1 to ensure a secured safe account. Good practice is to use a threshold of 51% of the total owners e.g, 2 out of 3, 3 out of 5 etc as shown below:

![](/img/build/tools/kaia-safe/create-acc-ks.gif)

**Step 6:** Review and deploy Safe

Once you are completely satisfied with all of your Safe parameters, you can submit the creation of your Safe account and proceed with the on-screen instructions to complete the account creation.

![](/img/build/tools/kaia-safe/review-ks-creation.gif)

Congratulations on successfully creating your Kaia Safe account!

## Add assets

In this section, you will see how to add assets (KLAY, FT, NFT)  to your safe account and keep your funds safe.

### KLAY Deposits

Below are the steps to add **KLAY** to your safe account

**Step 1:** Copy your Safe address from your account dashboard.

![](/img/build/tools/kaia-safe/copy-kaia-safe-address.png)

**Step 2:** Open your Metamask wallet and click **send** to send asset to your safe account. 

Note that there are different ways to send assets to your Safe account. You can send from your [hardware wallet](https://www.ledger.com/academy/crypto-hardware-wallet), [web wallet](https://medium.com/arcana-network-blog/why-web-wallets-e77c776e4d5e), or even a smart contract. In this case, we're making use of a web wallet called MetaMask.


![](/img/build/tools/kaia-safe/ks-mm-send-btn.png)

**Step 3:** Paste your safe address in the search field as seen below.

**Step 4:** Input **amount** and click **next**.

![](/img/build/tools/kaia-safe/ks-send-details.png)


**Step 5:** Confirm the transaction and check your asset dashboard. You can see the amount being transferred from your metamask account to your Kaia Safe account. 

![](/img/build/tools/kaia-safe/ks-klay-balance.png)

### KIP-7 Deposits

Now we will see how to deposit KIP7 (fungible tokens) to our safe by following the below steps.

**Step 1:** Copy your Safe address from your account dashboard.

![](/img/build/tools/kaia-safe/ks-kip7-copy-address.png)

**Step 2:** Open your Metamask Wallet and navigate to **assets** tab.

**Step 3:** Select the token you will love to send and click **send**.

![](/img/build/tools/kaia-safe/ks-kip7-mm-send-btn.png)

**Step 4:** Repeat step **3**, **4**, **5** of **KLAY** Deposits above.

![](/img/build/tools/kaia-safe/ks-kip7-mm-send-cct.png)


**Step 5:** View your assets dashboard, you can see the KIP7 tokens being transferred to your safe account. Similarly you can transfer any Fungible token to your safe account.

![](/img/build/tools/kaia-safe/ks-kip7-bal-display.png)

### KIP-17 (NFTs) Deposits

Now we  will see how to deposit KIP17 (Non Fungible tokens) to our safe by following the steps below.

You can transfer your NFT’s to your safe account in many different ways. Here is an example on how to transfer NFT to the safe account using  [OpenSea](https://opensea.io/about).

1. Navigate to your [OpenSea account](https://testnets.opensea.io/account) profile page
2. Navigate to an NFT you ll love to transfer. Make sure to select a NFT on the Kaia Network(Cypress or Baobab)
3. On the next page, click on the transfer button. 
4. Paste the safe address in the text box and transfer to safe 
5. Under Assets section in Kaia Safe you can find NFT’s from OpenSea. 

![](/img/build/tools/kaia-safe/ks-transfer-kip17.gif)

Please refer to this [guide](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea) from OpenSea for more details on transferring NFTs.

## Send assets

In this section, you'll learn how to send KLAY and KIP-7 tokens from your Kaia Safe account.

### Send KLAY & KIP7 Tokens <a id="Send KLAY from Safe"></a>

**Step 1:** Click the **New Transaction** button in the side menu and select **Send funds** to begin a new asset transfer.

![](/img/build/tools/kaia-safe/ks-new-tx-init.gif)

**Step 2:** Choose assets to transfer. 

* **KLAY**
  
> Note: Add the **recipient address** and the **amount** of KLAY to send the transfer KLAY.

![](/img/build/tools/kaia-safe/ks-send-klay.gif)
  
* **KIP-7 Tokens**

Select the tokens you want to send in the asset drop-down as seen in the image above.

> Note: Add the recipient address and the number of tokens to transfer KIP7 tokens.
  

**Step 3:** Review and submit the transaction. You will need to sign the transaction with your signer wallet, and it will be executed once the confirmation threshold is reached.

![](/img/build/tools/kaia-safe/ks-review-send-klay.gif)

### Send NFTs <a id="Send NFTs from Safe"></a>

In this section, you'll learn how to send your non-fungible tokens from your Kaia Safe account. 

**Step 1:** Click the **New Transaction** button in the side menu and select **Send NFT** to begin a new asset transfer.

![](/img/build/tools/kaia-safe/ks-send-nft-init.gif)

**Step 2:** Choose assets to transfer.

![](/img/build/tools/kaia-safe/ks-send-nft.gif)

**Step 3:** Review and submit the transaction. You will need to sign the transaction with your signer wallet, and it will be executed once the confirmation threshold is reached.

![](/img/build/tools/kaia-safe/review-submit-ks-nft.gif)

## Further Notes <a id="Points to Note"></a>

The following are things you will want to keep in mind while using Kaia Safe:

### Transaction Fees <a id="Transaction Fees"></a>

Kaia Safe transactions, whether asset transfers or contract interactions, incur a fee that will be paid by the signer that executes the transaction (usually the last signer to reach the required threshold of signatures).

### Safe Nonce <a id="Safe Nonce"></a>

For security reasons, transactions made with Safe need to be executed in order. To achieve this, a number called **nonce** is assigned to a transaction to ensure that each transaction can be executed once. 

![](/img/build/tools/kaia-safe/ks-nounce-one.png)

At any given time, only transactions with a nonce _last executed transaction +1_ can be executed. Transactions with a higher nonce are queued for execution. So, whenever a transaction is completed, the next transaction in the queue is made available for execution, provided it has accumulated enough signatures.

![](/img/build/tools/kaia-safe/ks-nounce-two.png)

### Chain-specific addresses <a id="Chain-specific addresses"></a>

You can choose to copy address with chain prefix

* Copy addresses with chain prefix:

![](/img/build/tools/kaia-safe/ks-chain-specific-addr.png)


When copying your safe address from your dashboard to paste in your wallet as seen above, you can either choose to add the chain name or not by clicking the checkbox. It is suggested that you leave it unchecked to avoid the error below.

![](/img/build/tools/kaia-safe/ks-chain-specific-addr-mm.png)