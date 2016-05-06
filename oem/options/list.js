const pkg = require('../../package');

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