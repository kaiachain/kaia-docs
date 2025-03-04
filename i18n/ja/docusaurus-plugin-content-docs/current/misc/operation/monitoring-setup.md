# ノード監視の設定

このガイドでは、Kaiaノードを監視するためにPrometheusとGrafanaをセットアップする方法を説明します。

## 1\. カイアのメトリック設定

Kaiaはメトリック・エクスポート用に以下のフラグを提供しています：

- `--metric`：メトリックの記録を有効にする。 このフラグは通常、`--prometheus`フラグと併用される。
- `--prometheus`：記録したメトリクスをPrometheusサーバーにエクスポートできるようにする。 このフラグは通常、`--metric`フラグと一緒に使われる。
- `--prometheusport`：Prometheus メトリクスのポートを指定します。 デフォルトは `61001` である。

メトリクスと Prometheus のエクスポートを有効にするには、`.conf` ファイルで `METRICS` と `PROMETHEUS` の両方を `1` に設定します：

```conf
METRICS=1
PROMETHEUS=1
```

## 2\. プロメテウスのセットアップ

[プロメテウス](https://prometheus.io/)は、モニタリングの中央システムとして機能し、ノードからリアルタイムデータを抽出してアーカイブする堅牢なデータマイニング機能を提供します。

:::note[Prometheus ハードウェア要件］

Prometheusをセットアップする前に、お使いのシステムが以下のハードウェア要件を満たしていることを確認してください：

- **プロセッサ：** 少なくとも2CPU
- **メモリ：** 最低4GB RAM
- **ストレージ:** 少なくとも20GBのディスク空き容量

:::

### 2.1 Prometheusのインストール

以下の手順は、Prometheus の手動インストール手順の概要です。 具体的な手順については、お使いのオペレーティングシステムを選択してください。 Prometheusのインストールに関する詳細は、[Prometheus公式ドキュメント](https://prometheus.io/docs/prometheus/latest/getting_started/)を参照してください。

1. あなたのアーキテクチャに適した最新のPrometheusリリース（例：darwin-amd64）をPrometheus公式ダウンロードページからダウンロードしてください。 このガイドでは、バージョン2.53.3を例にしています。

```bash
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.darwin-arm64.tar.gz
```

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.linux-amd64.tar.gz
```

2. ダウンロードしたアーカイブを展開し、バイナリを `/usr/local/bin/` に移動してインストールする：

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

3. ダウンロードしたアーカイブと解凍したディレクトリを削除します：

```bash
rm -rf prometheus-2.53.3.darwin-arm64.tar.gz prometheus-2.53.3.darwin-amd64
```

```bash
rm -rf prometheus-2.43.0.linux-amd64.tar.gz prometheus-2.43.0.linux-amd64
```

4. Prometheusを環境変数`PATH`に追加すると、どのターミナルセッションからでもPrometheusにアクセスできるようになります。

```bash
echo "export PATH=\"\$HOME/monitoring/prometheus:\$PATH\"" >> ~/.bashrc
source ~/.bashrc
# This assumes that a prometheus directory already exists in the HOME directory. If not, make a new one (mkdir -p  $HOME/monitoring/prometheus).
```

### 2.2 Prometheusの設定

PrometheusはKaiaノードからメトリクスをスクレイピングするように設定する必要があります。

:::info[Prometheus 構成]

`prometheus.yml`ファイルはPrometheusを設定する。  主な項目は以下の通り：

- \*\*global`**：  evaluation_interval`（Prometheusがルールを評価する頻度）や `scrape_interval`（Prometheusがターゲットをスクレイピングする頻度）のようなグローバルな設定パラメータを設定します。  どちらも15秒が妥当なスタートポイントだが、ニーズやブロックの時間に応じて調整しよう。

- **`scrape_configs`**：Prometheusが監視するターゲットを定義します。  `job_name`は対象グループを示す。  `static_configs`はターゲットアドレスをリストアップする。  `<ip>`をKaiaノードのIPアドレスに置き換え、ポート（デフォルトでは`61001`）が正しく設定されていることを確認する。

より高度な設定については、[Prometheus documentation](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)を参照してください。

:::

1. `prometheus/prometheus.yml`にある`prometheus.yml`ファイルをテキストエディタで開く。

2. `scrape_configs`セクションにKaiaノードが含まれていることを確認してください。 以下に設定例を示す：

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

3. `promtool`を使用して、設定ファイルに構文エラーがないかチェックする：

```bash
promtool check config prometheus/prometheus.yml
```

4. 設定ファイルを使ってPrometheusを起動します。

```bash
prometheus --config.file=prometheus/prometheus.yml
```

### 2.3 マクロスクリプトを使ったPrometheusの設定（macOS）

このスクリプトは、macOS上でのPrometheusのインストールと設定プロセスを自動化します。 必要に応じて、他のPrometheusのバージョンやオペレーティングシステムに適応させてください。

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

## 3\. Grafanaのセットアップ

Grafanaでは、カスタマイズ可能なダッシュボードを通じて、Prometheusが収集したメトリクスを可視化することができます。

:::note[Grafana システム要件］

Grafanaをセットアップする前に、お使いのシステムが[Grafana公式ドキュメント](https://grafana.com/docs/grafana/latest/setup-grafana/installation/)にあるハードウェアとソフトウェアの最小要件を満たしていることを確認してください。

:::

### 3.1 Grafanaのインストール

お使いのオペレーティングシステムに適した方法でGrafanaをダウンロードし、インストールする。 例えば、Grafanaを[Hombrewを使ってmacOSに](https://grafana.com/docs/grafana/latest/setup-grafana/installation/mac/) (`brew install grafana`)インストールすることができる。 詳細な手順については、[公式Grafanaインストールガイド](https://grafana.com/docs/grafana/latest/setup-grafana/installation/)を参照してください。

### 3.2 Grafanaの設定

Prometheusが収集したメトリクスを可視化するためにGrafanaをセットアップする。

1. Grafana Serverを起動します。

```bash
# macOS using Homebrew
brew services start grafana
```

その他のOSについては、[Grafana公式ドキュメント](https://grafana.com/docs/grafana/latest/setup-grafana/start-restart-grafana/)を参照してください。

2. ウェブブラウザを開き、`http://localhost:3000`に移動する。 デフォルトの認証情報（admin/admin）を使用してログインする。

3. プロメテウスをデータソースとして追加する。

  - **Configiguration** -> **Data Sources** に移動します。
  - **Add data source**をクリックします。
  - タイプは**Prometheus**を選択してください。
  - **URL** を `http://localhost:9090` に設定してください（Prometheus が別のサーバーにある場合は変更してください）。
  - **Save & Test**をクリックして接続を確認します。

4. カイアのダッシュボードを追加し、カイアのブロック番号を可視化するパネルを追加する。
  - [新しいダッシュボードを作成する](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/)、または既存のダッシュボードに移動する。
  - 右上の**Edit**をクリックし、ダッシュボードのヘッダーにある**Add**をクリックし、ドロップダウンから**Visualization**を選択してパネルを追加します。
  - **Query**の下：
    1. プロメテウスを**Data source**として選択します。
    2. **Metric**フィールドに `klaytn_blockchain_head_blocknumber` と入力する。
    3. **Options**で、**Legend** ドロップダウンから**Custom** を選択し、カスタム凡例フォーマットとして `{{instance}}` を入力する。
  - **Apply**をクリックしてパネルをダッシュボードに保存します。

:::note[Additional カイア・ダッシュボード］

設定済みのダッシュボードと自動プロビジョニングのセットアップについては、[klaytn-deploy リポジトリ](https://github.com/klaytn/klaytn-deploy/tree/main/grafana) を参照してください。 このリポジトリには、事前構築されたダッシュボードの JSON ファイルと、データソースをプロビジョニングするための設定ファイルが含まれています。

:::

### 3.3 マクロスクリプトによるGrafanaの設定（macOS）

このスクリプトは、macOS上でのGrafanaのインストールプロセスを自動化します。 必要に応じて、他のGrafanaのバージョンやオペレーティングシステムに適応させる。

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

## 4\. アクセスサービス

インストールと設定が終わったら、PrometheusとGrafanaのインターフェースにアクセスして、すべてが正しく設定されていることを確認する。

- **Prometheusインターフェース**

  - **URL:** `http://localhost:9090`
  - \*\*検証：\*\*ブラウザでこのURLに移動します。 プロメテウスのウェブインターフェイスが表示されるはずです。 **Graph**タブを使用してサンプル・クエリーを実行し、メトリクスがスクレイピングされていることを確認します。

- **Grafanaインターフェイス**

  - **URL:** `http://localhost:3000`
  - **デフォルトの認証情報:**。
    - **ユーザー名:** `admin`
    - **パスワード：** `admin`
  - \*\*確認：\*\*初回ログイン時に、デフォルトパスワードの変更を促すメッセージが表示されます。 ログイン後、Prometheusデータソースが正しく設定され、Kaiaダッシュボードにメトリクスが表示されていることを確認します。