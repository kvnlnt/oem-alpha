const fs = require("fs-extra");
const pkg = require('../../package');
const chalk = require('chalk');

/**
 * Component Creator
 */
const RemoveComponent = function(componentName) {
    this.fileName = componentName;
    this.componentDir = './src/components/' + this.fileName;
    this.removeDirectory().updatePackageJson().reply();
};

RemoveComponent.prototype = {

    removeDirectory: function() {
       fs.removeSync(this.componentDir)
        return this;
    },

    updatePackageJson: function() {
        pkg.oem.components.splice(pkg.oem.components.indexOf(this.fileName), 1);
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));
        return this;
    },

    reply: function(){
        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " REMOVE ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");
        console.log('Component', chalk.bold(this.fileName), 'has been removed');
        console.log("");
        console.log("");
    }

};

module.exports = {
    RemoveComponent: RemoveComponent
};