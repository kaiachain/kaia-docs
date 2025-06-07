# Configure Node Monitoring

This guide explains how to set up Prometheus and Grafana to monitor your Kaia node.

## 1\. Metric Configuration in Kaia

Kaia provides the following flags for metric export:

* `--metric`: Enables metric recording. This flag is typically used in conjunction with the `--prometheus` flag.  
* `--prometheus`: Enables exporting recorded metrics to a Prometheus server. This flag is typically used in conjunction with the `--metric` flag.  
* `--prometheusport`: Specifies the port for Prometheus metrics. Defaults to `61001`.

To enable metrics and Prometheus exporting, set both `METRICS` and `PROMETHEUS` to `1` in your `.conf` file:

```conf
METRICS=1
PROMETHEUS=1
```

## 2\. Setting up Prometheus

[Prometheus](https://prometheus.io/) acts as the central system for monitoring, providing robust data mining capabilities to extract real-time data from your nodes and archive it.

:::note[Prometheus Hardware Requirements]

Before setting up Prometheus, ensure your system meets the following hardware requirements:

- **Processor:** At least 2 CPUs  
- **Memory:** Minimum of 4 GB RAM  
- **Storage:** At least 20 GB of free disk space

:::

### 2.1 Installing Prometheus

The following steps outline the manual installation process for Prometheus. Choose your operating system for specific instructions. For more information about Prometheus installation, refer to the [official Prometheus documentation](https://prometheus.io/docs/prometheus/latest/getting_started/).

1. Download the latest Prometheus release suitable for your architecture (e.g., darwin-amd64) from the official Prometheus download page. This guide uses version 2.53.3 as an example.

```bash
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.darwin-arm64.tar.gz
```

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.linux-amd64.tar.gz
```

2. Extract the downloaded archive and install binaries by moving them to `/usr/local/bin/`:

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

3. Remove the downloaded archive and extracted directory:

```bash
rm -rf prometheus-2.53.3.darwin-arm64.tar.gz prometheus-2.53.3.darwin-amd64
```

```bash
rm -rf prometheus-2.43.0.linux-amd64.tar.gz prometheus-2.43.0.linux-amd64
```

4. Add Prometheus to your `PATH` environment variable to access Prometheus from any terminal session.

```bash
echo "export PATH=\"\$HOME/monitoring/prometheus:\$PATH\"" >> ~/.bashrc
source ~/.bashrc
# This assumes that a prometheus directory already exists in the HOME directory. If not, make a new one (mkdir -p  $HOME/monitoring/prometheus).
```

### 2.2 Configuring Prometheus

Prometheus needs to be configured to scrape metrics from your Kaia nodes.

:::info\[Prometheus Configuration\]

The `prometheus.yml` file configures Prometheus.  The key sections are:

* **`global`**:  Sets global configuration parameters like `evaluation_interval` (how often Prometheus evaluates rules) and `scrape_interval` (how often Prometheus scrapes targets).  15 seconds is a reasonable starting point for both, but adjust based on your needs and block time.  
    
* **`scrape_configs`**: Defines the targets Prometheus monitors.  The `job_name` identifies the target group.  `static_configs` lists the target addresses.  Replace `<ip>` with the IP address of your Kaia node and ensure the port (`61001` by default) is correctly configured.

For more advanced configurations, refer to the [Prometheus documentation](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).

:::

1. Open the `prometheus.yml` file located at `prometheus/prometheus.yml` in a text editor.  
     
2. Ensure the `scrape_configs` section includes your Kaia nodes. Below is an example configuration:

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

3. Use `promtool` to check the configuration file for any syntax errors:

```bash
promtool check config prometheus/prometheus.yml
```

4. Start Prometheus with your configuration file.

```bash
prometheus --config.file=prometheus/prometheus.yml
```

### 2.3 Setting up Prometheus Using Macro Script (macOS)

This script automates the Prometheus installation and configuration process on macOS. Adapt it for other Prometheus versions and operating systems as needed.

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

## 3\. Setting up Grafana

Grafana allows you to visualize the metrics collected by Prometheus through customizable dashboards.

:::note[Grafana System Requirements]

Before setting up Grafana, ensure your system meets the minimum hardware and software requirements from the [official Grafana documentation](https://grafana.com/docs/grafana/latest/setup-grafana/installation/).

:::

### 3.1 Installing Grafana

Download and install Grafana using the appropriate method for your operating system. For example, you can install Grafana [on macOS using Hombrew](https://grafana.com/docs/grafana/latest/setup-grafana/installation/mac/) (`brew install grafana`). See the [official Grafana installation guide](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) for detailed instructions.

### 3.2 Configuring Grafana

Set up Grafana to visualize the metrics collected by Prometheus.

1. Start Grafana Server.

```bash
# macOS using Homebrew
brew services start grafana
```

For other operating systems, refer to the [official Grafana documentation](https://grafana.com/docs/grafana/latest/setup-grafana/start-restart-grafana/).

2. Open a web browser and navigate to `http://localhost:3000`. Log in using the default credentials (admin/admin).  
     
3. Add Prometheus as a Data Source.  
     
   - Navigate to **Configuration** -> **Data Sources**.  
   - Click on **Add data source**.  
   - Select **Prometheus** as the type.  
   - Set the **URL** to `http://localhost:9090` (modify if Prometheus is on a different server).  
   - Click **Save & Test** to verify the connection.

4. Add a Kaia dashboard and add a panel to visualize Kaia block number.  
   - [Create a new dashboard](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/) or navigate to an existing one.  
   - Click **Edit** in the top-right corner, click **Add** in the dashboard header, and select **Visualization** in the drop-down to add a panel.  
   - Under **Query**:
     1. Select your Prometheus as **Data source**.
     2. Enter `klaytn_blockchain_head_blocknumber` in the **Metric** field.
     3. In **Options**, select **Custom** from the **Legend** dropdown and enter `{{instance}}` as the custom legend format.  
   - Click **Apply** to save the panel to your dashboard.


:::note[Additional Kaia Dashboards]

For a complete pre-configured dashboard and automated provisioning setup, refer to the [kaiaspray repository](https://github.com/kaiachain/kaiaspray/tree/main/roles/monitor-init/files/grafana/dashboards). This repository contains JSON files for pre-built dashboards and configuration files for provisioning data sources.

:::

### 3.3 Setting up Grafana Using Macro Script (macOS)

This script automates the Grafana installation process on macOS. Adapt it for other Grafana versions and operating systems as needed.

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

## 4\. Access Services

After installation and configuration, access Prometheus and Grafana interfaces to verify that everything is set up correctly.

- **Prometheus Interface**  
    
  - **URL:** `http://localhost:9090`  
  - **Verification:** Navigate to this URL in your browser. You should see the Prometheus web interface. Use the **Graph** tab to execute sample queries and ensure metrics are being scraped.


- **Grafana Interface**  
    
  - **URL:** `http://localhost:3000`  
  - **Default Credentials:**  
    - **Username:** `admin`  
    - **Password:** `admin`  
  - **Verification:** Upon first login, you'll be prompted to change the default password. After logging in, ensure that the Prometheus data source is correctly configured and that the Kaia dashboard displays metrics.
