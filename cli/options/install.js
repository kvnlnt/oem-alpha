const pkg = require('../../package');
const chalk = require('chalk');

/**
 * Component Creator
 */
const InstallComponent = function(componentName){
    this.install();
};

InstallComponent.prototype = {
    install: function(){

        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " INSTALL ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");
        console.log("...coming soon");
        console.log("");
        console.log("");

    }
};

module.exports = {
    InstallComponent: InstallComponent
};