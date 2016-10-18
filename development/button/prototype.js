(function(Components, Core) {

    var Prototype = Core.Modules.Prototype(Core.Prototypes.Component, {
        type: "Button"
    });
    
    // exports
    Components.Button.Prototype = Prototype;
    return Components;

})(oem.Components, oem.Core);