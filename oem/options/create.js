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
        str = str.replace(new RegExp('%NAME%', 'g'), this.componentName);
        str = str.replace(new RegExp('%CLASS%', 'g'), this.componentClass);
        return str;
    },

    copyAndFormatTemplates: function(){

        // collector
        var collector = fs.readFileSync("./oem/templates/new-component/collector.js", "utf8");
        fs.writeFileSync(this.componentDir + '/collector.js', this.renderTemplate(collector));

        // controller
        var controller = fs.readFileSync('./oem/templates/new-component/controller.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/controller.js', this.renderTemplate(controller));

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

        // model
        var model = fs.readFileSync('./oem/templates/new-component/model.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/model.js', this.renderTemplate(model));

        // test
        var test = fs.readFileSync('./oem/templates/new-component/test.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/test.js', this.renderTemplate(test));

        // view
        var view = fs.readFileSync('./oem/templates/new-component/view.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/view.js', this.renderTemplate(view));

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
        newComponentConfig.files.push("./src/components/"+this.fileName+"/gfx.js");
        newComponentConfig.files.push("./src/components/"+this.fileName+"/model.js");
        newComponentConfig.files.push("./src/components/"+this.fileName+"/view.js");
        newComponentConfig.files.push("./src/components/"+this.fileName+"/controller.js");
        newComponentConfig.files.push("./src/components/"+this.fileName+"/collector.js");
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