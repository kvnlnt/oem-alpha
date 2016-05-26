oem.Components = (function(Components, Core) {

    // Card component
    var Prototype = Core.Prototype(Core.Component, {
        name: "Kevin",
        selector: "oem-kevin"
    });

    // exports
    Components.Kevin.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);