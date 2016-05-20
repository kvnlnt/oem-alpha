oem.Components = (function(Components, Core) {

    // Card component
    var Card = Object.create(Core.Component); // call super constructor.
    Card.name = "Card";
    Card.selector = "oem-card";
    
    // exports
    Components.Card = Card;
    return Components;

})(oem.Components || {}, oem.Core);