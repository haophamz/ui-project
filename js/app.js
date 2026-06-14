// Global application state and utilities

// Simple helper to check login status
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Simple helper to get current logged in user
function getCurrentUser() {
    if (!isLoggedIn()) return null;
    return {
        id: localStorage.getItem('userId') || 'user_123',
        name: localStorage.getItem('userName') || 'Nguyễn Văn A',
        email: localStorage.getItem('userEmail') || 'user@example.com',
        isVip: localStorage.getItem('isVip') === 'true',
        vipExpiry: localStorage.getItem('vipExpiry') || null
    };
}

// Login function (mock)
function mockLogin(email, password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', 'user_123');
    localStorage.setItem('userName', 'Nguyễn Văn A');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isVip', 'false'); // starts as normal member
    localStorage.setItem('vipExpiry', '');
    return true;
}

// Logout function
function mockLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isVip');
    localStorage.removeItem('vipExpiry');
    window.location.href = 'index.html';
}

// Update navbar UI dynamically based on login state
function updateNavbar() {
    const authContainer = document.getElementById('auth-nav-container');
    if (!authContainer) return;

    if (isLoggedIn()) {
        const user = getCurrentUser();
        authContainer.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Chào, ${user.name} ${user.isVip ? '<span class="vip-badge">VIP</span>' : ''}
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="profile.html">Cá nhân & Lịch sử</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="mockLogout(); return false;">Đăng xuất</a></li>
                </ul>
            </li>
        `;
    } else {
        authContainer.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="login.html">Đăng nhập</a>
            </li>
            <li class="nav-item">
                <a class="btn btn-outline-primary btn-sm ms-2" href="login.html?register=true">Đăng ký</a>
            </li>
        `;
    }
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});
