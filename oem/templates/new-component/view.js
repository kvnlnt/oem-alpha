oem.Components = (function(Components, Core) {

    var %CLASS%View = {};
    %CLASS%View.id = '%SELECTOR%-css';
    %CLASS%View.css = [

        {
            selector: "%SELECTOR%, .%SELECTOR%",
            declaration: [
                "color:red"
            ]
        }

    ];

    // add to css renderer
    Core.Css.add({
        id: %CLASS%View.id,
        css: %CLASS%View.css
    });

    Components.CardView = %CLASS%View;
    return Components;

})(oem.Components || {}, oem.Core);