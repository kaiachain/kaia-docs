# カイアチェーン上のセキュアなウォレット管理：開発者のためのクックブック

## はじめに<a id="introduction"></a>

### この料理本が向いている人<a id="who-is-this-cookbook-for"></a>

カイア セキュア ウォレット クックブックへようこそ。 このガイドは、開発者、エンジニア、Kaiaブロックチェーン上で構築するチームのために書かれています。 初めての分散型アプリケーション（dApp）の作成、自動化されたサービスのデプロイ、あるいは国庫の管理など、このクックブックには、セキュリティ第一の考え方で暗号鍵とウォレットを扱うための不可欠なレシピが掲載されている。

### このクックブックの使い方<a id="how-to-use-this-cookbook"></a>

この料理本は、段階的な学習の道筋に沿っている：

- \*\*パート1](create-and-manage-wallets-securely.md#part-1-foundational-concepts--security-principles)\*\*は、あなたが理解する必要があるセキュリティの基礎を確立します。
- \*\*パート2](./create-and-manage-wallets-securely.md#part-2-practical-recipes-for-wallet-management)\*\*は、基本的なシナリオから高度なシナリオまで、実践的なレシピを提供します。

各レシピは、前のセクションのコンセプトに基づいている。 Web3セキュリティは初めてですか？ 第1章](./create-and-manage-wallets-securely.md#chapter-1-the-principles-of-private-key-security)から始めよう。 経験豊富な開発者ですか？ ユースケースに合ったレシピにジャンプ

### 基本理念安全第一<a id="core-philosophy-security-first"></a>

Web3では、"not your keys, not your crypto "というフレーズが基本的な真理である。 開発者にとっては、これはソフトウェア開発ライフサイクルのあらゆる部分に及ぶ。 たった一つの漏洩した鍵が、ユーザーにもプロジェクトにも致命的な損失をもたらす可能性がある。 このガイドの基本理念は、**セキュリティ・ファースト**である。 すべてのレシピと推奨事項は、デフォルトで堅牢で安全なシステムを構築し、攻撃面を最小限に抑え、その日から資産を保護できるように設計されています。

### 前提条件 <a id="prerequisites"></a>

このクックブックを最大限に活用するには、ブロックチェーンの概念（公開鍵／秘密鍵、トランザクション、ガス料金など）を基本的に理解し、コマンドライン・インターフェイスの操作に慣れている必要がある。

## パート1：基礎概念とセキュリティ原則 <a id="part-i-foundational-concept-and-security-principles"></a>

このパートでは、安全な財布管理の背後にある「なぜ」に焦点を当てる。 コードを書く前に必要な核となる知識を確立する。

### 第1章 秘密鍵セキュリティの原則<a id="chapter-1-the-principles-of-private-key-security"></a>

#### 1.1. キー・ペアを理解する：アカウントの核心 <a id="understanding-key-pairs-the-heart-of-your-account"></a>

カイアでは、他のEVM対応チェーンと同様、アカウントはユーザー名とパスワードではない。 これは、**公開鍵**と**秘密鍵**の暗号鍵ペアである。 公開鍵は、あなたの銀行口座番号のようなもので、共有しても安全です。 秘密鍵は、取引やメッセージへの署名など、アカウントからのすべてのアクションを承認する秘密鍵です。 守るべき最も重要な情報なのだ。 あなたの秘密鍵を所有する者は、あなたのアカウントとその資産を完全かつ不可逆的に管理することができます。

#### 1.2. 安全な鍵の生成：カイアのベストプラクティス <a id="secure-key-generation-best-practices-for-kaia"></a>

安全な鍵とは、ランダムに生成された鍵のことである。 あなたのアカウントのセキュリティは、誰かがあなたの秘密鍵を推測することが数学的に不可能であることに依存しています。 鍵の生成には、`ethers-ext` に組み込まれているものや、このガイドで説明するツールのような、十分に検証された標準的な暗号ライブラリを常に使用してください。 これは、秘密鍵のランダム性を著しく低下させ、推測されやすくするためである。

#### 1.3. 安全な鍵保管：ローカル・キーストアからプロダクション・ボールトへ <a id="secure-key-storage-from-local-keystores-to-prodduction-vaults"></a>

秘密鍵をどのように保管するかは、秘密鍵の生成方法と同じくらい重要だ。 秘密鍵を平文ファイルに保存することは、銀行のパスワードを付箋に書いてモニターに貼っておくのと同じことだ。

:::warning
**警告：秘密鍵は決して平文で保存してはならない** `.env`ファイル。 開発には便利だが、.envファイルが誤ってバージョン管理にコミットされ、キーが公開され、即座に資金が盗まれることがよくある。
:::

安全なローカル・ストレージの標準は、**暗号化されたキーストア・ファイル**（JSONキーストアと呼ばれることもある）である。 このファイルにはあなたの秘密鍵が含まれていますが、あなたが選んだ強力なパスワードで暗号化されています。 キーを使用するには、キーストア・ファイルと、それを復号化するためのパスワードをメモリ上に用意する必要がある。 本番システムでは、AWS KMSやGoogle Cloud KMSのような専用の**シークレットマネージャー**を使うのがベストプラクティスだ。

#### 1.4. メモリ内のキーの扱い：ランタイム中のキー露出の最小化 <a id="handling-keys-in-memory-minimizing-exposure-during-runtime"></a>

安全なソースからロードされた場合でも、トランザクションに署名するためには、アプリケーションのメモリ内に秘密鍵が存在しなければならない。 この露出を最小限に抑えることが重要だ。 優れたアプリケーション設計は、キーが可能な限り短い時間メモリに保持され、使用後直ちにクリアされることを保証する。 この料理本のライブラリーとレシピは、この原則に従って作られている。

### 第2章: カイア・ウォレット・エコシステムをナビゲートする <a id="chapter-2-navigating-the-kaia-wallet-ecosystem"></a>

#### 2.1. カイア・ウォレット

[カイア・ウォレット](https://docs.kaia.io/build/tools/wallets/kaia-wallet)は、カイア・エコシステムのためのネイティブ・ブラウザ拡張ウォレットです。 MetaMaskと多くの機能を共有しているが、独自の取引タイプ、手数料委譲取引、ネットワーク特有のアカウントシステムをサポートすることで、Kaiaに最適化されており、ネットワーク上でシームレスなユーザー体験を提供する。 開発者にとっては、その特定の動作とAPIを理解することが、スムーズなdApp統合を構築する鍵となる。

#### 2.2. コールドストレージハードウェア・ウォレットの概要

コールド・ストレージとは、インターネットに接続されていないデバイスに秘密鍵を保管することである。 ハードウェア・ウォレット\*\*は、この目的のために作られた物理的なデバイスである。 接続されたコンピューターに秘密鍵を公開することなく、内部でトランザクションに署名する。 そのため、高価値の資産を保護するためのゴールド・スタンダードとなっている。 このガイドでは、公式にサポートされている[DCENT](https://docs.kaia.io/build/tools/wallets/hardware-wallets/dcent)と[SafePal](https://docs.kaia.io/build/tools/wallets/hardware-wallets/safepal-s1)のハードウェアウォレットに焦点を当てます。

#### 2.3. マルチシグネチャ・ウォレットカイアセーフの紹介

マルチシグネチャ（または「マルチシグ」）ウォレットは、取引を実行する前に複数の秘密鍵が取引を承認することを必要とするスマートコントラクトである。 例えば、2-of-3マルチシグでは、3人の指定所有者のうち2人の承認が必要となる。 これは、単一障害点を防ぐため、チームの資金、財務、重要なスマート・コントラクトの管理を行うための標準である。 [Kaia Safe](https://docs.kaia.io/build/tools/wallets/kaia-safe/use-kaia-safe)はKaiaネットワークにおける主要なマルチシグソリューションです。

## パート2：財布管理の実践レシピ

パート1](./create-and-manage-wallets-securely.md#part-1-foundational-concepts--security-principles)で基本的なセキュリティの原則を理解したので、次はそれを実践してみましょう。 このセクションでは、個々の開発セットアップから始まり、プロダクション・グレードのソリューションまで、実際のシナリオに沿ったステップ・バイ・ステップのガイドを提供します。

**あなたは何を構築します：**。

- FoundryとHardhatの安全な開発環境
- チーム・コラボレーションのためのマルチシグネチャ・トレジャリー・セットアップ
- 様々な種類のウォレットとdAppの統合

### 第3章 個人開発者とdAppsのセットアップ

この章では、開発プロセスにおけるウォレットのセットアップと管理のための実践的なガイドを提供し、コードの最初の行からセキュリティを強調します。

#### 3.1. レシピ初めてのカイア開発財布

カイアを初めてご利用になる場合、またはカイアウォレットを初めて設定する場合は、[ウォレットを始める](./configure-wallet-for-kaia-networks.mdx#configure-kaia-wallet-for-kaia)セクションを参照することをお勧めします。 ウォレットのインストール、アカウントの作成と安全なバックアップ、アカウントの追加、ウォレットへの資金供給など、重要なステップを網羅しています。

#### 3.2. レシピFoundryプロジェクトにおけるアカウントの安全な管理

Foundry](https://book.getfoundry.sh) では、[cast wallet](https://getfoundry.sh/cast/reference/cast-wallet-import) CLI を使って暗号化されたウォレットをインポートできます。 RPC URLのような他の値を暗号化することは現在のところできないが、暗号化された鍵と環境変数を組み合わせることで、安全なセットアップを提供することはできる。

##### ステップ1：Foundryのインストールと初期化

foundryをインストールしていない場合は、ターミナルで以下のコマンドを実行してください：

```bash
curl -L https://foundry.paradigm.xyz | bash
```

次に、以下のコマンドを実行してFoundryプロジェクトを初期化する：

```bash
foundryup
forge init foundry-encrypted
cd foundry-encrypted
```

これで、ファウンドリーのデフォルトテンプレートが入ったフォルダができるはずだ。

##### ステップ 2: ウォレットのインポート

ウォレットをインポートするには、cast wallet CLIを使います。 your-wallet-name\*\*を希望のウォレット名に置き換えて、以下のコマンドを実行するだけです：

```bash
cast wallet import your-wallet-name --interactive
```

秘密鍵を入力した後、暗号化用のパスワードを設定するよう求められます。 暗号化されたキーは、ローカルのキーストアにデフォルトのパス **~/.foundry/keystore** で保存されます。

:::note
interactiveフラグは、秘密鍵が端末の履歴に保存されないようにするために使用する。
:::

![](/img/build/wallets/foundry-cast-interactive.png)

##### ステップ3：環境ファイルの作成とソース

ウォレットを暗号化した後、RPCエンドポイントを安全に保管する必要があります。 FoundryはまだRPC URLのような値の暗号化を提供していないため、.envファイルを使用するのが一般的で、このタイプの秘密値にはより安全な選択です。

プロジェクトのルートディレクトリに `.env` ファイルを作成し、`KAIROS_RPC_URL` を追加する：

```js
KAIROS_RPC_URL=https://responsive-green-emerald.kaia-kairos.quiknode.pro
```

そして、スクリプトを実行する前にそれをロードする：

```bash
source .env
```

###### ステップ4：スクリプトの実行

ウォレットのインポートを完了し、RPCエンドポイントを設定に追加しました。 これでスクリプトを実行し、契約をデプロイする準備ができた。

デフォルトのFoundryテンプレートには、カウンター契約をデプロイするサンプルスクリプトが含まれています。 独自のウォレット名とRPCエンドポイントを使用するように、このスクリプトを修正する必要があります。

forge create\* または _forge script_ のいずれかを使用してスクリプトを実行します、

- をクリックすると、秘密鍵の暗号化に使用したパスワードの入力を求めるプロンプトが端末に表示されます。
- パスワードを入力すると、foundryがスクリプトを実行し、契約を展開します。

###### フォージ・クリエイトの使用

```bash
forge create --rpc-url $KAIROS_RPC_URL src/Counter.sol:Counter --broadcast --account your-wallet-name
```

![](/img/build/wallets/foundry-create-encrypted-secret-deployment.png)

###### 鍛造スクリプトの使用

```bash
forge script script/Counter.s.sol:CounterScript --rpc-url $KAIROS_RPC_URL --account your-wallet-name --broadcast
```

![](/img/build/wallets/foundry-script-encrypted-secret-deployment.png)

おめでとう。 Foundryで暗号化シークレットを構成し、デプロイメントスクリプトで使用することに成功しました。

#### 3.3. レシピハードハットプロジェクトにおけるアカウントの安全な管理

[Hardhat 3](https://hardhat.org/hardhat3-alpha)(現在アルファ版)では、内蔵のシークレットマネージャを使った暗号化されたシークレットを導入しています。 この機能は、秘密鍵やRPC URLのような機密性の高い文字列ベースの秘密や、バージョン管理にコミットされるべきではないAPIキーを安全に保存することをサポートする。

:::note
ハードハット3はアルファ版であり、完全には安定していない可能性がある。 安定版が正式にリリースされるまでは、注意して使用してください。
:::

##### ステップ1：新しいハードハット・プロジェクトの作成

ターミナルで以下のコマンドを実行し、新しいHardhatプロジェクトを作成します。

```bash
mkdir hardhat-encrypted && cd hardhat-encrypted
npm init -y
npx hardhat@next --init
```

:::note
npxコマンドに@nextを追加すると、Hardhatの最新のタグ付きプレリリースがフェッチされます。
:::

プロンプトに対するデフォルトの答えを受け入れる。 その後、プロジェクトのバージョンを確認するためにHardhatバージョンを実行する：

```bash
npx hardhat --version
```

##### ステップ2：暗号化された秘密を設定する

RPC URLを保存するには、以下のコマンドを実行する：

```bash
npx hardhat keystore set KAIROS_RPC_URL
```

![](/img/build/wallets/hh-keystore-rpc.png)

PRIVATE KEYを暗号化して保存するには、以下のコマンドを実行してください：

```bash
npx hardhat keystore set PRIVATE_KEY
```

![](/img/build/wallets/hh-keystore-pk.png)

##### ステップ3：暗号化された秘密の検証

秘密が暗号化されていることを確認するには、以下のコマンドを実行する：

```bash
npx hardhat keystore list
```

暗号化された秘密のリストに `KAIROS_RPC_URL` と `PRIVATE_KEY` が表示されるはずである。

シークレット値を再度取得するには、以下のコマンドを実行する。 復号化するためにマスター・キーを入力するよう促されます。

```bash
npx hardhat keystore get KAIROS_RPC_URL
```

シークレットを設定したら、設定ファイルを更新して、プロジェクト内でシークレットを安全に参照できるようにします。

##### ステップ4：コンフィグでシークレットを参照する

hardhat.config.ts\`を開き、暗号化された秘密を参照するようにnetworksセクションを更新する。 秘密の名前が異なる場合は、それに応じてエントリーを調整してください。

```javascript
import { configVariable } from "hardhat/config";
module.exports = {
  networks: {
    kairos: {
      url: configVariable("KAIROS_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
};
```

これで、暗号化した秘密を平文として公開することなく、デプロイスクリプトで使用できるようになりました。

##### ステップ5：展開スクリプトで暗号化された秘密を使用する

以下のコマンドを使用して、**ignition/modules**の`Counter.ts`モジュールを介してコントラクトをデプロイします。 このモジュールは `Counter.sol` をデプロイし、値 5 で `incBy` 関数を呼び出す。

```bash
npx hardhat ignition deploy --network kairos ignition/modules/Counter.ts
```

コマンドを実行すると、Hardhatから先に作成したパスワードの入力を求めるプロンプトが表示されます。

これはカイロス・ネットワークがキーストアで構成されているために必要である。 プロンプトが表示されるのは、タスクやスクリプトが暗号化された秘密に依存している場合のみです。 パスワードが入力されると、Hardhatはあなたのコントラクトを展開し、値5で `incBy`関数を実行します。

![](/img/build/wallets/hh-encrypted-secrets-deployment.png)

おめでとう。 Hardhatで暗号化シークレットを構成し、デプロイメントスクリプトで使用することに成功しました。

#### 3.4. レシピハードウェアウォレット（SafePal）をdAppに接続する

このセクションでは、SafePal S1 ハードウェアウォレットをサードパーティの分散型アプリケーション（DApp）に接続し、取引の署名を要求する方法について説明します。

##### ステップ1: Safepal S1ウォレットのセットアップ

DApp に接続する前に、SafePal S1 デバイスが正しく設定されていることを確認してください。 まだの場合は、[このセットアップガイド](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752-How-to-Set-Up-a-S1-Hardware-Wallet)に従ってください。

デバイスがすでに設定されている場合は、この手順を省略できます。

##### ステップ 2: S1 デバイスと SafePal アプリのペアリング

SafePal S1は完全にオフラインのハードウェアウォレットであり、インターネットに直接接続したり、ブロックチェーンネットワークと通信したりすることはできない。 dAppsとやりとりしたり、取引に署名したりするには、デバイスをSafePalアプリとペアリングする必要がある。

SafePalアプリは、ブロックチェーンデータを取得し、トランザクションをブロードキャストし、dAppのやり取りを中継する仲介役として機能する一方で、あなたの秘密鍵がオフラインのS1デバイスに安全に保存されることを保証します。

ペアリングを完了するには、この[ペアリング・ガイド](https://safepalsupport.zendesk.com/hc/en-us/articles/18607468345627--How-to-Pair-the-S1-Pro-Hardware-Wallet-with-the-SafePal-App)に従ってください。

##### ステップ3：dAppに接続する。

このステップでは、WalletConnect を使用して SafePal S1 ハードウェアウォレットを分散型アプリケーション (dApp) に接続します。

このガイドでは、カイアの主要な分散型取引所（DEX）である[DragonSwap](https://dgswap.io)をdAppの例として使用します。 接続は、WalletConnectを使用してブラウザから行われます。

1. ブラウザにdAppのURLを入力してDragonSwap dAppを起動し、ウェブサイトの右上にある**Connect Wallet**ボタンをクリックします。

![](/img/build/wallets/sp-hw-dgswap-cw.png)

2. すべての接続オプションの中から、**Wallet Connect**をクリックします。 画面にQRコードが表示されます。

![](/img/build/wallets/sp-hw-dgswap-wc.png)

3. セーフパルアプリでQRコードを読み取ってください。 アプリのメインページの右上にあるスキャンボタンをクリックすると、スキャンプロセスに入ることができます。

![](/img/build/wallets/sp-hw-dgswap-sp-app-scan.jpg)

4. スキャンに成功したら、アプリでdAppへの接続を確認し、**Agree**をクリックします。

![](/img/build/wallets/sp-hw-dgswap-sp-app-connect.jpg)

5. これでブラウザ上でウォレットとDragonSwap dAppの接続が完了しました！ あなたのウォレットアドレスがDragonSwapのコネクトコンポーネントに表示されるはずです。

![](/img/build/wallets/sp-hw-dgswap-connected.png)

##### ステップ 4: トランザクションの実行

このセクションでは、KAIAとUSDTをスワップして取引を実行します。 Swap](https://dgswap.io/swap/) ページに移動します。

1. スワップ注文を記入し、**スワップ**ボタンをクリックします。 取引を続ける前に、スワップを必ず確認してください。

![](/img/build/wallets/sp-hw-dgswap-trade.png)

2. セーフパルアプリを開くと、取引確認ページが表示されます。 同意する\*\*をクリックして取引を続行します。

![](/img/build/wallets/sp-hw-swap-sp-app-agree.jpg)

3. S1デバイスを開いてQRコードをスキャンし、取引にサインする。

![](/img/build/wallets/sp-hw-swap-sign.jpg)

4. S1デバイスのPINコードを入力し、SafePalアプリで**次へ**をクリックします。

![](/img/build/wallets/sp-hw-swap-pincode.jpg)

5. セーフパルアプリから、S1デバイスに表示されているダイナミックQRコードをスキャンします。 こうすることで、アプリはQRコードに含まれる署名を確実に受け取り、スワップ取引をブロックチェーン（Kaia）にブロードキャストする準備が整う。

![](/img/build/wallets/sp-hw-scan-swap-sp-app.jpg)

6. 署名が完了すると、取引をブロードキャストするポップアップが表示されます。 その後、**Confirm**をクリックしてください。

![](/img/build/wallets/sp-hw-swap-sp-app-broadcast.jpg)

7. お取引が確認されると、以下のように「**Transaction Successful**」のポップアップが表示されます。

![](/img/build/wallets/sp-hw-dgswap-tx-success.png)

![](/img/build/wallets/sp-hw-after-swap-asset-bal.jpg)

おめでとう。 トランザクションの署名に成功し、walletconnect を介して SafePal ハードウェアウォレットを使用してサードパーティ dApp のブロックチェーンにトランザクションをブロードキャストしました。

### 第4章：アドバンス＆プロダクション・グレードのセットアップ

この章では、セキュリティ上のリスクが最も高い本番環境において、資産を保護し、アクションを自動化するためのレシピについて説明する。

#### 4.1. レシピカイア・セーフを使ったマルチシグネチャ・トレジャリーの設定

カイアセーフでは、開発者は複数の所有者が管理できるアカウントを作成でき、セキュリティが大幅に向上する。

多額の資金やプロトコルの権限、所有権の管理には、決して通常のウォレットを使うべきではありません。 基本的な財布のセキュリティの失敗によって、多くのプロジェクトが危険にさらされてきた。 次の大きなDeFiプロトコルを立ち上げるにせよ、DAOの財務を管理するにせよ、あるいは貴重な資産を保護するにせよ、マルチシグネチャーウォレットは絶対に不可欠です。

このガイドでは、Kaia Safeを使用してKaiaに金庫を作成する方法、金庫の所有者と承認基準を設定する方法、基本的なトランザクションを実行する方法について説明します。

##### 安全な財布を作る

1. カイアセーフアプリ](https://app.safe.global/welcome)をご覧ください。

![](/img/build/wallets/ks-welcome-page-sw.png)

2. \*\*財布をつなぐ カイアセーフのウェブサイトに接続するウォレットタイプを選択します。 このガイドでは、カイア・ウォレットを使用します。

![](/img/build/wallets/ks-connect-wallet-sw.png)

3. **金庫の名前**。 ウォレットを接続した後、**Create Account**をクリックし、Kaia Safeに名前を付けます。

![](/img/build/wallets/ks-add-safe-name.png)

4. **署名者の設定**。 カイアセーフアカウントの取引が承認されるまでに必要な署名者の確認回数を設定します。  グッドプラクティスは、全オーナーの51％を閾値とすることである。例えば、以下に示すように、_3人中2人_、_5人中3人_など。

![](/img/build/wallets/ks-add-signers-sw.png)

5. \*\*カイアセーフのアカウントを導入してください。 カイアセーフのパラメータをすべて入力したら、**Create**をクリックし、カイアセーフのアカウントを作成します。

![](/img/build/wallets/ks-review-create-safe-sw.png)

6. **財布を使ってください。 カイアセーフウォレットの使用を開始する**ボタンをクリックします。

![](/img/build/wallets/ks-start-using-wallet-sw.png)

7. **以下のように、Kaia Safeスマートコントラクトウォレットのユーザーインターフェース**にアクセスしてください。

![](/img/build/wallets/ks-safe-ui-sw.png)

カイアセーフのアカウント作成完了おめでとうございます！

##### 基本トランザクションの実行（ネイティブトークンの送信）

このセクションでは、カイアセーフアカウントから受取人アドレスにネイティブトークンKAIAを送信するなどの基本的なトランザクションの実行方法を学びます。

カイアセーフアカウントに十分な資金があることを確認してください。 Safe 口座への [入金](https://docs.kaia.io/build/tools/wallets/kaia-safe/use-kaia-safe/#add-assets) の方法については、このガイドを参照してください。

ステップ1： サイドメニューの**New Transaction**ボタンをクリックし、**Send tokens**を選択して、新しいアセットトランスファーを開始します。

![](/img/build/wallets/ks-new-tx-sw.gif)

ステップ2：譲渡する資産を選択する。 受取人の住所**と送金するKAIAの金額**を入力してください。

![](/img/build/wallets/ks-send-details-sw.gif)

ステップ3：取引を確認し、送信する。 取引は署名者ウォレットで署名する必要があり、確認のしきい値に達すると実行されます。

![](/img/build/wallets/ks-review-send-tx-sw.gif)

#### 4.2. レシピ重要なスマートコントラクトのアクションにKaia Safeを統合する

このガイドでは、スマートコントラクトの管理者としてKaia Safeアカウントを割り当てる方法を学びます。 また、Kaia Safe アカウントを使用して、**setTokenPrice()** や **pause()** などの特権関数を実行し、 承認された署名者のみが特権アクションを実行できるようにする方法も紹介します。

##### 前提条件

- [メタマスク](https://metamask.io/download)
- [リミックスIDE](https://remix.ethereum.org)
- 蛇口](https://faucet.kaia.io)からテスト用KAIAを入手。

##### ステップ1: [Remix IDE](https://remix.ethereum.org/) に移動する。

##### ステップ2：サンプルトークンコントラクトのコンパイルとデプロイ

マルチシグウォレットで特権関数を呼び出す前に、まずコントラクトをデプロイする必要があります。 まず、デプロイ時に新しく作成したKaia Safeアカウントをトークンコントラクトの**initialOwner**に設定します。

![](/img/build/wallets/ks-succor-deploy.gif)

このサンプルトークンコントラクトには、**setTokenPrice()**、\*\*pause()\*\*といった、カイアセーフアカウントからのみ呼び出せる特権関数が含まれています。 次にやりたいことは、これらのアクションを適宜実行することだ。 トランザクションビルダーを使用するか、カイアセーフAPIキットを使用してプログラムでこれを行うことができます。

##### ステップ3：新規取引の開始

###### トランザクションビルダーの使用

安全なウォレットでスマートコントラクトとやり取りするには、**New Transaction**をクリックします。 このステップを完了するには、前のステップで説明したように、すでにデプロイされている契約アドレスとABIが必要です。

![](/img/build/wallets/ks-succor-init-tx.gif)

###### カイアセーフAPIキットの使用

このセクションでは、Kaia Safe API Kit を使用して、**setTokenPrice** 関数を呼び出すトランザクションをプログラマブルに提案し、Safe のアカウント所有者から署名を収集し、トランザクションを実行します。

\*\*前提条件

- [Node.js と npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- 複数の署名者がいる金庫

\*\*環境設定

\*\*ステップ1：プロジェクト・ディレクトリを作成する。

このコマンドをコピーしてターミナルに貼り付け、プロジェクトフォルダを作成する。

```bash
mkdir kaia-safe-api-contract-example
cd kaia-safe-api-contract-example
```

\*\*ステップ2：npmプロジェクトの初期化

このコマンドをターミナルにコピー＆ペーストして、`package.json`ファイルを作成する。

```bash
npm init -y
```

\*\*ステップ3：依存関係をインストールする。

API-Kitの使用方法は、以下のインストールコマンドを実行するだけです：

```bash
npm install --save-dev @safe-global/api-kit@2.4.2 @safe-global/protocol-kit@4.0.2 @safe-global/safe-core-sdk-types@5.0.2
```

```bash
npm install --save-dev ethers dotenv
```

\*\*ステップ4：依存関係をインポートする。

app.js`という名前のファイルを作成する。 このインタラクションのためのコード・スニペットはすべてここにある。
これらの必要なインポートをコピーして、`app.js\`ファイルの先頭に貼り付ける。

```js
import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import "dotenv/config";
```

**ステップ5：セットアップの設定**」。

API-Kitがどのように機能するかを効率的に説明するために、2人以上の署名者を持つSafeアカウントのセットアップを使用する。

以下をコピーして、`app.js`ファイルのimport文の下に貼り付ける：

```js
const RPC_URL = "https://responsive-green-emerald.kaia-kairos.quiknode.pro";
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";
const CONTRACT_ADDRESS = "<REPLACE WITH CONTRACT ADDRESS>";
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER_1 ADDRESS>";
const OWNER_1_PRIVATE_KEY = process.env.OWNER_ONE_PK;
const OWNER_2_PRIVATE_KEY = process.env.OWNER_TWO_PK; // OWNER 2 need not have any test KAIA

```

**ステップ6: 安全な取引の提案、確認、実行**。

このステップでは、Safe API-Kitと複数の所有者を持つSafeアカウントを使用して、スマートコントラクト関数の呼び出しを提案、署名、実行します。 スマート・コントラクトのメソッド\*\*setTokenPrice()**を呼び出すために、あなたのSafeからトランザクションを送信します - しかし、同じ構造は**pause()\*\*のような特権関数にも当てはまります。

以下をコピーして、`app.js`ファイルの初期設定の下に貼り付けます：

```js
// Create interface from ABI
const contractABI = [
  "function pause()",
  "function setTokenPrice(uint256 newPrice)",
];

const iface = new ethers.Interface(contractABI);
// Encode function calls
// const pauseData = iface.encodeFunctionData("pause", []);
const setTokenPriceData = iface.encodeFunctionData("setTokenPrice", [15]);

const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: "https://docs-safe.kaia.io/txs-baobab/api",
});
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS,
});
// 1. Create transaction
const safeTransactionData = {
  to: CONTRACT_ADDRESS,
  value: "0",
  data: setTokenPriceData,
  operation: OperationType.Call,
};

const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData],
});

const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction);
const senderSignature = await protocolKitOwner1.signHash(safeTxHash);
console.log(safeTxHash);

// 2. Propose transaction to the service
const proposeTx = await apiKit.proposeTransaction({
  safeAddress: SAFE_ADDRESS,
  safeTransactionData: safeTransaction.data,
  safeTxHash,
  senderAddress: OWNER_1_ADDRESS,
  senderSignature: senderSignature.data
})

// 3. Confirmation from Owner 2
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// Confirm the Safe transaction
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)

// 4. Execute transaction
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)

```

\*\*フルコード

```javascript

import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import "dotenv/config";

// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = "https://responsive-green-emerald.kaia-kairos.quiknode.pro";
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";
const CONTRACT_ADDRESS = "<REPLACE WITH CONTRACT ADDRESS>";
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER_1 ADDRESS>";
const OWNER_1_PRIVATE_KEY = process.env.OWNER_ONE_PK;
const OWNER_2_PRIVATE_KEY = process.env.OWNER_TWO_PK; // OWNER 2 need not have any test KAIA

// Create interface from ABI
const contractABI = [
  "function pause()",
  "function setTokenPrice(uint256 newPrice)",
];
const iface = new ethers.Interface(contractABI);
// Encode function calls
// const pauseData = iface.encodeFunctionData("pause", []);
const setTokenPriceData = iface.encodeFunctionData("setTokenPrice", [15]);

const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: "https://docs-safe.kaia.io/txs-baobab/api",
});

const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS,
});

// 1. Create transaction
const safeTransactionData = {
  to: CONTRACT_ADDRESS,
  value: "0",
  data: setTokenPriceData,
  operation: OperationType.Call,
};

const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData],
});

const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction);
const senderSignature = await protocolKitOwner1.signHash(safeTxHash);
console.log(safeTxHash);

// 2. Propose transaction to the service
const proposeTx = await apiKit.proposeTransaction({
  safeAddress: SAFE_ADDRESS,
  safeTransactionData: safeTransaction.data,
  safeTxHash,
  senderAddress: OWNER_1_ADDRESS,
  senderSignature: senderSignature.data
})

// 3. Confirmation from Owner 2
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// Confirm the Safe transaction
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)

// 4. Execute transaction
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)

```

このコードは次のような動作を行う：

1. Ethers.Interfaceを使用して、コントラクトABIからインターフェースを作成します。
2. setTokenPrice(uint256)関数コールをエンコードする。
3. Safe API-KitとProtocol-Kitを初期化する。
4. 安全なトランザクションの作成
5. Safe サービスにトランザクションを提案する。
6. セカンド・オーナーとの取引にサインする
7. 取引に必要なすべての署名を確認する
8. セーフからトランザクションを実行する

では、実際にコードを見てみよう。 ターミナルで`node app.js`を実行すると、次のような出力が表示されるはずだ：

```bash
0xfa537bf8282ae36d933c41d867dee1ced93657094efe60c07180a872bb1388fc

Transaction executed:
https://kairos.kaiascan.io/tx/0xad94e0e8fd2d29602825b3815468dedb14221401438a9fbcfdfbeebaec6e52a7
```

これでRemix IDE上で`tokenPrice`が15に設定されているのが確認できるはずです。

![](/img/build/wallets/ks-succor-token-price-remix-display.png)

おめでとう！ カイアセーフAPI-Kitを使用して、カイアセーフアカウントから特権関数を正常に実行しました。

##### ステップ 4: 取引の確認と提出

###### トランザクションビルダーの使用

取引は署名者ウォレットで署名する必要があり、確認のしきい値に達すると実行されます。

![](/img/build/wallets/ks-succor-review-tx.gif)

## 付録

### 付録A：用語集

- **コールド・ストレージ**：秘密鍵をインターネットから物理的に隔離されたデバイスに保管すること。
- **dApp（分散型アプリケーション）**\*：中央サーバーではなく、ブロックチェーンのような分散型ネットワーク上で動作するアプリケーション。
- **暗号化キーストア**：パスワードで暗号化された秘密鍵を含むファイル。
- **ハードウェア・ウォレット**：オフラインで秘密鍵を保管し、内部でトランザクションに署名する物理的なデバイス。
- **マルチシグネチャ(Multi-Sig)**：マルチシグネチャ(Multi-Sig) \*\*：一つの取引を承認するために、複数の独立した秘密鍵からの承認を必要とするタイプのウォレット。
- **秘密鍵**：秘密の英数字の文字列で、所有者は暗号通貨にアクセスし、取引を行うことができる。 決して共有されるべきではない。
- **公開鍵／アドレス**：資金を受け取るために使用される、一般に共有可能な暗号鍵。 秘密鍵に由来する。
- **シード・フレーズ（またはニーモニック・フレーズ）**\*：暗号ウォレット内の全プライベート鍵のマスター・バックアップとして機能する 12～24 語のリスト。

### 付録 B: サンプル環境設定

読者がチュートリアルにうまく従い、本ガイドのコード例を再現できるように、実装時に使用する開発環境の構成例を以下に示す。 互換性の問題を避けるために、ローカルセットアップをこれらのバージョンに合わせることをお勧めします。

**Node.js**

```bash
$ node --version  
v22.14.0  
```

\*\*ハードハット

```bash
$ npx hardhat --version  
3.0.0-next.20  
```

**鋳造所（鍛冶場）**」。

```bash
$ forge -V  
forge 1.2.3-stable (a813a2cee7 2025-06-08T15:42:50.507050000Z)  
```

\*\*ネットワーク・エンドポイント

- RPC プロバイダ: https://responsive-green-emerald.kaia-kairos.quiknode.pro
- ターゲットチェーンカイロス・テストネット（チェーンID：1001）
- ブロックエクスプローラー[カイアスカン](https://kairos.kaiascan.io/)