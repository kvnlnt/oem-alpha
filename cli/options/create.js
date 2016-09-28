const fs = require("fs");
const pkg = require('../../package');
const chalk = require('chalk');

/**
 * Component Creator
 */
const CreateComponent = function(componentName) {
    this.fileName = componentName;
    this.componentClass = this.convertNameToClass(componentName);
    this.componentDir = './src/components/' + this.fileName;
    this.templatesDir = './src/components/' + this.fileName + '/templates';
    this
        .createDirectory()
        .copyAndFormatTemplates()
        .updatePackageJson()
        .launch();
};

CreateComponent.prototype = {

    createDirectory: function() {
        // console.log('create component', this.componentName, this.componentClass);
        try {
            fs.mkdirSync(this.componentDir);
            fs.mkdirSync(this.templatesDir);
            return this;
        } catch (err) {
            if (err) console.log("ERROR".bold, err);
        }
    },

    renderTemplate: function(str) {
        str = str.replace(new RegExp('%CLASS%', 'g'), this.componentClass);
        return str;
    },

    copyAndFormatTemplates: function() {

        // html
        var decription = fs.readFileSync('./cli/templates/new-component/templates/description.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/description.html', this.renderTemplate(decription));
        var examples = fs.readFileSync('./cli/templates/new-component/templates/examples.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/examples.html', this.renderTemplate(examples));
        var tests = fs.readFileSync('./cli/templates/new-component/templates/tests.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/tests.html', this.renderTemplate(tests));
        var usage = fs.readFileSync('./cli/templates/new-component/templates/usage.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/usage.html', this.renderTemplate(usage));

        // module
        var module = fs.readFileSync('./cli/templates/new-component/module.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/module.js', this.renderTemplate(module));

        // prototype
        var prototype = fs.readFileSync('./cli/templates/new-component/prototype.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/prototype.js', this.renderTemplate(prototype));

        // test
        var test = fs.readFileSync('./cli/templates/new-component/test.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/test.js', this.renderTemplate(test));

        // css
        var css = fs.readFileSync('./cli/templates/new-component/css.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/css.js', this.renderTemplate(css));

        // config
        var config = fs.readFileSync('./cli/templates/new-component/config.json', 'utf-8');
        fs.writeFileSync(this.componentDir + '/config.json', this.renderTemplate(config));

        return this;
    },

    updatePackageJson: function() {

        pkg.oem.components.push(this.fileName);
        pkg.oem.components.sort();

        // save to package
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));

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
        console.log('Component', chalk.bold(this.fileName), 'has been created');
        console.log("");
        console.log("");
    },

    convertNameToClass: function(name) {
        return name.split('-').map(function(segment) {
            return segment.charAt(0).toUpperCase() + segment.slice(1);
        }).join('');
    }
};

module.exports = {
    CreateComponent: CreateComponent
};