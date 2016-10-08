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
            delete pkg.oem.development[component];
            Object.keys(pkg.oem.deployments).forEach(function(deployment){
                pkg.oem.deployments[deployment].splice(pkg.oem.deployments[deployment].indexOf(component), 1);
            });
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
        console.log('Components:', chalk.bold(this.components), 'removed');
        console.log("");
        console.log("");
    }

};

module.exports = {
    RemoveComponent: RemoveComponent
};