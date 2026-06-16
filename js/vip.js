// VIP package page logic

// Sample VIP Packages data
const vipPackages = [
    { id: 'vip_1m', name: 'Gói 1 Tháng', price: 99000, durationDays: 30, description: 'Phù hợp cho trải nghiệm ngắn hạn', isPopular: false },
    { id: 'vip_6m', name: 'Gói 6 Tháng', price: 499000, durationDays: 180, description: 'Gói tiết kiệm, khuyên dùng', isPopular: true },
    { id: 'vip_12m', name: 'Gói 1 Năm', price: 899000, durationDays: 365, description: 'Trải nghiệm trọn vẹn nhất', isPopular: false }
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
        const isPopular = pkg.isPopular;
        const cardClass = isPopular ? 'vip-glow-card popular' : 'vip-glow-card';
        const buttonClass = isPopular ? 'btn-waka w-100 py-3 mt-auto shadow' : 'btn-waka w-100 py-3 mt-auto shadow';
        
        // Highlight popular package with golden elements
        const priceColorClass = isPopular ? 'text-gold' : 'text-highlight';
        const popularTag = isPopular ? '<span class="position-absolute top-0 end-0 bg-warning text-dark px-3 py-1 fw-bold text-uppercase rounded-start-pill small" style="margin-top: 15px;">Phổ biến</span>' : '';

        packagesContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="${cardClass} h-100 p-4 d-flex flex-column text-center position-relative">
                    ${popularTag}
                    <div class="card-body d-flex flex-column p-2">
                        <h4 class="card-title fw-bold text-white fs-3 mb-2" style="font-family: var(--font-outfit);">${pkg.name}</h4>
                        <p class="text-muted small mb-4">${pkg.description}</p>
                        <h2 class="my-3 fs-1 fw-extrabold ${priceColorClass}" style="font-family: var(--font-outfit); font-weight: 800;">
                            ${pkg.price.toLocaleString('vi-VN')}đ
                        </h2>
                        <span class="badge bg-secondary bg-opacity-25 text-white align-self-center px-3 py-2 rounded mb-4 small">
                            Thời hạn: ${pkg.durationDays} ngày
                        </span>
                        
                        <ul class="list-unstyled mb-5 text-start border-top border-secondary border-opacity-10 pt-4">
                            <li class="mb-2 text-white"><i class="bi bi-check2-circle text-success me-2"></i> Đọc không giới hạn kho sách VIP</li>
                            <li class="mb-2 text-white"><i class="bi bi-check2-circle text-success me-2"></i> Trải nghiệm mượt mà không quảng cáo</li>
                            <li class="mb-2 text-white"><i class="bi bi-check2-circle text-success me-2"></i> Tải sách đọc offline trên app</li>
                            <li class="text-white"><i class="bi bi-check2-circle text-success me-2"></i> Nhận ưu đãi sách giấy giảm 15%</li>
                        </ul>
                        
                        <button onclick="handleRegisterVip('${pkg.id}')" class="${buttonClass}">Đăng ký ngay</button>
                    </div>
                </div>
            </div>
        `;
    });
});
