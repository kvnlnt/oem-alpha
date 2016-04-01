ToolhouseUI.Core = (function(Core) {

    var $ = Core.Dom;

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
        var $head = $("head");
        var $style = $("<style></style>");
        $style.attr({
            id: id
        });
        $style.html(this.renderCss(css));
        $head.append($style);
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

})(ToolhouseUI.Core || {});