# 6. Chủ đề nâng cao & Câu hỏi thường gặp

Phần này trình bày các kỹ thuật tích hợp nâng cao, các phương pháp hay nhất, mẹo khắc phục sự cố và các câu hỏi thường gặp về tính năng Trích xuất Khí (GA) của Kaia. Nó được thiết kế dành cho các nhà phát triển muốn tối ưu hóa quá trình triển khai và đảm bảo trải nghiệm người dùng mượt mà.

## 6.1 Các phương pháp tốt nhất

| Chủ đề                                   | Đề xuất                                                                                                                                                                                                                                                                                                                                           | Ghi chú                                                                                                                                                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Sự trượt**                             | Bắt đầu với **0.5% (50 bps)** cho `getAmountIn()` trừ khi token có tính biến động cao.                                                                                                                                                                                                         | SDK không **cố định** giá trị; 0,5% là giá trị mặc định được sử dụng trong mã tham chiếu của Kaia.                                                                                           |
| **Phụ cấp**                              | Lưu trữ giá trị ERC-20 allowance và **bỏ qua `ApproveTx`** khi `allowance > 0`, tránh yêu cầu chữ ký bổ sung và phí gas.                                                                                                                                                                                                          | KIP-247 cho phép gói giao dịch 2 bước (Cho vay + Hoán đổi) khi đã có sự chấp thuận, do đó việc tái sử dụng hạn mức là hoàn toàn an toàn.                                  |
| **Gửi hàng loạt**                        | Sử dụng `kaia_sendRawTransactions` (mảng payload) để đẩy **ApproveTx + SwapTx** cùng nhau, ngăn chặn tình trạng đua pool.                                                                                                                                                                                      | Giao dịch đơn lẻ (`eth_sendRawTransaction`) hoạt động bình thường, nhưng nếu giao dịch thứ hai đến nút trước, nó sẽ thất bại trong quá trình kiểm tra nonce/quy tắc tĩnh. |
| **Bảo mật**                              | a) **Cố định** địa chỉ GaslessSwapRouter (GSR) chuẩn từ tài liệu của Kaia. <br/>b) **Kiểm tra tính tương thích** trước khi tạo swap, ví dụ: `await router.dexAddress(token)` bên trong khối try/catch hoặc bằng cách kiểm tra danh sách được trả về từ `getSupportedTokens()`. | Ngăn chặn các hợp đồng lừa đảo hoặc token không được hỗ trợ chiếm quyền điều khiển luồng GA.                                                                                                 |
| **Đánh giá lượng khí mà không cần KAIA** | Sử dụng `eth_estimateGas` với tùy chọn **state override** để cung cấp cho người gửi một số dư tạm thời trong giao dịch, ví dụ: `eth_estimateGas(txObj, 'latest', { [from]: { balance: '0x…' } })`.                                                                                                                | Bỏ qua lỗi _“số dư không đủ”_ khi tài khoản thực sự có 0 KAIA.                                                                                                                               |

## 6.2 Khắc phục sự cố

| Triệu chứng                                                     | Nguyên nhân có thể                                                                                                                                                                                                                                 | Giải pháp được đề xuất                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gói chưa từng được khai thác**                                | a) `token` **không nằm trong danh sách trắng**. <br/>b) `minAmountOut` quá chặt chẽ và toàn bộ gói bị hoàn nguyên.                                                                                                 | • **Kiểm tra tính tương thích trước tiên**: `await router.dexAddress(token)` (sẽ quay lại trạng thái ban đầu nếu không được hỗ trợ) **hoặc** `getSupportedTokens().includes(token)` **trước khi ký**.<br/>• Tăng `slippageBps` hoặc yêu cầu báo giá lại `amountIn` ngay lập tức. |
| **`LƯỢNG ĐẦU RA KHÔNG ĐỦ` quay lại**                            | Giá đã thay đổi giữa thời điểm báo giá và thực hiện giao dịch, do đó kiểm tra GSR `amountReceived >= minAmountOut` không thành công.                                                                                               | Chạy lại hàm `getAmountIn()` với số dư hiện tại của pool, sau đó xây dựng lại `SwapTx` với giá trị `minAmountOut` cao hơn hoặc độ trượt giá rộng hơn.                                                                                                                                                                               |
| **Nút từ chối giao dịch ("không đủ số dư")** | Chỉ có **GaslessApproveTx** được gửi. Vì kiểm tra số dư bị bỏ qua và giao dịch **SwapTx** tương ứng bị thiếu, người đề xuất không bao giờ tạo giao dịch **LendTx**, và giao dịch này tiêu tốn KAIA mà nó không có. | Luôn gửi **ApproveTx & SwapTx trong cùng một lô** thông qua `kaia_sendRawTransactions`, hoặc đảm bảo `approveRequired == false` để có thể gửi gói 2 giao dịch.                                                                                                                                                  |
| **Sự không khớp của nonce bên trong gói**                       | Ứng dụng phi tập trung (dApp) bên ngoài đã gửi một giao dịch thông thường (tx) tiêu thụ nonce tiếp theo trước khi gói GA được khai thác.                                                     | Gọi hàm `getTransactionCount()` ngay trước khi ký; nếu nonce đã thay đổi, hãy xây dựng lại cả hai đối tượng giao dịch.                                                                                                                                                                                                              |
| `klay_sendRawTransactions → “loại giao dịch không xác định”`    | Bạn đã cố gắng gửi hàng loạt một loại giao dịch cụ thể của Kaia (ví dụ: 0x30) qua điểm cuối **kaia_…**, nhưng điểm cuối này chỉ hỗ trợ các loại giao dịch của Ethereum.    | Gửi gói GA bằng `kaia_sendRawTransactions`, sau đó phát sóng giao dịch 0x30 AppTx bằng `klay_sendRawTransaction`.                                                                                                                                                                                                                   |

## 6.3 Câu hỏi thường gặp

### GA có sẵn trên mạng chính không?

Đúng vậy, GA hiện đang hoạt động trên cả **Kairos testnet** và **mainnet**.

### Nếu người dùng không có đủ token để thực hiện giao dịch hoán đổi thì sao?

Giao dịch SwapTx sẽ thất bại trên chuỗi, nhưng do tính năng **gói giao dịch nguyên tử** của KIP-245, toàn bộ gói giao dịch sẽ bị hoàn tác và loại trừ khỏi khối. Người dùng không mất bất kỳ khoản tiền nào và trạng thái trên chuỗi khối của họ vẫn giữ nguyên - họ không phải trả bất kỳ phí gas nào cho lần thử không thành công.

### Làm thế nào để kiểm tra token nào và số lượng bao nhiêu đã được trao đổi để thanh toán gas?

Mỗi lần gọi `swapForGas` thành công sẽ phát ra sự kiện **SwappedForGas** từ `GaslessSwapRouter`.  
Bạn có thể:

1. Tra cứu địa chỉ router (xem tài liệu contract-addresses) trên KaiaScan và mở tab **Sự kiện**.
2. Giải mã các trường `token`, `amountIn`, `amountOut` và `amountRepay` được hiển thị trong nhật ký sự kiện.

Nếu bạn cần dữ liệu trên chuỗi, hãy theo dõi `SwappedForGas` trong trình chỉ mục hoặc phần backend của dApp.

### GA có thể bị vô hiệu hóa bởi các nút không?

Các nút riêng lẻ có thể tắt GA, nhưng nó **được bật theo mặc định**. Nếu một nút tắt tính năng này, các giao dịch sẽ được xử lý bởi các nút khác hỗ trợ GA.

### Việc trích xuất khí có làm chậm quá trình xử lý khối không?

Không. KIP-245 miễn trừ các gói khỏi kiểm tra thời gian chờ thực thi 250 ms trên mỗi khối, do đó EVM được phép hoàn tất xử lý toàn bộ gói sau khi đã bắt đầu. Giao dịch GA chỉ giới hạn ở các hoạt động ERC20 đã được phê duyệt và hoán đổi GSR, do đó chúng diễn ra trong khoảng thời gian hợp lý. Do đó, các gói GA không ảnh hưởng đến ngân sách thời gian khối của chuỗi.

### Tôi có thể xem giao dịch không cần gas hoạt động như thế nào?

Bạn có thể xem chúng trên trình khám phá mạng thử nghiệm Kairos. Các khối này hiển thị toàn bộ gói lệnh đang được thực thi theo thứ tự:

- **Ví dụ gói 3-tx (Cho vay + Phê duyệt + Hoán đổi):** [Block 189826352 trên Kairos KaiaScan](https://kairos.kaiascan.io/block/189826352?tabId=blockTransactions&page=1)
- **Ví dụ gói 2-tx (Cho vay + Hoán đổi):** [Block 189826547 trên Kairos KaiaScan](https://kairos.kaiascan.io/block/189826547?tabId=blockTransactions)

## 6.4 Tài nguyên bổ sung

**Thông số kỹ thuật:**

- [KIP-247: Giao dịch không cần gas](https://kips.kaia.io/KIPs/kip-247) - Thông số kỹ thuật chính thức của KIP-247
- [KIP-245: Gói giao dịch](https://kips.kaia.io/KIPs/kip-245) - Cơ chế gói gọn
- [Hợp đồng GaslessSwapRouter](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol)

**Tài nguyên cho nhà phát triển:**

- [Kho lưu trữ Kaia SDK](https://github.com/kaiachain/kaia-sdk)
- [Địa chỉ hợp đồng chính thức](https://docs.kaia.io/references/contract-addresses/)
- [Kaia Tài liệu phát triển](https://docs.kaia.io/)

**Cộng đồng & Hỗ trợ:**

- [Diễn đàn thảo luận KIP-247](https://devforum.kaia.io/t/discussion-on-kip-247/8089)
- [Kaia Discord](https://discord.gg/kaiachain)
- [Vấn đề GitHub cho hỗ trợ SDK](https://github.com/kaiachain/kaia-sdk/issues)

**Nội dung giáo dục:**

- [Nếu bạn có thể thanh toán phí gas bằng stablecoin thì sao?](https://medium.com/kaiachain/pay-for-gas-fees-with-any-token-a-deep-dive-into-kaias-trustless-gas-abstraction-d670355a096b)
- [Thông báo về tính thanh khoản của Kaia Consensus](https://medium.com/kaiachain/kaia-consensus-liquidity-a-new-paradigm-in-blockchain-liquidity-7c8a7393cd19)