# はじめに

Survey Mini dAppはプライバシーに焦点を当てた分散型アプリケーション（dApp）で、ユーザーは匿名性と透明性を保ちながらアンケートを作成し、参加することができる。 ゼロ知識証明統合のためのSemaphoreのような最先端のツールとLINEの開発者エコシステムを活用することで、このガイドはKaiaブロックチェーン上でアンケートミニdAppを構築し、デプロイするためのすべてのステップを説明します。

この包括的なガイドブックには、以下の内容が記載されている：

- アプリケーションが行うこととその目的。
- 必要なツールと前提条件
- スマート・コントラクト開発環境の構築
- フロントエンドの統合と展開

すぐに始められるように、このチュートリアルのコード全体は[Github](https://github.com/kjeom/ExampleMiniDapp)にあります。 こうすることで、アプリケーションの内部構造を調べながら進むことができる。

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
git clone https://github.com/kjeom/ExampleMiniDapp
```

次に、クローンしたフォルダにディレクトリを変更し、以下のコマンドでnpmを使ってプロジェクトをローカルにインストールする：

```bash
cd ExampleMiniDapp
npm install
```

次に、調査アプリケーションのスマート・コントラクトの内部構造を理解しよう。 次のセクションでは、その仕組みについて説明する。

