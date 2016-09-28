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
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " LIST ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");

        if(pkg.oem.components.length){
            pkg.oem.components.forEach(function(component){
                console.log(component);
            });    
        } else {
            console.log("You have no components.");
        }

        console.log("");
        console.log("");
        console.log("");

    }
};

module.exports = {
    List: List
};