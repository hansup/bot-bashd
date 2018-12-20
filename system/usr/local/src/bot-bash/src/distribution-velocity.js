var reduce = require('object.reduce');
var map = require('object.map');

function distributionVelocity(distributions) {
    const sampleCount = distributions.length;
    if (!sampleCount) return {};
    return map(
        distributions.reduce(
            function flattenDistribution(acc, distribution) {
                // console.log('flattenDistribution', acc, distribution)
                return reduce(
                    distribution,
                    function flattenElement(acc, count, key) {
                        // console.log('flattenElement', acc, key, count)
                        acc[key] = (acc[key] || 0) + count;
                        return acc;
                    },
                    acc
                );
            },
            {}
        ),
        function velocity(val) {
            return val / sampleCount;
        }
    );
}

module.exports = distributionVelocity;