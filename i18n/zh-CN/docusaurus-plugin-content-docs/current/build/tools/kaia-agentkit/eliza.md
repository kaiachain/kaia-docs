# 伊丽莎

## 概述

**Kaia Eliza Plugin**是与**ElizaOS**集成的重要扩展，可实现与**Kaia Mainnet**和**Kairos Testnet**的无缝交互。 该插件提供一套强大的功能，包括 **KAIA 令牌转账、钱包余额查询以及可替换和不可替换令牌（FTs/NFTs）检索**。 它专为开发人员设计，可简化钱包管理并增强Kaia生态系统**ElizaOS框架**内的应用功能。

:::note
Kaia Eliza 插件在引擎盖下使用 Kaia Agent Kit。 这意味着所有链上操作，如发送代币或检查余额，都由 Kaia Agent Kit 安全可靠的工具提供支持。
:::

**主要特点**

- **代币传输**：在钱包之间轻松发送 KAIA 代币。
- **钱包查询**：检索钱包余额和实时 KAIA 价格数据。
- **网络管理**：与 Kaia 区块链无缝互动。
- **区块和交易信息**：详细了解网络上的交易和区块信息。

## 开始使用

### 1. 设置 ElizaOS

```sh
git clone https://github.com/elizaOS/eliza
cd eliza
git checkout $(git describe --tags --abbrev=0)
pnpm install
cp .env.example .env
```

### 2. 配置环境变量

要集成 Kaia 插件，开发人员必须配置环境变量和机密。 插件可通过 **agent.json.secret**或在运行时直接访问这些设置。

现在，配置 `.env` 文件和 `kaiaagent.character.json` 值。

**.env文件：**

```sh
GROK_API_KEY= # GROK API Key
GOOGLE_GENERATIVE_AI_API_KEY= # Gemini API Key
```

:::note
要使用任何**LLM 提供商**，请在 `.env`中配置相关的 API 密钥。 根据提供的密钥，更新字符文件中的 **modelProvider** 设置。
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

提供以下值

- **kaia_evm_private_key**：链上交易需要。
- **kaia_kaiascan_api_key**：可从 [KaiaScan](https://kaiascan.io) 获取。
- **kaia_faucet_amount**：指定请求时要分发的令牌金额。

**配置示例**

下载所需的 character.json 文件：

```sh
wget https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/kaiaagent.character.json -O ./characters/kaiaagent.character.json
```

## 插件注册

要启用 **Kaia 插件**，请将其添加到代理配置中：

```json
{
    "name": "Kaia AI Dev Agent",
    "plugins": ["@elizaos-plugins/plugin-kaia"]
}
```

此外，运行以下命令将插件添加到您的 `package.json` 中：

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

## 构建和启动伊丽莎

```sh
pnpm build
pnpm start --character="./characters/kaiaagent.character.json"
```

## 运行 Eliza 客户端用户界面

打开另一个终端并执行：

```sh
pnpm run start:client
```

一旦用户界面准备就绪，就可以在 **http://localhost:5173** 上使用。

:::note
确保与配置的私人密钥相关联的账户已获得资金，可在 **Kaia Testnet** 或 **Mainnet** 上执行链上交易。 测试令牌可以从 [Kaia Faucet](https://faucet.kaia.io) 申请。
:::

## 演示

[观看 Kaia Eliza 插件演示](https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/KaiaElizaPluginDemo.mp4)

## 使用示例

### 获取 KAIA 的价格和市场数据

**命令：**

```sh
User: "Give me KAIA information"
```

**答复：**

```sh
Assistant: "KAIA Token info: USD: 0.14, Total Supply: 5,936,109,217, Volume: 63,994,146"
```

### 申请 KAIA 测试令牌

**命令：**

```sh
User: "Give me some test tokens to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d"
```

**答复：**

```sh
Assistant: "I'll send a few KAIA testnet tokens..."
```

### 发送 KAIA 令牌

**命令：**

```sh
User: "Send 1 KAIA to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos"
```

**答复：**

```sh
Assistant: "I'll send 1 KAIA token now..."
```

### 查询账户信息

**命令：**

```sh
User: "What's my account overview of 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos?"
```

**答复：**

```sh
Assistant: "Your account overview details: Account Type: EOA, Balance: 10, Total Transactions: 12"
```

### 检查最新的区块信息

**命令：**

```sh
User: "What is the latest block number of Kaia?"
```

**答复：**

```sh
Assistant: "The latest block number for Kaia is 176629207"
```

## 参与其中

我们欢迎开发者社区提供意见和建议。 要了解有关 Kaia 区块链的更多信息，请访问：

- [Kaia Documentation](https://docs.kaia.io/)
- [Kaia Developer Portal](https://www.kaia.io/developers)
- [KaiaScan Explorer](https://kaiascan.io)
- [KaiaScan API Docs](https://docs.kaiascan.io/)
- [Kaia Github Repository](https://github.com/kaiachain)

## 结论

**Kaia Eliza Plugin**与**ElizaOS人工智能代理框架**无缝集成，实现了与**Kaia Mainnet**和**Kairos Testnet**的智能高效互动。 凭借其强大的钱包、交易和代币管理功能，它使开发人员能够构建更智能、反应更灵敏的去中心化应用程序，同时简化区块链交互。

准备好提升您的人工智能驱动区块链体验了吗？ 立即将 Kaia 插件与 **ElizaOS** 集成，开启新的可能性！