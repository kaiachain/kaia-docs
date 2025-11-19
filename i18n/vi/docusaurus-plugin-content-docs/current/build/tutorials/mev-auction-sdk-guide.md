# Hướng dẫn SDK đấu giá Kaia MEV cho người tìm kiếm

[Kaia v2.1.0](https://github.com/kaiachain/kaia/releases/tag/v2.1.0) đã giới thiệu hệ thống đấu giá MEV, cho phép người dùng tham gia vào các cuộc đấu giá công bằng và minh bạch để tận dụng cơ hội MEV. Hướng dẫn này cung cấp một hướng dẫn chi tiết về quy trình làm việc của người tìm kiếm sử dụng SDK Kaia MEV Auction.

:::info

Hướng dẫn này sử dụng các điểm cuối và địa chỉ hợp đồng của mạng thử nghiệm Kairos. Việc ra mắt mạng chính (mainnet) dự kiến sẽ diễn ra vào giữa tháng 12 năm 2025. Khi triển khai lên mạng chính, hãy cập nhật tất cả các điểm cuối và địa chỉ hợp đồng tương ứng.

:::

Quy trình làm việc của người tìm kiếm bao gồm bốn bước chính:

![](/img/build/tutorials/searcher-guide-1.png)

1. **Khoản đặt cọc**: Người tham gia đặt cọc các token KAIA vào `AuctionDepositVault` để tài trợ cho hoạt động đấu giá.
2. **Đấu giá**: Các nhà thầu cạnh tranh bằng cách nộp các đề xuất đấu giá kín cho người điều hành đấu giá để giành các khung giờ phát sóng.
3. **Nộp đề xuất trúng thầu**: Người điều hành đấu giá chọn người trúng thầu và chuyển các đề xuất trúng thầu đến các nút đồng thuận (CNs).
4. **Thực hiện giao dịch đấu giá**: Các CN thực hiện các giao dịch đấu giá thắng cuộc thông qua hợp đồng `AuctionEntryPoint`.

Để biết thêm chi tiết về nền tảng kỹ thuật, xem [KIP-249](https://kips.kaia.io/KIPs/kip-249).

## Điều kiện tiên quyết

Trước khi bắt đầu, hãy đảm bảo rằng bạn đã có:

- Ví được nạp tiền bằng token KAIA để nạp tiền.
- [Go](https://golang.org/) đã được cài đặt (phiên bản 1.25+) cho các ví dụ SDK.
- Quyền truy cập vào các điểm cuối mạng Kaia (hướng dẫn này sử dụng mạng thử nghiệm Kairos)
- (Tùy chọn) [Foundry](https://getfoundry.sh/) đã được cài đặt (để sử dụng các lệnh `cast`)

**Điểm cuối mạng:**

- Kairos (mạng thử nghiệm): `https://public-en-kairos.node.kaia.io`
- Mainnet: `https://public-en.node.kaia.io`

**Địa chỉ hợp đồng (Kairos):**

- AuctionFeeVault: `0xE4e7d880786c53b6EA6cfA848Eb3a05eE97b2aCC`
- AuctionDepositVault: `0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc`
- AuctionEntryPoint: `0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480`

Đối với địa chỉ hợp đồng trên mạng chính (sẽ có sẵn sau khi mạng chính được ra mắt), vui lòng kiểm tra [Địa chỉ hợp đồng](../../references/contract-addresses.md).

:::tip[Monitor Cơ hội MEV]

Người tìm kiếm có thể xác định các giao dịch có lợi nhuận bằng cách:

- **Đăng ký API giao dịch đang chờ xử lý của Nhà đấu giá**: API này truyền trực tiếp các giao dịch từ các nút đồng thuận, cho phép bạn phát hiện các cơ hội MEV theo thời gian thực. Xem phần [Giao dịch đang chờ xác nhận đăng ký](#step-3-subscribe-to-pending-transactions) bên dưới.
- **Theo dõi mempool mạng một cách độc lập**: Thực hiện logic phát hiện cơ hội MEV của riêng bạn bằng cách đăng ký các giao dịch đang chờ xử lý.

:::

## Bước 1: Nạp tiền

![](/img/build/tutorials/searcher-guide-2.png)

`AuctionDepositVault` lưu trữ số dư đặt cọc của bạn. Số tiền đặt cọc của bạn phải đủ để chi trả cả số tiền đặt cọc và phí gas dự kiến cho việc thực hiện đặt cọc.

### Hiểu rõ các yêu cầu về tiền gửi

Số dư tiền gửi của bạn phải đủ để:

- **Số tiền đặt giá**: Số tiền KAIA mà bạn sẵn sàng trả để thắng cuộc đấu giá.
- **Phí gas ước tính**: Lượng gas tiêu thụ trong quá trình thực thi lệnh đặt giá (được trừ sau khi thực thi và chuyển cho các nhà đề xuất khối)

:::warning[Always [duy trì số dư tiền gửi đủ mức]

Nếu số dư tài khoản của bạn không đủ để thanh toán số tiền đặt giá thầu cộng với phí gas dự kiến, đề nghị đặt giá thầu của bạn sẽ bị từ chối bởi người điều hành đấu giá trong quá trình xác minh.

:::

### Phương thức nạp tiền

Hợp đồng quy định hai phương thức đặt cọc:

**Phương pháp 1: `deposit()`**

Gửi tiền bằng số dư của người gửi. Số tiền đặt cọc được ghi có vào tài khoản của người gửi.

```bash
# Deploy deposit of 200 KAIA
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "deposit()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

**Phương pháp 2: `depositFor(address searcher)`**

Gửi tiền thay mặt cho tài khoản khác. Dùng để tài trợ cho nhiều địa chỉ tìm kiếm từ một nguồn duy nhất.

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositFor(address)" <SEARCHER_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

### Kiểm tra số dư tài khoản của bạn

Tra cứu số dư tài khoản tiền gửi hiện tại của bạn:

```bash
cast call 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositBalances(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
```

Để xem các ví dụ chi tiết về tiền gửi, vui lòng tham khảo hướng dẫn [DEPOSIT.md](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/DEPOSIT.md).

## Bước 2: Nộp hồ sơ dự thầu

![](/img/build/tutorials/searcher-guide-3.png)

Sau khi xác định được một giao dịch có lợi nhuận, hãy nộp đơn đặt giá cho người đấu giá. Các đề xuất được niêm phong (giấu kín cho đến khi phiên đấu giá kết thúc) và cạnh tranh dựa trên giá thầu.

### Cấu trúc đấu thầu

Một đề xuất bao gồm các trường sau (như được định nghĩa trong [types.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/types.go)):

```go
type AuctionBid struct {
    TargetTxRaw  []byte         // Raw transaction bytes of target tx
    TargetTxHash common.Hash    // Transaction to backrun
    BlockNumber  *big.Int       // Target block number
    Sender       common.Address // Your searcher address
    To           common.Address // Contract to call
    Nonce        uint64         // Current nonce from AuctionEntryPoint
    Bid          *big.Int       // Your bid in KAIA
    CallGasLimit uint64         // Gas limit for your backrun logic
    Data         []byte         // Encoded function call
    SearcherSig  []byte         // EIP-712 signature from searcher
}
```

:::info

Sau khi bạn nộp đề xuất đấu giá, Người điều hành đấu giá sẽ xác minh và thêm chữ ký của mình (`AuctioneerSignature`) trước khi chuyển các đề xuất trúng thầu đến các Nút đồng thuận. Bạn chỉ cần cung cấp `SearcherSig` (chữ ký EIP-712 của bạn).

:::

### Nộp đề xuất

SDK cung cấp một ví dụ hoàn chỉnh và hoạt động tại [`example/submitbid.go`](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go). Ví dụ minh họa:

- Thiết lập kết nối HTTPS với người đấu giá
- Phát hiện các khối mới từ điểm cuối EN
- Tạo các giao dịch mục tiêu và các đề xuất tương ứng
- Nộp hồ sơ dự thầu cho Ban tổ chức đấu giá

**Hành động cần thực hiện**: Thay thế khóa riêng tư của bạn trong mã trước khi chạy nó. Kiểm tra các bình luận `TODO:` trong mã nguồn.

Chạy ví dụ:

```bash
# From repository root
go run example/submitbid.go
```

### Xác minh đề xuất

Người điều hành đấu giá, Người đề xuất và Hợp đồng thông minh mỗi bên thực hiện các kiểm tra xác thực cụ thể đối với các đề nghị đấu giá. Các quy tắc xác thực chính bao gồm:

- **Số khối**: Phải là currentBlockNumber + 1 hoặc currentBlockNumber + 2
- **Số tiền đặt cọc**: Phải lớn hơn 0 và nhỏ hơn hoặc bằng số dư tiền gửi khả dụng của bạn.
- **Kích thước dữ liệu giao dịch**: Không được vượt quá `BidTxMaxDataSize` (64KB)
- **Giới hạn gas cho giao dịch**: Không được vượt quá `BidTxMaxCallGasLimit` (10.000.000)
- **Nonce**: Phải khớp với nonce hiện tại của bạn trong `AuctionEntryPoint`. Hãy truy vấn bằng:
  ```bash
  cast call 0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480 "nonces(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
  ```
- **Chữ ký**: Phải là chữ ký hợp lệ theo tiêu chuẩn EIP-712 (xem [submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) để biết cách triển khai)
- **Bảo đảm tiền gửi**: Phải có đủ tiền gửi để chi trả cho `bid_amount + estimated_gas_fee`
- **Độc đáo**: Không thể có một đề nghị trúng thầu khác trong cùng một khối (trừ khi nhắm mục tiêu vào cùng một giao dịch)
- **Chữ ký của người đấu giá**: Phải hợp lệ (được người đấu giá thêm sau khi bạn nộp)

Để xem ma trận xác thực đầy đủ cho biết thực thể nào thực hiện các kiểm tra nào, vui lòng tham khảo [Hướng dẫn xác thực đề xuất](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/bid_validation.md).

## Bước 3: Đăng ký theo dõi các giao dịch đang chờ xử lý

![](/img/build/tutorials/searcher-guide-4.png)

Nhà đấu giá cung cấp dịch vụ đăng ký WebSocket cho phép truyền trực tiếp các giao dịch đang chờ xử lý từ các nút đồng thuận. Điều này cho phép người tìm kiếm phát hiện các cơ hội MEV theo thời gian thực.

SDK cung cấp một ví dụ hoàn chỉnh tại [example/subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go).

Ví dụ minh họa:

- Thiết lập kết nối WebSocket với Auctioneer
- Đăng ký theo dõi luồng giao dịch đang chờ xử lý
- Xử lý các giao dịch đến để xác định cơ hội MEV.

Chạy ví dụ:

```bash
# From repository root
go run example/subscribe_pendingtx.go
```

Dịch vụ đăng ký liên tục in các băm giao dịch khi phát hiện các giao dịch đang chờ xử lý. Bạn có thể mở rộng ví dụ này để triển khai logic phát hiện MEV của riêng mình.

## Bước 4: Hiểu về quá trình thực thi

Khi đề xuất của bạn trúng thầu, Nút Đồng thuận sẽ thực thi nó thông qua hợp đồng `AuctionEntryPoint`:

![](/img/build/tutorials/searcher-guide-1.png)

### Quy trình thực thi

Quy trình thực thi bao gồm ba giai đoạn:

1. **Giai đoạn xác thực**: Hợp đồng xác thực số khối, chữ ký, nonce và số tiền đặt cược.
2. **Giai đoạn thanh toán đấu thầu**: Số tiền đấu thầu được trừ từ khoản đặt cọc của bạn và chuyển vào quỹ hệ sinh thái.
3. **Giai đoạn thực thi**: Giao dịch của bạn được thực thi bởi hợp đồng EntryPoint (việc thanh toán đặt cược diễn ra bất kể kết quả thực thi).

**Các tính năng bảo mật chính:**

- Các trình xác thực thực hiện các đề xuất thay mặt bạn (ngăn chặn việc hủy bỏ đề xuất để tránh thanh toán).
- Sự gia tăng nonce ngăn chặn các cuộc tấn công tái phát.
- Chữ ký kép (người tìm kiếm + người đấu giá) không được phép thay thế hoặc thao túng giá thầu.
- Thanh toán thầu diễn ra bất kể kết quả thực thi backrun.

Để xem chi tiết về luồng thực thi, hãy tham khảo hướng dẫn [ENTRYPOINT.md](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/ENTRYPOINT.md).

## Bước 5: Rút tiền

![](/img/build/tutorials/searcher-guide-5.png)

Việc rút tiền yêu cầu một quy trình hai bước với thời gian khóa:

### 1. Rút tiền từ tài khoản dự trữ

Bắt đầu quá trình rút tiền và khởi động khoảng thời gian khóa 60 giây:

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "reserveWithdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

### 2. Rút lui hoàn toàn

Sau 60 giây, chuyển số tiền đã dự trữ:

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "withdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

:::info[Security Lưu ý]

Quy trình rút tiền hai bước có thời gian khóa:

- Ngăn chặn việc thoát khỏi phiên đấu giá đột ngột trong các giai đoạn đấu giá đang diễn ra.
- Bảo đảm tính toàn vẹn của giao thức bằng cách đảm bảo các bên tham gia tuân thủ cam kết của mình.
- Bảo vệ chống lại các cuộc tấn công thao túng vốn nhanh chóng.

:::

## Tham chiếu API

Nhà đấu giá cung cấp hai giao diện lập trình ứng dụng (API) chính cho người tìm kiếm:

**1. Gửi đề xuất API**

- **Điểm cuối**: `POST /api/v1/auction/send`
- **Mục đích**: Nộp hồ sơ dự thầu kín cho các cơ hội MEV.

**2. Đăng ký giao dịch đang chờ xử lý**

- **Điểm cuối**: `GET /api/v1/subscriber/pendingtx`
- **Mục đích**: Dòng dữ liệu thời gian thực về các giao dịch đang chờ xử lý từ các nút đồng thuận.
- **Ví dụ**: Xem ví dụ thực hiện trong [subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go)

**Tài liệu API đầy đủ:**

- Các thông số kỹ thuật OpenAPI (Swagger) có sẵn tại:
  - **Kairos**: https://auctioneer-kairos.kaia.io/docs
  - **Mainnet**: Có sẵn sau khi mainnet được ra mắt.
- Sử dụng API: [Tài liệu API](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/api_doc.md)

## Khắc phục sự cố

### Vấn đề thường gặp

| Loại vấn đề                 | Triệu chứng                                                             | Nguyên nhân                                                                                                           | Giải pháp                                                                                                                                                                                                               |
| --------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Số dư không đủ**          | Đề nghị đấu giá bị từ chối bởi người điều hành đấu giá. | Số dư tiền gửi không đủ để thanh toán số tiền đặt cọc + phí gas dự kiến.                              | Kiểm tra số dư bằng hàm `depositBalances()` và nạp thêm KAIA.                                                                                                                                           |
| **Sự không khớp của nonce** | Đề xuất bị từ chối hoặc việc thực hiện không thành công                 | Nonce không khớp với nonce hiện tại trong `AuctionEntryPoint`                                                         | Kiểm tra giá trị nonce hiện tại bằng hàm `nonces()` trước mỗi lần đặt giá thầu. Lưu ý: Nonces chỉ tăng khi thực thi, không phải khi gửi.                                |
| **Phạm vi số khối**         | Đề nghị đấu giá bị từ chối bởi người điều hành đấu giá. | Khối mục tiêu nằm ngoài phạm vi cho phép `[current+1, current+allowFutureBlock]`                                      | Đảm bảo số khối nằm trong phạm vi (thường là +1 hoặc +2). Xem FAQ để biết chiến lược nộp đơn kép.                                                                    |
| **Chữ ký không hợp lệ**     | Đề nghị đấu giá bị từ chối bởi người điều hành đấu giá. | Cấu trúc chữ ký EIP-712 không chính xác                                                                               | Xác minh dấu phân cách miền và nhập mã băm. Tham khảo [submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) để thực hiện đúng cách. |
| **Vấn đề giới hạn gas**     | Thực thi thất bại hoặc đề nghị bị từ chối                               | `CallGasLimit` quá thấp hoặc vượt quá giới hạn tối đa (10.000.000) | Kiểm tra logic chạy ngược trên mạng thử nghiệm để đo lường mức tiêu thụ gas thực tế.                                                                                                                    |

## Câu hỏi thường gặp

### Đăng ký

**Câu hỏi: Số lượng kết nối đồng thời được phép cho mỗi người tìm kiếm là bao nhiêu?**

A: Mỗi địa chỉ người tìm kiếm chỉ được phép có một kết nối đăng ký giao dịch đang chờ xử lý.

**Câu hỏi: Kết nối đăng ký sẽ duy trì hoạt động trong bao lâu?**

A: Các kết nối sẽ tự động đóng sau 24 giờ. Lưu ý rằng kết nối có thể bị đóng trước 24 giờ nếu đang thực hiện cập nhật liên tục.

### Hiệu suất và độ trễ của API

**Câu hỏi: Làm thế nào để giảm thiểu độ trễ API khi gửi đề xuất?**

A: Người điều hành đấu giá sử dụng bộ cân bằng tải L7 với giao thức HTTPS. Quá trình bắt tay ban đầu mất thời gian tùy thuộc vào trạng thái mạng. Để tránh sự chậm trễ ban đầu khi gửi các API đặt giá tiếp theo, khuyến nghị mạnh mẽ là thiết lập kết nối keep-alive.

**Câu hỏi: Tôi có cần lưu ý về giới hạn tốc độ API không?**

A: Để tránh bị chặn bởi máy chủ API của Auctioneer, vui lòng không gửi yêu cầu `ping` API quá nhiều lần trong một khoảng thời gian ngắn.

**Câu hỏi: Vị trí địa lý có ảnh hưởng đến độ trễ không?**

A: Vâng. Máy chủ Auctioneer đang chạy trong khu vực GCP KR (Seoul). Bạn được khuyến nghị nên triển khai hạ tầng của mình tại một khu vực địa lý gần để giảm thiểu độ trễ và giảm thiểu sự chậm trễ do khoảng cách địa lý.

### Thời điểm đặt giá thầu và mục tiêu khối

**Câu hỏi: Tại sao đề xuất của tôi đôi khi nhắm mục tiêu vào số khối sai?**

A: Thời điểm nộp đề xuất của bạn có ảnh hưởng lớn đến thời gian khai thác của CN (Consensus Node). Nếu phiên đấu giá bắt đầu muộn (gần thời gian khai thác), giao dịch đặt giá thầu sẽ được chèn vào khối tiếp theo (số khối +2 thay vì +1). Điều này có nghĩa là bạn nên đặt số khối mục tiêu của mình thành +2.

**Câu hỏi: Làm thế nào để tôi có thể cải thiện tỷ lệ trúng thầu của mình?**

A: Số khối mục tiêu có tính nhạy cảm cao với lịch trình khai thác CN: nếu bạn đặt mục tiêu là khối +2 nhưng giao dịch được chèn vào khối +1 do quá trình xử lý sớm hơn, đề xuất sẽ thất bại. Do đó, khuyến nghị nên tối đa hóa xác suất được chọn bằng cách gửi giao dịch đặt giá thầu hai lần: một lần với số khối mục tiêu là +1 và một lần với số khối mục tiêu là +2.

## Các phương pháp tốt nhất

- **Theo dõi số dư tài khoản**: Duy trì số dư đủ để đảm bảo có thể tham gia nhiều lượt đấu giá.
- **Xử lý Nonces cẩn thận**: Luôn kiểm tra nonce mới nhất trước khi đặt giá thầu.
- **Tối ưu hóa phát hiện**: Phát hiện MEV nhanh hơn giúp nâng cao lợi thế cạnh tranh.
- **Kiểm thử trên Kairos**: Kiểm tra chiến lược của bạn trên mạng thử nghiệm trước khi triển khai lên mạng chính.
- **Theo dõi kết quả**: Theo dõi kết quả đấu giá thông qua MEV Explorer để tối ưu hóa chiến lược đặt giá thầu của bạn.
- **Đặt giới hạn khí phù hợp**: Cân bằng giữa lượng khí đủ và hiệu quả chi phí.

## Tài nguyên

- [Kho SDK](https://github.com/kaiachain/auctioneer-sdk)
- [KIP-249 Specification](https://kips.kaia.io/KIPs/kip-249)
- [Ví dụ mã nguồn](https://github.com/kaiachain/auctioneer-sdk/tree/dev/example)
- Tài liệu API: [auctioneer-kairos.kaia.io/docs](https://auctioneer-kairos.kaia.io/docs) (Kairos), TBU (Mainnet)
- MEV Explorer: [mev-kairos.kaia.io](https://mev-kairos.kaia.io) (Kairos), TBU (Mainnet)
- [Câu hỏi thường gặp](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/FAQ.md)

## Nhận trợ giúp

Đối với các vấn đề hoặc câu hỏi:

- Đăng bài trong [Kaia DevForum](https://devforum.kaia.io)
- Mở một vấn đề trong kho lưu trữ SDK (https://github.com/kaiachain/auctioneer-sdk/issues)