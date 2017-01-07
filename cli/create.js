const fs = require("fs");
const oem = require('../oem.json');
const chalk = require('chalk');

const CreateComponent = function(componentName) {
    this.componentName = componentName;
    this.componentClass = this.convertNameToClass(componentName);
    this.componentDir = './development/' + this.componentName;
    this.templatesDir = './development/' + this.componentName + '/templates';
    this.createDirectory().copyAndFormatTemplates().updatePackageJson().launch();
};

CreateComponent.prototype = {

    convertNameToClass: function(name) {
        return name.split('-').map(function(segment) {
            return segment.charAt(0).toUpperCase() + segment.slice(1);
        }).join('');
    },

    copyAndFormatTemplates: function() {

        // html
        var decription = fs.readFileSync('./cli/templates/development/new/templates/description.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/description.html', this.renderTemplate(decription));
        var examples = fs.readFileSync('./cli/templates/development/new/templates/examples.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/examples.html', this.renderTemplate(examples));
        var tests = fs.readFileSync('./cli/templates/development/new/templates/tests.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/tests.html', this.renderTemplate(tests));
        var usage = fs.readFileSync('./cli/templates/development/new/templates/usage.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/usage.html', this.renderTemplate(usage));

        // module
        var module = fs.readFileSync('./cli/templates/development/new/module.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/module.js', this.renderTemplate(module));

        // prototype
        var prototype = fs.readFileSync('./cli/templates/development/new/prototype.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/prototype.js', this.renderTemplate(prototype));

        // test
        var test = fs.readFileSync('./cli/templates/development/new/test.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/test.js', this.renderTemplate(test));

        // example
        var example = fs.readFileSync('./cli/templates/development/new/examples.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/examples.js', this.renderTemplate(example));

        // css
        var css = fs.readFileSync('./cli/templates/development/new/style.css', 'utf-8');
        fs.writeFileSync(this.componentDir + '/style.css', this.renderTemplate(css));

        // manifest
        var manifest = fs.readFileSync('./cli/templates/development/new/manifest.json', 'utf-8');
        fs.writeFileSync(this.componentDir + '/manifest.json', this.renderTemplate(manifest));

        return this;
    },

    createDirectory: function() {
        // console.log('create component', this.componentName, this.componentClass);
        try {
            fs.mkdirSync(this.componentDir);
            fs.mkdirSync(this.templatesDir);
            return this;
        } catch (err) {
            if (err) console.log("ERROR".bold, err);
        }

        return this;
    },

    updatePackageJson: function() {

        oem.development[this.componentName] = this.componentDir + "/manifest.json";
        var sortedObject = {};
        var keys = Object.keys(oem.development);
        keys.sort();
        keys.forEach(function(key){
            sortedObject[key] = oem.development[key];
        });
        oem.development = sortedObject;

        // save to package
        fs.writeFileSync('./oem.json', JSON.stringify(oem, null, 4));

        return this;
    },

    launch: function() {
        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " CREATE ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");
        console.log('Component', chalk.bold(this.componentName), 'has been created');
        console.log("");
        console.log("");
    },

    renderTemplate: function(str) {
        str = str.replace(new RegExp('%CLASS%', 'g'), this.componentClass);
        str = str.replace(new RegExp('%DIR%', 'g'), this.componentDir);
        return str;
    }
    
};

module.exports = {
    CreateComponent: CreateComponent
};