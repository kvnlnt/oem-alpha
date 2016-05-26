const fs = require("fs");
const pkg = require('../../package');
const chalk = require('chalk');

/**
 * Component Creator
 */
const CreateComponent = function(componentName){
    this.fileName = componentName;
    this.componentName = 'oem-' + componentName;
    this.componentClass = this.convertNameToClass(componentName);
    this.componentDir = './src/components/'+this.fileName;
    this.templatesDir = './oem/templates/components/'+this.fileName;
    this
    .createDirectory()
    .copyAndFormatTemplates()
    .updatePackageJson()
    .launch();
};

CreateComponent.prototype = {

    createDirectory: function(){
        // console.log('create component', this.componentName, this.componentClass);
        try {
            fs.mkdirSync(this.componentDir);
            fs.mkdirSync(this.templatesDir);
            return this;
        } catch (err) {
            if(err) console.log("ERROR".bold, err);
        }
    },

    renderTemplate: function(str){
        str = str.replace(new RegExp('%SELECTOR%', 'g'), this.componentName);
        str = str.replace(new RegExp('%CLASS%', 'g'), this.componentClass);
        return str;
    },

    copyAndFormatTemplates: function(){

        // html
        var decription = fs.readFileSync('./oem/templates/new-component/description.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/description.html', this.renderTemplate(decription));
        var examples = fs.readFileSync('./oem/templates/new-component/examples.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/examples.html', this.renderTemplate(examples));
        var tests = fs.readFileSync('./oem/templates/new-component/tests.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/tests.html', this.renderTemplate(tests));
        var usage = fs.readFileSync('./oem/templates/new-component/usage.html', 'utf-8');
        fs.writeFileSync(this.templatesDir + '/usage.html', this.renderTemplate(usage));

        // gfx
        var gfx = fs.readFileSync('./oem/templates/new-component/gfx.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/gfx.js', this.renderTemplate(gfx));

        // component
        var component = fs.readFileSync('./oem/templates/new-component/component.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/component.js', this.renderTemplate(component));

        // prototype
        var prototype = fs.readFileSync('./oem/templates/new-component/prototype.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/prototype.js', this.renderTemplate(prototype));

        // test
        var test = fs.readFileSync('./oem/templates/new-component/test.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/test.js', this.renderTemplate(test));

        // css
        var css = fs.readFileSync('./oem/templates/new-component/css.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/css.js', this.renderTemplate(css));

        return this;

    },

    updatePackageJson: function(){

        // add development node
        var newDevelopmentConfig = {};
        newDevelopmentConfig.components = ["core", this.fileName];
        newDevelopmentConfig.customizations = [];
        pkg.oem.development[this.fileName] = newDevelopmentConfig;

        // configuration
        var newComponentConfig = {};
        newComponentConfig.files = [];
        newComponentConfig.files.push("./src/components/"+this.fileName+"/component.js");
        newComponentConfig.files.push("./src/components/"+this.fileName+"/gfx.js");
        newComponentConfig.files.push("./src/components/"+this.fileName+"/css.js");
        newComponentConfig.files.push("./src/components/"+this.fileName+"/prototype.js");
        newComponentConfig.tests = [];
        newComponentConfig.tests.push("./src/components/"+this.fileName+"/test.js");
        newComponentConfig.templates = {};
        newComponentConfig.templates.description = this.templatesDir+"/description.html";
        newComponentConfig.templates.examples = this.templatesDir+"/examples.html";
        newComponentConfig.templates.tests = this.templatesDir+"/tests.html";
        newComponentConfig.templates.usage = this.templatesDir+"/usage.html";
        pkg.oem.components[this.fileName] = newComponentConfig;

        // save to package
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));
    
        return this;
    },

    launch: function(){
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

    convertNameToClass: function(name){
        return name.split('-').map(function(segment){
            return segment.charAt(0).toUpperCase() + segment.slice(1);
        }).join('');
    }
};

module.exports = {
    CreateComponent: CreateComponent
};