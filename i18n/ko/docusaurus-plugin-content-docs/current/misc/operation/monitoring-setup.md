# 노드 모니터링 구성

이 가이드에서는 카이아 노드를 모니터링하기 위해 Prometheus와 Grafana를 설정하는 방법을 설명합니다.

## 1\. Kaia의 메트릭 구성

Kaia는 메트릭 내보내기를 위해 다음과 같은 플래그를 제공합니다:

- `--metric`: 메트릭 기록을 활성화합니다. 이 플래그는 일반적으로 `--prometheus` 플래그와 함께 사용됩니다.
- `--prometheus`: 기록된 메트릭을 Prometheus 서버로 내보낼 수 있습니다. 이 플래그는 일반적으로 `--metric` 플래그와 함께 사용됩니다.
- `--prometheusport`: Prometheus 메트릭의 포트를 지정합니다. 기본값은 `61001`입니다.

메트릭 및 Prometheus 내보내기를 활성화하려면 `.conf` 파일에서 `METRICS`와 `PROMETHEUS`를 모두 `1`로 설정하세요:

```conf
METRICS=1
PROMETHEUS=1
```

## 2\. Prometheus 설정

[Prometheus](https://prometheus.io/)는 모니터링을 위한 중앙 시스템 역할을 하며, 노드에서 실시간 데이터를 추출하고 보관할 수 있는 강력한 데이터 마이닝 기능을 제공합니다.

:::note[Prometheus 하드웨어 요구 사항]

Prometheus를 설정하기 전에 시스템이 다음 하드웨어 요구 사항을 충족하는지 확인하세요:

- **프로세서:** 최소 2개의 CPU
- **메모리:** 최소 4GB RAM
- **저장 공간:** 최소 20GB의 디스크 여유 공간

:::

### 2.1 Prometheus 설치하기

다음 단계는 Prometheus의 수동 설치 프로세스를 간략하게 설명합니다. 구체적인 지침은 운영 체제를 선택하세요. Prometheus 설치에 대한 자세한 내용은 [Prometheus 공식 문서](https://prometheus.io/docs/prometheus/latest/getting_started/)를 참조하세요.

1. 공식 Prometheus 다운로드 페이지에서 사용 중인 아키텍처에 적합한 최신 Prometheus 릴리스(예: darwin-amd64)를 다운로드하세요. 이 가이드에서는 버전 2.53.3을 예로 사용합니다.

```bash
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.darwin-arm64.tar.gz
```

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.linux-amd64.tar.gz
```

2. 다운로드한 아카이브를 압축을 풀고 `/usr/local/bin/`으로 이동하여 바이너리를 설치합니다:

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

3. 다운로드한 아카이브와 압축을 푼 디렉터리를 제거합니다:

```bash
rm -rf prometheus-2.53.3.darwin-arm64.tar.gz prometheus-2.53.3.darwin-amd64
```

```bash
rm -rf prometheus-2.43.0.linux-amd64.tar.gz prometheus-2.43.0.linux-amd64
```

4. 모든 터미널 세션에서 Prometheus에 액세스하려면 `PATH` 환경 변수에 Prometheus를 추가하세요.

```bash
echo "export PATH=\"\$HOME/monitoring/prometheus:\$PATH\"" >> ~/.bashrc
source ~/.bashrc
# This assumes that a prometheus directory already exists in the HOME directory. If not, make a new one (mkdir -p  $HOME/monitoring/prometheus).
```

### 2.2 Prometheus 구성

Kaia 노드에서 메트릭을 스크랩하도록 Prometheus를 구성해야 합니다.

:::info[Prometheus 구성\]

`prometheus.yml` 파일은 Prometheus를 구성합니다.  주요 섹션은 다음과 같습니다:

- **`global`**:  `evaluation_interval`(Prometheus가 규칙을 평가하는 빈도) 및 `scrape_interval`(Prometheus가 타깃을 스크랩하는 빈도)과 같은 전역 구성 매개변수를 설정합니다.  15초는 두 가지 모두에 적합한 시작점이지만, 필요와 차단 시간에 따라 조정할 수 있습니다.

- **`scrape_configs`**: Prometheus가 모니터링하는 대상을 정의합니다.  `job_name`은 대상 그룹을 식별합니다.  `static_configs`는 대상 주소를 나열합니다.  `<ip>`를 Kaia 노드의 IP 주소로 바꾸고 포트(기본값은 `61001`)가 올바르게 구성되었는지 확인합니다.

고급 구성에 대한 자세한 내용은 [Prometheus 문서](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)를 참조하세요.

:::

1. 텍스트 편집기에서 `prometheus/prometheus.yml`에 있는 `prometheus.yml` 파일을 엽니다.

2. `scrape_configs` 섹션에 Kaia 노드가 포함되어 있는지 확인합니다. 아래는 구성 예시입니다:

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

3. `promtool`을 사용하여 구성 파일에 구문 오류가 있는지 확인합니다:

```bash
promtool check config prometheus/prometheus.yml
```

4. 구성 파일로 Prometheus를 시작하세요.

```bash
prometheus --config.file=prometheus/prometheus.yml
```

### 2.3 매크로 스크립트를 사용하여 Prometheus 설정하기(macOS)

이 스크립트는 macOS에서 Prometheus 설치 및 구성 프로세스를 자동화합니다. 필요에 따라 다른 Prometheus 버전 및 운영 체제에 맞게 조정할 수 있습니다.

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

## 3\. Grafana 설정

Grafana를 사용하면 사용자 지정 가능한 대시보드를 통해 Prometheus에서 수집한 메트릭을 시각화할 수 있습니다.

:::note[Grafana 시스템 요구 사항]

Grafana를 설정하기 전에 시스템이 [공식 Grafana 문서](https://grafana.com/docs/grafana/latest/setup-grafana/installation/)의 최소 하드웨어 및 소프트웨어 요구 사항을 충족하는지 확인하세요.

:::

### 3.1 Grafana 설치하기

운영 체제에 적합한 방법을 사용하여 Grafana를 다운로드하여 설치합니다. 예를 들어, [Hombrew를 사용하는 macOS에서](https://grafana.com/docs/grafana/latest/setup-grafana/installation/mac/)(`brew install grafana`)를 통해 Grafana를 설치할 수 있습니다. 자세한 지침은 [공식 그라파나 설치 가이드](https://grafana.com/docs/grafana/latest/setup-grafana/installation/)를 참조하세요.

### 3.2 Grafana 구성하기

Prometheus에서 수집한 메트릭을 시각화하도록 Grafana를 설정하세요.

1. Grafana 서버를 시작합니다.

```bash
# macOS using Homebrew
brew services start grafana
```

다른 운영 체제의 경우 [공식 Grafana 문서](https://grafana.com/docs/grafana/latest/setup-grafana/start-restart-grafana/)를 참조하세요.

2. 웹 브라우저를 열고 `http://localhost:3000`로 이동합니다. 기본 자격증명(admin/admin)을 사용하여 로그인합니다.

3. Prometheus를 데이터 소스로 추가합니다.

  - **Cofiguration** -> **Data Sources**로 이동합니다.
  - **Add data source**를 클릭합니다.
  - 유형으로 **프로메테우스**를 선택합니다.
  - **URL**을 `http://localhost:9090`으로 설정합니다(Prometheus가 다른 서버에 있는 경우 수정).
  - **Save & Test**를 클릭하여 연결을 확인합니다.

4. Kaia 대시보드를 추가하고 패널을 추가하여 Kaia 블록 번호를 시각화합니다.
  - [Create a new dashboard](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/)를 클릭하거나 기존 대시보드로 이동합니다.
  - 오른쪽 상단의 **Edit**을 클릭하고 대시보드 헤더에서 **Add**를 클릭한 다음 드롭다운에서 **Visualization**을 선택하여 패널을 추가합니다.
  - **Query** 아래에 있습니다:
    1. Prometheus를 **Data source**로 선택합니다.
    2. **Metric** 필드에 `klaytn_blockchain_head_blocknumber`를 입력합니다.
    3. **Options**의 **Legend** 드롭다운에서 **Custom**을 선택하고 사용자 지정 범례 형식으로 `{{instance}}`를 입력합니다.
  - **Apply**를 클릭하여 패널을 대시보드에 저장합니다.

:::note[Additional Kaia 대시보드]

사전 구성된 전체 대시보드와 자동화된 프로비저닝 설정은 [klaytn-deploy 저장소](https://github.com/klaytn/klaytn-deploy/tree/main/grafana)를 참조하세요. 이 리포지토리에는 사전 구축된 대시보드용 JSON 파일과 데이터 소스 프로비저닝을 위한 구성 파일이 포함되어 있습니다.

:::

### 3.3 매크로 스크립트를 사용하여 Grafana 설정하기(macOS)

이 스크립트는 macOS에서 Grafana 설치 프로세스를 자동화합니다. 필요에 따라 다른 Grafana 버전 및 운영 체제에 맞게 조정하세요.

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

## 4\. 액세스 서비스

설치 및 구성이 완료되면 Prometheus 및 Grafana 인터페이스에 액세스하여 모든 것이 올바르게 설정되었는지 확인합니다.

- **프로메테우스 인터페이스**

  - **URL:** `http://localhost:9090`
  - **확인:** 브라우저에서 이 URL로 이동합니다. Prometheus 웹 인터페이스가 표시될 것입니다. **Graph** 탭을 사용하여 샘플 쿼리를 실행하고 메트릭이 스크랩되고 있는지 확인합니다.

- **Grafana 인터페이스**

  - **URL:** `http://localhost:3000`
  - **기본 접속정보:**
    - **사용자 이름:** `admin`
    - **비밀번호:** `admin`
  - \*\*인증: 처음 로그인하면 기본 비밀번호를 변경하라는 메시지가 표시됩니다. 로그인한 후 Prometheus 데이터 소스가 올바르게 구성되었는지, Kaia 대시보드에 메트릭이 표시되는지 확인합니다.