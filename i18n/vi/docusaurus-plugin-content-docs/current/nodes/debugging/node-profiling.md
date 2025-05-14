# Dữ liệu nút hồ sơ

Phân tích cấu hình là một công cụ thiết yếu để hiểu và tối ưu hóa hiệu suất của các nút Kaia. Hướng dẫn này sẽ hướng dẫn bạn sử dụng nhiều kỹ thuật lập hồ sơ khác nhau dành cho người vận hành nút Kaia, tận dụng API gỡ lỗi của Kaia và gói Go `net/http/pprof`.

## Điều kiện tiên quyết

Trước khi bắt đầu, hãy đảm bảo rằng:

- **Thiết lập nút:** Nút Kaia của bạn đã được cài đặt và chạy đúng cách.

- **Truy cập vào Bảng điều khiển nút:** Bạn sẽ cần tương tác với nút thông qua [bảng điều khiển nút](../endpoint-node/ken-cli-commands.md#javascript-console).

- **Công cụ:** Go được cài đặt trên hệ thống của bạn để sử dụng `go tool pprof` và `go tool trace`. Bạn có thể xác minh bằng cách chạy:

```bash
go version
```

## 1\. Quản lý hồ sơ: Cách bắt đầu, dừng và kiểm tra trạng thái

Các nút Kaia cung cấp API `debug` cung cấp một số phương pháp lập hồ sơ. Bạn có thể tương tác với các phương thức này thông qua bảng điều khiển của nút hoặc thông qua [các cuộc gọi API JSON-RPC](https://docs.kaia.io/references/json-rpc/debug/start-p-prof/).

### 1.1 Khởi động máy chủ HTTP pprof

Máy chủ HTTP pprof cho phép bạn thu thập và phân tích dữ liệu lập hồ sơ một cách hiệu quả.

```bash
# Start pprof server with default settings (localhost:6060)
> debug.startPProf()

# Start pprof server on a specific address and port
> debug.startPProf("localhost", 8080)
```

#### Truy cập Điểm cuối pprof

Sau khi máy chủ pprof đang chạy, hãy truy cập dữ liệu lập hồ sơ tại:

- [http://localhost:6060/debug/pprof/](http://localhost:6060/debug/pprof/) — Tổng quan về các cấu hình có sẵn.
- [http://localhost:6060/memsize/](http://localhost:6060/memsize/) — Báo cáo kích thước bộ nhớ.
- [http://localhost:6060/debug/vars](http://localhost:6060/debug/vars) — Công cụ xuất dữ liệu cho Prometheus.

### 1.2 Dừng máy chủ HTTP pprof

```bash
> debug.stopPProf()
```

### 1.3 Kiểm tra xem pprof có đang chạy không

```bash
> debug.isPProfRunning()
true  # if running
false # if not running
```

## 2\. Thu thập hồ sơ

Khi máy chủ pprof đang chạy, bạn có thể thu thập nhiều cấu hình khác nhau bằng cách sử dụng một số phương pháp để phân tích hiệu suất của nút.

### 2.1 Thu thập bằng giao diện web

Nhập các điểm cuối tương ứng vào trình duyệt web của bạn để thu thập các hồ sơ khác nhau như được hiển thị trong các ví dụ sau:

**Thu thập hồ sơ đống**

`http://localhost:6060/debug/pprof/heap`

**Thu thập hồ sơ CPU 30 giây**

`http://localhost:6060/debug/pprof/profile?seconds=30`

**Thu thập hồ sơ goroutine với debug=2**

`http://localhost:6060/debug/pprof/goroutine?debug=2`

### 2.2 Thu thập bằng cách sử dụng lệnh gọi API

Nhập các lệnh tương ứng vào bảng điều khiển nút để thu thập hoặc cấu hình các cấu hình như được hiển thị trong các ví dụ sau:

```bash
# Collect 30-second CPU profile
> debug.cpuProfile("cpu.profile", 30)

# Collect 30-second block profile
> debug.blockProfile("block.profile", 30)

# Set mutex profiling fraction
> debug.setMutexProfileFraction(1)
```

### 2.3 Thu thập Sử dụng `go tool pprof`

Nếu bạn không thể truy cập giao diện web pprof, bạn có thể tạo và phân tích kết quả phân tích cục bộ bằng cách sử dụng `go tool pprof`.

#### Xác định các loại hồ sơ có sẵn

Các cấu hình được hỗ trợ bao gồm:

- `allocs`: Mẫu của tất cả các lần phân bổ bộ nhớ trước đây.
- `block`: Dấu vết ngăn xếp dẫn đến việc chặn các nguyên hàm đồng bộ hóa.
- `goroutine`: Dấu vết ngăn xếp của tất cả các goroutine hiện tại. Sử dụng `debug=2` làm tham số truy vấn để xuất theo cùng định dạng với bản panic chưa được khôi phục.
- `heap`: Một mẫu phân bổ bộ nhớ của các đối tượng trực tiếp. Bạn có thể chỉ định tham số GET `gc` để chạy thu gom rác trước khi lấy mẫu heap.
- `mutex`: Dấu vết ngăn xếp của những người nắm giữ mutex đang tranh chấp.
- `profile`: Hồ sơ CPU. Bạn có thể chỉ định thời lượng trong tham số GET `giây`. Sau khi nhận được tệp hồ sơ, hãy sử dụng lệnh `go tool pprof` để điều tra hồ sơ.
- `threadcreate`: Dấu vết ngăn xếp dẫn đến việc tạo ra các luồng hệ điều hành mới.
- `trace`: Dấu vết thực thi của chương trình hiện tại. Bạn có thể chỉ định thời lượng trong tham số GET `giây`. Sau khi bạn nhận được tệp theo dõi, hãy sử dụng lệnh `go tool trace` để điều tra theo dõi.

#### Thu thập hồ sơ bằng cách sử dụng `go tool pprof`

```bash
go tool pprof http://localhost:6060/debug/pprof/<profiletype>
```

Thay thế `<profiletype>` bằng một trong các cấu hình được hỗ trợ được liệt kê ở trên (ví dụ: `heap`, `profile`).

#### Các lệnh ví dụ

```bash
# Collect heap profile
go tool pprof http://localhost:6060/debug/pprof/heap

# Collect 30-second CPU profile
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# Collect goroutine profile with debug=2
go tool pprof http://localhost:6060/debug/pprof/goroutine?debug=2
```

#### Tạo tệp hồ sơ văn bản

Để tạo báo cáo phân tích dựa trên văn bản, hãy sử dụng tùy chọn `-text` với `go tool pprof`.

```bash
# Generate text-based CPU profile
go tool pprof -text cpu.profile
```

#### Tùy chọn bổ sung pprof

Có thể tùy chỉnh thêm quá trình lập hồ sơ bằng cách sử dụng các tùy chọn và tham số truy vấn bổ sung khi thu thập hồ sơ.

- **Định dạng phản hồi (`debug=N`):**

  - **Định dạng nhị phân (Mặc định):** `N = 0`
  - **Định dạng văn bản thuần túy:** `N > 0`

  **Ví dụ:**

```bash
go tool pprof http://localhost:6060/debug/pprof/allocs?debug=1
```

- **Thu gom rác (`gc=N`):**

  - **Chạy GC trước khi lập hồ sơ:** Đặt `gc=1` để kích hoạt chu trình thu gom rác trước khi ghi lại hồ sơ heap.

  **Ví dụ:**

```bash
go tool pprof http://localhost:6060/debug/pprof/heap?gc=1
```

- **Tham số thời lượng (`giây=N`):**

  - **Cấu hình phân bổ, khối, Goroutine, Heap, Mutex, Threadcreate:**

    - `seconds=N` trả về cấu hình delta dựa trên khoảng thời gian đã cho.

  - **Hồ sơ CPU và Hồ sơ theo dõi:**

    - `giây=N` chỉ định khoảng thời gian mà hồ sơ CPU hoặc theo dõi sẽ chạy.

  **Ví dụ:**

```bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
```

### 2.4 Thu thập mà không cần cài đặt Go

Nếu chương trình của bạn chưa cài đặt Go (bạn có thể kiểm tra bằng cách chạy `go version`), hãy làm theo các bước sau để tải xuống và lưu dữ liệu lập hồ sơ cục bộ:

1. Tải xuống tệp hồ sơ bằng `wget`.

```bash
wget -O memory_profile http://localhost:6060/debug/pprof/heap
```

2. Chuyển tệp hồ sơ đến máy cục bộ của bạn bằng cách sử dụng `scp`.

```bash
scp <user>@<node_ip>:memory_profile memory_profile
```

LƯU Ý: Thay thế `<user>` bằng tên người dùng SSH của bạn và `<node_ip>` bằng địa chỉ IP của nút Kaia.

## 3\. Hồ sơ bộ nhớ

Như đã đề cập trước đó, hồ sơ bộ nhớ đề cập đến thông tin heap được cung cấp bởi go pprof. Nó cũng có thể được thu thập thông qua writeMemProfile trong không gian tên gỡ lỗi được cung cấp bởi nút Kaia.

```bash
# Using go tool pprof
> go tool pprof http://localhost:6060/debug/pprof/heap
# Using Node Console
> debug.writeMemProfile("mem.profile")
```

Việc phân tích bộ nhớ rất quan trọng để phân tích các vấn đề liên quan đến bộ nhớ, chẳng hạn như rò rỉ bộ nhớ. Để kiểm soát mức độ chi tiết của hồ sơ bộ nhớ, việc điều chỉnh biến `MemProfileRate` có thể hữu ích trong quá trình này. Bạn nên thiết lập giá trị này càng sớm càng tốt khi thực thi nút (ví dụ: khi bắt đầu hàm `main`).

:::note

Kaia cung cấp cờ `--memprofilerate` có thể thiết lập biến `MemProfileRate` một cách dễ dàng. Do đó, vì nó chỉ khả dụng dưới dạng cờ nên phải thiết lập khi khởi động nút và không thể thay đổi thông qua lệnh gọi API.

:::

```bash
var MemProfileRate int = 512 * 1024
```

- **Đặt `MemProfileRate`:**
  - **Phân bổ tối đa cho hồ sơ:** Đặt thành `1`.
  - **Tắt tính năng tạo hồ sơ:** Đặt thành `0`.
  - **Cài đặt mặc định:** `512 * 1024` (tạo hồ sơ khoảng một lần phân bổ cho mỗi 512KB).

**Sự va chạm:**

- **Tỷ lệ lập hồ sơ cao hơn (`MemProfileRate` thấp hơn):** Tăng mức độ chi tiết nhưng có thể gây tăng hiệu suất.
- **Tỷ lệ lập hồ sơ thấp hơn (`MemProfileRate` cao hơn):** Giảm chi tiết lập hồ sơ, giảm thiểu tác động đến hiệu suất.

**Thực hành tốt nhất:**

- **Tính nhất quán:** Đảm bảo rằng `MemProfileRate` vẫn không đổi trong suốt thời gian chạy của nút để duy trì dữ liệu lập hồ sơ chính xác.
- **Cấu hình ban đầu:** Đặt `MemProfileRate` ngay khi bắt đầu chương trình để nắm bắt thông tin lập hồ sơ nhất quán

## 4\. Phân tích hồ sơ

Sau khi thu thập dữ liệu hồ sơ, hãy sử dụng `go tool pprof` để phân tích và trực quan hóa các tệp hồ sơ đã lưu.

### 4.1 Phân tích sử dụng giao diện web

Ví dụ, bạn có thể phân tích dữ liệu hồ sơ bộ nhớ một cách trực quan bằng công cụ pprof của Go, công cụ này cung cấp biểu diễn trực quan về mức sử dụng bộ nhớ thông qua giao diện web như minh họa bên dưới:

```bash
go tool pprof -http=0.0.0.0:8081 cpu.profile
```

### 4.2 Phân tích bằng dòng lệnh

Bạn cũng có thể phân tích dữ liệu hồ sơ bộ nhớ bằng công cụ pprof của Go trong giao diện dạng văn bản trong thiết bị đầu cuối:

```bash
go tool pprof cpu.profile
```

- **Các lệnh `pprof` phổ biến:**

  - `top`: Hiển thị các hàm tiêu thụ nhiều tài nguyên nhất.
  - `list <function_name>`: Hiển thị mã nguồn có chú thích cho một hàm cụ thể.
  - `web`: Tạo hình ảnh trực quan về hồ sơ trong trình duyệt web của bạn.
  - `pdf`: Tạo báo cáo PDF về hồ sơ.

- **Ví dụ sử dụng:**

```bash
go tool pprof cpu.profile
# Inside the pprof interactive shell:
> top
> list main.functionName
> web
```

:::note

Đảm bảo bạn đã cài đặt Graphviz cho lệnh `web` và `pdf` để tạo biểu đồ trực quan.

:::

## 5\. Phần kết luận

Bằng cách làm theo hướng dẫn lập hồ sơ này, người vận hành nút Kaia có thể xác định và giải quyết hiệu quả các điểm nghẽn về hiệu suất, tối ưu hóa việc sử dụng tài nguyên và đảm bảo các nút của họ hoạt động trơn tru và hiệu quả. Việc lập hồ sơ thường xuyên, kết hợp với các hoạt động giám sát và ghi nhật ký mạnh mẽ sẽ góp phần đáng kể vào việc duy trì độ tin cậy và hiệu suất của nút Kaia của bạn trong mạng blockchain.
