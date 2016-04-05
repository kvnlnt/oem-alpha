ToolhouseUI.Components = (function(Components, Core) {

    var css = [

        {
            selector: "th-card, .th-card",
            declaration: [
                "background-color: " + Core.Theme.COLORS.white,
                "font-size: 22px",
                "display:block",
                "padding:10px"
            ]
        },

        {
            selector: "th-card.mobile, .th-card.mobile",
            declaration: [
                "border:1px solid black"
            ]
        },

        {
            selector: "th-card.tablet, .th-card.tablet",
            declaration: [
                "border:3px solid black"
            ]
        },

        {
            selector: "th-card.desktop, .th-card.desktop",
            declaration: [
                "border:5px solid black"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: 'th-card',
        css: css
    });

    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);