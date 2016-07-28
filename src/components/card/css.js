(function(Components, Core) {

    var Css = [

        {
            selector: "oem-card, .oem-card",
            declaration: [
                "background-color: " + Core.Theme.COLORS.WHITE,
                "font-size: 16px",
                "display:block",
                "padding:10px",
                "text-align:center",
                "box-shadow: 0px 0px 4px " + Core.Theme.COLORS.GREY
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

    Components.Card.Css = Css;
    return Components;

})(oem.Components, oem.Core);