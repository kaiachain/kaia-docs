# Truffle

## Compatibility with Truffle <a id="compatibility-with-truffle"></a>

In Klaytn, a smart contract written in Solidity can be compiled and deployed via Truffle. At the moment, Klaytn supports up to Truffle v5.0.26, the latest version at the time of writing. Please find details about Truffle on the websites below.

- [Truffle overview](https://trufflesuite.com/docs/truffle/overview)
- [Truffle repository](https://github.com/trufflesuite/truffle)

You can install Truffle as the following:

```text
$ sudo npm install -g truffle
```

If you have a local EN running, you can deploy contracts directly with truffle framework. For more details, refer to this [link](../deploy/ken.md#deploying-a-smart-contract-using-truffle).

If you want to deploy with a remote EN node, you should use [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn).

## Configuring truffle-hdwallet-provider-klaytn <a id="configuring-truffle-hdwallet-provider-klaytn"></a>

truffle-hdwallet-provider-klaytn is a JavaScript HD wallet provider forked from truffle-hdwallet-provider.

Install as the following:

```text
$ nvm use 10
$ yarn install truffle-hdwallet-provider-klaytn@1.0.18
```

```text
$ nvm use 12 # for node v12 and higher
$ yarn install truffle-hdwallet-provider-klaytn@1.4.1
```

Set `truffle-config.js` as below.

### Using a mnemonic <a id="using-a-mnemonic"></a>

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const mnemonic = "mountains supernatural bird ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8551,
      network_id: "*", // Match any network id
    },
    klaytn: {
      provider: () => {
        const mnemonic = JSON.parse(
          fs.readFileSync(path.resolve(__dirname) + "/mnemonics.js")
        );

        return new HDWalletProvider(
          mnemonic,
          "https://public-en-kairos.node.kaia.io",
          0,
          mnemonic.length
        );
      },
      network_id: "1001", //Kaia kairos testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    kasKairos: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "1001" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          mnemonic,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "1001", //Kaia kairos testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          cypressMnemonic,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "8217", //Kaia kairos testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    kairos: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "http://your.baobab.en:8551");
      },
      network_id: "1001", //Kaia kairos testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    cypress: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "http://your.cypress.en:8551");
      },
      network_id: "8217", //Kaia mainnet's network id
      gas: "8500000",
      gasPrice: null,
    },
  },
};
```

### Using a private key <a id="using-a-private-key"></a>

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const privateKey = "0x123 ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8551,
      network_id: "*", // Match any network id
    },
    klaytn: {
      provider: () => {
        const pks = JSON.parse(
          fs.readFileSync(path.resolve(__dirname) + "/privateKeys.js")
        );

        return new HDWalletProvider(
          pks,
          "https://public-en-kairos.node.kaia.io",
          0,
          pks.length
        );
      },
      network_id: "1001", //Kaia kairos testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    kasKairos: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "1001" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          privateKey,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "1001", //Kaia kairos testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          cypressPrivateKey,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "8217", //Kaia kairos testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    kairos: {
      provider: () => {
        return new HDWalletProvider(privateKey, "http://api.baobab.klaytn.net:8651");
      },
      network_id: "1001", //Kaia kairos testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    cypress: {
      provider: () => {
        return new HDWalletProvider(privateKey, "https://public-en-cypress.klaytn.net");
      },
      network_id: "8217", //Kaia mainnet's network id
      gas: "8500000",
      gasPrice: null,
    },
  },
};
```

**WARNING: Be very careful not to expose your mneomonic or private key.**

Deploying on Klaytn :

```bash
$ truffle deploy --network baobab  # testnet
$ truffle deploy --network cypress # mainnet
```

Making transaction on Klaytn :
(using an example from [Truffle Docs quick start - Creating a project](https://www.trufflesuite.com/docs/truffle/quickstart#creating-a-project))

```bash
$ truffle console --network baobab
truffle(baobab)> Migrations.deployed().then(function(instance) {return instance.setCompleted(3)}) // making transaction
{
  tx: '0x734676311194c1ab8e004e2990e414b7b47a9d0a8506682707f5db03fa6dcee0',
  receipt: {
    blockHash: '0xdf9d77ef893a70b3a3f073525cdf5b2ee36620a3ac81815437788e4cf121678d',
    blockNumber: 65284860,
    contractAddress: null,
    from: '0x50c82047a414d2aad88ae67a5f02c311d2d86e69',
    gas: '0x500000',
    gasPrice: '0x5d21dba00',
    gasUsed: 27001,
    input: '0xfdacd5760000000000000000000000000000000000000000000000000000000000000003',
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x1047',
    senderTxHash: '0x734676311194c1ab8e004e2990e414b7b47a9d0a8506682707f5db03fa6dcee0',
    signatures: [ [Object] ],
    status: true,
    to: '0x69527b5f0078ae1757b631af155fa9be21ef6a85',
    transactionHash: '0x734676311194c1ab8e004e2990e414b7b47a9d0a8506682707f5db03fa6dcee0',
    transactionIndex: 0,
    type: 'TxTypeLegacyTransaction',
    typeInt: 0,
    value: '0x0',
    cumulativeGasUsed: undefined,
    rawLogs: []
  },
  logs: []
}

truffle(baobab)> Migrations.deployed().then(function(instance) {return instance.last_completed_migration.call()}) // read public variable
BN { negative: 0, words: [ 3, <1 empty item> ], length: 1, red: null }
```
