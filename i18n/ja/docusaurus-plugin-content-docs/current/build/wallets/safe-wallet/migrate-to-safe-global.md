---
title: Safe Global への移行
sidebar_label: Safe Global への移行
---

# Safe Global への移行

Kaiaは以前、Gnosis Safeのホスト型フォークである**Kaia Safe**（`safe.kaia.io`）を運営していました。そのインターフェースは**2026年8月31日**に廃止され、現在は利用できなくなっています。

KaiaメインネットおよびKairosテストネットは、[Safe Global](https://app.safe.global)でネイティブにサポートされています。 [app.safe.global](https://app.safe.global) の「Safe Wallet」を利用して、Kaia上でセーフを作成・管理できます。

## 現在お持ちのSafeアカウントには影響はありません

「Your Safe」は、Kaia上のスマートコントラクトです。 Kaiaがホストするインターフェースの廃止により変更されたのは、**ウェブフロントエンド**のみであり、オンチェーンのアカウントには影響がありません。

変更なし：

- 安全な住所
- 所有者と確認の閾値
- 資産（KAIA、トークン、NFT）
- オンチェーンの取引履歴

再デプロイや再作成を行う必要は**ありません**。また、資金を新しいセーフに移動する必要もありません。 Kaia Safe を通じて作成されたセーフは、所有者のウォレットを接続するとすぐに Safe Global に表示されます。

## Safe Global で既存のセーフを開く

1. [app.safe.global](https://app.safe.global) を開きます。
2. ご自身のセーフの**所有者**であるウォレット（例：Kaia Wallet や MetaMask）を接続してください。
3. 「セーフ」が表示され、そのネットワーク名（**Kaia** または **Kairos**）が表示されているはずです。表示されない場合は、[app.safe.global/welcome/accounts](https://app.safe.global/welcome/accounts) にアクセスし、**リストの管理**をクリックして、接続済みのウォレットに関連付けられているセーフを確認してください。

## アドレス帳のラベル

アドレス帳（アドレスとして保存した名前やラベル）は、オンチェーン上ではなく`safe.kaia.io`インターフェースにローカルで保存されていたため、唯一自動的に引き継がれなかったものでした。そのインターフェースは廃止されたため、保存済みのラベルはエクスポートできなくなり、Safe Wallet&#x306E;****アドレス帳****&#x3067;再度入力する必要があります。

これはラベルにのみ影響します。所有権、残高、取引履歴はすべてオンチェーンに記録されており、影響を受けません。

## 今後の手順

- [KaiaでSafe Walletを使用する](./use-safe-wallet.md) — Safeを作成し、資産を追加し、取引を送信する
- [Safe Walletの概要](./overview.md) — ネットワークおよびSafe Globalのリソース
- [よくある質問](./faqs.md) — アカウント管理に関するその他の質問
- [Safe Wallet ヘルプセンター](https://help.safe.global) — Safe Wallet アプリ自体に関するヘルプ
