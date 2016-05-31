oem.Components = (function(Components, Core) {

    // Card component
    var Prototype = Core.Prototype(Core.Component, {
        name: "ThemeRoller",
        selector: "oem-theme-roller"
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
            colorName = Core.El("span", {}, i);
            colorHex = Core.El("span", {}, Core.Theme.COLORS[i]);
            colorSwatch = "";
            colorControl = Core.El("div", {class:"control"}, [colorName, colorHex, colorSwatch]);
            colorControls.push(colorControl);
        }

        var colorControlsWrapper = Core.El("div", {}, colorControls);
        this.getEl().appendChild(colorControlsWrapper);

        return this;
    };

    Prototype.renderImageControls = function(){
        return this;
    };

    // exports
    Components.ThemeRoller.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);