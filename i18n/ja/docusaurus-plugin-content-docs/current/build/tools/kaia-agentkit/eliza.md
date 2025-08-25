# イライザ

## 概要

Kaia Eliza Plugin**は、**ElizaOS**との統合に不可欠な拡張機能で、**Kaia Mainnet**および**Kairos Testnet\*\*とのシームレスなインタラクションを可能にします。 このプラグインは、**KAIAトークンの転送、ウォレット残高のクエリー、菌類・非菌類トークン(FTs/NFTs)**の取得を含む、堅牢な機能スイートを提供します。 開発者向けに設計され、ウォレット管理を簡素化し、カイア・エコシステムの**ElizaOSフレームワーク**内のアプリケーション機能を強化します。

:::note
Kaia Eliza PluginはKaia Agent Kitを使用しています。 つまり、トークンの送信や残高の確認など、すべてのオンチェーン・アクションは、カイア・エージェント・キットの安全で信頼性の高いツールによって動かされるということです。
:::

**主な特徴**

 - **トークンの転送**：KAIAトークンをウォレット間で簡単に送信できます。
 - \*\*ウォレットクエリーウォレットの残高とリアルタイムのKAIA価格データを取得します。
 - **ネットワーク管理**：Kaiaブロックチェーンとシームレスに相互作用する。
 - **ブロックと取引情報**：ネットワーク上の取引とブロックに関する詳細な情報にアクセスできます。

## はじめに

### 1. ElizaOSのセットアップ

```sh
git clone https://github.com/elizaOS/eliza
cd eliza
git checkout $(git describe --tags --abbrev=0)
pnpm install
cp .env.example .env
```

### 2. 環境変数の設定

カイア・プラグインを統合するには、開発者は環境変数とシークレットを設定しなければならない。 プラグインは、**agent.json.secret**を通じて、または実行時に直接、これらの設定にアクセスできる。

次に、`.env` ファイルと `kaiaagent.character.json` の値を設定する。

\*\*.envファイル

```sh
GROK_API_KEY= # GROK API Key
GOOGLE_GENERATIVE_AI_API_KEY= # Gemini API Key
```

:::note
任意の**LLMプロバイダー**を使用するには、`.env`で関連するAPIキーを設定する。 提供されたキーに基づいて、キャラクタ・ファイルの**modelProvider**設定を更新する。
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

の値を提供する：

 - **kaia_evm_private_key**：オンチェーン・トランザクションに必要。
 - **kaia_kaiascan_api_key**：KaiaScan](https://kaiascan.io)から取得可能。
 - **kaia_faucet_amount**：リクエスト時に配布するトークンの量を指定します。

\*\*構成例

必要なcharacter.jsonファイルをダウンロードする：

```sh
wget https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/kaiaagent.character.json -O ./characters/kaiaagent.character.json
```

## プラグイン登録

Kaiaプラグイン\*\*を有効にするには、エージェントの設定に追加します：

```json
{
    "name": "Kaia AI Dev Agent",
    "plugins": ["@elizaos-plugins/plugin-kaia"]
}
```

また、以下のコマンドを実行して、`package.json`にプラグインを追加してください：

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

## ビルド＆スタート・エリザ

```sh
pnpm build
pnpm start --character="./characters/kaiaagent.character.json"
```

## ElizaクライアントUIの実行

別のターミナルを開いて実行する：

```sh
pnpm run start:client
```

UIの準備が整えば、\*\*http://localhost:5173\*\*で公開されるはずだ。

:::note
設定された秘密鍵に関連付けられているアカウントが、**Kaia Testnet** または **Mainnet** のいずれかでオンチェーン取引を実行するために資金を供給されていることを確認します。 テストトークンは[Kaia Faucet](https://faucet.kaia.io)からリクエストできる。
:::

## デモ

[カイア・イライザ・プラグインのデモを見る](https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/KaiaElizaPluginDemo.mp4)

## 使用例

### KAIAの価格と市場データを取得する

\*\*コマンド

```sh
User: "Give me KAIA information"
```

**回答：**\*。

```sh
Assistant: "KAIA Token info: USD: 0.14, Total Supply: 5,936,109,217, Volume: 63,994,146"
```

### KAIAテスト・トークンのリクエスト

\*\*コマンド

```sh
User: "Give me some test tokens to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d"
```

**回答：**\*。

```sh
Assistant: "I'll send a few KAIA testnet tokens..."
```

### KAIAトークンを送る

\*\*コマンド

```sh
User: "Send 1 KAIA to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos"
```

**回答：**\*。

```sh
Assistant: "I'll send 1 KAIA token now..."
```

### アカウント情報の照会

\*\*コマンド

```sh
User: "What's my account overview of 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos?"
```

**回答：**\*。

```sh
Assistant: "Your account overview details: Account Type: EOA, Balance: 10, Total Transactions: 12"
```

### 最新ブロック情報

\*\*コマンド

```sh
User: "What is the latest block number of Kaia?"
```

**回答：**\*。

```sh
Assistant: "The latest block number for Kaia is 176629207"
```

## 参加する

開発者コミュニティからの貢献を歓迎する。 カイア・ブロックチェーンの詳細については、こちらをご覧ください：

 - [カイア・ドキュメンテーション](https://docs.kaia.io/)
 - [カイア開発者ポータル](https://www.kaia.io/developers)
 - [カイアスキャンエクスプローラー](https://kaiascan.io)
 - [カイアスキャンAPIドキュメント](https://docs.kaiascan.io/)
 - [カイアGithubリポジトリ](https://github.com/kaiachain)

## 結論

Kaia Eliza Plugin**は、**ElizaOS AIエージェントフレームワーク**とシームレスに統合され、**Kaia Mainnet**および**Kairos Testnet\*\*とのインテリジェントで効率的なインタラクションを可能にします。 強力なウォレット、トランザクション、トークン管理機能により、開発者はブロックチェーンでのやり取りを簡素化しながら、よりスマートで応答性の高い分散型アプリケーションを構築することができます。

AI主導のブロックチェーン体験を強化する準備はできていますか？ 今すぐKaiaプラグインを**ElizaOS**と統合し、新たな可能性を引き出してください！