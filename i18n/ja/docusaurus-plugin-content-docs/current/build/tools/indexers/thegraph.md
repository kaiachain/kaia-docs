---
sidebar_label: The Graph
---

# The Graph

スマートコントラクトの履歴データを取得することは、ダップ構築時にフラストレーションがたまることがある。 [The Graph](https://thegraph.com/)は、サブグラフと呼ばれるAPIを通じてスマートコントラクトのデータを照会する簡単な方法を提供する。 Graphのインフラはインデクサーの分散型ネットワークに依存しており、あなたのダップが真の分散型になることを可能にする。

カイア・メインネットとテストネットはどちらもザ・グラフのサポートを受けている。

## クイックスタート

これらのサブグラフの設定には数分しかかからない。 これらのサブグラフの設定には数分しかかからない。 始めるには、以下の3つのステップを踏む：

1. サブグラフ・プロジェクトを初期化する
2. デプロイとパブリッシュ
3. ダップからのクエリー

価格設定：

- Studioのレート制限付きテストエンドポイントは無料。
- 分散型ネットワークのAPIコールは有料で、10万クエリーあたり4ドル。 最初の10万クエリーは無料！

以下、順を追って説明しよう：

## 1. サブグラフ・プロジェクトを初期化する

### Subgraph Studioでサブグラフを作成する

Subgraph Studio](https://thegraph.com/studio/)にアクセスし、ウォレットを接続する。 ウォレットが接続されたら、"Create a Subgraph "をクリックします。 名称を決める際には、タイトル・ケースを使うことを推奨する。 ウォレットが接続されたら、"Create a Subgraph "をクリックします。 名称を決める際には、タイトル・ケースを使うことを推奨する。

![Create a Subgraph](/img/build/tools/graph/01-create-subgraph.png)

サブグラフのページが表示されます。 サブグラフのページが表示されます。 必要なCLIコマンドはすべてページの右側に表示されます：

![CLI commands](/img/build/tools/graph/02-cli-commands.webp)

### Graph CLIのインストール

ローカル・マシンで以下を実行する：

```
npm install -g @graphprotocol/graph-cli
```

### サブグラフを初期化する

これをサブグラフのページから直接コピーして、特定のサブグラフのスラッグを含めることができる：

```
グラフ開始 --スタジオ<SUBGRAPH_SLUG>
```

このように、サブグラフに関する情報を入力するプロンプトが表示される：

![CLI sample](/img/build/tools/graph/03-cli-sample.webp)

コントラクト情報を入力すると、graph-cli は blockexplorer API から ABI、StartBLock、コントラクト名を取得しようとします。

ただし、KaiaScanのAPIはまだ準備ができていないので、再試行を求められたら「いいえ」と答えてください。 手動で入手する方法は以下の通り： 手動で入手する方法は以下の通り：

1. ABI: ABIを含むjsonファイルを`graph init`を実行しているディレクトリに用意する必要がある。 [Kaiascanの契約のページ](https://kaiascan.io/address/0x5096db80b21ef45230c9e423c373f1fc9c0198dd)から、`Contract`タブを開き、`View Code`をクリックすると、ABIをコピーすることができます。 それをjsonファイルとして、`graph init`を実行しているフォルダと同じ場所に保存する。 上のスクリーンショットでは、`abi.json`として保存されている。
   ![Finding ABI](/img/build/tools/graph/04-kaiascan-abi.webp) [Kaiascanの契約のページ](https://kaiascan.io/address/0x5096db80b21ef45230c9e423c373f1fc9c0198dd)から、`Contract`タブを開き、`View Code`をクリックすると、ABIをコピーすることができます。 それをjsonファイルとして、`graph init`を実行しているフォルダと同じ場所に保存する。 上のスクリーンショットでは、`abi.json`として保存されている。
   ![Finding ABI](/img/build/tools/graph/04-kaiascan-abi.webp)

2. ブロックを開始する：契約が作成されたトランザクションハッシュをクリックします。 そこに契約が作成されたブロックがある。
   ![contract creation](/img/build/tools/graph/05-contract-creation.webp) そこに契約が作成されたブロックがある。
   ![contract creation](/img/build/tools/graph/05-contract-creation.webp)

3. 契約名：契約名を入力してください。 契約名：契約名を入力してください。 このサブグラフでインデックスを作成するコントラクトがこれだけであれば、デフォルトの `Contract` を使用しても問題ありません。

## 3) デプロイと公開

### Subgraph Studioにデプロイする

まず、以下のコマンドを実行する：

```bash
$ graph codegen
$ graph build
```

次に、これらを実行してサブグラフを認証し、デプロイする。 次に、これらを実行してサブグラフを認証し、デプロイする。 これらのコマンドをStudioのサブグラフのページから直接コピーして、特定の配置キーとサブグラフのスラッグを含めることができます：

```bash
$ graph auth --studio<DEPLOY_KEY>
$ graph deploy --studio<SUBGRAPH_SLUG>
```

デプロイと公開 バージョンラベルの入力を求められます。 v0.0.1のように入力できますが、形式は自由に選んでください。

### サブグラフをテストする

プレイグラウンド・セクションでサンプル・クエリーを作成し、サブグラフをテストすることができる。 DetailsタブにはAPIエンドポイントが表示されます。 そのエンドポイントを使って、ダップからテストすることができる。

![Playground](/img/build/tools/graph/06-playground.png)

### グラフの分散型ネットワークにサブグラフを公開する

サブグラフが完成したら、分散ネットワークに公開することができる。 サブグラフが完成したら、分散ネットワークに公開することができる。 Subgraph Studioのサブグラフのページで、Publishボタンをクリックします：

![publish button](/img/build/tools/graph/07-studio-publish-subgraph.webp)

> **注**
>
> - インデクサーの報酬をアンロックするための最終的なオンチェーン投票プロセスがまだ完了していないため、カイアは今のところ「部分的にサポートされている」と表示されている。 今のところ、Edge & Nodeのインデクサー（アップグレード・インデクサー）が、すべてのカイア・サブグラフをサポートする唯一のインデクサーとなる。 今のところ、Edge & Nodeのインデクサー（アップグレード・インデクサー）が、すべてのカイア・サブグラフをサポートする唯一のインデクサーとなる。
> - グラフのスマートコントラクトはすべてArbitrum One上にあり、サブグラフがKaiaやEthereum、その他の[サポートされているチェーン](https://thegraph.com/docs/en/developing/supported-networks/)のデータをインデックスしていても、そのデータはArbitrum One上にある。

## 3. 3. Query your Subgraph

おめでとう！ これで分散型ネットワーク上で自分のサブグラフを照会できる！

分散ネットワーク上のどのサブグラフに対しても、エクスプローラーページの一番上にあるサブグラフのクエリーURLにGraphQLクエリーを渡すことでクエリーを開始できる。

これはMessariによる[CryptoPunks Ethereum subgraph](https://thegraph.com/explorer/subgraphs/HdVdERFUe8h61vm2fDyycHgxjsde5PbB832NHgJfZNqK)からの例である：

![Query URL](/img/build/tools/graph/08-query-url.png)

このサブグラフのクエリーURLは以下の通り：

`https://gateway-arbitrum.network.thegraph.com/api/`**[api-key]**`/subgraphs/id/HdVdERFUe8h61vm2fDyycgxjsde5PbB832NHgJfZNqK`

このエンドポイントにGraphQLクエリーを送信するためには、API Keyを入力する必要がある。

### APIキーの取得

![API keys](/img/build/tools/graph/09-apikeys.png)

Subgraph Studioでは、ページ上部に "API Keys "メニューが表示されます。 ここでAPIキーを作成することができます。 ここでAPIキーを作成することができます。

## 付録

### サンプルクエリー

このクエリでは、最も高価なCryptoPunksが販売されている。

```graphql
{
  trades(orderBy: priceETH, orderDirection: desc) {
    priceETH
    tokenId
  }.
}

```

これをクエリーURLに渡すと、このような結果が返される：

```
{
  "data"：{
    "trades"：[
      {
        "priceETH"："124457.067524886018255505",
        "tokenId"："9998"
      },
      {
        "priceETH"："8000",
        "tokenId"："5822"
      },
// ...
```

<aside>

💡 トリビア：[CryptoPunks website](https://cryptopunks.app/cryptopunks/topsales)のトップセールスを見ると、トップセールスは9998位ではなく、パンクの5822位のようだ。 なぜですか？ なぜならば、フラッシュ・ローン・セールが起こったことを検閲しているからだ。 なぜですか？ なぜならば、フラッシュ・ローン・セールが起こったことを検閲しているからだ。

</aside>

### サンプルコード

```jsx
const axios = require('axios');

const graphqlQuery = `{
  trades(orderBy: priceETH, orderDirection: desc) {
    priceETH
    tokenId
  }
}`;
const queryUrl = 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/HdVdERFUe8h61vm2fDyycHgxjsde5PbB832NHgJfZNqK'

const graphQLRequest = {
  method: 'post',
  url: queryUrl,
  data: {
    query: graphqlQuery,
  },
};

// Send the GraphQL query
axios(graphQLRequest)
  .then((response) => {
    // Handle the response here
    const data = response.data.data
    console.log(data)

  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
```

### その他のリソース

- より良いパフォーマンスのためにサブグラフを最適化＆カスタマイズする方法については、[サブグラフの作成](https://thegraph.com/docs/en/developing/creating-a-subgraph/)をお読みください。
- サブグラフからのデータ・クエリについては、[こちら](https://thegraph.com/docs/en/querying/querying-the-graph/)を参照してください。