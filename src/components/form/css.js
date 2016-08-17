(function(COMPONENTS, THEME) {

    var Css = [

        {
            selector: ".help",
            declaration: [
                "font-size:" + THEME.FONT.SIZE.MEDIUM + "px",
                "margin: 10px 0px",
                "opacity: 0.6"
            ]
        },

        {
            selector: ".validations",
            declaration: [
                "display:none"
            ]
        },

        {
            selector: ".errors",
            declaration: [
                "color:" + THEME.COLORS.ALERT,
                "font-size:" + THEME.FONT.SIZE.SMALL
            ]
        },

        {
            selector: "input",
            declaration: [
                "width:100%",
                "font-size:" + THEME.FONT.SIZE.MEDIUM + "px",
                "padding:10px",
                "border:1px solid " + THEME.FORMS.FIELD_BORDER_COLOR,
                "border-radius: 2px"
            ]
        }

    ];


    COMPONENTS.Form.Css = Css;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Theme);