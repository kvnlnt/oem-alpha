ToolhouseUI.Core = (function(Core, Components){

    const $ = Core.Dom;

    function collectComponent(compName, compClass){
        var compKey = compName.toLowerCase() + 's';
        if(typeof Components[compKey] === "undefined") Components[compKey] = [];
        $components = $(compClass.selector);
        $components.each(function(i, el){
            var instance = Object.create(compClass);
            instance.init({dom:el});
            Components[compKey].push(instance);
        });
    }

    function init(){

        // collect all components
        for(var component in Components){
            if(Components[component].type === Core.Component.TYPE.module) collectComponent(component, Components[component]);
        }
        
    }

    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, init);

    return Core;

})(ToolhouseUI.Core || {}, ToolhouseUI.Components);