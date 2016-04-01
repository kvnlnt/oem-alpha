ToolhouseUI.Components = (function(Components, Core) {

    const BREAKPOINTS = [];
    BREAKPOINTS.push({ "klass": "mobile", range: [0, 720] });
    BREAKPOINTS.push({ "klass": "tablet", range: [721, 960] });
    BREAKPOINTS.push({ "klass": "desktop", range: [961, 10000] });

    const COLORS = {};
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

    var BaseConfig = {};
    BaseConfig.type = Core.Component.TYPE.config;
    BaseConfig.BREAKPOINTS = BREAKPOINTS;
    BaseConfig.COLORS = COLORS;

    Components.BaseConfig = BaseConfig;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);