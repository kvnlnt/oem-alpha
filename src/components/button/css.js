(function(COMPONENTS, THEME) {

    var Css = [

        {
            selector: "",
            declaration: [
                "font-size:" + THEME.FONT.SIZE.MEDIUM + "px",
                "padding: 5px 10px",
                "border:0",
                "cursor:pointer"
            ]
        }

    ];


    COMPONENTS.Button.Css = Css;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Theme);