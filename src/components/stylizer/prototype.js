oem.Components = (function(Components, Core) {

    // Card component
    var Prototype = Core.Prototype(Core.Component, {
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
        for(var i in Core.Theme.COLORS){
            colorName = Core.El("td", {}, " " + i + " ");
            colorHex = Core.El("td", {}, Core.Theme.COLORS[i]);
            colorSwatch = Core.El("td", {style:"background-color:"+Core.Theme.COLORS[i]});
            colorControl = Core.El("tr", {class:"control"}, [colorSwatch, colorName, colorHex]);
            colorControls.push(colorControl);
        }

        var colorControlsWrapper = Core.El("table", {class:"colors"}, colorControls);
        this.getEl().appendChild(colorControlsWrapper);

        return this;
    };

    Prototype.renderImageControls = function(){
        return this;
    };

    // exports
    Components.Stylizer.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);