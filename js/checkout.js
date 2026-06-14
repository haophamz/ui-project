// VIP Checkout / Payment Confirmation logic

const vipPackages = [
    { id: 'vip_1m', name: 'Gói 1 Tháng', price: 99000, durationDays: 30, description: 'Phù hợp cho trải nghiệm ngắn hạn' },
    { id: 'vip_6m', name: 'Gói 6 Tháng', price: 499000, durationDays: 180, description: 'Gói tiết kiệm, khuyên dùng' },
    { id: 'vip_12m', name: 'Gói 1 Năm', price: 899000, durationDays: 365, description: 'Trải nghiệm trọn vẹn nhất' }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check login
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    // 2. Parse Package ID
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get('packageId');
    const selectedPkg = vipPackages.find(p => p.id === packageId);

    if (!selectedPkg) {
        alert('Gói VIP không hợp lệ!');
        window.location.href = 'index.html';
        return;
    }

    // 3. Render Package Details
    document.getElementById('checkout-package-name').textContent = selectedPkg.name;
    document.getElementById('checkout-package-price').textContent = `${selectedPkg.price.toLocaleString('vi-VN')}đ`;
    document.getElementById('checkout-package-duration').textContent = `${selectedPkg.durationDays} ngày`;
    document.getElementById('checkout-total-amount').textContent = `${selectedPkg.price.toLocaleString('vi-VN')}đ`;

    // 4. Handle Submit Payment
    const checkoutForm = document.getElementById('checkout-payment-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
            if (!selectedMethod) {
                alert('Vui lòng chọn phương thức thanh toán!');
                return;
            }

            const paymentMethod = selectedMethod.value; // 'momo' or 'vnpay'
            
            // Create a mock transaction request in history (Status: Pending)
            const requestId = 'TX_' + Date.now();
            const transaction = {
                id: requestId,
                packageId: selectedPkg.id,
                packageName: selectedPkg.name,
                amount: selectedPkg.price,
                durationDays: selectedPkg.durationDays,
                method: paymentMethod.toUpperCase(),
                status: 'PENDING',
                date: new Date().toLocaleString('vi-VN')
            };

            // Save to localStorage temporary payment transaction
            localStorage.setItem('pendingTransaction', JSON.stringify(transaction));

            // Redirect to a Simulated Mock Payment Gateway
            window.location.href = `mock-payment-gateway.html?requestId=${requestId}&amount=${selectedPkg.price}&method=${paymentMethod}`;
        });
    }
});
