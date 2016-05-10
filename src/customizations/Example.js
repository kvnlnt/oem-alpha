oem.Core = (function(Core) {

    var Theme = {};

    // Theme Colors
    var COLORS = {};
    COLORS.black = '#000000';
    COLORS.grey1 = '#111111';
    COLORS.grey2 = '#222222';
    COLORS.grey3 = '#333333';
    COLORS.grey4 = '#444444';
    COLORS.grey5 = '#555555';
    COLORS.grey6 = '#666666';
    COLORS.grey7 = '#777777';
    COLORS.grey8 = '#888888';
    COLORS.grey9 = '#999999';
    COLORS.greyA = '#AAAAAA';
    COLORS.greyB = '#BBBBBB';
    COLORS.greyC = '#CCCCCC';
    COLORS.greyD = '#DDDDDD';
    COLORS.greyE = '#EEEEEE';
    COLORS.white = '#FFFFFF';
    COLORS.alert = 'red';
    COLORS.success = 'green';
    Theme.COLORS = COLORS;

    // css definitions, see Css module
    var IMAGES = {};
    IMAGES.toolhouse = [];

    Theme.IMAGES = IMAGES;

    // exports
    Core.Theme = Theme;
    return Core;

})(oem.Core);