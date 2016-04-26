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
 * Component Creator
 */
var CreateComponent = function(componentName){
    this.fileName = componentName;
    this.componentName = 'th-' + componentName;
    this.componentClass = this.convertNameToClass(componentName);
    this.componentDir = './src/components/'+this.fileName;
    this
    .createDirectory()
    .copyAndFormatTemplates()
    .updatePackageJson()
    .launch();
};

CreateComponent.prototype = {

    createDirectory: function(){
        // console.log('create component', this.componentName, this.componentClass);
        try {
            fs.mkdirSync(this.componentDir);
        } catch (err) {
            if(err) console.log("ERROR".red, err);
        }
        return this;
    },

    renderTemplate: function(str){
        str = str.replace(new RegExp('%NAME%', 'g'), this.componentName);
        str = str.replace(new RegExp('%CLASS%', 'g'), this.componentClass);
        return str;
    },

    copyAndFormatTemplates: function(){

        // collector
        var collector = fs.readFileSync("./templates/component/component.collector.js", "utf8");
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.collector.js', this.renderTemplate(collector));

        // controller
        var controller = fs.readFileSync('./templates/component/component.controller.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.controller.js', this.renderTemplate(controller));

        // demo
        var demo = fs.readFileSync('./templates/component/component.demo.html', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.demo.html', this.renderTemplate(demo));

        // gfx
        var gfx = fs.readFileSync('./templates/component/component.gfx.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.gfx.js', this.renderTemplate(gfx));

        // model
        var model = fs.readFileSync('./templates/component/component.model.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.model.js', this.renderTemplate(model));

        // test
        var test = fs.readFileSync('./templates/component/component.test.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.test.js', this.renderTemplate(test));

        // view
        var view = fs.readFileSync('./templates/component/component.view.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.view.js', this.renderTemplate(view));

        return this;

    },

    updatePackageJson: function(){

        // add development node
        var newComponent = {};
        newComponent.configuration = ["core", this.fileName];
        newComponent.tests = ["./src/components/"+this.fileName+"/"+this.fileName+".test.js"];
        newComponent.demo = "./src/components/"+this.fileName+"/"+this.fileName+".demo.html";
        pkg.oem.development[this.fileName] = newComponent;

        // configuration
        pkg.oem.configurations[this.fileName] = [
            "./src/components/"+this.fileName+"/"+this.fileName+".gfx.js",
            "./src/components/"+this.fileName+"/"+this.fileName+".model.js",
            "./src/components/"+this.fileName+"/"+this.fileName+".view.js",
            "./src/components/"+this.fileName+"/"+this.fileName+".controller.js",
            "./src/components/"+this.fileName+"/"+this.fileName+".collector.js"
        ];

        // save to package
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));
    
        return this;
    },

    launch: function(){
        var componentDevelopmentServer = new ComponentDevelopmentServer(this.fileName);
        componentDevelopmentServer.start();
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
