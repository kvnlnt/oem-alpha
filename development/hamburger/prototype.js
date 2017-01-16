(function(COMPONENTS, COMPONENT, PROTOTYPE) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Hamburger"
    });

    Prototype.init = function(){
        this.getEl().addEventListener('click', this.toggle.bind(this));
    };

    Prototype.activate = function(){
        this.getEl().classList.add('--active');
        return this;
    };

    Prototype.deactivate = function(){
        this.getEl().classList.remove('--active');
        return this;
    };

    Prototype.isActive = function(){
        return this.getEl().classList.contains('--active');
    };

    Prototype.toggle = function(){
        if(this.isActive()){
            this.deactivate();
        } else {
            this.activate();
        }
        return this;
    };

    COMPONENTS.Hamburger.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);