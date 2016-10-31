const pkg = require('../../package');
const fs = require('fs-extra');
const UglifyJS = require("uglify-js");
const chalk = require('chalk');
const exec = require('child_process').exec;
const opener = require("opener");
const Deployment = require('./deploy').Deployment;
const util = require('../helpers/util');

/**
 * Component Development Server
 */
const Demo = function (demo, options) {
    this.demo = demo;
    this.components = pkg.oem.demos[this.demo].components;
    this.directory = './demos/'+demo;
    this.deployment = new Deployment(pkg.oem.demos[this.demo].deployment, false);
    this.createDemo().reply();
};

Demo.prototype = {

    /**
     * Main CLI prompt
     *
     * @method     start
     */
    createDemo: function () {

        // recreate directory
        fs.removeSync(this.directory);
        fs.mkdirsSync(this.directory);

        // copy deployed files
        fs.copySync(this.deployment.jsFile, this.directory + '/' + this.deployment.jsFileName);
        fs.copySync(this.deployment.jsFileMinified, this.directory + '/' + this.deployment.jsFileMinifiedName);
        fs.copySync(this.deployment.cssFile, this.directory + '/' + this.deployment.cssFileName);
        fs.copySync(this.deployment.cssFileMinified, this.directory + '/' + this.deployment.cssFileMinifiedName);

        // write html file
        var template = fs.readFileSync('./cli/templates/demo/main.html', 'utf-8');
        var description = null;
        var usage = null;
        var examples = null;
        var html = '';
        var manifests = pkg.oem.deployments[this.demo].map(function(component){
            return util.loadAndParseJson(pkg.oem.development[component]);
        });

        html += '<h1>Demo</h1>';
        html += '<p>The following components were auto generated from the <em>'+this.demo+'</em> demo configuration.</p>';

        // menu
        manifests.forEach(function(manifest){
            html += '<a href="#'+manifest.name+'">'+manifest.name+'</a>  &nbsp;';
        });

        // components
        manifests.forEach(function(manifest){
            html += '<a name="'+manifest.name+'"></a>';
            html += '<section>';  
            if(manifest.templates){
                if(manifest.templates.description) html += fs.readFileSync(manifest.templates.description, 'utf-8');
                if(manifest.templates.usage) html += fs.readFileSync(manifest.templates.usage, 'utf-8');
                if(manifest.templates.examples) html += fs.readFileSync(manifest.templates.examples, 'utf-8');
            }
            html += '</section>';
        });

        template = template.replace("<!-- HTML -->", html, 'utf8');
        fs.outputFileSync(this.directory + '/index.html', template);

        // launch pattern lib
        opener(this.directory + '/index.html');

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
    }

};

module.exports = {
    Demo:Demo
};