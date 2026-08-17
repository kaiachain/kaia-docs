---
title: Tổng quan về Safe Wallet
sidebar_label: Tổng quan về Safe Wallet
---

# Tổng quan về Safe Wallet

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **31 tháng 8 năm 2026**. Vui lòng sử dụng **Safe Wallet** dành cho Kaia tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới. Nếu bạn đã có tài khoản Safe, hãy xem [Chuyển sang Safe Global](./migrate-to-safe-global.md).

:::

[Safe Wallet](https://app.safe.global) là giao diện chính thức của Safe Global dành cho [Safe Smart Accounts](https://docs.safe.global/home/what-is-safe). Tài khoản Safe Smart là một ví hợp đồng thông minh: thay vì chỉ có một khóa riêng kiểm soát số tiền, mỗi giao dịch phải được một nhóm người ký phê duyệt theo ngưỡng xác nhận quy định. Kaia Mainnet và Kairos Testnet hiện đều đã sẵn sàng — hãy kết nối ví chủ sở hữu, chọn mạng, sau đó tạo hoặc mở một Safe.

## Các khái niệm chính

| Khái niệm                                                                 | Ý nghĩa của điều đó là gì                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Người ký (chủ sở hữu)**                              | Các địa chỉ được phép đề xuất và xác nhận giao dịch. Bạn có thể thêm, xóa hoặc thay thế chúng bất cứ lúc nào từ mục **Cài đặt**.                                                                                                                |
| **Giá trị ngưỡng**                                                        | Một giao dịch cần bao nhiêu xác nhận từ người ký trước khi có thể được thực hiện (ví dụ: 2 trong số 3). Hãy giữ giá trị này ở mức trên 1.                                                                    |
| **[Các mô-đun](https://docs.safe.global/advanced/smart-account-modules)** | Các gói dịch vụ tùy chọn giúp mở rộng khả năng của tài khoản — khôi phục dữ liệu, hạn mức chi tiêu, tự động hóa. Một mô-đun có thể chuyển tiền mà không cần sự chấp thuận của người ký, vì vậy chỉ nên kích hoạt những mô-đun mà bạn tin tưởng. |
| **[Lính gác](https://docs.safe.global/advanced/smart-account-guards)**    | Các hợp đồng tùy chọn kiểm tra mọi giao dịch trước và sau khi thực thi, cho phép bạn áp dụng các quy tắc tùy chỉnh.                                                                                                                                             |
| **Ứng dụng an toàn**                                                      | Các ứng dụng của bên thứ ba được tích hợp sẵn trong giao diện, chẳng hạn như Transaction Builder và CSV Airdrop được sử dụng trong các hướng dẫn dưới đây.                                                                                                      |

Để có cái nhìn toàn diện về cách tài khoản này hoạt động trên chuỗi khối, hãy đọc bài viết [Tài khoản Safe Smart hoạt động như thế nào?](https://docs.safe.global/advanced/smart-account-overview).

## Không gian làm việc

[Workspace](https://safe.global/blog/introducing-workspace-the-onchain-operating-environment-for-treasury-teams) là môi trường của Safe Global dành cho các nhóm vận hành nhiều hơn một hệ thống Safe. Nó được xây dựng dựa trên chính các tài khoản thông minh đó — nó thay đổi cách thức phối hợp của một nhóm, chứ không phải cách thức thực hiện giao dịch hay ai là người nắm giữ khóa.

- **Bảng điều khiển tổng hợp** — hiển thị số dư và các giao dịch đang chờ xử lý trên tất cả các tài khoản trong hệ sinh thái, chỉ trong một giao diện duy nhất.
- **[Trung tâm bảo mật](https://safe.global/blog/workspace-security-hub)** — người ký, ngưỡng, mô-đun, cơ chế bảo vệ, tùy chọn khôi phục và phiên bản Safe cho từng tài khoản, cùng với các kiểm tra tự động đối với cấu hình trên chuỗi của tài khoản đó.
- **Sổ địa chỉ chung** — một danh sách địa chỉ được gắn nhãn duy nhất cho toàn bộ nhóm, thay vì danh sách cục bộ trên từng trình duyệt.
- **Đăng nhập bằng email** — các thành viên trong nhóm có thể đăng nhập bằng mã xác thực một lần qua email hoặc tài khoản Google để xem số dư, theo dõi các giao dịch đang chờ xử lý và quản lý danh bạ mà không cần mang theo chìa khóa. Việc ký vẫn cần có ví của chủ sở hữu.

Điểm cuối cùng này rất hữu ích cho các chuyên viên kiểm tra về tài chính, tuân thủ và vận hành trên Kaia, những người cần có cái nhìn tổng quan về một tài khoản Safe thuộc bộ phận quản lý tài chính nhưng tuyệt đối không bao giờ được là người ký duyệt trên tài khoản đó.

## Tài liệu hướng dẫn an toàn toàn cầu

Safe Wallet, các hợp đồng Safe Smart Account, Safe Core SDK và các dịch vụ phía máy chủ đều do Safe Global phát triển và duy trì, đồng thời được ghi chép chi tiết tại [docs.safe.global](https://docs.safe.global).

Tài liệu về Kaia trình bày những nội dung đặc thù của Kaia: các mạng được hỗ trợ, ID chuỗi và hướng dẫn thực hiện các tác vụ thông dụng. Để tìm hiểu cách thức hoạt động của Safe — các phiên bản hợp đồng, hành vi của mô-đun và cơ chế bảo vệ, lược đồ API, tài liệu tham khảo SDK — vui lòng tham khảo tài liệu của Safe Global, được nhóm Safe cập nhật thường xuyên.

### Nên tìm ở đâu

| Nếu bạn muốn truy cập…                                                                      | Truy cập                                                                                                                                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tìm hiểu về Tài khoản Safe Smart là gì                                                      | [“An toàn” là gì?](https://docs.safe.global/home/what-is-safe)                                                                                                |
| Tìm hiểu về kiến trúc tài khoản, các mô-đun và các cơ chế bảo vệ                            | [Tài khoản Safe Smart hoạt động như thế nào?](https://docs.safe.global/advanced/smart-account-overview)                                                       |
| Tra cứu các hàm hợp đồng, sự kiện và phiên bản                                              | [Thông tin tham khảo về Tài khoản thông minh](https://docs.safe.global/reference-smart-account/overview)                                                      |
| Phát triển bằng bộ công cụ Safe SDK (Starter, Protocol, API, Relay Kits) | [Tổng quan về SDK](https://docs.safe.global/sdk/overview)                                                                                                     |
| Truy vấn Safes, giao dịch và chữ ký qua HTTP                                                | [Cơ sở hạ tầng an toàn](https://docs.safe.global/core-api/api-overview) · [Dịch vụ giao dịch](https://docs.safe.global/core-api/transaction-service-overview) |
| Kiểm tra xem dịch vụ Safe hỗ trợ những chuỗi nào                                            | [Các mạng được hỗ trợ](https://docs.safe.global/advanced/smart-account-supported-networks)                                                                    |
| Nhận trợ giúp về chính ứng dụng Safe Wallet                                                 | [Trung tâm Hỗ trợ An toàn](https://help.safe.global)                                                                                                          |
| Làm rõ các thuật ngữ liên quan đến an toàn                                                  | [Từ điển thuật ngữ](https://docs.safe.global/home/glossary)                                                                                                   |

Nếu một trang nào đó ở đây đã lỗi thời so với tài liệu của Safe Global, vui lòng tham khảo tài liệu của Safe Global và [gửi báo cáo sự cố](https://github.com/kaiachain/kaia-docs/issues) để chúng tôi có thể cập nhật trang Kaia.

## Mạng lưới Kaia

| Mạng                   | ID chuỗi |
| ---------------------- | -------- |
| Mạng chính Kaia        | 8217     |
| Mạng thử nghiệm Kairos | 1001     |

Hãy chọn mạng từ công cụ chuyển đổi chuỗi trong Safe Wallet trước khi tạo hoặc mở tài khoản — ví Safe được triển khai trên Kairos sẽ không hiển thị khi Mainnet được chọn. Khi sử dụng [API Kit](./safe-wallet-api-kit.md) hoặc các công cụ khác của Safe SDK, hãy truyền ID chuỗi tương ứng và lấy điểm cuối Dịch vụ Giao dịch từ [các mạng được Safe Global hỗ trợ](https://docs.safe.global/advanced/smart-account-supported-networks) thay vì mã hóa cứng một giá trị cố định.

## Hướng dẫn dành riêng cho Kaia

- [Chuyển sang Safe Global](./migrate-to-safe-global.md) — chuyển một tài khoản Safe hiện có sang Safe Wallet
- [Tạo và quản lý ví an toàn](./use-safe-wallet.md) — tạo ví an toàn trên Kaia, thêm tài sản, gửi giao dịch
- [Tương tác với hợp đồng](./contract-interaction.md) — gọi hợp đồng từ Safe trên Kaia
- [Trình tạo giao dịch](./tx-builder.md) và [Airdrop CSV](./csv-airdrop.md) — xử lý theo lô trên Kaia
- [Bộ công cụ API](./safe-wallet-api-kit.md) — Dịch vụ giao dịch an toàn với ID chuỗi Kaia
- [Câu hỏi thường gặp](./faqs.md)
