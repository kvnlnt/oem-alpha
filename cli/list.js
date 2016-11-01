const pkg = require('../package');
const chalk = require('chalk');
const fs = require('fs-extra');

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

        if(Object.keys(pkg.oem.development).length){
            Object.keys(pkg.oem.development).forEach(function(component){
                var manifest = JSON.parse(fs.readFileSync(pkg.oem.development[component], 'utf8'));
                console.log(chalk.bold(manifest.name), ' ', manifest.description);
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