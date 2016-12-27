(function(COMPONENTS, COMPONENT, PROTOTYPE) {


    // PROTOTYPE
    // ========================================================
    // This is the main prototype class for this component. It is meant to:
    // 1) contain any/all functional behavior for this component.
    // 2) be prototyped into a new instance for each component
    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Drawer"
    });

    Prototype.init = function(){
    };

    Prototype.open = function(){
        this.getEl().classList.add('--open');
    };

    Prototype.close = function(){
        this.getEl().classList.remove('--open');
    };

    COMPONENTS.Drawer.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);