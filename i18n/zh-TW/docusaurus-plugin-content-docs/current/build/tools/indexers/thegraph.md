---
sidebar_label: The Graph
---

# The Graph

在構建 dapp 時，獲取智能合約的歷史數據可能會令人沮喪。 [The Graph](https://thegraph.com/) 通過被稱為子圖的應用程序接口，提供了一種查詢智能合約數據的簡便方法。 圖形的基礎設施依賴於索引器的去中心化網絡，使您的 dapp 真正實現去中心化。

Kaia Mainnet 和 Testnet 均由 The Graph 提供支持。

## 快速入門

設置這些子圖只需幾分鐘。 要開始操作，請遵循以下三個步驟：

1. 初始化子圖項目
2. 部署和發佈
3. 從您的應用程序中查詢

定價

- Studio 中的速率限制測試終點是免費的。
- 去中心化網絡的 API 調用按次付費，每 10 萬次查詢收費 4 美元。 前 100K 次查詢免費！

下面是一個步驟：

## 1. 初始化子圖項目

### 在 Subgraph Studio 上創建子圖

訪問 [Subgraph Studio] (https://thegraph.com/studio/) 並連接您的錢包。 連接錢包後，您可以點擊 "創建子圖"。 選擇名稱時，建議使用標題大小寫："子圖名稱鏈名稱"。

![Create a Subgraph](/img/build/tools/graph/01-create-subgraph.png)

然後，您將進入您的子圖頁面。 您需要的所有 CLI 命令都將顯示在頁面右側：

![CLI commands](/img/build/tools/graph/02-cli-commands.webp)

### 安裝圖形 CLI

在本地計算機上運行以下程序：

```
npm install -g @graphprotocol/graph-cli
```

### 初始化子圖

您可以直接從您的子圖頁面中複製，以包含您的特定子圖標題：

```
graph init --studio<SUBGRAPH_SLUG>
```

系統會提示您提供子圖的一些信息，如下所示：

![CLI sample](/img/build/tools/graph/03-cli-sample.webp)

輸入合約信息後，graph-cli 會嘗試從 blockexplorer API 獲取 ABI、StartBLock 和合約名稱。

不過，KaiaScan 的 API 還沒有準備好，所以當被要求重試時，只需說 "不"。 以下是手動獲取這些信息的方法：

1. ABI：您需要在運行 `graph init` 的同一目錄下準備一個包含 ABI 的 json 文件。 從[Kaiascan 上的合同頁面](https://kaiascan.io/address/0x5096db80b21ef45230c9e423c373f1fc9c0198dd)，進入 "合同 "選項卡，點擊 "查看代碼"，就能複製 ABI。 將其保存為 json 文件，放在運行 `graph init` 的同一文件夾中。 在上面的截圖中，它被保存為 `abi.json`。
   ![Finding ABI](/img/build/tools/graph/04-kaiascan-abi.webp)

2. 啟動區塊：點擊創建合約的交易哈希值。 在那裡你會找到創建合同的區塊。
   ![contract creation](/img/build/tools/graph/05-contract-creation.webp)

3. 合同名稱：輸入合同名稱即可。 如果這是您在該子圖中索引的唯一一份合同，那麼使用默認的 `Contract` 即可。

## 2) 部署和發佈

### 部署到 Subgraph Studio

首先運行這些命令：

```bash
$ graph codegen
$ graph build
```

然後運行這些程序來驗證和部署您的子圖。 您可以直接從 Studio 中的子圖頁面複製這些命令，以包含特定的部署密鑰和子圖標題：

```bash
$ graph auth --studio<DEPLOY_KEY>
$ graph deploy --studio<SUBGRAPH_SLUG>
```

系統會要求您提供版本標籤。 您可以輸入類似 v0.0.1 的內容，但也可以自由選擇格式。

### 測試子圖

您可以在操場部分進行示例查詢，測試您的子圖。 詳細信息 "選項卡將顯示 API 端點。 您可以使用該端點從您的 dapp 進行測試。

![Playground](/img/build/tools/graph/06-playground.png)

### 將子圖發佈到圖譜的去中心化網絡中

一旦您的子圖可以投入生產，您就可以將其發佈到去中心化網絡中。 在 Subgraph Studio 的子圖頁面上，點擊 "發佈 "按鈕：

![publish button](/img/build/tools/graph/07-studio-publish-subgraph.webp)

> **注：**
>
> - Kaia 暫時顯示為 "部分支持"，因為為索引員解鎖獎勵的最終鏈上投票流程尚未完成。 目前，Edge & Node 的索引器（升級索引器）是唯一支持所有 Kaia 子圖的索引器。
> - 儘管您的子圖正在索引來自 Kaia、以太坊或任何其他[支持鏈](https://thegraph.com/docs/en/developing/supported-networks/)的數據，但該圖的智能合約都在 Arbitrum One 上。

## 3. 查詢子圖

祝賀你 現在，您可以在分散式網絡上查詢您的子圖！

對於去中心化網絡上的任何子圖，只要將 GraphQL 查詢傳遞到子圖的查詢 URL（可在資源管理器頁面頂部找到），就可以開始對其進行查詢。

下面是 Messari 在 [CryptoPunks Ethereum 子圖](https://thegraph.com/explorer/subgraphs/HdVdERFUe8h61vm2fDyycHgxjsde5PbB832NHgJfZNqK) 中的一個例子：

![Query URL](/img/build/tools/graph/08-query-url.png)

該子圖的查詢 URL 為

`https://gateway-arbitrum.network.thegraph.com/api/`**[api-key]**`/subgraphs/id/HdVdERFUe8h61vm2fDyycgxjsde5PbB832NHgJfZNqK`

現在，您只需填寫自己的 API 密鑰，即可開始向該端點發送 GraphQL 查詢。

### 獲取自己的應用程序接口密鑰

![API keys](/img/build/tools/graph/09-apikeys.png)

在 Subgraph Studio 中，您會看到頁面頂部的 "API 密鑰 "菜單。 您可以在此創建 API 密鑰。

## 附錄

### 查詢示例

該查詢顯示了售價最昂貴的 CryptoPunks。

```graphql
{
  trades(orderBy: priceETH, orderDirection: desc) {
    priceETH
    tokenId
  }
}

```

將其輸入查詢 URL 會返回此結果：

```
{
  "數據"：{
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
💡小知識：從[CryptoPunks 網站](https://cryptopunks.app/cryptopunks/topsales)上的最高銷量來看，最高銷量似乎是 Punk #5822，而不是 #9998。 為什麼？ 因為他們對發生的閃貸銷售進行了審查。

</aside>

### 代碼示例

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

### 其他資源：

- 要探索優化和定製子圖以提高性能的所有方法，請閱讀 [在此創建子圖](https://thegraph.com/docs/en/developing/creating-a-subgraph/) 的更多信息。
- 有關從子圖中查詢數據的更多信息，請閱讀 [此處](https://thegraph.com/docs/en/querying/querying-the-graph/)。
