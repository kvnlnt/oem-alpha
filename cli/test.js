const oem = require('../oem.json');
const chalk = require('chalk');
const fs = require('fs-extra');
const Deployment = require('./deploy').Deployment;
var phantomjs = require('phantomjs-prebuilt');
var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'phantomjs' } };
var client = webdriverio.remote(options);

const Test = function(deployment){
    this.deployment = deployment;
    this.deploy().test().reply();
};

Test.prototype = {

    deploy: function(){
        new Deployment(this.deployment, false);
        return this;
    },

    test: function(){
        var regex = /(<([^>]+)>)/ig;
        phantomjs.run('--webdriver=4444').then(program => {
          client
            .init()
            .url('./deploy/'+this.deployment+'/index.html')
            .getHTML('li.test')
            .then(results => {
                var isValid = true;
                var testsPassed = 0;
                var testsFailed = 0;
                results.forEach(function(result){
                    var resultText = result.replace(regex, "");
                    var passed = result.indexOf("test-pass") != -1;
                    if(passed){
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
                if(isValid) {
                    console.log(chalk.red(testsFailed), "failed");
                } else {
                    console.error(chalk.red(testsFailed), "failed");
                }
                console.log("");
                program.kill() // quits PhantomJS
                return;             
            })
            .end();
        });
        return this;
    },

    reply: function(){
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