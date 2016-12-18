const oem = require('../oem.json');
const chalk = require('chalk');
const fs = require('fs-extra');
const exec = require('child_process').execSync;

const List = function(componentName){
    this.list();
};

List.prototype = {

    list: function(){
        var that = this;
        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " LIST ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");

        if(Object.keys(oem.development).length){
            Object.keys(oem.development).forEach(function(component){
                var gitRelativeTime = "git log -n 1 --date=relative --pretty=format:%cd -- " + oem.development[component].replace('/manifest.json', '');
                var stdoutTime = exec(gitRelativeTime).toString();
                var manifest = JSON.parse(fs.readFileSync(oem.development[component], 'utf8'));
                console.log(chalk.bold(component), that.calcSpaces(component), manifest.description, '-', stdoutTime);
            });    
        } else {
            console.log("You have no components.");
        }

        console.log("");
        console.log("");
        console.log("");
    },

    calcSpaces: function(name){
        var spaces = 15 - name.length;
        var space = '';
        for(i = 0; i < spaces; i++){
            space += ' ';
        }
        return space;
    }

};

module.exports = {
    List: List
};