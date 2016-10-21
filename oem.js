/**
 * Main CLI file
 * 
 * Usage: node oem
 *
 */

const fs = require("fs");
const pkg = require('./package');
const exec = require('child_process').exec;
const CreateComponent = require('./cli/options/create').CreateComponent;
const Demo = require('./cli/options/demo').Demo;
const Deployment = require('./cli/options/deploy').Deployment;
const DevelopComponent = require('./cli/options/develop').DevelopComponent;
const FactoryReset = require('./cli/options/factory-reset').FactoryReset;
const Help = require('./cli/options/help');
const InstallComponent = require('./cli/options/install').InstallComponent;
const List = require('./cli/options/list').List;
const RemoveComponent = require('./cli/options/remove').RemoveComponent;
const ARGS = process.argv.filter(function(arg, i){ return i > 1; });

const ARG = {};
ARG.CREATE = 'create';
ARG.DEMO = 'demo';
ARG.DEPLOY = 'deploy';
ARG.DEVELOP = 'dev';
ARG.FACTORY_RESET = 'factory-reset';
ARG.HELP = 'help';
ARG.INSTALL= 'install';
ARG.LIST = 'list';
ARG.REMOVE = 'remove';

// actions
try {
    switch(ARGS[0]){
        case ARG.LIST:
            var list = new List();
            break;
        case ARG.DEVELOP:
            if(ARGS[1] === void 0) throw 'please specify a component';
            if(!pkg.oem.development.hasOwnProperty(ARGS[1])) throw 'no such component exists, check package.json';
            var developComponent = new DevelopComponent(ARGS[1], ARGS);
            break;
        case ARG.HELP:
            Help.show();
            break;
        case ARG.CREATE:
            if(pkg.oem.development.hasOwnProperty(ARGS[1])) throw 'component already exists';
            var newComponent = new CreateComponent(ARGS[1]);
            break;
        case ARG.INSTALL:
            var installComponent = new InstallComponent(ARGS[1]);
            break;
        case ARG.REMOVE:
            if(!pkg.oem.development.hasOwnProperty(ARGS[1])) throw 'component does not exist';
            var removeComponent = new RemoveComponent(ARGS);
            break;
        case ARG.DEMO:
            if(ARGS[1] === void 0) throw 'please specify a demo configuration. See package.oem.demos';
            if(pkg.oem.demos[ARGS[1]] === void 0) throw 'no such demo exists, check package.json';
            var demo = new Demo(ARGS[1]);
            break;
        case ARG.DEPLOY:
            if(ARGS[1] === void 0) throw 'please specify a deployment configuration. See package.oem.deployments';
            if(pkg.oem.deployments[ARGS[1]] === void 0) throw 'no such deployment exists, check package.json';
            var deployment = new Deployment(ARGS[1]);
            break;
        case ARG.FACTORY_RESET:
            var factoryReset = new FactoryReset();
            break;
        default:
            Help.show();
    }
} catch(err) {
    console.log('ERROR', err);
}
