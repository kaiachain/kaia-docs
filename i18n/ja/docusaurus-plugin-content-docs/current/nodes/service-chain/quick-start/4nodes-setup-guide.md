# 4ノードのサービスチェーンを設置する

このセクションでは、マルチノードServiceChainのセットアップ方法について説明します。 下図の青い枠で囲んだように、`chainID` 1002 で 4-consensus-node ServiceChain をセットアップする。

![](/img/nodes/sc-4scn-arch.png)

## 前提条件<a id="prerequisites"></a>

- [Download](../../downloads/downloads.md) から `kscn`, `homi` バイナリのパッケージをダウンロードする。
- LinuxまたはMacOSサーバー4台
- 最小ハードウェア要件
  - CPU: 4-core (Intel Xeon or equivalent), RAM: 16GB, HDD: 50GB
  - 詳しくは[動作環境](../system-requirements.md)をご参照ください。

## ステップ 0: 全ノードに SCN をインストール<a id="install-scn"></a>

インストールとは、ダウンロードしたパッケージを解凍することである。 各サーバで SCN アーカイブを展開します。

```console
$ tar xvf kscn-vX.X.X-XXXXX-amd64.tar.gz
x kscn-XXXXX-amd64/
x kscn-XXXXX-amd64/conf/
x kscn-XXXXX-amd64/conf/kscnd.conf
x kscn-XXXXX-amd64/bin/
x kscn-XXXXX-amd64/bin/kscnd
x kscn-XXXXX-amd64/bin/kscn
```

便宜上、バイナリパスを $PATHに追加する。 ノードの実際のパスを使用してください。

```console
$ export PATH=$PATH:~/path/to/kscn-XXXXX-amd64/bin
```

SCNはまた、RHEL、CentOS、Fedoraのような様々なRPMディストリビューションを提供している。 詳しくは[インストール](../install-service-chain.md#installation)をご参照ください。

```console
$ curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/prod.repo
  % Total % Received % Xferd Average Speed Time Time Time Current Dload Upload Total Spent Left Speed
     100 118 100 118 0 0 1113 0 --:--:-- --:--:-- --:--:-- 1102 

$ yum list | grep kaia 
packages-klaytn-prod 31 kB/s | 2.9 kB 00:00 
homi.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kbnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kcnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kcnd-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kend.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kend-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kgen.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kpnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kpnd-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kscnd.x86_64          v1.8.0-0.el7      packages-klaytn-prod 
ksend.x86_64          v1.8.0-0.el7      packages-klaytn-prod 
kspnd.x86_64          v1.8.0-0.el7      packages-klaytn-prod 

$ yum install kscnd
```

## ステップ1：genesis.jsonとnodekeysの作成<a id="step-1-create-genesis-json-and-a-key"></a>

homiユーティリティを使って、必要なファイルを生成する。
`homi`は、Kaiaブロックチェーンの設定に必要なスクリプト、設定ファイル、秘密鍵を自動的に生成するユーティリティである。
homiはLinux/MacのどのPCからでも実行できる。

まず、ダウンロードしたhomiアーカイブを解凍する。

```console
$ tar xvf homi-vX.X.X-XXXXX-amd64.tar.gz
x homi-XXXXX-amd64/
x homi-XXXXX-amd64/bin/
x homi-XXXXX-amd64/bin/homi
```

`bin`フォルダに移動し、以下のオプションを指定して`homi`を実行し、ファイルを生成する。
`homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1002 --p2p-port 22323 -o homi-output`
Kairosの`chainID`は1001なので、便宜上、この例で構築したServiceChainの`chainID`は1002とする。 実際のサービスを立ち上げてブロックチェーンを運用する場合は、他のServiceChainとchainIDが重ならないように、https://chainlist.defillama.com/、新しいchainID値を登録してから利用することを推奨する。 ServiceChainのポートはデフォルトの22323に設定されている。

```console
$ ./homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1002 --p2p-port 22323 -o homi-output
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

この後のステップでは、`nodekey*`、`genesis.json`、`static-nodes.json`を使用する。

## ステップ2： static-nodes.jsonのカスタマイズ<a id="step-2-customize-static-nodes-json"></a>

`homi-output/scripts/static-nodes.json`をテキストエディタで開き、IPアドレスとポートをノードの実際の値で更新する。
この例では、ServiceChain内の各SCNノードのIPが下図のようになっているものとする。 ここで割り当てたポートは、後のステップ4で使用するので覚えておいてください。

![](/img/nodes/sc-4scn-ip.png)

```json
[
     "kni://38693ad4b17ff77...23153@192.168.0.1:22323?discport=0\u0026ntype=cn",
     "kni://f36d969b16f7337...1329b@192.168.0.2:22323?discport=0\u0026ntype=cn",
     "kni://16e55d8921ab034...b2bec@192.168.0.3:22323?discport=0\u0026ntype=cn",
     "kni://0973e792a421c1d...bbd71@192.168.0.4:22323?discport=0\u0026ntype=cn"
]
```

`static-nodes.json`を更新したら、出力フォルダ（`homi-output`）をすべてのSCNにアップロードします。 この例では SCN-L2-01、SCN-L2-02、SCN-L2-03、SCN-L2-04 ノード。

```console
$ scp -r path/to/homi-output/ user@192.168.0.1:~/
$ scp -r path/to/homi-output/ user@192.168.0.2:~/
$ scp -r path/to/homi-output/ user@192.168.0.3:~/
$ scp -r path/to/homi-output/ user@192.168.0.4:~/
```

## ステップ3：ノードの初期化<a id="step-3-node-initialization"></a>

次に、genesisファイルを使って各ノードを初期化する。 各ノードで以下のコマンドを実行する。
チェーンデータとログを保存するデータフォルダがホームディレクトリに作成されます。
データフォルダは `--datadir` ディレクティブを使って変更できる。
この例では、データフォルダを `~/data` に設定する。

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json

$ ls ~/data
keystore	klay		kscn
```

## ステップ 4: `nodekey` と `static-nodes.json` をインストールする。<a id="step-4-install-nodekey"></a>

SCNごとに `static-nodes.json` を data フォルダにコピーします。

```console
$ cp ~/homi-output/scripts/static-nodes.json ~/data/
```

ステップ1では、4つのノードキーを生成した。
各ノードキーを SCN に割り当て、一致する `nodekey` を各 SCN のデータフォルダにコピーします。
例えば、SCN-L2-01(192.168.0.1) には `nodekey1` を使用し、SCN-L2-02(192.168.0.2)、SCN-L2-03(192.168.0.3)、SCN-L2-04(192.168.0.4) にはそれぞれ `nodekey2`、`nodekey3`、`nodekey4` を使用します。

```console
$ cp ~/homi-output/keys/nodekey{1..4} ~/data/klay/nodekey
```

![](/img/nodes/sc-4scn-nodekey.png)

## ステップ 5: ノードの設定<a id="step-5-configure-nodes"></a>

各 SCN で kscn のインストールフォルダに移動し、`conf/kscnd.conf` を以下のように編集します。 `PORT`は`homi`をセットアップする際に使用するポートで、`SC_SUB_BRIDGE`は次のセクションでブリッジを接続する際に必要となる。 とりあえず、0にしておいてください。 DATA_DIR\`には、ステップ3で使用したデータフォルダを入力する。

```
...
PORT=22323
...
SC_SUB_BRIDGE=0
...
DATA_DIR=~/data
...
```

## ステップ 6: ノードの開始<a id="step-6-start-nodes"></a>

すべての SCN ノードで以下のコマンドを実行します。

```console
$ kscnd start
Starting kscnd: OK
```

ブロックの生成状況は `kaia.blockNumber` を見ることで確認できる。 この数値が0でなければ、ノードは正常に動作している。

```console
$ kscn attach --datadir ~/data
> kaia.blockNumber
10
```

ノードを停止したい場合は、`kscnd stop`コマンドを使うことができる。

## (例）価値移転取引の作成と確認<a id="example-creation-and-confirmation-of-a-value-transfer-transaction"></a>

これで4ノードのServiceChainが稼働した。 インストールを確認するために、ServiceChainで価値移転トランザクションを実行します。

![](/img/nodes/sc-4scn-test.png)

### ステップ1：テストアカウントのインポート<a id="step-1-import-the-test-account"></a>

`testkey1`はステップ1で`homi`が自動生成したものである。 KAIAは`homi`によって生成された`genesis.json`に記述されているようにテストアカウントに割り当てられる。

```console
$ kscn account import --datadir ~/data ~/homi-output/keys_test/testkey1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {80119c31cdae67c42c8296929bb4f89b2a52cec4}
```

### ステップ2：アカウントのロック解除<a id="step-2-unlock-the-account"></a>

アカウントのロック解除は `testkey1` をインポートした SCN ノードのコンソールからのみ可能です。

```console
$ kscn attach --datadir ~/data
> personal.unlockAccount("80119c31cdae67c42c8296929bb4f89b2a52cec4")
Unlock account 80119c31cdae67c42c8296929bb4f89b2a52cec4
Passphrase:
true
```

### ステップ3：取引を送信し、残高を確認する<a id="step-3-send-a-transaction-and-check-the-balance"></a>

```console
> kaia.sendTransaction({from: "80119c31cdae67c42c8296929bb4f89b2a52cec4", to: "305c6cc464d5fe1e624679695a20d641a01688e1", value: 10})
"0xa0e7102e8f14200cec8d964aacc1c9ed7c22271078b2b213170c64333cbca8a3"
> kaia.getBalance("305c6cc464d5fe1e624679695a20d641a01688e1")
10
```

:::note

ServiceChainの最も単純な形は、1つのSCNを持つことである。
このチュートリアルで説明するServiceChainは4ノードのServiceChainです。 ただし、シングルノードのServiceChainをセットアップすることも可能です。
ステップ1:genesis.jsonとnodekeysの作成」で、`--cn-num 4`の代わりに`--cn-num 1`をhomiに渡すだけです。

ビザンチン障害を許容するためには、少なくとも4ノードが必要である。 したがって、BFTアルゴリズムで高可用性を達成するためのSCNの最小数は4である。 2つのSCNノードがあるだけでは不十分で、1つのSCNが故障した場合、もう1つのSCNは単独でコンセンサスに達することができないからだ。

:::
