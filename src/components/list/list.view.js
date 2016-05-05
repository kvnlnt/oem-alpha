oem.Components = (function(Components, Core) {

    var ListView = {};
    ListView.id = 'oem-list-css';
    ListView.css = [

        {
            selector: "oem-list, .oem-list",
            declaration: [
                "color:red"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: ListView.id,
        css: ListView.css
    });

    Components.CardView = ListView;
    return Components;

})(oem.Components || {}, oem.Core);