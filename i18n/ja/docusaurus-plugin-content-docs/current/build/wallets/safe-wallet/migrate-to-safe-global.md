---
title: Safe Global への移行
sidebar_label: Safe Global への移行
---

# Safe Global への移行

:::caution 日没に関するお知らせ

`safe.kaia.io` は **2026年8月9日** にサービス終了となります。 今後、Kaiaのアカウントを管理する際は、[app.safe.global](https://app.safe.global) の**Safe Wallet**をご利用ください。

:::

## 何が変わったのでしょうか？

Kaiaは以前、Gnosis Safeのホスト型フォークである**Kaia Safe**（`safe.kaia.io`）を提供していました。

**Kaiaメインネット**および**Kairosテストネット**が、[Safe Global](https://app.safe.global)でネイティブにサポートされるようになりました。 Kaia上のセーフの作成および管理は、KaiaがホストするUIではなく、[app.safe.global](https://app.safe.global)の「Safe Wallet」を通じて行ってください。

## これは、私が現在利用しているSafeアカウントに影響しますか？

**いいえ。** お客様のSafeアカウントは、Kaia上のスマートコントラクトです。 Safe Global への移行により変更されるのは **ウェブインターフェース** のみであり、オンチェーン上の Safe には影響しません。

**変更なし**

- 安全な住所
- 所有者と確認の閾値
- 資産（KAIA、トークン、NFT）
- オンチェーンの取引履歴

**更新すべき項目**

- `safe.kaia.io` の代わりに [app.safe.global](https://app.safe.global) を使用してください
- Safe Walletで**Kaiaメインネット**または**Kairosテストネット**を選択してください
- 依然として `safe.kaia.io` を指しているブックマークを更新してください
- 新しいインターフェースでこれらのラベルを表示したい場合は、必要に応じてローカルのUIデータ（アドレス帳、ニックネーム）をエクスポート／インポートしてください。

以下の点が確認されました：Kaia Safe を通じて作成された既存のセーフは、所有者のウォレットを接続し、正しいネットワーク（**Kaia** または **Kairos**）を選択すると、Safe Global に表示されます。 再デプロイや再作成を行う必要は**ありません**。また、資金を新しいセーフに移動する必要もありません。

## Safe Globalで既存のセーフを開く方法

1. [app.safe.global](https://app.safe.global) を開きます。
2. ご自身のセーフの**所有者**であるウォレット（例：Kaia Wallet や MetaMask）を接続してください。
3. **Kaia メインネット** または **Kairos テストネット** を選択してください。
4. 現在お使いの「Safe」が表示されます。 そうでない場合は、**「既存のセーフを追加」**／\*\*「読み込み」\*\*を選択し、セーフのアドレスを貼り付けて、ネットワークを確認してください。

オプション：`safe.kaia.io` がサービス終了する前に、ニックネームや関連するブラウザデータを保持したい場合は、旧UIからローカルデータ（アドレス帳と設定）をエクスポートし、Safe Walletの\*\*「設定」→「データ」\*\*からインポートしてください。 これは任意であり、オンチェーン上の所有権や残高には影響しません。

## 簡単な回答

- **新しい「セーフ」を作成する必要がありますか？** いいえ。
- **資金や所有者に変更はありますか？** いいえ。
- **`safe.kaia.io` は引き続き利用できますか？** **2026年8月9日**までです。 今すぐ [app.safe.global](https://app.safe.global) に切り替えてください。
- **さらにサポートを受けたい場合は？** [Safe Wallet ヘルプセンター](https://help.safe.global) および [よくある質問](./faqs.md) をご覧ください。

## 今後の手順

- [KaiaでSafe Walletを使用する](./use-safe-wallet.md) — Safeを作成し、資産を追加し、取引を送信する
- [Safe Walletの概要](./overview.md) — ネットワークおよびSafe Globalのリソース
- [よくある質問](./faqs.md) — アカウント管理に関するその他の質問
