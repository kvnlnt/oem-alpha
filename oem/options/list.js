const pkg = require('../../package');
const chalk = require('chalk');

/**
 * Component Creator
 */
const List = function(componentName){
    this.list();
};

List.prototype = {
    list: function(){

        console.log("");
        console.log("");
        console.log(chalk.bgRed("       "));
        console.log(chalk.black.bgRed("  OEM  "), " LIST ");
        console.log(chalk.bgRed("       "));
        console.log("");
        console.log("");

        Object.keys(pkg.oem.configurations).sort().forEach(function(configuration){
            console.log(configuration);
        });

        console.log("");
        console.log("");
        console.log("");

    }
};

module.exports = {
    List: List
};