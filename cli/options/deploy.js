const pkg = require('../../package');
const fs = require('fs-extra');
const UglifyJS = require("uglify-js");
const chalk = require('chalk');
const exec = require('child_process').exec;
const opener = require("opener");

/**
 * Component Development Server
 */
const Deployment = function (deployment) {
    this.deployment = deployment;
    this.configs = pkg.oem.deployments[deployment];
    this.directory = './deploy/'+deployment;
    this.jsFile = this.directory + "/oem.js";
    this.jsFileMinified = this.directory + "/oem.min.js";
    this.jsFiles = this.getJsFiles();
    this.deploy().reply();
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
        fs.removeSync(this.directory);
        fs.mkdirsSync(this.directory);

        // write javascript file
        fs.outputFileSync(this.jsFile, concatedFileContents);

        // write minified version
        var minifiedFileContents = UglifyJS.minify(this.jsFile);
        fs.writeFileSync(this.jsFileMinified, minifiedFileContents.code);

        // write html file
        var template = fs.readFileSync('./cli/templates/deployment/main.html', 'utf-8');
        var html = '';
        var components = pkg.oem.deployments[this.deployment];

        // header
        html += '<h1>Deployment</h1>';
        html += '<p>This <em>'+this.deployment+'</em> deployment configuration report was generated on '+this.getDateTime()+'</p>';

        // artifacts
        html += "<h2>Artifacts</h2>";
        html += "<p>"+this.jsFile+" ("+this.getFilesizeInKB(this.jsFile)+"kb)</p>";
        html += "<p>"+this.jsFileMinified+" ("+this.getFilesizeInKB(this.jsFileMinified)+"kb)</p>";

        html += "<h2>Components</h2>";
        html += '<p>The following components were auto generated.</p>';

        // components
        components.forEach(function(component){
            var componentConfig = JSON.parse(fs.readFileSync(pkg.oem.development[component], 'utf8'));
            html += '<section>';          
            html += fs.readFileSync(componentConfig.templates.description, 'utf8');
            html += '</section>';
        });

        // files
        html += "<h2>Files</h2>";
        html += "<p>Files included in this deployment</p>";
        html += this.jsFiles.join("<br/>");

        template = template.replace("<!-- HTML -->", html, 'utf8')
        fs.outputFileSync(this.directory + '/index.html', template);

        // launch pattern lib
        opener(this.directory + '/index.html');

        return this;

    },

    getFilesizeInKB: function(filename) {
     var stats = fs.statSync(filename)
     var fileSizeInBytes = stats["size"]
     return Math.ceil(fileSizeInBytes / 1024);
    },

    getDateTime: function() {

        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return month + '/' + day + '/' + year + " @ " + hour + ":" + min + ":" + sec;

    },

    /**
     * Start Component's JS files
     *
     * @method     startDevelopingComponent
     * @param      {<type>}  answers  { description }
     */
    getJsFiles: function() {

        // files from development components loaded during development
        var js = this.configs.map(function(config) {
            var config = JSON.parse(fs.readFileSync(pkg.oem.development[config], 'utf8'));
            return config.files;
        });

        // flatten arrays
        var allFiles = []
            .concat(...js);

        // implement customization overwrites
        // if (this.config.customizations) {
        //     var customizations = this.config.customizations;
        //     var customization;
        //     var indexOfFileToReplace;
        //     for (var i = 0; i < customizations.length; i = i + 1) {
        //         customization = customizations[i];
        //         indexOfFileToReplace = allFiles.indexOf(customization.replace);
        //         if (indexOfFileToReplace > -1) allFiles.splice(indexOfFileToReplace, 1, customization.with);
        //     }
        // }
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
        console.log('Deployed', chalk.bold(this.deployment), ', see files in ./deploy/'+this.deployment + ' folder');
        console.log("");
        console.log("");
    },

    concatFiles: function(fileList){
        return fileList.map(function(file){
            return fs.readFileSync(file, 'utf-8');
        }).join('\n');
    }

};

module.exports = {
    Deployment:Deployment
};