---
sidebar_label: 使用硬頭盔
---

# 如何使用 Hardhat 驗證智能合約

本指南允許您使用Hardhat Verify Plugin直接從 CLI 在 Kaiascope 上自動驗證智能合約的源代碼。

要在 klaytn 上驗證您的合同，您需要在`hardhat.config.js`中添加以下配置：

## 主網

```
module.exports = {
  networks：{
    kaia: {
      chainId：8217,
      url："RPC_URL",
    },
  },
  etherscan：{
    apiKey：{
      kaia: "unnecessary",
    },
    customChains：[
      {
        network："kaia",
        chainId：8217,
        urls：{
          apiURL："https://api-cypress.klaytnscope.com/api",
          browserURL："https://kaiascope.com/",
        },
      },
    ]。
  }
}

```

## Kairos

```
module.exports = {
  networks: {
    kairos: {
      chainId: 1001,
      url: "RPC_URL",
    },
  },
  etherscan: {
    apiKey: {
      kairos: "unnecessary",
    },
    customChains: [
      {
        network: "kairos",
        chainId: 1001,
        urls: {
          apiURL: "https://api-baobab.klaytnscope.com/api",
          browserURL: "https://kairos.kaiascope.com",
        },
      },
    ]
  }
}
```

要驗證合同，您需要運行驗證命令，並輸入已部署合同的地址、網絡和參數（如有） 。

```bash
npx hardhat verify -network<network> <deployed_address> <parameters>

// example

npx hardhat verify --network kairos 0x131b54E65c99d34BCA738F29051fDAceEa91C969 1000000000000000
```

在您的終端中，您應該可以看到您的合同源代碼已成功提交驗證。 如果驗證成功，您應看到 "成功驗證合同"，並在
[Kaiascope] (https://kairos.kaiascope.com/account/0x131b54E65c99d34BCA738F29051fDAceEa91C969?tabId=contractCode) 上有一個指向合同代碼的鏈接。

![](/img/build/smart-contracts/verify/terminal-hh-verify-ss.png)

![](/img/build/smart-contracts/verify/scope-hh-verify-ss.png)

## 實用鏈接

- [Hardhat驗證插件配置](https://docs.klaytnscope.com/contract/configuration-for-hardhat-verify-plugin)
- [在 Kaiascope 上使用 Hardhat 驗證合同](https://klaytn.foundation/verifying-contracts-using-hardhat-on-klaytnscope)
