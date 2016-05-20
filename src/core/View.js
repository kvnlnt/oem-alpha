oem.Core = (function(Core) {

    var View = {};
    View.id = 'oem-view';
    View.css = [

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
        id: View.id,
        css: View.css
    });

    Core.View = View;
    return Core;

})(oem.Core || {});