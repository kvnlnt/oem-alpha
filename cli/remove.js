const fs = require("fs");
const pkg = require('../package');
const Config = require('./config');
const CLI = Config.CLI;

/**
 * Component Creator
 */
const RemoveComponent = function(componentName) {
    this.fileName = componentName;
    this.componentDir = './src/components/' + this.fileName;
    this
        .removeDirectory()
        .updatePackageJson();
};

RemoveComponent.prototype = {

    removeDirectory: function() {
        var path = this.componentDir;
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
        return this;
    },

    updatePackageJson: function() {
        delete pkg.oem.development[this.fileName];
        delete pkg.oem.configurations[this.fileName];
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));
        console.log(CLI.oem, "  OEM  ", "remove");
        console.log('Component', this.fileName, 'has been removed');
        return this;
    }

};

module.exports = {
    RemoveComponent: RemoveComponent
}