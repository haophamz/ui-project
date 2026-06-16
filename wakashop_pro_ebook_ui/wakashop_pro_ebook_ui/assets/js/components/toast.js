window.toast = function(message) {
  const holder = document.getElementById("toast");
  if (!holder) return;

  holder.innerHTML = `<div class="toast">${message}</div>`;

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    holder.innerHTML = "";
  }, 2800);
};
