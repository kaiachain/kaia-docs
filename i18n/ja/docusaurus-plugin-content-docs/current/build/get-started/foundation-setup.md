# ファンデーションのセットアップ

カイアのハイレベルな概要と、ビルドを始めるための必需品を手に入れよう。

## 概要

Kaiaは、スピード、セキュリティ、スケーラビリティのために設計されたEVM互換ブロックチェーンである。 Ethereumツールと完全な互換性を持ち、SolidityスマートコントラクトをサポートするKaia Virtual Machine（KVM）を使用している。 イーサリアムからの移行であれば、既存のコードやワークフローのほとんどが[最小限の変更](../tutorials/migrating-ethereum-app-to-kaia.mdx)で動作する。

カイアのアーキテクチャの詳細については、[カイアでビルドする理由](../../learn/why-kaia.md)と[コンセンサス・メカニズム](../../learn/consensus-mechanism.md)をご覧ください。

## カイアネットワークス

カイアには主に2つのネットワークがある：

- **Kairos Testnet**：テストと開発用 チェーンID: 1001. 実費をかけずに実験するために使う。
- \*\*メインネット本番用。 チェーンID: 8217.

これらのRPCエンドポイントを使ってウォレットやツールを設定します：

- カイロス：https://public-en-kairos.node.kaia.io
- メインネット：https://public-en.node.kaia.io

Kaiascan](https://kaiascan.io/) (メインネット) または [Kairos Kaiascan](https://kairos.kaiascan.io/) のブロックとトランザクションを探索します。

## 開発ツール

Kaiaは、イーサリアムの一般的なツールをサポートし、その機能をいくつか拡張している。 主なリソース

- **SDKs](../../references/sdk/sdk.md)**：ネットワークとの対話には、[ethers-ext](../../references/sdk/ethers-ext/getting-started.md)（ethers.jsの拡張）、[web3js-ext](../../references/sdk/web3js-ext/getting-started.md)などを使用してください。
- **[パブリックRPCエンドポイント](../../references/public-en.md)**：パブリックRPCエンドポイント経由のアクセス。
- **[Solidity](https://github.com/ethereum/solidity)**：Solidityでコントラクトを書く--Kaiaは完全に互換性がある。
- \*\*カイア・コントラクト・ウィザード](https://wizard.kaia.io/)\*\*：スマートコントラクトを起動し、カイアコントラクトについて学ぶためのインタラクティブなジェネレーターです。
- その他のツール[Remix IDE with Kaia Plugin](https://ide.kaia.io/)、[Hardhat](https://v2.hardhat.org/hardhat-runner/docs/getting-started)、[Foundry](https://getfoundry.sh/)、[Thirdweb](https://portal.thirdweb.com/)。