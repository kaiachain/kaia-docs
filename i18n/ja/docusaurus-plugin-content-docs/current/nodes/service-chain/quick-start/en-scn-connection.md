# カイロスにつながる

This section covers how to connect your 4-node ServiceChain network to the Baobab network.
You will set up a Baobab EN and connect the EN with one of your SCNs. Then you will enable the anchoring feature to put ServiceChain block information onto the Baobab network.

![](/img/nodes/sc-en-scn-arch.png)

## 前提条件<a id="prerequisites"></a>

- EN用LinuxまたはMacOSサーバー1台
- テストに最低限必要なハードウェア
 - CPU：4コア（Intel Xeonまたは同等）、RAM：16GB、HDD：50GB
 - 詳しくは[動作環境](../system-requirements.md)をご参照ください。
- Download the Baobab EN executable. ダウンロード可能なバイナリの全リストは、[Download](../../downloads/downloads.md) を参照のこと。
- 仮定と限界
 - ServiceChainネットワークがインストールされ、実行されている。 ネットワークのセットアップについては、「4ノードサービスチェーンのセットアップ」(4nodes-setup-guide.md)を参照してください。
 - カイロスEN。
 - 1対1の接続しかサポートされていないため、1つのENは1つのSCNにしか接続できません。
 - すべてのSCNがENに接続する必要はない。

## Step 0: Install Baobab EN <a id="install-baobab-en"></a>

インストールとは、ダウンロードしたパッケージを解凍することである。 EN サーバー上のアーカイブを展開する。

```bash
EN-01$ tar xvf ken-baobab-vX.X.X-XXXXX-amd64.tar.gz
```

## ステップ1：genesis.jsonの準備<a id="step-1-preparing-genesis-json"></a>

ENサーバーから、`Kairos`ネットワーク用の`genesis.json`をダウンロードする。

```
EN-01$ curl -X GET https://packages.kaia.io/kairos/genesis.json -o ~/genesis.json
```

## ステップ 2：EN ノードの初期化<a id="step-2-en-node-initialization"></a>

次に、genesisファイルを使用してENノードを初期化する。 以下のコマンドを実行する。
チェーンデータとログを保存するデータフォルダがホームディレクトリに作成されます。
データフォルダは `--datadir` ディレクティブを使って変更できる。

```
EN-01$ ken init --datadir ~/data ~/genesis.json
```

## ステップ3：ENノードの設定<a id="step-3-configure-the-en-node"></a>

ken のインストールフォルダーに移動し、`mv kend_baobab.conf kend.conf`という名前に変更してから、`conf/kend.conf` を以下のように編集する。

```
...
NETWORK="baobab"
...
SC_MAIN_BRIDGE=1
...
DATA_DIR=~/data
...
```

## ステップ4：ENノードの起動<a id="step-4-start-the-en-node"></a>

```
EN-01$ kend start
Starting kscnd: OK
```

ブロックの同期状況は `kaia.blockNumber` を見ることで確認できる。 この数値が0でなければ、ノードは正常に動作している。 Downloading all blocks on the Baobab network may take a long time depending on network conditions and hardware performance, so we recommend using [Fast Sync](../../endpoint-node/install-endpoint-nodes.md#fast-sync-optional) to synchronize blocks.

```
EN-01$ ken attach --datadir ~/data
> kaia.blockNumber
21073
```

ノードを停止したい場合は、`kend stop`コマンドを使うことができる。

## ステップ5：ENノードのKNIのチェック<a id="step-5-check-kni-of-en-node"></a>

SCN-L2-01ノードからの接続に使用されるEN-01のKNIに注意してください。 この値は次のステップで `main-bridges.json` を生成する際に使用される。

```
EN-01$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553...25bae@[::]:50505?discport=0"
```

![](/img/nodes/sc-en-scn-nodeInfo.png)

## ステップ6：main-bridges.jsonの作成<a id="step-6-create-main-bridges-json"></a>

SCN-L2-01 (注: EN-01 ノードではありません) にログオンし、`~/data` に `main-bridges.json` を作成します。 の後にある`[::]`をEN-01ノードのIPアドレスに置き換える。

```
SCN-L2-01$ echo '["kni://0f7aa6499553...25bae@192.168.1.1:50505?discport=0"]' > ~/data/main-bridges.json
```

## ステップ 7: SCNの設定とkscnの再起動<a id="step-7-configure-scn-then-restart-kscn"></a>

SCN-L2-01 ノードのシェルから `kscn-XXXXX-amd64/conf/kscnd.conf` を編集します。
SC_SUB_BRIDGE`を 1 に設定すると、SCN-L2-01 ノードの起動時に自動的にデータアンカリングを開始する。 In this example,`SC_PARENT_CHAIN_ID`is set to 1001 because the`chainID` of the parent chain, Baobab, is 1001.
SC_ANCHORING_PERIOD`はメインチェーンにアンカリングTXを送信する期間を決めるパラメータである。 値を10に設定すると、ノードは10ブロックごとにアンカリングを実行するように設定される。 デフォルト値は1である。

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

以下のコマンドを実行してkscnを再起動する：

```
SCN-L2-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-01$ kscnd start
Starting kscnd: OK
```

SCN-L2-01がEN-01に接続されているかどうかを`subbridge.peers.length`で確認する。

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

## アンカーリング <a id="anchoring"></a>

EN-01とSCN-L2-01の接続が完了したら、アンカリングにより親チェーンのServiceChainブロック情報を記録します。
このセクションでは、親オペレーターのアカウントをトップアップし、アンカリングを有効にし、アンカリングされたブロック番号を確認します。

### Step 1: Get KLAY to test anchoring <a id="step-1-get-klay-to-test-anchoring"></a>

Anchoring requires SCN-L2-01 to make an anchoring transaction to Baobab. そのため、`subbridge.parentOperator`アカウントは、取引手数料を支払うのに十分なKAIAを持っていなければならない。 [Kairos Faucet](https://faucet.kaia.io/)からKAIAを取得し、`parentOperator`にKAIAを転送する。 実サービスでのデータアンカリングのために、`parentOperator`はトランザクション料金に十分なKAIAを持つ必要がある。

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

![](/img/nodes/sc-en-scn-faucet.png)

### ステップ2：アンカー開始<a id="step-2-start-anchoring"></a>

アンカリングを開始するには、以下のコマンドを実行する：

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.anchoring(true)
true
```

アンカー開始後、`subbridge.latestAnchoredBlockNumber`を使用することで、Kairosにアンカーされた最新のブロックを確認することができます。 Please note that this only works after the EN already followed up on the latest block of Baobab. デフォルトでは、SCN-L2-01はアンカーをオンにしたブロックからすべてのブロックでアンカーを試行する。 SC_ANCHORING_PERIOD\`を変更することで、アンカー期間を設定することができる。 値が10に設定されている場合、ノードはブロック番号が10の倍数のときにアンカリングを試みる。

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.latestAnchoredBlockNumber
100
```

![](/img/nodes/sc-en-scn-anchoring.png)
