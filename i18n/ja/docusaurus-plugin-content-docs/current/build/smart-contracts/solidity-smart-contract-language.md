# Solidity - スマートコントラクト言語

この章では、Solidity で記述された高レベルの概念、開発プロセス、例のみを説明します。 言語の仕様や実装については、以下の[参考文献](#references)をご参照ください。 本章の内容は、[参考文献](#references)に掲載されている様々なウェブサイトに基づいている。

## SolidityとKaia <a id="solidity-and-kaia"></a>

[Solidity](https://github.com/ethereum/solidity) は、イーサリアムプラットフォーム上でスマートコントラクトを実装するための、高レベルの静的型付けされたコントラクト指向言語です。 Solidityはもともとイーサリアム用に設計されたものだが、スマートコントラクトを記述するのに十分な汎用性があるため、Kaiaなど他のブロックチェーンプラットフォームにも使用できる。 Solidityはもともとイーサリアム用に設計されたものだが、スマートコントラクトを記述するのに十分な汎用性があるため、Kaiaなど他のブロックチェーンプラットフォームにも使用できる。

Kaiaは、**ロンドン**のEthereum Virtual Machine (EVM) バージョンと正式に互換性があります。 カイアの他のEVMバージョンとの後方互換性は保証されません。 したがって、Istanbul ターゲットオプションを使用して Solidity コードをコンパイルすることを強く推奨します。 [solcのEVMバージョンの設定方法](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target)をご参照ください。

:::note

v1.7.0プロトコルアップグレード - **Istanbul**ハードフォークアイテムとKaia自身のアイテムを含む互換性のない変更。
It has been enabled from block number `#75,373,312` in case of Baobab network and `#86,816,005` for the Cypress network.

v1.7.3プロトコルアップグレード - **ロンドン**ハードフォークからのベースフィーを含む互換性のない変更。
It has been enabled from block number `#80,295,291` in case of Baobab network and `#86,816,005` for the Cypress network.
It has been enabled from block number `#80,295,291` in case of Baobab network and `#86,816,005` for the Cypress network.

v1.8.0プロトコルアップグレード - **ロンドン**ハードフォークからのベースフィーを含む互換性のない変更。
It has been enabled from block number `#86,513,895` in case of Baobab network and `#86,816,005` for the Cypress network.
It has been enabled from block number `#86,513,895` in case of Baobab network and `#86,816,005` for the Cypress network.

:::

Kaia用のスマートコントラクトを開発する際には、[Remix](https://remix.ethereum.org/)㊦や[Hardhat](https://hardhat.org/docs)㊦などの開発ツールを利用することができます。 KaiaチームはEthereumの開発ツールとKaiaの開発ツール間の互換性を維持するよう努めますが、必要に応じてKaiaスマートコントラクト開発者にこれらのツールの拡張版または更新版を提供することを選択する可能性があります。

スマートコントラクトの開発には、RemixやHardhatを利用するのが便利ですが、Solidityコンパイラは、以下のウェブページに記載されている手順に従ってビルドまたはインストールすることで、ローカルで使用することができます：

- [Solidityコンパイラのインストール](https://docs.soliditylang.org/en/latest/installing-solidity.html)

コマンドラインのSolidityコンパイラーは2つあります：

- _solc_: 高機能コンパイラ
  - Solidity ドキュメント
- solcjs_：solc_のJavascriptバインディング
  - 別プロジェクト[solc-js](https://github.com/ethereum/solc-js)として管理されている。
  - solcjs_のコマンドラインオプションは_solc_のものと互換性がない。

その他、Solidity を使い始めるのに役立つ資料には次のようなものがあります：

- [トップ・ソリディのチュートリアル](https://medium.com/coinmonks/top-solidity-tutorials-4e7adcacced8)

## スマート・コントラクトの書き方<a id="how-to-write-a-smart-contract"></a>

このセクションでは、スマートコントラクトがどのように見え、どのようにコントラクトを書くかを読者に提供するために、Solidityソースコードの例を示します。 ここに含まれるコードは、説明のためだけに提供されるものであり、本番用ではないことに注意されたい。 コード中の(require)`は、その行がSolidityソースファイルに必要であることを意味し、(optional)`は、その行が必ずしも必要でないことを意味します。 記号 `Ln:` は Solidity のコードの一部ではないので、ここでは行番号を表示するためだけに含まれています。 これらの記号は、実際の使用を目的としたソースコードには含めないでください。

```text
L01: pragma solidity 0.5.12;   // (required) version pragma
L02:
L03: import "filename";        // (optional) importing other source files
L04:
L05: // (optional) smart contract definition
L06: contract UserStorage {
L07:    mapping(address => uint) userData;  // state variable
L08:
L09:    function set(uint x) public {
L10:       userData[msg.sender] = x;
L11:    }
L12:
L13:    function get() public view returns (uint) {
L14:       return userData[msg.sender];
L15:    }
L16:
L17:    function getUserData(address user) public view returns (uint) {
L18:       return userData[user];
L19:    }
L20: }
```

したがって、他のプログラミング言語に慣れている人は、このセクションの以下の説明を読み飛ばして、次のセクションに飛んでも構わない。 しかし、コードが何をするのか明確に理解できない人や、Solidityが初めてのプログラミング言語である人のために、以下にソースコードの簡単な説明を記載します： この章では、Solidity で記述された高レベルの概念、開発プロセス、例のみを説明します。 言語の仕様や実装については、以下の[参考文献](#references)をご参照ください。 本章の内容は、[参考文献](#references)に掲載されている様々なウェブサイトに基づいている。

- The portions of the code starting with a double forward slash (`//`) are comments rather than code; they are used to annotate and explain the code.  コンパイラーはコメントを無視する。
- `L01`の`pragma`文は、コンパイラの最小バージョンを示す。
- `L03` の `import` ステートメントは、"`ファイル名`" からすべてのグローバルシンボルをインポートする。 `filename`は実際のファイル名でなければならない。
- `L05` - `L20` は `UserStorage` というスマートコントラクトを定義している。  キーワード `contract` はコントラクト名の前にあり、コードがスマート・コントラクトを表すことを宣言する。  Solidity のコントラクトは、オブジェクト指向言語のクラスに似ています。  各コントラクトには、ステート変数、関数、関数修飾子、イベント、構造体タイプ、enumタイプの宣言を含めることができる。  さらに、契約は他の契約を継承することができる。  サンプルコードには 1 つのコントラクト定義が含まれていますが、1 つの Solidity ファイルには複数のコントラクト定義が含まれている場合があります。
- `L07`では、`userData`はマッピングタイプの状態変数である。  状態変数はコントラクト・ストレージに恒久的に保存される。  状態変数 `userData` は `address` と `uint` 値の対応を保持する。  `address` 型は20バイトのアドレスを保持します（KaiaはEthereumと同様の20バイトのアドレスを使用します）。
- `L09` では、メッセージの送信者の値 `x` を `userData` に保存するパブリック関数 `set` を定義しています。  変数 `msg.sender` は、Solidityで定義された特別な変数であり、メッセージ（つまり、現在のコール）の送信者のアドレスを表します。  `public`というキーワードは、その関数がコントラクト・インターフェースの一部であり、外部からも内部からも呼び出せることを意味する。
- `L13` の `get` 関数と `L17` の `getUserData` 関数は `view` で宣言されている。  これらの宣言には `returns (uint)` が含まれており、これは `uint` 値を返すことを意味している。

Solidity 言語の構文とセマンティクスの詳細については、[Solidity ドキュメント](https://docs.soliditylang.org/) を参照してください。

## コンパイル、デプロイ、実行の方法<a id="how-to-compile-deploy-and-execute"></a>

このセクションでは、スマートコントラクトがどのように見え、どのようにコントラクトを書くかを読者に提供するために、Solidityソースコードの例を示します。 ここに含まれるコードは、説明のためだけに提供されるものであり、本番用ではないことに注意されたい。 コード中の(require)`は、その行がSolidityソースファイルに必要であることを意味し、(optional)`は、その行が必ずしも必要でないことを意味します。 記号 `Ln:` は Solidity のコードの一部ではないので、ここでは行番号を表示するためだけに含まれています。 これらの記号は、実際の使用を目的としたソースコードには含めないでください。 This compiler can produce various outputs, ranging from simple binaries and assembly to an abstract syntax tree (parse tree). 上記のコードを`UserStorage.sol`に保存すると仮定した場合（上記のソースファイルでは `L03` は除外されている）、`UserStorage.sol`をコンパイルする例を以下に示す。

```bash
$ solc --bin UserStorage.sol
```

- このコマンドはコンパイル出力をバイナリ、すなわちバイトコードとして表示する。

```bash
solc -o output --bin --ast --asm UserStorage.sol
```

- コンパイラは、バイナリの(`--bin`)ファイル、抽象構文木の(`--ast`)ファイル、アセンブ リコードの(`--asm`)ファイルを、それぞれ別のファイルとして `output` ディレクトリに生成します。

```bash
solc --optimize --bin UserStorage.sol
```

- より良いパフォーマンスを得るためには、コンパイル時に `--optimize` フラグを使ってオプティマイザを有効にすることができる。

スマート・コントラクトをコンパイル、デプロイ、実行するためのリソースを以下にいくつか挙げる。

- [Solidityコマンドラインコンパイラの使用](https://docs.soliditylang.org/en/latest/using-the-compiler.html)
- [Remixを使った契約のコンパイル](https://remix-ide.readthedocs.io/en/stable/compile.html)
- [リミックスによる取引の実行](https://remix-ide.readthedocs.io/en/stable/run.html)
- [リミックス・ラーネス・チュートリアル](https://remix-ide.readthedocs.io/en/latest/remix_tutorials_learneth.html)

注：このセクションは将来更新される予定です。

## スマートコントラクトのデバッグ<a id="debugging-smart-contracts"></a>

Solidity のコードをデバッグするのは、他のプログラミング言語で書かれたコードをデバッグするよりも難しい。 以下に、Solidity のデバッグに関するリソースをいくつか示します。 以下に、Solidity のデバッグに関するリソースをいくつか示します。

- [Remixによるトランザクションのデバッグ](https://remix-ide.readthedocs.io/en/latest/debugger.html)
- [Remixによるトランザクションのデバッグに関するチュートリアル](https://remix-ide.readthedocs.io/en/latest/tutorial_debug.html)
- [ハードハット・ネットワークによるデバッグ](https://hardhat.org/tutorial/debugging-with-hardhat-network)

注：このセクションは将来更新される予定です。

## スマート・コントラクトのベスト・プラクティス<a id="smart-contract-best-practices"></a>

スマートコントラクトからセキュリティの懸念とコード品質の問題を取り除くには、Solidityプログラミングのベストプラクティスを学び、それに従うことが重要です。 ここでは、Solidityのベストプラクティスのリファレンスを示します。 ここでは、Solidityのベストプラクティスのリファレンスを示します。

- [スマート・コントラクト・セキュリティのベスト・プラクティス](https://github.com/ConsenSys/smart-contract-best-practices)
- [安全なスマート・コントラクト・コードを書くためのベスト・プラクティス](https://www.nethermind.io/blog/best-practices-for-writing-secure-smart-contract-code)

## 参考文献<a id="references"></a>

- [Solidity GitHubページ](https://github.com/ethereum/solidity)
- [Solidity ドキュメント](https://solidity.readthedocs.io/en/latest/index.html)
- [リミックス・ドキュメント](https://remix-ide.readthedocs.io/en/latest/)
- [ハードハット・ドキュメント](https://hardhat.org/docs)
- [Foundry documentation](https://book.getfoundry.sh/)
