# 配置节点监控

本指南介绍如何设置 Prometheus 和 Grafana 以监控 Kaia 节点。

## 1\. Kaia 中的度量配置

Kaia 为度量衡输出提供了以下标记：

- `-metric`：启用度量记录。 该标记通常与 `--prometheus` 标记一起使用。
- `--prometheus`：启用将记录的指标导出到 Prometheus 服务器。 该标记通常与 `--metric` 标记一起使用。
- `--prometheusport`：指定 Prometheus 指标的端口。 默认为 `61001`。

要启用度量和 Prometheus 输出，请在 `.conf` 文件中将 `METRICS` 和 `PROMETHEUS` 都设为 `1`：

```conf
METRICS=1
PROMETHEUS=1
```

## 2\. 设置普罗米修斯

[Prometheus](https://prometheus.io/) 作为监控的中央系统，提供强大的数据挖掘功能，从节点中提取实时数据并存档。

:::note[Prometheus 硬件要求］

在设置 Prometheus 之前，请确保您的系统满足以下硬件要求：

- **处理器：** 至少 2 个 CPU
- **内存：** 最低 4GB 内存
- **存储空间：** 至少 20 GB 可用磁盘空间

:::

### 2.1 安装普罗米修斯

以下步骤概述了 Prometheus 的手动安装过程。 请选择您的操作系统，了解具体说明。 有关 Prometheus 安装的更多信息，请参阅 [Prometheus 官方文档](https://prometheus.io/docs/prometheus/latest/getting_started/)。

1. 从 Prometheus 官方下载页面下载适合你的体系结构的最新 Prometheus 版本（如 darwin-amd64）。 本指南以 2.53.3 版为例。

```bash
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.darwin-arm64.tar.gz
```

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.linux-amd64.tar.gz
```

2. 解压下载的压缩包，将二进制文件移至 `/usr/local/bin/`，进行安装：

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

3. 删除下载的压缩包和解压缩目录：

```bash
rm -rf prometheus-2.53.3.darwin-arm64.tar.gz prometheus-2.53.3.darwin-amd64
```

```bash
rm -rf prometheus-2.43.0.linux-amd64.tar.gz prometheus-2.43.0.linux-amd64
```

4. 将 Prometheus 添加到你的 `PATH` 环境变量中，以便从任何终端会话访问 Prometheus。

```bash
echo "export PATH=\"\$HOME/monitoring/prometheus:\$PATH\"" >> ~/.bashrc
source ~/.bashrc
# This assumes that a prometheus directory already exists in the HOME directory. If not, make a new one (mkdir -p  $HOME/monitoring/prometheus).
```

### 2.2 配置 Prometheus

需要对 Prometheus 进行配置，以便从 Kaia 节点刮取指标。

:::info[Prometheus 配置]

`prometheus.yml`文件用于配置 Prometheus。  主要章节包括

- **`global`**：  设置全局配置参数，如 `evaluation_interval` （Prometheus 评估规则的频率）和 `scrape_interval` （Prometheus 搜刮目标的频率）。  15 秒是两者的合理起点，但要根据自己的需要和区块时间进行调整。

- **`scrape_configs`**：定义 Prometheus 监控的目标。  工作名称 "用于标识目标组。  `static_configs` 列出目标地址。  将 `<ip>` 替换为 Kaia 节点的 IP 地址，并确保正确配置了端口（默认为 `61001`）。

有关更多高级配置，请参阅 [Prometheus 文档](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)。

:::

1. 用文本编辑器打开位于 `prometheus/prometheus.yml` 的 `prometheus.yml` 文件。

2. 确保 `scrape_configs` 部分包含 Kaia 节点。 下面是一个配置示例：

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

3. 使用 `promtool` 检查配置文件是否有语法错误：

```bash
promtool check config prometheus/prometheus.yml
```

4. 使用配置文件启动 Prometheus。

```bash
prometheus --config.file=prometheus/prometheus.yml
```

### 2.3 使用宏脚本设置 Prometheus（macOS）

该脚本可在 macOS 上自动执行 Prometheus 安装和配置过程。 根据需要为其他 Prometheus 版本和操作系统进行调整。

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

## 3\. 设置 Grafana

Grafana 允许您通过可定制的仪表盘将 Prometheus 收集到的指标可视化。

:::note[Grafana 系统要求］

在设置 Grafana 之前，请确保您的系统满足 [Grafana 官方文档] (https://grafana.com/docs/grafana/latest/setup-grafana/installation/) 中的最低硬件和软件要求。

:::

### 3.1 安装 Grafana

使用适合您操作系统的方法下载并安装 Grafana。 例如，你可以 [在 macOS 上使用 Hombrew](https://grafana.com/docs/grafana/latest/setup-grafana/installation/mac/) 安装 Grafana（`brew install grafana`）。 详细说明请参阅 [Grafana 官方安装指南](https://grafana.com/docs/grafana/latest/setup-grafana/installation/)。

### 3.2 配置 Grafana

设置 Grafana 以可视化 Prometheus 收集的指标。

1. 启动 Grafana 服务器。

```bash
# macOS using Homebrew
brew services start grafana
```

关于其他操作系统，请参阅 [Grafana 官方文档](https://grafana.com/docs/grafana/latest/setup-grafana/start-restart-grafana/)。

2. 打开网络浏览器，导航至 `http://localhost:3000`。 使用默认凭据（admin/admin）登录。

3. 将 Prometheus 添加为数据源。

  - 导航至 **配置** -> **数据源**。
  - 点击 **Add data source**。
  - 选择\*\* Prometheus\*\*作为类型。
  - 将**URL**设为 `http://localhost:9090`（如果 Prometheus 位于不同的服务器上，请修改）。
  - 单击**Save & Test**以验证连接。

4. 添加 Kaia 面板，并添加一个面板来显示 Kaia 区块编号。
  - [Create a new dashboard](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/) 或导航到现有仪表板。
  - 单击右上角的**Edit**，单击仪表板标题中的**Add**，在下拉菜单中选择**Visualization**以添加面板。
  - 在**查询**下：
    1. 选择 Prometheus 作为 **Data source**。
    2. 在**度量**字段中输入 `klaytn_blockchain_head_blocknumber`。
    3. 在**Options**中，从**Custom**下拉菜单中选择**Legend**，然后输入 `{{instance}}` 作为自定义图例格式。
  - 单击**Apply**将面板保存到仪表板。

:::note[Additional Kaia 仪表板］

有关完整的预配置仪表板和自动供应设置，请参阅 [kaiaspray 存储库](https://github.com/kaiachain/kaiaspray/tree/main/roles/monitor-init/files/grafana/dashboards)。 该资源库包含用于预建仪表盘的 JSON 文件和用于配置数据源的配置文件。

:::

### 3.3 使用宏脚本设置 Grafana（macOS）

此脚本可在 macOS 上自动执行 Grafana 安装过程。 根据需要为其他 Grafana 版本和操作系统进行调整。

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

## 4\. 接入服务

安装和配置完成后，访问 Prometheus 和 Grafana 界面，验证一切设置是否正确。

- **普罗米修斯界面**

  - **URL:** `http://localhost:9090`
  - **验证：** 在浏览器中导航至此 URL。 您将看到 Prometheus 网络界面。 使用**图**选项卡执行示例查询，确保正在采集指标。

- **格拉法纳界面**

  - **URL:** `http://localhost:3000`
  - **默认证书：**
    - **用户名：** `admin`
    - **密码：** \`admin
  - **验证：** 首次登录时，系统会提示您更改默认密码。 登录后，确保 Prometheus 数据源配置正确，Kaia 面板显示指标。
