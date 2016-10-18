const fs = require('fs');
const pkg = require('../../package');

function wrapInScriptTag(files) {
    var tags = '';
    files.forEach(function(file) {
        tags += '<script src="' + file + '"></script>\n';
    });
    return tags;
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
};

function loadAndParseJson(file){
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function getComponentScripts(components){
    var components = components instanceof Array ? components : [components]; 
    var files = components.map(function(component) {
        var config = JSON.parse(fs.readFileSync(pkg.oem.development[component], 'utf8'));
        return config.scripts;
    });
    return files;
}

function getComponentStyles(components){
    var components = components instanceof Array ? components : [components];
    var files = components.map(function(component) {
        var config = JSON.parse(fs.readFileSync(pkg.oem.development[component], 'utf8'));
        return config.styles;
    });
    return files;
}

function getComponentTests(components){
    var components = components instanceof Array ? components : [components];
    var files = components.map(function(component) {
        var config = JSON.parse(fs.readFileSync(pkg.oem.development[component], 'utf8'));
        return config.tests;
    });
    return files;
}

function getComponentTemplatesHtml(templates){
    var html = Object.keys(templates).map(function(template) {
        return fs.readFileSync(templates[template], 'utf8');
    });
    return html;
}

function flattenList(list) {
    var flattenedList = [];
    list.forEach(function(item){
        flattenedList.concat(item);
    });
    return flattenedList;
}

module.exports = {
    flattenList: flattenList,
    getComponentScripts: getComponentScripts,
    getComponentStyles: getComponentStyles,
    getComponentTemplatesHtml: getComponentTemplatesHtml,
    getComponentTests: getComponentTests,
    loadAndParseJson: loadAndParseJson,
    rmDir: rmDir,
    wrapInScriptTag: wrapInScriptTag
};