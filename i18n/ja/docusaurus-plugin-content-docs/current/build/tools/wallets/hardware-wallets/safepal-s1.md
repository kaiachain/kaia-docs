# SafePal S1

![](/img/banners/kaia-safepal.png)

## はじめに<a id="introduction"></a>

ハードウェアウォレットは、インターネット接続から切り離されたオフライン環境に秘密鍵（取引の署名に必要）を保管することで、インターネット接続に依存するソフトウェアウォレットで発生する数々のハッキングや脅威を回避し、車輪を再発明した。 こうすることで、ユーザーの暗号資産はより安全になり、ソフトウェア・ウォレットがもたらすインターネット上の危険から守られる。

One of such hardware wallets that has integrated with Klaytn is **SafePal S1 Hardware Wallet**. SafePal S1は、暗号通貨ハードウェアウォレットで、安全でシンプルで楽しい暗号通貨管理ソリューションを提供することを目的としています。 SafePal is an hardware wallet to secure and manage cryptocurrencies and NFTs, such as Bitcoin, KLAY, Klaytn Compatible Tokens(KCT), Ether and ERC20 tokens e.t.c.

このガイドでは、次のことを説明する：

- Add, Receive and Send Klay, and any Klaytn Compatible Tokens(KCT)  with SafePal S1 Hardware Wallet

## 前提条件<a id="prerequisites"></a>

- [SafePal ハードウェアウォレットのセットアップ](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752)

## はじめに<a id="getting-started"></a>

ウォレットのセットアップに成功したら、次はウォレットを実際に使ってみましょう。 In this tutorial we will be adding, receiving and sending KLAY native coin, and any Klaytn Compatible Tokens(KCT) using the SafePal S1 Hardware Wallet.

### Adding KLAY native coin <a id="adding-klay-native-coin"></a>

To add the KLAY native coin to your hardware wallet, kindly follow the steps below:

**ステップ 1**：SafePalアプリを開き、Walletタブで楕円形のアイコンをクリックし、下図のようにManage Coinsボタンをクリックします：

![](/img/build/tools/step1-add-klay.png)

**Step 2**: Select the coins you want to add (in our case KLAY), and click **Add Coin** at the bottom

![](/img/build/tools/step2-add-klay.png)

\*\*ステップ3  アプリとS1ハードウェアウォレットの間でスキャンを繰り返し、データがアプリとデバイス間で正しく同期されるようにします。

**ステップ4コインの追加に成功したら、S1デバイスの**資産管理\*\*タブでコインを確認できます。

![](/img/build/tools/step4-add-klay.png)

Kindly note that the steps above are applicable for adding any Klaytn Compatible Tokens.

### Receiving KLAY native coin  <a id="receiving-klay-native-coin"></a>

Once the coins (KLAY, KCTs) are successfully added, you can view them in the **Asset Management** tab on the S1 device. You can receive KLAY native coin using the following approach:

#### SafePal アプリの使用

1. Select KLAY which gives you the option of swap, receive and send, click on receive
2. You can either copy your KLAY address for the wallet, save the QR code, or have the other party scan the QR code from your phone.

#### SafePal S1 ハードウェアウォレットの使用方法

**ステップ 1** SafePal S1 を起動し、「Asset Management（資産管理）」に移動します。

**Step 2** Select KLAY as the coin you would like to receive from others.

**ステップ3** 「受信」ボタンをクリックする。

**ステップ4** S1デバイスのPINコードを入力します。

**ステップ5** 次に、あなたのコインの住所のQRコードを見ることができ、それを他の人に見せると、他の人がスキャンしてあなたにコインを送ることができます。

![](/img/build/tools/sphw-rec-banner.png)

Kindly note that the steps above are applicable for receiving any Klaytn Compatible Tokens.

### Sending KLAY native coin  <a id="sending-klay-native-coin"></a>

To send KLAY native coin from your hardware wallet, kindly follow the steps below:

**Step 1** On the SafePal App, choose the coin you want to send(in our case KLAY)and click **Send**.

![](/img/build/tools/step1-send-klay.png)

**ステップ2** 宛先住所、金額を入力し、「次へ」をクリックして再度詳細を確認する。 このステップで振込先の詳細を確認してください。

![](/img/build/tools/step2-send-klay.png)

**ステップ3** S1デバイスの署名プロセスを開始する。

このステップでは、送金詳細を含むQRコード（下図）がセーフパルアプリに表示されます。 S1ハードウェアウォレットを起動し、**スキャン**タブに入ります。 次に、SafePalアプリでQRコードをスキャンします。 こうすることで、S1デバイスがオフライン環境で転送の詳細を受信することが保証される。

![](/img/build/tools/step3-send-klay.png)

**ステップ4** S1デバイスで転送に署名する

送金明細のスキャンに成功すると、S1デバイスに送金明細（金額、手数料、ガス上限など）が表示されます。 次に詳細を確認し、PINコードを入力する。

![](/img/build/tools/step4-send-klay.png)

**ステップ 5** SafePal アプリに署名を同期します。

S1デバイスで転送の署名に成功すると、S1デバイスに一連のダイナミックQRコードが表示されます。 SafePal アプリで「次へ」をクリックし、携帯電話のカメラを開きます。 SafePal アプリを使って、S1 デバイスに表示されるダイナミック QR コードをスキャンします。

Doing this ensures the App receives the signature contained in the QR codes and is ready to broadcast the transfer to the blockchain (Klaytn).

**ステップ6** アプリで**ブロードキャスト**をクリックし、転送が完了するのを待ちます。

![](/img/build/tools/step6-send-klay.png)

Kindly note that the steps above are applicable for sending any Klaytn Compatible Tokens.

## 参考文献 <a id="further-references"></a>

- [SafePal S1 アップグレード手順](https://www.safepal.com/en/upgrade/s1)
- [SafePal S1 ユーザーマニュアル](https://docs.safepal.io/safepal-hardware-wallet/user-manual)
