(function (Core) {

    var Theme = {};

    // Breakpoints
    var BREAKPOINTS = {};
    BREAKPOINTS.MOBILE = 400;
    BREAKPOINTS.MOBILE_LANDSCAPE = 800;
    BREAKPOINTS.TABLET = 1000;
    BREAKPOINTS.DESKTOP = 1200;
    Theme.BREAKPOINTS = BREAKPOINTS;

    // Theme Colors
    var COLORS = {};
    COLORS.PITCH_BLACK = '#000000';
    COLORS.BLACK = '#222222';
    COLORS.LIGHT_GREY = '#DDDDDD';
    COLORS.GREY = '#AAAAAA';
    COLORS.DARK_GREY = '#999999';
    COLORS.STARK_WHITE = '#FFFFFF';
    COLORS.WHITE = '#f2f2f2';
    COLORS.OFF_WHITE = 'e6e6e6';
    COLORS.ALERT = 'red';
    COLORS.SUCCESS = 'green';
    COLORS.WARNING = 'yellow';
    Theme.COLORS = COLORS;

    // Font sizes
    var FONT = {};
    FONT.SIZE = {};
    FONT.SIZE.TINY = 11;
    FONT.SIZE.SMALL = 12;
    FONT.SIZE.MEDIUM = 14;
    FONT.SIZE.LARGE = 18;
    FONT.SIZE.HUGE = 24;
    Theme.FONT = FONT;

    // Base64 Images
    var IMAGES = {};
    Theme.IMAGES = IMAGES;

    // Forms
    var FORMS = {};
    FORMS.FIELD_BORDER_COLOR = COLORS.LIGHT_GREY;
    FORMS.FIELD_BORDER_RADIUS = '2px';
    FORMS.FIELD_MARGIN = '13px';
    FORMS.FIELD_PADDING = '8px';

    FORMS.BUTTON = {
        selector: "",
        declaration: [
            "font-size:" + FONT.SIZE.MEDIUM + "px",
            "padding: 5px 10px",
            "border:0",
            "cursor:pointer"
        ]
    };

    FORMS.FIELD_INPUT = {
        selector:' input',
        declaration:[
            'border-radius:' + FORMS.FIELD_BORDER_RADIUS,
            'border:1px solid' + FORMS.FIELD_BORDER_COLOR,
            'padding-top: ' + FORMS.FIELD_PADDING,
            'padding-bottom: ' + FORMS.FIELD_PADDING,
            'text-indent: ' + FORMS.FIELD_PADDING,
            'width: 100%'
        ]
    };

    FORMS.FIELD_HELP = {
        selector:' .help',
        declaration:[
            'font-size: '+FONT.SIZE.SMALL+'px',
            'opacity: 0.5',
            'margin-bottom: ' + FONT.SIZE.SMALL + 'px'
        ]
    };

    FORMS.FIELD_LABEL = {
        selector:' label',
        declaration:[
            'font-size: '+FONT.SIZE.MEDIUM+'px',
            'margin-top:' + FONT.SIZE.SMALL + 'px',
            'margin-bottom: ' + FONT.SIZE.SMALL + 'px'
        ]
    };

    FORMS.FIELD_VALIDATOR = {
        selector: '',
        declaration: [
            'display:none',
            'color:'+ COLORS.ALERT,
            'font-size:' + FONT.SIZE.SMALL + 'px',
            'margin-top:' + FONT.SIZE.SMALL + 'px',
            'margin-bottom: ' + FONT.SIZE.SMALL + 'px'
        ]
    };

    Theme.FORMS = FORMS;

    // exports
    Core.Modules.Theme = Theme;
    return Core;

})(oem.Core);