oem.Components = (function(Components, Core) {

    var Css = [

        {
            selector: ".oem-form .help",
            declaration: [
                "font-size:" + Core.Theme.FONT_SIZES.MEDIUM + "px",
                "margin: 10px 0px",
                "opacity: 0.6"
            ]
        },

        {
            selector: ".oem-form .validations",
            declaration: [
                "display:none"
            ]
        },

        {
            selector: ".oem-form .errors",
            declaration: [
                "color:" + Core.Theme.COLORS.ALERT,
                "font-size:" + Core.Theme.FONT_SIZES.SMALL
            ]
        },

        {
            selector: ".oem-form input",
            declaration: [
                "width:100%",
                "font-size:" + Core.Theme.FONT_SIZES.MEDIUM + "px",
                "padding:10px",
                "border:1px solid " + Core.Theme.FORMS.FIELD_BORDER_COLOR,
                "border-radius: 2px"
            ]
        }

    ];


    Components.Form.Css = Css;
    return Components;

})(oem.Components || {}, oem.Core);