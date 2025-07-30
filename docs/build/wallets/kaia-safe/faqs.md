# Frequently Asked Questions

## Can I add new owners after creating a safe? <a id="Can i add new owners after creating a safe"></a>

Yes! After creating your safe account, Kaia Safe gives you access to manage safe owners, i.e., add, remove, and replace owners, or rename existing owners. 

Note: To execute this change, you need to be connected with one of the current owners.


The steps below explain how to add new owners or signers to your Safe account after its creation.

**Step 1:** Go to **Settings** in the sidebar menu, you ll see the **Manage Safe Account signers** card under the **Setup** section. 


**Step 2:** Click the **Add new signer** button at the bottom of the card. Clicking this button would open a new window. 

![](/img/build/tools/kaia-safe/ks-add-signers.png)


**Step 3:** Enter the **name** of the new owner and paste the **owner's address**. Then click the next button at the bottom-right of the page.

**Step 4:** Set a new signature policy. In this case, you can either change or retain the existing signature policy. The image below shows that 2 out of the 4 owners are required to confirm and execute any transaction.

![](/img/build/tools/kaia-safe/ks-add-signer-details.png)

**Step 5:** Review and submit the transaction. 

Confirm that all changes are correct before submitting. You can therefore submit the change by clicking on the **submit** button.

After clicking on **Submit**, your connected wallet will ask you to confirm the change. Depending on your existing signature policy, other owners will have to confirm the change just like a regular transaction.

![](/img/build/tools/kaia-safe/kaia-safe-change-owner-setup-review.gif)


## Can I change the number of required signer confirmation? <a id="Can i change the number of required signer confirmation"></a>

Yes! You can change the number of signer confirmations required by following the steps to be shown below. This is important because you might want to change the owners or signers required to confirm transactions associated with your safe account.

**Step 1:** Go to **Settings** in the sidebar menu, you ll see the **Required Confirmation** card under the **Setup** section. 

This shows your current signature policy, and from the image below, 2 out of 4 owners are required to confirm any transaction.

![](/img/build/tools/kaia-safe/ks-conf-policy.png)

**Step 2:** Click on the **change** button. 

This pops up a new window to select your new signature threshold.

![](/img/build/tools/kaia-safe/ks-conf-policy-btn.png)

**Step 3:** Click on the **Submit** button. 

Note that depending on your existing signature policy, other owners will have to confirm the change just like a regular transaction.


## How do I add an existing safe? <a id="How do i add an existing safe"></a>

Using your exported Safe data, which contains your added Safe accounts, address book, and settings, you can easily add your Safe account.

> Note: You must have downloaded your Safe data as shown in the image below:

![](/img/build/tools/kaia-safe/ks-export-btn.png)


The need to add or load an existing safe into the interface varies. These may include:

* You want to access your Safe from a different browser.
* You want to interact with Safe where another party made you an owner.
* You want to add any existing safe in read-only mode.

Let's go through the process of adding your existing safe in the following steps. Note: Please ensure that your signer's wallet is connected.

**Step 1:** Navigate to **Settings** tab.

**Step 2:** Scroll to the **Data Import** card under the **Data** section. 

![](/img/build/tools/kaia-safe/ks-data-import-i.png)

Here you can either Drag and Drop a JSON file or choose your file as seen in the image above. 
 
**Step 3:** Click on **Import** button.

![](/img/build/tools/kaia-safe/ks-data-import-btn.png)

![](/img/build/tools/kaia-safe/kaia-safe-data-import.gif)

After this, you should now have access to your Safe account.

## Common safe Set-up

This tends to provide some pointers regarding decisions to take when setting up a Safe. These may include:

* How many owners?
* What threshold?
* What wallets are compatible?

 
There is no one best response to these three questions, therefore there is no one optimum Safe configuration. Really, it all depends on the particular use case. Nevertheless, we make an effort to offer some suggestions for things to take into account:

**How many owners?**

Typically, having many owner accounts is a smart option. It is good practice for several people to have access to the safe account when groups are managing funds. It is advised for individuals who manage money to have multiple accounts so they can use more than one authentication factor.

**What threshold?**

A Safe's threshold is the minimum number of owner accounts that must approve a transaction before it can be successfully executed. It is advisable to use a threshold greater than 1, ensuring that at least one additional account is always needed to validate and carry out Safe transactions, rather than allowing a single account to carry out transactions. As a result, money cannot be moved even if an attacker gains access to one account.
 
Additionally, it is recommended to choose a threshold of 51% of the total owners, e.g., 2 out of 3, 3 out of 5, etc.  Because of this, even if one owner loses access to their account, users are not immediately locked out of all of their money in the Safe; instead, the other owners can still perform transactions and, for example, replace that lost owner account. One can contend that this serves as a recovery mechanism.
 
**What wallets are compatible?**
At the moment, Kaia Safe is compatible with [Kaia Wallet](https://docs.kaiawallet.io/), [MetaMask](../../../tutorials/connecting-metamask.mdx).