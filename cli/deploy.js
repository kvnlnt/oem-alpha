const pkg = require('../package');
const fs = require('fs-extra');
const UglifyJS = require("uglify-js");
const UglifyCss = require("uglifycss");
const chalk = require('chalk');
const exec = require('child_process').exec;
const opener = require("opener");
const util = require('./util');

const Deployment = function (deployment, autoLaunch) {
    this.deployment = deployment;
    this.autoLaunch = typeof autoLaunch === "undefined" ? true : autoLaunch;
    this.components = pkg.oem.deployments[deployment];
    this.manifests = util.getManifests(pkg.oem.deployments[this.deployment]);
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
    this.reset().deployJs().deployCss().createReport().reply();
};

Deployment.prototype = {

    concatFiles: function(fileList){
        return fileList.map(function(file){
            return fs.readFileSync(file, 'utf-8');
        }).join('\n');
    },

    createReport: function () {


        // write html file
        var template = fs.readFileSync('./cli/templates/deployment/main.html', 'utf-8');
        var html = '';


        // header
        html += '<h1>Deployment</h1>';
        html += '<table>'
        html += '<tr>';
        html += '<th>Configuration</th>';
        html += '<td>'+this.deployment+'</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>Generated</th>';
        html += '<td>'+util.getDateTime()+'</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>Js Artifacts</th>';
        html += '<td>';
        html += '<a target="_blank" href="'+this.jsFileName+'">'+this.jsFileName+'</a> ('+util.getFilesizeInKB(this.jsFile)+'kb), ';
        html += '<a target="_blank" href="'+this.jsFileMinifiedName+'">'+this.jsFileMinifiedName+'</a> ('+util.getFilesizeInKB(this.jsFileMinified)+'kb) ';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>Css Artifacts</v>';
        html += '<td>';
        html += '<a target="_blank" href="'+this.cssFileName+'">'+this.cssFileName+'</a> ('+util.getFilesizeInKB(this.cssFile)+'kb), ';
        html += '<a target="_blank" href="'+this.cssFileMinifiedName+'">'+this.cssFileMinifiedName+'</a> ('+util.getFilesizeInKB(this.cssFileMinified)+'kb)';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>Components</th>';
        html += '<td>'+this.manifests.map(function(manifest){ return '<a href="#'+manifest.name+'">'+manifest.name+'</a>' }).join(', ')+'</td>';
        html += '</tr>';
        html += '</table>';

        // components
        this.manifests.forEach(function(manifest){
            html += '<section id="'+manifest.name+'">';
            html += fs.readFileSync(manifest.templates.description, 'utf8');
            html += '<p><strong>Scripts</strong><br/><small>' + manifest.scripts.join('<br/>') + '</small></p>';
            html += '</section>';
        });

        template = template.replace("<!-- HTML -->", html, 'utf8')
        fs.outputFileSync(this.directory + '/index.html', template);

        // launch pattern lib
        if(this.autoLaunch) opener(this.directory + '/index.html');

        return this;
    },

    deployCss: function(){
        var concatCss = this.concatFiles(this.cssFiles);
        fs.outputFileSync(this.cssFile, concatCss);
        var minifiedCss = UglifyCss.processString(concatCss);
        fs.writeFileSync(this.cssFileMinified, minifiedCss);
        return this;
    },

    deployJs: function(){
        var concatJs = this.concatFiles(this.jsFiles);
        fs.outputFileSync(this.jsFile, concatJs);
        var minifiedJs = UglifyJS.minify(this.jsFile);
        fs.writeFileSync(this.jsFileMinified, minifiedJs.code);
        return this;
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

    reset: function(){
        // recreate directory
        fs.removeSync(this.directory);
        fs.mkdirsSync(this.directory);
        return this;
    }

};

module.exports = {
    Deployment:Deployment
};