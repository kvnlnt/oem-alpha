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

        var colorControls = ["Core.Util.COLORS"];
        var color;
        for(var i in Core.Theme.COLORS){
            color = Core.Theme.COLORS[i];
            colorControls.push(Core.El("div", {}, i + ":" + color));
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