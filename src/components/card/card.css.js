ToolhouseUI.Components = (function(Components, Core) {

    var CardCss = {};
    CardCss.id = 'th-card-css';
    CardCss.css = [

        {
            selector: "th-card, .th-card",
            declaration: [
                "background-color: " + Core.Theme.COLORS.greyD,
                "font-size: 16px",
                "display:block",
                "padding:10px",
                "text-align:center",
                "border:1px solid" + Core.Theme.COLORS.greyA
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
        id: CardCss.id,
        css: CardCss.css
    });

    Components.CardCss = CardCss;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);