// VIP package page logic

// Sample VIP Packages data
const vipPackages = [
    { id: 'vip_1m', name: 'Gói 1 Tháng', price: 99000, durationDays: 30, description: 'Phù hợp cho trải nghiệm ngắn hạn' },
    { id: 'vip_6m', name: 'Gói 6 Tháng', price: 499000, durationDays: 180, description: 'Gói tiết kiệm, khuyên dùng' },
    { id: 'vip_12m', name: 'Gói 1 Năm', price: 899000, durationDays: 365, description: 'Trải nghiệm trọn vẹn nhất' }
];

// Handles registration action
function handleRegisterVip(packageId) {
    // 1. Check login status
    if (!isLoggedIn()) {
        alert('Vui lòng đăng nhập trước khi đăng ký gói VIP!');
        // Redirect to login and save return URL
        window.location.href = `login.html?returnUrl=vip-checkout.html?packageId=${packageId}`;
        return;
    }

    // 2. If logged in, redirect to VIP checkout page with packageId
    window.location.href = `vip-checkout.html?packageId=${packageId}`;
}

// Generate packages dynamically if container exists
document.addEventListener('DOMContentLoaded', () => {
    const packagesContainer = document.getElementById('vip-packages-list');
    if (!packagesContainer) return;

    packagesContainer.innerHTML = '';
    vipPackages.forEach(pkg => {
        packagesContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 text-center">
                    <div class="card-body d-flex flex-column">
                        <h4 class="card-title font-weight-bold">${pkg.name}</h4>
                        <p class="text-muted">${pkg.description}</p>
                        <h2 class="my-4 text-primary">${pkg.price.toLocaleString('vi-VN')}đ</h2>
                        <ul class="list-unstyled mb-4 text-start">
                            <li><i class="bi bi-check-circle-fill text-success"></i> Đọc không giới hạn kho sách VIP</li>
                            <li><i class="bi bi-check-circle-fill text-success"></i> Không quảng cáo làm phiền</li>
                            <li><i class="bi bi-check-circle-fill text-success"></i> Tải sách đọc offline</li>
                        </ul>
                        <button onclick="handleRegisterVip('${pkg.id}')" class="btn btn-primary mt-auto w-100">Đăng ký ngay</button>
                    </div>
                </div>
            </div>
        `;
    });
});
