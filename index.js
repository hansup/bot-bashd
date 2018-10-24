#!/usr/bin/env node

const sampleInterval = 5000;
const velocitySampleCount = 3;

var ipDistribution = require('./src/ip-distribution');
var distributionVelocity = require('./src/distribution-velocity');

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
    if (ipSamples.length > velocitySampleCount) {
        ipSamples.shift();
    }
    var ipVelocity = distributionVelocity(ipSamples);
    console.log('velocity', ipVelocity);
}

function allDone() {
    console.log('Distribution', ipDistribution.get())
}

stdin.on('line', ipDistribution.onLine);
stdin.on('close', allDone);

setInterval(measureVelocity, sampleInterval);