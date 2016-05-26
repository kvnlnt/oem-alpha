oem.Components = (function(Components, Core) {

    var View = {};
    View.id = 'oem-kevin-css';
    View.css = [

        {
            selector: "oem-kevin, .oem-kevin",
            declaration: [
                "color:red"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: View.id,
        css: View.css
    });

    Components.Kevin.View = View;
    return Components;

})(oem.Components || {}, oem.Core);