const fs = require("fs");
const pkg = require('./package');
const colors = require('colors');
const exec = require('child_process').exec;
const DevelopServer = require('./cli/develop').DevelopServer;
const CreateComponent = require('./cli/new').CreateComponent;
const Help = require('./cli/help');
const Config = require('./cli/config');
const ARG = Config.ARG;

// cli args
const ARGS = process.argv.filter(function(arg, i){ return i > 1; });

// trigger
try {
    switch(ARGS[0]){
        case ARG.DEVELOP:
            if(ARGS[1] === void 0) throw 'please specify a component';
            var developServer = new DevelopServer(ARGS[1], ARGS[2]);
            developServer.start();
            break;
        case ARG.HELP:
            Help.show();
            break;
        case ARG.NEW:
            var newComponent = new CreateComponent(ARGS[1]);
            break;
        default:
            Help.show();
    }
} catch(err) {
    console.log('ERROR'.red, err);
}
