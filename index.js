#!/usr/bin/env node

var countLines = require('./src/count-lines');
var ipDistribution = require('./src/ip-distribution');

var readline = require('readline');
var stdin = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function allDone() {
    console.log(`${countLines.getCount()} lines`);
    console.log('Distribution', ipDistribution.getDistribution())
}

stdin.on('line', countLines.onLine);
stdin.on('line', ipDistribution.onLine);
stdin.on('close', allDone);
