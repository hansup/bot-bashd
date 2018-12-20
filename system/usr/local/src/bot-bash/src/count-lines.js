var count = 0;

function onLine(line) {
    count ++;
}

function get() {
    return count;
}

module.exports = {
    onLine: onLine,
    get: get
};