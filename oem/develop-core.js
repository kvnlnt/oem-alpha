const pkg = require('../package');
const fs = require("fs");
const http = require('http');
const exec = require('child_process').exec;
const path = require('path');
const Config = require('./config');
const CONTENT_TYPE = Config.CONTENT_TYPE;

/**
 * Component Development Server
 */
const DevelopCore = function (port) {
    this.jsFiles = this.getJsFiles();
    this.port = port || 7001;
    this.demoHtml = './templates/core/core.demo.html';
    this.server;
    this.start();
};

DevelopCore.prototype = {

    /**
     * Main CLI prompt
     *
     * @method     start
     */
    start: function () {
        var that = this;
        this.server = http
        .createServer(this.handleServerRequests.bind(this))
        .listen(this.port, function() {
            console.log(" OEM ", "http://localhost:" + that.port);
            var cmd = 'open http://localhost:'+that.port;
            exec(cmd, function(error, stdout, stderr) {
              // command output is in stdout
            });
        });
    },

    /**
     * Handle http requests
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    handleServerRequests: function(req, res) {

        if (req.url === "/") {
            var that = this;
            var demoHtml = fs.readFileSync(this.demoHtml, 'utf8');
            var template = fs.readFile("./templates/development/main.html", 'utf8', function(err, data){
                data = data.replace("<!-- HTML -->", demoHtml, 'utf8')
                .replace("<!-- JS -->", that.wrapInScriptTag(that.jsFiles));
                res.writeHead(200, { "Content-Type": CONTENT_TYPE.HTML });
                res.write(data);
                res.end();
            });
        // else serve asset
        } else {

            var filePath = '.' + req.url;
            var extname = path.extname(filePath);
            var contentType = this.getContentType(extname);

            fs.readFile(filePath, function(error, content) {
                if (error) {
                    if (error.code == 'ENOENT') {
                        res.writeHead(404);
                        res.end('404');
                        res.end();
                    } else {
                        res.writeHead(500);
                        res.end('500');
                        res.end();
                    }
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });

        }
    },

    /**
     * Get content type
     * @param  {[type]} extname [description]
     * @return {[type]}         [description]
     */
    getContentType: function(extname){
        var contentType = CONTENT_TYPE.HTML;
        switch (extname) {
            case '.js':
                contentType = CONTENT_TYPE.JS;
                break;
            case '.png':
                contentType = CONTENT_TYPE.PNG;
                break;
            case '.jpg':
                contentType = CONTENT_TYPE.JPG;
                break;
            case '.css':
                contentType = CONTENT_TYPE.CSS;
                break;
        }
        return contentType;
    },

    /**
     * Load script tags
     * @param  {[type]} files [description]
     * @return {[type]}       [description]
     */
    wrapInScriptTag: function(files) {
        var tags = '';
        files.forEach(function(file){
            tags += '<script src="'+file+'"></script>\n';        
        });
        return tags;
    },

    /**
     * Start Component's JS files
     *
     * @method     startDevelopingComponent
     * @param      {<type>}  answers  { description }
     */
    getJsFiles: function () {

        // component configuration files
        var srcFiles = pkg.oem.configurations.core;

        // test core and component test files
        var testFiles = [];
        testFiles.push("./src/core/Test.js");
        testFiles.push("./src/core/Collector.test.js");

        // flatten arrays
        var allFiles = []
        .concat(...srcFiles)
        .concat(testFiles);

        return allFiles;
    }
};

module.exports = {
    DevelopCore:DevelopCore
};