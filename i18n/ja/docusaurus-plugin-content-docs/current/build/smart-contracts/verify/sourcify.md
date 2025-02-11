---
sidebar_label: Sourcifyの使用
---

# Sourcifyを使用してスマートコントラクトを検証する方法

[Sourcify](sourcify.dev)は、イーサリアムとKaiaのようなEVM互換チェーンのためのSolidity（スマートコントラクト）ソースコード検証サービスです。 そのユニークな特徴の 1 つは、[Solidity メタデータ](https://docs.sourcify.dev/docs/metadata/) ファイルを活用してコントラクトを [完全に検証](https://docs.sourcify.dev/docs/full-vs-partial-match/) することです。 そのユニークな特徴の 1 つは、[Solidity メタデータ](https://docs.sourcify.dev/docs/metadata/) ファイルを活用してコントラクトを [完全に検証](https://docs.sourcify.dev/docs/full-vs-partial-match/) することです。

このガイドでは、Sourcifyを使用してFoundry上でスマートコントラクトを検証する方法を見ていきます。

## スタート

このガイドでは、Foundryを使用したスマートコントラクトの開発について理解していることを想定しています。 Foundryを使用したスマートコントラクトのデプロイ](../deploy/foundry.md)をご覧ください。 FoundryはSourcify検証のネイティブサポートを提供しています。必要なのは、forgeコマンドにいくつかのフラグを追加するだけです。 Foundryを使用してSourcifyとの契約を確認するには、以下の手順を参照してください：

## 契約を展開し、検証する：

```bash
/* deploy */

forge create --rpc-url $KAIROS_RPC_URL --private-key $PRIVATE_KEY src/Counter.sol:Counter --broadcast 
```

![](/img/build/smart-contracts/verify/sourcify-deploy.png)

```bash
//* verify an already deployed contract as seen above *//

forge verify-contract 0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2 src/Counter.sol:Counter --chain-id 1001 --verifier sourcify  --verifier-url https://sourcify.dev/server/ 
```

![](/img/build/smart-contracts/verify/sourcify-verify.png)

確認された契約書は[こちら](https://sourcify.dev/#/lookup/0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2)で調べることができる。

![](/img/build/smart-contracts/verify/sourcify-lookup-verify.png)

## 契約が確認されているかどうかをチェックする

```bash
forge verify-check 0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2 --chain-id 1001 --verifier sourcify
```

![](/img/build/smart-contracts/verify/sourcify-verify.png)

## お役立ちリンク

- [ソーシファイの検証者](https://sourcify.dev/#/verifier)
- [Sourcify UI検証の使用](https://docs.sourcify.dev/docs/how-to-verify/#using-the-ui-legacy)
- [Sourcifyを使ったハードハットでの検証](https://docs.sourcify.dev/docs/how-to-verify/#hardhat)
- [Sourcifyを使ったRemixでの検証](https://docs.sourcify.dev/docs/how-to-verify/#remix-plugin)
- [Sourcify Playground](https://playground.sourcify.dev/)
