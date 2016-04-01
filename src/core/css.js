ToolhouseUI.Core = (function(Core) {

    const $ = Core.Dom;

    const Css = function(css, id) {
        this.id = id;
        this.css = css || null;
    };

    Css.prototype = {

        setCss: function(css) {
            this.css = css;
        },

        getCss: function() {
            var declarations = function(declaration) {
                return "   " + declaration + ";\n";
            };
            var rules = function(rule) {
                return rule.selector + " {\n" + rule.declaration.map(declarations).join('') + "}";
            };
            return this.css.map(rules).join('\n\n');
        },

        write: function() {
            var $head = $("head");
            var $style = $("<style></style>");
            $style.attr({
                'th-id': this.id
            });
            $style.html(this.getCss());
            $head.append($style);
            return this;
        }

    };

    Core.Css = Css;
    return Core;

})(ToolhouseUI.Core || {});