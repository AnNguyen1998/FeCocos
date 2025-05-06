Note
1. BigInt là gì?
- BigInt là một kiểu dữ liệu nguyên thủy mới trong JavaScript, được giới thiệu để giải quyết vấn đề về độ chính xác của kiểu Number khi làm việc với các số nguyên lớn hơn giới hạn an toàn của nó.
Đặc điểm chính của BigInt:
- Biểu diễn số nguyên có độ dài tùy ý: BigInt cho phép bạn biểu diễn và thao tác với các số nguyên lớn hơn nhiều so với giới hạn mà kiểu Number có thể xử lý một cách chính xác.
- Không phải là Number: BigInt là một kiểu dữ liệu riêng biệt và không thể trộn lẫn trực tiếp với các giá trị Number trong các phép toán thông thường. Bạn cần phải chuyển đổi chúng sang cùng một kiểu trước khi thực hiện phép toán.
- Tạo BigInt: Có hai cách để tạo một giá trị BigInt:
   Thêm hậu tố n vào cuối một số nguyên: Ví dụ: 123n, -456n.
   Sử dụng hàm BigInt(): Ví dụ: BigInt(789), BigInt("9876543210"). Lưu ý rằng khi truyền một chuỗi số vào hàm BigInt(), chuỗi đó phải biểu diễn một số nguyên hợp lệ.
- Các phép toán: Hầu hết các toán tử số học tiêu chuẩn (+, -, *, %, **) và toán tử bitwise (&, |, ^, <<, >>) đều hoạt động với BigInt. Tuy nhiên, phép chia (/) giữa hai BigInt sẽ trả về kết quả là một số nguyên (phần thập phân bị bỏ qua).
- So sánh: Bạn có thể so sánh các giá trị BigInt với nhau hoặc với các giá trị Number bằng các toán tử so sánh thông thường (<, >, <=, >=, ==, !=). Tuy nhiên, cần lưu ý rằng 10 == 10n trả về true (so sánh giá trị), nhưng 10 === 10n trả về false (so sánh cả giá trị và kiểu dữ liệu).
- Không sử dụng với Math: Các phương thức trong đối tượng Math (ví dụ: Math.sqrt(), Math.floor(), Math.random()) không được thiết kế để làm việc với BigInt.
- Chuyển đổi: Việc chuyển đổi giữa BigInt và Number có thể dẫn đến mất độ chính xác nếu giá trị BigInt quá lớn để biểu diễn dưới dạng Number.
Ứng dụng của BigInt:
- Xử lý số lớn trong các ứng dụng tài chính, khoa học: Khi cần độ chính xác tuyệt đối với các con số vượt quá khả năng của Number.
- Tính toán liên quan đến mật mã học: Một số thuật toán mật mã sử dụng các số nguyên rất lớn.
- ID duy nhất trong hệ thống phân tán: Tạo ra các định danh lớn, đảm bảo tính duy nhất.
- Game development: Xử lý các giá trị thời gian, điểm số lớn.
2. Computers do not store real numbers (such as 0.1, 3.14) exactly as we writ
them in the decimal system. Instead, they use the binary system and
a standard called IEEE 754 to represent these numbers.
- Hệ thập phân quen thuộc của chúng ta sử dụng các lũy thừa của 10 (ví dụ như 1, 10, 100, 0.1, 0.01, v.v.). Mặt khác, hệ nhị phân lại sử dụng các lũy thừa của 2 (ví dụ như 1, 2, 4, 8, 0.5, 0.25, v.v.).
- Rất nhiều phân số thập phân có biểu diễn hữu hạn (ví dụ như 0.1) lại không có biểu diễn hữu hạn trong hệ nhị phân.
  có biểu diễn thập phân vô hạn tuần hoàn (0.333...), một số số thập phân trông có vẻ đơn giản lại trở thành các "phân số" lặp lại trong hệ nhị phân.
- Đây là lúc tiêu chuẩn IEEE 754 xuất hiện. Nó là một tiêu chuẩn kỹ thuật định nghĩa cách các số dấu phẩy động (số có dấu chấm thập phân) nên được biểu diễn và xử lý trong máy tính. Tiêu chuẩn này cung cấp một cách nhất quán để các hệ thống máy tính khác nhau có thể làm việc với những con số này.
- Đây là một cái nhìn đơn giản hóa về cách IEEE 754 hoạt động đối với một số dấu phẩy động có độ chính xác đơn (32-bit):
  Bit dấu (1 bit): Bit này chỉ ra liệu số đó là dương (0) hay âm (1).
  Số mũ (8 bit): Phần này biểu diễn độ lớn của số (nói một cách gần đúng là vị trí của dấu chấm thập phân). Nó được lưu trữ với một độ lệch để cho phép cả số mũ dương và âm.
  Phần định trị (23 bit): Còn được gọi là phần hữu số, phần này lưu trữ các chữ số có nghĩa của số. Có một số 1 "ngầm định" ở đầu (trừ khi số đó rất nhỏ), điều này cho chúng ta thêm một bit độ chính xác.
- IEEE 754 là một bộ quy tắc toàn diện đảm bảo tính nhất quán và độ tin cậy trong các phép tính số thực trên hầu hết các hệ thống máy tính hiện đại. Nó giúp các nhà phát triển phần mềm viết các chương trình có thể cho ra kết quả tương tự nhau trên các nền tảng phần cứng khác nhau khi làm việc với số thực.
3. Destructure Object trong Object ra gì ? Có còn là Freference type không ?
- Ra 1 object mới chứa biến một hoăc nhiều biến mới.
- Vẫn còn là Freference type.
- Destructuring chỉ là một cách để tạo ra các biến mới và gán giá trị (hoặc tham chiếu) từ đối tượng gốc cho chúng. Nó không thay đổi bản chất kiểu dữ liệu của giá trị đó.