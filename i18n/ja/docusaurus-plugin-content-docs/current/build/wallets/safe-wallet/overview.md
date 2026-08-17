---
title: Safe Walletの概要
sidebar_label: Safe Walletの概要
---

# Safe Walletの概要

:::caution 日没に関するお知らせ

`safe.kaia.io` は **2026年8月31日** にサービス終了となります。 今後、Kaiaのアカウントを管理する際は、[app.safe.global](https://app.safe.global) の**Safe Wallet**をご利用ください。 すでに「Safe」をお持ちの場合は、[「Safe Global」への移行](./migrate-to-safe-global.md) をご覧ください。

:::

[Safe Wallet](https://app.safe.global) は、Safe Global が提供する [Safe Smart Accounts](https://docs.safe.global/home/what-is-safe) の公式インターフェースです。 「セーフ・スマート・アカウント」はスマートコントラクト・ウォレットの一種です。1つの秘密鍵で資金を管理するのではなく、所定の承認閾値に基づき、複数の署名者が各取引を承認する必要があります。 KaiaメインネットとKairosテストネットの両方が利用可能です。所有者ウォレットを接続し、ネットワークを選択してから、セーフを作成または開いてください。

## 主要な概念

| コンセプト                                                                | その意味                                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **署名者（所有者）**                                                         | 取引の提案および確認を行うことが許可されているアドレス。 **設定**から、いつでも追加、削除、または置き換えを行うことができます。                    |
| **閾値**                                                               | トランザクションが実行されるまでに必要な署名者の承認数（例：3人中2人）。 1より上に保ってください。                                   |
| **[モジュール](https://docs.safe.global/advanced/smart-account-modules)** | アカウントの機能（復旧、支出枠、自動化など）を拡張するオプション契約。 モジュールは署名者の承認なしに資金を移動できるため、信頼できるモジュールのみを有効にしてください。 |
| **[ガード](https://docs.safe.global/advanced/smart-account-guards)**    | 実行前と実行後のすべてのトランザクションをチェックし、カスタムルールを適用できるようにするオプションの契約です。                              |
| **安全なアプリ**                                                           | 以下のガイドで使用されている「Transaction Builder」や「CSV Airdrop」など、インターフェースに組み込まれたサードパーティ製アプリ。       |

このアカウントがオンチェーン上でどのように機能するかについて詳しく知りたい場合は、[「Safeスマートアカウントはどのように機能するのか？」](https://docs.safe.global/advanced/smart-account-overview)をご覧ください。

## ワークスペース

[Workspace](https://safe.global/blog/introducing-workspace-the-onchain-operating-environment-for-treasury-teams) は、複数の Safe を運用するチーム向けの Safe Global の環境です。 これは、既存のスマートアカウントの上に構築されたものであり、取引の実行方法や鍵の保有者ではなく、チームの連携方法を変えるものです。

- **統合ダッシュボード** — プラットフォーム内のすべての口座の残高と未処理の取引を、1つの画面で確認できます。
- **[セキュリティハブ](https://safe.global/blog/workspace-security-hub)** — 各アカウントごとの署名者、閾値、モジュール、ガード、復旧オプション、および「Safe」バージョンに加え、オンチェーン設定に対する自動チェック機能。
- **共有アドレス帳** — ブラウザごとにローカルリストを作成するのではなく、チーム全体で共有する、ラベル付きのアドレス一覧。
- **メールログイン** — チームメンバーは、メールで送信されるワンタイムパスコードまたはGoogleアカウントを使ってログインし、鍵を持ち歩くことなく、残高の確認、保留中の取引の追跡、連絡先の管理を行うことができます。 署名を行うには、依然としてオーナーウォレットが必要です。

この最後の点は、Kaia上で財務、コンプライアンス、および運用担当のレビュー担当者が、財務セーフの内容を把握する必要があるものの、決してその署名者になってはならない場合に役立ちます。

## Safe Globalのドキュメント

Safe Wallet、Safe Smart Account スマートコントラクト、Safe Core SDK、およびバックエンドサービスはすべて Safe Global によって構築・保守されており、そのドキュメントは [docs.safe.global](https://docs.safe.global) に掲載されています。

Kaiaのドキュメントでは、Kaia特有の事項、すなわちサポートされているネットワーク、チェーンID、および一般的なタスクの手順について解説しています。 Safe自体の仕組み（契約のバージョン、モジュールやガードの動作、APIスキーマ、SDKリファレンスなど）については、Safeチームが常に最新の状態に更新しているSafe Globalのドキュメントを参照してください。

### どこを見ればよいか

| … をご覧になりたい場合は、                           | [移動]                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 「セーフ・スマート・アカウント」とは何かを理解する                | [「安全」とは何か？](https://docs.safe.global/home/what-is-safe)                                                                                    |
| アカウントのアーキテクチャ、モジュール、およびガードについて学ぶ         | [「セーフ・スマート・アカウント」はどのように機能するのでしょうか？](https://docs.safe.global/advanced/smart-account-overview)                                              |
| 契約の関数、イベント、およびバージョンを調べる                  | [Smart Account リファレンス](https://docs.safe.global/reference-smart-account/overview)                                                          |
| Safe SDK を使用した開発（スターター、プロトコル、API、リレーキット） | [SDKの概要](https://docs.safe.global/sdk/overview)                                                                                            |
| HTTP 経由でのクエリセーフ、トランザクション、および署名           | [安全なインフラ](https://docs.safe.global/core-api/api-overview) · [トランザクションサービス](https://docs.safe.global/core-api/transaction-service-overview) |
| Safeサービスがどのチェーンに対応しているかを確認する             | [対応ネットワーク](https://docs.safe.global/advanced/smart-account-supported-networks)                                                             |
| 「Safe Wallet」アプリ自体のサポートを受ける              | [Safe ヘルプセンター](https://help.safe.global)                                                                                                   |
| 「セーフ」に関する用語の明確化                          | [用語集](https://docs.safe.global/home/glossary)                                                                                              |

このサイトのページの内容が、Safe Globalのドキュメントと比べて古くなっている場合は、Safe Globalの情報を参照し、[イシューを登録](https://github.com/kaiachain/kaia-docs/issues)してください。そうすれば、Kaiaのページを更新することができます。

## カイア・ネットワークス

| ネットワーク      | チェーンID |
| ----------- | ------ |
| Kaia メインネット | 8217   |
| カイロス・テストネット | 1001   |

アカウントを作成または開く前に、Safe Walletのチェーンスイッチャーからネットワークを選択してください。メインネットが選択されている間は、KairosにデプロイされたSafeは表示されません。 [APIキット](./safe-wallet-api-kit.md)やその他のSafe SDKツールを使用する際は、対応するチェーンIDを指定し、エンドポイントをハードコーディングするのではなく、[Safe Globalの対応ネットワーク一覧](https://docs.safe.global/advanced/smart-account-supported-networks)からトランザクションサービスのエンドポイントを取得してください。

## カイア専用のガイド

- [Safe Global への移行](./migrate-to-safe-global.md) — 既存の Safe を Safe Wallet に移行する
- [セーフの作成と管理](./use-safe-wallet.md) — Kaia上でセーフを作成し、資産を追加し、取引を送信する
- [コントラクトとの連携](./contract-interaction.md) — Kaia上のSafeからコントラクトを呼び出す
- [トランザクションビルダー](./tx-builder.md) と [CSVエアドロップ](./csv-airdrop.md) — Kaiaでのバッチ処理
- [APIキット](./safe-wallet-api-kit.md) — KaiaチェーンIDを利用した安全な取引サービス
- [よくある質問](./faqs.md)
