---
sidebar_label: Using Hardhat
---

# How to Verify Smart Contracts Using Hardhat

This guide allows you to automatically verify your smart contracts' source code on Klaytnscope straight from your CLI using the Hardhat Verify Plugin.

To verify your contract on klaytn, you need to add the following configuration to your `hardhat.config.js`:

## Mainnet

```
module.exports = {
  networks: {
    kaia: {
      chainId: 8217,
      url: "RPC_URL",
    },
  },
  etherscan: {
    apiKey: {
      kaia: "unnecessary",
    },
    customChains: [
      {
        network: "kaia",
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

To verify the contract, you will run the verify command and pass in the address of the deployed contract, network and parameters if any.

```bash
npx hardhat verify –network <network> <deployed_address> <parameters>

// example

npx hardhat verify --network kairos 0x131b54E65c99d34BCA738F29051fDAceEa91C969 1000000000000000
```

In your terminal you should see the source code for your contract was successfully submitted for verification. If the verification was successful, you should see Successfully verified contract and there will be a link to the contract code on [Kaiascope](https://kairos.kaiascope.com/account/0x131b54E65c99d34BCA738F29051fDAceEa91C969?tabId=contractCode).

![](/img/build/smart-contracts/verify/terminal-hh-verify-ss.png)

![](/img/build/smart-contracts/verify/scope-hh-verify-ss.png)

## Useful links

- [Configuration for Hardhat Verify Plugin](https://docs.klaytnscope.com/contract/configuration-for-hardhat-verify-plugin)
- [Verifying contracts using Hardhat on Klaytnscope](https://klaytn.foundation/verifying-contracts-using-hardhat-on-klaytnscope)
