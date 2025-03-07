# Getting Started with Semaphore

[Semaphore](https://github.com/semaphore-protocol/semaphore/tree/main) enables users to participate anonymously in decentralized applications using zero-knowledge proofs. For this dApp, Semaphore ensures users can submit survey responses without revealing their identities.

**Semaphore Features**:

- *Anonymity*: Users can submit answers without exposing their personal details.
- *Verification*: Responses are validated without linking them to individuals.
- *Anti-Spam*: Prevents duplicate submissions.

## Setting Up Smart Contract Development Environment <a id="set-up-smart-contract-env"></a>

To make use of hardhat, we need to set up our development environment and install Hardhat. Let's do this in the following steps:

Navigate to your project's root folder, and then run the following commands to create a new Hardhat project.

```bash
mkdir contract
cd contract
npm install --save-dev hardhat
```

Bootstrap a sample project by running the command below:

```bash
npx hardhat init 
```

For this guide, you'll be selecting a typescript project.

:::note
While initializing the project, you will get a prompt to install the hardhat-toolbox plugin. The plugin bundles all the commonly used packages and Hardhat plugins recommended to start developing with Hardhat.
:::

Next, install `@semaphore-protocol/contracts` for Semaphore Solidity contracts, `OpenZeppelin contracts` and `hardhat-deploy` with the following command:

```bash
npm install --save-dev @semaphore-protocol/contracts @openzeppelin/contracts hardhat-deploy
```
You then want to modify your `hardhat.config.ts` with the following configurations: 

```javascript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    kaia: {
      url: "https://public-en.node.kaia.io",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [
            "0x7eff112dab68890a60c89d69c2ce1ebb115172f6760508ce6c8ea8fe8afe1e20",
            "0xc696ccd259792f2ffb87e0012e4a37ae3526a3224686225af679e3aaa2aeab0d",
          ],
    },
    kairos: {
      url: "https://public-en-kairos.node.kaia.io",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [
            "0x7eff112dab68890a60c89d69c2ce1ebb115172f6760508ce6c8ea8fe8afe1e20",
            "0xc696ccd259792f2ffb87e0012e4a37ae3526a3224686225af679e3aaa2aeab0d",
          ],
    },
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
```
Now that we have our development environment all set, let's get into writing our survey smart contract.