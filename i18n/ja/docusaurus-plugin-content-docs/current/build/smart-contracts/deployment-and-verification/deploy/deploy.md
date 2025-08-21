# スマートコントラクトのデプロイ

スマート・コントラクトをカイアにデプロイするには、さまざまな方法がある。 このドキュメントでは、Remix IDEを使用してサンプル契約をデプロイするためのステップバイステップのガイドを提供します。

このガイドでは、アカウント生成に[Kaia Toolkit](https://toolkit.kaia.io/account/)を使用し、生成されたアカウントはRemix Kaia Pluginを介した署名取引に使用されます。

## リミックス・オンラインIDE<a id="remix-ide"></a>

インターネットブラウザを開き、[Kaia Plugin for Remix](https://ide.kaia.io)にアクセスします。

1. 新しいファイルを追加する。

![](/img/build/smart-contracts/d-remix-create.png)

2. 以下のサンプルコード（または配置したいコード）をコピーして、新しいファイルに貼り付けます。 以下のコードは、勝者がプールを取るゲームに2人のプレイヤーが参加できるように設計されたCoinFlipコントラクトです。

```solidity
// SPDX-License-Identifier：MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public player1;
    address public player2;
    uint256 public pool;
    uint256 public winner;
    address public winnerAddress;
    
    event GameStarted(address indexed player1, address indexed player2, uint256 pool);
    event GameFinished(address indexed winnerAddress, string winner, uint256 pool);
    
    function enter() public payable {
        require(msg.value == 0.01 ether, "Must send 0.01 Kaia to enter");
        if (player1 == address(0)) {
            player1 = msg.sender;
        } else {
            require(player2 == address(0), "Both players have already entered");
            player2 = msg.sender;
            emit GameStarted(player1, player2, pool);
        }
        pool += msg.value;
        winner = 0;
        winnerAddress = address(0);
    }
    
    function flipCoin() public {
        require(msg.sender == player1 || msg.sender == player2, "Sender is not a player");
        uint256 result = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, block.coinbase)) % 2;
        winner = result == 0 ?1 : 2;
        winnerAddress = winner == 1 ? player1 : player2;
        string memory winnerName = winner == 1 ? "player1" : "player2";
        emit GameFinished(winnerAddress, winnerName, pool);
        payable(winnerAddress).transfer(pool);
        pool = 0;
        player1 = address(0);
        player2 = address(0);
    }.
}
```

3. アイコンパネルでコンパイラを選択します。 Coinflip.solをコンパイルする]ボタンをクリックし、サンプルコードをコンパイルします。

![](/img/build/smart-contracts/d-remix-compile.png)

4. KaiaプラグインタブでEVM環境を選択します。 このガイドでは、カイロス（テストネット）を選択する。

![](/img/build/smart-contracts/d-remix-env.png)

次に、取引に署名するためのアカウントをインポートする。 カイアと互換性のあるウォレットから秘密鍵をエクスポートするか、カイアツールキットを使って開発者アカウントを生成することができます。 このガイドでは、[Kaia Toolkit](https://toolkit.kaia.io/account) を使用して開発者アカウントを生成します。

5. アカウントの横にあるプラスボタンをクリックしてアカウントをインポートします。

![](/img/build/smart-contracts/d-remix-import-account.png)

:::note
アカウントにスマート・コントラクトのデプロイに必要な十分なKAIAがあることを確認する。 まだテストKAIAをお持ちでない方は、[蛇口](https://faucet.kaia.io/)からテストKAIAを入手してください。
:::

6. ガスリミットと送信する値を設定します。

 - より複雑な契約を展開する場合は、ガス上限を高く設定する必要があるかもしれません。 この例では、そのままでいい。 この例では、そのままのままにしてください。
 - デプロイ時にコントラクトに `KAIA` を送信したくない場合は `Value` を 0 に設定する。

7. デプロイ\*\*ボタンをクリックしてください。

コントラクトが正常にデプロイされると、ターミナルに対応するトランザクションハッシュが表示され、[Kaiascan](https://kairos.kaiascan.io)で確認できます。

![](/img/build/smart-contracts/d-remix-deploy-btn.png)

![](/img/build/smart-contracts/d-remix-txhash.png)

8. 機能ボタンをクリックすることで、契約を操作することができます。

各機能は異なる色で表現されている。 Solidityの `pure` または `view` 関数は青いボトルを持ち (例では `player1`、`player2`、`pool` など)、新しいトランザクションを作成しないので、ガスはかかりません。 赤いボタン（例では`enter`）は、ブロックチェーン上の状態を変更し、ガスを消費し、価値を受け入れることができる`payable`機能を表している。 オレンジ色のボタン（例では `flipCoin`）は、コントラクトの状態を変化させるが、値を受け取らない `non-payable` 関数である。

![](/img/build/smart-contracts/d-remix-deployed.png)

このガイドを最後まで読まれた方、おめでとうございます。 ご質問は[カイアフォーラム](https://devforum.kaia.io/)をご覧ください。 しかし、以下はKaiaでRemix IDEを使ってビルドする際に必要なリソースのリストです。

 - [リミックス・ドキュメント](https://remix-ide.readthedocs.io/en/latest/)