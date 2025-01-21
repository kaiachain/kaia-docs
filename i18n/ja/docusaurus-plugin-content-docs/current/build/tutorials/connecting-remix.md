# RemixをKaiaに接続する

![](/img/banners/kaia-remix.png)

## 概要<a href="#overview" id="overview"></a>

Remixは、Solidityコントラクトを開発するためのブラウザベースのIDE（統合開発環境）です。 このガイドでは、その方法を学ぶことができる：

- Remix IDEで事前に構築されたスマートコントラクトを作成し、アップロードします。
- スマート・コントラクトをコンパイルする。
- Remix IDE用Kaiaプラグインに接続する
- デプロイ環境のセットアップ
- インポートアカウント
- カイア・ウォレットを使ってカイアとリミックスをつなぐ
- MetaMaskを使ってKaiaとRemixを接続
- スマートコントラクトをデプロイする。
- スマート・コントラクトを検証する。

これはカイアとのリミックスをカバーするものだ。 Remixの使い方については、[Remix docs](https://remix-ide.readthedocs.io/en/latest/)または[Remix IDE](https://remix.ethereum.org/)を参照してください。

## Remixでファイルを作成する<a href="#creating-a-file-on-remix" id="creating-a-file-on-remix"></a>

スマート・コントラクトのビルドを開始するには、**File explorer**タブの**contracts**フォルダーにある**New File**アイコンをクリックし、`KaiaGreeter.sol`という名前を付ける。

次に、新しく作成したKaiaGreeter.solファイルに、以下に示すスマート・コントラクトのコードをコピー＆ペーストする。

```sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract KaiaGreeter {
    uint256 totalGreetings;
    constructor() {
        console.log("Yo yo, Welcome to Kaia");
    }
    function greet() public {
        totalGreetings += 1;
        console.log(msg.sender, "says hello kaia!");
    }
    function getTotalGreetings() public view returns (uint256) {
        console.log("We have %d total waves!", totalGreetings);
        return totalGreetings;
    }
}
```

![](/img/build/smart-contracts/remix-create-new-file.png)

## スマート・コントラクトのコンパイル<a href="#compile-smart-contract" id="compile-smart-contract"></a>

契約書をまとめるには、以下のようにする：

- **Solidity Compiler** タブに移動します。
- コンパイラのバージョンを0.8.27に選択
- 自動コンパイル」オプションをオンにする。
- CompileKaiaGreeter.solボタンをクリックして`KaiaGreeter.sol`コントラクトをコンパイルする。
- コンパイルに成功すると、コンパイラ・タブのボタンに緑色のチェックマークが表示されます。

![](/img/build/smart-contracts/remix-compile-contract.png)

## Remix IDEでKaiaプラグインに接続する<a href="#connect-to-kaia-plugin" id="connect-to-kaia-plugin"></a>

RemixのIDE上でKaiaプラグインに接続するには、こちらの[Kaia Plugin for Remix](https://ide.kaia.io/)を使うか、以下のステップに従ってください：

- **Plugin manager**タブに移動します。
- 検索フィールドにKlaytnを入れる
- Klaytnプラグインを有効にします。 Klaytnタブが表示されたら、カイアと対話する準備はできている。

![](/img/build/smart-contracts/remix-plugin-addon.png)

## デプロイ環境の構築 <a href="#setting-up-deployment-env" id="setting-up-deployment-env"></a>

- Klaytnプラグインをクリックします。
- 適切な[環境]を選択します。
- Kairos、Mainnet、Injected Provider - Kaia Wallet、Injected Provider - MetaMaskを選択できます。
  - [カイロス］カイロス・ネットワークに接続
  - [メインネット]：メインネットに接続する
  - [インジェクション・プロバイダー - カイア・ウォレット]：カイア・ウォレットに接続
  - [注入プロバイダ - MetaMask ]：メタマスクに接続する

![](/img/build/smart-contracts/remix-deploy-env.png)

## インポートアカウント<a href="#import-account" id="import-account"></a>

互換性のあるウォレットから秘密鍵またはKeystoreをエクスポートして、ここで使用することができます。

- アカウントの横にあるプラスボタンをクリックします。
- 次に秘密鍵またはキーストアを置く。
- feePayerのキーをインポートすることもできます。 秘密鍵にしか対応していない。

![](/img/build/smart-contracts/remix-import-acc.png)

## カイアウォレットを使ってカイアとリミックスを接続する<a href="#connect-to-kaia-using-kaia-wallet" id="connect-to-kaia-using-kaia-wallet"></a>

- Remix環境]メニューから[インジェクションプロバイダー - Kaia Wallet]を選択します。

![](/img/build/smart-contracts/remix-kw-connect.png)

- カイアウォレットのポップアップが表示されたら、[接続]をクリックします。
- ネットワークに正常に接続されると、接続されたネットワークのチェーンIDとアカウントが表示されます。

## カイアをつなぐ - MetaMaskを使ったリミックス<a href="#connect-to-kaia-using-metamask" id="connect-to-kaia-using-metamask"></a>

- MetaMaskとの接続](./connecting-metamask.mdx)を参照して、KaiaとMetaMaskを接続してください。
- Remix Environmentメニューの[Injected Provider - MetaMask]を選択する。

![](/img/build/smart-contracts/remix-mm-connect.png)

- MetaMaskのポップアップが表示されたら、アカウントをクリックして選択します。
- ネットワークに正常に接続されると、接続されたネットワークのチェーンIDとアカウントが表示されます。

## スマートコントラクトの導入<a href="#deploying-contract" id="deploying-contract"></a>

このセクションでは、Kaia Walletを使ってKaiaGreeter.solコントラクトをデプロイします。 コンパイルセクションでコントラクトをコンパイルしたら、以下のデプロイプロセスに従ってください：

- デプロイメント環境を「Injected Provider - Kaikas Wallet」に設定します。 Remixへのすべての接続プロンプトを確認してください。
- CONTRACTフィールドで展開したい契約を選択します。
- Deployボタンをクリックします。 この場合、Kaia Walletのポップアップが表示され、取引の確認が必要となります。 取引を確認するだけです！

![](/img/build/smart-contracts/remix-deploy-contract.png)

- デプロイされたコントラクトは[Kaiascan](https://kairos.kaiascan.io/)で見ることができ、Remix IDEでテストやデバッグもできます。
