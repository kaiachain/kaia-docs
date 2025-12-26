# Tối ưu hóa bộ nhớ nút

[Kaia v2.1.0](https://github.com/kaiachain/kaia/releases/tag/v2.1.0) giới thiệu hai tính năng tối ưu hóa lưu trữ bổ sung có thể giảm đáng kể yêu cầu về không gian đĩa:

- **Nén cơ sở dữ liệu**: Giảm dung lượng lưu trữ bằng cách nén dữ liệu khối lặp lại.
- **FlatTrie State Scheme**: Tính năng thử nghiệm giúp giảm đáng kể kích thước cơ sở dữ liệu trạng thái của các nút lưu trữ.

Hướng dẫn này giải thích cách áp dụng các tối ưu hóa này cho nút Kaia của bạn.

## Nén cơ sở dữ liệu

Nén cơ sở dữ liệu sử dụng thuật toán nén Snappy tích hợp sẵn trong LevelDB để giảm kích thước của tiêu đề khối, nội dung giao dịch và biên lai — những thành phần thường chứa dữ liệu lặp lại như việc thêm số 0 vào các giao dịch được mã hóa theo ABI.

**Tiết kiệm dự kiến:**

- Nút đầy đủ: Giảm khoảng 2TB (từ khoảng 4,2TB xuống còn khoảng 2TB trên Mainnet)

### Điều kiện tiên quyết

- Kaia phiên bản 2.1.0 hoặc cao hơn
- Đối với nén thủ công: Dung lượng đĩa trống đủ và khả năng xử lý I/O đĩa liên tục (xem phần **Tác động tài nguyên** bên dưới)

### Bật nén cho các cài đặt mới

Từ phiên bản v2.1.0 trở đi, tính năng nén được bật theo mặc định. Chỉ cần khởi động nút của bạn:

**Cài đặt gói:**

```bash
# Configure network in kend.conf
sudo vi /etc/kend/conf/kend.conf
# Set: NETWORK=mainnet or NETWORK=kairos

# Start node (compression enabled by default in v2.1.0+)
kend start

# Verify
kend status
tail -f /var/kend/logs/kend.out
```

Tất cả dữ liệu mới được ghi sẽ được nén tự động.

### Bật nén cho các nút hiện có

Nếu bạn đang nâng cấp từ phiên bản trước v2.1.0:

**Bước 1: Kiểm tra phiên bản của bạn**

```bash
ken version
```

**Bước 2: Đối với phiên bản v2.1.0 và các phiên bản sau đó**

Chức năng nén đã được kích hoạt theo mặc định. Dữ liệu mới được nén tự động. Bỏ qua Bước 4 để nén dữ liệu hiện có.

**Bước 3: Chỉ áp dụng cho các phiên bản trước v2.1.0**

Thêm cờ nén vào cấu hình của bạn:

**Cài đặt gói:**

```bash
sudo vi /etc/kend/conf/kend.conf
# Add to ADDITIONAL variable:
ADDITIONAL="--db.leveldb.compression 2"
```

Giá trị của cờ nén là:

- `0`: Không nén
- `1`: Nén hóa đơn
- `2`: Nén tiêu đề, nội dung và biên lai (được khuyến nghị)
- `3`: Nén tất cả các bảng bao gồm cây trạng thái (không được khuyến nghị)

:::note

Tùy chọn 2 được khuyến nghị vì dữ liệu cây trạng thái (state trie) không nén tốt (trông ngẫu nhiên), do đó tùy chọn 3 chỉ mang lại lợi ích bổ sung tối thiểu.

:::

Sau đó khởi động lại:

```bash
kend stop
kend start
```

**Bước 4: Nén dữ liệu hiện có (tùy chọn nhưng được khuyến nghị)**

Kích hoạt quá trình nén cơ sở dữ liệu thông qua RPC. Kết nối với bảng điều khiển nút của bạn:

```bash
ken attach --datadir /var/kend/data
```

Trong giao diện điều khiển, kích hoạt quá trình nén bằng cách sử dụng preset "allbutstate":

```javascript
> debug.chaindbCompact({ "preset": "allbutstate" })
null
```

**Các preset có sẵn:**

- `"default"`: Nén toàn bộ các thành phần cơ sở dữ liệu
- `"allbutstate"`: Nén chọn lọc loại trừ cây trạng thái (được khuyến nghị cho nén)
- `"custom"`: Định nghĩa các khoảng tùy chỉnh cho các bảng cơ sở dữ liệu cụ thể.

Quá trình nén diễn ra ở chế độ nền. Theo dõi tiến trình trong nhật ký nút của bạn:

```bash
tail -f /var/kend/logs/kend.out | grep -i Compact
```

Bạn nên thấy các mục nhật ký như sau:

```
INFO[07/25,12:50:17 Z] [3] Compacting database started               range=0x48-0x49
INFO[07/25,12:55:17 Z] [3] Compacting database completed             range=0x48-0x49 elapsed=5m0.085s
```

Nút sẽ tiếp tục xử lý các khối trong quá trình nén.

**Thời gian dự kiến:** Khoảng 10 giờ cho một nút chính (Mainnet) đầy đủ (trên SSD với khoảng 4TB dữ liệu). Thời gian thực hiện có thể thay đổi tùy thuộc vào phần cứng và kích thước dữ liệu.

**Tác động đến tài nguyên:**

- Tốc độ I/O đĩa cao (đỉnh >400 MiB/s đọc, >300 MiB/s ghi)
- Tốc độ IOPS cao (thường >2000 thao tác/giây)
- Nút vẫn hoạt động bình thường và tiếp tục đồng bộ hóa các khối.

:::note

Trong khi nút vẫn hoạt động trong quá trình nén, hiệu suất truy vấn có thể bị ảnh hưởng trong các khoảng thời gian đỉnh điểm I/O. Đối với các nút RPC sản xuất, hãy lên lịch nén dữ liệu trong các khung thời gian bảo trì hoặc các khoảng thời gian có lưu lượng truy cập thấp.

:::

### Sử dụng bản sao lưu dữ liệu chuỗi đã nén sẵn (TBD)

Các bản sao lưu dữ liệu chuỗi đã được nén trước đây dự kiến sẽ được cung cấp trong các bản phát hành tương lai nhưng hiện tại chưa có sẵn. Khi có sẵn, chúng sẽ được liệt kê trên trang [Chaindata Snapshot](https://docs.kaia.io/misc/operation/chaindata-snapshot/).

Hiện tại, bạn phải:

- Bật tính năng nén trên cài đặt mới v2.1.0+ (tự động cho dữ liệu mới)
- Thực hiện nén thủ công trên các nút hiện có (xem phần trên)

Kiểm tra trang snapshot định kỳ để cập nhật thông tin về tính khả dụng của snapshot nén.

### Kiểm tra xem tính năng nén đã được kích hoạt chưa.

Kiểm tra nhật ký khởi động của nút để xem cấu hình nén:

```bash
grep "compressionType" /var/kend/logs/kend.out
```

Tìm các mục nhật ký hiển thị `compressionType=snappy` cho các bảng không sử dụng cây trạng thái (non-state-trie tables).

### Theo dõi và Khắc phục sự cố

**Kiểm tra giảm sử dụng đĩa:**

```bash
du -h --max-depth=1 /var/kend/data/klay/chaindata
```

So sánh trước và sau khi nén. Bạn sẽ thấy sự giảm đáng kể dung lượng lưu trữ trong các thư mục chứa các khối dữ liệu và biên lai.

**Vấn đề thường gặp:**

1. **Quá trình nén thất bại**: Đảm bảo có đủ dung lượng đĩa. Quá trình nén tạm thời yêu cầu thêm không gian để ghi đè dữ liệu.
2. **FlatTrie không khởi động được**: FlatTrie yêu cầu cơ sở dữ liệu trống. Nếu bạn gặp lỗi liên quan đến dữ liệu hiện có, hãy xóa thư mục chaindata và đồng bộ hóa từ genesis.
3. **Lỗi API Merkle proof**: FlatTrie không hỗ trợ `eth_getProof`. Sử dụng nút truyền thống nếu API này được yêu cầu.

## Sơ đồ trạng thái FlatTrie (Th sperimental)

FlatTrie là một phương án lưu trữ trạng thái thử nghiệm được phát triển từ client Ethereum Erigon. Nó lưu trữ trạng thái tài khoản trong một cấu trúc phẳng và chỉ duy trì cây Merkle Patricia Trie (MPT) hoàn chỉnh của khối mới nhất, tái tạo các cây lịch sử theo yêu cầu.

**Tiết kiệm dự kiến:**

- Tổng dung lượng lưu trữ: Giảm khoảng 75% (dự đoán dựa trên kết quả từ mạng thử nghiệm Kairos)
- Mạng thử nghiệm Kairos: 4,3TB → 1TB
- Mainnet: ~35TB → ~10TB (ước tính dựa trên tỷ lệ giảm tương ứng)

:::warning

FlatTrie là một tính năng thử nghiệm trong phiên bản v2.1.0. Không nên sử dụng cho mục đích sản xuất. Dự kiến sẽ có các vấn đề về tính ổn định, điểm nghẽn hiệu suất và các thay đổi gây ảnh hưởng đến tương thích trong các bản phát hành tương lai. Chỉ sử dụng cho môi trường thử nghiệm và phát triển.

:::

### Điều kiện tiên quyết

- Kaia phiên bản 2.1.0 hoặc cao hơn
- **Phải đồng bộ hóa từ bản gốc** (không thể chuyển đổi cơ sở dữ liệu hiện có)
- Thư mục dữ liệu trống

### Hạn chế hiện tại

Trước khi kích hoạt FlatTrie, hãy hiểu rõ các hạn chế sau:

**Các tính năng không được hỗ trợ:**

- Cắt tỉa theo lô và cắt tỉa trực tiếp
- Quay lại khối (cờ `--start-block-number` và API `debug_setHead`)
- Tạo bằng chứng Merkle (API `eth_getProof`)

**Sự không tương thích:**

- Không thể di chuyển từ cơ sở dữ liệu hiện có (phải bắt đầu từ đầu)
- Không thể chuyển đổi giữa chế độ FlatTrie và chế độ không phải FlatTrie.
- Các cơ sở dữ liệu có và không có FlatTrie là không tương thích.

### Bật FlatTrie

**Bước 1: Chuẩn bị thư mục dữ liệu trống**

```bash
# Ensure clean data directory
sudo rm -rf /var/kend/data
sudo mkdir -p /var/kend/data
```

Bước 2: Khởi động nút với cờ FlatTrie và đồng bộ hóa từ khối genesis.

```bash
# Mainnet
ken --state.experimental-flat-trie

# Kairos testnet
ken --state.experimental-flat-trie --kairos
```

:::note

Khi FlatTrie được kích hoạt, chế độ lưu trữ sẽ được kích hoạt tự động mà không phụ thuộc vào các tùy chọn `--gcmode` và `--state.block-interval`. Các cờ này sẽ bị bỏ qua khi sử dụng FlatTrie.

:::

Bước 3: Chờ đồng bộ hóa hoàn tất

Nút sẽ đồng bộ hóa tất cả các khối từ khối genesis. Quá trình này có thể mất vài tuần tùy thuộc vào phần cứng và mạng của bạn.

### Kiểm tra xem FlatTrie có đang hoạt động không.

Kiểm tra nhật ký khởi động của nút để xác nhận chế độ FlatTrie:

```bash
grep -i "flat" /var/kend/logs/kend.out | head -20
```

Bạn nên thấy các dấu hiệu cho thấy cây trie phẳng thử nghiệm đang hoạt động.

### Theo dõi hiệu suất của FlatTrie

FlatTrie sử dụng các cấu hình tài nguyên khác nhau so với bộ nhớ trạng thái truyền thống:

**Đặc điểm dự kiến:**

- Giảm sử dụng CPU
- Sử dụng bộ nhớ cao hơn (~30GB)
- Số lượng goroutine cao hơn (~900-1000)
- Thời gian hoàn tất khối chậm hơn

Theo dõi các chỉ số này thông qua điểm cuối chỉ số Prometheus của nút hoặc bảng điều khiển Grafana.

### Khắc phục sự cố FlatTrie

**Không thể khởi động FlatTrie trên cơ sở dữ liệu hiện có:**
Nếu bạn gặp lỗi cho biết không thể kích hoạt FlatTrie trên dữ liệu không trống, bạn phải bắt đầu từ genesis. Xóa thư mục chaindata của bạn và thực hiện đồng bộ hóa đầy đủ với tùy chọn `--state.experimental-flat-trie`.

**Lỗi API chứng minh Merkle:**
FlatTrie không hỗ trợ `eth_getProof` và các API chứng minh Merkle liên quan. Nếu ứng dụng của bạn yêu cầu các API này, hãy sử dụng một nút truyền thống thay thế.

**Sử dụng bộ nhớ cao:**
Sử dụng bộ nhớ khoảng 30GB là điều mong đợi cho các nút FlatTrie trong quá trình đồng bộ hóa. Đảm bảo hệ thống của bạn có đủ RAM. Đội ngũ đang tiến hành tối ưu hóa để giảm thiểu điều này trong các phiên bản tương lai.

**Tốc độ đồng bộ chậm:**
Tốc độ đồng bộ ban đầu với FlatTrie tương đương với các nút truyền thống. Nếu quá trình đồng bộ hóa chậm đáng kể, hãy kiểm tra:

- Hiệu suất I/O ổ đĩa (SSD được khuyến nghị mạnh mẽ)
- Băng thông mạng
- Tỷ lệ sử dụng CPU

## Các phương pháp tốt nhất

1. **Luôn sao lưu trước khi thực hiện các thay đổi lớn**: Đặc biệt là trước khi thực hiện nén thủ công.
2. **Theo dõi dung lượng đĩa**: Đảm bảo bạn có đủ dung lượng trống trước khi nén. Quá trình nén tạm thời yêu cầu thêm không gian để ghi đè các tệp cơ sở dữ liệu.
3. **Nén lịch trình trong các khung giờ ít lưu lượng**: Nếu đang chạy các điểm cuối RPC công khai.
4. **Sử dụng SSD cho các nút sản xuất**: Cả nén và FlatTrie đều được hưởng lợi từ thao tác I/O ngẫu nhiên nhanh.
5. **Kế hoạch cho các tính năng thử nghiệm**: FlatTrie là tính năng thử nghiệm trong phiên bản v2.1.x. Kiểm tra kỹ lưỡng trước khi đưa vào sử dụng chính thức.
6. **Cập nhật thường xuyên**: Kiểm tra ghi chú phát hành để biết các tối ưu hóa trong tương lai và thời điểm FlatTrie chính thức ra khỏi giai đoạn thử nghiệm.