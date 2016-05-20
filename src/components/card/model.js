oem.Components = (function(Components, Core) {

    // Card component
    var Card = Core.Prototype(Core.Component, {
        name:"Card",
        selector:"oem-card"
    });

    // exports
    Components.Card = Card;
    return Components;

})(oem.Components || {}, oem.Core);