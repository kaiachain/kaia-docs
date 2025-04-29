# Kaia Eliza 外掛程式

## 概述

**Kaia Eliza Plugin** 是與 **ElizaOS** 整合的重要擴充，可與 **Kaia Mainnet** 和 **Kairos Testnet** 進行無縫互動。 此外掛程式提供一套強大的功能，包括 **KAIA 代幣轉移、錢包餘額查詢，以及可替代與不可替代代幣 (FTs/NFTs) 的擷取**。 它專為開發人員設計，可簡化錢包管理，並增強**ElizaOS 框架**內 Kaia 生態系統的應用程式功能。

\*\* 主要特色\*\*

- **代幣傳輸**：輕鬆地在錢包間傳送 KAIA 代幣。
- **錢包查詢**：檢索錢包餘額和即時 KAIA 價格資料。
- **網路管理**：與 Kaia 區塊鏈無縫互動。
- \*\* 區塊與交易資訊\*\*：存取網路中交易和區塊的詳細資訊。

## 開始使用

### 1. 設定 ElizaOS

```sh
git clone https://github.com/elizaOS/eliza
cd eliza
git checkout $(git describe --tags --abbrev=0)
pnpm install
cp .env.example .env
```

### 2. 設定環境變數

要整合 Kaia 外掛程式，開發人員必須設定環境變數和秘密。 外掛程式可透過 **agent.json.secret** 存取這些設定，或在執行時直接存取。

現在，設定 `.env` 檔案和 `kaiaagent.character.json` 值。

**.env 檔案：**

```sh
GROK_API_KEY= # GROK API Key
GOOGLE_GENERATIVE_AI_API_KEY= # Gemini API Key
```

:::note
若要使用任何 **LLM 提供者**，請在 `.env` 中設定相關的 API 金鑰。 根據提供的金鑰，更新字元檔案中的 **modelProvider** 設定。
:::

**kaiaagent.character.json:**

```json
{
    "name": "Kaia AI Dev Agent",
    "plugins": ["@elizaos-plugins/plugin-kaia"],
    "clients": [],
    "modelProvider": "grok",
    "settings": {
        "ragKnowledge": false,
        "secrets": {
            "KAIA_EVM_PRIVATE_KEY": "",
            "KAIA_KAIASCAN_API_KEY": "",
            "KAIA_FAUCET_AMOUNT": "1"
        }
    }
}
```

提供下列值：

- **kaia_evm_private_key**：鏈上交易必須使用。
- **kaia_kaiascan_api_key**：可從 [KaiaScan](https://kaiascan.io) 取得。
- **kaia_faucet_amount**：指定請求時要分發的代幣金額。

\*\* 設定範例\*\*

下載所需的 character.json 檔案：

```sh
wget https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/kaiaagent.character.json -O ./characters/kaiaagent.character.json
```

## 外掛程式註冊

若要啟用 **Kaia 外掛程式**，請將它新增至您的代理程式設定：

```json
{
    "name": "Kaia AI Dev Agent",
    "plugins": ["@elizaos-plugins/plugin-kaia"]
}
```

此外，執行以下指令將外掛程式加入您的 `package.json` 中：

```bash
npx elizaos plugins install @elizaos-plugins/plugin-kaia
```

```json
{
    "dependencies": {
        "@elizaos-plugins/plugin-kaia": "github:kaiachain/kaia-eliza-plugin"
    }
}
```

## 建立與啟動 Eliza

```sh
pnpm build
pnpm start --character="./characters/kaiaagent.character.json"
```

## 執行 Eliza 用戶端使用者介面

開啟另一個終端並執行：

```sh
pnpm run start:client
```

一旦使用者介面準備就緒，應該可以在 **http://localhost:5173** 上取得。

:::note
確保與設定的私密金鑰相關的帳號有足夠資金在 **Kaia Testnet** 或 **Mainnet** 上執行鏈上交易。 測試代用幣可向 [Kaia Faucet](https://faucet.kaia.io) 索取。
:::

## 示範

[觀看 Kaia Eliza 外掛程式示範](https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/KaiaElizaPluginDemo.mp4)

## 使用範例

### 擷取 KAIA 價格與市場資料

**指令：**

```sh
User: "Give me KAIA information"
```

**回應：**

```sh
Assistant: "KAIA Token info: USD: 0.14, Total Supply: 5,936,109,217, Volume: 63,994,146"
```

### 申請 KAIA 測試代用幣

**指令：**

```sh
User: "Give me some test tokens to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d"
```

**回應：**

```sh
Assistant: "I'll send a few KAIA testnet tokens..."
```

### 發送 KAIA 代幣

**指令：**

```sh
User: "Send 1 KAIA to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos"
```

**回應：**

```sh
Assistant: "I'll send 1 KAIA token now..."
```

### 查詢帳戶資訊

**指令：**

```sh
User: "What's my account overview of 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos?"
```

**回應：**

```sh
Assistant: "Your account overview details: Account Type: EOA, Balance: 10, Total Transactions: 12"
```

### 檢查最新區塊資訊

**指令：**

```sh
User: "What is the latest block number of Kaia?"
```

**回應：**

```sh
Assistant: "The latest block number for Kaia is 176629207"
```

## 參與

我們歡迎開發人員社群的貢獻。 若要探索更多關於 Kaia 區塊鏈的資訊，請造訪：

- [Kaia Documentation](https://docs.kaia.io/)
- [Kaia 開發者入口網站](https://www.kaia.io/developers)
- [KaiaScan Explorer](https://kaiascan.io)
- [KaiaScan API Docs](https://docs.kaiascan.io/)
- [Kaia Github Repository](https://github.com/kaiachain)

## 總結

**Kaia Eliza Plugin** 與 **ElizaOS AI 代理框架**無縫整合，可與 **Kaia Mainnet** 和 **Kairos Testnet** 進行智慧且有效率的互動。 憑藉其強大的錢包、交易和代幣管理功能，它可讓開發人員建立更聰明、反應更迅速的分散式應用程式，同時簡化區塊鏈互動。

準備好增強您的 AI 驅動的區塊鏈體驗了嗎？ 立即將 Kaia 外掛程式整合至 **ElizaOS** 並開啟新的可能性！