const fs = require("fs");
const pkg = require('../../package');
const chalk = require('chalk');

/**
 * Component Creator
 */
const RemoveComponent = function(componentName) {
    this.fileName = componentName;
    this.componentDir = './src/components/' + this.fileName;
    this.demoDir = './oem/templates/demos/' + this.fileName;
    this
        .removeDirectory(this.componentDir)
        .removeDirectory(this.demoDir)
        .updatePackageJson()
        .reply();
};

RemoveComponent.prototype = {

    removeDirectory: function(path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
        return this;
    },

    updatePackageJson: function() {
        delete pkg.oem.development[this.fileName];
        delete pkg.oem.configurations[this.fileName];
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));
        return this;
    },

    reply: function(){
        console.log("");
        console.log("");
        console.log(chalk.bgRed("       "));
        console.log(chalk.black.bgRed("  OEM  "), " REMOVE ");
        console.log(chalk.bgRed("       "));
        console.log("");
        console.log("");
        console.log('Component', chalk.red(this.fileName), 'has been removed');
        console.log("");
        console.log("");
    }

};

module.exports = {
    RemoveComponent: RemoveComponent
};