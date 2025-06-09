# Cấu hình giám sát nút

Hướng dẫn này giải thích cách thiết lập Prometheus và Grafana để giám sát nút Kaia của bạn.

## 1\. Cấu hình số liệu trong Kaia

Kaia cung cấp các cờ sau để xuất số liệu:

- `--metric`: Cho phép ghi số liệu. Cờ này thường được sử dụng kết hợp với cờ `--prometheus`.
- `--prometheus`: Cho phép xuất số liệu đã ghi lại sang máy chủ Prometheus. Cờ này thường được sử dụng kết hợp với cờ `--metric`.
- `--prometheusport`: Chỉ định cổng cho số liệu của Prometheus. Mặc định là `61001`.

Để bật số liệu và xuất Prometheus, hãy đặt cả `METRICS` và `PROMETHEUS` thành `1` trong tệp `.conf` của bạn:

```conf
METRICS=1
PROMETHEUS=1
```

## 2\. Thiết lập Prometheus

[Prometheus](https://prometheus.io/) hoạt động như hệ thống trung tâm để giám sát, cung cấp khả năng khai thác dữ liệu mạnh mẽ để trích xuất dữ liệu thời gian thực từ các nút của bạn và lưu trữ dữ liệu đó.

:::note[Prometheus Yêu cầu về phần cứng]

Trước khi thiết lập Prometheus, hãy đảm bảo hệ thống của bạn đáp ứng các yêu cầu về phần cứng sau:

- **Bộ xử lý:** Ít nhất 2 CPU
- **Bộ nhớ:** Tối thiểu 4 GB RAM
- **Lưu trữ:** Ít nhất 20 GB dung lượng đĩa trống

:::

### 2.1 Cài đặt Prometheus

Các bước sau đây phác thảo quy trình cài đặt thủ công cho Prometheus. Chọn hệ điều hành của bạn để biết hướng dẫn cụ thể. Để biết thêm thông tin về cài đặt Prometheus, hãy tham khảo [tài liệu chính thức của Prometheus](https://prometheus.io/docs/prometheus/latest/getting_started/).

1. Tải xuống bản phát hành Prometheus mới nhất phù hợp với kiến trúc của bạn (ví dụ: darwin-amd64) từ trang tải xuống Prometheus chính thức. Hướng dẫn này sử dụng phiên bản 2.53.3 làm ví dụ.

```bash
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.darwin-arm64.tar.gz
```

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.linux-amd64.tar.gz
```

2. Giải nén tệp đã tải xuống và cài đặt các tệp nhị phân bằng cách di chuyển chúng đến `/usr/local/bin/`:

```bash
tar xvfz prometheus-2.53.3.darwin-arm64.tar.gz
mv prometheus-2.53.3.darwin-arm64/prometheus /usr/local/bin/
mv prometheus-2.53.3.darwin-arm64/promtool /usr/local/bin/
```

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.linux-amd64.tar.gz
tar xvfz prometheus-2.53.3.linux-amd64.tar.gz
mv prometheus-2.53.3.linux-amd64/prometheus /usr/local/bin/
mv prometheus-2.53.3.linux-amd64/promtool /usr/local/bin/
```

3. Xóa tệp đã tải xuống và thư mục đã giải nén:

```bash
rm -rf prometheus-2.53.3.darwin-arm64.tar.gz prometheus-2.53.3.darwin-amd64
```

```bash
rm -rf prometheus-2.43.0.linux-amd64.tar.gz prometheus-2.43.0.linux-amd64
```

4. Thêm Prometheus vào biến môi trường `PATH` để truy cập Prometheus từ bất kỳ phiên thiết bị đầu cuối nào.

```bash
echo "export PATH=\"\$HOME/monitoring/prometheus:\$PATH\"" >> ~/.bashrc
source ~/.bashrc
# This assumes that a prometheus directory already exists in the HOME directory. If not, make a new one (mkdir -p  $HOME/monitoring/prometheus).
```

### 2.2 Cấu hình Prometheus

Prometheus cần được cấu hình để thu thập số liệu từ các nút Kaia của bạn.

:::info[Prometheus Cấu hình\]

Tệp `prometheus.yml` cấu hình Prometheus.  Các phần chính là:

- **`global`**: Đặt các tham số cấu hình toàn cục như `evaluation_interval` (tần suất Prometheus đánh giá các quy tắc) và `scrape_interval` (tần suất Prometheus thu thập dữ liệu mục tiêu).  15 giây là thời gian khởi đầu hợp lý cho cả hai, nhưng hãy điều chỉnh dựa trên nhu cầu và thời gian chặn của bạn.

- **`scrape_configs`**: Xác định các mục tiêu mà Prometheus giám sát.  `job_name` xác định nhóm mục tiêu.  `static_configs` liệt kê các địa chỉ mục tiêu.  Thay thế `<ip>` bằng địa chỉ IP của nút Kaia và đảm bảo cổng (`61001` theo mặc định) được cấu hình chính xác.

Để biết cấu hình nâng cao hơn, hãy tham khảo [Tài liệu Prometheus](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).

:::

1. Mở tệp `prometheus.yml` nằm tại `prometheus/prometheus.yml` trong trình soạn thảo văn bản.

2. Đảm bảo phần `scrape_configs` bao gồm các nút Kaia của bạn. Dưới đây là một ví dụ về cấu hình:

```yaml
global:
  evaluation_interval: 15s
  scrape_interval: 15s

scrape_configs:
- job_name: klaytn
  static_configs:
  - targets:  #Replace `192.168.1.100` and `192.168.1.101` with the actual IP addresses of your Kaia nodes.
      - "192.168.1.100:61001"
      - "192.168.1.101:61001"
      ...
```

3. Sử dụng `promtool` để kiểm tra xem tệp cấu hình có lỗi cú pháp nào không:

```bash
promtool check config prometheus/prometheus.yml
```

4. Khởi động Prometheus bằng tệp cấu hình của bạn.

```bash
prometheus --config.file=prometheus/prometheus.yml
```

### 2.3 Thiết lập Prometheus bằng Macro Script (macOS)

Tập lệnh này tự động hóa quá trình cài đặt và cấu hình Prometheus trên macOS. Có thể điều chỉnh cho các phiên bản Prometheus và hệ điều hành khác nếu cần.

```sh
rm -rf prometheus

echo "Installing Prometheus..."
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.43.0/prometheus-2.43.0.darwin-arm64.tar.gz
tar xvfz prometheus-2.43.0.darwin-arm64.tar.gz > /dev/null 2>&1 && mv prometheus-2.43.0.darwin-arm64 prometheus && rm -rf prometheus-2.43.0.darwin-arm64 && rm -rf prometheus-2.43.0.darwin-arm64.tar.gz
echo "export PATH=\"$HOMEDIR/monitoring/prometheus:\$PATH\"" >> ~/.bashrc && source ~/.bashrc

# Generate Prometheus config file (prometheus.yml)
printf "%s\n" "global:" \
              "  evaluation_interval: 15s" \
              "  scrape_interval: 15s" \
              "" \
              "scrape_configs:" \
              "- job_name: klaytn" \
              "  static_configs:" \
              "  - targets:" > prometheus/prometheus.yml

# Append target configurations for multiple nodes
for (( i=0; i<NUMOFNODE; i++ ))
do
  # Replace <ip> and <port> with the actual IP address and port (61001) for each node
  printf "    - \"<ip>:%d\"\n" <port> >> prometheus/prometheus.yml
done
```

## 3\. Thiết lập Grafana

Grafana cho phép bạn trực quan hóa các số liệu được Prometheus thu thập thông qua bảng điều khiển có thể tùy chỉnh.

:::note[Grafana Yêu cầu hệ thống]

Trước khi thiết lập Grafana, hãy đảm bảo hệ thống của bạn đáp ứng các yêu cầu tối thiểu về phần cứng và phần mềm từ [tài liệu chính thức của Grafana](https://grafana.com/docs/grafana/latest/setup-grafana/installation/).

:::

### 3.1 Cài đặt Grafana

Tải xuống và cài đặt Grafana bằng phương pháp phù hợp với hệ điều hành của bạn. Ví dụ, bạn có thể cài đặt Grafana [trên macOS bằng Hombrew](https://grafana.com/docs/grafana/latest/setup-grafana/installation/mac/) (`brew install grafana`). Xem [hướng dẫn cài đặt Grafana chính thức](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) để biết hướng dẫn chi tiết.

### 3.2 Cấu hình Grafana

Thiết lập Grafana để trực quan hóa các số liệu được Prometheus thu thập.

1. Khởi động Grafana Server.

```bash
# macOS using Homebrew
brew services start grafana
```

Đối với các hệ điều hành khác, hãy tham khảo [tài liệu chính thức của Grafana](https://grafana.com/docs/grafana/latest/setup-grafana/start-restart-grafana/).

2. Mở trình duyệt web và điều hướng đến `http://localhost:3000`. Đăng nhập bằng thông tin đăng nhập mặc định (admin/admin).

3. Thêm Prometheus làm Nguồn dữ liệu.

  - Điều hướng đến **Cấu hình** -> **Nguồn dữ liệu**.
  - Nhấp vào **Thêm nguồn dữ liệu**.
  - Chọn **Prometheus** làm loại.
  - Đặt **URL** thành `http://localhost:9090` (sửa đổi nếu Prometheus nằm trên một máy chủ khác).
  - Nhấp vào **Lưu & Kiểm tra** để xác minh kết nối.

4. Thêm bảng điều khiển Kaia và thêm bảng điều khiển để trực quan hóa số khối Kaia.
  - [Tạo bảng điều khiển mới](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/) hoặc điều hướng đến bảng điều khiển hiện có.
  - Nhấp vào **Chỉnh sửa** ở góc trên bên phải, nhấp vào **Thêm** trong tiêu đề bảng điều khiển và chọn **Hình ảnh hóa** trong danh sách thả xuống để thêm bảng điều khiển.
  - Trong **Truy vấn**:
    1. Chọn Prometheus của bạn làm **Nguồn dữ liệu**.
    2. Nhập `klaytn_blockchain_head_blocknumber` vào trường **Số liệu**.
    3. Trong **Tùy chọn**, chọn **Tùy chỉnh** từ danh sách thả xuống **Chú giải** và nhập `{{instance}}` làm định dạng chú giải tùy chỉnh.
  - Nhấp vào **Áp dụng** để lưu bảng điều khiển vào bảng thông tin của bạn.

:::note[Additional Bảng điều khiển Kaia]

Để biết bảng thông tin được cấu hình sẵn hoàn chỉnh và thiết lập cung cấp tự động, hãy tham khảo [kho lưu trữ kaiaspray](https://github.com/kaiachain/kaiaspray/tree/main/roles/monitor-init/files/grafana/dashboards). Kho lưu trữ này chứa các tệp JSON cho bảng thông tin được xây dựng sẵn và các tệp cấu hình để cung cấp nguồn dữ liệu.

:::

### 3.3 Thiết lập Grafana bằng Macro Script (macOS)

Tập lệnh này tự động hóa quá trình cài đặt Grafana trên macOS. Có thể điều chỉnh cho các phiên bản Grafana và hệ điều hành khác nếu cần.

```sh
# Remove any existing Grafana installation
rm -rf grafana

# Install Grafana
echo "Installing Grafana..."
curl -O https://dl.grafana.com/enterprise/release/grafana-enterprise-8.4.5.darwin-arm64.tar.gz
tar -zxvf grafana-enterprise-8.4.5.darwin-arm64.tar.gz > /dev/null 2>&1 && mv grafana-8.4.5 grafana && rm -rf grafana-enterprise-8.4.5.darwin-arm64.tar.gz
echo "export PATH=\"$HOMEDIR/monitoring/grafana/bin:\$PATH\"" >> ~/.bashrc && source ~/.bashrc

# Generate Grafana dashboard config file
printf "%s\n" "apiVersion: 1" \
              "providers:" \
              "- name: 'klaytn'" \
              "  folder: ''" \
              "  options:" \
              "    path: conf/provisioning/dashboards" > grafana/conf/provisioning/dashboards/klaytn-dashboard.yml

# Generate Grafana datasource config file
printf "%s\n" "datasources:" \
              "-  is_default: true " \
              "   name: 'klaytn'" \
              "   type: 'prometheus'" \
              "   url: 'http://localhost:9090'" > grafana/conf/provisioning/datasources/klaytn.yml
```

```sh
# Clone the klaytn-deploy repository if not already cloned
if [ ! -d "klaytn-deploy" ]; then
  echo "Cloning klaytn-deploy repository..."
  git clone https://github.com/klaytn/klaytn-deploy.git
fi

# Copy Grafana configuration files from klaytn-deploy
cp klaytn-deploy/grafana/*.json grafana/conf/provisioning/dashboards/
```

## 4\. Dịch vụ truy cập

Sau khi cài đặt và cấu hình, hãy truy cập giao diện Prometheus và Grafana để xác minh rằng mọi thứ đã được thiết lập chính xác.

- **Giao diện Prometheus**

  - **URL:** `http://localhost:9090`
  - **Xác minh:** Truy cập URL này trong trình duyệt của bạn. Bạn sẽ thấy giao diện web Prometheus. Sử dụng tab **Biểu đồ** để thực hiện các truy vấn mẫu và đảm bảo số liệu đang được thu thập.

- **Giao diện Grafana**

  - **URL:** `http://localhost:3000`
  - **Thông tin xác thực mặc định:**
    - **Tên người dùng:** `admin`
    - **Mật khẩu:** `admin`
  - **Xác minh:** Khi đăng nhập lần đầu, bạn sẽ được nhắc thay đổi mật khẩu mặc định. Sau khi đăng nhập, hãy đảm bảo rằng nguồn dữ liệu Prometheus được cấu hình đúng và bảng thông tin Kaia hiển thị số liệu.
