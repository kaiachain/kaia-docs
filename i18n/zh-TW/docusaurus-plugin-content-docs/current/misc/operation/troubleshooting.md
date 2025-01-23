# 問題排除

## 在哪裡可以找到使用 Kaia 二進制軟件包運行的 Kaia 節點的日誌文件？ <a id="where-can-i-find-a-log-file-for-the-running-kaia-node-using-the-kaia-binary"></a>

**答案**

您可以在數據目錄下找到日誌文件。 例如，安裝 `kcnd` RPM 軟件包時，`kcnd` 的默認日誌位置是 `/var/log/kcnd/kcnd.out`。

## Kaia 節點無法與網絡連接，出現 "Protocol istanbul/64 failed "和 "Genesis block mismatch "錯誤信息，如下所示。 <a id="kaia-node-can-not-connect-to-network-with-protocol-istanbul-64-failed-and-gene"></a>

```
ERROR[01/27,17:11:33 +09] [33] Protocol istanbul/64 failed               id=b10697e43d4f8e30 conn=staticdial err="Genesis block mismatch - 81cf117d44f99b21 (!= 74647b98b9f06cb4)"
```

**答案**

當 `genesis.json` 不同時，可能會出現此錯誤。
請停止 Kaia 節點並刪除數據目錄。 然後使用正確的 `genesis.json` 再次運行 `ken init` 如下。

例如，數據目錄為 `/var/kend/data`。

```
sudo kend stop
sudo rm -rf /var/kend/data
sudo ken init --datadir /var/kend/data genesis.json
sudo kend start
```

## 無法使用 truffle 部署智能合約，錯誤信息如下 <a id="can-t-deploy-smart-contract-using-truffle-with-following-error-message"></a>

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

通過編輯下面的 `kend.conf` 文件，為 RPC 控制檯啟用 `net` 和其他 API。

```
RPC_API="admin,debug,klay,miner,net,personal,rpc,txpool,web3" # available apis: admin,debug,klay,miner,net,personal,rpc,txpool,web3
```

更新 `kend.conf` 後，重新啟動 Kaia 節點。

## Can't start Kaia node with `Unit not found` error as below after installing binary package. <a id="can-t-start-kaia-node-with-unit-not-found-error-as-below-after-installing-bina"></a>

```
Failed to start kcnd.service: Unit not found.
```

**答案**

請按以下步驟重新加載守護進程。

```
sudo systemctl daemon-reload
```

## 通過 "從靜態節點添加候選撥號 "日誌信息，CN 無法連接網絡。 <a id="cn-can-t-connect-to-network-with-add-dial-candidate-from-static-nodes-log-messag"></a>

```
INFO[02/20,12:35:34 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
...
INFO[02/20,12:35:38 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
```

**答案**

當 `genesis.json` 和 nodekey/validator 信息不同時，可能會出現這種情況。
請再次檢查 nodekey/validator 和 `genesis.json` 文件。

## Kaia 節點無法啟動，出現以下錯誤日誌信息。 <a id="kaia-node-can-t-start-with-following-error-log-message"></a>

```
Fatal: Error starting protocol stack: listen unix /Users/username/some_directory/more_directories/klaytn/klaytn_client/my_test_klaytn/data/dd/klay.ipc: bind: invalid argument
```

**答案**

如果在日誌文件中看到上述協議棧錯誤信息，則表示 Kaia 啟動失敗，原因是當前工作目錄的全路徑名太長。 請使用較短的完整數據目錄啟動 Kaia 節點。 路徑名的最大允許長度取決於操作系統。

## EN 無法連接 CC，日誌信息如下。 <a id="en-can-t-connect-to-cc-with-following-log-message"></a>

```
ERROR[01/28,06:20:07 Z] [23] Protocol istanbul/64 failed id=845f596536450bad conn=staticdial err="InvalidPeerHierarchy - (PeerIsOnParentChain:false) == (OnChildChain:false)"
```

**答案**

當主鏈和服務鏈的起源不同時，就可能出現這種情況。 請檢查兩條鏈的起源是否相同。

## 頭部狀態丟失錯誤<a id="head-state-missing-error"></a>

```
"ERROR[06/21,14:35:16 +09] [5] Head state missing, repairing chain       number=2955620 hash=66bba2…e15f8d
Fatal: Error starting protocol stack: rewound to block number 0, but repair failed"
```

\*\* 答案\*\*
由於兼容性問題，我們強烈建議運行舊版本（`<=` v0.8.2）的用戶將 EN 的二進制文件升級到 v0.9.6。 如果您是第一次將 EN 升級到 v0.9.x，並希望從舊版本遷移數據，則必須在安裝新版本時在配置文件中指定選項 \`ADDITIONAL="--db.num-statetrie-partitions 1"。
