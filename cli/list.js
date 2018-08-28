const oem = require('../oem.json');
const chalk = require('chalk');
const fs = require('fs-extra');
const exec = require('child_process').execSync;
const util = require('./util');

const List = function (componentName) {
    this.list();
};

List.prototype = {

    list: function () {
        var that = this;
        console.log("");
        console.log("");
        console.log(chalk.bgWhite("       "));
        console.log(chalk.black.bgWhite("  OEM  "), " LIST ");
        console.log(chalk.bgWhite("       "));
        console.log("");
        console.log("");

        console.log("DEPLOYMENTS");
        console.log("");
        if (Object.keys(oem.deployments).length) {
            Object.entries(oem.deployments).forEach((k, v) => {
                console.log(`- ${k} (components = ${v.sort().join(',')})`)
            });
        }

        console.log("");
        console.log("DEMOS");
        console.log("");
        if (Object.keys(oem.demos).length) {
            Object.entries(oem.demos).forEach((k, v) => {
                console.log(`- ${k} (deployment = ${v.deployment})`)
            });
        }

        console.log("");
        console.log("COMPONENTS");
        console.log("");
        if (Object.keys(oem.development).length) {
            var componentNameColumnWidth = Object
                .keys(oem.development)
                .reduce(function (a, b) {
                    return a.length > b.length ? a : b;
                })
                .length;
            var descriptionColumnWidth = util
                .getManifests(Object.keys(oem.development))
                .map(function (manifest) {
                    return manifest.description;
                })
                .reduce(function (a, b) {
                    return a.length > b.length ? a : b;
                })
                .length;
            Object.keys(oem.development).forEach(function (component) {
                var gitRelativeTime = "git log -n 1 --date=relative --pretty=format:%cd -- " + oem.development[component].replace('/manifest.json', '');
                var stdoutTime = exec(gitRelativeTime).toString();
                var manifest = JSON.parse(fs.readFileSync(oem.development[component], 'utf8'));
                console.log(
                    '-',
                    chalk.bold(component),
                    util.columnizedSpacing(component, componentNameColumnWidth),
                    manifest.description,
                    util.columnizedSpacing(manifest.description, descriptionColumnWidth),
                    stdoutTime
                );
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