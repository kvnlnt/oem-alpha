(function(THEME) {

    THEME.BUTTON = {
        selector: "",
        declaration: {
            "font-size": THEME.Config.FONT_SIZE_MEDIUM,
            "display": "inline-block",
            "padding": "5px 15px",
            "background-color": THEME.Config.COLOR_MAIN,
            "color": THEME.Config.COLOR_WHITE,
            "border":"none",
            "border-radius": "3px",
            "line-height":"24px",
            "cursor":"pointer"
        }
    };

    THEME.BUTTON_HOLLOW = {
        selector: ".--hollow",
        declaration: {
            "background-color": "transparent",
            "border":"1px solid " + THEME.Config.COLOR_MAIN,
            "color": THEME.Config.COLOR_MAIN
        }
    };

    return THEME;

})(oem.Components.Theme);