---
sidebar_label: ゴールドスキー
---

# ゴールドスキー

![](/img/banners/kaia-goldsky.png)

## はじめに

[Goldsky](https://goldsky.com)は、オンチェーン・データの抽出、変換、ロード(ETL)を簡素化するために設計された高性能データ・インデクサーである。 これにより、開発者はリアルタイム分析やブロックチェーン統合アプリケーションを迅速に構築し、出荷できるようになる。

ゴールドスカイは2つの主力製品を提供している：

- [Subgraphs](https://docs.goldsky.com/subgraphs/introduction)：GraphQL API、Webhookサポートなどを備えた、柔軟なTypeScriptによるインデックス作成。
- [Mirror](https://docs.goldsky.com/mirror/introduction)：YAML設定1つで、ブロックチェーンのライブデータをデータベースやメッセージキューに直接ストリーミングします。

KaiaメインネットとTestnetはどちらもGoldskyがサポートしています。

\*\*何を学ぶか

このガイドが終わる頃には、あなたはこうなっている：

- Goldskyのローコード・サブグラフ（Instant Subgraphs）の仕組みを理解する。
- Goldsky CLI を使用したサブグラフの設定とデプロイ
- KaiaメインネットのUSDTコントラクトからTransferイベントをインデックスする
- GraphQL経由でサブグラフのエンドポイントにアクセスし、テストする

## 前提条件

作業を始める前に、以下のものが揃っていることを確認してください：

**1. Goldsky CLI**
\- お使いのオペレーティングシステムの [インストール手順](https://docs.goldsky.com/subgraphs/deploying-subgraphs#install-goldskys-cli-and-log-in) に従ってください。
\- Windowsユーザー：CLIをインストールする前に、[Node.js](https://nodejs.org)とnpmがインストールされていることを確認してください。

**2. Goldskyアカウントを作成する**
\- まだアカウントをお持ちでない場合は、[Goldsky.com](https://goldsky.com)からサインアップしてください。

**3. APIキーを生成する**
\- Goldskyダッシュボードの**プロジェクト設定**に移動します。
\- APIキーを作成し、コピーします。

**4. CLI を認証する**````bash
    goldsky login
    ```
    - プロンプトが表示されたら API キーを貼り付けます。
    -
``bash
    goldsky
    ``` を実行してCLI認証を確認する。
````

## はじめに

Goldskyは、サブグラフを展開するための3つの方法をサポートしている：

- From [Source Code](https://docs.goldsky.com/subgraphs/deploying-subgraphs#from-source-code) - カスタムで構築したサブグラフをローカル開発環境からデプロイする。
- 他のホストからの移行 - [The Graph](https://docs.goldsky.com/subgraphs/migrate-from-the-graph)や[Alchemy](https://docs.goldsky.com/subgraphs/migrate-from-alchemy/guide)のようなプラットフォームから既存のサブグラフを移行する。
- インスタント・サブグラフ ([ロー・コード](https://docs.goldsky.com/subgraphs/guides/create-a-low-code-subgraph) / [ノー・コード](https://docs.goldsky.com/subgraphs/guides/create-a-no-code-subgraph))- コンフィギュレーション・ファイル(ロー・コード)またはUI(ノー・コード)を使用して、従来のサブグラフ・マッピング・コードを記述することなく、サブグラフをデプロイします。

このガイドでは、ローコードアプローチを使用して、Kaiaメインネット上のUSDTコントラクトからの_Transfer_イベントをインデックス化するサブグラフをデプロイします。

## セットアップと配備

ローコード・アプローチでは、設定ファイルを手動で作成することができますが、従来のサブグラフ・マッピング・コードを書く必要はありません。

したがって、このセクションで必要なのは、.NET Frameworkのインストールだけです：

- カイアのUSDTの契約アドレス
- 契約のABI（アプリケーション・バイナリ・インターフェース
- 開始ブロック（契約が展開されたブロック）

### USDTコントラクトABIの取得

- Kaiascan】(https://kaiascan.io)で【USDT契約アドレス】(https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=txList&page=1)を検索してください。

- Contract（契約）」タブをクリックし、「Contract ABI（契約ABI）」セクションを探す。

  > 注：USDTは代理契約である。 必ず実装契約のABIを取得してください。

- 契約ABIをコピー＆ペーストし、作業ディレクトリに[abi.json](https://gist.github.com/ayo-klaytn/cd53e0c560eb374bdbe981d12b8986f1#file-usdt-abi-json)として保存する。

- 契約の配備ブロック番号を記録する。

### 設定ファイルの作成

次のステップは、インスタント・サブグラフ・コンフィギュレーション・ファイル（例：usdt-demo-config.json\`）を作成することです。

このファイルは5つの主要セクションで構成されている：

1. コンフィグバージョン番号
2. コンフィグ名
3. ABI
4. チェーン
5. 契約インスタンス

#### バージョン番号

これはGoldskyのコンフィギュレーション・ファイル・フォーマットのバージョン番号であり、サブグラフのバージョン番号ではありません。 最新のバージョン番号については、この[リファレンス](https://docs.goldsky.com/subgraphs/reference/instant-subgraph#version-1)を参照してください。

#### コンフィグ名

これは、このコンフィグが何のためにあるのかを理解するのに役立つ任意の名前である。 内部デバッグにのみ使用される。 このガイドでは、_usdt-demo_を使用する。

#### ABI、チェーン、コントラクト・インスタンス

これら3つのセクションは相互に関連している。

- ABIに名前を付け、先ほど保存したABIファイルへのパス（この設定ファイルがある場所からの相対パス）を入力します。 この場合、`usdtabi`と`abi.json`である。

- コントラクトのインスタンスを書き出し、先ほど指定したABI、デプロイ先のアドレス、チェーン、スタートブロックを参照する。

**例[usdt-demo-config.json](https://gist.github.com/ayo-klaytn/cd53e0c560eb374bdbe981d12b8986f1#file-usdt-demo-config-json)**。

```json
{
  "version": "1",
  "name": "usdt-demo",
  "abis": {
    "usdtabi": {
      "path": "./abi.json"
    }
  },
  "instances": [
    {
      "abi": "usdtabi",
      "address": "0xd077a400968890eacc75cdc901f0356c943e4fdb",
      "startBlock": 30801565,
      "chain": "kaia"
    }
  ]
}
```

この構成は、異なるABIを持つ複数のコントラクト、複数のチェーンにまたがる同じコントラクト、異なるネットワーク上の固有のABIを持つ複数のコントラクトのインデックス化など、さまざまなユースケースをサポートする。

### サブグラフの展開

コンフィギュレーション・ファイルの準備ができたら、いよいよサブグラフをデプロイします。

コマンドを使用してサブグラフをデプロイします：goldsky subgraph deploy name/version --from-abi<path-to-config-file>\` を使用してサブグラフをデプロイし、作成した設定ファイルのパスを渡します。

例

```bash
goldsky subgraph deploy usdt-demo/1.0 --from-abi usdt-demo-config.json
```

ゴールドスキー・ローコード・デプロイ](/img/build/tools/goldsky-lc-deploy.png)

Goldsky は、必要なサブグラフ・コードを自動的に生成し、お客様に代わってデプロイし、すぐに使用できるようにクエリ・エンドポイントを提供します。

エンドポイントを開くと、ウェブベースのGraphQLエクスプローラーが起動し、スキーマを調べたり、アプリケーションに統合するためのクエリを作成したりすることができます。

### サブグラフのクエリ

おめでとう！ サブグラフのデプロイに成功した。

クエリを実行する前に、設定ファイルに定義されている startBlock の値によっては、インデクサが完全に同期するまで待つ必要があるかもしれません。 シンクの進行状況は、Goldskyのダッシュボードで直接確認できます。

ゴールドスキー同期インデクサー](/img/build/tools/goldsky-synced-indexer.png)

同期が完了したら、Goldskyが提供するパブリック・エンドポイントを使ってサブグラフを照会できる：

```
https://api.goldsky.com/api/public/project_cmkv4p7xa8ix401vc3f32g20g/subgraphs/usdt-demo-kaia/1.0/gn
```

:::tip
Goldsky ダッシュボードからリンクされている Web ベースの GraphQL エクスプローラを使用して、スキーマを参照し、クエリをインタラクティブにテストできます。
:::

Goldsky WebベースのGraphQLデモ](/img/build/tools/goldsky-demo.gif)

#### クエリーの例：USDT送金を取得する。

このGraphQLクエリは、Kaiaメインネットの最初の10件のUSDT送金イベントを、値の降順でソートして取得します：

```js
{
  transfers(first: 10, orderBy: value, orderDirection: desc) {
    from
    id
    to
    value
  }
}
```

回答例

```json
{
  "data": {
    "transfers": [
      {
        "from": "0x0000000000000000000000000000000000000000",
        "id": "0x3618973a943060e7bd57eb8c49c8770af93241710c891195a311ace77366a26b-4",
        "to": "0x5754284f345afc66a98fbb0a0afe71e0f007b949",
        "value": "100000000000000"
      },
      {
        "from": "0x5754284f345afc66a98fbb0a0afe71e0f007b949",
        "id": "0x249852a124700338df1d93d272d9a88d41d3c6526fefb7bb76dce27d3c6e6617-2",
        "to": "0x77134cbc06cb00b66f4c7e623d5fdbf6777635ec",
        "value": "20000000000000"
      }
      // ...
    ]
  }
}
```

**サンプルコードJavaScriptによるクエリー (Axios)**

Node.jsでaxiosを使って同じクエリーを送信する簡単な例です：

```js
const axios = require('axios');

const graphqlQuery = `
  {
    transfers(first: 10, orderBy: value, orderDirection: desc) {
      from
      id
      to
      value
    }
  }
`;

const queryUrl = 'https://api.goldsky.com/api/public/project_cmkv4p7xa8ix401vc3f32g20g/subgraphs/usdt-demo-kaia/1.0/gn';

axios.post(queryUrl, { query: graphqlQuery })
  .then((response) => {
    const data = response.data.data;
    console.log(data);
  })
  .catch((error) => {
    console.error('GraphQL query failed:', error);
 });
```

## その他のリソース

- [サブグラフの展開](https://docs.goldsky.com/subgraphs/deploying-subgraphs)
- [ゴールドスキーでカイアをインデックス化】(https://docs.goldsky.com/chains/kaia)
- [ゴールドスキー・ドキュメンテーション](https://docs.goldsky.com/introduction)
