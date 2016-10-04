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

        function declaration(declaration) {
            var declarations = Object.keys(declaration).map(function(k){
                return "   " + k + ":" + declaration[k] + ";\n";
            });
            return declarations.join('');
        };

        function rules(rule) {
            return selector + '' + rule.selector + " {\n" + declaration(rule.declaration) + "}";
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
        var selector = '[data-oem-css="'+id+'"]';
        var currentStyleTag = document.querySelector(selector);
        // replace existing tag
        if(currentStyleTag){
            var style = currentStyleTag;            
        } else {
            var style = document.createElement("style"); 
            style.setAttribute("type", "text/css");
            style.setAttribute("data-oem-css", id);  
        }
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
    Css.renderAll = function(components) {
        var id;
        var styles = {};
        for (var component in oem.Components) {
            component = oem.Components[component];
            if(component.hasOwnProperty("Css")){
                id = component.Prototype.type;
                styles[id] = Css.render(id, component.Css);
            }
        }
        return styles;
    };

    // generate onload
    Core.Modules.Events.addEventListener(Core.Modules.EVENTS.DOCUMENT_READY, function(){
        Css.renderAll(oem.Components);
    });

    Core.Modules.Css = Css;
    return Core;

})(oem.Core);