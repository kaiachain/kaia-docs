# モニター・コアセル

## 概要<a id="overview"></a>

カイアチームは、カイアCCNの監視サイトを[http://node.kaia.io:3000](http://node.kaia.io:3000)に提供している。 `telegraf`監視エージェントはCCの各CN/PNにインストールされ、メトリクスを収集し、監視サーバーに送信する。 インストールが完了したら、モニタリング・サイトにアクセスして、カイアCCのメトリクスを見ることができます。

インストール手順は以下の通り：

1. CN/PNに`telegraf`をインストールする。
2. `telegraf`を設定する
3. `telegraf`を開始する。

## テレグラフ・インストール<a id="telegraf-installation"></a>

Telegraf Installation Guide (Amazon Linux 2 users, see below): [https://docs.influxdata.com/telegraf/latest/introduction/installation/](https://docs.influxdata.com/telegraf/latest/introduction/installation/)

**Amazon Linux 2**に関する注意事項

Amazon Linux 2にTelegraphをインストールするには、以下のようにInfluxDataのRHEL 7のyum repoを使うことができる：

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

## テレグラフ・セットアップ<a id="telegraf-setup"></a>

### kcnd/kpndでモニタリングを有効にする<a id="enable-monitoring-in-kcnd-kpnd"></a>

/etc/kcnd/conf/kcnd.conf

```text
...
METRICS=1
PROMETHEUS=1
...
```

**チェック**

ポート61001が開いていることを確認することで、上記の2つのオプションが有効になっていることを確認できる。

```text
$ netstat -ntap | grep 61001
tcp        0      0 :::61001        :::*       LISTEN      8989/kcn
```

**テレグラフサービスを設定する**。

以下のファイルを `telegraf` 設定ディレクトリにコピーし、各ノードの `nodetype`、`instance`、`hostname` を適切に編集する：

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

`etc/telegraf/telegraf.conf`の以下を変更してください：

- outputs.influxdb]]\`セクションをコメントアウトする。

**テレグラフ**を開始

```text
$ systemctl restart telegraf
```

## Grafana <a id="grafana"></a>

各 CN/PN に上記の設定とエージェントがあれば、以下の URL でメトリクスを確認できます：

[http://node.kaia.io:3000](http://node.kaia.io:3000)

CCの運営者として、Slackチャンネルに会社名とメールアドレスを記入し、アカウントをリクエストすることができます。 なお、GrafanaアカウントをリクエストできるのはCCオペレーターのみです。
