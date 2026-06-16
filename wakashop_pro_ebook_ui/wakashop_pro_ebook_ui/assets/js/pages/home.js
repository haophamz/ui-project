const state = {
  page: 1,
  perPage: 8,
  keyword: "",
  type: "all"
};

const bookGrid = document.getElementById("bookGrid");
const pagination = document.getElementById("pagination");
const resultInfo = document.getElementById("resultInfo");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

function filterBooks() {
  return BOOKS.filter(book => {
    const matchesKeyword =
      book.title.toLowerCase().includes(state.keyword) ||
      book.author.toLowerCase().includes(state.keyword) ||
      book.category.toLowerCase().includes(state.keyword);

    const matchesType = state.type === "all" || book.type === state.type;
    return matchesKeyword && matchesType;
  });
}

function renderBooks() {
  const list = filterBooks();
  const totalPages = Math.max(1, Math.ceil(list.length / state.perPage));

  if (state.page > totalPages) state.page = totalPages;

  const start = (state.page - 1) * state.perPage;
  const current = list.slice(start, start + state.perPage);

  resultInfo.textContent = `Hiển thị ${current.length} / ${list.length} ebook · Trang ${state.page}/${totalPages}`;

  bookGrid.innerHTML = current.map((book, index) => `
    <article class="book-card" style="animation-delay:${index * 0.035}s">
      <a href="./pages/detail.html?id=${book.id}" class="book-card__cover cover ${book.coverClass}">
        <div class="cover__shine"></div>
        <div class="book-card__ribbon">
          <span class="badge ${getBadgeClass(book.type)}">${book.badge}</span>
        </div>
        <h3>${book.coverTitle}</h3>
      </a>

      <div class="book-card__body">
        <h3>${book.title}</h3>
        <p>${book.description.slice(0, 94)}...</p>

        <div class="book-card__meta">
          <span>${book.author}</span>
          <span>★ ${book.rating}</span>
        </div>

        <div class="book-card__actions">
          <a href="./pages/detail.html?id=${book.id}" class="btn btn--ghost">Xem ebook</a>
          <a href="./pages/downloads.html?id=${book.id}" class="btn btn--primary">Tải xuống</a>
        </div>
      </div>
    </article>
  `).join("");

  if (!current.length) {
    bookGrid.innerHTML = `
      <div class="usecase-card" style="grid-column: 1 / -1">
        <span>Không có kết quả</span>
        <h3>Không tìm thấy ebook phù hợp</h3>
        <p>Hãy thử nhập từ khóa khác hoặc đổi bộ lọc loại sách.</p>
      </div>
    `;
  }

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const buttons = [];

  buttons.push(`
    <button ${state.page === 1 ? "disabled" : ""} data-page="${state.page - 1}">
      ←
    </button>
  `);

  for (let i = 1; i <= totalPages; i++) {
    buttons.push(`
      <button class="${i === state.page ? "is-active" : ""}" data-page="${i}">
        ${i}
      </button>
    `);
  }

  buttons.push(`
    <button ${state.page === totalPages ? "disabled" : ""} data-page="${state.page + 1}">
      →
    </button>
  `);

  pagination.innerHTML = buttons.join("");

  pagination.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      const nextPage = Number(button.dataset.page);
      if (!nextPage || nextPage === state.page) return;
      state.page = nextPage;
      renderBooks();
      document.getElementById("library").scrollIntoView({ behavior: "smooth" });
    });
  });
}

searchInput.addEventListener("input", event => {
  state.keyword = event.target.value.trim().toLowerCase();
  state.page = 1;
  renderBooks();
});

typeFilter.addEventListener("change", event => {
  state.type = event.target.value;
  state.page = 1;
  renderBooks();
});

renderBooks();
