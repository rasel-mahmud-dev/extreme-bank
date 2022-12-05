function calcEmi(amount = 0, loadDuration = 0, interestRate = 10) {
    let month = Number(loadDuration) * 12;
    let totalPay = amount * (1 + (interestRate / 100) * loadDuration);

    return {
        totalPay: totalPay.toFixed(2),
        totalEmiNumber: Math.ceil(month),
        monthlyPay: (totalPay / month).toFixed(2),
    };
}

export default calcEmi