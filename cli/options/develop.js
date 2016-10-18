const express = require('express');
const app = express();
const pkg = require('../../package');
const fs = require("fs");
const http = require('http');
const exec = require('child_process').exec;
const path = require('path');
const chalk = require('chalk');
const util = require('../helpers/util');

/**
 * Component Development Server
 */
const DevelopComponent = function(component, port) {
    this.component = component;
    this.port = port || 7001;
    this.manifest = util.loadAndParseJson(pkg.oem.development[component]);
    this.jsFiles = util.flattenList([
        util.getComponentScripts(this.manifest.development.components),
        this.manifest.files,
        ["./src/core/modules/Test.js", this.manifest.tests]
    ]);
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
        var html = util.getComponentTemplatesHtml(this.manifest.templates);

        // now update the main html
        fs.readFile("./cli/templates/development/main.html", 'utf8', function(err, data) {
            data = data
                .replace("<!-- HTML -->", html, 'utf8')
                .replace("<!-- JS -->", util.wrapInScriptTag(that.jsFiles));
            res.send(data);
            res.end();
        });
    }
};

module.exports = {
    DevelopComponent: DevelopComponent
};