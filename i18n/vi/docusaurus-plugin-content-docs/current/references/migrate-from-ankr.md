---
title: Chuyển đổi từ Ankr
sidebar_label: Chuyển từ Ankr
---

# Chuyển từ Ankr

:::caution Thông báo về hoàng hôn

Dịch vụ hỗ trợ Kaia trên **Ankr** sẽ kết thúc vào ngày **16 tháng 10 năm 2026**. Sau ngày đó, tất cả các điểm cuối RPC của Ankr trỏ đến các chuỗi Kaia sẽ ngừng hoạt động và không còn phản hồi nữa.

Nếu ứng dụng của bạn gửi các lệnh RPC Kaia đến Ankr, hãy chuyển sang nhà cung cấp khác trước ngày ngừng hỗ trợ. Đối với hầu hết các dự án, đây chỉ là một thay đổi nhỏ ở điểm cuối — xem [Chọn phương án thay thế](#choose-an-alternative).

:::

## Điều gì đang thay đổi

Ankr sẽ ngừng cung cấp dịch vụ Kaia RPC. Điều này chỉ ảnh hưởng đến các điểm cuối — bản thân Kaia không có gì thay đổi.

| Ngày                          | Điều gì sẽ xảy ra                                                                                                                                                     |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ngày 16 tháng 10 năm 2026** | Tất cả các điểm cuối RPC của Ankr dành cho các chuỗi Kaia đã ngừng hoạt động. Các yêu cầu không còn trả về dữ liệu nữa.               |
| Sau khi mặt trời lặn          | Kaia hiện không còn được cung cấp qua Ankr nữa. Các khóa API và gói dịch vụ hiện có không còn hỗ trợ lưu lượng truy cập của Kaia nữa. |

**Những điều không bị ảnh hưởng:**

- Chính mạng Kaia Mainnet (8217) và mạng thử nghiệm Kairos Testnet (1001)
- Các hợp đồng, địa chỉ, số dư và lịch sử giao dịch trên chuỗi của bạn
- Bất kỳ phần nào trong ứng dụng của bạn không gọi đến Ankr

Mỗi nhà cung cấp RPC đều cung cấp cùng một chuỗi dữ liệu. Nếu bạn định hướng ứng dụng của mình đến một điểm cuối khác, kết quả trả về sẽ vẫn như cũ.

## Bạn có bị ảnh hưởng không?

Bạn sẽ bị ảnh hưởng nếu bất kỳ trường hợp nào sau đây là đúng:

- Ứng dụng, tập lệnh hoặc hệ thống CI của bạn gửi các yêu cầu JSON-RPC đến Kaia thông qua một máy chủ thuộc miền `rpc.ankr.com`.
- Một cấu hình ví, mục mạng Hardhat/Foundry hoặc URL nhà cung cấp SDK trong dự án của bạn có tên là Ankr.
- Một thành phần phụ thuộc, trình lập chỉ mục, bảng điều khiển hoặc tác vụ phân tích trong hệ thống của bạn truy xuất dữ liệu từ Kaia thông qua Ankr.

Một cách nhanh chóng để kiểm tra cơ sở mã của bạn:

```bash
grep -rn "ankr" --include="*.ts" --include="*.js" --include="*.json" --include="*.toml" --include="*.yaml" --include="*.yml" --include="*.env*" .
```

Ngoài ra, hãy kiểm tra các vị trí mà grep không thể truy cập được: các biến môi trường triển khai, thông tin bí mật CI/CD, cấu hình hàm không máy chủ (serverless) và bất kỳ URL RPC nào được lưu trong ví hoặc trên bảng điều khiển được lưu trữ.

Bạn **sẽ không** bị ảnh hưởng nếu bạn đã sử dụng các điểm cuối công khai của Kaia Foundation hoặc một nhà cung cấp khác.

:::tip Hãy thực hiện việc này trước ngày 16 tháng 10 năm 2026

Trong khi tài khoản Ankr của bạn vẫn còn hoạt động:

- Hãy ghi lại các điểm cuối (endpoint) và khóa API của Ankr mà dự án của bạn đang sử dụng, để bạn có thể xác định tất cả các vị trí cần cập nhật.
- Xuất bất kỳ dữ liệu sử dụng hoặc phân tích nào mà bạn muốn lưu giữ từ bảng điều khiển Ankr.
- Hãy hủy đăng ký Ankr ngay sau khi bạn đã hoàn tất việc chuyển đổi, để tránh bị tính phí cho một dịch vụ mà bạn không còn sử dụng nữa.

:::

## Chọn một phương án thay thế

Tất cả các nhà cung cấp dịch vụ dưới đây đều đang phục vụ Kaia hôm nay. Vì tất cả chúng đều sử dụng cùng một giao diện JSON-RPC, nên việc di chuyển chỉ đơn thuần là thay đổi URL chứ không phải thay đổi mã nguồn.

|                         | [Alchemy](https://www.alchemy.com/rpc/kaia) **(Được khuyến nghị)** | [QuickNode](https://www.quicknode.com/docs/kaia)    | [All That Node](https://www.allthatnode.com/) | [dRPC](https://drpc.org/)               | Quỹ Kaia                        |
| ----------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------- | --------------------------------------- | ------------------------------- |
| **Dịch vụ lưu trữ**     | Được quản lý                                                                          | Được quản lý                                        | Được quản lý                                  | Được quản lý                            | Công cộng, do cộng đồng quản lý |
| **Yêu cầu có khóa API** | Đúng vậy                                                                              | Đúng vậy                                            | Đúng vậy                                      | Không, đối với các điểm cuối công khai  | Không                           |
| **Nỗ lực di cư**        | Thay đổi URL                                                                          | Thay đổi URL                                        | Thay đổi URL                                  | Thay đổi URL                            | Thay đổi URL                    |
| **Phù hợp nhất cho**    | Hầu hết các đợt di cư                                                                 | Các ứng dụng sản xuất cần một điểm cuối chuyên dụng | Các đội muốn có bộ công cụ Node Plus Faucet   | Khởi động nhanh nhất, không cần đăng ký | Phát triển và thử nghiệm        |

Các tính năng như lịch sử lưu trữ và các không gian tên `debug` / `trace` có thể khác nhau tùy theo nhà cung cấp và gói dịch vụ. Trước khi đưa ra quyết định, hãy tham khảo tài liệu chính thức của nhà cung cấp để xác định nhu cầu của khối lượng công việc của bạn — các liên kết trong tiêu đề bảng là nguồn thông tin chính thức cho từng trường hợp.

**Alchemy là lựa chọn thay thế được khuyến nghị** cho hầu hết các đội đang chuyển khỏi Ankr.

Để biết các URL điểm cuối và danh sách đầy đủ các nhà cung cấp RPC hỗ trợ Kaia, hãy tham khảo [Các điểm cuối JSON RPC công khai](./public-en.md). Hãy đăng ký với nhà cung cấp mà bạn chọn, sau đó thay thế URL Ankr trong ứng dụng của bạn bằng điểm cuối mà nhà cung cấp đó cung cấp cho bạn.

Bạn cũng có thể [chạy nút điểm cuối của riêng mình](../nodes/endpoint-node/endpoint-node.md) nếu bạn không muốn phụ thuộc vào nhà cung cấp dịch vụ lưu trữ nào cả.
