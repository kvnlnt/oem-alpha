(function(COMPONENTS) {

    // Main component namespace
    var Theme = {};
    var CONFIG = {};
    CONFIG.FONT_SIZE_SMALL = 12;
    CONFIG.FONT_SIZE_MEDIUM = 14;
    CONFIG.FORM_FIELD_BORDER_COLOR = '#666666';
    CONFIG.COLOR_MAIN = '#000000';
    CONFIG.COLOR_WHITE = '#FFFFFF';

    Theme.BUTTON = {
        selector: "",
        declaration: {
            "font-size": CONFIG.FONT_SIZE_MEDIUM,
            "display": "inline-block",
            "padding": "5px 15px",
            "background-color": CONFIG.COLOR_MAIN,
            "color": CONFIG.COLOR_WHITE,
            "border":"none",
            "border-radius": "3px",
            "line-height":"24px"
        }
    }

    Theme.FORM_FIELD_INPUT = {
        selector: " > input",
        declaration: {
            "width":"100%",
            "font-size": CONFIG.FONT_SIZE_MEDIUM + "px",
            "padding":"10px 0",
            "text-indent":"10px",
            "border":"1px solid " + CONFIG.FORM_FIELD_BORDER_COLOR,
            "border-radius": "2px"
        }
    };
    
    Theme.FORM_FIELD_HELP = {
        selector: " .help",
        declaration: {
            "font-size": CONFIG.FONT_SIZE_SMALL + "px",
            "opacity": 0.6,
            "margin": "0 0 5px"
        }
    };

    Theme.FORM_FIELD_LABEL = {
        selector: " label",
        declaration: {
            "font-size": CONFIG.FONT_SIZE_MEDIUM + "px",
            "margin": "10px 0"
        }
    };

    Theme.FORM_VALIDATIONS = {
        selector: " .validations",
        declaration: {
            "display":"none"
        }
    };

    // exports
    Theme.CONFIG = CONFIG;
    COMPONENTS.Theme = Theme;
    return COMPONENTS;

})(oem.Components);