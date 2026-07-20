---
title: Safe Walletの概要
sidebar_label: Safe Walletの概要
---

# Safe Walletの概要

:::caution 日没に関するお知らせ

`safe.kaia.io` は **2026年8月9日** にサービス終了となります。 今後、Kaiaのアカウントを管理する際は、[app.safe.global](https://app.safe.global) の**Safe Wallet**をご利用ください。 現在お持ちのSafeアカウントは、Safe Walletと自動的に互換性が確保されます。

:::

Safe Walletは、Kaia上の[Safeスマートアカウント](https://docs.safe.global/home/what-is-safe)向けの[Safe](https://safe.global)（Safe Global）のウェブインターフェースです。 [app.safe.global](https://app.safe.global) を通じて、所有者、しきい値、資産、および取引を管理します。UIでネットワークを選択すると、KaiaメインネットとKairosが利用可能です。

## 製品およびドキュメント

アーキテクチャ、スマートアカウントの動作、およびバックエンドサービス（トランザクションサービス、クライアントゲートウェイ、および関連API）については、Safe Globalの公式リソースを参照してください：

- [「安全」とは何か？](https://docs.safe.global/home/what-is-safe)
- [Safe Wallet ヘルプセンター](https://help.safe.global)
- [Safeのドキュメント](https://docs.safe.global)
- [安全な取引サービスの概要](https://docs.safe.global/core-api/transaction-service-overview)

## カイア・ネットワークス

| ネットワーク      | チェーンID |
| ----------- | ------ |
| Kaia メインネット | 8217   |
| カイロス・テストネット | 1001   |

[API Kit](./kaia-safe-api-kit.md) やその他の Safe SDK ツールを使用する際は、正しい Kaia チェーン ID を指定してください。 `safe.kaia.io` の提供終了に伴い、サービスエンドポイントが変更される可能性があります。サポートされているチェーンや設定については、Safe Global Transaction Service のドキュメントをご参照ください。

## 歴史的注記

Kaiaは以前、KaiaがホストするSafeスタック（UIおよびインフラストラクチャ）を運用していました。 そのスタックは、[app.safe.global](https://app.safe.global)の「Safe Wallet」への移行に伴い、廃止される予定です。 [kaia-safe-infrastructure](https://github.com/kaiachain/kaia-safe-infrastructure) などの旧リポジトリの参照情報は、以前のデプロイモデルを説明するものであり、新しい統合における主要な手順ではありません。
