const pkg = require('../../package');
const fs = require('fs');
const UglifyJS = require("uglify-js");
const chalk = require('chalk');

/**
 * Component Development Server
 */
const Deployment = function (config) {
    this.config = config;
    this.directory = './deploy/'+this.config;
    this.jsFile = this.directory + "/oem.js";
    this.jsFileMinified = this.directory + "/oem.min.js";
    this.jsFiles = this.getJsFiles();
    this
    .deploy()
    .reply();
};

Deployment.prototype = {

    /**
     * Main CLI prompt
     *
     * @method     start
     */
    deploy: function () {

        // concat file contents
        var concatedFileContents = this.concatFiles(this.jsFiles);

        // recreate directory
        this.deleteFolderRecursive(this.directory);
        fs.mkdirSync(this.directory);

        // write javascript file
        fs.writeFileSync(this.jsFile, concatedFileContents);

        // write minified version
        var minifiedFileContents = UglifyJS.minify(this.jsFile);
        fs.writeFileSync(this.jsFileMinified, minifiedFileContents.code);

        // write html file
        var template = fs.readFileSync('./oem/templates/deployment/main.html', 'utf-8');
        var html = '';
        html += '<dl class="oem oem-pattern-list">\n';
        pkg.oem.deployment[this.config].configuration.forEach(function(config){
            html += '<dt><h2 class="oem">'+config+'<h2></dt>\n';
            html += '<dd>'+config+'</dd>\n';
        });
        html += '</dl>';
        template = template.replace("<!-- HTML -->", html, 'utf8')
        fs.writeFileSync(this.directory + '/index.html', template);

        return this;

    },

    getJsFiles: function(){
        // get all source files
        var srcFiles = pkg.oem.deployment[this.config].configuration.map(function(config){
            return pkg.oem.configurations[config];
        });

        // flatten arrays
        var allFiles = []
        .concat(...srcFiles);

        // implement customization overwrites
        if(pkg.oem.deployment[this.config].hasOwnProperty('customization')){
            var customizations = pkg.oem.deployment[this.config].customization;
            var customization;
            var indexOfFileToReplace;
            for(var i = 0; i < customizations.length; i = i + 1){
                customization = customizations[i];
                indexOfFileToReplace = allFiles.indexOf(customization.replace);
                if(indexOfFileToReplace > -1) allFiles.splice(indexOfFileToReplace, 1, customization.with);
            }          
        }
        return allFiles;
    },

    reply: function(){
        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " DEPLOY ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");
        console.log('Deployed', chalk.bold(this.config), ', see files in ./deploy/'+this.config + ' folder');
        console.log("");
        console.log("");
    },

    concatFiles: function(fileList){
        return fileList.map(function(file){
            return fs.readFileSync(file, 'utf-8');
        }).join('\n');
    },

    deleteFolderRecursive: function(path) {
      if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
          var curPath = path + "/" + file;
          if(fs.lstatSync(curPath).isDirectory()) { // recurse
            deleteFolderRecursive(curPath);
          } else { // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
      }
    }

};

module.exports = {
    Deployment:Deployment
};