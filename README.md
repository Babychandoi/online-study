# 🎓 Hệ Thống Quản Lý Khóa Học Online

Một dự án quản lý khóa học trực tuyến đầy đủ tính năng, được xây dựng với Node.js, Express và vanilla JavaScript.

## ✨ Tính năng

- **Quản lý khóa học**: Thêm, xem, cập nhật và xóa khóa học
- **Quản lý sinh viên**: Quản lý thông tin sinh viên và hồ sơ
- **Đăng ký khóa học**: Sinh viên có thể đăng ký vào các khóa học
- **Theo dõi trạng thái**: Theo dõi trạng thái đăng ký (Đang học, Hoàn thành, Đã bỏ học)
- **API RESTful**: API backend đầy đủ cho tất cả các hoạt động
- **Giao diện người dùng hiện đại**: Giao diện web responsive và thân thiện

## 🚀 Bắt đầu

### Yêu cầu

- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

### Cài đặt

1. Clone repository:
```bash
git clone https://github.com/Babychandoi/online-study.git
cd online-study
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Khởi động server:
```bash
npm start
```

4. Mở trình duyệt và truy cập:
```
http://localhost:3000
```

## 📁 Cấu trúc dự án

```
online-study/
├── src/
│   ├── models/          # Data models
│   │   ├── Course.js
│   │   ├── Student.js
│   │   ├── Enrollment.js
│   │   └── database.js
│   ├── controllers/     # Business logic
│   │   ├── courseController.js
│   │   ├── studentController.js
│   │   └── enrollmentController.js
│   ├── routes/          # API routes
│   │   ├── courseRoutes.js
│   │   ├── studentRoutes.js
│   │   └── enrollmentRoutes.js
│   └── server.js        # Main application file
├── public/
│   ├── css/
│   │   └── style.css    # Styles
│   ├── js/
│   │   └── app.js       # Frontend JavaScript
│   └── index.html       # Main HTML page
├── package.json
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Khóa học

- `GET /api/courses` - Lấy tất cả khóa học
- `GET /api/courses/:id` - Lấy khóa học theo ID
- `POST /api/courses` - Tạo khóa học mới
- `PUT /api/courses/:id` - Cập nhật khóa học
- `DELETE /api/courses/:id` - Xóa khóa học

### Sinh viên

- `GET /api/students` - Lấy tất cả sinh viên
- `GET /api/students/:id` - Lấy sinh viên theo ID
- `POST /api/students` - Tạo sinh viên mới
- `PUT /api/students/:id` - Cập nhật sinh viên
- `DELETE /api/students/:id` - Xóa sinh viên

### Đăng ký

- `GET /api/enrollments` - Lấy tất cả đăng ký
- `GET /api/enrollments/:id` - Lấy đăng ký theo ID
- `POST /api/enrollments` - Tạo đăng ký mới
- `PUT /api/enrollments/:id/status` - Cập nhật trạng thái đăng ký
- `GET /api/enrollments/student/:studentId` - Lấy đăng ký theo sinh viên
- `GET /api/enrollments/course/:courseId` - Lấy đăng ký theo khóa học

## 📝 Ví dụ sử dụng API

### Tạo khóa học mới

```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lập trình Web",
    "description": "Học lập trình web từ cơ bản đến nâng cao",
    "instructor": "Nguyễn Văn A",
    "duration": 40,
    "maxStudents": 30
  }'
```

### Tạo sinh viên mới

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Trần Thị B",
    "email": "tranthib@example.com",
    "phone": "0123456789"
  }'
```

### Đăng ký khóa học

```bash
curl -X POST http://localhost:3000/api/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "courseId": 1
  }'
```

## 🛠️ Công nghệ sử dụng

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: In-memory (có thể mở rộng sang MongoDB, PostgreSQL, etc.)
- **API**: RESTful API

## 📦 Scripts

- `npm start` - Khởi động server production
- `npm run dev` - Khởi động server development

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo pull request hoặc mở issue.

## 📄 License

ISC

## 👨‍💻 Tác giả

Được phát triển như một dự án quản lý khóa học học tập.
