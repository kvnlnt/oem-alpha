(function(Components, Core) {
    
    var Prototype = Core.Modules.Prototype(Core.Prototypes.Component, {
        type: "Stylizer",
        selector: "oem-stylizer"
    });

    Prototype.init = function(){
        this
        .renderColorControls()
        .renderImageControls();
    };

    Prototype.renderColorControls = function(){

        var colorControls = [];
        var colorName;
        var colorHex;
        var colorSwatch;
        var colorControl;
        for(var i in Core.Modules.Theme.COLORS){
            colorName = Core.Modules.El("td", {}, " " + i + " ");
            colorHex = Core.Modules.El("td", {}, Core.Modules.Theme.COLORS[i]);
            colorSwatch = Core.Modules.El("td", {style:"background-color:"+Core.Modules.Theme.COLORS[i]});
            colorControl = Core.Modules.El("tr", {class:"control"}, [colorSwatch, colorName, colorHex]);
            colorControls.push(colorControl);
        }

        var colorControlsWrapper = Core.Modules.El("table", {class:"colors"}, colorControls);
        this.getEl().appendChild(colorControlsWrapper);

        return this;
    };

    Prototype.renderImageControls = function(){
        return this;
    };

    // exports
    Components.Stylizer.Prototype = Prototype;
    return Components;

})(oem.Components, oem.Core);