---
title: Sử dụng Safe Wallet trên Kaia
sidebar_label: Tạo và quản lý két sắt
---

# Sử dụng Safe Wallet trên Kaia

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **9 tháng 8 năm 2026**. Vui lòng sử dụng Safe Wallet dành cho Kaia Network tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới. Các Tài khoản Safe hiện có của bạn sẽ tự động tương thích với Safe Wallet.

:::

## Create a Safe

Dưới đây là hướng dẫn cách tạo tài khoản thông minh Safe trên Kaia bằng Safe Wallet.

**Bước 1:** Mở [Safe Wallet](https://app.safe.global/welcome) trong trình duyệt của bạn.

![](/img/build/wallets/ks-welcome-page-sw.png)

**Bước 2:** Kết nối ví của bạn. Safe Wallet hỗ trợ các ví như [Kaia Wallet](https://docs.kaiawallet.io/) và [MetaMask](../../tutorials/connecting-metamask.mdx). Hãy đảm bảo rằng **Kaia Mainnet** hoặc **Kairos Testnet** đã được chọn trong ví của bạn và trong Safe Wallet.

![](/img/build/wallets/ks-connect-wallet-sw.png)

**Bước 3:** Nhấp vào **Tạo tài khoản** (hoặc tùy chọn tương đương) và đặt tên cho Safe của bạn.

![](/img/build/wallets/ks-add-safe-name.png)

**Bước 4:** Thêm chủ sở hữu/người ký bằng cách nhập các địa chỉ có quyền gửi và phê duyệt giao dịch. Bạn có thể thêm bao nhiêu chủ sở hữu tùy ý và thay đổi danh sách này sau này.

**Bước 5:** Chọn số lần xác nhận của chủ sở hữu mà một giao dịch cần có. Nên chọn ngưỡng lớn hơn 1. Một quy định phổ biến là khoảng 51% chủ sở hữu (ví dụ: 2 trong 3, hoặc 3 trong 5).

![](/img/build/wallets/ks-add-signers-sw.png)

**Bước 6:** Kiểm tra lại các thông số, sau đó triển khai Safe và làm theo các hướng dẫn hiển thị trên màn hình.

![](/img/build/wallets/ks-review-create-safe-sw.png)

**Bước 7:** Sau khi triển khai, hãy bắt đầu sử dụng Safe và mở giao diện người dùng tài khoản.

![](/img/build/wallets/ks-start-using-wallet-sw.png)

![](/img/build/wallets/ks-safe-ui-sw.png)

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

Chuyển NFT sang địa chỉ Safe từ một sàn giao dịch hoặc ví hỗ trợ Kaia (Mainnet hoặc Kairos). Ví dụ: trên [OpenSea](https://opensea.io/), hãy mở NFT, chọn chức năng “Chuyển nhượng” và dán địa chỉ Safe vào. Sau khi xác nhận, NFT sẽ xuất hiện trong mục **Tài sản** / NFTs trên Safe Wallet. Xem [hướng dẫn chuyển nhượng](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea) của OpenSea để biết các bước cụ thể cho từng sản phẩm.

## Send assets

### Gửi KAIA và token

**Bước 1:** Nhấp vào **Giao dịch mới** và chọn **Gửi token**.

![](/img/build/wallets/ks-new-tx-sw.gif)

**Bước 2:** Chọn tài sản, nhập địa chỉ người nhận và số tiền.

![](/img/build/wallets/ks-send-details-sw.gif)

**Bước 3:** Kiểm tra lại và gửi. Hãy ký xác nhận bằng ví chủ sở hữu của bạn; giao dịch sẽ được thực hiện ngay khi đạt đến ngưỡng xác nhận.

![](/img/build/wallets/ks-review-send-tx-sw.gif)

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
