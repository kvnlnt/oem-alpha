(function(COMPONENTS, THEME) {

    var Css = [

        {
            selector: '',
            declaration: [
                'display:none',
                'color:'+ THEME.COLORS.ALERT
            ]
        }

    ];


    COMPONENTS.Validator.Css = Css;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Theme);