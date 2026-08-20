---
title: The Graphからの移行
sidebar_label: The Graphからの移行
---

# The Graphからの移行

:::caution 日没に関するお知らせ

**The Graph** における Kaia のサポートは、**2026年8月31日**をもって終了します。 その日付を過ぎると、Kaiaサブグラフのインデックス作成は停止し、それらのクエリエンドポイントはデータを返さなくなります。 お使いのDappがThe Graph上のKaiaサブグラフからデータを取得している場合は、ダウンタイムを避けるため、**2026年8月31日**までに別のインデクサーへ移行してください。

:::

## 何が変化しているのか

現在、The Graph では Kaia メインネット (8217) および Kairos テストネット (1001) がサポートされており、Kaia サブグラフのインデックス作成は Upgrade Indexer によって提供されています。 このサポートは**2026年8月31日**をもって終了します。

| 日付             | どうなるのか                                                                         |
| -------------- | ------------------------------------------------------------------------------ |
| **2026年8月31日** | Kaiaのサブグラフのインデックス作成が停止します。 The Graphのゲートウェイ上のクエリエンドポイントが、Kaiaデータの返却を停止しました。    |
| 日没の後           | Subgraph Studioにおいて、Kaiaはもはやデプロイ可能なネットワークではなくなりました。 Kaiaの`graph deploy`が失敗します。 |

オンチェーン上の状況に何の変化もありません。 KaiaメインネットとKairos、ユーザーの契約、およびイベント履歴には影響がありません。ホストされているインデックス作成サービスのみが廃止されます。 Kaia RPCエンドポイントを読み取るインデクサーであれば、どれでも同じデータを再構築することができます。

## あなたも影響を受けていますか？

以下のいずれかに該当する場合、影響を受けます：

- アプリは、Kaiaサブグラフを指す `gateway.thegraph.com` または `gateway-arbitrum.network.thegraph.com` 上のURLに対してクエリを実行します。
- アプリは、Subgraph Studio（`api.studio.thegraph.com/query/...`）からKaiaサブグラフのエンドポイントに対してクエリを実行します。
- Kaiaのサブグラフは、`graph deploy --studio` コマンドでデプロイするか、The Graphの分散型ネットワークに公開します。
- スタック内の依存関係、ダッシュボード、または分析ジョブは、これらのエンドポイントのいずれかからデータを読み取ります。

コードベースを素早く確認する方法：

```bash
grep -rn "thegraph.com" --include="*.ts" --include="*.js" --include="*.json" --include="*.env*" .
```

Goldsky、SubQuery、自己ホスト型のグラフノードを使用してKaiaをインデックス化する場合、またはKaiaのRPCエンドポイントを直接読み取る場合は、この影響は**ありません**。

## 別の選択肢を選んでください

以下の3つのオプションはすべて、本日、Kaia MainnetおよびKairosをインデックスに追加します。

|                    | [Goldsky](./goldsky.md)        | [SubQuery](./subquery.md)     | 自己ホスト型グラフノード        |
| ------------------ | ------------------------------ | ----------------------------- | ------------------- |
| **既存のサブグラフを実行します** | はい — 同じ部分グラフの仕様です              | はい — IPFSのデプロイメントIDを通じて       | はい――それは確かにグラフのノードです |
| **移行作業**           | 1つのCLIコマンド                     | 既存のビルドを公開する                   | 独自のインフラを構築する        |
| **ホスティング**         | 管理対象                           | 管理型ネットワークまたは分散型ネットワーク         | 操作するのはあなたです         |
| **その他にも**          | Mirror（DBへのストリーム転送）、RPC、パイプライン | 1つのプロジェクトにおけるマルチチェーン・インデックス作成 | 完全な制御               |
| **おすすめ**           | 最も迅速なドロップイン交換                  | マルチチェーン・プロジェクト、分散型ホスティング      | ベンダーへの依存を避けたいチーム    |

**最短の道をお探しなら、Goldskyをご利用ください。** GoldskyはThe Graphのサブグラフ仕様に完全に準拠しているため、既存のKaiaサブグラフを、マッピング、スキーマ、クエリを変更することなく移行できます。変更されるのは、アプリ内のエンドポイントURLのみです。

## 選択肢 1：Goldsky への移行

### 1. サブグラフのIPFSハッシュを取得する

終了日までに、The Graph上で既存のサブグラフエンドポイントを照会してください：

```graphql
query {
  _meta {
    deployment
  }
}
```

`deployment` の値は、IPFS ハッシュです。 また、[Graph Explorer](https://thegraph.com/explorer) または Subgraph Studio のサブグラフのページから、**デプロイメント ID** としてコピーすることもできます。

:::tip 8月31日までにこれを行ってください

現在所有しているすべてのKaiaサブグラフについて、IPFSハッシュを取得し、保存してください。 エンドポイントがまだ応答しているうちにデータを収集するほうが、はるかに簡単です。

:::

### 3. Goldsky CLI のインストールと認証

```bash
# macOS / Linux
curl https://goldsky.com | sh

# Windows
npm install -g @goldskycom/cli
```

[app.goldsky.com](https://app.goldsky.com) の **プロジェクト設定** で API キーを作成してから、次の手順を実行してください：

```bash
goldsky login
```

CI環境またはヘッドレス環境の場合：

```bash
goldsky login --token <API_KEY>
```

### 3. サブグラフを再配置する

```bash
goldsky subgraph deploy <your-subgraph-name>/<version> --from-ipfs-hash <your-subgraph-ipfs-hash>
```

Goldskyは同じサブグラフの構築を行い、設定された開始ブロックからKaiaのインデックス作成を開始します。

代わりにソースリポジトリからデプロイしたい場合は、プロジェクトディレクトリから `goldsky subgraph deploy<name>/<version>` を実行してください。詳細は [サブグラフのデプロイ](https://docs.goldsky.com/subgraphs/deploying-subgraphs) を参照してください。

### 4. 同期が完了するのを待ってから、エンドポイントを切り替えてください

進捗状況は以下で確認できます：

```bash
goldsky subgraph list
```

サブグラフがチェーンヘッドに追いついたら、アプリ内のゲートウェイURLをGoldskyのクエリエンドポイントに置き換えてください：

```diff
- const queryUrl = 'https://gateway.thegraph.com/api/<api-key>/subgraphs/id/<subgraph-id>';
+ const queryUrl = 'https://api.goldsky.com/api/public/<project-id>/subgraphs/<name>/<version>/gn';
```

GraphQLクエリに変更はありません。 Goldsky上でKaiaサブグラフをゼロから構築する手順の詳細については、[Goldsky](./goldsky.md)を参照してください。

## オプション 2：SubQuery への移行

SubQueryは既存のサブグラフの構築を実行できるほか、マルチチェーンプロジェクト向けの独自のSDKもサポートしています。

1. Graph Explorer から **デプロイメント ID** (IPFS CID) を取得するか、SubQuery の IPFS ゲートウェイを利用してローカルで生成してください：

   ```bash
   graph build -i https://unauthipfs.subquery.network/ipfs/api/v0
   ```

2. [SubQuery Explorer](https://explorer.subquery.network) を開き、**「新しいプロジェクトを公開」** を選択します。

3. CIDとプロジェクトのメタデータを入力し、公開してください。

なお、SubQuery NetworkではGraphQLのサブスクリプションはサポートされていません。 [SubGraphプロジェクトをSubQueryネットワークに公開する方法](https://subquery.network/doc/subquery_network/architects/publish-subgraph.html)や[Kaiaクイックスタート](https://subquery.network/doc/indexer/quickstart/quickstart_chains/kaia.html)、あるいはKaia専用のスターターについては[SubQuery](./subquery.md)のページをご覧ください。

## オプション 3：グラフノードのセルフホスティング

あなたの部分グラフは移植可能です。 KaiaアーカイブのRPCエンドポイントに対して、[graph-node](https://github.com/graphprotocol/graph-node)を自分で実行し、マッピング、スキーマ、クエリをそのまま維持することができます。

Kaia RPCエンドポイント（[パブリックエンドポイント](../../../references/public-en.md)を参照するか、[独自のノード](../../../nodes/endpoint-node/endpoint-node.md)を実行してください）に加え、PostgreSQLとIPFSが必要になります。 これにより、インフラを自ら運用するという代償を払う代わりに、完全な制御が可能となり、ベンダーへの依存もなくなります。

## 移行チェックリスト

- [ ] チームが管理しているすべてのKaiaサブグラフを、内部ダッシュボードや分析ジョブも含めてすべてリストアップしてください。
- [ ] **2026年8月31日までに**、それぞれについてIPFSハッシュおよびデプロイメントIDを保存しておいてください。
- [ ] 各サブグラフについて、開始ブロックおよび接ぎ木設定を保存します。
- [ ] 各サブグラフを、選択したプロバイダーにデプロイしてください。
- [ ] 各サブグラフがチェーンの先頭と同期するのを待ちます。
- [ ] 既知のクエリをいくつか両方のエンドポイントで実行し、結果が一致することを確認してください。
- [ ] アプリ、環境変数、およびCIのシークレット内のエンドポイントURLとAPIキーを更新してください。
- [ ] サブグラフのエンドポイントを参照するサードパーティの連携機能やパートナーをすべて更新してください。
- [ ] アプリをデプロイし、本番環境のトラフィックが新しいエンドポイントから読み込まれていることを確認してください。
- [ ] Kaiaでのみ使用されている「The Graph」の課金アカウントまたはAPIキーをキャンセルしてください。

## よくある質問

**これは私のスマートコントラクトやオンチェーンデータに影響しますか？**
いいえ。 廃止されるのは、ホスト型インデックス作成サービスのみです。 Kaia上の契約、取引、およびイベントログには変更はなく、どのインデクサーからでも引き続き完全に検索可能です。

**サブグラフを書き直さなければならないのでしょうか？**
いいえ。 Goldsky、SubQuery、およびセルフホスト型のグラフノードは、いずれも標準のサブグラフ仕様を実装しています。 `schema.graphql`、マッピング、および GraphQL クエリはそのまま引き継がれます。

**2026年8月31日以降、The Graph上の私のサブグラフはどうなるのでしょうか？**
Kaiaのインデックス作成が停止し、そのクエリエンドポイントはKaiaデータを返さなくなります。 ダウンタイムを避けるため、その日までに移行を行ってください。

**他のチェーンに対するクエリは引き続き機能しますか？**
はい。 これはカイアにのみ影響します。 The Graphを通じて他のネットワーク上で実行しているサブグラフには影響はありません。

**カイアは特定のプロバイダーを推奨しているのでしょうか？**
いいえ。 Goldskyは1つのコマンドで移行できるため、最も導入が容易な選択肢ですが、SubQueryやセルフホスト型のGraphNodeも同様に有効な選択肢です。 ご自身のスタックに合ったものを選んでください。

**移行についてサポートが必要です。**
[Kaia Developer Forum](https://devforum.kaia.io) または Kaia Discord までご連絡ください。 大規模または複雑なサブグラフを運用している場合は、移行計画の策定を支援できるよう、早めにKaiaチームまでご連絡ください。

## 今後の手順

- [Goldsky](./goldsky.md) — Kaiaサブグラフのデプロイ手順（ステップバイステップ）
- [SubQuery](./subquery.md) — Kaia におけるマルチチェーン・インデックス機能
- [インデクサーの概要](./indexers.md) — Kaiaのすべてのインデックス作成オプション
