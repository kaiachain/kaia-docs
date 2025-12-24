# Tối ưu hóa lưu trữ

Khi blockchain Kaia phát triển, nhu cầu lưu trữ dữ liệu chuỗi cũng tăng theo. Kaia áp dụng hai kỹ thuật chính để quản lý yêu cầu lưu trữ ngày càng tăng này:

## Cắt bớt lô trạng thái (Di chuyển trạng thái)

Chức năng State Migration là một tính năng cắt tỉa theo lô có thể được áp dụng cho các nút hiện có mà không làm gián đoạn hoạt động của các nút đang chạy.

### Động lực

Các trạng thái khối (Block states) hoặc StateDB lưu trữ các tài khoản và hợp đồng trên chuỗi trong cấu trúc dữ liệu trie. Cấu trúc dữ liệu trie được thiết kế để lưu trữ cả các trạng thái đã lỗi thời và các trạng thái mới nhất, để chúng có thể được xác minh bằng cách sử dụng hàm băm Merkle. Khi các giao dịch thực hiện thay đổi trạng thái, cây trạng thái (state trie) sẽ phát triển vô hạn. Tính đến thời điểm viết bài (tháng 8 năm 2024), kích thước của nút lưu trữ chính Kaia Mainnet đã vượt quá 20TB và ngay cả nút đầy đủ cũng đã vượt quá 10TB.

### Khái niệm

Hệ thống di chuyển trạng thái xóa các trạng thái khối cũ không còn cần thiết cho việc xử lý các khối mới. Nó sao chép cây trạng thái từ "cũ" sang "mới". Không phải tất cả các nút trie đều được sao chép. Các phần tử có thể truy cập từ các gốc của các khối chọn lọc được sao chép. Sau khi sao chép, thư mục cũ sẽ bị xóa, do đó bạn chỉ còn lại trạng thái của các khối đã chọn.

Đọc các bài viết blog sau để biết thêm chi tiết kỹ thuật:
[Di chuyển trạng thái: Lưu trữ dữ liệu nút](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a),
[Di chuyển trạng thái Kaia: Cách hiệu quả để giảm dữ liệu blockchain](https://medium.com/klaytn/klaytn-state-migration-an-efficient-way-to-reduce-blockchain-data-6615a3b36523)

Để biết cách thực hiện Batch Pruning, vui lòng tham khảo [Hướng dẫn Di chuyển Trạng thái](../../misc/operation/node-pruning.md#how-to-perform-batch-pruning).

## Cắt tỉa cây sống theo quy định của nhà nước

Cắt tỉa cơ sở dữ liệu theo thời gian thực là giải pháp mới cho vấn đề kích thước cơ sở dữ liệu nhà nước ngày càng tăng. Khác với Batch Pruning (Di chuyển trạng thái), Live Pruning tự động xóa các trạng thái cũ dần dần khi quá trình xử lý nút bị chặn.

### Động lực

Các trạng thái khối (Block states) hoặc StateDB lưu trữ các tài khoản và hợp đồng trên chuỗi trong cấu trúc dữ liệu trie. Cấu trúc dữ liệu trie được thiết kế để lưu trữ cả các trạng thái đã lỗi thời và các trạng thái mới nhất, để chúng có thể được xác minh bằng cách sử dụng hàm băm Merkle. Khi các giao dịch thực hiện thay đổi trạng thái, cây trạng thái (state trie) sẽ phát triển vô hạn. Tính đến thời điểm viết bài (tháng 8 năm 2025), kích thước của nút lưu trữ chính Kaia Mainnet đã vượt quá 20TB và ngay cả nút đầy đủ cũng đã vượt quá 10TB.

Trước đây, Cơ quan Di trú Nhà nước đã giải quyết vấn đề này bằng cách xóa các trạng thái cũ bằng cách sao chép chọn lọc các trạng thái gần đây và xóa phần còn lại. Điều này có thể giảm kích thước của nút đầy đủ xuống dưới 5TB.

Tuy nhiên, chính sách di trú của Nhà nước cũng có những nhược điểm riêng. Nó gặp phải chi phí xử lý cao khi duyệt qua toàn bộ cây trạng thái, quá trình này có thể mất vài ngày. Ngoài ra, quá trình di chuyển dữ liệu cũng phải được kích hoạt thủ công. Để khắc phục những hạn chế này, kỹ thuật Live Pruning đã được giới thiệu.

### Khái niệm

Việc cắt tỉa cây trie là khó khăn vì không thể xác định chắc chắn liệu một nút trong cây trie có bị lỗi thời hay không. Trong cấu trúc trie ban đầu, một nút trie có thể là một phần của nhiều trie khác nhau, mỗi trie đại diện cho một khối khác nhau. Ngay cả khi một nút trie (ví dụ: số dư tài khoản) được cập nhật thành một giá trị khác, nút trie đó không thể bị xóa vì nó vẫn có thể được các nút cha khác sử dụng. Vấn đề này được gọi là vấn đề trùng lặp hash.

Quá trình cắt tỉa trực tiếp (Live Pruning) cố ý sao chép các nút trie có nội dung giống nhau. Trong chế độ Live Pruning, một nút trie không được tham chiếu bằng hash của nó, mà thay vào đó được tham chiếu bằng ExtHash của nó. ExtHash là hàm băm 32 byte của nội dung cộng với chỉ số seri 7 byte. Chỉ số chuỗi tăng đơn điệu, do đó mỗi nút trie là duy nhất.

```
Hash:    32-byte Keccak256
ExtHash: 32-byte Keccak256 + 7-byte Serial index
```

Như vậy, mỗi khi nội dung của một nút trie thay đổi, có thể an toàn để giả định rằng nút trie đó hiện đã lỗi thời. Hàm băm Merkle có thể được tính toán theo cách tương tự bằng cách bỏ qua chỉ số seri, giúp nó tương thích với các nút không thực hiện cắt tỉa trực tiếp (non-live-pruning nodes) về mặt đồng thuận.

Đọc bài viết blog này để biết thêm chi tiết kỹ thuật: [Quản lý hiệu quả dung lượng dữ liệu blockchain với StateDB Live Pruning](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91).

Để biết cách kích hoạt Live Pruning, hãy tham khảo [Hướng dẫn Live Pruning](../../misc/operation/node-pruning.md#how-to-perform-live-pruning).

## Nén dữ liệu

Nén dữ liệu giảm kích thước lưu trữ của dữ liệu khối bằng cách áp dụng thuật toán nén Snappy tích hợp sẵn của LevelDB cho các bảng cơ sở dữ liệu được chọn.

### Động lực

Dữ liệu khối—gồm tiêu đề, nội dung giao dịch và biên lai—thường chứa các chuỗi byte lặp lại cao do tiêu chuẩn mã hóa ABI trong các giao dịch EVM. Ví dụ, mã hóa ABI của Solidity sử dụng phương pháp thêm số 0 để đảm bảo sự căn chỉnh theo đơn vị 32 byte, dẫn đến dữ liệu gọi giao dịch có các chuỗi số 0 kéo dài. Phiếu giao dịch có các mẫu tương tự trong nhật ký sự kiện và giá trị trả về.

Mặc dù có sự dư thừa tự nhiên này, hệ thống lưu trữ LevelDB cơ bản của Kaia không sử dụng nén theo mặc định, khiến dữ liệu lặp lại chiếm dụng không gian đĩa một cách không cần thiết. Tính đến tháng 7 năm 2025, một nút chính Kaia Mainnet chiếm dụng hơn 4,2TB dung lượng lưu trữ, trong đó khoảng 3,6TB được quy cho dữ liệu khối chưa nén.

### Khái niệm

Kaia v2.1.0 kích hoạt thuật toán nén Snappy của LevelDB với việc áp dụng chọn lọc cho các bảng cơ sở dữ liệu. Tham số `--db.leveldb.compression` cho phép kiểm soát chi tiết:

- Đầu đề, nội dung và biên lai được nén (độ trùng lặp cao, tiết kiệm đáng kể)
- Dữ liệu trie của hệ thống được loại trừ (xuất hiện ngẫu nhiên, lợi ích nén tối thiểu)

Đối với các nút hiện có, việc kích hoạt thủ công quá trình nén cơ sở dữ liệu sẽ ghi đè dữ liệu cũ chưa được nén sang định dạng nén. Quy trình "quản lý hệ thống" này hợp nhất các bảng SSTable, đồng bộ hóa các thao tác xóa và áp dụng nén như một tác dụng phụ.

**Kết quả:** Các nút chính thức trên mạng chính (Mainnet) ghi nhận giảm khoảng 50% dung lượng lưu trữ tổng thể (~2TB tiết kiệm), với phần lớn lợi ích tập trung vào các bảng dữ liệu chính và bảng giao dịch. Quá trình này mất khoảng 10 giờ và có thể được thực hiện đồng thời với quá trình xử lý khối thông thường.

Đọc bài viết blog này để biết thêm chi tiết kỹ thuật: [Cách Kaia v2.1 thu hồi 2TB thông qua nén](https://blog.kaia.io/cutting-blockchain-storage-in-half/).

Để biết cách kích hoạt nén, hãy tham khảo hướng dẫn [Optimize Node Storage](../../misc/operation/optimize-storage.md#database-compression).

## Sơ đồ trạng thái FlatTrie (Th sperimental)

FlatTrie là một phương án lưu trữ trạng thái thử nghiệm giúp giảm đáng kể kích thước cơ sở dữ liệu trạng thái của các nút lưu trữ bằng cách tái cấu trúc cách lưu trữ trạng thái tài khoản lịch sử.

### Động lực

Các nút lưu trữ phải duy trì dữ liệu trạng thái lịch sử đầy đủ cho tất cả các tài khoản ở mọi độ cao khối, cho phép thực hiện các truy vấn ngược thời gian và phân tích blockchain toàn diện. Điều này tạo ra một cấu hình lưu trữ hoàn toàn khác biệt so với các nút đầy đủ: tính đến tháng 8 năm 2025, một nút lưu trữ Kaia Mainnet yêu cầu hơn 35TB dung lượng đĩa, trong đó 31TB (89%) được sử dụng bởi cơ sở dữ liệu trạng thái.

Cấu trúc Merkle Patricia Trie (MPT) truyền thống lưu trữ cả dữ liệu tài khoản (các nút lá) và các nút nhánh trung gian tạo thành cây Merkle. Các nút lưu trữ lịch sử đã duy trì các MPT hoàn chỉnh cho nhiều độ cao khối, dẫn đến việc các nút trung gian—không chứa dữ liệu tài khoản—tiếp tục tích lũy vô thời hạn.

Các tối ưu hóa lưu trữ hiện có như [State Migration](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a) (xóa theo lô) và [StateDB Live Pruning](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91) về cơ bản yêu cầu xóa dữ liệu lịch sử, khiến chúng không thể áp dụng cho các nút lưu trữ phải duy trì lịch sử đầy đủ.

### Khái niệm

FlatTrie là một phương án lưu trữ trạng thái thử nghiệm được phát triển từ [Erigon Ethereum client](https://github.com/erigontech/erigon/). Nó tái cấu trúc bộ nhớ trạng thái bằng cách:

- Lưu trữ trạng thái tài khoản lịch sử trong các bảng khóa-giá trị phẳng (mapping đơn giản giữa địa chỉ và dữ liệu tài khoản)
- Chỉ duy trì MPT hoàn chỉnh của khối mới nhất cùng với tất cả các nút nhánh trung gian.
- Tái tạo các gốc Merkle lịch sử theo yêu cầu bằng cách tạm thời xây dựng chỉ các nút nhánh cần thiết.

Phương pháp này loại bỏ việc lưu trữ lâu dài các nút trung gian lịch sử đồng thời duy trì lịch sử trạng thái tài khoản đầy đủ và khả năng xác minh các gốc Merkle cho bất kỳ khối nào.

**Thách thức trong việc thích ứng:** Việc triển khai của Erigon dựa trên cấu trúc tài khoản của Ethereum. Kaia sử dụng một phương thức mã hóa RLP khác để hỗ trợ các tính năng độc đáo như địa chỉ dễ đọc cho con người và nhiều loại khóa khác nhau. Việc tích hợp yêu cầu sửa đổi mô-đun băm Merkle của Erigon để xử lý các tài khoản như các chuỗi byte không thể đọc được, cùng với việc tạo ra ba lớp adapter (DomainsManager, WriteBuffer, DeferredContext) để kết nối giao diện Trie đa luồng của Kaia với yêu cầu cơ sở dữ liệu MDBX đơn luồng của Erigon.

**Kết quả:** Trong các thí nghiệm trên mạng thử nghiệm Kairos, các nút lưu trữ FlatTrie tiêu thụ khoảng 75% dung lượng lưu trữ tổng cộng ít hơn so với các nút lưu trữ truyền thống, với kích thước cơ sở dữ liệu trạng thái giảm hơn 80%. Dự kiến sẽ có mức tiết kiệm tương tự đối với các nút lưu trữ Mainnet (từ ~35TB xuống ~10TB).

**Hạn chế:** Phiên bản thử nghiệm v2.1.0 không hỗ trợ tính năng quay lại khối (API `debug_setHead`), tạo bằng chứng Merkle (API `eth_getProof`) hoặc tính năng cắt giảm trạng thái. Những hạn chế này xuất phát từ lựa chọn thiết kế của FlatTrie trong việc loại bỏ các nút nhánh lịch sử.

Đọc bài viết blog này để biết thêm chi tiết kỹ thuật: [Kaia’s Experimental FlatTrie for Archive Nodes](https://blog.kaia.io/flatten-the-state-shrink-the-disk/).

Để biết cách kích hoạt FlatTrie, hãy tham khảo hướng dẫn [Optimize Node Storage](../../misc/operation/optimize-storage.md#flattrie-state-scheme-experimental).
