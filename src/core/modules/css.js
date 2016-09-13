(function(Core) { 

    var Css = {};

    /**
     * { function_description }
     *
     * @method     getCss
     * @param      {<type>}           css     { description }
     * @return     {(Object|string)}  { description_of_the_return_value }
     */
    Css.translateCss = function(id, css) {
        var selector = '[data-oem="'+id+'"]';
        var declarations = function(declaration) {
            return "   " + declaration + ";\n";
        };
        var rules = function(rule) {
            return selector + '' + rule.selector + " {\n" + rule.declaration.map(declarations).join('') + "}";
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
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        style.setAttribute("data-oem-css", id);
        // XXX: this is for IE8
        // we have to try catch this because polyfills don't account for cssText
        try {
             style.innerHTML = this.translateCss(id, css);
         } catch(err) {
            style.styleSheet.cssText = this.translateCss(id, css);
         }
        head.appendChild(style);
        return style;
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
                id = component.Prototype.type;
                Css.render(id, component.Css);
            }
        }
    };

    // generate onload
    Core.Modules.Events.addEventListener(Core.Modules.EVENTS.DOCUMENT_READY, function(){
        Css.renderComponentCss(oem.Components);
    });

    Core.Modules.Css = Css;
    return Core;

})(oem.Core);