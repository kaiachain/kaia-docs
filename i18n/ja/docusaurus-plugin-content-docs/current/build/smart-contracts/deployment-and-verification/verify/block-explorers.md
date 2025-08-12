---
sidebar_label: ブロック・エクスプローラーを使う
---

# ブロックエクスプローラーを使ったスマートコントラクトの検証方法

## はじめに

通常、スマート・コントラクトのデプロイする者は、実際にデプロイされたコードにアクセスできる唯一の当事者であり、デプロイ者が検証するまで、一般人はコントラクトのソースコードを読むことができない。 コントラクトの検証は、（ユーザーにとっての）透明性、（開発者にとっての）利便性、そしてデプロイされたコントラクトの安全性を向上させるのに役立つからだ。

とはいえ、スマートコントラクトが検証されると、KaiascanやOKX Kaia Explorerのようなブロックエクスプローラーは、ブロックエクスプローラーのユーザーインターフェイスを使って、一般の人がコントラクトのパブリックメソッドと対話することも可能にする。 これは、一般の人々が検証済みの契約ソースコードに直接アクセスできることに加えてのことである。

このガイドでは、ブロックエクスプローラーを使用してKaiaネットワーク上でデプロイされたスマートコントラクトを検証する方法を見ていきます。

## 前提条件

- [Remix IDE](https://ide.kaia.io/) と [Kaia Wallet](https://docs.kaiawallet.io/getting_started/quick_start#install-kaia-wallet)
- [Faucet](https://faucet.kaia.io)から十分なテストKAIA

## はじめに

このガイドでは、Kaiaエコシステムに存在するブロックエクスプローラーで、シングルコントラクトとマルチパートコントラクトの両方を検証する方法を説明する：

- [カイアスカン](https://www.kaiascan.io/)
- [OKLink](https://www.oklink.com/kaia)

さっそく始めよう！

## 単一契約の展開

スマート・コントラクトを検証するには、まずターゲット・ネットワーク上にコントラクトをデプロイする必要がある。 したがって、このガイドでは、Kaia Kairos Testnetにコントラクトをデプロイすることにする。 また、このチュートリアルでは、Remix IDE上に`Counter.sol`というシンプルなカウンターのコントラクトをデプロイする。 コードを以下に示す：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Counter {
    uint256 public count;
    constructor(uint256 _initialCount) {
        count = _initialCount;
    }
    function incrementCounter() public {
        count++;
    }
    function decrementCounter() public {
        count--;
    }
    function resetCounter() public {
        count = 0;
    }
}
```

:::note

Kaia Kairos Testnetの[ライブラリ](../../../../references/sdk/sdk.md)を使用したスマートコントラクトのデプロイに関するチュートリアルは、こちらのページをご覧ください。 スマートコントラクトをKaia Kairos Testnetにデプロイするには、[Hardhat](../../../get-started/hardhat.md)、[Foundry](../../deployment-and-verification/deploy/foundry.md)、[Remix](../../deployment-and-verification/deploy/deploy.md#remix-ide)などの開発者ツールを使用することもできます。

:::

## 単一契約検証のパラメータ

ブロック・エクスプローラーでコントラクトを検証するには、いくつかのパラメータが必要で、スマート・コントラクトをデプロイする際に考慮しなければならない。 以下は、コントラクトをうまく検証するための、コントラクトのコンパイラとデプロイメントに関する詳細である：

Remix IDE :

- Remix IDEで、**Solidityコンパイラタブ**に移動します。

  - 契約のコンパイルとデプロイに使用された**コンパイラのバージョン**を確認してください。
  - 契約で使用されている**オープンソースライセンスの種類**を確認してください。 これは、Solidity ソース ファイルの先頭で使用される SPDX ライセンス識別子を意味します。 `Counter.sol`ファイルでは、`// SPDX-License-Identifier：MIT`
  - コントラクトのデプロイに使用される**EVMバージョン**を確認してください。
  - (オプション）コンパイル時に**最適化**が有効になっている場合、最適化実行パラメータの値に注意する。

  ![](/img/build/tutorials/counter-veri-parameters.png)

- Remix IDEで**Kaiaタブ**に移動します。

  - (オプション) コンストラクタのメソッドが引数を受け付ける場合は、コンストラクタの引数の [ABI エンコード形式](https://docs.soliditylang.org/en/develop/abi-spec.html) に注意してください。
  - デプロイに成功したら、**Deployed Contracts**タブでスマートコントラクトのコントラクトアドレスをメモしてください。

  ![](/img/build/tutorials/counter-veri-parametersII.png)

## マルチパートコントラクトのデプロイ

マルチパートのコントラクトのデプロイメントには、単一のコントラクトのデプロイメントと同じ手順が必要であることに注意することが重要である。 このガイドでは、`airdropToken.sol`という名前のシンプルなKIP7のエアドロップコントラクトをデプロイする。 コードを以下に示す：

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
import "@kaiachain/contracts/access/Ownable.sol";
// the creator of the project mints certian amount of fungible tokens directly to a certain selection of wallets.
contract TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("Token Aidrop Demo", "TAD") {
    }
    // Airdrop Token
    function airdropTokens(address[] calldata wAddresses, uint[] calldata tAmount) public onlyOwner {
        require(wAddresses.length == tAmount.length, "Must be same lenght");
        for (uint256 i = 0; i < wAddresses.length; i++) {
            _mintSingleTokens(wAddresses[i], tAmount[i]);
        }
    }
    function _mintSingleTokens(address wAddress, uint amount) private {
        _mint(wAddress, amount);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
}
```

## マルチパートコントラクト検証のパラメータ

マルチパートコントラクトを検証するためのパラメータは、単一契約の場合と同じである。 しかし、それらは複数の依存するコントラクトで構成されているため、コントラクトのすべての依存関係を単一のsolidityファイルに前処理する必要があります。 この前処理は通常、スマート・コントラクトのフラット化と呼ばれる。

このため、コントラクトをフラット化し、ブロックエクスプローラーで新しいフラット化されたSolidityファイルを使用して検証できるようにする必要があります。

Remix IDE:

- Remix IDEで、**ファイルエクスプローラタブ**に移動します。

  - **contracts**フォルダの下に新しく作成した契約を選択します。
  - 2本指でクリックまたはタップすると、コントラクトで利用可能なすべてのコマンドが表示されます。
  - **flatten**を選択

  ![](/img/build/tutorials/airdropToken-flattened.png)

  - コードが平坦化されると、`airdropTokens_flattened.sol`という名前の新しいコントラクトが表示されます。

  ![](/img/build/tutorials/airdropToken-flattened-file.png)

:::note

マルチパートのスマートコントラクトを単一のSolidityファイルにフラット化するためのさまざまなツールがあります。たとえば、[Hardhat Flattener](https://hardhat.org/hardhat-runner/docs/advanced/flattening)があります。 スマート・コントラクト・フラットニング・ツールの詳細な使用方法については、それぞれのスマート・コントラクト・フラットニング・ツールのドキュメントを参照してください。 スマート・コントラクト・フラットニング・ツールの詳細な使用方法については、それぞれのスマート・コントラクト・フラットニング・ツールのドキュメントを参照してください。

:::

## 契約の確認

検証パラメータをすべて取得したので、このセクションでは、ブロック・エクスプローラ上で単一のスマート・コントラクト（Counter.sol）と複数パートのスマート・コントラクト（airdropTokens.sol）を検証する手順を説明します。

### カイアスカン

To verify a single contract and multi-part contracts on Kaiascan, navigate to the [contract submission request page](https://kairos.kaiascan.io/contracts).

:::note

Kaiascanでの契約の検証は現在ベータ版です。

:::

![](/img/build/tutorials/kaiascan-con-sub-page.png)

#### 単一契約の検証

1. 配置された契約（Counter.sol）の**契約アドレス**を記入してください。
2. `Counter.sol`の例で使用されている**コンパイラのバージョン**を選択してください。
3. `Counter.sol`の例で使用した**オープン・ソース・ライセンス・タイプ**を選択します。 Counter.solの例では、\*\*MIT License (MIT)\*\*を選択してください。 使用されたものがない場合は、\*\*ライセンスなし（None）\*\*を選択する。
4. 必ずRemix IDEから`Counter.sol`をダウンロードし、\*\*Source Code (Solidity File)\*\*フィールドにアップロードしてください。
5. 契約の**EVMバージョン**を選択します。 `Counter.sol`の例では、**Istanbul**を選択する。
6. **最適化**がコンパイル時に有効になっている場合は**True**を選択し、**Optimization Runs**の実行回数を**200**になるように入力します。
7. (オプション) このフィールドのABIエンコードされたコンストラクタ引数を取得するには、[abi.hashex.org](http://abi.hashex.org) にアクセスして、以下の画像に従ってエンコードされたデータを取得します：

![](/img/build/tutorials/abi-hashex.png)

8. Click on the **Sign and Submit** button to confirm and begin verification.

![](/img/build/tutorials/counter-k-verification-page.png)

9. 認証が完了すると、**Submission Successful**というメッセージが表示されます。 これで、エクスプローラーの検索バーに契約書アドレスを貼り付けて、**契約書ソースコード**、**契約書ABI**、**作成コード**および**ABIエンコード値**を表示できる。

> ![](/img/build/tutorials/counter-k-full-verification.png)

#### 複数パート契約の検証

Kaiascanで複数パートにまたがる契約を検証する場合は、単一の契約を検証する場合と同じ手順を踏みます。 ただし、Kaiascan は現在検証用ファイルのアップロードをサポートしていないため、`airdropToken_flattened.sol` ファイルをコピーして **Enter the Solidity Contract Code below** フィールドに貼り付けることに注意してください。 ただし、現在 Kaiascan は検証用のファイル アップロードをサポートしていないため、`airdropToken_flattened.sol` ファイルをコピーして **Enter the Solidity Contract Code below** フィールドに貼り付けることに注意してください。

![](/img/build/tutorials/airdrop-k-verification-page.png)

検証パラメータを入力したら、**Verify and Publish** ボタンをクリックして検証を開始します。 認証が完了すると、認証ページが更新されます。 これで、エクスプローラーの検索バーに契約書のアドレスを貼り付けて、**契約書のソースコード**、**契約書のABI**、**作成コード**を表示できる。

![](/img/build/tutorials/airdrop-k-full-verification.png)

### OKLink

OKLinkで単一契約および複数パート契約を検証するには、[契約検証予備ページ](https://web3.okx.com/explorer/kaia/verify-contract-preliminary)に移動します。

:::note
OKLinkのサポートは今のところKaiaメインネットに限定されているため、契約確認はメインネットのデプロイでのみ利用可能です。
:::

#### 単一契約の検証

1. 配置された契約（Counter.sol）の**契約アドレス**を記入してください。
2. コンパイラの種類\*\*を選択してください。 このガイドでは、\*\*Solidity(SingleFile)\*\*を選択する。
3. Counter.solの例で使用した**コンパイラのバージョン**を選択します：**v0.8.30+commit.73712a01**を選択し、**Next**をクリックします。
4. 契約ソースコード\*\*欄にRemix IDEからCounter.solをアップロードしてください。
5. コンパイル時に有効になっていれば、**Optimization**にTrueを選択し、Optimization Runsに実行回数を200と記入する。
6. Counter.solの例で使用されている**オープン・ソース・ライセンス・タイプ**を選択してください。 Counter.solの例では、\*\*MITライセンス(MIT)\*\*を選択してください。 使用されたものがない場合は、\*\*ライセンスなし（None）\*\*を選択する。
7. 契約の**EVMバージョン**を選択します。 Counter.solの例では、**default**オプションを選択します。
8. Submit\*\*ボタンをクリックして認証を開始します。

![](/img/build/smart-contracts/verify/oklink-sp-verification-params.png)

9. 認証が完了すると、「認証に成功しました」というメッセージが表示されます。

![](/img/build/smart-contracts/verify/oklink-sp-contract-verification-success.png)

これで、エクスプローラーの検索バーにコントラクトのアドレスを貼り付けて、コントラクトのソースコード、コントラクトABI、コントラクトのデプロイメント・ バイトコードを表示できる。

![](/img/build/smart-contracts/verify/oklink-sp-contract-badge.png)

#### 複数パート契約の検証

OKLinkでのマルチパート契約の検証は、単一契約の検証と同じステップを踏む。 ただし、現在OKLinkは検証用ファイルのアップロードをサポートしていないため、**契約ソースコード**欄に`airdropToken_flattened.sol`ファイルをコピー＆ペーストすることに注意してください。

![](/img/build/smart-contracts/verify/oklink-mp-verification-params.png)

検証パラメータを入力後、Submitボタンをクリックして検証を開始します。 認証が完了すると、「認証に成功しました」というメッセージが表示されます。

![](/img/build/smart-contracts/verify/oklink-mp-contract-verification-success.png)

これで、エクスプローラーの検索バーにコントラクトのアドレスを貼り付けて、コントラクトのソースコード、コントラクトABI、コントラクトのデプロイメント・ バイトコードを表示できる。

![](/img/build/smart-contracts/verify/oklink-mp-contract-badge.png)

## 結論

このガイドに従ったことを祝福する！ このチュートリアルでは、KaiascanとOKLinkを使用してコントラクト（シングル・パートとマルチ・パートの両方）を検証し、（ユーザーにとっての）透明性、（開発者にとっての）利便性、およびデプロイされたコントラクトの安全性を高める方法を学びました。 より詳しい情報は[Kaia Docs](https://docs.kaia.io/)を、質問があれば[Kaia Forum](https://devforum.kaia.io/)をご覧ください。