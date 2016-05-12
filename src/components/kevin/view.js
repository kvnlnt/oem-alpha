oem.Components = (function(Components, Core) {

    var KevinView = {};
    KevinView.id = 'oem-kevin-css';
    KevinView.css = [

        {
            selector: "oem-kevin, .oem-kevin",
            declaration: [
                "color:red"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: KevinView.id,
        css: KevinView.css
    });

    Components.CardView = KevinView;
    return Components;

})(oem.Components || {}, oem.Core);