oem.Components = (function(Components, Core) {

    var Css = [

        {
            selector: "oem-button, .oem-button",
            declaration: [
                "font-size:" + Core.Theme.FONT_SIZES.button + "px",
                "padding: 5px 10px",
                "border:0",
                "cursor:pointer"
            ]
        }

    ];


    Components.Button.Css = Css;
    return Components;

})(oem.Components || {}, oem.Core);