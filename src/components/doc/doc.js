"use strict";

ToolhouseUI.Components = (function(Components, Core) {

    class Doc {

        constructor(options) {
            this.documents = options.documents;
            this.descr = options.descr;
            this.selector = options.selector;
            this.dom = options.dom;
            // this.docDescr().docProps().docMethods().docBreakpoints().docCss();
        }

        doc(){
            this.docDescr();
        }

        docDescr() {
            var p = $("<p>");
            p.html(this.descr);
            $(this.selector).append(p);
            return this;
        }

        docProps() {
            var h2 = $("<h2>");
            h2.text("PROPERTIES");
            var table = $("<table>");
            var tr = $("<tr>");
            var td1 = $("<th>").html("Property");
            var td2 = $("<th>").html("Type");
            table.append(tr.append(td1).append(td2));
            var props = Core.Reflector.getObjectProps(this.documents);
            props.forEach(function(prop){
                var tr = $("<tr>");
                var td1 = $("<td>").html(prop.prop);
                var td2 = $("<td>").html(prop.type);
                table.append(tr.append(td1).append(td2));
            });
            $(this.selector).append(h2).append(table);
            return this;
        }

        docMethods() {
            var h2 = $("<h2>");
            h2.text("METHODS");
            var table = $("<table>");
            var tr = $("<tr>");
            var td1 = $("<th>").html("Method");
            var td2 = $("<th>").html("Signature");
            table.append(tr.append(td1).append(td2));
            var funcs = Core.Reflector.getObjectFuncs(this.klass);
            funcs.forEach(function(func){
                var tr = $("<tr>");
                var td1 = $("<td>").html(func.func);
                var td2 = $("<td>").html(func.args.join());
                table.append(tr.append(td1).append(td2));
            });
            $(this.selector).append(h2).append(table);
            return this;
        }

        docBreakpoints() {
            var h2 = $("<h2>");
            h2.text("BREAKPOINTS");
            var table = $("<table>");
            var tr = $("<tr>");
            var td1 = $("<th>").html("class");
            var td2 = $("<th>").html("range");
            table.append(tr.append(td1).append(td2));
            this.klass.breakpoints.forEach(function(breakpoint){
                var tr = $("<tr>");
                var td1 = $("<td>").html(breakpoint.klass);
                var td2 = $("<td>").html(breakpoint.range.join('-'));
                table.append(tr.append(td1).append(td2));
            });
            $(this.selector).append(h2).append(table);
            return this;
        }

        docCss() {
            var css = new Core.Css(this.klass.css.css, 'BaseCss');
            var h2 = $("<h2>");
            h2.text("CSS");
            var pre = $("<pre>");
            var code = $("<code>");
            code.attr("data-language", "css");
            code.html(css.getCss());
            $(this.selector).append(h2).append(pre.append(code));
            return this;
        }

    }

    Doc.type = Core.Component.TYPE.noop;
    Components.Doc = Doc;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);