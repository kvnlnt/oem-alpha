oem.Components = (function(Components, Core) {

    var Css = [

        {
            selector: "%SELECTOR%, .%SELECTOR%",
            declaration: [
                "color:red"
            ]
        }

    ];


    Components.%CLASS%.Css = Css;
    return Components;

})(oem.Components || {}, oem.Core);