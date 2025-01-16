# トラブルシューティング

## Where can I find a log file for the running Klaytn node using the Klaytn binary package? <a id="where-can-i-find-a-log-file-for-the-running-klaytn-node-using-the-klaytn-binary"></a>

\*\*回答

ログファイルはdataディレクトリにあります。 例えば、`kcnd` RPMパッケージをインストールすると、`kcnd`のログのデフォルトの場所は `/var/log/kcnd/kcnd.out` になる。

## Klaytn node can not connect to network with `Protocol istanbul/64 failed` and `Genesis block mismatch` error message as below. <a id="klaytn-node-can-not-connect-to-network-with-protocol-istanbul-64-failed-and-gene"></a>

```
ERROR[01/27,17:11:33 +09] [33] Protocol istanbul/64 failed               id=b10697e43d4f8e30 conn=staticdial err="Genesis block mismatch - 81cf117d44f99b21 (!= 74647b98b9f06cb4)"
```

\*\*回答

このエラーは、`genesis.json`が異なる場合に発生する可能性がある。
Please stop Klaytn node and remove data directory. その後、以下のように正しい `genesis.json` を使用して `ken init` を再度実行してください。

例えば、データディレクトリが `/var/kend/data` の場合。

```
sudo kend stop
sudo rm -rf /var/kend/data
sudo ken init --datadir /var/kend/data genesis.json
sudo kend start
```

## 以下のエラーメッセージが表示され、truffleを使用してスマートコントラクトをデプロイできません。 <a id="can-t-deploy-smart-contract-using-truffle-with-following-error-message"></a>

```
Error: Returned error: The method net_version does not exist/is not available
    at Object.ErrorResponse (/usr/local/lib/node_modules/truffle/build/webpack:/~/web3-eth/~/web3-core-helpers/src/errors.js:29:1)
    at /usr/local/lib/node_modules/truffle/build/webpack:/~/web3-eth/~/web3-core-requestmanager/src/index.js:140:1
    at /usr/local/lib/node_modules/truffle/build/webpack:/packages/truffle-provider/wrapper.js:112:1
    at XMLHttpRequest.request.onreadystatechange (/usr/local/lib/node_modules/truffle/build/webpack:/~/web3/~/web3-providers-http/src/index.js:96:1)
    at XMLHttpRequestEventTarget.dispatchEvent (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request-event-target.js:34:1)
    at XMLHttpRequest._setReadyState (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:208:1)
    at XMLHttpRequest._onHttpResponseEnd (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:318:1)
    at IncomingMessage.<anonymous> (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:289:47)
    at IncomingMessage.emit (events.js:194:15)
    at endReadableNT (_stream_readable.js:1125:12)
    at process._tickCallback (internal/process/next_tick.js:63:19)
```

\*\*回答

kend.conf`ファイルを以下のように編集して、RPCコンソール用の `net\` およびその他のAPIを有効にする。

```
RPC_API="admin,debug,klay,miner,net,personal,rpc,txpool,web3" # available apis: admin,debug,klay,miner,net,personal,rpc,txpool,web3
```

After updating `kend.conf`, restart Klaytn node.

## Can't start Klaytn node with `Unit not found` error as below after installing binary package. <a id="can-t-start-klaytn-node-with-unit-not-found-error-as-below-after-installing-bina"></a>

```
Failed to start kcnd.service: Unit not found.
```

\*\*回答

以下のようにデーモンをリロードしてください。

```
sudo systemctl daemon-reload
```

## CN can't connect to network with `Add dial candidate from static nodes` ログメッセージ。 <a id="cn-can-t-connect-to-network-with-add-dial-candidate-from-static-nodes-log-messag"></a>

```
INFO[02/20,12:35:34 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
...
INFO[02/20,12:35:38 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
```

\*\*回答

これは、`genesis.json`とnodekey/validatorの情報が異なる場合に発生する可能性がある。
nodekey/validatorと`genesis.json`ファイルをもう一度確認してください。

## Klaytn node can't start with following error log message. <a id="klaytn-node-can-t-start-with-following-error-log-message"></a>

```
Fatal: Error starting protocol stack: listen unix /Users/username/some_directory/more_directories/klaytn/klaytn_client/my_test_klaytn/data/dd/klay.ipc: bind: 引数が無効です。
```

\*\*回答

If you see the above protocol stack error message in the log file, it means Klaytn failed to start because the full path name of current working directory is too long. Please launch a Klaytn node with a shorter full data directory. パス名の最大長はオペレーティング・システムによって異なる。

## ENがCCに接続できず、以下のログメッセージが表示される。 <a id="en-can-t-connect-to-cc-with-following-log-message"></a>

```
ERROR[01/28,06:20:07 Z] [23] Protocol istanbul/64 failed id=845f596536450bad conn=staticdial err="InvalidPeerHierarchy - (PeerIsOnParentChain:false) == (OnChildChain:false)"
```

\*\*回答

メインチェーンとサービスチェーンの成り立ちが異なる場合に起こりうる。 両チェーンの起源が同じであることを確認してほしい。

## ヘッド状態不明エラー<a id="head-state-missing-error"></a>

```
"ERROR[06/21,14:35:16 +09] [5] Head state missing, repairing chain       number=2955620 hash=66bba2…e15f8d
Fatal: Error starting protocol stack: rewound to block number 0, but repair failed"
```

**Answer**
互換性の問題から、古いバージョン(`<=` v0.8.2)のENを使用している場合は、EN のバイナリをv0.9.6にアップグレードすることを強くお勧めします。 ENをv0.9.xにアップグレードするのが初めてで、古いバージョンからデータを移行したい場合は、新しいバージョンをインストールする際に、設定ファイルに`ADDITIONAL="--db.num-statetrie-partitions 1"` オプションを指定する必要があります。
