ToolhouseUI.Components = (function(Components, Core) {

    var css = [

        {
            selector: "*",
            declaration: [
                "transition: all 0.5s",
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: 'th-base',
        css: css
    });

    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);