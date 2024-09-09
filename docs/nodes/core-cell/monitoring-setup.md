# Monitor Core Cell

## Overview <a id="overview"></a>

The Kaia team provides a site for monitoring the Kaia CCN at [http://node.kaia.io:3000](http://node.kaia.io:3000). The `telegraf` monitoring agent is installed in each CN/PN of the CC to collect metrics and send them to the monitoring server. Once installed, you may visit the monitoring site to view the metrics of the Kaia CCs.

The installation process is as follows:

1. Install `telegraf` in the CN/PNs
2. Configure `telegraf`
3. Start `telegraf`

## Telegraf Installation <a id="telegraf-installation"></a>

Telegraf Installation Guide \(Amazon Linux 2 users, see below\): [https://docs.influxdata.com/telegraf/latest/introduction/installation/](https://docs.influxdata.com/telegraf/latest/introduction/installation/)

**Note for Amazon Linux 2**

To install Telegraph on Amazon Linux 2, you may use InfluxData's RHEL 7 yum repo as follows:

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

## Telegraf Setup <a id="telegraf-setup"></a>

### Enable monitoring in kcnd/kpnd <a id="enable-monitoring-in-kcnd-kpnd"></a>

/etc/kcnd/conf/kcnd.conf

```text
...
METRICS=1
PROMETHEUS=1
...
```

**Check**

You may confirm that the above two options are enabled by checking that port 61001 is open.

```text
$ netstat -ntap | grep 61001
tcp        0      0 :::61001        :::*       LISTEN      8989/kcn
```

**Configure Telegraf service**

Copy the following file to the `telegraf` configuration directory \(`/etc/telegraf/telegraf.d/`\), and edit `nodetype`, `instance`, and `hostname` appropriately for each node:

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

Change the following in `/etc/telegraf/telegraf.conf`:

* Comment out the `[[outputs.influxdb]]` section

**Start Telegraf**

```text
$ systemctl restart telegraf
```

## Grafana <a id="grafana"></a>

If each CN/PN has the above configuration and agent, you can check the metrics at the following URL:

[http://node.kaia.io:3000](http://node.kaia.io:3000)

As a CC operator, you may request an account by providing your company name and email address in the Slack channel. Please note that only CC operators are allowed to request a Grafana account.

