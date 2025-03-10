# 监控核心单元

## 概述<a id="overview"></a>

Kaia 团队在 [http://node.kaia.io:3000](http://node.kaia.io:3000)提供了一个监测 Kaia CCN 的网站。 CC 的每个 CN/PN 都安装了 "telegraf "监控代理，以收集指标并将其发送到监控服务器。 安装完成后，您可以访问监控站点，查看 Kaia CC 的指标。

安装过程如下：

1. 在 CN/PN 中安装\`telegraf
2. 配置 \`telegraf
3. 启动 `telegraf`

## Telegraf 安装<a id="telegraf-installation"></a>

Telegraf Installation Guide （亚马逊 Linux 2 用户，见下文）：[https://docs.influxdata.com/telegraf/latest/introduction/installation/](https://docs.influxdata.com/telegraf/latest/introduction/installation/)

**亚马逊 Linux 2**注意事项

要在 Amazon Linux 2 上安装 Telegraph，可以使用 InfluxData 的 RHEL 7 yum repo，具体方法如下：

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

## Telegraf 设置<a id="telegraf-setup"></a>

### 启用 kcnd/kpnd 中的监控功能<a id="enable-monitoring-in-kcnd-kpnd"></a>

/etc/kcnd/conf/kcnd.conf

```text
...
METRICS=1
PROMETHEUS=1
...
```

**检查**

您可以通过检查端口 61001 是否打开来确认上述两个选项是否启用。

```text
$ netstat -ntap | grep 61001
tcp        0      0 :::61001        :::*       LISTEN      8989/kcn
```

**配置 Telegraf 服务**

将以下文件复制到 `telegraf` 配置目录（`/etc/telegraf/telegraf.d/`/），并为每个节点适当编辑 `nodetype`、`instance` 和`hostname`：

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

在 `/etc/telegraf/telegraf.conf`中更改以下内容：

- 注释掉 `[[outputs.influxdb]]`部分

**启动电报**

```text
$ systemctl restart telegraf
```

## Grafana <a id="grafana"></a>

如果每个 CN/PN 都有上述配置和代理，则可通过以下 URL 查看指标：

[http://node.kaia.io:3000](http://node.kaia.io:3000)

作为 CC 操作员，您可以在 Slack 频道中提供公司名称和电子邮件地址，申请一个账户。 请注意，只有 CC 操作员才能申请 Grafana 帐户。

