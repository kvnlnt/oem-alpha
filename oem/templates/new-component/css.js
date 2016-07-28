(function(COMPONENTS) {

    var Css = [

        {
            selector: "%SELECTOR%, .%SELECTOR%",
            declaration: [
                "color:black"
            ]
        }

    ];


    COMPONENTS.%CLASS%.Css = Css;
    return COMPONENTS;

})(oem.Components);