const fs = require("fs-extra");
const oem = require('../oem.json');
const chalk = require('chalk');

const RemoveComponent = function(components) {
    components.shift();
    this.components = components;
    this.deploymentsRemovedFrom = [];
    this.removeDirectories().updatePackageJson().reply();
};

RemoveComponent.prototype = {

    updatePackageJson: function() {
        var that = this;
        this.components.forEach(function(component){
            delete oem.development[component];
            Object.keys(oem.deployments).forEach(function(deployment){
                var indexInList = oem.deployments[deployment].indexOf(component);
                var existInDeployment = indexInList  > -1;
                if(!existInDeployment) return;
                that.deploymentsRemovedFrom.push(deployment);
                oem.deployments[deployment].splice(indexInList, 1);
            });
        });
        fs.writeFileSync('./oem.json', JSON.stringify(oem, null, 4));
        return this;
    },

    removeDirectories: function() {
        this.components.forEach(function(component){
            var dir = './development/' + component;
            fs.removeSync(dir);
        });
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
        console.log('Component', chalk.bold(this.components), 'has been removed');
        if(this.deploymentsRemovedFrom.length) console.log('It was also removed from the following deployments:', chalk.bold(this.deploymentsRemovedFrom.join(', ')));
        console.log("");
        console.log("");
    }

};

module.exports = {
    RemoveComponent: RemoveComponent
};