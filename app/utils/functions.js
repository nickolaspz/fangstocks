export const sortDiff = (list, direction = 'ASC') => {
    let sorted = list.sort((a, b) => {
        const diffA = a.open - a.close;
        const diffB = b.open - b.close;
        
        if (diffA > diffB) {
            return 1;
        }
        if (diffA < diffB) {
            return -1;
        }
        return 0;
    });

    if (direction === 'ASC') {
        sorted.reverse();
    }

    return sorted;
}