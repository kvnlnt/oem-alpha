const pkg = require('../../package');
const fs = require('fs-extra');
const UglifyJS = require("uglify-js");
const UglifyCss = require("uglifycss");
const chalk = require('chalk');
const exec = require('child_process').exec;
const opener = require("opener");
const util = require('../helpers/util');

/**
 * Component Development Server
 */
const Deployment = function (deployment, autoLaunch) {
    this.deployment = deployment;
    this.autoLaunch = typeof autoLaunch === "undefined" ? true : autoLaunch;
    this.components = pkg.oem.deployments[deployment];
    this.directory = './deploy/'+deployment;
    this.jsFileName = "oem.js";
    this.jsFile = this.directory + "/" + this.jsFileName;
    this.jsFileMinifiedName = "oem.min.js";
    this.jsFileMinified = this.directory + "/" + this.jsFileMinifiedName;
    this.jsFiles = this.getJs();
    this.cssFileName = "oem.css";
    this.cssFile = this.directory + "/" + this.cssFileName;
    this.cssFileMinifiedName = "oem.min.css";
    this.cssFileMinified = this.directory + "/" + this.cssFileMinifiedName;
    this.cssFiles = this.getCss();
    this.deploy().reply();
};

Deployment.prototype = {

    /**
     * Main CLI prompt
     *
     * @method     start
     */
    deploy: function () {

        // recreate directory
        fs.removeSync(this.directory);
        fs.mkdirsSync(this.directory);

        // js
        var concatJs = this.concatFiles(this.jsFiles);
        fs.outputFileSync(this.jsFile, concatJs);
        var minifiedJs = UglifyJS.minify(this.jsFile);
        fs.writeFileSync(this.jsFileMinified, minifiedJs.code);

        // css
        var concatCss = this.concatFiles(this.cssFiles);
        fs.outputFileSync(this.cssFile, concatCss);
        var minifiedCss = UglifyCss.processString(concatCss);
        fs.writeFileSync(this.cssFileMinified, minifiedCss);

        // write html file
        var template = fs.readFileSync('./cli/templates/deployment/main.html', 'utf-8');
        var html = '';
        var manifests = pkg.oem.deployments[this.deployment].map(function(component){
            return util.loadAndParseJson(pkg.oem.development[component]);
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
        html += '<td>Js Artifacts</td>';
        html += '<td>';
        html += '<a target="_blank" href="'+this.jsFileName+'">'+this.jsFileName+'</a> ('+this.getFilesizeInKB(this.jsFile)+'kb), ';
        html += '<a target="_blank" href="'+this.jsFileMinifiedName+'">'+this.jsFileMinifiedName+'</a> ('+this.getFilesizeInKB(this.jsFileMinified)+'kb) ';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>Css Artifacts</td>';
        html += '<td>';
        html += '<a target="_blank" href="'+this.cssFileName+'">'+this.cssFileName+'</a> ('+this.getFilesizeInKB(this.cssFile)+'kb), ';
        html += '<a target="_blank" href="'+this.cssFileMinifiedName+'">'+this.cssFileMinifiedName+'</a> ('+this.getFilesizeInKB(this.cssFileMinified)+'kb)';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>Components</td>';
        html += '<td>'+manifests.map(function(manifest){ 
            return '<a href="#'+manifest.name+'">'+manifest.name+'</a>' }).join(', ')+'</td>';
        html += '</tr>';
        html += '</table>';

        // // components
        manifests.forEach(function(manifest){
            html += '<section id="'+manifest.name+'">';
            html += fs.readFileSync(manifest.templates.description, 'utf8');
            html += '<p><strong>Scripts</strong><br/><small>' + manifest.scripts.join('<br/>') + '</small></p>';
            html += '</section>';
        });

        template = template.replace("<!-- HTML -->", html, 'utf8')
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
    getJs: function() {

        // files from development components loaded during development
        var scripts = this.components.map(function(component) {
            var config = JSON.parse(fs.readFileSync(pkg.oem.development[component], 'utf8'));
            return config.scripts;
        });

        // flatten arrays
        var scripts = [].concat(...scripts);

        return scripts;
    },

    getCss: function() {

        // files from development components loaded during development
        var styles = this.components.map(function(component) {
            var config = JSON.parse(fs.readFileSync(pkg.oem.development[component], 'utf8'));
            return config.styles;
        }).filter(function(style){ return style != void 0});

        // flatten arrays
        var styles = [].concat(...styles);

        return styles;
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