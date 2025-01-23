# カイアセーフを利用する

## 金庫を作る

ここでは、カイア・ネットワークにおけるセーフの作成方法とその利点について説明します。

\*\*ステップ 1: \*\* [Kaia Safe App](https://safe.kaia.io/) に移動します。 ウェブブラウザでアプリケーションに移動すると、Kaia Safeの機能を調べることができます。 ウェブブラウザでアプリケーションに移動すると、Kaia Safeの機能を調べることができます。

**ステップ2:** [ウォレット](https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/)を接続します。 **ステップ2:** [ウォレット](https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/)を接続します。 現在、Kaia Safeは、[Kaia Wallet](https://docs.kaiawallet.io/)、[MetaMask](../../../tutorials/connecting-metamask.mdx)ウォレットなど、様々なウォレットに対応しています。

このガイドでは、MetaMaskを使用する。 このガイドでは、MetaMaskを使用する。 MetaMaskウォレットにKaiaネットワーク([Mainnet](../../../tutorials/connecting-metamask.mdx#connect-to-kaia-network)または[Kairos Testnet](../../../tutorials/connecting-metamask.mdx#connect-to-kaia-network)が追加されていることを確認してください。

![](/img/build/tools/kaia-safe/kaia-safe-connect-wallet.png)

**ステップ 3:** ウォレットが接続されたら、**Create Account**をクリックし、新しいセーフに\*\*「名前」\*\*を付けます。 この名前はあなたのセーフ・アカウントにリンクされています。セーフ・アカウントはマルチシグネチャーのウォレットで、あなたのすべての資金を保管・保存します。

**ステップ4:** 取引を提出し承認する権限を持つアドレスを入力し、所有者/署名者を追加します。 署名者は何人でも追加でき、いつでも削除や入れ替えが可能です。 署名者は何人でも追加でき、いつでも削除や入れ替えが可能です。

**ステップ 5：** Safe 口座の取引が承認されるために必要な署名者の確認回数を選択します。 このアプリのデフォルトでは、署名者の確認は1人であることに注意してください。 しかし、安全な口座を確保するためには、1より高いしきい値を使用することをお勧めします。 例えば、3人中2人、5人中3人などである：

![](/img/build/tools/kaia-safe/kaia-safe-create-acct.gif)

**ステップ6:** レビューとセーフの展開

Safe のすべてのパラメータに完全に満足したら、Safe アカウントの作成を送信し、画面上の指示に従ってアカウント作成を完了します。

![](/img/build/tools/kaia-safe/kaia-safe-create-review.gif)

カイアセーフのアカウント作成完了おめでとうございます！

## 資産の追加

このセクションでは、セーフアカウントに資産（KAIA、FT、NFT）を追加し、資金を安全に保管する方法をご紹介します。

### KAIA預金

以下は、**KAIA**をあなたのセーフアカウントに追加する手順です。

**ステップ 1：** アカウントのダッシュボードからセーフアドレスをコピーします。

![](/img/build/tools/kaia-safe/ks-deposit-copy-addr.png)

\*\*ステップ 2: \*\* Metamask ウォレットを開き、**send** をクリックして資産を安全なアカウントに送信します。

Safe 口座に資産を送金するには、さまざまな方法があります。 Safe 口座に資産を送金するには、さまざまな方法があります。 あなたの[ハードウェアウォレット](https://www.ledger.com/academy/crypto-hardware-wallet)、[ウェブウォレット](https://medium.com/arcana-network-blog/why-web-wallets-e77c776e4d5e)、またはスマートコントラクトからも送信できます。 今回は、MetaMaskと呼ばれるウェブウォレットを利用する。 今回は、MetaMaskと呼ばれるウェブウォレットを利用する。

![](/img/build/tools/kaia-safe/ks-token-send-btn.png)

\*\*ステップ3：\*\*以下のように、検索フィールドに安全なアドレスを貼り付けます。

\*\*ステップ4：\*\*金額を入力し、**次へ**をクリックします。

![](/img/build/tools/kaia-safe/ks-token-send-details.png)

\*\*ステップ5： \*\*取引を確認し、資産ダッシュボードを確認します。 メタマスク口座からカイアセーフ口座への送金額が確認できます。

![](/img/build/tools/kaia-safe/kaia-safe-klay-bal.png)

### KIP-7 預託金

それでは、以下の手順でKIP7（カンジブルトークン）を金庫に入金する方法を見ていきましょう。

**ステップ 1：** アカウントのダッシュボードからセーフアドレスをコピーします。

![](/img/build/tools/kaia-safe/ks-deposit-ft-copy.png)

\*\*ステップ 2: \*\* Metamask Wallet を開き、**assets** タブに移動します。

\*\*ステップ3:\*\*送信したいトークンを選択し、**送信**をクリックします。

![](/img/build/tools/kaia-safe/ks-ft-send-btn.png)

**ステップ4： **上記の**KAIA**デポジットのステップ**3**, **4**, **5**を繰り返します。

![](/img/build/tools/kaia-safe/ks-ft-send-details.png)

\*\*ステップ5：\*\*資産ダッシュボードを見ると、KIP7トークンが安全な口座に送金されているのがわかります。 同様に、Fungibleトークンを安全な口座に送金することもできます。

![](/img/build/tools/kaia-safe/ks-ft-balance.png)

### KIP-17 (NFTs) 預金

それでは、KIP17 (Non Fungible tokens)を私たちの金庫に入金する方法を以下の手順で見ていきましょう。

NFTはさまざまな方法で金庫口座に振り込むことができます。 NFTはさまざまな方法で金庫口座に振り込むことができます。 以下は、[OpenSea](https://opensea.io/about) を使用して NFT を安全口座に送金する方法の例です。

1. OpenSeaアカウント](https://testnets.opensea.io/account)のプロフィールページに移動します。
2. 移籍したいNFTへナビゲート。 移籍したいNFTへナビゲート。 必ずカイアネットワーク（メインネットまたはカイロス）上のNFTを選択してください。
3. 次のページで、転送ボタンをクリックする。
4. テキストボックスに金庫の住所を貼り付け、金庫に転送する。
5. Kaia SafeのAssetsセクションにOpenSeaのNFTがあります。

![](/img/build/tools/kaia-safe/kaia-safe-trf-nft.gif)

NFTの移管の詳細については、OpenSeaのこちらの[ガイド](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea)をご参照ください。

## 資産を送る

このセクションでは、Kaia SafeアカウントからKAIAおよびKIP-7トークンを送信する方法について説明します。

### KAIAおよびKIP7トークンの送信<a id="Send KAIA from Safe"></a>

**ステップ1： **サイドメニューの**New Transaction**ボタンをクリックし、**Send tokens**を選択して、新しいアセットトランスファーを開始します。

![](/img/build/tools/kaia-safe/kaia-safe-init-send-token.gif)

\*\*ステップ 2: \*\* 譲渡する資産を選択します。

- **KAIA**

> 注：KAIAを送金するために、**受取人のアドレス**と**KAIAの金額**を追加してください。

![](/img/build/tools/kaia-safe/kaia-safe-send-token-details.gif)

- **KIP-7トークン**

上の画像のように、アセットのドロップダウンで送信したいトークンを選択します。

> 注：KIP7トークンを転送するために、受信者のアドレスとトークン数を追加します。

**ステップ3：** 取引を確認し、提出する。 取引は署名者ウォレットで署名する必要があり、確認のしきい値に達すると実行されます。 取引は署名者ウォレットで署名する必要があり、確認のしきい値に達すると実行されます。

![](/img/build/tools/kaia-safe/kaia-safe-review-send-tokens.gif)

### NFTを送る<a id="Send NFTs from Safe"></a>

このセクションでは、カイアセーフアカウントから非有金トークンを送信する方法について説明します。

**ステップ1： **サイドメニューの**New Transaction**ボタンをクリックし、**Send NFTs**を選択して新しい資産譲渡を開始します。

![](/img/build/tools/kaia-safe/kaia-safe-init-send-nft.gif)

\*\*ステップ 2: \*\* 譲渡する資産を選択します。

![](/img/build/tools/kaia-safe/kaia-safe-send-nft-details.gif)

**ステップ3：** 取引を確認し、提出する。 取引は署名者ウォレットで署名する必要があり、確認のしきい値に達すると実行されます。 取引は署名者ウォレットで署名する必要があり、確認のしきい値に達すると実行されます。

![](/img/build/tools/kaia-safe/kaia-safe-review-send-nft.gif)

## その他の注意事項<a id="Points to Note"></a>

カイアセーフをご利用になる際にご留意いただきたいことを以下にまとめました：

### 取引手数料<a id="Transaction Fees"></a>

カイアセーフの取引は、資産の移転であれ契約のやり取りであれ、手数料が発生し、その手数料は取引を実行した署名者（通常、必要な署名数のしきい値に達した最後の署名者）が支払う。

### セーフ・ノンス<a id="Safe Nonce"></a>

セキュリティ上の理由から、Safeでの取引は順番に実行される必要があります。 セキュリティ上の理由から、Safeでの取引は順番に実行される必要があります。 これを実現するために、トランザクションには**nonce**と呼ばれる番号が割り当てられ、各トランザクションが一度しか実行できないようになっている。

![](/img/build/tools/kaia-safe/ks-nounce.png)

任意の時点において、最後に実行されたトランザクション+1_ を持つトランザクションのみが実行可能である。 より高いnonceを持つトランザクションは実行のためにキューに入れられる。 そのため、トランザクションが完了するたびに、キュー内の次のトランザクションは、それが十分な署名を蓄積していれば、実行可能な状態になる。 より高いnonceを持つトランザクションは実行のためにキューに入れられる。 そのため、トランザクションが完了するたびに、キュー内の次のトランザクションは、それが十分な署名を蓄積していれば、実行可能な状態になる。

![](/img/build/tools/kaia-safe/ks-pending-tx.png)

### チェーン別アドレス<a id="Chain-specific addresses"></a>

チェーン接頭辞付きのアドレスをコピーすることもできます。

- チェーン接頭辞付きのアドレスをコピーする：

![](/img/build/tools/kaia-safe/ks-chain-spec-addr.png)

ダッシュボードからセーフアドレスをコピーしてウォレットに貼り付ける場合、チェックボックスをクリックしてチェーン名を追加するかどうかを選択できます。 以下のエラーを避けるため、チェックを外しておくことをお勧めします。 以下のエラーを避けるため、チェックを外しておくことをお勧めします。

![](/img/build/tools/kaia-safe/ks-chain-addr-err.png)
