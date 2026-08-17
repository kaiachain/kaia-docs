---
title: Sử dụng Trình tạo giao dịch
sidebar_label: Trình tạo giao dịch
---

# Sử dụng Trình tạo giao dịch

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **9 tháng 8 năm 2026**. Vui lòng sử dụng Safe Wallet dành cho Kaia Network tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới. Các Tài khoản Safe hiện có của bạn sẽ tự động tương thích với Safe Wallet.

:::

**Transaction Builder** là một ứng dụng an toàn cho phép gộp nhiều thao tác thành một giao dịch an toàn duy nhất. Thay vì xác nhận từng giao dịch chuyển khoản hoặc yêu cầu hợp đồng một cách riêng lẻ, bạn có thể tạo một lô, sau đó xác nhận và thực hiện cùng một lúc.

Tính khả dụng của các ứng dụng an toàn có thể khác nhau tùy theo mạng và danh mục. Trong Safe Wallet, hãy mở **Ứng dụng**, tìm kiếm **Transaction Builder** và khởi chạy ứng dụng này cho ví Kaia hoặc Kairos Safe của bạn.

Để nhận trợ giúp về sản phẩm dựa trên giao diện người dùng (UI) mới nhất, vui lòng tham khảo [Trung tâm Trợ giúp Safe Wallet](https://help.safe.global).

## Chuyển token KAIA <a id="token-transfer"></a>

**Bước 1:** Trong Safe Wallet, mở mục **Ứng dụng** và khởi chạy **Transaction Builder**.

**Bước 2:** Nhập địa chỉ người nhận. Đối với một giao dịch chuyển khoản KAIA đơn giản, bạn có thể để trống trường ABI.

**Bước 3:** Nhập giá trị KAIA cần gửi (ví dụ: `1` tương ứng với 1 KAIA), sau đó nhấp vào **Thêm giao dịch**.

**Bước 4:** Lặp lại thao tác này cho từng người nhận mà bạn muốn thêm vào lô.

**Bước 5:** Khi lô giao dịch đã hoàn tất, hãy nhấp vào **Tạo lô**, kiểm tra lại các thao tác, sau đó nhấp vào **Gửi lô** và thu thập các chữ ký Safe cần thiết theo cách tương tự như bất kỳ giao dịch Safe nào khác.

## Các tương tác trong hợp đồng <a id="contract-interactions"></a>

Hãy sử dụng Transaction Builder khi bạn cần thực hiện nhiều lệnh gọi hợp đồng tương tự nhau — ví dụ như chuyển cùng một loại token đến nhiều địa chỉ — trong một giao dịch Safe duy nhất.

**Bước 1:** Mở **Transaction Builder** từ mục Ứng dụng an toàn.

**Bước 2:** Nhập **địa chỉ token (hoặc hợp đồng)** và **ABI**.

**Bước 3:** Chọn một phương thức (ví dụ: `transfer`) và điền các tham số.

> Lưu ý: Các số nguyên thường được biểu thị bằng đơn vị nhỏ nhất của token (không có số thập phân trong trường này). Đối với một mã thông báo có 18 chữ số thập phân, 10 mã thông báo thường được nhập dưới dạng `10000000000000000000`.

**Bước 4:** Nhấp vào **Thêm giao dịch**, lặp lại thao tác này cho mỗi cuộc gọi, sau đó chọn **Tạo lô** → **Gửi lô** và hoàn tất các xác nhận an toàn.

Hãy thực hiện các giao dịch và chuyển khoản theo lô một cách cẩn thận: mỗi chủ sở hữu ký tên cần xem xét toàn bộ lô giao dịch trước khi thực hiện.
