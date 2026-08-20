# Indexers

Blockchain indexers are tools used in the context of blockchain technology to improve the efficiency and speed of searching, querying, and accessing data stored on a blockchain. They create and maintain organized databases of the blockchain's data, allowing users to quickly retrieve information without needing to process the entire blockchain from scratch.

:::caution The Graph sẽ ngừng hoạt động trên Kaia vào ngày 31 tháng 8 năm 2026

Dịch vụ hỗ trợ Kaia trên [The Graph](https://thegraph.com/) sẽ kết thúc vào ngày **31 tháng 8 năm 2026**. Sau ngày đó, các tiểu đồ thị Kaia sẽ ngừng lập chỉ mục và các điểm cuối truy vấn của chúng sẽ ngừng trả về dữ liệu. Nếu ứng dụng phi tập trung (dapp) của bạn phụ thuộc vào một trong các nền tảng này, hãy tham khảo **[Hướng dẫn chuyển đổi từ The Graph](./migrate-from-the-graph.md)** — mã nguồn của subgraph sẽ được chuyển sang Goldsky, SubQuery hoặc một nút đồ thị tự lưu trữ mà không cần chỉnh sửa.

:::

The following providers have integrated with Kaia to deliver blockchain indexing services:

| Nhà cung cấp               | Mạng lưới Kaia                                        | Ghi chú                                                                                                                                                                                                           |
| -------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Goldsky](./goldsky.md)    | Mạng chính, Kairos                                    | Các tiểu đồ thị được quản lý kết hợp với truyền dữ liệu Mirror. Tương thích với đặc tả subgraph, do đó các subgraph hiện có có thể được di chuyển chỉ bằng một lệnh CLI duy nhất. |
| [SubQuery](./subquery.md)  | Mạng chính, Kairos                                    | Chỉ mục đa chuỗi trong một dự án duy nhất, với dịch vụ lưu trữ mạng được quản lý và phi tập trung.                                                                                                |
| [The Graph](./thegraph.md) | Mạng chính, Kairos — **đến ngày 31 tháng 8 năm 2026** | Hoàng hôn trên Kaia. Xem [Chuyển đổi từ The Graph](./migrate-from-the-graph.md).                                                                                                  |

Bạn cũng có thể tự chạy [graph-node](https://github.com/graphprotocol/graph-node) trên một điểm cuối RPC của kho lưu trữ Kaia nếu bạn muốn tự vận hành cơ sở hạ tầng lập chỉ mục của riêng mình.
