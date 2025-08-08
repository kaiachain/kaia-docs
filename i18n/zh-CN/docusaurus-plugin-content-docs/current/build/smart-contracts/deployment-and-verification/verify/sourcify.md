---
sidebar_label: 使用 Sourcify
---

# 如何使用 Sourcify 验证智能合约

[Sourcify](sourcify.dev)是一个 Solidity（智能合约）源代码验证服务，适用于以太坊和与 EVM 兼容的链，如 Kaia。 它的一个独特功能是利用[Solidity 元数据](https://docs.sourcify.dev/docs/metadata/) 文件来["完全验证"](https://docs.sourcify.dev/docs/full-vs-partial-match/) 合同。

在本指南中，我们将了解如何使用 Sourcify 在 Foundry 上验证智能合约。

## 快速开始

本指南希望您对使用 Foundry 开发智能合约有所了解。 请参阅  [Deploy smart contract using Foundry](../deploy/foundry.md) 开始使用。 Foundry 提供对 Sourcify 验证的原生支持--你只需在锻造命令中添加几个标志即可。 要使用 Foundry 与 Sourcify 验证合同，请参阅以下步骤：

## 部署和验证合约：

```bash
## deploy

forge create --rpc-url $KAIROS_RPC_URL --private-key $PRIVATE_KEY src/Counter.sol:Counter --broadcast 
```

![](/img/build/smart-contracts/verify/sourcify-deploy.png)

```bash
## verify an already deployed contract as seen above

forge verify-contract 0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2 src/Counter.sol:Counter --chain-id 1001 --verifier sourcify  --verifier-url https://sourcify.dev/server/ 
```

![](/img/build/smart-contracts/verify/sourcify-verify.png)

您可以在 [此处](https://sourcify.dev/#/lookup/0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2) 查阅已验证的合同

![](/img/build/smart-contracts/verify/sourcify-lookup-verify.png)

## 检查合约是否已验证

```bash
forge verify-check 0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2 --chain-id 1001 --verifier sourcify
```

![](/img/build/smart-contracts/verify/sourcify-verify.png)

## 参考链接

- [源验证器](https://sourcify.dev/#/verifier)
- [使用 Sourcify UI 验证](https://docs.sourcify.dev/docs/how-to-verify/#using-the-ui-legacy)
- [使用 Sourcify 在 Hardhat 上进行验证](https://docs.sourcify.dev/docs/how-to-verify/#hardhat)
- [使用 Sourcify 在 Remix 上进行验证](https://docs.sourcify.dev/docs/how-to-verify/#remix-plugin)
- [Sourcify Playground](https://playground.sourcify.dev/)




