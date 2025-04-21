# 開始使用 Semaphore

[Semaphore](https://github.com/semaphore-protocol/semaphore/tree/main) 可讓使用者使用零知識證明匿名參與分散式應用程式。 對於此 dApp，Semaphore 可確保使用者在不洩露身份的情況下提交調查問卷回覆。

**Semaphore 功能**：

- _匿名_：使用者可以在不暴露個人詳細資料的情況下提交答案。
- _驗證_：回覆經過驗證，不會與個人聯繫。
- _Anti-Spam_：防止重複提交。

## 設定智慧契約開發環境<a id="set-up-smart-contract-env"></a>

要使用 Hardhat，我們需要設定開發環境並安裝 Hardhat。 讓我們按以下步驟來做：

導覽到專案的根目錄，然後執行下列指令來建立新的 Hardhat 專案。

```bash
mkdir contract
cd contract
npm install --save-dev hardhat
```

執行以下指令，啟動一個範例專案：

```bash
npx hardhat init 
```

在本指南中，您將選擇一個排印稿專案。

:::note
在初始化專案時，您會收到安裝 hardhat-toolbox 外掛程式的提示。 這個外掛綁定了所有常用的套件和 Hardhat 外掛，建議開始使用 Hardhat 開發。
:::

接下來，使用以下命令為Semaphore Solidity合約、`OpenZeppelin合約`和`hardhat-deploy`安裝`@semaphore-protocol/contracts`：

```bash
npm install --save-dev @semaphore-protocol/contracts @openzeppelin/contracts hardhat-deploy
```

然後，您要使用下列設定修改您的 `hardhat.config.ts`：

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

現在我們的開發環 境已經齊備，讓我們開始撰寫調查智慧型契約。