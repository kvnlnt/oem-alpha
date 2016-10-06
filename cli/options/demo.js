
// TODO
// const pkg = require('../../package');
// const fs = require('fs-extra');
// const UglifyJS = require("uglify-js");
// const chalk = require('chalk');
// const exec = require('child_process').exec;
// const opener = require("opener");

// /**
//  * Component Development Server
//  */
// const Deployment = function (deployment) {
//     this.deployment = deployment;
//     this.config = pkg.oem.deployments[deployment];
//     this.components = this.config.components;
//     this.directory = './deploy/'+deployment;
//     this.jsFile = this.directory + "/oem.js";
//     this.jsFileMinified = this.directory + "/oem.min.js";
//     this.jsFiles = this.getJsFiles();
//     this.deploy().reply();
// };

// Deployment.prototype = {

//     /**
//      * Main CLI prompt
//      *
//      * @method     start
//      */
//     deploy: function () {

//         // concat file contents
//         var concatedFileContents = this.concatFiles(this.jsFiles);

//         // recreate directory
//         fs.removeSync(this.directory);
//         fs.mkdirsSync(this.directory);

//         // write javascript file
//         fs.outputFileSync(this.jsFile, concatedFileContents);

//         // write minified version
//         var minifiedFileContents = UglifyJS.minify(this.jsFile);
//         fs.writeFileSync(this.jsFileMinified, minifiedFileContents.code);

//         // write html file
//         var template = fs.readFileSync('./cli/templates/deployment/main.html', 'utf-8');
//         var description = null;
//         var usage = null;
//         var examples = null;
//         var html = '';
//         var components = this.components;
//         components.sort();

//         html += '<h1>Pattern Library</h1>';
//         html += '<p>The following components were auto generated from the <em>'+this.deployment+'</em> deployment configuration.</p>';

//         // menu
//         components.forEach(function(component){
//             if(component != 'core'){
//                 html += '<a href="#'+component+'">'+component+'</a>  &nbsp;';
//             }
//         });

//         // components
//         components.forEach(function(component){
//             if(component != 'core'){
//                 description = fs.readFileSync('./src/components/' + component + '/templates/description.html');
//                 usage = fs.readFileSync('./src/components/' + component + '/templates/usage.html');
//                 examples = fs.readFileSync('./src/components/' + component + '/templates/examples.html');
//                 html += '<a name="'+component+'"></a>';
//                 html += '<section>';           
//                 html += description;
//                 html += usage;
//                 html += examples;
//                 html += '</section>';
//             }
//         });

//         template = template.replace("<!-- HTML -->", html, 'utf8')
//         fs.outputFileSync(this.directory + '/index.html', template);

//         // launch pattern lib
//         opener(this.directory + '/index.html');

//         return this;

//     },

//     /**
//      * Start Component's JS files
//      *
//      * @method     startDevelopingComponent
//      * @param      {<type>}  answers  { description }
//      */
//     getJsFiles: function() {


//         // core files
//         var coreConfig = JSON.parse(fs.readFileSync("./src/core/config.json", 'utf8'));
//         var coreFiles = coreConfig.files;

//         // files from development components loaded during development
//         var devComponentFiles = this.components.map(function(component) {
//             var config = JSON.parse(fs.readFileSync("./src/components/"+component+"/config.json", 'utf8'));
//             return config.files;
//         });

//         // flatten arrays
//         var allFiles = []
//             .concat(...coreFiles)
//             .concat(...devComponentFiles);

//         // implement customization overwrites
//         if (this.config.customizations) {
//             var customizations = this.config.customizations;
//             var customization;
//             var indexOfFileToReplace;
//             for (var i = 0; i < customizations.length; i = i + 1) {
//                 customization = customizations[i];
//                 indexOfFileToReplace = allFiles.indexOf(customization.replace);
//                 if (indexOfFileToReplace > -1) allFiles.splice(indexOfFileToReplace, 1, customization.with);
//             }
//         }
//         return allFiles;
//     },

//     reply: function(){
//         console.log("");
//         console.log("");
//         console.log(chalk.bgWhite("       "));
//         console.log(chalk.black.bgWhite("  OEM  "), " DEPLOY ");
//         console.log(chalk.bgWhite("       "));
//         console.log("");
//         console.log("");
//         console.log('Deployed', chalk.bold(this.config), ', see files in ./deploy/'+this.config + ' folder');
//         console.log("");
//         console.log("");
//     },

//     concatFiles: function(fileList){
//         return fileList.map(function(file){
//             return fs.readFileSync(file, 'utf-8');
//         }).join('\n');
//     }

// };

// module.exports = {
//     Deployment:Deployment
// };