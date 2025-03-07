# Kaia Eliza Plugin

## Overview

The **Kaia Eliza Plugin** is a vital extension for integrating with **ElizaOS**, enabling seamless interaction with the **Kaia Mainnet** and **Kairos Testnet**. This plugin provides a robust suite of functionalities, including **KAIA token transfers, wallet balance queries, and retrieval of fungible and non-fungible tokens (FTs/NFTs)**. Designed for developers, it simplifies wallet management and enhances application capabilities within the **ElizaOS framework** for the Kaia ecosystem.

**Key Features**

- **Token Transfers**: Effortlessly send KAIA tokens between wallets.
- **Wallet Queries**: Retrieve wallet balances and real-time KAIA price data.
- **Network Management**: Interact seamlessly with the Kaia blockchain.
- **Block & Transaction Information**: Access detailed insights into transactions and blocks on the network.

## Getting Started

### 1. Setup ElizaOS

```sh
git clone https://github.com/elizaOS/eliza
cd eliza
git checkout $(git describe --tags --abbrev=0)
pnpm install
cp .env.example .env
```

### 2. Configuring Environment Variables

To integrate the Kaia plugin, developers must configure environment variables and secrets. The plugin can access these settings through **agent.json.secret** or directly at runtime.

Now, configure the `.env` file and `kaiaagent.character.json` values.

**.env file:**

```sh
GROK_API_KEY= # GROK API Key
GOOGLE_GENERATIVE_AI_API_KEY= # Gemini API Key
```

:::note
To use any **LLM provider**, configure the relevant API keys in `.env`. Based on the key provided, update the **modelProvider** setting in the character file.
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
Provide values for:

- **KAIA_EVM_PRIVATE_KEY**: Required for on-chain transactions.
- **KAIA_KAIASCAN_API_KEY**: Obtainable from [KaiaScan](https://kaiascan.io).
- **KAIA_FAUCET_AMOUNT**: Specifies the token amount to distribute upon request.

**Configuration Example**

Download the required character.json file:

```sh
wget https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/kaiaagent.character.json -O ./characters/kaiaagent.character.json
```

## Plugin Registration

To enable the **Kaia plugin**, add it to your agent’s configuration:

```json
{
    "name": "Kaia AI Dev Agent",
    "plugins": ["@elizaos-plugins/plugin-kaia"]
}
```

Also, run the command below to add the plugin as a dependency in `package.json`:

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

## Build & Start Eliza

```sh
pnpm build
pnpm start --character="./characters/kaiaagent.character.json"
```

## Running the Eliza Client UI

Open another terminal and execute:

```sh
pnpm run start:client
```
Once the UI is ready, it should be available at **http://localhost:5173**.

:::note
Ensure that the account associated with the configured private key is funded to perform on-chain transactions on either the **Kaia Testnet** or **Mainnet**. Test tokens can be requested from the [Kaia Faucet](https://faucet.kaia.io).
:::

## Demo

[Watch the Kaia Eliza Plugin Demo](https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/KaiaElizaPluginDemo.mp4)

## Usage Examples

### Fetch KAIA Price and Market Data

**Command:**

```sh
User: "Give me KAIA information"
```
**Response:**

```sh
Assistant: "KAIA Token info: USD: 0.14, Total Supply: 5,936,109,217, Volume: 63,994,146"
```

### Request KAIA Test Tokens

**Command:**

```sh
User: "Give me some test tokens to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d"
```

**Response:**

```sh
Assistant: "I'll send a few KAIA testnet tokens..."
```

### Send KAIA Tokens

**Command:**

```sh
User: "Send 1 KAIA to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos"
```

**Response:**

```sh
Assistant: "I'll send 1 KAIA token now..."
```

### Query Account Information

**Command:**

```sh
User: "What's my account overview of 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos?"
```

**Response:**

```sh
Assistant: "Your account overview details: Account Type: EOA, Balance: 10, Total Transactions: 12"
```

### Check Latest Block Information

**Command:**

```sh
User: "What is the latest block number of Kaia?"
```

**Response:**

```sh
Assistant: "The latest block number for Kaia is 176629207"
```

## Get Involved

We welcome contributions from the developer community. To explore more about the Kaia blockchain, visit:

- [Kaia Documentation](https://docs.kaia.io/)
- [Kaia Developer Portal](https://www.kaia.io/developers)
- [KaiaScan Explorer](https://kaiascan.io)
- [KaiaScan API Docs](https://docs.kaiascan.io/)
- [Kaia Github Repository](https://github.com/kaiachain)

## Conclusion

The **Kaia Eliza Plugin** seamlessly integrates with the **ElizaOS AI agent framework**, enabling intelligent and efficient interaction with the **Kaia Mainnet** and **Kairos Testnet**. With its powerful wallet, transaction, and token management features, it empowers developers to build smarter, more responsive decentralized applications while simplifying blockchain interactions.

Ready to enhance your AI-driven blockchain experience? Integrate the Kaia plugin with **ElizaOS** today and unlock new possibilities!