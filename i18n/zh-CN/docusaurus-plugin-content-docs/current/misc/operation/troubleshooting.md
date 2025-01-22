# 问题排除

## 在哪里可以找到使用 Kaia 二进制软件包运行的 Kaia 节点的日志文件？ <a id="where-can-i-find-a-log-file-for-the-running-kaia-node-using-the-kaia-binary"></a>

**答案**

您可以在数据目录下找到日志文件。 例如，安装 `kcnd` RPM 软件包时，`kcnd` 的默认日志位置是 `/var/log/kcnd/kcnd.out`。

## Kaia 节点无法与网络连接，出现 "Protocol istanbul/64 failed "和 "Genesis block mismatch "错误信息，如下所示。 <a id="kaia-node-can-not-connect-to-network-with-protocol-istanbul-64-failed-and-gene"></a>

```
ERROR[01/27,17:11:33 +09] [33] Protocol istanbul/64 failed               id=b10697e43d4f8e30 conn=staticdial err="Genesis block mismatch - 81cf117d44f99b21 (!= 74647b98b9f06cb4)"
```

**答案**

当 `genesis.json` 不同时，可能会出现此错误。
请停止 Kaia 节点并删除数据目录。 然后使用正确的 `genesis.json` 再次运行 `ken init` 如下。

例如，数据目录为 `/var/kend/data`。

```
sudo kend stop
sudo rm -rf /var/kend/data
sudo ken init --datadir /var/kend/data genesis.json
sudo kend start
```

## 无法使用 truffle 部署智能合约，错误信息如下 <a id="can-t-deploy-smart-contract-using-truffle-with-following-error-message"></a>

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

**答案**

通过编辑下面的 `kend.conf` 文件，为 RPC 控制台启用 `net` 和其他 API。

```
RPC_API="admin,debug,klay,miner,net,personal,rpc,txpool,web3" # available apis: admin,debug,klay,miner,net,personal,rpc,txpool,web3
```

更新 `kend.conf` 后，重新启动 Kaia 节点。

## Can't start Kaia node with `Unit not found` error as below after installing binary package. <a id="can-t-start-kaia-node-with-unit-not-found-error-as-below-after-installing-bina"></a>

```
Failed to start kcnd.service: Unit not found.
```

**答案**

请按以下步骤重新加载守护进程。

```
sudo systemctl daemon-reload
```

## 通过 "从静态节点添加候选拨号 "日志信息，CN 无法连接网络。 <a id="cn-can-t-connect-to-network-with-add-dial-candidate-from-static-nodes-log-messag"></a>

```
INFO[02/20,12:35:34 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
...
INFO[02/20,12:35:38 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
```

**答案**

当 `genesis.json` 和 nodekey/validator 信息不同时，可能会出现这种情况。
请再次检查 nodekey/validator 和 `genesis.json` 文件。

## Kaia 节点无法启动，出现以下错误日志信息。 <a id="kaia-node-can-t-start-with-following-error-log-message"></a>

```
Fatal: Error starting protocol stack: listen unix /Users/username/some_directory/more_directories/klaytn/klaytn_client/my_test_klaytn/data/dd/klay.ipc: bind: invalid argument
```

**答案**

如果在日志文件中看到上述协议栈错误信息，则表示 Kaia 启动失败，原因是当前工作目录的全路径名太长。 请使用较短的完整数据目录启动 Kaia 节点。 路径名的最大允许长度取决于操作系统。

## EN 无法连接 CC，日志信息如下。 <a id="en-can-t-connect-to-cc-with-following-log-message"></a>

```
ERROR[01/28,06:20:07 Z] [23] Protocol istanbul/64 failed id=845f596536450bad conn=staticdial err="InvalidPeerHierarchy - (PeerIsOnParentChain:false) == (OnChildChain:false)"
```

**答案**

当主链和服务链的起源不同时，就可能出现这种情况。 请检查两条链的起源是否相同。

## 头部状态丢失错误<a id="head-state-missing-error"></a>

```
"ERROR[06/21,14:35:16 +09] [5] Head state missing, repairing chain       number=2955620 hash=66bba2…e15f8d
Fatal: Error starting protocol stack: rewound to block number 0, but repair failed"
```

\*\* 答案\*\*
由于兼容性问题，我们强烈建议运行旧版本（`<=` v0.8.2）的用户将 EN 的二进制文件升级到 v0.9.6。 如果您是第一次将 EN 升级到 v0.9.x，并希望从旧版本迁移数据，则必须在安装新版本时在配置文件中指定选项 \`ADDITIONAL="--db.num-statetrie-partitions 1"。
