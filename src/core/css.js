oem.Core = (function(Core) { 

    var Css = {};

    /**
     * { function_description }
     *
     * @method     getCss
     * @param      {<type>}           css     { description }
     * @return     {(Object|string)}  { description_of_the_return_value }
     */
    Css.translateCss = function(css) {
        var declarations = function(declaration) {
            return "   " + declaration + ";\n";
        };
        var rules = function(rule) {
            return rule.selector + " {\n" + rule.declaration.map(declarations).join('') + "}";
        };
        // all rules
        return css.map(rules).join('\n\n');
    };

    /**
     * Render specific css
     *
     * @method     render
     * @param      {string}  id      -string of id
     * @param      {Object}  css    - css defintion configuration
     * @return     {Object}         - self
     */
    Css.render = function(id, css) {
        var _head = document.getElementsByTagName('head')[0];
        var _style = document.createElement("style");
        _style.setAttribute("type", "text/css");
        _style.setAttribute("id", id);
        // XXX: this is for IE8
        // we have to try catch this because polyfills don't account for cssText
        try {
             _style.innerHTML = this.translateCss(css);
         } catch(err) {
            _style.styleSheet.cssText = this.translateCss(css);
         }
        _head.appendChild(_style);
        return _style;
    };

    /**
     * Render all collected css
     *
     * @method     renderAll
     */
    Css.renderComponentCss = function(components) {
        var id;
        for (var component in oem.Components) {
            component = oem.Components[component];
            if(component.hasOwnProperty("Css")){
                id = component.Prototype.selector+"-css";
                Css.render(id, component.Css);
            }
        }
    };

    // generate onload
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        Css.renderComponentCss(oem.Components);
    });

    Core.Css = Css;
    return Core;

})(oem.Core || {});