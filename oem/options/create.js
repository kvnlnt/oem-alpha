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
    this.demoDir = './oem/templates/demos/'+this.fileName;
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
            fs.mkdirSync(this.demoDir);
            return this;
        } catch (err) {
            if(err) console.log("ERROR".red, err);
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

        // demo
        var demo = fs.readFileSync('./oem/templates/new-component/demo.html', 'utf-8');
        fs.writeFileSync(this.demoDir + '/demo.html', this.renderTemplate(demo));

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
        var newComponent = {};
        newComponent.configuration = ["core", this.fileName];
        newComponent.tests = ["./src/components/"+this.fileName+"/"+this.fileName+".test.js"];
        newComponent.demo = this.demoDir+"/demo.html";
        pkg.oem.development[this.fileName] = newComponent;

        // configuration
        pkg.oem.configurations[this.fileName] = [
            "./src/components/"+this.fileName+"/gfx.js",
            "./src/components/"+this.fileName+"/model.js",
            "./src/components/"+this.fileName+"/view.js",
            "./src/components/"+this.fileName+"/controller.js",
            "./src/components/"+this.fileName+"/collector.js"
        ];

        // save to package
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));
    
        return this;
    },

    launch: function(){
        console.log("");
        console.log("");
        console.log(chalk.bgRed("       "));
        console.log(chalk.black.bgRed("  OEM  "), " CREATE ");
        console.log(chalk.bgRed("       "));
        console.log("");
        console.log("");
        console.log('Component', chalk.red(this.fileName), 'has been created');
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