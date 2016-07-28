(function(Components, Core) {

    var Prototype = Core.Prototype(Core.Modules.Component, {
        type:"Card",
        selector:"oem-card"
    });

    // exports
    Components.Card.Prototype = Prototype;
    return Components;

})(oem.Components, oem.Core);