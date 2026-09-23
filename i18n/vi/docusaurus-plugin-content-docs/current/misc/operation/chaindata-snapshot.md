# Use Chaindata Snapshots

You can start a node from an already-synced database called a chaindata snapshot. A chaindata snapshot is a compressed Kaia data directory.

:::note

This saves time to [Full Sync](../../learn/storage/block-sync.md#full-sync) the whole blockchain, allowing you to relatively quickly start a new node or recover from corrupt database.

:::

## Prepare Data Directory

Before start, prepare enough disk space to accommodate both compressed file and uncompressed directory.

- If you're going to start from an empty machine, simply create a datadir.
  ```sh
  sudo mkdir /var/kend
  ```
- If you're going to swap the existing directory, create a temporary directory.
  - Option 1. Mount a new disk (Recommended for optimal disk utilization)
    ```sh
    $ lsblk
    NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
    nvme2n1       259:0    0  3500G  0 disk /var/kend2 # New disk at temporary path
    nvme1n1       259:0    0  4000G  0 disk /var/kcnd  # Old disk at production path
    nvme0n1       259:2    0    8G  0 disk
    ├─nvme0n1p1   259:3    0    8G  0 part /
    └─nvme0n1p128 259:4    0    1M  0 part

    ```
  - Option 2. Use existing disk
    ```sh
    sudo mkdir /var/kend2/data
    ```

## Download the File

Mọi bản chụp được công bố đều được liệt kê tại [snapshots.node.kaia.io](https://snapshots.node.kaia.io/), và mỗi mạng sẽ công bố URL của bản chụp mới nhất dưới dạng tệp `latest.txt` chỉ gồm một dòng. Hãy đọc nội dung đó vào một biến; khi một bản chụp mới được xuất bản, các lệnh dưới đây sẽ không cần chỉnh sửa.

```sh
# mainnet; đối với Kairos, hãy thay thế mainnet bằng kairos
URL=$(curl -s https://snapshots.node.kaia.io/mainnet/pruning-chaindata/latest.txt)
echo "$URL"
```

- Option 1. curl
  ```sh
  curl -O "$URL"
  ```
- Option 2. wget
  ```sh
  wget "$URL"
  ```
- Option 3. axel
  ```sh
  # Ví dụ cài đặt Amazon Linux
  sudo amazon-linux-extras install epel
  sudo yum install axel

  # Thanh trạng thái tải xuống và in đa luồng
  axel -n8 "$URL" | awk -W interactive '$0~/\[/{printf "%s'$'\r''", $0}'
  ```
- Option 4. aria2
  ```sh
  # Ví dụ cài đặt Rocky Linux
  sudo yum install epel-release aria2

  # Tải xuống nhẹ, hỗ trợ nhiều kết nối
  aria2c "$URL"
  ```

## Decompress the File

Các bản chụp nhanh được nén bằng [zstd](https://github.com/facebook/zstd) và được đặt tên là `.tar.zst`. Tập tin lưu trữ chứa một thư mục `klay/chaindata`, vì vậy hãy giải nén nó vào chính thư mục data.

- Option 1. tar
  ```sh
  tar --zstd -xvf kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -C /var/kend/data
  ```
- Option 2. zstd, sau đó là tar
  ```sh
  # Đối với tệp tar được tạo mà không sử dụng tùy chọn --zstd. Ví dụ cài đặt trên Amazon Linux & Rocky Linux
  sudo yum install zstd

  zstd -d kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -o out.tar
  tar -xf out.tar -C /var/kend/data
  ```
- Lựa chọn 3. Tải xuống và giải nén chỉ trong một bước
  ```sh
  # Không đủ dung lượng để chứa cả tệp lưu trữ và thư mục mà nó sẽ giải nén vào
  curl -s "$URL" | tar --zstd -xf - -C /var/kend/data
  ```

## Swap the data directory

- First, stop the node.
  - **IMPORTANT**: If you are running a consensus node (CN), make sure to remove the node from the Council.
- Option 1. Swap the content at the same path
  - If you mounted new disk, change the mount.
    ```sh
    umount /var/kend  # Old disk
    umount /var/kend2 # New disk at temporary path
    mount /dev/nvme2n1 /var/kend  # New disk at production path
    ```
  - If you used existing disk, rename the directory.
    ```sh
    mv /var/kend /var/kend_old  # Old data
    mv /var/kend2 /var/kend     # New data
    ```
- Option 2. Thay đổi đường dẫn trong cấu hình nút
  - Change `DATA_DIR` value in the `kend.conf` file.
- Tùy chọn: xóa dữ liệu cũ và tệp `.tar.zst`.
- Finally, start the node.

## Downloads

Các bản chụp nhanh được công bố tại **[snapshots.node.kaia.io](https://snapshots.node.kaia.io/)**, nơi liệt kê tất cả các bản chụp nhanh kèm theo dung lượng và tổng kiểm tra của từng bản. Bên cạnh trang này, mỗi mạng lưới đều công bố hai tệp dành cho các tập lệnh: `latest.txt`, chứa URL của bản chụp mới nhất trên một dòng, và `manifest.json`, liệt kê từng bản chụp kèm theo kích thước, tổng kiểm tra và thời gian tạo.

| network | sync options | download                                                                                                        | dành cho kịch bản                                                                                                                                                                                           |
| ------- | ------------ | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mainnet | live pruning | https://snapshots.node.kaia.io/#mainnet-pruning | [latest.txt](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/manifest.json) |
| kairos  | live pruning | https://snapshots.node.kaia.io/#kairos-pruning  | [latest.txt](https://snapshots.node.kaia.io/kairos/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/kairos/pruning-chaindata/manifest.json)   |

Chỉ các cơ sở dữ liệu được cắt tỉa theo thời gian thực mới được công bố. Hãy đọc bài viết [Tối ưu hóa dung lượng lưu trữ](../../learn/storage/storage-optimization.md) để tìm hiểu về khái niệm này. Các bản chụp nhanh được cắt tỉa theo lô (di chuyển trạng thái) sẽ không còn được tạo ra nữa, cũng như các cơ sở dữ liệu đầy đủ hay cơ sở dữ liệu lưu trữ: đối với những trường hợp này, hãy thực hiện đồng bộ hóa đầy đủ mới từ bản gốc, hoặc gửi email đến devops@kaia.io.

:::note

Các URL `https://packages.kaia.io/<network>/chaindata/` và `.../pruning-chaindata/` mà trang này từng liệt kê hiện không còn được cập nhật nữa. Bất kỳ tệp nào có tên là `latest.txt` hoặc `manifest.json` nằm trong các thư mục đó đều nên truy cập các URL trong bảng trên thay thế.

:::
