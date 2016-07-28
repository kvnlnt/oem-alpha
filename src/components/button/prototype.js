(function(Components, Core) {

    var Prototype = Core.Modules.Prototype(Core.Modules.Component, {
        type: "Button",
        selector: "oem-button"
    });
    
    // exports
    Components.Button.Prototype = Prototype;
    return Components;

})(oem.Components, oem.Core);