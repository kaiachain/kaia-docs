---
title: Ví an toàn
sidebar_label: Ví an toàn
---

# Ví an toàn

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **9 tháng 8 năm 2026**. Vui lòng sử dụng **Safe Wallet** dành cho Kaia tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới.

Bạn đã sử dụng Kaia Safe chưa? Xem **[Chuyển sang Safe Global](./migrate-to-safe-global.md)** — các tài khoản Safe hiện tại của bạn sẽ không bị ảnh hưởng và vẫn có thể sử dụng trên Safe Wallet.

:::

## Giới thiệu

[Safe](https://safe.global) (Safe Global) cung cấp bộ giải pháp tài khoản thông minh đa chữ ký (multisig) đạt tiêu chuẩn ngành dành cho các mạng EVM. **Safe Wallet** là ứng dụng web của Safe dùng để tạo và quản lý các tài khoản đó — có thể truy cập tại [app.safe.global](https://app.safe.global).

Safe Wallet hỗ trợ mạng chính Kaia và mạng thử nghiệm Kairos. Kết nối ví chủ sở hữu, chọn **Kaia** hoặc **Kairos**, sau đó tạo hoặc mở một Safe.

Trong một cấu hình điển hình trên Kaia, hầu hết người dùng đều bắt đầu với các ví chỉ sử dụng một khóa như Kaia Wallet hoặc MetaMask (tài khoản thuộc sở hữu bên ngoài, hay còn gọi là EOA). Các tài khoản này dựa trên một cặp khóa và tạo ra một điểm lỗi duy nhất — không phù hợp với các quỹ tài chính của tổ chức, như trong vụ [tấn công Wintermute](https://www.certik.com/resources/blog/uGiY0j3hwOzQOMcDPGoz9-wintermute-hack-), nơi đã gây thiệt hại 162,5 triệu đô la.

Safe Wallet loại bỏ điểm lỗi duy nhất đó: nhiều chủ sở hữu phải ký xác nhận theo ngưỡng xác nhận nhất định trước khi giao dịch được thực hiện.

Đối với hành vi của sản phẩm, kiến trúc và các API, hãy tham khảo tài liệu chính thức của Safe:

- [“An toàn” là gì?](https://docs.safe.global/home/what-is-safe)
- [Tài liệu hướng dẫn an toàn](https://docs.safe.global)
- [Trung tâm trợ giúp](https://help.safe.global)

## Ví đa chữ ký là gì? <a id="What are Multisig Wallets"></a>

Ví đa chữ ký là loại ví kỹ thuật số yêu cầu hai, ba hoặc nhiều khóa riêng tư từ các nguồn khác nhau để xác nhận và thực hiện một giao dịch tiền điện tử.

Ví dụ, bạn có thể hình dung một ví đa chữ ký như một chiếc két sắt có ba ổ khóa. Ba chìa khóa này do ba người khác nhau giữ, vì vậy cần có sự đồng ý chung của cả ba người mới có thể mở được.

Những lợi ích chính của ví đa chữ ký:

- **Lưu trữ tài sản một cách an toàn:** Các công ty và giao thức có thể lưu trữ tiền mà không cần phụ thuộc vào một khóa riêng tư duy nhất hay một bên thứ ba nào đó có thể chuyển tiền mà không được ủy quyền.
- **Thúc đẩy quá trình ra quyết định phi tập trung:** Các nhóm có thể đưa ra quyết định trực tiếp trên chuỗi về việc sẽ thực hiện những giao dịch nào.
- **Kiểm soát chung:** Chỉ những bên có các khóa cần thiết mới có thể phê duyệt và thực hiện các giao dịch theo ngưỡng đã được cấu hình.

## Các lợi ích trên Kaia <a id="Benefits of Kaia Safe"></a>

- **Lưu trữ và chuyển KAIA và các token:** Nạp và chuyển KAIA gốc cùng các token có thể thay thế hoặc không thể thay thế (ví dụ: ERC-20 / KIP-7 và ERC-721 / KIP-17).
- **Chủ sở hữu và ngưỡng xác nhận:** Cấu hình nhiều chủ sở hữu và ngưỡng xác nhận để đảm bảo khả năng kiểm soát linh hoạt và an toàn.
- **Ứng dụng an toàn:** Mở rộng chức năng của Safe Wallet bằng các ứng dụng dành cho xử lý hàng loạt, gọi hợp đồng thông minh và các quy trình làm việc khác — ví dụ như **Transaction Builder** và các đợt airdrop dựa trên tệp CSV khi có sẵn trong danh mục Ứng dụng.
- **Giao dịch và xác nhận:** Đề xuất, thu thập chữ ký và thực hiện giao dịch theo ngưỡng của bạn.
- **Khôi phục tài khoản:** Nếu một khóa bị mất, những chủ sở hữu còn lại đáp ứng ngưỡng quy định vẫn có thể quản lý tài khoản (ví dụ: bằng cách thay thế chủ sở hữu bị mất).

## Các bước tiếp theo

- [Chuyển sang Safe Global](./migrate-to-safe-global.md) — chuyển từ `safe.kaia.io` (các tài khoản hiện có vẫn giữ nguyên)
- [Sử dụng Safe Wallet trên Kaia](./use-safe-wallet.md) — tạo ví Safe, thêm tài sản và thực hiện giao dịch
- [Tổng quan](./overview.md) — các mạng lưới và các nguồn lực của Safe Global
- [Câu hỏi thường gặp](./faqs.md) — các câu hỏi về chuyển đổi và quản lý tài khoản
