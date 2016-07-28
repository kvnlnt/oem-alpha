(function(Core) {

    var Theme                = {};

    // Theme Colors
    var COLORS               = {};
    COLORS.BLACK             = '#000000';
    COLORS.LIGHT_GREY        = '#DDDDDD';
    COLORS.GREY              = '#AAAAAA';
    COLORS.DARK_GREY         = '#999999';
    COLORS.WHITE             = '#FFFFFF';
    COLORS.ALERT             = 'red';
    COLORS.SUCCESS           = 'green';
    COLORS.WARNING           = 'yellow';
    Theme.COLORS             = COLORS;

    // Font sizes
    var FONT                 = {};
    FONT.SIZE                = {};
    FONT.SIZE.TINY           = 11;
    FONT.SIZE.SMALL          = 12;
    FONT.SIZE.MEDIUM         = 14;
    FONT.SIZE.LARGE          = 18;
    FONT.SIZE.HUGE           = 24;
    Theme.FONT               = FONT;

    // Forms
    var FORMS                = {};
    FORMS.FIELD_BORDER_COLOR = COLORS.LIGHT_GREY;
    Theme.FORMS              = FORMS;

    // Base64 Images
    var IMAGES               = {};
    Theme.IMAGES             = IMAGES;

    // exports
    Core.Theme               = Theme;
    return Core;

})(oem.Core);