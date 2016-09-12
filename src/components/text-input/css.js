(function(Components, THEME) {

    var Css = [
        {
            selector:'input[type="text"]',
            declaration:[
                'border-radius:' + THEME.FORMS.FIELD_BORDER_RADIUS,
                'border:1px solid' + THEME.FORMS.FIELD_BORDER_COLOR
            ]
        }
    ];

    Components.TextInput.Css = Css;

    return Components;

})(oem.Components, oem.Core.Modules.Theme);