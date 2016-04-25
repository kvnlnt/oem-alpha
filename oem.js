var fs = require("fs");
var path = require('path');
var pkg = require('./package');
var http = require('http');
var colors = require('colors');

var TASKS = {};
TASKS.START_DEVELOPING_COMPONENT = "Start Developing A Component";
TASKS.START_A_BUILD = "Start A Deployment";
TASKS.START_PATTERN_LIBRARY = "Start The Pattern Library";
TASKS.START_NEW_COMPONENT = "Start A New Component";
TASKS.START_NEW_DEPLOYMENT = "Start A New Deployment";

// content type enums
var CONTENT_TYPE = {};
CONTENT_TYPE.HTML = "text/html";
CONTENT_TYPE.JS = "application/javascript";
CONTENT_TYPE.PNG = "image/png";
CONTENT_TYPE.JPG = "image/jpg";
CONTENT_TYPE.CSS = "text/css";

// argument enums
var ARG = {};
ARG.HELP = 'help';
ARG.DEVELOP = 'develop';

// cli args
var ARGS = process.argv.filter(function(arg, i){ return i > 1; });

var ComponentDevelopmentServer = function (component, port) {
    this.component = component;
    this.jsFiles = this.getJsFiles();
    this.port = port || 7001;
    this.template = fs.readFileSync("./templates/development/component.html", 'utf8');
    this.demoHtml = fs.readFileSync(pkg.oem.development[this.component].demo, 'utf8');
    this.server;
};

ComponentDevelopmentServer.prototype = {

    /**
     * Main CLI prompt
     *
     * @method     start
     */
    start: function () {
        var that = this;
        this.server = http
        .createServer(this.handleRequests.bind(this))
        .listen(this.port, function() {
            console.log(" OEM ".inverse.green, "http://localhost:" + that.port);
        });
    },

    /**
     * Handle http requests
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    handleRequests: function(req, res) {

        if (req.url === "/") {

            var template;
            template = this.template
            .replace("<!-- HTML -->", this.demoHtml)
            .replace("<!-- JS -->", this.wrapInScriptTag(this.jsFiles));
            res.writeHead(200, { "Content-Type": CONTENT_TYPE.HTML });
            res.write(template);
            res.end();

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
        var srcFiles = pkg.oem.development[this.component].configuration.map(function(config){
            return pkg.oem.configurations[config];
        });

        var testFiles = pkg.oem.development[this.component].tests;

        var jsFiles = [].concat(...srcFiles).concat(testFiles);
        return jsFiles;
    }

};

/**
 * Show help
 * @return {[type]} [description]
 */
function showHelp(){
    console.log();
    console.log(" OEM ".inverse.yellow);
    console.log();
    console.log("USAGE".yellow);
    console.log("--------------------------------------------");
    console.log("node oem [option] [arguments]");
    console.log();
    console.log("OPTIONS".yellow);
    console.log("--------------------------------------------");
    console.log(ARG.HELP.bold, "            Usage documentation");
    console.log(ARG.DEVELOP.bold, "         Launch development server for a component");
    console.log("   Arguments:".italic, "   [Component Name] [Port - Defaults to 7001]");
    console.log("   Example:".italic, "     node develop card".blue);
    console.log();
    console.log();
}

// trigger
try {
    switch(ARGS[0]){
        case ARG.DEVELOP:
            if(ARGS[1] === void 0) throw 'please specify a component';
            var componentDevelopmentServer = new ComponentDevelopmentServer(ARGS[1], ARGS[2]);
            componentDevelopmentServer.start();
            break;
        case ARG.HELP:
            showHelp();
            break;
        default:
            showHelp();
    }
} catch(err) {
    console.log('ERROR'.red, err);
}
