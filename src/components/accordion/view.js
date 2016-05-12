oem.Components = (function(Components, Core) {

    var AccordionView = {};
    AccordionView.id = 'oem-accordion-css';
    AccordionView.css = [

        {
            selector: "oem-accordion, .oem-accordion",
            declaration: [
                "margin:0",
                "padding:0",
                "border-bottom:1px solid " + Core.Theme.COLORS.greyB
            ]
        },

        {
            selector: "oem-accordion dt, .oem-accordion dt",
            declaration: [
                "margin:0",
                "line-height:40px",
                "padding:10px",
                "border-top:1px solid " + Core.Theme.COLORS.greyB,
                "background-color: " + Core.Theme.COLORS.greyE,
                "cursor:pointer"
            ]
        },

        {
            selector: "oem-accordion dt:hover, .oem-accordion dt:hover",
            declaration: [
                "background-color:" + Core.Theme.COLORS.greyD
            ]
        },

        {
            selector: "oem-accordion dd, .oem-accordion dd",
            declaration: [
                "margin:0",
                "padding:0px 10px",
                "height:0",
                "overflow:hidden"
            ]
        },

        {
            selector: "oem-accordion dd.expanded, .oem-accordion dd.expanded",
            declaration: [
                "padding:10px",
                "height:auto",
                "overflow:visible"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: AccordionView.id,
        css: AccordionView.css
    });

    Components.CardView = AccordionView;
    return Components;

})(oem.Components || {}, oem.Core);