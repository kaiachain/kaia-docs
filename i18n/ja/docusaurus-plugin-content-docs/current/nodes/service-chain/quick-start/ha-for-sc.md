# 高可用性の設定

ServiceChainでブリッジが1つしか使用されていない場合、そのブリッジが単一障害点となる可能性がある。 これを解決するために、2つ以上のブリッジでHAシステムを構築する方法を説明する。 下図に示すように、少なくとも2組のブリッジが接続されるように構成し、一方のブリッジ接続に問題が発生しても、もう一方のブリッジを介してチェーン間のデータ・アンカリングとバリュー転送が正常に機能するようにする。

![](/img/nodes/sc-ha-arch.png)

## 前提条件<a id="prerequisites"></a>

- ENのメインブリッジとSCNのサブブリッジは接続されている。 If it's not, please refer to [Baobab connection](en-scn-connection.md) to establish the connection.
- This section describes how to add an extra bridge between Baobab and a ServiceChain. 同じように、別のブリッジを追加してHAをセットアップすることもできる。

## ステップ1：EN-SCN間に別のブリッジを追加する<a id="step-1-adding-another-bridge-between-en-scn"></a>

In [Connecting to Baobab](en-scn-connection.md), we assume that the EN and the SCN connected by a bridge as EN-01 and SCN-L2-01, respectively. このセクションでは、EN-02とSCN-L2-02の間にもうひとつブリッジを加える。
同じ手順なので、簡単に説明しよう。

![](/img/nodes/sc-ha-add-bridge.png)

EN-02 をビルドした後、`conf/kend.conf` で `SC_MAIN_BRIDGE` を 1 に設定し、EN-02 上で ken を再起動する。

```console
SC_MAIN_BRIDGE=1
```

EN-02のKNI情報を以下のコマンドで確認する：

```console
EN-02$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://eb8f21df10c6562...25bae@[::]:50505?discport=0"
```

SCN-L2-02 にログインし、EN-02 の KNI で `main-bridges.json` を作成する。 角括弧付きのJSON配列形式であることを確認してください。

```console
SCN-L2-02$ echo '["kni://eb8f21df10c6562...25bae@192.168.0.5:50505?discport=0"]' > ~/data/main-bridges.json
```

SCN-L2-02 のシェル上で、`kscn-XXXXXX-amd64/conf/kscnd.conf` を以下のように編集します。
ブリッジを接続するには、`SC_SUB_BRIDGE`を1に設定する。
`SC_PARENT_CHAIN_ID` is set to Baobob's `chainID` 1001.
SC_ANCHORING_PERIOD\` はアンカリングのトランザクションを親チェーンに送る期間を決めるパラメータである。 In this example, an anchor transaction is submitted to the parent chain (Baobab) for every 10 child blocks.

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

EN-02でkenを再起動すると、下図のようにEN-02とSCN-L2-02の間にブリッジが自動的に接続され、接続された箇所からデータアンカリングが開始されます。

EN-02とSCN-L2-02の間にブリッジを追加すると、以下のようにノード間の接続が確立されます。

![](/img/nodes/sc-ha-before-register.png)

## ステップ2：ブリッジ契約の登録と加入<a id="step-2-registering-and-subscribing-the-bridge-contract"></a>

上図のように、ブリッジ契約はEN-01とSCN-L2-01のみに登録されている。

SCN-L2-02 のコンソールに接続し、ブリッジ登録、ブリッジ加入、トークン登録の API を実行します。 ブリッジとトークン契約は、[Cross-Chain Value Transfer](value-transfer.md)のステップ2で、EN-01とSCN-L2-01でブリッジ契約を展開する際に作成されました。

```
$ kscn attach --datadir ~/data
> subbridge.registerBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.subscribeBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.registerToken("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR", "0xCHILD_TOKEN_ADDR", "0XPARENT_TOKEN_ADDR")
null
```

![](/img/nodes/sc-ha-before-register2.png)

ブリッジ契約では、追加ブリッジに関する情報を更新する必要がある。 [service-chain-value-transfer-example](https://github.com/klaytn/servicechain-value-transfer-examples) の `erc20/erc20-addOperator4HA.js` ファイルに、追加したブリッジの子オペレータと親オペレータの情報を記述し、`node erc20-addOperator4HA.js` を実行する。

```
// register operator
await conf.child.newInstanceBridge.methods.registerOperator("0xCHILD_BRIDGE_ADDR").send({ from: conf.child.sender, gas: 100000000, value: 0 });
await conf.parent.newInstanceBridge.methods.registerOperator("0xPARENT_BRIDGE_ADDR").send({ from: conf.parent.sender, gas: 100000000, value: 0 });
```

複数のブリッジがある場合、閾値を設定することで、より安全に値の伝達を行うことができる。 バリュー・トランスファーは、通常、閾値以上のオペレーターがバリュー・トランスファーを要求した場合にのみ有効にすることができる。 例えば、今回の例のように、ブリッジペアが2つあり、閾値が2に設定されている場合、両方が正常に要求された場合にのみ値転送を行うことができる。 つまり、1つのブリッジが攻撃を受けて異常なリクエストを送信したとしても、それを防ぐことができる。 閾値のデフォルト値は1である。 [service-chain-value-transfer-example](https://github.com/klaytn/servicechain-value-transfer-examples)の`erc20/erc20-addOperator4HA.js`ファイルで、以下のコードをアンコメントして閾値を設定し、ブリッジ契約の閾値を変更するために実行してください。

```
// // set threshold
// await conf.child.newInstanceBridge.methods.setOperatorThreshold(0, "your threshold number").send({ from: conf.child.sender, gas: 100000000, value: 0 });
// await conf.parent.newInstanceBridge.methods.setOperatorThreshold(0, "your threshold number").send({ from: conf.parent.sender, gas: 100000000, value: 0 });
```

登録が完了すると、下図のようにEN-02とSCN-L2-02の両方にブリッジ契約が登録され、HAが構成されます。

![](/img/nodes/sc-ha-after-register.png)

2つ以上のブリッジペアがHA用に接続されている場合、同じブロックに対するデータアンカリングトランザクションは複数回発生し、値移転トランザクションも複数回発生する可能性がある。 つまり、追加料金が必要となる。
