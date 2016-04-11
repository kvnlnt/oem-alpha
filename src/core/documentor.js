ToolhouseUI.Core = (function(Core) {

    var Documentor = {};
    Documentor.name = null;
    Documentor.testComponent = null;

    // noop
    Documentor.docHtml = function(){
    };

    Documentor.docCss = function(cssConfig){
        var css = Core.Css.renderCss(cssConfig.css);
        var pre = document.createElement("pre");
        var code = document.createElement("code");
        code.setAttribute('data-language', 'css');
        var el = document.querySelector("."+this.testComponent+".css");
        code.innerHTML = css;
        pre.appendChild(code);
        el.appendChild(pre);
    };

    Documentor.docJs = function(js){
        Core.Log('js');
    };

    var css = [];

    // add to css renderer
    Core.Css.add({
        id: 'th-doc-css',
        css: css
    });

    Core.Documentor = Documentor;
    return Core;

})(ToolhouseUI.Core || {});

