(function(COMPONENTS, COMPONENT, PROTOTYPE) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Hamburger"
    });

    Prototype.init = function(){
        this.isActive = false;
        this.getEl().addEventListener('click', this.handleClick.bind(this));
    };

    Prototype.activate = function(){
        this.isActive = true;
        this.getEl().classList.add('--active');
        return this;
    };

    Prototype.deactivate = function(){
        this.isActive = false;
        this.getEl().classList.remove('--active');
        return this;
    };

    Prototype.handleClick = function(){
        this.toggle();
        return this;
    };

    Prototype.toggle = function(){
        if(this.isActive){
            this.deactivate();
        } else {
            this.activate();
        }
        return this;
    };

    COMPONENTS.Hamburger.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);