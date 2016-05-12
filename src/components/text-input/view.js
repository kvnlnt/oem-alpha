oem.Components = (function(Components, Core) {

    var TextInputView = {};
    TextInputView.id = 'oem-text-input-css';
    TextInputView.css = [

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

    // add to css renderer
    Core.Css.add({
        id: TextInputView.id,
        css: TextInputView.css
    });

    Components.CardView = TextInputView;
    return Components;

})(oem.Components || {}, oem.Core);