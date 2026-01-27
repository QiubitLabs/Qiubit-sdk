/**
 * Octra SDK Utilities
 */

/**
 * Convert OCT to raw micro-units (string)
 * 1 OCT = 1,000,000 micro-units
 */
export function parseOct(amount) {
    if (!amount) return '0';
    try {
        const parts = amount.toString().split('.');
        let integerPart = parts[0];
        let fractionalPart = parts[1] || '';
        
        while (fractionalPart.length < 6) fractionalPart += '0';
        fractionalPart = fractionalPart.substring(0, 6);
        
        if (integerPart === '0') integerPart = '';
        let result = integerPart + fractionalPart;
        result = result.replace(/^0+/, '');
        return result || '0';
    } catch (e) {
        throw new Error(`Invalid amount: ${amount}`);
    }
}

/**
 * Convert raw micro-units to OCT string
 */
export function formatOct(rawAmount) {
    if (!rawAmount) return '0.0';
    const str = rawAmount.toString().padStart(7, '0');
    const integerPart = str.slice(0, -6);
    const fractionalPart = str.slice(-6);
    const cleanFraction = fractionalPart.replace(/0+$/, '');
    return cleanFraction ? `${integerPart}.${cleanFraction}` : integerPart;
}

/**
 * Shorten address for display
 */
export function shortenAddress(address, chars = 4) {
    if (!address) return '';
    return `${address.slice(0, chars + 3)}...${address.slice(-chars)}`;
}