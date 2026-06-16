const params = new URLSearchParams(location.search);
const bookId = Number(params.get("id")) || 1;
const book = getBookById(bookId);

const readerTitle = document.getElementById("readerTitle");
const readerMeta = document.getElementById("readerMeta");
const readerChapters = document.getElementById("readerChapters");
const chapterTitle = document.getElementById("chapterTitle");
const readerLocked = document.getElementById("readerLocked");
const readerText = document.getElementById("readerText");
const readerContent = document.getElementById("readerContent");
const vipSwitch = document.getElementById("vipSwitch");

let fontSize = 19;

function renderReader() {
  if (!book) {
    readerTitle.textContent = "Không tìm thấy ebook";
    chapterTitle.textContent = "Ebook không tồn tại";
    return;
  }

  document.title = `WakaPro Reader | ${book.title}`;
  readerTitle.textContent = book.title;
  readerMeta.textContent = `${book.author} · ${getTypeName(book.type)}`;
  chapterTitle.textContent = `Chương 01: ${book.chapters[0]}`;

  readerChapters.innerHTML = book.chapters.map((chapter, index) => `
    <button class="reader-chapter ${index === 0 ? "is-active" : ""}">
      ${String(index + 1).padStart(2, "0")}. ${chapter}
    </button>
  `).join("");

  if (!canAccessBook(book)) {
    readerLocked.innerHTML = `
      <div class="reader-lock">
        <div class="reader-lock__box">
          <h2>🔒 Nội dung cần Hội viên/VIP</h2>
          <p>
            Ebook này thuộc nhóm ${getTypeName(book.type)}. Bạn cần bật trạng thái VIP demo
            để đọc toàn bộ nội dung.
          </p>
          <button class="btn btn--primary" id="unlockReader">Bật VIP demo</button>
        </div>
      </div>
    `;

    document.getElementById("unlockReader").addEventListener("click", () => {
      setUserVip(true);
      window.toast("Đã bật VIP demo. Bạn có thể đọc ebook.");
      setTimeout(() => location.reload(), 500);
    });
  } else {
    readerLocked.innerHTML = "";
  }
}

vipSwitch.textContent = isUserVip() ? "Đã là VIP" : "Bật VIP demo";

vipSwitch.addEventListener("click", () => {
  setUserVip(!isUserVip());
  window.toast(isUserVip() ? "Đã bật VIP demo." : "Đã tắt VIP demo.");
  setTimeout(() => location.reload(), 450);
});

document.getElementById("fontUp").addEventListener("click", () => {
  fontSize = Math.min(fontSize + 2, 30);
  readerContent.style.fontSize = `${fontSize}px`;
});

document.getElementById("fontDown").addEventListener("click", () => {
  fontSize = Math.max(fontSize - 2, 15);
  readerContent.style.fontSize = `${fontSize}px`;
});

renderReader();
