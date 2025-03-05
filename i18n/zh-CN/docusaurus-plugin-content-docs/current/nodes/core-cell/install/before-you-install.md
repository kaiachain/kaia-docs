# 安装前

## 下载<a id="download"></a>

您可以在[下载页面](../../downloads/downloads.md)中获取 CN 和 PN 的软件包。

## 安装前<a id="before-you-install"></a>

在安装 Kaia 软件包之前，需要创建相关的节点信息，以便注册节点 URI。 Kgen 软件包是为 CC 操作员提供的，请按以下顺序操作。

1. 下载 `kgen` 软件包
2. 创建节点密钥和节点 URI
3. 节点 URI 注册

### 下载 `kgen` 软件包<a id="download-kgen-package"></a>

首先，您可以在[下载](../../downloads/downloads.md)页面下载最新版本的 "kgen "软件包，这取决于您的操作系统。

您可以在 `bin` 目录下找到 `kgen` 二进制文件。

### 创建节点密钥和节点 URI<a id="node-key-node-uri-creation"></a>

节点密钥和节点 URI 在开始时只创建一次。 节点 URI 必须与核心单元网络的其他核心单元共享。 一个 CN 通过创建的节点 URI 连接到其他 CN，一个 PN 通过创建的节点 URI 连接到一个 CN 和一些 PN。 节点 URI 是通过下载的 `kgen` 根据节点密钥创建的。 以下命令行创建了 `nodekey` 和 `node_info.json`。

`kgen` 获取相关的 IP 和端口号，如下所示。

```text
$ kgen --ip "123.456.789.012" --port 32323 --file
$ ls
nodekey node_info.json
```

节点密钥 "是一个 64 字节的十六进制字符串，是节点内部使用的私人密钥。 该私人密钥必须存在于 Kaia 数据目录中，小心不要丢失。

```text
$ cat nodekey
f08f2118c455a6c9c9b5e035d3571e570a719ea61771e268546e796a264acc2b
$ mv nodekey ~/kcnd_home
```

创建的文件 `node_info.json` 包含以下内容。

| 关键名称        | 说明           | 示例                                                                                                                                                                                                                                                                   |
| :---------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NodeAddress | 关联节点的地址      | 0xc8a23d67f2471066fa1b07270651fea7e5c0cf78                                                                                                                                                                                                                           |
| NodeKey     | 节点密钥（又称私人密钥） | aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a                                                                                                                                                                                                     |
| NodeURI     | 节点 URI       | kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0 |

node_info.json "包含以下 JSON 格式的节点信息。

```text
$ cat node_info.json
{
    "NodeAddress": "0xc8a23d67f2471066fa1b07270651fea7e5c0cf78",
    "NodeKey": "aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a",
    "NodeURI": "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0"
}
```

### 节点 URI 注册<a id="node-uri-enrollment"></a>

创建的节点 URI 应注册参与核心小区网络（CCN）。 注册流程如下。

1. 使用 `kgen` \(`node_info.json`\)创建一个节点 URI，其中包含相关的 IP 和端口号。
2. 将信息发送到 Kaia 官方电子邮件地址（主网地址为 `bootstrap@klaytn.com` 或 Kairos\ 电子邮件地址为 `baobab@klaytn.com`）。

注册信息应发送至 Kaia 官方邮箱。 格式如下

如果是 CN、

```text
Company: Kakao
CN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

如果是 PN、

```text
Company: Kakao
PN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

