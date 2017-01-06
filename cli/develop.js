const express = require('express');
const app = express();
const oem = require('../oem.json');
const fs = require("fs");
const http = require('http');
const exec = require('child_process').exec;
const path = require('path');
const chalk = require('chalk');
const util = require('./util');

const DevelopComponent = function(component, args) {
    this.options = util.getOptions(args);
    this.component = component;
    this.port = this.options.port || 7001;
    this.manifest = util.loadAndParseJson(oem.development[component]);
    this.components = this.getComponentList();
    this.server;
    this.start();
};

DevelopComponent.prototype = {

    handleServerRequest: function(req, res) {

        var that = this;

        // now update the main html
        fs.readFile("./cli/templates/development/main.html", 'utf8', function(err, data) {
            data = data
                .replace("<!-- HTML -->", that.getHtml(), 'utf8')
                .replace("<!-- JS -->", util.createScriptTagLinks(that.getJs()))
                .replace("<!-- CSS -->", util.createCssTagLinks(that.getCss()))
            res.send(data);
            res.end();
        });
    },

    getComponentList: function(){
        var components = [];

        // load dependencies first
        try {
            this.manifest.dependencies.forEach(function(component){
                components.push(component);
            });
        } catch(err) {
            // noop
        }

        // development components
        try {
            this.manifest.components.forEach(function(component){
                components.push(component);
            });
        } catch(err) {
            // noop
        }

        // argument option components
        if(this.options.components) {
            this.options.components.split(',')
            .forEach(function(component){
                components.push(component);
            });
        }

        // add component being dev'd
        components.push(this.component);

        return components;
    },

    getJs: function(){
        return []
        .concat.apply([], util.getComponentScripts(this.components))
        .concat("./development/core/modules/Test.js")
        .concat(this.manifest.tests)
        .concat(this.manifest.examples)
        .filter(function(file){ return file != void 0});
    },

    getCss: function(){
        return []
        .concat.apply([], util.getComponentStyles(this.components))
        .concat("./development/core/modules/Test.css")
        .filter(function(file){ return file != void 0})
    },

    getHtml: function(){
        return util.getComponentTemplatesHtml(this.manifest.templates).join('');
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

    start: function() {
        app.use('/development', this.reportRequest, express.static('development'));
        app.get('/', this.reportRequest, this.handleServerRequest.bind(this));
        app.listen(this.port, this.onStart.bind(this));
    }
    
};

module.exports = {
    DevelopComponent: DevelopComponent
};