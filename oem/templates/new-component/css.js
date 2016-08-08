(function(COMPONENTS) {

    var Css = [

        {
            selector: '[data-oem="%CLASS%"]',
            declaration: [
                "color:black"
            ]
        }

    ];


    COMPONENTS.%CLASS%.Css = Css;
    return COMPONENTS;

})(oem.Components);