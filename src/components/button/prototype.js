oem.Components = (function(Components, Core) {

    // Card component
    var Prototype = Core.Prototype(Core.Component, {
        type: "Button",
        selector: "oem-button"
    });
    
    // exports
    Components.Button.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);