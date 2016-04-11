ToolhouseUI.Components = (function(Components, Core) {

    // Card component
    var Card = Object.create(Core.Component); // call super constructor.
    Card.name = "Card";
    Core.Util.extend(Card, Components.CardLogic);
    
    // exports
    Components.Card = Card;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);