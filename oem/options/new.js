const fs = require("fs");
const pkg = require('../../package');

/**
 * Component Creator
 */
const CreateComponent = function(componentName){
    this.fileName = componentName;
    this.componentName = 'oem-' + componentName;
    this.componentClass = this.convertNameToClass(componentName);
    this.componentDir = './src/components/'+this.fileName;
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
        var collector = fs.readFileSync("./templates/component/component.collector.js", "utf8");
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.collector.js', this.renderTemplate(collector));

        // controller
        var controller = fs.readFileSync('./templates/component/component.controller.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.controller.js', this.renderTemplate(controller));

        // demo
        var demo = fs.readFileSync('./templates/component/component.demo.html', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.demo.html', this.renderTemplate(demo));

        // gfx
        var gfx = fs.readFileSync('./templates/component/component.gfx.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.gfx.js', this.renderTemplate(gfx));

        // model
        var model = fs.readFileSync('./templates/component/component.model.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.model.js', this.renderTemplate(model));

        // test
        var test = fs.readFileSync('./templates/component/component.test.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.test.js', this.renderTemplate(test));

        // view
        var view = fs.readFileSync('./templates/component/component.view.js', 'utf-8');
        fs.writeFileSync(this.componentDir + '/' + this.fileName + '.view.js', this.renderTemplate(view));

        return this;

    },

    updatePackageJson: function(){

        // add development node
        var newComponent = {};
        newComponent.configuration = ["core", this.fileName];
        newComponent.tests = ["./src/components/"+this.fileName+"/"+this.fileName+".test.js"];
        newComponent.demo = "./src/components/"+this.fileName+"/"+this.fileName+".demo.html";
        pkg.oem.development[this.fileName] = newComponent;

        // configuration
        pkg.oem.configurations[this.fileName] = [
            "./src/components/"+this.fileName+"/"+this.fileName+".gfx.js",
            "./src/components/"+this.fileName+"/"+this.fileName+".model.js",
            "./src/components/"+this.fileName+"/"+this.fileName+".view.js",
            "./src/components/"+this.fileName+"/"+this.fileName+".controller.js",
            "./src/components/"+this.fileName+"/"+this.fileName+".collector.js"
        ];

        // save to package
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));
    
        return this;
    },

    launch: function(){
        console.log(CLI.oem, "  OEM  ", "NEW");
        console.log('Component', this.fileName, 'has been created');
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