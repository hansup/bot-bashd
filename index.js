#!/usr/bin/env node

const sampleInterval = 5;
const sampleCount = 3;
const threshold = 1;

var ipDistribution = require('./src/ip-distribution');
var distributionVelocity = require('./src/distribution-velocity');
var filter = require('object.filter');
var map = require('object.map');
var sort = require('object-sort');

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
    var velocity = distributionVelocity(ipSamples);
    var perSecond = map(velocity, v => v/(sampleInterval * sampleCount) );
    var overThreshold = filter(perSecond, v => v > threshold );
    var withUnits = Object.values(map( overThreshold, (v, k) => `${k} ${v.toFixed(2)} per second`));

    if (withUnits.length) {
        console.log(withUnits.join('\n'));
        console.log();
    }
}

function allDone() {
}

stdin.on('line', ipDistribution.onLine);
stdin.on('close', allDone);

setInterval(measureVelocity, sampleInterval * 1000);