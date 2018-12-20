#!/usr/bin/env node

var ipDistribution = require('./src/ip-distribution');
var distributionVelocity = require('./src/distribution-velocity');
var filter = require('object.filter');
var map = require('object.map');

const optionDefinitions = [
    { name: 'threshold', alias: 't', type: Number },
    { name: 'interval', alias: 'i', type: Number },
    { name: 'window', alias: 'w', type: Number },
];

const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);

const sampleInterval = options.interval || 5;
const sampleCount = options.window || 3;
const threshold = options.threshold || 0.5;

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
    var withTimestamp = Object.values(map( withUnits, (v, k) => `${new Date().toISOString()} ${v}`));

    if (withUnits.length) {
        console.log(`${withTimestamp.join('\n')}`);
        console.log();
    }
}

function allDone() {
}

stdin.on('line', ipDistribution.onLine);
stdin.on('close', allDone);

setInterval(measureVelocity, sampleInterval * 1000);