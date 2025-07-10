# SafePal S1

![](/img/banners/kaia-safepal.png)

## Introduction <a id="introduction"></a>

Hardware wallets reinvented the wheel by keeping private keys (needed for signing transactions) in an offline environment separate from internet connections, avoiding the numerous hacks or threats that arise from software wallets reliant on internet connectivity. This way, users' crypto assets are more secured and shielded from internet dangers brought on by software wallets.

One of such hardware wallets that has integrated with Kaia is **SafePal S1 Hardware Wallet**. SafePal S1 is a cryptocurrency hardware wallet that aims to provide a secure, simple, and enjoyable crypto management solution for the populace. SafePal is an hardware wallet to secure and manage cryptocurrencies and NFTs, such as Bitcoin, KAIA, Kaia Compatible Tokens (KCT), ETH and ERC20 tokens e.t.c.

In this guide, you will:

* Add, Receive and Send KAIA, and any Kaia Compatible Tokens(KCT)  with SafePal S1 Hardware Wallet

## Prerequisites <a id="prerequisites"></a>

* [SafePal Hardware Wallet Set-Up](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752)

## Getting Started <a id="getting-started"></a>

After you must have successfully set up your wallet, next is to see the wallet in action. In this tutorial we will be adding, receiving and sending KAIA native coin, and any Kaia Compatible Tokens(KCT) using the SafePal S1 Hardware Wallet.

### Adding crypto tokens <a id="adding-crypto-tokens"></a>

To add crypto tokens to your hardware wallet, kindly follow the steps below:

**Step 1**: Open the SafePal App and in your Wallet tab, click the ellipsis icon and then click the Manage Coins button as shown in the picture below:

![](/img/build/tools/safepal/sp-hw-manage-coins.png)

**Step 2**: Search for the coins you want to add, then toggle them on.

**Native Tokens - KAIA**

* Type KAIA in the search bar and toggle it on. 

![](/img/build/tools/safepal/sp-app-search-kaia.jpg)

**Fungible Tokens - USDT**

* Type USDT Kaia in the search bar and toggle it on.

![](/img/build/tools/safepal/sp-app-search-usdt.jpg)

**Step 3**: Click **Add Coin** at the bottom.

![](/img/build/tools/safepal/sp-hw-add-coins.png)

**Step 4**: Scan back and forth between the SafePal App and the S1 hardware wallet, enter your device PIN code, so that the data is correctly synchronized between the App and the device.

**Step 4**: After the coin has been added successfully, you can now view them in the **Asset Management** tab on the S1 device. 

![](/img/build/tools/safepal/sp-hw-asset-display.png)

:::note
The steps above apply to adding any Kaia Compatible Tokens. 
:::

### Receiving crypto tokens <a id="receiving-crypto-tokens"></a> 

Once the coins (KAIA, KCTs) are successfully added, you can view them in the **Asset Management** tab on the S1 device. You can receive crypto tokens using the following approach: 

#### Using the SafePal App

1. Select KAIA or any other fungible token, such as USDT, which provides the options to Swap, Receive, and Send. Tap Receive.
2. You can either copy your KAIA or USDT wallet address, save the QR code, or have the other party scan the QR code directly from your device.

#### Using the SafePal S1 Hardware Wallet

1. Start your SafePal S1 device and navigate to the 'Asset Management'.
2. Select KAIA or any other fungible token, such as USDT, as the coin you would like to receive.
3. Click on the 'Receive' button.
4. Enter the PIN code of your S1 device.
5. Then you can see the QR code of your coin address, and show it to others so that they can scan and send the coin to you.

![](/img/build/tools/safepal/sp-hw-receive-tokens.png)

:::note
The steps above apply to receiving any Kaia-compatible tokens.
:::

### Sending crypto tokens  <a id="sending-crypto-tokens"></a>

To send crypto tokens from your hardware wallet, kindly follow the steps below:

**Step 1**: On the SafePal App, choose the coin you want to send and click **Send**.

**Native Tokens - KAIA**

![](/img/build/tools/safepal/sp-hw-sp-app-send.png)

**Fungible Tokens - USDT**

![](/img/build/tools/safepal/sp-hw-sp-app-usdt-send.png)

**Step 2**: Enter the destination address, amount, and click 'Next' to confirm the details again. Ensure to verify your transfer details in this step.

![](/img/build/tools/safepal/sp-hw-sp-app-send-details.png)

**Step 3**: Initiate the signing process of the S1 device.

In this step, a QR code (as shown below) containing the transfer details will be displayed on the SafePal App. Start your S1 hardware wallet, and enter the **Scan** tab. Next is to scan the QR code on the SafePal App and enter your PIN code from your SafePal device. 

Doing this ensures that the S1 device receives the transfer details in an offline environment.

![](/img/build/tools/safepal/sp-hw-sign-tx.png)

**Step 4**: Synchronize the signature back to the SafePal App

After successfully signing the transfer on the S1 device, you will see a set of dynamic QR codes shown on the S1 device. On the SafePal App, click 'Next' to open the cellphone camera. Use the SafePal App to scan the dynamic QR codes shown on the S1 device. 

Doing this ensures the App receives the signature contained in the QR codes and is ready to broadcast the transfer to the blockchain (Kaia).

**Step 5**: Click **Broadcast** on the App and wait for the transfer to go through

![](/img/build/tools/safepal/sp-hw-broadcast-tx.png)

:::note
The steps above apply to sending any Kaia Compatible Tokens.
:::

## Further References  <a id="further-references"></a>

* [SafePal S1 Upgrade Instructions](https://www.safepal.com/en/upgrade/s1)
* [SafePal S1 User Manual](https://docs.safepal.io/safepal-hardware-wallet/user-manual)