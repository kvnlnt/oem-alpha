(function(COMPONENTS) {

    // Main component namespace
    var Theme = {};
    
    // exports
    COMPONENTS.Theme = Theme;
    return COMPONENTS;

})(oem.Components);

// (function (Configurations) {

//     var THEME = {};

//     // Breakpoints
//     THEME.BREAKPOINTS_MOBILE = 400;
//     THEME.BREAKPOINTS_MOBILE_LANDSCAPE = 800;
//     THEME.BREAKPOINTS_TABLET = 1000;
//     THEME.BREAKPOINTS_DESKTOP = 1200;

//     // Colors
//     THEME.COLOR_MAIN = '#666666';
//     THEME.COLOR_SECONDARY = '#999999';
//     THEME.COLOR_ACCENT = '#333333';
//     THEME.COLOR_BLACK = '#222222';
//     THEME.COLOR_GREY = '#AAAAAA';
//     THEME.COLOR_WHITE = '#FFFFFF';
//     THEME.COLOR_ALERT = 'red';
//     THEME.COLOR_SUCCESS = 'green';
//     THEME.COLOR_WARNING = 'yellow';

//     // Fonts
//     THEME.FONT_FAMILY_PRIMARY = 'Arial';
//     THEME.FONT_FAMILY_SECONDARY = 'Verdana';
//     THEME.FONT_FAMILY_ACCENT = 'Times';
//     THEME.FONT_SIZE_TINY = 11;
//     THEME.FONT_SIZE_SMALL = 12;
//     THEME.FONT_SIZE_MEDIUM = 14;
//     THEME.FONT_SIZE_LARGE = 18;
//     THEME.FONT_SIZE_HUGE = 24;

//     // Base64 Icons
//     // THEME.ICON;

//     // Forms
//     THEME.FORM_FIELD_BORDER_COLOR = THEME.COLOR_LIGHT_GREY;
//     THEME.FORM_FIELD_BORDER_RADIUS = '2px';
//     THEME.FORM_FIELD_MARGIN = '13px';
//     THEME.FORM_FIELD_PADDING = '8px';

//     THEME.FORM_BUTTON = {
//         selector: "",
//         declaration: [
//             "font-size:" + THEME.FONT_SIZE_MEDIUM + "px",
//             "padding: 5px 10px",
//             "border:0",
//             "cursor:pointer"
//         ]
//     };

//     THEME.FORM_FIELD_INPUT = {
//         selector:' input',
//         declaration:[
//             'border-radius:' + THEME.FORM_FIELD_BORDER_RADIUS,
//             'border:1px solid' + THEME.FORM_FIELD_BORDER_COLOR,
//             'padding-top: ' + THEME.FORM_FIELD_PADDING,
//             'padding-bottom: ' + THEME.FORM_FIELD_PADDING,
//             'text-indent: ' + THEME.FORM_FIELD_PADDING,
//             'width: 100%'
//         ]
//     };

//     THEME.FORM_FIELD_HELP = {
//         selector:' .help',
//         declaration:[
//             'font-size: '+THEME.FONT_SIZE_SMALL+'px',
//             'opacity: 0.5',
//             'margin-bottom: ' + THEME.FONT_SIZE_SMALL + 'px'
//         ]
//     };

//     THEME.FORM_FIELD_LABEL = {
//         selector:' label',
//         declaration:[
//             'font-size: '+THEME.FONT_SIZE_MEDIUM+'px',
//             'margin-top:' + THEME.FONT_SIZE_SMALL + 'px',
//             'margin-bottom: ' + THEME.FONT_SIZE_SMALL + 'px'
//         ]
//     };

//     THEME.FORM_FIELD_VALIDATOR = {
//         selector: '',
//         declaration: [
//             'display:none',
//             'color:'+ THEME.COLOR_ALERT,
//             'font-size:' + THEME.FONT_SIZE_SMALL + 'px',
//             'margin-top:' + THEME.FONT_SIZE_SMALL + 'px',
//             'margin-bottom: ' + THEME.FONT_SIZE_SMALL + 'px'
//         ]
//     };

//     THEME.FORMS = FORMS;

//     // exports
//     Configurations.THEME = THEME;
//     return Core;

// })(oem.Configurations);