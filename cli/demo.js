const oem = require('../oem.json');
const fs = require('fs-extra');
const UglifyJS = require("uglify-js");
const chalk = require('chalk');
const exec = require('child_process').exec;
const opener = require("opener");
const Deployment = require('./deploy').Deployment;
const util = require('./util');

const Demo = function (demo, options) {
    this.demo = demo;
    this.components = oem.deployments[oem.demos[this.demo].deployment];
    this.directory = './demos/'+demo;
    this.manifests = util.getManifests(this.components);
    this.reset().copyDeploymentFiles().createDemoMenu().createDemoPages().reply();
};

Demo.prototype = {

    createDemoMenu: function () {

        var html = '';
        html += '<h1>'+this.demo+'</h1>';

        // menu
        html += '<ul>';
        this.manifests.forEach(function(manifest){
            html += '<li><a href="'+manifest.name+'.html">'+manifest.name+'</a></li>';
        });
        html += '</ul>';

        var template = fs.readFileSync('./cli/templates/demo/main.html', 'utf-8');
        template = template.replace("<!-- HTML -->", html, 'utf8');
        fs.outputFileSync(this.directory + '/index.html', template);

        // launch pattern lib
        opener(this.directory + '/index.html');

        return this;
    },

    copyDeploymentFiles: function(){
        // copy deployed files
        var deployment = new Deployment(oem.demos[this.demo].deployment, false);
        fs.copySync(deployment.jsFile, this.directory + '/' + deployment.jsFileName);
        fs.copySync(deployment.jsFileMinified, this.directory + '/' + deployment.jsFileMinifiedName);
        fs.copySync(deployment.cssFile, this.directory + '/' + deployment.cssFileName);
        fs.copySync(deployment.cssFileMinified, this.directory + '/' + deployment.cssFileMinifiedName);
        return this;
    },

    createDemoPages: function(){

         // write html file
        var description = null;
        var usage = null;
        var examples = null;
        var html = null;
        var that = this;

        // components
        this.manifests.forEach(function(manifest){
            html = '';
            html += '<h1>'+that.demo+'</h1>'; 
            html += '<a href="index.html">&#8592; back</a>';
            if(manifest.templates){
                if(manifest.templates.description) html += fs.readFileSync(manifest.templates.description, 'utf-8');
                if(manifest.templates.examples) html += fs.readFileSync(manifest.templates.examples, 'utf-8');
                if(manifest.templates.usage) html += fs.readFileSync(manifest.templates.usage, 'utf-8');
            }
            var template = fs.readFileSync('./cli/templates/demo/main.html', 'utf-8')
            template = template.replace("<!-- HTML -->", html, 'utf8');
            fs.outputFileSync(that.directory + '/' + manifest.name + '.html', template);
        });

        return this;
    },

    reply: function(){
        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " DEMO ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");
        console.log('Demo', chalk.bold(this.demo), 'created, see files in ./demos/'+this.demo + ' folder');
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
    Demo:Demo
};