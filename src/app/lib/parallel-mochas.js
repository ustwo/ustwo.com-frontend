'use strict';

let exec = require('child_process').exec;
let Q = require('q');

let mochaArgs = process.argv[2];
let browsers = process.argv.splice(3);

// context specific log
function log(browser, data) {
  let lines = data.replace(/\033\[[0-9;]*m/g,'').split(/(\r?\n)/g);
  let filteredLines = lines.filter(line => line !== '\n' && line !== '\r' && line !== '');
  filteredLines.forEach(line => console.log(`${browser}:${' '.repeat(15 - browser.length)}${line.trimRight()}`));
}

// runs the mocha tests for a given browser
function run_mocha(browser, done) {
  let mocha = exec('mocha ' + mochaArgs, {env: Object.assign({BROWSER: browser}, process.env)}, done);
  mocha.stdout.on('data', log.bind(null, browser));
  mocha.stderr.on('data', log.bind(null, browser));
}

// building job list
let jobs = browsers.map(browser => Q.nfcall(run_mocha, browser));

// running jobs in parallel
Q.all(jobs).then(() => console.log("ALL TESTS SUCCESSFUL")).done();
