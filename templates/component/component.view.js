ToolhouseUI.Components = (function(Components, Core) {

    var %CLASS%View = {};
    %CLASS%View.id = '%NAME%-css';
    %CLASS%View.css = [

        {
            selector: "%NAME%, .%NAME%",
            declaration: [
                "color:red"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: %CLASS%View.id,
        css: %CLASS%View.css
    });

    Components.CardView = %CLASS%View;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);