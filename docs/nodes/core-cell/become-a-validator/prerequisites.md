# Prerequisites

Before you can onboard a validator, you must register a **validator manager** account that holds overall management authority. Because this account can modify most of the critical information related to the validator, we **strongly recommend** using a multisig wallet—or a wallet with equivalent security guarantees—as the validator manager.

In general, we recommend using a multisig wallet created via [Kaia Safe](http://safe.kaia.io) as the validator manager. The rest of this guide assumes you are using Kaia Safe.

## Connecting a Safe Wallet <a id="connecting-a-safe-wallet"></a>

First, follow the [Kaia Safe user guide](../../../build/wallets/kaia-safe/kaia-safe.md) to create a Safe account. Then register the Validator Management Portal as a Safe custom app.

![Add custom Safe App](/img/nodes/become-a-validator/image02.png)

Click **Apps > My custom apps > Add custom Safe App**.

![Paste portal URL](/img/nodes/become-a-validator/image03.png)

Follow the Safe guide and paste the portal URL. Verify that the portal information is displayed correctly below, check the disclaimer checkbox after reviewing it, and click **Add**.

![My custom apps](/img/nodes/become-a-validator/image04.png)

Once the Validator Management Portal has been added successfully, go to **Apps > My custom apps** and click the **Kaia Validators** card to open the portal using your Safe account.

![Safe wallet connected](/img/nodes/become-a-validator/image05.png)

On entering the portal you will see the Safe wallet connected on the left. From now on, when you attempt to send a transaction from the portal, the transaction will be signed and submitted through Safe according to your multisig configuration.

## Connecting Another Wallet <a id="connecting-another-wallet"></a>

:::warning Security Note

Using a wallet without multisig, or without equivalent security guarantees, as the validator manager is **not recommended**.

:::

![Connect wallet](/img/nodes/become-a-validator/image06.png)

If you want to manage the manager account with a different wallet, click **Connect Wallet** to connect it.
