// User Profile and Transaction History logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check login
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    const user = getCurrentUser();

    // 2. Render user profile details
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;

    const vipStatusEl = document.getElementById('profile-vip-status');
    if (user.isVip) {
        const expiryDate = new Date(user.vipExpiry);
        vipStatusEl.innerHTML = `
            <span class="badge bg-warning text-dark fs-6">Hội viên VIP</span>
            <p class="mt-2 text-muted small">Hạn sử dụng đến ngày: <strong>${expiryDate.toLocaleDateString('vi-VN')}</strong></p>
        `;
    } else {
        vipStatusEl.innerHTML = `
            <span class="badge bg-secondary fs-6">Thành viên Thường</span>
            <div class="mt-2">
                <a href="index.html#packages" class="btn btn-sm btn-primary">Nâng cấp VIP ngay</a>
            </div>
        `;
    }

    // 3. Render Transaction History (UC15)
    const historyTableBody = document.getElementById('transaction-history-body');
    if (historyTableBody) {
        const history = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
        
        if (history.length === 0) {
            historyTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-4 text-muted">Chưa có giao dịch nào được thực hiện.</td>
                </tr>
            `;
            return;
        }

        historyTableBody.innerHTML = '';
        history.forEach(tx => {
            let statusBadge = '';
            if (tx.status === 'SUCCESS') {
                statusBadge = '<span class="badge bg-success">Thành công</span>';
            } else if (tx.status === 'FAILED') {
                statusBadge = '<span class="badge bg-danger">Thất bại</span>';
            } else {
                statusBadge = '<span class="badge bg-warning text-dark">Chờ thanh toán</span>';
            }

            historyTableBody.innerHTML += `
                <tr>
                    <td><code>${tx.id}</code></td>
                    <td>${tx.packageName}</td>
                    <td><strong>${tx.amount.toLocaleString('vi-VN')}đ</strong></td>
                    <td>${tx.method}</td>
                    <td>${tx.date}</td>
                    <td>${statusBadge}</td>
                </tr>
            `;
        });
    }
});
