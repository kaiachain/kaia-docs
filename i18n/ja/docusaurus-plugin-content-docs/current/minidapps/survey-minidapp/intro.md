# はじめに

Survey Mini dAppはプライバシーに焦点を当てた分散型アプリケーション（dApp）で、ユーザーは匿名性と透明性を保ちながらアンケートを作成し、参加することができる。ゼロ知識証明統合のためのSemaphoreのような最先端のツールとLINEの開発者エコシステムを活用することで、このガイドはKaiaブロックチェーン上でアンケートミニdAppを構築し、デプロイするためのすべてのステップを説明します。

この包括的なガイドブックには、以下の内容が記載されている：

- アプリケーションが行うこととその目的。
- 必要なツールと前提条件
- スマート・コントラクト開発環境の構築
- フロントエンドの統合と展開

すぐに始められるよう、このチュートリアルのコード全体は [GitHub](https://github.com/kaiachain/kaia-examples/tree/main/minidapps/survey-minidapp) に公開されています。こうすることで、アプリケーションの内部構造を調べながら進むことができる。

## 前提条件<a id="prerequisite"></a>

このアプリケーションをビルドするには、以下のものを用意してください：

1. 技術的知識
   - Solidity](https://www.tutorialspoint.com/solidity/index.htm)を理解していること。
   - JavaScript】(https://www.w3schools.com/js/default.asp)、【React/Next.js】(https://www.w3schools.com/REACT/DEFAULT.ASP)に精通していること。
   - Hardhatのようなスマートコントラクト開発ツールに精通していること。
2. アカウントとツール
   - [LINEデベロッパーアカウント](https://developers.line.biz/en/)。
   - [セマフォ・プロトコルのセットアップ](https://docs.semaphore.pse.dev/getting-started)。
   - Dapp PortalチームからMini Dapp SDKクライアントIDを受け取りました。
3. インストールされている依存関係
   - [Node.jsとnpm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)。

## プロジェクトのセットアップとインストール<a id="project-setup-installation"></a>

プロジェクトのセットアップとインストールを素早く始めるには、以下のコマンドを使ってGithub上のこのプロジェクトをクローンする。

```bash
# clone project
git clone https://github.com/kaiachain/kaia-examples
```

次に、プロジェクトフォルダにディレクトリを切り替え、以下のコマンドを使用して npm を通じてプロジェクトをローカルにインストールします：

```bash
cd kaia-examples/minidapps/survey-minidapp
npm install
```

次に、調査アプリケーションのスマート・コントラクトの内部構造を理解しよう。次のセクションでは、その仕組みについて説明する。

