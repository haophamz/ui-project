(function renderLayout() {
  const isPageInSubfolder = location.pathname.includes("/pages/");
  const root = isPageInSubfolder ? "../" : "./";

  const topBanner = document.getElementById("topBanner");
  if (topBanner) {
    topBanner.innerHTML = `
      <div class="top-banner">
        <strong>WAKASHOP - THẾ GIỚI SÁCH CỦA BẠN</strong>
        <button class="top-banner__button">KHÁM PHÁ NGAY ▶</button>
      </div>
    `;
  }

  const siteHeader = document.getElementById("siteHeader");
  if (!siteHeader) return;

  const vip = isUserVip();
  siteHeader.innerHTML = `
    <header class="site-header">
      <a href="${root}index.html" class="site-logo">WAKA</a>

      <nav class="site-nav">
        <a href="${root}index.html" class="is-active">Sách điện tử</a>
        <a href="${root}index.html#library">Sách hội viên</a>
        <a href="${root}index.html#library">Sách hiệu sôi</a>
        <a href="${root}index.html#library">Sách nói</a>
        <a href="${root}index.html#library">Truyện tranh</a>
        <a href="${root}pages/downloads.html">Tải Ebook</a>
      </nav>

      <div class="site-actions">
        <button class="search-icon" aria-label="Tìm kiếm"></button>
        <button class="btn btn--small btn--package">♕ Gói cước</button>
        <button class="btn btn--small btn--auth">Đăng ký</button>
        <button class="btn btn--small ${vip ? "btn--vip" : "btn--primary"}" id="globalVipBtn">
          ${vip ? "Đã là VIP" : "Đăng nhập"}
        </button>
      </div>
    </header>
  `;

  const vipBtn = document.getElementById("globalVipBtn");
  vipBtn.addEventListener("click", () => {
    const next = !isUserVip();
    setUserVip(next);
    window.toast(next ? "Đã bật trạng thái Hội viên/VIP demo." : "Đã tắt trạng thái Hội viên/VIP.");
    setTimeout(() => location.reload(), 450);
  });

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.14 });

  reveals.forEach(item => observer.observe(item));
})();
