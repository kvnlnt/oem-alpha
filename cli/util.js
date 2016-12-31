const fs = require('fs');
const oem = require('../oem.json');

function createCssTagLinks(files) {
    var tags = '';
    var files = files instanceof Array ? files : [files];
    files.forEach(function(file) {
        tags += '<link rel="stylesheet" type="text/css" href="' + file + '"/>\n';
    });
    return tags;
}

function createScriptTagLinks(files) {
    var tags = '';
    var files = files instanceof Array ? files : [files];
    files.forEach(function(file) {
        tags += '<script src="' + file + '"></script>\n';
    });
    return tags;
}

function columnizedSpacing(text, longestText){
    var spaces = longestText - text.length;
    var space = '';
    for(i = 0; i < spaces; i++){
        space += ' ';
    }
    return space;
}

function getComponentScripts(components){
    var components = components instanceof Array ? components : [components];
    var files = components.map(function(component) {
        var config = JSON.parse(fs.readFileSync(oem.development[component], 'utf8'));
        return config.scripts;
    });
    return files;
}

function getComponentStyles(components){
     var components = components instanceof Array ? components : [components]; 
    var files = components.map(function(component) {
        var config = JSON.parse(fs.readFileSync(oem.development[component], 'utf8'));
        return config.styles;
    });
    return files.filter(function(file){ return file != void 0 });
}

function getComponentTemplatesHtml(templates){
    var html = Object.keys(templates).map(function(template) {
        return fs.readFileSync(templates[template], 'utf8');
    });
    return html;
}

function getComponentTests(components){
    var components = components instanceof Array ? components : [components];
    var files = components.map(function(component) {
        var config = JSON.parse(fs.readFileSync(oem.development[component], 'utf8'));
        return config.tests;
    });
    return files;
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return month + '/' + day + '/' + year + " @ " + hour + ":" + min + ":" + sec;
}

function getFilesizeInKB(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    return Math.ceil(fileSizeInBytes / 1024);
}

function getManifests(components){
    return components.map(function(component){
        var json = loadAndParseJson(oem.development[component]);
        json.component = component;
        return json;
    })
}

function getOptions(args){
    var options = {};
    var flags = args.filter(function(arg){ return arg.substring(0,2) === "--" });
    flags.forEach(function(flag){
        options[flag.replace("--", "").split("=")[0]] = flag.split("=")[1];
    });
    return options;
}

function loadAndParseJson(file){
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function rmDir(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        rmDir(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function sortDependencies(manifests){
    var that = this;
    manifests.forEach(function(manifest, m){
        if(manifest.dependencies){
            manifest.dependencies.forEach(function(dependency, d){
                var dependencyIndex = manifests.findIndex(function(manifest){ return manifest.component === dependency});
                if(m <= dependencyIndex) {
                    var item = manifests.splice(dependencyIndex, 1)[0];
                    manifests.splice(m-1, 0, item);
                }
            });
        }
    });
    return manifests;
}

module.exports = {
    columnizedSpacing: columnizedSpacing,
    createCssTagLinks: createCssTagLinks,
    createScriptTagLinks: createScriptTagLinks,
    getComponentScripts: getComponentScripts,
    getComponentStyles: getComponentStyles,
    getComponentTemplatesHtml: getComponentTemplatesHtml,
    getComponentTests: getComponentTests,
    getDateTime: getDateTime,
    getFilesizeInKB: getFilesizeInKB,
    getManifests: getManifests,
    getOptions: getOptions,
    loadAndParseJson: loadAndParseJson,
    rmDir: rmDir,
    sortDependencies: sortDependencies
};