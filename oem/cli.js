var inquirer = require("inquirer");
var fs = require("fs");
var path = require('path');
var pkg = require('../package');

var Oem = function (argument) {};

var TASKS = {};
TASKS.START_DEVELOPING_COMPONENT = "Start Developing Component";
TASKS.START_A_BUILD = "Start A Build";
TASKS.START_PATTERN_LIBRARY = "Start Pattern Library";
TASKS.START_PROTOTYPE_DESIGNER = "Start Prototype Designer";
TASKS.START_NEW_COMPONENT = "Start New Component";

Oem.prototype = {

    /**
     * Main CLI prompt
     *
     * @method     start
     */
    start: function () {

        var that = this;

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
            }, {
                type: 'list',
                name: 'component',
                message: 'WHICH BUILD?:',
                choices: Object.keys(pkg.builds),
                when: function (answers) {
                    return answers.task === TASKS.START_A_BUILD
                }
            }, {
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
            switch (answers.task) {
            case TASKS.START_DEVELOPING_COMPONENT:
                that.startDevelopingComponent(answers);
                break;
            case TASKS.START_A_BUILD:
                that.startABuild(answers);
                break;
            case TASKS.START_PATTERN_LIBRARY:
                that.startPatternLibrary(answers);
                break;
            case TASKS.START_PROTOTYPE_DESIGNER:
                that.startPrototypeDesigner(answers);
                break;
            case TASKS.START_NEW_COMPONENT:
                that.startNewComponent(answers);
                break;
            default:
                console.log('NOOP');
                break;
            }
        });

    },

    /**
     * Start Developing a Component
     *
     * @method     startDevelopingComponent
     * @param      {<type>}  answers  { description }
     */
    startDevelopingComponent: function (answers) {},

    /**
     * Start a Build Process
     *
     * @method     startABuild
     * @param      {<type>}  answers  { description }
     */
    startABuild: function (answers) {
        var files = pkg.builds[answers.component];
        var bundle = this.concatFiles(files);
        console.log('start a build', bundle);
    },

    /**
     * Start The Pattern Library
     *
     * @method     startPatternLibrary
     * @param      {<type>}  answers  { description }
     */
    startPatternLibrary: function (answers) {},

    /**
     * Start The Prototype Designer
     *
     * @method     startPrototypeDesigner
     * @param      {<type>}  answers  { description }
     */
    startPrototypeDesigner: function (answers) {},

    /**
     * Start A New Component
     *
     * @method     startNewComponent
     * @param      {<type>}  answers  { description }
     */
    startNewComponent: function (answers) {},

    // CLI HELPERS

    /**
     * Get all directories at given relative path
     *
     * @method     getDirectories
     * @param      {<type>}  srcpath  { description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    getDirectories: function (srcpath) {
        return fs.readdirSync(srcpath).filter(function (file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    },

    /**
     * Concatenate Files
     *
     * @method     concatFiles
     * @param      {<type>}  files   { description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    concatFiles: function (files) {
        function getFile(file) {
            return fs.readFileSync(file, 'utf8');
        }
        return files.map(getFile).join('\n');
    }
};

var oem = new Oem();
oem.start();