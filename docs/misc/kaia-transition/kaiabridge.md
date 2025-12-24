# Kaiabridge

Finschia users can swap their FNSA tokens on Finshia network to KAIA tokens on Kaia network at a fixed swap rate. The swap is mediated by a set of smart contract and programs, collectively called Kaiabridge.

You can access and use Kaiabridge in our [online toolkit](https://toolkit.kaia.io/kaiaBridge).

You can find the contract source codes in [GitHub kaiachain/kaia repository](https://github.com/kaiachain/kaia/tree/dev/contracts/contracts/system_contracts/kaiabridge) and deployed addresses in the [contract addresses](https://docs.kaia.io/references/contract-addresses/) page.

# User Guide for Kaiabridge

## Prerequisite

### 1. Move your account to MetaMask or Kaia Wallet

#### With raw private key

If your account can be exported as raw private key, copy the raw private key and import it in the MetaMask or Kaia wallet.

- [MetaMask](https://support.metamask.io/start/use-an-existing-wallet#import-using-a-private-key)
- [Kaia Wallet](https://www.kaiawallet.io/en_US/faq/?id=25)

#### With recovery phrase

If your account can only be exported as a recovery phrase, calculate your raw private key from the recovery phrase. You can use any tool that supports BIP-39 derivation path. Such tools include [ethers.js](https://docs.ethers.org/v6/api/wallet/#HDNodeWallet), [viem](https://viem.sh/docs/accounts/local/hdKeyToAccount), [Foundry](https://getfoundry.sh/cast/reference/wallet/), and the [BIP39 Tool](https://github.com/iancoleman/bip39). Finschia wallets often use the "m/44'/438'/0'/0/0" path (according to [SLIP-044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)) as their default derivation path. You might need to use other derivation paths if your Finschia wallet has multiple accounts or uses a different configuration.

Once you have calculated the private key, follow the instructions in the above section [With raw private key](#with-raw-private-key).

:::note[Example using the BIP39 Tool]

You can calculate the private key on this page: [BIP39 - Mnemonic Code](https://iancoleman.io/bip39/).

As a precaution, it is highly recommended to follow the "Offline Usage" instructions on the page and block the Internet connection during the process.

1. Paste your recovery phrase in the "BIP39 Mnemonic" field.
2. Set "Coin" field to "ETH - Ethereum".
3. Set "Derivation Path" to "BIP32".
4. Set "Client" to "Custom derivation path".
5. Set "BIP32 Derivation Path" to "m/44'/438'/0'/0".
6. In the "Derived Addresses", look for the first row where the "Path" shows "m/44'/438'/0'/0/0", your raw private key is shown in the "Private Key" field.

:::

:::note[Example using the Foundry tool]

1. Install [Foundry](https://getfoundry.sh/).
2. Type the following command with your recovery phrase in `--mnemonic`. The raw private key will be printed.
   ```
   cast wallet private-key --mnemonic "test test test test test test test test test test test junk" --mnemonic-derivation-path "m/44'/438'/0'/0/0"
   ```

:::


### 2. Check your network

If you are using MetaMask, manually add Kaia Mainnet to your networks if you haven't done it already.

- [Connecting MetaMask to Kaia](https://docs.kaia.io/build/tutorials/connecting-metamask/)

### 3. Gas up your account

You need gas to send transactions for the swap. Refer to [Get KAIA](https://docs.kaia.io/build/get-started/getting-kaia/) for detailed instruction.

We recommend you to have at least 0.1 KAIA for the gas fee.

## Swap Finschia to Kaia

:::warning[This swap is irreversible]

The provision and claim request can be processed only once and cannot be reverted.
Read carefully before you follow these instructions.

:::

### 1. Connect your wallet

#### 1.1 Connect MetaMask

Click "Connect MetaMask" button.

<p align="center"><img src="/img/misc/kaiabridge_connect_metamask.png" alt="Connect MetaMask" width="30%"/></p>

Check if the "accounts" shows your address.
If it doesn't, open MetaMask extension and see if it says you're not connected to the page. If so, hit "connect account" button.

<p align="center"><img src="/img/misc/kaiabridge_connect_account.png" alt="Connect Account" width="30%"/></p>

#### 1.2 Connect Kaia Wallet

If you are using Kaia Wallet, the site may ask you to connect Kaia Wallet to dApp (in this case, Kaia Online Toolkit).

<p align="center"><img src="/img/misc/kaiabridge_connect_kaiawallet.png" alt="Connect Kaia Wallet" width="30%"/></p>

Click "Connect" to connect your Kaia Wallet.

#### 2. Switch to Kaia Mainnet

Check if you have correctly set your network to "Kaia Mainnet" or "Mainnet". If not, switch to Kaia Mainnet. If you are using MetaMask and you haven’t add Kaia Mainnet network in the MetaMask, refer to [Check your network](#2-check-your-network).

#### 3. Derive Finschia address

Click "Derive Finschia address". When prompted for signing a message, click "Confirm" or "Sign".

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_sign_metamask.png" alt="Sign message in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_sign_kaiawallet.png" alt="Sign message in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
Check if the "derived finschia address" matches your original Finschia address and "cony balance" matches your balance in the Finschia network (in CONY).

<div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
  <img src="/img/misc/kaiabridge_address_and_conybalance_page.png" alt="Address and CONY balance shown in the page" style={{width: "50%"}} />
  <img src="/img/misc/kaiabridge_address_and_conybalance_wallet.png" alt="Address and CONY balance shown in your wallet" style={{width: "30%", height: "60%"}} />
</div>

<br/><br/>
Also, make sure your account has some KAIA to pay the gas fee (you can check in your wallet).

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_balance_metamask.png" alt="KAIA balance in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_balance_kaiawallet.png" alt="KAIA balance in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
If you don’t have any KAIA in your account, refer to [Gas up your account](#3-gas-up-your-account).

#### 4. Request provision

Click "Request provision". When prompted for signing a message and sending a transaction, click "confirm".

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_provision_metamask.png" alt="Confirm provision transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_provision_kaiawallet.png" alt="Confirm provision transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
The process should take a few seconds. Wait until the transaction is completed.
You can check the result in the page.

<p align="center"><img src="/img/misc/kaiabridge_provision_success.png" alt="Provision request successful" width="80%"/></p>

<br/>
If it doesn't, refresh and start from the beginning.

#### 5. Request claim

Click "Request claim". When prompted for sending a transaction, click "confirm".

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_claim_metamask.png" alt="Confirm claim transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_claim_kaiawallet.png" alt="Confirm claim transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
The process should take a few seconds. Wait until the transaction is completed.
You can check the result in the page.

<p align="center"><img src="/img/misc/kaiabridge_claim_success.png" alt="Claim request successful" width="80%"/></p>

<br/>
Check your updated balance. The claimed amount should be (your cony balance) * (conversion rate, approx. 148) in [kei](https://docs.kaia.io/learn/token-economics/kaia-native-token/#units-of-kaia-).