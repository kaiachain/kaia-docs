# 監控核心單元

## 概述<a id="overview"></a>

Kaia 團隊在 [http://node.kaia.io:3000](http://node.kaia.io:3000)提供了一個監測 Kaia CCN 的網站。 CC 的每個 CN/PN 都安裝了 "telegraf "監控代理，以收集指標並將其發送到監控服務器。 安裝完成後，您可以訪問監控站點，查看 Kaia CC 的指標。

安裝過程如下：

1. 在 CN/PN 中安裝\`telegraf
2. 配置 \`telegraf
3. 啟動 `telegraf`

## Telegraf 安裝<a id="telegraf-installation"></a>

Telegraf Installation Guide （亞馬遜 Linux 2 用戶，見下文）：[https://docs.influxdata.com/telegraf/latest/introduction/installation/](https://docs.influxdata.com/telegraf/latest/introduction/installation/)

**亞馬遜 Linux 2**注意事項

要在 Amazon Linux 2 上安裝 Telegraph，可以使用 InfluxData 的 RHEL 7 yum repo，具體方法如下：

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

## Telegraf 設置<a id="telegraf-setup"></a>

### 啟用 kcnd/kpnd 中的監控功能<a id="enable-monitoring-in-kcnd-kpnd"></a>

/etc/kcnd/conf/kcnd.conf

```text
...
METRICS=1
PROMETHEUS=1
...
```

**檢查**

您可以通過檢查端口 61001 是否打開來確認上述兩個選項是否啟用。

```text
$ netstat -ntap | grep 61001
tcp        0      0 :::61001        :::*       LISTEN      8989/kcn
```

**配置 Telegraf 服務**

將以下文件複製到 `telegraf` 配置目錄（`/etc/telegraf/telegraf.d/`/），併為每個節點適當編輯 `nodetype`、`instance` 和`hostname`：

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

在 `/etc/telegraf/telegraf.conf`中更改以下內容：

- 註釋掉 `[[outputs.influxdb]]`部分

**啟動電報**

```text
$ systemctl restart telegraf
```

## Grafana <a id="grafana"></a>

如果每個 CN/PN 都有上述配置和代理，則可通過以下 URL 查看指標：

[http://node.kaia.io:3000](http://node.kaia.io:3000)

作為 CC 操作員，您可以在 Slack 頻道中提供公司名稱和電子郵件地址，申請一個賬戶。 請注意，只有 CC 操作員才能申請 Grafana 帳戶。
