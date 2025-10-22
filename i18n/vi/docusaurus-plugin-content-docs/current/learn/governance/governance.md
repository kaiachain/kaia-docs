# Quản trị Kaia

Tài liệu này mô tả khung quản trị tổng thể của Kaia, bao gồm các thành phần, cấu trúc và quy trình hoạt động, tiêu chí tham gia, cơ chế thưởng, cũng như các thủ tục tiếp nhận và chấm dứt hợp tác.

## Tổng quan

Kaia Governance bao gồm ba thành phần chính:

- **Cộng đồng KAIA:** Các thành viên cộng đồng, bao gồm cả những người nắm giữ token KAIA, có quyền tham gia vào quá trình quản trị trên chuỗi và các quyết định quan trọng. Nó cũng bao gồm các nhà phát triển, nhà cung cấp dịch vụ và người dùng đóng góp vào hệ sinh thái tổng thể, đóng vai trò quan trọng không chỉ trong việc quản trị mà còn trong sự phát triển liên tục của hệ sinh thái.
- **Hội đồng Quản trị Kaia (GC):** GC đại diện cho cộng đồng và tham gia vào các quyết định quản trị thông qua cả token được nắm giữ trực tiếp và quyền biểu quyết được ủy quyền từ các thành viên cộng đồng.
- **Quỹ Kaia:** Quỹ hỗ trợ quá trình ra quyết định của Hội đồng Quản trị (GC) bằng cách tận dụng chuyên môn về công nghệ blockchain và Web3, đồng thời thực thi các quyết định được Hội đồng Quản trị (GC) đưa ra.

Kaia GC là cơ quan chính chịu trách nhiệm về việc ra quyết định chiến lược trong hệ sinh thái Kaia. Nó bao gồm một tập hợp đa dạng các thực thể, bao gồm các công ty truyền thống, DAOs, các nhóm phát triển giao thức và các nhà xây dựng cộng đồng.

Cấu trúc của GC được thiết kế theo mô hình phi tập trung để đảm bảo quản trị tập trung vào lợi ích của các bên liên quan. Quyền biểu quyết trong GC được xác định dựa trên số lượng KAIA đã được staking và ủy quyền, với một giới hạn tối đa để ngăn chặn việc độc quyền bởi một thực thể duy nhất. Thiết kế này đảm bảo hoạt động minh bạch và hiệu quả đồng thời đại diện cho lợi ích chung của cộng đồng.

**Các trách nhiệm chính của GC bao gồm:**

- **Chính sách kỹ thuật:** Giới thiệu công nghệ mới, bổ sung tính năng mới và nâng cấp hạ tầng blockchain.
- **Chính sách kinh tế:** Phát hành và phân phối KAIA, điều chỉnh phí giao dịch và lập ngân sách hệ sinh thái.
- **Quy tắc hoạt động:** Thiết lập và sửa đổi các quy trình quản trị và bỏ phiếu, cũng như xác định quyền và trách nhiệm của các bên tham gia quản trị.

Các đề xuất quản trị được nộp thông qua [Kaia Governance Forum](https://govforum.kaia.io/), nơi chúng được thảo luận công khai trước khi tiến hành bỏ phiếu trên chuỗi. Mô hình GC được thiết kế để cho phép tất cả các chủ sở hữu KAIA tham gia và ảnh hưởng đến hệ sinh thái Kaia. Khi hệ sinh thái phát triển, Ban Quản lý (GC) tiếp tục điều chỉnh cấu trúc và hoạt động của mình cho phù hợp.

## Quản trị trên chuỗi

Quản trị trên chuỗi (On-chain governance) tự động hóa và thực thi một cách minh bạch quá trình ra quyết định giữa các bên liên quan thông qua hợp đồng thông minh. Phương pháp này mang lại nhiều lợi ích:

- **Tính minh bạch:** Tất cả các hoạt động quản trị đều được ghi lại trên blockchain và có thể được xác minh bởi bất kỳ ai.
- **Tính toàn vẹn:** Các phiếu bầu được xử lý bằng hợp đồng thông minh, đảm bảo không thể bị thay đổi hoặc gian lận.
- **Không thể chối bỏ:** Các phiếu bầu đã ký được ghi lại vĩnh viễn trên chuỗi khối và không thể bị phủ nhận.
- **Khả năng thi hành:** Kết quả được thực thi tự động, đảm bảo rằng các quyết định không thể bị phớt lờ.

Blockchain Kaia triển khai hệ thống quản trị trên chuỗi với các đặc điểm sau. Quyền biểu quyết tỷ lệ thuận với số lượng KAIA được staking, với giới hạn trên được thiết lập để ngăn chặn sự tập trung quá mức. Các chủ sở hữu KAIA cũng có thể ủy quyền quyền biểu quyết của mình cho các thành viên GC.

### Tính toán quyền biểu quyết

- Quyền biểu quyết của GC [quyền biểu quyết](https://square.kaia.io/Proposal?tab=LEADERBOARD) tỷ lệ thuận với số lượng KAIA được staking (1 phiếu bầu cho mỗi 5 triệu KAIA).
- Thông qua cơ chế ủy quyền công khai, các chủ sở hữu KAIA không phải là thành viên GC có thể ủy quyền quyền biểu quyết của mình cho các thành viên GC.
  - Các token được ủy quyền được gộp chung với số token mà GC sở hữu, và quyền biểu quyết được tính toán theo cùng tiêu chuẩn (1 phiếu bầu cho mỗi 5 triệu KAIA).
- Một giới hạn được đặt ra để ngăn chặn bất kỳ thực thể nào chiếm ưu thế trong quyền biểu quyết.
  - **Số phiếu tối đa:** Tổng số thành viên GC hợp lệ - 1 (ví dụ: nếu có 40 thành viên hợp lệ, giới hạn là 39 phiếu).

### Quy trình quản trị Kaia

1. **Thảo luận:** Bất kỳ ai cũng có thể gửi đề xuất thông qua diễn đàn quản trị (<https://govforum.kaia.io>).
2. **Đăng ký và bỏ phiếu trên chuỗi:** Khi một đề xuất nhận được ít nhất một phản hồi tích cực từ một thành viên GC trên diễn đàn quản trị, nó sẽ được đăng ký và mở ra để bỏ phiếu.
3. **Thực hiện:** Các đề xuất được phê duyệt sẽ được thực hiện.

![](/img/misc/gov-process.jpg)

Các đề xuất được đăng ký trên chuỗi khối sẽ trải qua nhiều trạng thái khác nhau cho đến khi quá trình bỏ phiếu kết thúc:

- **Đang chờ xử lý:** Sau khi đăng ký, đang chờ bắt đầu quá trình bỏ phiếu.
- **Hoạt động:** Việc bỏ phiếu đang diễn ra.
- **Đã thông qua:** Được thông qua bởi đa số phiếu và sự đồng thuận của đa số thành viên.
- **Thất bại:** Không nhận được sự chấp thuận đủ.
- **Đang chờ xử lý:** Đã được phê duyệt nhưng đang chờ thực hiện.
- **Đã thực hiện:** Đề xuất đã được thực hiện hoàn toàn.

![](/img/misc/gov-process-2.png)

Thời gian bỏ phiếu tiêu chuẩn là bảy ngày, tuy nhiên một số đề xuất có thể yêu cầu các bước bổ sung.  
Ví dụ, các đề xuất chỉ chứa văn bản ([ví dụ](https://square.kaia.io/Proposal/Detail?id=31)) sẽ kết thúc sau khi quá trình bỏ phiếu kết thúc. Tuy nhiên, các đề xuất thay đổi thông số ([ví dụ](https://square.kaia.io/Proposal/Detail?id=26)) không chỉ yêu cầu sự chấp thuận mà còn phải thực hiện một giao dịch liên quan sau một khoảng thời gian trì hoãn từ 2 đến 16 ngày.

Để biết thêm chi tiết về việc thay đổi thông số, vui lòng tham khảo [KIP-81: Giới thiệu về bỏ phiếu quản trị trên chuỗi](https://kips.kaia.io/KIPs/kip-81). Trong trường hợp khẩn cấp, thời gian này có thể được rút ngắn.

### Số lượng tối thiểu và Tiêu chí phê duyệt

- **Số lượng tối thiểu cần thiết:** Hoặc Số lượng tối thiểu theo số lượng (sự tham gia của ít nhất một phần ba số thành viên Hội đồng Quản trị) hoặc Số lượng tối thiểu theo quyền biểu quyết (được biểu quyết bởi ít nhất một phần ba tổng số quyền biểu quyết).
- **Phê duyệt:** Phần lớn số phiếu tham gia phải đồng ý.
  - **Không bỏ phiếu:** được tính là tham gia bỏ phiếu, nhưng không được tính vào số phiếu ủng hộ và phản đối.

### Phạt vắng mặt

Chính sách xử phạt vắng mặt đã được ban hành và phê duyệt theo [KGP-31: Chính sách quản trị khuyến khích tham gia bỏ phiếu GC](https://govforum.kaia.io/t/kgp-31-governance-policy-to-encourage-gc-voting-participation/808). Thành viên nào không tham gia vào **ba cuộc bỏ phiếu liên tiếp** sẽ bị **loại khỏi phần thưởng khối trong vòng bảy ngày**.

## Chứng chỉ, Trách nhiệm và Phần thưởng của GC

### Chứng chỉ

- Số lượng tối thiểu **5.000.000 KAIA được staking**
- Vận hành **nút Kaia** (tham khảo [yêu cầu hệ thống](https://docs.kaia.io/nodes/core-cell/system-requirements/))
- Sự tham gia tích cực vào quản trị
  - Tham gia thảo luận và bỏ phiếu
  - Sự tham dự các cuộc họp thường kỳ và đặc biệt

### Trách nhiệm

#### Hoạt động của nút mạng nhằm đảm bảo an ninh và ổn định của mạng.

- Hoạt động của nút  
  Duy trì hoạt động liên tục và an toàn của nút để hỗ trợ sự đồng thuận của mạng với độ khả dụng cao và thời gian ngừng hoạt động tối thiểu.
- Giám sát & Cảnh báo  
  Giám sát các mối đe dọa hoặc sự cố mạng và phản hồi kịp thời để đảm bảo tính ổn định của hệ sinh thái.

#### Sự tham gia vào quản trị và giám sát của KEF

- Các thành viên của GC xem xét và quyết định về các đề xuất từ GC hoặc cộng đồng rộng lớn hơn. Mặc dù chương trình nghị sự của GC không bao gồm các chi tiết kỹ thuật cụ thể hoặc phương pháp triển khai, nó vẫn bao gồm định hướng, quyết định chính sách và tokenomics. Các GCs phải tích cực tham gia vào quá trình bỏ phiếu quản trị trên chuỗi, bao gồm việc nộp đề xuất, thảo luận về chúng và thực hiện kết quả bỏ phiếu.
  - Các cuộc họp của Ban Quản trị (GC) được tổ chức vào **thứ Tư thứ ba của mỗi tháng** và có thể được hoãn nếu không có nội dung nào trong chương trình nghị sự.
  - Các cuộc họp đặc biệt có thể được triệu tập để giải quyết các vấn đề khẩn cấp.
- **Quỹ Hệ sinh thái Kaia (KEF)** hỗ trợ tính bền vững của hệ sinh thái thông qua việc nâng cấp hạ tầng, hỗ trợ nhà phát triển và đầu tư gián tiếp. Ban Điều hành (GC) chịu trách nhiệm **phê duyệt ngân sách KEF** và **giám sát việc thực hiện quỹ**.

#### Sự tham gia của cộng đồng & Minh bạch

- Đại diện cho lợi ích của các bên liên quan đa dạng, duy trì tính liêm chính, ngăn chặn xung đột lợi ích và hành động vì lợi ích tốt nhất của hệ sinh thái Kaia.
- Bảo đảm các kênh thông tin minh bạch và kịp thời, đồng thời công bố tóm tắt cuộc họp và các quyết định một cách rõ ràng.
- Khuyến khích sự tham gia tích cực của các chủ sở hữu token KAIA thông qua việc ủy quyền.

### Phần thưởng

Cơ cấu thưởng hiện tại đã được đề xuất và phê duyệt theo [KIP-82](https://kips.kaia.io/KIPs/kip-82). Nó bao gồm **Phần thưởng cho người đề xuất** và **Phần thưởng staking**.

- **Phần thưởng cho người đề xuất:**  
  Tất cả thành viên GC đều đặt cược ít nhất 5 triệu KAIA, vận hành các nút CN/PN và tham gia bình đẳng vào quá trình sản xuất khối. Mỗi thành viên GC nhận được **0.96 KAIA cho mỗi khối được đề xuất**.
- **Phần thưởng staking:**  
  Các thành viên GC staking hơn 5 triệu KAIA sẽ nhận được phần thưởng tương ứng với số KAIA staking vượt quá 5 triệu. Từ **3.84 KAIA được phân phối cho mỗi khối**, phần thưởng được phân bổ dựa trên tỷ lệ phần trăm KAIA đã stake của từng thành viên so với tổng số KAIA đã stake.

## Quy trình onboarding

Quy trình onboarding bao gồm các giai đoạn sau:

1. **Thể hiện sự quan tâm:**  
   Các ứng viên thể hiện sự quan tâm tham gia vào GC thông qua [Diễn đàn Quản trị](https://govforum.kaia.io/) và [yêu cầu lời mời](https://docs.google.com/forms/d/e/1FAIpQLSdj-N63AAAWhzPh8GIJQGOUrKk_ppWtzDwUyflq532IdlQ3Jw/viewform) đến nền tảng giao tiếp Kaia.
2. **Khảo sát trước khi nhập môn và phân phối công cụ:**  
   Ứng viên hoàn thành một khảo sát trước khi nhập môn [khảo sát](https://docs.google.com/forms/d/1o1HUe3SNLRI_txqymSICGoP48Lq71HEz0PxIZZBynNo/preview) để đánh giá kinh nghiệm về hoạt động quản trị và khả năng vận hành. Quỹ cung cấp **Klaytool** và các hướng dẫn liên quan cho việc quản lý nút và ủy quyền công khai.
3. **Quá trình triển khai mạng riêng/Testnet/Mainnet:**  
   Quá trình triển khai bắt đầu từ môi trường mạng riêng và Testnet trước khi chuyển sang Mainnet. Quy trình này thường mất khoảng **ba tuần**, với lịch trình chi tiết được điều chỉnh theo nhu cầu.
4. **Xác nhận cuối cùng và thông báo:**  
   Sau khi hoàn thành, ứng viên chính thức trở thành thành viên của GC. Tình trạng onboarding có thể được xác minh trên [Kaia Square](https://square.kaia.io/GC?tab=HISTORY), và việc gia nhập sẽ được thông báo qua các kênh quản trị, với quyền biểu quyết được kích hoạt.

## Quy trình chấm dứt hợp đồng lao động

Quy trình ngừng hợp tác đảm bảo tính ổn định, tính toàn vẹn và tính minh bạch của mạng lưới đối với cộng đồng. Quy định này áp dụng trong trường hợp một thành viên **tự nguyện từ chức**, **bị sa thải do vi phạm kỷ luật** hoặc **không đáp ứng các yêu cầu tham gia**. Nếu nút không hoạt động đúng cách, điều này có thể dẫn đến các hình phạt hoặc **buộc ngừng hoạt động**.

**Quy trình chấm dứt hợp đồng:**

1. **Thông báo về việc từ chức hoặc sa thải:**  
   Khi một thành viên Hội đồng Quản trị (GC) thông báo cho Quỹ về việc từ chức, Quỹ sẽ đăng thông báo trên [Diễn đàn Quản trị](https://govforum.kaia.io/) và khởi động quy trình chấm dứt hợp đồng chính thức.
2. **Xử lý qua Kaia Square:**  
   Một quản trị viên của [Kaia Square](http://square.kaia.io) sẽ chỉ định ngày từ chức, vô hiệu hóa vị trí GC của thành viên.
3. **Kiểm tra tính hợp lệ, Danh bạ địa chỉ và Xóa BLS:**

- Các nhà điều hành nút nền tảng loại bỏ thành viên khỏi danh sách Validator.
- Đội ngũ Tài chính xóa hồ sơ của GC khỏi Sổ địa chỉ thông qua Quản lý Token (TM).
- Đội ngũ Core đã xóa khóa BLS của GC.

4. **Tắt nút và thông báo công khai:**  
   Sau khi thực hiện các bước trên, nút của thành viên có thể được tắt an toàn. Việc chấm dứt hợp đồng được công bố công khai thông qua Diễn đàn Quản trị và các kênh thông tin chính thức.