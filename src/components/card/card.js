ToolhouseUI.Components = (function(Components, Core) {

    // Card component
    var Card = Object.create(Core.Component); // call super constructor.
    Card.name = "Card";

    // exports
    Components.Card = Card;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);

var card = Object.create(ToolhouseUI.Components.Card);
card.init();
