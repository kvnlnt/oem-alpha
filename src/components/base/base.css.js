ToolhouseUI.Components = (function(Components, Core) {

    const Config = Components.BaseConfig;

    var BaseCss = {};
    BaseCss.type = Core.Component.TYPE.css;

    BaseCss.css = [
        { 
            selector: ":root",
            declaration: [
                "font-family: Arial",
                "font-size: 10px"
            ]
        },
        { 
            selector: "html, body",
            declaration: [
                "background-color: " + Config.COLORS.greyE,
                "font-size:1.6rem"
           ]
        },
        { 
            selector: "h1",
            declaration: [
                "text-transform:uppercase",
                "font-size:3rem"
           ]
        },
        {
            selector: "table",
            declaration: [
                "width:100%",
                "text-align:left",
            ]
        },
        {
            selector: "th",
            declaration: [
                "background-color: " + Config.COLORS.white,
                "padding:1rem"
            ]
        },
        {
            selector: "td",
            declaration: [
                "padding:0.5rem 1rem"
            ]
        }
    ];

    // XXX base css needs to be manually called here because it is the base class
    // without it being called here there's no clean way of overwriting the base css
    var Css = new Core.Css(BaseCss.css, 'BaseCss');
    Css.write();

    Components.BaseCss = BaseCss;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);