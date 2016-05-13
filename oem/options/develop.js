const pkg = require('../../package');
const fs = require("fs");
const http = require('http');
const exec = require('child_process').exec;
const path = require('path');
const chalk = require('chalk');

// content type enums
const CONTENT_TYPE = {};
CONTENT_TYPE.HTML = "text/html";
CONTENT_TYPE.JS = "application/javascript";
CONTENT_TYPE.PNG = "image/png";
CONTENT_TYPE.JPG = "image/jpg";
CONTENT_TYPE.CSS = "text/css";

/**
 * Component Development Server
 */
const DevelopComponent = function (component, port) {
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
    start: function () {
        var that = this;
        this.server = http
        .createServer(this.handleServerRequests.bind(this))
        .listen(this.port, function() {

            console.log("");
            console.log("");
            console.log(chalk.bgWhite("       "));
            console.log(chalk.black.bgWhite("  OEM  "), " DEVELOP ");
            console.log(chalk.bgWhite("       "));
            console.log("");
            console.log("");

            console.log("Component:", that.component);
            console.log("Server:","http://localhost:" + that.port);
            var cmd = 'open http://localhost:'+that.port;
            exec(cmd, function(error, stdout, stderr) {
              // command output is in stdout
            });

            console.log("");
            console.log("");

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
            fs.readFile("./oem/templates/development/main.html", 'utf8', function(err, data){
                data = data
                .replace("<!-- HTML:DESCRIPTION -->", templateDescription, 'utf8')
                .replace("<!-- HTML:EXAMPLES -->", templateExamples, 'utf8')
                .replace("<!-- HTML:TESTS -->", templateTests, 'utf8')
                .replace("<!-- HTML:USAGE -->", templateUsage, 'utf8')
                .replace("<!-- JS -->", that.wrapInScriptTag(that.jsFiles));
                console.log(chalk.gray("Served: "), './');
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
                    console.log(chalk.gray("Served: "), filePath);
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
        var srcFiles = pkg.oem.development[this.component].components.map(function(component){
            return pkg.oem.components[component].files;
        });

        // test core and component test files
        var testFiles = [];
        testFiles.push("./src/core/Test.js");
        testFiles.push(pkg.oem.components[this.component].tests);

        // flatten arrays
        var allFiles = []
        .concat(...srcFiles)
        .concat(...testFiles);

        // implement customization overwrites
        if(pkg.oem.development[this.component].hasOwnProperty('customizations')){
            var customizations = pkg.oem.development[this.component].customizations;
            var customization;
            var indexOfFileToReplace;
            for(var i = 0; i < customizations.length; i = i + 1){
                customization = customizations[i];
                indexOfFileToReplace = allFiles.indexOf(customization.replace);
                if(indexOfFileToReplace > -1) allFiles.splice(indexOfFileToReplace, 1, customization.with);
            }          
        }

        // console.log(allFiles);

        return allFiles;
    }
};

module.exports = {
    DevelopComponent:DevelopComponent
};