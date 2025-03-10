# 連接到凱洛斯

本節介紹如何將 4 節點 ServiceChain 網絡連接到 Kairos 網絡。
您將設置一個 Kairos EN，並將該 EN 與您的一個 SCN 連接起來。 然後啟用錨定功能，將 ServiceChain 區塊信息放到 Kairos 網絡上。

![](/img/nodes/sc-en-scn-arch.png)

## 先決條件<a id="prerequisites"></a>

- 1 臺用於 EN 的 Linux 或 MacOS 服務器
- 測試的最低硬件要求
 - 中央處理器4 核（英特爾至強或同級），內存：16GB，硬盤：50GB
 - 請參閱 [系統要求](../system-requirements.md) 瞭解更多信息。
- 下載 Kairos EN 可執行文件。 有關可下載二進制文件的完整列表，請參閱 [下載](../../downloads/downloads.md)。
- 假設和限制
 - 已安裝並運行 ServiceChain 網絡。 請參閱 [設置 4 節點服務鏈](4nodes-setup-guide.md) 設置網絡。
 - A Kairos EN.
 - 一個 EN 只能連接一個 SCN，因為只支持一對一連接。
 - 每個 SCN 都不必連接 EN。

## 步驟 0：安裝 Kairos EN<a id="install-kairos-en"></a>

安裝就是解壓縮下載的軟件包。 提取 EN 服務器上的存檔。

```bash
EN-01$ tar xvf ken-baobab-vX.X.X-XXXXX-amd64.tar.gz
```

## 步驟 1：準備 genesis.json<a id="step-1-preparing-genesis-json"></a>

從 EN 服務器下載 `Kairos` 網絡的 `genesis.json`。

```
EN-01$ curl -X GET https://packages.kaia.io/kairos/genesis.json -o ~/genesis.json
```

## 步驟 2：EN 節點初始化<a id="step-2-en-node-initialization"></a>

現在，我們將使用創世文件初始化 EN 節點。 執行以下命令
它會在你的主目錄下創建數據文件夾，存儲鏈數據和日誌。
您可以使用 `--datadir` 指令更改數據文件夾。

```
EN-01$ ken init --datadir ~/data ~/genesis.json
```

## 步驟 3：配置 EN 節點<a id="step-3-configure-the-en-node"></a>

轉到 ken 安裝文件夾並重命名 `mv kend_baobab.conf kend.conf`，然後按如下方式編輯 `conf/kend.conf`。

```
...
NETWORK="baobab"
...
SC_MAIN_BRIDGE=1
...
DATA_DIR=~/data
...
```

## 步驟 4：啟動 EN 節點<a id="step-4-start-the-en-node"></a>

```
EN-01$ kend start
Starting kscnd: OK
```

您可以通過查看 `kaia.blockNumber` 來檢查塊同步狀態。 如果該數字不為 0，則說明節點工作正常。 根據網絡條件和硬件性能，在 Kairos 網絡上下載所有區塊可能需要很長時間，因此我們建議使用 [Fast Sync](../../endpoint-node/install-endpoint-nodes.md#fast-sync-optional)來同步區塊。

```
EN-01$ ken attach --datadir ~/data
> kaia.blockNumber
21073
```

如果要停止一個節點，可以使用命令 `kend stop` 來完成。

## 步驟 5：檢查 EN 節點的 KNI<a id="step-5-check-kni-of-en-node"></a>

請注意 EN-01 的 KNI，這是用於從 SCN-L2-01 節點連接的信息。 該值將在下一步生成 `main-bridges.json` 時使用。

```
EN-01$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553...25bae@[::]:50505?discport=0"
```

![](/img/nodes/sc-en-scn-nodeInfo.png)

## 步驟 6：創建 main-bridges.json<a id="step-6-create-main-bridges-json"></a>

登錄 SCN-L2-01（注意：不是 EN-01 節點）並在 `~/data` 上創建 `main-bridges.json` 。 用 EN-01 節點的 IP 地址替換位於`@`字母后的`[::]`。

```
SCN-L2-01$ echo '["kni://0f7aa6499553...25bae@192.168.1.1:50505?discport=0"]' > ~/data/main-bridges.json
```

## 第 7 步： 配置 SCN 然後重啟 kscn<a id="step-7-configure-scn-then-restart-kscn"></a>

從 SCN-L2-01 節點的 shell 編輯 `kscn-XXXXX-amd64/conf/kscnd.conf`。
如果將 `SC_SUB_BRIDGE` 設置為 1，則 SCN-L2-01 節點啟動時，數據錨定將自動開始。 在本例中，"SC_PARENT_CHAIN_ID "被設置為 1001，因為父鏈 Kairos 的 "chainID "是 1001。
SC_ANCHORING_PERIOD "參數決定向主鏈發送錨定 tx 的週期。 將該值設置為 10，就可以將節點配置為每 10 個區塊執行一次錨定。 默認值為 1。

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

執行以下命令重啟 kscn：

```
SCN-L2-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-01$ kscnd start
Starting kscnd: OK
```

通過檢查 `subbridge.peers.length` 檢查 SCN-L2-01 是否連接到 EN-01

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

## 錨定 <a id="anchoring"></a>

完成 EN-01 和 SCN-L2-01 連接後，您可以通過錨定功能在父鏈上記錄 ServiceChain 塊信息。
在本節中，您將充值父操作員賬戶、啟用錨定功能並檢查錨定的區塊編號。

### 步驟 1：讓 KAIA 測試錨定情況<a id="step-1-get-kaia-to-test-anchoring"></a>

錨定需要 SCN-L2-01 向 Kairos 進行錨定交易。 因此，"subbridge.parentOperator "賬戶應該有足夠的 KAIA 來支付交易費。 從 [Kairos Faucet](https://faucet.kaia.io/) 獲取一些 KAIA，並將一些 KAIA 轉移到`parentOperator`。 對於實際服務中的數據錨定，"父操作員 "需要有足夠的 KAIA 來支付交易費。

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

![](/img/nodes/sc-en-scn-faucet.png)

### 步驟 2：開始錨定<a id="step-2-start-anchoring"></a>

要開始錨定，請執行以下命令：

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.anchoring(true)
true
```

錨定開始後，可以使用 `subbridge.latestAnchoredBlockNumber` 查看最新錨定到 Kairos 的區塊。 請注意，這隻有在 EN 跟進了最新的 "啟明星 "後才會起作用。 默認情況下，SCN-L2-01 會從開啟錨定功能的區塊開始，在每個區塊上嘗試錨定。 可以通過更改 `SC_ANCHORING_PERIOD` 來設置錨定週期。 如果該值設置為 10，節點會在區塊數為 10 的倍數時嘗試錨定。

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.latestAnchoredBlockNumber
100
```

![](/img/nodes/sc-en-scn-anchoring.png)
