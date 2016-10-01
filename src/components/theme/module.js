(function(COMPONENTS) {

    // Main component namespace
    var Theme = {};

    Theme.CONFIG = {};
    Theme.CONFIG.FONT_SIZE_MEDIUM = 14;
    Theme.CONFIG.FORM_FIELD_BORDER_COLOR = '#666666';

    Theme.FORM_FIELD_INPUT = {
        selector: "> input",
        declaration: {
            "width":"100%",
            "font-size": Theme.CONFIG.FONT_SIZE_MEDIUM + "px",
            "padding":"10px 0",
            "text-indent":"10px",
            "border":"1px solid " + Theme.CONFIG.FORM_FIELD_BORDER_COLOR,
            "border-radius": "2px"
        }
    };
    
    Theme.FORM_HELP = {
        selector: ".help",
        declaration: {
            "font-size": Theme.CONFIG.FONT_SIZE_MEDIUM + "px",
            "opacity": 0.6,
            "margin": "10px 0"
        }
    };

    Theme.FORM_VALIDATIONS = {
        selector: ".validations",
        declaration: {
            "display":"none"
        }
    };

    // exports
    COMPONENTS.Theme = Theme;
    return COMPONENTS;

})(oem.Components);