var inquirer = require("inquirer");

// http-server src -p 7001 -o
// 

var Oem = function (argument) {
};

Oem.prototype = {
    run: function(){
        
        var questions = [

          { 
            type: 'list',
            name: 'oem',
            message: "OEM",
            choices: [
                'Start dev server'
            ]
          }

        ];

        // Operation mode switches
        inquirer.prompt(questions, function(answers) {

            console.log("==========", answers);

        });

    }
};

var oem = new Oem();
oem.run();