---
title: 契約とのやり取り
sidebar_label: 契約上のやり取り
---

# 契約とのやり取り

:::caution 日没に関するお知らせ

`safe.kaia.io` は **2026年8月31日** にサービス終了となります。 今後は、[app.safe.global](https://app.safe.global) の「Safe Wallet for Kaia Network」をご利用いただき、アカウントの管理を行ってください。 現在お持ちの「Safe Accounts」は、「Safe Wallet」と自動的に互換性が確保されます。

:::

このセクションでは、Safe Walletで管理されているSafeアカウントを使用して、Kairos上のシンプルなコントラクトとやり取りを行います。

**前提条件**

- [Kaia / Kairos](../../tutorials/connecting-metamask.mdx)用に設定された [MetaMask](https://metamask.io/download/)
- [リミックス](https://remix.ethereum.org/) （必要に応じてKaiaネットワークのサポートあり）
- [Faucet](https://faucet.kaia.io)からKAIAを試してみてください
- KairosのSafeアカウント（[作成する](./use-safe-wallet.md#create-a-safe)）

**手順 1：** [Remix](https://remix.ethereum.org/) を開きます。

**ステップ 2：** サンプルストレージ契約（または独自の契約）をコンパイルしてデプロイします。

Safeから契約を操作する前に、その契約をデプロイしてください。 典型的なサンプル契約では、`uint` が公開されており、これを `store` で更新し、`retrieve` で読み取ります。

<video autoPlay loop muted playsInline controls aria-label="Compiling and deploying the storage contract in Remix" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-store-deploy.webm" type="video/webm" /> <source src="/img/build/wallets/sg-store-deploy.mp4" type="video/mp4" /> </video>

**ステップ3：** Safe Walletで新しい取引を開始します。

「**新規取引**」をクリックします。 デプロイ済みのコントラクトアドレスとABIを入力して、メソッドとパラメータを選択できるようにしてください。

<video autoPlay loop muted playsInline controls aria-label="Entering the contract address and ABI, then choosing the method and parameters in Safe Wallet" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-store-init-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-store-init-tx.mp4" type="video/mp4" /> </video>

**ステップ4：** 内容を確認して送信する。 所有者のウォレットで署名してください。確認の閾値に達すると、取引が実行されます。

<video autoPlay loop muted playsInline controls aria-label="Reviewing and signing the contract interaction, which executes once the threshold is reached" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-store-review-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-store-review-tx.mp4" type="video/mp4" /> </video>

また、[トランザクションビルダー](./tx-builder.md) を使用して契約呼び出しを一括処理したり、[APIキット](./safe-wallet-api-kit.md) を使ってプログラムから契約を提案したりすることもできます。
