const pkg = require('../../package');
const chalk = require('chalk');

/**
 * Component Creator
 */
const FactoryReset = function(componentName){
    this.reset();
};

FactoryReset.prototype = {
    reset: function(){

        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " FACTORY RESET ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");
        console.log("...coming soon");
        console.log("");
        console.log("");

    }
};

module.exports = {
    FactoryReset: FactoryReset
};