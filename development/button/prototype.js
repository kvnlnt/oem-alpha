(function(CORE, COMPONENTS) {

    var Prototype = CORE.Prototype(CORE.Component, {
        type: "Button"
    });
    
    // exports
    COMPONENTS.Button.Prototype = Prototype;
    return COMPONENTS;

})(oem.Core, oem.Components);