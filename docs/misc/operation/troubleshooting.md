# Troubleshooting

## Where can I find a log file for the running Kaia node using the Kaia binary package? <a id="where-can-i-find-a-log-file-for-the-running-kaia-node-using-the-kaia-binary"></a>

**Answer**

You can find a log file in data directory. For example, default location of a log for `kcnd` is `/var/log/kcnd/kcnd.out` when you install `kcnd` RPM package.

## Kaia node can not connect to network with `Protocol istanbul/64 failed` and `Genesis block mismatch` error message as below. <a id="kaia-node-can-not-connect-to-network-with-protocol-istanbul-64-failed-and-gene"></a>

```
ERROR[01/27,17:11:33 +09] [33] Protocol istanbul/64 failed               id=b10697e43d4f8e30 conn=staticdial err="Genesis block mismatch - 81cf117d44f99b21 (!= 74647b98b9f06cb4)"
```

**Answer**

This error can happen when `genesis.json` is differ.
Please stop Kaia node and remove data directory. Then run `ken init` again using correct `genesis.json` as below.

For example, when data directory is `/var/kend/data`.
```
sudo kend stop
sudo rm -rf /var/kend/data
sudo ken init --datadir /var/kend/data genesis.json
sudo kend start
```


## Can't deploy smart contract using truffle with following error message. <a id="can-t-deploy-smart-contract-using-truffle-with-following-error-message"></a>

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

**Answer**

Enable `net` and other API for RPC console by editing `kend.conf` file as below.

```
RPC_API="admin,debug,klay,miner,net,personal,rpc,txpool,web3" # available apis: admin,debug,klay,miner,net,personal,rpc,txpool,web3
```
After updating `kend.conf`, restart Kaia node.


## Can't start Kaia node with `Unit not found` error as below after installing binary package. <a id="can-t-start-kaia-node-with-unit-not-found-error-as-below-after-installing-bina"></a>

```
Failed to start kcnd.service: Unit not found.
```

**Answer**

Please reload daemon as below.

```
sudo systemctl daemon-reload
```

## CN can't connect to network with `Add dial candidate from static nodes` log message. <a id="cn-can-t-connect-to-network-with-add-dial-candidate-from-static-nodes-log-messag"></a>

```
INFO[02/20,12:35:34 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
...
INFO[02/20,12:35:38 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
```

**Answer**

This can happen when `genesis.json` and nodekey/validator information differ.
Please check nodekey/validator and `genesis.json` file again.

## Kaia node can't start with following error log message. <a id="kaia-node-can-t-start-with-following-error-log-message"></a>

```
Fatal: Error starting protocol stack: listen unix /Users/username/some_directory/more_directories/klaytn/klaytn_client/my_test_klaytn/data/dd/klay.ipc: bind: invalid argument
```

**Answer**

If you see the above protocol stack error message in the log file, it means Kaia failed to start because the full path name of current working directory is too long. Please launch a Kaia node with a shorter full data directory. The maximum allowed length of path name depends on operating system.


## EN can't connect to CC with following log message. <a id="en-can-t-connect-to-cc-with-following-log-message"></a>

```
ERROR[01/28,06:20:07 Z] [23] Protocol istanbul/64 failed id=845f596536450bad conn=staticdial err="InvalidPeerHierarchy - (PeerIsOnParentChain:false) == (OnChildChain:false)"
```

**Answer**

It could happen when genesis of mainchain and service chain differ. Please check genesis of both chain are same.

## Head state missing error <a id="head-state-missing-error"></a>

```
"ERROR[06/21,14:35:16 +09] [5] Head state missing, repairing chain       number=2955620 hash=66bba2…e15f8d
Fatal: Error starting protocol stack: rewound to block number 0, but repair failed"
```

**Answer**
Due to a compatibility issue, we strongly recommend to upgrade EN's binary to v0.9.6 if you have been running an EN with older versions (`<=` v0.8.2). If it is your first time upgrading the EN to v0.9.x and want to migrate the data from the older version, you must specify the option `ADDITIONAL="--db.num-statetrie-partitions 1"` in the configuration file when you install the newer version.
