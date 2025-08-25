# 設定節點監控

本指南說明如何設定 Prometheus 和 Grafana 以監控您的 Kaia 節點。

## 1\. Kaia 中的公制設定

Kaia 為公制匯出提供下列旗標：

- `--metric`：啟用度量記錄。 此旗標通常與 `--prometheus` 旗標一起使用。
- `--prometheus`：啟用匯出記錄的度量值到 Prometheus 伺服器。 此旗標通常與 `--metric` 旗標一起使用。
- `--prometheusport`：指定 Prometheus 度量的連接埠。 預設為 `61001`。

若要啟用 metrics 和 Prometheus 匯出，請在您的 `.conf` 檔案中將 `METRICS` 和 `PROMETHEUS` 設為 `1`：

```conf
METRICS=1
PROMETHEUS=1
```

## 2\. 設定 Prometheus

[Prometheus](https://prometheus.io/) 作為監控的中央系統，提供強大的資料挖掘功能，從您的節點擷取即時資料並將其歸檔。

:::note[Prometheus 硬體需求］

在設定 Prometheus 之前，請確保您的系統符合下列硬體需求：

- \*\* 處理器：\*\* 至少 2 個 CPU
- \*\* 記憶體：\*\* 至少 4 GB RAM
- \*\* 儲存空間：\*\* 至少 20 GB 可用磁碟空間

:::

### 2.1 安裝 Prometheus

以下步驟概述 Prometheus 的手動安裝程序。 選擇您的作業系統，以取得具體指示。 有關 Prometheus 安裝的詳細資訊，請參閱 [Prometheus 官方文件](https://prometheus.io/docs/prometheus/latest/getting_started/)。

1. 從 Prometheus 官方下載頁面下載適合您架構的最新 Prometheus 版本 (例如：darwin-amd64)。 本指南以版本 2.53.3 為例。

```bash
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.darwin-arm64.tar.gz
```

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.linux-amd64.tar.gz
```

2. 解壓縮下載的檔案，並將二進位檔移至 `/usr/local/bin/`，進行安裝：

```bash
tar xvfz prometheus-2.53.3.darwin-arm64.tar.gz
mv prometheus-2.53.3.darwin-arm64/prometheus /usr/local/bin/
mv prometheus-2.53.3.darwin-arm64/promtool /usr/local/bin/
```

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.linux-amd64.tar.gz
tar xvfz prometheus-2.53.3.linux-amd64.tar.gz
mv prometheus-2.53.3.linux-amd64/prometheus /usr/local/bin/
mv prometheus-2.53.3.linux-amd64/promtool /usr/local/bin/
```

3. 移除下載的存檔和解壓縮的目錄：

```bash
rm -rf prometheus-2.53.3.darwin-arm64.tar.gz prometheus-2.53.3.darwin-amd64
```

```bash
rm -rf prometheus-2.43.0.linux-amd64.tar.gz prometheus-2.43.0.linux-amd64
```

4. 將 Prometheus 加入您的 `PATH` 環境變數，以便從任何終端會話存取 Prometheus。

```bash
echo "export PATH=\"\$HOME/monitoring/prometheus:\$PATH\"" >> ~/.bashrc
source ~/.bashrc
# This assumes that a prometheus directory already exists in the HOME directory. If not, make a new one (mkdir -p  $HOME/monitoring/prometheus).
```

### 2.2 設定 Prometheus

Prometheus 需要設定為從 Kaia 節點刮取指標。

:::info[Prometheus 配置]

prometheus.yml\`檔會設定 Prometheus。  主要章節如下

- **`global`**：  設定全局設定參數，例如 `evaluation_interval` (Prometheus 評估規則的頻率) 和 `scrape_interval` (Prometheus 搜刮目標的頻率)。  15 秒是兩者的合理起點，但請根據您的需求和區塊時間進行調整。

- **`scrape_configs`**：定義 Prometheus 監視的目標。  工作名稱」可識別目標群組。  `static_configs` 列出目標位址。  將 `<ip>` 改為 Kaia 節點的 IP 位址，並確保連接埠 (預設為 `61001`)已正確設定。

如需更多進階設定，請參閱 [Prometheus 文件](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)。

:::

1. 使用文字編輯器開啟位於「prometheus/prometheus.yml」的「prometheus.yml」檔案。

2. 確保 `scrape_configs` 區段包含您的 Kaia 節點。 以下是一個配置範例：

```yaml
global:
  evaluation_interval: 15s
  scrape_interval: 15s

scrape_configs:
- job_name: klaytn
  static_configs:
  - targets:  #Replace `192.168.1.100` and `192.168.1.101` with the actual IP addresses of your Kaia nodes.
      - "192.168.1.100:61001"
      - "192.168.1.101:61001"
      ...
```

3. 使用 `promtool` 檢查設定檔是否有任何語法錯誤：

```bash
promtool check config prometheus/prometheus.yml
```

4. 使用您的組態檔案啟動 Prometheus。

```bash
prometheus --config.file=prometheus/prometheus.yml
```

### 2.3 使用 Macro Script 設定 Prometheus (macOS)

此腳本可在 macOS 上自動執行 Prometheus 的安裝和設定程序。 根據需要針對其他 Prometheus 版本和作業系統進行調整。

```sh
rm -rf prometheus

echo "Installing Prometheus..."
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.43.0/prometheus-2.43.0.darwin-arm64.tar.gz
tar xvfz prometheus-2.43.0.darwin-arm64.tar.gz > /dev/null 2>&1 && mv prometheus-2.43.0.darwin-arm64 prometheus && rm -rf prometheus-2.43.0.darwin-arm64 && rm -rf prometheus-2.43.0.darwin-arm64.tar.gz
echo "export PATH=\"$HOMEDIR/monitoring/prometheus:\$PATH\"" >> ~/.bashrc && source ~/.bashrc

# Generate Prometheus config file (prometheus.yml)
printf "%s\n" "global:" \
              "  evaluation_interval: 15s" \
              "  scrape_interval: 15s" \
              "" \
              "scrape_configs:" \
              "- job_name: klaytn" \
              "  static_configs:" \
              "  - targets:" > prometheus/prometheus.yml

# Append target configurations for multiple nodes
for (( i=0; i<NUMOFNODE; i++ ))
do
  # Replace <ip> and <port> with the actual IP address and port (61001) for each node
  printf "    - \"<ip>:%d\"\n" <port> >> prometheus/prometheus.yml
done
```

## 3\. 設定 Grafana

Grafana 可讓您透過可自訂的儀表板，將 Prometheus 所收集的度量資訊視覺化。

:::note[Grafana 系統需求］

在設定 Grafana 之前，請確保您的系統符合 [Grafana 官方文件](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) 中的最低硬體與軟體需求。

:::

### 3.1 安裝 Grafana

使用適合您作業系統的方法下載並安裝 Grafana。 例如，您可以 [在 macOS 上使用 Hombrew](https://grafana.com/docs/grafana/latest/setup-grafana/installation/mac/) 安裝 Grafana (`brew install grafana`)。 詳細說明請參閱 [官方 Grafana 安裝指南](https://grafana.com/docs/grafana/latest/setup-grafana/installation/)。

### 3.2 配置 Grafana

設定 Grafana 以視覺化 Prometheus 所收集的指標。

1. 啟動 Grafana 伺服器。

```bash
# macOS using Homebrew
brew services start grafana
```

其他作業系統請參考 [Grafana 官方文件](https://grafana.com/docs/grafana/latest/setup-grafana/start-restart-grafana/)。

2. 開啟網頁瀏覽器，並導航至 `http://localhost:3000`。 使用預設憑證 (admin/admin) 登入。

3. 新增 Prometheus 為資料來源。

   - 導覽到 \*\* 設定\*\* -> \*\* 資料來源\*\*。
   - 按一下 \*\* 新增資料來源\*\*。
   - 選擇 **Prometheus** 為類型。
   - 將 **URL** 設為 `http://localhost:9090` (如果 Prometheus 位於不同的伺服器上，請修改)。
   - 按一下 **Save & Test** 以驗證連線。

4. 新增 Kaia 面板，並新增面板可視化 Kaia 區塊號碼。
   - [Create a new dashboard](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/) 或導航到現有的儀表板。
   - 按一下右上角的 **編輯**，按一下儀表板標題中的 **新增**，然後在下拉式選單中選擇 **可視化**，以新增面板。
   - 在**查詢**下：
     1. 選擇您的 Prometheus 作為 **資料來源**。
     2. 在 **Metric** 欄位中輸入 `klaytn_blockchain_head_blocknumber`。
     3. 在 **選項**中，從 **圖例**下拉選單中選擇 **自訂**，然後輸入 `{{instance}}` 作為自訂圖例格式。
   - 按一下 \*\* 應用\*\*，將面板儲存到您的儀表板。

:::note[Additional Kaia 控制面板]

如需完整的預配置儀表板和自動化佈建設定，請參考 [kaiaspray 儲存庫](https://github.com/kaiachain/kaiaspray/tree/main/roles/monitor-init/files/grafana/dashboards)。 此儲存庫包含預先建立儀表板的 JSON 檔案，以及用於配置資料來源的組態檔案。

:::

### 3.3 使用 Macro Script 設定 Grafana (macOS)

此腳本可自動執行 macOS 上的 Grafana 安裝程序。 根據需要針對其他 Grafana 版本和作業系統進行調整。

```sh
# Remove any existing Grafana installation
rm -rf grafana

# Install Grafana
echo "Installing Grafana..."
curl -O https://dl.grafana.com/enterprise/release/grafana-enterprise-8.4.5.darwin-arm64.tar.gz
tar -zxvf grafana-enterprise-8.4.5.darwin-arm64.tar.gz > /dev/null 2>&1 && mv grafana-8.4.5 grafana && rm -rf grafana-enterprise-8.4.5.darwin-arm64.tar.gz
echo "export PATH=\"$HOMEDIR/monitoring/grafana/bin:\$PATH\"" >> ~/.bashrc && source ~/.bashrc

# Generate Grafana dashboard config file
printf "%s\n" "apiVersion: 1" \
              "providers:" \
              "- name: 'klaytn'" \
              "  folder: ''" \
              "  options:" \
              "    path: conf/provisioning/dashboards" > grafana/conf/provisioning/dashboards/klaytn-dashboard.yml

# Generate Grafana datasource config file
printf "%s\n" "datasources:" \
              "-  is_default: true " \
              "   name: 'klaytn'" \
              "   type: 'prometheus'" \
              "   url: 'http://localhost:9090'" > grafana/conf/provisioning/datasources/klaytn.yml
```

```sh
# Clone the klaytn-deploy repository if not already cloned
if [ ! -d "klaytn-deploy" ]; then
  echo "Cloning klaytn-deploy repository..."
  git clone https://github.com/klaytn/klaytn-deploy.git
fi

# Copy Grafana configuration files from klaytn-deploy
cp klaytn-deploy/grafana/*.json grafana/conf/provisioning/dashboards/
```

## 4\. 存取服務

安裝和設定完成後，請存取 Prometheus 和 Grafana 介面，以驗證一切設定是否正確。

- **普羅米修斯介面**

  - **URL:** `http://localhost:9090`
  - **驗證：** 在瀏覽器中導航到此 URL。 您應該會看到 Prometheus 網頁介面。 使用 **Graph** 索引標籤來執行範例查詢，並確保正在搜刮度量指標。

- **Grafana 介面**

  - **URL:** `http://localhost:3000`
  - **預設認證：**
    - **使用者名稱：** `admin`
    - \*\* 密碼：\*\* `admin`
  - **驗證：** 首次登入時，系統會提示您變更預設密碼。 登入後，確保 Prometheus 資料來源已正確設定，且 Kaia 面板顯示指標。
