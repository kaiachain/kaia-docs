# セマフォ入門

[セマフォ](https://github.com/semaphore-protocol/semaphore/tree/main)は、ユーザーがゼロ知識証明を使って分散型アプリケーションに匿名で参加することを可能にする。 このdAppでは、セマフォはユーザーが身元を明かすことなくアンケートの回答を提出できるようにしている。

**セマフォの特徴**：

- _匿名性_：ユーザーは個人情報を明かすことなく回答を提出できます。
- _検証_：回答は個人を特定することなく検証されます。
- \*アンチスパム重複投稿を防ぎます。

## スマートコントラクト開発環境の構築<a id="set-up-smart-contract-env"></a>

ハードハットを利用するには、開発環境を整え、ハードハットをインストールする必要がある。 次のステップでやってみよう：

プロジェクトのルート・フォルダーに移動し、以下のコマンドを実行して新しいHardhatプロジェクトを作成します。

```bash
mkdir contract
cd contract
npm install --save-dev hardhat
```

以下のコマンドを実行して、サンプル・プロジェクトをブートストラップする：

```bash
npx hardhat init 
```

このガイドでは、タイプスクリプトのプロジェクトを選択します。

:::note
プロジェクトの初期化中に、hardhat-toolboxプラグインをインストールするプロンプトが表示されます。 このプラグインは、Hardhatでの開発を開始するために推奨される、一般的に使用されるパッケージとHardhatプラグインをすべてバンドルしています。
:::

次に、Semaphore Solidityコントラクト、OpenZeppelinコントラクト、および `hardhat-deploy` 用の `@semaphore-protocol/contracts` を以下のコマンドでインストールする：

```bash
npm install --save-dev @semaphore-protocol/contracts @openzeppelin/contracts hardhat-deploy
```

次に、`hardhat.config.ts`を以下の設定で変更する：

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

開発環境が整ったので、スマート・コントラクトの作成に取りかかろう。