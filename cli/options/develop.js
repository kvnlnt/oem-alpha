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
    this.port = port || 7001;
    this.manifest = JSON.parse(fs.readFileSync(pkg.oem.development[component], 'utf8'));
    this.jsFiles = this.getJsFiles();
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
        var htmlDescription = "";
        var htmlExamples = "";
        var htmlTests = "";
        var htmlUsage = "";

        // get html partials
        try {
            htmlDescription = fs.readFileSync(this.manifest.templates.description, 'utf8');
        } catch (err) {
            // noop
        }
        try {
            htmlExamples = fs.readFileSync(this.manifest.templates.examples, 'utf8');
        } catch (err) {
            // noop
        }
        try {
            htmlTests = fs.readFileSync(this.manifest.templates.tests, 'utf8');
        } catch (err) {
            // noop
        }
        try {
            htmlUsage = fs.readFileSync(this.manifest.templates.usage, 'utf8');
        } catch (err) {
            // noop
        }

        console.log('description', htmlDescription);

        // now update the main html
        fs.readFile("./cli/templates/development/main.html", 'utf8', function(err, data) {
            data = data
                .replace("<!-- HTML:DESCRIPTION -->", htmlDescription, 'utf8')
                .replace("<!-- HTML:EXAMPLES -->", htmlExamples, 'utf8')
                .replace("<!-- HTML:TESTS -->", htmlTests, 'utf8')
                .replace("<!-- HTML:USAGE -->", htmlUsage, 'utf8')
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


        // files from development components loaded during development
        var devComponentFiles = this.manifest.development.configurations.map(function(configuration) {
            var config = JSON.parse(fs.readFileSync(pkg.oem.development[configuration], 'utf8'));
            return config.files;
        });

        // source files
        var srcFiles = this.manifest.files;

        // test core and component test files
        var testFiles = [];
        testFiles.push("./src/core/modules/Test.js");
        testFiles.push(this.manifest.tests);

        // flatten arrays
        var allFiles = []
            .concat(...devComponentFiles)
            .concat(...srcFiles)
            .concat(...testFiles);

        // implement customization overwrites
        // if (this.manifest.development.customizations) {
        //     var customizations = this.manifest.development.customizations;
        //     var customization;
        //     var indexOfFileToReplace;
        //     for (var i = 0; i < customizations.length; i = i + 1) {
        //         customization = customizations[i];
        //         indexOfFileToReplace = allFiles.indexOf(customization.replace);
        //         if (indexOfFileToReplace > -1) allFiles.splice(indexOfFileToReplace, 1, customization.with);
        //     }
        // }

        console.log(allFiles);

        return allFiles;
    }
};

module.exports = {
    DevelopComponent: DevelopComponent
};