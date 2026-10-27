# Configure high availability

If only one bridge is used in the ServiceChain, that bridge can become a single point of failure. To solve this, we describe how you can build an HA system with two or more bridges. As shown in the figure below, configure the bridges to be connected in at least two pairs, so that even if there is a problem in one bridge connection, data anchoring and value transfer between chains can still work normally through the other bridge.

![](/img/nodes/sc-ha-arch.png)

## Prerequisites <a id="prerequisites"></a>

- The main bridge of the EN and the sub bridge of the SCN are connected. If it's not, please refer to [Kairos connection](en-scn-connection.md) to establish the connection.
- This section describes how to add an extra bridge between Kairos and a ServiceChain. In the same way, you can also set up HA by adding another bridge.

## Step 1: Adding another Bridge between EN-SCN <a id="step-1-adding-another-bridge-between-en-scn"></a>

In [Connecting to Kairos](en-scn-connection.md), we assume that the EN and the SCN connected by a bridge as EN-01 and SCN-L2-01, respectively. In this section, we will add another bridge between EN-02 and SCN-L2-02.
Since it follows the same procedure, we will briefly explain.

![](/img/nodes/sc-ha-add-bridge.png)

After building EN-02, set `SC_MAIN_BRIDGE` to 1 in `conf/kend.conf` and restart ken on EN-02.

```console
SC_MAIN_BRIDGE=1
```

Check the KNI information of EN-02 by the following command:

```console
EN-02$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://eb8f21df10c6562...25bae@[::]:50505?discport=0"
```

Log in to SCN-L2-02, and create `main-bridges.json` with the KNI of EN-02. Please make sure that it should be in the JSON array format with a square bracket.

```console
SCN-L2-02$ echo '["kni://eb8f21df10c6562...25bae@192.168.0.5:50505?discport=0"]' > ~/data/main-bridges.json
```

On the shell of SCN-L2-02, edit `kscn-XXXXX-amd64/conf/kscnd.conf` as described below.
To connect a bridge, set `SC_SUB_BRIDGE` to 1.
`SC_PARENT_CHAIN_ID` is set to Kairos's `chainID` 1001.
`SC_ANCHORING_PERIOD` is the parameter that decides the period to send an anchoring transaction to the parent chain. In this example, an anchor transaction is submitted to the parent chain (Kairos) for every 10 child blocks.

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

If you restart ken on EN-02, a bridge will be connected automatically between the EN-02 and the SCN-L2-02 and data anchoring will start from the point where the connection is made as shown in the figure below.

After adding the bridge between EN-02 and SCN-L2-02, you can now see the connection between the nodes are established as shown in below.

![](/img/nodes/sc-ha-before-register.png)

## Step 2: Registering and Subscribing the Bridge Contract <a id="step-2-registering-and-subscribing-the-bridge-contract"></a>

As shown in the figure above, the bridge contract is registered only in EN-01 and SCN-L2-01.

Connect to the SCN-L2-02 console and run the APIs for bridge registration, bridge subscription, and token registration. The bridge and token contract were created while deploying the bridge contract with EN-01 and SCN-L2-01 in step 2 of [Cross-Chain Value Transfer](value-transfer.md).

```
$ kscn attach --datadir ~/data
> subbridge.registerBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.subscribeBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.registerToken("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR", "0xCHILD_TOKEN_ADDR", "0XPARENT_TOKEN_ADDR")
null
```

![](/img/nodes/sc-ha-before-register2.png)

In the bridge contract, information about adding an extra bridge should be updated. Tập lệnh [`erc20/erc20-addOperator4HA.js`](https://github.com/kaiachain/kaia-examples/blob/main/service-chain/value-transfer/erc20/erc20-addOperator4HA.js) của [service-chain/value-transfer](https://github.com/kaiachain/kaia-examples/tree/main/service-chain/value-transfer) đăng ký các toán tử của cầu nối bổ sung vào các hợp đồng cầu nối đã được triển khai trong [Chuyển giao giá trị xuyên chuỗi](value-transfer.md).

Trước tiên, hãy kiểm tra các địa chỉ nhà điều hành của cầu nối bổ sung trên SCN-L2-02 và thêm chúng vào `bridges` trong tệp `common/bridge_info.json`.

```
$ kscn attach --datadir ~/data
> subbridge.childOperator
"0x2ed72a9d7fe5da7672fd21567e07302431649b0b"
> subbridge.parentOperator
"0x5f4d5ac6da5d2d1f0af0e1bd8bc85a43a0ba41c5"
```

```
    "bridges": [
        {
            "child": { "operator": "0x10221f7f9355017cd0c11444e7eecb99621bacce" },
            "parent": { "operator": "0x3ce216beeafc62d20547376396e89528e1d778ca" }
        },
        {
            "child": { "operator": "0x2ed72a9d7fe5da7672fd21567e07302431649b0b" },
            "parent": { "operator": "0x5f4d5ac6da5d2d1f0af0e1bd8bc85a43a0ba41c5" }
        }
    ]
```

Chỉ chủ sở hữu hợp đồng cầu mới có quyền đăng ký các nhà khai thác. Tập tin `erc20-deploy.js` đã chuyển quyền sở hữu các hợp đồng cầu nối cho các nhà điều hành của SCN-L2-01, do đó tập lệnh này phải được ký bằng khóa của họ. SCN-L2-01 lưu trữ chúng trong các thư mục `~/data/child_bridge_account` và `~/data/parent_bridge_account`, mỗi thư mục chứa một tệp keystore cùng với tệp mật khẩu tương ứng. Sao chép hai thư mục này vào máy đang chạy tập lệnh và truyền đường dẫn của chúng vào tập lệnh. Chạy tập lệnh trong thư mục `erc20`, nơi tập tin `transfer_conf.json` đã được tạo ra bởi tập lệnh `erc20-deploy.js`.

```
$ cd erc20
$ CHILD_OWNER_KEYSTORE=/path/to/child_bridge_account \
  PARENT_OWNER_KEYSTORE=/path/to/parent_bridge_account \
  node erc20-addOperator4HA.js
```

:::warning

Các thư mục tài khoản cầu nối chứa các kho khóa của người vận hành cùng với mật khẩu dạng văn bản thuần túy của chúng, cho phép kiểm soát hoàn toàn các tài khoản người vận hành. Hãy xóa các bản sao sau khi chạy tập lệnh.

:::

When there are multiple bridges, value transfer can be provided more safely by setting a threshold. Value transfer can be enabled only when an operator above the threshold normally requests value transfer. For example, as in the current example, if there are two bridge pairs and the threshold is set to 2, value transfer can be provided only when both are normally requested. That is, even if one bridge is attacked and sends an abnormal request, it can be prevented. Tập lệnh này đặt ngưỡng là số lượng cầu trong tệp `bridge_info.json`. Để sử dụng một giá trị khác, hãy thiết lập `THRESHOLD` khi chạy chương trình, ví dụ: `THRESHOLD=1 node erc20-addOperator4HA.js`.

Tập lệnh này gửi các giao dịch từ các tài khoản nhà điều hành của SCN-L2-01 ra bên ngoài nút. Sau khi hoàn tất, hãy khởi động lại kscn trên SCN-L2-01 để cầu con của nó tải lại giá trị nonce của các tài khoản người vận hành.

```
SCN-L2-01$ kscnd stop
SCN-L2-01$ kscnd start
```

When registration is completed, a bridge contract is registered in both EN-02 and SCN-L2-02 as shown in the figure below to configure HA.

![](/img/nodes/sc-ha-after-register.png)

When two or more bridge pairs are connected for HA, data anchoring transactions for the same block occur more than once, and value transfer transactions can also occur multiple times. That is, additional fees are required.