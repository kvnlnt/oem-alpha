(function(COMPONENTS, CORE) {

    var Css = [

        {
            selector: '',
            declaration: [
                "margin:0",
                "padding:0",
                "border-bottom:1px solid " + CORE.Modules.Theme.COLORS.GREY
            ]
        },

        {
            selector: 'dt',
            declaration: [
                "margin:0",
                "line-height:40px",
                "padding:10px",
                "border-top:1px solid " + CORE.Modules.Theme.COLORS.GREY,
                "background-color: " + CORE.Modules.Theme.COLORS.GREY,
                "cursor:pointer"
            ]
        },

        {
            selector: 'dt:hover',
            declaration: [
                "background-color:" + CORE.Modules.Theme.COLORS.GREY
            ]
        },

        {
            selector: 'dd',
            declaration: [
                "margin:0",
                "padding:0px 10px",
                "height:0",
                "overflow:hidden",
                "transition:all 0.25s"
            ]
        },

        {
            selector: 'dd.expanded',
            declaration: [
                "padding:10px",
                "height:auto",
                "overflow:visible",
                "transition:all 0.25s"
            ]
        }

    ];

    COMPONENTS.Accordion.Css = Css;
    return COMPONENTS;

})(oem.Components, oem.Core);