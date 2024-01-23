export function priceFormat(value: number, digit: number = 2) : string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: digit }).format(value)
}

export function numberFormat(value: number, min_digit: number = 0, max_digit: number = 2) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: min_digit, maximumFractionDigits: max_digit }).format(value)
}