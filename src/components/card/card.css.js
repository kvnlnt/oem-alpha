ToolhouseUI.Components = (function(Components, Core) {

    const Config = Components.CardConfig;
    const CardCss = {};
    CardCss.type = Components.BaseConfig.TYPES.css;

    CardCss.css = [

        {
            selector: "th-card",
            declaration: [
                "background-color: " + Components.BaseConfig.COLORS.white,
                "font-size: 1.6rem",
                "display:block",
                "padding:1rem"
            ]
        },

        {
            selector: "th-card.mobile",
            declaration: [
                "border:1px solid black"
            ]
        },

        {
            selector: "th-card.tablet",
            declaration: [
                "border:3px solid black"
            ]
        },

        {
            selector: "th-card.desktop",
            declaration: [
                "border:5px solid black"
            ]
        }

    ];

    Components.CardCss = CardCss;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);