# ネストされたサービスチェーンの作成

この章では、前章で構築したServiceChainネットワークに新たなServiceChainネットワークを追加し、階層構造でServiceChainネットワークを構築する方法を説明します。 追加するServiceChainネットワークも、この例では4つのSCNで構成される。 前章で構築したServiceChainネットワークをL2、新たに構築するServiceChainネットワークをL3と定義する。 L2とL3の間にブリッジをつなぎ、階層構造を作るつもりだ。 本章で構築するServiceChainネットワークの全体構造を下図に示す。

![](/img/nodes/sc-nestedsc-arch.png)

## 前提条件<a id="prerequisites"></a>

- Nested ServiceChain](nested-sc.md)で説明したServiceChainの設定とKairos ENまで進んだと仮定します。 そこで、前節で説明したことを簡単に説明する。
- 仮定と限界
   - 1つのENは、ServiceChain L2のSCNの1つに1対1でブリッジできる。 同様に、ServiceChainのL2の1つのSCNは、L3のSCNの1つに1対1でブリッジできる。
   - SCNノードはメインブリッジとサブブリッジを同時に持つことができる。 ただし、メイン・ブリッジとサブ・ブリッジのポート番号は別々に設定する必要がある。 (例：メインブリッジ：50505、サブブリッジ：50506）
   - L2のすべてのSCNがENにブリッジされる必要はなく、同様にL3のSCNがすべてL2にブリッジされる必要もない。 しかし、高い可用性を確保するためには、チェーン間に2組以上のメインブリッジとサブブリッジのペアがあることが推奨される。 本章では、L2-L3間を1ペアのみ接続し、L2-L3間の高可用性はKairos-L2間のHAと同じとする。

## ステップ1：L3のHomiデータの作成と更新<a id="step-1-create-and-update-homi"></a>

ServiceChain L2 を設定するときと同様に、`homi` コマンドを実行して L3 を構築するためのスクリプトと設定ファイルを作成する。 `homi`はLinux/MacのどのPCでも実行できる。 Kairos の `chainID` は `1001` で、L2 の `chainID` は前の例では `1002` に設定されていたので、便宜上 L3 の `chainID` は `1003` に設定する。 実際のサービスでブロックチェーンを運用する場合、他の ServiceChain や EVM チェーンとの `chainID` の衝突を避けるために、https://chainlist.defillama.com/ で新しい `chainID` 値を登録する必要があります。

```console
$ ./homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1003 --p2p-port 22323 -o homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/keys/passwd2
Created :  homi-output/keys/passwd3
Created :  homi-output/keys/passwd4
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/keys/nodekey2
Created :  homi-output/keys/validator2
Created :  homi-output/keys/nodekey3
Created :  homi-output/keys/validator3
Created :  homi-output/keys/nodekey4
Created :  homi-output/keys/validator4
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/keys_test/testkey1
Created :  homi-output/keys_test/keystore1/0xdC7218621513f71d609653d22C39d79d558d9CDC
Created :  homi-output/Kaia.json
Created :  homi-output/Kaia_txpool.json
```

![](/img/nodes/sc-nestedsc-ip.png)

`homi-output/scripts/static-nodes.json`のServiceChain L3ノードの`IPアドレス`と`ポート`情報を更新する。

```json
[
     "kni://358235ccbf97a1f...787f7@192.168.0.21:22323?discport=0&type=cn",
     "kni://14ac4e3d53de5c7...6c91d@192.168.0.22:22323?discport=0&type=cn",
     "kni://5f36a456d93da09...8e216@192.168.0.23:22323?discport=0&type=cn",
     "kni://d62fd0928b9b6e5...6badf@192.168.0.24:22323?discport=0&type=cn"
]
```

`homi-output`をServiceChain L3の全SCNノード(SCN-L3-01, SCN-L3-02, SCN-L3-03, SCN-L3-04)にコピーする。

```console
$ scp -r path/to/homi-output user@192.168.0.21:~/ 
$ scp -r path/to/homi-output user@192.168.0.22:~/ 
$ scp -r path/to/homi-output user@192.168.0.23:~/ 
$ scp -r path/to/homi-output user@192.168.0.24:~/ 
```

すべてのノードを初期化する。

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json
$ ls ~/data
keystore	klay		kscn
```

すべてのSCN（SCN-L3-01、SCN-L3-02、SCN-L3-03、SCN-L3-04）に接続し、`static-nodes.json`をデータフォルダ`~/data`にコピーし、`nodekeys`を一つずつコピーします。

```console
$ cp   ~/homi-output/scripts/static-nodes.json   ~/data/
$ cp   ~/homi-output/keys/nodekey{1..4}   ~/data/klay/nodekey
```

## ステップ2：L3のSCNコンフィギュレーション<a id="step-2-scn-configuration"></a>

ServiceChain L3のすべてのSCNで`conf/kscnd.conf`を以下のように編集します：PORT`には ServiceChain のデフォルトポートである 22323 を使用します。`DATA_DIR`は`~/data\` である。

```
...
PORT=22323
...
DATA_DIR=~/data
...
```

L3のすべてのSCNノードでServiceChainを実行し、正しく動作するか確認する。

```console
$ kscnd start
Starting kscnd: OK
$ kscn attach --datadir ~/data
> kaia.blockNumber
10
```

## ステップ3：L2メインブリッジ設定後の再起動<a id="step-3-restart-after-setting-L2-main-bridge"></a>

ServiceChain L2 のメインブリッジとして機能する SCN-L2-03 ノード（注：これは L3 ではなく L2 にある）のコンソールに接続する。

![](/img/nodes/sc-nestedsc-id.png)

SCN-L2-03のkscn設定ファイル`conf/kscnd.conf`を以下のように編集します。

```console
SC_MAIN_BRIDGE=1
```

SCN-L2-03でkscndを再起動する。

```console
SCN-L2-03$ kscnd stop
SCN-L2-03$ kscnd start
```

## ステップ4：メインブリッジノードのKNIをチェックする<a id="step-4-check-kni-of-main-bridge-node"></a>

SCN-L2-03 ノードの KNI 情報をチェックする。 この値は SCN-L2-03 ノードの `main-bridges.json` ファイルを作成する際に使用され、ServiceChain L3 のサブブリッジを設定する。

![](/img/nodes/sc-nestedsc-nodeinfo.png)

```console
SCN-L2-03$ kscn   attach   --datadir   ~/data
> mainbridge.nodeInfo.kni
"kni://87989a5a5dcc165...85b16b@[::]:50505?discport=0"
```

## ステップ5：L3サブブリッジの設定<a id="step-5-configure-l3-sub-bridge"></a>

ServiceChain L3のサブブリッジを持つSCN-L3-01ノードに接続する（注：これはL2ではない）。 フォルダ `~/data` の下に `main-bridges.json` を作成する。 の後ろを手順4で確認したノードのIPアドレスに置き換えてください。

```console
SCN-L3-01$ echo '["kni://87989a5a5dcc165...85b16b@192.168.0.13:50505?discport=0"]' > ~/data/main-bridges.json
```

サブブリッジを持つ SCN-L3-01 ノードの設定ファイル `conf/kscnd.conf` を以下のように編集します。 SC_PARENT_CHAIN_ID`を`1002`、`chainID` を L2 とし、`SC_ANCHORING` を 1 に設定する。 また、SCN-L3-01 のシェルにアクセスして、`subbridge.anchoring(true)` コマンドでデータアンカリングをオンにしたり、`subbridge.anchoring(false)` コマンドでオフにすることもできます。 SC_ANCHORING_PERIOD`は、アンカリング・トランザクションが親チェーンに送信される頻度を決定するパラメータである。 10を指定して、10ブロックごとにアンカーするようにノードを設定する。 デフォルトは1。

```console
SC_SUB_BRIDGE=1
…
SC_PARENT_CHAIN_ID=1002
…
SC_ANCHORING=1
SC_ANCHORING_PERIOD=10
```

セットアップ完了後、SCN-L3-01 の kscnd を再起動します。

```console
SCN-L3-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L3-01$ kscnd start
Starting kscnd: OK
```

`subbridge.peers.length`をチェックしてSCN-L3-01がSCN-L2-03に接続されているかどうかを確認し、`subbridge.latestAnchoredBlockNumber`をチェックして最新のアンカーブロック番号を確認し、アンカーリングが進行中かどうかを確認する。

```console
SCN-L3-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
> subbridge.latestAnchoredBlockNumber
5010
```
