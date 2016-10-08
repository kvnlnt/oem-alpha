const pkg = require('../../package');
const fs = require('fs-extra');
const UglifyJS = require("uglify-js");
const chalk = require('chalk');
const exec = require('child_process').exec;
const opener = require("opener");
const Deployment = require('./deploy').Deployment;

/**
 * Component Development Server
 */
const Demo = function (demo) {
    this.demo = demo;
    this.components = pkg.oem.deployments[pkg.oem.demos[this.demo].deployment];
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
        fs.copySync(this.deployment.jsFileMinified, this.directory + '/' + this.deployment.jsFileMinified);

        // write html file
        var template = fs.readFileSync('./cli/templates/demo/main.html', 'utf-8');
        var description = null;
        var usage = null;
        var examples = null;
        var html = '';

        html += '<h1>Pattern Library</h1>';
        html += '<p>The following components were auto generated from the <em>'+this.demo+'</em> demo configuration.</p>';

        // menu
        this.components.forEach(function(component){
            if(component != 'core'){
                html += '<a href="#'+component+'">'+component+'</a>  &nbsp;';
            }
        });

        // components
        this.components.forEach(function(component){
            if(component != 'core'){
                try {
                    description = fs.readFileSync('./src/components/' + component + '/templates/description.html');
                } catch (err) {
                    // noop
                }
                try {
                    usage = fs.readFileSync('./src/components/' + component + '/templates/usage.html');                    
                } catch(err) {
                    // noop
                }
                try {
                    examples = fs.readFileSync('./src/components/' + component + '/templates/examples.html');                    
                } catch(err){
                    // noop
                }
                html += '<a name="'+component+'"></a>';
                html += '<section>';           
                if(description) html += description;
                if(usage) html += usage;
                if(examples) html += examples;
                html += '</section>';
            }
        });

        template = template.replace("<!-- HTML -->", html, 'utf8')
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