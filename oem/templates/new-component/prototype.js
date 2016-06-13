oem.Components = (function(Components, Core) {

    // Card component
    var Prototype = Core.Prototype(Core.Component, {
        type: "%CLASS%",
        selector: "%SELECTOR%"
    });
    
    // exports
    Components.%CLASS%.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);