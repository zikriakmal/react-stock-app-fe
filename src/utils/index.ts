export const generateNumericRe = (): string => {
    const now = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${now}${random}`; // e.g. "1739981823456123"
}
