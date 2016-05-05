const pkg = require('../package');
const Config = require('./config');
const CLI = Config.CLI;

/**
 * Component Creator
 */
const List = function(componentName){
    this.list();
};

List.prototype = {
    list: function(){
        Object.keys(pkg.oem.configurations).sort().forEach(function(configuration){
            console.log(configuration);
        });
    }
};

module.exports = {
    List: List
};