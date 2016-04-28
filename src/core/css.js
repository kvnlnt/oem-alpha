oem.Core = (function(Core) { 

    var Css = {};
    Css.collection = [];

    /**
     * Add new css rule
     *
     * @method     add
     * @param      {<type>}  css     { description }
     */
    Css.add = function(css) {
        Css.collection.push(css);
    };

    /**
     * { function_description }
     *
     * @method     getCss
     * @param      {<type>}           css     { description }
     * @return     {(Object|string)}  { description_of_the_return_value }
     */
    Css.renderCss = function(css) {
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
    Css.renderStyleTag = function(id, css) {
        var _head = document.getElementsByTagName('head')[0];
        var _style = document.createElement("style");
        _style.setAttribute("type", "text/css");
        _style.setAttribute("id", id);
        // XXX: this is for IE8
        // we have to try catch this because polyfills don't account for cssText
        try {
             _style.innerHTML = this.renderCss(css);
         } catch(err) {
            _style.styleSheet.cssText = this.renderCss(css);
         }
        _head.appendChild(_style);
        return this;
    };

    /**
     * Render all collected css
     *
     * @method     renderAll
     */
    Css.renderAll = function() {
        var css;
        for (var i = 0; i < Css.collection.length; i++) {
            css = Css.collection[i];
            Css.renderStyleTag(css.id, css.css);
        }
    };

    // generate onload
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, Css.renderAll);

    Core.Css = Css;
    return Core;

})(oem.Core || {});