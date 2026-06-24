# Hướng Dẫn Kết Nối Form Với Google Sheets

Để form đăng ký lưu trực tiếp thông tin khách hàng vào Google Sheets, bạn hãy làm theo các bước siêu đơn giản sau đây:

## Bước 1: Tạo Google Sheets
1. Mở [Google Sheets](https://docs.google.com/spreadsheets).
2. Tạo một bảng tính mới với tên tùy ý (ví dụ: `Danh sách đăng ký Active Fox`).
3. Đặt tên 5 cột đầu tiên (Cột A đến E) lần lượt là: **Thời gian**, **Họ Tên**, **Số điện thoại**, **Khoá học**, **Ghi chú**.

## Bước 2: Viết mã Google Apps Script
1. Trên thanh công cụ của Google Sheets, chọn **Tiện ích mở rộng (Extensions)** > **Apps Script**.
2. Xóa hết mã có sẵn và dán toàn bộ đoạn mã dưới đây vào:

```javascript
// File code.gs
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Ghi dữ liệu vào sheet
    sheet.appendRow([
      data.timestamp || new Date(),
      data.name || "",
      data.phone || "",
      data.course || "",
      data.note || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "message": error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
```
3. Bấm biểu tượng **Lưu (Save)** phía trên.

## Bước 3: Triển khai thành Web App (Webhook)
1. Bấm nút **Triển khai (Deploy)** ở góc trên bên phải > Chọn **Lượt triển khai mới (New deployment)**.
2. Bấm vào biểu tượng bánh răng ⚙️ bên cạnh chữ "Chuyển loại (Select type)", chọn **Ứng dụng web (Web app)**.
3. Ở phần **Mô tả**, ghi "API Form Đăng Ký".
4. Ở phần **Ứng dụng web thực thi dưới dạng (Execute as)**: Chọn **Tôi (Me)**.
5. Ở phần **Những người có quyền truy cập (Who has access)**: **CỰC KỲ QUAN TRỌNG:** Chọn **Bất kỳ ai (Anyone)**.
6. Bấm nút **Triển khai (Deploy)**.
7. *Google sẽ yêu cầu bạn cấp quyền truy cập. Bấm "Cấp quyền truy cập", chọn tài khoản của bạn, sau đó bấm "Nâng cao" (Advanced) > "Đi tới dự án..." (Go to project) > "Cho phép" (Allow).*
8. Sao chép đoạn **URL của ứng dụng web**.

## Bước 4: Gắn URL vào Web
Quay lại nền tảng AI Studio này. Bạn mở "Settings" > Mở phần "Environment Variables" (Hoặc Secrets) và tạo 1 biến mới có tên:
`VITE_GOOGLE_SHEETS_WEBHOOK`
Dán URL bạn vừa copy được vào ô giá trị của biến này là xong! Form của bạn đã được kết nối trực tiếp với danh sách khách hàng Google Sheet.
