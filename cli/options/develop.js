const express = require('express');
const app = express();
const pkg = require('../../package');
const fs = require("fs");
const http = require('http');
const exec = require('child_process').exec;
const path = require('path');
const chalk = require('chalk');

/**
 * Component Development Server
 */
const DevelopComponent = function(component, port) {
    this.component = component;
    this.jsFiles = this.getJsFiles();
    this.port = port || 7001;
    this.templateDescription = pkg.oem.components[this.component].templates.description;
    this.templateExamples = pkg.oem.components[this.component].templates.examples;
    this.templateTests = pkg.oem.components[this.component].templates.tests;
    this.templateUsage = pkg.oem.components[this.component].templates.usage;
    this.server;
    this.start();
};

DevelopComponent.prototype = {

    /**
     * Main CLI prompt
     *
     * @method     start
     */
    start: function() {
        app.use('/src', this.reportRequest, express.static('src'));
        app.get('/', this.reportRequest, this.handleServerRequest.bind(this));
        app.listen(this.port, this.onStart.bind(this));
    },

    onStart: function() {
        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " DEVELOP ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");
        console.log("Component:", this.component);
        console.log("Server:", "http://localhost:" + this.port);
        exec('open http://localhost:' + this.port);
        console.log("");
        console.log("");
    },

    reportRequest: function(req, res, next) {
        console.log(chalk.gray("Served: "), req.url);
        next();
    },

    /**
     * Handle http requests
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    handleServerRequest: function(req, res) {

        var that = this;
        var templateDescription = "";
        var templateExamples = "";
        var templateTests = "";
        var templateUsage = "";

        // get template partials
        try {
            templateDescription = fs.readFileSync(this.templateDescription, 'utf8');
        } catch (err) {
            // noop
        }
        try {
            templateExamples = fs.readFileSync(this.templateExamples, 'utf8');
        } catch (err) {
            // noop
        }
        try {
            templateTests = fs.readFileSync(this.templateTests, 'utf8');
        } catch (err) {
            // noop
        }
        try {
            templateUsage = fs.readFileSync(this.templateUsage, 'utf8');
        } catch (err) {
            // noop
        }

        // now update the main template
        fs.readFile("./cli/templates/development/main.html", 'utf8', function(err, data) {
            data = data
                .replace("<!-- HTML:DESCRIPTION -->", templateDescription, 'utf8')
                .replace("<!-- HTML:EXAMPLES -->", templateExamples, 'utf8')
                .replace("<!-- HTML:TESTS -->", templateTests, 'utf8')
                .replace("<!-- HTML:USAGE -->", templateUsage, 'utf8')
                .replace("<!-- JS -->", that.wrapInScriptTag(that.jsFiles));
            res.send(data);
            res.end();
        });
    },

    /**
     * Load script tags
     * @param  {[type]} files [description]
     * @return {[type]}       [description]
     */
    wrapInScriptTag: function(files) {
        var tags = '';
        files.forEach(function(file) {
            tags += '<script src="' + file + '"></script>\n';
        });
        return tags;
    },

    /**
     * Start Component's JS files
     *
     * @method     startDevelopingComponent
     * @param      {<type>}  answers  { description }
     */
    getJsFiles: function() {

        // component configuration files
        var srcFiles = pkg.oem.development[this.component].components.map(function(component) {
            return pkg.oem.components[component].files;
        });

        // test core and component test files
        var testFiles = [];
        testFiles.push("./src/core/modules/Test.js");
        testFiles.push(pkg.oem.components[this.component].tests);

        // flatten arrays
        var allFiles = []
            .concat(...srcFiles)
            .concat(...testFiles);

        // implement customization overwrites
        if (pkg.oem.development[this.component].hasOwnProperty('customizations')) {
            var customizations = pkg.oem.development[this.component].customizations;
            var customization;
            var indexOfFileToReplace;
            for (var i = 0; i < customizations.length; i = i + 1) {
                customization = customizations[i];
                indexOfFileToReplace = allFiles.indexOf(customization.replace);
                if (indexOfFileToReplace > -1) allFiles.splice(indexOfFileToReplace, 1, customization.with);
            }
        }

        // console.log(allFiles);

        return allFiles;
    }
};

module.exports = {
    DevelopComponent: DevelopComponent
};