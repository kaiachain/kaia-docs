# SafePal S1

![](/img/banners/kaia-safepal.png)

## はじめに<a id="introduction"></a>

ハードウェアウォレットは、インターネット接続から切り離されたオフライン環境に秘密鍵（取引の署名に必要）を保管することで、インターネット接続に依存するソフトウェアウォレットで発生する数々のハッキングや脅威を回避し、車輪を再発明した。 こうすることで、ユーザーの暗号資産はより安全になり、ソフトウェア・ウォレットがもたらすインターネット上の危険から守られる。 ハードウェアウォレットは、インターネット接続から切り離されたオフライン環境に秘密鍵（取引の署名に必要）を保管することで、インターネット接続に依存するソフトウェアウォレットで発生する数々のハッキングや脅威を回避し、車輪を再発明した。

カイアと統合されたハードウェア・ウォレットのひとつが**SafePal S1 Hardware Wallet**である。 SafePal S1は、暗号通貨ハードウェアウォレットで、安全でシンプルで楽しい暗号通貨管理ソリューションを提供することを目的としています。 SafePalは、Bitcoin、KAIA、Kaia Compatible Tokens (KCT)、ETH、ERC20トークンなどの暗号通貨やNFTを安全に管理するハードウェアウォレットです。

このガイドでは、次のことを説明する：

- SafePal S1ハードウェアウォレットでKAIAおよびKAIA互換トークン(KCT)を追加、受信、送信できます。

## 前提条件<a id="prerequisites"></a>

- [SafePal ハードウェアウォレットのセットアップ](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752)

## はじめに<a id="getting-started"></a>

ウォレットのセットアップに成功したら、次はウォレットを実際に使ってみましょう。 このチュートリアルでは、SafePal S1ハードウェアウォレットを使用して、KAIAネイティブコインとKaia互換トークン（KCT）の追加、受信、送信を行います。

### 暗号トークンの追加<a id="adding-crypto-tokens"></a>

暗号トークンをハードウェアウォレットに追加するには、以下の手順に従ってください：

**ステップ 1**：SafePalアプリを開き、Walletタブで楕円形のアイコンをクリックし、下図のようにManage Coinsボタンをクリックします：

![](/img/build/tools/safepal/sp-hw-manage-coins.png)

\*\*ステップ2追加したいコインを探し、オンに切り替えます。

**ネイティブ・トークン - KAIA**

- 検索バーに「KAIA」と入力し、オンに切り替える。

![](/img/build/tools/safepal/sp-app-search-kaia.jpg)

**Fungibleトークン - USDT**

- 検索バーに「USDT Kaia」と入力し、オンに切り替える。

![](/img/build/tools/safepal/sp-app-search-usdt.jpg)

**ステップ3一番下の**Add Coin\*\*をクリックします。

![](/img/build/tools/safepal/sp-hw-add-coins.png)

**ステップ 4**：SafePalアプリとS1ハードウェアウォレットの間でスキャンを繰り返し、デバイスのPINコードを入力し、アプリとデバイス間でデータが正しく同期されるようにします。

**ステップ4**: コインの追加に成功したら、S1デバイスの**資産管理**タブでコインを確認できます。

![](/img/build/tools/safepal/sp-hw-asset-display.png)

:::note
上記の手順は、カイア互換トークンを追加する場合にも適用されます。
:::

### 暗号トークンを受け取る<a id="receiving-crypto-tokens"></a>

コイン（KAIA、KCT）が正常に追加されると、S1デバイスの**資産管理**タブで確認できます。 以下の方法で暗号トークンを受け取ることができる：

#### SafePal アプリの使用

1. スワップ、受信、送信のオプションを提供するKAIAまたはUSDTのような他のカンジタブルトークンを選択します。 受信をタップする。
2. KAIAまたはUSDTのウォレットアドレスをコピーするか、QRコードを保存するか、または相手にあなたのデバイスから直接QRコードをスキャンしてもらいます。

#### SafePal S1 ハードウェアウォレットの使用方法

1. SafePal S1 を起動し、「資産管理」に移動します。
2. 受け取りたいコインとして、KAIAまたはUSDTなどの他のカンジタブルトークンを選択します。
3. 受信」ボタンをクリックする。
4. S1デバイスのPINコードを入力します。
5. そして、自分のコインの住所のQRコードを見ることができ、それを他の人に見せると、そのコインをスキャンして送ってもらうことができる。

![](/img/build/tools/safepal/sp-hw-receive-tokens.png)

:::note
上記の手順は、カイアと互換性のあるトークンを受け取る場合にも適用されます。
:::

### 暗号トークンの送信 <a id="sending-crypto-tokens"></a>

ハードウェアウォレットから暗号トークンを送信するには、以下の手順に従ってください：

**ステップ 1**：SafePal Appで、送りたいコインを選び、**Send**をクリックします。

**ネイティブ・トークン - KAIA**

![](/img/build/tools/safepal/sp-hw-sp-app-send.png)

**Fungibleトークン - USDT**

![](/img/build/tools/safepal/sp-hw-sp-app-usdt-send.png)

\*\*ステップ2宛先住所、金額を入力し、「次へ」をクリックして再度詳細をご確認ください。 このステップで振込先の詳細を確認してください。

![](/img/build/tools/safepal/sp-hw-sp-app-send-details.png)

**ステップ 3**：S1デバイスの署名プロセスを開始する。

このステップでは、送金詳細を含むQRコード（下図）がセーフパルアプリに表示されます。 S1ハードウェアウォレットを起動し、**スキャン**タブに入ります。 次に、SafePal アプリで QR コードをスキャンし、SafePal デバイスから PIN コードを入力します。

こうすることで、S1デバイスがオフライン環境で転送の詳細を受信することが保証される。

![](/img/build/tools/safepal/sp-hw-sign-tx.png)

**ステップ 4**：署名を SafePal アプリに同期します。

S1デバイスで転送の署名に成功すると、S1デバイスに一連のダイナミックQRコードが表示されます。 SafePal アプリで「次へ」をクリックし、携帯電話のカメラを開きます。 SafePal アプリを使って、S1 デバイスに表示されるダイナミック QR コードをスキャンします。 SafePal アプリで「次へ」をクリックし、携帯電話のカメラを開きます。 このステップでは、送金詳細を含むQRコード（下図）がセーフパルアプリに表示されます。 S1ハードウェアウォレットを起動し、**スキャン**タブに入ります。 次に、SafePalアプリでQRコードをスキャンします。 こうすることで、S1デバイスがオフライン環境で転送の詳細を受信することが保証される。

こうすることで、アプリはQRコードに含まれる署名を確実に受け取り、ブロックチェーン（Kaia）への転送をブロードキャストする準備が整う。

**ステップ5アプリの**ブロードキャスト\*\*をクリックし、転送が完了するのを待ちます。

![](/img/build/tools/safepal/sp-hw-broadcast-tx.png)

:::note
上記の手順は、カイア互換トークンを送信する場合にも適用されます。
:::

## 参考文献 <a id="further-references"></a>

- [SafePal S1 アップグレード手順](https://www.safepal.com/en/upgrade/s1)
- [SafePal S1 ユーザーマニュアル](https://docs.safepal.io/safepal-hardware-wallet/user-manual)