const params = new URLSearchParams(location.search);
const bookId = Number(params.get("id")) || 1;
const book = getBookById(bookId);

const detailLayout = document.getElementById("detailLayout");
const chapterList = document.getElementById("chapterList");

if (!book) {
  detailLayout.innerHTML = `
    <div class="usecase-card">
      <span>Không tìm thấy</span>
      <h1>Ebook không tồn tại</h1>
      <p>Vui lòng quay lại thư viện để chọn ebook khác.</p>
      <a class="btn btn--primary" href="../index.html">Về thư viện</a>
    </div>
  `;
} else {
  document.title = `WakaPro Ebook | ${book.title}`;

  detailLayout.innerHTML = `
    <div class="detail-cover cover ${book.coverClass}">
      <div class="cover__shine"></div>
      <h3>${book.coverTitle}</h3>
    </div>

    <div class="detail-info">
      <span class="badge ${getBadgeClass(book.type)}">${book.badge}</span>
      <h1>${book.title}</h1>

      <div class="detail-info__meta">
        <span>${book.author}</span>
        <span>·</span>
        <span>${book.category}</span>
        <span>·</span>
        <span>${getTypeName(book.type)}</span>
      </div>

      <p class="detail-info__desc">${book.description}</p>

      <div class="detail-actions">
        <a class="btn btn--primary" href="./reader.html?id=${book.id}">Đọc ebook</a>
        <a class="btn btn--ghost" href="./downloads.html?id=${book.id}">Tải xuống</a>
      </div>

      <div class="detail-stat-grid">
        <div class="detail-stat">
          <strong>${book.rating}</strong>
          <span>Đánh giá</span>
        </div>
        <div class="detail-stat">
          <strong>${book.reads}</strong>
          <span>Lượt đọc</span>
        </div>
        <div class="detail-stat">
          <strong>${book.progress}%</strong>
          <span>Tiến độ demo</span>
        </div>
      </div>
    </div>
  `;

  chapterList.innerHTML = book.chapters.map((chapter, index) => `
    <div class="chapter-item">
      <strong>Chương ${String(index + 1).padStart(2, "0")}: ${chapter}</strong>
      <span>${index === 0 || book.type === "free" ? "Mở" : getTypeName(book.type)}</span>
    </div>
  `).join("");
}
