oem.Components = (function(Components, Core) {

    var Css = [
        {
            selector:".oem-theme-roller table.colors",
            declaration: [
                "table-layout:fixed",
                "width:100%"
            ]
        },
        {
            selector:".oem-theme-roller table.colors tr td:first-child",
            declaration: [
                "width:25px"
            ]
        },
        {
            selector:".oem-theme-roller table.colors tr td",
            declaration: [
                "padding:10px"
            ]
        },
        {
            selector:".oem-theme-roller .colors tr",
            declaration: [
                "background-color:#f6f6f6"
            ]
        }
    ];
    Components.ThemeRoller.Css = Css;
    return Components;

})(oem.Components || {}, oem.Core);