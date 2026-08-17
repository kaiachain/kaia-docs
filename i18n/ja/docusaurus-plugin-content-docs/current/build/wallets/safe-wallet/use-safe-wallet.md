---
title: KaiaでSafe Walletをご利用ください
sidebar_label: セーフの作成と管理
---

# KaiaでSafe Walletをご利用ください

:::caution 日没に関するお知らせ

`safe.kaia.io` は **2026年8月31日** にサービス終了となります。 今後は、[app.safe.global](https://app.safe.global) の「Safe Wallet for Kaia Network」をご利用いただき、アカウントの管理を行ってください。 現在お持ちの「Safe Accounts」は、「Safe Wallet」と自動的に互換性が確保されます。

:::

## Safeを作る

ここでは、Safe Wallet を使用して Kaia で Safe スマートアカウントを作成する方法をご紹介します。

**手順 1：** ブラウザで [Safe Wallet](https://app.safe.global/welcome) を開きます。 ランディングページには2つのタブがあります。1つは、複数のアカウントを共同で管理するチーム向けの\*\*「ワークスペース」**、もう1つは、連携済みのウォレットでログインしているセーフ向けの**「マイアカウント」**です。 1つの「セーフ」を作成するには、**「マイアカウント」\*\*の画面にとどまってください。

:::tip

複数の「セーフ」とレビュー担当チームを擁する財務管理を行っていますか？ [Workspace](./overview.md#workspace) では、可視性は必要だが署名キーを保持すべきではないメンバー向けに、共有ダッシュボード、共有アドレス帳、およびメールログイン機能が追加されています。 まず「セーフ」を作成し、後でそれらをワークスペースに整理することができます。

:::

![「マイアカウント」タブが選択されたSafe Walletのウェルカムページ。「ウォレットを接続」と「任意のアカウントを監視」が表示されている](/img/build/wallets/sg-welcome-page.png)

**手順 2：** **「ウォレットを接続」**をクリックし、[MetaMask](../../tutorials/connecting-metamask.mdx)を選択します。 このダイアログには、検出されたウォレットのみが表示されます。そのため、お探しのウォレットが表示されない場合は、まず拡張機能をインストールしてください。—[Kaia Wallet](https://docs.kaiawallet.io/)は、拡張機能をインストールするとここに表示されます。 ウォレットおよびSafe Walletで、**Kaiaメインネット**または**Kairosテストネット**が選択されていることを確認してください。

![ウォレット接続ダイアログで、利用可能なウォレットの中からMetaMaskがハイライト表示されている画像](/img/build/wallets/sg-connect-wallet.png)

**ステップ3：** **「アカウントを作成」**をクリックし、セーフに名前を付け、展開するネットワークを選択します。メインネットの場合は**Kaia**、テストネットの場合は**Kairos**を選択してください。 後でネットワークを追加することもできます。 \*\*[次へ]\*\*をクリックしてください。

![「ネットワークの選択」で「Safe」という名前を入力し、「Kairos」を選択して、基本設定の手順を設定する](/img/build/wallets/sg-add-safe-name.png)

**手順 4：** **「署名者と承認」** で、トランザクションの提案および承認が許可されるアドレスを追加します。 接続済みのウォレットは **Signer 1** です。追加するごとに **新しい署名者を追加** をクリックしてください。 名前は、自分用の参照用に保存される任意のラベルです。 署名者は後で変更できます。

**ステップ 5：** **しきい値**を設定します。これは、取引が実行されるまでに確認が必要な署名者の人数です。 1より大きい値が望ましい。 一般的な慣行として、署名者の約51％（例えば、3人のうち2人、あるいは5人のうち3人）が署名することが求められます。 \*\*[次へ]\*\*をクリックしてください。

![署名者と承認のステップ（署名者3名を追加し、3人中2人の承認を要件とする）](/img/build/wallets/sg-add-signers.png)

**手順 6：** ネットワーク、名称、署名者、および閾値を確認します。 セーフの展開はオンチェーン取引であるため、KAIAでの1回限りのアクティベーション手数料がかかります。接続しているウォレットに十分な残高があることを確認してください。 「**アカウントを作成**」をクリックし、ウォレットで取引を確認してください。

![ネットワーク、名称、3名の署名者、3分の2の閾値、およびKAIAでの推定アクティベーション手数料を示す確認画面](/img/build/wallets/sg-review-create-safe.png)

**ステップ7：** 取引が確認されると、セーフが利用可能になります。 ダイアログにはそのアドレスが表示されます。これは、資金を受け取るために共有するアドレスであり、署名用ウォレットのアドレスとは異なります。 \*\*「さあ、始めましょう」\*\*をクリックして、アカウントを開設してください。

![カイロス上で新しい「セーフ」の名前と住所が表示された「アカウントの設定が完了しました」ダイアログ](/img/build/wallets/sg-start-using-wallet.png)

アカウントを開くと、**概要**画面が表示され、サイドバーには**資産**、**取引**、**アドレス帳**、**アプリ**、**設定**が表示されます。 「Safe」は空の状態から始まります。\*\*「アドレスをコピー」\*\*を使用して、別のウォレットから資金を移してください。

![残高がゼロの「Safe」アカウントの概要画面、入金プロンプト、およびサイドバーのナビゲーション](/img/build/wallets/sg-safe-ui.png)

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

1. Safeのアドレスをコピーしてください。
2. NFTを保管しているウォレットを開き、「転送」を選択してください。
3. 「Safe」のアドレスを貼り付け、確認した後、Safe Walletの\*\*「資産」\*\* → \*\*「NFT」\*\*でそのアドレスを確認してください。

メインネットでは、[OKX NFTマーケットプレイス](https://web3.okx.com/nft)など、Kaiaに対応しているマーケットプレイスからも送金を行うことができます。 Kairosでは、上記のウォレット送金機能をご利用ください。

## 資産を送る

### KAIAとトークンを送る

**手順 1：** **「新規取引」** をクリックし、**「トークンの送金」** を選択します。

<video autoPlay loop muted playsInline controls aria-label="Opening New transaction and choosing Send tokens" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-new-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-new-tx.mp4" type="video/mp4" /> </video>

**手順 2：** 受取人のアドレスを入力し、トークンと金額を選択してください。**MAX** を選択すると、残高全額が自動的に入力されます。 1回の取引につき、最大5人の受取人を追加できます。 \*\*[次へ]\*\*をクリックしてください。

<video autoPlay loop muted playsInline controls aria-label="Send tokens form with the recipient address, token selector, and amount fields" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-send-details.webm" type="video/webm" /> <source src="/img/build/wallets/sg-send-details.mp4" type="video/mp4" /> </video>

**ステップ3：** 詳細を確認し、**「署名」**をクリックしてから、ウォレットで承認してください。 署名を行ってもトランザクションは送信されません。トランザクションは、閾値に達するまで**トランザクション**のキューに残り、閾値に達した時点で、どの署名者でもそれを実行できるようになります。

<video autoPlay loop muted playsInline controls aria-label="Reviewing and signing a send transaction, which then waits in the queue for the remaining confirmations" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-review-send-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-review-send-tx.mp4" type="video/mp4" /> </video>

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
