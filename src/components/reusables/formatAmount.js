export const formatAmount = (amount) => {
    const number = parseInt(amount, 10);
    return  number.toLocaleString();
}