# Orakl Network

![](/img/banners/kaia-orakl.png)

## はじめに

[Orakl Network](https://docs.orakl.network)は、スマートコントラクトがオフチェーンのデータやその他のリソースに安全にアクセスできるようにする分散型オラクルネットワークである。データフィード](https://docs.orakl.network/developers-guide/data-feed)、[VRF](https://docs.orakl.network/developers-guide/vrf)、[リクエスト・レスポンス](https://docs.orakl.network/developers-guide/request-response)、[プルーフ・オブ・リザーブ](https://docs.orakl.network/developers-guide/proof-of-reserve)のソリューションを提供するネイティブ・トークン・オラクルであることを誇りとしている。

Orakl Networkを使えば、ユーザーはスマートコントラクトに予測不可能で偏りのないランダム性を供給することができる。 Orakl Networkを使えば、ユーザーはスマートコントラクトに予測不可能で偏りのないランダム性を供給することができる。 Orakl Network [Verifiable Random Function (VRF)](https://docs.orakl.network/developers-guide/vrf#what-is-verifiable-random-function)は、スマートコントラクトが検証可能なランダム値を生成することを可能にし、ランダム性を必要とする様々なdAppsで使用することができる。 オラクルネットワークは、2つの異なるアカウントタイプを通じて、開発者にVRFサービスへのアクセスを提供します：[恒久アカウント](https://docs.orakl.network/developers-guide/readme#permanent-account)または[一時アカウント](https://docs.orakl.network/developers-guide/readme#temporary-account)です。 Orakl Networkは、2つの異なるアカウントタイプを通じて、開発者にVRFサービスへのアクセスを提供します：[恒久アカウント](https://docs.orakl.network/developers-guide/readme#permanent-account)または[一時アカウント](https://docs.orakl.network/developers-guide/readme#temporary-account)です。

このチュートリアルでは、Orakl NetworkのVRF機能を利用して、スマート・コントラクトの内部からランダムな単語をリクエストします。

## 前提条件

- [カイア・ウォレット](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)
- [Remix IDE](https://remix.ethereum.org/)
- [KaiaプラグインをRemixで](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- [Faucet](https://faucet.kaia.io)からKAIAをテストする。

## はじめに

以下のステップでは、Orakl Networkを使ってスマート・コントラクトにランダムな単語を要求する。 始めよう！始めよう！

### ステップ1：契約状態変数の初期化

このステップでは、Cosumerコントラクトを定義し、コントラクト機能に必要なステート変数を初期化する。私たちのコンシューマ契約は `VRFConsumerBase` 契約に依存しており、この契約は `VRFCoordinator` 契約への呼び出しに使用される `IVRFCoordinator` インターフェースに継承されています。次に、ランダムワードの結果を格納する変数 `sRandomWord` と、修飾子 `onlyOwner` の内部で使用する変数 `sOwner` を定義する。

```solidity
pragma solidity ^0.8.16;

import { VRFConsumerBase } from "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import { IVRFCoordinator } from "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";

contract VRFConsumer is VRFConsumerBase {
  uint256 public sRandomWord;
  address private sOwner;

  error OnlyOwner(address notOwner);
  modifier onlyOwner() {
      if (msg.sender != sOwner) {
          revert OnlyOwner(msg.sender);
      }
      _;
  }
```

### ステップ 2：VRF コーディネーターの初期化

スマートコントラクトでランダムな単語を要求するには、[`VRFCoordinator`](https://github.com/Bisonai/orakl/blob/master/contracts-v0.1/src/v0.1/VRFCoordinator.sol) スマートコントラクトを初期化する必要がある。 `VRFCoordinator` インターフェースは、コンストラクタのパラメータで `VRFCoordinator` のアドレスを指定して結合し、ランダムワードのリクエスト (`requestRandomWords`) に使用することを推奨する。 `VRFCoordinator`コントラクトはKaia Kairos [0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499](https://kairos.kaiascan.io/account/0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499)とKaia Mainnet [0x3F247f70DC083A2907B8E76635986fd09AA80EFb](https://www.kaiascan.io/account/0x3F247f70DC083A2907B8E76635986fd09AA80EFb)の両方に配備されている。 `VRFCoordinator` インターフェースは、コンストラクタのパラメータで `VRFCoordinator` のアドレスを指定して結合し、ランダムワードのリクエスト (`requestRandomWords`) に使用することを推奨する。 `VRFCoordinator`コントラクトはKaia Kairos [0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499](https://kairos.kaiascan.io/account/0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499)とKaia Mainnet [0x3F247f70DC083A2907B8E76635986fd09AA80EFb](https://www.kaiascan.io/account/0x3F247f70DC083A2907B8E76635986fd09AA80EFb)の両方に配備されている。

```solidity
  IVRFCoordinator COORDINATOR;

  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = IVRFCoordinator(coordinator);
      sOwner = msg.sender;
  }
```

### ステップ 3: 一時的なアカウントでランダムワードをリクエストする

一時的なアカウントでランダムな単語をリクエストするには、ユーザーはvalueプロパティを使用したコールとともに $KAIA。

```solidity
  function requestRandomWordsDirect(
      bytes32 keyHash,
      uint32 callbackGasLimit,
      uint32 numWords,
      address refundRecipient
  )
      public
      payable
      onlyOwner
      returns (uint256 requestId)
  {
    requestId = COORDINATOR.requestRandomWords{value: msg.value}(
      keyHash,
      callbackGasLimit,
      numWords,
      refundRecipient
    );
  }
```

この関数は `COORDINATOR` で定義された関数 `requestRandomWords()` を呼び出し、引数として `keyHash`、`callbackGasLimit`、`numWords` および `refundRecipient` を渡す。 サービスに対する支払いは `msg.value` を通して `COORDINATOR` 契約の `requestRandomWords()` に送られる。 もし支払いが予定より多かった場合、超過分の支払いは `refundRecipient` アドレスに返される。 最終的には、ランダムな単語のリクエストを生成する。 `requestRandomWords`関数の`msg.value`を正確に指定するには、[サービス料金の見積もり方法](https://docs.orakl.network/developers-guide/vrf#get-estimated-service-fee)の説明を参照してください。サービスに対する支払いは `msg.value` を通して `COORDINATOR` 契約の `requestRandomWords()` に送られる。もし支払いが予定より多かった場合、超過分の支払いは `refundRecipient` アドレスに返される。最終的には、ランダムな単語のリクエストを生成する。 `requestRandomWords`関数の`msg.value`を正確に指定するには、[サービス料金の見積もり方法](https://docs.orakl.network/developers-guide/vrf#get-estimated-service-fee)の説明を参照してください。

### ステップ4：ランダムな言葉を満たす

`fulfillRandomWords`関数は、`VRFCoordinator`コントラクトがランダムワードの要求を満たすときに呼び出される。

```solidity
function fulfillRandomWords(
    uint256 /* requestId */,
    uint256[] memory randomWords
)
    internal
    override
{
    // requestId should be checked if it matches the expected request
    // Generate random value between 1 and 50.
    sRandomWord = (randomWords[0] % 50) + 1;
}
```

それでは、Orakl VRFソリューションのコードを手に入れたので、実際に使ってみましょう。

## 実践的な実施

下の例では、ランダムな単語を要求し、その成就を受け取ることができる契約になっている。

### サンプルコードの作成とデプロイ

**Remix IDE**

- Remix IDE](https://remix.ethereum.org/)に移動します。
- ファイルエクスプローラー\*\*タブをクリックし、contractsフォルダに`consumer-vrf.sol`という名前のファイルを新規作成する。
- 新しく作成したファイルに以下のコードを貼り付けます。
- Remixで、**Compile contract**をクリックします。
- プラグインをインストールしたら、左側の「Kaia」タブをクリックします。
- **Environment** > **Injected Provider** - **Kaia Wallet** を選択します。
- **Contract**で、契約を選択します。例えば、`VRFConsumer`である。
- コーディネーター契約アドレス `0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499` (Kairos), `0x3F247f70DC083A2907B8E76635986fd09AA80EFb` (Mainnet) を渡す。
- **Deploy**をクリックします。

**サンプルコード**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {VRFConsumerBase} from "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import {IVRFCoordinator} from "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";

contract VRFConsumer is VRFConsumerBase {
    uint256 public sRandomWord;
    address private sOwner;

    IVRFCoordinator COORDINATOR;

    error OnlyOwner(address notOwner);

    modifier onlyOwner() {
        if (msg.sender != sOwner) {
            revert OnlyOwner(msg.sender);
        }
        _;
    }

    constructor(address coordinator) VRFConsumerBase(coordinator) {
        sOwner = msg.sender;
        COORDINATOR = IVRFCoordinator(coordinator);
    }

    function requestRandomWordsDirect(
        bytes32 keyHash,
        uint32 callbackGasLimit,
        uint32 numWords,
        address refundRecipient
    ) public payable onlyOwner returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords{value: msg.value}(
            keyHash,
            callbackGasLimit,
            numWords,
            refundRecipient
        );
    }

    function fulfillRandomWords(
        uint256 /* requestId */,
        uint256[] memory randomWords
    ) internal override {
        // requestId should be checked if it matches the expected request
        // Generate random value between 1 and 50.
        sRandomWord = (randomWords[0] % 50) + 1;
    }
}
```

![](/img/build/tools/orakl-vrf-deploy.png)

### スマートコントラクトとの対話

はじめにこの関数が正常に実行されるためには、ユーザは前述のようにKAIAを送信し(最低1KAIA)、 `keyHash`、`callbackGasLimit`、`numWords`、`refundRecipient`パラメータを与える必要がある。 `keyHash`パラメータは、誰がリクエストを処理できるかを一意に定義する。 Orakl Network VRFは、Kaiaチェーンごとに1つのキーハッシュを提供します：

- Kairos: `0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c`
- Mainnet: `0x6cff5233743b3c0321a19ae11ab38ae0ddc7ddfe1e91b162fa8bb657488fb157`

残りのパラメーターは、以下のように設定することができる：

- `callbackGasLimit`を`500000`とする、
- `numWords`を`1`、そして
- `refundRecipient`にEOAのアドレスを設定します。

その後、リクエストが満たされると、 `sRandomWord()` 関数を実行することができる。 この `sRandomWord()` 関数はランダムな単語を返す。多田🎉！ ランダムな単語を要求し、スマート・コントラクトで受け取っただけだ。

- **requestRandomWordsDirect()**: Will be sending 1 KLAY to execute this function. 下の画像がそれを示している：

![](/img/build/tools/orakl-vrf-request.png)

- \*\*sRandomWord()\*\*である：VRFCoordinator`がランダムワードの要求を満たすと、そのレスポンスが `sRandomWord`変数に格納される。 レスポンスを得るには、関数`sRandomWord()\`を呼び出す。スマート・コントラクトでランダムな単語を要求するには、まず`requestRandomWordsDirect()`関数を実行しなければならない。 この関数が正常に実行されるためには、ユーザは前述のようにKAIAを送信し(最低1KAIA)、`keyHash`、`callbackGasLimit`、`numWords`、`refundRecipient`パラメータを与える必要がある。 `keyHash\`パラメータは、誰がリクエストを処理できるかを一意に定義する。 Orakl Network VRFは、Kaiaチェーンごとに1つのキーハッシュを提供します：

![](/img/build/tools/orakl-vrf-response.png)

多田🎉！ランダムな単語を要求し、スマート・コントラクトで受け取っただけだ。

## 結論

このチュートリアルでは、Orakl Network VRFソリューションを使用してスマートコントラクトにランダムな単語を生成する方法を学びました。 オラクルネットワークは、データフィード、リクエスト・レスポンス、プルーフ・オブ・リザーブなど、より多くのオラクルサービスを提供する。 オラクルネットワークの詳細および動作については、[オラクルネットワークのドキュメント](https://docs.orakl.network)を参照してください。オラクルネットワークは、データフィード、リクエスト・レスポンス、プルーフ・オブ・リザーブなど、より多くのオラクルサービスを提供する。オラクルネットワークの詳細および動作については、[オラクルネットワークのドキュメント](https://docs.orakl.network)を参照してください。
