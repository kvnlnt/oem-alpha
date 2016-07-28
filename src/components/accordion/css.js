(function(Components, Core) {

    var Css = [

        {
            selector: "oem-accordion, .oem-accordion",
            declaration: [
                "margin:0",
                "padding:0",
                "border-bottom:1px solid " + Core.Modules.Theme.COLORS.GREY
            ]
        },

        {
            selector: "oem-accordion dt, .oem-accordion dt",
            declaration: [
                "margin:0",
                "line-height:40px",
                "padding:10px",
                "border-top:1px solid " + Core.Modules.Theme.COLORS.GREY,
                "background-color: " + Core.Modules.Theme.COLORS.GREY,
                "cursor:pointer"
            ]
        },

        {
            selector: "oem-accordion dt:hover, .oem-accordion dt:hover",
            declaration: [
                "background-color:" + Core.Modules.Theme.COLORS.GREY
            ]
        },

        {
            selector: "oem-accordion dd, .oem-accordion dd",
            declaration: [
                "margin:0",
                "padding:0px 10px",
                "height:0",
                "overflow:hidden",
                "transition:all 0.25s"
            ]
        },

        {
            selector: "oem-accordion dd.expanded, .oem-accordion dd.expanded",
            declaration: [
                "padding:10px",
                "height:auto",
                "overflow:visible",
                "transition:all 0.25s"
            ]
        }

    ];

    Components.Accordion.Css = Css;
    return Components;

})(oem.Components, oem.Core);