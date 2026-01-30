---
sidebar_label: Goldsky
---

# Goldsky

![](/img/banners/kaia-goldsky.png)

## 導言

[Goldsky](https://goldsky.com) 是一款高性能的資料索引器，專為簡化鏈上資料的抽取、轉換和載入 (ETL) 而設計。 它能讓開發人員更快地建立和運送即時分析及區塊鏈整合應用程式。

Goldsky 提供兩種核心產品：

- [Subgraphs](https://docs.goldsky.com/subgraphs/introduction)：靈活、TypeScript 驅動的索引與 GraphQL API、Webhook 支援等。
- [Mirror](https://docs.goldsky.com/mirror/introduction)：透過單一 YAML 配置，將即時區塊鏈資料直接串流至您的資料庫或訊息佇列。

Kaia Mainnet 和 Testnet 均由 Goldsky 支援

**您將學到**

完成本指南後，您將會

- 瞭解 Goldsky 的低碼子圖（Instant Subgraphs）如何運作
- 使用 Goldsky CLI 設定和部署子圖
- 從 Kaia 主網路上的 USDT 合約索引轉移事件
- 透過 GraphQL 存取並測試子圖端點

## 先決條件

開始之前，請確保您已準備好下列各項：

**1. 安裝 Goldsky CLI**
\- 依照您作業系統的 [安裝說明](https://docs.goldsky.com/subgraphs/deploying-subgraphs#install-goldskys-cli-and-log-in)。
\- Windows 使用者：在安裝 CLI 之前，請確認已安裝 [Node.js](https://nodejs.org) 和 npm。

**2. 建立 Goldsky 帳戶**
\- 如果您還沒有帳戶，請在 [Goldsky.com](https://goldsky.com) 註冊。

**3. 產生 API 金鑰**
\- 在您的 Goldsky 面板導覽到 \*\* 專案設定\*\*。
\- 建立並複製您的 API 金鑰。

**4. 驗證 CLI**
`bash
    goldsky login     ```     - 在提示時貼入您的 API 金鑰。     - 執行下列步驟確認 CLI 驗證：
`bash
goldsky```
```

## 開始使用

Goldsky 支援三種部署子圖的方法：

- From [Source Code](https://docs.goldsky.com/subgraphs/deploying-subgraphs#from-source-code) - 從您的本機開發環境部署自訂建立的子圖形。
- 從其他主機遷移 - 從 [The Graph](https://docs.goldsky.com/subgraphs/migrate-from-the-graph) 或 [Alchemy](https://docs.goldsky.com/subgraphs/migrate-from-alchemy/guide) 等平台遷移現有的子圖。
- Instant Subgraphs ([Low-Code](https://docs.goldsky.com/subgraphs/guides/create-a-low-code-subgraph) / [No-Code](https://docs.goldsky.com/subgraphs/guides/create-a-no-code-subgraph))- 使用配置檔 (low-code) 或 UI (no-code) 來部署子圖，而無需撰寫傳統的子圖對應程式碼。

在本指南中，我們將採用低程式碼方式部署一個子圖形，以索引 Kaia Mainnet 上 USDT 合約的 _Transfer_ 事件。

## 設定與部署

低程式碼方法讓我們可以手動建立設定檔，然而我們仍然不需要寫傳統的子圖映射程式碼 - Goldsky 會根據我們的設定產生。

因此，在本節中，您只需要 .NET Framework 3.0：

- Kaia 上 USDT 的合約地址
- 合約的 ABI（應用程式二進位介面
- 起始區塊 (合約部署的區塊)

### 擷取 USDT 合約 ABI

- 請至 [Kaiascan](https://kaiascan.io) 尋找 [USDT 合約地址](https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=txList&page=1)。

- 按一下 Contract（合約）索引標籤，找到 Contract ABI（合約 ABI）部分。

  > 注意：USDT 是一種代理合約。 請務必擷取執行合約 ABI。

- 複製並貼上合約 ABI，並將其儲存為 [abi.json](https://gist.github.com/ayo-klaytn/cd53e0c560eb374bdbe981d12b8986f1#file-usdt-abi-json) 到您的工作目錄中。

- 記錄合約的部署區塊編號。

### 建立組態檔案

下一步是建立 Instant Subgraph 設定檔案 (例如：` usdt-demo-config.json`)。

本檔案包括五個主要部分：

1. 組態版本號碼
2. 組態名稱
3. ABI
4. 鏈條
5. 合約實例

#### 版本號碼

這是 Goldsky 配置檔案格式的版本號碼，而不是您的子圖形的版本號碼。 請參考此 [reference](https://docs.goldsky.com/subgraphs/reference/instant-subgraph#version-1) 以取得最新版本號碼。

#### 組態名稱

這是您自選的名稱，可協助您瞭解此組態的用途。 它只用於內部除錯。 在本指南中，我們將使用 _usdt-demo_

#### ABI、鏈和合約實例

這三個部分是相互聯繫的。

- 命名您的 ABI，並輸入您先前儲存的 ABI 檔案路徑 (相對於此設定檔的位置)。 在本例中，是 `usdtabi` 和 `abi.json`。

- 寫出契約實例，參考您之前命名的 ABI、部署的位址、所處的連結、開始區塊。

**範例：[usdt-demo-config.json](https://gist.github.com/ayo-klaytn/cd53e0c560eb374bdbe981d12b8986f1#file-usdt-demo-config-json)**

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

此配置支援多種使用情況，包括索引具有不同 ABI 的多個合約、在多個鏈上部署的相同合約，或在不同網路中具有獨特 ABI 的多個合約。

### 部署子圖

設定檔準備好之後，就是部署子圖的時候了。

使用命令部署子圖：`goldsky subgraph deploy name/version --from-abi <path-to-config-file>`，然後傳入您建立的設定檔路徑。

範例：

```bash
goldsky subgraph deploy usdt-demo/1.0 --from-abi usdt-demo-config.json
```

![Goldsky low code deploy](/img/build/tools/goldsky-lc-deploy.png)

Goldsky 會自動產生所需的子圖代碼，以您的名義部署，並提供查詢端點以供立即使用。

開啟端點可啟動網頁式 GraphQL 探索器，您可以在此檢視模式並編寫查詢，以整合至您的應用程式。

### 查詢子圖

恭喜你 您已成功部署子圖。

在查詢之前，您可能需要等待索引器完全同步，這取決於您設定檔中定義的 startBlock 值。 您可以直接在 Goldsky 面板中監控同步進度。

![Goldsky同步索引器](/img/build/tools/goldsky-synced-indexer.png)

一旦同步完成，您就可以使用 Goldsky 提供的公共端點來查詢您的子圖：

```
https://api.goldsky.com/api/public/project_cmkv4p7xa8ix401vc3f32g20g/subgraphs/usdt-demo-kaia/1.0/gn
```

:::tip
使用從 Goldsky 面板連結的網頁型 GraphQL 探索器，以互動方式瀏覽模式和測試查詢。
:::

![Goldsky 基於 Web 的 GraphQL 演示](/img/build/tools/goldsky-demo.gif)

#### 範例查詢：擷取 USDT 轉帳。

此 GraphQL 查詢會擷取 Kaia 主網路上前 10 個 USDT 轉移事件，依值由低到高排序：

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

回應樣本：

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

\*\* 範例程式碼：透過 JavaScript 進行查詢 (Axios)\*\*

以下是一個簡單的範例，說明如何在 Node.js 中使用 axios 傳送相同的查詢：

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

## 其他資源

- [部署子圖](https://docs.goldsky.com/subgraphs/deploying-subgraphs)
- [Indexing Kaia with Goldsky](https://docs.goldsky.com/chains/kaia)
- [Goldsky Documentation](https://docs.goldsky.com/introduction)
