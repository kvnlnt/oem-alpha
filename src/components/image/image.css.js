ToolhouseUI.Components = (function(Components, Core) {

    var css = [{
            selector: "th-image, .th-image",
            declaration: [
                "width:100%"
            ]
        }];

    // add to css renderer
    Core.Css.add({
        id: 'th-image',
        css: css
    });

    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);