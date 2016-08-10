(function(Components, Core) {

    var Prototype = Core.Modules.Prototype(Core.Prototypes.Component, {
        type: "Button"
    });

    Prototype.getStyle = function(){
        return this.style;
    };

    Prototype.setStyle = function(style){
        this.getEl().dataset.oemStyle = style;
        this.style = style;
        return this;
    };

    Prototype.set = function(random){
        this.random = random;
    };
    
    // exports
    Components.Button.Prototype = Prototype;
    return Components;

})(oem.Components, oem.Core);