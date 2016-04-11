ToolhouseUI.Components = (function(Components, Core) {

    var css = [

        {
            selector: "*",
            declaration: [
                "transition: all 0.5s",
            ]
        }, 
        {
            selector: "body",
            declaration: [
                "font-size:16px",
                "font-family:Arial"
            ]
        },
        {
            selector: "h1, h2, h3, h4, h5",
            declaration: [
                "font-weight:normal",
                "margin:20px 0"
            ]
        }, 
        {
            selector: "h1",
            declaration: [
                "font-size:32px",
            ]
        }, 
        {
            selector: "h2",
            declaration: [
                "font-size:28px",
            ]
        },
        {
            selector: "h3",
            declaration: [
                "font-size:24px",
            ]
        },
        {
            selector: "h4",
            declaration: [
                "font-size:20px",
            ]
        },
        {
            selector: "h5",
            declaration: [
                "font-size:16px",
            ]
        }, 

    ];

    // add to css renderer
    Core.Css.add({
        id: 'th-base-css',
        css: css
    });

    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);