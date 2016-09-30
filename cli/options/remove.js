const fs = require("fs-extra");
const pkg = require('../../package');
const chalk = require('chalk');

/**
 * Component Creator
 */
const RemoveComponent = function(components) {
    components.shift();
    this.components = components;
    this.removeDirectories().updatePackageJson().reply();
};

RemoveComponent.prototype = {

    removeDirectories: function() {
        this.components.forEach(function(component){
            var dir = './src/components/' + component;
            fs.removeSync(dir);
        });
        return this;
    },

    updatePackageJson: function() {
        this.components.forEach(function(component){
            pkg.oem.components.splice(pkg.oem.components.indexOf(component), 1);
        });
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