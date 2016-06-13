oem.Components = (function(Components, Core) {

    var Css = [
        {
            selector:".oem-stylizer table.colors",
            declaration: [
                "table-layout:fixed",
                "width:100%"
            ]
        },
        {
            selector:".oem-stylizer table.colors tr td:first-child",
            declaration: [
                "width:25px"
            ]
        },
        {
            selector:".oem-stylizer table.colors tr td",
            declaration: [
                "padding:10px"
            ]
        },
        {
            selector:".oem-stylizer .colors tr",
            declaration: [
                "background-color:#f6f6f6"
            ]
        }
    ];
    Components.Stylizer.Css = Css;
    return Components;

})(oem.Components || {}, oem.Core);