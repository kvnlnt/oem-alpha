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

    // Forms
    var FORMS = {};
    FORMS.FIELD_BORDER_COLOR = COLORS.LIGHT_GREY;
    FORMS.FIELD_BORDER_RADIUS = '4px';
    Theme.FORMS = FORMS;

    // Base64 Images
    var IMAGES = {};
    Theme.IMAGES = IMAGES;

    // exports
    Core.Modules.Theme = Theme;
    return Core;

})(oem.Core);