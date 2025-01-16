# 兄弟サービス・チェーン間の価値移転

このセクションでは、ServiceChainネットワーク間での価値移転を可能にする方法について説明する。
ServiceChainが提供する主な機能であるデータ・アンカリングと価値移転は、それぞれ独立して使用することができる。 つまり、他の機能を使うかどうかに関係なく、データ・アンカーだけを使うことも、バリュー・トランスファーだけを使うこともできる。

As shown in the figure below, if there are two ServiceChains (chainID 1002 and 1004) connected to Baobab, since each servicechain performs data anchoring with Baobab, data anchoring is not required between each other, only value transfer is required.

To transfer value when there is no bridge between two ServiceChains, first transfer value from the ServiceChain (chainID 1002) to baobab (chainID 1001), and then transfer value from baobab (chainID 1001) to the ServiceChain (chainID 1004) again. これは、ServiceChain（chainID1002）からServiceChain（chainID1004）へ一度に直接値転送を行うよりも非効率的である。 そのため、ServiceChain間のブリッジを直接作ることで、効率的に価値を移転することができます。

![](/img/nodes/sc-vt-between-sibling-arch.png)

## 前提条件<a id="prerequisites"></a>

- We assume that you installed two ServiceChains, Each servicechain is connected to the baobab EN. Refer to [Connecting to Baobab](en-scn-connection.md).
- また、[Cross-Chain Value Transfer](value-transfer.md)による価値移転を経験されたものとします。

Repeat [Connecting to Baobab](en-scn-connection.md) as shown in the picture above to additionally install ServiceChain (chianID 1004).

ノードはメインブリッジとサブブリッジをそれぞれ1つずつしか持つことができない。 この例では、説明の便宜上、メインブリッジとサブブリッジの両方をまだ持っていないノードであるSCN-L2-03とSCN-L2-07にブリッジを接続する。

![](/img/nodes/sc-vt-between-sibling-bridge.png)

## ステップ 1: SCN-L2-03 ノードの KNI をチェックする<a id="step-1-check-kni-of-scn-node"></a>

SCN-L2-03のKNIはSCNノードから接続するための情報である。 この値は次のステップで `main-bridges.json` を生成する際に使用される。

```
SCN-L2-03$ kscn attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://...39047242eb86278689...@[::]:50505?discport=0"
```

## ステップ2： main-bridges.jsonの作成<a id="step-2-create-main-bridges-json"></a>

SCN-L2-07 (note: chianID 1004) にログオンし、`~/data` に `main-bridges.json` を作成します。 の後にある`[::]`をENノードのIPアドレスに置き換える。

```
$ echo '["kni://...39047242eb86278689...@192.168.0.3:50505?discport=0"]' > ~/data/main-bridges.json
```

## ステップ 3: SCN の設定と再起動<a id="step-3-configure-scn-then-restart"></a>

SCN-L2-07 ノードのシェルから `kscn-XXXXX-amd64/conf/kscnd.conf` を編集します。 Since each ServiceChain already anchored with the Baobab EN, data anchoring between sibling is not required. そこで、`SC_ANCHORING`を0に設定する。

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1002
...
SC_ANCHORING=0
...
```

SCN-L2-07ノードでkscndを再起動する

```
SCN-L2-07$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-07$ kscnd start
Starting kscnd: OK
```

SCN-L2-07がSCN-L2-03に接続されているかどうかを`subbridge.peers.length`で確認する。

```
SCN-L2-07$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

価値移転の場合、chainID1002に対応する情報をメインブリッジ情報とし、chainID1004に対応する情報をサブブリッジとすれば、「クロスチェーン価値移転」(value-transfer.md)のように兄弟間で価値移転が可能となる。
