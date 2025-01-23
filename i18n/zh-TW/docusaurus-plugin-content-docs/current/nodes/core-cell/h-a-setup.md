# 配置高可用性

配置 CN 以實現高可用性是有效運行核心單元的關鍵。 推薦的高可用性方案取決於核心單元是部署在物理基礎設施還是雲基礎設施上。

## 主動-備用（建議用於裸機）<a id="active-standby-recommended-for-bare-metal"></a>

在此配置中，兩個 CN 節點採用主動-備用配置。 正常運行時，活動節點參與區塊生成，而備用節點僅同步來自網絡的鏈數據。 這種配置可確保在活動節點發生故障時，備用 CN 節點擁有鏈數據的新副本。

### 設置<a id="setup"></a>

1. 創建活動 CN 的`nodekey`備份。
2. 安裝備用 CN。 除此以外，配置與活動 CN 相同：
   - 備用機應使用不同的 \`nodekey
   - 將 PN 地址添加到 `$DATA_DIR/static-nodes.json` 中

### 故障切換<a id="failover"></a>

1. 停止備用 CN：\`sudo systemctl stop kcnd
2. 用發生故障的活動 CN 的 "節點密鑰 "替換備用 CN 的 "節點密鑰"。
3. 將活動 CN 的 IP 地址重新分配給備用 CN。
4. 啟動備用 CN 並驗證其是否與網絡同步：sudo systemctl start kcnd

## 機器圖像和快照（推薦用於雲計算）<a id="machine-image-snapshot-recommended-for-cloud"></a>

雲基礎設施允許運營商更快地替換故障節點，因此沒有必要運行第二個備用 CN。 相反，只需確保新的 CN 可以快速配置，並提供鏈數據的最新副本即可。

不同雲環境的具體術語和程序可能有所不同。 以下程序基於 AWS（特別是 EC2 和 EBS），但也可適用於其他雲平臺。

### 設置<a id="setup"></a>

1. 創建活動 CN 的`nodekey`備份。
2. 每次更新 CN 配置或軟件時，創建一個機器映像（例如 AMI/）。 請勿將包含 `DATA_DIR` 的捲包含在此映像中 -- 這將單獨獲取。

### 故障切換<a id="failover"></a>

使用 CC 的任何 PN 節點獲取鏈數據快照：

1. 連接到任何 PN 節點並停止 kpnd：`sudo systemctl stop kpnd`。 必須先停止 kpnd，以確保數據的一致性。
2. 使用 AWS 控制檯，創建包含 PN`DATA_DIR` 的卷的快照。
3. 啟動 kpnd啟動 kpnd

使用基本 CN 映像和 chaindata 映像創建新的 CN：

1. 使用 CN 映像（在上面的 "設置 "中創建）創建一個實例。
2. 附加根據 PN 的快照創建的卷`$DATA_DIR`。
3. 刪除卷中除 `$DATA_DIR/klay/chaindata` 以外的所有文件。 確認 `kcnd.conf` 中設置的 `DATA_DIR` 與包含鏈數據的目錄一致。 如果目錄名稱不同，可能需要重新命名。
4. 將故障 CN 的 `nodekey` 複製到 `$DATA_DIR/klay/nodekey`。
5. 將故障 CN 的 IP 地址重新分配給替換 CN。
6. 啟動 kcnd啟動 kcnd
7. 驗證 CN 是否與網絡同步。

## 其他考慮因素<a id="additional-considerations"></a>

將故障 CN 的公共 IP 重新分配給替換 CN，可使替換 CN 立即連接到其他 CN。 如果 IP 變更，在所有其他 CCO 更新其防火牆配置之前，新的 CN 將無法連接到網絡。
