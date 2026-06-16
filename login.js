const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('loginError');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        errorMsg.style.display = 'none';
        
        const btn = form.querySelector('button');
        btn.textContent = 'Đang xử lý...';
        btn.disabled = true;
        btn.style.opacity = '0.8';
        
        setTimeout(() => {
            btn.textContent = '✅ Thành công!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            btn.style.boxShadow = '0 10px 20px rgba(16, 185, 129, 0.2)';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        }, 1200);
    } else {
        errorMsg.style.display = 'block';
    }
});