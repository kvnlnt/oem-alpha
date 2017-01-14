/**
 * Main CLI file
 * 
 * Usage: node oem
 *
 */

const ARGS = process.argv.filter(function(arg, i){ return i > 1; });
const Clean = require("./cli/clean").Clean;
const CreateComponent = require('./cli/create').CreateComponent;
const Demo = require('./cli/demo').Demo;
const Deployment = require('./cli/deploy').Deployment;
const DevelopComponent = require('./cli/develop').DevelopComponent;
const exec = require('child_process').exec;
const fs = require("fs");
const Help = require('./cli/help');
const List = require('./cli/list').List;
const oem = require('./oem.json');
const RemoveComponent = require('./cli/remove').RemoveComponent;
const Test = require('./cli/test').Test;

const ARG = {};
ARG.CLEAN = 'clean';
ARG.CREATE = 'create';
ARG.DEMO = 'demo';
ARG.DEPLOY = 'deploy';
ARG.DEVELOP = 'dev';
ARG.HELP = 'help';
ARG.LIST = 'list';
ARG.REMOVE = 'remove';
ARG.TEST = 'test';

// actions
try {
    switch(ARGS[0]){
        case ARG.CLEAN:
            var clean = new Clean();
            break;
        case ARG.CREATE:
            if(oem.development.hasOwnProperty(ARGS[1])) throw 'component already exists';
            var newComponent = new CreateComponent(ARGS[1]);
            break;
        case ARG.DEMO:
            if(ARGS[1] === void 0) throw 'please specify a demo configuration. See package.oem.demos';
            if(oem.demos[ARGS[1]] === void 0) throw 'no such demo exists, check package.json';
            var demo = new Demo(ARGS[1], ARGS);
            break;
        case ARG.DEPLOY:
            if(ARGS[1] === void 0) throw 'please specify a deployment configuration. See package.oem.deployments';
            if(oem.deployments[ARGS[1]] === void 0) throw 'no such deployment exists, check package.json';
            var deployment = new Deployment(ARGS[1], ARGS);
            break;
        case ARG.DEVELOP:
            if(ARGS[1] === void 0) throw 'please specify a component';
            if(!oem.development.hasOwnProperty(ARGS[1])) throw 'no such component exists, check package.json';
            var developComponent = new DevelopComponent(ARGS[1], ARGS);
            break;
        case ARG.HELP:
            Help.show();
            break;
        case ARG.LIST:
            var list = new List();
            break;
        case ARG.REMOVE:
            if(!oem.development.hasOwnProperty(ARGS[1])) throw 'component does not exist';
            var removeComponent = new RemoveComponent(ARGS);
            break;
        case ARG.TEST:
            if(ARGS[1] === void 0) throw 'please specify a deployment';
            var test = new Test(ARGS[1]);
            break;
        default:
            Help.show();
    }
} catch(err) {
    console.log('ERROR', err);
}
