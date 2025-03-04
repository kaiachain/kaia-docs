# 安裝前

## 下載<a id="download"></a>

您可以在[下載頁面](../../downloads/downloads.md)中獲取 CN 和 PN 的軟件包。

## 安裝前<a id="before-you-install"></a>

在安裝 Kaia 軟件包之前，需要創建相關的節點信息，以便註冊節點 URI。 Kgen 軟件包是為 CC 操作員提供的，請按以下順序操作。

1. 下載 `kgen` 軟件包
2. 創建節點密鑰和節點 URI
3. 節點 URI 註冊

### 下載 `kgen` 軟件包<a id="download-kgen-package"></a>

首先，您可以在[下載](../../downloads/downloads.md)頁面下載最新版本的 "kgen "軟件包，這取決於您的操作系統。

您可以在 `bin` 目錄下找到 `kgen` 二進制文件。

### 創建節點密鑰和節點 URI<a id="node-key-node-uri-creation"></a>

節點密鑰和節點 URI 在開始時只創建一次。 節點 URI 必須與核心單元網絡的其他核心單元共享。 一個 CN 通過創建的節點 URI 連接到其他 CN，一個 PN 通過創建的節點 URI 連接到一個 CN 和一些 PN。 節點 URI 是通過下載的 `kgen` 根據節點密鑰創建的。 以下命令行創建了 `nodekey` 和 `node_info.json`。

`kgen` 獲取相關的 IP 和端口號，如下所示。

```text
$ kgen --ip "123.456.789.012" --port 32323 --file
$ ls
nodekey node_info.json
```

節點密鑰 "是一個 64 字節的十六進制字符串，是節點內部使用的私人密鑰。 該私人密鑰必須存在於 Kaia 數據目錄中，小心不要丟失。

```text
$ cat nodekey
f08f2118c455a6c9c9b5e035d3571e570a719ea61771e268546e796a264acc2b
$ mv nodekey ~/kcnd_home
```

創建的文件 `node_info.json` 包含以下內容。

| 關鍵名稱        | 說明           | 示例                                                                                                                                                                                                                                                                   |
| :---------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NodeAddress | 關聯節點的地址      | 0xc8a23d67f2471066fa1b07270651fea7e5c0cf78                                                                                                                                                                                                                           |
| NodeKey     | 節點密鑰（又稱私人密鑰） | aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a                                                                                                                                                                                                     |
| NodeURI     | 節點 URI       | kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0 |

node_info.json "包含以下 JSON 格式的節點信息。

```text
$ cat node_info.json
{
    "NodeAddress": "0xc8a23d67f2471066fa1b07270651fea7e5c0cf78",
    "NodeKey": "aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a",
    "NodeURI": "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0"
}
```

### 節點 URI 註冊<a id="node-uri-enrollment"></a>

創建的節點 URI 應註冊參與核心小區網絡（CCN）。 註冊流程如下。

1. 使用 `kgen` \(`node_info.json`\)創建一個節點 URI，其中包含相關的 IP 和端口號。
2. 將信息發送到 Kaia 官方電子郵件地址（主網地址為 `bootstrap@klaytn.com` 或 Kairos\ 電子郵件地址為 `baobab@klaytn.com`）。

註冊信息應發送至 Kaia 官方郵箱。 格式如下

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

