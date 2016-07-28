(function(Components, Core) {

    var Css = [

        {
            selector: "%SELECTOR%, .%SELECTOR%",
            declaration: [
                "color:black"
            ]
        }

    ];


    Components.%CLASS%.Css = Css;
    return Components;

})(oem.Components, oem.Core);