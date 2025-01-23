---
sidebar_label: ハードハットの使用
---

# Hardhatを使用してスマートコントラクトを検証する方法

This guide allows you to automatically verify your smart contracts' source code on Klaytnscope straight from your CLI using the Hardhat Verify Plugin.

klaytnでの契約を確認するには、`hardhat.config.js`に以下の設定を追加する必要があります：

## メインネット

```
module.exports = {
  networks: {
    klaytn: {
      chainId: 8217,
      url: "RPC_URL",
    },
  },
  etherscan: {
    apiKey: {
      klaytn: "unnecessary",
    },
    customChains: [
      {
        network: "klaytn",
        chainId: 8217,
        urls: {
          apiURL: "https://api-cypress.klaytnscope.com/api",
          browserURL: "https://kaiascope.com/",
        },
      },
    ]
  }
}

```

## カイロス

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

コントラクトを検証するには、verifyコマンドを実行し、デプロイされたコントラクトのアドレス、ネットワーク、パラメータがあればそれを渡す。

```bash
npx hardhat verify –network <network> <deployed_address> <parameters>

// example

npx hardhat verify --network klaytn 0x131b54E65c99d34BCA738F29051fDAceEa91C969 1000000000000000
```

ターミナルに、契約のソースコードが検証のために正常に送信されたことが表示されるはずです。 検証が成功した場合、[Successfully verified contract]と表示され、[Kaiascope](https://kairos.kaiascope.com/account/0x131b54E65c99d34BCA738F29051fDAceEa91C969?tabId=contractCode)に契約コードへのリンクが表示されます。

![](/img/build/smart-contracts/verify/terminal-hh-verify-ss.png)

![](/img/build/smart-contracts/verify/scope-hh-verify-ss.png)

## お役立ちリンク

- [Hardhat Verifyプラグインの設定](https://docs.klaytnscope.com/contract/configuration-for-hardhat-verify-plugin)
- [Verifying contracts using Hardhat on Klaytnscope](https://klaytn.foundation/verifying-contracts-using-hardhat-on-klaytnscope)
