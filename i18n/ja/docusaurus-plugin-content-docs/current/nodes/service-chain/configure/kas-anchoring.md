# KASでデータ・アンカリングを使用する

As explained in the design section, you can anchor your service chain data to Klaytn main chain.
This page introduces how to enable data anchoring via [KAS (Klaytn API Service)](https://www.klaytnapi.com).

Once it is turned on, a node in your service chain can periodically anchor its chain data (block data) to Cypress or Baobab as a proof of existence and immutability of the service chain.
これにより、サービスチェーンの安全性と信頼性が確保される。

## KASを使うための準備<a id="preparation-with-kas"></a>

このセクションでは、データ・アンカリングにKASを使用するための前提条件を紹介する。

### Sign Up KAS (Klaytn API Service) <a id="sign-up-kas"></a>

まず、[KAS console website](https://www.klaytnapi.com)でKASにサインアップし、KASアカウントを取得する必要があります。
上記のウェブサイトにアクセスし、KASに登録してください。

[![main page](/img/nodes/kas-main-en.png)](https://www.klaytnapi.com)

[![sign up](/img/nodes/kas-signup-en.png)](https://www.klaytnapi.com)

### クレデンシャルの作成<a id="check-credential"></a>

ログイン後、以下のようにクレデンシャルを作成します。
AccessKey ID`と`Secret AccessKey`または`Authorization\` は KAS API を呼び出す際に使用される。

![credential](/img/nodes/kas-credential-en.png)

## アンカーAPI<a id="anchor-api"></a>

KASが提供するAnchor APIは、データ・アンカリングのために設計されたもので、アンカリング・タスクに使用するものであることは間違いない。

![anchor api](/img/nodes/kas-anchor-api-en.png)

## オペレーター・アドレスの作成<a id="create-kas-credential"></a>

To anchor service chain data via KAS, there should be a Klaytn address, enrolled in KAS, that actually send anchoring transaction to Klaytn. So, before you set up your service node, you need to create an Klaytn account called "operator" via KAS. このアカウントを作成するには、KASコンソールを使用してください。

It is important to be noticed that you must **first select the chain** in Klaytn to which you want to anchor your data on **the top right corner of the KAS console page**. You should create an operator for each chain (Cypress/Baobab).

![select chain](/img/nodes/kas-select-chain-en.png)

以下のように演算子を作成する。

![create operator](/img/nodes/kas-create-operator-en.png)

そして、以下のようなオペレーターリストを確認することができます。
サービスチェーンノードの設定にはオペレーターのアドレスが必要です。

![create operator](/img/nodes/kas-operator-list-en.png)

## サービスチェーンノードの設定<a id="configure-service-chain-node"></a>

APIクレデンシャル、アンカーAPI情報（APIエンドポイントとパラメータ）、KASのオペレータアカウントを取得したら、いよいよサービスチェーンノードをセットアップする。
サービスチェーンノードの設定ファイル（`kscnd.conf`, `kspnd.conf`, `ksend.conf`）を以下のように編集する必要がある。

SC_SUB_BRIDGE=1`とすべての`SC_KAS_\` プレフィックス項目を設定する必要があります。

```bash
...
# service chain options setting
...
SC_SUB_BRIDGE=1
...

SC_KAS_ANCHOR=1                                                         # 1: enable, 0: disable
SC_KAS_ANCHOR_PERIOD=10                                                 # Anchoring block period
SC_KAS_ANCHOR_URL="https://anchor-api.klaytn.com/v1/anchor"             # Anchor API URL
SC_KAS_ANCHOR_OPERATOR="0x6A3D565C4a2a4cd0Fb3df8EDfb63a151717EA1D7"     # Operator address
SC_KAS_ANCHOR_ACCESS_KEY="KAJM4BEIR9SKJKAW1G3TT8GX"                     # Credential Access key
SC_KAS_ANCHOR_SECRET_KEY="KyD5w9ZlZQ7ejj6lDF6elb61u8JH/mXdKqhgr3yF"     # Credential Secret key
SC_KAS_ANCHOR_X_CHAIN_ID=1001                                           # Cypress: 8217, Baobab: 1001
...
```

## サービスチェーンノードの実行<a id="run-service-chain-node"></a>

これでもう大丈夫だ。 サービス・チェーン・ノードを走らせることができる。
以下のようなKAS Anchor APIに関するログメッセージが表示されます。

```bash
...
INFO[09/10,18:09:28 +09] [5] Imported new chain segment                number=86495 hash=5a20d6…cbca1b blocks=1  txs=3 elapsed=2.387ms  trieDBSize=5.10kB mgas=0.063 mgasps=26.383
INFO[09/10,18:09:28 +09] [53] Anchored a block via KAS                  blkNum=86495
INFO[09/10,18:09:29 +09] [5] Imported new chain segment                number=86496 hash=8897bc…4ea7e7 blocks=1  txs=3 elapsed=2.158ms  trieDBSize=5.10kB mgas=0.063 mgasps=29.188
INFO[09/10,18:09:29 +09] [53] Anchored a block via KAS                  blkNum=86496
INFO[09/10,18:09:30 +09] [5] Imported new chain segment                number=86497 hash=44b319…7d4247 blocks=1  txs=3 elapsed=2.346ms  trieDBSize=5.43kB mgas=0.063 mgasps=26.848
INFO[09/10,18:09:30 +09] [53] Anchored a block via KAS                  blkNum=86497
INFO[09/10,18:09:31 +09] [5] Imported new chain segment                number=86498 hash=0b98ba…73d654 blocks=1  txs=3 elapsed=2.235ms  trieDBSize=5.61kB mgas=0.063 mgasps=28.186
INFO[09/10,18:09:31 +09] [53] Anchored a block via KAS                  blkNum=86498
INFO[09/10,18:09:32 +09] [5] Imported new chain segment                number=86499 hash=4f01ab…3bc334 blocks=1  txs=3 elapsed=3.319ms  trieDBSize=5.61kB mgas=0.063 mgasps=18.977
INFO[09/10,18:09:32 +09] [53] Anchored a block via KAS                  blkNum=86499
...
```

## 取引一覧<a id="list-of-transaction"></a>

KASコンソールの「KAS Console - Service - Anchor - Operators」メニューで、サービスチェーンのオペレータが送信したアンカリング・トランザクションのリストを見ることができます。

![anchoring transaction list](/img/nodes/kas-tx-list-en.png)
