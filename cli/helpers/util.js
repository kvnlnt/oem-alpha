const fs = require('fs');
const pkg = require('../../package');

function createScriptTagLinks(files) {
    var tags = '';
    var files = files instanceof Array ? files : [files];
    files.forEach(function(file) {
        tags += '<script src="' + file + '"></script>\n';
    });
    return tags;
}

function createCssTagLinks(files) {
    var tags = '';
    var files = files instanceof Array ? files : [files];
    files.forEach(function(file) {
        tags += '<link rel="stylesheet" type="text/css" href="' + file + '"/>\n';
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
    return files.filter(function(file){ return file != void 0 });
}

function getComponentStyles(components){
     var components = components instanceof Array ? components : [components]; 
    var files = components.map(function(component) {
        var config = JSON.parse(fs.readFileSync(pkg.oem.development[component], 'utf8'));
        return config.styles;
    });
    return files.filter(function(file){ return file != void 0 });
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

module.exports = {
    getComponentScripts: getComponentScripts,
    getComponentStyles: getComponentStyles,
    getComponentTemplatesHtml: getComponentTemplatesHtml,
    getComponentTests: getComponentTests,
    loadAndParseJson: loadAndParseJson,
    rmDir: rmDir,
    createScriptTagLinks: createScriptTagLinks,
    createCssTagLinks: createCssTagLinks
};