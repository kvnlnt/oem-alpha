oem.Components = (function(Components, Core) {

    var Css = [

        {
            selector: "oem-button, .oem-button",
            declaration: [
                "font-size:" + Core.Theme.FONT.SIZE.MEDIUM + "px",
                "padding: 5px 10px",
                "border:0",
                "cursor:pointer"
            ]
        }

    ];


    Components.Button.Css = Css;
    return Components;

})(oem.Components || {}, oem.Core);