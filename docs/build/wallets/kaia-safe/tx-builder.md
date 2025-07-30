# Use Transaction Builder

This is a custom app in Kaia Safe that is responsible for batching transactions. This means that we you can bundle several transactions together, instead of having to confirm one transaction after the other. You just have to confirm and execute once.

With transaction builder, you can compose transactions from token transfers to complex contract interactions and batch them into a single transaction.


## KAIA Token Transfer <a id="token-transfer"></a>
You can perform token transfer using transaction builder by following the steps below:

**Step 1:** Navigate to Safe Apps and open Transaction Builder Safe App 

![](/img/build/tools/kaia-safe/ks-tx-builder.png)

**Step 2:** Enter the recipient wallet address. For this guide, kindly skip the ABI field as we are trying to execute KAIA transfer transaction.

![](/img/build/tools/kaia-safe/tx-builder-token-recipient-addr.png)


**Step 3:** Enter the KAIA value you want to send. 

> Note: In this guide, we are sending 1 KAIA, so we entered 1 in the **KAIA value** input field. You can input any amount here, depending on your Safe's KAIA balance.

![](/img/build/tools/kaia-safe/tx-builder-token-trf-value.png)

**Step 4:** Click Add transaction. 

**Step 5:** Repeat steps 2, 3, and 4 for every recipient address.

**Step 6:** Once you added all operations to the batch click Create Batch. 

![](/img/build/tools/kaia-safe/token-trf-tx-builder.gif)


**Step 7:** Review and submit transaction

You'll be able to review the whole batch. Once ready, click Send Batch to submit and execute the transaction just like any other Safe transaction.


## Contract Interactions <a id="contract-interactions"></a>

Let's say you want to airdrop tokens to a long list of addresses, say 10 CCT tokens to 5 addresses. Instead of having to create 5 transactions, which the owners of your safe have to confirm and execute one after the other, the transaction builder puts all these transfers into a single transaction.

In this guide, we have minted CCT tokens to the Safe address for illustrative purpose.

Let’s get started with this example using Transaction Builder!

**Step 1:** Open Safe Apps.

![](/img/build/tools/kaia-safe/ks-tx-builder.png)

**Step 2:** Open the Transaction Builder Safe app

![](/img/build/tools/kaia-safe/ks-use-tx-builder.png)

**Step 3:** Enter your **token contract address** and **ABI**. 

In this example, CCT contract address and ABI will be used. You can copy and paste your ABI into the **Enter ABI** field.

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-init.gif)

**Step 4:** Select a method and fill the transaction information

From the drop-down you can select a method. In this case, we select the **transfer** method. For this step to be completed, you have to fill out the transaction information, such as **to(address)** and **amount(uint256)**.


Note: The value is an unsigned integer without any decimals. In this example, the CCT token has 18 decimals. So if you want to send 10 CCT, you have to enter 10000000000000000000. 

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-details.gif)

**Step 5:** Click **Add transaction**
 
**Step 6:** Repeat steps **4**, **5**, and **6** for every recipient address.
 
**Step 7:** Once you added all operations to the batch click **Create Batch**

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-batch.gif)

**Step 8:** Review and submit transaction

You'll be able to review the whole batch. Once ready, click **Send Batch** to submit and execute the transaction just like any other Safe transaction.
