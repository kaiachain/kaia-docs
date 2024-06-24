# Truffle

## Truffle과의 호환성 <a id="compatibility-with-truffle"></a>

카이아에서는 Solidity로 작성된 스마트 컨트랙트를 Truffle을 통해 컴파일하고 배포할 수 있습니다. 현재 카이아는 이 글을 쓰는 시점에 최신 버전인 Truffle v5.0.26까지 지원합니다. Truffle에 대한 자세한 내용은 아래 웹사이트에서 확인할 수 있습니다.

- [Truffle 개요](https://trufflesuite.com/docs/truffle/overview)
- [Truffle 저장소](https://github.com/trufflesuite/truffle)

Truffle은 다음과 같이 설치할 수 있습니다:

```text
$ sudo npm install -g truffle
```

로컬 EN을 실행 중인 경우 Truffle 프레임워크를 사용하여 컨트랙트를 직접 배포할 수 있습니다. 자세한 내용은 이 [링크](../deploy/ken.md#deploying-a-smart-contract-using-truffle)를 참조하세요.

원격 EN 노드로 배포하려면 [Truffle 지갑 공급자 카이아](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn)를 사용해야 합니다.

## Truffle-hdwallet-provider-klaytn 구성하기 <a id="configuring-truffle-hdwallet-provider-klaytn"></a>

Truffle-hdwallet-provider-klaytn은 truffle-hdwallet-provider에서 포크된 JavaScript HD 지갑 공급자입니다.

다음과 같이 설치합니다:

```text
$ nvm use 10
$ yarn install truffle-hdwallet-provider-klaytn@1.0.18
```

```text
$ nvm use 12 # for node v12 and higher
$ yarn install truffle-hdwallet-provider-klaytn@1.4.1
```

`Truffle-config.js`를 아래와 같이 설정합니다.

### 니모닉 사용 <a id="using-a-mnemonic"></a>

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
          "https://public-en-baobab.klaytn.net",
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

### 개인 키 사용 <a id="using-a-private-key"></a>

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
          "https://public-en-baobab.klaytn.net",
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

**경고: 니모닉 또는 개인 키가 노출되지 않도록 각별히 주의하세요.**

카이아에 배포하기

```bash
$ truffle deploy --network kairos  # testnet
$ truffle deploy --network cypress # mainnet
```

카이아에서 트랜잭션 만들기 :
([Truffle 문서 빠른 시작 - 프로젝트 생성하기](https://www.trufflesuite.com/docs/truffle/quickstart#creating-a-project)의 예제 사용)

```bash
$ truffle console --network kairos
truffle(kairos)> Migrations.deployed().then(function(instance) {return instance.setCompleted(3)}) // making transaction
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

truffle(kairos)> Migrations.deployed().then(function(instance) {return instance.last_completed_migration.call()}) // read public variable
BN { negative: 0, words: [ 3, <1 empty item> ], length: 1, red: null }
```
