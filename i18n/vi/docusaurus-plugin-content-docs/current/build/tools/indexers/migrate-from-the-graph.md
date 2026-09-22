---
title: Chuyển đổi từ The Graph
sidebar_label: Chuyển đổi từ The Graph
---

# Chuyển đổi từ The Graph

Dịch vụ hỗ trợ Kaia trên **The Graph** đã kết thúc vào ngày **31 tháng 8 năm 2026**. Các tiểu đồ thị Kaia không còn được lập chỉ mục, các điểm cuối truy vấn của chúng không còn trả về dữ liệu Kaia, và Kaia không còn là mạng có thể triển khai trong Subgraph Studio.

Nếu ứng dụng phi tập trung (dapp) của bạn vẫn trỏ đến một subgraph Kaia trên The Graph, hãy chuyển nó sang [Goldsky](./goldsky.md), [SubQuery](./subquery.md) hoặc một nút đồ thị tự lưu trữ. Mã đoạn đồ thị con của bạn sẽ được giữ nguyên.

## Chuyện gì đã xảy ra

The Graph đã ngừng hỗ trợ Kaia. Vấn đề này chỉ ảnh hưởng đến dịch vụ lập chỉ mục được lưu trữ.

|                              |                                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ngày 31 tháng 8 năm 2026** | Các tiểu đồ thị Kaia đã ngừng lập chỉ mục. Các điểm cuối truy vấn trên cổng The Graph đã ngừng trả về dữ liệu Kaia.     |
| **Bây giờ**                  | Kaia hiện không còn là mạng có thể triển khai trong Subgraph Studio nữa. Lệnh `graph deploy` cho Kaia không thành công. |

**Không có thay đổi nào trên chuỗi.** Mạng chính Kaia (8217) và mạng thử nghiệm Kairos (1001), các hợp đồng của bạn cũng như toàn bộ lịch sử sự kiện của bạn đều không bị ảnh hưởng. Bất kỳ trình lập chỉ mục nào đọc điểm cuối RPC của Kaia đều có thể tái tạo lại chính xác dữ liệu từ thời điểm khởi tạo — không có dữ liệu lịch sử nào bị mất, và không cần phải khôi phục bất kỳ dữ liệu nào trên chuỗi.

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

Nếu có bất kỳ trường hợp nào trong số này xảy ra, các truy vấn đó đã bị lỗi rồi. Việc di chuyển sẽ khôi phục lại dịch vụ.

Bạn **sẽ không** bị ảnh hưởng nếu bạn lập chỉ mục Kaia bằng Goldsky, SubQuery, một nút đồ thị tự lưu trữ hoặc bằng cách truy cập trực tiếp vào điểm cuối RPC của Kaia.

## Chọn một phương án khác

Cả ba tùy chọn dưới đây đều liên quan đến Kaia Mainnet và Kairos.

|                                  | [Goldsky](./goldsky.md)                                                                            | [SubQuery](./subquery.md)                          | Nút đồ thị tự lưu trữ                         |
| -------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------- |
| **Chạy các tiểu đồ thị hiện có** | Đúng — cùng một thông số kỹ thuật của đồ thị con                                                   | Đúng — thông qua ID triển khai IPFS                | Đúng vậy — đó _chính là_ nút đồ thị           |
| **Nỗ lực di cư**                 | Một lệnh CLI                                                                                       | Phát hành bản dựng hiện có                         | Tự cung cấp hạ tầng của riêng bạn             |
| **Dịch vụ lưu trữ**              | Được quản lý                                                                                       | Mạng lưới được quản lý hay mạng lưới phi tập trung | Bạn hãy vận hành nó                           |
| **Ngoài ra còn cung cấp**        | Mirror (truyền dữ liệu trực tiếp vào cơ sở dữ liệu của bạn), RPC, các đường ống | Chỉ mục đa chuỗi trong một dự án                   | Kiểm soát hoàn toàn                           |
| **Phù hợp nhất cho**             | Giải pháp thay thế nhanh nhất                                                                      | Các dự án đa chuỗi, dịch vụ lưu trữ phi tập trung  | Các đội muốn không phụ thuộc vào nhà cung cấp |

**Nếu bạn muốn có lộ trình ngắn nhất, hãy sử dụng Goldsky.** Goldsky hoàn toàn tương thích với đặc tả tiểu đồ thị của The Graph, do đó, một tiểu đồ thị Kaia hiện có có thể được chuyển sang mà không cần thay đổi các bản ánh xạ, lược đồ hay truy vấn của bạn — chỉ có URL điểm cuối trong ứng dụng của bạn là thay đổi.

:::tip Triển khai từ mã nguồn, không phải từ băm IPFS

Các hướng dẫn chuyển đổi sang The Graph thường bắt đầu bằng việc lấy mã băm triển khai của tiểu đồ thị của bạn từ điểm cuối truy vấn đang hoạt động của nó. Điều đó không còn khả thi đối với các đồ thị con Kaia nữa, bởi vì các điểm cuối đó đã ngừng phản hồi.

Thay vào đó, hãy triển khai từ kho lưu trữ nguồn của subgraph của bạn. Phương pháp này không cần ID triển khai, tạo ra bản dựng giống hệt và hiện là phương án đáng tin cậy. Chỉ nên sử dụng mã băm IPFS như phương án dự phòng nếu bạn đã lưu mã băm đó từ trước hoặc vẫn có thể truy cập mã băm đó từ trang của subgraph trên [Graph Explorer](https://thegraph.com/explorer) hoặc Subgraph Studio.

:::

## Lựa chọn 1: Chuyển sang Goldsky

### 1. Cài đặt và xác thực Goldsky CLI

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

### 2. Triển khai tiểu đồ thị từ mã nguồn

Từ thư mục dự án subgraph của bạn:

```bash
goldsky subgraph deploy <your-subgraph-name>/<version>
```

Goldsky sẽ xây dựng dựa trên các tệp `subgraph.yaml`, `schema.graphql` và các bản ánh xạ của bạn, sau đó bắt đầu lập chỉ mục Kaia từ khối bắt đầu mà bạn đã cấu hình. Xem [Triển khai các tiểu đồ thị](https://docs.goldsky.com/subgraphs/deploying-subgraphs) để tham khảo thông tin đầy đủ.

Nếu bạn vẫn còn mã băm IPFS của một bản dựng trước đó, bạn có thể triển khai chính bản dựng đó thay thế:

```bash
goldsky subgraph deploy <your-subgraph-name>/<version> --from-ipfs-hash <your-subgraph-ipfs-hash>
```

### 3. Hãy đợi quá trình đồng bộ hóa hoàn tất rồi chuyển sang điểm cuối của bạn

Theo dõi tiến độ bằng:

```bash
goldsky subgraph list
```

Việc lập chỉ mục lại lịch sử Kaia từ điểm khởi đầu của bạn sẽ mất thời gian — hãy lên kế hoạch cho việc này thay vì mong đợi quá trình chuyển đổi diễn ra ngay lập tức. Khi đồ thị con đã bắt kịp đầu chuỗi, hãy thay thế URL cổng trong ứng dụng của bạn:

```diff
- const queryUrl = 'https://gateway.thegraph.com/api/<api-key>/subgraphs/id/<subgraph-id>';
+ const queryUrl = 'https://api.goldsky.com/api/public/<project-id>/subgraphs/<name>/<version>/gn';
```

Các truy vấn GraphQL của bạn không thay đổi. Để xem hướng dẫn chi tiết về cách xây dựng một tiểu đồ thị Kaia trên Goldsky từ đầu, hãy truy cập [Goldsky](./goldsky.md).

## Lựa chọn 2: Chuyển sang SubQuery

SubQuery có thể chạy quá trình xây dựng subgraph đã có sẵn, đồng thời hỗ trợ SDK riêng dành cho các dự án đa chuỗi.

1. Xây dựng đồ thị con của bạn dựa trên cổng IPFS của SubQuery để tạo ra một ID triển khai (CID):

   ```bash
   graph build -i https://unauthipfs.subquery.network/ipfs/api/v0
   ```

   Nếu bạn đã lưu ID triển khai từ Graph Explorer trước khi dịch vụ ngừng hoạt động, bạn có thể sử dụng ID đó thay thế.

2. Mở [SubQuery Explorer](https://explorer.subquery.network) và chọn **Publish New Project**.

3. Nhập mã CID cùng với siêu dữ liệu dự án của bạn, sau đó nhấn nút “Xuất bản”.

Xin lưu ý rằng mạng SubQuery không hỗ trợ tính năng đăng ký (subscription) trong GraphQL. Xem [Hướng dẫn xuất bản dự án Subgraph của bạn lên Mạng SubQuery](https://subquery.network/doc/subquery_network/architects/publish-subgraph.html) và [Hướng dẫn bắt đầu nhanh với Kaia](https://subquery.network/doc/indexer/quickstart/quickstart_chains/kaia.html), hoặc trang [SubQuery](./subquery.md) để tham khảo các hướng dẫn khởi đầu dành riêng cho Kaia.

## Lựa chọn 3: Tự lưu trữ nút đồ thị

Đồ thị con của bạn có tính di động. Bạn có thể tự chạy [graph-node](https://github.com/graphprotocol/graph-node) trên một điểm cuối RPC của kho lưu trữ Kaia và giữ nguyên các bản ánh xạ, lược đồ và truy vấn của mình như hiện tại.

Bạn sẽ cần một điểm cuối RPC của Kaia (xem [Các điểm cuối công khai](../../../references/public-en.md) hoặc chạy [nút của riêng bạn](../../../nodes/endpoint-node/endpoint-node.md)), cùng với PostgreSQL và IPFS. Điều này mang lại cho bạn quyền kiểm soát hoàn toàn và không phụ thuộc vào nhà cung cấp, nhưng đổi lại, bạn phải tự vận hành cơ sở hạ tầng.

## Danh sách kiểm tra chuyển đổi

- [ ] Liệt kê tất cả các tiểu đồ thị Kaia mà nhóm của bạn đang quản lý, bao gồm cả các bảng điều khiển nội bộ và các tác vụ phân tích.
- [ ] Xác định kho lưu trữ nguồn của từng mục, cùng với khối khởi đầu và bất kỳ cấu hình ghép nối nào.
- [ ] Triển khai từng đồ thị con lên nhà cung cấp mà bạn đã chọn.
- [ ] Chờ cho đến khi từng đồ thị con đồng bộ hóa với đầu chuỗi.
- [ ] Hãy so sánh một vài truy vấn đã biết với điểm cuối mới và xác nhận xem kết quả có chính xác không.
- [ ] Cập nhật các URL điểm cuối và khóa API trong ứng dụng, các biến môi trường và thông tin bí mật CI của bạn.
- [ ] Cập nhật các tích hợp của bên thứ ba hoặc các đối tác đang sử dụng điểm cuối subgraph của bạn.
- [ ] Triển khai ứng dụng của bạn và xác nhận rằng lưu lượng truy cập trên môi trường sản xuất được xử lý từ điểm cuối mới.
- [ ] Hủy các tài khoản thanh toán hoặc khóa API của The Graph chỉ được sử dụng cho Kaia.

## Câu hỏi thường gặp

**Điều này có ảnh hưởng đến các hợp đồng thông minh hoặc dữ liệu trên chuỗi của tôi không?**
Không. Chỉ có dịch vụ lập chỉ mục được lưu trữ là đã ngừng hoạt động. Các hợp đồng, giao dịch và nhật ký sự kiện của bạn trên Kaia vẫn giữ nguyên và vẫn có thể được tra cứu đầy đủ bởi bất kỳ trình lập chỉ mục nào.

**Tôi có phải viết lại đồ thị con của mình không?**
Không. Goldsky, SubQuery và các nút đồ thị tự lưu trữ đều tuân thủ đặc tả đồ thị con tiêu chuẩn. Tệp `schema.graphql`, các bản ánh xạ và các truy vấn GraphQL của bạn sẽ được giữ nguyên.

**Tôi chưa bao giờ lưu ID triển khai của tiểu đồ thị của mình.** Đồ thị con của tôi có bị mất không?\*\*
Không. ID triển khai dùng để xác định một bản dựng, chứ không phải dữ liệu của bạn. Triển khai từ kho lưu trữ mã nguồn của bạn và trình lập chỉ mục mới của bạn sẽ xây dựng lại cùng một tập dữ liệu từ chuỗi.

**Tôi cũng không còn mã nguồn của đồ thị con nữa.**
Dữ liệu đã được lập chỉ mục vẫn có thể được xây dựng lại, nhưng các bản ánh xạ và lược đồ phải được viết lại. Hãy bắt đầu từ hướng dẫn [Goldsky](./goldsky.md), sử dụng các ABI của hợp đồng và khối mà hợp đồng của bạn đã được triển khai.

**Các truy vấn dành cho các chuỗi khác có còn hoạt động không?**
Có. Điều này chỉ ảnh hưởng đến Kaia. Các tiểu đồ thị mà bạn chạy trên các mạng khác thông qua The Graph sẽ không bị ảnh hưởng.

**Kaia có đề xuất một nhà cung cấp nào không?**
Không. Goldsky là phương án triển khai nhanh nhất nhờ tính năng di chuyển chỉ bằng một lệnh, nhưng SubQuery và nút đồ thị tự lưu trữ cũng là những lựa chọn hợp lý không kém. Hãy chọn giải pháp phù hợp với hệ thống công nghệ của bạn.

**Tôi cần trợ giúp về việc di chuyển dữ liệu.**
Hãy liên hệ qua [Diễn đàn Nhà phát triển Kaia](https://devforum.kaia.io) hoặc kênh Discord của Kaia. Nếu bạn đang vận hành một đồ thị con có quy mô lớn hoặc phức tạp, hãy liên hệ với nhóm Kaia để chúng tôi có thể hỗ trợ bạn lên kế hoạch chuyển đổi.

## Các bước tiếp theo

- [Goldsky](./goldsky.md) — Triển khai một tiểu đồ thị Kaia, từng bước một
- [SubQuery](./subquery.md) — lập chỉ mục đa chuỗi trên Kaia
- [Tổng quan về các công cụ lập chỉ mục](./indexers.md) — tất cả các tùy chọn lập chỉ mục trên Kaia
