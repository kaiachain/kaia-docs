# Connect MetaMask to Klaytn

![](/img/banners/kaia-metamask.png)

> **Note**: MetaMask is mostly used as a wallet for Ethereum, but it is also compatible with Klaytn due to the identical address structures. Klaytn also has a browser extension wallet called [Kaikas](../tools/wallets/kaikas.md), so it basically provides the same features as MetaMask, except for Remix.

## Step 1. Install MetaMask <a href="#install-metamask" id="install-metamask"></a>

- We will be using Chrome browser in this example. ([**Install Chrome**](https://www.google.com/intl/en_us/chrome/))
- Add [**MetaMask Extension**](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) to Chrome.

  > **Note:** You may need additional installations if you are using another browser.
- You can start MetaMask by clicking on the icon in the upper right-hand corner of your chrome browser.

## Step 2. Generate a MetaMask Wallet <a href="#generate-a-metamask" id="generate-a-metamask"></a>

![Create a Wallet](/img/build/tutorials/new-to-metamask.png)

- Click on \[Create a Wallet].
- Set a password.
- You will be given a 12 word seed phrase; back it up somewhere secure.

  > **Note:** You can only restore your wallet with the seed phrase. Sharing your seed phrase with others may result in losing all of your funds. Therefore, it is recommended that you either write it down manually or store it in an offline device.

![Seed phrase and Wallet](/img/build/tutorials/metamask-secret-backup.png)

## Step 3. Connect to Klaytn Cypress Network (Mainnet) <a href="#connect-to-klaytn-cypress-network-mainnet" id="connect-to-klaytn-cypress-network-mainnet"></a>

> Here's a simple way. [Connect your wallet to the Klaytn Cypress Network (Mainnet)](https://chainlist.org/chain/8217).

- Click on the upper Networks tab, which is on Ethereum Mainnet as default, and select \[Add network].
- Enter the Endpoint Node (EN) data of the Klaytn chain.

### Baobab Network Configuration

| Network Config Item | Value                                  |
| ------------------- | -------------------------------------- |
| Network Name        | Kaia Mainnet                           |
| New RPC URL         | `https://public-en-cypress.klaytn.net` |
| Block Explorer URL  | `https://kaiascope.com/`               |
| Chain ID            | 8217                                   |
| Currency Symbol     | KLAY                                   |

- Click \[Save] to add Klaytn Baobab Network.

![Network Setup and Custom RPC](/img/build/tutorials/metamask-add-cypress-1.png) ![Network Setup and Custom RPC](/img/build/tutorials/metamask-add-cypress-2.png)

## Step 4. Send KLAY <a href="#send-klay" id="send-klay"></a>

**Note:** The following steps require KLAY.

- Click \[Send] on the main page and enter the recipient address and the amount of KLAY.

![Send KLAY 1](/img/build/tutorials/metamask-send-klay-1.png)

**NOTE:** Sending KLAY requires a transaction, for which you need KLAY.

- Since Klaytn v1.9.0, a [dynamic gas fee mechanism](https://medium.com/klaytn/dynamic-gas-fee-pricing-mechanism-1dac83d2689) has replaced the existing fixed price policy.
- So you don't have to set the fixed gas fee manually.
- Check the amount to send and the transaction fee and click \[Confirm] to complete the KLAY transfer, after which you will be redirected to the main page.
- Click \[Activity] on the main page to confirm the transaction history.

![Send KLAY 2](/img/build/tutorials/metamask-send-klay-2.png)

## Connect to Klaytn Baobab Network (Testnet) <a href="#connect-to-klaytn-baobab-network-testnet" id="connect-to-klaytn-baobab-network-testnet"></a>

### Obtain KLAY to make a transaction

> **Note:** This tutorial uses Public EN of the Testnet (Baobab) to connect to the network. Make sure to use Baobab when you are running a test.

> Here's a simple way. [Connect your wallet to the Klaytn Baobab Network (Testnet)](https://chainlist.org/chain/1001).

### Cypress Network Configuration

| Network Config Item | Value                                   |
| ------------------- | --------------------------------------- |
| Network Name        | Kaia Kairos                             |
| New RPC URL         | `https://public-en-kairos.node.kaia.io` |
| Block Explorer URL  | `https://baobab.klaytnscope.com `       |
| Chain ID            | 1001                                    |
| Currency Symbol     | KLAY                                    |

- Click \[Save] to add Klaytn Cypress Network.

![Network Setup](/img/build/tutorials/connect-testnet-1.png)

- To test the connection of the Klaytn Wallet, you will need to make a transaction, which requires KLAY.
- Click on the kebab menu (three dots) in the upper right corner and select \[Account details].
- Click \[Export Private Key] to obtain your private key.

![Export Private Key](/img/build/tutorials/connect-testnet-2.png)

- When using Baobab Testnet, you can obtain Test Klay in [**Klaytn Faucet**](https://baobab.wallet.klaytn.foundation/access?next=faucet).
- Enter your private key on Klaytn Wallet and log in by clicking \[Access]. (Attach 0x in front of the private key.)
- Click \[Run Faucet]. 150 Testnet KLAY will be sent to your account and the balance will be updated accordingly. You can claim Testnet KLAY from Faucet once every 24 hours per account.

![Obtain KLAY from Faucet](/img/build/tutorials/connect-testnet-3.png)

- Come back to MetaMask and confirm the KLAY that you received.

![Check your balance](/img/build/tutorials/connect-testnet-4.png)
