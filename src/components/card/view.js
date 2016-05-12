oem.Components = (function(Components, Core) {

    var CardView = {};
    CardView.id = 'oem-card-css';
    CardView.css = [

        {
            selector: "oem-card, .oem-card",
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
            selector: "oem-card.mobile, .oem-card.mobile",
            declaration: [
                
            ]
        },

        {
            selector: "oem-card.tablet, .oem-card.tablet",
            declaration: [
                "text-align:left"
            ]
        },

        {
            selector: "oem-card.desktop, .oem-card.desktop",
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

})(oem.Components || {}, oem.Core);