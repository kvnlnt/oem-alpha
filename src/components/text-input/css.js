oem.Components = (function(Components, Core) {

    var Css = [

        {
            selector: ".oem-text-input .help",
            declaration: [
                "font-size:12px",
            ]
        },

        {
            selector: ".oem-text-input .validations",
            declaration: [
                "display:none"
            ]
        },

        {
            selector: ".oem-text-input .errors",
            declaration: [
                "color:" + Core.Theme.COLORS.alert
            ]
        }

    ];


    Components.TextInput.Css = Css;
    return Components;

})(oem.Components || {}, oem.Core);