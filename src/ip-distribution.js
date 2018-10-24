var distribution = {};

function onLine(line) {
    var matches = /^(\d+\.\d+\.\d+\.\d+)/.exec(line);
    if (!matches) return;
    var ip = matches[0];
    distribution[ip] = (distribution[ip] || 0) + 1;
}

function get() {
    return distribution;
}

function reset() {
    distribution = {};
}

module.exports = {
    onLine: onLine,
    get: get,
    reset: reset
};