const oem = require('../oem.json');
const chalk = require('chalk');
const fs = require('fs-extra');
const Deployment = require('./deploy').Deployment;
var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome',
        ensureCleanSession: true
    },
    host: 'localhost',
    port: 4444
};
var client = webdriverio.remote(options);

const Test = function (deployment) {
    this.deployment = deployment;
    this.deploy().test().reply();
};

Test.prototype = {

    deploy: function () {
        new Deployment(this.deployment, false);
        return this;
    },

    test: function () {

        var regex = /(<([^>]+)>)/ig;

        client
            .init()
            .url('./deploy/' + this.deployment + '/index.html')
            .waitForExist('html.tests-completed', 5000)
            .then(function(res){
              console.log('Testing complete:');
              console.log("");
            })
            .catch(function(err){
              console.log('Tests did not complete succesfully', err);
              process.exit(1);
            })
            .getHTML('li.test')
            .then(results => {
                var isValid = true;
                var testsPassed = 0;
                var testsFailed = 0;
                results.forEach(function (result) {
                    var resultText = result.replace(regex, "");
                    var passed = result.indexOf("test-pass") != -1;
                    if (passed) {
                        console.log(chalk.green('\u2713'), resultText);
                        testsPassed += 1;
                    } else {
                        isValid = false;
                        testsFailed += 1;
                        console.log(chalk.red('\u2717'), resultText);
                    }
                });
                console.log("");
                console.log(chalk.green(testsPassed), "passed");
                console.log(chalk.red(testsFailed), "failed");
                if (!isValid) process.exit(1);
                console.log("");
                return;
            }).
            catch(function(err){
                console.log('No tests found');
                process.exit(1);
            })
            .end();

        return this;
    },

    reply: function () {
        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " TEST ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");
        console.log('Testing', this.deployment, 'deployment');
        console.log("");
        console.log("");
    }

};

module.exports = {
    Test: Test
};