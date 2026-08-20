---
title: Chuyển đổi từ The Graph
sidebar_label: Chuyển đổi từ The Graph
---

# Chuyển đổi từ The Graph

:::caution Thông báo về hoàng hôn

Dịch vụ hỗ trợ Kaia trên **The Graph** sẽ kết thúc vào ngày **31 tháng 8 năm 2026**. Sau ngày đó, các tiểu đồ thị Kaia sẽ ngừng lập chỉ mục và các điểm cuối truy vấn của chúng sẽ ngừng trả về dữ liệu. Nếu ứng dụng phi tập trung (dapp) của bạn truy xuất dữ liệu từ một tiểu đồ thị Kaia trên The Graph, hãy chuyển sang sử dụng một máy chỉ mục khác trước ngày **31 tháng 8 năm 2026** để tránh tình trạng ngừng hoạt động.

:::

## Điều gì đang thay đổi

Hiện tại, Kaia Mainnet (8217) và Kairos Testnet (1001) đã được hỗ trợ trên The Graph, trong đó việc lập chỉ mục cho các tiểu đồ thị (subgraph) của Kaia được thực hiện bởi Upgrade Indexer. Chương trình hỗ trợ này sẽ kết thúc vào ngày **31 tháng 8 năm 2026**.

| Ngày                         | Điều gì sẽ xảy ra                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ngày 31 tháng 8 năm 2026** | Các đồ thị con của Kaia ngừng lập chỉ mục. Các điểm cuối truy vấn trên cổng của The Graph đã ngừng trả về dữ liệu Kaia. |
| Sau khi mặt trời lặn         | Kaia hiện không còn là mạng có thể triển khai trong Subgraph Studio nữa. Lệnh `graph deploy` cho Kaia không thành công. |

Không có gì thay đổi trên chuỗi. Kaia Mainnet và Kairos, các hợp đồng của bạn cũng như lịch sử sự kiện của bạn sẽ không bị ảnh hưởng — chỉ có dịch vụ lập chỉ mục được lưu trữ là sẽ ngừng hoạt động. Bất kỳ trình lập chỉ mục nào có thể đọc điểm cuối RPC của Kaia đều có thể tái tạo lại cùng một dữ liệu.

## Bạn có bị ảnh hưởng không?

Bạn sẽ bị ảnh hưởng nếu có bất kỳ trường hợp nào sau đây xảy ra:

- Ứng dụng của bạn gửi yêu cầu đến một URL trên `gateway.thegraph.com` hoặc `gateway-arbitrum.network.thegraph.com`, URL này trỏ đến một subgraph Kaia.
- Ứng dụng của bạn đang truy vấn một điểm cuối tiểu đồ thị Kaia từ Subgraph Studio (`api.studio.thegraph.com/query/...`).
- Bạn có thể triển khai các tiểu đồ thị Kaia bằng lệnh `graph deploy --studio` hoặc xuất bản chúng lên mạng lưới phi tập trung của The Graph.
- Một tác vụ phụ thuộc, bảng điều khiển hoặc tác vụ phân tích trong hệ thống của bạn sẽ truy xuất dữ liệu từ một trong các điểm cuối đó.

Một cách nhanh chóng để kiểm tra cơ sở mã của bạn:

```bash
grep -rn "thegraph.com" --include="*.ts" --include="*.js" --include="*.json" --include="*.env*" .
```

Bạn **sẽ không** bị ảnh hưởng nếu bạn lập chỉ mục Kaia bằng Goldsky, SubQuery, một nút đồ thị tự lưu trữ hoặc bằng cách truy cập trực tiếp vào điểm cuối RPC của Kaia.

## Chọn một phương án khác

Cả ba tùy chọn dưới đây đều niêm yết Kaia Mainnet và Kairos ngay hôm nay.

|                                  | [Goldsky](./goldsky.md)                                                                            | [SubQuery](./subquery.md)                          | Nút đồ thị tự lưu trữ                         |
| -------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------- |
| **Chạy các tiểu đồ thị hiện có** | Đúng — cùng một thông số kỹ thuật của đồ thị con                                                   | Đúng — thông qua ID triển khai IPFS                | Đúng vậy — đó _chính là_ nút đồ thị           |
| **Nỗ lực di cư**                 | Một lệnh CLI                                                                                       | Phát hành bản dựng hiện có                         | Tự cung cấp hạ tầng của riêng bạn             |
| **Dịch vụ lưu trữ**              | Được quản lý                                                                                       | Mạng lưới được quản lý hay mạng lưới phi tập trung | Bạn hãy vận hành nó                           |
| **Ngoài ra còn cung cấp**        | Mirror (truyền dữ liệu trực tiếp vào cơ sở dữ liệu của bạn), RPC, các đường ống | Chỉ mục đa chuỗi trong một dự án                   | Kiểm soát hoàn toàn                           |
| **Phù hợp nhất cho**             | Giải pháp thay thế nhanh nhất                                                                      | Các dự án đa chuỗi, dịch vụ lưu trữ phi tập trung  | Các đội muốn không phụ thuộc vào nhà cung cấp |

**Nếu bạn muốn có lộ trình ngắn nhất, hãy sử dụng Goldsky.** Goldsky hoàn toàn tương thích với đặc tả tiểu đồ thị của The Graph, do đó, một tiểu đồ thị Kaia hiện có có thể được chuyển sang mà không cần thay đổi các bản ánh xạ, lược đồ hay truy vấn của bạn — chỉ có URL điểm cuối trong ứng dụng của bạn là thay đổi.

## Lựa chọn 1: Chuyển sang Goldsky

### 1. Lấy mã băm IPFS của đồ thị con của bạn

Hãy truy vấn điểm cuối của tiểu đồ thị hiện có của bạn trên The Graph trước ngày ngừng hỗ trợ:

```graphql
query {
  _meta {
    deployment
  }
}
```

Giá trị `deployment` là mã băm IPFS của bạn. Bạn cũng có thể sao chép thông tin này dưới dạng **ID triển khai** từ trang của subgraph trên [Graph Explorer](https://thegraph.com/explorer) hoặc Subgraph Studio.

:::tip Hãy làm việc này trước ngày 31 tháng 8

Hãy trích xuất mã băm IPFS cho từng tiểu đồ thị Kaia mà bạn đang sở hữu và lưu lại. Việc thu thập dữ liệu sẽ dễ dàng hơn nhiều khi các thiết bị đầu cuối của bạn vẫn còn phản hồi.

:::

### 2. Cài đặt và xác thực Goldsky CLI

```bash
# macOS / Linux
curl https://goldsky.com | sh

# Windows
npm install -g @goldskycom/cli
```

Tạo khóa API trong phần **Cài đặt dự án** tại [app.goldsky.com](https://app.goldsky.com), sau đó:

```bash
goldsky login
```

Đối với môi trường CI hoặc môi trường không giao diện người dùng:

```bash
goldsky login --token <API_KEY>
```

### 3. Triển khai lại tiểu đồ thị

```bash
goldsky subgraph deploy <your-subgraph-name>/<version> --from-ipfs-hash <your-subgraph-ipfs-hash>
```

Goldsky thực hiện quy trình xây dựng tiểu đồ thị tương tự và bắt đầu lập chỉ mục Kaia từ khối bắt đầu mà bạn đã cấu hình.

Nếu bạn muốn triển khai từ kho lưu trữ nguồn, hãy chạy lệnh `goldsky subgraph deploy <name>/<version>` từ thư mục dự án — xem [Triển khai subgraph](https://docs.goldsky.com/subgraphs/deploying-subgraphs).

### 4. Hãy đợi quá trình đồng bộ hóa hoàn tất rồi chuyển sang điểm cuối của bạn

Theo dõi tiến độ bằng:

```bash
goldsky subgraph list
```

Khi mạng con đã bắt kịp đầu chuỗi, hãy thay thế URL cổng trong ứng dụng của bạn bằng điểm cuối truy vấn Goldsky:

```diff
- const queryUrl = 'https://gateway.thegraph.com/api/<api-key>/subgraphs/id/<subgraph-id>';
+ const queryUrl = 'https://api.goldsky.com/api/public/<project-id>/subgraphs/<name>/<version>/gn';
```

Các truy vấn GraphQL của bạn không thay đổi. Để xem hướng dẫn chi tiết về cách xây dựng một tiểu đồ thị Kaia trên Goldsky từ đầu, hãy truy cập [Goldsky](./goldsky.md).

## Lựa chọn 2: Chuyển sang SubQuery

SubQuery có thể chạy quá trình xây dựng subgraph đã có sẵn, đồng thời cũng hỗ trợ SDK riêng của mình dành cho các dự án đa chuỗi.

1. Lấy **ID triển khai** (IPFS CID) từ Graph Explorer, hoặc tạo một ID như vậy tại máy cục bộ thông qua cổng IPFS của SubQuery:

   ```bash
   graph build -i https://unauthipfs.subquery.network/ipfs/api/v0
   ```

2. Mở [SubQuery Explorer](https://explorer.subquery.network) và chọn **Publish New Project**.

3. Nhập mã CID cùng với siêu dữ liệu dự án của bạn, sau đó nhấn nút “Xuất bản”.

Xin lưu ý rằng mạng SubQuery không hỗ trợ tính năng đăng ký (subscription) trong GraphQL. Xem [Hướng dẫn xuất bản dự án Subgraph của bạn lên Mạng SubQuery](https://subquery.network/doc/subquery_network/architects/publish-subgraph.html) và [Hướng dẫn bắt đầu nhanh với Kaia](https://subquery.network/doc/indexer/quickstart/quickstart_chains/kaia.html), hoặc trang [SubQuery](./subquery.md) để tham khảo các hướng dẫn khởi đầu dành riêng cho Kaia.

## Lựa chọn 3: Tự lưu trữ nút đồ thị

Đồ thị con của bạn có tính di động. Bạn có thể tự chạy [graph-node](https://github.com/graphprotocol/graph-node) trên một điểm cuối RPC của kho lưu trữ Kaia và giữ nguyên các bản ánh xạ, lược đồ và truy vấn của mình như hiện tại.

Bạn sẽ cần một điểm cuối RPC của Kaia (xem [Các điểm cuối công khai](../../../references/public-en.md) hoặc chạy [nút của riêng bạn](../../../nodes/endpoint-node/endpoint-node.md)), cùng với PostgreSQL và IPFS. Điều này mang lại cho bạn quyền kiểm soát hoàn toàn và không phụ thuộc vào nhà cung cấp, nhưng đổi lại, bạn phải tự vận hành cơ sở hạ tầng.

## Danh sách kiểm tra chuyển đổi

- [ ] Liệt kê tất cả các tiểu đồ thị Kaia mà nhóm của bạn đang quản lý, bao gồm cả các bảng điều khiển nội bộ và các tác vụ phân tích.
- [ ] Hãy lưu lại mã băm IPFS / ID triển khai của từng mục **trước ngày 31 tháng 8 năm 2026**.
- [ ] Lưu khối bắt đầu và bất kỳ cấu hình ghép nào cho mỗi đồ thị con.
- [ ] Triển khai từng đồ thị con lên nhà cung cấp mà bạn đã chọn.
- [ ] Chờ cho đến khi mỗi tiểu đồ thị đồng bộ hóa với đầu chuỗi.
- [ ] Hãy so sánh một số truy vấn đã biết với cả hai điểm cuối và xác nhận xem kết quả có khớp nhau hay không.
- [ ] Cập nhật các URL điểm cuối và khóa API trong ứng dụng, các biến môi trường và thông tin bí mật CI của bạn.
- [ ] Cập nhật các tích hợp của bên thứ ba hoặc các đối tác đang sử dụng điểm cuối subgraph của bạn.
- [ ] Triển khai ứng dụng của bạn và xác nhận rằng lưu lượng truy cập trên môi trường sản xuất được xử lý từ điểm cuối mới.
- [ ] Hủy dịch vụ thanh toán The Graph hoặc các khóa API chỉ được sử dụng cho Kaia.

## Câu hỏi thường gặp

**Điều này có ảnh hưởng đến các hợp đồng thông minh hoặc dữ liệu trên chuỗi của tôi không?**
Không. Chỉ có dịch vụ lập chỉ mục được lưu trữ là sẽ ngừng hoạt động. Các hợp đồng, giao dịch và nhật ký sự kiện của bạn trên Kaia vẫn giữ nguyên và vẫn có thể được tra cứu đầy đủ bởi bất kỳ trình lập chỉ mục nào.

**Tôi có phải viết lại tiểu đồ thị của mình không?**
Không. Goldsky, SubQuery và các nút đồ thị tự lưu trữ đều chạy theo tiêu chuẩn subgraph. Tệp `schema.graphql`, các bản ánh xạ và các truy vấn GraphQL của bạn sẽ được giữ nguyên.

**Điều gì sẽ xảy ra với tiểu đồ thị của tôi trên The Graph sau ngày 31 tháng 8 năm 2026?**
Hệ thống sẽ ngừng lập chỉ mục cho Kaia và điểm cuối truy vấn của nó sẽ ngừng trả về dữ liệu Kaia. Hãy thực hiện việc di chuyển trước ngày đó để tránh thời gian ngừng hoạt động.

**Các truy vấn dành cho các chuỗi khác có còn hoạt động không?**
Có. Điều này chỉ ảnh hưởng đến Kaia. Các tiểu đồ thị mà bạn chạy trên các mạng khác thông qua The Graph sẽ không bị ảnh hưởng.

**Kaia có đề xuất một nhà cung cấp nào không?**
Không. Goldsky là phương án triển khai nhanh nhất nhờ tính năng di chuyển chỉ bằng một lệnh, nhưng SubQuery và nút đồ thị tự lưu trữ cũng là những lựa chọn hợp lý không kém. Hãy chọn giải pháp phù hợp với hệ thống công nghệ của bạn.

**Tôi cần trợ giúp về việc di chuyển dữ liệu.**
Hãy liên hệ qua [Diễn đàn Nhà phát triển Kaia](https://devforum.kaia.io) hoặc kênh Discord của Kaia. Nếu bạn đang vận hành một tiểu đồ thị lớn hoặc phức tạp, hãy liên hệ với đội ngũ Kaia càng sớm càng tốt để chúng tôi có thể hỗ trợ bạn lập kế hoạch chuyển đổi.

## Các bước tiếp theo

- [Goldsky](./goldsky.md) — Triển khai một tiểu đồ thị Kaia, từng bước một
- [SubQuery](./subquery.md) — lập chỉ mục đa chuỗi trên Kaia
- [Tổng quan về các công cụ lập chỉ mục](./indexers.md) — tất cả các tùy chọn lập chỉ mục trên Kaia
