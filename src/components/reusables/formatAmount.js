export const formatAmount = (amount) => {
    const number = parseInt(amount, 10);
    return  number.toLocaleString();
}

export const formatRepayment = (amount) => {
    const number = parseFloat(amount);
    if (isNaN(number)) {
        return '';
    }
    const formattedNumber = number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedNumber;
}