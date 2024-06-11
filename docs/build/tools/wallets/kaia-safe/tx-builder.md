# Use Transaction Builder

This is a custom app in Kaia Safe that is responsible for batching transactions. This means that we you can bundle several transactions together, instead of having to confirm one transaction after the other. You just have to confirm and execute once.

With transaction builder, you can compose transactions from token transfers to complex contract interactions and batch them into a single transaction.

**Illustration**

Let's say you want to airdrop tokens to a long list of addresses, say 100 DRIP tokens to 10 addresses. Instead of having to create 10 transactions, which the owners of your safe have to confirm and execute one after the other, the transaction builder puts all these transfers into a single transaction.

In this guide, we have minted DRIP tokens to the Safe address for illustrative purpose.

Let’s get started with this example using Transaction Builder!



**Step 1:** Open Safe Apps.

![](/img/build/tools/15_safeApps.png)

**Step 2:** Open the Transaction Builder Safe app

![](/img/build/tools/16_safeTxBuilder.png)

**Step 3:** Enter your token contract address and ABI. In this example, DRIP contract address and ABI will be used. You can copy and paste your ABI into the “Enter ABI” field.

![](/img/build/tools/17_safeTxBatchAddrAbi.gif)

**Step 4:** Select a method and fill the transaction information

From the drop-down you can select a method. In this case, we select the **transfer** method. For this step to be completed, you have to fill out the transaction information, such as **to(address)** and **amount(uint256)**.


Note: The value is an unsigned integer without any decimals. In this example, the DRIP token has 18 decimals. So if you want to send 1 DRIP, you have to enter 1000000000000000000. 

![](/img/build/tools/18_safeTxBatchTxInfo.gif)

**Step 5:** Click **Add transaction**
 
**Step 6:** Repeat steps **4**, **5**, and **6** for every recipient address.
 
**Step 7:** Once you added all operations to the batch click **Create Batch**

![](/img/build/tools/19_safeTxBatch.gif)

**Step 8:** Review and submit transaction

You'll be able to review the whole batch. Once ready, click **Send Batch** to submit and execute the transaction just like any other Safe transaction.

![](/img/build/tools/20_safeTxBuildExec.gif)