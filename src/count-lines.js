var count = 0;

function onLine(line) {
    count ++;
}

function getCount() {
    return count;
}

module.exports = {
    onLine: onLine,
    getCount: getCount
};