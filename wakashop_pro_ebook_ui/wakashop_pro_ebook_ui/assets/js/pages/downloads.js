const params = new URLSearchParams(location.search);
let selectedBook = getBookById(Number(params.get("id"))) || BOOKS[0];

const downloadTitle = document.getElementById("downloadTitle");
const downloadMessage = document.getElementById("downloadMessage");
const downloadProgress = document.getElementById("downloadProgress");
const startDownload = document.getElementById("startDownload");
const downloadSteps = Array.from(document.querySelectorAll(".download-step"));
const miniBookGrid = document.getElementById("miniBookGrid");

function setStep(activeIndex, doneUntil = -1) {
  downloadSteps.forEach((step, index) => {
    step.classList.toggle("is-active", index === activeIndex);
    step.classList.toggle("is-done", index <= doneUntil);
  });
}

function renderSelectedBook() {
  downloadTitle.textContent = selectedBook.title;
  downloadMessage.textContent = `${selectedBook.author} · ${getTypeName(selectedBook.type)} · Sẵn sàng kiểm tra quyền tải.`;
}

function renderMiniBooks() {
  miniBookGrid.innerHTML = BOOKS.slice(0, 8).map(book => `
    <article class="mini-book">
      <div class="mini-book__cover cover ${book.coverClass}">
        <div class="cover__shine"></div>
        <h3>${book.coverTitle}</h3>
      </div>
      <h4>${book.title}</h4>
      <button class="btn btn--primary" data-id="${book.id}">Chọn tải</button>
    </article>
  `).join("");

  miniBookGrid.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      selectedBook = getBookById(Number(button.dataset.id));
      downloadProgress.style.width = "0%";
      setStep(0, -1);
      renderSelectedBook();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function runDownload() {
  downloadProgress.style.width = "0%";
  setStep(0, -1);
  downloadMessage.textContent = "Đang kiểm tra quyền truy cập ebook...";

  if (!canAccessBook(selectedBook)) {
    setTimeout(() => {
      downloadMessage.textContent = "Không thể tải xuống vì tài khoản chưa có quyền Hội viên/VIP.";
      window.toast("Tải xuống bị chặn: cần Hội viên/VIP.");
      downloadProgress.style.width = "0%";
      setStep(0, -1);
    }, 700);
    return;
  }

  let progress = 0;

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 14) + 8;
    if (progress >= 100) progress = 100;

    downloadProgress.style.width = `${progress}%`;

    if (progress < 30) {
      setStep(0, -1);
      downloadMessage.textContent = "Đang kiểm tra quyền truy cập...";
    } else if (progress < 60) {
      setStep(1, 0);
      downloadMessage.textContent = "Đang chuẩn bị file PDF/EPUB...";
    } else if (progress < 100) {
      setStep(2, 1);
      downloadMessage.textContent = `Đang tải xuống... ${progress}%`;
    } else {
      clearInterval(timer);
      setStep(3, 2);
      downloadMessage.textContent = "Tải xuống hoàn tất. File demo đã sẵn sàng.";
      window.toast(`Đã tải xong: ${selectedBook.title}`);
      setTimeout(() => setStep(3, 3), 350);
    }
  }, 280);
}

startDownload.addEventListener("click", runDownload);

renderSelectedBook();
renderMiniBooks();
