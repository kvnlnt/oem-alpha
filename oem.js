/**
 * Main CLI file
 * 
 * Usage: node oem
 *
 */

const fs = require("fs");
const pkg = require('./package');
const exec = require('child_process').exec;
const DevelopComponent = require('./oem/develop').DevelopComponent;
const CreateComponent = require('./oem/new').CreateComponent;
const RemoveComponent = require('./oem/remove').RemoveComponent;
const List = require('./oem/list').List;
const Help = require('./oem/help');
const Config = require('./oem/config');
const ARG = Config.ARG;
const ARGS = process.argv.filter(function(arg, i){ return i > 1; });
const CLI = Config.CLI;

// actions
try {
    switch(ARGS[0]){
        case ARG.LIST:
            var list = new List();
            break;
        case ARG.DEVELOP:
            if(ARGS[1] === void 0) throw 'please specify a component';
            if(pkg.oem.development[ARGS[1]] === void 0) throw 'no such component exists, check package.json';
            var developComponent = new DevelopComponent(ARGS[1], ARGS[2]);
            break;
        case ARG.HELP:
            Help.show();
            break;
        case ARG.NEW:
            var newComponent = new CreateComponent(ARGS[1]);
            break;
        case ARG.REMOVE:
            var removeComponent = new RemoveComponent(ARGS[1]);
            break;
        default:
            Help.show();
    }
} catch(err) {
    console.log('ERROR', err);
}
