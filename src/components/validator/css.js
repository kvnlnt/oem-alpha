(function(COMPONENTS, THEME) {

    var Css = [{
        selector:"",
        declaration:{
            display:"none",
            "font-size": THEME.Config.FONT_SIZE_SMALL + "px",
            "margin": "10px 0",
            color: THEME.Config.COLOR_ALERT
        }
    }];
    COMPONENTS.Validator.Css = Css;
    return COMPONENTS;

})(oem.Components, oem.Components.Theme);