# 創建嵌套服務鏈

本章介紹如何通過在上一章構建的 ServiceChain 網絡中添加新的 ServiceChain 網絡，以分層結構構建 ServiceChain 網絡。 在本例中，要添加的 ServiceChain 網絡也由 4 個 SCN 組成。 上一章中構建的服務鏈網絡定義為 L2，新構建的服務鏈網絡定義為 L3。 我們將在 L2 和 L3 之間連接一座橋，以創建一個分層結構。 本章將要構建的服務鏈網絡的整體結構如下圖所示。

![](/img/nodes/sc-nestedsc-arch.png)

## 先決條件<a id="prerequisites"></a>

- 假設您已進入 [Nested ServiceChain](nested-sc.md) 中描述的 ServiceChain 配置和 Kairos EN。 因此，我們將簡要解釋上一節中的內容。
- 假設和限制
 - 一個 EN 可以一對一地橋接到服務鏈 L2 的一個 SCN。 同樣，服務鏈 L2 中的一個 SCN 可以一對一地橋接到 L3 中的一個 SCN。
 - SCN 節點可以同時擁有一個主橋和一個子橋。 不過，主橋和子橋的端口號必須設置不同。 (例如主橋：50505，副橋：50506）
 - 並不是所有 L2 的 SCN 都需要橋接到 EN，同樣，也不是所有 L3 的 SCN 都需要橋接到 L2。 不過，為了實現高可用性，建議在鏈之間設置兩個或更多的主橋和副橋對。 在本章中，L2 和 L3 之間只連接一對，L2 和 L3 之間的高可用性與 Kairos 和 L2 之間的 HA 相同。

## 步驟 1：創建和更新 L3 的霍米數據<a id="step-1-create-and-update-homi"></a>

與配置 ServiceChain L2 時一樣，執行 `homi` 命令創建腳本和配置文件，用於構建 L3。 您可以在任何 Linux/Mac PC 上運行 `homi`。 Kairos 的 "chainID "是 "1001"，而 L2 的 "chainID "在上一個示例中被設置為 "1002"，因此為了方便起見，L3 的 "chainID "被設置為 "1003"。 為實際服務運行區塊鏈時，必須在 https://chainlist.defillama.com/ 註冊新的 `chainID` 值，以避免 `chainID` 與其他 ServiceChain 和 EVM 鏈衝突。

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

更新 `homi-output/scripts/static-nodes.json` 中 ServiceChain L3 節點的`IP 地址`和`端口`信息。

```json
[
     "kni://358235ccbf97a1f...787f7@192.168.0.21:22323?discport=0&type=cn",
     "kni://14ac4e3d53de5c7...6c91d@192.168.0.22:22323?discport=0&type=cn",
     "kni://5f36a456d93da09...8e216@192.168.0.23:22323?discport=0&type=cn",
     "kni://d62fd0928b9b6e5...6badf@192.168.0.24:22323?discport=0&type=cn"
]
```

將 "homi-output "複製到服務鏈 L3 的所有 SCN 節點（SCN-L3-01、SCN-L3-02、SCN-L3-03、SCN-L3-04）。

```console
$ scp -r path/to/homi-output user@192.168.0.21:~/ 
$ scp -r path/to/homi-output user@192.168.0.22:~/ 
$ scp -r path/to/homi-output user@192.168.0.23:~/ 
$ scp -r path/to/homi-output user@192.168.0.24:~/ 
```

初始化所有節點。

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json
$ ls ~/data
keystore	klay		kscn
```

連接所有 SCN（SCN-L3-01、SCN-L3-02、SCN-L3-03 和 SCN-L3-04），將 `static-nodes.json` 複製到數據文件夾 `~/data` 中，並逐一複製 `nodekeys` 。

```console
$ cp   ~/homi-output/scripts/static-nodes.json   ~/data/
$ cp   ~/homi-output/keys/nodekey{1..4}   ~/data/klay/nodekey
```

## 步驟 2：L3 中的 SCN 配置<a id="step-2-scn-configuration"></a>

在 ServiceChain L3 的所有 SCN 上編輯 `conf/kscnd.conf`，如下所示：端口 "使用 ServiceChain 的默認端口 22323。 DATA_DIR`是`~/data\`。

```
...
PORT=22323
...
DATA_DIR=~/data
...
```

在 L3 的所有 SCN 節點上運行 ServiceChain，並檢查其是否正常運行。

```console
$ kscnd start
Starting kscnd: OK
$ kscn attach --datadir ~/data
> kaia.blockNumber
10
```

## 步驟 3：設置 L2 主橋後重新啟動<a id="step-3-restart-after-setting-L2-main-bridge"></a>

連接到 SCN-L2-03 節點的控制檯（注意：這不是在 L3，而是在 L2），該節點將充當服務鏈 L2 中的主橋。

![](/img/nodes/sc-nestedsc-id.png)

編輯 SCN-L2-03 的 kscn 配置文件 `conf/kscnd.conf` 如下。

```console
SC_MAIN_BRIDGE=1
```

重啟 SCN-L2-03 上的 kscnd。

```console
SCN-L2-03$ kscnd stop
SCN-L2-03$ kscnd start
```

## 步驟 4：檢查主橋節點的 KNI<a id="step-4-check-kni-of-main-bridge-node"></a>

檢查 SCN-L2-03 節點的 KNI 信息。 該值將用於創建 SCN-L2-03 節點的`main-bridges.json`文件，從而在服務鏈 L3 中設置子橋。

![](/img/nodes/sc-nestedsc-nodeinfo.png)

```console
SCN-L2-03$ kscn   attach   --datadir   ~/data
> mainbridge.nodeInfo.kni
"kni://87989a5a5dcc165...85b16b@[::]:50505?discport=0"
```

## 步驟 5：配置 L3 子橋<a id="step-5-configure-l3-sub-bridge"></a>

連接到 SCN-L3-01 節點，該節點將擁有服務鏈 L3 的子橋（注意：這不是 L2）。 在 `~/data` 文件夾下創建 `main-bridges.json` 文件。 將 @ 後面的 \[::\] 替換為您在步驟 4 中檢查的節點的 IP 地址。

```console
SCN-L3-01$ echo '["kni://87989a5a5dcc165...85b16b@192.168.0.13:50505?discport=0"]' > ~/data/main-bridges.json
```

編輯 SCN-L3-01 節點（帶子橋）的配置文件 `conf/kscnd.conf` 如下。 將 `SC_SUB_BRIDGE` 設為 1 以激活橋接連接，將 `SC_PARENT_CHAIN_ID` 設為 1002，將 `chainID` 設為 L2，將 `SC_ANCHORING` 設為 1 以在重啟時自動錨定數據。 您也可以訪問 SCN-L3-01 shell，使用 "subbridge.anchoring(true) "命令打開數據錨定，或使用 "subbridge.anchoring(false) "命令關閉數據錨定。 SC_ANCHORING_PERIOD "是一個參數，用於確定向父鏈發送錨定事務的頻率。 通過指定 10 的值，將節點設置為每 10 個區塊錨定一次。 默認為 1。

```console
SC_SUB_BRIDGE=1
…
SC_PARENT_CHAIN_ID=1002
…
SC_ANCHORING=1
SC_ANCHORING_PERIOD=10
```

完成設置後，重新啟動 SCN-L3-01 上的 kscnd。

```console
SCN-L3-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L3-01$ kscnd start
Starting kscnd: OK
```

檢查 `subbridge.peers.length` 查看 SCN-L3-01 是否連接到 SCN-L2-03，檢查 `subbridge.latestAnchoredBlockNumber` 查看最新的錨定塊編號，查看是否正在進行錨定。

```console
SCN-L3-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
> subbridge.latestAnchoredBlockNumber
5010
```
