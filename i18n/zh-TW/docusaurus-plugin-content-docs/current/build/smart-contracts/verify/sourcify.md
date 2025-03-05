---
sidebar_label: 使用 Sourcify
---

# 如何使用 Sourcify 驗證智能合約

[Sourcify](sourcify.dev)是一個 Solidity（智能合約）源代碼驗證服務，適用於以太坊和與 EVM 兼容的鏈，如 Kaia。 它的一個獨特功能是利用[Solidity 元數據](https://docs.sourcify.dev/docs/metadata/) 文件來["完全驗證"](https://docs.sourcify.dev/docs/full-vs-partial-match/) 合同。

在本指南中，我們將瞭解如何使用 Sourcify 在 Foundry 上驗證智能合約。

## 快速開始

本指南希望您對使用 Foundry 開發智能合約有所瞭解。 請參閱  [Deploy smart contract using Foundry](../deploy/foundry.md) 開始使用。 Foundry 提供對 Sourcify 驗證的原生支持--你只需在鍛造命令中添加幾個標誌即可。 要使用 Foundry 與 Sourcify 驗證合同，請參閱以下步驟：

## 部署和驗證合約：

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

您可以在 [此處](https://sourcify.dev/#/lookup/0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2) 查閱已驗證的合同

![](/img/build/smart-contracts/verify/sourcify-lookup-verify.png)

## 檢查合約是否已驗證

```bash
forge verify-check 0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2 --chain-id 1001 --verifier sourcify
```

![](/img/build/smart-contracts/verify/sourcify-verify.png)

## 參考鏈接

- [源驗證器](https://sourcify.dev/#/verifier)
- [使用 Sourcify UI 驗證](https://docs.sourcify.dev/docs/how-to-verify/#using-the-ui-legacy)
- [使用 Sourcify 在 Hardhat 上進行驗證](https://docs.sourcify.dev/docs/how-to-verify/#hardhat)
- [使用 Sourcify 在 Remix 上進行驗證](https://docs.sourcify.dev/docs/how-to-verify/#remix-plugin)
- [Sourcify Playground](https://playground.sourcify.dev/)




