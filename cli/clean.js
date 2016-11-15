const oem = require('../oem.json');
const chalk = require('chalk');
const fs = require('fs-extra');

const Clean = function(componentName){
    this.clean().reply();
};

Clean.prototype = {

    clean: function(){
        fs.removeSync('./deploy');
        fs.removeSync('./demos');
        return this;
    },

    reply: function(){
        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " CLEAN ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");
        console.log('Files cleaned');
        console.log("");
        console.log("");
    }

};

module.exports = {
    Clean: Clean
};