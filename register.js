const form = document.getElementById('registerForm');
const successMsg = document.getElementById('successMessage');
const emailError = document.getElementById('emailError');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    
    if (pass !== confirm) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }
    
    if (email === "test@example.com") {
        emailError.style.display = 'block';
        return;
    }
    
    emailError.style.display = 'none';
    
    const btn = form.querySelector('button');
    btn.textContent = 'Đang xử lý...';
    btn.disabled = true;
    btn.style.opacity = '0.8';
    
    successMsg.style.display = 'block';
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1800);
});