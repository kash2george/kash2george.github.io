function calculateParts(word) {
    const length = word.length;
    if (length === 0) {
        return { part1: '', part2: '', part3: '' };
    }

    const minLength = Math.floor(length / 3);
    const remainder = length % 3;

    let part1Length = minLength + (remainder > 0 ? 1 : 0);
    let part3Length = minLength + (remainder > 1 ? 1 : 0);
    let part2Length = length - (part1Length + part3Length);

    const part1 = word.slice(0, part1Length);
    const part2 = word.slice(part1Length, part1Length + part2Length);
    const part3 = word.slice(part1Length + part2Length);

    return { part1, part2, part3 };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = calculateParts;
} else if (typeof window !== 'undefined') {
    window.calculateParts = calculateParts;
}
