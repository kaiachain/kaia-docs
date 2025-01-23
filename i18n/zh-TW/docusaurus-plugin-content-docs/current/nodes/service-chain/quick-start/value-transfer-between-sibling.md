# 兄弟服務鏈之間的價值轉移

本節將介紹如何在 ServiceChain 網絡之間實現價值轉移。
ServiceChain 提供的主要功能，即數據錨定和價值轉移，可以單獨使用。 也就是說，你可以只使用數據錨定或只使用價值轉移，而不考慮是否使用其他功能。

如下圖所示，如果有兩個服務鏈（鏈 ID 1002 和 1004）連接到 Kairos，由於每個服務鏈都與 Kairos 執行數據錨定，因此彼此間不需要數據錨定，只需要進行值傳輸。

要在兩個服務鏈之間沒有橋接時傳輸數值，首先要從服務鏈（chainID 1002）向 kairos（chainID 1001）傳輸數值，然後再從 kairos（chainID 1001）向服務鏈（chainID 1004）傳輸數值。 這比直接從服務鏈（chainID 1002）到服務鏈（chainID 1004）的價值轉移效率低。 因此，通過在 ServiceChain 之間直接建立橋樑，我們可以高效地轉移價值。

![](/img/nodes/sc-vt-between-sibling-arch.png)

## 先決條件<a id="prerequisites"></a>

- 我們假設您安裝了兩個服務鏈，每個服務鏈都與 kairos EN 相連。 請參閱[連接到 Kairos](en-scn-connection.md)。
- 我們還假定，您已經通過[跨鏈價值轉移](value-transfer.md)經歷了價值轉移。

如上圖所示，重複[連接到 Kairos](en-scn-connection.md)以額外安裝 ServiceChain（chianID 1004）。

一個節點只能有一個主橋和一個子橋。 在本例中，為方便說明，我們將在 SCN-L2-03 和 SCN-L2-07 節點上連接一座橋，這兩個節點還沒有主橋和子橋。

![](/img/nodes/sc-vt-between-sibling-bridge.png)

## 步驟 1：檢查 SCN-L2-03 節點的 KNI<a id="step-1-check-kni-of-scn-node"></a>

請注意 SCN-L2-03 的 KNI，這是用於從 SCN 節點連接的信息。 該值將在下一步生成 `main-bridges.json` 時使用

```
SCN-L2-03$ kscn attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://...39047242eb86278689...@[::]:50505?discport=0"
```

## 步驟 2：創建 main-bridges.json<a id="step-2-create-main-bridges-json"></a>

登錄 SCN-L2-07（注：chianID 1004）並在`~/data`上創建`main-bridges.json`。 用 EN 節點的 IP 地址替換位於`@`字母之後的`[::]`。

```
$ echo '["kni://...39047242eb86278689...@192.168.0.3:50505?discport=0"]' > ~/data/main-bridges.json
```

## 步驟 3：配置 SCN 然後重啟<a id="step-3-configure-scn-then-restart"></a>

從 SCN-L2-07 節點的 shell 編輯 `kscn-XXXXX-amd64/conf/kscnd.conf`。 由於每個服務鏈都已與 Kairos EN 錨定，因此不需要在同級服務鏈之間進行數據錨定。 因此，我們將 `SC_ANCHORING` 設置為 0。

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1002
...
SC_ANCHORING=0
...
```

在 SCN-L2-07 節點上重啟 kscnd

```
SCN-L2-07$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-07$ kscnd start
Starting kscnd: OK
```

通過檢查 `subbridge.peers.length` 檢查 SCN-L2-07 是否與 SCN-L2-03 連接

```
SCN-L2-07$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

在價值轉移的情況下，如果鏈 ID 1002 對應的信息被用作主橋信息，而鏈 ID 1004 對應的信息被設置為子橋，則可在同級之間進行價值轉移，如[跨鏈價值轉移](value-transfer.md)中所述。
