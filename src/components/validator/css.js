(function(COMPONENTS, THEME) {

    var Css = [{
        selector:"",
        declaration:{
            display:"none",
            "font-size": THEME.CONFIG.FONT_SIZE_SMALL + "px",
            "margin": "10px 0",
            color: THEME.CONFIG.COLOR_ALERT
        }
    }];
    COMPONENTS.Validator.Css = Css;
    return COMPONENTS;

})(oem.Components, oem.Components.Theme);