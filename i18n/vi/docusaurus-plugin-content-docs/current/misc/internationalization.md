# Internationalization

Kaia Docs hướng tới mục tiêu tiếp cận được với đối tượng khán giả toàn cầu. Chúng tôi đánh giá cao những đóng góp của cộng đồng để dịch và cải thiện tài liệu của chúng tôi.

## Ngôn ngữ có sẵn

Kaia Docs hiện có sẵn bằng các ngôn ngữ sau:

- [English](https://docs.kaia.io/)
- [한국어](https://docs.kaia.io/ko/)
- [日本語](https://docs.kaia.io/ja/)
- [简体中文](https://docs.kaia.io/zh-CN/)
- [繁體中文](https://docs.kaia.io/zh-TW/)
- [Tiếng Việt](https://docs.kaia.io/vi/)

## Cách thức hoạt động của Kaia Docs Translation

- **Tiếng Anh** là ngôn ngữ nguồn, được quản lý trong [GitHub](https://github.com/kaiachain/kaia-docs).
- Khi nội dung tiếng Anh được cập nhật, những thay đổi sẽ được đồng bộ hóa với [Crowdin](https://crowdin.com/project/kaia-docs), nền tảng quản lý bản dịch của chúng tôi.
- **Dịch máy (MT)** được sử dụng cho một số ngôn ngữ (tiếng Nhật, tiếng Trung giản thể và phồn thể, tiếng Hàn và tiếng Việt) để cung cấp quyền truy cập ngay lập tức vào nội dung mới.
- **Đánh giá thủ công và cải thiện**: Những người đóng góp và người kiểm duyệt cộng đồng sẽ đánh giá và cải thiện bản dịch trong Crowdin.
- **Cập nhật tự động**: Sau khi bản dịch được chấp thuận, Crowdin sẽ tạo yêu cầu kéo (PR) tới kho lưu trữ GitHub của Kaia Docs. Khi được hợp nhất, trang tài liệu đa ngôn ngữ sẽ được cập nhật.

![Quy trình biên dịch tài liệu Kaia](/img/misc/translation-workflow.svg)

## Cách đóng góp bản dịch qua Crowdin

Mọi bản dịch cho Kaia Docs đều được quản lý thông qua Crowdin, một nền tảng dịch thuật cộng tác.

1. **Truy cập [dự án Kaia-Docs trên Crowdin](https://crowdin.com/project/kaia-docs).**
2. **Tạo tài khoản Crowdin** (hoặc đăng nhập nếu bạn đã có tài khoản).
3. **Chọn ngôn ngữ** bạn muốn đóng góp từ trang dự án. Nếu ngôn ngữ của bạn không có trong danh sách, bạn có thể yêu cầu ngôn ngữ mới bằng cách mở một vấn đề trên GitHub sử dụng nhãn `content-translation`.
4. **Tham gia nhóm dịch thuật** cho ngôn ngữ bạn chọn. Yêu cầu của bạn có thể cần được người quản lý dự án chấp thuận.
5. **Chọn tệp** bạn muốn dịch hoặc xem lại.
6. **Bắt đầu dịch:** Sử dụng trình soạn thảo trực tuyến Crowdin.
   - Nhập bản dịch mới cho chuỗi nguồn.
   - Đề xuất cải tiến bản dịch hiện có.
   - Bỏ phiếu cho những đề xuất của người khác.
   - Hãy để lại bình luận nếu bạn có thắc mắc hoặc muốn thảo luận về chuỗi cụ thể.
7. **Danh sách kiểm tra QA nhanh (Người đánh giá):**
   - ✔️ Để lại nội dung không thể dịch như đoạn mã, lệnh, tên biến và tên thương hiệu bằng tiếng Anh (Sử dụng tính năng “Ẩn phần hiển thị” trong Crowdin).
   - ✔️ Tuân thủ Thuật ngữ Kaia bằng cách nhấp vào tab "Điều khoản" trong trình chỉnh sửa.
   - ✔️ Tập trung vào các mục menu, tiêu đề và tiêu đề để rõ ràng hơn.

![Giao diện biên tập Crowdin](/img/misc/crowdin-editor.png)

Để biết cách sử dụng trình chỉnh sửa chi tiết, hãy tham khảo [tài liệu chính thức của Crowdin](https://support.crowdin.com/online-editor/).

## Vai trò dịch thuật

- **Người dịch**: Bất kỳ ai tham gia dự án trên Crowdin đều có thể đề xuất bản dịch cho các chuỗi trong tệp. Tập trung vào độ chính xác và rõ ràng.
- **Người đánh giá (QA)**: Các dịch giả có kinh nghiệm có thể được yêu cầu thực hiện Đảm bảo chất lượng ngôn ngữ (QA) đối với các bản dịch được đề xuất. Điều này bao gồm việc kiểm tra tính nhất quán, tuân thủ thuật ngữ, tính rõ ràng và xử lý chính xác các thành phần không thể dịch (như đoạn mã). Người đánh giá tập trung vào chất lượng ngôn ngữ nhưng không thực hiện bước phê duyệt cuối cùng.
- **Người điều hành**: Người duy trì dự án xem xét phản hồi về QA và đưa ra phê duyệt cuối cùng cho bản dịch trong Crowdin. Các bản dịch được chấp thuận cũng góp phần vào Bộ nhớ dịch thuật được Crowdin sử dụng.

## Hiểu về các tập tin trong Crowdin

Khi bạn duyệt dự án Kaia Docs trong Crowdin, bạn sẽ thấy các tệp và thư mục khác nhau được sắp xếp để dịch. Hiểu được nội dung của từng mục sẽ giúp bạn biết bản dịch của mình sẽ xuất hiện ở đâu trên trang Kaia Docs trực tiếp:

![Cấu trúc tệp Crowdin](/img/misc/crowdin-dashboard.png)

- **`docs/`**: Thư mục này chứa nội dung chính của các trang tài liệu Kaia, được viết bằng Markdown (tệp `.md` hoặc `.mdx`). Việc dịch các tập tin ở đây sẽ trực tiếp dịch các bài viết, hướng dẫn và bài hướng dẫn mà bạn thấy trên khu vực nội dung chính của trang web.

- **`i18n/en/code.json`**: Bao gồm các chuỗi văn bản được nhúng trực tiếp trong mã giao diện người dùng (UI) của trang web, thường sử dụng các thành phần hoặc hàm dịch cụ thể (như `<Translate>`). Điều này bao gồm nhãn, nút, thông báo trong các tính năng tùy chỉnh và các phần chủ đề của trang web không được các tệp cụ thể khác đề cập đến. Bản dịch của bạn ở đây sẽ xuất hiện trên khắp các thành phần giao diện của trang web.

- **`i18n/en/docusaurus-plugin-content-docs/current.json`**: Lưu trữ bản dịch cho các nhãn liên quan đến cấu trúc tài liệu. Điều này chủ yếu bao gồm tên danh mục thanh bên và các thành phần điều hướng khác được hệ thống tài liệu tự động tạo ra. Việc dịch những nội dung này sẽ đảm bảo người dùng có thể điều hướng các phần tài liệu bằng ngôn ngữ của họ.

- **`i18n/en/docusaurus-theme-classic/footer.json`**: Bao gồm tất cả văn bản có thể dịch được tìm thấy trong phần chân trang của trang web ở cuối mỗi trang. Thông thường, nội dung này bao gồm thông báo bản quyền, liên kết và văn bản cụ thể ở phần chân trang.

- **`i18n/en/docusaurus-theme-classic/navbar.json`**: Bao gồm tất cả văn bản có thể dịch được tìm thấy trong thanh điều hướng chính của trang web ở đầu trang. Bao gồm nhãn cho liên kết, menu thả xuống và các thành phần điều hướng khác.

## Chính sách dịch máy (MT)

Để cung cấp quyền truy cập nhanh hơn vào nội dung mới và cập nhật cho người dùng toàn cầu, chúng tôi sử dụng Dịch máy (MT) cho một số ngôn ngữ nhất định, như được chỉ ra trong danh sách trên.

- **Cơ chế hoạt động:** Khi tài liệu tiếng Anh được cập nhật, MT sẽ tự động cung cấp bản dịch ban đầu. Sau khi người bảo trì xem xét, thông tin này sẽ được đồng bộ trở lại trang web Kaia Docs.
- **Tuyên bố miễn trừ trách nhiệm:** Các trang được dịch chủ yếu bởi MT sẽ hiển thị thông báo miễn trừ trách nhiệm, thông báo cho người dùng rằng nội dung có thể chứa thông tin không chính xác và mời họ giúp cải thiện thông qua Crowdin.
- **Sự đóng góp của bạn rất quan trọng:** Ngay cả với MT, sự đóng góp của cộng đồng cũng rất quan trọng để cải thiện độ chính xác, ngữ cảnh và cách diễn đạt tự nhiên.

## Tác động của việc cập nhật nội dung nguồn

Tài liệu của chúng tôi liên tục được cải tiến. Khi nội dung tiếng Anh gốc trong kho lưu trữ GitHub được cập nhật, các chuỗi tương ứng trong Crowdin cũng được cập nhật.

- **Đặt lại bản dịch:** Quá trình đồng bộ hóa này có nghĩa là các bản dịch hiện có cho _chuỗi đã sửa đổi_ sẽ được **đặt lại** (sang văn bản tiếng Anh mới hoặc Bản dịch máy mới).
- **Tại sao?** Điều này đảm bảo rằng tài liệu được dịch phản ánh chính xác cấu trúc và thông tin cốt lõi của nguồn tiếng Anh mới nhất.
- **Giá trị đóng góp:** Mặc dù từng chuỗi có thể được đặt lại, nhưng đóng góp của bạn vẫn rất có giá trị trong việc đảm bảo tính chính xác và chất lượng của tài liệu _tại thời điểm đó_ và giúp tinh chỉnh bản địa hóa tổng thể.

## Thảo luận & Cộng đồng

- Tham gia [Crowdin Discussions](https://crowdin.com/project/kaia-docs/discussions) hoặc [GitHub Discussions](https://github.com/kaiachain/kaia-docs/discussions) của dự án để kết nối với những người đóng góp và bảo trì khác.

## Quy tắc ứng xử

Hãy tôn trọng tất cả thành viên cộng đồng. Quản lý dự án có quyền xóa nội dung gây khó chịu và thu hồi quyền đóng góp nếu cần thiết. Vui lòng tuân thủ [Quy tắc ứng xử](https://github.com/kaiachain/kaia-docs/blob/main/code-of-conduct.md) của chúng tôi.