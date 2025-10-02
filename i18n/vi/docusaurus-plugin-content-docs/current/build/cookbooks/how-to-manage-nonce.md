# Cách quản lý Nonces để đảm bảo giao dịch đáng tin cậy

Khi phát triển trên Kaia hoặc bất kỳ blockchain tương thích với EVM nào, quản lý nonce là một trong những chi tiết có thể giúp ứng dụng phi tập trung (dApp) của bạn hoạt động trơn tru hoặc dẫn đến các giao dịch bị kẹt hoặc thất bại. Hướng dẫn này giải thích nonces là gì, tại sao chúng quan trọng và cách xử lý chúng một cách hiệu quả khi gửi các giao dịch hàng loạt hoặc theo thứ tự.

## Nonce là gì?

Một nonce (số chỉ sử dụng một lần) là bộ đếm giao dịch cho một tài khoản (EOA). Giao dịch đầu tiên sử dụng nonce 0; mỗi giao dịch tiếp theo tăng thêm 1. Các giao dịch phải được xử lý theo thứ tự nghiêm ngặt (0, 1, 2, …). Thứ tự này ngăn chặn việc tái phát và đảm bảo thứ tự thực thi như ý định. Ví điện tử thường quản lý điều này cho người dùng cuối, nhưng các hệ thống có lưu lượng cao hoặc các luồng giao dịch được ủy quyền phí thường cần kiểm soát rõ ràng.

## Các vấn đề thường gặp liên quan đến Nonce

Khi các giao dịch được gửi với giá trị nonce không chính xác, một số vấn đề có thể xảy ra:

### Khoảng trống trong chuỗi nonce

Các giao dịch sau đó bị kẹt và phải chờ đợi cho đến khi giá trị nonce còn thiếu được điền vào. Ví dụ: Nếu bạn gửi các giao dịch với các giá trị nonce là 0, 1 và 3 (bỏ qua 2), các giao dịch từ 3 trở đi sẽ không được xử lý cho đến khi giá trị nonce 2 được gửi.

### Nonce trùng lặp

Hai giao dịch có cùng nonce sẽ cạnh tranh với nhau. Bên nào được xác nhận trước sẽ thắng. Cái kia bị loại bỏ.

### Va chạm giao dịch khối lượng lớn

Khi gửi nhiều giao dịch nhanh chóng mà không theo dõi cẩn thận giá trị nonce, một số giao dịch có thể thất bại hoặc bị gián đoạn do xung đột giá trị nonce.

## Quản lý Nonces cho các giao dịch hàng loạt

Khi thực hiện nhiều giao dịch (giao dịch theo lô, đúc NFT, bot giao dịch chênh lệch giá), bạn không thể chỉ dựa vào tự động hóa ví. Bạn cần một phương pháp tiếp cận có hệ thống.

### 1. Bảo trì kho lưu trữ nonce ngoài chuỗi

Sử dụng một cơ sở dữ liệu (**Redis**, **Postgres** hoặc bản đồ trong bộ nhớ) để theo dõi giá trị nonce tiếp theo cho mỗi tài khoản. Khi bắt đầu một phiên làm việc, đồng bộ hóa với blockchain bằng cách sử dụng `eth_getTransactionCount`. Sau khi gửi mỗi giao dịch, hãy tăng ngay lập tức bộ đếm nonce cục bộ của bạn.

Phương pháp này cho phép bạn kiểm soát chính xác việc gán nonce và ngăn chặn xung đột khi gửi các giao dịch liên tiếp nhau.

### 2. Sử dụng các thư viện Web3 cho tự động hóa

Các thư viện như **ethers.js** và **web3.js** tự động xử lý việc gán nonce cho các giao dịch liên tiếp. Đối với các giao dịch khối lượng lớn hoặc song song, hãy thay đổi giá trị nonce thủ công từ kho lưu trữ nonce của bạn.

### 3. Tối ưu hóa giao dịch bằng cách sử dụng nhiều tài khoản

Nếu các giao dịch là độc lập, hãy phân phối chúng trên nhiều EOAs. Ví dụ: Thay vì một tài khoản gửi 100 giao dịch (gây ra nút thắt cổ chai nonce), hãy sử dụng 10 tài khoản, mỗi tài khoản gửi 10 giao dịch. Điều này giúp tăng đáng kể thông lượng của bạn.

### 4. Thực hiện xử lý lỗi mạnh mẽ

Phát hiện các giao dịch bị hủy hoặc bị kẹt (thường do mức gas thấp). Thay thế chúng bằng cùng một nonce kèm theo mức phí gas cao hơn. Quy trình này, được gọi là "tăng tốc", đảm bảo hàng đợi giao dịch của bạn luôn được xử lý liên tục.

Logic thử lại là yếu tố quan trọng trong môi trường sản xuất. Xây dựng các cơ chế để xử lý các sự cố tạm thời và gửi lại giao dịch khi cần thiết.

### 5. Theo dõi bằng các trình khám phá blockchain

Sử dụng các công cụ như **KaiaScan**, **OKX Explorer** hoặc các trình chỉ mục tùy chỉnh để xác minh tiến trình nonce. Điều này giúp gỡ lỗi khi các giao dịch không thể truyền tải hoặc bị kẹt trong các trạng thái không mong muốn.

### 6. Thiết kế cho khả năng mở rộng

Đối với các hệ thống có lưu lượng cao (bot giao dịch, đúc hàng loạt), thiết kế quy trình làm việc phân bổ động các địa chỉ EOA mới, sử dụng hàng đợi nonce để đảm bảo thứ tự giao dịch và mở rộng quy mô theo chiều ngang bằng cách phân phối giao dịch qua nhiều tài khoản.

### 7. Điều chỉnh thủ công cho người dùng nâng cao

Cung cấp tùy chọn để thiết lập thủ công nonces trong trường hợp giao dịch bị kẹt. Hầu hết các ví (như MetaMask) đã hỗ trợ tính năng này cho người dùng nâng cao cần kiểm soát chi tiết.

## Ví dụ quy trình: Quản lý giao dịch hàng loạt

Dưới đây là cách hoạt động của một hệ thống quản lý nonce điển hình cho các giao dịch hàng loạt:

![](/img/build/tutorials/nonce-management-example.png)

1. **Lấy giá trị nonce hiện tại**: Tra cứu trình quản lý nonce (ví dụ: Redis) để lấy giá trị nonce cuối cùng được sử dụng cho địa chỉ người gửi.
2. **Tăng và gán**: Tăng giá trị nonce cục bộ và gán nó cho giao dịch tiếp theo.
3. **Gửi giao dịch**: Gửi giao dịch lên mạng lưới.
4. **Cập nhật cửa hàng**: Ngay lập tức cập nhật giá trị nonce trong cơ sở dữ liệu của bạn (Redis, cơ sở dữ liệu) dựa trên địa chỉ người gửi.
5. **Xử lý lỗi giao dịch**: Nếu một giao dịch thất bại (ví dụ: Tx(1)), hãy thực hiện logic thử lại với phí gas cao hơn bằng cách sử dụng cùng một nonce trước khi tiếp tục với Tx(2).

Yếu tố quan trọng là duy trì một trình quản lý nonce tập trung theo dõi nonce cuối cùng được sử dụng cho mỗi địa chỉ. Mỗi giao dịch tăng giá trị này (Tx(0) sử dụng nonce 0, Tx(1) sử dụng nonce 1, và tiếp tục như vậy) và cập nhật kho lưu trữ một cách nguyên tử. Điều này ngăn chặn các va chạm nonce khi gửi các giao dịch liên tiếp nhau.

Để ước tính giới hạn gas và giá gas (bao gồm việc chọn mức phí cao hơn khi thử lại), xem [Cách ước tính giới hạn gas và giá gas trên Kaia Wallet và MetaMask](../wallets/wallet-ops/estimate-gaslimits-prices-on-kaia-wallet-and-metamask.mdx).

## Kết luận

Quản lý nonce đáng tin cậy là yếu tố quan trọng đối với các hệ thống có lượng giao dịch lớn. Sử dụng kho lưu trữ nonce ngoài chuỗi, xử lý lỗi đúng cách (cùng nonce, phí cao hơn), giám sát và mở rộng theo chiều ngang để duy trì thông lượng cao và tránh tình trạng tắc nghẽn. Các quy tắc nonce tương tự cũng áp dụng cho các giao dịch được ủy quyền phí.