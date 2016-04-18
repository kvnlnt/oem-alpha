var inquirer = require("inquirer");
var fs = require("fs");
var path = require('path');
var pkg = require('./package');

var Oem = function (argument) {};

var TASKS = {};
TASKS.START_DEVELOPING_COMPONENT = "Start Developing Component";
TASKS.START_A_BUILD = "Start A Build";
TASKS.START_PATTERN_LIBRARY = "Start Pattern Library";
TASKS.START_PROTOTYPE_DESIGNER = "Start Prototype Designer";
TASKS.START_NEW_COMPONENT = "Start New Component";

Oem.prototype = {

    start: function () {

        var questions = [

            {
                type: 'list',
                name: 'task',
                message: "OEM",
                choices: [
                    TASKS.START_DEVELOPING_COMPONENT,
                    TASKS.START_A_BUILD,
                    TASKS.START_PATTERN_LIBRARY,
                    TASKS.START_PROTOTYPE_DESIGNER,
                    TASKS.START_NEW_COMPONENT
                ]
            }, {
                type: 'list',
                name: 'component',
                message: 'WHICH COMPONENT?:',
                choices: this.getDirectories('./src/components'),
                when: function (answers) {
                    return answers.task === TASKS.START_DEVELOPING_COMPONENT
                }
            },
            {
                type: 'list',
                name: 'component',
                message: 'WHICH BUILD?:',
                choices: Object.keys(pkg.builds),
                when: function (answers) {
                    return answers.task === TASKS.START_A_BUILD
                }
            },
            {
                type: 'string',
                name: 'name',
                message: 'WHAT\'S THE COMPONENT\'S NAME?:',
                when: function (answers) {
                    return answers.task === TASKS.START_NEW_COMPONENT
                }
            }

        ];

        // Operation mode switches
        inquirer.prompt(questions).then(function (answers) {
            switch(answers.task){
                case TASKS.START_DEVELOPING_COMPONENT:
                    Oem.startDevelopingComponent(answers);
                    break;
                case TASKS.START_A_BUILD:
                    Oem.startABuild(answers);
                    break;
                case TASKS.START_PATTERN_LIBRARY:
                    Oem.startPatternLibrary(answers);
                    break;
                case TASKS.START_PROTOTYPE_DESIGNER:
                    Oem.startPrototypeDesigner(answers);
                    break;
                case TASKS.START_NEW_COMPONENT:
                    Oem.startNewComponent(answers);
                    break;
            }
        });

    },
    startDevelopingComponent: function (answers) {},
    startABuild: function (answers) {},
    startPatternLibrary: function (answers) {},
    startPrototypeDesigner: function (answers) {},
    startNewComponent: function(answers){},

    // helpers
    getDirectories: function (srcpath) {
        return fs.readdirSync(srcpath).filter(function (file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    }
};

var oem = new Oem();
oem.start();