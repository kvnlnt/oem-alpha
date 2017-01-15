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
        this._isOpen = false;
        return this;
    };

    Prototype.open = function(){
        this.getEl().classList.add('--open');
        this.setIsOpen(true);
        return this;
    };

    Prototype.close = function(){
        this.getEl().classList.remove('--open');
        this.setIsOpen(false);
        return this;
    };

    Prototype.isOpen = function(){
        return this._isOpen;
    };

    Prototype.setIsOpen = function(isOpen){
        this._isOpen = isOpen;
        return this;
    };

    Prototype.toggle = function(){
        this.isOpen() ? this.close() : this.open();
        return this;
    };

    COMPONENTS.Drawer.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);