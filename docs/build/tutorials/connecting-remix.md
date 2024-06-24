# Connect Remix to Kaia

![](/img/build/tutorials/klaytnXremix.png)

## What is Remix <a href="#what-is-remix" id="what-is-remix"></a>

Remix is a browser-based IDE (Integrated Development Environment) for developing Solidity contracts. This document will cover connecting Remix with Kaia. If you want to know more about how to use Remix, please refer to[ **Remix docs**](https://remix-ide.readthedocs.io/en/latest/) or [**Remix IDE**](https://remix.ethereum.org/).

## Setup EVM version <a href="#setup-evm-version" id="setup-evm-version"></a>

Kaia supports contracts written in Solidity, and is compatible with the **London** version of EVM. Also, Solidity version 0.8.x and lower are supported in Kaia. Therefore, to deploy the contract on Kaia, the contract must be compiled with the **London** EVM version.

* Click **solidity compiler**, and then choose **London** EVM version in 'Advanced Configurations'.

![Solidity Complier](/img/build/tutorials/remix-solidity-compiler.png)

## Connect to a local plugin <a href="#connect-to-a-local-plugin" id="connect-to-a-local-plugin"></a>

You need a local plugin to connect to the Kaia network using Remix. The process is described in the following:

* Click **plugin manager**, and then click **Connect to a Local Plugin**.

![Plugin](/img/build/tutorials/remix-environment-plugin.png)

* Put https://klaytn-remix-plugin.ozys.net in the **URL**. Use any name what you want in the **Plugin Name** and **Display Name**.

![Local Plugin](/img/build/tutorials/remix-local-plugin.png)

* If the \[Kaia] tab appears, you are ready to interact with Kaia.

## Setting up the Deployment Environment <a href="#setting-up-the-deployment-environment" id="setting-up-the-deployment-environment"></a>

* Click on the \[Kaia] tab.
* Select the appropriate \[Environment].
* You can select **Kairos**, **Mainnet**, **Injected Caver**, **Caver Provider** or **Injected Web3**.
  * **\[Kairos]**: Connects to the Kairos network
  * **\[Mainnet]**: Connects to the Mainnet
  * **\[Injected Caver]**: Connects to injected caver(e.g., Kaikas)
  * **\[Caver Provider]**: Connects directly to Kaia node, which supports RPC
  * **\[Injected Web3]**: Connects to injected web3(e.g., Metamask)

![Kaia Tab](/img/build/tutorials/remix-klaytn-tab.png)

## Import account <a href="#import-account" id="import-account"></a>

You can import keys from **private key** or **Keystore**.
* Click **plus** button next to the **ACCOUNT**.

![Import Keys](/img/build/tutorials/remix-klaytn-import-account.png)

* Then put private key or keystore.
* You can also import keys for the **feePayer**. It only supports **private key**.

## Connecting Kaia - Remix using EN (Endpoint Node) <a href="#connecting-kaia-remix-using-en" id="connecting-kaia-remix-using-en"></a>

* Set up an Endpoint Node in the local environment by following the instructions in [**the EN documents**](../smart-contracts/deploy/ken.md#launch-an-en).
*   Create an account by following the instructions in [**Account Management**](../get-started/account/managing-accounts.md).

    > **Note:** If you use the Public EN from Kairos, instead of from your local environment, you won't be connected to your account because the personal API is disabled.
* Select \[Caver Provider] in the Environment menu.

![Caver Provider](/img/build/tutorials/env-caver-provider.png)

* Enter the RPC address of the EN in the Caver Provider Endpoint. Local EN (default): [http://localhost:8551](http://localhost:8551/)
* Once you are successfully connected to the Network, you will see the Chain ID and Account of the connected network.

## Connecting Kaia - Remix using MetaMask <a href="#connecting-kaia-remix-using-metamask" id="connecting-kaia-remix-using-metamask"></a>

* Connect Kaia with MetaMask by referring to the [**Connecting to MetaMask**](connecting-metamask).
* Select \[Injected Web3] on the Remix Environment menu.

![Injected Web3](/img/build/tutorials/env-injected-web3.png)

* When you see the MetaMask pop-up, select the account by clicking it.
* Once you are successfully connected to the Network, you will see the Chain ID and Account of the connected network.

## Connecting Kaia - Remix using Kaikas <a href="#connecting-kaia-remix-using-kaikas" id="connecting-kaia-remix-using-kaikas"></a>

* Select \[Injected Caver] on the Remix Environment menu.

![Injected Caver](/img/build/tutorials/env-injected-caver.png)

* When you see the Kaikas pop-up, click \[Connect].
* Once you are successfully connected to the Network, you will see the Chain ID and Account of the connected network.

## Tutorial: KaiaGreeter Contract <a href="#tutorial-kaiagreeter-contract" id="tutorial-kaiagreeter-contract"></a>

We will be using the [**KaiaGreeter**](../smart-contracts/samples/kaiagreeter.md) sample contract.

* Add KaiaGreeter.sol and write the testing code.

![Add KaiaGreeter](/img/build/tutorials/remix-add-klaytngreeter.png)

* On the Solidity Compile tab, select \[Compile KaiaGreeter.sol] to compile the contract code.

> It is better to turn on the 'Auto compile' option.

* In the Deploy & Run Transactions tab, click \[Deploy] to deploy the compiled contract.

![Deploy the Contract](/img/build/tutorials/remix-deploy-run-tx.png)

* You can view the deployed contract. You can test or debug it.

![Check the Contract](/img/build/tutorials/remix-test-or-debug.png)
