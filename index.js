#!/usr/bin/env node

const sampleInterval = 5;
const sampleCount = 3;
const threshold = 1;

var ipDistribution = require('./src/ip-distribution');
var distributionVelocity = require('./src/distribution-velocity');
var filter = require('object.filter');
var map = require('object.map');

var stdin = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var ipSamples = [];

function measureVelocity() {
    var ipSample = ipDistribution.get();
    ipDistribution.reset();
    ipSamples.push(ipSample);
    if (ipSamples.length > sampleCount) {
        ipSamples.shift();
    }
    var ipVelocity = distributionVelocity(ipSamples);
    console.log('velocity',
        map(
            filter(
                map(
                    ipVelocity,
                    v => v/(sampleInterval * sampleCount)
                ),
                v => v > threshold
            ),
            v => `${v.toFixed(2)} per second`
        )
    );
}

function allDone() {
}

stdin.on('line', ipDistribution.onLine);
stdin.on('close', allDone);

setInterval(measureVelocity, sampleInterval * 1000);