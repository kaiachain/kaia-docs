---
sidebar_label: 使用硬头盔
---

# 如何使用 Hardhat 验证智能合约

本指南允许您使用Hardhat Verify Plugin直接从 CLI 在 Kaiascope 上自动验证智能合约的源代码。

要在 klaytn 上验证您的合同，您需要在`hardhat.config.js`中添加以下配置：

## 主网

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
  networks：{
    kairos: {
      chainId：1001,
      url："RPC_URL",
    },
  },
  etherscan：{
    apiKey：{
      kairos: "unnecessary",
    },
    customChains：[
      {
        network："kairos",
        chainId：1001,
        urls：{
          apiURL："https://api-baobab.klaytnscope.com/api",
          browserURL："https://kairos.kaiascope.com",
        },
      },
    ]。
  }
}
```

要验证合同，您需要运行验证命令，并输入已部署合同的地址、网络和参数（如有） 。

```bash
npx hardhat verify -network<network> <deployed_address> <parameters>

// example

npx hardhat verify --network kairos 0x131b54E65c99d34BCA738F29051fDAceEa91C969 1000000000000000
```

在您的终端中，您应该可以看到您的合同源代码已成功提交验证。 如果验证成功，您应看到 "成功验证合同"，并在 [Kaiascope](https://kairos.kaiascope.com/account/0x131b54E65c99d34BCA738F29051fDAceEa91C969?tabId=contractCode)上有一个指向合同代码的链接。

![](/img/build/smart-contracts/verify/terminal-hh-verify-ss.png)

![](/img/build/smart-contracts/verify/scope-hh-verify-ss.png)

## 实用链接

- [Hardhat验证插件配置](https://docs.klaytnscope.com/contract/configuration-for-hardhat-verify-plugin)
- [在 Kaiascope 上使用 Hardhat 验证合同](https://klaytn.foundation/verifying-contracts-using-hardhat-on-klaytnscope)
