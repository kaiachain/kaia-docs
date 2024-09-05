# 코어 셀 모니터링

## 개요 <a id="overview"></a>

The Kaia team provides a site for monitoring the Kaia CCN at [http://node.kaia.io:3000](http://node.kaia.io:3000). `telegraf` 모니터링 에이전트는 CC의 각 CN/PN에 설치되어 메트릭을 수집하고 모니터링 서버로 전송합니다. 설치가 완료되면 모니터링 사이트를 방문하여 카이아 CC의 메트릭을 확인할 수 있습니다.

설치 과정은 다음과 같습니다:

1. CN/PN에 `telegraf`를 설치합니다.
2. `telegraf` 구성하기
3. `telegraf` 시작

## Telegraf 설치 <a id="telegraf-installation"></a>

Telegraf 설치 가이드 (Amazon Linux 2 사용자, 아래 참조): [https://docs.influxdata.com/telegraf/latest/introduction/installation/](https://docs.influxdata.com/telegraf/latest/introduction/installation/)

**Amazon Linux 2 참고**

Amazon Linux 2에 Telegraph를 설치하려면 다음과 같이 InfluxData의 RHEL 7 yum 리포지토리를 사용할 수 있습니다:

```text
cat <<EOF | sudo tee /etc/yum.repos.d/influxdb.repo
[influxdb]
name = InfluxData Repository - Stable
baseurl = https://repos.influxdata.com/stable/\$basearch/main
enabled = 1
gpgcheck = 1
gpgkey = https://repos.influxdata.com/influxdata-archive_compat.key
EOF
```

## Telegraf 설정 <a id="telegraf-setup"></a>

### kcnd/kpnd에서 모니터링 활성화 <a id="enable-monitoring-in-kcnd-kpnd"></a>

/etc/kcnd/conf/kcnd.conf

```text
...
METRICS=1
PROMETHEUS=1
...
```

**확인**

포트 61001이 열려 있는지 확인하여 위의 두 가지 옵션이 활성화되어 있는지 확인할 수 있습니다.

```text
$ netstat -ntap | grep 61001
tcp        0      0 :::61001        :::*       LISTEN      8989/kcn
```

**Telegraf 서비스 구성하기**

다음 파일을 `telegraf` 설정 디렉터리 (`/etc/telegraf/telegraf.d/`)에 복사하고 각 노드에 맞게 `nodetype`, `instance`, `hostname`을 편집합니다:

```text
[global_tags]
  # Change "cn" to "pn" for PN installation
  nodetype = "cn"

  # The CN/PN name (e.g. `example-cn`, `example-pn`)
  instance = "<hostname>"

[agent]
  # The CN/PN name (e.g. `example-cn`, `example-pn`)
  hostname = "<hostname>"

[[outputs.influxdb]]
  urls = [ "http://localhost:" ]
  database = "klaytn_mainnet"

[[inputs.prometheus]]
  urls = [ "http://localhost:61001/metrics" ]
```

`etc/telegraf/telegraf.conf`에서 다음을 변경합니다:

- `[[outputs.influxdb]]` 섹션을 주석 처리합니다.

**Telegraf 시작**

```text
$ systemctl restart telegraf
```

## Grafana <a id="grafana"></a>

각 CN/PN에 위와 같은 구성과 에이전트가 있는 경우 다음 URL에서 메트릭을 확인할 수 있습니다:

[http://node.kaia.io:3000](http://node.kaia.io:3000)

CC 운영자는 Slack 채널에서 회사 이름과 이메일 주소를 제공하여 계정을 요청할 수 있습니다. CC 운영자만 그라파나 계정을 요청할 수 있다는 점에 유의하세요.
