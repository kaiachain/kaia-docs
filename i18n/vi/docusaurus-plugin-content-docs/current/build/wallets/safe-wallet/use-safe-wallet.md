---
title: Sử dụng Safe Wallet trên Kaia
sidebar_label: Tạo và quản lý két sắt
---

# Sử dụng Safe Wallet trên Kaia

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **31 tháng 8 năm 2026**. Vui lòng sử dụng Safe Wallet dành cho Kaia Network tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới. Các Tài khoản Safe hiện có của bạn sẽ tự động tương thích với Safe Wallet.

:::

## Create a Safe

Dưới đây là hướng dẫn cách tạo tài khoản thông minh Safe trên Kaia bằng Safe Wallet.

**Bước 1:** Mở [Safe Wallet](https://app.safe.global/welcome) trong trình duyệt của bạn. Trang đích có hai tab: **Workspaces**, dành cho các nhóm cùng quản lý nhiều tài khoản, và **My accounts**, dành cho các Safes mà ví đã kết nối của bạn đăng nhập. Để tạo một tài khoản Safe duy nhất, hãy ở lại trang **Tài khoản của tôi**.

:::tip

Quản lý bộ phận tài chính với nhiều két sắt và một đội ngũ nhân viên kiểm tra? [Workspace](./overview.md#workspace) cung cấp bảng điều khiển chung, sổ địa chỉ chung và tính năng đăng nhập qua email cho các thành viên cần quyền truy cập thông tin nhưng không được phép nắm giữ khóa ký. Bạn có thể tạo các Safes trước, sau đó sắp xếp chúng vào một không gian làm việc.

:::

![Trang chào mừng của Safe Wallet với tab “Tài khoản của tôi” đang được chọn, hiển thị các tùy chọn “Kết nối ví” và “Theo dõi bất kỳ tài khoản nào”](/img/build/wallets/sg-welcome-page.png)

**Bước 2:** Nhấp vào **Kết nối ví** và chọn [MetaMask](../../tutorials/connecting-metamask.mdx). Hộp thoại này chỉ hiển thị các ví mà nó phát hiện được, vì vậy nếu bạn không thấy ví mình muốn, hãy cài đặt tiện ích mở rộng trước — [Kaia Wallet](https://docs.kaiawallet.io/) sẽ xuất hiện tại đây sau khi tiện ích mở rộng của nó được cài đặt. Hãy đảm bảo rằng **Kaia Mainnet** hoặc **Kairos Testnet** đã được chọn trong ví của bạn và trong Safe Wallet.

![Hộp thoại “Kết nối ví” với MetaMask được đánh dấu nổi bật trong danh sách các ví có sẵn](/img/build/wallets/sg-connect-wallet.png)

**Bước 3:** Nhấp vào **Tạo tài khoản**, đặt tên cho Safe của bạn, sau đó chọn mạng để triển khai nó — **Kaia** cho Mainnet hoặc **Kairos** cho testnet. Bạn có thể thêm các mạng khác sau này. Nhấp vào **Tiếp theo**.

![Thực hiện bước thiết lập cơ bản bằng cách nhập tên an toàn và chọn Kairos trong phần “Chọn mạng”](/img/build/wallets/sg-add-safe-name.png)

**Bước 4:** Tại phần **Người ký và xác nhận**, hãy thêm các địa chỉ được phép đề xuất và phê duyệt giao dịch. Ví được kết nối của bạn là **Người ký 1**; hãy nhấp vào **Thêm người ký mới** cho mỗi người ký bổ sung. Tên là các nhãn tùy chọn được lưu lại để bạn tự tham khảo. Bạn có thể thay đổi người ký sau này.

**Bước 5:** Đặt **Giá trị ngưỡng** — số lượng người ký cần xác nhận trước khi giao dịch được thực hiện. Chọn số lượng lớn hơn 1. Một quy định phổ biến là cần khoảng 51% số người ký tên (ví dụ: 2 trong 3, hoặc 3 trong 5). Nhấp vào **Tiếp theo**.

![Bước xác nhận và ký tên với ba người ký và ngưỡng 2 trên 3](/img/build/wallets/sg-add-signers.png)

**Bước 6:** Kiểm tra mạng, tên, người ký và ngưỡng. Việc triển khai Safe là một giao dịch trên chuỗi, do đó sẽ phát sinh một khoản phí kích hoạt một lần bằng KAIA — hãy đảm bảo ví đã kết nối của bạn có đủ số dư. Nhấp vào **Tạo tài khoản**, sau đó xác nhận giao dịch trong ví của bạn.

![Bước xem lại hiển thị mạng lưới, tên, ba người ký, ngưỡng 2 trên 3 và phí kích hoạt ước tính bằng KAIA](/img/build/wallets/sg-review-create-safe.png)

**Bước 7:** Ngay sau khi giao dịch được xác nhận, Safe của bạn sẽ chính thức hoạt động. Cửa sổ thoại hiển thị địa chỉ của nó — đây là địa chỉ bạn chia sẻ để nhận tiền, và nó khác với địa chỉ ví của người ký. Nhấp vào **Bắt đầu** để mở tài khoản.

![Hộp thoại “Tài khoản của bạn đã được thiết lập xong” hiển thị tên và địa chỉ mới của Safe trên Kairos](/img/build/wallets/sg-start-using-wallet.png)

Tài khoản mở ra ở trang **Tổng quan**, với thanh bên hiển thị các mục **Tài sản**, **Giao dịch**, **Sổ địa chỉ**, **Ứng dụng** và **Cài đặt**. Ví Safe ban đầu trống rỗng — hãy sử dụng tính năng **Sao chép địa chỉ** để nạp tiền vào ví từ một ví khác.

![Tổng quan về tài khoản an toàn với số dư bằng 0, thông báo “Nạp tiền” và thanh điều hướng bên cạnh](/img/build/wallets/sg-safe-ui.png)

Tài khoản Safe của bạn đã sẵn sàng.

## Add assets

Bạn có thể nạp tiền vào Safe bằng cách gửi KAIA, các token có thể thay thế hoặc NFT đến địa chỉ Safe được hiển thị trên bảng điều khiển tài khoản.

### Các mỏ KAIA

1. Sao chép địa chỉ Safe của bạn từ trang tổng quan tài khoản.
2. Từ ví (ví dụ: MetaMask, ví phần cứng hoặc tài khoản khác đã nạp tiền), hãy gửi KAIA đến địa chỉ đó.
3. Khi giao dịch được xác nhận, số dư sẽ hiển thị trong mục **Tài sản** trên Safe Wallet.

Bạn có thể nạp tiền vào Safe từ bất kỳ địa chỉ nào có thể chuyển tiền vào tài khoản Kaia. Để thiết lập kết nối mạng trong MetaMask, hãy tham khảo [Kết nối MetaMask với Kaia](../../tutorials/connecting-metamask.mdx).

### Tiền gửi bằng token có thể thay thế

1. Sao chép địa chỉ Safe của bạn.
2. Trong danh sách token của ví, hãy chọn token đó và gửi đến địa chỉ Safe.
3. Xác nhận giao dịch chuyển khoản và kiểm tra số dư tại mục **Tài sản** trong Safe Wallet.

### Tiền gửi NFT

1. Sao chép địa chỉ Safe của bạn.
2. Trong ví chứa NFT, hãy mở ví và chọn “Chuyển”.
3. Dán địa chỉ Safe, xác nhận và xác minh địa chỉ đó trong phần **Tài sản** → **NFT** trên ứng dụng Safe Wallet.

Trên Mainnet, bạn cũng có thể thực hiện chuyển khoản từ một sàn giao dịch hỗ trợ Kaia, chẳng hạn như [OKX NFT Marketplace](https://web3.okx.com/nft). Trên Kairos, hãy sử dụng tính năng chuyển tiền qua ví như đã nêu ở trên.

## Send assets

### Gửi KAIA và token

**Bước 1:** Nhấp vào **Giao dịch mới** và chọn **Gửi token**.

<video autoPlay loop muted playsInline controls aria-label="Opening New transaction and choosing Send tokens" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-new-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-new-tx.mp4" type="video/mp4" /> </video>

**Bước 2:** Nhập địa chỉ người nhận, sau đó chọn loại token và số tiền — **MAX** sẽ tự động điền toàn bộ số dư. Bạn có thể thêm tối đa năm người nhận vào một giao dịch. Nhấp vào **Tiếp theo**.

<video autoPlay loop muted playsInline controls aria-label="Send tokens form with the recipient address, token selector, and amount fields" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-send-details.webm" type="video/webm" /> <source src="/img/build/wallets/sg-send-details.mp4" type="video/mp4" /> </video>

**Bước 3:** Kiểm tra lại các thông tin chi tiết và nhấp vào **Ký**, sau đó xác nhận trong ví của bạn. Việc ký tên không tự động gửi giao dịch — giao dịch sẽ vẫn nằm trong hàng đợi dưới mục **Giao dịch** cho đến khi đạt ngưỡng quy định, sau đó bất kỳ người ký nào cũng có thể thực hiện giao dịch đó.

<video autoPlay loop muted playsInline controls aria-label="Reviewing and signing a send transaction, which then waits in the queue for the remaining confirmations" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-review-send-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-review-send-tx.mp4" type="video/mp4" /> </video>

### Gửi NFT

1. Nhấp vào **Giao dịch mới** và chọn **Gửi NFT** (hoặc quy trình chuyển NFT tương ứng trong Safe Wallet).
2. Chọn NFT và người nhận.
3. Xem xét, thu thập các chữ ký cần thiết và ký kết.

Để biết thêm chi tiết về giao diện người dùng (UI) có thể thay đổi theo thời gian, vui lòng tham khảo [Trung tâm Trợ giúp Safe Wallet](https://help.safe.global).

## Ghi chú bổ sung

### Phí giao dịch

Các giao dịch an toàn (chuyển nhượng tài sản hoặc tương tác hợp đồng) sẽ phát sinh phí mạng do chủ sở hữu **thực hiện** giao dịch đó chi trả (thường là người ký cuối cùng đạt ngưỡng quy định).

### Nonce an toàn

Vì lý do bảo mật, các giao dịch an toàn phải được thực hiện theo thứ tự. Mỗi giao dịch đều có một **nonce**. Chỉ giao dịch có giá trị nonce là _giao dịch được thực thi gần nhất + 1_ mới có thể được thực thi; các giá trị nonce cao hơn sẽ vẫn nằm trong hàng đợi cho đến khi các giao dịch trước đó hoàn tất và thu thập đủ số chữ ký.

### Tiền tố địa chỉ dành riêng cho chuỗi

Khi sao chép địa chỉ Safe từ trang tổng quan, hãy tránh thêm tiền tố tên chuỗi nếu ví đích của bạn không chấp nhận nó — hãy dán địa chỉ thuần túy để tránh lỗi chuyển tiền.

## Thêm trợ giúp

- [Trung tâm trợ giúp Safe Wallet](https://help.safe.global)
- [Tài liệu hướng dẫn an toàn](https://docs.safe.global)
