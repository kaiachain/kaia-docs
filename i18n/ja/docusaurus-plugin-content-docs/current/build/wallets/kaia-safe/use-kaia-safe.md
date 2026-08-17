---
title: KaiaでSafe Walletをご利用ください
sidebar_label: セーフの作成と管理
---

# KaiaでSafe Walletをご利用ください

:::caution 日没に関するお知らせ

`safe.kaia.io` は **2026年8月9日** にサービス終了となります。 今後は、[app.safe.global](https://app.safe.global) の「Safe Wallet for Kaia Network」をご利用いただき、アカウントの管理を行ってください。 現在お持ちの「Safe Accounts」は、「Safe Wallet」と自動的に互換性が確保されます。

:::

## Safeを作る

ここでは、Safe Wallet を使用して Kaia で Safe スマートアカウントを作成する方法をご紹介します。

**手順 1：** ブラウザで [Safe Wallet](https://app.safe.global/welcome) を開きます。

![](/img/build/wallets/ks-welcome-page-sw.png)

**ステップ2：** ウォレットを接続します。 Safe Wallet は、[Kaia Wallet](https://docs.kaiawallet.io/) や [MetaMask](../../tutorials/connecting-metamask.mdx) などのウォレットに対応しています。 ウォレットおよびSafe Walletで、**Kaiaメインネット**または**Kairosテストネット**が選択されていることを確認してください。

![](/img/build/wallets/ks-connect-wallet-sw.png)

**手順 3：** **「アカウントを作成」**（または同等のリンク）をクリックし、Safe に名前を付けます。

![](/img/build/wallets/ks-add-safe-name.png)

**手順 4：** 取引の送信および承認ができるアドレスの入力により、所有者／署名者を追加します。 所有者は必要なだけ追加でき、後で変更することも可能です。

**ステップ 5：** 取引に必要な所有者の承認数を指定します。 しきい値は1より大きい値にすることを推奨します。 一般的な慣行として、所有者の約51％（例えば、3人のうち2人、あるいは5人のうち3人）が挙げられます。

![](/img/build/wallets/ks-add-signers-sw.png)

**手順 6：** パラメータを確認し、Safe をデプロイして、画面上の指示に従ってください。

![](/img/build/wallets/ks-review-create-safe-sw.png)

**手順 7：** デプロイが完了したら、Safe の利用を開始し、アカウント UI を開いてください。

![](/img/build/wallets/ks-start-using-wallet-sw.png)

![](/img/build/wallets/ks-safe-ui-sw.png)

Safeアカウントの準備が整いました。

## Kaia Safeのアカウント作成完了おめでとうございます！

アカウントのダッシュボードに表示されているセーフのアドレスに、KAIA、代替可能トークン、またはNFTを送金することで、セーフに資金を投入することができます。

### カイア鉱床

1. アカウントのダッシュボードから、Safeのアドレスをコピーしてください。
2. ウォレット（MetaMask、ハードウェアウォレット、または資金が入金済みのその他のアカウントなど）から、そのアドレス宛にKAIAを送金してください。
3. 送金が確認されると、残高はSafe Walletの\*\*「資産」\*\*欄に表示されます。

Kaiaアカウントへの送金が可能であれば、どのアドレスからでも「Safe」に資金を入金できます。 MetaMaskでのネットワーク設定については、[MetaMaskをKaiaに接続する](../../tutorials/connecting-metamask.mdx)をご覧ください。

### 代替可能トークンの預入

1. Safeのアドレスをコピーしてください。
2. ウォレットのトークン一覧から、そのトークンを選択し、Safeアドレスに送信してください。
3. Safe Walletの\*\*「資産」\*\*で送金を確認し、残高を確認してください。

### NFTの預入

Kaia（メインネットまたはKairos）に対応しているマーケットプレイスやウォレットから、NFTを「Safe」アドレスに転送してください。 たとえば、[OpenSea](https://opensea.io/)でNFTを開き、「転送」を選択して、Safeのアドレスを貼り付けてください。 確認が完了すると、そのNFTはSafe Walletの\*\*「資産」\*\*／「NFT」の下に表示されます。 製品ごとの具体的な手順については、OpenSeaの[転送ガイド](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea)をご覧ください。

## 資産を送る

### KAIAとトークンを送る

**手順 1：** **「新規取引」** をクリックし、**「トークンの送金」** を選択します。

![](/img/build/wallets/ks-new-tx-sw.gif)

**手順 2：** 資産を選択し、受取人のアドレスと金額を入力します。

![](/img/build/wallets/ks-send-details-sw.gif)

**ステップ3：** 内容を確認して送信する。 オーナーウォレットで署名してください。確認閾値に達すると、取引が実行されます。

![](/img/build/wallets/ks-review-send-tx-sw.gif)

### NFTを送信する

1. **「新規取引」**をクリックし、**「NFTを送信」**（またはSafe Walletにおける同等のNFT転送フロー）を選択してください。
2. NFTと受取人を選択してください。
3. 内容を確認し、必要な署名を集め、署名・捺印を行う。

時間の経過とともに変更されるUIの詳細については、[Safe Wallet ヘルプセンター](https://help.safe.global)をご覧ください。

## 補足

### 取引手数料

安全な取引（資産の移転や契約のやり取り）には、その取引を**実行**する所有者（通常は閾値に達した最後の署名者）が支払うネットワーク手数料が発生します。

### 安全なノンス

セキュリティ上の理由から、セーフトランザクションは順序通りに実行する必要があります。 各トランザクションには**nonce**が割り当てられています。 nonce が _最後に実行された値 + 1_ であるトランザクションのみが実行可能です。それより大きい nonce のトランザクションは、それより前のトランザクションが完了し、十分な署名が集まるまでキューに残ります。

### チェーン固有のアドレスプレフィックス

ダッシュボードから「セーフアドレス」をコピーする際、転送先のウォレットがチェーン名のプレフィックスを受け付けない場合は、プレフィックスを含めないようにしてください。転送エラーを防ぐため、プレフィックスなしのアドレスを貼り付けてください。

## その他のヘルプ

- [Safe Wallet ヘルプセンター](https://help.safe.global)
- [Safeのドキュメント](https://docs.safe.global)
