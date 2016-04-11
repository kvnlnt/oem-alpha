ToolhouseUI.Components = (function(Components, Core) {

    // Card component
    var CardDoc = Object.create(Core.Documentor); // call super constructor
    CardDoc.name = "Cards";
    CardDoc.testComponent = 'th-card-doc';
    
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        CardDoc.docCss(Components.CardCss);
        CardDoc.docJs(Components.Card);
    });

    // exports
    Components.CardDoc = CardDoc;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);