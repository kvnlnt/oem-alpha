(function(COMPONENTS, THEME) {

    var Css = [

        {
            selector: '.mobile .row',
            declaration: [
                "display:block"
            ]
        },

        {
            selector: '.mobile .col',
            declaration: [
                "display:block"
            ]
        },

        {
            selector: '.desktop .row',
            declaration: [
                "width: 100%",
                "display: table", 
                "table-layout: fixed"
            ]
        },

        {
            selector: '.desktop .col',
            declaration: [
                "display: table-cell"
            ]
        }

    ];


    COMPONENTS.Grid.Css = Css;
    return COMPONENTS;

})(oem.Components, oem.Core.Theme);