/**
 * Main CLI file
 * 
 * Usage: node oem
 *
 */

const fs = require("fs");
const pkg = require('./package');
const exec = require('child_process').exec;
const DevelopComponent = require('./oem/options/develop').DevelopComponent;
const CreateComponent = require('./oem/options/create').CreateComponent;
const RemoveComponent = require('./oem/options/remove').RemoveComponent;
const Deployment = require('./oem/options/deploy').Deployment;
const List = require('./oem/options/list').List;
const Help = require('./oem/options/help');
const ARGS = process.argv.filter(function(arg, i){ return i > 1; });

const ARG = {};
ARG.HELP = 'help';
ARG.LIST = 'list';
ARG.DEVELOP = 'dev';
ARG.CREATE = 'create';
ARG.REMOVE = 'remove';
ARG.DEPLOY = 'deploy';

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
        case ARG.CREATE:
            var newComponent = new CreateComponent(ARGS[1]);
            break;
        case ARG.REMOVE:
            var removeComponent = new RemoveComponent(ARGS[1]);
            break;
        case ARG.DEPLOY:
            if(ARGS[1] === void 0) throw 'please specify a deployment configuration. See package.oem.deployments';
            if(pkg.oem.deployment[ARGS[1]] === void 0) throw 'no such deployment exists, check package.json';
            var deployment = new Deployment(ARGS[1]);
            break;
        default:
            Help.show();
    }
} catch(err) {
    console.log('ERROR', err);
}
