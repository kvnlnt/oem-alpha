(function(Components, THEME) {

    var Css = [
        {
            selector:'input[type="text"]',
            declaration:[
                'border-radius:4px',
                'border:0px'
            ]
        }
    ];

    Components.TextInput.Css = Css;

    return Components;

})(oem.Components, oem.Core.Modules.Theme);