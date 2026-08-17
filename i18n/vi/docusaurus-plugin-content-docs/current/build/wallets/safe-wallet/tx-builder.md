---
title: Sử dụng Trình tạo giao dịch
sidebar_label: Trình tạo giao dịch
---

# Sử dụng Trình tạo giao dịch

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **31 tháng 8 năm 2026**. Vui lòng sử dụng Safe Wallet dành cho Kaia Network tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới. Các Tài khoản Safe hiện có của bạn sẽ tự động tương thích với Safe Wallet.

:::

**Transaction Builder** gộp nhiều thao tác — chuyển token, phê duyệt và gọi hợp đồng — thành một giao dịch Safe duy nhất. Thay vì xác nhận từng thao tác riêng lẻ, bạn tạo một lô, sau đó xác nhận và thực thi lô đó một lần duy nhất. Lô thao tác này có tính nguyên tử: nếu một thao tác bị hoàn tác, toàn bộ lô thao tác sẽ bị hoàn tác.

Để nhận trợ giúp về sản phẩm dựa trên giao diện người dùng (UI) mới nhất, vui lòng tham khảo [Trung tâm Trợ giúp Safe Wallet](https://help.safe.global).

## Chuyển token KAIA <a id="token-transfer"></a>

**Bước 1:** Trong Safe Wallet, nhấp vào **Giao dịch mới** và chọn **Trình tạo giao dịch**.

**Bước 2:** Nhập địa chỉ người nhận. Đối với một giao dịch chuyển khoản KAIA đơn giản, bạn có thể để trống trường ABI.

**Bước 3:** Nhập giá trị KAIA cần gửi (ví dụ: `1` tương ứng với 1 KAIA), sau đó nhấp vào **Thêm giao dịch**.

**Bước 4:** Lặp lại thao tác này cho từng người nhận mà bạn muốn thêm vào lô. Bạn có thể sắp xếp lại thứ tự hoặc xóa các mục trong danh sách, đồng thời tải xuống dưới dạng JSON để sử dụng lại sau này hoặc chuyển cho người ký khác để nhập vào.

**Bước 5:** Khi lô giao dịch đã hoàn tất, hãy nhấp vào **Tạo lô**, kiểm tra lại các thao tác, sau đó nhấp vào **Gửi lô** và thu thập các chữ ký Safe cần thiết theo cách tương tự như bất kỳ giao dịch Safe nào khác.

## Các tương tác trong hợp đồng <a id="contract-interactions"></a>

Hãy sử dụng Transaction Builder khi bạn cần thực hiện nhiều lệnh gọi hợp đồng tương tự nhau — ví dụ như chuyển cùng một loại token đến nhiều địa chỉ — trong một giao dịch Safe duy nhất.

**Bước 1:** Trong Safe Wallet, nhấp vào **Giao dịch mới** và chọn **Trình tạo giao dịch**.

**Bước 2:** Nhập **địa chỉ token (hoặc hợp đồng)** và **ABI**.

**Bước 3:** Chọn một phương thức (ví dụ: `transfer`) và điền các tham số.

> Lưu ý: Các số nguyên thường được biểu thị bằng đơn vị nhỏ nhất của token (không có số thập phân trong trường này). Đối với một mã thông báo có 18 chữ số thập phân, 10 mã thông báo thường được nhập dưới dạng `10000000000000000000`.

**Bước 4:** Nhấp vào **Thêm giao dịch**, lặp lại thao tác này cho mỗi cuộc gọi, sau đó chọn **Tạo lô** → **Gửi lô** và hoàn tất các xác nhận an toàn.

Transaction Builder tạo ra các giao dịch thô và có thể gọi bất kỳ hợp đồng nào trên Kaia, do đó các lỗi xảy ra sẽ không thể khắc phục được. Mỗi chủ sở hữu khi ký tên cần xem xét toàn bộ lô giao dịch — bao gồm từng người nhận, phương thức và số tiền — trước khi thực hiện.
