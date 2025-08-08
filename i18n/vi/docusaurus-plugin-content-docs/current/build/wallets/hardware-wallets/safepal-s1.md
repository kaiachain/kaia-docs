# SafePal S1

![](/img/banners/kaia-safepal.png)

## Introduction <a id="introduction"></a>

Hardware wallets reinvented the wheel by keeping private keys (needed for signing transactions) in an offline environment separate from internet connections, avoiding the numerous hacks or threats that arise from software wallets reliant on internet connectivity. This way, users' crypto assets are more secured and shielded from internet dangers brought on by software wallets.

One of such hardware wallets that has integrated with Kaia is **SafePal S1 Hardware Wallet**. SafePal S1 is a cryptocurrency hardware wallet that aims to provide a secure, simple, and enjoyable crypto management solution for the populace. SafePal là một ví phần cứng dùng để bảo mật và quản lý các loại tiền điện tử và NFT, bao gồm Bitcoin, KAIA, Token tương thích với KAIA (KCT), ETH và các token ERC20, v.v.

In this guide, you will:

- Thêm, nhận và gửi KAIA, cùng với bất kỳ token tương thích với Kaia (KCT) nào bằng ví phần cứng SafePal S1.

## Prerequisites <a id="prerequisites"></a>

- [SafePal Hardware Wallet Set-Up](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752)

## Getting Started <a id="getting-started"></a>

After you must have successfully set up your wallet, next is to see the wallet in action. In this tutorial we will be adding, receiving and sending KAIA native coin, and any Kaia Compatible Tokens(KCT) using the SafePal S1 Hardware Wallet.

### Thêm token tiền điện tử <a id="adding-crypto-tokens"></a>

Để thêm các token tiền điện tử vào ví phần cứng của bạn, vui lòng làm theo các bước sau:

**Step 1**: Open the SafePal App and in your Wallet tab, click the ellipsis icon and then click the Manage Coins button as shown in the picture below:

![](/img/build/tools/safepal/sp-hw-manage-coins.png)

**Bước 2**: Tìm kiếm các đồng xu bạn muốn thêm, sau đó bật chúng lên.

**Token gốc - KAIA**

- Nhập "KAIA" vào thanh tìm kiếm và bật nó lên.

![](/img/build/tools/safepal/sp-app-search-kaia.jpg)

**Token có thể hoán đổi - USDT**

- Nhập "USDT Kaia" vào thanh tìm kiếm và bật nó lên.

![](/img/build/tools/safepal/sp-app-search-usdt.jpg)

**Bước 3**: Nhấp vào **Thêm đồng xu** ở phía dưới.

![](/img/build/tools/safepal/sp-hw-add-coins.png)

**Bước 4**: Quét qua lại giữa ứng dụng SafePal và ví phần cứng S1, nhập mã PIN của thiết bị để đảm bảo dữ liệu được đồng bộ hóa chính xác giữa ứng dụng và thiết bị.

**Step 4**: After the coin has been added successfully, you can now view them in the **Asset Management** tab on the S1 device.

![](/img/build/tools/safepal/sp-hw-asset-display.png)

:::note
Các bước trên áp dụng cho việc thêm bất kỳ Token tương thích với Kaia nào.
:::

### Nhận token tiền điện tử <a id="receiving-crypto-tokens"></a>

Once the coins (KAIA, KCTs) are successfully added, you can view them in the **Asset Management** tab on the S1 device. Bạn có thể nhận các token tiền điện tử bằng cách sau:

#### Using the SafePal App

1. Chọn KAIA hoặc bất kỳ token có thể hoán đổi nào khác, chẳng hạn như USDT, cung cấp các tùy chọn Hoán đổi, Nhận và Gửi. Nhấn vào "Nhận".
2. Bạn có thể sao chép địa chỉ ví KAIA hoặc USDT của mình, lưu mã QR, hoặc yêu cầu đối tác quét mã QR trực tiếp từ thiết bị của bạn.

#### Using the SafePal S1 Hardware Wallet

1. Bật thiết bị SafePal S1 của bạn và điều hướng đến mục 'Quản lý tài sản'.
2. Chọn KAIA hoặc bất kỳ token có thể hoán đổi nào khác, chẳng hạn như USDT, làm loại tiền điện tử mà bạn muốn nhận.
3. Nhấp vào nút 'Nhận'.
4. Nhập mã PIN của thiết bị S1 của bạn.
5. Sau đó, bạn có thể xem mã QR của địa chỉ ví của mình và hiển thị nó cho người khác để họ có thể quét và gửi coin cho bạn.

![](/img/build/tools/safepal/sp-hw-receive-tokens.png)

:::note
Các bước trên áp dụng cho việc nhận bất kỳ token tương thích với Kaia nào.
:::

### Gửi token tiền điện tử <a id="sending-crypto-tokens"></a>

Để gửi các token tiền điện tử từ ví phần cứng của bạn, vui lòng làm theo các bước sau:

**Bước 1**: Trên ứng dụng SafePal, chọn đồng tiền bạn muốn gửi và nhấn **Gửi**.

**Token gốc - KAIA**

![](/img/build/tools/safepal/sp-hw-sp-app-send.png)

**Token có thể hoán đổi - USDT**

![](/img/build/tools/safepal/sp-hw-sp-app-usdt-send.png)

**Bước 2**: Nhập địa chỉ đích, số tiền và nhấp vào 'Tiếp theo' để xác nhận lại thông tin. Ensure to verify your transfer details in this step.

![](/img/build/tools/safepal/sp-hw-sp-app-send-details.png)

**Bước 3**: Bắt đầu quá trình ký kết thiết bị S1.

In this step, a QR code (as shown below) containing the transfer details will be displayed on the SafePal App. Khởi động ví phần cứng S1 của bạn và truy cập vào tab **Quét**. Tiếp theo, hãy quét mã QR trên ứng dụng SafePal và nhập mã PIN từ thiết bị SafePal của bạn.

Doing this ensures that the S1 device receives the transfer details in an offline environment.

![](/img/build/tools/safepal/sp-hw-sign-tx.png)

**Bước 4**: Đồng bộ hóa chữ ký trở lại ứng dụng SafePal.

After successfully signing the transfer on the S1 device, you will see a set of dynamic QR codes shown on the S1 device. On the SafePal App, click 'Next' to open the cellphone camera. Use the SafePal App to scan the dynamic QR codes shown on the S1 device.

Doing this ensures the App receives the signature contained in the QR codes and is ready to broadcast the transfer to the blockchain (Kaia).

**Bước 5**: Nhấn vào **Phát sóng** trên ứng dụng và chờ quá trình chuyển dữ liệu hoàn tất.

![](/img/build/tools/safepal/sp-hw-broadcast-tx.png)

:::note
Các bước trên áp dụng cho việc gửi bất kỳ Token tương thích với Kaia nào.
:::

## Further References  <a id="further-references"></a>

- [SafePal S1 Upgrade Instructions](https://www.safepal.com/en/upgrade/s1)
- [SafePal S1 User Manual](https://docs.safepal.io/safepal-hardware-wallet/user-manual)