---
title: Các câu hỏi thường gặp
sidebar_label: Câu hỏi thường gặp
---

# Các câu hỏi thường gặp

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **31 tháng 8 năm 2026**. Vui lòng sử dụng Safe Wallet dành cho Kaia Network tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới.

:::

## Việc chuyển sang Safe Global có ảnh hưởng đến tài khoản Safe hiện tại của tôi không? <a id="Does moving to Safe Global affect my existing Safe"></a>

Không. Your Safe là một tài khoản thông minh trên chuỗi khối. Safe Global là một giao diện người dùng (**UI**) khác dành cho cùng các hợp đồng đó. Địa chỉ ví Safe, chủ sở hữu, ngưỡng và tài sản của bạn vẫn không thay đổi. Bạn không cần phải tạo lại tài khoản Safe hay chuyển tiền.

Xem **[Chuyển sang Safe Global](./migrate-to-safe-global.md)** để biết thêm chi tiết.

## Tài khoản Safe của tôi có tự động xuất hiện trên app.safe.global không? <a id="Will my Safe appear automatically"></a>

Trong hầu hết các trường hợp, câu trả lời là có: chỉ cần kết nối ví chủ sở hữu, ví Safe hiện có của bạn sẽ xuất hiện trong danh sách, kèm theo tên mạng tương ứng (**Kaia** hoặc **Kairos**). Nếu nó không hiển thị, hãy truy cập [app.safe.global/welcome/accounts](https://app.safe.global/welcome/accounts) và nhấp vào **Quản lý danh sách** để xem các Safes được liên kết với ví đã kết nối của bạn.

Sổ địa chỉ và biệt danh của bạn được lưu trữ cục bộ trong giao diện cũ và cần được xuất một lần từ `safe.kaia.io` (**Cài đặt → Dữ liệu → Xuất dữ liệu**), sau đó tải lên tại [app.safe.global/welcome/accounts](https://app.safe.global/welcome/accounts) trong phần **Nhập dữ liệu Safe của bạn**. Điều đó không ảnh hưởng đến quyền sở hữu hoặc số dư trên chuỗi.

## Tôi có thể thêm chủ sở hữu mới sau khi đã tạo một Safe không? <a id="Can i add new owners after creating a safe"></a>

Đúng vậy. Trong Safe Wallet, hãy mở **Cài đặt** để quản lý chủ sở hữu Safe: thêm, xóa, thay thế hoặc đổi tên chủ sở hữu. Bạn phải đăng nhập với tư cách là chủ sở hữu hiện tại, và các thay đổi phải đáp ứng ngưỡng xác nhận thông thường.

Quy trình điển hình:

1. Mở **Cài đặt** → Quản lý chủ sở hữu/người ký.
2. Thêm chủ sở hữu mới (tên + địa chỉ).
3. Hãy điều chỉnh chính sách chữ ký nếu cần thiết.
4. Xem lại và gửi; các chủ sở hữu khác sẽ xác nhận như bất kỳ giao dịch an toàn nào khác.

Các nhãn trên giao diện người dùng có thể thay đổi một chút khi Safe Wallet tiếp tục được phát triển — vui lòng tham khảo [Trung tâm Trợ giúp](https://help.safe.global) để xem các ảnh chụp màn hình mới nhất.

## Tôi có thể thay đổi số lượng xác nhận bắt buộc không? <a id="Can i change the number of required signer confirmation"></a>

Đúng vậy. Trong phần **Cài đặt**, hãy điều chỉnh ngưỡng xác nhận cần thiết, sau đó gửi yêu cầu và thu thập chữ ký của chủ sở hữu theo chính sách _hiện hành_.

## Làm thế nào để thêm một két sắt đã có sẵn? <a id="How do i add an existing safe"></a>

Bạn có thể mở một Safe hiện có tại [app.safe.global](https://app.safe.global) bằng cách kết nối ví của chủ sở hữu hoặc thêm địa chỉ Safe. Các trường hợp sử dụng bao gồm:

- Truy cập cùng một Safe từ một trình duyệt hoặc thiết bị khác
- Tương tác với một két sắt mà người khác đã chỉ định bạn làm chủ sở hữu
- Xem két sắt ở chế độ chỉ đọc

Nếu Safe không hiển thị sau khi kết nối, hãy truy cập [app.safe.global/welcome/accounts](https://app.safe.global/welcome/accounts) và nhấp vào **Quản lý danh sách**. Trang này cũng hỗ trợ tính năng **Nhập dữ liệu Safe của bạn** nếu bạn đã xuất danh bạ từ `safe.kaia.io` — xem [Chuyển sang Safe Global](./migrate-to-safe-global.md#export-your-address-book).

## Các mẹo thiết lập an toàn phổ biến

Không có một cấu hình nào là tốt nhất cả — điều này còn tùy thuộc vào mục đích sử dụng của bạn. Các thiết lập mặc định hữu ích:

**Có bao nhiêu người quản lý?**  
Đối với các đội, hãy sử dụng nhiều người quản lý để có thể có nhiều hơn một người phê duyệt. Những người quản lý số dư lớn thường sử dụng nhiều thiết bị/tài khoản riêng để đảm bảo tính dự phòng.

**Ngưỡng nào?**  
Hãy đặt ngưỡng lớn hơn 1 để một khóa bị xâm phạm không thể tự mình chuyển tiền. Mức ngưỡng khoảng 51% số chủ sở hữu (ví dụ: 2 trong 3, 3 trong 5) sẽ hỗ trợ quá trình phục hồi: các chủ sở hữu còn lại vẫn có thể thay thế một chủ sở hữu đã mất.

**Những loại ví nào tương thích?**  
Safe Wallet trên Kaia tương thích với các ví EOA phổ biến như [Kaia Wallet](https://docs.kaiawallet.io/) và [MetaMask](../../tutorials/connecting-metamask.mdx). Hãy kiểm tra quy trình kết nối của Safe Wallet để xem danh sách ví hiện tại.

## Thêm trợ giúp

- [Trung tâm trợ giúp Safe Wallet](https://help.safe.global)
- [Tài liệu hướng dẫn an toàn](https://docs.safe.global)
