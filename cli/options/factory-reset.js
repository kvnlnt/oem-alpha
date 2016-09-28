const pkg = require('../../package');
const chalk = require('chalk');
const fs = require('fs-extra');

/**
 * Component Creator
 */
const FactoryReset = function(componentName){
    this.componentsDirectory = "./src/components";
    this.configurationsDirectory = "./src/configurations";
    this.customizations = "./src/customizations";
    this.reset();
};

FactoryReset.prototype = {
    reset: function(){

        fs.removeSync(this.componentsDirectory);
        fs.mkdirsSync(this.componentsDirectory);
        fs.removeSync(this.configurationsDirectory);
        fs.mkdirsSync(this.configurationsDirectory);
        fs.removeSync(this.customizations);
        fs.mkdirsSync(this.customizations);
        pkg.oem.deployment = {};
        pkg.oem.development = {};
        pkg.oem.components = {};
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));

        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " FACTORY RESET ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");
        console.log("You now have no components, no configurations & no deployments.");
        console.log("");
        console.log("");

    }
};

module.exports = {
    FactoryReset: FactoryReset
};