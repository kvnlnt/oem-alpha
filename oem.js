var fs = require("fs");
var path = require('path');
var pkg = require('./package');
var http = require('http');
var colors = require('colors');
var exec = require('child_process').exec;

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
ARG.NEW = 'new';

// cli args
var ARGS = process.argv.filter(function(arg, i){ return i > 1; });

/**
 * Component Development Server
 *
 * @class
 * @param      {<type>}  component  { description }
 * @param      {<type>}  port       { description }
 */
var ComponentDevelopmentServer = function (component, port) {
    this.component = component;
    this.jsFiles = this.getJsFiles();
    this.port = port || 7001;
    this.template = fs.readFileSync("./templates/development/component.html", 'utf8');
    this.demoHtml = pkg.oem.development[this.component].demo;
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
        .createServer(this.handleServerRequests.bind(this))
        .listen(this.port, function() {
            console.log(" OEM ".inverse.green, "http://localhost:" + that.port);
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

            var template;
            var demoHtml = fs.readFileSync(this.demoHtml, 'utf8');
            template = this.template
            .replace("<!-- HTML -->", demoHtml, 'utf8')
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

        // component configuration files
        var srcFiles = pkg.oem.development[this.component].configuration.map(function(config){
            return pkg.oem.configurations[config];
        });

        // test core and component test files
        var testFiles = [];
        testFiles.push("./src/core/Test.js");
        testFiles.push(pkg.oem.development[this.component].tests);

        // flatten arrays
        var allFiles = []
        .concat(...srcFiles)
        .concat(testFiles);

        return allFiles;
    }
};

/**
 * Create Component
 */
var CreateComponent = function(componentName){
    this.componentName = componentName;
    this.componentClass = this.convertNameToClass(componentName);
    this.componentDir = './src/components/'+this.componentName;
    this
    .createDirectory()
    .copyFiles();
};

CreateComponent.prototype = {

    createDirectory: function(){
        console.log('create component', this.componentName, this.componentClass);
        try {
            fs.mkdirSync(this.componentDir);
        } catch (err) {
            if(err) console.log("ERROR".red, err);
        }
        return this;
    },

    renderTemplate: function(str){
        console.log(this.componentName, this.componentClass);
        return str
        .replace('COMPONENT_NAME', this.componentName)
        .replace('COMPONENT_CLASS', this.componentClass);
    },

    copyFiles: function(){

        // collector js
        var collector = fs.readFileSync('./templates/component/component.collector.txt', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.componentName + '.collector.js', this.renderTemplate(collector));

        // controller js
        var controller = fs.readFileSync('./templates/component/component.controller.txt', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.componentName + '.controller.js', this.renderTemplate(controller));


    },
    convertNameToClass: function(name){
        return name.split('-').map(function(segment){
            return segment.charAt(0).toUpperCase() + segment.slice(1);
        }).join('');
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
    console.log("   Example:".italic, "     node oem develop card".blue);
    console.log(ARG.NEW.bold, "             Create new component");
    console.log("   Arguments:".italic, "   [Component Name]. Note: Use dashes for multiple words");
    console.log("   Example:".italic, "     node oem new component-name".blue);
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
        case ARG.NEW:
            var newComponent = new CreateComponent(ARGS[1]);
            break;
        default:
            showHelp();
    }
} catch(err) {
    console.log('ERROR'.red, err);
}
