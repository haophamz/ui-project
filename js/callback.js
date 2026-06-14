// Payment Callback logic (Success & Failure handles)

// Add transaction to history
function saveTransactionToHistory(tx) {
    const history = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
    // Check if transaction already saved (avoid duplicates)
    if (!history.some(item => item.id === tx.id)) {
        history.unshift(tx); // add to beginning
        localStorage.setItem('transactionHistory', JSON.stringify(history));
    }
}

// Process successful payment
function handlePaymentSuccess() {
    const pendingTxStr = localStorage.getItem('pendingTransaction');
    if (!pendingTxStr) return;

    const tx = JSON.parse(pendingTxStr);
    tx.status = 'SUCCESS';
    saveTransactionToHistory(tx);

    // Update User VIP status
    localStorage.setItem('isVip', 'true');
    
    // Calculate new VIP expiry date
    const daysToAdd = tx.durationDays;
    const currentExpiry = localStorage.getItem('vipExpiry');
    let baseDate = new Date();
    
    // If user is already VIP and expiry date is in the future, extend from that date
    if (currentExpiry) {
        const parsedExpiry = new Date(currentExpiry);
        if (parsedExpiry > baseDate) {
            baseDate = parsedExpiry;
        }
    }
    
    baseDate.setDate(baseDate.getDate() + daysToAdd);
    localStorage.setItem('vipExpiry', baseDate.toISOString());

    // Clean up pending transaction
    localStorage.removeItem('pendingTransaction');

    // Display summary on screen
    document.getElementById('success-package-name').textContent = tx.packageName;
    document.getElementById('success-amount').textContent = `${tx.amount.toLocaleString('vi-VN')}đ`;
    document.getElementById('success-method').textContent = tx.method;
    document.getElementById('success-expiry').textContent = baseDate.toLocaleDateString('vi-VN');
}

// Process failed/cancelled payment
function handlePaymentFailure() {
    const pendingTxStr = localStorage.getItem('pendingTransaction');
    if (!pendingTxStr) return;

    const tx = JSON.parse(pendingTxStr);
    tx.status = 'FAILED';
    saveTransactionToHistory(tx);

    // Clean up pending transaction
    localStorage.removeItem('pendingTransaction');

    // Display summary on screen
    document.getElementById('failure-package-name').textContent = tx.packageName;
    document.getElementById('failure-amount').textContent = `${tx.amount.toLocaleString('vi-VN')}đ`;
    document.getElementById('failure-method').textContent = tx.method;
}
