ToolhouseUI.Components = (function(Components, Core) {

    var KevinView = {};
    KevinView.id = 'th-kevin-css';
    KevinView.css = [

        {
            selector: "th-kevin, .th-kevin",
            declaration: [
                "color:red"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: KevinView.id,
        css: KevinView.css
    });

    Components.CardView = KevinView;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);