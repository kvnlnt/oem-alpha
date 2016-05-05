const pkg = require('../package');
const fs = require('fs');
var UglifyJS = require("uglify-js");

/**
 * Component Development Server
 */
const Deployment = function (config) {
    this.config = config;
    this.directory = './deploy/'+this.config;
    this.jsFile = this.directory + "/oem.js";
    this.jsFileMinified = this.directory + "/oem.min.js";
    this.start();
};

Deployment.prototype = {

    /**
     * Main CLI prompt
     *
     * @method     start
     */
    start: function () {

        // get all source files
        var srcFiles = pkg.oem.deployment[this.config].map(function(config){
            return pkg.oem.configurations[config];
        });

        // flatten arrays
        var allFiles = [].concat(...srcFiles);

        // concat file contents
        var concatedFileContents = this.concatFiles(allFiles);

        // recreate directory
        this.deleteFolderRecursive(this.directory);
        fs.mkdirSync(this.directory);

        // write javascript file
        fs.writeFileSync(this.jsFile, concatedFileContents);

        // write minified version
        var minifiedFileContents = UglifyJS.minify(this.jsFile);
        fs.writeFileSync(this.jsFileMinified, minifiedFileContents.code);

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