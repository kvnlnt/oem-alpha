ToolhouseUI.Core = (function(Core, Components){

    const $ = Core.Dom;

    function collectComponent(component){
        ToolhouseUI.docs = [];
        var selector = new Components[component]().selector; // quickly get selector
        $components = $(selector);
        $components.each(function(i, el){
            var instance = new Components[component]({dom:el});
            instance.doc();
            ToolhouseUI.docs.push(instance);
        });
    }

    function init(){

        // collect all component docs
        for(var component in Components){
            if(Components[component].type === Core.Component.TYPE.doc) collectComponent(component);
        }
        
    }

    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, init);

    return Core;

})(ToolhouseUI.Core || {}, ToolhouseUI.Components);