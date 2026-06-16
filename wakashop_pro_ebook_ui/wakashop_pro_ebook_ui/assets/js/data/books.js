const BOOKS = [
  {
    id: 1,
    title: "Quy tắc kỷ luật tự thân",
    author: "Hoàng Nguyễn",
    category: "Phát triển bản thân",
    type: "member",
    badge: "Hội viên",
    coverClass: "cover--green",
    coverTitle: "Quy tắc kỷ luật tự thân",
    rating: 4.8,
    reads: "12.4K",
    progress: 72,
    description: "Ebook giúp người đọc xây dựng thói quen, quản lý thời gian và duy trì kỷ luật cá nhân trong học tập, công việc và cuộc sống.",
    chapters: ["Thói quen nhỏ", "Kỷ luật cá nhân", "Tập trung sâu", "Duy trì động lực", "Tổng kết hành trình"]
  },
  {
    id: 2,
    title: "Phản biện để bứt phá",
    author: "Sarah An",
    category: "Kỹ năng tư duy",
    type: "vip",
    badge: "49.000đ",
    coverClass: "cover--blue",
    coverTitle: "Phản biện để bứt phá",
    rating: 4.7,
    reads: "8.9K",
    progress: 40,
    description: "Sách về tư duy phản biện, cách đặt câu hỏi, nhận diện bẫy lập luận và ra quyết định hiệu quả hơn.",
    chapters: ["Tư duy phản biện", "Bẫy nhận thức", "Lập luận logic", "Ra quyết định", "Thực hành phản biện"]
  },
  {
    id: 3,
    title: "Bức chân dung của Dorian Gray",
    author: "Oscar Wilde",
    category: "Văn học kinh điển",
    type: "member",
    badge: "Hội viên",
    coverClass: "cover--black",
    coverTitle: "Dorian Gray",
    rating: 4.9,
    reads: "21.1K",
    progress: 15,
    description: "Tác phẩm văn học kinh điển được trình bày bằng giao diện đọc tối giản, phù hợp cho ebook dài chương.",
    chapters: ["Bức tranh", "Lời ước", "Sự thay đổi", "Bóng tối", "Kết cục"]
  },
  {
    id: 4,
    title: "Thực hành Manifest",
    author: "Trí Nguyễn Minh",
    category: "Lối sống",
    type: "vip",
    badge: "49.000đ",
    coverClass: "cover--purple",
    coverTitle: "Thực hành Manifest",
    rating: 4.6,
    reads: "7.2K",
    progress: 55,
    description: "Ebook hướng dẫn lập mục tiêu, viết nhật ký, theo dõi thay đổi và tạo thói quen tích cực trong 30 ngày.",
    chapters: ["Mục tiêu", "Niềm tin", "Hành động", "Theo dõi", "Phản tư cuối ngày"]
  },
  {
    id: 5,
    title: "Cả ngày bận rộn, cả đời trì hoãn",
    author: "Sarah An",
    category: "Quản trị thời gian",
    type: "vip",
    badge: "49.000đ",
    coverClass: "cover--orange",
    coverTitle: "Cả ngày bận rộn cả đời trì hoãn",
    rating: 4.5,
    reads: "10.8K",
    progress: 63,
    description: "Nội dung giúp người đọc nhận diện trạng thái bận rộn giả, tránh trì hoãn và tập trung vào việc quan trọng.",
    chapters: ["Bận rộn giả", "Ưu tiên", "Kế hoạch", "Hành động", "Đo lường tiến độ"]
  },
  {
    id: 6,
    title: "Khoa học quanh ta",
    author: "Minh Khôi",
    category: "Khoa học",
    type: "free",
    badge: "Miễn phí",
    coverClass: "cover--teal",
    coverTitle: "Khoa học quanh ta",
    rating: 4.4,
    reads: "5.4K",
    progress: 22,
    description: "Sách miễn phí giải thích các hiện tượng khoa học quen thuộc bằng ngôn ngữ dễ hiểu cho người mới bắt đầu.",
    chapters: ["Ánh sáng", "Âm thanh", "Không khí", "Nhiệt độ", "Ứng dụng đời sống"]
  },
  {
    id: 7,
    title: "Nghệ thuật ghi chú thông minh",
    author: "An Nhiên",
    category: "Học tập",
    type: "free",
    badge: "Miễn phí",
    coverClass: "cover--blue",
    coverTitle: "Ghi chú thông minh",
    rating: 4.3,
    reads: "4.2K",
    progress: 12,
    description: "Hướng dẫn cách ghi chú, hệ thống hóa kiến thức và ôn tập hiệu quả bằng các phương pháp đơn giản.",
    chapters: ["Ghi chú nhanh", "Tổ chức ý", "Ôn tập", "Sơ đồ tư duy"]
  },
  {
    id: 8,
    title: "Tư duy kinh doanh số",
    author: "Hoàng Nam",
    category: "Kinh doanh",
    type: "member",
    badge: "Hội viên",
    coverClass: "cover--green",
    coverTitle: "Tư duy kinh doanh số",
    rating: 4.8,
    reads: "9.7K",
    progress: 36,
    description: "Ebook về cách xây dựng sản phẩm số, phân tích khách hàng, đo lường tăng trưởng và tối ưu mô hình doanh thu.",
    chapters: ["Khách hàng", "Sản phẩm", "Doanh thu", "Tăng trưởng", "Đo lường"]
  },
  {
    id: 9,
    title: "Bếp nhà cuối tuần",
    author: "Mai Anh",
    category: "Nấu ăn",
    type: "free",
    badge: "Miễn phí",
    coverClass: "cover--orange",
    coverTitle: "Bếp nhà cuối tuần",
    rating: 4.6,
    reads: "6.3K",
    progress: 44,
    description: "Tổng hợp công thức dễ làm cho sinh viên và gia đình nhỏ, tập trung vào nguyên liệu quen thuộc.",
    chapters: ["Nguyên liệu", "Món nhanh", "Bữa cơm", "Tráng miệng"]
  },
  {
    id: 10,
    title: "Tâm lý học thuyết phục",
    author: "Linh Đan",
    category: "Tâm lý học",
    type: "vip",
    badge: "59.000đ",
    coverClass: "cover--purple",
    coverTitle: "Tâm lý học thuyết phục",
    rating: 4.9,
    reads: "14.9K",
    progress: 80,
    description: "Sách phân tích các nguyên tắc ảnh hưởng, giao tiếp và thuyết phục trong môi trường học tập, công việc.",
    chapters: ["Ấn tượng đầu", "Niềm tin", "Cảm xúc", "Thông điệp", "Ứng dụng"]
  },
  {
    id: 11,
    title: "Làm chủ Excel cho sinh viên",
    author: "Quốc Huy",
    category: "Kỹ năng văn phòng",
    type: "member",
    badge: "Hội viên",
    coverClass: "cover--teal",
    coverTitle: "Excel cho sinh viên",
    rating: 4.4,
    reads: "3.8K",
    progress: 18,
    description: "Ebook hướng dẫn thao tác Excel cơ bản đến nâng cao, phù hợp cho học tập, phân tích dữ liệu và báo cáo.",
    chapters: ["Công thức", "Pivot Table", "Biểu đồ", "Dashboard"]
  },
  {
    id: 12,
    title: "Khởi nghiệp tinh gọn",
    author: "Nguyễn Minh",
    category: "Startup",
    type: "vip",
    badge: "69.000đ",
    coverClass: "cover--black",
    coverTitle: "Khởi nghiệp tinh gọn",
    rating: 4.7,
    reads: "11.6K",
    progress: 27,
    description: "Tư duy xây dựng mô hình kinh doanh tinh gọn, kiểm thử ý tưởng, phát triển sản phẩm và gọi vốn.",
    chapters: ["Vấn đề", "Giải pháp", "MVP", "Tăng trưởng", "Gọi vốn"]
  }
];

function getBookById(id) {
  return BOOKS.find(book => Number(book.id) === Number(id));
}

function getBadgeClass(type) {
  if (type === "vip") return "badge--vip";
  if (type === "member") return "badge--member";
  return "badge--free";
}

function getTypeName(type) {
  if (type === "vip") return "Sách VIP";
  if (type === "member") return "Sách hội viên";
  return "Sách miễn phí";
}

function isUserVip() {
  return localStorage.getItem("wakapro_is_vip") === "true";
}

function setUserVip(value) {
  localStorage.setItem("wakapro_is_vip", value ? "true" : "false");
}

function canAccessBook(book) {
  return book.type === "free" || isUserVip();
}
