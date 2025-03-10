# 安裝 4 節點服務鏈

本節介紹如何設置多節點 ServiceChain。 我們將建立一個 4 個共識節點的 ServiceChain，"chainID "為 1002，如下圖中藍色邊框所示。

![](/img/nodes/sc-4scn-arch.png)

## 先決條件<a id="prerequisites"></a>

- 從 [Download](../../downloads/downloads.md) 下載 `kscn`、`homi` 二進制軟件包。
- 4 臺 Linux 或 MacOS 服務器
- 最低硬件要求
 - CPU: 4-core (Intel Xeon or equivalent), RAM: 16GB, HDD: 50GB
 - 更多解釋請參閱 [系統要求](../system-requirements.md)。

## 步驟 0：在所有節點上安裝 SCN<a id="install-scn"></a>

安裝就是解壓縮下載的軟件包。 在每臺服務器上提取 SCN 存檔。

```console
$ tar xvf kscn-vX.X.X-XXXXX-amd64.tar.gz
x kscn-XXXXX-amd64/
x kscn-XXXXX-amd64/conf/
x kscn-XXXXX-amd64/conf/kscnd.conf
x kscn-XXXXX-amd64/bin/
x kscn-XXXXX-amd64/bin/kscnd
x kscn-XXXXX-amd64/bin/kscn
```

為方便起見，我們將在 $PATH中添加二進制路徑。 使用節點上的實際路徑。

```console
$ export PATH=$PATH:~/path/to/kscn-XXXXX-amd64/bin
```

SCN 還提供各種 RPM 發行版，如 RHEL、CentOS 和 Fedora。 有關詳細信息，請參閱 [安裝](../install-service-chain.md#installation)。

```console
$ curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/prod.repo
  % Total % Received % Xferd Average Speed Time Time Time Current Dload Upload Total Spent Left Speed
     100 118 100 118 0 0 1113 0 --:--:-- --:--:-- --:--:-- 1102 

$ yum list | grep kaia 
packages-klaytn-prod 31 kB/s | 2.9 kB 00:00 
homi.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kbnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kcnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kcnd-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kend.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kend-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kgen.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kpnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kpnd-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kscnd.x86_64          v1.8.0-0.el7      packages-klaytn-prod 
ksend.x86_64          v1.8.0-0.el7      packages-klaytn-prod 
kspnd.x86_64          v1.8.0-0.el7      packages-klaytn-prod 

$ yum install kscnd
```

## 第 1 步：創建 genesis.json 和節點密鑰<a id="step-1-create-genesis-json-and-a-key"></a>

我們將使用 homi 工具生成所需的文件。
homi "是一種實用工具，可自動生成腳本、配置文件和私鑰，以配置 Kaia 區塊鏈。
你可以在任何 Linux/Mac 電腦上執行 homi。

首先，解壓縮下載的 homi 壓縮包。

```console
$ tar xvf homi-vX.X.X-XXXXX-amd64.tar.gz
x homi-XXXXX-amd64/
x homi-XXXXX-amd64/bin/
x homi-XXXXX-amd64/bin/homi
```

轉到 `bin` 文件夾，使用以下選項執行 `homi` 以生成文件。
`homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1002 --p2p-port 22323 -o homi-output`
由於 Kairos 的 "chainID "是 1001，為方便起見，本例中構建的 ServiceChain 的 "chainID "設置為 1002。 通過啟動實際服務運行區塊鏈時，建議在 https://chainlist.defillama.com/ 註冊新的 chainID 值後使用，這樣 chainID 就不會與其他 ServiceChain 重疊。 ServiceChain 端口設置為 22323，這是默認端口。

```console
$ ./homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1002 --p2p-port 22323 -o homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/keys/passwd2
Created :  homi-output/keys/passwd3
Created :  homi-output/keys/passwd4
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/keys/nodekey2
Created :  homi-output/keys/validator2
Created :  homi-output/keys/nodekey3
Created :  homi-output/keys/validator3
Created :  homi-output/keys/nodekey4
Created :  homi-output/keys/validator4
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/keys_test/testkey1
Created :  homi-output/keys_test/keystore1/0xdC7218621513f71d609653d22C39d79d558d9CDC
Created :  homi-output/Kaia.json
Created :  homi-output/Kaia_txpool.json
```

在輸出結果中，我們將在後續步驟中使用`nodekey*`、`genesis.json`和`static-nodes.json`。

## 第 2 步：自定義 static-nodes.json<a id="step-2-customize-static-nodes-json"></a>

在文本編輯器中打開 `homi-output/scripts/static-nodes.json`，然後用節點的實際值更新 IP 地址和端口。
在本例中，假設服務鏈中每個 SCN 節點的 IP 如下圖所示。 請記住您在此處分配的端口，因為稍後在第 4 步中會用到它。

![](/img/nodes/sc-4scn-ip.png)

```json
[
     "kni://38693ad4b17ff77...23153@192.168.0.1:22323?discport=0\u0026ntype=cn",
     "kni://f36d969b16f7337...1329b@192.168.0.2:22323?discport=0\u0026ntype=cn",
     "kni://16e55d8921ab034...b2bec@192.168.0.3:22323?discport=0\u0026ntype=cn",
     "kni://0973e792a421c1d...bbd71@192.168.0.4:22323?discport=0\u0026ntype=cn"
]
```

更新`static-nodes.json`後，將輸出文件夾（`homi-output`）上傳到所有 SCN，即 本例中的 SCN-L2-01、SCN-L2-02、SCN-L2-03、SCN-L2-04 節點。

```console
$ scp -r path/to/homi-output/ user@192.168.0.1:~/
$ scp -r path/to/homi-output/ user@192.168.0.2:~/
$ scp -r path/to/homi-output/ user@192.168.0.3:~/
$ scp -r path/to/homi-output/ user@192.168.0.4:~/
```

## 步驟 3：節點初始化<a id="step-3-node-initialization"></a>

現在，我們將使用創世文件初始化每個節點。 在每個節點上執行以下命令。
它會在你的主目錄下創建數據文件夾，存儲鏈數據和日誌。
您可以使用 `--datadir` 指令更改數據文件夾。
在本例中，我們將數據文件夾設置為 `\~/data`。

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json

$ ls ~/data
keystore	klay		kscn
```

## 步驟 4：安裝 `nodekey` 和 \`static-nodes.json<a id="step-4-install-nodekey"></a>

在每個 SCN 上，將 `static-nodes.json` 複製到數據文件夾。

```console
$ cp ~/homi-output/scripts/static-nodes.json ~/data/
```

在步驟 1 中，我們生成了 4 個節點密鑰。
將每個節點密鑰分配給 SCN，並將匹配的 "節點密鑰 "複製到每個 SCN 的數據文件夾中。
例如，SCN-L2-01（192.168.0.1）節點使用 `nodekey1`，SCN-L2-02（192.168.0.2）、SCN-L2-03（192.168.0.3）和 SCN-L2-04（192.168.0.4）節點分別使用 `nodekey2`、`nodekey3` 和 `nodekey4`。

```console
$ cp ~/homi-output/keys/nodekey{1..4} ~/data/klay/nodekey
```

![](/img/nodes/sc-4scn-nodekey.png)

## 步驟 5：配置節點<a id="step-5-configure-nodes"></a>

在每個 SCN 上，進入 kscn 安裝文件夾並按如下方式編輯 `conf/kscnd.conf`。 端口 "是用於設置 "homi "的端口，"SC_SUB_BRIDGE "是下一節連接網橋時所需的。 目前，只需將其設置為 0。 在 `DATA_DIR` 中，輸入步驟 3 中使用的數據文件夾。

```
...
PORT=22323
...
SC_SUB_BRIDGE=0
...
DATA_DIR=~/data
...
```

## 步驟 6：啟動節點<a id="step-6-start-nodes"></a>

在所有 SCN 節點上執行以下命令。

```console
$ kscnd start
Starting kscnd: OK
```

您可以通過查看 `kaia.blockNumber` 來檢查區塊生成狀態。 如果該數字不為 0，則說明節點工作正常。

```console
$ kscn attach --datadir ~/data
> kaia.blockNumber
10
```

如果要停止一個節點，可以使用命令 `kscnd stop` 來完成。

## (示例）創建和確認價值轉移交易<a id="example-creation-and-confirmation-of-a-value-transfer-transaction"></a>

現在，4 節點 ServiceChain 已開始運行。 我們將在服務鏈中執行價值轉移交易，以確認安裝。

![](/img/nodes/sc-4scn-test.png)

### 第 1 步：導入測試賬戶<a id="step-1-import-the-test-account"></a>

testkey1 "由步驟 1 中的 "homi "自動生成。 KAIA 已分配給測試賬戶，如 `genesis.json` 中所述，該賬戶也是由 `homi` 生成的。

```console
$ kscn account import --datadir ~/data ~/homi-output/keys_test/testkey1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {80119c31cdae67c42c8296929bb4f89b2a52cec4}
```

### 步驟 2：解鎖賬戶<a id="step-2-unlock-the-account"></a>

只有通過導入`testkey1`的 SCN 節點的控制檯才能解鎖賬戶。

```console
$ kscn attach --datadir ~/data
> personal.unlockAccount("80119c31cdae67c42c8296929bb4f89b2a52cec4")
Unlock account 80119c31cdae67c42c8296929bb4f89b2a52cec4
Passphrase:
true
```

### 步驟 3：發送交易並查看餘額<a id="step-3-send-a-transaction-and-check-the-balance"></a>

```console
> kaia.sendTransaction({from: "80119c31cdae67c42c8296929bb4f89b2a52cec4", to: "305c6cc464d5fe1e624679695a20d641a01688e1", value: 10})
"0xa0e7102e8f14200cec8d964aacc1c9ed7c22271078b2b213170c64333cbca8a3"
> kaia.getBalance("305c6cc464d5fe1e624679695a20d641a01688e1")
10
```

:::note

服務鏈的最簡單形式是隻有一個 SCN。
本教程中說明的 ServiceChain 是一個 4 節點 ServiceChain。 不過，如果您願意，也可以建立單節點 ServiceChain。
只需在 "步驟 1：創建 genesis.json 和 nodekeys "中向 homi 傳遞"--cn-num 1"，而不是"--cn-num 4"。

至少需要 4 個節點才能容許拜占庭故障。 因此，在 BFT 算法下，實現高可用性的 SCN 數量最少為 4。 僅有 2 個 SCN 節點是不夠的，因為如果其中一個 SCN 出現故障，另一個 SCN 就無法獨立達成共識。

:::
