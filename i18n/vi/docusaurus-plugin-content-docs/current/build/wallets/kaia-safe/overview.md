---
title: Tổng quan về Safe Wallet
sidebar_label: Tổng quan về Safe Wallet
---

# Tổng quan về Safe Wallet

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **9 tháng 8 năm 2026**. Vui lòng sử dụng **Safe Wallet** dành cho Kaia tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới. Các tài khoản Safe hiện tại của bạn sẽ tự động tương thích với Safe Wallet.

:::

Safe Wallet là giao diện web [Safe](https://safe.global) (Safe Global) dành cho [tài khoản thông minh Safe](https://docs.safe.global/home/what-is-safe) trên Kaia. Bạn có thể quản lý chủ sở hữu, ngưỡng, tài sản và giao dịch thông qua [app.safe.global](https://app.safe.global), với Kaia Mainnet và Kairos sẽ hiển thị khi bạn chọn mạng trong giao diện người dùng.

## Sản phẩm và tài liệu hướng dẫn

Đối với kiến trúc, cơ chế hoạt động của tài khoản thông minh và các dịch vụ phía máy chủ (Dịch vụ Giao dịch, Cổng kết nối Khách hàng và các API liên quan), hãy sử dụng các tài nguyên chính thức của Safe Global:

- [“An toàn” là gì?](https://docs.safe.global/home/what-is-safe)
- [Trung tâm trợ giúp Safe Wallet](https://help.safe.global)
- [Tài liệu hướng dẫn an toàn](https://docs.safe.global)
- [Tổng quan về Dịch vụ Giao dịch An toàn](https://docs.safe.global/core-api/transaction-service-overview)

## Mạng lưới Kaia

| Mạng                   | ID chuỗi |
| ---------------------- | -------- |
| Mạng chính Kaia        | 8217     |
| Mạng thử nghiệm Kairos | 1001     |

Khi sử dụng [API Kit](./kaia-safe-api-kit.md) hoặc các công cụ khác của Safe SDK, hãy truyền ID chuỗi Kaia chính xác. Các điểm cuối dịch vụ có thể thay đổi khi `safe.kaia.io` ngừng hoạt động; vui lòng tham khảo tài liệu về Dịch vụ Giao dịch Toàn cầu Safe để biết các chuỗi được hỗ trợ và thông tin cấu hình.

## Ghi chú lịch sử

Trước đây, Kaia đã vận hành một hệ thống Safe do Kaia quản lý (giao diện người dùng và hạ tầng). Dịch vụ đó đang được ngừng cung cấp để chuyển sang sử dụng Safe Wallet tại [app.safe.global](https://app.safe.global). Các tài liệu tham khảo kho lưu trữ cũ như [kaia-safe-infrastructure](https://github.com/kaiachain/kaia-safe-infrastructure) mô tả mô hình triển khai cũ và không phải là phương án chính cho các tích hợp mới.
