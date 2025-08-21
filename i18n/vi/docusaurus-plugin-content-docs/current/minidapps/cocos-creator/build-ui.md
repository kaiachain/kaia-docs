# Tạo giao diện người dùng

Trong phần này, chúng tôi sẽ xây dựng giao diện người dùng (UI) cho dApp của mình, bao gồm kết nối ví, cập nhật số dư và chức năng đúc tiền.

## Thiết lập cảnh chính <a id="setting-up-main-scene"></a>

### Bước 1: Tạo một thư mục Scenes <a id="create-scene-folder"></a>

 - Điều hướng đến thư mục **tài sản** của dự án.
 - Nhấp chuột phải và chọn **Tạo thư mục**.
 - Đặt tên là **cảnh**. (Chèn hình ảnh)
 - Bên trong thư mục cảnh, nhấp chuột phải và chọn **Tạo → Cảnh**.

![](/img/minidapps/cocos-creator/cp-create-scene-r.png)

 - Lưu tệp cảnh khi được nhắc.
 - Nhấp đúp vào cảnh mới tạo để đặt cảnh đó làm **cảnh mặc định**.

### Bước 2: Tạo Canvas cơ sở <a id="creating-base-canvas"></a>

 - Trong cửa sổ Hierarchy, nhấp chuột phải vào **Scene**.
 - Điều hướng đến **Tạo → Thành phần UI → Canvas**.
 - Đổi tên thành **Canvas**

![](/img/minidapps/cocos-creator/cp-create-canvas-r.png)

### Bước 3: Tạo Web3UI Container <a id="create-web3ui-container"></a>

 - Nhấp chuột phải vào **Canvas** mới tạo.
 - Chọn **Tạo → Nút trống**.
 - Đổi tên thành **Web3UI**.

![](/img/minidapps/cocos-creator/cp-create-web3-ui-r.png)

### Bước 4: Thiết lập các đối tượng UI chính <a id="setting-up-main-ui-objects"></a>

Bên trong Web3UI, tạo các thành phần sau:

**1. Nút kết nối ví**

 - Nhấp chuột phải vào **Web3UI → Tạo → Thành phần UI → Nút**.

![](/img/minidapps/cocos-creator/cp-connect-button-r.png)

 - Đổi tên thành **ConnectWallet**.
 - Trong **Ngăn thanh tra**, hãy đặt văn bản nhãn nút thành **Kết nối ví**.

![](/img/minidapps/cocos-creator/cp-connect-label-r.png)

**2. Nút Mint**

 - Nhấp chuột phải vào **Web3UI → Tạo → Thành phần UI → Nút**.
 - Đổi tên thành **MintButton**.
 - Đặt văn bản nhãn nút thành **Nút Mint**.

**3. Nhãn địa chỉ**

 - Nhấp chuột phải vào **Web3UI → Tạo → Đối tượng 2D → Nhãn**.

![](/img/minidapps/cocos-creator/cp-address-label-r.png)

 - Đổi tên thành **AddressLabel**.
 - Đặt nhãn văn bản thành **Địa chỉ đã kết nối:**.

![](/img/minidapps/cocos-creator/cp-connected-address-r.png)

**4. Nhãn cân bằng**

 - Nhấp chuột phải vào **Web3UI → Tạo → Đối tượng 2D → Nhãn**.
 - Đổi tên thành **BalanceLabel**.
 - Đặt nhãn văn bản thành **0.000ET**.

Sau khi thêm tất cả các thành phần, Hệ thống phân cấp của bạn sẽ trông như thế này:

```bash
Canvas
└── Web3UI
    ├── ConnectWallet
    ├── MintButton
    ├── AddressLabel
    ├── BalanceLabel
```

![](/img/minidapps/cocos-creator/cp-ui-view-r.png)

:::note
Để sắp xếp các thành phần một cách hợp lý, hãy sử dụng các công cụ căn chỉnh ở đầu Scene. Nhấp vào từng thành phần và điều chỉnh vị trí của nó khi cần thiết
:::
