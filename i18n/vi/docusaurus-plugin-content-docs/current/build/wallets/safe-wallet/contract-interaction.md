---
title: Tương tác với các hợp đồng
sidebar_label: Tương tác hợp đồng
---

# Tương tác với các hợp đồng

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **9 tháng 8 năm 2026**. Vui lòng sử dụng Safe Wallet dành cho Kaia Network tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới. Các Tài khoản Safe hiện có của bạn sẽ tự động tương thích với Safe Wallet.

:::

Trong phần này, bạn sẽ tương tác với một hợp đồng đơn giản trên Kairos bằng cách sử dụng tài khoản Safe được quản lý trong Safe Wallet.

**Điều kiện tiên quyết**

- [MetaMask](https://metamask.io/download/) đã được cấu hình cho [Kaia / Kairos](../../tutorials/connecting-metamask.mdx)
- [Remix](https://remix.ethereum.org/) (với sự hỗ trợ từ mạng Kaia khi cần thiết)
- Thử nghiệm KAIA từ [Faucet](https://faucet.kaia.io)
- Một tài khoản Safe trên Kairos ([tạo tài khoản](./use-safe-wallet.md#create-a-safe))

**Bước 1:** Mở [Remix](https://remix.ethereum.org/).

**Bước 2:** Biên dịch và triển khai một hợp đồng lưu trữ mẫu (hoặc hợp đồng của riêng bạn).

Hãy triển khai hợp đồng trước khi thực hiện các thao tác với nó từ Safe. Một mẫu hợp đồng điển hình sẽ công khai một biến `uint` mà bạn có thể cập nhật bằng hàm `store` và đọc bằng hàm `retrieve`.

![](/img/build/wallets/ks-succor-deploy.gif)

**Bước 3:** Khởi tạo một giao dịch mới trong Safe Wallet.

Nhấp vào **Giao dịch mới**. Hãy nhập địa chỉ hợp đồng đã được triển khai và ABI để bạn có thể chọn phương thức và các tham số.

![](/img/build/wallets/ks-succor-init-tx.gif)

**Bước 4:** Kiểm tra lại và gửi đi. Ký bằng ví của chủ sở hữu; giao dịch sẽ được thực hiện ngay khi đạt đến ngưỡng xác nhận.

![](/img/build/wallets/ks-succor-review-tx.gif)

Bạn cũng có thể thực hiện các cuộc gọi hợp đồng theo lô bằng [Transaction Builder](./tx-builder.md) hoặc đề xuất chúng thông qua lập trình bằng [API Kit](./safe-wallet-api-kit.md).
