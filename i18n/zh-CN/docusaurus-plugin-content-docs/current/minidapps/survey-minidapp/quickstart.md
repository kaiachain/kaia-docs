# Semaphore 入门

[Semaphore](https://github.com/semaphore-protocol/semaphore/tree/main) 使用户能够使用零知识证明匿名参与去中心化应用。 对于这款 dApp，Semaphore 可确保用户在提交调查回复时不会泄露自己的身份。

**桅杆功能**：

- _匿名_：用户在提交答案时不会暴露自己的个人信息。
- _验证_：对回复进行验证，但不将其与个人联系起来。
- _防垃圾邮件_：防止重复提交。

## 设置智能合约开发环境<a id="set-up-smart-contract-env"></a>

要使用 Hardhat，我们需要建立开发环境并安装 Hardhat。 让我们按以下步骤来做：

导航至项目根文件夹，然后运行以下命令创建新的 Hardhat 项目。

```bash
mkdir contract
cd contract
npm install --save-dev hardhat
```

运行下面的命令引导一个示例项目：

```bash
npx hardhat init 
```

在本指南中，您将选择一个排版脚本项目。

:::note
在初始化项目时，系统会提示你安装 hardhat-toolbox 插件。 该插件捆绑了所有常用软件包和 Hardhat 插件，建议在开始使用 Hardhat 进行开发时使用。
:::

接下来，使用以下命令安装用于Semaphore Solidity合约的`@semaphore-protocol/contracts`、`OpenZeppelin合约`和`hardhat-deploy`：

```bash
npm install --save-dev @semaphore-protocol/contracts @openzeppelin/contracts hardhat-deploy
```

然后，您需要用以下配置修改您的 `hardhat.config.ts`：

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

现在，我们的开发环境已经准备就绪，让我们开始编写调查智能合约吧。