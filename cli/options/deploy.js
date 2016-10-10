const pkg = require('../../package');
const fs = require('fs-extra');
const UglifyJS = require("uglify-js");
const chalk = require('chalk');
const exec = require('child_process').exec;
const opener = require("opener");

/**
 * Component Development Server
 */
const Deployment = function (deployment, autoLaunch) {
    this.deployment = deployment;
    this.autoLaunch = typeof autoLaunch === "undefined" ? true : autoLaunch;
    this.manifests = pkg.oem.deployments[deployment];
    this.directory = './deploy/'+deployment;
    this.jsFileName = "oem.js";
    this.jsFile = this.directory + "/" + this.jsFileName;
    this.jsFileMinifiedName = "oem.min.js";
    this.jsFileMinified = this.directory + "/" + this.jsFileMinifiedName;
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
        var manifests = pkg.oem.deployments[this.deployment].map(function(component){
            var manifest = pkg.oem.development[component];
            return JSON.parse(fs.readFileSync(manifest, 'utf-8'));
        });

        var that = this;

        // header
        html += '<h1>Deployment</h1>';
        html += '<table>'
        html += '<tr>';
        html += '<td>Configuration</td>';
        html += '<td>'+this.deployment+'</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>Generated</td>';
        html += '<td>'+this.getDateTime()+'</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>Artifact</td>';
        html += '<td><a target="_blank" href="'+this.jsFileName+'">'+this.jsFileName+'</a> ('+this.getFilesizeInKB(this.jsFile)+'kb)</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>Artifact Minified</td>';
        html += '<td><a target="_blank" href="'+this.jsFileMinifiedName+'">'+this.jsFileMinifiedName+'</a> ('+this.getFilesizeInKB(this.jsFileMinified)+'kb)</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>Components</td>';
        html += '<td>'+manifests.map(function(manifest){ return '<a href="#'+manifest.name+'">'+manifest.name+'</a>' }).join(', ')+'</td>';
        html += '</tr>';
        html += '</table>';

        // // components
        manifests.forEach(function(manifest){
            html += '<section>';          
            html += fs.readFileSync(manifest.templates.description, 'utf8');
            html += '<p><strong>Files</strong><br/><small>' + manifest.files.join('<br/>') + '</small></p>';
            html += '</section>';
        });

        // template = template.replace("<!-- HTML -->", html, 'utf8')
        fs.outputFileSync(this.directory + '/index.html', template);

        // // launch pattern lib
        if(this.autoLaunch) opener(this.directory + '/index.html');

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
        var js = this.manifests.map(function(manifest) {
            var config = JSON.parse(fs.readFileSync(pkg.oem.development[manifest], 'utf8'));
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