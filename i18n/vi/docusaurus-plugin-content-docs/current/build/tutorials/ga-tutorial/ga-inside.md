# 2. Cách GA Hoạt Động: Phân Tích Kỹ Thuật Chi Tiết

Phần này cung cấp một cái nhìn tổng quan kỹ thuật chi tiết về cách thức hoạt động của Gas Abstraction trong mạng Kaia, bao gồm gói giao dịch, tính nguyên tử và vai trò của các thành phần chính.

## 2.1 Tổng quan về kiến trúc

GA được xây dựng trên một kiến trúc phi tập trung, tận dụng hợp đồng thông minh và gói giao dịch để đảm bảo trải nghiệm người dùng mượt mà.

### Các thành phần chính

- **[KIP-247 (Giao dịch không tiêu tốn gas)](https://kips.kaia.io/KIPs/kip-247):** Xác định các định dạng giao dịch cụ thể (`GaslessApproveTx`, `GaslessSwapTx`) mà mạng lưới nhận diện là đủ điều kiện để trừ gas.
- **[KIP-245 (Gói giao dịch)](https://kips.kaia.io/KIPs/kip-245):** Đảm bảo rằng chuỗi giao dịch cần thiết (cho vay, phê duyệt, hoán đổi) được thực thi **nguyên vẹn**—tất cả đều thành công hoặc đều thất bại cùng lúc.
- **[GaslessSwapRouter (GSR)](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol):** Hợp đồng thông minh cốt lõi thực hiện việc hoán đổi token sang KAIA và thanh toán khoản vay gas ban đầu cho người đề xuất khối, tất cả trong cùng một khối.

### Các bên liên quan chính

Sơ đồ sau đây minh họa các tác nhân chính và tương tác của họ trong quá trình GA:

![](/img/build/tutorials/ga1.png)

- **Ví**: Ví của người dùng hoặc giao diện dApp khởi tạo giao dịch không tốn gas.
- **Tài khoản người dùng**: Ví hoặc người dùng dApp khởi tạo giao dịch không phí gas.
- **Người đề xuất khối**: Nút đề xuất khối, tạm thời cho vay KAIA để thanh toán phí gas.
- **GaslessSwapRouter (GSR)**: Hợp đồng thông minh chịu trách nhiệm xử lý logic hoán đổi và thanh toán.
- **DEX Router**: Sàn giao dịch phi tập trung (DEX) cơ bản thực hiện việc hoán đổi token thực tế.

## 2.2 Thành phần của gói giao dịch

GA hoạt động thông qua **gói giao dịch**, trong đó client blockchain nhóm _chỉ_ **LendTx + (tùy chọn) ApproveTx + SwapTx** thành một gói giao dịch nguyên tử. Ba cái này hoặc là đều thành công hoặc là đều thất bại. Bất kỳ **AppTx** nào được gửi ngay sau khi gói được _outside_ gói và có thể được hoàn tác độc lập.

![](/img/build/tutorials/ga2.png)

### Giao dịch cho vay (Lend Transaction)

- **Người ký**: Người đề xuất khối
- **Mục đích**: Cho mượn tạm thời KAIA cho người dùng để thanh toán phí gas.
- **Tạo ra**: [Được tạo động](https://github.com/kaiachain/kaia/blob/v2.0.3/kaiax/gasless/impl/getter.go#L267) trong quá trình xây dựng khối
- **Số tiền**: Được tính toán để chi trả cho phí gas của ApproveTx + SwapTx

### Xác nhận giao dịch (Giao dịch xác nhận) - Tùy chọn

- **Người ký**: Người dùng
- **Mục đích**: Phê duyệt việc chi tiêu token ERC-20 cho GaslessSwapRouter
- **Khi cần thiết**: Nếu người dùng chưa từng chấp thuận token trước đó.
- **Định dạng**: Phải tuân thủ các quy định của [KIP-247](https://kips.kaia.io/KIPs/kip-247)

### Giao dịch hoán đổi (Swap Transaction)

- **Người ký**: Người dùng
- **Mục đích**: Đổi token của người dùng lấy KAIA và hoàn trả cho người đề xuất.
- **Hợp đồng**: Gọi [GaslessSwapRouter.sol](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol)
- **Xác thực**: Đảm bảo `số tiền nhận được >= số tiền tối thiểu phải trả >= số tiền phải trả`

## 2.3 Tính nguyên tử và Xử lý lỗi

**Thuộc tính gói KIP-245:**

- **Thực thi tất cả hoặc không**: Nếu bất kỳ giao dịch nào thất bại, toàn bộ gói sẽ được hoàn nguyên.
- **Miễn trừ thời gian chờ**: Các gói được miễn trừ giới hạn thực thi 250ms cho mỗi khối.
- **Quay lại trạng thái ban đầu**: Các gói bị lỗi kích hoạt việc khôi phục hoàn toàn trạng thái.

**Các tình huống lỗi thường gặp:**

- Số dư token không đủ → Gói giao dịch bị hủy, không mất gas.
- Sự chênh lệch giá vượt quá → Giao dịch hoán đổi (SwapTx) thất bại, gói giao dịch được hoàn nguyên.
- Thiếu sự chấp thuận token → Xác thực thất bại, giao dịch vẫn nằm trong hàng đợi.

## 2.4 Xử lý ở cấp độ mạng

**Xác thực bể giao dịch**

Giao dịch không cần gas bỏ qua các kiểm tra số dư thông thường trong bể giao dịch. Logic xác thực phát hiện các giao dịch không tiêu tốn gas và bỏ qua việc kiểm tra số dư tài khoản cho phí gas.

**Logic khuyến mãi và gói combo**

- GaslessApproveTx không thể được thực hiện mà không có giao dịch GaslessSwapTx tương ứng.
- GaslessSwapTx có thể được quảng bá độc lập nếu token đã được phê duyệt.
- Cả hai giao dịch đều được khuyến mãi đồng thời khi cả hai đều có mặt.

**Chặn việc chèn và thực thi đề xuất khối**

Người đề xuất khối tự động chèn LendTx khi phát hiện giao dịch không có phí gas. LendTx được tạo ra ngay lập tức trong quá trình tạo khối và được đặt trước các giao dịch không tốn gas của người dùng.

## 2.5 Ví dụ về quy trình làm việc với thay đổi số dư

Hãy xem xét một tình huống trong đó người dùng có `1.00 BORA` và `0 KAIA`.

| Bước                                               | Hành động                                                                               | Số dư của người đề xuất        | Số dư tài khoản người dùng                               | Ghi chú                                                                              |
| :------------------------------------------------- | :-------------------------------------------------------------------------------------- | :----------------------------- | :------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| 1. Ban đầu                  | -                                                                                       | 10.00 KAIA     | 0.00 KAIA, 1.00 BORA     | Người dùng muốn thanh toán cho một giao dịch.                        |
| 2. **`LendTx`**             | Người đề xuất cho vay 0.02 KAIA.                        | 9,97 KAIA                      | 0,02 KAIA, 1,00 BORA                                     | Người đề xuất chịu trách nhiệm thanh toán chi phí gas của mình.      |
| 3. **`Xác nhận giao dịch`** | Người dùng đã phê duyệt BORA cho GSR.                                   | 9,97 KAIA                      | 0,01 KAIA, 1,00 BORA                                     | Khí đốt (0,01 KAIA) được thanh toán từ khoản vay. |
| 4. **`Đổi giao dịch`**      | Người dùng đổi 0.06 BORA lấy 0.04 KAIA. | **10.00 KAIA** | **0.01 KAIA**, 0.94 BORA | Người đề xuất được thanh toán 0.03 KAIA.             |
| 5. **`AppTx`**              | Người dùng thực thi giao dịch chính của họ.                             | 10.00 KAIA     | 0.00 KAIA, 0.94 BORA     | Khí đốt thanh toán bằng KAIA từ giao dịch hoán đổi.                  |
