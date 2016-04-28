ToolhouseUI.Components = (function(Components, Core) {

    var CardView = {};
    CardView.id = 'th-card-css';
    CardView.css = [

        {
            selector: "th-card, .th-card",
            declaration: [
                "background-color: " + Core.Theme.COLORS.white,
                "font-size: 16px",
                "display:block",
                "padding:10px",
                "text-align:center",
                "box-shadow: 0px 0px 4px " + Core.Theme.COLORS.greyA
            ]
        },

        {
            selector: "th-card.mobile, .th-card.mobile",
            declaration: [
                
            ]
        },

        {
            selector: "th-card.tablet, .th-card.tablet",
            declaration: [
                "text-align:left"
            ]
        },

        {
            selector: "th-card.desktop, .th-card.desktop",
            declaration: [
                "font-size:24px;",
                "text-align:left"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: CardView.id,
        css: CardView.css
    });

    Components.CardView = CardView;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);