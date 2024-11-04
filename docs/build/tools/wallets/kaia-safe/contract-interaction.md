# Interact with Contracts

In this section, you will be interacting with and sending a transaction to a simple contract deployed on Kairos using our newly created multisig wallet. 

**Pre-requisites**

* [Metamask](https://metamask.io/download/) & [Kaia Metamask Config](../../../tutorials/connecting-metamask.mdx#send-klay)
* [Remix](https://remix.ethereum.org/) & [Kaia Remix Plugin](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
* Obtain test KAIA from the [Faucet](https://faucet.kaia.io)

**Step 1:** Navigate to [Remix](https://remix.ethereum.org/)

**Step 2:** Compile and deploy the sample **storage contract**.

The contract must first be deployed before you may interact with it in your multisig wallet. This sample contract contains a simple uint "number" variable that can be updated by calling the **store** method and retrieved by calling the **retrieve** method.

![](/img/build/tools/kaia-safe/ks-ic-deploy.gif)

**Step 3:** Initiate a new transaction. 

To interact with a smart contract in your safe wallet, click **"New Transaction"**. To complete this step, you will need your already deployed contract address and ABI, as illustrated in the previous step.

![](/img/build/tools/kaia-safe/kaia-safe-ci-init.gif)

**Step 4:** Review and submit the transaction. You will need to sign the transaction with your signer wallet, and it will be executed once the confirmation threshold is reached.

![](/img/build/tools/kaia-safe/kaia-safe-ci-review-send.gif)